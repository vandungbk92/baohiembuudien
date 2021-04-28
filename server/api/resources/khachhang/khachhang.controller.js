import benhnhanService from './khachhang.service';
import BenhNhan from './khachhang.model';
import * as responseAction from '../../utils/responseAction';
import jwt from "../../helpers/jwt";
import { getConfig } from '../../../config/config';
import { filterRequest, optionsRequest } from '../../utils/filterRequest';
import { sendEmail } from '../../utils/mailHelper';
const config = getConfig(process.env.NODE_ENV);

import * as admin from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.cert(config.firebase_config.credential),
  databaseURL: config.firebase_config.databaseURL
});

export default {
  async signup(req, res) {
    try {

      const { value, error } = benhnhanService.validateSignup(req.body, 'POST');
      if (error) {
        responseAction.error(res, 400, error.details[0]);
        return;
      }
      // kiểm tra xem tài khoản đã tồn tại chưa, với taikhoan: taikhoan
      let benhnhanInfo = await BenhNhan.findOne({ taikhoan: value.taikhoan });
      if (benhnhanInfo) {
        return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại, vui lòng kiểm tra và thử lại' });
      }

      let date_val = new Date();
      let timestam = date_val.getTime();
      value._id = 'TL' + timestam

      // băm mật khẩu người dùng.
      let passOrg = value.matkhau
      const encryptedPass = benhnhanService.encryptPassword(value.matkhau);
      value.matkhau = encryptedPass;
      // return res.json(value)
      let benhnhan = await BenhNhan.create(value);

      // gửi mail
      if(value.email){
        let mailOptions = {
          from: `App bệnh viện <${config.mail.auth.user}>`, // sender address
          to: value.email, // list of receivers
          subject: 'Đăng ký tài khoản thành công', // Subject line
          //text: 'Pass moi la 123455', // plaintext body
          html: `<h2>Bạn đã tạo tài khoản thành công, Thông tin tài khoản</h2>
              <div><strong>Họ tên: </strong>${value.hoten}</div>
              <div><strong>Tên tài khoản: </strong>${value.taikhoan}</div>    
              <div><strong>Mật khẩu: </strong>${passOrg}</div>             
              <div><strong>Số điện thoại: </strong>${value.dienthoai}</div>`, // html body
        };

        sendEmail(mailOptions, (err) => {
          if (err) {
            responseAction.error(res, 400);
            return;
          } else {

          }
        });
      }

      return res.json(benhnhan);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async login(req, res) {
    try {
      const { value, error } = benhnhanService.validateLogin(req.body);
      if (error) {
        return res.status(400).json(error);
      }

      const benhnhan = await BenhNhan.findOne({ taikhoan: value.taikhoan, is_deleted: false }).lean();

      // nếu đã có tài khoản thì đăng nhập bình thường
      if(benhnhan){
        const authenticted = benhnhanService.comparePassword(value.matkhau, benhnhan.matkhau);
        if (!authenticted) {
          return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu không đúng.' });
        }
        const token = jwt.issue({ _id: benhnhan._id, isUser: false }, '365d');
        await benhnhanService.addOrUpdateDeviceToken(benhnhan, req.body.device_token);
        return res.json({ token });
      }else{
        if(value.taikhoan !== value.matkhau){
          return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu không đúng.' });
        }
        //Tìm kiếm bệnh nhân theo mã bệnh nhân.
        const thongtinBN = await BenhNhan.findOne({ _id: value.taikhoan, is_deleted: false }).lean();
            /*.populate({path: 'maphai', select: 'tenphai'})
            .populate({path: 'madantoc', select: 'tenquoctich'})
            .populate({path: 'maquoctich', select: 'tenquoctich'})
            .populate({path: 'manghenghiep', select: 'tennghenghiep'})
            .populate({path: 'mapx', select: 'tenxa'})
            .populate({path: 'maqh', select: 'tenhuyen'})
            .populate({path: 'matt', select: 'tentinh'})*/


        // Nếu bệnh nhân chưa có tài khoản, thì tài khoản mặc định ban đầu là mabn/mabn
        if (!thongtinBN) {
          return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu không đúng.' });
        }else{
          // có thông tin mã bệnh nhân.
          // kiểm tra bệnh nhân đã có tài khoản chưa, nếu có yêu cầu đăng nhập bằng tài khoản và không cho đăng nhập bằng mã bệnh nhân.
          if(thongtinBN.taikhoan){
            return res.status(400).json({ success: false, message: 'Bạn đã có tài khoản, vui lòng đăng nhập bằng tài khoản và mật khẩu.' });
          }else{
            // nếu bệnh nhân không có số điện thoại, thì k cho đăng nhập.
            if(!thongtinBN.dienthoai){
              return res.status(400).json({ success: false, message: 'Vui lòng liên hệ bộ phận chăm sóc khách hàng để cập nhật tài khoản.'});
            }
            // bệnh nhân đã có số điện thoại rồi, thì xác thực thông tin cần thay đổi, và trả về
            let dienthoai = thongtinBN.dienthoai.slice(0, -3) + '***'
            const token = jwt.issue({ _id: thongtinBN._id, isUser: false }, '365d');
            // await benhnhanService.addOrUpdateDeviceToken(thongtinBN, req.body.deviceToken);
            return res.json({ token, change: true, dienthoai: dienthoai });
          }
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async capnhatTaiKhoan(req, res){
     // kiểm tra bệnh nhân đã có taikhoan chưa, nếu có rồi thì k cho cập nhật
    // nếu bệnh nhân đã có tài khoản rồi thì k cho cập nhật nữa.
    const { value, error } = benhnhanService.validateSignup(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const benhnhan = await BenhNhan.findOne({ _id: req.user._id, is_deleted: false });
    if(benhnhan.taikhoan){
      return res.status(400).json({success: false, message: 'Không thể cập nhật tài khoản đã có thông tin'});
    }
    // kiểm tra taikhoan đã tồn tại chưa
    const benhnhanInfo = await BenhNhan.findOne({ taikhoan: value.taikhoan });
    if(benhnhan.taikhoan){
      return res.status(400).json({success: false, message: 'Tài khoản đã tồn tại, vui lòng kiểm tra và thử lại.'});
    }
    // băm mật khẩu người dùng.
    const encryptedPass = benhnhanService.encryptPassword(value.matkhau);
    value.matkhau = encryptedPass;

    // cap nhat tai khoan va mat khau.
    const benhnhanUpt = await BenhNhan.findByIdAndUpdate(req.user._id, value, {new: true})
    return res.json(benhnhanUpt)
  },

  async xacthucdienthoai(req, res){
    //kiểm tra dữ liệu
    let bodyData = req.body
    if(!bodyData.dienthoai){
      return res.status(400).json({success: false, message: 'Số điện thoại là bắt buộc nhập'});
    }

    const benhnhan = await BenhNhan.findOne({ _id: req.user._id, is_deleted: false })
      .populate({path: 'maphai', select: 'tenphai'})
      .populate({path: 'madantoc', select: 'tenquoctich'})
      .populate({path: 'maquoctich', select: 'tenquoctich'})
      .populate({path: 'manghenghiep', select: 'tennghenghiep'})
      .populate({path: 'mapx', select: 'tenxa'})
      .populate({path: 'maqh', select: 'tenhuyen'})
      .populate({path: 'matt', select: 'tentinh'})
      .lean();
    if(!benhnhan.dienthoai){
      return res.status(400).json({success: false, message: 'Tài khoản chưa có số điện thoại, vui lòng liên hệ bộ phận chăm sóc khách hàng.'});
    }
    if(bodyData.dienthoai.slice(-9) === benhnhan.dienthoai.slice(-9)){
      const token = jwt.issue({ _id: benhnhan._id, isUser: false }, '365d');
      return res.json({ token, change: true, thongtin: benhnhan });
    }else{
      return res.status(400).json({success: false, message: 'Số điện thoại không chính xác'});
    }

  },

  async xacthucdienthoaiToken(req, res){
    //kiểm tra dữ liệu
    try{
      let {token} = req.body
      if(!token){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng.'});
      }
      // return res.json(token)
      let dataUserFirebase = await admin.auth().verifyIdToken(token);
      let phone_number = dataUserFirebase.phone_number.slice(-9);
      let filterPhone = `${phone_number}$`
      let benhnhan = await BenhNhan.findOne({dienthoai: new RegExp(filterPhone)});
      if(benhnhan){
        const token = jwt.issue({ _id: benhnhan._id, isUser: false }, '365d');
        await benhnhanService.addOrUpdateDeviceToken(benhnhan, req.body.device_token);
        return res.json({ token });
      }else{
        return res.json({token: null})
      }
    }catch (e){
      return res.status(400).json({success: false, message: 'Mã xác thực không chính xác'});
    }
  },

  async thaydoidienthoaiToken(req, res){
    //kiểm tra dữ liệu
    try{
      let {token} = req.body
      if(!token){
        return res.status(400).json({success: false, message: 'Dữ liệu không đúng.'});
      }
      let dataUserFirebase = await admin.auth().verifyIdToken(token);
      let phone_number = '0' + dataUserFirebase.phone_number.slice(-9);
      const benhnhan = await BenhNhan.findOneAndUpdate({ _id: req.user._id }, {dienthoai: phone_number}, {new: true})
        .populate({path: 'maphai', select: 'tenphai'})
        .populate({path: 'madantoc', select: 'tenquoctich'})
        .populate({path: 'maquoctich', select: 'tenquoctich'})
        .populate({path: 'manghenghiep', select: 'tennghenghiep'})
        .populate({path: 'mapx', select: 'tenxa'})
        .populate({path: 'maqh', select: 'tenhuyen'})
        .populate({path: 'matt', select: 'tentinh'})
      return res.json(benhnhan);
    }catch (e){
      return res.status(400).json({success: false, message: 'Mã xác thực không chính xác'});
    }
  },

  async authenticate(req, res) {
    try {
      const { _id } = req.user;
      const benhnhan = await BenhNhan.findOne({ _id: _id, is_deleted: false }, { matkhau: 0, is_deleted: 0 })
        .populate({path: 'maphai', select: 'tenphai'})
        .populate({path: 'madantoc', select: 'tendantoc'})
        .populate({path: 'maquoctich', select: 'tenquoctich'})
        .populate({path: 'manghenghiep', select: 'tennghenghiep'})
        .populate({path: 'mapx', select: 'tenxa'})
        .populate({path: 'maqh', select: 'tenhuyen'})
        .populate({path: 'matt', select: 'tentinh'})
        .lean();
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }
      return res.json(benhnhan);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findAll(req, res) {
    try {
      let query = filterRequest(req.query, true);

      if (req.query.limit && req.query.limit === '0') {
        const totalQuery = await BenhNhan.paginate(query, { limit: 0 });
        req.query.limit = totalQuery.total;
      }
      let options = optionsRequest(req.query);
      options.select = '-matkhau -is_deleted';
      options.sort = {_id: -1};
      options.populate=[{ path: 'user_ott_id' }, {path: 'maqh',select:'tenhuyen'},
        {path: 'matt',select:'tentinh'},
        {path: 'mapx',select:'tenxa'},
        {path: 'maphai',select:'tenphai'},
        {path: 'madantoc',select:'tendentoc'},
        {path: 'manghenghiep',select:'tennghenghiep'},
        {path: 'maquoctich',select:'tenquoctich'} ]

      const benhnhan = await BenhNhan.paginate(query, options);

      return res.json(benhnhan);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const benhnhan = await BenhNhan.findById(id)
        .populate({path: 'maqh',select:'tenhuyen'})
        .populate({path: 'matt',select:'tentinh'})
        .populate({path: 'mapx',select:'tenxa'})
        .populate({path: 'maphai',select:'tenphai'})
        .populate({path: 'madantoc',select:'tendentoc'})
        .populate({path: 'manghenghiep',select:'tennghenghiep'})
        .populate({path: 'maquoctich',select:'tenquoctich'});
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }
      return res.json(benhnhan);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const benhnhan = await BenhNhan.findOneAndUpdate({ _id: id }, { is_deleted: true }, {new: true});
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }

      let user_ott_id = benhnhan.user_ott_id
      if(Array.isArray(user_ott_id) && user_ott_id.length){
        let uptUserOtt = await UserOTT.update({_id: {$in: user_ott_id}}, {is_active: false}, {multi: true})
      }

      return res.json(benhnhan);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { value, error } = benhnhanService.validateSignup(req.body, 'PUT');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0]);
        return;
      }

      if (value.email) {
        let userInfo = await BenhNhan.findOne({ _id: { $ne: id }, email: value.email, is_deleted: false });
        if (userInfo) {
          return res.status(400).json({ success: false, message: 'Email đã tồn tại, vui lòng kiểm tra và thử lại' });
        }
      }

      if (value.phone) {
        let userInfoPhone = await BenhNhan.findOne({ _id: { $ne: id }, phone: value.phone, is_deleted: false });
        if (userInfoPhone) {
          return res.status(400).json({
            success: false,
            message: 'Số điện thoại đã tồn tại, vui lòng kiểm tra và thử lại',
          });
        }
      }
      if(value.matkhau){
        const encryptedPass = benhnhanService.encryptPassword(value.matkhau);
        value.matkhau = encryptedPass;
      }
      
      const benhnhan = await BenhNhan.findOneAndUpdate({ _id: id }, value, {
        runValidators: true,
        context: 'query',
        new: true,
      });
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }
      return res.json(benhnhan);
    } catch (err) {
      console.error(err);
      //return res.status(500).send(err);
      responseAction.error(res, 500, err.errors);
      return;
    }
  },
  async updateInfo(req, res) {
    try {
      const id = req.user._id;

      // thông tin của benhnhan
      let benhnhanInfo = await BenhNhan.findOne({_id: id, is_deleted: false}).lean()
      if (!benhnhanInfo) {
        responseAction.error(res, 404, '');
        return;
      }
      delete req.body.taikhoan
      delete req.body.matkhau
      delete req.body.dienthoai
      const { value, error } = benhnhanService.validateSignup(req.body, 'PUT');
      if (error && error.details) {
        responseAction.error(res, 400, error.details[0]);
        return;
      }

      if (value.phone) {
        let userInfoPhone = await BenhNhan.findOne({ _id: { $ne: id }, dienthoai: value.dienthoai, is_deleted: false });
        if (userInfoPhone) {
          return res.status(400).json({
            success: false,
            message: 'Số điện thoại đã tồn tại tài khoản khác, vui lòng kiểm tra và thử lại',
          });
        }
      }

      const benhnhan = await BenhNhan.findOneAndUpdate({ _id: id }, value, {new: true})
        .populate({path: 'maphai', select: 'tenphai'})
        .populate({path: 'madantoc', select: 'tenquoctich'})
        .populate({path: 'maquoctich', select: 'tenquoctich'})
        .populate({path: 'manghenghiep', select: 'tennghenghiep'})
        .populate({path: 'mapx', select: 'tenxa'})
        .populate({path: 'maqh', select: 'tenhuyen'})
        .populate({path: 'matt', select: 'tentinh'})

      return res.json(benhnhan);

    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async changePassword(req, res) {
    const benhnhan = await BenhNhan.findOne({ is_deleted: false, _id: req.user._id });
    if (!benhnhan) {
      responseAction.error(res, 404, '');
      return;
    }

    const authenticted = benhnhanService.comparePassword(req.body.old_matkhau, benhnhan.matkhau);
    if (!authenticted) {
      return res.status(400).json({ success: false, message: 'Mật khẩu cũ không đúng' });
    }

    const encryptedPass = benhnhanService.encryptPassword(req.body.new_matkhau);

    const benhnhanUpdate = await BenhNhan.findOneAndUpdate({ _id: req.user._id }, { matkhau: encryptedPass }, { new: true });

    let mailOptions = {
      from: `Hệ thống phản hồi Thanh Hóa <${config.mail.auth.user}>`, // sender address
      to: benhnhanUpdate.email, // list of receivers
      subject: 'Đổi mật khẩu thành công', // Subject line
      //text: 'Pass moi la 123455', // plaintext body
      html: `<h2>Mật khẩu mới của bạn là <b style="color: red">${req.body.new_matkhau}</b></h2>
              </br>
              <h2><i>Vui lòng đăng nhập lại!</i> </h2>`, // html body
    };

    sendEmail(mailOptions, (err) => {
      if (err) {
        responseAction.error(res, 400);
        return;
      } else {

      }
    });
    return res.json(benhnhanUpdate);
  },

  async forgotPasswordMail(req, res) {
    try {
      let benhnhan = await BenhNhan.findOne({ is_deleted: false, email: req.body.email });

      if (!benhnhan) {
        return res.status(404).json({success:false, message: "Email không tồn tại, vui lòng kiểm tra và thử lại."})
      }

      const token = jsonwebtoken.sign({ id: benhnhan._id }, config.secret, { expiresIn: '5m' });

      let url = config.host_benhnhan + '/forgot-matkhau?token=' + token;

      let mailOptions = {
        from: `Hệ thống phản hồi Thanh Hóa <${config.mail.auth.user}>`, // sender address
        to: benhnhan.email, // list of receivers
        subject: 'Quên mật khẩu', // Subject line
        html: `<p>Bạn có yêu cầu thay đổi mật khẩu trên hệ thống phản hồi Thanh Hóa</p>
              </br>
              <p>Vui lòng click vào link để thay đổi mật khẩu : ${url} </p>`, // html body
      };


      sendEmail(mailOptions, (err) => {
        if (err) {
          responseAction.error(res, 400);
          return;
        } else {

        }
      });
      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async registerDevice(req, res) {
    try {
      const { _id } = req.user;

      const benhnhan = await BenhNhan.findOne({ _id: _id, is_deleted: false });
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }

      await benhnhanService.addOrUpdateDeviceToken(benhnhan, req.body.deviceToken);

      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async unregisterDevice(req, res) {
    try {
      const { _id } = req.user;

      const benhnhan = await BenhNhan.findOne({ _id: _id, is_deleted: false });
      if (!benhnhan) {
        responseAction.error(res, 404, '');
        return;
      }

      await benhnhanService.findAndRemoveDeviceToken(benhnhan, req.body.deviceToken);

      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async resetPassword(req, res) {
    const benhnhan = await BenhNhan.findOne({ is_deleted: false, _id: req.user._id });
    if (!benhnhan) {
      responseAction.error(res, 404, '');
      return;
    }

    const encryptedPass = benhnhanService.encryptPassword(req.body.matkhau);

    const benhnhanUpdate = await BenhNhan.findOneAndUpdate({ _id: req.user._id }, { matkhau: encryptedPass }, { new: true });

    if (benhnhanUpdate.email) {
      let mailOptions = {
        from: `Hệ thống phản hồi Thanh Hóa <${config.mail.auth.user}>`, // sender address
        to: benhnhanUpdate.email, // list of receivers
        subject: 'Đổi mật khẩu thành công', // Subject line
        html: `<h2>Mật khẩu mới của bạn là <b style="color: red">${req.body.matkhau}</b></h2>
              </br>
              <h2><i>Vui lòng đăng nhập hệ thống!</i> </h2>`, // html body
      };

      sendEmail(mailOptions, (err) => {
        if (err) {
          responseAction.error(res, 400);
          return;
        } else {

        }
      });
    }

    return res.json({ success: true });
  },
};

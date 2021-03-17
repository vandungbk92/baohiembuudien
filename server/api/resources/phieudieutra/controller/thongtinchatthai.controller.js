import * as responseAction from '../../../utils/responseAction'
import PhieuDieuTra from '../phieudieutra.model';
import ChatThaiChanNuoi from '../../thongtinchatthai/chatthaichannuoi/chatthaichannuoi.model';
import ChatThaiCongNghiep from '../../thongtinchatthai/chatthaicongnghiep/chatthaicongnghiep.model';
import ChatThaiNguyHai from '../../thongtinchatthai/chatthainguyhai/chatthainguyhai.model';
import ChatThaiSinhHoat from '../../thongtinchatthai/chatthaisinhhoat/chatthaisinhhoat.model';
import ChatThaiYTeKoNguyHai from '../../thongtinchatthai/chatthaiytekonguyhai/chatthaiytekonguyhai.model';
import ThongTinKhiThai from '../../thongtinchatthai/thongtinkhithai/thongtinkhithai.model';
import ThongTinNuocThai from '../../thongtinchatthai/thongtinnuocthai/thongtinnuocthai.model';
import XuLyNuocThai from '../../thongtinchatthai/xulynuocthai/xulynuocthai.model';
import NuocThaiCoSoXuLy from '../../thongtinchatthai/nuocthaicosoxuly/nuocthaicosoxuly.model';

export default {
  async getThongTinChatThai(req, res) {
    try {
      // thông tin chất thải.
      const { id } = req.params;
      const data = await PhieuDieuTra.findById({ is_deleted: false, _id: id })
      if (!data) {
        return responseAction.error(res, 404, '');
      }

      let arrayModel = [ChatThaiChanNuoi, ChatThaiCongNghiep, ChatThaiNguyHai, ChatThaiSinhHoat, ChatThaiYTeKoNguyHai,
        XuLyNuocThai, ThongTinKhiThai, ThongTinNuocThai, NuocThaiCoSoXuLy];

      let promissAll = arrayModel.map(model => {
        return model.findOne({phieudieutra_id: id});
      });

      let thongtinchatthai = await Promise.all(promissAll);
      let objRtn = {
        chatthaichannuoi: thongtinchatthai[0],
        chatthaicongnghiep: thongtinchatthai[1],
        chatthainguyhai: thongtinchatthai[2],
        chatthaisinhhoat: thongtinchatthai[3],
        chatthaiyte: thongtinchatthai[4],
        chatthaixulynuoc: thongtinchatthai[5],
        chatthaikhithai: thongtinchatthai[6],
        chatthainuocthai: thongtinchatthai[7],
        chatthainuocthaicosoxuly: thongtinchatthai[8]
      }
      return res.json(objRtn)
    } catch (err) {
      return responseAction.error(res, 500, err.errors)
    }
  },
  async postThongTinChatThai(req, res) {
    try {
      const { id } = req.params;
      const data = await PhieuDieuTra.findById({ is_deleted: false, _id: id })
      if (!data) {
        return responseAction.error(res, 404, '');
      }

      // thông tin chất thải.
      let dataBody = req.body;
      if(!dataBody){
        return res.status(400).json({success: false, message: 'Dữ liệu thông tin chất thải không tồn tại.'})
      }
      let objectRtn = {}
      let objCheck = {}
      let arrKey = Object.keys(dataBody);
      let promissAll = arrKey.map((key, idx) => {
        if(dataBody[key] && Object.keys(dataBody[key]).length){
          let _id = dataBody[key]._id
          delete dataBody[key]._id

          // kiểm tra xem là model nào.
          let model = null
          if(key === 'chatthaichannuoi'){model = ChatThaiChanNuoi}
          else if(key === 'chatthaicongnghiep'){model = ChatThaiCongNghiep}
          else if(key === 'chatthainguyhai'){model = ChatThaiNguyHai}
          else if(key === 'chatthaisinhhoat'){model = ChatThaiSinhHoat}
          else if(key === 'chatthaiyte'){model = ChatThaiYTeKoNguyHai}
          else if(key === 'chatthaixulynuoc'){model = XuLyNuocThai}
          else if(key === 'chatthaikhithai'){model = ThongTinKhiThai}
          else if(key === 'chatthainuocthai'){model = ThongTinNuocThai}
          else if(key === 'chatthainuocthaicosoxuly'){model = NuocThaiCoSoXuLy}

          // kiểm tra là cập nhật hay thêm mới.
          if(model){
            if(_id){
              objectRtn[key] = null
              objCheck[key] = idx
              return model.findByIdAndUpdate(_id, dataBody[key], {new: true})
            }else{
              dataBody[key].phieudieutra_id = id
              objectRtn[key] = null
              objCheck[key] = idx
              return model.create(dataBody[key]);
            }
          }
        }
        return null
      });
      let thongtinchatthai = await Promise.all(promissAll);
      Object.keys(objCheck).forEach(key => {
        objectRtn[key] = thongtinchatthai[objCheck[key]]
      })
      return res.json(objectRtn)
    } catch (err) {
      console.log(err)
      return responseAction.error(res, 500, err.errors)
    }
  }
};

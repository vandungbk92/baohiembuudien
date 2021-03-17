import * as responseAction from '../../../utils/responseAction'
import PhieuDieuTra from '../phieudieutra.model';
import Setting from '../../setting/setting.model'
import ChatThaiChanNuoi from '../../thongtinchatthai/chatthaichannuoi/chatthaichannuoi.model';
import ChatThaiCongNghiep from '../../thongtinchatthai/chatthaicongnghiep/chatthaicongnghiep.model';
import ChatThaiNguyHai from '../../thongtinchatthai/chatthainguyhai/chatthainguyhai.model';
import ChatThaiSinhHoat from '../../thongtinchatthai/chatthaisinhhoat/chatthaisinhhoat.model';
import ChatThaiYTeKoNguyHai from '../../thongtinchatthai/chatthaiytekonguyhai/chatthaiytekonguyhai.model';
import ThongTinKhiThai from '../../thongtinchatthai/thongtinkhithai/thongtinkhithai.model';
import ThongTinNuocThai from '../../thongtinchatthai/thongtinnuocthai/thongtinnuocthai.model';
import XuLyNuocThai from '../../thongtinchatthai/xulynuocthai/xulynuocthai.model';
import NuocThaiCoSoXuLy from '../../thongtinchatthai/nuocthaicosoxuly/nuocthaicosoxuly.model';
import QuyMoHoatDong from '../../thongtinhoatdong/quymohoatdong/quymohoatdong.model'
import QuyMoChanNuoi from '../../thongtinhoatdong/quymochannuoi/quymochannuoi.model'
import ThongTinDuAn from '../../thongtinhoatdong/thongtinduan/thongtinduan.model'
import QuyMoBenhVien from '../../thongtinhoatdong/quymobenhvien/quymobenhvien.model'
import NhienLieu from '../../thongtinhoatdong/nhienlieu/nhienlieu.model'
import NguyenVatLieu from '../../thongtinhoatdong/nguyenvatlieu/nguyenvatlieu.model'
import LuongNuocSuDung from '../../thongtinhoatdong/luongnuocsudung/luongnuocsudung.model'
import HoaChat from '../../thongtinhoatdong/hoachat/hoachat.model'
import HoSoMoiTruong from '../../hosomoitruong/hosomoitruong.model'
import KetLuanThanhTra from '../../ketluanthanhtra/ketluanthanhtra.model'
import LoaiPhieu from '../../danhmucloaiphieu/loaiphieu.model'

export default {
  async getDataPhieu(req, res) {
    try {
      let { id } = req.params;
      let phieudieutra = await PhieuDieuTra.findOne({ _id : id, is_deleted: false })
      .populate({ path: 'tinhthanhhoatdong_id', select: 'tentinh' })
      .populate({ path: 'quanhuyenhoatdong_id' , select: 'tenqh' })
      .populate({ path: 'phuongxahoatdong_id' , select: 'tenphuongxa' })
      .populate({ path: 'tinhthanhtruso_id', select: 'tentinh' })
      .populate({ path: 'quanhuyentruso_id', select: 'tenqh' })
      .populate({ path: 'phuongxatruso_id', select: 'tenphuongxa'});

      if (!phieudieutra) {
        return responseAction.error(res, 404, '')
      }
      let loaiphieu_id = phieudieutra.loaiphieu_id
      let loaiphieu = await LoaiPhieu.findOne({_id :loaiphieu_id, is_deleted: false})
      let maphieu = loaiphieu.maphieu
      let setting = await Setting.findOne({});

      //PHIEU 1 2 8
      let arrayModelPhieuKKTvaLangNghe = [QuyMoHoatDong,NguyenVatLieu,HoaChat, NhienLieu, LuongNuocSuDung,
        ChatThaiSinhHoat, ChatThaiCongNghiep, ChatThaiNguyHai,ThongTinNuocThai, ThongTinKhiThai,HoSoMoiTruong, KetLuanThanhTra ];

      let arrayModelPhieuChanNuoi =  [QuyMoChanNuoi, NguyenVatLieu,HoaChat, NhienLieu, LuongNuocSuDung, ChatThaiSinhHoat, 
        ChatThaiChanNuoi, ChatThaiNguyHai, ThongTinNuocThai,HoSoMoiTruong, KetLuanThanhTra ];

      let arrayModelPhieuKhaiThacMo =  [QuyMoHoatDong, NguyenVatLieu,
        HoaChat, NhienLieu, LuongNuocSuDung, ChatThaiSinhHoat, ChatThaiCongNghiep,
        ChatThaiNguyHai, ThongTinNuocThai,ThongTinKhiThai, HoSoMoiTruong, KetLuanThanhTra ];
      
      let arrayModelPhieuYTe =  [QuyMoBenhVien,
        HoaChat, NhienLieu, LuongNuocSuDung, ChatThaiSinhHoat,
        ChatThaiNguyHai,ChatThaiYTeKoNguyHai, ThongTinNuocThai, HoSoMoiTruong, KetLuanThanhTra ];

      let arrayModelPhieuXuLy =  [QuyMoHoatDong,HoaChat, NhienLieu, LuongNuocSuDung, ChatThaiSinhHoat, ChatThaiCongNghiep
      , ChatThaiNguyHai,NuocThaiCoSoXuLy, HoSoMoiTruong, KetLuanThanhTra ];

      let arrayModelPhieuBanQL =  [ThongTinDuAn, ChatThaiSinhHoat, ChatThaiNguyHai, XuLyNuocThai,
      HoSoMoiTruong, KetLuanThanhTra ];

      let promissAll
      let objRtn
      let thongtinphieu


      if(maphieu == "PHIEU_01" || maphieu == "PHIEU_02" || maphieu == "PHIEU_08" ){
        promissAll = arrayModelPhieuKKTvaLangNghe.map(model => {
          if(model == QuyMoHoatDong || model == NguyenVatLieu || model == HoaChat || model == NhienLieu  || model == LuongNuocSuDung ){
            return model.find({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'congnghesx_id', select: 'tencongnghesx' })
            .populate({ path: 'sanpham_id', select: 'tensanpham' })
            .populate({ path: 'nhienlieutieuthu_id', select: 'loainhienlieu' })
            .populate({ path: 'hoachatsudung_id', select: 'tenhoachat' })
            .populate({ path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu' })
            .populate({ path: 'donvi_id', select: 'tendonvi' });
          }
          return model.findOne({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'quanhuyentiepnhan_id' , select: 'tenqh' })
            .populate({ path: 'phuongxatiepnhan_id' , select: 'tenphuongxa' });
        });
        thongtinphieu = await Promise.all(promissAll);
        objRtn = {
          setting: setting,
          donviduocdieutra: phieudieutra,
          quymohoatdong: thongtinphieu[0],
          nguyenvatlieu: thongtinphieu[1],
          hoachat: thongtinphieu[2],
          nhienlieu: thongtinphieu[3],
          luongnuoc: thongtinphieu[4],
          chatthaisinhhoat: thongtinphieu[5],
          chatthaicongnghiep: thongtinphieu[6],
          chatthainguyhai: thongtinphieu[7],
          nuocthai: thongtinphieu[8],
          khithai: thongtinphieu[9],
          hosomoitruong: thongtinphieu[10],
          ketluanthanhtra: thongtinphieu[11]
        }
      } 
      else if(maphieu == "PHIEU_03") {
        promissAll = arrayModelPhieuChanNuoi.map(model => {
          if(model == QuyMoHoatDong || model == NguyenVatLieu || model == HoaChat || model == NhienLieu  || model == LuongNuocSuDung ){
            return model.find({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'congnghesx_id', select: 'tencongnghesx' })
            .populate({ path: 'sanpham_id', select: 'tensanpham' })
            .populate({ path: 'nhienlieutieuthu_id', select: 'loainhienlieu' })
            .populate({ path: 'hoachatsudung_id', select: 'tenhoachat' })
            .populate({ path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu' })
            .populate({ path: 'donvi_id', select: 'tendonvi' });
          }
          return model.findOne({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'quanhuyentiepnhan_id' , select: 'tenqh' })
            .populate({ path: 'phuongxatiepnhan_id' , select: 'tenphuongxa' });
        });
        thongtinphieu = await Promise.all(promissAll);
        objRtn = {
          setting: setting,
          donviduocdieutra: phieudieutra,
          quymochannuoi: thongtinphieu[0],
          nguyenvatlieu: thongtinphieu[1],
          hoachat: thongtinphieu[2],
          nhienlieu: thongtinphieu[3],
          luongnuoc: thongtinphieu[4],
          chatthaisinhhoat: thongtinphieu[5],
          chatthaichannuoi: thongtinphieu[6],
          chatthainguyhai: thongtinphieu[7],
          nuocthai: thongtinphieu[8],
          hosomoitruong: thongtinphieu[9],
          ketluanthanhtra: thongtinphieu[10]
      }}
      else if(maphieu == "PHIEU_04") {
        promissAll = arrayModelPhieuKhaiThacMo.map(model => {
          if(model == QuyMoHoatDong || model == NguyenVatLieu || model == HoaChat || model == NhienLieu  || model == LuongNuocSuDung ){
            return model.find({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'congnghesx_id', select: 'tencongnghesx' })
            .populate({ path: 'sanpham_id', select: 'tensanpham' })
            .populate({ path: 'nhienlieutieuthu_id', select: 'loainhienlieu' })
            .populate({ path: 'hoachatsudung_id', select: 'tenhoachat' })
            .populate({ path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu' })
            .populate({ path: 'donvi_id', select: 'tendonvi' });
          }
          return model.findOne({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'quanhuyentiepnhan_id' , select: 'tenqh' })
            .populate({ path: 'phuongxatiepnhan_id' , select: 'tenphuongxa' });
        });
        thongtinphieu = await Promise.all(promissAll);
        objRtn = {
          setting: setting,
          donviduocdieutra: phieudieutra,
          quymohoatdong: thongtinphieu[0],
          nguyenvatlieu: thongtinphieu[1],
          hoachat: thongtinphieu[2],
          nhienlieu: thongtinphieu[3],
          luongnuoc: thongtinphieu[4],
          chatthaisinhhoat: thongtinphieu[5],
          chatthaicongnghiep: thongtinphieu[6],
          chatthainguyhai: thongtinphieu[7],
          nuocthai: thongtinphieu[8],
          khithai: thongtinphieu[9],
          hosomoitruong: thongtinphieu[10],
          ketluanthanhtra: thongtinphieu[11]
        }
      }
      else if(maphieu == "PHIEU_05") {
        promissAll = arrayModelPhieuYTe.map(model => {
          if(model == QuyMoHoatDong || model == NguyenVatLieu || model == HoaChat || model == NhienLieu  || model == LuongNuocSuDung ){
            return model.find({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'congnghesx_id', select: 'tencongnghesx' })
            .populate({ path: 'sanpham_id', select: 'tensanpham' })
            .populate({ path: 'nhienlieutieuthu_id', select: 'loainhienlieu' })
            .populate({ path: 'hoachatsudung_id', select: 'tenhoachat' })
            .populate({ path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu' })
            .populate({ path: 'donvi_id', select: 'tendonvi' });
          }
          return model.findOne({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'quanhuyentiepnhan_id' , select: 'tenqh' })
            .populate({ path: 'phuongxatiepnhan_id' , select: 'tenphuongxa' });
        });
        thongtinphieu = await Promise.all(promissAll);
        objRtn = {
          setting: setting,
          donviduocdieutra: phieudieutra,
          quymobenhvien: thongtinphieu[0],
          hoachat: thongtinphieu[1],
          nhienlieu: thongtinphieu[2],
          luongnuoc: thongtinphieu[3],
          chatthaisinhhoat: thongtinphieu[4],
          chatthainguyhai: thongtinphieu[5],
          chatthaiytekonguyhai: thongtinphieu[6],
          nuocthai: thongtinphieu[7],
          hosomoitruong: thongtinphieu[8],
          ketluanthanhtra: thongtinphieu[9]
        }
      }
      else if(maphieu == "PHIEU_06") {
        promissAll = arrayModelPhieuXuLy.map(model => {
          if(model == QuyMoHoatDong || model == NguyenVatLieu || model == HoaChat || model == NhienLieu  || model == LuongNuocSuDung ){
            return model.find({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'congnghesx_id', select: 'tencongnghesx' })
            .populate({ path: 'sanpham_id', select: 'tensanpham' })
            .populate({ path: 'nhienlieutieuthu_id', select: 'loainhienlieu' })
            .populate({ path: 'hoachatsudung_id', select: 'tenhoachat' })
            .populate({ path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu' })
            .populate({ path: 'donvi_id', select: 'tendonvi' })
            .populate({path: 'loaihoatdong_id', select: 'tenloaihoatdong'});

          }
          return model.findOne({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'quanhuyentiepnhan_id' , select: 'tenqh' })
            .populate({ path: 'phuongxatiepnhan_id' , select: 'tenphuongxa' });
        });
        thongtinphieu = await Promise.all(promissAll);
        objRtn = {
          setting: setting,
          donviduocdieutra: phieudieutra,
          quymohoatdong: thongtinphieu[0],
          hoachat: thongtinphieu[1],
          nhienlieu: thongtinphieu[2],
          luongnuoc: thongtinphieu[3],
          chatthaisinhhoat: thongtinphieu[4],
          chatthaicongnghiep: thongtinphieu[5],
          chatthainguyhai: thongtinphieu[6],
          nuocthaicosoxuly: thongtinphieu[7],
          hosomoitruong: thongtinphieu[8],
          ketluanthanhtra: thongtinphieu[9]
        }
      }
      else if(maphieu == "PHIEU_07") {
        promissAll = arrayModelPhieuBanQL.map(model => {
          if(model == QuyMoHoatDong || model == NguyenVatLieu || model == HoaChat || model == NhienLieu  || model == LuongNuocSuDung ){
            return model.find({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'congnghesx_id', select: 'tencongnghesx' })
            .populate({ path: 'sanpham_id', select: 'tensanpham' })
            .populate({ path: 'nhienlieutieuthu_id', select: 'loainhienlieu' })
            .populate({ path: 'hoachatsudung_id', select: 'tenhoachat' })
            .populate({ path: 'nguyenvatlieu_id', select: 'tennguyenvatlieu' })
            .populate({ path: 'donvi_id', select: 'tendonvi' });
          }
          return model.findOne({phieudieutra_id: id, is_deleted: false})
            .populate({ path: 'quanhuyentiepnhan_id' , select: 'tenqh' })
            .populate({ path: 'phuongxatiepnhan_id' , select: 'tenphuongxa' });
        });
        thongtinphieu = await Promise.all(promissAll);
        objRtn = {
          setting: setting,
          donviduocdieutra: phieudieutra,
          thongtinduan: thongtinphieu[0],
          chatthaisinhhoat: thongtinphieu[1],
          chatthainguyhai: thongtinphieu[2],
          xulynuocthai: thongtinphieu[3],
          hosomoitruong: thongtinphieu[4],
          ketluanthanhtra: thongtinphieu[5]
        }
      }
      return res.json(objRtn)
  } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};


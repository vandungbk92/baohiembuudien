import * as responseAction from '../../utils/responseAction';
import CongNgheSanXuat from '../danhmuc/congnghesanxuat/congnghesanxuat.model';
import HoaChatSuDung from '../danhmuc/hoachatsudung/hoachatsudung.model';
import DMNguyenVatLieu from '../danhmuc/dmnguyenvatlieu/dmnguyenvatlieu.model';
import SanPham from '../danhmuc/sanpham/sanpham.model';
import DonVi from '../danhmuc/donvi/donvi.model';
import NhienLieuTieuThu from '../danhmuc/nhienlieutieuthu/nhienlieutieuthu.model';
import LoaiHoatDong from '../danhmuc/loaihoatdong/loaihoatdong.model';

export default {
  async getThongTinHoatDong(req, res) {
    try {
      let arrayModel = [CongNgheSanXuat, HoaChatSuDung, DMNguyenVatLieu, 
        SanPham, DonVi, NhienLieuTieuThu, LoaiHoatDong];
      let promissAll = arrayModel.map(model => {
        return model.find({is_deleted: false});
      });
      let thongtinchatthai = await Promise.all(promissAll);
      let objRtn = {
        congnghesanxuat: thongtinchatthai[0],
        hoachat: thongtinchatthai[1],
        nguyenvatlieu: thongtinchatthai[2],
        sanpham: thongtinchatthai[3],
        donvi: thongtinchatthai[4],
        nhienlieu: thongtinchatthai[5],
        loaihoatdong: thongtinchatthai[6],
      }
      return res.json(objRtn)
    } catch (err) {
      return responseAction.error(res, 500, err.errors)
    }
  },
};

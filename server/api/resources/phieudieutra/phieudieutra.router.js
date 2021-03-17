import express from 'express';
import passport from 'passport';
import phieudieutraController from './phieudieutra.controller';
import quymohoatdongController from './controller/quymohoatdong.controller';
import luongnuocsudungController from './controller/luongnuocsudung.controller';
import hoachatController from './controller/hoachat.controller';
import nhienlieuController from './controller/nhienlieu.controller';
import nguyenvatlieuController from './controller/nguyenvatlieu.controller';
import quymochannuoiController from './controller/quymochannuoi.controller';
import quymobenhvienController from './controller/quymobenhvien.controller';
import thongtinhoachatController from './controller/thongtinchatthai.controller';
import hosomoitruongController from './controller/hosomoitruong.controller';
import ketluanthanhtraController from './controller/ketluanthanhtra.controller';
import thongtinduanController from './controller/thongtinduan.controller';
import inphieuController from './controller/inphieu.controller';

export const phieudieutraRouter = express.Router();

phieudieutraRouter.post('/',passport.authenticate('jwt', { session: false }), phieudieutraController.create)
phieudieutraRouter.get('/',passport.authenticate('jwt', { session: false }), phieudieutraController.findAll);

phieudieutraRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), phieudieutraController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), phieudieutraController.delete)
  .put(passport.authenticate('jwt', { session: false }), phieudieutraController.update)

phieudieutraRouter.get('/loaiphieu/:id',passport.authenticate('jwt', { session: false }), phieudieutraController.findALLByLoaiPhieu)

// quy mô hoạt động
phieudieutraRouter.get('/:id/quy-mo-hoat-dong', passport.authenticate('jwt', { session: false }), quymohoatdongController.getDsQuyMoHoatDong)
phieudieutraRouter.post('/:id/quy-mo-hoat-dong', passport.authenticate('jwt', { session: false }), quymohoatdongController.create)

phieudieutraRouter.get('/:id/luong-nuoc-su-dung', passport.authenticate('jwt', { session: false }), luongnuocsudungController.getDsLuongNuoc)
phieudieutraRouter.post('/:id/luong-nuoc-su-dung', passport.authenticate('jwt', { session: false }), luongnuocsudungController.create)

phieudieutraRouter.get('/:id/hoa-chat', passport.authenticate('jwt', { session: false }), hoachatController.getDsHoaChat)
phieudieutraRouter.post('/:id/hoa-chat', passport.authenticate('jwt', { session: false }), hoachatController.create)

phieudieutraRouter.get('/:id/nhien-lieu', passport.authenticate('jwt', { session: false }), nhienlieuController.getDsNhienLieu)
phieudieutraRouter.post('/:id/nhien-lieu', passport.authenticate('jwt', { session: false }), nhienlieuController.create)

phieudieutraRouter.get('/:id/nguyen-vat-lieu', passport.authenticate('jwt', { session: false }), nguyenvatlieuController.getDsNguyenVatLieu);
phieudieutraRouter.post('/:id/nguyen-vat-lieu', passport.authenticate('jwt', { session: false }), nguyenvatlieuController.create);

phieudieutraRouter.get('/:id/thong-tin-du-an', passport.authenticate('jwt', { session: false }), thongtinduanController.getThongTinDuAn);
phieudieutraRouter.get('/:id/quy-mo-chan-nuoi', passport.authenticate('jwt', { session: false }), quymochannuoiController.getDsQuyMoChanNuoi);
phieudieutraRouter.get('/:id/quy-mo-benh-vien', passport.authenticate('jwt', { session: false }), quymobenhvienController.getDsQuyMoBenhVien);
phieudieutraRouter.get('/:id/ho-so-moi-truong', passport.authenticate('jwt', { session: false }), hosomoitruongController.getDsHoSoMoiTruong);
phieudieutraRouter.get('/:id/ket-luan-thanh-tra', passport.authenticate('jwt', { session: false }), ketluanthanhtraController.getDsKetLuanThanhTra);
phieudieutraRouter.get('/:id/thong-tin-chat-thai', thongtinhoachatController.getThongTinChatThai);
phieudieutraRouter.post('/:id/thong-tin-chat-thai', passport.authenticate('jwt', { session: false }), thongtinhoachatController.postThongTinChatThai);
phieudieutraRouter.get('/:id/in-phieu', inphieuController.getDataPhieu);

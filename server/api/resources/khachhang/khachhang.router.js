import express from 'express';
import passport from 'passport';
import benhnhanController from './khachhang.controller';
import bnkhambenhController from "./bnkhambenh.controller";
import thongbaobenhnhanController from "../thongbaobenhnhan/thongbaobenhnhan.controller";
import lichhenController from "../lichhen/lichhen.controller";
import hoidapController from "../dmhoidap/hoidap/hoidap.controller";
import danhgiadichvuController from "../danhgiadichvu/danhgiadichvu.controller";

export const benhnhanRouter = express.Router();

benhnhanRouter.post('/dang-ky', benhnhanController.signup);
benhnhanRouter.post('/dang-nhap', benhnhanController.login);

// benhnhanRouter.post('/xac-thuc-dien-thoai', passport.authenticate('jwt', { session: false }), benhnhanController.xacthucdienthoai);
benhnhanRouter.post('/xac-thuc-dien-thoai', benhnhanController.xacthucdienthoaiToken);
benhnhanRouter.post('/thay-doi-dien-thoai', passport.authenticate('jwt', { session: false }), benhnhanController.thaydoidienthoaiToken);
benhnhanRouter.put('/tai-khoan', passport.authenticate('jwt', { session: false }), benhnhanController.capnhatTaiKhoan);

benhnhanRouter.get('/me', passport.authenticate('jwt', { session: false }), benhnhanController.authenticate);


benhnhanRouter.post('/register-device', passport.authenticate('jwt', { session: false }), benhnhanController.registerDevice);
benhnhanRouter.post('/unregister-device', passport.authenticate('jwt', { session: false }), benhnhanController.unregisterDevice);

// api cập nhật thông tin user
benhnhanRouter.put('/info', passport.authenticate('jwt', { session: false }), benhnhanController.updateInfo);
benhnhanRouter.put('/change-password', passport.authenticate('jwt', { session: false }), benhnhanController.changePassword);
benhnhanRouter.post('/forgot-password-mail', benhnhanController.forgotPasswordMail);
benhnhanRouter.put('/reset-password', passport.authenticate('jwt', { session: false }), benhnhanController.resetPassword);

benhnhanRouter.get('/', passport.authenticate('jwt', { session: false }),  benhnhanController.findAll);
// api bệnh nhân lấy danh sách đăng ký của chính mình.
benhnhanRouter.get('/dangky', passport.authenticate('jwt', { session: false }),  bnkhambenhController.dsDangKyBenhNhan);
benhnhanRouter.get('/donthuoc', passport.authenticate('jwt', { session: false }),  bnkhambenhController.dsDonThuocBenhNhan);
benhnhanRouter.get('/dienbien', passport.authenticate('jwt', { session: false }),  bnkhambenhController.dsDienBienBenhNhan);
benhnhanRouter.get('/ketquacls', passport.authenticate('jwt', { session: false }),  bnkhambenhController.dsKetQuaCLSBenhNhan);
benhnhanRouter.get('/thongbao', passport.authenticate('jwt', { session: false }),  thongbaobenhnhanController.findAll);
benhnhanRouter.put('/thongbao', passport.authenticate('jwt', { session: false }),  thongbaobenhnhanController.readAll);
benhnhanRouter.get('/thongbaochuadoc', passport.authenticate('jwt', { session: false }),  thongbaobenhnhanController.thongbaochuadoc);
benhnhanRouter.get('/hoidap', passport.authenticate('jwt', { session: false }),  hoidapController.dsCauHoiBenhNhan);
benhnhanRouter.get('/lich-hen', passport.authenticate('jwt', { session: false }),  lichhenController.dsLichHenBenhNhan);
benhnhanRouter.get('/danh-gia-dich-vu', passport.authenticate('jwt', { session: false }),  danhgiadichvuController.dsDanhGiaDvBenhNhan);
benhnhanRouter.post('/danh-gia-dich-vu', passport.authenticate('jwt', { session: false }),  danhgiadichvuController.danhgiaDichVu);
benhnhanRouter.get('/luot-danh-gia', passport.authenticate('jwt', { session: false }),  danhgiadichvuController.dsLuotDanhGiaBenhNhan);

benhnhanRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), benhnhanController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), benhnhanController.delete)
  .put(passport.authenticate('jwt', { session: false }), benhnhanController.update);

// api khám bệnh
benhnhanRouter.get('/:id/dangky', passport.authenticate('jwt', { session: false }),  bnkhambenhController.dsDangKy);
benhnhanRouter.get('/:id/donthuoc', passport.authenticate('jwt', { session: false }),  bnkhambenhController.dsDonThuocBenhNhan);
benhnhanRouter.get('/:id/ketquacls', passport.authenticate('jwt', { session: false }),  bnkhambenhController.dsKetQuaCLSBenhNhan);




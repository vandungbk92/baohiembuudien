import express from "express";

import userRouter from "./api/resources/user/user.router";
import { phuongxaRouter } from './api/resources/danhmuc/phuongxa/phuongxa.router';
import { quanhuyenRouter } from './api/resources/danhmuc/quanhuyen/quanhuyen.router';
import { tinhthanhRouter } from './api/resources/danhmuc/tinhthanh/tinhthanh.router';
import { imgUploadRouter } from './api/resources/imgUploadLocal/imgUpload.router';
import { loaiphieuRouter } from './api/resources/danhmucloaiphieu/loaiphieu.router';
import { settingRouter } from './api/resources/setting/setting.router';
import { loaihinhkinhteRouter } from './api/resources/danhmucdulieu/loaihinhkinhtebenhvien/loaihinhkinhte.router';
import { loaihinhthuchienRouter } from './api/resources/danhmucdulieu/loaihinhthuchienxuly/loaihinhthuchien.router';
import { xephangcsytRouter } from './api/resources/danhmucdulieu/XepHangCSYT/xephangcsyt.router';
import { donviduocdieutraRouter } from './api/resources/donviduocdieutra/donviduocdieutra.router';
import { dmdonviduocdieutraRouter } from './api/resources/danhmucdulieu/dmdonviduocdieutra/dmdonviduocdieutra.router';
import { hoatdongdonviRouter } from './api/resources/danhmucdulieu/hoatdongdonvi/hoatdongdonvi.router';
// import { quymohoatdongRouter } from './api/resources/danhmucdulieu/hoatdongsanxuat/quymohoatdong/quymohoatdong.router';
import { sanphamRouter } from './api/resources/danhmuc/sanpham/sanpham.router';
import { congnghesanxuatRouter } from './api/resources/danhmuc/congnghesanxuat/congnghesanxuat.router';
import { donviRouter } from './api/resources/danhmuc/donvi/donvi.router';
import { dmnguyenvatlieuRouter } from './api/resources/danhmuc/dmnguyenvatlieu/dmnguyenvatlieurouter';
import { hoachatsudungRouter } from './api/resources/danhmuc/hoachatsudung/hoachatsudung.router';
import { phieudieutraRouter } from './api/resources/phieudieutra/phieudieutra.router';
import { chatthaisinhhoatRouter } from './api/resources/thongtinchatthai/chatthaisinhhoat/chatthaisinhhoat.router';
import { chatthaicongnghiepRouter } from './api/resources/thongtinchatthai/chatthaicongnghiep/chatthaicongnghiep.router';
import { chatthainguyhaiRouter } from './api/resources/thongtinchatthai/chatthainguyhai/chatthainguyhai.router';
import { chatthaichannuoiRouter } from './api/resources/thongtinchatthai/chatthaichannuoi/chatthaichannuoi.router';
import { chatthaiytekonguyhaiRouter } from './api/resources/thongtinchatthai/chatthaiytekonguyhai/chatthaiytekonguyhai.router';
import { nhienlieutieuthuRouter } from './api/resources/danhmuc/nhienlieutieuthu/nhienlieutieuthu.router';
import { loaihinhchannuoiRouter } from './api/resources/danhmuc/loaihinhchannuoi/loaihinhchannuoi.router';
import { loaihoatdongRouter } from './api/resources/danhmuc/loaihoatdong/loaihoatdong.router';
import { xulynuocthaiRouter } from './api/resources/thongtinchatthai/xulynuocthai/xulynuocthai.router';
import { thongtinnuocthaiRouter } from './api/resources/thongtinchatthai/thongtinnuocthai/thongtinnuocthai.router';
import { thongtinkhithaiRouter } from './api/resources/thongtinchatthai/thongtinkhithai/thongtinkhithai.router';
import { quymohoatdongRouter } from './api/resources/thongtinhoatdong/quymohoatdong/quymohoatdong.router';
import { luongnuocsudungRouter } from './api/resources/thongtinhoatdong/luongnuocsudung/luongnuocsudung.router';
import { hoachatRouter } from './api/resources/thongtinhoatdong/hoachat/hoachat.router';
import { nhienlieuRouter } from './api/resources/thongtinhoatdong/nhienlieu/nhienlieu.router';
import { nguyenvatlieuRouter } from './api/resources/thongtinhoatdong/nguyenvatlieu/nguyenvatlieu.router';
import { quymochannuoiRouter } from './api/resources/thongtinhoatdong/quymochannuoi/quymochannuoi.router';
import { quymobenhvienRouter } from './api/resources/thongtinhoatdong/quymobenhvien/quymobenhvien.router';
import { thongtinduanRouter } from './api/resources/thongtinhoatdong/thongtinduan/thongtinduan.router';
import { hosomoitruongRouter } from './api/resources/hosomoitruong/hosomoitruong.router';
import { ketluanthanhtraRouter } from './api/resources/ketluanthanhtra/ketluanthanhtra.router';
import {donvitinhRouter} from './api/resources/cuahangdungcu/donvitinh/donvitinh.router';
import { thongtinhoatdongRouter } from './api/resources/thongtinhoatdong/thongtinhoatdong.router';
import {proshopRouter} from './api/resources/cuahangdungcu/proshop/proshop.router';
import {trangthaiRouter} from './api/resources/cuahangdungcu/trangthai/trangthai.router';
import{mucthanhvienRouter} from './api/resources/mucthanhvien/mucthanhvien.router';
import {trangthaicaddyRouter} from './api/resources/quanlycaddy/trangthaicaddy/trangthaicaddy.router';
import {caddyRouter} from './api/resources/quanlycaddy/caddy/caddy.router';
import {voucherRouter} from './api/resources/quanlyvoucher/voucher/voucher.router';
import {trangthaivoucherRouter} from './api/resources/quanlyvoucher/trangthaivoucher/trangthaivoucher.router';
import {fnbRouter} from './api/resources/fnb/fnb/fnb.router'
import {trangthaifnbRouter} from './api/resources/fnb/trangthai/trangthaifnb.router';
import {danhmuctintucRouter} from './api/resources/tintucsangolf/danhmuctintuc/danhmucsangolf.router';
import {tintucRouter} from './api/resources/tintucsangolf/tintuc/sangolf.router';
const router = express.Router();
router.use('/trang-thai-voucher', trangthaivoucherRouter);
router.use('/voucher', voucherRouter);
router.use('/fnb',fnbRouter);
router.use('/trang-thai-fnb', trangthaifnbRouter)
router.use('/trang-thai-caddy', trangthaicaddyRouter);
router.use('/caddy', caddyRouter);
router.use('/muc-thanh-vien', mucthanhvienRouter);
router.use('/proshop', proshopRouter);
router.use('/trang-thai', trangthaiRouter);
router.use('/users', userRouter);
router.use('/setting', settingRouter);
router.use('/tinh-thanh', tinhthanhRouter);
router.use('/quan-huyen', quanhuyenRouter);
router.use('/phuong-xa', phuongxaRouter);
router.use('/files', imgUploadRouter);
router.use('/loai-phieu', loaiphieuRouter);
router.use('/loai-hinh-kinh-te', loaihinhkinhteRouter);
router.use('/loai-hinh-thuc-hien', loaihinhthuchienRouter);
router.use('/xep-hang-csyt', xephangcsytRouter);
router.use('/don-vi-duoc-dieu-tra', donviduocdieutraRouter);
router.use('/dm-don-vi-duoc-dieu-tra', dmdonviduocdieutraRouter);
router.use('/hoat-dong-don-vi', hoatdongdonviRouter);
router.use('/thong-tin-hoat-dong', thongtinhoatdongRouter);
router.use('/don-vi-tinh', donvitinhRouter);
// Phiếu điều tra.
router.use('/phieu-dieu-tra', phieudieutraRouter);
router.use('/quy-mo-hoat-dong', quymohoatdongRouter);
router.use('/luong-nuoc-su-dung', luongnuocsudungRouter);
router.use('/quy-mo-chan-nuoi', quymochannuoiRouter);
router.use('/quy-mo-benh-vien', quymobenhvienRouter);
router.use('/ho-so-moi-truong', hosomoitruongRouter);
router.use('/ket-luan-thanh-tra', ketluanthanhtraRouter);
router.use('/thong-tin-du-an', thongtinduanRouter);
router.use('/tin-tuc',tintucRouter);
router.use('/danhmuc-tin-tuc',danhmuctintucRouter);



router.use('/san-pham', sanphamRouter);
router.use('/cong-nghe-san-xuat', congnghesanxuatRouter);
router.use('/hoa-chat-su-dung', hoachatsudungRouter);
router.use('/don-vi', donviRouter);
router.use('/dm-nguyen-vat-lieu', dmnguyenvatlieuRouter);

router.use('/chat-thai-sinh-hoat', chatthaisinhhoatRouter);
router.use('/chat-thai-cong-nghiep', chatthaicongnghiepRouter);
router.use('/chat-thai-nguy-hai', chatthainguyhaiRouter);
router.use('/chat-thai-chan-nuoi', chatthaichannuoiRouter);
router.use('/chat-thai-yte-ko-nguy-hai', chatthaiytekonguyhaiRouter);
router.use('/nhien-lieu-tieu-thu', nhienlieutieuthuRouter);
router.use('/loai-hinh-chan-nuoi', loaihinhchannuoiRouter);
router.use('/loai-hoat-dong', loaihoatdongRouter);
router.use('/xu-ly-nuoc-thai', xulynuocthaiRouter);
router.use('/thong-tin-nuoc-thai', thongtinnuocthaiRouter);
router.use('/thong-tin-khi-thai', thongtinkhithaiRouter);
router.use('/nguyen-vat-lieu', nguyenvatlieuRouter);
router.use('/hoa-chat', hoachatRouter);
router.use('/nhien-lieu', nhienlieuRouter);






module.exports = router;

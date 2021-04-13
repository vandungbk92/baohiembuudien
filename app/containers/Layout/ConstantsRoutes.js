import React from 'react';
import {
  FileTextOutlined,
  HomeOutlined,
  InsertRowLeftOutlined,
  WeiboCircleOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  MedicineBoxOutlined,
  AreaChartOutlined,
  DollarOutlined,
  SisternodeOutlined,
  OneToOneOutlined,
  DollarCircleFilled,
  HistoryOutlined,
  CloudSyncOutlined,
  ImportOutlined,
  ExportOutlined,
} from '@ant-design/icons';

import { URL } from '@url';
import { CONSTANTS } from '@constants';

import HomePage from '../Pages/HomePage/Loadable';
import Profile from '../Pages/Profile/Loadable';
import Setting from '../Pages/Setting/Loadable';

import NotFoundPage from '../Pages/NotFoundPage/Loadable';

import TinhThanh from '@containers/Pages/DanhMuc/TinhThanh/Loadable';
import QuanHuyen from '@containers/Pages/DanhMuc/QuanHuyen/Loadable';
import PhuongXa from '@containers/Pages/DanhMuc/PhuongXa/Loadable';
import TaiKhoan from '@containers/Pages/TaiKhoan/Loadable';
import DonViDuocDieuTra from '@containers/Pages/DonViDuocDieuTra/Loadable';
import DonViDuocDieuTraChiTiet from '@containers/Pages/DonViDuocDieuTra/ChiTiet/Loadable';
import DanhMucLoaiPhieu from '@containers/Pages/DanhMucLoaiPhieu/Loadable';
import DanhMucLoaiPhieuChiTiet from '@containers/Pages/DanhMucLoaiPhieu/ChiTiet/Loadable';
import LoaiHinhKinhTe from '@containers/Pages/DanhMucDuLieu/LoaiHinhKinhTeBenhVien/Loadable';
import LoaiHinhThucHien from '@containers/Pages/DanhMucDuLieu/LoaiHinhThucHienXuLy/Loadable';
import XepHangCSYT from '@containers/Pages/DanhMucDuLieu/XepHangCSYT/Loadable';
import DMDonViDuocDieuTra from '@containers/Pages/DanhMucDuLieu/DanhMucDonViDuocDieuTra/Loadable';
import HoatDongDonVi from '@containers/Pages/DanhMucDuLieu/HoatDongDonVi/Loadable';
import SanPham from '@containers/Pages/DanhMuc/SanPham/Loadable';
import CongNgheSanXuat from '@containers/Pages/DanhMuc/CongNgheSanXuat/Loadable';
import DonVi from '@containers/Pages/DanhMuc/DonVi/Loadable';
import HoaChatSuDung from '@containers/Pages/DanhMuc/HoaChatSuDung/Loadable';
import DMNguyenVatLieu from '@containers/Pages/DanhMuc/DMNguyenVatLieu/Loadable';
import DanhSachPhieu from '@containers/Pages/PhieuDieuTra/DanhSachPhieu/Loadable';
import PhieuDieuTraChiTiet from '@containers/Pages/PhieuDieuTra/ChiTiet/Loadable';
import NhienLieuTieuThu from '@containers/Pages/DanhMuc/NhienLieuTieuThu/Loadable';
import LoaiHinhChanNuoi from '@containers/Pages/DanhMuc/QuyMoBenhVien/Loadable';
import QuyMoBenhVien from '@containers/Pages/DanhMuc/LoaiHinhChanNuoi/Loadable';
import LoaiHoatDong from '@containers/Pages/DanhMuc/LoaiHoatDong/Loadable';
import DonViTinh from '@containers/Pages/cuahangdungcu/DonViTinh/Loadable';
import ProShop from '@containers/Pages/cuahangdungcu/ProShop/Loadable';
import TrangThai from '@containers/Pages/cuahangdungcu/TrangThai/Loadable';
import ProShopChiTiet from '@containers/Pages/cuahangdungcu/ProShop/ChiTiet/Loadable';
import MucThanhVien from '@containers/Pages/MucThanhVien/Loadable';
import MucThanhVienChiTiet from '@containers/Pages/MucThanhVien/ChiTiet/Loadable';
import Caddy from '@containers/Pages/QuanLyCaddy/Caddy/Loadable';
import CaddyChiTiet from '@containers/Pages/QuanLyCaddy/Caddy/ChiTiet/Loadable';
import TrangThaiCaddy from '@containers/Pages/QuanLyCaddy/TrangThaiCaddy/Loadable';
import Voucher from '@containers/Pages/QuanLyVoucher/Voucher/Loadable';
import VoucherChiTiet from '@containers/Pages/QuanLyVoucher/Voucher/ChiTiet/Loadable';
import TrangThaiVoucher from '@containers/Pages/QuanLyVoucher/TrangThaiVoucher/Loadable';
function renderMenuIcon(icon) {
  return (
    <span className="anticon m-0" style={{ transform: 'translateY(-2px)' }}>
      <i className={`fa ${icon} menu-icon`} aria-hidden="true"/>
    </span>
  );
}

const constantsRoutes = [
  {
    path: URL.HOMEPAGE,
    menuName: 'Trang chủ',
    component: HomePage,
    icon: <HomeOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  
  {
    path: URL.CATEGORY,
    breadcrumbName: 'Quản lý Caddy',
    menuName: 'Quản lý caddy',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.CADDY, menuName: 'Caddy', exact: true, component: Caddy, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
   
      { path: URL.TRANG_THAI_CADDY, menuName: 'Trạng thái Caddy', exact: true, component: TrangThaiCaddy, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/caddy/add',
    component: CaddyChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: '/caddy/:id',
    component: CaddyChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  

  {
    path: URL.CATEGORY,
    breadcrumbName: 'Quản lý Voucher',
    menuName: 'Quản lý Voucher',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.VOUCHER, menuName: 'Voucher', exact: true, component: Voucher, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
   
      { path: URL.TRANG_THAI_VOUCHER, menuName: 'Trạng thái Voucher', exact: true, component: TrangThaiVoucher, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/voucher/add',
    component: VoucherChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: '/voucher/:id',
    component: VoucherChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: URL.CATEGORY,
    breadcrumbName: 'Cửa hàng dụng cụ',
    menuName: 'Cửa hàng dụng cụ',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.DON_VI_TINH, menuName: 'Đơn vị tính', exact: true, component: DonViTinh, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.PROSHOP, menuName: 'ProShop', exact: true, component: ProShop, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.TRANG_THAI, menuName: 'Trạng thái', exact: true, component: TrangThai, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/proshop/add',
    component: ProShopChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: '/proshop/:id',
    component: ProShopChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  

  {
    path: '/muc-thanh-vien',
    menuName: 'Chi tiết mức thành viên',
    component: MucThanhVien,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/muc-thanh-vien/add',
    component: MucThanhVienChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/muc-thanh-vien/:id',
    component: MucThanhVienChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  // Đơn vị được điều tra


  // {
  //   path: URL.CATEGORY,
  //   breadcrumbName: 'Danh mục chung',
  //   menuName: 'Danh mục chung',
  //   icon: <InsertRowLeftOutlined/>,
  //   children: [
  //     { path: URL.SAN_PHAM, menuName: 'Sản phẩm', component: SanPham, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //     {
  //       path: URL.CONG_NGHE_SAN_XUAT,
  //       menuName: 'Công nghệ sản xuất',
  //       component: CongNgheSanXuat,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //     {
  //       path: URL.DM_NGUYEN_VAT_LIEU,
  //       menuName: 'Nguyên, vật liệu',
  //       component: DMNguyenVatLieu,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //     { path: URL.DON_VI, menuName: 'Đơn vị', component: DonVi, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //     { path: URL.HOA_CHAT_SU_DUNG, menuName: 'Hóa chất sử dụng', component: HoaChatSuDung, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //     // {
  //     //   path: URL.LOAI_HINH_CHAN_NUOI,
  //     //   menuName: 'Loại hình chăn nuôi',
  //     //   component: LoaiHinhChanNuoi,
  //     //   role: [CONSTANTS.ADMIN],
  //     // },
  //     { path: URL.LOAI_HOAT_DONG, menuName: 'Loại hoạt động', component: LoaiHoatDong, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //     // { path: URL.QUY_MO_BENH_VIEN, menuName: 'Quy mô bệnh viện', component: QuyMoBenhVien, role: [CONSTANTS.ADMIN] },
  //     {
  //       path: URL.NHIEN_LIEU_TIEU_THU,
  //       menuName: 'Nhiên liệu tiêu thụ',
  //       component: NhienLieuTieuThu,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //     { path: URL.TINH_THANH, menuName: 'Tỉnh thành', component: TinhThanh, role: [CONSTANTS.ADMIN] },
  //     { path: URL.QUAN_HUYEN, menuName: 'Quận huyện', component: QuanHuyen, role: [CONSTANTS.ADMIN] },
  //     { path: URL.PHUONG_XA, menuName: 'Phường xã', component: PhuongXa, role: [CONSTANTS.ADMIN] },
  //   ],
  //   role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  // },


  // {
  //   path: URL.CATEGORY,
  //   breadcrumbName: 'Danh mục dữ liệu',
  //   menuName: 'Danh mục dữ liệu',
  //   icon: <InsertRowLeftOutlined/>,
  //   children: [
  //     {
  //       path: URL.HOAT_DONG_DON_VI,
  //       menuName: 'Hoạt động của đơn vị được điều tra',
  //       component: HoatDongDonVi,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //     {
  //       path: URL.DM_DON_VI_DUOC_DIEU_TRA,
  //       menuName: 'Danh mục đơn vị được điều tra',
  //       component: DMDonViDuocDieuTra,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //     {
  //       path: URL.LOAI_HINH_THUC_HIEN,
  //       menuName: 'Loại hình thực hiện xử lý',
  //       component: LoaiHinhThucHien,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //     {
  //       path: URL.LOAI_HINH_KINH_TE,
  //       menuName: 'Loại hình kinh tế của bệnh viện',
  //       component: LoaiHinhKinhTe,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //     {
  //       path: URL.XEP_HANG_CSYT,
  //       menuName: 'Xếp hạng cơ sở y tế',
  //       component: XepHangCSYT,
  //       role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  //     },
  //   ],
  //   role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  // },

  {
    path: URL.TAI_KHOAN,
    menuName: 'Quản lý tài khoản',
    component: TaiKhoan,
    icon: renderMenuIcon('fa-user-md'),
    exact: true,
    role: [CONSTANTS.ADMIN],
  },

  {
    path: URL.SETTING,
    menuName: 'Cấu hình',
    component: Setting,
    icon: renderMenuIcon('fa-user-md'),
    exact: true,
    role: [CONSTANTS.ADMIN],
  },
];

export default constantsRoutes;

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
import Profile from 'Pages/Profile';
import HomePage from '../Pages/HomePage/Loadable';
import DanhMucHuongDan from '@containers/Pages/HuongDan/DanhmucHuongDan/Loadable';
import HuongDan from '@containers/Pages/HuongDan/HuongDan/Loadable';
import ChiTietHuongDan from '@containers/Pages/HuongDan/HuongDan/Chitiet/Loadable';
import NotFoundPage from '../Pages/NotFoundPage/Loadable';
import CauHoiThuongGap from '@containers/Pages/CauHoiThuongGap/Loadable';
import TaiKhoan from '@containers/Pages/TaiKhoan/Loadable';
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
import TrangThaiJob from '@containers/Pages/Job/trangThaiJob/Loadable';
import Job from '@containers/Pages/Job/Loadable';
import JobChiTiet from '@containers/Pages/Job/chitiet/Loadable';
import Solo from '@containers/Pages/SoloGolf/solo/Loadable';
import SoloChiTiet from '@containers/Pages/SoloGolf/solo/chitiet/Loadable';
import TrangThaiSolo from '@containers/Pages/SoloGolf/trangthai/Loadable';
import FnB from '@containers/Pages/FnB/FnB/Loadable';
import FnBChiTiet from '@containers/Pages/FnB/FnB/ChiTiet/Loadable';
import TrangThaiFnB from '@containers/Pages/FnB/TrangThaiFnB/Loadable';
import DanhmucTintuc from '@containers/Pages/TinTucSanGolf/Danhmuctintuc/Loadable';
import Tintuc from '@containers/Pages/TinTucSanGolf/Tintuc/Loadable';
import TintucChitiet from '@containers/Pages/TinTucSanGolf/Tintuc/Chitiet/Loadable';
import TinhThanh from '@containers/Pages/DanhMuc/TinhThanh/Loadable';
import QuanHuyen from '@containers/Pages/DanhMuc/QuanHuyen/Loadable';
import PhuongXa from '@containers/Pages/DanhMuc/PhuongXa/Loadable';
import ChiTietDanhGia from '@containers/Pages/DanhGia/ChiTietDanhGia/Loadable';
import ThongKeDanhGia from '@containers/Pages/DanhGia/ThongKeDanhGia/Loadable';
import ChiTietDanhGiaDichVu from '@containers/Pages/DanhGia/ChiTietDanhGiaDichVu/Loadable';
import ThongKeDanhGiaDichVu from '@containers/Pages/DanhGia/ThongKeDanhGiaDichVu/Loadable';
import DanhmucDanhGia from '@containers/Pages/DanhGia/DanhMucDanhGia/Loadable';
import ThongTinChung from '@containers/Pages/ThongTinChung/Loadable';
import LichSanGolf from 'Pages/QuanLyLichSanGolf/LichSanGolf/LichSanGolf/LichSuLichLamViec';
import KhungGioSanGolf from 'Pages/QuanLyLichSanGolf/KhungGioSanGofl';
import ChiTietLichSanGolf from 'Pages/QuanLyLichSanGolf/LichSanGolf/LichSanGolf/ThemMoiLich';

function renderMenuIcon(icon) {
  return (
    <span className="anticon m-0" style={{ transform: 'translateY(-2px)' }}>
      <i className={`fa ${icon} menu-icon`} aria-hidden="true"/>
    </span>
  );
}

const constantsRoutes = [
  {
    path: URL.PROFILE,
    breadcrumbName: 'Hồ sơ cá nhân',
    component: Profile,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: URL.HOMEPAGE,
    menuName: 'Trang chủ',
    component: HomePage,
    icon: <HomeOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  //quản lý công việc

  {
    path: URL.CATEGORY,
    breadcrumbName: 'Quản lý Lịch hẹn',
    menuName: 'Quản lý Lịch hẹn',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.JOB, menuName: 'Công việc', exact: true, component: Job, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
   
      { path: URL.TRANG_THAI_JOB, menuName: 'Trạng thái Công việc', exact: true, component: TrangThaiJob, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/job/add',
    component: JobChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  //kết thúc
  
  {
    path: URL.CATEGORY,
    breadcrumbName: 'Lịch sân Golf',
    menuName: 'Lịch sân Golf',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.LICH_SAN_GOLF, menuName: 'Lịch sân golf', exact: true, component: LichSanGolf, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
   
      { path: URL.KHUNG_GIO_SAN_GOLF, menuName: 'Khung giờ sân ', exact: true, component: KhungGioSanGolf, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: URL.CATEGORY,
    breadcrumbName: 'Quản lý Caddy',
    menuName: 'Quản lý Caddy',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.CADDY, menuName: 'Caddy', exact: true, component: Caddy, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },

      { path: URL.TRANG_THAI_CADDY, menuName: 'Trạng thái Caddy', exact: true, component: TrangThaiCaddy, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },

    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: '/lich-san-golf/add',
    component: ChiTietLichSanGolf,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: '/lich-san-golf/:id',
    component: ChiTietLichSanGolf,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
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
  
  // {
  //   path: URL.CATEGORY,
  //   breadcrumbName: 'Quản lý FnB',
  //   menuName: 'Quản lý FnB',
  //   icon: <InsertRowLeftOutlined/>,
  //   children: [
  //     { path: URL.FNB, menuName: 'FnB', exact: true, component: FnB, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //
  //     { path: URL.TRANG_THAI_FNB, menuName: 'Trạng thái FnB', exact: true, component: TrangThaiFnB, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //
  //   ],
  //   role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  // },
  {
    path: '/fnb/add',
    component: FnBChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: '/fnb/:id',
    component: FnBChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: `${URL.TINTUC}/add`,
    exact: true,
    component: TintucChitiet,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: `${URL.TINTUC}/:id`,
    exact: true,
    component: TintucChitiet,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: `${URL.TINTUC}`,
    exact: true,
    component: Tintuc,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    menuName: 'Tin tức sân golf',
    icon: renderMenuIcon('fa-newspaper-o'),
    children: [
      { path: URL.TINTUC, menuName: 'Tin tức', component: Tintuc, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.DANHMUC_TINTUC, menuName: 'Danh mục tin tức', component: DanhmucTintuc, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
    ],
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


  //SỐ LỖ GOLF

  
  // {
  //   path: URL.CATEGORY,
  //   breadcrumbName: 'Danh mục chung',
  //   menuName: 'Danh mục chung',
  //   icon: <InsertRowLeftOutlined/>,
  //   children: [
  //     { path: URL.SOLO, menuName: 'Số lỗ golf', exact: true, component: Solo, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //     { path: URL.TRANG_THAI_SOLO, menuName: 'Số lỗ', exact: true, component: TrangThaiSolo, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //
  //   ],
  //   role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  // },
  {
    path: '/solo/add',
    component: SoloChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  {
    path: '/solo/:id',
    component: SoloChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  // {
  //   path: URL.CATEGORY,
  //   breadcrumbName: 'Cửa hàng dụng cụ',
  //   menuName: 'Cửa hàng dụng cụ',
  //   icon: <InsertRowLeftOutlined/>,
  //   children: [
  //     { path: URL.DON_VI_TINH, menuName: 'Đơn vị tính', exact: true, component: DonViTinh, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //     { path: URL.PROSHOP, menuName: 'ProShop', exact: true, component: ProShop, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //     { path: URL.TRANG_THAI, menuName: 'Trạng thái', exact: true, component: TrangThai, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  //
  //   ],
  //   role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  // },
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
    path: `${URL.HUONGDAN}/add`,
    exact: true,
    component: ChiTietHuongDan,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: `${URL.HUONGDAN}/:id`,
    exact: true,
    component: ChiTietHuongDan,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/cau-hoi-thuong-gap',
    menuName: 'Câu hỏi thường gặp',
    component: CauHoiThuongGap,
    icon: renderMenuIcon('far fa-question-circle'),
    role: [CONSTANTS.ADMIN],
  },

  {
    menuName: 'Hướng dẫn',
    icon: renderMenuIcon('fa-book'),
    children: [
      {
        path: URL.HUONGDAN,
        menuName: 'Hướng dẫn',
        component: HuongDan,
        role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
      },
      {
        path: URL.DANHMUC_HUONGDAN,
        menuName: 'Danh mục hướng dẫn',
        component: DanhMucHuongDan,
        role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
      },
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    menuName: 'Đánh giá',
    icon: renderMenuIcon('fa-thumbs-up'),
    children: [
      { path: URL.DANH_GIA_DICH_VU, menuName: 'Chi tiết đánh giá', component: ChiTietDanhGia, exact: true, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.DANH_GIA_DICH_VU_NV, menuName: 'Thống kê đánh giá', component: ThongKeDanhGia, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.DANH_GIA_DICH_VU_SAN_GOLF, menuName: 'Chi tiết đánh giá dịch vụ', component: ChiTietDanhGiaDichVu, exact: true, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.DANH_GIA_DICH_VU_SANGOLF, menuName: 'Thống kê đánh giá dịch vụ', component: ThongKeDanhGiaDichVu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.DANHMUC_DANHGIA, menuName: 'Danh mục đánh giá', component: DanhmucDanhGia, role: [CONSTANTS.ADMIN] },
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  // {
  //   path: '/muc-thanh-vien',
  //   menuName: 'Chi tiết mức thành viên',
  //   component: MucThanhVien,
  //   icon: <WeiboCircleOutlined/>,
  //   exact: true,
  //   role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  // },
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
  {
    path: URL.TAI_KHOAN,
    menuName: 'Quản lý tài khoản',
    component: TaiKhoan,
    icon: renderMenuIcon('fa-user-md'),
    exact: true,
    role: [CONSTANTS.ADMIN],
  },

  {
    path: URL.THONGTINCHUNG,
    menuName: 'Thông tin chung',
    component: ThongTinChung,
    icon: renderMenuIcon('fa-user-md'),
    exact: true,
    role: [CONSTANTS.ADMIN],
  },
];

export default constantsRoutes;

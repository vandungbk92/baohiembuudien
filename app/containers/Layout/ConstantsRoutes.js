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
    breadcrumbName: 'Phiếu điều tra',
    menuName: 'Phiếu điều tra',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.TRONG_KKT_KCN, menuName: 'Trong KKT-KCN', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.NGOAI_KKT_KCN, menuName: 'Ngoài KKT-KCN', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.CHAN_NUOI_TAP_TRUNG, menuName: 'Chăn nuôi tập trung', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.KHAI_THAC_MO, menuName: 'Khai thác mỏ', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.CO_SO_Y_TE, menuName: 'Cơ sở y tế', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.XU_LY_CHAT_THAI, menuName: 'Xử lý chất thải', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.QUAN_LY_KCN_CCN, menuName: 'Ban quản lý KCN-CCN', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.LANG_NGHE, menuName: 'Làng nghề', exact: true, component: DanhSachPhieu, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  { path: URL.TRONG_KKT_KCN_ADD, component: PhieuDieuTraChiTiet, exact: true, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  { path: URL.NGOAI_KKT_KCN_ADD, component: PhieuDieuTraChiTiet, exact: true, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  { path: URL.CHAN_NUOI_TAP_TRUNG_ADD, exact: true, component: PhieuDieuTraChiTiet, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  { path: URL.KHAI_THAC_MO_ADD, exact: true, component: PhieuDieuTraChiTiet, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  { path: URL.CO_SO_Y_TE_ADD, exact: true, component: PhieuDieuTraChiTiet, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  { path: URL.XU_LY_CHAT_THAI_ADD, exact: true, component: PhieuDieuTraChiTiet, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  { path: URL.QUAN_LY_KCN_CCN_ADD, exact: true, component: PhieuDieuTraChiTiet, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
  { path: URL.LANG_NGHE_ADD, exact: true, component: PhieuDieuTraChiTiet, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },

  { path: '/phieu-dieu-tra/:id', component: PhieuDieuTraChiTiet, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },

  {
    path: URL.PROFILE,
    breadcrumbName: 'Hồ sơ cá nhân',
    component: Profile,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: URL.NOT_FOUND,
    component: NotFoundPage,
    role: [],
  },

  //Loại phiếu
  {
    path: '/loai-phieu',
    menuName: 'Loại phiếu',
    component: DanhMucLoaiPhieu,
    icon: <FileTextOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/loai-phieu/add',
    component: DanhMucLoaiPhieuChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/loai-phieu/:id',
    component: DanhMucLoaiPhieuChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  // Đơn vị được điều tra

  {
    path: '/don-vi-duoc-dieu-tra',
    menuName: 'Đơn vị được điều tra',
    component: DonViDuocDieuTra,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/don-vi-duoc-dieu-tra/add',
    component: DonViDuocDieuTraChiTiet,
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },
  {
    path: '/don-vi-duoc-dieu-tra/:id',
    component: DonViDuocDieuTraChiTiet,
    // breadcrumbName: 'Thêm dữ liệu',
    icon: <WeiboCircleOutlined/>,
    exact: true,
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },

  // Đơn vị được điều tra


  {
    path: URL.CATEGORY,
    breadcrumbName: 'Danh mục chung',
    menuName: 'Danh mục chung',
    icon: <InsertRowLeftOutlined/>,
    children: [
      { path: URL.SAN_PHAM, menuName: 'Sản phẩm', component: SanPham, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      {
        path: URL.CONG_NGHE_SAN_XUAT,
        menuName: 'Công nghệ sản xuất',
        component: CongNgheSanXuat,
        role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
      },
      {
        path: URL.DM_NGUYEN_VAT_LIEU,
        menuName: 'Nguyên, vật liệu',
        component: DMNguyenVatLieu,
        role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
      },
      { path: URL.DON_VI, menuName: 'Đơn vị', component: DonVi, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      { path: URL.HOA_CHAT_SU_DUNG, menuName: 'Hóa chất sử dụng', component: HoaChatSuDung, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      // {
      //   path: URL.LOAI_HINH_CHAN_NUOI,
      //   menuName: 'Loại hình chăn nuôi',
      //   component: LoaiHinhChanNuoi,
      //   role: [CONSTANTS.ADMIN],
      // },
      { path: URL.LOAI_HOAT_DONG, menuName: 'Loại hoạt động', component: LoaiHoatDong, role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE] },
      // { path: URL.QUY_MO_BENH_VIEN, menuName: 'Quy mô bệnh viện', component: QuyMoBenhVien, role: [CONSTANTS.ADMIN] },
      {
        path: URL.NHIEN_LIEU_TIEU_THU,
        menuName: 'Nhiên liệu tiêu thụ',
        component: NhienLieuTieuThu,
        role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
      },
      { path: URL.TINH_THANH, menuName: 'Tỉnh thành', component: TinhThanh, role: [CONSTANTS.ADMIN] },
      { path: URL.QUAN_HUYEN, menuName: 'Quận huyện', component: QuanHuyen, role: [CONSTANTS.ADMIN] },
      { path: URL.PHUONG_XA, menuName: 'Phường xã', component: PhuongXa, role: [CONSTANTS.ADMIN] },
    ],
    role: [CONSTANTS.ADMIN, CONSTANTS.MANAGE],
  },


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

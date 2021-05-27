export const ARR_ROLES = ["ADMIN", "QUAN_LY"];
export const ADMIN_ROLES = ["ADMIN"];
export const QUANLY_ROLES = ["QUAN_LY"];
export const QUANTRI_ROLES = ["ADMIN", "QUAN_LY"];
export const TRANG_THAI_LICH_HEN = [
  { value: 'PENDING', label: 'Đang chờ' },
  { value: 'APPROVED', label: 'Đã được xác nhận' },
  { value: 'COMPLETED', label: 'Đã hoàn thành' },
  { value: 'CANCEL', label: 'Đã hủy' },
];
export function getLabelSTT(value) {
  let stt = ''
  TRANG_THAI_LICH_HEN.map(data => {
    if (value === data.value){
      stt = data.label
      return stt
    }
  })
  return stt
}


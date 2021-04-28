import DangKy from "../dangky/dangky.model";
import BenhNhan from "./khachhang.model";
import * as responseAction from "../../utils/responseAction";

export async function dsDangKyBenhNhan(id) {
  try {
    const dsDangKy = await DangKy.find({mabn: id})
      .populate({path: 'makk', select: 'tenkk'})
      .populate({path: 'maphong', select: 'tenphong'})
      .populate({path: 'mahinhthucden', select: 'tenhtd'})
      .populate({path: 'madoituong', select: 'tendoituong bhyt'})
      .sort({ngaydk: -1})
    return dsDangKy;
  } catch (err) {
    console.error(err);
    return []
  }
}
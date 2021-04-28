import ChanDoan from '../chandoan/chandoan.model';
import DienBien from '../dienbien/dienbien.model';
import DonThuoc from '../donthuoc/donthuoc.model';
import DonThuocCT from '../donthuocct/donthuocct.model';

import ThanhToan from '../thanhtoan/thanhtoan.model';
import ThanhToanCT from '../thanhtoanct/thanhtoanct.model';
import KetQuaCLS from '../ketquacls/ketquacls.model';
import HenKham from '../henkham/henkham.model';


// chẩn đoán danh sách bệnh.
export async function thongtinchandoan(khambenhInfo) {
  try {
    // lấy thông tin của chuẩn đoán theo khám bệnh.
    let chandoan = await ChanDoan.find({makcb: khambenhInfo.makcb, ma: khambenhInfo._id}).sort({benhchinh: -1})
      .populate({path: 'mabenh', select: 'tenbenh'})
    return chandoan
  } catch (e) {
    console.log(e)
  }
}

// chỉ số sinh tồn.
export async function thongtindienbien(khambenhInfo) {
  try {
    // lấy thông tin của chuẩn đoán theo khám bệnh.
    let dienbien = await DienBien.findOne({makcb: khambenhInfo.makcb, makhambenh: khambenhInfo._id})
    return dienbien
  } catch (e) {
    console.log(e)
  }
}

// chỉ số sinh tồn.
export async function thongtinhenkham(khambenhInfo) {
  try {
    // lấy thông tin của chuẩn đoán theo khám bệnh.
    let henkham = await HenKham.find({makcb: khambenhInfo.makcb})
    return henkham
  } catch (e) {
    console.log(e)
  }
}

export async function thongtindonthuoc(khambenhInfo) {
  try {
    // thông tin đơn thuốc.
    let donthuoc = await DonThuoc.find({makcb: khambenhInfo.makcb, makhambenh: khambenhInfo._id})
      .sort({_id: 1}).lean();
    if(donthuoc.length){

      // danh sách đơn thuốc chi tiết.
      await Promise.all(donthuoc.map(async (data, idx) => {
        data.donthuocct = await DonThuocCT.find({madonthuoc: data._id}).populate({path: 'mahh', select: 'tenhh', populate: {path: 'madonvitinh', select: 'tendonvitinh'}})
      }))

      // let donthuocct = await DonThuocCT.find({madonthuoc: donthuoc._id}).populate({path: 'mahh', select: 'tenhh', populate: {path: 'madonvitinh', select: 'tendonvitinh'}})
      // donthuoc.donthuocct = donthuocct
    }
    return donthuoc
  } catch (e) {
    console.log(e)
  }
}

export async function thongtindichvu(khambenhInfo) {
  try {
    let thanhtoanId = await ThanhToan.find({makcb: khambenhInfo.makcb, makhambenh: khambenhInfo._id}).lean().distinct('_id')
    let dichvu = []

    if(thanhtoanId.length){
      // danh sách các dịch vụ chi tiết.
      let thanhtoanct = await ThanhToanCT.find({mathanhtoan: {$in: thanhtoanId}, ladichvu: true})
        .populate({path: 'mahh', select: 'tendichvu maview'})
        .populate({path: 'makhoan', select: 'tenkhoan'})
        .populate({path: 'makk'})
        .sort({stt: 1})
        .lean();

      await Promise.all(thanhtoanct.map(async (data, idx) => {
        let {loaiketqua, ketquacls} = await thongtinketquacls(data);
        data.loaiketqua = loaiketqua
        data.ketquacls = ketquacls
        dichvu[idx] = data
      }))
    }
    return dichvu
  } catch (e) {
    console.log(e)
  }
}

async function thongtinketquacls(thanhtoanct) {
  try {
     // 1 la chẩn đoán hình ảnh.
    // 2 là xét nghiệm.
    let ketquaclsRes = await KetQuaCLS.find({mahh: thanhtoanct.mahh, mathanhtoan: thanhtoanct.mathanhtoan, mathanhtoanct: thanhtoanct._id})
      .populate({path: 'macs', select: 'tenchiso daigiatri ghmaxnam ghmaxnu ghminnam ghminnu daigiatriNu'})
      .sort({macs: 1})
    let loaiketqua = 0
    let ketquacls = null
    // nếu đã có kết quả.
    if(ketquaclsRes.length){
      if(ketquaclsRes[0].macs === 0 || ketquaclsRes[0].macs === null){
        loaiketqua = 1
        ketquacls = ketquaclsRes[0]
      }else{
        loaiketqua = 2
        ketquacls = ketquaclsRes
      }
    }
    return {loaiketqua, ketquacls}
  } catch (e) {
    console.log(e)
  }
}




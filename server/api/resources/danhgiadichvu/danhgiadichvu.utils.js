import ThanhToan from '../thanhtoan/thanhtoan.model';
import ThanhToanCT from '../thanhtoanct/thanhtoanct.model';
import KetQuaCLS from '../ketquacls/ketquacls.model'


export async function thongtindichvudanhgia(dangky) {
  try {
    let thanhtoanId = await ThanhToan.find({makcb: dangky._id}).lean().distinct('_id')
    let dichvu = []

    if(thanhtoanId.length){
      // danh sách các dịch vụ chi tiết.
      dichvu = await ThanhToanCT.find({mathanhtoan: {$in: thanhtoanId}, ladichvu: true},
        'mahh makk stt soluong')
        .populate({path: 'mahh', select: 'tendichvu maview danhgia'})
        .populate({path: 'makhoan', select: 'tenkhoan'})
        .populate({path: 'makk'})
        .sort({stt: 1})
        .lean();
    }
    return dichvu
  } catch (e) {
    console.log(e)
  }
}





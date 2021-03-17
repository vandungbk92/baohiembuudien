import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import {dateFormatter} from '@commons/dateFormat';
import {message} from 'antd';

export function getDataPhieuDieuTra(data){
    console.log(data, 'get data API neww')

    let nuocthai = data.nuocthai
    let khithai = data.khithai
    let ketluanthanhtra = data.ketluanthanhtra
    let hosomoitruong = data.hosomoitruong
    let nuocthaicosoxuly = data.nuocthaicosoxuly


    // Chuẩn bị dữ liệu
    if(nuocthai){
        nuocthai.quantracnuocthai_co =  nuocthai.quantracnuocthai === 'co' ? 'x' : ''
        nuocthai.quantracnuocthai_khong =  nuocthai.quantracnuocthai === 'khong' ? 'x' : ''
    // nuocthai.ketnoitruyendulieu_khac = nuocthai.ketnoitruyendulieu === 'khac' ? 'x' :''
        nuocthai.ketnoitruyendulieu_dangketnoi = nuocthai.ketnoitruyendulieu === 'dangketnoi' ? 'x' :''
        nuocthai.ketnoitruyendulieu_dadung = nuocthai.ketnoitruyendulieu === 'dadung' ? 'x' :''
        nuocthai.noiketnoithongtin_botnmt = nuocthai.noiketnoithongtin === 'botnmt' ? 'x' : ''
        nuocthai.noiketnoithongtin_sotnmt = nuocthai.noiketnoithongtin === 'sotnmt' ? 'x' : ''
        nuocthai.hethongxuly_co = nuocthai.hethongxuly === 'co' ? 'x' : ''
        nuocthai.hethongxuly_khong = nuocthai.hethongxuly === 'khong' ? 'x' : ''
        nuocthai.noitiepnhan1_htnttaptrung = nuocthai.noitiepnhan1 ==='htnttaptrung' ? 'x' : ''
        nuocthai.noitiepnhan1_kenhrach = nuocthai.noitiepnhan1 ==='kenhrach' ? 'x' : ''
        nuocthai.noitiepnhan1_htthoatnuocchung = nuocthai.noitiepnhan1 ==='htthoatnuocchung' ? 'x' : ''
        nuocthai.noitiepnhan2_htnttaptrung = nuocthai.noitiepnhan2 ==='htnttaptrung' ? 'x' : ''
        nuocthai.noitiepnhan2_kenhrach = nuocthai.noitiepnhan2 ==='kenhrach' ? 'x' : ''
        nuocthai.noitiepnhan2_htthoatnuocchung = nuocthai.noitiepnhan2 ==='htthoatnuocchung' ? 'x' : ''
        nuocthai.baotrihethong_co = nuocthai.baotrihethong === 'co' ? 'x' : ''
        nuocthai.baotrihethong_khong = nuocthai.baotrihethong === 'khong' ? 'x' : ''
        nuocthai.tubaotri = nuocthai.baotri === 'tubaotri' ? 'x' : ''
        nuocthai.thuedonvingoai = nuocthai.baotri === 'thuedonvingoai' ? 'x' : ''
    }

    if(nuocthaicosoxuly){
        nuocthaicosoxuly.noitiepnhan1_htnttaptrung = nuocthaicosoxuly.noitiepnhan1 ==='htnttaptrung' ? 'x' : ''
        nuocthaicosoxuly.noitiepnhan1_kenhrach = nuocthaicosoxuly.noitiepnhan1 ==='kenhrach' ? 'x' : ''
        nuocthaicosoxuly.noitiepnhan1_htthoatnuocchung = nuocthaicosoxuly.noitiepnhan1 ==='htthoatnuocchung' ? 'x' : ''
        nuocthaicosoxuly.noitiepnhan2_htnttaptrung = nuocthaicosoxuly.noitiepnhan2 ==='htnttaptrung' ? 'x' : ''
        nuocthaicosoxuly.noitiepnhan2_kenhrach = nuocthaicosoxuly.noitiepnhan2 ==='kenhrach' ? 'x' : ''
        nuocthaicosoxuly.noitiepnhan2_htthoatnuocchung = nuocthaicosoxuly.noitiepnhan2 ==='htthoatnuocchung' ? 'x' : ''
        nuocthaicosoxuly.baotrihethong_co = nuocthaicosoxuly.baotrihethong === 'co' ? 'x' : ''
        nuocthaicosoxuly.baotrihethong_khong = nuocthaicosoxuly.baotrihethong === 'khong' ? 'x' : ''
    }

    if(khithai){
        khithai.quantrackhithai_co =  khithai.quantrackhithai === 'co' ? 'x' : ''
        khithai.quantrackhithai_khong =  khithai.quantrackhithai === 'khong' ? 'x' : ''
        khithai.ketnoitruyendulieu_dangketnoi = khithai.ketnoitruyendulieu === 'dangketnoi' ? 'x' :''
        khithai.ketnoitruyendulieu_dadung = khithai.ketnoitruyendulieu === 'dadung' ? 'x' :''
        khithai.noiketnoithongtin_botnmt = khithai.noiketnoithongtin === 'botnmt' ? 'x' : ''
        khithai.noiketnoithongtin_sotnmt = khithai.noiketnoithongtin === 'sotnmt' ? 'x' : ''
        khithai.hethongxuly_co = khithai.hethongxuly === 'co' ? 'x' : ''
        khithai.hethongxuly_khong = khithai.hethongxuly === 'khong' ? 'x' : ''
    }
    // Obj vipham Sử dụng cho checkbox hành vi vi phạm mục D kết luận điều tra
    let vipham = {
        vipham_ctrsinhhoat :'',
        vipham_ctrcongnghiep : '',
        vipham_ctrnguyhai : '',
        vipham_khithai : '',
        vipham_nuocthai :'',
        //phiếu y tế
        vipham_ctrytethongthuong : '',
        vipham_ctnguyhai :'',
        vipham_ctranchannuoi:'',
        vipham_ctransanxuat:''
    }
    if(ketluanthanhtra){
        ketluanthanhtra.hanhvivipham.map( data =>{
            if(data === '1'){
                vipham.vipham_khithai = 'x'
            }
            else if(data === '2'){
                vipham.vipham_nuocthai = 'x'
            }
            else if(data === '3'){
                vipham.vipham_ctrsinhhoat = 'x'
            }
            else if(data === '4'){
                vipham.vipham_ctrcongnghiep = 'x'
            }
            else if(data === '5'){
                vipham.vipham_ctrnguyhai = 'x'
            }
            else if(data === '6'){
                vipham.vipham_ctrytethongthuong = 'x'
            }
            else if(data === '7'){
                vipham.vipham_ctnguyhai = 'x'
            }
            else if(data === '8'){
                vipham.vipham_ctranchannuoi = 'x'
            }
            else if(data === '9'){
                vipham.vipham_ctransanxuat = 'x'
            }
        })    
        ketluanthanhtra.phibvmt = ketluanthanhtra.phibvmt? ketluanthanhtra.phibvmt : ''
        ketluanthanhtra.coquanbanhanh = ketluanthanhtra.coquanbanhanh? ketluanthanhtra.coquanbanhanh : ''
        ketluanthanhtra.soketluan = ketluanthanhtra.soketluan? ketluanthanhtra.soketluan : ''
        ketluanthanhtra.thoigianbanhanh = dateFormatter(ketluanthanhtra.thoigianbanhanh)
    }


    // convert time sang định dàng DD/MM/YYYY
    if(hosomoitruong ){
        hosomoitruong.quyetdinhpheduyet_thoigian  = dateFormatter(hosomoitruong.quyetdinhpheduyet_thoigian)
        hosomoitruong.qdxnonhiemnt_thoigian  = dateFormatter(hosomoitruong.qdxnonhiemnt_thoigian)
        hosomoitruong.qdxnonhiemcao_thoigian  = dateFormatter(hosomoitruong.qdxnonhiemcao_thoigian)
        hosomoitruong.qddmonhiemnt_thoigian  = dateFormatter(hosomoitruong.qddmonhiemnt_thoigian)
        hosomoitruong.qddmmonhiemcao_thoigian  = dateFormatter(hosomoitruong.qddmmonhiemcao_thoigian)
        hosomoitruong.giayphepxathai_thoigian  = dateFormatter(hosomoitruong.giayphepxathai_thoigian)
        hosomoitruong.dmcsonhiemnt_thoigian  = dateFormatter(hosomoitruong.dmcsonhiemnt_thoigian)
        hosomoitruong.dmcsonhiemcao_thoigian  = dateFormatter(hosomoitruong.dmcsonhiemcao_thoigian)
        hosomoitruong.danhmuckiemsoat_thoigian  = dateFormatter(hosomoitruong.danhmuckiemsoat_thoigian)
        hosomoitruong.xacnhanhoanthanh_thoigian  = dateFormatter(hosomoitruong.xacnhanhoanthanh_thoigian)
    }

    let donviduocdieutra = data.donviduocdieutra
        donviduocdieutra.loaihinhkinhte_conglap = donviduocdieutra.loaihinhkinhte === '1' ? 'x' : ''
        donviduocdieutra.loaihinhkinhte_tunhan = donviduocdieutra.loaihinhkinhte === '2' ? 'x' : ''
        donviduocdieutra.xephang_boyte = donviduocdieutra.xephangcoso === '1' ? 'x' : ''
        donviduocdieutra.xephang_khac = donviduocdieutra.xephangcoso === '2' ? 'x' : ''
        donviduocdieutra.xephang_diaphuong = donviduocdieutra.xephangcoso === '3' ? 'x' : ''
        donviduocdieutra.xephang_trungtamyte = donviduocdieutra.xephangcoso === '4' ? 'x' : ''


    let loaihinhthuchienxuly = {
        lhxuly_ctrsinhhoat :'',
        lhxuly_ctrcongnghiep : '',
        lhxuly_ntsinhhoat : '',
        lhxuly_ntcongnghiep : '',
        lhxuly_ctnguyhai : ''
    }
    donviduocdieutra.loaihinhxuly.map( data =>{
        if(data === '1'){
            loaihinhthuchienxuly.lhxuly_ctrsinhhoat = 'x'
        }
        else if(data === '2'){
            loaihinhthuchienxuly.lhxuly_ctrcongnghiep = 'x'
        }
        else if(data === '3'){
            loaihinhthuchienxuly.lhxuly_ntsinhhoat = 'x'
        }
        else if(data === '4'){
            loaihinhthuchienxuly.lhxuly_ntcongnghiep = 'x'
        }
        else if(data === '5'){
            loaihinhthuchienxuly.lhxuly_ctnguyhai = 'x'
        }
    })    

    let chatthaisinhhoat = data.chatthaisinhhoat
    if(chatthaisinhhoat){
        chatthaisinhhoat.thugomrirac_co =  chatthaisinhhoat.thugomrirac === 'co' ? 'x' : ''
        chatthaisinhhoat.thugomrirac_khong =  chatthaisinhhoat.thugomrirac === 'khong' ? 'x' : ''
        chatthaisinhhoat.xulykhithai_co =  chatthaisinhhoat.xulykhithai === 'co' ? 'x' : ''
        chatthaisinhhoat.xulykhithai_khong =  chatthaisinhhoat.xulykhithai === 'khong' ? 'x' : ''
    }

    let chatthaicongnghiep = data.chatthaicongnghiep
    if(chatthaicongnghiep){
        chatthaicongnghiep.thugomrirac_co =  chatthaicongnghiep.thugomrirac === 'co' ? 'x' : ''
        chatthaicongnghiep.thugomrirac_khong =  chatthaicongnghiep.thugomrirac === 'khong' ? 'x' : ''
        chatthaicongnghiep.xulykhithai_co =  chatthaicongnghiep.xulykhithai === 'co' ? 'x' : ''
        chatthaicongnghiep.xulykhithai_khong =  chatthaicongnghiep.xulykhithai === 'khong' ? 'x' : ''
    }
// Phiếu 7
    let xulynuocthai = data.xulynuocthai   
    if(xulynuocthai){
        xulynuocthai.phandong_daphandong =  xulynuocthai.phandong === 'DAPHANDONG' ? 'x' : ''
        xulynuocthai.phandong_chuaphandong =  xulynuocthai.phandong === 'CHUAPHANDONG' ? 'x' : ''
        xulynuocthai.khuxuly_daxaydung =  xulynuocthai.khuxuly === 'DAXAYDUNG' ? 'x' : ''
        xulynuocthai.khuxuly_chuaxaydung =  xulynuocthai.khuxuly === 'CHUAXAYDUNG' ? 'x' : ''
        xulynuocthai.nhanluc_dadaotao = xulynuocthai.nhanlucvanhanh === '1' ? 'x' : ''
        xulynuocthai.nhanluc_chuadaotao = xulynuocthai.nhanlucvanhanh === '0' ? 'x' : ''
        xulynuocthai.noitiepnhan_htnttaptrung = xulynuocthai.noitiepnhan ==='htnttaptrung' ? 'x' : ''
        xulynuocthai.noitiepnhan_kenhrach = xulynuocthai.noitiepnhan ==='kenhrach' ? 'x' : ''
        xulynuocthai.noitiepnhan_htthoatnuocchung = xulynuocthai.noitiepnhan ==='htthoatnuocchung' ? 'x' : ''
        xulynuocthai.baotrihethong_co = xulynuocthai.baotrihethong === 'co' ? 'x' : ''
        xulynuocthai.baotrihethong_khong = xulynuocthai.baotrihethong === 'khong' ? 'x' : ''
        xulynuocthai.tubaotri = xulynuocthai.baotri === 'tubaotri' ? 'x' : ''
        xulynuocthai.thuedonvingoai = xulynuocthai.baotri === 'thuedonvingoai' ? 'x' : ''
    }
    // {xulykhithai_khong}
    // Dữ liệu tải phiếu
    let dataPhieu = {
        daidien : data.setting.daidien,
        chucvu: data.setting.chucvu ? data.setting.chucvu :'_____________________________________',
        diachi: data.setting.diachi,
        tendonvi: data.setting.tendonvi,
        kinhdo: data.donviduocdieutra.kinhdo ? data.donviduocdieutra.kinhdo: '',
        vido: data.donviduocdieutra.vido ? data.donviduocdieutra.vido: '',

        // cơ sở y tế
        loaihinhkinhte_conglap: donviduocdieutra.loaihinhkinhte_conglap,
        loaihinhkinhte_tunhan: donviduocdieutra.loaihinhkinhte_tunhan,
        xephang : data.donviduocdieutra.xephang,
        xephang_boyte: data.donviduocdieutra.xephang_boyte,
        xephang_khac: data.donviduocdieutra.xephang_khac,
        xephang_diaphuong: data.donviduocdieutra.xephang_diaphuong,
        xephang_trungtamyte: data.donviduocdieutra.xephang_trungtamyte,
        //
        chunguonthai: data.donviduocdieutra.chunguonthai,
        phuongxatruso: data.donviduocdieutra.phuongxatruso_id.tenphuongxa,
        huyentruso: data.donviduocdieutra.quanhuyentruso_id.tenqh,
        phuongxahoatdong: data.donviduocdieutra.phuongxahoatdong_id.tenphuongxa,
        huyenhoatdong: data.donviduocdieutra.quanhuyenhoatdong_id.tenqh,
        tencoso: data.donviduocdieutra.tencoso, 
        nguoidaidien: data.donviduocdieutra.nguoidaidien,
        dienthoai: data.donviduocdieutra.dienthoai ? data.donviduocdieutra.dienthoai : '_____________________________________',
        fax: data.donviduocdieutra.fax? data.donviduocdieutra.fax  : '_________________________________________',
        email: data.donviduocdieutra.email? data.donviduocdieutra.email  : '_____________________________________',
        khukinhte: data.donviduocdieutra.khukinhte? data.donviduocdieutra.email  : '_____________________________________',
        namhoatdong: data.donviduocdieutra.namhoatdong ? data.donviduocdieutra.namhoatdong : '____________________________',
        dientichmatbang: data.donviduocdieutra.dientichmatbang ? data.donviduocdieutra.dientichmatbang : '_____________________',
        sonhanvien: data.donviduocdieutra.sonhanvien ? data.donviduocdieutra.sonhanvien : '_________________________',
        website: data.donviduocdieutra.website? data.donviduocdieutra.website :  '___________________________',
        ngheuutien: data.donviduocdieutra.ngheuutien ? data.donviduocdieutra.ngheuutien: '__________________________________________________________________________',

        quymohoatdong : data.quymohoatdong,
        nguyenvatlieu: data.nguyenvatlieu,
        hoachat : data.hoachat,
        nhienlieu: data.nhienlieu,
        luongnuoc: data.luongnuoc,
        chatthaicongnghiep: data.chatthaicongnghiep? data.chatthaicongnghiep : {},
        chatthaisinhhoat : data.chatthaisinhhoat? data.chatthaisinhhoat : {},
        chatthainguyhai : data.chatthainguyhai? data.chatthainguyhai : {},
        nuocthai: data.nuocthai? data.nuocthai : {},
        khithai: data.khithai? data.khithai : {},
        hosomoitruong : data.hosomoitruong ? data.hosomoitruong  : {},
        ketluanthanhtra: data.ketluanthanhtra ? data.ketluanthanhtra : {},
        vipham: vipham,

        // //Phiếu 7 ban quản lý
        xulynuocthai: data.xulynuocthai,
        thongtinduan: data.thongtinduan? data.thongtinduan :{},

        //Phiếu sơ sở chăn nuôi
        quymochannuoi: data.quymochannuoi,
        chatthaichannuoi : data.chatthaichannuoi,
        quymobenhvien : data.quymobenhvien,
        chatthaiytekonguyhai: data.chatthaiytekonguyhai,
        nuocthaicosoxuly: data.nuocthaicosoxuly,

        // phiếu 6
        loaihinhthuchienxuly: loaihinhthuchienxuly
    }
    return dataPhieu
}

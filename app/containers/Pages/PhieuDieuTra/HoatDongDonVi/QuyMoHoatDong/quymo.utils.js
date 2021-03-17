import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';

export function getDataSoure(data){
  let dataSource = []
  data.forEach(curr => {
    dataSource = [...dataSource, getDataSourceView(curr)];
  })
  return dataSource
}
function getDataSourceView(data){
  return {
    _id: data._id,
    congnghesx_id: data?.congnghesx_id?.tencongnghesx,
    sanpham_id: data?.sanpham_id?.tensanpham,
    congsuathoatdong: data.congsuathoatdong,
    congsuatthietke: data.congsuatthietke
  }
}

export function getDataSourceEdit(dsQuyMo, sanpham, congnghesanxuat){
  let sanphamSel = sanpham.map(data => { return {name: data.tensanpham, value: data._id, key: data._id} })
  let connghesanxuatSel = congnghesanxuat.map(data => { return {name: data.tencongnghesx, value: data._id, key: data._id} })
  let dataSourceEdit = dsQuyMo.map(data => {
    return {
      _id: data._id,
      sanpham_id: {
        formItemType: 'SELECT',
        validateRules: [{ required: true, message: 'Sản phẩm là bắt buộc nhập' }],
        value: data.sanpham_id?._id,
        options: sanphamSel,
        dropdownStyle:{minWidth: '250px'},
        size: 'small',
        className: 'table-edit-select',
        showSearch : true,
        filterOption : (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      },
      congnghesx_id: {
        formItemType: 'SELECT',
        validateRules: [{ required: true, message: 'Công nghệ là bắt buộc nhập' }],
        value: data.congnghesx_id?._id,
        options: connghesanxuatSel,
        dropdownStyle:{minWidth: '250px'},
        size: 'small',
        className: 'table-edit-select',
        showSearch : true,
        filterOption : (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      },
      congsuatthietke: {
        formItemType: 'INPUT',
        value: data.congsuatthietke,
        size: 'small',
      },
      congsuathoatdong: {
        formItemType: 'INPUT',
        value: data.congsuathoatdong,
        size: 'small',
      }
    }
  })
  return dataSourceEdit
}

export function getDataSourceAdd(sanpham,congnghesanxuat ){
  let sanphamSel = sanpham.map(data => { return {name: data.tensanpham, value: data._id, key: data._id} })
  let connghesanxuatSel = congnghesanxuat.map(data => { return {name: data.tencongnghesx, value: data._id, key: data._id} }); 
  return {
    _id: (new Date()).getTime(),
    addNew: true,
    sanpham_id: {
      formItemType: 'SELECT',
      validateRules: [{ required: true, message: 'Sản phẩm là bắt buộc nhập' }],
      value: '',
      options: sanphamSel,
      dropdownStyle:{minWidth: '250px'},
      size: 'small',
      className: 'table-edit-select',
      showSearch : true,
      filterOption : (input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    congnghesx_id: {
      formItemType: 'SELECT',
      validateRules: [{ required: true, message: 'Công nghệ là bắt buộc nhập' }],
      value: '',
      options: connghesanxuatSel,
      dropdownStyle:{minWidth: '250px'},
      size: 'small',
      className: 'table-edit-select',
      showSearch : true,
      filterOption : (input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    congsuatthietke: {
      formItemType: 'INPUT',
      value: 0,
      size: 'small',
    },
    congsuathoatdong: {
      formItemType: 'INPUT',
      value: 0,
      size: 'small',
    }
  }
}

export function getDataSave(dataSourceEdit){
  let dsthemmoi = [];
  let dscapnhat = [];
  dataSourceEdit.forEach(curr => {
    if(curr.addNew){
      dsthemmoi = [...dsthemmoi, {
        congnghesx_id: curr.congnghesx_id?.value,
        congsuathoatdong: curr.congsuathoatdong?.value,
        congsuatthietke: curr.congsuatthietke?.value,
        sanpham_id: curr.sanpham_id?.value
      }]
    }else if(curr.update){
      dscapnhat = [...dscapnhat, {
        _id: curr._id,
        congnghesx_id: curr.congnghesx_id?.value,
        congsuathoatdong: curr.congsuathoatdong?.value,
        congsuatthietke: curr.congsuatthietke?.value,
        sanpham_id: curr.sanpham_id?.value
      }]
    }
  })
  return {dsthemmoi, dscapnhat}
}

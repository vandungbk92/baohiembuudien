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
    congnghexuly: data.congnghexuly,
    loaihoatdong_id: data?.loaihoatdong_id?.tenloaihoatdong,
    congsuathoatdong: data.congsuathoatdong,
    congsuatthietke: data.congsuatthietke
  }
}

export function getDataSourceEdit(dsQuyMo, loaihoatdong){
  console.log(loaihoatdong, 'loaihoatdong')
  let loaihoatdongSel = loaihoatdong.map(data => { return {name: data.tenloaihoatdong, value: data._id, key: data._id} })
  let dataSourceEdit = dsQuyMo.map(data => {
    return {
      _id: data._id,
      loaihoatdong_id: {
        formItemType: 'SELECT',
        validateRules: [{ required: true, message: ' Tên loại hoạt động  là bắt buộc nhập' }],
        value: data.loaihoatdong_id?._id,
        options: loaihoatdongSel,
        dropdownStyle:{minWidth: '250px'},
        size: 'small',
        className: 'table-edit-select'
      },
      congnghexuly: {
        value: data.congnghexuly,
        size: 'small',
      },
      congsuatthietke: {
        formItemType: 'INPUT_NUMBER',
        value: data.congsuatthietke,
        size: 'small',
      },
      congsuathoatdong: {
        formItemType: 'INPUT_NUMBER',
        value: data.congsuathoatdong,
        size: 'small',
      }
    }
  })
  return dataSourceEdit
}

export function getDataSourceAdd(loaihoatdong ){
  let loaihoatdongSel = loaihoatdong.map(data => { return {name: data.tenloaihoatdong, value: data._id, key: data._id} })
  return {
    _id: (new Date()).getTime(),
    addNew: true,
    loaihoatdong_id: {
      formItemType: 'SELECT',
      validateRules: [{ required: true, message: 'Loại hoạt động là bắt buộc nhập' }],
      value: '',
      options: loaihoatdongSel,
      dropdownStyle:{minWidth: '250px'},
      size: 'small',
      className: 'table-edit-select'
    },

    congnghexuly: {
      value: '',
      size: 'small',
    },
    congsuatthietke: {
      formItemType: 'INPUT_NUMBER',
      value: 0,
      size: 'small',
    },
    congsuathoatdong: {
      formItemType: 'INPUT_NUMBER',
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
        congnghexuly: curr.congnghexuly?.value,
        congsuathoatdong: curr.congsuathoatdong?.value,
        congsuatthietke: curr.congsuatthietke?.value,
        loaihoatdong_id: curr.loaihoatdong_id?.value
      }]
    }else if(curr.update){
      dscapnhat = [...dscapnhat, {
        _id: curr._id,
        congnghexuly: curr.congnghexuly?.value,
        congsuathoatdong: curr.congsuathoatdong?.value,
        congsuatthietke: curr.congsuatthietke?.value,
        loaihoatdong_id: curr.loaihoatdong_id?.value
      }]
    }
  })
  return {dsthemmoi, dscapnhat}
}

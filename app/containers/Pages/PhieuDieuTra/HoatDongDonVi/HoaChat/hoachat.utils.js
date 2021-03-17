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
    donvi_id: data?.donvi_id?.tendonvi,
    hoachatsudung_id: data?.hoachatsudung_id?.tenhoachat,
    luongsudung: data.luongsudung,
  }
}

export function getDataSourceEdit(dsHoaChat, hoachat, donvi){
  let hoachatSel = hoachat.map(data => { return {name: data.tenhoachat, value: data._id, key: data._id} })
  let donviSel = donvi.map(data => { return {name: data.tendonvi, value: data._id, key: data._id} })
  let dataSourceEdit = dsHoaChat.map(data => {
    return {
      _id: data._id,
      hoachatsudung_id: {
        formItemType: 'SELECT',
        validateRules: [{ required: true, message: 'Hóa chất là bắt buộc nhập' }],
        value: data.hoachatsudung_id?._id,
        options: hoachatSel,
        dropdownStyle:{minWidth: '250px'},
        size: 'small',
        className: 'table-edit-select',
        showSearch : true,
        filterOption : (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      },
      donvi_id: {
        formItemType: 'SELECT',
        validateRules: [{ required: true, message: 'Đơn vị là bắt buộc nhập' }],
        value: data.donvi_id?._id,
        options: donviSel,
        dropdownStyle:{minWidth: '250px'},
        size: 'small',
        className: 'table-edit-select',
        showSearch : true,
        filterOption : (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      },
      luongsudung: {
        formItemType: 'INPUT_NUMBER',
        value: data.luongsudung,
        size: 'small',
      }
    }
  })
  return dataSourceEdit
}

export function getDataSourceAdd(hoachat, donvi){
  let hoachatSel = hoachat.map(data => { return {name: data.tenhoachat, value: data._id, key: data._id} })
  let donviSel = donvi.map(data => { return {name: data.tendonvi, value: data._id, key: data._id} });
  return {
    _id: (new Date()).getTime(),
    addNew: true,
    hoachatsudung_id: {
      formItemType: 'SELECT',
      validateRules: [{ required: true, message: 'Hóa chất là bắt buộc nhập' }],
      value: '',
      options: hoachatSel,
      dropdownStyle:{minWidth: '250px'},
      size: 'small',
      className: 'table-edit-select',
      showSearch : true,
      filterOption : (input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    donvi_id: {
      formItemType: 'SELECT',
      validateRules: [{ required: true, message: 'Đơn vị là bắt buộc nhập' }],
      value: '',
      options: donviSel,
      dropdownStyle:{minWidth: '250px'},
      size: 'small',
      className: 'table-edit-select',
      showSearch : true,
      filterOption : (input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    luongsudung: {
      formItemType: 'INPUT_NUMBER',
      value: 0,
      size: 'small'
    }
  }
}

export function getDataSave(dataSourceEdit){
  let dsthemmoi = [];
  let dscapnhat = [];
  dataSourceEdit.forEach(curr => {
    if(curr.addNew){
      dsthemmoi = [...dsthemmoi, {
        donvi_id: curr.donvi_id?.value,
        luongsudung: curr.luongsudung?.value,
        hoachatsudung_id: curr.hoachatsudung_id?.value
      }]
    }else if(curr.update){
      dscapnhat = [...dscapnhat, {
        _id: curr._id,
        donvi_id: curr.donvi_id?.value,
        luongsudung: curr.luongsudung?.value,
        hoachatsudung_id: curr.hoachatsudung_id?.value
      }]
    }
  })
  return {dsthemmoi, dscapnhat}
}

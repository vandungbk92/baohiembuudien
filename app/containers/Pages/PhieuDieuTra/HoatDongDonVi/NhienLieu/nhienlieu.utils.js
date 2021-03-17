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
    nhienlieutieuthu_id: data?.nhienlieutieuthu_id?.loainhienlieu,
    luongtieuthu: data.luongtieuthu,
    mucdichsudung: data.mucdichsudung,
    ghichu: data.ghichu
  }
}

export function getDataSourceEdit(dsNhienLieu, nhienlieu){
  let nhienlieuSel = nhienlieu.map(data => { return {name: data.loainhienlieu, value: data._id, key: data._id} })
  let dataSourceEdit = dsNhienLieu.map(data => {
    return {
      _id: data._id,
      nhienlieutieuthu_id: {
        formItemType: 'SELECT',
        validateRules: [{ required: true, message: 'Nhiên liệu là bắt buộc nhập' }],
        value: data.nhienlieutieuthu_id?._id,
        options: nhienlieuSel,
        dropdownStyle:{minWidth: '250px'},
        size: 'small',
        className: 'table-edit-select',
        showSearch : true,
        filterOption : (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      },
      luongtieuthu: {
        formItemType: 'INPUT_NUMBER',
        value: data.luongtieuthu,
        size: 'small',
      },
      mucdichsudung: {
        value: data.mucdichsudung,
        size: 'small',
      },
      ghichu: {
        value: data.ghichu,
        size: 'small',
      }
    }
  })
  return dataSourceEdit
}

export function getDataSourceAdd(nhienlieu){
  let nhienlieuSel = nhienlieu.map(data => { return {name: data.loainhienlieu, value: data._id, key: data._id} })
  return {
    _id: (new Date()).getTime(),
    addNew: true,
    nhienlieutieuthu_id: {
      formItemType: 'SELECT',
      validateRules: [{ required: true, message: 'Nhiên liệu là bắt buộc nhập' }],
      value: '',
      options: nhienlieuSel,
      dropdownStyle:{minWidth: '250px'},
      size: 'small',
      className: 'table-edit-select',
      showSearch : true,
      filterOption : (input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    },
    luongtieuthu: {
      formItemType: 'INPUT_NUMBER',
      value: 0,
      size: 'small'
    },
    mucdichsudung: {
      value: '',
      size: 'small'
    },
    ghichu: {
      value: '',
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
        nhienlieutieuthu_id: curr.nhienlieutieuthu_id?.value,
        luongtieuthu: curr.luongtieuthu?.value,
        mucdichsudung: curr.mucdichsudung?.value,
        ghichu: curr.ghichu?.value
      }]
    }else if(curr.update){
      dscapnhat = [...dscapnhat, {
        _id: curr._id,
        nhienlieutieuthu_id: curr.nhienlieutieuthu_id?.value,
        luongtieuthu: curr.luongtieuthu?.value,
        mucdichsudung: curr.mucdichsudung?.value,
        ghichu: curr.ghichu?.value
      }]
    }
  })
  return {dsthemmoi, dscapnhat}
}

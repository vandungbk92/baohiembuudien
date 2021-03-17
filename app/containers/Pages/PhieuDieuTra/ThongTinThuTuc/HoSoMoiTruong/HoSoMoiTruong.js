import React, { Component } from 'react';
import { Button, Card, Popconfirm, Table, Row, message, Input, DatePicker } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getHoSoMoiTruong } from '@services/phieudieutra/phieudieutraService';
import { delById, updateById, add } from '@services/phieudieutra/hosomoitruongService';
import { getDataSave, getDataSource } from 'Pages/PhieuDieuTra/ThongTinThuTuc/HoSoMoiTruong/hosomoitruong.utils';
import {HO_SO_MOI_TRUONG} from '@constants';
import {HO_SO_MOI_TRUONG_NULL} from './hosomoitruong.utils'

import moment from 'moment';


class HoSoMoiTruong extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: 'stt',
      width: '5%',
      align: 'center',
      render: (v, r, i) => r.stt,
    },
    {
      title: 'Nội dung các thủ tục',
      dataIndex: 'hosomoitruong',
      width: '30%'
    },
    {
      title: 'Số quyết định',
      dataIndex: 'soqd',
      width: '15%',
      align: 'center',
      render: (v, r, i) => {
        return this.state.edit ? <Input.TextArea rows={1} size="small" value={v} onChange={(e) => this.onChaneInputSoqdg(e, r, i)}/> : v
      },
    },
    {
      title: 'Cơ quan phê duyệt',
      dataIndex: 'coquan',
      width: '20%',
      align: 'center',
      render: (v, r, i) => {
        return this.state.edit ? <Input.TextArea rows={1} size="small" value={v} onChange={(e) => this.onChaneInputCoQuan(e, r, i)}/> : v
      },
    },
    {
      title: 'Thời gian phê duyệt (Ngày, tháng, năm)',
      dataIndex: 'thoigian',
      width: '15%',
      align: 'center',
      render: (v, r, i) => {
        //return this.state.edit ? <Input.TextArea rows={1} size="small" value={v} onChange={(e) => this.onChaneInputThoiGian(e, r, i)}/> : v
        return this.state.edit ?  <DatePicker placeholder='Chọn thời gian' value={v} format="DD-MM-YYYY" onChange={(e) => this.onChaneInputThoiGian(e, r, i )} /> : v ? v.format('DD-MM-YYYY') : ''
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghichu',
      width: '15%',
      align: 'center',
      render: (v, r, i) => {
        return this.state.edit ? <Input.TextArea rows={1} size="small" value={v} onChange={(e) => this.onChaneInputGhiChu(e, r, i )}/> : v
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [...HO_SO_MOI_TRUONG],
      edit: false,
      _id: ''
    };
  }

  onChaneInputCoQuan = (e, r, i) => {
    const { value } = e.target;
    let {dataSource} = this.state;
    dataSource[i][r.key_coquan] = value;
    dataSource[i].coquan = value;
    this.setState({dataSource})
  }
  onChaneInputThoiGian = (e, r, i) => {
    let thoigian
    let {dataSource} = this.state;
    if(e){
      thoigian  = e.format('YYYY-MM-DD');
      dataSource[i][r.key_thoigian] = moment(thoigian);
      dataSource[i].thoigian = moment(thoigian);
    }else{
      dataSource[i][r.key_thoigian] = null;
      dataSource[i].thoigian = null;
    }

    this.setState({dataSource})
  }

  onChaneInputGhiChu = (e, r, i) => {
    const { value } = e.target;
    let {dataSource} = this.state;
    dataSource[i][r.key_ghichu] = value;
    dataSource[i].ghichu = value;
    this.setState({dataSource})
  }

  onChaneInputSoqdg = (e, r, i) => {
    const { value } = e.target;
    let {dataSource} = this.state;
    dataSource[i][r.key_soqd] = value;
    dataSource[i].soqd = value;
    this.setState({dataSource})
  }

  

  async componentDidMount() {
    let {match} = this.props;
    let {id} = match.params;
    if(id){
      let dataSource = await getHoSoMoiTruong(id);
      if(dataSource){
        this.setState({dataSource: getDataSource(dataSource), _id: dataSource._id});
      }else{
        this.setState({dataSource : HO_SO_MOI_TRUONG_NULL});
      }
    }
  }

  funcChangeUpdate = () => {
    this.setState({edit: !this.state.edit});
  }

  funcSave = async () => {
    let {id} = this.props.match.params;
    let {dataSource, _id} = this.state;
    let dataSave = getDataSave(dataSource);
    if(_id){
      let dataRes = await updateById(_id, dataSave);
      if(dataRes){
        message.success('Cập nhật thủ tục hồ sơ môi trường thành công');
        this.setState({edit: !this.state.edit});
      }
    }else{
      dataSave.phieudieutra_id = id;
      let dataRes = await add(dataSave);
      if(dataRes){
        message.success('Cập nhật thủ tục hồ sơ môi trường thành công');
        this.setState({edit: !this.state.edit, _id: dataRes._id});
      }
    }
  }

  render() {
    return <Card size="small" title={<span>
        1. Thủ tục hồ sơ môi trường
      </span>} md="24" extra={<Row gutter={20}>
      {
        this.state.edit ? <Button size='small' type="primary" icon={<SaveOutlined/>}
                                  onClick={this.funcSave}
        >Lưu</Button> : <Button size='small' type="primary" ghost icon={<EditOutlined />}
                                onClick={this.funcChangeUpdate}
        >Cập nhật</Button>
      }

    </Row>}>
      <Table loading={false} bordered columns={this.columns} dataSource={this.state.dataSource}
             size="small" pagination={false}
      />
    </Card>


  }
}

export default withRouter(HoSoMoiTruong);


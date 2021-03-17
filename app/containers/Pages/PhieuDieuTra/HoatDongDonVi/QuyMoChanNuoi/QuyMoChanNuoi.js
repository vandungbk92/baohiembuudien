import React, { Component } from 'react';
import { Button, Card, Popconfirm, Table, Row, message, Input, InputNumber } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getQuyMoChanNuoi } from '@services/phieudieutra/phieudieutraService';
import { delById, updateById, add } from '@services/phieudieutra/quymochannuoiService';
import { getDataSave, getDataSource } from 'Pages/PhieuDieuTra/HoatDongDonVi/QuyMoChanNuoi/quymochannuoi.utils';
import {QUY_MO_CHAN_NUOI} from '@constants';

class QuyMoChanNuoi extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: '_id',
      width: '5%',
      align: 'center',
      render: (v, r, i) => i + 1,
    },
    {
      title: 'Loại hình chăn nuôi',
      dataIndex: 'loaihinhchannuoi',
      width: '30%'
    },
    {
      title: 'Số lượng vật nuôi (con/lứa or tấn/năm)',
      dataIndex: 'soluong',
      width: '30%',
      align: 'center',
      render: (v, r, i) => {
        return this.state.edit ? <InputNumber min={0} size="small" value={v} onChange={(e) => this.onChaneNumber(e, r, i)}/> : v
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghichu',
      width: '35%',
      align: 'center',
      render: (v, r, i) => {
        return this.state.edit ? <Input.TextArea rows={1} size="small" value={v} onChange={(e) => this.onChaneInput(e, r, i )}/> : v
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataSource: QUY_MO_CHAN_NUOI,
      edit: false,
      _id: ''
    };
  }

  onChaneInput = (e, r, i) => {
    const { value } = e.target;
    let {dataSource} = this.state;
    dataSource[i][r.key_ghighu] = value;
    dataSource[i].ghichu = value;
    this.setState({dataSource})
  }

  onChaneNumber = (e, r, i) => {
    let {dataSource} = this.state;
    dataSource[i][r.key_soluong] = e;
    dataSource[i].soluong = e;
    this.setState({dataSource})
  }

  async componentDidMount() {
    let {match} = this.props;
    let {id} = match.params;
    if(id){
      let dataSource = await getQuyMoChanNuoi(id);
      if(dataSource){
        this.setState({dataSource: getDataSource(dataSource), _id: dataSource._id});
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
        message.success('Cập nhật quy mô chăn nuôi thành công');
        this.setState({edit: !this.state.edit});
      }
    }else{
      dataSave.phieudieutra_id = id;
      let dataRes = await add(dataSave);
      if(dataRes){
        message.success('Cập nhật quy mô chăn nuôi thành công');
        this.setState({edit: !this.state.edit, _id: dataRes._id});
      }
    }
  }

  render() {
    return <Card size="small" title={<span>
        1. Quy mô chăn nuôi
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

export default withRouter(QuyMoChanNuoi);


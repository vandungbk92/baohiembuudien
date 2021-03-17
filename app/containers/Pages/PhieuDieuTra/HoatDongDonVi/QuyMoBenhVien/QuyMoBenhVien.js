import React, { Component } from 'react';
import { Button, Card, Popconfirm, Table, Row, message, Input, InputNumber } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getQuyMoBenhVien } from '@services/phieudieutra/phieudieutraService';
import { delById, updateById, add } from '@services/phieudieutra/quymobenhvienService';
import { getDataSave, getDataSource } from 'Pages/PhieuDieuTra/HoatDongDonVi/QuyMoBenhVien/quymobenhvien.utils';
import {QUY_MO_BENH_VIEN} from '@constants';

class QuyMoBenhVien extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: '_id',
      width: '5%',
      align: 'center',
      render: (v, r, i) => i + 1,
    },
    {
      title: 'Tên',
      dataIndex: 'quymobenhvien',
      width: '50%'
    },
    {
      title: 'Số lượng',
      dataIndex: 'soluong',
      width: '45%',
      align: 'center',
      render: (v, r, i) => {
        return this.state.edit ? <InputNumber min={0} size="small" value={v} onChange={(e) => this.onChaneNumber(e, r, i)}/> : v
      },
    },
    
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataSource: QUY_MO_BENH_VIEN,
      edit: false,
      _id: ''
    };
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
      let dataSource = await getQuyMoBenhVien(id);
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
        message.success('Cập nhật quy  mô bệnh viện thành công');
        this.setState({edit: !this.state.edit});
      }
    }else{
      dataSave.phieudieutra_id = id;
      let dataRes = await add(dataSave);
      if(dataRes){
        message.success('Cập nhật quy  mô bệnh viện thành công');
        this.setState({edit: !this.state.edit, _id: dataRes._id});
      }
    }
  }

  render() {
    return <Card size="small" title={<span>
        1. Quy mô bệnh viện
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

export default withRouter(QuyMoBenhVien);


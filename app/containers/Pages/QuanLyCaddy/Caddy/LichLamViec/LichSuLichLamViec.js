import React, { Component, Fragment } from 'react';
import { Button, Table, Popconfirm, message, Card, Tooltip, Modal, Form, Input, Typography, Space  } from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { add,updateById,delById,getById,getAll, getAllDslichByCaddy } from "@services/quanlycaddy/caddyService";
import {dateFormatter} from '@commons/dateFormat';
import { Link } from 'react-router-dom';
import { URL } from '@url';
import { CloseOutlined, DeleteOutlined, EditOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { CONSTANTS } from '@constants';

const { Text, Title } = Typography;

class LichSuLichLamViec extends Component {
   columns = [
    {
      title: 'Caddy',
      dataIndex: 'caddy_id',
      key: 'name',
      render: text => <a> {text.hoten}</a>,
    },
    {
      title: 'Từ ngày',
      dataIndex: 'tungay',
      key: 'name',
      render: text => <a> {dateFormatter(text)}</a>,
    },
    {
      title: 'Đến ngày',
      dataIndex: 'tungay',
      key: 'name',
      render: text => <a> {dateFormatter(text)}</a>,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghichu',
      key: 'name',
      render: text => <a> {text}</a>,
    },

    {
      title: 'Hành động',
      render: (value) => this.formatActionCell(value),
      width: 150,
      align: 'center',
    },
  ];

  columnschitiet = [
    {
      title: 'Ca',
      dataIndex: 'tenca',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Thứ 2',
      dataIndex: 'ca',
      key: 'name',
      render(text, record) {
        return {
          props: {
            style: { background: text.indexOf(0) !== -1 ? "LightGoldenRodYellow" : "" }
          },
        };
      }

    },
    {
      title: 'Thứ 3',
      dataIndex: 'ca',
      key: 'name',
      render(text, record) {
        return {
          props: {
            style: { background: text.indexOf(1) !== -1 ? "LightGoldenRodYellow" : "" }
          },
        };
      }  },
    {
      title: 'Thứ 4',
      dataIndex: 'ca',
      key: 'name',
      render(text, record) {
        return {
          props: {
            style: { background: text.indexOf(2) !== -1 ? "LightGoldenRodYellow" : "" }
          },
        };
      }  },
    {
      title: 'Thứ 5',
      dataIndex: 'ca',
      key: 'name',
      render(text, record) {
        return {
          props: {
            style: { background: text.indexOf(3) !== -1 ? "LightGoldenRodYellow" : "" }
          },
        };
      }  },
    {
      title: 'Thứ 6',
      dataIndex: 'ca',
      key: 'name',
      render(text, record) {
        return {
          props: {
            style: { background: text.indexOf(4) !== -1 ? "LightGoldenRodYellow" : "" }
          },
        };
      }  },
    {
      title: 'Thứ 7',
      dataIndex: 'ca',
      key: 'name',
      render(text, record) {
        return {
          props: {
            style: { background: text.indexOf(5) !== -1 ? "LightGoldenRodYellow" : "" }
          },
        };
      }  },
    {
      title: 'Chủ nhật',
      dataIndex: 'ca',
      key: 'name',
      render(text, record) {
        return {
          props: {
            style: { background: text.indexOf(6) !== -1 ? "LightGoldenRodYellow" : "" }
          },
        };
      }  },
  ];


  constructor(props) {
    super(props);
    this.state = {
      caddy_id : this.props.caddy_id,
      dataRes : [],
      datasource: [],
      dataModal : [],
      showModal: false
    };
  }

  async componentDidMount() {
    let dataRes = await getAllDslichByCaddy(this.state.caddy_id)
    if(dataRes){
      this.setState({dataRes: dataRes})
    }
  }
  getDataTable(data){
    let datasource = []
    let dataCaSang = {}
    let dataCaChieu = {}
    let datacasangRes = data.casang
    let datacachieuRes = data.cachieu
    if (!data.cangay.length !== 0){
      data.cangay.forEach(data =>{
          console.log(data,'dataforEach');
          datacasangRes.push(data)
          datacachieuRes.push(data)
        }
      );
    }
    dataCaSang.tenca = "Sáng";
    dataCaSang.ca = data.casang;
    dataCaChieu.tenca = "Chiều";
    dataCaChieu.ca = data.cachieu;
    datasource.push(dataCaSang)
    datasource.push(dataCaChieu)

    return datasource
  }
  toggleModal = (data) => {
    const { showModal } = this.state;
    let dataTable = this.getDataTable(data)
    this.setState({ showModal: !showModal, datasource : dataTable , dataModal : data });
  };

  toggleModalCancel = (data) => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal, datasource : [] , dataModal : []});
  };
  formatActionCell(value) {
    return <>
      <Tooltip placement="left" title={'Xem chi tiết'} color="#2db7f5">
        <Button icon={<EyeOutlined/>} size='small' type="primary" className='mr-1' //ant-tag-cyan
                onClick={() => this.toggleModal(value)}></Button>
      </Tooltip>

      {/*<Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"*/}
      {/*            onConfirm={() => this.handleDelete(value)}*/}
      {/*            cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>*/}
      {/*  <Tooltip placement="right" title={'Xóa dữ liệu'} color="#f50">*/}
      {/*    <Button icon={<DeleteOutlined/>} type='danger' size='small' className="mr-1"></Button> }*/}
      {/*  </Tooltip>*/}
      {/*</Popconfirm>*/}
    </>;
  }

  render() {
    return <div>
      <Table columns={this.columns} bordered dataSource={this.state.dataRes} />

      <Modal title={' Chi tiết lịch'}
             visible={this.state.showModal}
             onCancel={this.toggleModalCancel}
             width={800}
             footer={[
               <Button key={1} size="small" onClick={this.toggleModalCancel}  type="danger" icon={<CloseOutlined />}>Huỷ</Button>,
             ]}>
        <Title level={3}>
          <Text type="danger">Từ ngày  {dateFormatter(this.state.dataModal.tungay)} đến ngày  {dateFormatter(this.state.dataModal.denngay)} </Text>
        </Title>

         <br/>
        <Table columns={this.columnschitiet} bordered dataSource={this.state.datasource} />
      </Modal>;
    </div>;
  }
}

export default LichSuLichLamViec

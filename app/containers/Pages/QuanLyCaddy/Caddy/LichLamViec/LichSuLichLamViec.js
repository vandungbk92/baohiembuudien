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
import Box from '@containers/Box';

const { Text, Title } = Typography;
let index = 1
class LichSuLichLamViec extends Component {
   columns = [
     {
       title: 'STT',
       key: 'name',
       render: (limit, page, value) => this.formatSTT(this.state.limit, this.state.page, value),
     },
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
      dataIndex: 'denngay',
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
      render: (value,r,i) => this.formatActionCell(value,i),
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
      showModal: false,
      propChild: '',
      page: 1,
      limit: 10,
    };
  }

  formatSTT(limit, page, index) {
    return (page - 1) * limit + (index + 1)
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


  ThemMoi = () => {
    this.props.parentCallback("ADD", "2")
  };

  ChinhSua = (value) => {
    this.props.parentCallback(value, "2")
  };

  formatActionCell(value,index) {
    return <>
      <Tooltip placement="left" title={'Xem chi tiết'} color="#2db7f5">
        <Button icon={<EyeOutlined/>} size='small' type="primary" className='mr-1' //ant-tag-cyan
                onClick={() => this.toggleModal(value)}></Button>
      </Tooltip>

      {index == 0 ? <Tooltip placement="left" title={'Cập nhật'} color="#2db7f5">
        <Button icon={<EditOutlined/>} size='small' type="link" className='mr-1' //ant-tag-cyan
                onClick={() => this.ChinhSua(value)}></Button>
      </Tooltip> : '   ' }

    </>;
  }




  render() {
    return <div>
      <Box
        boxActions={
            <Button onClick={this.ThemMoi} icon={<SaveOutlined />} size="small" type="primary">
              Thêm mới
            </Button>
        }
      >
      <Table columns={this.columns} bordered dataSource={this.state.dataRes} />
      </Box>

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

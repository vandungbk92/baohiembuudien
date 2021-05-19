import React, { Component, Fragment } from 'react';
import { Button, Table,Popconfirm, message, Card, Tooltip, Modal, Typography } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { add, getById, getAll, delById, updateById } from '@services/quanlylichsangolf/lichsangolfService';
import { PAGINATION_CONFIG } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import Search from '@components/Search/Search';
import { stringify } from 'qs';
import queryString from 'query-string';
import { makeGetMyInfo } from '../../../../Layout/HeaderComponent/HeaderProvider/selectors';
import { CONSTANTS } from '@constants';
import axios from 'axios'
import { URL } from '@url';
import { Link } from 'react-router-dom';
import { dateFormatter } from '@commons/dateFormat';
const { Text, Title } = Typography;

class LichSuLamViec extends Component {

  columns = [
    {
      title: 'STT',
      key: 'name',
      render: (limit, page, value) => this.formatSTT(this.state.limit, this.state.page, value),
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
      dataRes: [],
      dsLichSanGofl:[],
      showModal: false,
      page: 1,
      limit: 10,
      totalDocs: 0,
      data: null,
      datasource: [],
      dataModal : ''
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    let lichsangolfAPI = await getAll(1, 0)
    if(lichsangolfAPI){
      this.setState({dsLichSanGofl: lichsangolfAPI.docs})
    }
    this.getDataFilter();
  }
  formatSTT(limit, page, index) {
    return (page - 1) * limit + (index + 1)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getDataFilter();
    }
  }

  async getDataFilter() {
    let search = queryString.parse(this.props.location.search);
    let search1 = this.props.location.search;
    console.log(search,'search');
    console.log(search1,'search1search1');
    let page = parseInt(search.page ? search.page : this.state.page);
    let limit = parseInt(search.limit ? search.limit : this.state.limit);
    let queryStr = '';
    queryStr += `${search.hoten ? '&hoten[like]={0}'.format(search.hoten) : ''}`;
    queryStr += `${search.trangthai_id ? '&trangthai_id={0}'.format(search.trangthai_id) : ''}`;

    const apiResponse = await getAll(page, limit, queryStr);
    if (apiResponse) {
      const dataRes = apiResponse.docs;
      this.setState({
        dataRes,
        totalDocs: apiResponse.totalDocs,
        limit: apiResponse.limit,
        page: apiResponse.page,
      });
    }
  }

  async handleDelete(value) {
    const apiResponse = await delById(value._id);
    if (apiResponse) {
      this.getDataFilter();
      message.success('Xoá lich thành công');
    }
  }

  toggleModal = (data) => {
    const { showModal } = this.state;
    let dataTable = this.getDataTable(data)
    this.setState({ showModal: !showModal, datasource : dataTable , dataModal : data });
  };


  formatActionCell(value,index) {
    return <>
      {index == 0  ?     <div>

      <Link to={URL.LICH_SAN_GOLF_ID.format(value._id)}>
        <Tooltip title={'Chỉnh sửa'} color="#2db7f5">
        <Button icon={<EditOutlined/>} size='small' type="primary" className='mr-1'></Button>
        </Tooltip>
        </Link>

        <Tooltip placement="left" title={'Xem chi tiết'} color="#2db7f5">
          <Button icon={<EyeOutlined/>} size='small' type="primary" className='mr-1' //ant-tag-cyan
                  onClick={() => this.toggleModal(value)}></Button>
        </Tooltip>

        <Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"
        onConfirm={() => this.handleDelete(value)}
        cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>
        <Tooltip placement="right" title={'Xóa dữ liệu'} color="#f50">
      { this.props.myInfoResponse.role === CONSTANTS.ADMIN? <Button icon={<DeleteOutlined/>} type='danger' size='small' className="mr-1"></Button> :''}
        </Tooltip>
        </Popconfirm>
        </div> : <div></div>
      }
    </>;
  }
  
  handleRefresh = (newQuery, changeTable) => {
    const { location, history } = this.props;
    const { pathname } = location;
    let { page, limit } = this.state;
    let objFilterTable = { page, limit };
    if (changeTable) {
      newQuery = queryString.parse(this.props.location.search);
      delete newQuery.page;
      delete newQuery.limit;
    }
    newQuery = Object.assign(objFilterTable, newQuery);
    let query  = {idcongan:1111111}
    history.push({
      pathname, search: stringify({...newQuery}, { arrayFormat: 'repeat' }),
    });
  };

  onChangeTable = (page) => {
    this.setState({ page: page.current, limit: page.pageSize },
      () => {
        this.handleRefresh({}, true);
      });
  };

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


  getDataAfterSave = (data, type) => {
    // type = ADD thêm mới.
    if(type === 'ADD'){
      this.getDataFilter();
    }else if(type === 'UPDATE'){
      const dataRes = this.state.dataRes.map(curr => {
        if (data._id === curr._id) {
          return data
        }
        return curr;
      });
      this.setState({ dataRes });
    }
  }
  toggleModalCancel = (data) => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal, datasource : [] , dataModal : []});
  };

  // showTrangThai(value){
  //   return <React.Fragment>
  //   {
  //     <div>{value.tentrangthai} </div>
  //   }

  // </React.Fragment>
  // }

  render() {
    const { loading } = this.props;
    const { dataRes, totalDocs, page, limit, dsLichSanGofl } = this.state;
    const dataSearch = [{
      type: 'text',
      operation: 'like',
      name: 'hoten',
      label: 'Họ tên',
    },
      { type: 'select',
        name: 'trangthai_id',
        label: 'Trạng thái',
        options: dsLichSanGofl,
        key: '_id',
        value: 'tentrangthai'}

    ];
    return <div>


      <Card size="small" title={<span>
        <UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách Lịch
      </span>}
            md="24"
            bordered extra={
        <Link to={URL.LICH_SAN_GOLF_ADD}>
          {this.props.myInfoResponse.role === CONSTANTS.ADMIN ?   <Button type="primary" className='pull-right' size="small" icon={<PlusOutlined/>}>Thêm</Button> : ''}

        </Link>
      }
      >
        <Search onFilterChange={this.handleRefresh} dataSearch={dataSearch}/>
        <Table loading={loading} bordered columns={this.columns} dataSource={dataRes}
               size="small" rowKey="_id"
               pagination={{
                 ...PAGINATION_CONFIG,
                 current: page,
                 pageSize: limit,
                 total: totalDocs,
               }}
               onChange={this.onChangeTable}/>
      </Card>

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

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo(),

});

const withConnect = connect(mapStateToProps);

export default withConnect(LichSuLamViec);

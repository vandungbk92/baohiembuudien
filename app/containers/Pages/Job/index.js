import React, { Component, Fragment } from 'react';
import { Button, Table, Popconfirm, message, Card, Tooltip, } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { add, getById, getAll, delById, updateById } from '@services/quanlycaddy/caddyService';
import { PAGINATION_CONFIG } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import Search from '@components/Search/Search';
import { stringify } from 'qs';
import queryString from 'query-string';
// import { fetchSanPham } from '@reduxApp/HoatDongSanXuat/actions';
import { makeGetMyInfo } from '../../Layout/HeaderComponent/HeaderProvider/selectors';
import { CONSTANTS } from '@constants';
import {getAll as getAllTT} from '@services/job/trangThaiJobService'
import axios from 'axios'
import { URL } from "../../../constants/URL";
import { Link } from 'react-router-dom';

class Job extends Component {

  columns = [
   
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'tgbatdau',
      width: 150,
      align: 'center',
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'tgketthuc',
      width: 150,
      align: 'center',
    },
    {
      title: 'Tên công việc',
      dataIndex: 'tencongviec',
      width: 150,
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: ["trangthai_id", "tentrangthai"],
      width: 150,
      align: 'center',
    },
    {
      title: 'Hành động',
      render: (value) => this.formatActionCell(value),
      width: 150,
      align: 'center',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataRes: [],
      dstrangthai:[],

      page: 1,
      limit: 10,
      totalDocs: 0,
      data: null
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    let trangthaiApi = await getAllTT(1, 0)
    if(trangthaiApi){
      this.setState({dstrangthai: trangthaiApi.docs})
    }
   
   
    this.getDataFilter();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getDataFilter();
    }
  }

  async getDataFilter() {
    let search = queryString.parse(this.props.location.search);
    let page = parseInt(search.page ? search.page : this.state.page);
    let limit = parseInt(search.limit ? search.limit : this.state.limit);
    let queryStr = '';
    queryStr += `${search.hoten ? '&tencongviec[like]={0}'.format(search.tencongviec) : ''}`;
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
      message.success('Xoá caddy thành công');
    }
  }


  formatActionCell(value) {
    return <>
      <Link to={URL.CADDY_ID.format(value._id)}>
        <Tooltip title={'Xem chi tiết'} color="#2db7f5">
          <Button icon={<EyeOutlined/>} size='small' type="primary" className='mr-1'></Button>
        </Tooltip>
      </Link>

      <Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"
                  onConfirm={() => this.handleDelete(value)}
                  cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>
        <Tooltip placement="right" title={'Xóa dữ liệu'} color="#f50">
          { this.props.myInfoResponse.role === CONSTANTS.ADMIN? <Button icon={<DeleteOutlined/>} type='danger' size='small' className="mr-1"></Button> :''}
        </Tooltip>
      </Popconfirm>
    </>;
  }

  // showTrangThai(value){
  //   return <React.Fragment>
  //   {       
  //     <div>{value.trangthai_id.tentrangthai} </div>
  //   }
    
  // </React.Fragment>
  // }

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
    history.push({
      pathname, search: stringify({ ...newQuery }, { arrayFormat: 'repeat' }),
    });
  };

  onChangeTable = (page) => {
    this.setState({ page: page.current, limit: page.pageSize },
      () => {
        this.handleRefresh({}, true);
      });
  };

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

  // showTrangThai(value){
  //   return <React.Fragment>
  //   {       
  //     <div>{value.tentrangthai} </div>
  //   }
    
  // </React.Fragment>
  // }

  render() {
    const { loading } = this.props;
    const { dataRes, totalDocs, page, limit, dstrangthai } = this.state;
    const dataSearch = [{
      type: 'text',
      operation: 'like',
      name: 'tencongviec',
      label: 'Tên công việc',
    },
    { type: 'select',
    name: 'trangthai_id',
    label: 'Trạng thái',
    options: dstrangthai,
    key: '_id',
    value: 'tentrangthai'}
   
  ];
    return <div>


<Card size="small" title={<span>
        <UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách Công việc
      </span>} 
      md="24" 
      bordered extra={
      <Link to={URL.JOB_ADD}>
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
    </div>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo(),

});

const withConnect = connect(mapStateToProps);

export default withConnect(Job);

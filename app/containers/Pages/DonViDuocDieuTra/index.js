import React, { Component, Fragment } from 'react';
import { Input, Button, Form, Table, Popconfirm, message, Card, Tooltip } from "antd";
import { DeleteOutlined, PrinterOutlined, PlusOutlined, UnorderedListOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { add, getById, getAll, delById, updateById } from '@services/donviduocdieutraService';
import { PAGINATION_CONFIG, CONSTANTS } from '@constants';
import { makeGetMyInfo } from '../../Layout/HeaderComponent/HeaderProvider/selectors';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import Search  from "@components/Search/Search";
import { stringify } from 'qs';
import queryString from 'query-string';
import { URL } from "../../../constants/URL";
import {dateFormatter} from '@commons/dateFormat';
import { withLoaiPhieu } from "@reduxApp/LoaiPhieu/connect";
import { withTinhThanh } from "@reduxApp/TinhThanh/connect";
import { compose } from 'redux';

class DonViDuocDieuTra extends Component {

  columns = [
    {
      title: 'Tên cơ sở',
      dataIndex: 'tencoso',
      width: 150,
    },
    {
      title: 'Người đại diện',
      render: (value) => this.showThongTinCoSo(value),
      width: 150,
    },
    {
      title: 'Địa chỉ hoạt động',
      render: (value) => this.showDiaChiHoatDong(value),
      width: 150,
    },
    // {
    //   title: 'Thuộc Loại phiếu',
    //   render: (value) => this.showTenPhieu(value),
    //   width: 250,
    // },
    {
      title: 'Hành động',
      render: (value) => this.formatActionCell(value),
      width: 150,
      align: 'center'
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataRes: [],
      page: 1,
      limit: 10,
      totalDocs: 0
    };
  }

  componentDidMount() {
    this.getDataFilter();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getDataFilter()
    }
  }

  async getDataFilter() {
    let search = queryString.parse(this.props.location.search);
    let page = parseInt(search.page ? search.page : this.state.page);
    let limit = parseInt(search.limit ? search.limit : this.state.limit);
    let queryStr = ''
    queryStr += `${search.tencoso ? '&tencoso[like]={0}'.format(search.tencoso) : ''}`
    queryStr += `${search.from_date ? '&created_at[from]={0}'.format(search.from_date) : ''}`
    queryStr += `${search.to_date ? '&created_at[to]={0}'.format(search.to_date) : ''}`
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
      message.success('Xoá thành công');
    }
  }

  formatActionCell(value) {
    return <>
      <Link to={URL.DON_VI_DUOC_DIEU_TRA_ID.format(value._id)}>
        <Tooltip title={'Xem chi tiết'} color="#2db7f5">
          <Button icon={<EyeOutlined/>} size='small' type="primary" className='mr-1'></Button>
        </Tooltip>
      </Link>
      <Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"
                  onConfirm={() => this.handleDelete(value)}
                  cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>
        <Tooltip title={'Xóa dữ liệu'} color="#f50">
        {this.props.myInfoResponse.role === CONSTANTS.ADMIN ?   <Button icon={<DeleteOutlined/>} type='danger' size='small' className="mr-1"></Button> : ''}
     
        </Tooltip>
      </Popconfirm>

    </>;
  }

  showTenPhieu(value) {
    // console.log(value,'value')
    return <React.Fragment>
    {       
      <div>{value.loaiphieu_id.tenphieu} </div>
    }
    
  </React.Fragment>
  }

  showDiaChiHoatDong(value) {
    // console.log(value,'value')
    return <React.Fragment>
    {       
        <>
          {value.phuongxahoatdong_id.tenphuongxa}
          - {value.quanhuyenhoatdong_id.tenqh}
          - {value.tinhthanhhoatdong_id.tentinh}
        </>
    }
    
  </React.Fragment>
  }

  showThongTinCoSo(value) {
    // console.log(value,'value')
    return <React.Fragment>
    {       
        <div>
        - Họ tên:  {value.nguoidaidien} <br></br>
        - Điện thoại {value.dienthoai} 

        </div>
    }
    
  </React.Fragment>
  }

  handleRefresh = (newQuery, changeTable) => {
    const { location, history } = this.props;
    const { pathname } = location;
    let {page, limit} = this.state;
    let objFilterTable = {page, limit }
    if(changeTable){
      newQuery = queryString.parse(this.props.location.search)
      delete newQuery.page
      delete newQuery.limit
    }
    newQuery = Object.assign(objFilterTable, newQuery);
    history.push({ pathname, search: stringify({ ...newQuery }, { arrayFormat: "repeat" })
    });
  };

  onChangeTable = (page) => {
    this.setState({page: page.current, limit: page.pageSize},
      () => {this.handleRefresh({},true)})
  }

  render() {
    const { loading, loaiphieu, tinhthanh } = this.props;
    // console.log(loaiphieu, tinhthanh, 'loaiphieuloaiphieu')
    const { dataRes, totalDocs, page, limit, _id } = this.state;
    const dataSearch = [{
      type: 'text',
      name: 'tencoso',
      label: 'Tên cơ sở'
    },
      {
        type: 'date',
        name: 'from_date',
        label: 'Từ ngày'
      },
      {
        type: 'date',
        name: 'to_date',
        label: 'Đến ngày'
      }
    ]
    return <div>

      <Card size="small" title={<span>
        <UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách đơn vị được điều tra
      </span>} md="24" bordered extra={
      <Link to={URL.DON_VI_DUOC_DIEU_TRA_ADD}>
        {this.props.myInfoResponse.role === CONSTANTS.ADMIN ?   <Button type="primary" className='pull-right' size="small" icon={<PlusOutlined/>}>Thêm</Button> : ''}
        
      </Link>}>
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
export default compose(withConnect, withLoaiPhieu, withTinhThanh)(DonViDuocDieuTra);



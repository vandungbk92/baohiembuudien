import React, { Component, Fragment } from 'react';
import { Input, Button, Form, Table, Popconfirm, message, Card, Tooltip } from 'antd';
import { DeleteOutlined,DownloadOutlined, PlusOutlined, UnorderedListOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { add, getById, getAll, delById, updateById } from '@services/phieudieutra/phieudieutraService';
import { PAGINATION_CONFIG } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import Search from '@components/Search/Search';
import { stringify } from 'qs';
import queryString from 'query-string';
import { URL } from '../../../../constants/URL';
import { withLoaiPhieu } from '@reduxApp/LoaiPhieu/connect';
import { withTinhThanh } from '@reduxApp/TinhThanh/connect';
import { compose } from 'redux';
import { getDataPhieu } from '@services/phieudieutra/inphieuService';
import {generateDocument} from '../ChiTiet/TaiPhieu/TaiPhieu'



class DanhSachPhieu extends Component {

  columns = [
    {
      title: 'Tên cơ sở',
      render: (value) => this.showTenCoSo(value),
      width: 150,
    },
    {
      title: 'Thông tin đơn vị được điều tra',
      render: (value) => this.showThongTinCoSo(value),
      width: 150,
    },
    {
      title: 'Địa điểm hoạt động  ',
      render: (value) => this.showDiaChiHoatDong(value),
      width: 150,
    },
    
    {
      title: 'Hành động',
      render: (value) => this.formatActionCell(value),
      width: 100,
      align: 'center',
    },
  ];

  constructor(props) {
    super(props);

    let { loaiphieu, match } = props;
    let loaiphieu_id = null;
    loaiphieu.forEach(curr => {
      if (curr.link === match.url) {
        loaiphieu_id = {
          _id: curr._id,
          tenphieu: curr.tenphieu,
          mota: curr.mota,
          maphieu: curr.maphieu,
          url_add: curr.link + '/add',
          url_edit: curr.link + '/{0}',
          link: curr.link
        };
      }
    });
    this.state = {
      dataRes: [],
      page: 1,
      limit: 10,
      totalDocs: 0,
      loaiphieu_id,
    };
  }

  componentDidMount() {
    this.getDataFilter();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getDataFilter();
    }
  }

  async downloadPhieu(value) {
    let {loaiphieu_id} = this.state
    let apiRes = await getDataPhieu(value._id)
    if(apiRes){
      generateDocument(apiRes, loaiphieu_id)
    }
  }

  async getDataFilter() {
    let search = queryString.parse(this.props.location.search);
    let page = parseInt(search.page ? search.page : this.state.page);
    let limit = parseInt(search.limit ? search.limit : this.state.limit);
    let queryStr = '';
    queryStr += `&loaiphieu_id=${this.state.loaiphieu_id._id}`;
    queryStr += `${search.tencoso ? '&tencoso[like]={0}'.format(search.tencoso) : ''}`;
    queryStr += `${search.from_date ? '&created_at[from]={0}'.format(search.from_date) : ''}`;
    queryStr += `${search.to_date ? '&created_at[to]={0}'.format(search.to_date) : ''}`;
    const apiResponse = await getAll(page, limit, queryStr);
    if (apiResponse) {
      const dataRes = apiResponse.docs;
      this.setState({
        dataRes,
        totalDocs: apiResponse.total,
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
    let { loaiphieu_id } = this.state;
    return <>
        <Tooltip title={'Tải phiếu'} color="#2db7f5">
          <Button onClick={() => this.downloadPhieu(value)} icon={<DownloadOutlined/>} size='small' type="primary" className='mr-1'></Button>
        </Tooltip>
      <Link to={URL.PHIEU_DIEU_TRA_ID.format(value._id)}>
        <Tooltip title={'Xem chi tiết'} color="#2db7f5">
          <Button icon={<EyeOutlined/>} size='small' type="primary" className='mr-1'></Button>
        </Tooltip>
      </Link>
      <Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"
                  onConfirm={() => this.handleDelete(value)}
                  cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>
        <Tooltip title={'Xóa dữ liệu'} color="#f50">
          <Button icon={<DeleteOutlined/>} type='danger' size='small' className="mr-1"></Button>
        </Tooltip>
      </Popconfirm>


    </>;
  }

  showThongTinCoSo(value) {
    return <React.Fragment>
      {
        <>
        <div>- Người đại diện: {value.nguoidaidien}</div>
        <div>- Số điện thoại: {value.dienthoai}</div>
      </>
      }

    </React.Fragment>;
  }

  showDiaChiHoatDong(value) {
    return <React.Fragment>
      {
        <>
          {value.phuongxahoatdong_id.tenphuongxa}
          - {value.quanhuyenhoatdong_id.tenqh}
          - {value.tinhthanhhoatdong_id.tentinh}
        </>
      }
      </React.Fragment>;
  }

  showTenCoSo(value) {
    return <React.Fragment>
      {
        <>
          <div>{value.tencoso}</div>
        </>
      }

    </React.Fragment>;
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

  render() {
    const { loading, loaiphieu } = this.props;

    const { dataRes, totalDocs, page, limit, loaiphieu_id } = this.state;

    const dataSearch = [{
      type: 'date',
      name: 'from_date',
      label: 'Từ ngày',
    },
      {
        type: 'date',
        name: 'to_date',
        label: 'Đến ngày',
      },
      {
        type: 'text',
        operation: 'like',
        name: 'tencoso',
        label: 'Tên cơ sở',
      }
    ];
    return <div>
      <Card size="small" title={<span>
        <UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách phiếu
      </span>} md="24" bordered extra={
        <Link to={loaiphieu_id.url_add}>
          <Button type="primary" className='pull-right' size="small" icon={<PlusOutlined/>}>Thêm</Button>
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
});


const withConnect = connect(mapStateToProps);
export default compose(withConnect, withLoaiPhieu, withTinhThanh)(DanhSachPhieu);



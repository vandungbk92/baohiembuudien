import React, { Component, Fragment } from 'react';
import { Input, Button, Form, Table, Popconfirm, message, Modal, InputNumber, Card, Tooltip, Upload } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  SaveOutlined,
  UploadOutlined,
  EyeOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { add, getById, getAll, delById, updateById } from '@services/danhmucloaiphieuService';
import { PAGINATION_CONFIG, CONSTANTS, ROLE_OPTIONS } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import Search from '@components/Search/Search';
import { stringify } from 'qs';
import queryString from 'query-string';
import { uploadFiles } from '@services/uploadServices';
import { makeGetMyInfo } from '../../Layout/HeaderComponent/HeaderProvider/selectors';
import { URL } from '../../../constants/URL';
import { Link } from 'react-router-dom';


class DanhMucLoaiPhieu extends Component {

  columns = [
    {
      title: 'Thứ tự',
      dataIndex: 'thutu',
      width: 100,
      align: 'center',
    },
    {
      title: 'Tên phiếu',
      render: (value, rowData, rowIndex) => <div>{rowData.maphieu + ' - ' + value}</div>,
      dataIndex: 'tenphieu',
      width: 400,
    },
    {
      title: 'Mô tả',
      dataIndex: 'mota',
      width: 400,
    },
    {
      title: 'Mẫu phiếu',
      render: (value, rowData, rowIndex) => this.teptinShow(rowData),
      width: 300
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
      page: 1,
      limit: 10,
      totalDocs: 0,
      _id: '',
      tenphieu: '',
      mota: '',
      thutu: 0,
      files: [],
      fileList: [],
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
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
    queryStr += `${search.tenphieu ? '&tenphieu[like]={0}'.format(search.tenphieu) : ''}`;
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
      message.success('Xoá Tên phiếu thành công');
    }
  }

  formatActionCell(value) {
      return <Fragment>
        <Link to={URL.LOAI_PHIEU_ID.format(value._id)}>
          <Tooltip title={'Xem chi tiết'} color="#2db7f5">
            <Button icon={<EyeOutlined/>} size='small' type="primary" className='mr-1'></Button>
          </Tooltip>
        </Link>
      </Fragment>;
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


  teptinShow(rowData) {
    return <React.Fragment>
      {
        rowData.files.map((file, idx) => {
          return (<a key={idx} download href={'/api/files/' + file}>-{file}<br/></a>);
        })
      }
    </React.Fragment>;
  }

  render() {
    let { myInfoResponse } = this.props;
    const { loading } = this.props;
    const { dataRes, totalDocs, page, limit, _id } = this.state;
    const dataSearch = [{
      type: 'text',
      operation: 'like',
      name: 'tenphieu',
      label: 'Tên phiếu',
    }];
    return <div>
      <Card size="small" title={<span>
        <UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách loại phiếu
        </span>} md="24" bordered>
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

export default withConnect(DanhMucLoaiPhieu);

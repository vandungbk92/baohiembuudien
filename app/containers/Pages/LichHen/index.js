import React, { Component, Fragment } from 'react';
import {
  Button,
  Table,
  Tag,
  Popconfirm,
  message,
  Card,
  Tooltip,
  Form,
  Input,
  InputNumber,
  Modal,
  Col,
  Select, Row,
} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,SyncOutlined, CloseOutlined,CheckCircleOutlined,CloseCircleOutlined, SaveOutlined, BellOutlined,StarOutlined
} from '@ant-design/icons';
import { PAGINATION_CONFIG, RULE, TRANG_THAI_LICH_HEN } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import Search from '@components/Search/Search';
import { stringify } from 'qs';
import queryString from 'query-string';
import { add as addThongBao, getAll as getAllThongBao } from '@services/thongbaochung/thongbaochungService';
import { makeGetMyInfo } from '../../Layout/HeaderComponent/HeaderProvider/selectors';
import { CONSTANTS } from '@constants';
import {getAll, updateById, delById, getDanhGiaByLichHen} from '@services/lichhen/lichhenService'
import {getAll as getAllCaddy, getById as getCaddyByID} from '@services/quanlycaddy/caddyService'
import ReactStars from "react-rating-stars-component";

import axios from 'axios'
import { URL } from "../../../constants/URL";
import { Link } from 'react-router-dom';
import {dateFormatter} from '@commons/dateFormat';

class LichHen extends Component {

  columns = [

    {
      title: 'Ngày hẹn',
      dataIndex: 'ngayhen',
      width: 150,
      align: 'center',
      render:(value) => dateFormatter(value),
    },
    {
      title: 'Thông tin khách đặt',
      dataIndex: 'khachchoi_id',
      width: 250,
      align: 'center',
      render : (value) => this.showKhachDat(value),
    },
    {
      title: 'Tee Time',
      dataIndex: 'khunggio_id',
      width: 100,
      align: 'center',
      render : (value) => this.showKhungGio(value),
    },
    {
      title: 'Loại lỗ',
      dataIndex: 'solo',
      width: 100,
      align: 'center',
    },
    {
      title: 'Số người chơi ',
      dataIndex: 'songuoichoi',
      width: 100,
      align: 'center',
    },
    {
      title: 'Caddy chơi cùng ',
      dataIndex: 'caddy_id',
      width: 150,
      align: 'center',
      render : (value) => this.showTTCaddy(value),


    },
    {
      title: 'Trạng thái ',
      dataIndex: 'trangthai',
      width: 150,
      align: 'center',
      render: (value) => this.showTrangThai(value)
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
      dslichhen:[],
      dsCaddy:[],
      page: 1,
      limit: 10,
      totalDocs: 0,
      danhgia:'',
      data: null,
      lichhenCurrent :''
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    let dataApi = await getAll(1, 0)
    if(dataApi){
      this.setState({dslichhen: dataApi.docs})
    }
    this.getDataFilter();
  }
  async getAllCaddy(){
    let dataCaddy = await getAllCaddy(1,0)
    this.setState({
      dsCaddy : dataCaddy.docs
    })
  }

  async getDanhGiaByLichHen(idlichhen){
    let danhgia = await getDanhGiaByLichHen(idlichhen)
    this.setState({
      danhgia : danhgia
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getDataFilter();
    }
  }

  addThongBao = async () => {
    const data = {
      loaithongbao: 'LichHen',
      link_push_id: this.state.lichhenCurrent._id,
    };
    const apiResponse = await addThongBao(data);
    if (apiResponse) {
      message.success('Đẩy thông báo thành công');
    }
  };

  addThongBaoConfirm = async (lichhenid) => {
    const data = {
      loaithongbao: 'LichHen',
      link_push_id: lichhenid,
    };
    const apiResponse = await addThongBao(data);
    if (apiResponse) {
      message.success('Đẩy thông báo thành công');
    }
  };

  async getDataFilter() {
    let search = queryString.parse(this.props.location.search);
    let page = parseInt(search.page ? search.page : this.state.page);
    let limit = parseInt(search.limit ? search.limit : this.state.limit);
    let queryStr = '';
    queryStr += `${search.hoten ? '&hoten[like]={0}'.format(search.hoten) : ''}`;
    queryStr += `${search.trangthai ? '&trangthai={0}'.format(search.trangthai) : ''}`;
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
      message.success('Xoá lịch hẹn thành công');
    }
  }

  showKhachDat(value){
    return <>
      <div className="float-left"> - Họ tên: {value.full_name} </div>
      <br/>
      <div className="float-left">- Điện thoại: {value.phone} </div>
      <br/>
      <div className="float-left">- Mail: {value.email} </div>
    </>;

  }

  showKhungGio(value){
    return <>
      <div className="style-time"> {value.khunggio} </div>
      <br/>
      {/*<div className="style-time">Mô tả: {value.mota} </div>*/}
    </>;
  }
  showTrangThai(value){
    return <>
      {value === 'PENDING' ? <Tag icon={<SyncOutlined spin />} color="processing"> Đang chờ</Tag>  : value === 'APPROVED' ?
        <Tag color="#87d068"> Đã  xác nhận</Tag> :  value === 'COMPLETED' ?  <Tag icon={<CheckCircleOutlined />} color="success"> Đã chơi xong</Tag> :
          <Tag icon={<CloseCircleOutlined />} color="error"> Đã  hủy</Tag>
      }
    </>;
  }

  showTTCaddy(value){
    return <>
      {value = value ? value.hoten : 'Chưa chọn caddy'}
    </>;

  }
  formatActionCell(value) {
    return <>
      {
      value.trangthai === 'PENDING' || value.trangthai === 'APPROVED'  ? <Tooltip title={'Xét duyệt lịch hẹn'} color="#2db7f5">
        <Button icon={<EyeOutlined />} size='small' type="primary" className='mr-1' onClick={ () => this.toggleModal(value)}></Button>
      </Tooltip> : ''
    }
      {
        value.trangthai === 'COMPLETED' ? <Tooltip title={'Xem đánh giá'} color="#e3b91e">
          <Button icon={<StarOutlined style={{ fontSize: '16px', color: '#e3b91e' }} />} size='small'  color='yellow' className='mr-1' onClick={ () => this.toggleModalDanhGia(value)}></Button>
        </Tooltip> : ''
      }

      <Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"
                  onConfirm={() => this.addThongBaoConfirm(value._id)}
                  cancelText='Huỷ' okText='Đẩy thông báo trạng thái lịch hẹn' okButtonProps={{ type: 'danger' }}>
        <Tooltip placement="right" title={'Đẩy thông báo'} color="#f50">
          { this.props.myInfoResponse.role === CONSTANTS.ADMIN? <Button icon={<BellOutlined/>} type='default' size='small' className="mr-1"></Button> :''}
        </Tooltip>
      </Popconfirm>

      {/*<Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"*/}
      {/*            onConfirm={() => this.handleDelete(value)}*/}
      {/*            cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>*/}
      {/*  <Tooltip placement="right" title={'Xóa dữ liệu'} color="#f50">*/}
      {/*    { this.props.myInfoResponse.role === CONSTANTS.ADMIN? <Button icon={<DeleteOutlined/>} type='danger' size='small' className="mr-1"></Button> :''}*/}
      {/*  </Tooltip>*/}
      {/*</Popconfirm>*/}
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

  toggleModal = async (value) => {
    const { showModal } = this.state;
    this.getAllCaddy()
    await this.setState({ showModal: !showModal, _id: value._id, lichhenCurrent : value  });
    this.formRef.current.setFieldsValue({
      caddy_id : value.caddy_id._id,
      trangthai : value.trangthai
    });
  };


  toggleModalDanhGia = async (value) => {
    const { showModalDanhGia } = this.state;
    let danhgia = await getDanhGiaByLichHen(value._id)
    await this.setState({ showModalDanhGia: !showModalDanhGia, danhgia : danhgia});
  };

  toggleModalDanhGiaCancel = async (value) => {
    const { showModalDanhGia } = this.state;
    await this.setState({ showModalDanhGia: !showModalDanhGia});
  };
  handleSaveData = async data => {
    const { _id, lichhenCurrent } = this.state;
    lichhenCurrent.caddy_id = data.caddy_id
    lichhenCurrent.trangthai = data.trangthai
    const apiResponse = await updateById(_id, lichhenCurrent);
      if (apiResponse) {
        const dataRes = this.state.dataRes.map(data => {
          if (data._id === apiResponse._id) {
            return apiResponse;
          }
          return data;
        });
        await this.setState({ dataRes, showModal: false });
        message.success("Chỉnh sửa dữ liệu thành công")
        // this.addThongBao()
        this.getDataFilter()

    }
  }

  render() {
    const { loading } = this.props;
    const { dataRes, totalDocs, page, limit, dslichhen, danhgia } = this.state;
    const dataSearch = [

    { type: 'select',
    name: 'trangthai',
    label: 'Trạng thái',
    options:  TRANG_THAI_LICH_HEN,
    key: 'value',
    value: 'label'}
  ];
    return <div>


      <Card size="small" title={<span>
        <UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách LichHen
      </span>}
      md="24"
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

      <Modal
        title={' Xét duyệt lịch hẹn '}
        visible={this.state.showModal}
        onCancel={loading ? () => null : this.toggleModal}
        footer={[
          <Button
            key={1}
            size="small"
            onClick={this.toggleModal}
            disabled={loading}
            type="danger"
            icon={<CloseOutlined />}
          >
            Huỷ
          </Button>,
          <Button
            key={2}
            size="small"
            type="primary"
            htmlType="submit"
            form="formModal"
            loading={loading}
            icon={<SaveOutlined />}
          >
            {"Lưu"}
          </Button>
        ]}
      >
        <Form
          ref={this.formRef}
          id="formModal"
          name="formModal"
          autoComplete="off"
          onFinish={this.handleSaveData}
          labelAlign="right"
        >
          <Col >
            <Form.Item
              name="caddy_id"
              label="Danh sách Caddy"
              rules={[{ required: false, message: 'Caddy là bắt buộc' }]}
              validateTrigger={['onBlur', 'onChange']}
            >
              <Select
                placeholder="Chọn caddy"
                disabled={this.props.loading}
                dropdownClassName="small"
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                {this.state.dsCaddy?.map(data => (
                  <Select.Option key={data._id} value={data._id}>
                    {data.hoten}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col >
            <Form.Item
              label="Trạng thái"
              name="trangthai"
              validateTrigger={["onChange", "onBlur"]}
              rules={[{ required: true, message: "trạng thái không được để trống" }]}
            >
                <Select
                  placeholder="Chọn trạng thái"
                  disabled={this.props.loading}
                  dropdownClassName="small"
                  filterOption={(input, option) => { return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }}>
                  {TRANG_THAI_LICH_HEN.map(data => (
                    <Select.Option key={data.value} value={data.value}>
                      {data.label}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button icon={<BellOutlined />} size="small" type="primary" onClick={() => this.addThongBao()}>
                Đẩy thông báo
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Modal>



      <Modal
        title={' Đánh giá của khách hàng'}
        visible={this.state.showModalDanhGia}
        onCancel={loading ? () => null : this.toggleModalDanhGiaCancel}
        footer={[
          <Button
            key={1}
            size="small"
            onClick={this.toggleModalDanhGiaCancel}
            disabled={loading}
            type="danger"
            icon={<CloseOutlined />}
          >
            Huỷ
          </Button>,
        ]}
      >
        {danhgia ? <div>
          Chất lượng dịch vụ:
          <br/>
          <ReactStars
            count={5}
            value={parseInt(danhgia.diem)}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <br/>
        Nội dung đánh giá : {danhgia.noidung}
          </div> : <div>
          Chưa có đánh giá từ khách hàng

        </div>



        }

      </Modal>





    </div>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  myInfoResponse: makeGetMyInfo(),

});

const withConnect = connect(mapStateToProps);

export default withConnect(LichHen);

import React, { Component, Fragment } from 'react';
import { Input, InputNumber, Button, Form, Table, Popconfirm, message, Card, Row, Col, DatePicker, Skeleton,
  Divider, Modal, Select, Radio, Checkbox, Upload } from 'antd';
import { SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { getAll } from '@services/donviduocdieutraService';
import produce from 'immer';
import { withLoaiPhieu } from '@reduxApp/LoaiPhieu/connect';
import { withTinhThanh } from '@reduxApp/TinhThanh/connect';
import { compose } from 'redux';
import { PAGINATION_CONFIG } from '@constants';

const layoutFilterModal = { labelAlign: 'left', labelCol: { span: 10 }, wrapperCol: { span: 14 } };

class ModalDonVi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      pageModal: 1,
      limitModal: 20,
      totalDocsModal: 0,
      objectFilterModal: {},
      dsDonVi: [],
      selectedRows: null,
      selectedRowKeys: null,
    };
    this.formRefModal = React.createRef();

    this.columnsModal = [
      { title: 'Tên cơ sở', dataIndex: 'tencoso' },
      { title: 'Chủ nguồn thải', dataIndex: 'chunguonthai' },
      { title: 'Người đại diện', dataIndex: 'nguoidaidien' },
    ];
  }


  async componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState) {
    let { showModal } = this.props;
    if (showModal !== prevProps.showModal) {
      this.setState({ showModal: true, selectedRows: null,  selectedRowKeys: null});
      this.getDsDonViModal(1, 20, {});
    }
  }

  toggleModal = async () => {
    let { showModal } = this.state;
    if (showModal) {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: !this.state.showModal });
    }
  };

  onFinishFilterModal = async () => {
    const fields = this.formRefModal.current.getFieldsValue();
    const objectFilterModal = produce(fields, draft => {
      draft.tencoso = draft.tencoso;
      draft.chunguonthai = draft.chunguonthai;
      draft.nguoidaidien = draft.nguoidaidien;
    });
    this.getDsDonViModal(1, 20, objectFilterModal);
  };

  getDsDonViModal = async (page, limit, objectFilterModal) => {
    let {loaiphieu_id} = this.props;
    let queryStr = `${loaiphieu_id ? '&loaiphieu_id={0}'.format(loaiphieu_id._id) : ''}`;
    queryStr += `${objectFilterModal.tencoso ? '&tencoso[like]={0}'.format(objectFilterModal.tencoso) : ''}`;
    queryStr += `${objectFilterModal.chunguonthai ? '&chunguonthai[like]={0}'.format(objectFilterModal.chunguonthai) : ''}`;
    queryStr += `${objectFilterModal.nguoidaidien ? '&nguoidaidien[like]={0}'.format(objectFilterModal.nguoidaidien) : ''}`;
    const dsDonViApi = await getAll(page, limit, queryStr);
    if (dsDonViApi) {
      this.setState({
        dsDonVi: dsDonViApi.docs,
        totalDocsModal: dsDonViApi.totalDocs,
        limitModal: dsDonViApi.limit,
        pageModal: dsDonViApi.page,
        objectFilterModal,
      });
    }
  };

  clearFilterModal = () => {
    const fields = this.formRefModal.current.getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    this.formRefModal.current.setFieldsValue(fields);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  onChangeTableModal = (page) => {
    let {objectFilterModal} = this.state
    this.formRefModal.current.setFieldsValue(objectFilterModal);
    this.getDsDonViModal(page.current, page.pageSize, objectFilterModal);
  };

  handleAddDonVi = () => {
    let { selectedRows } = this.state;
    this.props.setValueForm(selectedRows[0]);
    this.setState({showModal: false})
  }

  render() {

    const { loading, tinhthanh } = this.props;
    const { showModal } = this.state;
    return <Modal title='Đơn vị được điều tra'
                  width={'80%'}
                  style={{ top: 10 }}
                  visible={showModal}
                  onCancel={loading ? () => null : this.toggleModal}
                  footer={[
                    <Button size='small' key={1} onClick={this.toggleModal} disabled={loading}>Đóng</Button>,
                    <Button size='small' key={2} type="primary" htmlType="button" form="formRefModal"
                            icon={<i className='fa fa-check mr-1'/>} disabled={loading}
                            onClick={this.handleAddDonVi}
                    >
                      Xác nhận
                    </Button>,
                  ]}>
      <Form ref={this.formRefModal} id="formRefModal" className='form-no-feedback' name='formRefModal'
            autoComplete='off' size='small'
            onFinish={this.onFinishFilterModal}>
        <Divider orientation="left" plain>
          <span>Điều kiện lọc</span>
        </Divider>
        <Row gutter={10}>
          <Col xs={24} md={8}>
            <Form.Item label="Tên cơ sở" name="tencoso" {...layoutFilterModal}>
              <Input placeholder='Tên cơ sở' disabled={loading}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Chủ nguồn thải" name="chunguonthai" {...layoutFilterModal}>
              <Input placeholder='Chủ nguồn thải' disabled={loading}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Người đại diện" name="nguoidaidien" {...layoutFilterModal}>
              <Input placeholder='Người đại diện' disabled={loading}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} className='ml-auto'>
            <Button htmlType='submit' size='small' type='primary' className='pull-right'
                    loading={loading} icon={<i className="fa fa-filter mr-1"/>}>
              Lọc
            </Button>
            <Button htmlType='button' size='small' className='pull-right mr-2' danger
                    icon={<DeleteOutlined/>} onClick={this.clearFilterModal.bind(this)}>
              Xoá bộ lọc
            </Button>
          </Col>
        </Row>
      </Form>

      <Divider orientation="left" plain>
        <span>Danh sách đơn vị</span>
      </Divider>
      <Table columns={this.columnsModal} dataSource={this.state.dsDonVi}
             bordered
             pagination={{
               ...PAGINATION_CONFIG,
               size: 'small',
               pageSizeOptions: [20, 50, 100],
               showSizeChanger: true,
               defaultPageSize: 20,
               current: this.state.pageModal,
               pageSize: this.state.limitModal,
               total: this.state.totalDocsModal,
             }}
             scroll={{ y: 'calc(100vh - 28em)' }}
             rowKey="_id"
             onChange={this.onChangeTableModal}
             loading={loading} size='small'
             fixed={true}
             rowSelection={{
               type: 'radio',
               onChange: this.onSelectChange,
               fixed: true,
               selectedRowKeys: this.state.selectedRowKeys
             }}/>
    </Modal>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withLoaiPhieu, withTinhThanh)(ModalDonVi);



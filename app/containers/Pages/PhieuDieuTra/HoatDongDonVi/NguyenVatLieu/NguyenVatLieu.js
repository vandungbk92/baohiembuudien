import React, { Component } from 'react';
import EditableTable from 'antd-editabletable';
import { Button, Card, Popconfirm, Table, Row, message } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getDsNguyenVatLieu, postDsNguyenVatLieu } from '@services/phieudieutra/phieudieutraService';
import { delById } from '@services/phieudieutra/nguyenvatlieuService';
import DonViModal from 'Pages/DanhMuc/DonVi/DonViModal';
import DMNguyenVatLieuModal from '@containers/Pages/DanhMuc/DMNguyenVatLieu/DMNguyenVatLieuModal';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import {
  getDataSave,
  getDataSourceAdd,
  getDataSourceEdit
} from '@containers/Pages/PhieuDieuTra/HoatDongDonVi/NguyenVatLieu/nguyenvatlieu.utils';
import '../tableedit.scss';
import { selectDonVi, selectHoaChat, selectNguyenVatLieu } from '@reduxApp/HoatDongSanXuat/selectors';
class NguyenVatLieu extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: '_id',
      width: '5%',
      render: (v, r, i) => i + 1,
    },
    {
      title: 'Tên nguyên, vật liệu',
      render: (value) => value.tennguyenvatlieu,
      dataIndex: 'nguyenvatlieu_id',
      width: '45%',
    },
    {
      title: 'Đơn vị',
      render: (value) => value.tendonvi,
      dataIndex: 'donvi_id',
      width: '30%',
    },
    {
      title: 'Lượng sử dụng',
      dataIndex: 'luongsudung',
      width: '20%',
    },
  ];

  columnsEdit = [
    {
      title: 'TT',
      render: (value, row, index) => <>{index + 1}</>,
      width: '5%',
    },
    {
      title: 'Tên nguyên, vật liệu',
      dataIndex: 'nguyenvatlieu_id',
      width: '45%',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'donvi_id',
      align: 'center',
      width: '30%',
    },
    {
      title: 'Lượng sử dụng',
      dataIndex: 'luongsudung',
      align: 'center',
      width: '20%',
    },

    {
      title: '',
      dataIndex: '_id',
      width: '5%',
      render: (value, record) => <Popconfirm title="Bạn chắc chắn muốn xoá?"
                                     onConfirm={() => this.handleDelete(record)}
                                     cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>
        <Button icon={<DeleteOutlined/>} type='danger' size='small'></Button>
      </Popconfirm>,
      align: 'center',
    },
  ]

  constructor(props) {
    super(props);

    this.state = {
      dataSourceEdit: [],
      dataSource: [],
      edit: false
    };
  }

  async componentDidMount() {
    let {match} = this.props;
    let {id} = match.params;
    if(id){
      let dataSource = await getDsNguyenVatLieu(id);
      this.setState({dataSource})
    }
  }
  componentDidUpdate(prevProps,prevState){
    let {nguyenvatlieu, donvi} = this.props;
    //let {dataSourceEdit} = this.state
    if(nguyenvatlieu !==prevProps.nguyenvatlieu || donvi !== prevProps.donvi){
      let dataSourceEdit = getDataSourceEdit(this.state.dataSource, nguyenvatlieu, donvi);
      this.setState({dataSourceEdit: [...dataSourceEdit, getDataSourceAdd(nguyenvatlieu, donvi)]});
    }
  }

  validateRules = [];
  getValidateFieldsMethod = validateFields => {
    this.validateRules.push(validateFields);
  };

  funcChangeUpdate = () => {
    let {nguyenvatlieu, donvi} = this.props;
    let dataSourceEdit = getDataSourceEdit(this.state.dataSource, nguyenvatlieu, donvi);
    this.setState({edit: !this.state.edit, dataSourceEdit});
  }

  funcSave = async () => {
    const result = await Promise.all(this.validateRules.map(v => v()));
    let checkValidate = result[0];
    let {dataSourceEdit} = this.state;
    let {id} = this.props.match.params;
    if(!checkValidate) {
      let {dsthemmoi, dscapnhat} = getDataSave(dataSourceEdit);
      if(dsthemmoi.length || dscapnhat.length){
        let dataSource = await postDsNguyenVatLieu(id, {dsthemmoi, dscapnhat})
        // nếu lưu thành công.
        if(dataSource){
          message.success('Cập nhật nguyên, vật liệu thành công');
          this.setState({dataSource, edit: !this.state.edit});
        }
      }else{
        this.setState({edit: !this.state.edit});
      }
    }
  }

  handleDelete = async (row) => {
    let {dataSourceEdit, dataSource} = this.state;
    if(row.addNew){
      dataSourceEdit = dataSourceEdit.filter(data => {
        return data._id !== row._id
      })
    }else{
      let delRes = await delById(row._id);
      if(delRes){
        message.success('Xóa nguyên, vật liệu thành công');
        dataSourceEdit = dataSourceEdit.filter(data => {
          return data._id !== row._id
        })
        dataSource = dataSource.filter(data => {
          return data._id !== row._id
        })
      }
    }
    this.setState({dataSourceEdit, dataSource})
  };

  render() {
    const { dataSourceEdit } = this.state;
    const { nguyenvatlieu, donvi } = this.props;
    if (this.state.edit)
      return (
        <Card size="small" title={<span>
        2. Các nguyên, vật liệu sử dụng chính
      </span>} md="24" extra={<Row gutter={20}>
          <Button size='small' type="primary" ghost icon={<PlusOutlined/>}
                  onClick={() => {this.setState({modalNguyenVatLieu: !this.state.modalNguyenVatLieu})}}
          >Nguyên, vật liệu</Button>
          <Button size='small' type="primary" ghost className="mx-1" icon={<PlusOutlined/>}
                  onClick={() => {this.setState({modalDonVi: !this.state.modalDonVi})}}
          >Đơn vị</Button>
          <Button size='small' type="primary" icon={<SaveOutlined/>}
                  onClick={this.funcSave}
          >Lưu</Button>
        </Row>}>
          <EditableTable
            pagination={false}
            size="small"
            showAdd={true}
            rowKey={record => {
              return record._id;
            }}
            onAdd={() => {
              this.setState({
                dataSourceEdit: [...dataSourceEdit, getDataSourceAdd(nguyenvatlieu, donvi)],
              });
            }}
            addText="Thêm mới"
            columns={this.columnsEdit}
            getValidateFieldsMethod={this.getValidateFieldsMethod}
            dataSource={dataSourceEdit}
            onChange={(key, value, record, newDataSource) => {
              newDataSource = newDataSource.map(data => {
                if(!data.addNew && data._id === record._id){
                  data.update = true
                }
                return data
              })
              this.setState({ dataSourceEdit: newDataSource });
            }}
            addBtnClassName="ant-btn-sm"
            disabled={false}
          />
          <DMNguyenVatLieuModal showModal={this.state.modalNguyenVatLieu}/>
          <DonViModal showModal={this.state.modalDonVi}/>
        </Card>
      );

    return <Card size="small" title={<span>
        2. Các nguyên, vật liệu sử dụng chính
      </span>} md="24" extra={<Row gutter={20}>
      <Button size='small' type="primary" ghost icon={<EditOutlined />}
              onClick={this.funcChangeUpdate}
      >Cập nhật</Button>
    </Row>}>
      <Table loading={false} bordered columns={this.columns} dataSource={this.state.dataSource}
             size="small" rowKey="_id" pagination={false}/>
    </Card>
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  nguyenvatlieu: selectNguyenVatLieu,
  donvi: selectDonVi
});

const withConnect = connect(mapStateToProps);

export default withConnect(withRouter(NguyenVatLieu));


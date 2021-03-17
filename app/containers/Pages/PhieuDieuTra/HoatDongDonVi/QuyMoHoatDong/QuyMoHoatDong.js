import React, { Component } from 'react';
import EditableTable from 'antd-editabletable';
import { Button, Card, Popconfirm, Table, Row, message } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { URL } from '@url';
import { getDsQuyMo, postDsQuyMo } from '@services/phieudieutra/phieudieutraService';
import { delById } from '@services/phieudieutra/quymohoatdongService';
import CongNgheSanXuatModal from 'Pages/DanhMuc/CongNgheSanXuat/CongNgheSanXuatModal';
import SanPhamModal from 'Pages/DanhMuc/SanPham/SanPhamModal';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import {
  getDataSave,
  getDataSourceAdd,
  getDataSourceEdit
} from 'Pages/PhieuDieuTra/HoatDongDonVi/QuyMoHoatDong/quymo.utils';
import '../tableedit.scss';
import { selectCongNgheSX, selectSanPham } from '@reduxApp/HoatDongSanXuat/selectors';
class QuyMoHoatDong extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: '_id',
      width: '5%',
      render: (v, r, i) => i + 1,
    },
    {
      title: 'Tên các sản phẩm chính',
      render: (value) => value.tensanpham,
      dataIndex: 'sanpham_id',
      width: '28%',
    },
    {
      title: 'Công nghệ sản suất chính',
      render: (value) => value.tencongnghesx,
      dataIndex: 'congnghesx_id',
      width: '27%',
    },
    {
      title: 'Công suất thiết kế',
      dataIndex: 'congsuatthietke',
      width: '20%',
    },
    {
      title: 'Công suất hoạt động',
      dataIndex: 'congsuathoatdong',
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
      title: 'Tên các sản phẩm chính',
      dataIndex: 'sanpham_id',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Công nghệ sản xuất chính',
      dataIndex: 'congnghesx_id',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Công suất thiết kế',
      dataIndex: 'congsuatthietke',
      align: 'center',
      width: '25%',
    },
    {
      title: 'Công suất hoạt động',
      dataIndex: 'congsuathoatdong',
      align: 'center',
      width: '25%',
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
      let dataSource = await getDsQuyMo(id);
      this.setState({dataSource})
    }
  }

  validateRules = [];
  getValidateFieldsMethod = validateFields => {
    this.validateRules.push(validateFields);
  };
  componentDidUpdate(prevProps,prevState){
    let {sanpham, congnghesanxuat} = this.props;
    if(this.state.edit && (sanpham !==prevProps.sanpham || congnghesanxuat !== prevProps.congnghesanxuat)){
      let sanphamSel = sanpham.map(data => { return {name: data.tensanpham, value: data._id, key: data._id} })
      let connghesanxuatSel = congnghesanxuat.map(data => { return {name: data.tencongnghesx, value: data._id, key: data._id} })
      let dataSourceEdit = this.state.dataSourceEdit.map(data => {
        data.congnghesx_id.options = connghesanxuatSel
        data.sanpham_id.options = sanphamSel
        return data
      })
      this.setState({dataSourceEdit})
    }
  }

  funcChangeUpdate = () => {
    let {sanpham, congnghesanxuat} = this.props;
    let dataSourceEdit = getDataSourceEdit(this.state.dataSource, sanpham, congnghesanxuat);
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
        let dataSource = await postDsQuyMo(id, {dsthemmoi, dscapnhat})
        // nếu lưu thành công.
        if(dataSource){
          message.success('Cập nhật quy mô hoạt động thành công');
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
        message.success('Xóa quy mô hoạt động thành công');
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
    const { sanpham, congnghesanxuat } = this.props;

    if (this.state.edit)
      return (
        <Card size="small" title={<span>
        1. Quy mô hoạt động
      </span>} md="24" extra={<Row gutter={20}>
          <Button size='small' type="primary" ghost icon={<PlusOutlined/>}
                  onClick={() => {this.setState({modalSanPham: !this.state.modalSanPham})}}
          >Sản phẩm</Button>
          <Button size='small' type="primary" ghost className="mx-1" icon={<PlusOutlined/>}
                  onClick={() => {this.setState({modalCongNghe: !this.state.modalCongNghe})}}
          >Công nghệ</Button>
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
                dataSourceEdit: [...dataSourceEdit, getDataSourceAdd(sanpham, congnghesanxuat)],
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
          <SanPhamModal showModal={this.state.modalSanPham}/>
          <CongNgheSanXuatModal showModal={this.state.modalCongNghe}/>
        </Card>
      );

    return <Card size="small" title={<span>
        1. Quy mô hoạt động
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
  sanpham: selectSanPham,
  congnghesanxuat: selectCongNgheSX,
});

const withConnect = connect(mapStateToProps);

export default withConnect(withRouter(QuyMoHoatDong));


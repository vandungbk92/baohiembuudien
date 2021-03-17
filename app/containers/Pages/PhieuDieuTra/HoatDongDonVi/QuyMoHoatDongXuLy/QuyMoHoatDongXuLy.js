import React, { Component } from 'react';
import EditableTable from 'antd-editabletable';
import { Button, Card, Popconfirm, Table, Row, message } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { URL } from '@url';
import { getDsQuyMo, postDsQuyMo } from '@services/phieudieutra/phieudieutraService';
import { delById } from '@services/phieudieutra/quymohoatdongService';
import LoaiHoatDongModal from 'Pages/DanhMuc/LoaiHoatDong/LoaiHoatDongModal';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import {
  getDataSave,
  getDataSourceAdd,
  getDataSourceEdit
} from 'Pages/PhieuDieuTra/HoatDongDonVi/QuyMoHoatDongXuLy/quymo.utils';
import '../tableedit.scss';
import { selectLoaiHoatDong } from '@reduxApp/HoatDongSanXuat/selectors';
class QuyMoHoatDongXuLy extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: '_id',
      width: '5%',
      render: (v, r, i) => i + 1,
    },
    {
      title: 'Tên loại hoạt động',
      render: (value) => value.tenloaihoatdong,
      dataIndex: 'loaihoatdong_id',
      width: '28%',
    },
    {
      title: 'Công nghệ xử lý',
      dataIndex: 'congnghexuly',
      width: '27%',
    },

    {
      title: 'Công suất thiết kế (tấn/năm)',
      dataIndex: 'congsuatthietke',
      width: '20%',
    },
    {
      title: 'Công suất hoạt động (tấn/năm)',
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
      title: 'Tên loại hoạt động',
      dataIndex: 'loaihoatdong_id',
      width: '25%',
    },
    {
      title: 'Công nghệ xử lý',
      dataIndex: 'congnghexuly',
      align: 'center',
      width: '25%',
    },
    {
      title: 'Công suất thiết kế (tấn/năm)',
      dataIndex: 'congsuatthietke',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Công suất hoạt động (tấn/năm)',
      dataIndex: 'congsuathoatdong',
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
      let dataSource = await getDsQuyMo(id);
      this.setState({dataSource})
    }
  }

  validateRules = [];
  getValidateFieldsMethod = validateFields => {
    this.validateRules.push(validateFields);
  };

  funcChangeUpdate = () => {
    let {loaihoatdong} = this.props;
    let dataSourceEdit = getDataSourceEdit(this.state.dataSource, loaihoatdong);
    this.setState({edit: !this.state.edit, dataSourceEdit});
  }

  funcSave = async () => {
    const result = await Promise.all(this.validateRules.map(v => v()));
    let checkValidate = result[0];
    let {dataSourceEdit} = this.state;
    let {id} = this.props.match.params;
    if(!checkValidate) {
      let {dsthemmoi, dscapnhat} = getDataSave(dataSourceEdit);
      console.log(dsthemmoi,'dsthemmoi')
      console.log(dscapnhat,'dscapnhat')
      
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
    const { loaihoatdong } = this.props;

    if (this.state.edit)
      return (
        <Card size="small" title={<span>
        1. Quy mô hoạt động
      </span>} md="24" extra={<Row gutter={20}>
          <Button size='small' type="primary" ghost icon={<PlusOutlined/>}
                  onClick={() => {this.setState({modalLoaiHoatDong: !this.state.modalLoaiHoatDong})}}
          >Loại hoạt động</Button>
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
                dataSourceEdit: [...dataSourceEdit, getDataSourceAdd(loaihoatdong)],
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
          <LoaiHoatDongModal showModal={this.state.modalLoaiHoatDong}/>
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
  loaihoatdong: selectLoaiHoatDong,
});

const withConnect = connect(mapStateToProps);

export default withConnect(withRouter(QuyMoHoatDongXuLy));


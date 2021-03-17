import React, { Component } from 'react';
import EditableTable from 'antd-editabletable';
import { Button, Card, Popconfirm, Table, Row, message } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getDsNhienLieu, postDsNhienLieu } from '@services/phieudieutra/phieudieutraService';
import { delById } from '@services/phieudieutra/nhienlieuService';
import NhienLieuModal from 'Pages/DanhMuc/NhienLieuTieuThu/NhienLieuTieuThuModal';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import {
  getDataSave,
  getDataSourceAdd,
  getDataSourceEdit
} from '@containers/Pages/PhieuDieuTra/HoatDongDonVi/NhienLieu/nhienlieu.utils';
import '../tableedit.scss';
import { selectNhienLieu } from '@reduxApp/HoatDongSanXuat/selectors';
class NhienLieu extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: '_id',
      width: '5%',
      render: (v, r, i) => i + 1,
    },
    {
      title: 'Loại nhiên liệu',
      render: (value) => value.loainhienlieu,
      dataIndex: 'nhienlieutieuthu_id',
      width: '25%',
    },
    {
      title: 'Lượng tiêu thụ',
      dataIndex: 'luongtieuthu',
      width: '25%',
    },
    {
      title: 'Mục đích sử dụng',
      dataIndex: 'mucdichsudung',
      width: '20%',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghichu',
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
      title: 'Loại nhiên liệu',
      dataIndex: 'nhienlieutieuthu_id',
      width: '25%',
    },
    {
      title: 'Lượng tiêu thụ',
      dataIndex: 'luongtieuthu',
      align: 'center',
      width: '25%',
    },
    {
      title: 'Mục đích sử dụng',
      dataIndex: 'mucdichsudung',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghichu',
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
      let dataSource = await getDsNhienLieu(id);
      this.setState({dataSource})
    }
  }
  componentDidUpdate(prevProps,prevState){
    let {nhienlieu} = this.props;
    //let {dataSourceEdit} = this.state
    if(nhienlieu !==prevProps.nhienlieu){
      let dataSourceEdit = getDataSourceEdit(this.state.dataSource, nhienlieu);
      this.setState({dataSourceEdit: [...dataSourceEdit, getDataSourceAdd(nhienlieu)]});
    }
  }

  validateRules = [];
  getValidateFieldsMethod = validateFields => {
    this.validateRules.push(validateFields);
  };

  funcChangeUpdate = () => {
    let { nhienlieu} = this.props;
    let dataSourceEdit = getDataSourceEdit(this.state.dataSource, nhienlieu);
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
        let dataSource = await postDsNhienLieu(id, {dsthemmoi, dscapnhat})
        // nếu lưu thành công.
        if(dataSource){
          message.success('Cập nhật nhiên liệu tiêu thụ thành công');
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
        message.success('Xóa nhiên liệu tiêu thụ thành công');
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
    const { nhienlieu } = this.props;
    if (this.state.edit)
      return (
        <Card size="small" title={<span>
        4. Nhiên liệu tiêu thụ
      </span>} md="24" extra={<Row gutter={20}>
          <Button size='small' type="primary" ghost icon={<PlusOutlined/>}
                  onClick={() => {this.setState({modalNhienLieu: !this.state.modalNhienLieu})}}
          >Nhiên liệu</Button>
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
                dataSourceEdit: [...dataSourceEdit, getDataSourceAdd(nhienlieu)],
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
          <NhienLieuModal showModal={this.state.modalNhienLieu}/>
        </Card>
      );

    return <Card size="small" title={<span>
        4. Nhiên liệu tiêu thụ
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
  nhienlieu: selectNhienLieu
});

const withConnect = connect(mapStateToProps);

export default withConnect(withRouter(NhienLieu));


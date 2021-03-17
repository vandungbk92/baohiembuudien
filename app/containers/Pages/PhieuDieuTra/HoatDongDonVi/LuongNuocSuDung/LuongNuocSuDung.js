import React, { Component } from 'react';
import EditableTable from 'antd-editabletable';
import { Button, Card, Popconfirm, Table, Row, message, Input, InputNumber } from 'antd';
import { DeleteOutlined, PlusOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { getDsLuongNuoc, postDsLuongNuoc } from '@services/phieudieutra/phieudieutraService';
import { delById } from '@services/phieudieutra/luongnuocsudungService';
import {
  getDataSave
} from 'Pages/PhieuDieuTra/HoatDongDonVi/LuongNuocSuDung/luongnuoc.utils';
class LuongNuocSuDung extends Component {

  columns = [
    {
      title: 'TT',
      dataIndex: '_id',
      width: '5%',
      align: 'center',
      render: (v, r, i) => i + 1,
    },
    {
      title: 'Nguồn nước máy',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuocmay_sudung',
          key: 'nuocmay_sudung',
          align: 'center'
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuocmay_mucdich',
          key: 'nuocmay_mucdich',
          align: 'center'
        },
      ],
    },
    {
      title: 'Nước ngâm (nước dưới đất) từ giếng khoan',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuocngam_sudung',
          key: 'nuocngam_sudung',
          align: 'center'
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuocngam_mucdich',
          key: 'nuocngam_mucdich',
          align: 'center'
        },
      ],
    },
    {
      title: 'Nước mặt (sông, suối, ao ...)',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuocmat_sudung',
          key: 'nuocmat_sudung',
          align: 'center'
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuocmat_mucdich',
          key: 'nuocmat_mucdich',
          align: 'center'
        },
      ],
    },
    {
      title: 'Nguồn nước khác',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuockhac_sudung',
          key: 'nuockhac_sudung',
          align: 'center'
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuockhac_mucdich',
          key: 'nuockhac_mucdich',
          align: 'center'
        },
      ],
    }
  ];

  columnsEdit = [
    {
      title: 'TT',
      render: (value, row, index) => <>{index + 1}</>,
      width: '5%',
    },
    {
      title: 'Nguồn nước máy',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuocmay_sudung',
          key: 'nuocmay_sudung',
          render: (v, r, i) => <InputNumber min={0} size="small" value={v} onChange={(e) => this.onChaneNumber(e, i, 'nuocmay_sudung')}/>
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuocmay_mucdich',
          key: 'nuocmay_mucdich',
          render: (v, r, i) => <Input size="small" value={v} onChange={(e) => this.onChaneInput(e, i, 'nuocmay_mucdich')}/>
        },
      ],
    },
    {
      title: 'Nước ngâm (nước dưới đất) từ giếng khoan',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuocngam_sudung',
          key: 'nuocngam_sudung',
          render: (v, r, i) => <InputNumber min={0} size="small" value={v} onChange={(e) => this.onChaneNumber(e, i, 'nuocngam_sudung')}/>
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuocngam_mucdich',
          key: 'nuocngam_mucdich',
          render: (v, r, i) => <Input size="small" value={v} onChange={(e) => this.onChaneInput(e, i, 'nuocngam_mucdich')}/>
        },
      ],
    },
    {
      title: 'Nước mặt (sông, suối, ao ...)',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuocmat_sudung',
          key: 'nuocmat_sudung',
          render: (v, r, i) => <InputNumber min={0} size="small" value={v} onChange={(e) => this.onChaneNumber(e, i, 'nuocmat_sudung')}/>
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuocmat_mucdich',
          key: 'nuocmat_mucdich',
          render: (v, r, i) => <Input size="small" value={v} onChange={(e) => this.onChaneInput(e, i, 'nuocmat_mucdich')}/>
        },
      ],
    },
    {
      title: 'Nguồn nước khác',
      children: [
        {
          title: 'Lượng sử dụng (m3)',
          dataIndex: 'nuockhac_sudung',
          key: 'nuockhac_sudung',
          render: (v, r, i) => <InputNumber min={0} size="small" value={v} onChange={(e) => this.onChaneNumber(e, i, 'nuockhac_sudung')}/>
        },
        {
          title: 'Mục đích sử dụng',
          dataIndex: 'nuockhac_mucdich',
          key: 'nuockhac_mucdich',
          render: (v, r, i) => <Input size="small" value={v} onChange={(e) => this.onChaneInput(e, i, 'nuockhac_mucdich')}/>
        },
      ],
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
      dataSource: [
        {
          _id: '1',
          nuocmay_sudung: '1',
          nuocmay_mucdich: '2',

          nuocngam_sudung: '1',
          nuocngam_mucdich: '2',

          nuocmat_sudung: '1',
          nuocmat_mucdich: '2',

          nuockhac_sudung: '1',
          nuockhac_mucdich: '2',
        }],
      edit: false
    };
  }

  onChaneInput = (e, i, k) => {
    const { value } = e.target;
    let {dataSource} = this.state;
    dataSource[i][k] = value;
    dataSource[i].update = true;
    this.setState({dataSource})
  }

  onChaneNumber = (e, i, k) => {
    let {dataSource} = this.state;
    dataSource[i][k] = e;
    dataSource[i].update = true;

    this.setState({dataSource})
  }

  async componentDidMount() {
    let {match} = this.props;
    let {id} = match.params;
    if(id){
      let dataSource = await getDsLuongNuoc(id);
      this.setState({dataSource})
    }
  }

  funcChangeUpdate = () => {
    this.setState({edit: !this.state.edit});
  }

  funcAdd = () => {
    let {dataSource} = this.state;
    dataSource = [...dataSource, {
      _id: (new Date()).getTime(),
      addNew: true,
      nuocmay_sudung: '',
      nuocmay_mucdich: '',
      nuocngam_sudung: '',
      nuocngam_mucdich: '',
      nuocmat_sudung: '',
      nuocmat_mucdich: '',
      nuockhac_sudung: '',
      nuockhac_mucdich: ''
    }]
    this.setState({dataSource})
  }

  funcSave = async () => {
    let {id} = this.props.match.params;
    let {dataSource} = this.state;
    let {dsthemmoi, dscapnhat} = getDataSave(dataSource);
    if(dsthemmoi.length || dscapnhat.length){
      let dataSource = await postDsLuongNuoc(id, {dsthemmoi, dscapnhat})
      // nếu lưu thành công.
      if(dataSource){
        message.success('Cập nhật lượng nước sử dụng thành công');
        this.setState({dataSource, edit: !this.state.edit});
      }
    }else{
      this.setState({edit: !this.state.edit});
    }
  }

  handleDelete = async (row) => {
    let {dataSource} = this.state;
    if(row.addNew){
      dataSource = dataSource.filter(data => {
        return data._id !== row._id
      })
    }else{
      let delRes = await delById(row._id);
      if(delRes){
        message.success('Xóa quy mô hoạt động thành công');
        dataSource = dataSource.filter(data => {
          return data._id !== row._id
        })
      }
    }
    this.setState({dataSource});
  };

  render() {
    return <Card size="small" title={<span>
        5. Lượng nước sử dụng
      </span>} md="24" extra={<Row gutter={20}>
      {
        this.state.edit ? <Button size='small' type="primary" icon={<SaveOutlined/>}
                                  onClick={this.funcSave}
        >Lưu</Button> : <Button size='small' type="primary" ghost icon={<EditOutlined />}
                                onClick={this.funcChangeUpdate}
        >Cập nhật</Button>
      }

    </Row>}>
      <Table loading={false} bordered columns={this.state.edit ? this.columnsEdit : this.columns} dataSource={this.state.dataSource}
             size="small" rowKey="_id" pagination={false}
             footer={() => {
               return this.state.edit ? <div className="text-center">
                 <Button size='small' type="link" icon={<PlusOutlined />}
                         onClick={this.funcAdd}
                 >Thêm mới </Button></div> : null
             }}
      />
    </Card>


  }
}

export default withRouter(LuongNuocSuDung);


import React, { Component, Fragment } from 'react';
import { Button, Table, Popconfirm, message, Card, Tooltip} from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { add,updateById,delById,getById,getAll, getAllDslichByCaddy } from "@services/quanlycaddy/caddyService";
const columns = [
  {
    title: 'Ca',
    dataIndex: 'tenca',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Thứ 2',
    dataIndex: 'ca',
    key: 'name',
    render(text, record) {
      return {
        props: {
          style: { background: text.indexOf(0) !== -1 ? "LightGoldenRodYellow" : "" }
        },
      };
    }

  },
  {
    title: 'Thứ 3',
    dataIndex: 'ca',
    key: 'name',
    render(text, record) {
      return {
        props: {
          style: { background: text.indexOf(1) !== -1 ? "LightGoldenRodYellow" : "" }
        },
      };
    }  },
  {
    title: 'Thứ 4',
    dataIndex: 'ca',
    key: 'name',
    render(text, record) {
      return {
        props: {
          style: { background: text.indexOf(2) !== -1 ? "LightGoldenRodYellow" : "" }
        },
      };
    }  },
  {
    title: 'Thứ 5',
    dataIndex: 'ca',
    key: 'name',
    render(text, record) {
      return {
        props: {
          style: { background: text.indexOf(3) !== -1 ? "LightGoldenRodYellow" : "" }
        },
      };
    }  },
  {
    title: 'Thứ 6',
    dataIndex: 'ca',
    key: 'name',
    render(text, record) {
      return {
        props: {
          style: { background: text.indexOf(4) !== -1 ? "LightGoldenRodYellow" : "" }
        },
      };
    }  },
  {
    title: 'Thứ 7',
    dataIndex: 'ca',
    key: 'name',
    render(text, record) {
      return {
        props: {
          style: { background: text.indexOf(5) !== -1 ? "LightGoldenRodYellow" : "" }
        },
      };
    }  },
  {
    title: 'Chủ nhật',
    dataIndex: 'ca',
    key: 'name',
    render(text, record) {
      return {
        props: {
          style: { background: text.indexOf(6) !== -1 ? "LightGoldenRodYellow" : "" }
        },
      };
    }  },
];

class ChiTietLich extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caddy_id : this.props.caddy_id,
      dataRes : [],
      datasource: []
    };
  }

  async componentDidMount() {
    let dataRes = await getAllDslichByCaddy(this.state.caddy_id)
    if(dataRes){
      //dataRes[0] là dữ liệu làm việc mới nhất sắp xếp theo created_at : -1
      this.setState({dataRes: dataRes[0]})
    }
    // Custom lại dữ liệu để đổ ra table
    this.getDataTable(dataRes[0])

  }
  getDataTable(data){

    let datasource = []
    let dataCaSang = {}
    let dataCaChieu = {}
    let datacasangRes = data.casang
    let datacachieuRes = data.cachieu
    if (data.cangay.length !== 0){
      data.cangay.forEach(data =>{
        console.log(data,'dataforEach');
          datacasangRes.push(data)
          datacachieuRes.push(data)
        }
      );
    }
    dataCaSang.tenca = "Sáng";
    dataCaSang.ca = data.casang;
    dataCaChieu.tenca = "Chiều";
    dataCaChieu.ca = data.cachieu;
    datasource.push(dataCaSang)
    datasource.push(dataCaChieu)
    this.setState({datasource : datasource })
  }
  render() {
    return <div>
      <Table columns={columns} bordered dataSource={this.state.datasource} />
    </div>;
  }
}

export default ChiTietLich

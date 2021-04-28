import React from "react";
import { Button, Card, Table, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { compose } from 'redux';
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import { stringify } from "qs";
import { makeGetLoading } from "@containers/App/AppProvider/selectors";
import { withNhanVien } from "@reduxApp/NhanVien/connect";
import Search from "@components/Search/Search";
import { danhgiadichvunv} from "@services/danhgia/dichvuService";
import { URL } from "@url";

class ThongKeDanhGia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRes: [],
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

  async getDataFilter() {
    const search = queryString.parse(this.props.location.search);
    let queryStr = "";
    queryStr += `${search.maphong ? "&maphong={0}".format(search.maphong) : ""}`;
    queryStr += `${search.manv ? "&manv={0}".format(search.manv) : ""}`;
    queryStr += `${search.from_date ? '&created_at[from]={0}'.format(search.from_date) : ''}`
    queryStr += `${search.to_date ? '&created_at[to]={0}'.format(search.to_date) : ''}`
    const apiResponse = await danhgiadichvunv(queryStr);
    if (apiResponse) {
      const dataRes = apiResponse;
      this.setState({
        dataRes,
      });
    }
  }

  handleRefresh = (newQuery, changeTable) => {
    const { location, history } = this.props;
    const { pathname } = location;
    if (changeTable) {
      newQuery = queryString.parse(this.props.location.search);
    }
    newQuery = Object.assign({page:1,limit:10}, newQuery);
    history.push({ pathname, search: stringify({ ...newQuery }, { arrayFormat: "repeat" }) });
  };

  xemdanhgianhanvien(value){
    const search = queryString.parse(this.props.location.search);
    let query = `?manv=${value}`
    if(search.from_date) query += '&from_date=' + search.from_date
    if(search.to_date) query += '&to_date=' + search.to_date

      return <Tooltip placement="left" title="Xem chi tiết" color="#2db7f5">
        <Link to={`${URL.DANH_GIA_DICH_VU}${query}`}>
          <Button icon={<EyeOutlined />} size="small" type="primary"/>
        </Link>
      </Tooltip>
  }
  
  render() {
    const { nhanvien } = this.props;
    const {dataRes} = this.state
      const dataSearch = [
        {
          type: 'select',
          name: 'manv',
          label: 'Nhân viên',
          options: nhanvien,
          key: '_id',
          value: 'tennv'
        },
        {
            type: 'date',
            name: 'from_date',
            label: 'Từ ngày'
        },
        {
            type: 'date',
            name: 'to_date',
            label: 'Đến ngày'
        },
        
      ];

    return <Card size="small" title={<span>&nbsp;Danh sách đánh giá về nhân viên</span>} md="24" bordered>
      <Search onFilterChange={this.handleRefresh} dataSearch={dataSearch} />
      <Table size="small" rowKey="_id" bordered pagination={false} dataSource={dataRes}>
        <Table.Column title="STT" render={(value, row, index) => (index + 1)} align="center"/>
        <Table.Column title="Tên nhân viên" dataIndex="manv" render={value => value[0]?.tennv}/>
        <Table.Column title="Điểm trung bình" dataIndex="diemtrungbinh" align="center"/>
        <Table.Column title="Tổng lượt đánh giá" dataIndex="tongluotdanhgia" align="center" />
        <Table.Column  dataIndex="_id" render={(value) => this.xemdanhgianhanvien(value)} />
      </Table>
    </Card>
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading()
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect, withNhanVien)(ThongKeDanhGia);

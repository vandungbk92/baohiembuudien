import React from "react";
import { Table, Card } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { compose } from 'redux';
import queryString from "query-string";
import { stringify } from "qs";
import { createStructuredSelector } from "reselect";

import Search from "@components/Search/Search";
import { getAll } from "@services/danhgia/dichvuService";
import { PAGINATION_CONFIG } from "@constants";
import { makeGetLoading } from "@containers/App/AppProvider/selectors";
import { dateFormatter } from "@commons/dateFormat";

import { withPhong } from "@reduxApp/PhongBan/connect";
import { withNhanVien } from "@reduxApp/NhanVien/connect";
import { withDmDanhGia } from "@reduxApp/DmDanhGia/connect";
import { getAll as getAllDichVu } from "@services/danhmucdichvu/dichvuService";
class ChiTietDanhGia extends React.Component {
  columns = [
    {
      title: 'STT',
      render: (value, row, index) => (this.state.page - 1) * this.state.limit + (index + 1),
      width: 50,
      align: 'center'
    },
    {
      title: "Thông tin đánh giá",
      render: (value, rowData, rowIndex) => {
        return <>
          <div>-Mã khám bệnh: {rowData?.makhambenh}</div>
          <div>-Mã kcb: {rowData?.makcb}</div>
        </>
      }
    },
    {
        title: "Khách Hàng",
        render: value => value?.mabn?.hoten
    },
    {
        title: "Tên dịch vụ",
        render: value => value?.mahh?.tendichvu
    },
    {
        title: "Thông tin chung",
        render: (value, rowData, rowIndex) => {
          return <>
            <div>-Khoa khám: {rowData?.makk?.tenkk}</div>
            <div>-Phòng khám: {rowData?.maphong?.tenphong}</div>
            <div>-Nhân viên: {rowData?.manv?.tennv}</div>
          </>
        }
    },
    {
      title: "Thông tin đánh giá",
      render: (value, rowData, rowIndex) => {
        return <>
          <div>-Điểm số: {rowData?.diem}</div>
          <div>-Ngày đánh giá: {dateFormatter(rowData?.created_at)}</div>
        </>
      }
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataRes: [],
      page: 1,
      limit: 10,
      totalDocs: 0,
      dmdichvu: []
    };
  }

  async componentDidMount() {
    this.getDataFilter();
    let dmdichvu = await getAllDichVu(1, 0, '&danhgia=true')
    if(dmdichvu) this.setState({dmdichvu: dmdichvu.docs})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getDataFilter();
    }
  }

  async getDataFilter() {
    const search = queryString.parse(this.props.location.search);
    const page = parseInt(search.page ? search.page : this.state.page);
    const limit = parseInt(search.limit ? search.limit : this.state.limit);
    let queryStr = "";
    queryStr += `${search.diem ? "&diem={0}".format(search.diem) : ""}`;
    queryStr += `${search.maphong ? "&maphong={0}".format(search.maphong) : ""}`;
    queryStr += `${search.manv ? "&manv={0}".format(search.manv) : ""}`;
    queryStr += `${search.mahh ? "&mahh={0}".format(search.mahh) : ""}`;
    queryStr += `${search.from_date ? '&created_at[from]={0}'.format(search.from_date) : ''}`
    queryStr += `${search.to_date ? '&created_at[to]={0}'.format(search.to_date) : ''}`
    const apiResponse = await getAll(page, limit, queryStr);
    console.log('api',apiResponse);
    if (apiResponse!=undefined) {
      const dataRes = apiResponse.docs;
      this.setState({
        dataRes,
        totalDocs: apiResponse.totalDocs,
        limit: apiResponse.limit,
        page: apiResponse.page
      });
    }
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
    history.push({ pathname, search: stringify({ ...newQuery }, { arrayFormat: "repeat" }) });
  };

  onChangeTable = page => {
    this.setState({ page: page.current, limit: page.pageSize }, () => this.handleRefresh({}, true));
  };

  render() {
    const { loading, phong, nhanvien } = this.props;
    const { dataRes, totalDocs, page, limit, _id } = this.state;
    const diem = [{id: 1, diem: 1},{id: 2, diem: 2},{id: 3, diem: 3},{id: 4, diem: 4},{id: 5, diem: 5}]

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
        type: 'select',
        name: 'maphong',
        label: 'Phòng khám',
        options: phong,
        key: '_id',
        value: 'tenphong'
      },
      {
        type: 'select',
        name: 'diem',
        label: 'Điểm',
        options: diem,
        key: 'id',
        value: 'diem'
      },
      {
        type: 'select',
        name: 'mahh',
        label: 'Dịch vụ',
        options: this.state.dmdichvu,
        key: '_id',
        value: 'tendichvu'
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
      }
    ];

    return (
      <Card size="small" md="24" bordered
          title={<span><UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách đánh giá của khách hàng</span>}>
        {/* <Search onFilterChange={this.handleRefresh} dataSearch={dataSearch} /> */}
        {dataSearch.map((item)=>{
          <div>
            {item}
          </div>
        })}
        <Table loading={loading} bordered columns={this.columns} dataSource={dataRes!=undefined?dataRes:[]} size="small" rowKey="_id"
          pagination={{
            ...PAGINATION_CONFIG,
            current: page,
            pageSize: limit,
            total: totalDocs
          }}
          onChange={this.onChangeTable}
        /> 
       
      </Card>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading()
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect, withPhong, withNhanVien, withDmDanhGia)(ChiTietDanhGia);

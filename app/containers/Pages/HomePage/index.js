import React, { Component } from 'react';
import moment from 'moment';
import Box from '@containers/Box';
import { Pie, Column } from '@ant-design/charts';
import { Col, Row, Spin, Typography, Radio, Space, DatePicker, Tooltip, Button } from 'antd';
import { makeGetLoaiPhieu } from '@reduxApp/LoaiPhieu/selectors';

import { getThongKe } from '@services/danhmucloaiphieuService';
import { getDataSoure } from './homepage.utils';
import produce from 'immer';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { URL } from '@url';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

class HomePage extends Component {

  constructor(props) {
    super(props);
    let { loaiphieu } = props;
    let datathongke = getDataSoure(loaiphieu);
    this.state = {
      datathongke,
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
      typeFilter: 'month',
    };
    this.dateFormat = 'DD/MM/YYYY';
  }

  componentDidMount() {
    let { startDate, endDate } = this.state;
    this.fetchDataThongKe(startDate, endDate);
  }

  fetchDataThongKe = async (startDate, endDate) => {
    let {datathongke} = this.state;
    let params = {
      'created_at[from]': startDate.toDate(),
      'created_at[to]': endDate.toDate(),
    };
    let thongke = await getThongKe(params);

    if (thongke) {
      // tạo obj để check.
      let objThongKe = {}
      thongke.forEach(curr => {
        objThongKe[curr._id] = curr.sophieu
      })
      let datathongkeNew = produce(datathongke, (draft) => {
        draft.map(data => {
          if(objThongKe.hasOwnProperty(data._id)){
            data.sophieu = objThongKe[data._id]
          }else{
            data.sophieu = 0
          }
          return data;
        });
      });
      this.setState({ datathongke: datathongkeNew, startDate, endDate });
    }
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    let { loaiphieu, match } = this.props;
    if (loaiphieu !== prevProps.loaiphieu && !match.params.id) {
      let datathongke = getDataSoure(loaiphieu);
      this.setState({ datathongke });
    }
  }

  onUnitTimeChange = event => {
    const unitTime = event?.target?.value || 'day';
    const startDate = moment().startOf(unitTime);
    const endDate = moment().endOf(unitTime);
    this.setState({ typeFilter: unitTime });
    this.fetchDataThongKe(startDate, endDate);
  };

  onRangeDateChange = dates => {
    const startDate = moment(dates[0]);
    const endDate = moment(dates[1]);
    this.fetchDataThongKe(startDate, endDate);
  };

  redirectList = (data) => {
    let {startDate, endDate} = this.state;
    // from_date=2021-02-04&to_date=2021-02-26
    let search = ''

    if(startDate){
      startDate = moment(startDate).format('YYYY-MM-DD')
      search += 'from_date=' + startDate;
    }
    if(endDate) {
      endDate = moment(endDate).format('YYYY-MM-DD')
      search += '&to_date=' + endDate;
    }
    this.props.history.push(data.link + '?' + search)
  }


  render() {
    let { loading } = this.props;
    let { datathongke } = this.state;
    return <Box title="Bảng thông tin"
                boxActions={
                  <Space align="baseline">
                    <Radio.Group size="small" value={this.state.typeFilter} onChange={this.onUnitTimeChange}>
                      <Radio.Button value="day">Ngày</Radio.Button>
                      <Radio.Button value="week">Tuần</Radio.Button>
                      <Radio.Button value="month">Tháng</Radio.Button>
                      <Radio.Button value="year">Năm</Radio.Button>
                    </Radio.Group>
                    <DatePicker.RangePicker
                      size="small"
                      value={[moment(this.state.startDate, this.dateFormat), moment(this.state.endDate, this.dateFormat)]}
                      format={this.dateFormat}
                      ranges={{ 'Hôm nay': [moment(), moment()] }}
                      allowClear={false}
                      onChange={this.onRangeDateChange}
                    />
                  </Space>
                }>
      <Row gutter={10}>
        <Col lg={24} xl={8}>
          <Typography.Title level={5}>Thống kê phiếu điều tra (Tỷ lệ %)</Typography.Title>
          <Spin spinning={loading}>
            <Pie
              data={datathongke}
              legend={{ position: "top" }}

              label={{ type: "inner",

                formatter: (text, item) => {
                  let percent = item.percent;
                  if(percent) return ''.concat(Math.ceil(percent * 100), '%');
                  return ''

                }
              }}
              events={{
                onPieClick: ({ data }) => {this.redirectList(data)}
              }}
              radius={0.8}

              angleField="sophieu"
              colorField="tenphieu_viettat"
            />
          </Spin>
        </Col>
        <Col lg={24} xl={14}>
          <Typography.Title level={5}>Thống kê phiếu điều tra (Số lượng)</Typography.Title>
          <Spin spinning={loading}>
            <Column
              colorField="tenphieu_viettat"
              autoFit={true}
              data={datathongke}
              label={
                { visible: true }
              }
              meta={{
                tenphieu_viettat: { alias: 'Loại phiếu' },
                sophieu: { alias: 'Số phiếu' },
              }}
              xAxis={{
                visible: true,
                label: {
                  visible: true,
                  autoHide: false,
                  autoRotate: true,
                },
                title: {
                  visible: false,
                },
              }}
              events={{
                onColumnClick: ({ data }) => {this.redirectList(data)}
              }}
              legend={{ position: 'top', flipPage: false }}
              xField="tenphieu_viettat"
              yField="sophieu"
            />
          </Spin>
        </Col>
      </Row>
    </Box>;
  }

}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
  loaiphieu: makeGetLoaiPhieu(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(HomePage);

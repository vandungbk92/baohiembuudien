import React from 'react';
import moment from 'moment';
import Box from '@containers/Box';
import { Pie, Column } from '@ant-design/charts';
import { Col, Row, Spin, Typography, Radio, Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import { makeGetLoaiPhieu } from '@reduxApp/LoaiPhieu/selectors';

import { getThongKe } from '@services/danhmucloaiphieuService';
import { getDataSoure } from 'Pages/HomePage/homepage.utils';
import produce from 'immer';

export default function HomePage() {
  const dateFormat = 'DD/MM/YYYY';
  let loaiphieu = useSelector(makeGetLoaiPhieu());

  let dataSource = getDataSoure(loaiphieu);
  const [startDate, setStartDate] = React.useState(() => moment().startOf('month'));
  const [endDate, setEndDate] = React.useState(() => moment().endOf('month'));
  const [loading, setLoading] = React.useState(false);
  const [datathongke, setDaTaThongKe] = React.useState(dataSource);

  const unitTime = React.useMemo(
    () =>
      ['day', 'week', 'month', 'year'].find($unitTime => {
        const $startDate = moment().startOf($unitTime);
        const $endDate = moment().endOf($unitTime);
        if ($startDate.isSame(startDate, 'day') && $endDate.isSame(endDate, 'day')) {
          return true;
        }
        return false;
      }),
    [startDate, endDate],
  );

  const onUnitTimeChange = event => {
    const $unitTime = event?.target?.value || 'day';

    const $startDate = moment().startOf($unitTime);
    const $endDate = moment().endOf($unitTime);

    setStartDate($startDate);
    setEndDate($endDate);
    const params = {
      'created_at[from]': $startDate.toDate(),
      'created_at[to]': $endDate.toDate(),
    };
    fetchDataThongKe(params);
  };

  const onRangeDateChange = dates => {
    const $startDate = moment(dates[0]);
    const $endDate = moment(dates[1]);

    setStartDate($startDate);
    setEndDate($endDate);

    const params = {
      'created_at[from]': $startDate.toDate(),
      'created_at[to]': $endDate.toDate(),
    };
    fetchDataThongKe(params);
  };

  React.useEffect(() => {
    const params = {
      'created_at[from]': startDate.toDate(),
      'created_at[to]': endDate.toDate(),
    };
    fetchDataThongKe(params);
  }, []);

  const fetchDataThongKe = async (params) => {
    setLoading(true);
    let thongke = await getThongKe(params);

    if (thongke) {
      let datathongkeNew = produce(datathongke, (draft) => {
        draft.map(data => {
          thongke.forEach(curr => {
            if (curr._id === data._id) data.sophieu = curr.sophieu;
          });
          return data;
        });
      });
      setDaTaThongKe(datathongkeNew);
    }
    setLoading(false);
  };

  if(!datathongke.length){
    return null
  }
  return (
    <Box title="Bảng thông tin"
         boxActions={
           <Space align="baseline">
             <Radio.Group size="small" value={unitTime} onChange={onUnitTimeChange}>
               <Radio.Button value="day">Ngày</Radio.Button>
               <Radio.Button value="week">Tuần</Radio.Button>
               <Radio.Button value="month">Tháng</Radio.Button>
               <Radio.Button value="year">Năm</Radio.Button>
             </Radio.Group>
             <DatePicker.RangePicker
               size="small"
               value={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
               format={dateFormat}
               ranges={{ 'Hôm nay': [moment(), moment()] }}
               allowClear={false}
               onChange={onRangeDateChange}
             />
           </Space>
         }>
      <Row gutter={10}>
        <Col lg={24} xl={8}>
          <Typography.Title level={5}>Thống kê phiếu điều tra (Tỷ lệ %)</Typography.Title>
          <Spin spinning={loading}>
            <Pie
              data={datathongke}
              autoFit={true}
              meta={{
                tenphieu_viettat: {
                  alias: 'Loại phiếu',
                },
                sophieu: {
                  alias: 'Số phiếu',
                },
              }}
              legend={{
                layout: 'horizontal',
                position: 'top-left',
                flipPage: false,
              }}

              label={{
                type: 'inner',
                offset: '-30%',
                content: function content(_ref) {
                  let percent = _ref.percent;
                  return ''.concat(Math.ceil(percent * 100), '%');
                },
                style: {
                  fontSize: 14,
                  textAlign: 'center',
                },
              }}
              radius={0.6}
              angleField="sophieu"
              colorField="tenphieu_viettat"
            />
          </Spin>
        </Col>
        <Col lg={24} xl={14}>
          <Typography.Title level={5}>Thống kê phiếu điều tra (Số lượng)</Typography.Title>
          <Spin spinning={loading}>
            <Column
              seriesField="tenphieu_viettat"
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
              legend={{ position: 'top', flipPage: false }}
              xField="tenphieu_viettat"
              yField="sophieu"
            />
          </Spin>
        </Col>

      </Row>
    </Box>
  )
    ;
}

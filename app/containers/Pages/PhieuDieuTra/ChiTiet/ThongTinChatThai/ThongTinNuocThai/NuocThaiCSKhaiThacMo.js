import React, { Component } from 'react';
import {
  Input,
  Button,
  Form,
  message,
  Row,
  Col,
  Select,
  Radio,
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { getAllPhuongXaById } from '@services/danhmuc/quanhuyenService';
import { compose } from 'redux';

const layoutCol = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol1 = { 'xs': 24, 'sm': 6, 'md': 6, 'lg': 3, 'xl': 3, 'xxl': 3 };
const layoutCol2 = { 'xs': 24, 'sm': 8, 'md': 6, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol3 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 12, 'xl': 12, 'xxl': 12 };
const layoutCol4 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 8, 'xl': 8, 'xxl': 8 };
const layoutCol5 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 4, 'xxl': 4 };
const layoutCol6 = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 12, 'xl': 12, 'xxl': 12 };
const layoutCol7 = { 'xs': 24, 'sm': 12, 'md': 6, 'lg': 6, 'xl': 3, 'xxl': 3 };

class NuocThaiCSKhaiThacMo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quanhuyen: this.props.quanhuyen,
      xaphuong: []
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    try {
      if (this.props.data) {
        this.formRef.current.setFieldsValue(this.props.data);
      }
      if (this.props.data && this.props.data.quanhuyentiepnhan_id) {
        let xaphuong = await getAllPhuongXaById(this.props.data.quanhuyentiepnhan_id);
        if (xaphuong) {
          this.setState({ xaphuong });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let {data} = this.props
    if(data !== prevProps.data){
      this.formRef.current?.setFieldsValue(this.props.data);
    }
  }

  onFieldsChange = async (changedValues, allValues) => {
    if (changedValues.hasOwnProperty('quanhuyentiepnhan_id')) {
      this.formRef.current.setFieldsValue({ phuongxatiepnhan_id: '' });
      const xaphuong = await getAllPhuongXaById(changedValues['quanhuyentiepnhan_id']);
      if (xaphuong) {
        this.setState({ xaphuong });
      }
    }
  };

  render() {

    const { loading } = this.props;
    const { quanhuyen, xaphuong } = this.state;
    return <Form ref={this.formRef} name="form_chatthainuocthai" layout='vertical' size='small' autoComplete='off'
                 onValuesChange={this.onFieldsChange}>
      <Form.Item label="" name="_id" hidden={true}>
        <Input/>
      </Form.Item>
      <Row gutter={10}>
        <Col sm={24}><strong>1. Thông tin nguồn thải (nước thải) (m3/ngày/đêm)</strong></Col>
        <Col {...layoutCol}>
          <Form.Item label='Khối lượng nước thải sinh hoạt:' name="klnuocthaisinhoat"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Tự xử lý: ' name="klntshtuxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Thuê xử lý: ' name="klntshthuexuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Khối lượng nước thải sản xuất:' name="klnuocthaisanxuat"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Tự xử lý: ' name="klntsxtuxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Thuê xử lý: ' name="klntsxthuexuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col {...layoutCol}>
          <Form.Item label='Khối lượng nước tuần hoàn: ' name="klnuocthaituanhoan"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Tự xử lý: ' name="klntthtuxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Thuê xử lý: ' name="klntththuexuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Số lượng nguồn thải (nước thải): ' name="soluongnguonthai"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={10}>
        <Col sm={24}><strong>2 .Hệ thống xử lý nước thải</strong></Col>
        <Col {...layoutCol}>
          <Form.Item label='Đơn vị có hệ thống xử lý:' name="hethongxuly">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công suất xử lý: ' name="congsuatxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="m3/ngày" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Hiệu suất xử lý: ' name="hieusuatxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input suffix="mg/l" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Công nghệ xử lý: ' name="congnghexuly" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col sm={24}><strong>3. Đơn vị tiếp nhận, xử lý nước thải</strong></Col>
        <Col {...layoutCol3}>
          <Form.Item label={<b>Tên cơ sở tiếp nhận, xử lý: </b>} name="cosotiepnhan"
                     validateTrigger={['onChange', 'onBlur']}
                     rules={[{ required: true, message: 'Cơ sở tiếp nhận' }]}
          >
            <Input placeholder='Tên cơ sở tiếp nhận, xử lý' disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol3}>
          <Row gutter={10}>

            <Col {...layoutCol4}>
              <Form.Item label={<b>Địa chỉ tiếp nhận: </b>} name="thontotiepnhan"
                         validateTrigger={['onChange', 'onBlur']}>
                <Input placeholder='Thôn/ tổ dân phố' disabled={loading}/>
              </Form.Item>
            </Col>

            <Col {...layoutCol4}>
              <Form.Item label="Quận huyện" name="quanhuyentiepnhan_id"
                         validateTrigger={['onChange', 'onBlur']}
                         rules={[{ required: true, message: 'Huyện không được để trống' }]}>
                <Select placeholder='Chọn quận huyện' disabled={loading} dropdownClassName='small' showSearch
                        filterOption={(input, option) => {
                          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}>
                  {quanhuyen.map(data => {
                    return <Select.Option key={data._id} value={data._id}>
                      {data.tenqh}
                    </Select.Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col {...layoutCol4}>
              <Form.Item label="Xã phường" name="phuongxatiepnhan_id"
                         validateTrigger={['onChange', 'onBlur']}
                         rules={[{ required: true, message: 'Xã không được để trống' }]}>
                <Select placeholder='Chọn xã phường' disabled={loading} dropdownClassName='small' showSearch
                        filterOption={(input, option) => {
                          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}>
                  {xaphuong.map(data => {
                    return <Select.Option key={data._id} value={data._id}>
                      {data.tenphuongxa}
                    </Select.Option>;
                    ``;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col sm={24}><strong>4. Vị trí xả thải (Định vị vệ tinh)</strong></Col>
        <Col sm={24}>Vị trí xả thải 1</Col>

        <Col {...layoutCol5}>
          <Form.Item label='Tọa độ: Kinh độ' name="kinhdo1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Vỹ độ' name="vydo1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>

        <Col {...layoutCol6}>
          <Form.Item label='Nơi tiếp nhận' name="noitiepnhan1">
            <Radio.Group className="w-full">
              <Radio value='htnttaptrung'>Hệ thống nước thải tập trung </Radio>
              <Radio value='kenhrach'>Kênh, rạch, sông, suối</Radio>
              <Radio value='htthoatnuocchung'>Hệ thống thoát nước chung</Radio>

            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Tên nơi tiếp nhận' name="tennoitiepnhan1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col sm={24}>Vị trí xả thải 2</Col>

        <Col {...layoutCol5}>
          <Form.Item label='Tọa độ: Kinh độ' name="kinhdo2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Vỹ độ' name="vydo2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>

        <Col {...layoutCol6}>
          <Form.Item label='Nơi tiếp nhận' name="noitiepnhan2">
            <Radio.Group className="w-full">
              <Radio value='htnttaptrung'>Hệ thống nước thải tập trung </Radio>
              <Radio value='kenhrach'>Kênh, rạch, sông, suối</Radio>
              <Radio value='htthoatnuocchung'>Hệ thống thoát nước chung</Radio>

            </Radio.Group>
          </Form.Item>
        </Col>
        <Col {...layoutCol5}>
          <Form.Item label='Tên nơi tiếp nhận' name="tennoitiepnhan2" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
      <Col sm={24}><strong>e. Kết quả xử lý </strong></Col>  
        <Col {...layoutCol3}>
          <Form.Item label='Nguồn thải 1' name="kqxlnguonthai1" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>

          <Col {...layoutCol3}>
            <Form.Item label='Nguồn thải 2' name="kqxlnguonthai2" validateTrigger={['onChange', 'onBlur']}>
              <Input  disabled={loading}/>
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={10}>
        <Col sm={24}><strong>f. Bảo trì, bảo dưỡng định kỳ Hệ thống xử lý:</strong></Col>

        <Col {...layoutCol}>
          <Form.Item label='Bảo trì' name="baotrihethong">
            <Radio.Group className="w-full">
              <Radio value='co'>Có</Radio>
              <Radio value='khong'>Không</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col {...layoutCol}>
          <Form.Item label='Số lần bảo trì' name="solanbaotri" validateTrigger={['onChange', 'onBlur']}>
            <Input disabled={loading}/>
          </Form.Item>
        </Col>
        </Row>
    </Form>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(NuocThaiCSKhaiThacMo);



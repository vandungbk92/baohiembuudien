import React, { Component } from 'react';
import {
  Input,
  Button,
  Form,
  message,
  Row,
  Col,
  Select, Divider,
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import { getAllPhuongXaById } from '@services/danhmuc/quanhuyenService';
import { compose } from 'redux';

const layoutCol = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 12, 'xl': 6, 'xxl': 6 };
const layoutCol1 = { 'xs': 24, 'sm': 24, 'md': 12, 'lg': 8, 'xl': 8, 'xxl': 8 };
const layoutCol2 = { 'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12, 'xxl': 6 };
const layoutCol3 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 12, 'xl': 12, 'xxl': 12 };

class ChatThaiYTeNguyHai extends Component {

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

    const { loading} = this.props;
    const { quanhuyen, xaphuong } = this.state;
    return <Form ref={this.formRef} name="form_chatthainguyhai" layout='vertical' size='small' autoComplete='off'
                 onValuesChange={this.onFieldsChange}>
      <Form.Item label="" name="_id" hidden={true}>
        <Input/>
      </Form.Item>
      <Divider orientation="left">3. Chất thải y tế nguy hại</Divider>
      <Row gutter={10}>
        <Col {...layoutCol2}>
          <Form.Item label={<b>a. Mã chủ nguồn thải chất thải nguy hại:</b>} name="machunguonthai" validateTrigger={['onChange', 'onBlur']}
          >
            <Input placeholder='Mã chủ nguồn thải' disabled={loading}/>
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={10}>
        <Col {...layoutCol}>
          <Form.Item label={<p><b>b. Khối lượng phát sinh: </b> Theo đăng ký:</p>} name="klphatsinhtheodangky"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label='Theo thực tế:'name="klphatsinhthucte"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label={<b>c. Khối lượng tự xử lý (tấn/năm):</b>} name="kltuxuly" validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol}>
          <Form.Item label={<b>d. Khối lượng thuê xử lý (tấn/năm): </b>} name="klthuexuly" validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
      </Row>
      <Col sm={24}><strong>đ. Công nghệ xử lý chất thải nguy hại (Lựa chọn 1 hoặc nhiều phương án) (tấn/năm)</strong></Col>
      <Row gutter={10}>
        <Col {...layoutCol1}>
          <Form.Item label='Công nghệ lò đốt tĩnh hai cấp hoặc lò quay: ' name="kllodotloquay" validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Công nghệ đồng xử lý trong lò nung xi-măng: ' name="klxulylonung"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Chôn lấp an toàn' name="klchonlapantoan"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Hóa rắn (bê tông hóa):' name="klhoaran"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Xử lý, tái chế dầu thải' name="klxulydauthai"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Xử lý bóng đèn thải: ' name="klxulybongdenthai"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>

        <Col {...layoutCol1}>
          <Form.Item label='Xử lý chất thải điện tử: :' name="klxulychatthaidientu"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='Phá dỡ, tái chế ắc quy chì thải' name="kltaicheacquy"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col {...layoutCol1}>
          <Form.Item label='khác: ' name="klkhac"
                     validateTrigger={['onChange', 'onBlur']}>
            <Input addonAfter="tấn/năm" disabled={loading}/>
          </Form.Item>
        </Col>

      </Row>
      <Col sm={24}><strong>d. Đơn vị tiếp nhận, xử lý chất thải nguy hại</strong></Col>
      <Row gutter={10}>
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

            <Col {...layoutCol1}>
              <Form.Item label={<b>Địa chỉ tiếp nhận: </b>} name="thontotiepnhan"
                         validateTrigger={['onChange', 'onBlur']}>
                <Input placeholder='Thôn/ tổ dân phố' disabled={loading}/>
              </Form.Item>
            </Col>

            <Col {...layoutCol1}>
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

            <Col {...layoutCol1}>
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
                    </Select.Option>;``
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>

      </Row>
    </Form>
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ChatThaiYTeNguyHai);



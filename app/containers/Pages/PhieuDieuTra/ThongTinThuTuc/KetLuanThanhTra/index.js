import React, { Component } from 'react';
import {
  Input,
  Button,
  Form,
  message,
  Row,
  Col,
  Select,
  Checkbox,
  DatePicker
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { add, getById, getAll, delById, updateById } from '@services/phieudieutra/ketluanthanhtraService';
import { URL } from '@url';
import Box from '@containers/Box';
import { withRouter } from 'react-router-dom';
//import {HANH_VI_VI_PHAM, HANH_VI_VI_PHAM_COSOYTE} from '@constants'
import {getKetLuanThanhTra} from '@services/phieudieutra/phieudieutraService';
import moment from 'moment';


const layoutCol = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 6, 'xl': 6, 'xxl': 6 };
const layoutCol1 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 24, 'xl': 24, 'xxl':24 };
const layoutCol3 = { 'xs': 24, 'sm': 24, 'md': 24, 'lg': 24, 'xl': 12, 'xxl': 12 };

class KetLuanThanhTra extends Component {

  constructor(props) {
    super(props);
    this.state = {
     dataSource:[]
    };
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    let {match} = this.props;
    let {id} = match.params;
    if(id){
      let dataSourceRes = await getKetLuanThanhTra(id);
      if(dataSourceRes){
        dataSourceRes.thoigianbanhanh = dataSourceRes.thoigianbanhanh? moment(dataSourceRes.thoigianbanhanh) :'';
        this.formRef.current.setFieldsValue(dataSourceRes);
        this.setState({dataSource:dataSourceRes})
      }
    }else{
      this.formRef.current.setFieldsValue({thoigianbanhanh: moment()});
    }
  }

  onFinish = async (values) => {
    values.thoigianbanhanh = values.thoigianbanhanh ? values.thoigianbanhanh.format('YYYY-MM-DD HH:mm:ss') : null
    let {match} = this.props;
    let {id} = match.params;
    let { _id, dataSource} = this.state;
    let dataSave = values;

    if(dataSource._id){
      let dataRes = await updateById(dataSource._id, dataSave);
      if(dataRes){
        message.success('Cập nhật thành công');
        this.setState({edit: !this.state.edit});
      }
    }else{
      dataSave.phieudieutra_id = id;
      let dataRes = await add(dataSave);
      if(dataRes){
        message.success('Thêm mới thành công');
        this.setState({_id: dataRes._id});
      }
    }
  };

  renderHanhViViPhamchung() {
      return <Col {...layoutCol1} >
        <Row><Checkbox value='1'> Khí thải </Checkbox></Row>
        <Row><Checkbox value='2'> Nước thải </Checkbox></Row>
        <Row><Checkbox value='3'> CTR sinh hoạt </Checkbox></Row>
        <Row><Checkbox value='4'> CTR công nghiệp  </Checkbox></Row>
        <Row><Checkbox value='5'> CTR nguy hại </Checkbox></Row>
      </Col>;
  }
  renderHanhViViPhamYTe() {
    return <Col {...layoutCol1} >
      <Row><Checkbox value='2'> Nước thải </Checkbox></Row>
      <Row><Checkbox value='3'> CTR sinh hoạt </Checkbox></Row>
      <Row><Checkbox value='5'> CTR nguy hại </Checkbox></Row>
      <Row><Checkbox value='6'> CTR y tế thông thường </Checkbox></Row>
    </Col>;
}
  renderHanhViViPhamChanNuoi() {
    return <Col {...layoutCol1} >
      <Row><Checkbox value='2'> Nước thải </Checkbox></Row>
      <Row> <Checkbox value='3'> CTR sinh hoạt </Checkbox></Row>
      <Row><Checkbox value='5'> CTR nguy hại </Checkbox></Row>
      <Row><Checkbox value='8'> CTR rắn chăn nuôi </Checkbox></Row>
    </Col>;
  }

  renderHanhViViPhamCoSoXuLy() {
    return <Col {...layoutCol1} >
     <Row><Checkbox value='1'> Khí thải </Checkbox></Row> 
     <Row><Checkbox value='2'> Nước thải </Checkbox></Row>
    </Col>;
  }

  renderHanhViViPhamBanQuanLy() {
    return <Col {...layoutCol1} >
      <Row><Checkbox value='3'> CTR sinh hoạt </Checkbox></Row>
      <Row><Checkbox value='7'> CT nguy hại </Checkbox></Row>
    </Col>;
  }

  renderHanhViViPhamLangNghe() {
    return <Col {...layoutCol1} >
      <Row><Checkbox value='1'> Khí thải </Checkbox></Row>
      <Row> <Checkbox value='2'> Nước thải </Checkbox></Row>
      <Row><Checkbox value='3'> CTR sinh hoạt </Checkbox></Row>
      <Row><Checkbox value='9'> CTR sản xuất  </Checkbox></Row>
      <Row><Checkbox value='5'> CTR nguy hại </Checkbox></Row>
    </Col>;
  }


  render() {
    const {loading} = this.props;
    let {loaiphieu_id} = this.props;
    if(!loaiphieu_id) return null;
    let dmketluanthanhtra = loaiphieu_id.ketluanthanhtra
    return <Form ref={this.formRef} layout='vertical' size='small' autoComplete='off' onFinish={this.onFinish}
                 onValuesChange={this.onFieldsChange} id="myForm">
      <Box title='Kết luận thanh tra,'
           boxActions={<Button key="submit" htmlType="submit" form="myForm" icon={<SaveOutlined/>} size='small'
                               type="primary">Lưu dữ liệu</Button>}
>
    <Row gutter={10}>
    <Col sm={24}><strong>D.2. Kết quả thanh tra, kiểm tra (Scan Kết luận thanh tra, kiểm tra gần nhất)</strong></Col>

          <Col {...layoutCol}>
            <Form.Item label={<b>Số Kết luận thanh tra, kiểm tra</b>} name="soketluan" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input placeholder='Số kết luận thanh tra' disabled={loading}/>
            </Form.Item>
          </Col>
          <Col {...layoutCol}>
            <Form.Item label={<b>Cơ quan ban hành</b>} name="coquanbanhanh" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input placeholder='Cơ quan ban hành' disabled={loading}/>
            </Form.Item>
          </Col>
          <Col {...layoutCol}>
              <Form.Item label={<b>Thời gian ban hành</b>} name="thoigianbanhanh" validateTrigger={['onChange', 'onBlur']}
                         >
                <DatePicker placeholder='Thời gian ban hành'  format="DD-MM-YYYY" disabled={loading} className="w-full"/>
              </Form.Item>
            </Col>
          <Col {...layoutCol}>
            <Form.Item label={<b>Hành vi vi phạm</b>} name="hanhvivipham">
              <Checkbox.Group className="w-full">
                {
                  dmketluanthanhtra.indexOf('CHUNG') !== -1 && <>{this.renderHanhViViPhamchung()}</>
                }
                {
                  dmketluanthanhtra.indexOf('COSOYTE') !== -1 && <>{this.renderHanhViViPhamYTe()}</>
                }
                {
                  dmketluanthanhtra.indexOf('COSOCHANNUOI') !== -1 && <>{this.renderHanhViViPhamChanNuoi()}</>
                }
                {
                  dmketluanthanhtra.indexOf('COSOXULY') !== -1 && <>{this.renderHanhViViPhamCoSoXuLy()}</>
                }
                {
                  dmketluanthanhtra.indexOf('BANQUANLY') !== -1 && <>{this.renderHanhViViPhamBanQuanLy()}</>
                }
                {
                  dmketluanthanhtra.indexOf('LANGNGHE') !== -1 && <>{this.renderHanhViViPhamLangNghe()}</>
                }
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col {...layoutCol3}>
            <Form.Item label={<b>2. Phí BVMT đối với nước thải đã nộp năm 2019 </b>} name="phibvmt" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input placeholder='Phí BVMT' disabled={loading}/>
            </Form.Item>
          </Col>

        </Row>
        {/* RIÊNG PHIẾU 7 */}

        {
          dmketluanthanhtra.indexOf('BANQUANLY') !== -1 && <Row gutter={10}>
          <Col {...layoutCol3}>
            <Form.Item label={<b>E. NHỮNG KHÓ KHĂN, VƯỚNG MẮC TRONG CÔNG TÁC QUẢN LÝ:</b>} name="khokhan" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input.TextArea rows={3} placeholder='Những khó khăn' disabled={loading}/>
            </Form.Item>
          </Col>
          <Col {...layoutCol3}>
            <Form.Item label={<b>F. KIẾN NGHỊ VÀ ĐỀ XUẤT:</b>} name="kiennghi" validateTrigger={['onChange', 'onBlur']}
                      >
              <Input.TextArea rows={3} placeholder='Kiến nghị' disabled={loading}/>
            </Form.Item>
          </Col>
        </Row>
        }

       
      </Box>
    </Form>;
  }
}



export default withRouter(KetLuanThanhTra);



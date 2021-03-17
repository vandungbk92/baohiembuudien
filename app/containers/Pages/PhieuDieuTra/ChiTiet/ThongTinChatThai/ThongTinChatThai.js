import React, { Component, Fragment } from 'react';
import {
  Button, Card,
  Form, Input,
  message, Table, Tabs,
} from 'antd';
import { PlusOutlined, SaveOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getThongTinChatThai, postThongTinChatThai } from '@services/phieudieutra/thongtinchatthaiService';
import ChatThaiSinhHoat from './ChatThai/ChatThaiSinhHoat';
import ChatThaiCongNghiep from './ChatThai/ChatThaiCongNghiep';
import ChatThaiNguyHai from './ChatThai/ChatThaiNguyHai';
import ChatThaiChanNuoi from './ChatThai/ChatThaiChanNuoi';
import ThongTinNuocThai from './ThongTinNuocThai';
import ThongTinKhiThai from './ThongTinKhiThai';
import XuLyNuocThai from './XuLyNuocThai';
import NuocThaiChanNuoi from './ThongTinNuocThai/NuocThaiChanNuoi'
import NuocThaiCSKhaiThacMo from './ThongTinNuocThai/NuocThaiCSKhaiThacMo'
import NuocThaiLangNghe from './ThongTinNuocThai/NuocThaiLangNghe'
import NuocThaiCoSoXuLy from './ThongTinNuocThai/NuocThaiCoSoXuLy'
import NuocThaiCoSoYTe from './ThongTinNuocThai/NuocThaiCoSoYTe'
import ChatThaiRanSHCoSoXuLy from './ChatThai/ChatThaiRanSHCoSoXuLy'
import ChatThaiRanCNCoSoXuLy from './ChatThai/ChatThaiRanCNCoSoXuLy'
import KhiThaiCoSoKhaiThacMo from './ThongTinKhiThai/KhiThaiCoSoKhaiThacMo'
import KhiThaiCacLangNghe from './ThongTinKhiThai/KhiThaiCacLangNghe'
import ChatThaiYTeKhongNguyHai from './ChatThai/ChatThaiYTeKhongNguyHai'
import ChatThaiYTeNguyHai from './ChatThai/ChatThaiYTeNguyHai'
import ChatThaiRanSanXuat from './ChatThai/ChatThaiRanSanXuat'
import ChatThaiNguyHaiBanQuanLy from './ChatThai/ChatThaiNguyHaiBanQuanLy'
import ChatThaiNguyHaiCoSoXuLy from './ChatThai/ChatThaiNguyHaiCoSoXuLy'


import { withSetting} from '@reduxApp/Setting/connect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getDataSave } from 'Pages/PhieuDieuTra/ChiTiet/ThongTinChatThai/thongtinchatthai.utils';
class ThongTinChatThai extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thongtinchatthai: null,
    };
  }

  async componentDidMount() {
    try {
      let { match } = this.props;
      let id = match.params.id
      if (id) {
        let thongtinchatthai = await getThongTinChatThai(id);
        if(thongtinchatthai){
          this.setState({thongtinchatthai})
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  onFieldsChange = async (changedValues, allValues) => {
  };

  onFormFinish = async (name, {values, forms}) => {
    console.log(forms,'forms')
    let { match } = this.props;
    let id = match.params.id
    let chatthaichannuoi = forms.form_chatthaichannuoi?.getFieldsValue();
    let chatthaicongnghiep = forms.form_chatthaicongnghiep?.getFieldsValue();
    let chatthainguyhai = forms.form_chatthainguyhai?.getFieldsValue();
    let chatthaisinhhoat = forms.form_chatthaisinhhoat?.getFieldsValue();
    let chatthaiyte = forms.form_chatthaiyte?.getFieldsValue();
    let chatthaixulynuoc = forms.form_chatthaixulynuoc?.getFieldsValue();
    let chatthaikhithai = forms.form_chatthaikhithai?.getFieldsValue();
    let chatthainuocthai = forms.form_chatthainuocthai?.getFieldsValue();
    let chatthainuocthaicosoxuly = forms.form_chatthainuocthaicosoxuly?.getFieldsValue();
    


    let data_chatthai = {chatthaichannuoi, chatthaicongnghiep, chatthainguyhai, chatthaisinhhoat, chatthaiyte,
      chatthaixulynuoc, chatthaikhithai, chatthainuocthai, chatthainuocthaicosoxuly
    }
    let {thongtinchatthai} = this.state;
    let dataSave = getDataSave(thongtinchatthai, data_chatthai)
    console.log(dataSave,'dataSave')

    if(Object.keys(dataSave).length){
      let chatthaiRes = await postThongTinChatThai(id, dataSave);
      if(chatthaiRes){
        message.success('Lưu dữ liệu thành công');
        for (let key in chatthaiRes) {
          if (chatthaiRes.hasOwnProperty(key)) {
            thongtinchatthai[key] = chatthaiRes[key]
          }
        }
        this.setState({thongtinchatthai})
      }
    }else{
      message.success('Lưu dữ liệu thành công');
    }

  }

  render() {

    const {thongtinchatthai} = this.state;
    let {loaiphieu_id} = this.props;
    if(!thongtinchatthai || !loaiphieu_id) return null;
    let arrayToggle = loaiphieu_id.thongtinchatthai
    return <>
      <Form.Provider
        onFormFinish={this.onFormFinish}
      >
        <Tabs type="card" size="small" tabBarExtraContent={
          <Form name="form4" layout='vertical' size='small' autoComplete='off'
                onValuesChange={this.onFieldsChange} id="form4">
            <Button htmlType="submit" size='small' type="primary" ghost icon={<SaveOutlined/>}>
              Lưu dữ liệu
            </Button>
          </Form>}>
          <Tabs.TabPane tab="Chất thải rắn" key="1">
            {
              arrayToggle.indexOf('CHATTHAIRANSINHHOAT') !== -1 && <ChatThaiSinhHoat quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthaisinhhoat}/>
            }
            {
              arrayToggle.indexOf('CHATTHAIRANSHCOSOXULY') !== -1 && <ChatThaiRanSHCoSoXuLy quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthaisinhhoat}/>
            }
            {
              arrayToggle.indexOf('CHATTHAIRANCNCOSOXULY') !== -1 && <ChatThaiRanCNCoSoXuLy quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthaicongnghiep}/>
            }
            {
              arrayToggle.indexOf('CHATTHAIRANCONGNGHIEP') !== -1 && <ChatThaiCongNghiep quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthaicongnghiep}/>
            }
            {
              arrayToggle.indexOf('CHATTHAIRANYTEKONGUYHAI') !== -1 && <ChatThaiYTeKhongNguyHai quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthaiyte}/>
            }
            {
              arrayToggle.indexOf('CHATTHAIRANSANXUAT') !== -1 && <ChatThaiRanSanXuat quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthaicongnghiep}/>
            }

            {
              arrayToggle.indexOf('CHATTHAIRANCHANNUOI') !== -1 && <ChatThaiChanNuoi quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthaichannuoi}/>
            }
            {
              arrayToggle.indexOf('CHATTHAINGUYHAIBANQUANLY') !== -1 && <ChatThaiNguyHaiBanQuanLy quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainguyhai}/>
            }

            {
              arrayToggle.indexOf('CHATTHAINGUYHAICOSOXULY') !== -1 && <ChatThaiNguyHaiCoSoXuLy  quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainguyhai}/>
            }

            {
              arrayToggle.indexOf('CHATTHAINGUYHAI') !== -1 && <ChatThaiNguyHai  quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainguyhai}/>
            }

            {
              arrayToggle.indexOf('CHATTHAIYTENGUYHAI') !== -1 && <ChatThaiYTeNguyHai quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainguyhai}/>
            }

            {
              arrayToggle.indexOf('XULYNUOCTHAI') !== -1 && <XuLyNuocThai data={thongtinchatthai.chatthaixulynuoc}/>
            }


          </Tabs.TabPane>
          <Tabs.TabPane tab="Nước thải" key="2">
            {
              arrayToggle.indexOf('NUOCTHAI') !== -1 && <ThongTinNuocThai quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainuocthai}/>
            }

            {
              arrayToggle.indexOf('NUOCTHAICHANNUOI') !== -1 && <NuocThaiChanNuoi quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainuocthai}/>
            }

            {
              arrayToggle.indexOf('NUOCTHAICSKHAITHACMO') !== -1 && <NuocThaiCSKhaiThacMo quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainuocthai}/>
            } 

            {
              arrayToggle.indexOf('NUOCTHAILANGNGHE') !== -1 && <NuocThaiLangNghe quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainuocthai}/>
            } 
            {
              arrayToggle.indexOf('NUOCTHAICOSOXULY') !== -1 && <NuocThaiCoSoXuLy data={thongtinchatthai.chatthainuocthaicosoxuly}/>
            } 
            {
              arrayToggle.indexOf('NUOCTHAICOSOYTE') !== -1 && <NuocThaiCoSoYTe quanhuyen = {this.props.quanhuyen} data={thongtinchatthai.chatthainuocthai}/>
            } 

          </Tabs.TabPane>
          <Tabs.TabPane tab="Khí thải" key="3">
            {
              arrayToggle.indexOf('NUOCTHAI') !== -1 &&  <ThongTinKhiThai data={thongtinchatthai.chatthaikhithai}/>
            } 
            {
              arrayToggle.indexOf('KHITHAICOSOKHAITHACMO') !== -1 && <KhiThaiCoSoKhaiThacMo data={thongtinchatthai.chatthaikhithai}/>
            } 
            {
              arrayToggle.indexOf('KHITHAILANGNGHE') !== -1 && <KhiThaiCacLangNghe data={thongtinchatthai.chatthaikhithai}/>
            } 
           
          </Tabs.TabPane>
        </Tabs>
      </Form.Provider>
    </>;
  }
}

export default compose(withSetting)(withRouter(ThongTinChatThai));




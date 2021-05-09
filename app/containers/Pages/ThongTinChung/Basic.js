import React, {useState} from 'react';
import debounce from 'lodash/debounce';
import { useAsyncMemo } from 'use-async-memo';
import { useSelector } from 'react-redux';
import {
  Col,
  Row,
  Form,
  Input,
  Space,
  Button,
  Upload,
  Avatar,
  Typography,
  message,
  InputNumber,
  Modal,
  Radio, Tag,
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined, CloseCircleOutlined,
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { getBase64 } from '@utils/imageUtil';

import { getOne, update ,add} from '@services/thongtinchungService';

import { makeGetLoading } from '@containers/App/AppProvider/selectors';

// Update ảnh lên server
import { uploadImage, uploadImages } from '@services/uploadServices';

import { RULE } from '@constants';
import { API } from '@api';
import { getfileDetail } from '@commons/functionCommons';
export default function Basic() {
  const [form] = Form.useForm();

  const loading = useSelector(makeGetLoading());

  const [imageFile, setImageFile] = React.useState(null);
  const [fileList, setFileList] = React.useState([]);
  const [dataResponse, setDataResponse] = React.useState({});
  const [preview, setPreview] = useState({
    previewImage: '',
    previewVisible: false,
    previewTitle: '',
  })

  const imageSrc = useAsyncMemo(async () => {
    if (imageFile) {
      // eslint-disable-next-line no-return-await
      return await getBase64(imageFile);
    }
    return '';
  }, [imageFile]);

  React.useEffect(() => {
    const getDataInfo = async () => {
      const apiRequest = await getOne();
      form.setFieldsValue(apiRequest);
      setDataResponse(apiRequest);
      setPreviewState(apiRequest.hinhanh)
    };
    getDataInfo();
  }, []);

  const setPreviewState = (hinhanh) => {
    if(Array.isArray(hinhanh)){
      hinhanh = hinhanh.map((data, idx) => {
        return {
          uid: idx,
          name: data,
          status: 'done',
          url: API.FILES.format(data)
        }
      })
    }
    setFileList(hinhanh);
  }

  const onSave = debounce(async values => {
    if (imageFile) {
      const image_id = await uploadImage(imageFile);
      if (image_id) values.logo = image_id;
    } else delete values.logo;
    let [originFileNm, fileUpload] = getfileDetail(fileList);
    if (fileUpload.length) {
      const image_id_list = await uploadImages(fileUpload);
      if (image_id_list && image_id_list.length) originFileNm = [...originFileNm, ...image_id_list];
    }
    values.hinhanh = originFileNm
    if (values._id){
      const apiRequest = await update(values._id, values);
      if (apiRequest) {
        setDataResponse(apiRequest);
        setImageFile(null);
        setPreviewState(apiRequest.hinhanh)
        message.success('Cập nhật dữ liệu thành công.');
      }
    }else {
      const apiRequest = await add(values);
      setDataResponse(apiRequest);
      setImageFile(null);
      setPreviewState(apiRequest.hinhanh)
      message.success('Thêm mới dữ liệu thành công.');
    }


  });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  return (
    <Form size="small" layout="vertical" autoComplete='off' onFinish={onSave} form={form}>
      <Typography.Title level={5} className="underline">1. Thông tin liên hệ</Typography.Title>
      <Row gutter={10}>
        <Col xl={16}>
          <Row gutter={10}>
            <Form.Item name="_id" hidden={true}>
              <Input disabled={true} type="hidden"/>
            </Form.Item>
            <Col xs={24} lg={12}>
              <Form.Item
                name="duongdaynong"
                label="Đường dây nóng"
                hasFeedback
                rules={[RULE.REQUIRED, RULE.PHONE]}>
                <Input placeholder="Đường dây nóng" disabled={loading}/>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[RULE.REQUIRED, RULE.EMAIL]}
                hasFeedback
                validateTrigger={['onChange', 'onBlur']}
              >
                <Input placeholder="Email" disabled={loading}/>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name="diachi" label="Địa chỉ" rules={[RULE.REQUIRED]} hasFeedback>
                <Input placeholder="Địa chỉ" disabled={loading}/>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xl={8}>
          <Form.Item className="text-center" name="logo">
            <Space direction="vertical">
              <Avatar src={imageSrc || (dataResponse?.logo ? API.FILES.format(dataResponse.logo) : '')} size={128}
                      style={{ fontSize: 48 }}>
              </Avatar>
              <Upload
                accept="image/*"
                onChange={({ file }) => setImageFile(file)}
                beforeUpload={file => {
                  const maxSize = 5; // MB
                  const isJpgOrPng = ['image/jpeg', 'image/png', 'image/gif'];
                  if (!isJpgOrPng) {
                    message.error('Bạn chỉ có thể tải lên tệp JPG/PNG/GIF!');
                    return false;
                  }
                  const isSizeValid = file.size / 1024 / 1024 < maxSize;
                  if (!isSizeValid) {
                    message.error(`Kích thước ảnh phải nhỏ hơn ${maxSize}MB!`);
                    return false;
                  }
                  // Upload file manually after
                  return false;
                }}
                showUploadList={false}
              >
                <Button size="small">Thay đổi hình đại diện</Button>
              </Upload>
            </Space>
          </Form.Item>
        </Col>
      </Row>

      <Typography.Title level={5} className="underline">2. Cài đặt ứng dụng</Typography.Title>
      <Row gutter={10}>
        <Col xl={8}>
          <Form.Item
            name="songayhenkham"
            label="Số ngày nhắc trước hẹn khám"
            hasFeedback
            rules={[{ required: true, message: 'Không được để trống' }]}
            tooltip="Số ngày nhắc trước khi đến lịch hẹn tái khám"
          >
            <InputNumber placeholder="Đường dây nóng" disabled={loading}/>
          </Form.Item>
        </Col>
        <Col sm={16}>
          <Form.Item name="danhgiadichvu" label="Đánh giá dịch vụ"
                     tooltip="Cho phép bệnh nhân đánh giá các dịch vụ đã sử dụng hoặc chỉ dịch vụ cho phép đánh giá">
            <Radio.Group compact>
              <Radio value={1}><Tag icon={<CheckCircleOutlined  />} color="processing" className="font-medium">Tất cả dịch vụ</Tag></Radio>
              <Radio value={2}><Tag icon={<CheckCircleOutlined />} color="success" className="font-medium">Dịch vụ được phép đánh giá</Tag></Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} xxl={24}>
          <Form.Item label="Hình ảnh" name="hinhanh">
            <ImgCrop rotate modalTitle="Tải ảnh lên" aspect={2}>
              <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onRemove={(file) => {
                  let files = fileList.filter(data => {
                    return data.uid !== file.uid
                  })
                  setFileList(files)
                }}
                beforeUpload={(file, fileList) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setFileList((prev) => [...prev, {
                      // url: reader.result
                      originFileObj: file,
                      thumbUrl: reader.result
                    }]);
                  };

                  // then upload `file` from the argument manually
                  return false;
                }}
                showUploadList={{
                  showPreviewIcon: true,
                  showDownloadIcon: true,
                  showRemoveIcon: true,
                  downloadIcon: (file) => <a download href={file.url}><DownloadOutlined /></a>
                }}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} loading={loading}>
              Lưu thông tin
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <Modal
        style={{top: 10}}
        visible={preview.previewVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={() => setPreview({...preview, previewVisible: false})}
      >
        <img alt="example" style={{ width: '100%' }} src={preview.previewImage} />
      </Modal>

    </Form>
  );
}

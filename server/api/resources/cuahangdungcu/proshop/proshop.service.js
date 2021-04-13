import { template } from '@babel/core';
import Joi from 'joi';

export default {
  validateBody(body, method) {
    let objSchema = {
      tenhang: Joi.string().label('Tên mặt hàng')
      .trim()
      .required()
      .error((errors) => {
        return {
          template: 'là bắt buộc nhập',
        };
      }),
      soluong: Joi.number().label('Số lượng')
      .required()
      .error((errors) => {
        return {
          template: 'là bắt buộc nhập',
        };
      }),
      donvitinh_id: Joi.string().label('Đơn vị tính')
      .trim()
      .required()
      .error((errors) => {
        return {

          template: 'là bắt buộc nhập',
        };
      }),
      dongia: Joi.number()
      .label('Trạng thái')
      .required()
      .error((errors) => {
        return {
          template: 'là bắt buộc nhập',
        };
      }),
      trangthai_id: Joi.string()
        .label('Trạng thái')
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
    };

    let newSchema = {};
    if (method === 'POST') {
      newSchema = Object.assign({}, objSchema);
    } else {
      for (let key in objSchema) {
        if (objSchema.hasOwnProperty(key) && body.hasOwnProperty(key)) {
          newSchema[key] = objSchema[key];
        }
      }
    }

    const schema = Joi.object().keys(newSchema);
    const { value, error } = Joi.validate(body, schema, {
      allowUnknown: true,
      abortEarly: true,
    });
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};

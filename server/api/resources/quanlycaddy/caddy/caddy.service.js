import Joi from 'joi';

export default {
  validateBody(body, method) {
    let objSchema = {
      id: Joi.string()
        .label('ID')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        taikhoan: Joi.string()
        .label('Tài khoản')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        sdt: Joi.string()
        .label('số điện thoại')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        diachi: Joi.string()
        .label('địa chỉ')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        matkhau: Joi.string()
        .label('Mật khẩu')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        hoten: Joi.string()
        .label('Họ tên')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
      
        trinhdohocvan: Joi.string()
        .trim(),
        kinhnghiem: Joi.string()
        .trim(),
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

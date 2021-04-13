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
        tenvoucher: Joi.string()
        .label('tên voucher')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),

      mota: Joi.string().trim(),
      muchoivien: Joi.string().trim(),
      diemtichluy: Joi.number(),
      soluongvoucher: Joi.number(),
      tgbatdau: Joi.date().label('Thời gian bắt đầu'),
      tgkethuc: Joi.date().label('Thời gian kết thúc'),
      trangthai: Joi.string().trim(),
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

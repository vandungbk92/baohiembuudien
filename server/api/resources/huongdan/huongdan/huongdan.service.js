import Joi from 'joi';

export default {
  validateBody(body, method) {
    let objSchema = {
      tieude: Joi.string()
        .label('Tiêu đề')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
      tieudephu: Joi.string().trim(),
      mota: Joi.string().trim(),
      noidung: Joi.string().trim(),
      danhmuc_id: Joi.string()
        .label('Danh mục tin tức')
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

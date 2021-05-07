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
        tencv: Joi.string()
        .label('Tên công việc')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        loaicv: Joi.string()
        .label('Loại công việc')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        tgbatdau: Joi.string()
        .label('Thời gian bắt đầu')
        .trim()
        .required()
        .error((errors) => {
          return {
            template: 'là bắt buộc nhập',
          };
        }),
        tgketthuc: Joi.string()
        .label('Thời gian kết thúc')
        .trim()
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

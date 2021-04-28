import Joi from 'joi';

export default {
  validateBody(body, method) {
    let objSchema = {
      mathanhtoanct: Joi.string().required().label('Mã thanh toán chi tiết').error((errors) => {
        return {
          template: 'là trường bắt buộc nhập',
          context: {
            errors: errors.length,
            codes: errors.map((err) => err.type),
          },
        };
      }),
      mathanhtoan: Joi.string().required().label('Mã thanh toán').error((errors) => {
        return {
          template: 'là trường bắt buộc nhập',
          context: {
            errors: errors.length,
            codes: errors.map((err) => err.type),
          },
        };
      })
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

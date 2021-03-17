import Joi from 'joi';

export default {
  validateBody(body, method) {
    let objSchema = {
      loaiphieu_id: Joi.string().required().label('Loại phiếu').error((errors) => {
        return {
          template: 'là bắt buộc nhập'
        };
      }),
      phieudieutra_id: Joi.string().required().label('Mã phiếu điều tra').error((errors) => {
        return {
          template: 'là bắt buộc nhập'
        };
      }),
      nguyenvatlieu_id: Joi.string().required().label('Nguyên, vật liệu').error((errors) => {
        return {
          template: 'là bắt buộc nhập'
        };
      }),
    }

    let newSchema = {}
    if(method === 'POST'){
      newSchema = Object.assign({}, objSchema)
    }else{
      for (let key in objSchema) {
        if (objSchema.hasOwnProperty(key) && body.hasOwnProperty(key)) {
          newSchema[key] = objSchema[key]
        }
      }
    }

    let schema = Joi.object().keys(newSchema);
    const { value, error } = Joi.validate(body, schema, {allowUnknown: true , abortEarly: true});
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};

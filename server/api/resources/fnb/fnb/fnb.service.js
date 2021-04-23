import Joi from 'joi';

export default {
  validateBody(body, method) {
    let objSchema = {
      id: Joi.string().required().label('ID').error((errors) => {
        return {
          template: 'là bắt buộc nhập'
        };
      }),
      tenmon: Joi.string().required().label('Tên món ăn').error((errors) => {
        return {
          template: 'là bắt buộc nhập'
        };
      }),
      mota: Joi.string().trim(),
      dongia: Joi.number().label('Đơn giá'),
      trangthai: Joi.string().trim(),
      
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

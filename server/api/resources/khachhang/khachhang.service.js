import Joi from 'joi';
import bcrypt from 'bcryptjs';
import BenhNhan from "./khachhang.model";

export default {
  encryptPassword(palinText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(palinText, salt);
  },
  comparePassword(plainText, encrypedPassword) {
    return bcrypt.compareSync(plainText, encrypedPassword);
  },
  validateSignup(body, method) {
    let objSchema = {
      /*_id: Joi.string().required().label('Họ tên').error((errors) => {
        return {
          template: 'là trường bắt buộc nhập',
          context: {
            errors: errors.length,
            codes: errors.map((err) => err.type),
          },
        };
      }),*/
      hoten: Joi.string().required().label('Họ tên').error((errors) => {
        return {
          template: 'là trường bắt buộc nhập',
          context: {
            errors: errors.length,
            codes: errors.map((err) => err.type),
          },
        };
      }),
      email: Joi.string().allow(null).allow(''),
      dienthoai: Joi.string().allow(null).allow(''),
      taikhoan: Joi.string().required().label('Tài khoản').error((errors) => {
        return {
          template: 'là trường bắt buộc nhập',
          context: {
            errors: errors.length,
            codes: errors.map((err) => err.type),
          },
        };
      }),
      matkhau: Joi.string().required().label('Mật khẩu').error((errors) => {
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
    const { value, error } = Joi.validate(body, schema, { allowUnknown: true, abortEarly: true });
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  validateLogin(body) {
    const schema = Joi.object().keys({
      taikhoan: Joi.string().required().label('Tài khoản').error((errors) => {
        return {
          template: 'là trường bắt buộc nhập',
          context: {
            errors: errors.length,
            codes: errors.map((err) => err.type),
          },
        };
      }),
      matkhau: Joi.string().required().label('Mật khẩu').error((errors) => {
        return {
          template: 'là trường bắt buộc nhập',
          context: {
            errors: errors.length,
            codes: errors.map((err) => err.type),
          },
        };
      }),
      device_token: Joi.string().allow(null).allow('')
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  async addOrUpdateDeviceToken(benhnhan, deviceToken) {
    if (benhnhan && deviceToken) {
      let deviceTokens = benhnhan.device_tokens ? benhnhan.device_tokens : [];
      let deviceIndex = deviceTokens.indexOf(deviceToken);
      if (deviceIndex === -1) {
        deviceTokens.push(deviceToken);
        await BenhNhan.findByIdAndUpdate(benhnhan._id, { device_tokens: deviceTokens }, { new: true });
      }
    }
  },
  async findAndRemoveDeviceToken(benhnhan, deviceToken) {
    if (benhnhan && deviceToken) {
      let deviceTokens = benhnhan.device_tokens ? benhnhan.device_tokens : [];
      let deviceIndex = deviceTokens.indexOf(deviceToken);
      if (deviceIndex !== -1) {
        deviceTokens.splice(deviceIndex, 1);
        await BenhNhan.findByIdAndUpdate(benhnhan._id, { device_tokens: deviceTokens }, { new: true });
      }
    }
  },
};

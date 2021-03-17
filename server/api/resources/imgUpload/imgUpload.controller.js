import * as fileUtils from '../../utils/fileUtils';
import path from 'path';

import { getConfig } from '../../../config/config';
const config = getConfig(process.env.NODE_ENV);
let conf = config.cos.credentials;
let bucketName = config.cos.bucketName;

export default {
  //findFileById(req, res) {
    // return res.redirect(fileUtils.getUrlFile(req.params.id));
  //},

  findFileById(req, res) {
    let {id} = req.params;
    return res.sendFile(path.join(process.cwd(), './upload/files/' + id));
  },


  
  async uploadImage(req, res) {
    try {
      let image = req.files && req.files.image ? req.files.image : '';
      if (!image) {
        return res.status(404).send({ success: false, message: 'Dữ liệu của files hoặc ảnh tải lên không tồn tại.' });
      }

      let originalFilename = image.originalFilename;

      let extension = path.extname(originalFilename);
      let fileWithoutExtension = fileUtils.formatFileName(path.basename(originalFilename, extension));
      let date_val = new Date();
      let timestam = date_val.getTime();
      let fileStorage = fileWithoutExtension + '_' + timestam + extension;
      let uri = conf.endpoint + '/' + bucketName + '/' + fileStorage;
      let a = await fileUtils.createByName(req.files.image.path, fileStorage)
      return res.status(200).send({ success: true, image_id: uri });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async uploadFile(req, res) {
    try {
      const { filename } = req.file;
      return res.json({ file_id: filename });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

};

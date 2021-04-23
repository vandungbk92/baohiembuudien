import path from 'path';
const sharp = require('sharp');
var sizeOf = require('image-size');
import fs from 'fs';
import * as fileUtils from "../../utils/fileUtils";

export default {
  async uploadImage(req, res) {
    try {
      console.log(req.file,'req.file')
      let { filename, path } = req.file;
      let pathOriginal = './' + path

      let properties = sizeOf(path);
      const imageHeight = properties.height;

      let fileNamResize = 'img_' + filename
      let pathImageResize = './uploads/images/' +  fileNamResize

      await sharp(pathOriginal)
        .rotate()
        .resize(null, imageHeight > 960 ? 960 : null)
        .toFile(pathImageResize)
        .then(async (new_file_info) => {

          fs.unlink(pathOriginal, (err) => {
            if (err) {
              console.log('err', err);
              throw err;
            }
          });
          return res.json({ image_id: fileNamResize });
        })
        .catch(function(err) {
          return res.status(404).json({
            success: false,
            message: 'Không thể tải ảnh lên, vui lòng kiểm tra và thử lại',
          });
        });


    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async uploadFile(req, res) {
    try {
      const { filename } = req.file;
      console.log(req.file, 'req.filereq.file')
      return res.json({ file_id: filename });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  async getFileByName(req, res) {
    let fileNm = req.params.fileNm;
    return res.sendFile(path.join(process.cwd(), './uploads/images/' + fileNm));
  },

  async getImageByName(req, res) {
    let imgNm = req.params.imgNm;
    return res.sendFile(path.join(process.cwd(), './uploads/images/' + imgNm));
  },
  findFileById(req, res) {
    return res.redirect(fileUtils.getUrlFileAPI(req.params.id));
  },

};

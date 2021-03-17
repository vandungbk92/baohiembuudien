import express from 'express';
import passport from 'passport';
import imgUploadController from './imgUpload.controller';
import multer from 'multer'
import fs from 'fs'
import {checkTempFolder,convertFileName, multipartMiddleware} from '../../utils/fileUtils';
export const imgUploadRouter = express.Router();


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/files')
  },
  filename: function (req, file, cb) {
    let originalname = convertFileName(file.originalname)
    cb(null, originalname  )
  }
})

function extFile(req, file, cb) {
  if(!file.originalname.match(/\.(doc|docx|xls|xlsx|excel|pdf)$/)){
    return cb(new Error('Tệp tin không đúng định dạng'))
  }else{
    cb(null, true)
  }
}

let upload = multer({ storage: storage, fileFilter: extFile })

function checkUploadPath(req, res, next) {
  let path = './upload/files';
  console.log(process.cwd() +  './upload/files')
  fs.exists(path, function(exists) {
    if(exists) {
      next();
    }
    else {
      fs.mkdir(path, function(err) {
        if(err) {
          console.log('Error in folder creation');
          next();
        }
        next();
      })
    }
  })
}

imgUploadRouter
  .route('/:id')
  .get(imgUploadController.findFileById);

imgUploadRouter
  .route('/')
  .post(checkTempFolder, multipartMiddleware, imgUploadController.uploadImage)

imgUploadRouter
  .route('/file')
  .post(checkUploadPath, upload.single('file'), imgUploadController.uploadFile)

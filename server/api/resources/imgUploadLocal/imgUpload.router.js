import express from 'express';
import imgUploadController from './imgUpload.controller';
import multer from 'multer'
import fs from 'fs'
import {convertFileName} from '../../utils/fileUtilsLocal';

// config upload image
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images')
  },
  filename: function (req, file, cb) {
    let originalname = convertFileName(file.originalname)
    cb(null, originalname  )
  }
})

function extFile(req, file, cb) {
  if(!file.originalname.match(/\.(jpg|png|jpeg|gif|JPG|PNG|JPEG)$/)){
    return cb(new Error('Ảnh không đúng định dạng'))
  }else{
    cb(null, true)
  }
}

let uploadImage = multer({ storage: storage, fileFilter: extFile })
function checkUploadPath(req, res, next) {
  let path = './uploads/images';
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

// kết thúc config upload image



// config upload file
let storageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/files')
  },
  filename: function (req, file, cb) {
    let originalname = convertFileName(file.originalname)
    cb(null, originalname  )
  }
})

function extFileFiles(req, file, cb) {
  if(!file.originalname.match(/\.(doc|docx|xls|xlsx|excel|pdf|DOC|DOCX|XLS|XLSX|EXCEL|PDF)$/)){
    return cb(new Error('Tệp tin không đúng định dạng'))
  }else{
    cb(null, true)
  }
}

let uploadFile = multer({ storage: storageFiles, fileFilter: extFileFiles })

function checkUploadPathFiles(req, res, next) {
  let path = './uploads/files';
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

// kết thúc config upload Files

function checkUploadPathFolder(req, res, next) {
  let path = './uploads';
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

export const imgUploadRouter = express.Router();

// imgUploadRouter
//   .route('/')
//   .post(checkUploadPathFolder, checkUploadPathFiles, uploadFile.single('image'), imgUploadController.uploadFile)

imgUploadRouter
  .route('/')
  .post(checkUploadPathFolder, checkUploadPath, uploadImage.single('image'), imgUploadController.uploadImage)


imgUploadRouter.get('/:fileNm', imgUploadController.getFileByName)

imgUploadRouter.get('/image/:imgNm', imgUploadController.getImageByName)



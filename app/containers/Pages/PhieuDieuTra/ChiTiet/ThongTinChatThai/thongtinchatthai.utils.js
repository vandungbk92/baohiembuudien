import React from 'react';



export function getDataSave(dataOrg, dataEdit){
  // console.log(dataOrg, dataEdit, 'dataOrg, dataEdit')
  let objDataSave = {}
  let {chatthaichannuoi, chatthaicongnghiep, chatthainguyhai, chatthaisinhhoat, chatthaiyte,
    chatthaixulynuoc, chatthaikhithai, chatthainuocthai, chatthainuocthaicosoxuly
  } = dataOrg

  let checkChanNuoi = checkDatChange(chatthaichannuoi, dataEdit.chatthaichannuoi);
  if(checkChanNuoi) objDataSave.chatthaichannuoi = dataEdit.chatthaichannuoi

  let congnghiep = checkDatChange(chatthaicongnghiep, dataEdit.chatthaicongnghiep);
  if(congnghiep) objDataSave.chatthaicongnghiep = dataEdit.chatthaicongnghiep

  let nguyhai = checkDatChange(chatthainguyhai, dataEdit.chatthainguyhai);
  if(nguyhai) objDataSave.chatthainguyhai = dataEdit.chatthainguyhai

  let sinhhoat = checkDatChange(chatthaisinhhoat, dataEdit.chatthaisinhhoat);
  if(sinhhoat) objDataSave.chatthaisinhhoat = dataEdit.chatthaisinhhoat

  let yte = checkDatChange(chatthaiyte, dataEdit.chatthaiyte);
  if(yte) objDataSave.chatthaiyte = dataEdit.chatthaiyte

  let xlnuoc = checkDatChange(chatthaixulynuoc, dataEdit.chatthaixulynuoc);
  if(xlnuoc) objDataSave.chatthaixulynuoc = dataEdit.chatthaixulynuoc

  let khithai = checkDatChange(chatthaikhithai, dataEdit.chatthaikhithai);
  if(khithai) objDataSave.chatthaikhithai = dataEdit.chatthaikhithai

  let nuocthai = checkDatChange(chatthainuocthai, dataEdit.chatthainuocthai);
  if(nuocthai) objDataSave.chatthainuocthai = dataEdit.chatthainuocthai
  
  let nuocthaicsxl = checkDatChange(chatthainuocthaicosoxuly, dataEdit.chatthainuocthaicosoxuly);
  if(nuocthaicsxl) objDataSave.chatthainuocthaicosoxuly = dataEdit.chatthainuocthaicosoxuly

  return objDataSave
}

function checkDatChange(obj1, obj2){
  
  // obj1 là dữ liệu cũ.
  // obj2 là dữ liệu mới.
  let isCheck = false;
  // TH1. có tồn tại ở dataOrg và dữ liệu ở dataEdit thay đổi.
  if(obj1){
    // ở obj2 thì luôn có đủ các trường dữ liệu.
    for (let key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        // TH1.1. obj2 có dữ liệu và obj1 không có dữ liệu hoặc khác dữ liệu với obj1
      
        if(obj2[key]){
          if(!obj1[key] || obj2[key].toString() !== obj1[key].toString()){
            
            isCheck = true;
            break;
          }
        }
        // TH1.2. obj2 không có dữ liệu và obj1 có dữ liệu.
        else{
          if(obj1[key]){
            isCheck = true;
            break;
          }
        }
      }
    }
  }else{  // TH2. Không tồn tại ở dataOrg và có dữ liệu ở dataEdit.
    if(obj2){
      for (let key in obj2) {
        if (obj2.hasOwnProperty(key) && obj2[key]) {
          isCheck = true;
          break;
        }
      }
    }
  }
  return isCheck
}

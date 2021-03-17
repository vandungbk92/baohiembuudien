import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import PizZipUtils from 'pizzip/utils';

export function convertParam(queryObj, firstCharacter = '?') {
  if (typeof queryObj !== 'object') return '';
  let query = '';
  Object.entries(queryObj).forEach(([key, value]) => {
    if (value || value === 0 || value === '0') {
      query += query
        ? '&'
        : firstCharacter || '';
      query += `${key}=${value}`;
    }
  });
  return query;
}

export function convertFileName(str) {
  if (!str) return '';

  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
  str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
  str = str.replace(/[ỲÝỴỶỸ]/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/\s+/g, ' ');
  str.trim();
  return str;
}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function getPathFile(loaiphieu_id) {
  
  let pathFile= ""
  if(loaiphieu_id.link == '/trong-kkt-kcn' ){
    pathFile="/DocxTemplate/phieutrongkkt.docx"
  }
  else if(loaiphieu_id.link == '/ngoai-kkt-kcn' ){
    pathFile="/DocxTemplate/phieungoaikkt.docx"
  }
  else if(loaiphieu_id.link == '/chan-nuoi-tap-trung' ){
    pathFile="/DocxTemplate/phieuchannuoi.docx"
  }
  else if(loaiphieu_id.link == '/khai-thac-mo' ){
    pathFile="/DocxTemplate/phieucosokhaithacmo.docx"
  }
  else if(loaiphieu_id.link == '/co-so-y-te' ){
    pathFile="/DocxTemplate/phieucosoyte.docx"
  }
  else if(loaiphieu_id.link == '/xu-ly-chat-thai' ){
    pathFile="/DocxTemplate/phieuxulychatthai.docx"
  }
  else if(loaiphieu_id.link == '/quan-ly-kcn-ccn' ){
    pathFile="/DocxTemplate/phieubanquanlykcn.docx"
  }
  else if(loaiphieu_id.link == '/lang-nghe' ){
    pathFile="/DocxTemplate/phieulangnghe.docx"
  }
  return pathFile
  
}
export const generateDocument = (apiRes,loaiphieu_id) => {

  let pathFile = getPathFile(loaiphieu_id)
  loadFile (pathFile , function(
    // loadFile("https://docxtemplater.com/tag-example.docx", function(
    error,
    content
  ) {
    console.log(apiRes, 'apiRes')

    if (error) {
      throw error;
    }
    var zip = new PizZip(content);
    var doc = new Docxtemplater().loadZip(zip);

    doc.setData({
      nguoidaidien : apiRes.setting.daidien ? apiRes.setting.daidien: '',
      chucvu : apiRes.setting.chucvu? apiRes.setting.chucvu: '_____________________________________'
}
    );
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    }
    catch (error) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function(
            error,
            key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function(error) {
            return error.properties.explanation;
          })
          .join("\n");
        console.log("errorMessages", errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    var out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }); //Output the document using Data-URI
    saveAs(out, "output.docx");
  });
};

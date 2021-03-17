import React, { Component } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import {generateDocument} from '../../../commons/functionCommons'


export default class DownloadFile extends React.Component {
  getDataReport = async () => {
    // let adataapit = {}
    let adataapit = ''
    generateDocument(adataapit, 'phieu1')
  }
  render() {
    return (
      <div className="p-2">
        <button onClick={this.getDataReport}>Generate document</button>
      </div>
    );
  }
};

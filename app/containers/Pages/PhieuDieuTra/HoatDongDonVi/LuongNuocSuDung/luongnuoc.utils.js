
export function getDataSave(dataSource){
  let dsthemmoi = [];
  let dscapnhat = [];
  dataSource.forEach(curr => {
    if(curr.nuocmay_sudung || curr.nuocmay_mucdich || curr.nuocngam_sudung || curr.nuocngam_mucdich
    || curr.nuocmat_sudung || curr.nuocmat_mucdich || curr.nuockhac_sudung || curr.nuockhac_mucdich){
      if(curr.addNew){
        dsthemmoi = [...dsthemmoi, {
          nuocmay_sudung: curr.nuocmay_sudung,
          nuocmay_mucdich: curr.nuocmay_mucdich,
          nuocngam_sudung: curr.nuocngam_sudung,
          nuocngam_mucdich: curr.nuocngam_mucdich,
          nuocmat_sudung: curr.nuocmat_sudung,
          nuocmat_mucdich: curr.nuocmat_mucdich,
          nuockhac_sudung: curr.nuockhac_sudung,
          nuockhac_mucdich: curr.nuockhac_mucdich

        }]
      }else if(curr.update){
        dscapnhat = [...dscapnhat, {
          _id: curr._id,
          nuocmay_sudung: curr.nuocmay_sudung,
          nuocmay_mucdich: curr.nuocmay_mucdich,
          nuocngam_sudung: curr.nuocngam_sudung,
          nuocngam_mucdich: curr.nuocngam_mucdich,
          nuocmat_sudung: curr.nuocmat_sudung,
          nuocmat_mucdich: curr.nuocmat_mucdich,
          nuockhac_sudung: curr.nuockhac_sudung,
          nuockhac_mucdich: curr.nuockhac_mucdich
        }]
      }
    }
  })
  return {dsthemmoi, dscapnhat}
}


export function getDataSoure(dsLoaiPhieu){
  let dataSource = []
  dsLoaiPhieu.forEach(curr => {
    dataSource = [...dataSource, {
      _id: curr._id,
      tenphieu_viettat: curr.tenphieu_viettat,
      sophieu: 0,
      link: curr.link
    }];
  })
  return dataSource
}


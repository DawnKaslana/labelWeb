const mysql = require('../mysql');
const fs = require('fs');

const imgFolder = './images';

const getFileList = (req, res) => {
  let path = req.query.path

  mysql('file')
  .select().where({path})
  .then((result)=>{
    res.send(result)
  }).catch((err) => {
    console.error(err)
  })
}

const getFileNumber = (req, res) => {
  mysql('file').count({count:'file_name'})
  .then((result)=>{
    res.send(result[0])
  }).catch((err) => {
    console.error(err)
  })
}

const readDir = (filePath,files) => {
  fs.readdirSync(filePath).forEach(item => {
    let subfilePath = filePath+'/'+item
    let stat = fs.statSync(subfilePath)
    
    if(stat.isFile()){
      subfilePath = subfilePath.slice(8)
      pathArr = subfilePath.split('/')
      files.push({path:pathArr.slice(0,-1).join('/'),
                            name:pathArr.slice(-1)})
    } 
    else readDir(subfilePath,files) /*Recursion*/ 
  })
}

const updateFileList = (req, res) => {
  let files = []
  readDir(imgFolder,files)

  mysql('file').truncate().then(()=>{
    mysql('file').insert(files)
    .then((result)=>{
      res.send('updated')
    }).catch((err) => {
      console.error(err)
    })
  })
}

const getFile = (req, res) => {
  let filename = req.query.filename

  fs.readFile(imgFolder+'/'+filename, function(err, originBuffer) {
    res.send(originBuffer)
    // 接下来该如何实现把读取的数据流保存为图片,  图片读取时编码格式固定为 utf8
  });

}


module.exports = {
  getFileList, getFile, updateFileList, getFileNumber
}
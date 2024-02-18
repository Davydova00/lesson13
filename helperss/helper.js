const fs = require('fs');
export function deleteFile(path){
  try {
    fs.unlinkSync(path);
    console.log('file deleted');
  } catch (err){
    console.error(err.message);
  }
}
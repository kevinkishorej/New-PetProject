const multer = require('multer');

module.exports = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
       if(file){
           cb(null,true)
       }
        
    }
})
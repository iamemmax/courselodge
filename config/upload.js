const multer =  require("multer")
const path = require("path");



const storage = multer.diskStorage({
    filename:(req, file, cb)=>{
        cb(null,  file.fieldname + '-' + Date.now() + file.originalname)
    },
    destination:(req, file, cb) =>{
        cb(null, path.resolve(__dirname, ".","../public/img"))
    }
})



const upload = multer({storage:storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "cv") { // if uploading resume
            if (
              file.mimetype === 'application/pdf' ||
              file.mimetype === 'application/msword' ||
              file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) { // check file type to be pdf, doc, or docx
              cb(null, true);
            } else {
              cb(null, false); // else fails
            return cb(new Error('File types allowed pdf, doc, or docx'));

            }
          } else { // else uploading image
            if (
              file.mimetype === 'image/png' ||
              file.mimetype === 'image/jpg' ||
              file.mimetype === 'image/jpeg'
            ) { // check file type to be png, jpeg, or jpg
              cb(null, true);
            } else {
              cb(null, false); // else fails
            return cb(new Error('File types allowed .jpeg, .jpg and .png!'));

            }
          }
   
     },
    
})


 

module.exports = upload





const multer = require('multer')


const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log(file);
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        let extention = file.mimetype.split('/')[1];
        cb(null, `${file.originalname}`);
    }
});

let upload = multer({storage : storage})
module.exports = upload
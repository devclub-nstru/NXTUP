const express = require("express")
const multer = require('multer');
var path = require('path');
var fs = require("fs")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'/public')); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

const router = express.Router()

const { uploadImage } = require('../controllers/imageController');

// Route definition
if(!fs.existsSync(path.join(__dirname,'/public'))){
    fs.mkdirSync(path.join(__dirname,'/public'))
}
router.post('/', upload.single('file'), uploadImage);

module.exports = router;

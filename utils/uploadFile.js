const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images/Uploads')
    },
    filename: function(req, file, callback) {
        //callback(null, Date.now() + '_bpig_' + file.originalname);
        callback(null, 'bpig_' + file.originalname);
    }
});
module.exports = multer({ storage: storage });
const multer = require('multer');
const path = require('path');

const storoge = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({
    storage: storoge,
    limits: {fieldSize: 1024 * 1024* 5},
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Only .jpg and .png files are allowed'), false);
        }
    }
});
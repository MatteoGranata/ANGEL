import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/avatars';
    fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory if it does not exist
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      console.log('Only JPEG and PNG files are accepted.');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;

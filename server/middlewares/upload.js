import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/avatars'; // Define the directory for uploaded avatars
    fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory if it does not exist
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename with timestamp and original name
  },
});
const upload = multer({
  storage: storage, // Use the configured disk storage
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      callback(null, true); // Allow PNG and JPEG files
    } else {
      console.log('Only JPEG and PNG files are accepted.');
      callback(null, false); // Reject other file types
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Set maximum file size to 5MB
  },
});

export default upload;

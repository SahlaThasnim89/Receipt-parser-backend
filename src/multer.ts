import multer from "multer"
import fs from 'fs';

const uploadDir = 'uploads/receipts';

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage=multer.memoryStorage()

const fileFilter=(_req:any,file:Express.Multer.File,cb:any)=>{
    const allowedTypes=['image/jpeg','image/jpg','image/png']
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Invalid file type. Only JPG and PNG are allowed.'), false);
    }
}

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Optional: 5MB limit
});
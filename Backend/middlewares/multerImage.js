import multer from "multer";

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads")
    },
    filename : (req,file , cb)=>{
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
})

const multerImage = multer({storage}) 
export {multerImage}
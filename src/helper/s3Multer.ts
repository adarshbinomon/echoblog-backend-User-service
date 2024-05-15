import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import dotenv from "dotenv";
import { MulterS3File } from "../utils/interfaces/interfaces";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    file?: MulterS3File;
  }
}

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_REGION as string;
const bucketAccessKey = process.env.AWS_ACCESS_KEY as string;
const bucketSecretAccessKey = process.env.AWS_SECRET_KEY as string;

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: "ap-south-1",
});

const s3Storage = multerS3({
  s3: s3,
  bucket: bucketName,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  },
});

function sanitizeFile(file: any, cb: any) {
  const imageExt = [".jpg", ".jpeg", ".png", ".webp"];

  const isAllowedExt = imageExt.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
}

export const uploadMedia = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});

const uploadProfilePicture = uploadMedia.single("profilePicture");
const uploadCoverPicture = uploadMedia.single("coverPicture");

export { uploadCoverPicture, uploadProfilePicture };

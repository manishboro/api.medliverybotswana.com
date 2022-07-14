const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (size, fileFilter, bucketName, fileName = (req, file) => "file") => {
  return multer({
    limits: { fileSize: size },
    fileFilter,
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, fileName(req, file));
      },
    }),
  });
};

module.exports = upload;

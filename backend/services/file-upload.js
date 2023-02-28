const { S3Client } = require('@aws-sdk/client-s3');
const aws = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: "vDJKaZHKQA9QYrASgUcfbx2cV3SGFqsxJpzKNdh2",
    accessKeyId: "AKIAQGBUOH2YSO2HZ22H",
    region: "ap-northeast-1"
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'interview-me-wasif',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

app.post('/upload', upload.array('photos', 3), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})
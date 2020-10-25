/** @format */

const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
var sharp = require("sharp");



const Ad = require("../models/ad");
const auth = require("../middleware/auth");
const {
  create_ads,
  get_all_ads,
  get_my_ads,
  get_ad_byId,
  get_ad_byCategoryId,
  update_my_ads,
  delete_my_ads,
  upload_ad_picture,
  show_ad_picture,
} = require("../controllers/adController");

//Configure Multer
require("dotenv").config();
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "ca-central-1",
});
const s3 = new aws.S3();

// const uploadPicture = multer({
//     //dest: 'public/ad/images',
//     limits: {
//         fileSize: 1000000 // 1 MB
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
//             return cb(new Error('File type is not supported'))
//         }
//         cb(undefined, true)

//     }
// })

var uploadPicture = multer({
  limits: {
    fileSize: 1000000, // 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("File type is not supported"));
    }

    cb(undefined, true);
  },
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: process.env.BUKET_NAME,

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
    resize: {
      width: 10,
      height: 10,
    },
  }),
});

//Create new ad
router.post("/", auth, create_ads);

//Upload Ad picture
router.post(
  "/:id/picture",
  auth,
  uploadPicture.single("picture"),
  upload_ad_picture
);
//Get Ad Picture
router.get("/:id/picture", show_ad_picture);
//Get all ads
router.get("/", get_all_ads);
//Get my ads
router.get("/me", auth, get_my_ads);
//Get ads by Id
router.get("/:id", get_ad_byId);

//Get ads by Category Id
router.get("/category/:id", get_ad_byCategoryId);

//Update my ad
router.patch("/:id", auth, update_my_ads);
//Delete my ad
router.delete("/:id", auth, delete_my_ads);

module.exports = router;

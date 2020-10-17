const express = require('express')
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Ad = require('../models/ad');
const auth = require('../middleware/auth')
const {create_ads, get_all_ads, get_my_ads,get_ad_byId, update_my_ads, delete_my_ads, upload_ad_picture, show_ad_picture} = require('../controllers/adController')
//Configure Multer
require('dotenv').config();
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'ca-central-1'
});
const s3 =  new aws.S3();

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
        fileSize: 1000000 // 1 MB
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(new Error('File type is not supported'))
        }
        cb(undefined, true)

    },
    storage: multerS3({ 
        acl: 'public-read',
      s3: s3,
      bucket: process.env.BUKET_NAME,
     
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })
//Create new ad
router.post('/api/v1/ads', auth, create_ads)
//Upload Ad picture
router.post('/api/v1/ads/:id/picture', auth,uploadPicture.single('picture'), upload_ad_picture)
//Get Ad Picture
router.get('/api/v1/ads/:id/picture', show_ad_picture)
//Get all ads
router.get('/api/v1/ads', get_all_ads)
//Get my ads
router.get('/api/v1/ads/me', auth, get_my_ads )
//Get ads by Id
router.get('/api/v1/ads/:id', auth, get_ad_byId )
//Update my ad
router.patch('/api/v1/ads/:id', auth, update_my_ads)
//Delete my ad
router.delete('/api/v1/ads/:id', auth, delete_my_ads)


module.exports = router


// {
//     "category": "5f2acc725c4e3e61af7d8206",
//     "description": "Looking for an inexpensive Mac? We've got you covered!  Apple MacBook Pro 13 inch Display — Apple Laptop -- 2.53Ghz C2D -- 4 GB RAM -- 250GB Hard Drive -- Optical CD / DVD Drive -- (Mid 2009)  Comes standard with 90 Day parts and labour warranty! Additional warranty coverage available (ask for details).  PLEASE NOTE: Responses to inquiries are limited to business hours of the store. We'll do our best to get back to you ASAP. Thanks for your patience!",
//     "deliveryOption": "",
//     "media": [],
//     "youtubeVideo": "",
//     "websiteURL": "www.macoutpost.com",
//     "location": "152 Wharncliffe Road South, London, ON",
//     "price": "499.99",
//     "phoneNumber": "519-645-7633",
   
//     "title": "MacBook Pro 13” 2.53Ghz C2D 4GB / 250GB / SD"
   
// },
// {
//     "category": "5f2acc725c4e3e61af7d8206",
//     "description": "***EMAIL IS VERY SLOW IF INTERESTED PLEASE TEXT 519 280 9693 THANK YOU***  Display: 15.6 HD LCD Display (1366 x 768) Processor: 1.1 GHz Intel® Celeron® N4000 Dual Core Processor Memory: 4 GB of DDR4 SDRAM Storage: 64GB eMMC Graphics: Intel® UHD Graphics integrated graphics Operating System: Windows 10 Home in S mode",
//     "deliveryOption": "",
//     "media": [],
//     "youtubeVideo": "",
//     "websiteURL": "www.macoutpost.com",
//     "location": "London, ON N5V 1A1",
//     "price": "375.00",
//     "phoneNumber": "519-645-7633",
    
//     "title": "BRAND NEW FACTORY SEALED ACER 15.6 IN LAPTOP WINDOWS 10"
   
// }
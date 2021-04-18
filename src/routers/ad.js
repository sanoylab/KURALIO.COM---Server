/** @format */

const express = require("express");
const router = express.Router();

const multer = require("multer");
const s3Storage = require("multer-sharp-s3");
const aws = require("aws-sdk");

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

const storage = s3Storage({
  s3,
  Bucket: process.env.BUKET_NAME,

  ACL: "public-read",

  Key: function (req, file, cb) {
    cb(null, Date.now().toString());
  },
  // resize or any sharp options will ignore when uploading non image file type
  resize: {
    width: 750,
    height: 420,
  },
});

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
  storage: storage,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Ad:
 *       type: object
 *       required:
 *         - category
 *         - title
 *         - description
 *         - deliveryOption
 *         - pictures
 *         - youtubeVideo
 *         - websiteURL
 *         - location
 *         - price
 *         - phoneNumber
 *         - postedBy
 *         - expiryDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the ad
 *         category:
 *           type: string
 *           description: The ad category id
 *         title:
 *           type: string
 *           description: Ad title
 *         description:
 *           type: string
 *           description: Ad description
 *         deliveryOption:
 *           type: string
 *           description: Delivery option
 *         pictures:
 *           type: string
 *           description: Ad pictures
 *         youtubeVideo:
 *           type: string
 *           description: YouTube URL
 *         websiteURL:
 *           type: string
 *           description: Website URL
 *         location:
 *           type: string
 *           description: Location name
 *         price:
 *           type: string
 *           description: Price
 *         phoneNumber:
 *           type: string
 *           description: Phone number
 *         postedBy:
 *           type: string
 *           description: User Id
 *         expiryDate:
 *           type: date
 *           description: Ad auto expiry date
 *       example:
 *         category: 5f2acc725c4e3e61af7d8206
 *         title: My awesome ad title
 *         description: description text
 *         deliveryOption: Free delivery
 *         pictures: ['PICTURE URL']
 *         youtubeVideo: Youtube_URL
 *         websiteURL: Website_URL
 *         location: New York
 *         price: 99.99 USD
 *         phoneNumber: 999-999-9999
 *         postedBy: 5f2acc725c4e3e61af7d8206
 *         experyDate: 12/2/2021
 */


//Create new ad
/**
 * @swagger
 * /api/v1/ads:
 *   post:
 *     summary: Create a new ad
 *     tags: [Ad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ad'
 *     responses:
 *       200:
 *         description: The ad was successfully created
 *       500:
 *         description: Some server error
 */
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
/**
 * @swagger
 * /api/v1/ads:
 *   get:
 *     summary: Returns the list of all the ads
 *     tags: [Ad]
 *     responses:
 *       200:
 *         description: The list of the ads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ad'
 */
router.get("/", get_all_ads);
//Get my ads

/**
 * @swagger
 * /api/v1/ads/me:
 *   get:
 *     summary: Returns the list of my ads
 *     tags: [Ad]
 *     responses:
 *       200:
 *         description: The list of my ads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ad'
 */

router.get("/me", auth, get_my_ads);
//Get ads by Id

/**
 * @swagger
 * /api/v1/ads/{id}:
 *   get:
 *     summary: Get the ad by id
 *     tags: [Ad]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ad id
 *     responses:
 *       200:
 *         description: The ad description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: The ad was not found
 */
router.get("/:id", get_ad_byId);

//Get ads by Category Id
/**
 * @swagger
 * /api/v1/category/{categoryId}:
 *   get:
 *     summary: Get the ad by category id
 *     tags: [Ad]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The categry id
 *     responses:
 *       200:
 *         description: The ad description by category id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ad'
 *       404:
 *         description: The ad was not found
 */
router.get("/category/:id", get_ad_byCategoryId);

//Update my ad
/**
 * @swagger
 * /ads:
 *   put:
 *     tags:
 *     - "Ad"
 *     summary: "Update ad"
 *     description: "update ad"
 *     operationId: "createUser"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "updated ad object"
 *       required: true
 *     responses:
 *       default:
 *         description: "successful operation"
 */
router.patch("/:id", auth, update_my_ads);
//Delete my ad

/**
 * @swagger
 * /user:
 *   delete:
 *     tags:
 *     - "Ad"
 *     summary: "Delete ad"
 *     description: "ad deleted using this endpoint"
 *     operationId: "createUser"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Deleted ad object"
 *       required: true
 *     responses:
 *       default:
 *         description: "successful operation"
 */
router.delete("/:id", auth, delete_my_ads);

module.exports = router;

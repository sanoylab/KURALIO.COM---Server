/** @format */

const express = require("express");
const multer = require("multer");

const router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

const {
  create_user,
  login_user,
  logout_user,
  profile_user,
  update_user,
  upload_userpicture,
  get_userpicture,
  delete_userpicture,
  delete_user,
} = require("../controllers/userController");

//Configure Multer
const uploadAvatar = multer({
  limits: {
    fileSize: 1000000, // 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("File type is not supported"));
    }
    cb(undefined, true);
  },
});
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - address
 *          - kefleKetema
 *          - woreda
 *          - leyuBotaSeme
 *          - geo
 *            - lat
 *            - long
 *         - phoneNumber
 *         - avatar 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the company
 *         name:
 *           type: string
 *           description: user name
 *         email:
 *           type: string
 *           description: Email address
 *         address:
 *           type: string
 *           description: Address
 *         phoneNumber:
 *           type: string
 *           description: Phone number
 *         avatar:
 *           type: string
 *           description: Avatar Image
 *       example:
 *         name: Yonas
 *         email: abc@abc.com
 *         address: New York
 *         phoneNumber: 222-222-2222
 */



//creating new user route

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *     - "User"
 *     summary: "Create user"
 *     description: "A new user can be registered using this endpoint"
 *     operationId: "createUser"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created user object"
 *       required: true
 *     responses:
 *       default:
 *         description: "successful operation"
 */
router.post("/", create_user);
//Login route
/**
 * @swagger
 * /api/v1/user/login:
 *   get:
 *     tags:
 *       - "User"
 *     summary: "Login User"
 *     description: Login
 *     response:
 *       200:
 *         description: Success
 */
router.post("/login", login_user);
//Logout route
router.post("/logout", auth, logout_user);
//Show My User Profile
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     tags:
 *       - "User"
 *     summary: "User Profile"
 *     description: Gets user profile
 *     response:
 *       200:
 *         description: Success
 */
router.get("/", auth, profile_user);
//Update User Profile

/**
 * @swagger
 * /api/v1/user:
 *   put:
 *     tags:
 *     - "User"
 *     summary: "Update user"
 *     description: "A new user can be registered using this endpoint"
 *     operationId: "createUser"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created user object"
 *       required: true
 *     responses:
 *       default:
 *         description: "successful operation"
 */
router.patch("/", auth, update_user);
//Uploading Profile Picture
router.post(
  "/me/avatar",
  auth,
  uploadAvatar.single("avatar"),
  upload_userpicture
);
//Get Profile Picture
//Show My User Profile
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     tags:
 *       - "User"
 *     summary: "User Profile Picture"
 *     description: Gets user profile picture
 *     response:
 *       200:
 *         description: Success
 */
router.get("/:id/avatar", get_userpicture);
//Delete Profile Picture

/**
 * @swagger
 * /api/v1/user:
 *   delete:
 *     tags:
 *     - "User"
 *     summary: "Delete user"
 *     description: "User deleted using this endpoint"
 *     operationId: "createUser"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Deleted user object"
 *       required: true
 *     responses:
 *       default:
 *         description: "successful operation"
 */
router.delete("/users/me/avatar", delete_userpicture);
//Delete User Account
router.delete("/", auth, delete_user);

module.exports = router;

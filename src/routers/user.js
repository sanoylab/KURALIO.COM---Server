const express = require('express')
const multer = require('multer')


const router = express.Router()

const User = require('../models/user')
const auth = require('../middleware/auth')


const {
    create_user,
    login_user,
    logout_user,
    profile_user,
    update_user,
    upload_userpicture,
    get_userpicture,
    delete_userpicture,
    delete_user 
} = require('../controllers/userController')

//Configure Multer
const uploadAvatar = multer({
    limits: {
        fileSize: 1000000 // 1 MB
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(new Error('File type is not supported'))
        }
        cb(undefined, true)

    }
})

//creating new user route 
router.post('/api/v1/users', create_user)
//Login route
router.post('/api/v1/users/login', login_user)
//Logout route
router.post('/api/v1/users/logout',auth, logout_user)
//Show My User Profile
router.get('/api/v1/users', auth, profile_user)
//Update User Profile
router.patch('/api/v1/users', auth, update_user)
//Uploading Profile Picture
router.post('/api/v1/users/me/avatar',auth, uploadAvatar.single('avatar'), upload_userpicture)
//Get Profile Picture
router.get('/api/v1/users/:id/avatar', get_userpicture)
//Delete Profile Picture
router.delete('/api/v1/users/me/avatar', delete_userpicture)
//Delete User Account
router.delete('/api/v1/users', auth, delete_user)

module.exports = router


const express = require('express')
const router = express.Router()

const Category = require('../models/category')
const multer = require('multer')

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - iconPicture
 *         - isMenu
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: Category name
 *         iconPicture:
 *           type: string
 *           description: Icon Picture URL
 *         isMenu:
 *           type: boolean
 *           description: Is menu?
 *         status:
 *           type: boolean
 *           description: Category status
 *       example:
 *         name: Electronics
 *         iconPicture: PICTURE_URL
 *         isMenu: false
 *         status: true
 */


/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Returns the list of all the categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */


 router.post('/', async (req, res)=>{
    try{
        const category = new Category(req.body)
        if(!category){
            res.send().status(404)
        }
        await category.save()
        res.send(category).status(201)
    }catch(e){
        res.send(e).status(500)
    }
})

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was successfully created
 *       500:
 *         description: Some server error
 */
router.get('/', async (req, res)=>{
    try{
        const categories = await Category.find({})
        res.send(categories)
    }catch(e){
        res.send(e).status(500)
    }
})

const upload = multer();

router.post('/:id', upload.single(), (req, res)=>{

})

module.exports = router
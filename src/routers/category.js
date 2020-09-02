const express = require('express')
const router = express.Router()

const Category = require('../models/category')
const multer = require('multer')

router.post('/api/v1/categories', async (req, res)=>{
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

router.get('/api/v1/categories', async (req, res)=>{
    try{
        const categories = await Category.find({})
        res.send(categories)
    }catch(e){
        res.send(e).status(500)
    }
})

const upload = multer();

router.post('/api/v1/categories/:id', upload.single(), (req, res)=>{

})

module.exports = router
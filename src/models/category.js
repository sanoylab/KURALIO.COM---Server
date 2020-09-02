const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    iconPicture: {
        type: String,
        default: ''
    },
    status:{
        type: Boolean, 
        default: true
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
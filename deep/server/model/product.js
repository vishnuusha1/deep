const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const pruductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
       required:true
    },
    category: {
        type: String,
        required:true
        
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
mongoose.model('Product', pruductSchema)
const express=require('express')
const router=require('express').Router()
const mongoose=require('mongoose')
const Product=mongoose.model('Product')
const authguard=require('../middleware/authguard')
const {productValidation}=require('../validator/validation')
var ObjectId = require('mongodb').ObjectID;


router.get('/product',authguard,(req,res)=>{
    const {name,category}=req.query
 
    Product.find({ category:new RegExp(category, 'i'),name:new RegExp(name, 'i')})
    .sort({createdAt: -1})
    .then(result=>{
        if(result.length==0){ res.status(200).json({message:'no result'}) }
        res.status(200).json({result:result})
    }).catch(err=>{
        console.log(err);
        
    })
})



router.post("/addproduct", authguard, async (req, res,next) => {    
    const {error}=await productValidation(req.body)
    if(error) return res.status(400).json({ error: error.details[0].message });
    const{name,price,quantity,category,createdAt}=req.body
    const product=new Product({
        name,price,quantity,category,createdAt
    })
  
    try {
      const newItem = await product.save();
      console.log(newItem);
      
      res.status(201).json(newItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
module.exports=router


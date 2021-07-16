const express=require('express')
const router=require('express').Router()
const mongoose=require('mongoose')
const User=mongoose.model('User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SCECRET}=require('../route/key')
const authguard=require('../middleware/authguard')
const {loginValidation}=require('../validator/validation')
const{registerValidation}=require('../validator/validation')
const{validPassword}=require('../validator/validation')
const{hashPassword}=require('../validator/helper')
const{checkEmail}=require('../validator/validation')
const dotenv=require('dotenv')
router.get('/protect',authguard,(req,res)=>{
    res.send('hlooo')
})

router.post("/signup", async (req, res) => {
    console.log(req.body, "hloo");
    const { error } = await registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const userexist = await checkEmail(req.body.email);
    if (userexist) return res.status(400).send(" email already exist");
  
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await hashPassword(req.body.password, salt);
  
    const user = new User();
    user["name"] = req.body.name;
    user["password"] = hashedpassword;
    user["email"] = req.body.email;
  
    try {
      const senduser = await user.save();
  
      return res.send({ senduser });
    } catch (err) {
      return res.status(502).json({ message: err });
    }
  });
    

    


  router.post("/login", async (req, res) => {
    console.log(req.body, "hloo");
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const user = await checkEmail(req.body.email);
  
    if (!user) return res.status(400).send("invalid email");
    const validpassword = await validPassword(req.body.password, user.password);
  
    if (!validpassword) return res.status(400).send("invalid password");
    try {
      const token = jwt.sign({ _id: user._id }, JWT_SCECRET);
      console.log(token);
      
      return res.header("auth-token", token).json({token:token})
    } catch (err) {
      return res.status(502).json({ message: 'invalid email or password' });
    }
  });
  
module.exports=router
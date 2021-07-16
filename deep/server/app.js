const express =require('express')
const app=express();
const port=5000;
const mongoose=require('mongoose')
const cors=require('cors')
var bodyParser = require('body-parser')
require('./model/user');
require('./model/product')

app.use(cors())
app.use(bodyParser.json());
app.use(require('./route/auth'))
app.use(require('./route/product'))


mongoose.connect("mongodb://localhost:27017/mydb",{useNewUrlParser:true, useUnifiedTopology: true},()=>{
console.log('connected db');

})
app.get('/',(req,res)=>{
 res.send('hello world')
})

app.listen(port,()=>{
    console.log('sever is running on ',port);
    
})
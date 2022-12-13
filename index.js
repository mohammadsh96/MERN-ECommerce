const express =require('express')
const app =express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT =process.env.PORT || 3000
const url = process.env.URL
const users =require('./src/models/users')
app.use(bodyParser.json())



const db = module.exports =()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     
}
try {
    mongoose.connect(url)
    console.log("database Connected successfully");
} catch (error) {
    console.log(error);
}
}

app.listen(PORT ,()=>{
    console.log('server is Running on port : '+PORT);
    db()
})

app.post('/users' , async (req,res)=>{
    const user =new users()
    const data =await users.findOne({username:req.body.username})
    if(data){
        res.send({message:'username is not avilable'})
    }else{

        user.username =req.body.username
        user.password =req.body.password
        user.role =req.body.role
        console.log(req.body)
    
        user.save((err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.status(200).send(data)
            }
        })
    }
})

app.get('/users' , async (req,res)=>{
    const user = await users.find()
    res.status(200).send(user)
    

 
})
app.delete('/users' , async (req,res)=>{
    const user = await users.deleteMany()
    res.status(200).send(user)
    

 
})
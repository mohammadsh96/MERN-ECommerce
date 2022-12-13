const mongoose =require('mongoose')
const UserModel =mongoose.Schema({

    username: {
        type: String,
        dropDups:true,
        required: true,
        trim :true,
        unique :true
    },
    password : {
        type : String,
        required: true,
        trim :true

    },
    role:{
        type:String,
        default :'user'
    }




})
const users= mongoose.model('users',UserModel)
module.exports = users
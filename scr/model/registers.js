const mongoose =require('mongoose');
const bcrypt = require("bcryptjs")

const student= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    addres:{
        type:String,
        required:true
    },
    addres2:{
        type:String,
        required:true
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zip:{
        type:String
    },
    conferm:{
        type:String
    }
})

student.pre("save",async function(next){
    if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,10)
    }
    next();
})
const Register=new mongoose.model("Register",student);
module.exports=Register;
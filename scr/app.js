const express =require('express');
const bcrypt = require("bcryptjs")


const path = require('path')
const app = express();
const hbs =require('hbs');
const {json} =require('express')
require("./db/cohn.js")
const Register =require('./model/registers');
const port=process.env.PORT||8000;
app.use(express.json())
app.use(express.urlencoded({extended:false}));

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const par_path=path.join(__dirname,"../templates/partials");
app.use(express.static(static_path))
app.set("view engin","hbs");
app.set("views",template_path)
hbs.registerPartials(par_path);


app.get('/',(req,res)=> {
    res.render('index.hbs')
})
app.get('/register',(req,res)=> {
    res.render('register.hbs')
})
app.get('/login',(req,res)=> {
    res.render('login.hbs')
})

app.post('/submit', async(req,res)=> {
    try{

        const studentin =new Register({
            email:req.body.email,
            password:req.body.password,
            addres:req.body.adress,
            addres2:req.body.adress2,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip,
            conferm:req.body.conferm
            

        })

        // conver password to hashing

        const result=await studentin.save();
        res.status(201).render('index.hbs');
        console.log(result)
      
    }catch(err){
        res.status(400).send(err);
    }
})

app.post('/login', async(req,res)=> {
    try{
       const Email= req.body.email;
       const Password=req.body.pass;



      const useremail=await Register.findOne({email:Email})
      console.log(useremail)
      const ismach= bcrypt.compare(Password,useremail.password);

      if (ismach){
          res.status(201).render('index.hbs')
      }else{
          res.send("password are not matching")
      }

    }catch(errr){
        res.status(400).sendFile('Invalid Email')
    }
})
app.listen(port,()=>{
    console.log(`appp run on ${port}`);

})

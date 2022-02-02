// Frameworks required
const express =require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Testing the API
app.get('/api',(req,res)=>{
    res.json({
        message:"API service is running"
    });
});

// Creating post and displaying the user details
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403) 
        }else{
            res.json({
                message:"post created",
                authData,
            });
        }
    });    
});

// Token generation
app.post('/api/login',(req,res)=>{
    const user = {
        id:1,
        firstName:'Gautami',
        lastName:'Mehta',
        age: 21,
        email: 'gautamimehta17@gmail.com'
    }

    jwt.sign({user:user},"secretkey",(err,token)=>{
        res.json({
            token,
        })
    })
})

// verification function using Authorization: Bearer<token>
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !=='undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403); //forbidden
    }
}

app.listen(3000,(req,res)=>{
    console.log('Server running at port 3000')
});
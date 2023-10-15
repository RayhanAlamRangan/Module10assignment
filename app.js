const express=require('express');
const router=require('./src/Routes/api');
const app= new express();

//SECURITY MIDDLEWARE LIB IMPORT

const limiter= require('express-rate-limit');
const Sanitize= require('express-mongo-sanitize');
const hpp=require('hpp');
const cors=require('cors');
const helmet=require('helmet');

//DATABASE LIB IMPORT


const mongoose=require('mongoose');


// SECURITY MIDDLEWARE IMPLEMENT

app.use(Sanitize());
app.use(cors());
app.use(helmet());
app.use(hpp());


app.use(express.json({  limit:'50mb'}));
app.use(express.urlencoded({limit:"50"}));


// REQUEST RATE LIMIT

const limite= limiter({windowsMs:50*60*1000,max:3000});
app.use(limite);

// DATABASE CONNECTION


let URI="mongodb+srv://taskmanager:taskmanager@cluster0.2n6gzph.mongodb.net/task?retryWrites=true&w=majority";
let  OPTION={user:"taskmanager",pass:"taskmanager",autoIndex:true}
mongoose.connect(URI,OPTION);




//ROUTING IMPLEMENT
app.use('/api/v1',router);

// UNDIFINED ROUTE

app.use("*", (req,res)=>{

    res.status(404).json({status:"Fail", data:"Not Found"});
});

module.exports=app;




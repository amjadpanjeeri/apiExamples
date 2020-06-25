const express=require('express');
const basic_api=express();

const bodyparser=require('body-parser');


const port=3000;

basic_api.use(bodyparser.urlencoded({extended:false}));

basic_api.use(bodyparser.json());

const users=require('./users');

basic_api.use('/api',users)

basic_api.listen(3000,()=>{
    console.log("API is running at 3000");
});
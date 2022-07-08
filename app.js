
const express= require('express')
const mongosse = require('mongoose')
const path = require('path')
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser= require('cookie-parser');
const session = require('express-session')
const adminRoutes=require('./routes/admin')
const productsrouter=require('./routes/products')
const homeRoute=require('./routes/home')
const authRoutes= require('./routes/auth')
const PORT = process.env.PORT || 3000;
const app=express()

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:"onlinestore"}))

require('./config/passport')(app)

app.set('views','views')
app.set('view engine', 'ejs');

app.use('/home', homeRoute)
app.use('/admin',adminRoutes)
app.use('/products',productsrouter)
app.use('/auth',authRoutes )
app.get('/',(req,res,next)=>{

    res.render('index')
   })

   

//app.listen(PORT)
mongosse.connect("mongodb://hadeerfawzy:1234@onlinestore-shard-00-00.4svyk.mongodb.net:27017,onlinestore-shard-00-01.4svyk.mongodb.net:27017,onlinestore-shard-00-02.4svyk.mongodb.net:27017/ONLINESTORE?ssl=true&replicaSet=atlas-lasclr-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(
    result=>{
        app.listen(PORT);
    })
.catch(
    error => { console.log(error) 
})

const express=require('express')
const { greenBright } = require('chalk');
const homeRoute=express.Router()

homeRoute.route('/').get((req,res)=>{
    
    res.render('index')
})

module.exports = homeRoute

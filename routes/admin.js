const express= require('express')
const { greenBright } = require('chalk');
const products=require('../data/products.json')
const adminRoutes=express.Router()
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

adminRoutes.route('/').get((req,res)=>{
  let url="mongodb://hadeerfawzy:1234@onlinestore-shard-00-00.4svyk.mongodb.net:27017,onlinestore-shard-00-01.4svyk.mongodb.net:27017,onlinestore-shard-00-02.4svyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-lasclr-shard-0&authSource=admin&retryWrites=true&w=majority" 
  const dbName='ONLINESTORE';
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);
    
      const response = await db.collection('products').insertMany(products);
      res.json(response);
   } catch (error) {
      debug(error.stack);
    }
    client.close();
  })(); 

});




module.exports= adminRoutes
const express= require('express')
const path = require('path')
const debug = require('debug')('app:productsrouter');
const { MongoClient , ObjectID } = require('mongodb');
const productsrouter =express.Router()

productsrouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/SignIn');
  }
});
productsrouter.route('/').get((req,res)=>{
 //res.render('products')
    // const url="mongodb://hadeerfawzy:1234@onlinestore-shard-00-00.wgest.mongodb.net:27017,onlinestore-shard-00-01.wgest.mongodb.net:27017,onlinestore-shard-00-02.wgest.mongodb.net:27017/?ssl=true&replicaSet=atlas-i5c8on-shard-0&authSource=admin&retryWrites=true&w=majority";
    // const dbname='onlinestore';
 let url="mongodb://hadeerfawzy:1234@onlinestore-shard-00-00.4svyk.mongodb.net:27017,onlinestore-shard-00-01.4svyk.mongodb.net:27017,onlinestore-shard-00-02.4svyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-lasclr-shard-0&authSource=admin&retryWrites=true&w=majority" 
const dbname='ONLINESTORE';
(async function mongo() {
  let client;
  try {
    client = await MongoClient.connect(url);
    debug('Connected to the mongo DB');

    const db = client.db(dbname);
  
   const products = await db.collection('products').find().toArray();
   
    res.render('products',{products});
} catch (error) {
    debug(error.stack);
  }
  client.close();
})();
})

productsrouter.route('/:id').get((req,res)=>{
  const id = req.params.id;
  let url="mongodb://hadeerfawzy:1234@onlinestore-shard-00-00.4svyk.mongodb.net:27017,onlinestore-shard-00-01.4svyk.mongodb.net:27017,onlinestore-shard-00-02.4svyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-lasclr-shard-0&authSource=admin&retryWrites=true&w=majority" 
const dbname='ONLINESTORE';

(async function mongo() {
let client;
try {
  client = await MongoClient.connect(url);
  debug('Connected to the mongo DB');

  const db = client.db(dbname);

  const product = await db
        .collection('products')
        .findOne({ _id:new ObjectID(id) });

  res.render('product', {product});
} catch (error) {
  debug(error.stack);
}
client.close();
})();
})


module.exports=productsrouter
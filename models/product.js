const mongosse = require('mongoose');

const Schema = mongosse.Schema;

const productSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
});

module.exports=mongosse.model('Product',productSchema);


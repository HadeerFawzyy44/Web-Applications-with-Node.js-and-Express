const mongosse = require('mongoose');

const Schema = mongosse.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


module.exports=mongosse.model('User',userSchema);

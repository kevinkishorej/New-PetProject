var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    profilename:{type:String,required:true},
    password:{type:String,required:true},
    userimage :{type:String},
    location:{type:String},
    productinfo:[
        {type:Schema.Types.ObjectId,
         ref:'TN_Product'}
    ],
    
});

module.exports =  mongoose.model('TN_User', UserSchema)
 
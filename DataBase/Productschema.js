var mongoose = require('mongoose');
var PSchema = mongoose.Schema;

var ProductSchema = new PSchema({
    title:{type:String},
    description:{type:String},
    breed:{type:String},
    petage:{type:String},
    image1:[{type:String}],
    location:{type:String},
    address:{type:String},
    phonenumber:{type:Number},
    negotiable:{type:String},
    price:{type:Number},
    date:{type:String}
    
    
});

module.exports =  mongoose.model('TN_Product', ProductSchema)
 
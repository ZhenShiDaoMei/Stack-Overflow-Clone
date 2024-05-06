// Tag Document Schema
const mongoose = require("mongoose")


const tagSchema = mongoose.Schema({
   name :  { type :  String , required : true},
   url : String,
    
})



module.exports = mongoose.model("Tag" ,tagSchema)
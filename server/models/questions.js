// Question Document Schema
const mongoose = require("mongoose")



const questionsSchema = mongoose.Schema({
    title : { type :  String , required : true},
    text :  { type :  String , required : true},
    tags : [{type : mongoose.Types.ObjectId , ref : "Tag"}],
    answers : [{type : mongoose.Types.ObjectId , ref : "Answer"}],
    asked_by : { type :  String , required : true},
    asked_at : {type : Date , default : Date.now()},
    views : { type : Number , default : 0},
    url : String

})


module.exports = mongoose.model("Question" ,questionsSchema)
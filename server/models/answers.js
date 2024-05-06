// Answer Document Schema
const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
    text :  { type :  String , required : true},
    ans_by : String,
    ans_date :  {type : Date , default : Date.now()},
    url : String
    
})

module.exports = mongoose.model("Answer" ,answerSchema)
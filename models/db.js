const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
    username :{type : String, required : true, unique : true},
    email:{type : String, required : true, unique : true},
    password:{type : String, required : true},
    createdAt:{type : Date, default : Date.now},
    likedPolls:[{type : Schema.Types.ObjectId, ref : "Poll"}],
});

const pollSchema = new Schema({
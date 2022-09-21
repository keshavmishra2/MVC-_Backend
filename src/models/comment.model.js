const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    reply : {type : String, required : true},
    post_id : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "post",
        required : true,
    }
},{
    versionKey : false,
    timestamps : true, 
})

module.exports= mongoose.model("comment", CommentSchema); //Comment => comments
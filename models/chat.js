const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
from:{
    type:String,
    require:true,
},

to:{
    type:String,
},

msg:{
    type:String,
    maxlength:50,
},

created_at:{
type:Date,
required:true,
}

});


const chat=mongoose.model("chat",chatSchema);
module.exports=chat;
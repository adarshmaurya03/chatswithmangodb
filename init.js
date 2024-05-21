const mongoose=require("mongoose");
const Chat=require("./models/chat.js");
main()
.then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whtasapp');
};

 let chats=[
  {
    from:"Anand",
    to:"Anjali",
    msg:"How are you ?",
    created_at:new Date()
},
{
    from:"Adarsh",
    to:"Arun",
    msg:"what are you doing?",
    created_at:new Date()
},
{
    from:"Adarsh",
    to:"Aditya",
    msg:"where are you going ?",
    created_at:new Date()
},
{
    from:"Anand",
    to:"Atul",
    msg:"something is wrong . ",
    created_at:new Date()
}
]
Chat.insertMany(chats);
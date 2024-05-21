
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodover=require("method-override")



// Setting up the views directory and the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files (if any)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodover("_method"));
// Mongoose connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whtasapp');
}

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));

// Route to render EJS template
app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        console.log(chats);
        res.render("index", { chats }); // Assuming you want to pass the chats data to the template
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving chats");
    }
});

// Route to render new chat form
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Route to create a new chat
app.post("/chats", async (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    });
    try {
        await newChat.save();
        console.log("Data is saved");
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving chat");
    }
});

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
// res.send("edit is working");
res.render("edit.ejs",{chat});
});

//update route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedchat= await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    console.log(updatedchat);
    res.redirect("/chats");
});
//delete route
app.delete("/chats/:id",async (req,res)=>{
    
    let {id}=req.params;
     let deletechat=await Chat.findByIdAndDelete(id);
     console.log(deletechat);
     res.redirect("/chats");
})

// Root route
app.get("/", (req, res) => {
    res.send("Root is working");
});

// Starting the server
app.listen(8080, () => {
    console.log("Listening on port 8080");
});

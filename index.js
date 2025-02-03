require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT;


const Socket = require("socket.io");
const http = require("http");
const { Console } = require("console");

const Server = http.createServer(app);
 
const io = Socket(Server);


io.on("connection",(Sockets)=>{
    console.log("Server is Connected to the Client = "+ Sockets.id);
    Sockets.on("Send-message-to-server",(dataMsg)=>{
        console.log("Msg Accepted");
        console.log(dataMsg);
        io.emit("Give-to-all-client",(dataMsg));
    })
    
})


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


Server.listen(port,()=>{
    console.log("Server is working");
})

app.get("/",(req,res)=>{
    res.render("home");
})
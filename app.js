import { watch } from "fs";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
var PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var tables = [];
var waitList = [];

function Reservation (name, phone, email,id){
    this.name= name,
    this.phone= phone,
    this.email= email,
    this.id= id
};



function newRes(name, phone, email,id) {
    if (tables.length > 5) {
       waitList.push(new Reservation(name, phone, email,id))
    } else {
    tables.push(new Reservation(name, phone, email,id))
    }
};





app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/", (req,res) => {
    //must send something best to browser
    //path.join grabs the full cannonical path of the location ofs the file, then _dirnam grabs the directory name. 
    let newRes = req.body.newUser;
    newRes(newRes.name, newRes.phone,newRes.email, newRes.id );
    res.send("data recieved!")
    
});


app.get("/tables", (req,res) => {
    res.sendFile(path.join(__dirname, "results.html"));
});

app.get("/api/tables", (req,res) => {
    var tableData = [tables,waitList];
    res.send(tableData);
});




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
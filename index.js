// Creating local server
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app= express();
const port= 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Creating GET request to response homepage
app.get("/", (req, res)=>{
    res.render("index.ejs", { content: "Input IFSC code to get details."});
});

//Creating POST request to enter IFSC code and render details.
app.post("/submit", async(req, res)=> {
    const code= req.body.code;
    try{
        const response= await axios.get("https://ifsc.razorpay.com/" + code);
        res.render("index.ejs", {
            detail: response.data,      
        });
    } catch(error){
        console.log(error.message);
        res.render("index.ejs", { err: "Sorry! No details found."});
    }
});

//Listening on port.
app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
});

//for running on local server with backend search "localhost:3000/" in browser
//& run "nodemon index.js" in terminal
// input IFSC (Indian Financial System Code) code of any Indian Bank to get details.


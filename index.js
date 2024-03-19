const express = require("express");
const app = express();
const PORT = 3001;

app.get("/",(req,res)=>{
    res.send("different stuff")
})

app.listen(PORT,()=>{
    console.log(`listening to the smooth sounds of port ${PORT}`)
})
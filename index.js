const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get("/api/pets",(req,res)=>{
    console.log(req.method,req.url)
    fs.readFile("./db/pets.json","utf-8",(err,data)=>{
        if(err){
            throw err
        } 
        const pets = JSON.parse(data);
        res.json(pets);
    })
})

app.post("/api/pets",(req,res)=>{
    console.log(req.method,req.url)
    const pet = req.body;
    if(!pet.name || !pet.species){
        return res.status(400).json({msg:"hey, i need a name and species"})
    }
    pet.id = crypto.randomUUID();
    fs.readFile("./db/pets.json","utf-8",(err,data)=>{
        if(err){
            throw err
        } else {
            const petsArr = JSON.parse(data);
            petsArr.push(pet)
            fs.writeFile("./db/pets.json",JSON.stringify(petsArr,null,4),(err)=>{
                console.log("yay!")
                res.send("post request recieved")
            })
        }
    })
})

app.get("/api/pets/:petId",(req,res)=>{
    console.log(req.params);
    fs.readFile("./db/pets.json","utf-8",(err,data)=>{
        if(err){
            throw err
        } 
        const pets = JSON.parse(data);
        for (let i = 0; i < pets.length; i++) {
        if(pets[i].id==req.params.petId){
                return res.json(pets[i])
        } 
        }
        res.status(404).json({msg:"no such pet!"})
    })
})



app.listen(PORT,()=>{
    console.log(`listening to the smooth sounds of port ${PORT}`)
})



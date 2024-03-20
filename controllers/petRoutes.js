const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get("/",(req,res)=>{
    console.log(req.method,req.url)
    fs.readFile("./db/pets.json","utf-8",(err,data)=>{
        if(err){
            throw err
        } 
        const pets = JSON.parse(data);
        res.json(pets);
    })
})

router.post("/",(req,res)=>{
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

router.get("/:petId",(req,res)=>{
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

module.exports = router;
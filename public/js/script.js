fetch("/api/pets").then(res=>res.json()).then(petData=>{
    console.log(petData)
    const petsUl = document.querySelector("#pets");
    petData.forEach(pet=>{
        const petLi = document.createElement("li");
        petLi.textContent = `id: ${pet.id}.  Hi I am a ${pet.species} named ${pet.name}`;
        petsUl.append(petLi)
    })
}).catch(err=>{
    console.log("womp womp")
    console.log(err);
})
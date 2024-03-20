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

document.querySelector("#new-pet-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const petObj = {
        name: document.querySelector("#new-pet-name").value,
        species: document.querySelector("#new-pet-species").value,
    }
    console.log(petObj)
    fetch("/api/pets",{
        method:"POST",
        body:JSON.stringify(petObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})
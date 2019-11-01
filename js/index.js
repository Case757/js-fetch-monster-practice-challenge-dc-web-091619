
document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1
    let forwardButton = document.querySelector("#forward")
    let backButton = document.querySelector("#back")
    forwardButton.addEventListener("click", function() {
        currentPage += 1
        document.getElementById('monster-container').innerHTML = "";
        fetchMonsters(currentPage)
    })
    backButton.addEventListener("click", function() {
        currentPage -= 1
        document.getElementById('monster-container').innerHTML = "";
        fetchMonsters(currentPage)
    })


    fetchMonsters(currentPage)
    getForm().addEventListener("submit", submitHandler)
})

function fetchMonsters(currentPage) {
   
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`) 
        .then( response => response.json() )
        .then( monsterArray => {
            monsterArray.forEach(monster => renderMonster(monster))
        })
}

function getForm() {
    return document.querySelector("#monster-form")
}

function submitHandler(event) {
    event.preventDefault()
    let new_name = document.querySelector("#name")
    let new_age = document.querySelector("#age")
    let new_bio = document.querySelector("#description")
    let data = {name: new_name, age: new_age, description: new_bio}
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        } 
    })
    .then(res => res.json())
    .then(monster => renderMonster(monster))
    getForm().reset()
}

function renderMonster(monster) {
    let monsterCard = document.createElement('div')
    let header = document.createElement("h2")
    monsterCard.append(header)
    header.innerText = monster.name
    monsterAge = document.createElement("h4")
    monsterCard.append(monsterAge)
    monsterAge.innerText = `Age: ${monster.age}`
    monsterBio = document.createElement("p")
    monsterCard.append(monsterBio)
    monsterBio.innerText = `Bio: ${monster.description}`
    document.getElementById('monster-container').append(monsterCard)
}



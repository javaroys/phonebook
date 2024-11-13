const express = require("express")
const morgan = require("morgan")
const cors = require("cors")


let numbers = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
    }
]

const app = express()
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

morgan.token("body", (request, response) => JSON.stringify(request.body))
app.use(cors())
app.use(express.static("dist"))

app.get("/api/persons", (request, response) => {
    response.json(numbers)

})

app.get("/api/persons/:id", (request, response) => {
    const person = numbers.find(p => p.id == request.params.id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
    

})

app.delete("/api/persons/:id", (request, response) => {
    const person = numbers.find(p => p.id == request.params.id)
    if (person) {
        numbers = numbers.filter(p => p.id != request.params.id)
        response.status(204).end()
    }
    else {
        response.status(404).end()
    }
    

})

app.post("/api/persons", (request, response) => {
    const newPerson ={
        id: Math.round(Math.random()*1000000) +"",
        name: request.body.name,
        number: request.body.number
    }
    if(!newPerson.name || !newPerson.number ) {
        return response.status(400).json({error:"Name or number cannot be empty."})
    }

    if (numbers.find(p => p.name == newPerson.name )) {
        return response.status(400).json({error:"Name must be unique."})
    }
    
    numbers.push(newPerson)
    response.json(newPerson)

})

app.get("/info/", (request, response) => {
    response.send(`<div>Phonebook has info for ${numbers.length} people</div><div> ${new Date().toString()} </div>`)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log("server running on PORT " + PORT)
})
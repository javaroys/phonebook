require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => JSON.stringify(request.body))

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      console.log(persons)
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))


})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deleted => {
      if (deleted) {

        response.status(204).end()
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))


})

app.post('/api/persons', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: 'Name or number cannot be empty.' })
  }

  /*    if (Person.find({name:request.body.name})) {
                                  return response.status(400).json({error:"Name must be unique."})
                              }
                            */

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  })

  person.save().then(newPerson => {
    response.json(newPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: 'Name or number cannot be empty.' })
  }

  const data = {
    name: request.body.name,
    number: request.body.number,
  }

  Person.findByIdAndUpdate(request.params.id, data, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.get('/info/', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.send(`<div>Phonebook has info for ${persons.length} people</div><div> ${new Date().toString()} </div>`)
    })

    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('server running on PORT ' + PORT)
})
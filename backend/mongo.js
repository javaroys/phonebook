const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://javaroys:${password}@fullstackopen.16d3d.mongodb.net/?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,

})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  if (!process.argv[3] || !process.argv[4]) {
    console.log('please give valid name/number')
    process.exit(1)
  }

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`Added ${process.argv[3]} number ${process.argv[4]}`)
    mongoose.connection.close()
  })
}
else if (process.argv.length == 3) {
  Person.find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach (p => {
        console.log(p.nimi, p.number)
      })
      mongoose.connection.close()
    })
}
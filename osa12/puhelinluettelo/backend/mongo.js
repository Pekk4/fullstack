const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const MONGO_URL = process.env.MONGO_URL || undefined

mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URL)

const recordSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Record = mongoose.model('Record', recordSchema)

if (process.argv.length > 3) {
  const record = new Record({
    name: process.argv[3],
    number: process.argv[4],
  })

  record.save().then(result => {
    console.log(`New record saved: ${result}`)
    mongoose.connection.close()
  })
} else {
  Record.find({}).then(result => {
    console.log('Phonebook\'s records:\n')
    result.forEach(record => {
      console.log(`${record.name} ${record.number}`)
    })
    mongoose.connection.close()
  })
}

const mongoose = require('mongoose')

const URI = process.env.MONGO_URI
const db = mongoose.connection

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db.once('open', _ => console.log('db connect in', URI))
db.on('error', err => console.log('ALERTA', err))
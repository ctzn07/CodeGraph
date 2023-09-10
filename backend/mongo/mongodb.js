const mongoose = require('mongoose')
//set strictquery to suppress errors
mongoose.set('strictQuery', true)
mongoose.set('debug', false)
const connectMongoDB = (url) => {
	return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

//report db connection status
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => console.log('Database connected'))

module.exports = connectMongoDB
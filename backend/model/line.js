const mongoose = require('mongoose')
//mongoose.set('runValidators', true)
const { Schema } = mongoose

//schema
const lineSchema = new mongoose.Schema({
	module: { type: Schema.Types.ObjectId, ref: 'Module'},
	start: {type: Object},
	end: {type: Object},
})

//export new mongoose model(name, schema, collection)

module.exports = mongoose.model('Line', lineSchema, 'lines')
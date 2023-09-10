const mongoose = require('mongoose')
//mongoose.set('runValidators', true)
const { Schema } = mongoose

//schema
const functionSchema = new mongoose.Schema({
	name: { type: String },
	loc: { type: Object },
	module: { type: Schema.Types.ObjectId, ref: 'Module'},
	content: { type: String }
})

//export new mongoose model(name, schema, collection)

module.exports = mongoose.model('Function', functionSchema, 'functions')
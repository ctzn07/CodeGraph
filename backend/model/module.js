const mongoose = require('mongoose')
//mongoose.set('runValidators', true)
const { Schema } = mongoose

//schema
const moduleSchema = new mongoose.Schema({
	name: { type: String, required: false },
	project: { type: Schema.Types.ObjectId, ref: 'Project'},
	functions: [{ type: Schema.Types.ObjectId, ref: 'Function'}],
	variables: [{ type: String }]
		
})

//export new mongoose model(name, schema, collection)

module.exports = mongoose.model('Module', moduleSchema, 'modules')
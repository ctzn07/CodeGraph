const mongoose = require('mongoose')
//mongoose.set('runValidators', true)
const { Schema } = mongoose

//schema
const projectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	modules: [{ type: Schema.Types.ObjectId, ref: 'Module'}]
})

//export new mongoose model(name, schema, collection)

module.exports = mongoose.model('Project', projectSchema, 'projects')
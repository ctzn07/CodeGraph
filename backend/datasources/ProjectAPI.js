require('dotenv').config()
const { MONGO } = process.env
const connectMongoDB = require('../mongo/mongodb')
const Project = require('../model/project')
const Module = require('../model/module')
const Function = require('../model/function')
const Line = require('../model/line')
connectMongoDB(MONGO)

//note, byId methods require args.id to be in format args._id
//apparently this ensures the required ObjectId format and is not tied to variable name itself

class ProjectAPI  {
  constructor() {}
  //initialize(config) {}
  //QUERY------------------------

  async project(args) {
    console.log('query: project', args)
	  const project = await Project.find(args).catch((err) => console.log(err.message))
    //return search result
    return project
  }

  async module(args) {
    console.log('query: module', args)
	  const mod = await Module.find({ project: args.project_id }).catch((err) => console.log(err.message))
    //return search result
    return mod
  }

  async function(args) {
    console.log('query: function', args)
	  const func = await Function.find({ module: args.module_id }).catch((err) => console.log(err.message))
    //return search result
    return func
  }
  async line(args) {
    console.log('query: line', args)
	  const line = await Line.find({ module: args.module_id }).catch((err) => console.log(err.message))
    //return search result
    return line
  }

//QUERY------------------------

//MUTATION---------------------

  async saveproject(args) {
    //no document ID provided, saving new
    if(!args.id){
      console.log('mutation: saveproject(new)', args)
      const newProject = new Project({
        title: args.title,
        modules: []
      })
      //save to db
      await newProject.save().catch((err) => console.log(err.message))
      return newProject
    }
    else{
      console.log('mutation: saveproject(update)', args)
      //document ID provided, updating existing document
      const updateproject = await Project.findByIdAndUpdate(args._id, args).catch((err) => console.log(err.message))
      //findByIdAndUpdate doesn't return the document, fetching new copy for UI to update from
      const project = await Project.findById(args._id)

      return project
    }
  }

  async removeproject(args) {
    console.log('mutation: removeProject', args)
    //delete project
    const deleteProject = await Project.findByIdAndDelete(args._id).catch((err) => console.log(err.message))
    if(deleteProject._id){
      //if project deletion succeeded, delete the modules included in the project
      await Module.deleteMany({_id: {$in: deleteProject.modules}}).catch((err) => console.log(err.message))
    }
    //sadly this does not delete the functions involved in that module
    //can't find a reasonable way to do nested deletion:
    //google only suggest using $pull which only clears the array, 
    //but does not delete the documents referenced in the array
    return deleteProject
  }

  async savemodule(args) {
    if(!args.id){
      //no id provided, save as new
      console.log('mutation: savemodule(new)', args)
      const newModule = new Module({
        name: args.name,
        project: args.project_id,
        functions: [],
        variables: []
      })

      //save to db
      await newModule.save().catch((err) => console.log(err.message))
      //if save was success, push new module to current projects module array
      if(newModule._id){
        await Project.findByIdAndUpdate(args.project_id, {$push: { modules: newModule._id }}).catch((err) => console.log(err.message))
      }
      return newModule
    }
	  else{
      console.log('mutation: savemodule(update)', args)
      //id provided, updating existing document
      const updatemodule = await Module.findByIdAndUpdate(args._id, args).catch((err) => console.log(err.message))
      //findByIdAndUpdate doesn't return the document, fetching new copy for UI to update from
      const mod = await Module.findById(args.id)

      return mod
    }
  }

  async removemodule(args) {
    console.log('mutation: removemodule', args)
    const deleteModule = await Module.findByIdAndDelete(args._id).catch((err) => console.log(err.message))
    if(deleteModule._id){
      //remove all the functions involved with the module
      await Function.deleteMany({_id: {$in: deleteModule.functions}}).catch((err) => console.log(err.message))
      //remove the module from it's parent project modules array
      await Project.findByIdAndUpdate(deleteModule.project, {$pull: { modules: deleteModule._id }}).catch((err) => console.log(err.message))
    }
    
    return deleteModule
  }

  async savefunction(args) {
    if(!args.id){
      //no id provided, save as new
      console.log('mutation: savefunction(new)', args)
      const newFunc = new Function({
        name: args.name,
        loc: args.loc,
        module: args.module,
        content: args.content
      })

      //save to db
      await newFunc.save().catch((err) => console.log(err.message))
      //if save was success, push new module to current projects module array
      if(newFunc._id){
        await Module.findByIdAndUpdate(args.module_id, {$push: { functions: newFunc._id }}).catch((err) => console.log(err.message))
      }
      return newFunc
    }
	  else{
      console.log('mutation: savefunction(update)', args)
      //id provided, updating existing document
      const updatefunc = await Function.findByIdAndUpdate(args._id, args).catch((err) => console.log(err.message))
      //findByIdAndUpdate doesn't return the document, fetching new copy for UI to update from
      const func = await Function.findById(args.id)

      return func
    }
  }

  async removefunction(args) {
  console.log('mutation: removefunction', args)
  const deleteFunc = await Function.findByIdAndDelete(args._id).catch((err) => console.log(err.message))
  return deleteFunc
  }

  async addline(args) {

      //no id provided, save as new
      console.log('mutation: addline(new)', args)
      const newLine = new Line({
        module: args.module,
        start: args.start,
        end: args.end
      })
      await newLine.save().catch((err) => console.log(err.message))
      return newLine
    }

    async removeline(args) {
      console.log('mutation: removeline', args)
      const deleteLine = Line.findByIdAndDelete(args._id).catch((err) => console.log(err.message))
      return deleteLine
    }
}

//MUTATION---------------------

module.exports = ProjectAPI

import axios from 'axios'
//note: for some reason, Axios really really wants endpoint as string, 
//function return or variable will not do

//get all projects
async function getAllProjects(){
    console.log('Backend: getAllProjects')
    const variables = {}
    const query = {
        'query': `query Query($id: ID) {
          project(_id: $id) {
            id
            title
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//get single project by id
async function getProject(id){
    console.log('Backend: getProject', id)
    const variables = { 'id': id }
    const query = {
        'query': `query Query($id: ID) {
          project(_id: $id) {
            id
            title
            modules
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//create new project
async function createProject(title){
    console.log('Backend: createProject', title)
    const variables = { 'title': title }
    const query = {
        'query': `mutation Mutation($title: String) {
          saveproject(title: $title) {
            id
            title
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//remove project
async function removeProject(id){
    console.log('Backend: removeProject', id)
    const variables = { 'id': id }
    const query = {
        'query': `mutation Mutation($id: ID!) {
          removeproject(_id: $id) {
            id
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//save project
async function saveProject(project){
    console.log('Backend: saveProject', project)
    const variables = { ...project }
    const query = {
        'query': `mutation Mutation($id: ID!, $title: String, $modules: [ModuleInput]) {
          saveProject(_id: $id, title: $title, modules: $modules) {
            id
            title
            modules {
              name
              functions {
                name
                loc { x y }
                content
                inputs { name }
                outputs { name }
              }
              variables {
                name
                loc { x y }
              }
            }
          }
        }`,
        'variables': variables  
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//get all modules
async function getModules(project_id){
  console.log('Backend: getModules', project_id)
    const variables = { 'projectId': project_id }
    const query = {
        'query': `query Query($projectId: ID) {
          module(project_id: $projectId) {
            id
            name
            project
            functions
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//get single module
async function getModule(project_id, module_id){
  console.log('Backend: getModules', project_id, module_id)
    const variables = { 'projectId': project_id, "moduleId": module_id }
    const query = {
        'query': `query Query($projectId: ID, $moduleId: ID) {
          module(project_id: $projectId, module_id: $moduleId) {
            id
            name
            functions
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//save module
async function newModule(project_id, name){
  console.log('Backend: newModule',project_id, name)
    const variables = { 'projectId': project_id, 'name': name }
    const query = {
        'query': `mutation Mutation($projectId: ID!, $name: String!) {
          newmodule(project_id: $projectId, name: $name) {
            id
            name
            project
            functions
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//remove module
async function removeModule(id){
  console.log('Backend: newModule', id)
    const variables = { 'id': id }
    const query = {
        'query': `mutation Mutation($id: ID) {
          removemodule(_id: $id) {
            id
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//save function
async function newFunction(module, name, loc, content){
  console.log('Backend: newFunction', module, name, loc, content)
    const variables = {
      "module": module,
      "name": name,
      "loc": loc,
      "content": content
    }
    const query = {
        'query': `mutation Mutation($module: ID!, $name: String!, $loc: VectorInput!, $content: String) {
          newfunction(module: $module, name: $name, loc: $loc, content: $content) {
            id
            name
            module
            loc { y x }
            content
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//remove function
async function removeFunction(id){
  console.log('Backend: removeFunction', id)
    const variables = { 'id': id }
    const query = {
        'query': `mutation Mutation($id: ID) {
          removefunction(_id: $id) {
            id
            module
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//get functions
async function getFunctions(module){
  console.log('Backend: getFunctions', module)
    const variables = { 'moduleId': module }
    const query = {
        'query': `query Query($moduleId: ID) {
          function(module_id: $moduleId) {
            id
            name
            module
            loc { x y }
            content
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//get lines
async function getLines(module){
  console.log('Backend: getLines', module)
    const variables = { 'moduleId': module }
    const query = {
        'query': `query Query($moduleId: ID) {
          line(module_id: $moduleId) {
            id
            module
            start { x y }
            end { x y }
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//save line
async function newLine(module, start, end){
  console.log('Backend: newLine',)
    const variables = {
      "module": module,
      "start": start,
      "end": end
    }
    const query = {
        'query': `mutation Mutation($module: ID!, $start: VectorInput!, $end: VectorInput!) {
          addline(module: $module, start: $start, end: $end) {
            id
            module
            start { x y }
            end { x y }
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

//remove line
async function removeLine(id){
  console.log('Backend: removeLine', id)
    const variables = { 'id': id }
    const query = {
        'query': `mutation Mutation($id: ID!) {
          removeline(_id: $id) {
            id
          }
        }`,
        'variables': variables
    }
    const data = axios.post('http://localhost:4000', query).catch((err) => console.log(err))
    return await data
}

export { getAllProjects, getProject, createProject, 
        removeProject, saveProject, getModule, 
        getModules, newModule, removeModule, newFunction, 
        removeFunction, getFunctions, getLines, newLine, removeLine }
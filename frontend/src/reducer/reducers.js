
const projectReducer = (state = {project: {}}, action) => {
    //console.log(action.type, action.payload)
       switch (action.type) {

        case 'PROJECT_LIST':
            return {...state, ...action.payload.data}

        case 'LOAD_PROJECT':
            return {...state, ...action.payload.data}

        case 'CREATE_PROJECT':     
            const updatedProjectList = state.project.concat(action.payload.data.saveproject)
            return {...state, project:updatedProjectList}

        case 'REMOVE_PROJECT':
            const filteredProjects = state.project.filter(
                (project) => project.id !== action.payload.data.removeproject.id
            )
            return {...state, project: filteredProjects}

        case 'SAVE_PROJECT':
            return {...state}
        

        default: 
            return {...state}
        
    }
}

const moduleReducer = (state = {module:{}}, action) => {
       switch (action.type) {

        case 'MODULE_LIST':
            return {...state, ...action.payload.data}

        case 'ADD_MODULE':
            const newModuleList = state.module.concat(action.payload.data.newmodule)
            return {...state, module: newModuleList}

        case 'REMOVE_MODULE':
        const filteredModules = state.module.filter(
            (mod) => mod.id !== action.payload.data.removemodule.id
        )
        return {...state, module: filteredModules}

        default: 
            return {...state}
        
    }
}

const functionReducer = (state = {function:{}}, action) => {
    switch (action.type) {

     case 'FUNCTION_LIST':
         return {...state, ...action.payload.data}

     case 'ADD_FUNCTION':
         const newFunctionList = state.function.concat(action.payload.data.newfunction)
         return {...state, function: newFunctionList}

     case 'REMOVE_FUNCTION':
     const filteredFunctions = state.function.filter(
         (mod) => mod.id !== action.payload.data.removefunction.id
     )
     return {...state, function: filteredFunctions}

     default: 
         return {...state}
     
 }
}
const lineReducer = (state = {line:{}}, action) => {
    switch (action.type) {

     case 'LINE_LIST':
         return {...state, ...action.payload.data}

     case 'ADD_LINE':
         const newLineList = state.line.concat(action.payload.data.addline)
         console.log(newLineList)
         return {...state, line: newLineList}

     case 'REMOVE_LINE':
     const filteredLines = state.line.filter(
         (line) => line.id !== action.payload.data.removeline.id
     )
     console.log('filtered:', filteredLines)
     return {...state, line: filteredLines}

     default: 
         return {...state}
     
 }
}
export { projectReducer, moduleReducer, functionReducer, lineReducer }
import { useDispatch, useSelector } from 'react-redux'
import { React, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FunctionNode, LineNode } from './nodes'
import { newFunction, newLine } from '../backend'

//menu snapping interval -> snapToGrid()
const gridSize = 32

//todo: deleting module redirects to project root

//helper variables for stuff that shouldn't trigger rendering
let f_name = ''
let f_content = ''
let mouseloc = {x: 0, y: 0}
let mouselocEnd = {x: 0, y: 0}
let funcloc = {x: 0, y: 0}

function Module() {
  //extract project information from the browser route, [0]=project ID // [1]=loaded module ID
  const path = useLocation().pathname.slice(1).split('/')

  //selector for module data
  const functions = useSelector(state => state.function.function)
  const lines = useSelector(state => state.line.line)
  //yet another dumb syntax...

  //declare dispatcher
  const dispatch = useDispatch()

  //this holds the right click menu content
  const [mousemenu, SetMouseMenu] = useState(<></>) 

  //prevent default right click menu
  document.addEventListener('contextmenu', (e) => {e.preventDefault()})

  //return tutorial message when no module is loaded(also doubles as error check)
  if(!path[1])return <div className='window' style={{position: 'absolute' ,top: '85px', left: '180px'}} >Start by selecting or adding a Module ^ </div>
  
  //helper function to snap new UI elements into background grid
  function snapToGrid(input){
    const coords = {x: Math.floor(input.x/gridSize)*gridSize,y: Math.floor(input.y/gridSize)*gridSize}
    return coords
  }
  
  //creating new function node request backend
  const newFuncCall = () => {
    //newFunction(module_id, name, loc, content)
    if(f_name.length)newFunction(path[1], f_name, funcloc, f_content).then((response => dispatch({ type: 'ADD_FUNCTION', payload: response.data})))
    //clear menu element, reset variables 
    SetMouseMenu(<></>)
    f_name = ''
    f_content = ''
  }

  //menu for creating new function node
  const wb_NewFunc = () => {
    SetMouseMenu(
      <div className='window'>
          <p>New Node:</p>
          <div>
                  <input className='menuform' type='text' placeholder='Node Name' onChange={(e) => f_name = e.target.value} />
                  <br></br>
                  <input className='menuform' type='textarea' placeholder='Node Description' onChange={(e) => f_content = e.target.value} />
                  <input className='menuform' type='button' value={'OK'} onClick={(e) => newFuncCall()} />
          </div>
      </div>)
  }

  //creating new line node request to backend
  const wb_NewLine = () => {
    //newLine(module, start, end)
    //prevent from making new line with same start & end location
    if(!(mouseloc.x === mouselocEnd.x && mouseloc.y === mouselocEnd.y)){
      newLine(path[1], mouseloc, mouselocEnd).then((response => dispatch({ type: 'ADD_LINE', payload: response.data})))
    }
  }

  //right click mouse menu
  const RightClickMenu = (props) => {
    return (<div className='node' style={{top: props.location.y, left: props.location.x}} >{props.content}</div>)
  }
  //layout for right-click menu
  const WorkBenchMenu = 
  (<div style={{ width: '175px' }} >
    <button className='menuform' onClick={(e) => wb_NewFunc()}>{'//Create New Node'}</button>
  </div>)

  //handling mouse click events
  function mouseEvent(event){

    switch(event.button){
      case 0:
        //logic for left click events
        switch(event.target.className){
          case 'workbench':
            SetMouseMenu(<></>)
            break
          case 'tab-button':
          case 'menuform':
          case 'line':
            //can return true or false depending is default behavior desired
            return true
          default:
            //no known element was found, remove menu
            SetMouseMenu(<></>)
            return true
        }
        break
      case 2:
        //logic for right click events
        switch(event.target.className){
          case 'workbench':
            funcloc = mouseloc
            SetMouseMenu(<RightClickMenu location={mouseloc} title={'Menu //'} content={WorkBenchMenu} />)
            break
          
          default:
            //no known element was found, remove menu
            SetMouseMenu(<></>)
            break
        }
        
        break
      default:
        break
    }
  }

  //generate elements for the page
  function Workbench() {
    if(!functions)return <div>Error loading module...</div>
    //generate functions from this module
    const FunctionList = (functions && functions.length) ? 
      (functions.map((func) => <FunctionNode key={func.id} id={func.id} location={{x: func.loc.x, y: func.loc.y}} title={func.name} content={func.content} inputs={func.inputs} outputs={func.outputs}/>)) : <></>

    //generate variables from this module
    const LineList = (lines && lines.length) ? 
      (lines.map((line) => <LineNode key={line.id} id={line.id} start={line.start} end={line.end}  />)) : <></>
    
    //return function and variable elements for rendering
    return <div className='workbench' style={{zIndex: -1}} ><div>{mousemenu}</div>{FunctionList}{LineList}</div>
  }

  //final return (these mouse events don't make any sense)
  return (<div 
    onMouseDown={(e) => { 
      mouseloc = snapToGrid({x: e.clientX, y: e.clientY})
      //send right-click to mouse event solver
      if(e.button !== 2)mouseEvent(e)
    }} 
    onMouseUp={(e) => {
      mouselocEnd = snapToGrid({x: e.clientX, y: e.clientY})
      //create new line from mouse drag
      if(e.target.className === 'workbench'){wb_NewLine()}
    }}
    onContextMenu={(e) => mouseEvent(e)}><Workbench /></div>)
}

export { Module }
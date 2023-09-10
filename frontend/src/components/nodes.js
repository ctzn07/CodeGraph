import { removeFunction, removeLine } from '../backend'
import { useDispatch } from 'react-redux'

//single function node
const FunctionNode = (props) => {
  const dispatch = useDispatch()
  const node_removeFunc = (id) => {
    removeFunction(id).then((response => dispatch({ type: 'REMOVE_FUNCTION', payload: response.data})))
  }

  return ( 
    <div className='func' style={{top: props.location.y, left: props.location.x}} >
        <span className='node-title'>{props.title}
        <button className='tab-button' style={{float: 'right'}} 
        onClick={(e) => {e.preventDefault();node_removeFunc(props.id)}}>[ X ]</button>
        </span>
        <hr></hr>
        <p>{props.content}</p>
    </div>
  )
}

//single line node
const LineNode = (props) => {
  const dispatch = useDispatch()
  const node_removeLine = (id) => {
    removeLine(id).then((response => dispatch({ type: 'REMOVE_LINE', payload: response.data})))
  }
  //Math time \o/
  //visual x-y offset to align object in the middle of grid(gridsize is 32px)
  const offset = { x: 14, y: 6}
  //convert start-end vector to localspace, because big values are bad
  const localspace = { x: props.end.x - props.start.x, y: props.end.y - props.start.y }
  //length of the vector for the inline css style
  const length = Math.sqrt(localspace.x * localspace.x + localspace.y * localspace.y)
  //determine the rotation angle for the inline css style
  const angle = Math.atan2(localspace.y, localspace.x)/Math.PI*180

  return ( 
    <div className='line' style={{top: props.start.y+offset.y, left: props.start.x+offset.x, rotate: `${angle}deg`}} >
        <span className='line' style={{width: `${length}px`}} 
        onClick={(e) => {e.preventDefault();node_removeLine(props.id)}}></span>
    </div>
  )
}


//single variable node
const VariableNode = (props) => {
  return ( 
    <div className='variable' style={{top: props.location.y, left: props.location.x}} >
        <span className='variable-title' >{props.title}
        <button className='tab-button' style={{float: 'right'}} onClick={() => console.log('removing variable')}>[ X ]</button>
        </span>
        <br></br>
        <p>{props.content}</p>
    </div>
  )
}

export { FunctionNode, VariableNode, LineNode }

/*
<span className='node-title' 
          onMouseDown={(event) =>{event.preventDefault();console.log('MouseDown:', props.title)}} 
          onMouseUp={(event) =>{event.preventDefault();console.log('MouseUp:', props.title)}} 
          >{props.title}<button className='tab-button' style={{float: 'right'}} onClick={() => removeFunction(props.id)}>[ X ]</button></span>
*/


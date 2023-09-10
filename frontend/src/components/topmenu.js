import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector  } from "react-redux"
import { React } from 'react'
import { newModule, removeModule, getFunctions, getLines } from '../backend'

export default function Navbar(){
    const title = 'Graph'

    const dispatch = useDispatch()

    //extract project information from the browser route, [0]=project ID // [1]=loaded module ID
    const path = useLocation().pathname.slice(1).split('/')
    
    //declare selector for project
    const modules = useSelector(state => state.module.module)
    //more dumb syntax, not gonna fix it
    
    //for testing purposes, obviously
    /*
    const debug = useSelector(state => state.line)
    const debugmsg = () => {console.log('Current line state', debug)}
    const DebugButton = (<li><form>
        <input type='button' className='menuform' style={{float: 'right'}} value={'Debug'} onClick={(e) => {e.preventDefault();debugmsg()}} />
        </form></li>)
    */
    const DebugButton = <></>

    //default return when no project is loaded
    if(!path[0] || !modules){
        return (<nav className='top-menu'><ul><Link to='/' className='top-menu' 
                style={{ textDecoration: 'none', float: 'left', padding: '5px'}}>{title}</Link>
                {DebugButton}<p style={{ fontSize: '10px', float: 'right'}}>/No Project loaded</p></ul></nav>)
    }

    //variable for when creating new modules
    let newModuleName = ''

    //helper functions
    
    //add new module to project
    const addNewModule = (modname) => {
        if(modname.length)newModule(path[0], modname).then((response => dispatch({ type: 'ADD_MODULE', payload: response.data}))) 
    }
    //removes module
    const removeExistingModule = (module_id) => {
        removeModule(module_id).then((response => dispatch({ type: 'REMOVE_MODULE', payload: response.data}))) 
    }

    //back-end requests to fetch content for module(this should probably be in the module-component itself)
    //updates function list
    const updFuncList = (module_id) => {
        getFunctions(module_id).then((response => dispatch({ type: 'FUNCTION_LIST', payload: response.data}))) 
    }
    //updates line list
    const updLineList = (module_id) => {
        getLines(module_id).then((response => dispatch({ type: 'LINE_LIST', payload: response.data})))
    }

    //single tab for navigation bar
    const Tab = (props) => { 
        return (<li>
            <Link className='top-menu-tab' style={{ textDecoration: 'none', float: 'left', display: 'flex' }} 
            onClick={() => {
                updFuncList(props.id)
                updLineList(props.id)
            }}
            to={`/${path[0]}/${props.id}`}>
                <span>
                    {props.name}<button className='tab-button' style={{float: 'right'}} onClick={() => removeExistingModule(props.id)}>[ X ]</button>
                </span></Link>
            </li>)
            
    }
    
    //generate tabs for different project modules
    const TabList = () => {
        const NewTab = (<li><form onSubmit={(e) => e.preventDefault()} >
                        <input type='text' className='menuform' placeholder='Add New Module' style={{ width: '120px' }} onChange={(e) => {newModuleName = e.target.value}} />
                        <input type='button' className='menuform' value={'[ + ]'} onClick={() => {addNewModule(newModuleName);newModuleName = ''}} />
                        </form></li>)
        
        const tabs = (modules.length) ? modules.map((mod) => <Tab key={mod.id} id={mod.id} name={mod.name} />) : <></>
        return <ul>{tabs}{NewTab}</ul>
    }

    return (<nav className='top-menu'><ul><Link to='/' 
    className='top-menu' style={{ textDecoration: 'none', float: 'left', padding: '5px'}}>{title}</Link>
    <TabList />{DebugButton}
    </ul></nav>)
}
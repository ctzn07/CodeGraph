import { useState, React, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects, getProject, createProject, removeProject, getModules } from '../backend'
import { Link, useLocation } from "react-router-dom"
import '../App.css'


function Menu() {
    
    //declare dispatcher
    const dispatch = useDispatch()

    //extract route information
    const path = useLocation().pathname.slice(1).split('/')

    //project list state
    const project = useSelector(state => state.project.project)
    //yes the syntax is stupid, cba to fix it

    useEffect(()=>{
        const get = async () => {
            //technically this if-statement doesn't do anything 
            //but it stops double-requests to back-end(why? dunno)
            if(!path[0])getAllPr()
        }
        get()
    }, [])

    //helpers functions that send back-end requests, responses trigger dispatcher that updates the response to store

    //get all projects
    const getAllPr = () => getAllProjects().then((response => dispatch({ type: 'PROJECT_LIST', payload: response.data})))

    //get single project by id and modules associated with it
    const getPr = (id) => {
        getProject(id).then((response => dispatch({ type: 'LOAD_PROJECT', payload: response.data})))
        getModules(id).then((response => dispatch({ type: 'MODULE_LIST', payload: response.data})))
    }
    //remove project
    const removePr = (id) => {removeProject(id).then((response => dispatch({ type: 'REMOVE_PROJECT', payload: response.data})))}
    //create new project
    const createPr = (title) => {createProject(title).then((response => dispatch({ type: 'CREATE_PROJECT', payload: response.data})))}
    
    //visual components of the module

    //single element for project
    const ProjectListItem = (props) => {
        return (<div style={{'listStyle':'none', 'display':'flex'}} >
            <Link className='menuform' onClick={() => {getPr(props.id)}} 
                style={{ textDecoration: 'none', width: '75%' }} to={`/${props.id}`}>
                <span>{props.title}</span>
            </Link>
            <button className='menuform' onClick={() => {removePr(props.id)}}>{'[ x ]'}</button>
            </div>)
        }

    //generate project list
    function Content() {
        //project store initialized ? false -> loading / true -> store length ? false -> no projects found / true -> map projects
        const list = (!project) ? (<p>Loading...</p>) : 
            (!project.length) ? (<p>No Projects Found</p>) : 
                (project.map((p) => <ProjectListItem key={p.id} title={p.title} id={p.id} />))

        //state for new project name
        const [newproject, setNewProject] = useState('')
            
        //return Menu content
        return (
        <div className='window'>
            <h3>Select project:</h3>
            {list}
            <div><br></br>
                <form>
                    <input className='menuform' type='text' 
                    placeholder='Project title' value={newproject} 
                    onChange={(e) => setNewProject(e.target.value)} />

                    <input className='menuform' type='button' 
                    value={'+New project'} 
                    onClick={() => {
                        if(newproject.length){
                            createPr(newproject)
                            setNewProject('')
                        }
                    }} />
                </form>
            </div>
        </div>)
    }

    return (
    <div className='site-form'>
        <Content/>
    </div>
    )
}

export { Menu }
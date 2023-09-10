import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from "react-redux"
import { Route, Routes } from 'react-router-dom'
import { Module } from './components/module'
import { Menu } from  './components/menu'
import TopMenu from './components/topmenu'
import './App.css'

import { projectReducer, moduleReducer, functionReducer, lineReducer } from './reducer/reducers'

//redux component storage
const reducers = combineReducers({ project: projectReducer, module: moduleReducer, function: functionReducer, line: lineReducer })
const store = configureStore({reducer: reducers})

function App() {

  return (
    
    <Provider store={store}>
      <div className="App">
        <div className='container'>
        <TopMenu />
          <Routes>
            <Route path='/' element={<Menu />} />
            <Route path='/:id/' element={<Module />} />
            <Route path='/:id/:id' element={<Module />} />
          </Routes>
        </div>
      </div>
    </Provider>
  )
}
export default App
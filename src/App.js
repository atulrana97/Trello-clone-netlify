import './App.css'
import React from 'react'
import Main from './Task2-Trello Clone/Main'
import ToDo from './task1-ToDoList/ToDo'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div>
      <ToDo />
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    </div>
  )
}

export default App

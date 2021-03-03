import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import NavBar from './components/NavBar'

import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'

function Main() {
  const [currentSearch, setCurrentSearch] = useState('')
  return (
    <Router>
      <NavBar setCurrentSearch={setCurrentSearch} />
      <Switch>
        <Route exact path="/">
          <HomePage currentSearch={currentSearch} />
        </Route>
        <Route path="/dashBoard/:finalId" component={Dashboard}></Route>
      </Switch>
    </Router>
  )
}
export default Main

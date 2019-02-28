import React from 'react'
import {Route} from 'react-router-dom'

import Login from './Login'

const App = () => {
  return (
    <div>
      <h1>hey</h1>
      <Route exact path="/login" component={Login}/>
    </div>
  )
}

export default App

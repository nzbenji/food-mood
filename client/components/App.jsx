import React from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'


const App = () => {
  return (
    <div>
      <Route path="/login" component={Login} />
    </div>
  )
}

export default App

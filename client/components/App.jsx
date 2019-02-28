import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard'

const App = () => {
  return (
    <div>
      <Route path='/meal' component={Dashboard} />
    </div>
  )
}

export default App

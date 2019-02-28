import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Register from './Register'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

class App extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render () {
    return (
      <Switch>
        <Route path='/register' component={Register} />
        <button name='logout' onClick={this.handleLogout} >Log out</button>
      </Switch>
    )
  }
}

export default connect()(App)

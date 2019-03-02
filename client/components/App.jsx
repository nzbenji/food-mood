import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import Calendar from './Calendar'
import Meal from './AddMeal';
import Stats from './Stats'


class App extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render () {
    return (
      <Switch>
        <Route path ='/meal' component={Meal} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/stats' component={Stats} />
        <button name='logout' onClick={this.handleLogout} >Log out</button>
      </Switch>
    )
  }
}

export default connect()(App)

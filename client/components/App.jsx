import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import Meal from './AddMeal';
import Stats from './Stats'
import NavBar from './NavBar'


class App extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render () {
    return (
      <div>
      <Switch>
        <Route path ='/meal' component={Meal} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/stats' component={Stats} />
        <button name='logout' onClick={this.handleLogout} >Log out</button>
      </Switch>
      <NavBar />
      </div>
    )
  }
}

export default connect()(App)

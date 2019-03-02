import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import Calendar from './Calendar'
import AddMeal from './AddMeal';
import MealDay from './MealDay'
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
        <Route path='/calendar' component={Calendar} />
        <Route path ='/addmeal' component={AddMeal} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <button name='logout' onClick={this.handleLogout} >Log out</button>
        <Route path='/mealday' component={MealDay} />} />
        <Route path='/stats' component={Stats} />
      </Switch>
      <NavBar />
      </div>
      
    )
  }
}

export default withRouter(connect()(App))

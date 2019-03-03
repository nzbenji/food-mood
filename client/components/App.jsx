import React from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import Calendar from './Calendar'
import AddMeal from './AddMeal';
import MealDay from './MealDay'
import Stats from './Stats'
import NavBar from './NavBar'
<<<<<<< HEAD
import AddReaction from './AddReaction'
=======
import AddMood from './AddMood'
import Settings from './Settings'
>>>>>>> 466f647fdca8c91dbdc74218e1b513764269eae6
import Dashboard from './Dashboard'
import {getEmotions} from '../actions/emotions'

class App extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  componentDidMount () {
    this.props.dispatch(getEmotions())
  }

  render () {
    return (
      <div>
        <h1>Food mood</h1>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path ='/addmeal' component={AddMeal} />
            <Route path='/stats' component={Stats} />
            <Route path='/settings' component={Settings} />
            <Route path='/addmood/:mealId' component={AddMood} />
            <Route path='/mealday' component={MealDay} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
          {this.props.loggedIn && <NavBar />}
      </div>      
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn,
    currentMeal: state.auth.currentMeal
  }
}

export default withRouter(connect(mapStateToProps)(App))

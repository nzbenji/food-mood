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
import AddReaction from './AddReaction'
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
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/addmood/:mealId' component={AddReaction}/> 
            <Route path='/calendar' component={Calendar} />
            <Route path ='/addmeal' render={() => {
              return this.props.loggedIn
                ? <AddMeal />
                : <Redirect to='/login' push={true} />
            }} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/mealday' component={MealDay} /> 
            <Route path='/stats' component={Stats} />
            <button name='logout' onClick={this.handleLogout} >Log out</button>
          </Switch>
          <NavBar />
      </div>      
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(App))

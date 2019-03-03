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
import Settings from './Settings'
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
      <h1 style={{fontSize:'2.4rem', fontFamily:'Laila'}}>Food mood</h1>
          <Switch>
            <Route exact path='/' render={() => {
              return this.props.loggedIn
                ? <Dashboard />
                : <Redirect to='/login' push={true} />
            }} />
            <Route path ='/addmeal' render={() => {
              return this.props.loggedIn
                ? <AddMeal />
                : <Redirect to='/login' push={true} />
            }} />
            <Route path='/stats' render={() => {
              return this.props.loggedIn
                ? <Stats />
                : <Redirect to='/login' push={true} />
            }} />
            <Route path='/settings' render={() => {
              return this.props.loggedIn
                ? <Settings />
                : <Redirect to='/login' push={true} />
            }} />
            <Route path='/addmood/:mealId' component={AddReaction} />
            <Route path='/mealday' component={MealDay} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch><br></br>
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

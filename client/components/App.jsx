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
import AddMood from './AddMood'
import Settings from './Settings'
import Dashboard from './Dashboard'
import EditMeal from './EditMeal'
import Meal from './Meal'
import EditMood from './EditMood'
import DeleteMood from './DeleteMood'
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
      <h1 style={{fontSize:'2.4rem', fontFamily:'Laila', color:'orange', textAlign:'center'}}>Food mood</h1>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path ='/addmeal' component={AddMeal} />
            <Route path ='/editmeal' component={EditMeal} />
            <Route path='/stats' component={Stats} />
            <Route path='/settings' component={Settings} />
            <Route path='/editmood' component={EditMood} />
            <Route path='/addmood' component={AddMood} />
            <Route path='/deletemood' component={DeleteMood} />
            <Route path='/day' component={MealDay} />
            <Route path='/meal' component={Meal} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/water' component={WaterInput} />
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

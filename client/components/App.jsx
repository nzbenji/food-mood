import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import Calendar from './Calendar'
import AddMeal from './AddMeal';
import {Redirect, withRouter} from 'react-router-dom'

class App extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render () {
    return (
      <Switch>
        <Route path ='/addmeal' render={() => {
          return this.props.loggedIn
            ? <AddMeal />
            : <Redirect to='/login' push={true} />
        }} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <button name='logout' onClick={this.handleLogout} >Log out</button>
      </Switch>
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

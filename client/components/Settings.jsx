import React from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import {getEmotions} from '../actions/emotions'

class Settings extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  componentDidMount () {
    this.props.dispatch(getEmotions())
  }

  render () {
    if(!this.props.loggedIn) {
      console.log('not logged in trying to redirect')
      return <Redirect to='/login' push={true} />
    }
    return (
      <div>
        <button name='logout' onClick={this.handleLogout} >Log out</button>
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

export default withRouter(connect(mapStateToProps)(Settings))

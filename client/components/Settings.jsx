import React from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import {clearMood} from '../actions/moods'
import {getEmotions} from '../actions/emotions'

class Settings extends React.Component {

  handleLogout = () => {
    this.props.dispatch(logout())
    this.props.dispatch(clearMood())
  }

  render () {
    if(!this.props.loggedIn) {
      return <Redirect to='/login' push={true} />
    }
    return (
      <div>   
            <button style={{height: '53px', width: '8rem', marginTop:'50px', marginBottom:'40px', marginLeft: '18px'}} name='logout' onClick={this.handleLogout}>Log out</button>
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

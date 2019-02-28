import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../actions/auth'

class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = () => {
    this.props.dispatch(register(this.state))
  }

  render () {
    if (this.props.loggedIn) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div>
        <h1>Register</h1>
        <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
        <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
        <input type='text' name='password' value={this.state.password} onChange={this.handleChange} />
        <input type='submit' value='Submit' onClick={this.handleSubmit} />
        {this.props.error && <p>That username is already taken</p>}
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.auth.error
  }
}

export default connect(mapStateToProps)(Register)

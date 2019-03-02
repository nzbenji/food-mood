import React from 'react'
import {Redirect, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../actions/auth'
import {TextField, Button} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

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
      <Grid container justify = "center">
      <div>
      <form>
        <div>
        <h1>Register</h1>
        </div>
        <br/><br/>
        <div>
          <h3>Already have an account? Login <Link to='/login'>here</Link></h3>
        </div>
        <br/><br/><br/><br/>
        <div>
            <label> 
            Username: 
            <br/><TextField id='username' name='username' variant="outlined" placeholder='username' value={this.state.username} onChange={this.handleChange} /> 
            </label>
            </div>
            <div>
            <label> 
            Email: 
            <br/>
            <TextField id='email' name='email' variant="outlined" placeholder='email' value={this.state.email} onChange={this.handleChange} /> 
            </label>
            </div>
            <div>
            <label> 
            Password:
            <br/>
            <TextField id='password' name='password' variant="outlined" placeholder='password' value={this.state.password} onChange={this.handleChange} /> 
            </label>
            </div>
            <Grid container justify = "center">
            <div>
        <Button type='submit' value='Submit' onClick={this.handleSubmit} >Submit</Button>
        </div>
        </Grid>
        {this.props.error && <p>That username is already taken</p>}
        </form>
      </div>
      </Grid>
    )
  }

}

function mapStateToProps (state) {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.auth.error
  }
}

export default withRouter(connect(mapStateToProps)(Register))

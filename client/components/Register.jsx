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

  handleSubmit = (e) => {
    this.props.dispatch(register(this.state))
    e.preventDefault()
  }

  render () {
    if(this.props.loggedIn){
      return (
        <Redirect to='/' />
      )
    }

    return (
      <Grid container justify = "center">
      <div>
        <br/><br/>
        <br/><br/><br/>
      <form>
        <div>
        <h4>Register</h4>
        </div>
        <br/>
        <div>
          <h3>Already have an account? Login <Link to='/login'>here</Link></h3>
        </div>
        <br/>
        <div  style={{display: 'block', marginLeft: '54px', marginTop: '20px'}}>
           
            <br/>
            <input id='username' name='username' variant="outlined" placeholder='username' value={this.state.username} onChange={this.handleChange} /> 

            <br/>
            <input id='email' name='email' variant="outlined" placeholder='email' value={this.state.email} onChange={this.handleChange} /> 

            <br/>
            <input id='password' name='password' type='password' variant="outlined" placeholder='password' value={this.state.password} onChange={this.handleChange} /> 
           
            </div>
            <Grid container justify = "center">
            <div>
          <br/>
        <Link style={{textDecoration: 'none'}} to='/login' onClick={this.handleSubmit}><button className='button1'>Submit</button></Link>
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

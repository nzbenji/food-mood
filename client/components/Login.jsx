import React from 'react'
import {Redirect, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {signin} from '../actions/auth'
import {TextField, Button} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit (e) {
    const user = this.state
    this.props.dispatch(signin(user))
    // e.preventDefault()
  }

  render () {
    console.log(this.props.loggedIn)
    if (this.props.loggedIn) {
      return <Redirect to='/' />
    }
    
    const {username, password} = this.state
    return (
      <Grid container justify = "center">
        <div>
          <form>
            <div>
              <h1>Login To Food Mood</h1>
            </div>
            <br/><br/>
            <div>
              <h3>Don't have an account? Sign up <Link to='/register'>here</Link></h3>
            </div>
            <br/><br/>
            <br/><br/>
            <br/><br/>

            <div>
              <label htmlFor="firstname">
              Username: <TextField id='username' name='username' variant="outlined" placeholder='username' onChange={this.handleChange} value={username} /> </label>
            </div>

            <div>
            Password: <TextField id='password' variant="outlined" name='password' placeholder='password' onChange={this.handleChange} value={password} type='password' />
            </div>

            <div>
              <Grid container justify = "center">
                <label htmlFor="signinBtn" >
                  <Button name='signinBtn' id='signinBtn' onClick={this.handleSubmit}>Login</Button></label>
              </Grid>
              {this.props.error && <p>Incorrect login credentials. Please try again</p>}
            </div>
          </form>
        </div>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.auth.error
  }
}

export default withRouter(connect(mapStateToProps)(Login))

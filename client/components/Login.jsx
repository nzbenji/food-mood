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
    e.preventDefault()
  }

  render () {
    if (this.props.loggedIn) {
      return <Redirect to='/' />
    }
    
    const {username, password} = this.state
    return (
      <Grid container justify = "center">
        <div>
          <br/><br/>
          <br/><br/>
          <br/><br/>
          <form>
            <div>
              <h3>Login To Food Mood</h3>
            </div>
            <br/>
            <div>
              <h3>Don't have an account? Sign up <Link to='/register'>here</Link></h3>
            </div>
            <br/><br/>
            <div style={{display: 'block', marginLeft: '54px'}}>
              <form>
              
              <input id='username' name='username' variant="outlined" placeholder='username' onChange={this.handleChange} value={username} /> 
              </form>
            </div>

            <div style={{display: 'block', marginLeft: '54px'}}>
              <form>
            <input id='password' variant="outlined" name='password' type='password' placeholder='password' onChange={this.handleChange} value={password} />
            </form>
            </div>
            <br/>
            <div>
              <Grid container justify = "center">
                
                  <button className='button1' name='signinBtn' id='signinBtn' onClick={this.handleSubmit}>Login</button>
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

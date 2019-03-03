import React from 'react'
import {Button} from 'semantic-ui-react'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import '../../server/public/css/dashboard.css'

class Dashboard extends React.Component {
  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
          <Link to='/addmeal'><Button
            textalign="center"
            style={{
              width: '60rem',
              margin: '20px',
              height: '8rem',
              fontSize: '3rem',
              fontWeight: '800',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              display: 'flex'
            }}
            positive
          >Add Meal</Button></Link>
        </div>
        <div>
          <Link to='/reaction'>
            <Button
              style={{
                width: '60rem',
                margin: '20px',
                height: '8rem',
                fontSize: '3rem',
                fontWeight: '800',
                letterSpacing: '5px',
                textTransform: 'uppercase'
              }}
              positive>Add Reaction</Button>
          </Link>
        </div>
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

export default withRouter(connect(mapStateToProps)(Dashboard))

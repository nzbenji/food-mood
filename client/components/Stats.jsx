import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

export class Stats extends Component {
  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <h1 style={{fontSize: '4rem', fontFamily: 'Laila', textAlign: 'center'}}>Stats</h1><br></br>
        <img src='/images/Dummygraph.png' alt="dummygraph" style={{width: '560px', alignItems: 'center'}}/>
        <img src='/images/pieChart.png' alt="dummygraph" style={{width: '560px', alignItems: 'center'}}/>
        <img src='/images/Dummygraph.png' alt="dummygraph" style={{width: '300px'}}/>
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

export default withRouter(connect(mapStateToProps)(Stats))

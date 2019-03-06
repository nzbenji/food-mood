import React from 'react'
import {getMostRecentMood} from '../actions/moods'
import {mostRecentMealApi} from '../api/meals'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {getEmoji} from '../utils/emojis'

import {faTint, faUtensils} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = {
  grid: {
    width: '100%'
  }
}
class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recentMeal: {},
      error: false
    }
  }

  componentDidMount () {
    this.props.dispatch(getMostRecentMood(this.props.userId))
    mostRecentMealApi(this.props.userId)
      .then(meal => {
        this.setState({recentMeal: meal})
      })
      .catch((err) => {
        if (err) this.setState({error: true})
      })
  }

  render () {
    const {emotions, currentMood} = this.props
    if (this.state.error) {
      return <Redirect to='/error'/>
    }
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <br/><br/><br/><br/>
        <h3>Last Mood</h3>
        {currentMood
          ? <h3 style={{fontSize: '80px', fontFamily: 'Laila', textAlign: 'center', position: 'relative', alignSelf: 'center', marginBottom: '20px', marginTop: '20px'}}> {getEmoji(emotions, currentMood.emotion_id)} </h3>
          : <div></div>}
        <div style={{marginTop: '20px', textAlign:'center'}}>
          <Link style={{textDecoration: 'none'}} to='/water'>
            <button type="button"
              className="btn btn-warning btn-circle btn-xl"
            >
              <FontAwesomeIcon icon={faTint} size={'3x'} style={{color: 'white'}}/>
            </button>
          </Link>

          <Link style={{textDecoration: 'none'}} to='/addmeal'>
            <button type="button"
              className="btn btn-warning btn-circle btn-xl"
            >
              <FontAwesomeIcon icon={faUtensils} size={'3x'} style={{color: 'white'}}/>
            </button>
          </Link>
        </div>
        <br/>
        <div style={{marginTop: '30px', marginLeft: '20px'}}>
          {this.state.recentMeal &&
            <Link style={{textDecoration: 'none'}} to={{
              pathname: `/addmood`,
              state: {meal: this.state.recentMeal}}}>
              <button style={{borderStyle: 'none'}}
                className="btn-warning button1">Add Mood to Last Meal</button>
            </Link>
          }
        </div>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn,
    currentMood: state.currentMood,
    emotions: state.emotions
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Dashboard)))

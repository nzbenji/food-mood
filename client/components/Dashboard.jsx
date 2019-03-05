import React from 'react'
import {getMostRecentMood} from '../actions/moods'
import {mostRecentMealApi} from '../api/meals'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {getEmoji} from '../utils/emojis'

const styles = {
  grid: {
    width: '100%'
  }
}
class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      recentMeal: {}
    }
  }

  componentDidMount () {
    this.props.dispatch(getMostRecentMood(this.props.userId))
    mostRecentMealApi(this.props.userId).then(meal => {
      this.setState({recentMeal: meal})
    })
  }

  render () {
    const {emotions, currentMood} = this.props

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <br/>
        <h3>Last Mood</h3>
        {currentMood
          ? <h3 style={{fontSize: '80px', fontFamily: 'Laila', textAlign: 'center', position: 'relative', alignSelf: 'center', marginBottom: '20px', marginTop: '20px'}}> {getEmoji(emotions, currentMood.emotion_id)} </h3>
          : <div></div>}
        <Link style={{textDecoration: 'none'}} to='/addmeal'>
          <a><button className='button1'>
            Add a meal
          </button></a>
        </Link>
        <br/>
        {this.state.recentMeal &&
            <Link style={{textDecoration: 'none'}} to={{
              pathname: `/addmood`,
              state: {meal: this.state.recentMeal}}}>
              <button className='button1'>Add Mood to Last Meal</button>
            </Link>
        }

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

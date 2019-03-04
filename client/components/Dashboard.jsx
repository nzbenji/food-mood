import React from 'react'
import {getMostRecentMood} from '../actions/moods'
import {mostRecentMealApi} from '../api/meals'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'

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
    let emoji = ''
    if (emotions.length > 0 && currentMood) {
      const seletedEmotion = emotions.find(emotion => emotion.id === currentMood.emotion_id)
      if (seletedEmotion && Object.keys(seletedEmotion).length !== 0 && seletedEmotion.constructor === Object) emoji = seletedEmotion.emoji
    }
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <br/>
        <h3>Last Mood</h3>
          {currentMood && emotions.length > 0
            ? <h3 style={{fontSize: '85px', fontFamily: 'Laila', textAlign: 'center', position: 'relative', alignSelf: 'center', marginBottom: '20px', marginTop: '20px'}}> {emoji} </h3>
            : <div></div>}
          <Link style={{ textDecoration: 'none' }} to='/addmeal'>
            <a><button className='button1'>
            Add Meal
            </button></a>
          </Link>
          <br/>
          <Link style={{ textDecoration: 'none' }} to={{
            pathname: `/addmood/${this.state.recentMeal.id}`,
            state: {meal: this.state.recentMeal}}}>
            <a><button className='button1'>
            Add Mood to Last Meal
            </button></a>
          </Link>
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

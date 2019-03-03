import React from 'react'
import {getMostRecentMood} from '../actions/moods'
import {mostRecentMealApi} from '../api/meals'
import {Button} from 'semantic-ui-react'
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
      mood: {},
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
    if (emotions.length > 0) {
      emoji = emotions.find(emotion => emotion.id === currentMood.emotion_id).emoji
    }
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
          <h3 style={{textAlign: 'center', fontSize: '40px', margin: '40px', fontFamily: 'Laila', letterSpacing: '4px'}}>Last Mood</h3>
          {currentMood && emotions.length > 0
            ? <h3 style={{fontSize: '100px', fontFamily: 'Laila', textAlign: 'center', position: 'relative', alignSelf: 'center'}}> {emoji} </h3>
            : <div></div>}
          <Link to='/addmeal'>
            <Button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center'}}>Add Meal</Button>
          </Link>
          <br/><br/>
          <Link to={{
            pathname: `/addmood/${this.state.recentMeal.id}`,
            state: {meal: this.state.recentMeal}}}>
            <Button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center'}}>Add Mood</Button>
          </Link>
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

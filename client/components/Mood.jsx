import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {getEmoji} from '../utils/emojis'

class Mood extends React.Component {
  render () {
    const {meal, mood} = this.props
    const emoji = getEmoji(this.props.emotions, mood.emotion_id)
    return (
      <div>
        {`${emoji} ${mood.time.slice(11, 16)} ${mood.notes}`}
        <Link to={{
          pathname: `/editmood`,
          state: {mood: mood, meal: meal}}}>
          <button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center', backgroundColor: '#0ba8bc'}}>
                  Edit Mood</button>
        </Link>
        <Link to={{
          pathname: `/deletemood`,
          state: {mood: mood, meal: meal}}}>
          <button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center', backgroundColor: '#0ba8bc'}}>
                  Delete Mood</button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn,
    emotions: state.emotions
  }
}

export default withRouter(connect(mapStateToProps)(Mood))

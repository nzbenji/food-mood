import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {getEmoji} from '../utils/emojis'

class Mood extends React.Component {
  render () {
    const {meal, mood} = this.props
    const emoji = getEmoji(this.props.emotions, mood.emotion_id)
    return (
      <div className='meal'>
        <div style={{fontSize: '38px'}}>
          {`${emoji} ${mood.time.slice(11, 16)} ${mood.notes}`}
        </div>
        <br/><br/>
        <Link style={{textDecoration: 'none'}} to={{
          pathname: `/editmood`,
          state: {mood: mood, meal: meal}}}>
          <button className='button1'>
                  Edit Mood</button>
        </Link>
       
        <Link style={{textDecoration: 'none'}} to={{
          pathname: `/deletemood`,
          state: {mood: mood, meal: meal}}}>
          <button className='button1'>
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

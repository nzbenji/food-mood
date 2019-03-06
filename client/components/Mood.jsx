import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import moment from 'moment'

import {getEmoji} from '../utils/emojis'

const editIcon = './images/edit-icon.png'
const deleteIcon = './images/delete.png'

class Mood extends React.Component {
  render () {
    const {meal, mood} = this.props
    const emoji = getEmoji(this.props.emotions, mood.emotion_id)
    return (
      <div className='meal'>
       <div style={{fontSize: '55px', fontFamily: 'Laila', textAlign: 'center', position: 'relative', alignSelf: 'center', marginBottom: '20px', marginTop: '20px'}}>
          {`${emoji} `}
          </div>

          <div style={{fontSize: '21px'}}>
          {`${moment(mood.time).format('h:mm a')} ${mood.notes}`}
        </div>
        <br/>
        <Link style={{textDecoration: 'none'}} to={{
          pathname: `/editmood`,
          state: {mood: mood, meal: meal}}}>
          <img className="edit-icon" src={editIcon}/>
        </Link>
       
        <Link style={{textDecoration: 'none'}} to={{
          pathname: `/deletemood`,
          state: {mood: mood, meal: meal}}}>
          <img className="delete-icon" src={deleteIcon}/>
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

import React from 'react'
import {Link} from 'react-router-dom'
import {getMostRecentMood} from '../actions/moods'
import {getRecentEmotion} from '../actions/emotions'
import { Button } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const styles = {
  grid: {
    width: '100%',
  },
};
class Dashboard extends React.Component {
 constructor(props){
   super(props)
   this.state = {
    mood: null
   }
  }

 componentDidMount(){
   this.props.dispatch(getMostRecentMood(this.props.userId))
 }

 componentDidUpdate(prevProps){
  if (prevProps.currentMood !== this.props.currentMood) {
    console.log(this.props.currentMood)
    this.setState = {
      mood: this.props.currentMood
    }
   if (this.props.currentMood.emotion_id) {
     this.props.dispatch(getRecentEmotion(this.props.currentMood.emotion_id))
  }
 }
}

  render () {
    const emotions = this.props.emotions
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
        <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>Last Mood</h3>
        {emotions.recentEmotion && emotions.recentEmotion.emoji ? 
        <h3 style={{fontSize: '100px', fontFamily:'Laila', textAlign: 'center', position: 'relative', alignSelf: 'center'}}> {emotions.recentEmotion.emoji} </h3> 
        : <div></div>}
        <Link to='/addmeal'>
        <Button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center'}}>Add Meal</Button>
        </Link>
        <br/><br/>
        <Link to='/addreaction'>
        <Button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center'}}>Add Reaction</Button>
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

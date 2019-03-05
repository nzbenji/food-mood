import React from 'react'

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import {addMealApi} from '../api/meals'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {deleteMoodApi} from '../api/moods'

const styles = {
    grid: {
      width: '100%',
    },
  };

class DeleteMood extends React.Component {

  constructor (props) {
    super(props)
    if(props.location.state) {
      const mood = props.location.state.mood
      this.state = {
        // The first commit of Material-UI
        mood: {
          time: mood.time,
          notes: mood.notes,
          emotion_id: mood.emotionId,
          meal_id: mood.mealId,
          id: mood.id
        },
        submitted: false
      }
    }
  }

  handleSubmit = (event) => {
    deleteMoodApi(this.state.mood)
      .then(() => {
        this.setState({submitted:true})
      })
      .catch(err => console.log('whoops'))
    event.preventDefault()
  }

  render() {

    if(!this.props.location.state) {
      return <Redirect to='/'/>
    }
  
    if (this.state.submitted){
      return <Redirect to ={{
        pathname: '/meal',
        state: {meal: this.props.location.state.meal}
      }}/>
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    const { classes } = this.props;
    const { time } = this.state.mood;
    let emoji = ''
    const emotion = this.props.emotions.find(emotion => emotion.id === this.state.mood.emotionId)
    if(emotion) emoji = emotion.emoji
    
    return (
      <div>
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
            Are you sure you want to delete this mood for {` ${this.props.location.state.meal.title}`}?
          </h3>
          <br></br>
        </center>
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
            {emoji}
          </h3>
          <br></br>
          <h4>{this.state.mood.notes}</h4>
          <br></br>
          <h5>{this.state.mood.time}</h5>
        </center>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <button positive style={{height: '53px', width: '8rem', marginTop:'50px', marginBottom:'40px', marginLeft: '18px'}} onClick={this.handleSubmit}>
            Delete
          </button>
        </Grid>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(DeleteMood)))

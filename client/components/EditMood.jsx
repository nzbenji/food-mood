import React from 'react'

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import {addMealApi} from '../api/meals'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {editMoodApi} from '../api/moods'

const styles = {
    grid: {
      width: '100%',
    },
  };

class EditMood extends React.Component {

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
        };
    }
  }
    
  handleChange = (event) => {
    const updatemood = {...this.state.mood}
    updatemood[event.target.name] = event.target.value
    this.setState({mood: updatemood})
  }

  handleSubmit = (event) => {
    editMoodApi(this.state.mood)
      .then(() => {
        this.setState({submitted:true})
      })
      .catch(err => console.log('whoops'))
    event.preventDefault()
  }

  handleDateChange = date => {
    const dbDate = date.toISOString().slice(0, 19).replace('T', ' ')
    const updatemood = {...this.state.mood}
    updatemood.time = dbDate
    this.setState({mood: updatemood})
  }

  handleClick = (id) => {
    return () => {
      const updatemood = {...this.state.mood}
      updatemood.emotion_id = id
      this.setState({mood: updatemood})
    }
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
    
    
    return (
      <div>
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>Edit Mood </h3>
          <br></br>
        </center>
          <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
          {this.props.location.state.meal.title}</h3>
          <br></br>
        </center>
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
          {this.props.emotions.map(emotion => { return <p key={emotion.emoji} onClick={this.handleClick(emotion.id)}>{emotion.emoji}</p>})}</h3>
          <br></br>
        </center>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div> 
          <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
              Notes:
            </h3>
            <form style={{margin:'40px'}}>
                  <input 
                  placeholder='Notes' 
                  name='notes'
                  value={this.state.mood.notes} 
                  onChange={this.handleChange} 
                  style={{width: '40rem', height: '53px', fontSize: '18px', fontFamily:'Laila', letterSpacing:'4px'}}/>
            </form>
          </div>
        </Grid>

        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div>
            <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
              Enter a date:
            </h3>
            <DatePicker style={{marginLeft: '30px'}}
                margin="normal"
                label="Date picker"
                value={time}
                onChange={this.handleDateChange}/>        
          </div>
          <div>
              <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>Enter a time: </h3>
              <TimePicker style={{marginLeft: '30px'}}
                  margin="normal"
                  label="Time picker"
                  value={time}
                  onChange={this.handleDateChange}/>
          </div>
        </Grid>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
        <button positive style={{height: '53px', width: '8rem', marginTop:'50px', marginBottom:'40px', marginLeft: '18px'}} onClick={this.handleSubmit}>Submit</button>
        </Grid>
      </MuiPickersUtilsProvider>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EditMood)))

import React from 'react'

import 'date-fns'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {editMoodApi} from '../api/moods'

const styles = {
  grid: {
    width: '100%'
  }
}

class EditMood extends React.Component {
  constructor (props) {
    super(props)
    if (props.location.state) {
      this.state = {
        mood: props.location.state.mood,
        submitted: false,
        error: false
      }
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
      .catch((err) => {
        if (err) this.setState({error: true})
      })
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

  render () {

    if (this.state.error) {
      return <Redirect to='/error'/>
    }

    if (!this.props.location.state) {
      return <Redirect to='/'/>
    }

    if (this.state.submitted) {
      return <Redirect to ={{
        pathname: '/meal',
        state: {meal: this.props.location.state.meal}
      }}/>
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }

    const {classes} = this.props
    const {time} = this.state.mood

    return (
      <div>

        <h3>Edit Mood </h3>
        <br/>

        <h3>
          {this.props.location.state.meal.title}</h3>

          <Grid container className={classes.grid} alignContent="center" justify="center" >
          {this.props.emotions.map(emotion => { return <button className='button2' key={emotion.emoji} mouseenter={this.mouseenterHandler} mouseLeave={this.mouseLeaveHandler} 
          onClick={this.handleClick(emotion.id)}>{emotion.emoji}</button> })}
          </Grid>
          

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} alignContent="center" justify="center" >
            <div>
              <h2>
              Notes:
              </h2>
              <form style={{margin: '40px'}}>
                <input
                  placeholder='Notes'
                  name='notes'
                  value={this.state.mood.notes}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </Grid>

          <Grid container className={classes.grid} alignContent="center" justify="center" >
            <div>
              <h2>
              Enter a date:
              </h2>
              <DatePicker style={{marginLeft: '30px'}}
                margin="normal"
                label="Date picker"
                value={time}
                onChange={this.handleDateChange}/>
            </div>
            <div>
              <h2>Enter a time: </h2>
              <TimePicker style={{marginLeft: '30px'}}
                margin="normal"
                label="Time picker"
                value={time}
                onChange={this.handleDateChange}/>
            </div>
          </Grid>
          <Grid container className={classes.grid} alignContent="center" justify="center" >
            <button className='button1' onClick={this.handleSubmit}>Submit</button>
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

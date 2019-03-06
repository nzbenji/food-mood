import React from 'react'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers'
import {addMealApi} from '../api/meals'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {saveNewMood} from '../actions/moods'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

const styles = {
  grid: {
    width: '100%'
  }
}

class AddMood extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // The first commit of Material-UI
      mood: {
        time: moment(),
        notes: '',
        emotion_id: ''
      },
      submitted: false
    }
  }

  handleChange = (event) => {
    const updatemood = {...this.state.mood}
    updatemood[event.target.name] = event.target.value
    this.setState({mood: updatemood})
  }

  handleSubmit = (event) => {
    this.props.dispatch(saveNewMood(this.state.mood, this.props.location.state.meal.id))
    this.setState({submitted:true})
    event.preventDefault()
  }

  handleDateChange = date => {
    const dbDate = moment(date).format('MM-DD-YYYY HH:mm:ss')
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
    console.log(this.state)
    const {classes} = this.props
    const {time} = this.state.mood
    if (this.state.submitted) {
      return <Redirect to ={{
        pathname: '/meal',
        state: {meal: this.props.location.state.meal}
      }}/>
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }

    if (!this.props.location.state) {
      return <Redirect to='/'/>
    }

    return (
      <div>
 
          <h3 >Add Mood </h3>

          <h3 >{this.props.location.state.meal.title}</h3>

          <ul style={{textAlign: 'center', fontSize: '40px', fontFamily: 'Laila', letterSpacing: '4px'}}>
            {this.props.emotions.map(emotion => { return <li className='nav-li'><p key={emotion.emoji} onClick={this.handleClick(emotion.id)}>{emotion.emoji}</p></li>})}</ul>
        

        <MuiPickersUtilsProvider utils={MomentUtils}>
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
              <h1>
              Enter a date:
              </h1>
              <DatePicker style={{marginLeft: '30px'}}
                margin="normal"
                label="Date picker"
                value={time}
                onChange={this.handleDateChange}
              />
            </div>
            <div>
              <h1>Enter a time: </h1>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AddMood)))

import React from 'react'

import { Button } from 'semantic-ui-react'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { Form, TextArea } from 'semantic-ui-react'
import {addMealApi} from '../api/meals'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'

const styles = {
    grid: {
      width: '100%',
    },
  };

class AddReaction extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
        // The first commit of Material-UI
        mood: {
          time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          note: '',
          emotion_id: ''
        }
      };
  }
    
  handleChange = (event) => {
    const updatemood = {...this.state.mood}
    updatemood[event.target.name] = event.target.value
    this.setState({mood: updatemood})
  }

  handleSubmit = (event) => {
  
  }

  handleDateChange = date => {
    const dbDate = date.toISOString().slice(0, 19).replace('T', ' ')
    const updatemood = {...this.state.mood}
    updatemood.time = dbDate
    this.setState({mood: updatemood})
  }

  handleClick = (event) => {
    
  }

  render() {
  
    const { classes } = this.props;
    const { time } = this.state.mood;
    return (
      <div>
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>Add Mood </h3>
          <br></br>
        </center>
          <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>{this.props.currentMeal} </h3>
          <br></br>
        </center>
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
          {this.props.emotions.map(emotion => { return <p key={emotion.emoji} name={emotion.id} onClick={this.handleClick}>{emotion.emoji}</p>})}</h3>
          <br></br>
        </center>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div> 
          <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
              Notes:
            </h3>
            <Form style={{margin:'40px'}}>
                  <TextArea 
                  placeholder='Notes' 
                  name='notes'
                  value={this.state.mood.notes} 
                  onChange={this.handleChange} 
                  style={{width: '40rem', height: '53px', fontSize: '18px', fontFamily:'Laila', letterSpacing:'4px'}}/>
            </Form>
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
                onChange={this.handleDateChange}
            />        
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
        <Button positive style={{height: '53px', width: '8rem', marginLeft: '18px'}} onClick={this.handleSubmit}>Submit</Button>
      </MuiPickersUtilsProvider>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn,
    currentMeal: state.currentMeal,
    emotions: state.emotions
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AddReaction)))

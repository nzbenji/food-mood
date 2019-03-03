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
import {Redirect, withRouter, Route} from 'react-router-dom'
import {updateCurrentMeal} from '../actions/meals'

const styles = {
    grid: {
      width: '100%',
    },
  };

class AddMeal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
        // The first commit of Material-UI
        meal: {
          time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          title: ''
        },
        mealId: -1
      };
  }
    
  handleChange = (event) => {
    const updatemeal = {...this.state.meal}
    updatemeal[event.target.name] = event.target.value
    this.setState({meal: updatemeal})
  }

  handleSubmit = (event) => {
    this.props.dispatch(updateCurrentMeal(this.state.meal.title))
    return addMealApi(this.props.userId, this.state.meal)
      .then((mealId) => {
        this.setState({
          mealId
        })
      })
      .catch(({message}) => console.log("Whoops"))
  }

  handleDateChange = date => {
    const dbDate = date.toISOString().slice(0, 19).replace('T', ' ')
    const updatemeal = {...this.state.meal}
    updatemeal.time = dbDate
    this.setState({meal: updatemeal})
  }

  render() {
    if(this.state.mealId > 0){
      return (
        <Redirect to={`/addMood/${this.state.mealId}`} />
      )
    }

    const { classes } = this.props;
    const { time } = this.state.meal;
    return (
      <div>
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>Add Meal </h3>
          <br></br>
        </center>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div> 
          <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
              Meal Name:
            </h3>
            <Form style={{margin:'40px'}}>
                  <TextArea 
                  placeholder='Meal Name' 
                  name='title'
                  value={this.state.meal.title} 
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
        <Grid container className={classes.grid} alignContent="center" justify="center">
        <Button positive style={{height: '53px', width: '8rem', marginTop: '50px', marginBottom: '30px', marginLeft: '18px'}} onClick={this.handleSubmit}>Submit</Button>
        </Grid>
      </MuiPickersUtilsProvider>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AddMeal)))
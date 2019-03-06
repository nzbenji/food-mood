import React from 'react'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import {editMealApi} from '../api/meals'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter, Route} from 'react-router-dom'

const styles = {
    grid: {
      width: '100%',
    },
  };

class EditMeal extends React.Component {

  constructor (props) {
    super(props)
    const meal = props.location.state.meal
    this.state = {
      meal: meal,
      error: false
    };
}
    
  handleChange = (event) => {
    const updatemeal = {...this.state.meal}
    updatemeal[event.target.name] = event.target.value
    this.setState({meal: updatemeal})
  }

  handleSubmit = (event) => {
    return editMealApi (this.state.meal)
      .catch((err) => {
        if (err) this.setState({error: true})
      })
  }

  handleDateChange = date => {
    const dbDate = date.toISOString().slice(0, 19).replace('T', ' ')
    const updatemeal = {...this.state.meal}
    updatemeal.time = dbDate
    this.setState({meal: updatemeal})
  }

  render() {

    if (this.state.error) {
      return <Redirect to='/error'/>
    }

    if (this.state.submitted){
      return <Redirect to ={{
        pathname: '/meal',
        state: {meal: this.state.meal}
      }}/>
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }

    const { classes } = this.props;
    const { time } = this.state.meal;
    return (
      <div>
        <br/><br/>
        <br/><br/>
        <center>
          <h3>Edit Meal </h3>
        </center>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div> 
          <h3>
              Edit Meal Name:
            </h3>
            <form>
                  <input
                  placeholder='Meal Name' 
                  name='title'
                  value={this.state.meal.title} 
                  onChange={this.handleChange} 
                  />
            </form>
          </div>
        </Grid>
        <br/><br/>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div>
            <DatePicker style={{marginLeft: '30px'}}
                margin="normal"
                label="Meal Date"
                value={this.state.meal.time}
                onChange={this.handleDateChange}
            />        
          </div>
          <div>
              <TimePicker style={{marginLeft: '30px'}}
                  margin="normal"
                  label="Meal Time"
                  value={this.state.meal.time}
                  onChange={this.handleDateChange}/>
          </div>
        </Grid>
        <Grid container className={classes.grid} alignContent="center" justify="center">
        <Link style={{textDecoration: 'none'}} to={{
            pathname: '/meal',
            state: {meal: this.state.meal}
          }}>
          <button className='button1' onClick={this.handleSubmit}>Submit</button>
          </Link>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EditMeal)))
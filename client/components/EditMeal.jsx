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
      // The first commit of Material-UI
      meal: {
        time: meal.time,
        notes: meal.notes,
        title: meal.title
      },
      submitted: false
    };
}
    
  handleChange = (event) => {
    const updatemeal = {...this.state.meal}
    updatemeal[event.target.name] = event.target.value
    this.setState({meal: updatemeal})
  }

  handleSubmit = (event) => {
    return editMealApi (this.props.userId, this.state.meal)
      .then((mealId) => {
        this.setState({
          mealId
        })
      })
      .catch(({message}) => console.log("sup homie"))
  }

  handleDateChange = date => {
    const dbDate = date.toISOString().slice(0, 19).replace('T', ' ')
    const updatemeal = {...this.state.meal}
    updatemeal.time = dbDate
    this.setState({meal: updatemeal})
  }

  render() {
    if(this.state.mealId > 0){
      const meal = {...this.state.meal, id: this.state.mealId}
      return (
        <Redirect to={{
          pathname:`/addMood/${this.state.mealId}`,
          state: {meal}
          }} />
      )
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }

    const { classes } = this.props;
    const { time } = this.state.meal;
    return (
      <div>
        <center>
          <h3 style={{textAlign:'center', fontSize: '4rem',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>Edit Meal </h3>
        </center>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div> 
          <h3 style={{textAlign:'center', color:'#FFFFFF', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
              Edit Meal Name:
            </h3>
            <form style={{margin:'40px', backgroundColor:'#00bba7'}}>
                  <input
                  placeholder='Meal Name' 
                  name='title'
                  value={this.state.meal.title} 
                  onChange={this.handleChange} 
                  style={{width: '40rem', height: '53px', fontSize: '18px', fontFamily:'Laila', letterSpacing:'4px', backgroundColor:'grey', color:'#FFFFFF', opacity:'0.4'}}/>
            </form>
          </div>
        </Grid>

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
        <Link to={{
          pathname: `/`,
          state: { }}}>
          <button positive style={{height: '53px', width: '8rem', marginTop: '50px', marginBottom: '30px', marginLeft: '18px', backgroundColor: '#00bba7'}} onClick={this.handleSubmit}>Submit</button>
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
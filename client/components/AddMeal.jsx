import React from 'react'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers'
import {addMealApi} from '../api/meals'
import {connect} from 'react-redux'
import {Redirect, withRouter, Route} from 'react-router-dom'

const styles = {
  grid: {
    width: '100%'
  }
}

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
    }
  }

  handleChange = (event) => {
    const updatemeal = {...this.state.meal}
    updatemeal[event.target.name] = event.target.value
    this.setState({meal: updatemeal})
  }

  handleSubmit = (event) => {
    return addMealApi(this.props.userId, this.state.meal)
      .then((mealId) => {
        this.setState({
          mealId
        })
      })
      .catch(({message}) => console.log("whoops"))
  }

  handleDateChange = date => {
    const dbDate = date.toISOString().slice(0, 19).replace('T', ' ')
    const updatemeal = {...this.state.meal}
    updatemeal.time = dbDate
    this.setState({meal: updatemeal})
  }

  render () {
    if (this.state.mealId > 0) {
      const meal = {...this.state.meal, id: this.state.mealId}
      return (
        <Redirect to={{
          pathname: `/addMood`,
          state: {meal}
        }} />
      )
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }

    const {classes} = this.props
    const {time} = this.state.meal
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div> 
          <h2>
              Meal Name:
            </h2>
            <form >
                  <input 
                  type='text'
                  name='title'
                  value={this.state.meal.title} 
                  onChange={this.handleChange} />
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
        <Grid container className={classes.grid} alignContent="center" justify="center">
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
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AddMeal)))

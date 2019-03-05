import React from 'react'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers'
import {Route, withRouter, Link, Redirect} from 'react-router-dom'
import MealDay from './MealDay'
import {connect} from 'react-redux'

const styles = {
  grid: {
    width: '100%',
  },
}

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: new Date().toISOString().slice(0, 10).replace('T', ' ')
    }
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date.toISOString().slice(0, 10).replace('T', ' ') });
  }

  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    const choosenDate = this.state.selectedDate
    const { classes } = this.props
    const {selectedDate} = this.state
    
    return (
      <div>
        <br/><br/>
        <br/><br/>
        <br/>
        <h4>Calendar</h4>
        <br></br><br/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} alignContent="center" justify="center" >
          <div style={{marginLeft: '20px'}}>
            <h3>Enter a date:</h3>
            </div>
            
            <DatePicker style={{marginLeft: '26px'}}
              margin="normal"
              label="Date picker"
              value={selectedDate}
              onChange={this.handleDateChange}/>
          </Grid>
          <br/>
          <Grid container className={classes.grid} alignContent="center" justify="center" >
            <Link style={{ textDecoration: 'none' }} 
              to={{
              pathname: '/day',
              state: {date: choosenDate}
            }}><button className="button1">Select</button>
            </Link>
          </Grid> 
        </MuiPickersUtilsProvider>
        <br/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Calendar)))

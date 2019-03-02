import React from 'react'
import {Button} from 'semantic-ui-react'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers'
import {Route, withRouter, Link} from 'react-router-dom'
import MealDay from './MealDay'

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

  renderRedirect = () => {
    return <Route exact path='/day'
            render={(props) => <MealDay {...props} handleDateChange={this.handleDateChange}/> } 
           />
  }

  render () {
    console.log(this.state)
    const choosenDate = this.state.selectedDate
    const objToString = JSON.stringify(choosenDate)
    console.log(objToString)
    const { classes } = this.props
    const {selectedDate} = this.state
    
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} alignContent="center" justify="center" >
            <h3 style={{textAlign: 'center', fontSize: '20px', margin: '40px', fontFamily: 'Laila', letterSpacing: '4px'}}
            >Enter a date:</h3>
            <DatePicker style={{marginLeft: '30px'}}
              margin="normal"
              label="Date picker"
              value={selectedDate}
              onChange={this.handleDateChange}/>
          </Grid>
          <Grid container className={classes.grid} alignContent="center" justify="center" >
    
            <Link 
            
              to={{
              pathname: '/mealday',
              state: {date: objToString}
            }}>Select</Link>
          </Grid> 
          
          
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Calendar))

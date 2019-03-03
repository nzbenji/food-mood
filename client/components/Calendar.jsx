import React from 'react'
import {Button} from 'semantic-ui-react'
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

  renderRedirect = () => {
    return <Route exact path='/day'
            render={(props) => <MealDay {...props} handleDateChange={this.handleDateChange}/> } 
           />
  }

  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    console.log(this.state)
    const choosenDate = this.state.selectedDate
    const { classes } = this.props
    const {selectedDate} = this.state
    
    return (
      <div>
           <br></br>
        <h1 style={{ fontSize:'4rem',fontFamily:'Laila', margin:'60px', textAlign:'center'}}>Calender</h1><br></br>
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
              state: {date: choosenDate}
            }}>Select</Link>
          </Grid> 
          
          
        </MuiPickersUtilsProvider>
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

import React from 'react'
import {Button} from 'semantic-ui-react'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers'
import {Route, withRouter} from 'react-router-dom'

import App from './App'

const styles = {
  grid: {
    width: '100%',
  },
}

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: new Date()
    }
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  }

  // renderRedirect = () => {
  //   return <Route exact path='/day'
  //           render={(props) => <Day {...props} handleDateChange={this.handleDateChange}/> } 
  //          />
  // }

  render () {
    const choosenDate = this.state.selectedDate
    const { classes } = this.props
    const { selectedDate } = this.state
    return (
      <div>
        <App choosenDate={choosenDate}/>
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
          
          <Button 
            positive 
            style={{height: '53px', width: '8rem', marginLeft: '18px'}}
            onClick={this.renderRedirect}
            >Submit</Button>
          </Grid>
          
        </MuiPickersUtilsProvider>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Calendar))

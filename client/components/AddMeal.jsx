import React from 'react'
import { Button } from 'semantic-ui-react'
import 'date-fns';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import {TextField} from '@material-ui/core'

const styles = {
    grid: {
      width: '100%',
    },
  };

class Meal extends React.Component {
    state = {
        // The first commit of Material-UI
        selectedDate: new Date(),
        notes: ''
      };
    
      handleDateChange = date => {
        this.setState({ selectedDate: date });
      };

      handleChange = event => {
        this.setState({ notes: event.target.value });
      }

    render() {
        console.log(this.state)
        const { classes } = this.props;
        const { selectedDate } = this.state;
        return (
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} alignContent="center" justify="center" >
                <div>
                <h3 style={{textAlign:'center', fontSize: '20px'}}>Enter a date:</h3>
                <DatePicker style={{marginLeft: '30px'}}
                    margin="normal"
                    label="Date picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                />
                
                </div>

                <Grid container className={classes.grid} alignContent="center" justify="center" ></Grid>
                <div>
                    <h3 style={{textAlign:'center', fontSize: '20px'}}>Enter a time: </h3>
                    <TimePicker
                        margin="normal"
                        label="Time picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}/>
                </div>
                </Grid>
                <Grid container className={classes.grid} alignContent="center" justify="center" >
                <div> 
                    <h3 style={{textAlign:'center', fontSize: '20px'}}>Notes:</h3> 
                    <TextField
                    name='notes' 
                    variant="outlined" 
                    value={this.state.notes} 
                    onChange={this.handleChange} 
                    style={{width: '40rem', height: '18rem'}}
                    /> 
                        <Button positive style={{height: '53px', width: '8rem', marginLeft: '18px'}}>Submit</Button>
                </div>
                </Grid>
            </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Meal);
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
      width: '60%',
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
                <Grid container className={classes.grid} justify="space-around" >
                <div>
                <h3>Date: 
                <DatePicker
                    margin="normal"
                    label="Date picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                />
                </h3>
                
                </div>
                </Grid>
                <Grid container className={classes.grid} justify="space-around" >
                <div>
                    <h3>Time:      
                    <TimePicker
                        margin="normal"
                        label="Time picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}/>
                    </h3>
                </div>
                </Grid>
                <Grid container className={classes.grid} justify="space-around" >
                <div> 
                    <h3>Notes: <TextField name='notes' variant="outlined" value={this.state.notes} onChange={this.handleChange} /> 
                        <Button positive>Submit</Button>
                    </h3> 
                </div>
                </Grid>
                
                
            </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Meal);
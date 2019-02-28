import React from 'react'
import { Button } from 'semantic-ui-react'
import 'date-fns';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { Form, TextArea } from 'semantic-ui-react'

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
                <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}
                >Enter a date:</h3>
                <DatePicker style={{marginLeft: '30px'}}
                    margin="normal"
                    label="Date picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                />
                
                </div>

                <Grid container className={classes.grid} alignContent="center" justify="center" ></Grid>
                <div>
                    <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>Enter a time: </h3>
                    <TimePicker style={{marginLeft: '30px'}}
                        margin="normal"
                        label="Time picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}/>
                </div>
                </Grid>
                <Grid container className={classes.grid} alignContent="center" justify="center" >
                <div> 
                    {/* <h3 style={{textAlign:'center', fontSize: '20px',margin:'40px'}}>Notes:</h3>  */}
                      <Form style={{margin:'40px'}}>
                            <TextArea 
                            placeholder='Tell us more' 
                            value={this.state.notes} 
                            onChange={this.handleChange} 
                            style={{width: '40rem', height: '53px', fontSize: '18px', fontFamily:'Laila', letterSpacing:'4px'}}/>
                            <Button positive style={{height: '53px', width: '8rem', marginLeft: '18px'}}>Submit</Button>
                        </Form>
                </div>
                </Grid>
            </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Meal);
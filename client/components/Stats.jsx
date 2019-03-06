import React from 'react'
import OverallStats from './OverallStats'
import SelectedStats from './SelectedStats'
import Grid from '@material-ui/core/Grid'

class Stats extends React.Component {
  state = {
    overall: false,
    selectedDates: false
  }
  render () {
    return (
      <div>
        <br/><br/>
        <h3>Mood meter</h3>
        <Grid container alignContent="center" justify="center" >
        
        <div>
          <div>
            <button 
                className='button1'
                onClick={() => this.setState(prevState => ({
                  overall: !prevState.overall,
                  selectedDates: false
                }))}
                
                >Select overall mood</button>
          </div>
          <div>
            <button 
                className='button1'
                onClick={() => this.setState(prevState => ({
                  selectedDates: !prevState.selectedDates,
                  overall: false
                }))}
                
                >Select mood based on dates</button>
          </div>
            {this.state.overall && <OverallStats /> }
            {this.state.selectedDates && <SelectedStats />}
        </div>
          
        </Grid>
        
        
      </div>
    )
  }
}

export default Stats

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
        <h1 style={{textAlgin:'center'}}>Mood meter</h1>
        <Grid container alignContent="center" justify="center" >
        
        <div>
          <div>
            <button 
                style={{width:'200px', height: '30px',padding: '5px', margin:'20px'}}
                onClick={() => this.setState(prevState => ({
                  overall: !prevState.overall,
                  selectedDates: false
                }))}
                
                >Select overall mood</button>
          </div>
          <div>
            <button 
                style={{width:'200px', height: '30px',padding: '5px', margin:'20px'}}
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

import React from 'react'
import OverallStats from './OverallStats'
import SelectedStats from './SelectedStats'
import Grid from '@material-ui/core/Grid'

class Stats extends React.Component {
  state = {
    overall: null,
    selectedDates: null
  }
  render () {
    return (
      <div>
        <h1 style={{textAlgin:'center'}}>Mood meter</h1>
        <Grid container alignContent="center" justify="center" >
        
        <div>
          <button 
              style={{display: 'inline-block', width:'200px', height: '30px',padding: '5px', margin:'20px'}}
              onClick={() => this.setState({overall:true})}>Select overall mood</button>
            <button 
              style={{display: 'inline-block', width:'200px', height: '30px',padding: '5px', margin:'20px'}}
              onClick={() => this.setState({selectedDates:true})}>Select mood based on dates</button>
            {this.state.overall && <OverallStats /> || <SelectedStats />}
        </div>
          
        </Grid>
        
        
      </div>
    )
  }
}

export default Stats

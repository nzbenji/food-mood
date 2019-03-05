import React from 'react'
import OverallStats from './OverallStats'
import SelectedStats from './SelectedStats'


class Stats extends React.Component {
  state = {
    overall: null,
    selectedDates: null
  }
  render () {
    console.log(this.state)
    return (
      <div>
        <h1>Stats</h1>
        <button onClick={() => this.setState({overall:true})}>Select overall mood</button>
        <button onClick={() => this.setState({selectedDates:true})}>Select mood based on dates</button>
        {this.state.overall && <OverallStats /> }
        {this.state.selectedDates && <SelectedStats />}
        
      </div>
    )
  }
}

export default Stats

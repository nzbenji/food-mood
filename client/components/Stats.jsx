import React, {Component} from 'react'

export class Stats extends Component {
  render () {
    return (
      <div>
        <h1 style={{fontSize: '4rem', fontFamily: 'Laila', textAlign: 'center'}}>Stats</h1><br></br>
        <img src='/images/Dummygraph.png' alt="dummygraph" style={{width: '560px', alignItems: 'center'}}/>
        <img src='/images/pieChart.png' alt="dummygraph" style={{width: '560px', alignItems: 'center'}}/>
      </div>
    )
  }
}

export default Stats

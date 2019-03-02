import Dummygraph from '../../server/public/Dummygraph'
import React, {Component} from 'react'

export class Stats extends Component {
  render () {
    return (
      <div>
        <img src={Dummygraph} alt="Dummygraph" />
      </div>
    )
  }
}

export default Stats

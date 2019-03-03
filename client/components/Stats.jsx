import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LabelSeries
} from 'react-vis'

export class Stats extends Component {
  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    const data = [
      {'y': 100, 'x': 'Mon'},
      {'y': 112, 'x': 'Tue'},
      {'y': 230, 'x': 'Wed'},
      {'y': 268, 'x': 'Thu'},
      {'y': 300, 'x': 'Fri'},
      {'y': 310, 'x': 'Sat'},
      {'y': 421, 'x': 'Sun'}
    ]

    const chartDomain = [0, 500]
    return (
      <div style={{paddingLeft: '80px'}}>

        <XYPlot
          xType="ordinal"
          width={800}
          height={500}
          yDomain={chartDomain}
        >
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            data={data}
          />
          <LabelSeries
            data={data.map(obj => {
              return {...obj, label: obj.y.toString()}
            })}
            labelAnchorX="middle"
            labelAnchorY="text-after-edge"
          />
        </XYPlot>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Stats))

{ /* <img src='/images/Dummygraph.png' alt="dummygraph" style={{width:'300px'}}/> */ }

import React from 'react'
import {Sector, Cell, PieChart, Pie} from 'recharts'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMealsAndMoods} from '../api/meals'

const width = 800
const chartValue = 87
const colorData = [{
  value: 33, // Meaning span is 0 to 33
  color: '#e74c3c'
}, {
  value: 33, // span 33 to 66
  color: '#f1c40f'
}, {
  value: 33, // span 66 to 99
  color: '#2ecc71'
}
]
// FINDS CURRENT SECTOR WHICH 'chartValue' IS SELECTED ON
// EITHER 0, 1, 2 POSITION
const currentSectorIndex = colorData.map((cur, index, arr) => {
  // GETS COLOR DATA VALUES AND ADDS ONTO EACH ONE 33, 66, 99
  const curMax = [...arr]
    .splice(0, index + 1)
    .reduce((a, b) => ({value: a.value + b.value}))
    .value
  return (chartValue > (curMax - cur.value)) && (chartValue <= curMax)
}).findIndex(cur => cur)

// sum colorData values (99)
const sumValues = colorData
  .map(cur => cur.value)
  .reduce((a, b) => a + b)

const arrowData = [
  {value: chartValue},
  {value: 0},
  {value: sumValues - chartValue}
]

const pieProps = {
  startAngle: 180,
  endAngle: 0,
  cx: width / 2, // 400
  cy: width / 2 // 400
}

const pieRadius = {
  innerRadius: (width / 2) * 0.35, // 140
  outerRadius: (width / 2) * 0.4 // 160
}
console.log(pieRadius)

const Arrow = ({cx, cy, midAngle, outerRadius}) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const mx = cx + (outerRadius + width * 0.03) * cos
  const my = cy + (outerRadius + width * 0.03) * sin
  return (
    <g>
      <circle cx={cx} cy={cy} r={width * 0.05} fill="#666" stroke="none"/>
      <path d={`M${cx},${cy}L${mx},${my}`} strokeWidth="6" stroke="#666" fill="none" strokeLinecap="round"/>
    </g>
  )
}

const ActiveSectorMark = ({cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill}) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius * 1.2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

class Stats extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: [],
      ranking: [],
      emoji: []
    }
  }

  componentDidMount () {
    getMealsAndMoods(this.props.userId)
      .then(data => {
        data.map(item => console.log(item))
      })
      .catch(err => new Error(err))
  }

  // emotionData = () => {

  // }

  render () {
    console.log(this.state)
    if (!this.props.loggedIn) {
      console.log('not logged in trying to redirect')
      return <Redirect to='/login' push={true} />
    }

    for (const data of this.props.emotions) {
      const id = data.id
      const ranking = data.ranking
      const emoji = data.emoji
      console.log(id, ranking, emoji)
    }
    return (
      <div style={{}}>
        <h1>gdgfdfgd</h1>
        <div style={{fontSize: '40px', textAlign: 'center'}}>Select a date</div>
        <div>
          <p style={{fontSize: '20px', bottom: '5rem'}}>😀</p>
          <PieChart width={width} height={(width / 2) + 30}>
            <Pie
              dataKey="value"
              activeIndex={currentSectorIndex}
              activeShape={ActiveSectorMark}
              data={colorData}
              fill="#8884d8"
              { ...pieRadius }
              { ...pieProps }
            >
              {
                colorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorData[index].color} />
                ))
              }
            </Pie>
            <Pie
              dataKey="value"
              stroke="none"
              activeIndex={1}
              activeShape={ Arrow }
              data={ arrowData }
              outerRadius={ pieRadius.innerRadius }
              fill="none"
              { ...pieProps }
            />
          </PieChart>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    emotions: state.emotions,
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Stats))

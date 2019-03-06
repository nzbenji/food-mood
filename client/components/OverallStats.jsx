import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import {Sector, Cell, PieChart, Pie} from 'recharts'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMealsAndMoods} from '../api/meals'

const ActiveSectorMark = ({cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill}) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius * 1}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

const WIDTH = 470

const Arrow = ({cx, cy, midAngle, outerRadius}) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const mx = cx + (outerRadius + WIDTH * 0.03) * cos
  const my = cy + (outerRadius + WIDTH * 0.03) * sin
  return (
    <g>
      <circle cx={cx} cy={cy} r={WIDTH * 0.05} fill="#666" stroke="none"/>
      <path d={`M${cx},${cy}L${mx},${my}`} strokeWidth="6" stroke="#666" fill="none" strokeLinecap="round"/>
    </g>
  )
}

const styles = {
  grid: {
    width: '100%',
  },
}

class Stats extends React.Component {
  state = {
    moods: [],
    error: false
  }

  componentDidMount () {
    getMealsAndMoods(this.props.userId)
      .then(data => {
        let moods = []
        data.map(meal => {moods = moods.concat(meal.moods)})
        this.setState({ moods})
      })
      .catch((err) => {
        if (err) this.setState({error: true})
      })
  }
  handleDateChange = date => {
    this.setState({ startDate: date.toISOString().slice(0, 10).replace('T', ' ') });
  }
  handleNextChange = date => {
    this.setState({ endDate: date.toISOString().slice(0, 10).replace('T', ' ') });
  }


  calculateRankValue () {
    let total = 0
    const moods = this.state.moods
        moods.forEach(mood => {
          const emotion = this.props.emotions.find(emotion =>emotion.id === mood.emotionId)
          if(emotion) {
            total += emotion.ranking
          }
        })
    const avg = total / moods.length
    return avg * 20
  }

  render () {
    if (this.state.error) {
      return <Redirect to='/error'/>
    }

    if (!this.props.loggedIn) {
      console.log('not logged in trying to redirect')
      return <Redirect to='/login' push={true} />
    }

    const width = 400
    const chartValue = this.calculateRankValue()
    const colorData = [{
      value: 30, // Meaning span is 0 to 33
      color: '#e74c3c'
    }, {
      value: 30, // span 33 to 66
      color: '#f1c40f'
    }, {
      value: 30, // span 66 to 99
      color: '#2ecc71'
    }]

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

    const currentSectorIndex = colorData.map((cur, index, arr) => {
      const curMax = [...arr]
        .splice(0, index + 1)
        .reduce((a, b) => ({value: a.value + b.value}))
        .value
      return (chartValue > (curMax - cur.value)) && (chartValue <= curMax)
    }).findIndex(cur => cur)

    return (
      <div>      
        <div>
        {this.state.moods.length > 0 ? 
          <Grid container alignContent="center" justify="center" >
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
          </Grid>
        : <h1>No moods in that date range</h1>}
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Stats)))

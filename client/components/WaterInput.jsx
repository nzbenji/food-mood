import React, {Component} from 'react'
import CircularProgressbar from 'react-circular-progressbar'

const styles = {
    grid: {
      width: '100%',
    },
  }

class WaterInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      age: 0,
      weight: 0,
      exercise: 0,
      cupsDrank: 0,
      cupsRequired: 0,
      percentage: 0

    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const {age, weight, exercise} = this.state
    const calculateWeightWater = weight / 30 * 4.22
    const calculateExerciseWater = exercise * 4.22
    const totalCups = Math.floor(calculateWeightWater + calculateExerciseWater)
    this.setState({cupsRequired: totalCups})
    return <h3>You should drink {totalCups} today</h3>
  }

  addOne = (event) => {
    event.preventDefault()
    this.calculatePercentage()
      this.setState({
        cupsDrank: this.state.cupsDrank + 1
      })
  }

  calculatePercentage = () => {
    const {cupsDrank, cupsRequired} = this.state
    const percentage = cupsDrank / cupsRequired * 100
    if(percentage <= 100) {
        this.setState({percentage})
    }
    
  }


  render () {
    console.log(this.state)
    console.log(this.state.percentage)
    return (
      <div>
        <center>
          <h1>Water intake</h1>
          <form >
            <label >Weight in Kgs
            <input style={{display:'block'}}
              type="text" 
              name="weight" 
              onChange={this.handleChange}/></label>

            <label>Exercise in hours
              <input style={{display:'block'}}
              type="text" 
              name="exercise"
              onChange={this.handleChange}/></label>

            <label>Age:
            <input style={{display:'block'}}
              type="text" 
              name="age" 
              onChange={this.handleChange}/></label>

            <button onClick={this.handleSubmit}>Submit</button>
            <button onClick={this.addOne}>Add cup</button>

            <div style={{ marginTop: '40px', width: '400px'}}>
                <CircularProgressbar
                    percentage={Math.round(this.state.percentage)}
                    text={`${Math.round(this.state.percentage)}%`}
                    background
                    backgroundPadding={6}
                    styles={{ textAlign:'center',
                    background: {
                        fill: '#3e98c7',
                    },
                    text: {
                        fill: '#fff',
                    },
                    path: {
                        stroke: '#fff',
                    },
                    trail: { stroke: 'transparent' },
                    }}
                />
                
            </div>
          </form>
        </center>
      </div>
    )
  }
}
export default WaterInput

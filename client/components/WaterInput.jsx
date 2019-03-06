import React, {Component} from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {updateWater} from '../actions/water'

class WaterInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    const water = {...this.state, cupsRequired: Math.floor(calculateWeightWater + calculateExerciseWater) + 1}
    this.props.dispatch(updateWater(water))
  }

  addOne = (event) => {
    event.preventDefault()
    const {cupsDrank, cupsRequired} = this.props.water
    const newCupsDrank = cupsDrank + 1
    let percentage = newCupsDrank / cupsRequired * 100
    if (percentage>100) percentage = 100
    const water = {...this.props.water, cupsDrank: newCupsDrank, percentage}
    this.props.dispatch(updateWater(water))
  }

  render () {
    if (this.props.water.weight <= 0) {
      return (
        <div>
          <center>
            <h1>Calculate water intake</h1>
            <form >
              <label >
                <TextField type='text' placeholder="weight in kgs"
                  name='weight' variant="outlined" autoComplete="off"
                  style={{textAlign: 'right', fontSize: '35px', fontWeight: '600', letterSpacing: 10}}
                  onChange={this.handleChange} /></label>

              <label>
                <TextField type='text' placeholder="exercise in hours"
                  name='exercise' variant="outlined" autoComplete="off"
                  style={{textAlign: 'right', fontSize: '40px', fontWeight: '600', letterSpacing: '10px'}}
                  onChange={this.handleChange} />
              </label>

              <div>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}
                  style={{width: '238px',
                    marginTop: '8px',
                    fontWeight: '800',
                    fontSize: '14px',
                    letterSpacing: '7px',
                    backgroundColor: 'rgb(247, 164, 88)'}}
                >
                Submit
                </Button>
              </div>

            </form>
          </center>
        </div>
      )
    } else {
      return (
        <div>
          <center>
            <h1>Calculate water intake</h1>
            <div>
              {this.props.water.cupsRequired !== 0 && <h3>You require {this.props.water.cupsRequired} glasses today</h3>}
              {this.props.water.cupsRequired !== 0 && <Button variant="contained" color="primary" onClick={this.addOne}
                style={{width: '238px',
                  marginTop: '8px',
                  fontWeight: '800',
                  fontSize: '14px',
                  letterSpacing: '7px',
                  backgroundColor: 'rgb(247, 164, 88)'}}
              >
                Add a cup of water
              </Button>}

            </div>

            <div style={{marginTop: '40px', width: '200px'}}>
              <CircularProgressbar
                percentage={Math.round(this.props.water.percentage)}
                text={`${Math.round(this.props.water.percentage)}%`}
                background
                backgroundPadding={6}
                styles={{position: 'relative',
                  background: {
                    fill: '#3e98c7'
                  },
                  text: {
                    fill: '#fff'
                  },
                  path: {
                    stroke: '#fff'
                  },
                  trail: {stroke: 'transparent'}
                }}
              />
              <div>
                <br/>
                <br/>
                <br/>
              </div>

            </div>
          </center>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    water: state.water
  }
}

export default connect(mapStateToProps)(WaterInput)

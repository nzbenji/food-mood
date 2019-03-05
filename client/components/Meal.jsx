import React from 'react'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {getMealMoodsApi} from '../api/moods'
import Mood from './Mood'

class Meal extends React.Component {
  constructor (props) {
    super(props)
    let meal = {}
    if (props.location.state) meal = props.location.state.meal
    this.state = {
      meal: meal
    }
  }

  componentDidMount () {
    getMealMoodsApi(this.state.meal.id)
      .then((moods) => {
        const meal = {...this.state.meal, moods: moods}
        this.setState({meal: meal})
      })
      .catch(err => new Error(err))
  }

  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    if (!this.props.location.state) {
      return <Redirect to='/'/>
    }
    const meal = this.props.location.state.meal

    const date = meal.time
    const format = new Date(date).toDateString()
    const month = format.slice(3, 7)
    const day = format.slice(8, 10)
    return (
      <div>
        <Grid container alignContent="center" justify="center">
          <h1 style={{fontFamily: 'Laila'}}>{`${meal.title} ${month}${day}`}</h1>
        </Grid>
        <h3 style={{paddingTop: '20px', fontSize: '20px', letterSpacing: '4px'}}>Moods</h3>
        <ul>
          {this.state.meal.moods && this.state.meal.moods.map(mood => {
            return (
              <li key={mood.id} style={{fontSize: '40px', listStyle: 'none', margin: '40px'}}>
                <Mood mood={mood} meal={meal}/>
              </li>
            )
          })}
        </ul>
        <div>
          <Link to={{
            pathname: `/addmood`,
            state: {meal: meal}}}>
            <button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center', backgroundColor: '#0ba8bc'}}>Add Mood to Last Meal</button>
          </Link>
          <Link to={{
            pathname: `/editmeal`,
            state: {meal: meal}}}>
            <button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center', backgroundColor: '#0ba8bc'}}>
                  Edit Meal</button>
          </Link>
          <Link to={{
            pathname: `/deletemeal`,
            state: {meal: meal}}}>
            <button positive style={{height: '53px', width: '8rem', position: 'relative', alignSelf: 'center', backgroundColor: '#0ba8bc'}}>
                  Delete Meal</button>
          </Link>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    emotions: state.emotions,
    loggedIn: state.auth.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Meal))

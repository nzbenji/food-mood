import React from 'react'
import Grid from '@material-ui/core/Grid'
import {getMealsAndMoods} from '../api/meals'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'

class MealDay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      meals: []
    }
  }

  componentDidMount () {
    getMealsAndMoods(this.props.userId)
      .then((meals) => {
        meals = meals.filter(meal => {
          // console.log('mealtime', meal.time.slice(0, 10))
          // console.log('props', this.props.location.state.date.slice(0, 10))
          return meal.time.slice(0, 10) === this.props.location.state.date.slice(0, 10)
        })
        this.setState({meals})
      })
      .catch(err => new Error(err))
  }

  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    const date = this.props.location.state.date
    const format = new Date(date).toDateString()
    const month = format.slice(3, 7)
    const day = format.slice(8, 10)
    return (
      <div>
        <Grid container alignContent="center" justify="center">
          <h1 style={{fontFamily: 'Laila'}}>Food eaten on { month}  {day}</h1>
        </Grid>

        <Grid container alignContent="center" justify="center">
          <ul style={{listStyle: 'none'}}>
            {this.state.meals.length > 0 && this.state.meals.map(meal => {
              return (
                <Link key={meal.id}
                  to={{
                    pathname: `/addMood/${meal.id}`,
                    state: {meal}
                  }}>
                  <div style={{fontFamily: 'Laila', display: 'inline-block', textAlign: 'center'}}>
                    <li style={{listStyle: 'none', display: 'inline-block', margin: '40px'}}>
                      <ul style={{listStyle: 'none'}}>
                        <li>
                          {meal.title.charAt(0).toUpperCase() + meal.title.slice(1)}</li>
                        <li>{meal.time.slice(11, 16)}</li>
                        <h3 style={{paddingTop: '20px', fontSize: '20px', letterSpacing: '4px'}}>Selected mood</h3>
                        <ul>
                          {meal.moods.map(mood => {
                            return (
                              <li
                                key={mood.id}
                                style={{fontSize: '40px', listStyle: 'none', margin: '40px'}}
                              >
                                {this.props.emotions.find(emotion => emotion.id === mood.emotionId).emoji}
                                {mood.time.slice(11, 16)}
                              </li>
                            )
                          })}
                        </ul>
                      </ul>
                    </li>
                  </div>
                </Link>
              )
            })}
          </ul>

        </Grid>

        <div>
          <Link
            to='/addmeal'
            style={{textDecoration: 'none', fontSize: '20px', padding: '50px', fontFamily: 'Laila'}}
          >Add a meal</Link>
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

export default withRouter(connect(mapStateToProps)(MealDay))

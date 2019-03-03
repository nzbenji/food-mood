import React from 'react'
import {Button} from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid'
import {getMealsAndMoods} from '../api/meals'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class MealDay extends React.Component {
  state = {
    meals: []
  }
  componentDidMount () {
    console.log('trying to mount')
    getMealsAndMoods(this.props.userId)
      .then((meals) => {
        console.log(meals)
        meals = meals.filter(meal => {
          console.log('mealstime', meal.time.slice(0, 10))
          console.log('props.locat', this.props.location.state.date.slice(1, 11))
          return meal.time.slice(0, 10) === this.props.location.state.date.slice(1, 11)
        })
        this.setState({meals})
      })
      .catch(err => new Error(err))
  }

  render () {
    const date = this.props.location.state.date
    const format = new Date(date).toDateString()
    const month = format.slice(3, 7)
    const day = format.slice(8, 10)
    console.log(this.state.meals)
    return (
      <div>
        <Grid container alignContent="center" justify="center">
          <h1>Food eaten on..</h1>
        </Grid>

        <Grid container alignContent="center" justify="center">
        {/* <ul>
        {this.state.meals.length > 0 && this.state.meals.map(meal => {
          return (
            // <Link key={meal.id}>
              <li>
                {meal.title}
                <li>
                {meal.time.slice(11, 16)}
                </li>
                {/* {meal.moods.map(mood => {
                  return (
                    <li key={mood.id}>
                        {this.props.emotions.find(emotion => emotion.id === mood.emotionId).emoji}
                        {mood.time.slice(11, 16)}
                    </li>
                  )
                })} 
              </li>
            </Link>
          )
        })}
        </ul> */}
          
        </Grid>

        <div>
          <Button
            positive
            style={{height: '10%', position: 'relative', bottom: '0px'}}
          >Add a meal</Button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    emotions: state.emotions
  }
}

export default connect(mapStateToProps)(MealDay)

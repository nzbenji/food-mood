import React from 'react'
import Grid from '@material-ui/core/Grid'
import {getMealsApi} from '../api/meals'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'

const addIcon = '/images/whiteplus.png'
const blackAdd = '/images/add-icon.svg'

class MealDay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      meals: [],
      error: false
    }
  }

  componentDidMount () {
    getMealsApi(this.props.userId)
      .then((meals) => {
        meals = meals.filter(meal => {
          return meal.time.slice(0, 10) === this.props.location.state.date.slice(0, 10)
        })
        this.setState({meals})
      })
      .catch((err) => {
        if (err) this.setState({error: true})
      })
  }

  render () {
    if (this.state.error) {
      return <Redirect to='/error'/>
    }

    if (!this.props.location.state) {
      return <Redirect to='/'/>
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    const date = this.props.location.state.date
    const format = new Date(date).toDateString()
    const month = format.slice(3, 7)
    const day = format.slice(8, 10)
    return (
      <div>
        <br/><br/>
        <Grid container alignContent="center" justify="center">
          <h3>Food eaten on { month}  {day}</h3>
        </Grid>
        <br/>
        <Grid container alignContent="center" justify="center">
          <ul>
            {this.state.meals.length > 0 && this.state.meals.map(meal => {
              return (
                <Link style={{textDecoration: 'none'}} key={meal.id}
                  to={{
                    pathname: '/meal',
                    state: {meal}
                  }}>
                  <div>
                    <li>
                      <ul className='mealDay'>
                        <li>
                          <h3> {meal.title.charAt(0).toUpperCase() + meal.title.slice(1)}</h3></li>
                        <li><h1>{meal.time.slice(11, 16)}</h1></li>
                      </ul>
                    </li>
                  </div>
                  <br/>
                </Link>
              )
            })}
          </ul>

        </Grid>

        <div>
          <Link to='/addmeal'><img className="mealdayButton" src={blackAdd}/></Link>
        </div>
        <br/><br/>
        <br/><br/>
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

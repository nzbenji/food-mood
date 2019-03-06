import React from 'react'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'
import moment from 'moment'

import {getMealMoodsApi} from '../api/moods'
import Mood from './Mood'

const blueEditIcon = './images/blueedit.png'
const blueDeleteIcon = './images/bluedelete.png'

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
    const year = '2019'

    const datetime = moment(meal.time)
    const date2 = datetime.format('dddd, MMMM Do YYYY')

    return (
      <div>
        <br/>
        <div>
          <Grid container alignContent="center" justify="center">
            <h3> You ate:<br></br><h3><u>{`${meal.title}`}</u></h3><br></br>on {`${date2}`} </h3>
          </Grid>
        </div>
        <Link style={{textDecoration: 'none'}} to={{
            pathname: `/editmeal`,
            state: {meal: meal}}}>
           <img className="blue-edit-icon" src={blueEditIcon}/>
          </Link>
          <Link style={{textDecoration: 'none'}} to={{
            pathname: `/deletemeal`,
            state: {meal: meal}}}>
            <img className="blue-delete-icon" src={blueDeleteIcon}/>
          </Link>
        <div>
          <ul>
            {this.state.meal.moods && this.state.meal.moods.map(mood => {
              return (
                <li key={mood.id}>
                  <h3><Mood mood={mood} meal={meal}/></h3>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <Link style={{textDecoration: 'none'}} to={{
            pathname: `/addmood`,
            state: {meal: meal}}}>
            <button className='button1'>
            Add Mood to Last Meal
            </button>
          </Link>
        </div>
        <br/><br/><br/>
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

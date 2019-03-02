import React from 'react'
import {Button} from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid'

class MealDay extends React.Component {

  render () {
    const date = this.props.location.state.date
    const format = new Date(date).toDateString()
    const month = format.slice(3, 7)
    const day = format.slice(8, 10)
    console.log(day, month)
    return (
      <div>
        <Grid container alignContent="center" justify="center">
          <h1>Food eaten on..</h1>
        </Grid>

        <Grid container alignContent="center" justify="center">
          <h1>{day } { month} </h1>
        </Grid>

        <Grid container alignContent="center" justify="center">
          <div>
            <ul>
              <li style={{margin: '100px'}}
              >Avocado on toast <label style={{fontSize: '100px'}}>🥴</label>
                <h3>09.30</h3>
              </li>
              <li>Pizza <label style={{fontSize: '100px'}}>😪</label>
                <h3>12.50</h3>
              </li>
            </ul>
          </div>

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

export default MealDay

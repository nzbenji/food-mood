import React from 'react'
import {Button} from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid'

const MealDay = (props) => {
  return (
    <div>

      <Grid container alignContent="center" justify="center">
        <h1>On this day you had..</h1>
      </Grid>

      <Grid container alignContent="center" justify="center">
        <h1>21 March</h1>
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

export default MealDay

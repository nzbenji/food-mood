import React from 'react'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../server/public/css/dashboard.css'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <br></br>
        <h1 style={{fontSize: '4rem', fontFamily: 'Laila', textAlign: 'center'}}>Dashboard</h1><br></br>
        <div>
          <Link to='/addmeal'>
            <Button
              style={{
                textAlign: 'center',
                padding: '2rem',
                width: '24rem',
                margin: '20px',
                height: '7rem',
                fontSize: '3rem',
                fontWeight: '300',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                display: 'flex',
                backgroundColor: '#00bba7',
                fontFamily: 'Laila'
              }}
              positive
            >Add Meal</Button></Link>
        </div>
        <div>
          <Link to='/reaction'>
            <Button
              style={{
                width: '38rem',
                margin: '20px',
                height: '7rem',
                fontSize: '3rem',
                fontWeight: '300',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                backgroundColor: '#00bba7',
                fontFamily: 'Laila'
              }}
              positive>Add Reaction</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Dashboard

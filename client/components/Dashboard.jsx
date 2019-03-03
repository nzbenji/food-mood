import React from 'react'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../server/public/css/dashboard.css'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <br></br>
        <h1 style={{fontSize:'4rem'}}>Dashboard</h1><br></br>
        <div>
          <Link to='/addmeal'>
            <Button
              textalign="center"
              style={{
                width: '40rem',
                margin: '20px',
                height: '7rem',
                fontSize: '3rem',
                fontWeight: '300',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                display: 'flex',
                backgroundColor: '#00bba7'
              }}
              positive
            >Add Meal</Button></Link>
        </div>
        <div>
          <Link to='/reaction'>
            <Button
              style={{
                width: '40rem',
                margin: '20px',
                height: '7rem',
                fontSize: '3rem',
                fontWeight: '300',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                backgroundColor: '#00bba7'
              }}
              positive>Add Reaction</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Dashboard

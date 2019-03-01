import React from 'react'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../../server/public/css/dashboard.css'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
          <Link to='/meal'><Button
            textAlign="center"
            style={{
              width: '60rem',
              margin: '20px',
              height: '8rem',
              fontSize: '3rem',
              fontWeight: '800',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              display: 'flex'
            }}
            positive
          >Add Meal</Button></Link>
        </div>
        <div>
          <Link to='/reaction'>
            <Button
              style={{
                width: '60rem',
                margin: '20px',
                height: '8rem',
                fontSize: '3rem',
                fontWeight: '800',
                letterSpacing: '5px',
                textTransform: 'uppercase'
              }}
              positive>Add Reaction</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Dashboard

import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const dashboardIcon = '/images/dashboard-icon.png'
const calendarIcon = '/images/calendar-icon.png'
const addIcon = '/images/add-icon.svg'
const statsIcon = '/images/stats-icon.png'
const settingsIcon = './images/settings-icon.png'

class NavBar extends React.Component {
  render () {
    return (
      <div className='nav-div'>
        <ul className="nav-ul">
          <li className="nav-li"><Link to="/"><img className="icon" src={dashboardIcon}/></Link></li>
          <li className="nav-li"><Link to="/calendar"><img className="icon" src={calendarIcon}/></Link></li>
          <li className="nav-li"><Link to="/addmeal"><img className="icon" src={addIcon}/></Link></li>
          <li className="nav-li"><Link to="/stats"><img className="icon" src={statsIcon}/></Link></li>
          <li className="nav-li"><Link to="/settings"><img className="icon" src={settingsIcon}/></Link></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(NavBar)

import React from 'react'
import {GoCalendar} from 'react-icons/go'
import {GoHome} from 'react-icons/go'
import {IoIosAdd} from 'react-icons/io'
import {TiChartLine} from 'react-icons/ti'
import {MdSettings} from 'react-icons/md'

class NavBar extends React.Component {
  render () {
    return (
      <div>
        <h3><GoHome />Dashboard</h3>
        <h3><GoCalendar />Calender</h3>
        <h3><IoIosAdd />Add Meal</h3>
        <h3><TiChartLine />Stats</h3>
        <h3><MdSettings />Settings</h3>
      </div>
    )
  }
}

export default NavBar

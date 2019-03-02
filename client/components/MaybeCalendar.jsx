import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import request from 'superagent'
import { withRouter } from "react-router-dom";

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends React.Component {
  state = {
    date: []
  }

  //POPULATE THE CALENDAR WITH DATA FROM OUR API
  // componentDidMount () {
  //   let self = this
  //   request.get('localhost:3000')
  //     .then(res) => {
  //       console.log(res.data)
  //       let meals = res.data
  //       meals.map(meal => {
  //         console.log(meal)
  //       })
  //       .catch(err => console.log(err))
  //     }
  // }

  selectDate = selectedDate => {
    this.setState({
      date: selectedDate
    })
  }

  renderRedirect = () => {
    this.props.history.push("/day")
  }

  render () {
    console.log(this.state.date.start)
    const dummyEvents = [
      {
        allDay: true,
        end: new Date(),
        start: new Date(),
        title: 'CHICKEN SAMWICH'
      },
      {
        date: new Date('March 11, 2019 12:16:00'),
        title: 'PIE'
      },
      {
        allDay: true,
        date: new Date('March 12, 2019 13:13:00'),
        title: 'PIIIIIZAAAAA'
      },
      {
        allDay: true,
        date: new Date('March 12, 2019 13:13:00'),
        title: 'ANOTHER ONE'
      }
    ]
    return (
      <div style={{height: '100rem'}}>
        <BigCalendar
          selectable
          onSelectSlot={this.selectDate}
          defaultDate={new Date()}
          events={dummyEvents}
          startAccessor="start"
          endAccessor="end"
          views={['month','day']}
          localizer={localizer}
          onClick={this.renderRedirect}
        />
      </div>
    )
  }
}
//export default Calendar
export default withRouter(Calendar);
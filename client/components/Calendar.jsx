import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends React.Component {
  state = {
    date: []
  }
  componentDidMount () {
    // Fetch events from database here
  }

  selectDate = selectedDate => {
    this.setState({
      date: selectedDate
    })
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
        allDay: true,
        end: new Date('March 10, 2019 11:13:00'),
        start: new Date('March 11, 2019 12:16:00'),
        title: 'PIE'
      },
      {
        allDay: true,
        end: new Date('March 11, 2019 12:13:00'),
        start: new Date('March 12, 2019 13:13:00'),
        title: 'PIIIIIZAAAAA'
      },
      {
        allDay: true,
        end: new Date('March 11, 2019 12:13:00'),
        start: new Date('March 12, 2019 13:13:00'),
        title: 'ANOTHER ONE'
      }
    ]
    return (
      <div style={{height: '100rem'}}>
        <BigCalendar
          selectable
          onSelectSlot={this.selectDate}
          events={dummyEvents}
          startAccessor="start"
          endAccessor="end"
          localizer={localizer}
        />
      </div>
    )
  }
}
export default Calendar

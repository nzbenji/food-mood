import React from 'react'

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {deleteMoodApi} from '../api/moods'
import {getEmoji} from '../utils/emojis'

const styles = {
    grid: {
      width: '100%',
    },
  };

class DeleteMood extends React.Component {

  constructor (props) {
    super(props)
    if(props.location.state) {
      this.state = {
        mood: props.location.state.mood,
        submitted: false,
        error: false
      }
    }
  }

  handleSubmit = (event) => {
    deleteMoodApi(this.state.mood)
      .then(() => {
        this.setState({submitted:true})
      })
      .catch((err) => {
        if (err) this.setState({error: true})
      })
    event.preventDefault()
  }

  render() {

    if (this.state.error) {
      return <Redirect to='/error'/>
    }
    
    if(!this.props.location.state) {
      return <Redirect to='/'/>
    }
  
    if (this.state.submitted){
      return <Redirect to ={{
        pathname: '/meal',
        state: {meal: this.props.location.state.meal}
      }}/>
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/login'/>
    }
    const { classes } = this.props
    const { time } = this.state.mood
    
    return (
      <div>
        <br/><br/><br/><br/><br/>
          <h2>
            Are you sure you want to delete this mood for {` ${this.props.location.state.meal.title}`}?
          </h2>
          
          <h3 style={{fontSize: '40px', fontFamily:'Laila', letterSpacing:'4px'}}>
            {getEmoji(this.props.emotions, this.state.mood.emotion_id)}
          </h3>
          {/* <br/> */}
          <h3>{this.state.mood.notes}</h3>
          <br/>
          <h3>{this.state.mood.time}</h3>
        
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <button className='button1' onClick={this.handleSubmit}>
            Delete
          </button>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userId: state.auth.userId,
    loggedIn: state.auth.loggedIn,
    emotions: state.emotions
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(DeleteMood)))

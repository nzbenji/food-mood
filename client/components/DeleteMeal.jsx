import React from 'react'

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {deleteMealApi} from '../api/meals'

const styles = {
    grid: {
      width: '100%',
    },
  };

class DeleteMeal extends React.Component {

  constructor (props) {
    super(props)
    if(props.location.state) {
      const meal = props.location.state.meal
      this.state = {
        meal: meal,
        submitted: false,
        error: false
      }
    }
  }

  handleSubmit = (event) => {
    deleteMealApi(this.state.meal)
      .then(() => {
        this.setState({submitted:true})
      })
      .catch((err) => {
        if (err) this.setSate({error: true})
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
        pathname: '/day',
        state: {date: this.state.meal.time}
      }}/>
    }

    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
    const { classes } = this.props
    
    return (
      <div>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <center>
          <h3 style={{fontSize: '20px'}}>
            Are you sure you want to delete {` ${this.state.meal.title}`}?
          </h3>
          <br/>
          <h3>{this.state.meal.time}</h3>
          <br></br>
        </center>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(DeleteMeal)))

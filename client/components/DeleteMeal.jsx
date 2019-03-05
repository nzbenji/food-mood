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
        submitted: false
      }
    }
  }

  handleSubmit = (event) => {
    deleteMealApi(this.state.meal)
      .then(() => {
        this.setState({submitted:true})
      })
      .catch(err => console.log('whoops'))
    event.preventDefault()
  }

  render() {

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
        <center>
          <h3 style={{textAlign:'center', fontSize: '40px',margin:'40px', fontFamily:'Laila', letterSpacing:'4px'}}>
            Are you sure you want to delete {` ${this.state.meal.title}`}?
          </h3>
          <h4>{this.state.meal.time}</h4>
          <br></br>
        </center>
        <Grid container className={classes.grid} alignContent="center" justify="center" >
          <button positive style={{height: '53px', width: '8rem', marginTop:'50px', marginBottom:'40px', marginLeft: '18px'}} onClick={this.handleSubmit}>
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

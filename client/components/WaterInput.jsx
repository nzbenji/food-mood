import React from 'react'
import React, { Component } from 'react'
const convert = require('convert-units')

 
 // Write a component that calculates how much water you should drink on a daily basis 
 // We need an input for height, weight and age to do this

 export class WaterInput extends Component {
     constructor(props) {
         super(props);
         this.state = {value: ''};

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = handleSubmit.bind(this);
     }

     handleChange(event) {
        this.setState({value: event.target.value});
      }
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
      
   render() {
     return (
       <div>
           <center>
            <h1>Water intake</h1><br></br><br></br>
                <form>
                    <label>
                        Height:
                        <input type="text" name="height" value="" />
                    </label>
                    <label>
                        Weight:
                        <input type="text" name="weight" value="" />
                    </label>
                    <label>
                        Age:
                        <input type="text" name="age" value="" />
                    </label>
                        <input type="submit" value="Submit" />
                </form>
            </center>
       </div>
     )
   }
 }
 
 export default WaterInput
 
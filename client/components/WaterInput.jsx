import React from 'react'
import React, { Component } from 'react'
const convert = require('convert-units')

 
 // Write a component that calculates how much water you should drink on a daily basis 
 // We need an input for height, weight and age to do this
 export class WaterInput extends Component {
   render() {
     return (
       <div>
           <center>
         <h1>Water intake</h1>
         <h4>convert(68).from('kg').to('lb')</h4>
         </center>
       </div>
     )
   }
 }
 
 export default WaterInput
 
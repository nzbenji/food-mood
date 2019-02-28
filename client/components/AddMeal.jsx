import React, {Component} from 'react'

export class AddMeal extends Component {
  render () {
    return (
      <div>
        <form>
          <label>
          Add meal
            <input type="text" name="Notes" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddMeal

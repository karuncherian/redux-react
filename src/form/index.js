import React from "react";
import { buttonClicked } from "../actions";
import {Link} from 'react-router-dom';

export const mapDispatchToProps = dispatch => ({
  buttonClicked: () =>
    dispatch(buttonClicked(
    document.getElementById("firstName").value,
    document.getElementById("lastName").value,
    document.getElementById("age").value,
    document.getElementById("place").value)
    )
});

export class Form extends React.Component {
  render() {
    return (
      <div>
        <h2>Contact Form</h2>
        First Name: <input type="text" className="firstName" id="firstName" placeholder="First Name..."/><br/>
        Last Name: <input type="text" className="lastName" id="lastName" placeholder="Last Name..."/><br/>
        Age: <input type="number" className="age" id="age" placeholder="Age ..."/><br/>
        Place: <input type="text" className="place" id="place" placeholder="Place..." /> 
        <Link to="/view"><button onClick={this.props.buttonClicked}>Submit</button></Link>
      </div>
    )
  }
}

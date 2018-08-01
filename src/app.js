import React from "react";
import { connect } from "react-redux";
import { buttonClicked } from "./actions";

const mapStateToProps = state => ({
  FirstName: state.example.FirstName,
  LastName: state.example.LastName,
  Age: state.example.Age,
  Place: state.example.Place
});

const mapDispatchToProps = dispatch => ({
  buttonClicked: () => dispatch(buttonClicked(
    document.getElementById("firstname").value,
    document.getElementById("lastname").value,
    document.getElementById("age").value,
    document.getElementById("place").value)
    )
});

class Example extends React.Component {
  render() {
    return (
      <div>
        <h2>Contact Form</h2>
        First Name: <input type="text" className="firstname" id="firstname" placeholder="First Name..."/><br/>
        Last Name: <input type="text" className="lastname" id="lastname" placeholder="Last Name..."/><br/>
        Age: <input type="number" className="age" id="age" placeholder="Age ..."/><br/>
        Place: <input type="text" className="place" id="place" placeholder="Place..." /> 
        <button onClick={this.props.buttonClicked}>Submit</button>
        <div>{"Name: " + this.props.FirstName + " " + this.props.LastName}</div>
        <div>{"Age: " + this.props.Age}</div>
        <div>{"Place: " + this.props.Place}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);

import React from "react";
import { connect } from "react-redux";
import { buttonClicked } from "./actions";

const mapStateToProps = state => ({
  firstName: state.reducer.FirstName,
  lastName: state.reducer.LastName,
  age: state.reducer.Age,
  place: state.reducer.Place
});

const mapDispatchToProps = dispatch => ({
  buttonClicked: () => dispatch(buttonClicked(
    document.getElementById("firstName").value,
    document.getElementById("lastName").value,
    document.getElementById("age").value,
    document.getElementById("place").value)
    )
});

class Form extends React.Component {
  render() {
    return (
      <div>
        <h2>Contact Form</h2>
        First Name: <input type="text" className="firstName" id="firstName" placeholder="First Name..."/><br/>
        Last Name: <input type="text" className="lastName" id="lastName" placeholder="Last Name..."/><br/>
        Age: <input type="number" className="age" id="age" placeholder="Age ..."/><br/>
        Place: <input type="text" className="place" id="place" placeholder="Place..." /> 
        <button onClick={this.props.buttonClicked}>Submit</button>
        <div>{"Name: " + this.props.firstName + " " + this.props.lastName}</div>
        <div>{"Age: " + this.props.age}</div>
        <div>{"Place: " + this.props.place}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);

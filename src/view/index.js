import React from "react";
import {Link} from 'react-router-dom';


export const mapStateToProps = state => ({
  firstName: state.reducer.FirstName,
  lastName: state.reducer.LastName,
  age: state.reducer.Age,
  place: state.reducer.Place
});

export class View extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <div>{"Name: " + this.props.firstName + " " + this.props.lastName}</div>
        <div>{"Age: " + this.props.age}</div>
        <div>{"Place: " + this.props.place}</div>
      </div>
    )
  }
}
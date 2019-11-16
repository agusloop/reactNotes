import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class DatePickers extends Component {
  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
    console.log(date);
  };

  render() {
    return (
      <div className="container">
        <div className="card bg-dark text-white">
          <div className="card-img-overlay">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              locale="es-ES"
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>
      </div>
    );
  }
}

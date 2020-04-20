import React, { Component } from "react";
import Moment from "moment";

class DateFilter extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(event) {
    this.props.onDateChange(event);
    //console.log("date", event.target.value);
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  render() {
    const { name, date, icon } = this.props;

    return (
      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input"
            type="date"
            onChange={this.handleDateChange}
            value={Moment(date).format("YYYY-MM-DD")}
            name={name}
          />
          <span className="icon is-small is-left">
            <i className={`fas fa-${icon}`} />
          </span>
        </div>
      </div>
    );
  }
}

export default DateFilter;

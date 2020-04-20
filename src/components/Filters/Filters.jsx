import React, { Component } from "react";
import DateFilter from "./DateFilter";
import OptionsFilter from "./OptionsFilter";
import country from "../../utils/country";
import price from "../../utils/price";
import size from "../../utils/size";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  handleOptionChange(event) {
    let payload = this.props.filters;
    payload[event.target.name] = event.target.value;
    this.props.onFilterChange(payload);
  }

  render() {
    const { filters } = this.props;
    return (
      <nav className="navbar is-info" style={{ justifyContent: "center" }}>
        <div className="navbar-item">
          <DateFilter
            date={filters.dateFrom}
            name="dateFrom"
            onDateChange={this.handleOptionChange}
            icon="sign-in-alt"
          />
        </div>
        <div className="navbar-item">
          <DateFilter
            date={filters.dateTo}
            name="dateTo"
            onDateChange={this.handleOptionChange}
            icon="sign-out-alt"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={country}
            onOptionChange={this.handleOptionChange}
            selected={filters.country}
            name="country"
            icon="globe"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={price}
            onOptionChange={this.handleOptionChange}
            selected={filters.price}
            name="price"
            icon="dollar-sign"
          />
        </div>
        <div className="navbar-item">
          <OptionsFilter
            options={size}
            onOptionChange={this.handleOptionChange}
            selected={filters.rooms}
            name="rooms"
            icon="bed"
          />
        </div>
      </nav>
    );
  }
}

export default Filters;

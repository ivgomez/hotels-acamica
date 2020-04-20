import React, { Component } from "react";
class OptionsFilter extends Component {
  constructor(props) {
    super(props);
    this.handlerOptionsFilterChange = this.handlerOptionsFilterChange.bind(
      this
    );
  }

  handlerOptionsFilterChange(event) {
    this.props.onOptionChange(event);
  }

  render() {
    const { name, options, selected, icon } = this.props;

    return (
      <div className="field">
        <div className="control has-icons-left">
          <div className="select" style={{ width: "100%" }}>
            <select
              style={{ width: "100%" }}
              name={name}
              onChange={this.handlerOptionsFilterChange}
              value={selected}
            >
              {options.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.name}
                </option>
              ))}
              ;
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className={`fas fa-${icon}`} />
          </div>
        </div>
      </div>
    );
  }
}

export default OptionsFilter;

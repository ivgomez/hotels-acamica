import React, { Component } from "react";

class Hero extends Component {
  render() {
    const { filters } = this.props;
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Hoteles</h1>
            <h2 className="subtitle">
              desde el <strong>{filters.dateFrom}</strong> hasta el{" "}
              <strong>{filters.dateTo}</strong>
              {`${
                filters.country !== "select" ? ` en ${filters.country}` : ""
              }`}
              {`${filters.price > 0 ? ` por $${filters.price}` : ""}`}
              {`${
                filters.rooms > 0
                  ? ` de hasta ${filters.rooms} habitaciones`
                  : ""
              }`}
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;

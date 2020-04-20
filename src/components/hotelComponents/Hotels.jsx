import React, { Component } from "react";
import Hotel from "./Hotel";

class Hotels extends Component {
  render() {
    const { hotel } = this.props;
    return (
      <section className="section" style={{ marginTop: "3em" }}>
        <div className="container">
          <div className="columns is-multiline">
            {hotel.length > 0 ? (
              hotel.map((data, index) => (
                <div className="column is-one-third" key={index}>
                  <Hotel data={data} />
                </div>
              ))
            ) : (
              <article className="message is-warning">
                <div className="message-body">
                  No se han encontrado hoteles que coincidan con los parámetros
                  de búsqueda.
                </div>
              </article>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Hotels;

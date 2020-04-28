import React, { Component, Fragment } from "react";
import NoResults from "./components/NoResults";
import { API_URL } from "./utils/constants";
import Hotels from "./components/hotelComponents/Hotels";
import Filters from "./components/Filters/Filters";
import Hero from "./components/Hero";
import Moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        dateFrom: Moment(new Date()).format("YYYY-MM-DD"),
        dateTo: Moment().add(1, "month").format("YYYY-MM-DD"),
        country: "select",
        price: "select",
        rooms: "select",
      },
      hotels: [],
      hotelesFiltered: [],
      isAllLoaded: false,
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.getHotels();
  }

  getHotels = async () => {
    return await fetch(API_URL)
      .then((hotels) => hotels.json())
      .then((hotels) =>
        this.setState({
          hotels: hotels,
          hotelesFiltered: hotels,
          isAllLoaded: true,
        })
      )
      .catch(() => console.log("Error en la petición..."));
  };

  handleHotelFilter(payload) {
    let dataFiltered;
    if (
      payload.country === "select" &&
      payload.price === "select" &&
      payload.rooms === "select"
    ) {
      dataFiltered =
        this.state.filters.dateFrom && this.state.filters.dateTo
          ? this.state.hotels.filter((v, i) => {
              return (
                payload.dateTo >= payload.dateFrom &&
                payload.dateFrom >=
                  Moment(v["availabilityFrom"]).format("YYYY-MM-DD") &&
                payload.dateTo <=
                  Moment(v["availabilityTo"]).format("YYYY-MM-DD")
              );
            })
          : (dataFiltered = this.state.hotels);
    }
    if (
      payload.country !== "select" &&
      payload.price === "select" &&
      payload.rooms === "select"
    ) {
      this.state.filters.dateFrom && this.state.filters.dateTo
        ? (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["country"] === payload.country &&
              payload.dateTo >= payload.dateFrom &&
              payload.dateFrom >=
                Moment(v["availabilityFrom"]).format("YYYY-MM-DD") &&
              payload.dateTo <= Moment(v["availabilityTo"]).format("YYYY-MM-DD")
            );
          }))
        : (dataFiltered = this.state.hotels.filter((v, i) => {
            return v["country"] === payload.country;
          }));
    }
    if (
      payload.country === "select" &&
      payload.price !== "select" &&
      payload.rooms === "select"
    ) {
      this.state.filters.dateFrom && this.state.filters.dateTo
        ? (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["price"] === parseInt(payload.price) &&
              payload.dateTo >= payload.dateFrom &&
              payload.dateFrom >=
                Moment(v["availabilityFrom"]).format("YYYY-MM-DD") &&
              payload.dateTo <= Moment(v["availabilityTo"]).format("YYYY-MM-DD")
            );
          }))
        : (dataFiltered = this.state.hotels.filter((v, i) => {
            return v["price"] === parseInt(payload.price);
          }));
    }
    if (
      payload.country === "select" &&
      payload.price === "select" &&
      payload.rooms !== "select"
    ) {
      this.state.filters.dateFrom && this.state.filters.dateTo
        ? (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["rooms"] === parseInt(payload.rooms) &&
              payload.dateTo >= payload.dateFrom &&
              payload.dateFrom >=
                Moment(v["availabilityFrom"]).format("YYYY-MM-DD") &&
              payload.dateTo <= Moment(v["availabilityTo"]).format("YYYY-MM-DD")
            );
          }))
        : (dataFiltered = this.state.hotels.filter((v, i) => {
            return v["rooms"] === parseInt(payload.rooms);
          }));
    }
    if (
      payload.country !== "select" &&
      payload.price !== "select" &&
      payload.rooms === "select"
    ) {
      this.state.filters.dateFrom && this.state.filters.dateTo
        ? (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["country"] === payload.country &&
              v["price"] === parseInt(payload.price) &&
              payload.dateTo >= payload.dateFrom &&
              payload.dateFrom >=
                Moment(v["availabilityFrom"]).format("YYYY-MM-DD") &&
              payload.dateTo <= Moment(v["availabilityTo"]).format("YYYY-MM-DD")
            );
          }))
        : (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["country"] === payload.country &&
              v["price"] === parseInt(payload.price)
            );
          }));
    }
    if (
      payload.country !== "select" &&
      payload.price === "select" &&
      payload.rooms !== "select"
    ) {
      this.state.filters.dateFrom && this.state.filters.dateTo
        ? (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["country"] === payload.country &&
              v["rooms"] === parseInt(payload.rooms) &&
              payload.dateTo >= payload.dateFrom &&
              payload.dateFrom >=
                Moment(v["availabilityFrom"]).format("YYYY-MM-DD") &&
              payload.dateTo <= Moment(v["availabilityTo"]).format("YYYY-MM-DD")
            );
          }))
        : (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["country"] === payload.country &&
              v["rooms"] === parseInt(payload.rooms)
            );
          }));
    }
    if (
      payload.country !== "select" &&
      payload.price !== "select" &&
      payload.rooms !== "select"
    ) {
      this.state.filters.dateFrom && this.state.filters.dateTo
        ? (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["country"] === payload.country &&
              v["price"] === parseInt(payload.price) &&
              v["rooms"] === parseInt(payload.rooms) &&
              payload.dateTo > payload.dateFrom &&
              payload.dateFrom >=
                Moment(v["availabilityFrom"]).format("YYYY-MM-DD") &&
              payload.dateTo <= Moment(v["availabilityTo"]).format("YYYY-MM-DD")
            );
          }))
        : (dataFiltered = this.state.hotels.filter((v, i) => {
            return (
              v["country"] === payload.country &&
              v["price"] === parseInt(payload.price) &&
              v["rooms"] === parseInt(payload.rooms)
            );
          }));
    }

    return dataFiltered;
  }

  handleFilterChange(payload) {
    this.setState((state) => ({
      filters: payload,
      hotelesFiltered: this.handleHotelFilter(payload),
    }));
  }

  render() {
    this.state.hotels.length > 0 &&
      console.log(
        "availabilityFrom ",
        Moment(this.state.hotels[8].availabilityFrom).format("YYYY-MM-DD")
      );

    this.state.hotels.length > 0 &&
      console.log(
        "availabilityTo ",
        Moment(this.state.hotels[8].availabilityTo).format("YYYY-MM-DD")
      );

    return (
      <Fragment>
        <Hero filters={this.state.filters} />
        <Filters
          filters={this.state.filters}
          onFilterChange={this.handleFilterChange}
        />
        {this.state.isAllLoaded ? (
          <Hotels hotel={this.state.hotelesFiltered} />
        ) : (
          <NoResults />
        )}
      </Fragment>
    );
  }
}

export default App;

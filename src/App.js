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

  filterHotels(filters, hotels) {
    const { dateFrom, dateTo, country, price, rooms } = filters;
    return hotels.filter((hotel) => {
      return (
        Moment(hotel.availabilityFrom).format("YYYY-MM-DD") >= dateFrom &&
        Moment(hotel.availabilityTo).format("YYYY-MM-DD") <= dateTo &&
        hotel.rooms <= (rooms !== "select" ? rooms : hotel.rooms) &&
        hotel.price <= (price !== "select" ? parseInt(price) : hotel.price) &&
        hotel.country.trim().toLowerCase() ===
          (country !== "select"
            ? country.trim().toLowerCase()
            : hotel.country.trim().toLowerCase())
      );
    });
  }

  handleFilterChange(payload) {
    const newFilteredHotels = this.filterHotels(payload, this.state.hotels);
    this.setState({
      filters: payload,
      hotelesFiltered: newFilteredHotels,
    });
  }

  render() {
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

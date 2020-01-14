import React from "react";
import { Card, Col, Row } from "antd";
import reqwest from "reqwest";
import SelectSizesDemo from "../filter/select";
import "./card.css";

class RickAndMortyCard extends React.Component {
  state = {
    data: [],
    filteredData: [],
    species: [],
    gender: [],
    origin: [],
    speciesFilter: [],
    genderFilter: [],
    originFilter: [],
    orderFilter: "Ascending",
    loading: false
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    reqwest({
      url: "https://rickandmortyapi.com/api/character/",
      method: "get",
      crossOrigin: true,
      type: "json"
    }).then(data => {
      const allSpecies = Array.from(
        new Set(data.results.map(item => item.species))
      );
      const allGender = Array.from(
        new Set(data.results.map(item => item.gender))
      );
      const allOrigin = Array.from(
        new Set(data.results.map(item => item.origin.name))
      );
      this.setState({
        loading: false,
        data: data.results,
        filteredData: data.results,
        species: allSpecies,
        gender: allGender,
        origin: allOrigin
      });
    });
  };

  handleFilters = (filterType, selectedFilters) => {
    // these variables are getting reset everytime, need to fix this
    let speciesFilter = [];
    let genderFilter = [];
    let originFilter = [];
    let orderFilter = [];

    switch (filterType) {
      case "SPECIES":
        speciesFilter = selectedFilters;
        break;
      case "GENDER":
        genderFilter = selectedFilters;
        break;
      case "ORIGIN":
        originFilter = selectedFilters;
        break;
      case "ORDER":
        orderFilter = selectedFilters;
        break;
      default:
        break;
    }

    this.setState(
      {
        speciesFilter,
        genderFilter,
        originFilter,
        orderFilter
      },
      this.applyFilters
    );
  };

  applyFilters = () => {
    const {
      data,
      speciesFilter,
      genderFilter,
      originFilter,
      orderFilter
    } = this.state;
    let filteredResult = data.filter(item => {
      let con1 =
        speciesFilter.length > 0 ? speciesFilter.includes(item.species) : true;
      let con2 =
        genderFilter.length > 0 ? genderFilter.includes(item.gender) : true;
      let con3 =
        originFilter.length > 0
          ? originFilter.includes(item.origin.name)
          : true;
      return con1 && con2 && con3;
    });

    filteredResult =
      orderFilter === "Ascending"
        ? filteredResult.sort((a, b) => a.id - b.id)
        : filteredResult.sort((a, b) => b.id - a.id);

    // console.clear();
    console.log("filteredResult:::=>", filteredResult);
    this.setState({
      filteredData: filteredResult
    });
  };

  render() {
    const { filteredData, species, gender, origin } = this.state;
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <SelectSizesDemo
          gender={gender}
          species={species}
          origin={origin}
          applyFilters={this.handleFilters}
        />
        <Row gutter={16}>
          {filteredData &&
            filteredData.map(result => (
              <Col span={6} key={result.id}>
                <Card
                  hoverable
                  cover={<img alt={result.name} src={result.image} />}
                  style={{ marginBottom: "15px" }}
                >
                  <div className="inCardDetails">
                    <p>id: {result.id}</p>
                    <p>Name: {result.name}</p>
                    <p>Created: {result.created}</p>
                  </div>
                  <div className="outCardDetails">
                    <p>Status: {result.status}</p>
                    <p>Species: {result.species}</p>
                    <p>Gender: {result.gender}</p>
                    <p>Origin: {result.origin.name}</p>
                    <p>Last Location: {result.location.name}</p>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

export default RickAndMortyCard;

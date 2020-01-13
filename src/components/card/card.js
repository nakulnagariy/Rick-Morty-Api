import React from "react";
import { Card, Col, Row } from "antd";
import reqwest from "reqwest";
import SelectSizesDemo from "../filter/select";
import "./card.css";

class RickAndMortyCard extends React.Component {
  state = {
    data: [],
    species: [],
    gender: [],
    origin: [],
    order: ["Ascending", "Descending"],
    selectedFilters: [],
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
        species: allSpecies,
        gender: allGender,
        origin: allOrigin
      });
    });
  };

  handleFilters = (filterType, selectedFilters) => {
    const { data } = this.state;
    console.clear();
    console.log("filterType:::::=>", filterType);
    console.log("selectedFilters:::::=>", selectedFilters);
    let filteredSpeciesRes,
      filteredGenderRes,
      filteredOriginRes,
      filteredOrderRes,
      allFilteredRes = [];
    switch (filterType) {
      case "SPECIES":
        filteredSpeciesRes = data.filter(item =>
          selectedFilters.every(spe => item.species === spe)
        );
      case "GENDER":
        filteredGenderRes = data.filter(item =>
          selectedFilters.every(spe => item.gender === spe)
        );
      case "ORIGIN":
        filteredOriginRes = data.filter(item =>
          selectedFilters.every(spe => item.origin.name === spe)
        );
      case "ORDER":
        filteredOrderRes = data.filter(item =>
          selectedFilters.every(spe => item.location.name === spe)
        );
      default:
        break;
    }
    allFilteredRes = [
      ...filteredSpeciesRes,
      ...filteredGenderRes,
      ...filteredOriginRes,
      ...filteredOrderRes
    ];
    console.log("allFilteredRes:::::=>", allFilteredRes);

    // const filteredResults = data.filter(
    //   item => item.species === selectedFilters[0]
    // );
    // if (filteredResults.length > 0) {
    //   this.setState({
    //     data: filteredResults
    //   });
    // }
  };

  render() {
    const { data, species, gender, order, origin } = this.state;
    const result = data;
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <SelectSizesDemo
          gender={gender}
          species={species}
          order={order}
          origin={origin}
          applyFilters={this.handleFilters}
        />
        <Row gutter={16}>
          {result &&
            result.map(result => (
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

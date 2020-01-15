import React from "react";
import { Card, Col, Row, Spin, Empty, Typography, BackTop } from "antd";
import reqwest from "reqwest";
import SelectSizesDemo from "../filter/select";
import "./card.css";

class RickAndMortyCard extends React.Component {
  state = {
    data: [],
    filteredData: [],
    totalCount: null,
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
        totalCount: data.results.length,
        filteredData: data.results,
        species: allSpecies,
        gender: allGender,
        origin: allOrigin
      });
    });
  };

  handleFilters = (filterType, selectedFilters) => {
    const {
      speciesFilter,
      genderFilter,
      originFilter,
      orderFilter
    } = this.state;

    let speciesFilterFrmSt = speciesFilter.length > 0 ? speciesFilter : [];
    let genderFilterFrmSt = genderFilter.length > 0 ? genderFilter : [];
    let originFilterFrmSt = originFilter.length > 0 ? originFilter : [];
    let orderFilterFrmSt = orderFilter.length > 0 ? orderFilter : [];

    switch (filterType) {
      case "SPECIES":
        speciesFilterFrmSt = selectedFilters;
        break;
      case "GENDER":
        genderFilterFrmSt = selectedFilters;
        break;
      case "ORIGIN":
        originFilterFrmSt = selectedFilters;
        break;
      case "ORDER":
        orderFilterFrmSt = selectedFilters;
        break;
      default:
        break;
    }

    this.setState(
      {
        speciesFilter: speciesFilterFrmSt,
        genderFilter: genderFilterFrmSt,
        originFilter: originFilterFrmSt,
        orderFilter: orderFilterFrmSt
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
    let totalCount = filteredResult.length;
    this.setState({
      filteredData: filteredResult,
      totalCount: totalCount
    });
  };

  render() {
    const {
      filteredData,
      species,
      gender,
      origin,
      loading,
      totalCount
    } = this.state;
    const { Text, Title } = Typography;
    return (
      <div className="rmWrapper">
        <SelectSizesDemo
          gender={gender}
          species={species}
          origin={origin}
          applyFilters={this.handleFilters}
        />
        <Title level={4} type="warning">{`Total results: ${totalCount}`}</Title>
        {loading ? (
          <div className="spinnerWrapper">
            <Spin
              className="ant-typography ant-typography-warning"
              size="large"
              tip="Waiting for Rick &amp; Morty to come!"
            />
          </div>
        ) : (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {filteredData.length > 0 ? (
              filteredData.map(result => (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 12 }}
                  md={{ span: 6 }}
                  lg={{ span: 6 }}
                  key={result.id}
                >
                  <Card
                    className="rmCard"
                    cover={<img alt={result.name} src={result.image} />}
                  >
                    <div className="outCardDetails">
                      <div className="rmDescription">
                        <Title type="warning" level={4}>
                          {result.name}
                        </Title>
                        <Text type="warning">id:&nbsp;</Text>
                        <Text type="warning">{result.id}</Text>
                      </div>
                      <div className="rmDescription">
                        <Text type="warning">Created:</Text>{" "}
                        <Text type="warning">
                          {`${new Date().getFullYear() -
                            result.created.slice(0, 4)} years ago`}
                        </Text>
                      </div>

                      <div className="rmDescription">
                        <Text type="warning">Status:</Text>{" "}
                        <Text type="warning">{result.status}</Text>
                      </div>
                      <div className="rmDescription">
                        <Text type="warning">Species:</Text>{" "}
                        <Text type="warning">{result.species}</Text>
                      </div>
                      <div className="rmDescription">
                        <Text type="warning">Gender:</Text>{" "}
                        <Text type="warning">{result.gender}</Text>
                      </div>
                      <div className="rmDescription">
                        <Text type="warning">Origin:</Text>{" "}
                        <Text type="warning">{result.origin.name}</Text>
                      </div>
                      <div className="rmDescription">
                        <Text type="warning">Last Location:</Text>{" "}
                        <Text type="warning">{result.location.name}</Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Empty
                className="ant-typography ant-typography-warning"
                description="Applied combination of filters, does have any data, try modifing filters."
              />
            )}
          </Row>
        )}
        <BackTop>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}

export default RickAndMortyCard;

import React from "react";
import { Select, Typography, Col, Row } from "antd";
import "./select.css";

class SelectSizesDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "default",
      species: [],
      gender: [],
      origin: [],
      order: ["Ascending", "Descending"],
      loading: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("select props:::", props);
    const { gender, species, origin } = props;
    return {
      gender: gender,
      species: species,
      origin: origin
    };
  }

  handleChange(value) {
    console.log(this.props);
  }

  renderSelect(selectType) {
    const { loading, gender, species, origin, order } = this.state;
    const { applyFilters } = this.props;
    const { Option } = Select;
    let data = [];
    switch (selectType) {
      case "SPECIES":
        data = species;
        break;
      case "GENDER":
        data = gender;
        break;
      case "ORIGIN":
        data = origin;
        break;
      case "ORDER":
        data = order;
        break;
      default:
        data = [];
        break;
    }
    return (
      <Select
        mode="multiple"
        className="rmSelect rmSelectSpecies"
        placeholder="select species"
        autoClearSearchValue
        allowClear
        defaultActiveFirstOption
        loading={loading}
        defaultValue={data[0]}
        onChange={val => applyFilters(selectType, val)}
        optionLabelProp="label"
      >
        {data.map(item => (
          <Option key={item} label={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  }

  render() {
    const { Title } = Typography;
    const { gender, species, origin, order } = this.state;
    return (
      <div>
        <Title className="ant-typography ant-typography-warning">
          THE RICK AND MORTY API
        </Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
          >
            {species && this.renderSelect("SPECIES")}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
          >
            {gender && this.renderSelect("GENDER")}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
          >
            {origin && this.renderSelect("ORIGIN")}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
          >
            {order && this.renderSelect("ORDER")}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SelectSizesDemo;

import React from "react";
import { Select, Typography, Col, Row } from "antd";
import "./select.css";

class SelectSizesDemo extends React.Component {
  state = {
    size: "default",
    species: [],
    gender: [],
    origin: [],
    order: ["Ascending", "Descending"],
    loading: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log("select props:::", props);
    const { gender, species, origin, order } = props;
    return {
      gender: gender,
      species: species,
      origin: origin,
      order: order
    };
  }

  handleChange(value) {
    console.log(this.props);
  }

  render() {
    const { Option } = Select;
    const { Title } = Typography;
    const { gender, species, origin, order, loading } = this.state;
    const { applyFilters } = this.props;
    return (
      <div>
        <Title>Filters</Title>
        <Row gutter={16}>
          <Col span={6}>
            {species && (
              <Select
                mode="multiple"
                className="rmSelect rmSelectSpecies"
                placeholder="select species"
                autoClearSearchValue
                allowClear
                defaultActiveFirstOption
                loading={loading}
                defaultValue={species[0]}
                onChange={val => applyFilters("SPECIES", val)}
                optionLabelProp="label"
              >
                {species.map(item => (
                  <Option key={item} label={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Col>
          <Col span={6}>
            {gender && (
              <Select
                mode="multiple"
                className="rmSelect rmSelectGender"
                placeholder="select gender"
                autoClearSearchValue
                allowClear
                defaultActiveFirstOption
                loading={loading}
                defaultValue={gender[0]}
                onChange={val => applyFilters("GENDER", val)}
                optionLabelProp="label"
              >
                {gender.map(item => (
                  <Option key={item} label={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Col>
          <Col span={6}>
            {origin && (
              <Select
                mode="multiple"
                className="rmSelect rmSelectOrigin"
                placeholder="select origin"
                autoClearSearchValue
                allowClear
                defaultActiveFirstOption
                loading={loading}
                defaultValue={origin[0]}
                onChange={val => applyFilters("ORIGIN", val)}
                optionLabelProp="label"
              >
                {origin.map(item => (
                  <Option key={item} label={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Col>
          <Col span={6}>
            {order && (
              <Select
                className="rmSelect rmSelectOrder"
                placeholder="select one order"
                loading={loading}
                defaultValue={order[0]}
                onChange={val => applyFilters("ORDER", val)}
                optionLabelProp="label"
              >
                {order.map(item => (
                  <Option key={item} label={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SelectSizesDemo;

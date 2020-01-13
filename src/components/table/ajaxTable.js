import React from "react";
import { Table, Button } from "antd";
import reqwest from "reqwest";

class AjaxTable extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    filteredInfo: null,
    sortedInfo: null
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      data: {
        results: 10,
        ...params
      },
      type: "json"
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination
      });
    });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        fixed: "left",
        width: 100
      },
      {
        title: "Gender",
        dataIndex: "gender",
        filters: [
          { text: "Male", value: "male" },
          { text: "Female", value: "female" }
        ]
      },
      {
        title: "Email",
        dataIndex: "email"
      },
      { title: "Column 1", dataIndex: "address", key: "1" },
      { title: "Column 2", dataIndex: "address", key: "2" },
      { title: "Column 3", dataIndex: "address", key: "3" },
      { title: "Column 4", dataIndex: "address", key: "4" },
      { title: "Column 5", dataIndex: "address", key: "5" },
      { title: "Column 6", dataIndex: "address", key: "6" },
      { title: "Column 7", dataIndex: "address", key: "7" },
      {
        title: "Column 88888888888888888888888888888888888888",
        dataIndex: "address",
        key: "8",
        ellipsis: true
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "x",
        render: () => <a>Delete</a>,
        fixed: "right",
        width: 100
      }
    ];

    // rowSelection objects indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    };
    return (
      <div>
        <Table
          columns={columns}
          rowKey={record => record.login.uuid}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          scroll={{ x: 2500, y: 700 }}
          expandedRowRender={record => <img src={record.picture.medium} />}
          bordered
          title={() => "Header"}
          footer={() => "Footer"}
          size="small"
        />
      </div>
    );
  }
}

export default AjaxTable;

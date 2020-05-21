import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends Component {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
      pagination: {},
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    // 添加了nextProps.selectedRows &&，使我们可以传递空的rowSelection
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  componentDidMount() {
    const table = document.getElementsByTagName('table')[0];
    table.setAttribute('id', 'trans-table');
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  handleSizeChange = checked => {
    if (checked) {
      this.setState({ pagination: {} });
    } else {
      this.setState({ pagination: false });
    }
  };

  render() {
    const { selectedRowKeys, needTotalList, pagination } = this.state;
    const realPagination = this.props.pagination ? this.props.pagination : pagination;
    const { data, selectedRows, rowKey, ...rest } = this.props;
    const rowSelection = selectedRows
      ? {
          selectedRowKeys,
          onChange: this.handleRowSelectChange,
          getCheckboxProps: record => ({
            disabled: record.disabled,
          }),
        }
      : null;

    return (
      <div className={styles.standardTable}>
        {rowSelection ? (
          <div className={styles.tableAlert}>
            <Alert
              message={
                <Fragment>
                  已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                  {needTotalList.map(item => (
                    <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                      {item.title}
                      总计&nbsp;
                      <span style={{ fontWeight: 600 }}>
                        {item.render ? item.render(item.total) : item.total}
                      </span>
                    </span>
                  ))}
                  <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                    清空
                  </a>
                </Fragment>
              }
              type="info"
              showIcon
            />
          </div>
        ) : null}
        
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={data}
          pagination={realPagination}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

StandardTable.propTypes = {
  data: PropTypes.array,
};

StandardTable.defaultProps = {
  data: [],
};

export default StandardTable;

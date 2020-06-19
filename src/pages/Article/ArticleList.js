import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Table, Select, Form, Input, Button, Popconfirm } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import router from 'umi/router';

const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ article, loading }) => ({
  article,
  loading: loading.models.rule,
}))
@Form.create()
class ArticleList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      sortedInfo: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetch',
      payload: {},
    });
  }

  handleSearch = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        const value = {
          title: fieldsValue.title,
          type: fieldsValue.type,
        };

        this.setState({
          formValues: fieldsValue,
          sortedInfo:null
        });
        dispatch({
          type: 'article/fetch',
          payload: {
            ...value,
          },
        });
      }
    });
  };

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo:null
    });
    dispatch({
      type: 'article/fetch',
      payload: {},
    });
  };

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    return (
      <Form
        labelCol={{ span: 4, md: 4, lg: 8 }}
        wrapperCol={{ span: 19, md: 19, lg: 16 }}
        onSubmit={this.handleSearch}
      >
        <Row>
          <Col span={24} md={24} lg={8}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
              {getFieldDecorator('title', {
                rules: [],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={24} md={24} lg={8}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="文章类型">
              {getFieldDecorator('type', {
                rules: [],
              })(
                <Select>
                  <Option value={null}>全部</Option>
                  <Option value={1}>笔记</Option>
                  <Option value={2}>博客</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24} md={24} lg={8}>
            <FormItem style={{ float: 'right', whiteSpace: 'nowrap' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 20 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  // 编辑页面
  handleUpdateModalVisible = (flag, record) => {
    router.push(`/article/articleEditor?id=${record.id}&&type=update`);
  };

  // 跳转到添加页面
  handleAdd = () => {
    router.push('/article/articleEditor?type=add');
  };

  // 删除
  deleteModalVisible = (flag, record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/delete',
      payload: {
        id: record.id,
      },
    });
  };

  // 查看详情
  detail = record => {
    router.push(`/article/detail?id=${record.id}`);
  };

  handleTableChange = (pagination, filtersArg, sorter) => {

    if (sorter.columnKey) {
      const { dispatch } = this.props;
      const { formValues } = this.state;
      const params = {
        columnKey: sorter.columnKey,
        order: sorter.order,
        ...formValues,
      };

      this.setState({
        sortedInfo: sorter,
      });

      dispatch({
        type: 'article/fetch',
        payload: params,
      });
    }

  };

  render() {
    const { article } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '摘要',
        dataIndex: 'remark',
        render: text => <span className="remark">{text}</span>,
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: item => {
          switch (item) {
            case 1:
              item = '笔记';
              break;
            case 2:
              item = '博客';
              break;
            default:
              item = '';
          }
          return item;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        sortDirections: ['descend', 'ascend'],
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'createdAt' && sortedInfo.order,
        render: item => {
          return item == null ? '' : moment(item).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.detail(record)}>查看</a>
            <a className="marginLeft" onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
            <Popconfirm
              title="确定删除这条文章？"
              onConfirm={() => this.deleteModalVisible(true, record)}
              okText="确定"
              cancelText="取消"
              className="marginLeft"
            >
              <a>删除</a>&nbsp;&nbsp;&nbsp;
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    const pagination = {
      pageSize: 10,
    };

    return (
      <PageHeaderWrapper title="文章列表">
        <Card>
          <Row>
            {this.renderForm()}
            <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
              写文章
            </Button>
          </Row>
          <Row className="marginTop">
            <Table
              dataSource={article.list}
              rowKey="id"
              pagination={pagination}
              columns={columns}
              loading={article.loading}
              bordered={false}
              onChange={this.handleTableChange}
            />
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default ArticleList;

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Table, Select, Form, Input, Button, Popconfirm } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import router from 'umi/router';
import styles from './ArticleList.less';

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
    this.state = {};
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
          appEdition: fieldsValue.appEdition,
          type: fieldsValue.type,
        };
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
    dispatch({
      type: 'article/fetch',
      payload: {},
    });
  };

  // // 编辑
  // handleUpdate = (fields, encryptionId) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'masterCard/update',
  //     payload: {
  //       notDetail: true,
  //       ...fields
  //       // encryptionId,
  //     },
  //   });
  //   // this.handleUpdateModalVisible();
  // };

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
            <FormItem label="标题">
              {getFieldDecorator('appEdition', {
                rules: [],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={24} md={24} lg={8}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公告类型">
              {getFieldDecorator('type', {
                rules: [],
              })(
                <Select>
                  <Option value={null}>全部</Option>
                  <Option value="1">汇市新闻</Option>
                  <Option value="2">公告板</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24} md={24} lg={8} offset={16}>
            <FormItem className={styles.btnContainer}>
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

  // top = (flag, record) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'article/top',
  //     payload: {
  //       "id": record.id
  //     }
  //   });
  // }

  render() {
    const { article } = this.props;
    const columns = [
      {
        title: '标题',
        dataIndex: 'appEdition',
        key: 'appEdition',
      },
      {
        title: '摘要',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span className="remark">{text}</span>,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: item => {
          switch (item) {
            case '1':
              item = '汇市新闻';
              break;
            case '2':
              item = '公告板';
              break;
            default:
              item = '';
          }
          return item;
        },
      },
      // {
      //   title: '置顶',
      //   dataIndex: 'isTop',
      //   key: 'isTop',
      //   render: item => {
      //     return (
      //       item === "0" ? "是" : "否"
      //     )
      //   }
      // },
      {
        title: '创建时间',
        dataIndex: 'insTime',
        key: 'insTime',
        render: item => {
          return item == null ? '' : moment(item).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
            &nbsp;&nbsp;&nbsp;
            <Popconfirm
              title="确定删除这条公告？"
              onConfirm={() => this.deleteModalVisible(true, record)}
              okText="Yes"
              cancelText="No"
            >
              <a>删除</a>&nbsp;&nbsp;&nbsp;
            </Popconfirm>
            {/* {record.isTop == '1' ?
              <a onClick={() => this.top(true, record)}>置顶</a> :
              <a onClick={() => this.top(false, record)}>取消置顶</a>
            } */}
          </Fragment>
        ),
      },
    ];
    const { total } = article.list.data;
    const pagination = {
      total,
    };
    return (
      <PageHeaderWrapper title="公告列表">
        <Card>
          <Row>
            {this.renderForm()}
            <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
              添加
            </Button>
          </Row>
          <Row>
            <Table
              dataSource={article.list.data.rows}
              rowKey="id"
              columns={columns}
              pagination={pagination}
              loading={article.loading}
              bordered={false}
              onChange={this.handlePageChange}
            />
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default ArticleList;

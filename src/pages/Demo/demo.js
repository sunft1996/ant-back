/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-29 15:58:56
 * @LastEditTime: 2020-04-29 17:48:47
 */
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
class List extends PureComponent {
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

  // 搜索
  // searchFormFlag

  // 编辑页面
  handleUpdateModalVisible = (flag, record) => {
    router.push(`/article/articleEditor?id=${record.id}&&type=update`);
  };

  // 跳转到添加页面
  handleAdd = () => {
    router.push('/article/articleEditor?type=add');
  };

  // 删除
  // deleteFlag

  render() {
    const { article } = this.props;
    const columns = [
      // columnsFlag
    ];

    return (
      <PageHeaderWrapper title="文章列表">
        <Card>
          <Row>
            {this.renderForm()}
            <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
              新建
            </Button>
          </Row>
          <Row className="marginTop">
            <Table
              dataSource={article.list}
              rowKey="id"
              columns={columns}
              loading={article.loading}
              bordered={false}
            />
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default List;

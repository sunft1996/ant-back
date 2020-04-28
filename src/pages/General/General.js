import React from 'react';
import { Row, Col, Avatar, Card, Button, Tree, DatePicker, Form } from 'antd';
import { connect } from 'dva';
import router from 'umi/router'; // import Yuan from '@/utils/Yuan';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './General.less'; // import { judgePageAuth } from '@/global.js';

const { Meta } = Card;
const { TreeNode } = Tree;

const linkToSetting = () => {
  router.push('/EditPassword');
};

const Description = props => {
  return (
    <div>
      <p>上次登录时间：{props.time ? moment(props.time).format('YYYY-MM-DD HH:mm:ss') : '无'}</p>

      <Button type="primary" onClick={linkToSetting}>
        安全设置
      </Button>
      <Button
        type="primary"
        style={{
          marginLeft: '20px',
        }}
        onClick={props.onLogout}
      >
        退出
      </Button>
    </div>
  );
};


let salesData = [];

for (let i = 0; i < 30; i += 1) {
  salesData.push({
    day: moment()
      .subtract('days', i)
      .format('MM-DD'),
    value: Math.floor(Math.random() * 1000) + 200,
  });
}

salesData = salesData.reverse(); // 页面权限

@connect(({ login, menu, user, menu: { pagePermissions }, loading }) => ({
  login,
  menu,
  user,
}))
class General extends React.PureComponent {
  state = {
    loading: false,
  };

  static defaultProps = {
    user: {},
    merchant: {
      generalMerchInfo: {},
    },
  };

  componentDidMount() {
    const { dispatch } = this.props; // 页面权限

    dispatch({
      type: 'menu/fetchButton',
    });
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
    });
  };

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode title={item.name} key={item.id} dataRef={item} />;
    });
  };

  render() {
    const { loading,  } = this.state;
    const { user } = this.props;
    const { currentUser } = user;

    return (
      <PageHeaderWrapper title="今日概况">
        <Row gutter={16}>
          <Col xl={8} lg={24}>
            <Card
              style={{
                height: '210px',
                minWidth: '320px',
              }}
              loading={loading}
            >
              <Row className={styles.myInfoHeader} />
              <Meta
                avatar={
                  <Avatar
                    size={64}
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  />
                }
                title={<span>你好！{currentUser.realName}</span>}
                description={
                  <Description onLogout={this.handleLogout} time={currentUser.loginDate} />
                }
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default General;

/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-29 13:56:15
 * @LastEditTime: 2020-05-19 11:26:18
 */
import React from 'react';
import { Row, Col, Avatar, Card, Button, Tree, Divider, Form } from 'antd';
import { connect } from 'dva';
import router from 'umi/router'; // import Yuan from '@/utils/Yuan';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import { yuan } from "@/components/Charts";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import request from '@/utils/request';
import { Link } from 'umi';
import styles from './General.less';

const cols = {
  amount: {
    min: 0,
  },
  num: {
    min: 0,
  },
  time: {
    // 坐标轴两端空白
    range: [0.05, 0.95]
  }
};

const { Meta } = Card;
const { TreeNode } = Tree;
const tabList = [
  {
    key: 'tab1',
    tab: '交易额',
  },
  {
    key: 'tab2',
    tab: '交易笔数',
  },
];

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

@connect(({ login, menu, user }) => ({
  login,
  menu,
  user,
}))
class General extends React.PureComponent {
  state = {
    loading: false,
    currentTab: 'tab1',
    list: []
  };

  static defaultProps = {
    user: {},
    merchant: {
      generalMerchInfo: {},
    },
  };

  componentDidMount() {
    this.getChartData();
  }

  // 请求图标数据，这里是mock的数据
  getChartData = () => {
    request('/api/general/chartList', {
      method: 'POST',
      data: JSON.stringify({})
    }).then(res => {
      if (res.code === 'SUCCESS') {
        this.setState({
          list: res.data,
        });
      }
    });
  };

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

  onTabChange = (key) => {
    this.setState({ currentTab: key });
  };

  render() {
    const { loading, currentTab, list } = this.state;
    const { user } = this.props;
    const { currentUser } = user;


    return (
      <PageHeaderWrapper title="今日概况">
        <Row gutter={16}>
          <Col xl={8} lg={24}>
            <Card
              style={{
                height: '210px',
                // minWidth: '320px',
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
          <Col xl={16} lg={24}>
            <Card
              style={{ height: "210px" }}
              loading={loading}
              title="使用说明"
            >
              <Row className="flexSpace">
                <Link to="/article/detail?id=2" className="remark">如何新建一个页面</Link>
                <Divider type="vertical" />
                <Link to="/article/detail?id=7" className="remark">如何添加新的接口</Link>
                <Divider type="vertical" />
                <Link to="/article/detail?id=7" className="remark">如何给页面添加子权限</Link>
              </Row>
              <Row className="flexSpace marginTop">
                <Link to="/article/detail?id=5" className="remark">接口文档——基础列表页</Link>
                <Divider type="vertical" />
                <Link to="/article/detail?id=6" className="remark">如何模拟接口数据</Link>
                <Divider type="vertical" />
                <a className="remark" target="_blank" href="https://bizcharts.net/"> 图表建议使用BizCharts</a>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Card
            tabList={tabList}
            activeTabKey={currentTab}
            onTabChange={key => {
              this.onTabChange(key);
            }}
          >
            {currentTab === 'tab1' ?
              <Chart height={300} data={list} scale={cols} forceFit>
                <Axis name="time" />
                <Axis name="amount" />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom
                  type="line"
                  position="time*amount"
                  size={2}
                  color='type'
                  shape="smooth"
                  tooltip={["type*amount", (type, amount, ) => {
                    return {
                      value: `交易金额：${yuan(amount)}`,
                    }
                  }]}
                />
              </Chart>
              :
              <Chart height={300} data={list} scale={cols} forceFit>
                <Axis name="time" />
                <Axis name="num" />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom
                  type="line"
                  position="time*num"
                  size={2}
                  color='type'
                  shape="smooth"
                  tooltip={["type*num", (type, num) => {
                    return {
                      value: `交易笔数：${num}`,
                    }
                  }]}
                />

              </Chart>}
          </Card>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default General;

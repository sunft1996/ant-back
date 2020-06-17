/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-29 13:56:15
 * @LastEditTime: 2020-06-17 11:37:44
 * 图表使用ant design pro封装的图表，也有使用bizcharts
 * ant design pro 图表预览地址：https://v2-pro.ant.design/components/charts-cn
 */
import React from 'react';
import { Row, Col, Avatar, Card, Button, Tree, Divider, Icon, Tooltip as Info } from 'antd';
import numeral from 'numeral';
import { connect } from 'dva';
import router from 'umi/router';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
// ant design pro 的图表组件
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field, yuan } from '@/components/Charts';

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
    range: [0.05, 0.95],
  },
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
// 区域图数据
const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

const pieData = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
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
    list: [],
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

  // 请求曲线图数据
  getChartData = () => {
    // 如果你想模拟请求，url切换到/api/general/chartList
    request('/empty-item/general/chartList', {
      method: 'POST',
      data: JSON.stringify({}),
    }).then(res => {
      if (res && res.code === 'SUCCESS') {
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

  onTabChange = key => {
    this.setState({ currentTab: key });
  };

  render() {
    const { loading, currentTab, list } = this.state;
    const { user } = this.props;
    const { currentUser } = user;

    return (
      <PageHeaderWrapper title="今日概况">
        <Row gutter={16}>
          <Col xl={8} lg={24} style={{ marginBottom: 20 }}>
            <Card
              style={{
                height: '210px',
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
          <Col xl={16} lg={24} style={{ marginBottom: 20 }}>
            <Card style={{ height: '210px' }} loading={loading} title="使用说明">
              <Row className="flexSpace">
                <Link to="/article/detail?id=2" className="remark">
                  如何新建一个页面
                </Link>
                <Divider type="vertical" />
                <Link to="/article/detail?id=7" className="remark">
                  如何添加新的接口
                </Link>
                <Divider type="vertical" />
                <Link to="/article/detail?id=8" className="remark">
                  如何给页面添加子权限
                </Link>
              </Row>
              <Row className="flexSpace marginTop">
                <Link to="/article/detail?id=5" className="remark">
                  接口文档——基础列表页
                </Link>
                <Divider type="vertical" />
                <Link to="/article/detail?id=6" className="remark">
                  如何模拟接口数据
                </Link>
                <Divider type="vertical" />
                <a className="remark" target="_blank" href="https://bizcharts.net/">
                  {' '}
                  图表建议使用BizCharts
                </a>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xl={6} lg={24}>
            <ChartCard
              bordered={false}
              style={{ height: 200 }}
              title="饼状图"
              action={
                <Info title="饼状图">
                  <Icon type="info-circle-o" />
                </Info>
              }
              loading={loading}
            >
              <Chart height={150} data={pieData} scale={cols} padding="auto" forceFit>
                <Coord type="theta" radius={0.65} innerRadius={0.45} />
                <Axis name="percent" />
                <Legend position="right-center" />
                <Tooltip showTitle={false} />
                <Geom
                  type="intervalStack"
                  position="percent"
                  color="item"
                  tooltip={[
                    'item*percent',
                    (item, percent) => {
                      percent = `${percent * 100}%`;
                      return {
                        name: item,
                        value: percent,
                      };
                    },
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: '#fff',
                  }}
                />
              </Chart>
            </ChartCard>
          </Col>
          <Col xl={6} lg={24}>
            <ChartCard
              bordered={false}
              style={{ height: 200 }}
              title="迷你条形图"
              action={
                <Info title="迷你条形图">
                  <Icon type="info-circle-o" />
                </Info>
              }
              loading={loading}
              total={() => numeral(132456).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
            >
              <MiniBar height={50} data={visitData} />
            </ChartCard>
          </Col>
          <Col xl={6} lg={24}>
            <ChartCard
              bordered={false}
              style={{ height: 200 }}
              title="面积图"
              action={
                <Info title="面积图">
                  <Icon type="info-circle-o" />
                </Info>
              }
              loading={loading}
              total={() => numeral(132456).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
            >
              <MiniArea height={50} color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col xl={6} lg={24}>
            <ChartCard
              bordered={false}
              style={{ height: 200 }}
              title="进度条"
              action={
                <Info title="进度条">
                  <Icon type="info-circle-o" />
                </Info>
              }
              loading={loading}
              total="80%"
              contentHeight={50}
              footer={<Field label="进度" value="80%" />}
            >
              <MiniProgress percent={80} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
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
            {currentTab === 'tab1' ? (
              <Chart height={300} data={list} scale={cols} forceFit>
                <Axis name="time" />
                <Axis name="amount" />
                <Tooltip
                  crosshairs={{
                    type: 'y',
                  }}
                />
                <Geom
                  type="line"
                  position="time*amount"
                  size={2}
                  color="type"
                  shape="smooth"
                  tooltip={[
                    'type*amount',
                    (type, amount) => {
                      return {
                        value: `交易金额：${yuan(amount)}`,
                      };
                    },
                  ]}
                />
              </Chart>
            ) : (
              <Chart height={300} data={list} scale={cols} forceFit>
                <Axis name="time" />
                <Axis name="num" />
                <Tooltip
                  crosshairs={{
                    type: 'y',
                  }}
                />
                <Geom
                  type="line"
                  position="time*num"
                  size={2}
                  color="type"
                  shape="smooth"
                  tooltip={[
                    'type*num',
                    (type, num) => {
                      return {
                        value: `交易笔数：${num}`,
                      };
                    },
                  ]}
                />
              </Chart>
            )}
          </Card>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default General;

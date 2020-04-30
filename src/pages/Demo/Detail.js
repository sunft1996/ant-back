/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-27 13:16:13
 * @LastEditTime: 2020-04-30 16:12:49
 */
import React, { PureComponent } from 'react';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Button, Row, notification } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import request from '@/utils/request';
import { imgUrl } from '@/global';
import styles from './index.less';

const { Description } = DescriptionList;

class Detail extends PureComponent {
  constructor() {
    super();
    this.state = {
      current: {},
      loading: true,
    };
  }

  componentDidMount() {
    const {
      query: { id },
    } = this.props.location;
    if (id === undefined) return;
    request(`/empty-item/demo/detail?id=${id}`).then(res => {
      if (res.code === 'SUCCESS') {
        this.setState({
          current: res.data,
        });
      } else {
        notification.error({
          message: res.code,
          description: res.msg,
        });
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { current, loading } = this.state;
    return (
      <PageHeaderWrapper title="详情">
        <Card loading={loading}>
          <DescriptionList size="large" title="基本信息">
            <Description term="存放路径">{current.url} </Description>
            <Description term="访问链接">
              <a target="_blank" href={imgUrl + current.url}>
                {imgUrl + current.url}{' '}
              </a>
            </Description>
          </DescriptionList>
          <Divider dashed />
          <DescriptionList size="large" title="其他信息">
            <Description term="创建时间">
              {moment(current.createdAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
            </Description>
            <Description term="上次修改时间">
              {moment(current.updatedAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
            </Description>
          </DescriptionList>
          <Divider dashed />
          <DescriptionList size="remark" title="备注">
            <Description>{current.remark}</Description>
          </DescriptionList>
          <Divider dashed />
          <img src={imgUrl + current.url} className={styles.detailImg} alt="img" />
          <Row className="marginTop textRight">
            <Button type="primary" onClick={() => router.go(-1)}>
              返回
            </Button>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;

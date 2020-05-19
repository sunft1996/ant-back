/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-27 13:16:13
 * @LastEditTime: 2020-05-18 15:17:10
 */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Button, Row, notification } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import request from '@/utils/request';
import styles from './index.less';

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
    request(`/empty-item/article/detail`, {
      method: 'POST',
      data: {
        id
      },
    }).then(res => {
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
      <PageHeaderWrapper title="文章">
        <Card loading={loading}>
          <div className={styles.articleContent}>
            <h2 className="marginTop textCenter">{current.title}</h2>
            <p className="textRight" style={{color:'#6c757d'}}>最后编辑于 {moment(current.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
            <div dangerouslySetInnerHTML={{ __html: current.content }} />
          </div>
          <Row className="marginTop textCenter">
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

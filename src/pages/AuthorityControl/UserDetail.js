/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-27 13:16:13
 * @LastEditTime: 2020-04-27 14:35:07
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Button, Row } from 'antd';
import moment from 'moment';
import router from 'umi/router';

const { Description } = DescriptionList;
@connect(({ user }) => ({
    user
}))
class UserDetail extends PureComponent {
    componentDidMount() {
        const { dispatch, location } = this.props;
        if (location.query.id || location.query.id === 0) {
            dispatch({
                type: 'user/fetchDetail',
                payload: {
                    id: location.query.id,
                },
            });
        }
        
    }

    render() {
        const { user: { detail } } = this.props;
        return (
          <PageHeaderWrapper title="用户详情">
            <Card>
              <DescriptionList size="large" title="基本信息">
                <Description term="名称">{detail.realName} </Description>
                <Description term="账号">{detail.loginName}</Description>
                <Description term="权限">{detail.roleName}</Description>
                <Description term="手机号">{detail.phone}</Description>
                <Description term="邮箱">{detail.email}</Description>
              </DescriptionList>
              <Divider dashed />
              <DescriptionList size="large" title="其他信息">
                <Description term="创建时间">{moment(detail.createdAt).format('YYYY-MM-DD HH:mm:ss')} </Description>
                <Description term="上次登录时间">{moment(detail.loginDate).format('YYYY-MM-DD HH:mm:ss')} </Description>
                <Description term="备注">{detail.remark}</Description>
              </DescriptionList>
              <Divider dashed />
              <Row className="marginTop textRight">
                <Button type="primary" onClick={() => router.go(-1)}>返回</Button>
              </Row>
            </Card>
          </PageHeaderWrapper>
        )
    }
}

export default UserDetail;
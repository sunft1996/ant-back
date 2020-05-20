import React from 'react';
import { Row, Card, Icon, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

@Form.create()
@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class EditPassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value.length >= 6 && value !== form.getFieldValue('newPassword1')) {
      callback('两次输入的新密码不一致');
    } else {
      callback();
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const { form, dispatch } = this.props;
    this.setState({
      loading: true
    });
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        dispatch({
          type: 'user/editPassword',
          payload: {
            password: fieldsValue.password,
            newPassword: fieldsValue.newPassword2,
          },
        }).then(res => {
          this.setState({
            loading: false
          });
          if(res.code === "SUCCESS"){
            router.go(-1);
          }
        });
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { loading } = this.state;
    return (
      <PageHeaderWrapper title="修改密码">
        <Card>
          <Row>
            <Form
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              onSubmit={this.handleSubmit}
            >
              <Form.Item label="原密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入原始密码' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入原始密码"
                  />
                )}
              </Form.Item>
              <Form.Item label="新密码">
                {getFieldDecorator('newPassword1', {
                  rules: [{ required: true, message: '请输入不小于6位的新密码',min:6 }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入新密码"
                  />
                )}
              </Form.Item>
              <Form.Item label="确认密码">
                {getFieldDecorator('newPassword2', {
                  rules: [
                    { required: true, message: '请输入不小于6位的新密码',min:6 },
                    { validator: this.compareToFirstPassword },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入新密码"
                  />
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button onClick={()=>router.go(-1)}>
                  取消
                </Button>
                <Button type="primary" className="marginLeft" htmlType="submit" loading={loading}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default EditPassword;

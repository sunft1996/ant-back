/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-30 10:24:10
 * @LastEditTime: 2020-04-30 15:20:24
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Upload,
  Modal,
  message,
  Select,
  Icon,
  Form,
  Input,
  notification,
  Button,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { imgUrl } from '@/global';
import router from 'umi/router';
import request from '@/utils/request';

const FormItem = Form.Item;
const { TextArea } = Input;
@connect(({ article, loading }) => ({
  article,
  loading: loading.models.rule,
}))
@Form.create()
class Add extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      loading: false,
      uploadLoading: false,
      imageUrl: null,
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
          imageUrl: res.data.url,
        });
      } else {
        notification.error({
          message: res.code,
          description: res.msg,
        });
      }
      this.loading();
    });
  }

  loading = flag => {
    this.setState({
      loading: !!flag,
    });
  };

  handleSubmit = e => {
    const { form } = this.props;
    const {
      query: { id },
    } = this.props.location;
    const { imageUrl } = this.state;
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        if (!imageUrl) {
          message.error('图片不能为空');
          return;
        }
        const value = {
          ...fieldsValue,
          id,
          url: imageUrl,
        };
        this.loading(true);
        Modal.confirm({
          title: '确定修改？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            request('/empty-item/demo/saveOrUpdate', {
              method: 'POST',
              data: value,
            }).then(res => {
              if (res.code === 'SUCCESS') {
                notification.success({
                  message: res.code,
                  description: res.msg,
                });
                router.go(-1);
              } else {
                notification.error({
                  message: res.code,
                  description: res.msg,
                });
              }
              this.loading();
            });
          },
        });
      }
    });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({
        uploadLoading: true,
      });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: info.file.response.code === 'SUCCESS' ? info.file.response.data.url : null,
        uploadLoading: false,
      });
    }
  };

  cancel = () => {
    router.go(-1);
  };

  render() {
    const { form } = this.props;
    const { imageUrl, loading, current } = this.state;
    return (
      <PageHeaderWrapper title="新增">
        <Card>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 10 }} label="类型">
              {form.getFieldDecorator('type', {
                initialValue: current.type,
                rules: [{ required: true, message: '请选择！' }],
              })(
                <Select>
                  <Select.Option value={1}>banner</Select.Option>
                  <Select.Option value={2}>海报</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 10 }} label="备注">
              {form.getFieldDecorator('remark', {
                initialValue: current.remark,
                rules: [],
              })(<TextArea placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 10 }} label="图片">
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/empty-item/api/uploadImg"
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imgUrl + imageUrl} alt="image" style={{ width: '100%' }} />
                ) : (
                  <div>
                    <Icon type={this.state.uploadLoading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
            </FormItem>
            <div className="flexCenter">
              <Button onClick={() => this.cancel()}>取消</Button>
              <Button type="primary" className="marginLeft" htmlType="submit" loading={loading}>
                提交
              </Button>
            </div>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Add;

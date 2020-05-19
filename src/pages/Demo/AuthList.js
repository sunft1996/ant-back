/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-29 15:58:56
 * @LastEditTime: 2020-05-19 10:18:45
 */
import React, { PureComponent, Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Table,
  Select,
  Form,
  Input,
  Button,
  Popconfirm,
  DatePicker,
  Tooltip,
  notification,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import router from 'umi/router';
import request from '@/utils/request';
import { imgUrl } from '@/global';
import judgePageAuth from '@/utils/judgePageAuth';

const { RangePicker } = DatePicker;
/* eslint react/no-multi-comp:0 */
@Form.create()
class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    // 组件首次加载时请求列表
    this.handleSearch();
    console.log(judgePageAuth('editAuthList'))
  }

  loading = flag => {
    this.setState({
      loading: !!flag,
    });
  };

  // 搜索
  handleSearch = e => {
    const { form } = this.props;
    if (e) e.preventDefault();
    // 校验搜索表单
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        // 不要直接改变 fieldsValue
        const values = {
          ...fieldsValue,
        };
        request('/empty-item/demo/list', {
          method: 'POST',
          data: values,
        }).then(res => {
          if (res.code === 'SUCCESS') {
            this.setState({
              list: res.data,
            });
          }
          this.loading();
        });
      }
    });
  };

  // 重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.handleSearch();
  };

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    return (
      <Form
        labelCol={{ span: 4, md: 4, lg: 8 }}
        wrapperCol={{ span: 19, md: 19, lg: 16 }}
        onSubmit={this.handleSearch}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={24} md={24} lg={8}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="备注">
              {getFieldDecorator('remark')(<Input />)}
            </FormItem>
          </Col>
          <Col span={24} md={24} lg={8}>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="类型">
              {getFieldDecorator('type')(
                <Select>
                  <Select.Option value={0}>全部</Select.Option>
                  <Select.Option value={1}>banner</Select.Option>
                  <Select.Option value={2}>海报</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24} md={24} lg={8}>
            <FormItem label="创建时间">{getFieldDecorator('createdAt')(<RangePicker />)}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} md={24} lg={24}>
            <FormItem style={{ float: 'right', whiteSpace: 'nowrap' }}>
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

  // 跳转到编辑页面
  update = (flag, record) => {
    router.push(`/demo/update?id=${record.id}`);
  };

  // 跳转到添加页面
  add = () => {
    router.push('/demo/add');
  };

  detail = record => {
    router.push(`/demo/detail?id=${record.id}`);
  };

  // 删除
  delete = record => {
    this.loading(true);
    request('/empty-item/demo/delete', {
      method: 'POST',
      data: {
        id: record.id,
      },
    }).then(res => {
      if (res.code === 'SUCCESS') {
        notification.success({
          message: res.code,
          description: res.msg,
        });
        this.handleFormReset();
      } else {
        notification.error({
          message: res.code,
          description: res.msg,
        });
      }
      this.loading();
    });
  };

  render() {
    const { list, loading } = this.state;
    // 定义表格各列
    const columns = [
      {
        title: '图片',
        render(item, record) {
          return <img src={imgUrl + record.url} style={{ width: 100 }} />;
        },
      },
      {
        title: '图片路径',
        dataIndex: 'url',
        render(item) {
          return (
            <Tooltip title={item}>
              <div className="remark">{item}</div>
            </Tooltip>
          );
        },
      },
      {
        title: '类型',
        dataIndex: 'type',
        render(item) {
          switch (item) {
            case 1:
              return 'banner';
            case 2:
              return '海报';
            default:
          }
          return '';
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        render(item) {
          return <div className="remark">{item}</div>;
        },
      },
      {
        title: '创建日期',
        dataIndex: 'createdAt',
        render(item) {
          return moment(item).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.detail(record)}>查看</a>
            {judgePageAuth('editAuthList') &&
              <a onClick={() => this.update(true, record)} className="marginLeft">
                编辑
              </a>
            }
            {judgePageAuth('deleteAuthList') &&
              <Popconfirm
                title="确定删除？"
                onConfirm={() => this.delete(record)}
                okText="确定"
                cancelText="取消"
                className="marginLeft"
              >
                <a>删除</a>
              </Popconfirm>
            }
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="权限可控的列表页">
        <Card>
          <Row>
            {this.renderForm()}
            {judgePageAuth('addAuthList') &&
              <Button icon="plus" type="primary" onClick={() => this.add()}>
                新建
              </Button>
            }
          </Row>
          <Row className="marginTop">
            <Table
              dataSource={list}
              rowKey="id"
              columns={columns}
              loading={loading}
              bordered={false}
              scroll={{ x: 'max-content' }}
              pagination={{
                pageSize: 10,
                showQuickJumper: true,
              }}
            />
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default List;

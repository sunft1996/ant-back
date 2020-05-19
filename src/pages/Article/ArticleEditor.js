/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import styles from './index.less';
import {
  message,
  Popconfirm,
  Row,
  Col,
  Card,
  Table,
  Upload,
  Modal,
  Select,
  Tag,
  Checkbox,
  Badge,
  Divider,
  DatePicker,
  InputNumber,
  Icon,
  Form,
  Input,
  Button,
  List,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PropTypes from 'prop-types';
import moment from 'moment';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { imgUrl } from '@/global';
import E from 'wangeditor';
import router from 'umi/router';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
@connect(({ article, loading }) => ({
  article,
  loading: loading.models.rule,
}))
@Form.create()
class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      pageSize: 10,
    };
  }

  componentDidMount() {
    const elemMenu = this.refs.editorElemMenu;
    const elemBody = this.refs.editorElemBody;
    const editor = new E(elemMenu, elemBody);
    const { dispatch, form } = this.props;
    const { article } = this.props;
    const id = this.props.location.query.id;
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      console.log(editor.txt.html());
      this.setState({
        // editorContent: editor.txt.text()
        editorContent: editor.txt.html(),
      });
    };
    //   // 自定义配置颜色（字体颜色、背景色）
    //   editor.customConfig.colors = [
    //     '#000000',
    //     '#eeece0',
    //     '#1c487f',
    //     '#4d80bf',
    //     '#c24f4a',
    //     '#8baa4a',
    //     '#7b5ba1',
    //     '#46acc8',
    //     '#f9963b',
    //     '#ffffff'
    // ]
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
    ];
    editor.customConfig.uploadImgShowBase64 = false;
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      let file;
      if (files && files.length) {
        file = files[0];
      } else {
        return;
      }
      var formData = new FormData();
      formData.append('file', file);
      fetch('/empty-item/api/uploadImg', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(response => console.log(insert(imgUrl + response.data.url)))
        .catch(error => console.error('Error:', error));
    };
    editor.create();
    if (id) {
      dispatch({
        type: 'article/details',
        payload: {
          id: id,
        },
      }).then(() => {
        const { article } = this.props;
        editor.txt.html(article.current.content);
      });
    }
    // editor.txt.html('<p>用 JS 设置的内容</p>')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/clearDetails',
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    const { editorContent } = this.state;
    const id = this.props.location.query.id;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'article/saveOrUpdate',
          payload: {
            id: id != null ? id : null,
            ...values,
            content: editorContent,
          },
        }).then(res => {
          if (res.code === 'SUCCESS') {
            router.go(-1);
          }
        });
      }
    });
  };
  cancel = () => {
    router.go(-1);
  };
  render() {
    const { form, location, article } = this.props;
    const title = location.query.type === 'add' ? '写文章' : '编辑文章';
    return (
      <PageHeaderWrapper title={title}>
        <Card>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 17 }} label="标题">
              {form.getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入！' }],
                initialValue: article.current.title,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 17 }} label="类型">
              {form.getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择！' }],
                initialValue: article.current.type,
              })(
                <Select>
                  <Option value={1}>笔记</Option>
                  <Option value={2}>博客</Option>
                </Select>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 17 }} label="摘要">
              {form.getFieldDecorator('remark', {
                rules: [],
                initialValue: article.current.remark,
              })(<TextArea placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 17 }} label="内容">
              {form.getFieldDecorator('content', {
                rules: [],
              })(
                <div className="shop">
                  <div className="text-area">
                    <div
                      ref="editorElemMenu"
                      style={{ backgroundColor: '#f1f1f1', border: '1px solid #ccc' }}
                      className={styles.editorElemMenu}
                    ></div>
                    <div
                      style={{
                        height: 600,
                        border: '1px solid #ccc',
                        borderTop: 'none',
                      }}
                      ref="editorElemBody"
                      className={styles.editorElemBody}
                    ></div>
                  </div>
                </div>
              )}
            </FormItem>
            <div className="flexCenter">
              <Button onClick={() => this.cancel()}>取消</Button>
              <Button type="primary" className="marginLeft" htmlType="submit">
                提交
              </Button>
            </div>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default ArticleEditor;

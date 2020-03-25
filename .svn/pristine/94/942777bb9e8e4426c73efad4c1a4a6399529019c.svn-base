import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Card, Table, Modal, Select, message, Form, Input, Button, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
class CreateForm extends PureComponent {
  static defaultProps = {
    handleAdd: () => {},
    handleAddModalVisible: () => {},
    menu: {
      allmenus: [],
      total: 20,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      menuType: 'button',
    };
  }

  onSelect = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (fieldsValue.resourceType === 'button') {
        this.setState({
          menuType: fieldsValue.resourceType,
        });
      }
    });
  };

  render() {
    const { form, handleAddModalVisible, handleAdd, modalVisible, menu, isPageAuth } = this.props;
    const { menuType } = this.state;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        handleAdd(fieldsValue, form);
      });
    };
    const allmenus = menu.allmenus ? menu.allmenus : [];
    const filterData = array => {
      return array.filter(item => {
        return item.resourceType === 'menu';
      });
    };

    // 新建菜单->选择父级菜单时的数据->格式化
    const formateData = data => {
      if (Array.isArray(data)) {
        return filterData(data).map(item => {
          return item.childData
            ? {
                title: item.name,
                value: item.id,
                key: item.id,
                children: formateData(item.childData),
              }
            : {
                title: item.name,
                value: item.id,
                key: item.id,
              };
        });
      }
      return [];
    };
    // 新建页面权限->选择页面时的数据->格式化
    const formatePageData = data => {
      if (Array.isArray(data)) {
        return data.map(item => {
          return {
            title: item.name,
            value: item.id,
            key: item.id,
            children: item.resourceType === 'button' ? null : formatePageData(item.childData),
            selectable: item.resourceType === 'button',
          };
        });
      }
      return [];
    };
    const treeData = allmenus.length === 0 ? [] : formateData(allmenus);
    const pageData = allmenus.length === 0 ? [] : formatePageData(allmenus);
    treeData.unshift({
      title: '无',
      value: 0,
      key: 0,
    });

    // 新建菜单需要填的表单
    const menuForm = !isPageAuth && (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入菜单名！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单编码">
          {form.getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入菜单编码！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限字符串">
          {form.getFieldDecorator('permission', {
            rules: [{ required: true, message: '请输入权限字符串！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单URL">
          {form.getFieldDecorator('href', {
            rules: [{ required: true, message: '请输入菜单URL！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父级菜单">
          {form.getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择父级菜单！' }],
          })(
            <TreeSelect
              style={{ width: 300 }}
              // value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData}
              placeholder="Please select"
              treeDefaultExpandAll
            />
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('remark', {
            rules: [{ required: true, message: '请输入备注！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
          {form.getFieldDecorator('resourceType', {
            rules: [{ required: true, message: '请输入类型！' }],
          })(
            <Select style={{ width: 120 }} onChange={this.onSelect}>
              <Option value="menu">menu</Option>
              <Option value="button">button</Option>
            </Select>
          )}
        </FormItem>
        {menuType === 'button' && (
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="页面位置">
            {form.getFieldDecorator('sort')(<Input placeholder="请输入" />)}
          </FormItem>
        )}
      </Form>
    );

    // 新建页面权限需要填的表单
    const pageAuthForm = isPageAuth && (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限名">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入权限名！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限编码">
          {form.getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入权限编码！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="页面">
          {form.getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择页面！' }],
          })(
            <TreeSelect
              style={{ width: 300 }}
              // value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={pageData}
              placeholder="Please select"
              treeDefaultExpandAll
            />
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
          {form.getFieldDecorator('resourceType', {
            initialValue: 'pageAuth',
            rules: [{ required: true, message: '请选择类型！' }],
          })(
            <Select style={{ width: 120 }} onChange={this.onSelect} disabled>
              <Option value="pageAuth">pageAuth</Option>
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('remark', {
            rules: [{ required: true, message: '请输入备注！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Form>
    );
    return (
      <Modal
        maskClosable={false}
        destroyOnClose
        title={!isPageAuth ? '新建菜单' : '新建页面权限'}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleAddModalVisible()}
      >
        {!isPageAuth ? menuForm : pageAuthForm}
      </Modal>
    );
  }
}

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    currentRecord: {},
  };

  render() {
    const {
      updateModalVisible,
      handleUpdateModalVisible,
      handleUpdate,
      form,
      currentRecord,
      isPageAuth,
      menu,
    } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (currentRecord.id) {
          handleUpdate(fieldsValue, currentRecord.id);
        }
      });
    };
    const allmenus = menu.allmenus ? menu.allmenus : [];
    const filterData = array => {
      return array.filter(item => {
        return item.resourceType === 'menu' && item.id !== currentRecord.id;
      });
    };

    // 新建菜单->选择父级菜单时的数据->格式化
    const formateData = data => {
      if (Array.isArray(data)) {
        return filterData(data).map(item => {
          return item.childData
            ? {
                title: item.name,
                value: item.id,
                key: item.id,
                children: formateData(item.childData),
              }
            : {
                title: item.name,
                value: item.id,
                key: item.id,
              };
        });
      }
      return [];
    };

    const treeData = allmenus.length === 0 ? [] : formateData(allmenus);
    treeData.unshift({
      title: '无',
      value: 0,
      key: 0,
    });

    // 编辑菜单需要填的表单
    const menuForm = !isPageAuth && (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名">
          {form.getFieldDecorator('name', {
            initialValue: currentRecord.name,
            rules: [{ required: true, message: '请输入菜单名！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单编码">
          {form.getFieldDecorator('code', {
            initialValue: currentRecord.code,
            rules: [{ required: true, message: '请输入菜单编码！' }],
          })(<Input placeholder="请输入" disabled />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限字符串">
          {form.getFieldDecorator('permission', {
            initialValue: currentRecord.permission,
            rules: [{ required: true, message: '请输入权限字符串！' }],
          })(<Input placeholder="请输入" disabled />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单URL">
          {form.getFieldDecorator('href', {
            initialValue: currentRecord.href,
            rules: [{ required: true, message: '请输入菜单URL！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父级菜单">
          {form.getFieldDecorator('parentId', {
            initialValue: currentRecord.parentId,
            rules: [{ required: true, message: '请选择父级菜单！' }],
          })(
            <TreeSelect
              style={{ width: 300 }}
              // value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData}
              placeholder="Please select"
              treeDefaultExpandAll
            />
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
          {form.getFieldDecorator('resourceType', {
            initialValue: currentRecord.resourceType,
            rules: [{ required: true, message: '请输入类型！' }],
          })(
            <Select style={{ width: 120 }} onChange={this.onSelect}>
              <Option value="menu">menu</Option>
              <Option value="button">button</Option>
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="页面位置">
          {form.getFieldDecorator('sort', {
            initialValue: currentRecord.sort,
            rules: [{ required: true, message: '请输入页面位置' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('remark', {
            initialValue: currentRecord.remark,
            rules: [{ required: true, message: '请输入备注！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Form>
    );

    // 编辑页面权限需要填的表单
    const pageAuthForm = isPageAuth && (
      <Form>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限名">
          {form.getFieldDecorator('name', {
            initialValue: currentRecord.name,
            rules: [{ required: true, message: '请输入权限名！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限编码">
          {form.getFieldDecorator('code', {
            initialValue: currentRecord.code,
            rules: [{ required: true, message: '请输入权限编码！' }],
          })(<Input placeholder="请输入" disabled />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('remark', {
            initialValue: currentRecord.remark,
            rules: [{ required: true, message: '请输入备注！' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Form>
    );

    return (
      <Modal
        maskClosable={false}
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={!isPageAuth ? '编辑菜单' : '编辑页面权限'}
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {!isPageAuth ? menuForm : pageAuthForm}
      </Modal>
    );
  }
}

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.rule,
}))
class MenuControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateModalVisible: false,
      addmodalVisible: false,
      currentRecord: null,
      isPageAuth: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetch',
      payload: {},
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'menu/fetch',
      payload: {
        pageNo: 1,
      },
    });
  };

  renderCell = (text, width) => (
    <div
      style={{
        width: `${width}`,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {text}
    </div>
  );

  handleUpdateModalVisible = (flag, record, isPageAuth) => {
    const { dispatch } = this.props;
    if (flag) {
      dispatch({
        type: 'menu/fetchAll',
      });
    }
    this.setState({
      isPageAuth,
      updateModalVisible: !!flag,
      currentRecord: record,
    });
  };

  handleAddModalVisible = (flag, isPageAuth) => {
    const { dispatch } = this.props;
    if (flag) {
      dispatch({
        type: 'menu/fetchAll',
      });
    }
    this.setState({
      isPageAuth,
      addmodalVisible: !!flag,
    });
  };

  handleFormateData = data => {
    return data.map(item => {
      return Array.isArray(item.childData)
        ? {
            name: item.name,
            code: item.code,
            permission: item.permission,
            href: item.href,
            remark: item.remark,
            resourceType: item.resourceType,
            key: item.id,
            id: item.id,
            parentId: item.parentId,
            sort: item.sort,
            children: this.handleFormateData(item.childData),
          }
        : {
            name: item.name,
            code: item.code,
            permission: item.permission,
            href: item.href,
            remark: item.remark,
            resourceType: item.resourceType,
            key: item.id,
            id: item.id,
            sort: item.sort,
            parentId: item.parentId,
          };
    });
  };

  handleAdd = (fields, form) => {
    const { dispatch } = this.props;
    //add permission
    fields.permission = fields.code;
    dispatch({
      type: 'menu/add',
      payload: fields,
    }).then(res => {
      if (res.code === 'SUCCESS') {
        form.resetFields();
        this.handleAddModalVisible();
      }
    });
  };

  handleUpdate = (fields, id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/update',
      payload: {
        ...fields,
        id,
      },
    });
    this.handleUpdateModalVisible();
  };

  handleDeleteConfirm = record => {
    Modal.confirm({
      title: 'Confirm',
      content: '确定删除这条任务？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleDelete(record);
      },
    });
  };

  handleDelete = record => {
    const { dispatch } = this.props;
    const { id, children } = record;
    if (children) {
      setTimeout(() => message.warning('请先删除子菜单！'), 500);
    } else {
      const ids = [id];
      dispatch({
        type: 'menu/remove',
        payload: ids,
      });
    }
  };

  render() {
    const { menu, dispatch } = this.props;
    const { updateModalVisible, addmodalVisible, currentRecord, isPageAuth } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleAddModalVisible: this.handleAddModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        render: text => <span style={{ whiteSpace: 'noWrap' }}>{text}</span>,
      },
      {
        title: '路径',
        dataIndex: 'href',
        render: text => <span style={{ whiteSpace: 'noWrap' }}>{text}</span>,
      },
      {
        title: '菜单编码',
        dataIndex: 'code',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '类型',
        dataIndex: 'resourceType',
      },
      {
        title: '操作',
        render: (text, record) => (
          <p style={{ whiteSpace: 'noWrap' }}>
            <a
              onClick={() => {
                if (record.resourceType === 'pageAuth') {
                  this.handleUpdateModalVisible(true, record, true);
                } else {
                  this.handleUpdateModalVisible(true, record, false);
                }
              }}
            >
              编辑
            </a>
            &nbsp;&nbsp;
            <a onClick={() => this.handleDeleteConfirm(record)}>删除</a>
          </p>
        ),
      },
    ];
    const dataSource = Array.isArray(menu.rows) ? this.handleFormateData(menu.rows) : menu.rows;

    return (
      <PageHeaderWrapper title="菜单管理">
        <Card>
          {/* 参数1:显示隐藏，参数2:isPageAuth */}
          <Button
            icon="plus"
            type="primary"
            onClick={() => this.handleAddModalVisible(true, false)}
          >
            菜单
          </Button>
          <Button
            icon="plus"
            type="default"
            onClick={() => this.handleAddModalVisible(true, true)}
            style={{ marginLeft: 20 }}
          >
            页面权限
          </Button>
          <Row style={{ marginTop: 20 }}>
            <Table
              dataSource={dataSource}
              rowKey="id"
              rowClassName="textCenter"
              columns={columns}
              loading={menu.loading}
              bordered={false}
              style={{ overflowX: 'scroll' }}
            />
          </Row>
          <CreateForm
            {...parentMethods}
            modalVisible={addmodalVisible}
            menu={menu}
            dispatch={dispatch}
            isPageAuth={isPageAuth}
          />
          {currentRecord && Object.keys(currentRecord).length ? (
            <UpdateForm
              {...updateMethods}
              dispatch={dispatch}
              currentRecord={currentRecord}
              updateModalVisible={updateModalVisible}
              menu={menu}
              isPageAuth={isPageAuth}
            />
          ) : null}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

MenuControl.propTypes = {
  menu: PropTypes.object,
};

MenuControl.defaultProps = {
  menu: {
    rows: [],
    totalPage: 5,
    totalCount: 10,
  },
};

export default MenuControl;

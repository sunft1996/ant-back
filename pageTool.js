/* eslint-disable no-unused-expressions */
/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-28 10:47:40
 * @LastEditTime: 2020-04-30 10:19:19
 */

const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
const t = require('babel-types');
const pageConfig = require('./newPage');

const source = fs.readFileSync(path.join(__dirname, '/src/pages/Demo/demo.js'), 'utf-8');

class CreatePage {
  constructor(name, moduleName, operation) {
    this.source = source;
    this.name = name;
    this.moduleName = moduleName;
    this.operation = operation;
  }

  setColumns(columns) {
    let Columns = ``;
    columns.forEach(item => {
      if (item.width) {
        Columns += `{
                    title: '${item.title}',
                    dataIndex: '${item.dataIndex}',
                    width: '${item.width}',
                },`;
      } else {
        Columns += `{
                    title: '${item.title}',
                    dataIndex: '${item.dataIndex}',
                },`;
      }
    });
    if (Array.isArray(this.operation) && this.operation.length > 0) {
      let updateButton = ``;
      let deleteButton = ``;
      if (this.operation.indexOf('update') !== -1) {
        updateButton = `<a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>`;
      }
      if (this.operation.indexOf('delete') !== -1) {
        deleteButton = `<Popconfirm
                title="确定删除？"
                onConfirm={() => this.delete(true, record)}
                okText="确定"
                cancelText="取消"
                className="marginLeft"
              >
                <a>删除</a>
              </Popconfirm>`;
      }
      Columns += `{
                title: '操作',
                render: (text, record) => (
                    <Fragment>
                      ${updateButton}
                      ${deleteButton}
                    </Fragment>
                  ),
            },`;
    }
    this.columns = columns;
    this.source = this.source.replace('// columnsFlag', Columns);
  }

  setSearchForm(columns) {
    let searhForm = ``;
    columns.forEach(item => {
      if (item.hideInSearch) {
        return;
      }
      if (item.valueEnum) {
        let selectOptions = ``;
        for (const key in item.valueEnum) {
          selectOptions += `<Select.Option value={${key}}>${item.valueEnum[key]}</Select.Option>\n`;
        }
        searhForm += `<Col span={24} md={24} lg={8}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="${item.title}">
                  {getFieldDecorator('${item.dataIndex}')(
                    <Select>
                    ${selectOptions}
                  </Select>
                  )}
                </FormItem>
                </Col>`;
        return;
      }
      searhForm += `<Col span={24} md={24} lg={8}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="${item.title}">
                  {getFieldDecorator('${item.dataIndex}')(<Input />)}
                </FormItem>
              </Col>`;
    });

    const searchContent = `
        handleSearch = e => {
            const { dispatch, form } = this.props;
            e.preventDefault();
            form.validateFields((err, fieldsValue) => {
                if (!err) {
                    const value = {
                        ...fieldsValue
                    };
                    dispatch({
                        type: '${this.moduleName}/fetch',
                        payload: {
                            ...value,
                        },
                    });
                }
            });
        };
    
        // 重置
        handleFormReset = () => {
            const { form, dispatch } = this.props;
            form.resetFields();
            dispatch({
                type: '${this.moduleName}/fetch',
                payload: {},
            });
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
                ${searhForm}
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
        };`;

    this.source = this.source.replace('// searchFormFlag', searchContent);
  }

  setRemove() {
    const deleteFunc = `delete = (flag, record) => {
            const { dispatch } = this.props;
            dispatch({
                type: '${this.moduleName}/delete',
                payload: {
                    id: record.id,
                },
            });
        };`;
    this.source = this.source.replace('// deleteFlag', deleteFunc);
  }
}

const newPage = new CreatePage(pageConfig.name, pageConfig.moduleName, pageConfig.operation);
newPage.setColumns(pageConfig.columns);
newPage.setSearchForm(pageConfig.columns);
newPage.setRemove();
// console.log(newPage.source)
fs.mkdir(path.join(__dirname, `/src/pages/${pageConfig.name}`), error => {
  if (error) {
    console.log(error);
    return;
  }
  fs.writeFile(
    path.join(__dirname, `/src/pages/${pageConfig.name}/${pageConfig.name}.js`),
    newPage.source,
    'utf8',
    err => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('生成成功');
    }
  );
});

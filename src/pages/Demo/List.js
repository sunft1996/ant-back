import React, { useRef, useState } from 'react';
import { Button, Drawer, Tag } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 200,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'all',
    valueEnum: {
      all: {
        text: '全部',
        status: 'Default',
      },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: 120,
    render: (_, row) =>
      row.labels.map(({ name, id, color }) => (
        <Tag
          color={`#${color}`}
          key={id}
          style={{
            margin: 4,
          }}
        >
          {name}
        </Tag>
      )),
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    hideInForm: true,
  },
  {
    title: 'option',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a href={row.html_url} target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        onSelect={() => action.reload()}
        menus={[
          {
            key: 'copy',
            name: '复制',
          },
          {
            key: 'delete',
            name: '删除',
          },
        ]}
      />,
    ],
  },
];
export default () => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Drawer width={600} onClose={() => setVisible(false)} visible={visible}>
        <Button
          style={{
            margin: 8,
          }}
          onClick={() => {
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          刷新
        </Button>
        <Button
          onClick={() => {
            if (actionRef.current) {
              actionRef.current.reset();
            }
          }}
        >
          重置
        </Button>
        <ProTable columns={columns} type="form" onSubmit={params => console.log(params)} />
      </Drawer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const data = await request(
            'https://api.github.com/repos/ant-design/ant-design-pro/issues',
            {
              params: { ...params, page: params.current, per_page: params.pageSize },
            },
          );
          const totalObj = await request(
            'https://api.github.com/repos/ant-design/ant-design-pro/issues?per_page=1',
            {
              params,
            },
          );
          return {
            data,
            page: params.current,
            success: true,
            total:
              (
                totalObj[0] || {
                  number: 0,
                }
              ).number - 56,
          };
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="基础 Table"
        toolBarRender={() => [
          <Button key="3" type="primary">
            新建
          </Button>,
        ]}
      />
    </>
  );
};
/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-28 10:47:40
 * @LastEditTime: 2020-04-28 11:01:22
 */



module.exports = {
    columns : [{
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
        title: '排序方式',
        key: 'direction',
        hideInTable: true,
        dataIndex: 'direction',
        valueEnum: {
            asc: '正序',
            desc: '倒序',
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
    }],
}
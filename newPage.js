/*
 * @Descripttion:
 * @Author: sunft
 * @Date: 2020-04-29 18:04:01
 * @LastEditTime: 2020-04-29 18:34:27
 */

module.exports = {
  name: 'test1',
  moduleName: 'test',
  operation: ['add', 'update', 'delete'],
  columns: [
    {
      title: '序号1',
      dataIndex: 'index',
      required: true,
      width: 72,
    },
    {
      title: '序号2',
      dataIndex: 'dd',
      required: false,
    },
    {
      title: '状态',
      dataIndex: 'state',
      required: true,
      initialValue: 'all',
      valueEnum: {
        0: '全部',
        1: '正常',
        2: '失效',
      },
    },
  ],
};

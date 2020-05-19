export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/general/chartList': (req, res) => {
    const list = [
      {
        time: "2020-05-18",
        type: "1",
        amount: 102000,
        num: 303
      },
      {
        time: "2020-05-19",
        type: "1",
        amount: 131000,
        num: 200
      },
      {
        time: "2020-05-20",
        type: "1",
        amount: 83000,
        num: 400
      },
      {
        time: "2020-05-21",
        type: "1",
        amount: 137000,
        num: 30
      },
      {
        time: "2020-05-22",
        type: "1",
        amount: 61000,
        num: 99
      },
      {
        time: "2020-05-23",
        type: "1",
        amount: 100000,
        num: 230
      },
      {
        time: "2020-05-24",
        type: "1",
        amount: 50000,
        num: 130
      }
    ];
    res.end(JSON.stringify({
      code:'SUCCESS',
      data:list
    }));
  },
};
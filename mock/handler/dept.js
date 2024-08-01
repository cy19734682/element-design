const { _save, listSelect } = require("../database");

const cascaderData = require("../data/cascaderData");

_save("dept", cascaderData.data);

module.exports = [
  // 列表查询
  {
    url: "/mock/dept",
    type: "get",
    response: (config) => {
      const r = listSelect("dept", config.query);
      return {
        code: 0,
        data: r,
      };
    },
  },
];

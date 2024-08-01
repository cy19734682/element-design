const { _save, listSelect } = require("../database");

const selectData = require("../data/selectData");

_save("brand", selectData.data);

module.exports = [
  // 列表查询
  {
    url: "/mock/brand",
    type: "get",
    response: (config) => {
      const r = listSelect("brand", config.query);
      return {
        code: 0,
        data: r,
      };
    },
  },
];

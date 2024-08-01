const {
  _save,
  _delete,
  _edit,
  listSelect,
  pageSelect,
} = require("../database");

const btTablePageData = require("../data/tablePage");

_save("bt-table", btTablePageData.data);

module.exports = [
  // 分页列表查询
  {
    url: "/mock/bt-table-page",
    type: "get",
    response: (config) => {
      const r = pageSelect("bt-table", config.query);
      return {
        code: 0,
        data: r,
      };
    },
  },
  // 列表查询
  {
    url: "/mock/bt-table",
    type: "get",
    response: (config) => {
      const r = listSelect("bt-table", config.query);
      return {
        code: 0,
        data: r,
      };
    },
  },

  // 新增
  {
    url: "/mock/bt-table",
    type: "post",
    response: (config) => {
      const r = config.body;
      let typeR = Object.prototype.toString.call(r).replace(/\[object |]/g, "");
      const s = _save("bt-table", typeR === "Array" ? r : [r]);
      return {
        code: s ? 0 : -1,
        msg: "",
      };
    },
  },

  // 编辑
  {
    url: "/mock/bt-table",
    type: "put",
    response: (config) => {
      const r = config.body;
      const s = _edit("bt-table", r);
      return {
        code: s ? 0 : -1,
        msg: "",
      };
    },
  },

  // 删除
  {
    url: "/mock/bt-table",
    type: "delete",
    response: (config) => {
      const { ids } = config.body;
      const s = _delete(
        "bt-table",
        (e) => ids && String(ids).split(",").indexOf(String(e.id)) > -1
      );
      return {
        code: s ? 0 : -1,
        msg: "",
      };
    },
  },
];

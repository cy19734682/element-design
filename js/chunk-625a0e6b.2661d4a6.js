(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-625a0e6b"],{"4c8e":function(t,e,a){},a0e9:function(t,e,a){"use strict";a("4c8e")},deb8:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("h1",[t._v(t._s(t.$t("route.dashboard")))]),a("appHeader"),t._l(t.routeArr,(function(e,r){return a("el-row",{key:"f_"+r,attrs:{gutter:12}},t._l(e.children,(function(n,s){return a("el-col",{key:"c"+s,attrs:{span:8}},[a("el-card",{attrs:{shadow:"hover"}},[a("router-link",{key:"item"+r,staticClass:"linkA",attrs:{to:e.path+"/"+n.path,title:n.meta.title}},[a("span",{staticClass:"txt"},[t._v(t._s(n.meta.title))])])],1)],1)})),1)}))],2)},n=[],s=a("dd0e"),i={name:"index",components:{appHeader:s["a"]},data(){return{active:[],routeArr:[]}},computed:{language:{get(){return this.$store.getters.language},set(t){this.$i18n.locale=t,this.$store.dispatch("app/setLanguage",t)}}},created(){this.routeArr=this.$router.options.routes.filter(t=>{if(t.name&&"login"!==t.name&&"index"!==t.name)return t})},methods:{}},o=i,c=(a("a0e9"),a("2877")),u=Object(c["a"])(o,r,n,!1,null,"804dcf5c",null);e["default"]=u.exports}}]);
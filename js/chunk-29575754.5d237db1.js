(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29575754"],{"7cfe":function(e,r,t){"use strict";t.r(r);var o=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{ref:"username",attrs:{placeholder:e.$t("login.username"),name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.username,callback:function(r){e.$set(e.loginForm,"username",r)},expression:"loginForm.username"}})],1),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{ref:"password",attrs:{type:"password",placeholder:e.$t("login.password"),name:"password",tabindex:"2",autocomplete:"on"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.handleLogin.apply(null,arguments)}},model:{value:e.loginForm.password,callback:function(r){e.$set(e.loginForm,"password",r)},expression:"loginForm.password"}})],1),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(r){return r.preventDefault(),e.handleLogin.apply(null,arguments)}}},[e._v(" "+e._s(e.$t("login.logIn"))+" ")])],1)],1)},n=[],i={name:"login",data(){const e=(e,r,t)=>{r.length<6?t(new Error("The password can not be less than 6 digits")):t()};return{loginForm:{username:"admin",password:"123456",validateCode:void 0,uuid:void 0},loginRules:{username:[{required:!0,trigger:"blur"}],password:[{required:!0,trigger:"blur",validator:e}]},loading:!1,otherQuery:{},captchaUrl:void 0}},watch:{$route:{handler:function(e){const r=e.query;r&&(this.redirect=r.redirect,this.otherQuery=this.getOtherQuery(r))},immediate:!0}},created(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus();const e=document.querySelector(".el-message-box__wrapper"),r=document.querySelector(".v-modal");e&&r&&(e.parentNode.removeChild(e),r.parentNode.removeChild(r))},methods:{handleLogin(){this.$refs.loginForm.validate(e=>{if(!e)return console.log("error submit!!"),!1;this.loading=!0,this.$store.dispatch("user/login",this.loginForm).then(()=>{this.$router.replace({path:this.redirect||"/",query:this.otherQuery}),this.loading=!1},e=>{console.warn(e),this.loading=!1}).catch(e=>{console.warn(e),this.loading=!1})})},getOtherQuery(e){return Object.keys(e).reduce((r,t)=>("redirect"!==t&&(r[t]=e[t]),r),{})}}},s=i,a=(t("7e6a"),t("2877")),l=Object(a["a"])(s,o,n,!1,null,"dff62d26",null);r["default"]=l.exports},"7e6a":function(e,r,t){"use strict";t("97c6")},"97c6":function(e,r,t){}}]);
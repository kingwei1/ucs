(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["system"],{"0f72":function(o,s,t){},cb48:function(o,s,t){"use strict";t.r(s);var e=function(){var o=this,s=o.$createElement,t=o._self._c||s;return t("div",{staticClass:"login-page-wrap"},[t("div",{staticClass:"login-form"},[t("el-form",{ref:"loginForm",attrs:{model:o.loginForm,rules:o.rules}},[t("el-form-item",{attrs:{label:"账号",prop:"userAccount"}},[t("el-input",{attrs:{placeholder:"请输入账号"},model:{value:o.loginForm.userAccount,callback:function(s){o.$set(o.loginForm,"userAccount",s)},expression:"loginForm.userAccount"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:o.loginForm.password,callback:function(s){o.$set(o.loginForm,"password",s)},expression:"loginForm.password"}})],1),t("el-form-item",{attrs:{label:" "}},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:o.loading},on:{click:o.handleLogin}},[o._v("登录")])],1)],1)],1),t("div",{staticClass:"log-view"},o._l(o.log,(function(s,e){return t("div",{key:e,staticClass:"log-item",domProps:{innerHTML:o._s(s)}})})),0)])},i=[],n=t("2f62"),r=t("ae88"),l={name:"",data(){return{loading:!1,loginForm:{userAccount:"zhangjiancheng1",password:"888888"},rules:{userAccount:{required:!0,message:"请输入账号",trigger:"blur change"},password:{required:!0,message:"请输入密码",trigger:"blur change"}},log:[]}},methods:{...Object(n["c"])([r["a"].UPDATE_USER_INFO]),async doHandleLoginApi(o,s){try{const t=await this.$xw.login({userAccount:o,password:s});this.loading=!1,this.log.push(`时间: ${(new Date).toLocaleString()}<br/>返回结果: ${JSON.stringify(t)}<br/>`),this.setLog({log:t,action:"登录[login]"}),200===t.status&&(this.$message.success("登录成功"),this[r["a"].UPDATE_USER_INFO](this.$xw.userInfo))}catch(t){this.setLog({log:t,action:"登录[login]"}),this.loading=!1,console.log("handle login api error:",t)}},async handleLogin(){this.$refs.loginForm.validate(o=>{o&&(this.setLog({log:"开始执行登录"}),this.loading=!0,this.doHandleLoginApi(this.loginForm.userAccount,this.loginForm.password))})}}},a=l,c=(t("e9d8"),t("2877")),g=Object(c["a"])(a,e,i,!1,null,"4b65f87c",null);s["default"]=g.exports},e9d8:function(o,s,t){"use strict";var e=t("0f72"),i=t.n(e);i.a}}]);
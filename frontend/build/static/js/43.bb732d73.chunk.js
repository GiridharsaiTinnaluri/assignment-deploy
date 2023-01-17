"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[43],{1043:function(e,s,a){a.r(s);var n=a(4942),r=a(1413),i=a(8152),t=a(2791),o=a(8820),l=a(3263),d=a(4880),m=a(9434),c=a(7651),u=a(184);s.default=function(){var e=(0,t.useState)({username:"",email:"",password:"",confirmPassword:""}),s=(0,i.Z)(e,2),a=s[0],p=s[1],h=(0,m.I0)(),w=(0,m.v9)((function(e){return e.auth})),f=(0,t.useState)({}),g=(0,i.Z)(f,2),j=g[0],x=g[1],b=(0,d.k6)();(0,t.useEffect)((function(){var e=setTimeout((function(){h(c.Y.message(""))}),2e3);return function(){clearTimeout(e)}}));var v=function(e){p((function(s){return(0,r.Z)((0,r.Z)({},s),{},(0,n.Z)({},e.target.name,e.target.value))}))};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("section",{className:"Login-header",children:(0,u.jsxs)("h1",{children:[(0,u.jsx)(o.SPH,{}),"Register"]})}),(0,u.jsx)("p",{className:"not-valid",children:w.message}),(0,u.jsx)("section",{children:(0,u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),h(c.Y.isLoading()),function(){var e={};""===a.username?e.username="Username is requied":Number.parseInt(a.username.length)<5&&(e.username="Username should be min 5 characters"),""===a.email?e.email="Email is required!":/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(a.email)||(e.email="Invalid Email");return""===a.password?e.password="password required!":""===a.confirmPassword?e.confirmPassword="confirm Password required!":a.password.length<5||a.confirmPassword.length<5?(e.password="password should be min 5 characters",e.confirmPassword="password should be min 5 characters"):a.password!==a.confirmPassword&&(e.password="Password not matched",e.confirmPassword="Password not matched"),x((0,r.Z)({},e)),Object.keys(e).length<1}()?l.Z.post("/api/user/register",{name:a.username,email:a.email,password:a.password}).then((function(e){201===parseInt(e.status)&&(localStorage.setItem("TOKEN",e.data.token),localStorage.setItem("USER",JSON.stringify(e.data.newUser)),localStorage.setItem("USERID",JSON.stringify(e.data.newUser.id)),h(c.Y.login({user:e.data.newUser,token:e.data.token})),h(c.Y.message(e.data.message)),b.replace("/")),p({username:"",email:"",password:"",confirmPassword:""})})).catch((function(e){console.log(e);var s=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();h(c.Y.message(s))})).finally((function(){h(c.Y.stopLoading())})):h(c.Y.stopLoading())},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{htmlFor:"username",className:"input-label",children:"username"})," ",(0,u.jsx)("br",{}),(0,u.jsx)("input",{className:"input",type:"text",name:"username",value:a.username,onChange:v,placeholder:"Enter username"}),(0,u.jsx)("span",{className:"not-valid",children:j.username})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{htmlFor:"email",className:"input-label",children:"Email"})," ",(0,u.jsx)("br",{}),(0,u.jsx)("input",{className:"input",type:"email",name:"email",value:a.email,placeholder:"Enter email ...",onChange:v}),(0,u.jsx)("span",{className:"not-valid",children:j.email})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{htmlFor:"password",className:"input-label",children:"Password"})," ",(0,u.jsx)("br",{}),(0,u.jsx)("input",{className:"input",type:"password",name:"password",placeholder:"Enter password",value:a.password,onChange:v}),(0,u.jsx)("span",{className:"not-valid",children:j.password})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{htmlFor:"confirmPassword",className:"input-label",children:"Confirm Password"})," ",(0,u.jsx)("br",{}),(0,u.jsx)("input",{className:"input",placeholder:"Enter confirm password..",type:"password",name:"confirmPassword",value:a.confirmPassword,onChange:v}),(0,u.jsx)("span",{className:"not-valid",children:j.confirmPassword})]}),(0,u.jsx)("div",{children:(0,u.jsxs)("button",{type:"submit",className:"btn-login",disabled:w.isLoading,children:[" ",w.isLoading?"Loading ...":"Register"," "]})})]})})]})}}}]);
//# sourceMappingURL=43.bb732d73.chunk.js.map
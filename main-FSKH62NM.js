import{a as r}from"./chunk-P4JC2NWF.js";import{$ as a,P as n,fa as m,ga as c,ha as s,ka as l,l as p,la as f,z as i}from"./chunk-P5HLS2QV.js";var u=[{path:"researchtasks",title:"page de recherche",loadComponent:()=>import("./chunk-VOMHJGNX.js"),canActivate:[()=>p(r).isLogin()]},{path:"home",title:"page-accueil",loadComponent:()=>import("./chunk-G7FW4S47.js")},{path:"tasks",title:"taches",loadComponent:()=>import("./chunk-UDGRLPS5.js"),canActivate:[()=>p(r).isLogin()]},{path:"404",title:"page non trouv\xE9e",loadComponent:()=>import("./chunk-27XGJ2Y5.js")},{path:"",pathMatch:"full",redirectTo:"home"},{path:"**",redirectTo:"404"}];var d={providers:[a({eventCoalescing:!0}),l(u,f())]};var t=class o{static \u0275fac=function(e){return new(e||o)};static \u0275cmp=i({type:o,selectors:[["app-root"]],decls:1,vars:0,template:function(e,C){e&1&&n(0,"router-outlet")},dependencies:[s,m],encapsulation:2})};c(t,d).catch(o=>console.error(o));
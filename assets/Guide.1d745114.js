var D=Object.defineProperty;var d=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var y=(e,t,a)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,g=(e,t)=>{for(var a in t||(t={}))j.call(t,a)&&y(e,a,t[a]);if(d)for(var a of d(t))B.call(t,a)&&y(e,a,t[a]);return e};import{e as F,m as b,k as u,f as i,l as _,g as s,t as h,F as f,r as C,n as m,p as N,q as S,o as r,u as H,h as I}from"./vendor.73b88934.js";import{_ as G,c as $,a as l,b as V,d as q}from"./index.7a825d07.js";import{I as w}from"./illustration.ca06ed63.js";import{T as L,s as M,l as O,a as z,c as A,P as E,F as J,C as K}from"./Cards.87155347.js";const Q=F({data(){return{currentCity:null,mainData:[],citiy:$,apiType:l,Illustration:w,Time:L,share:M,loction:O,loction_g:z,calling:A,LogoMini:V}},created(){this.$route.params&&this.$route.params.city&&(this.currentCity=this.$route.params.city)},mounted(){this.fetchData()},computed:g({},b(["searchtext","navToggle","fullPage"])),watch:{$route(e,t){e.name!=t.name&&e.params&&e.params.city&&(this.currentCity=e.params.city,this.fetchData())},searchtext(){this.fetchData()}},components:{PageHeader:E,Footer:J,Cards:K},methods:{fetchData(){if(this.currentCity)if(Object.keys($).find(t=>t===this.currentCity)){this.mainData=[];const t=[],a={$top:3};this.searchtext&&(a.$filter=`contains(Name,'${this.searchtext}')`),l.map(o=>{t.push({url:`${o.url}/${this.currentCity}`,params:a})}),q(t).then(o=>{this.mainData=o}).catch(o=>{console.log(o)})}else this.$router.push("/");else this.$router.push("/")},routeToPage3(e){this.$router.push({name:"Touism",params:{type:e,city:this.currentCity}})},routeToPage4(e){this.$store.commit("setInformationObj",e),this.$router.push({name:"Information",params:{type:target,city:this.currentCity,id:e.ID}})},getCity(e,t){return l[e]?l[e][t]:""}}}),R=e=>(N("data-v-3edc74af"),e=e(),S(),e),U=R(()=>s("h3",null,"\u63A2\u7D22\u3002",-1)),W=["src"],X={key:0,class:"mainData_container"},Y={class:"titleBox"},Z={class:"iconText"},x=["src"],ee=["onClick"],te={key:1};function ae(e,t,a,o,se,re){const v=u("PageHeader"),k=u("Cards"),P=u("Footer");return r(),i("main",{class:m(["main_container",{fullPage:e.fullPage}])},[_(v),s("div",{id:"guidePage",class:m(["page_container",{hasHeader:!e.navToggle,fullPage:e.fullPage}])},[s("header",null,[s("div",null,[U,s("h3",null,h(e.citiy[e.currentCity]),1)]),s("img",{src:e.Illustration,alt:"Illustration"},null,8,W)]),(r(!0),i(f,null,C(e.mainData,(c,n)=>(r(),i("div",{key:n},[c.length>0?(r(),i("div",X,[s("h4",Y,[s("div",Z,[s("img",{src:e.loction},null,8,x),s("span",null,h(e.getCity(n,"title")),1)]),s("button",{class:"textBtn",onClick:p=>e.routeToPage3(e.getCity(n,"index"))},"\u66F4\u591A"+h(e.getCity(n,"name"))+"\u63A8\u85A6",9,ee)]),c.length>0?(r(),i("div",{key:0,class:m(["card_container",{more:c.length>2}])},[(r(!0),i(f,null,C(c,(p,T)=>(r(),H(k,{key:n+""+T,cardItem:p,currentType:e.getCity(n,"index")},null,8,["cardItem","currentType"]))),128))],2)):(r(),i("div",te,"Nodata"))])):I("",!0)]))),128))],2),_(P)],2)}var ue=G(Q,[["render",ae],["__scopeId","data-v-3edc74af"]]);export{ue as default};

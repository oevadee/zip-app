var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,n=Object.prototype.propertyIsEnumerable,l=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,r=(e,r)=>{for(var s in r||(r={}))t.call(r,s)&&l(e,s,r[s]);if(a)for(var s of a(r))n.call(r,s)&&l(e,s,r[s]);return e};import{u as s,a as c,r as o,M as m,L as i,B as u,C as p,A as E,p as d,P as h,S as g,b as f,H as y,c as b,f as v,d as w,e as N,I as x,g as S,h as _,i as I,y as O,j as k,k as C,F as P,l as T,N as z,m as L,n as U,o as R,q as G,X as $,s as j,t as B,v as A,T as M,w as D,x as F,z as H,D as V,E as W,G as q,J as Q,K as Y,O as J,Q as K,R as X,U as Z,V as ee,W as te,Y as ae,Z as ne,_ as le,$ as re,a0 as se,a1 as ce,a2 as oe,a3 as me,a4 as ie,a5 as ue,a6 as pe,a7 as Ee,a8 as de,a9 as he,aa as ge,ab as fe,ac as ye,ad as be}from"./vendor.c99190cf.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const n=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,r)=>{const s=new URL(e,n);if(self[t].moduleMap[s])return a(self[t].moduleMap[s]);const c=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){r(new Error(`Failed to import: ${e}`)),l(o)},onload(){a(self[t].moduleMap[s]),l(o)}});document.head.appendChild(o)})),self[t].moduleMap={}}}("/assets/");const ve=({title:e,expenseButton:t=!1,goBackButton:a=!1})=>{const n=s(),l=c((e=>e.app.popupVisible));return o.createElement("div",{className:"header"},o.createElement("div",{className:"header__menu"},o.createElement(m,{className:"header__buttons__icon",fontSize:"large",onClick:()=>{var e;n({type:"TOGGLE_NAV",payload:e})}})),o.createElement("h1",null,e),o.createElement("div",{className:"header__buttons"},t&&o.createElement(i,{to:"/expenses"},o.createElement(u,{onClick:()=>{n((e=>({type:"TOGGLE_POPUP",payload:e}))())},colorScheme:"blue"},l?"x":"New expense")),a&&o.createElement(i,{to:"/expenses"},o.createElement(p,{color:"white",size:"lg"}))))};const we=({message:e})=>o.createElement("div",{className:"message"},o.createElement(E,{src:e.user.photo}),o.createElement("div",{className:"message__info"},o.createElement("h4",null,e.user.name,o.createElement("span",{className:"message__timestamp"},e.message.timestamp)),o.createElement("p",null,e.message.message)));const Ne=e=>{var{channelName:l,icon:s=!1,url:c=null}=e,m=((e,l)=>{var r={};for(var s in e)t.call(e,s)&&l.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&a)for(var s of a(e))l.indexOf(s)<0&&n.call(e,s)&&(r[s]=e[s]);return r})(e,["channelName","icon","url"]);return console.log(l,c),o.createElement(i,{to:c},o.createElement("div",{className:"channel"+(c?"":"--withoutHover")},o.createElement("h2",null,l),s&&o.createElement(h,r({className:"channel__icon"},m))))};Ne.propTypes={channelName:d.PropTypes.string.isRequired},Ne.defaultProps={channelName:null};const xe=e=>({type:"LOGIN_USER",payload:e}),Se=({user:e,mutate:t,channels:a})=>{const n=c((e=>e.app.navOpen)),l=s();return a?o.createElement(f,{maxW:200,minW:200,className:`sidebar ${n&&"sidebar--mobileOn"}`},o.createElement("div",{className:"sidebar__user"},o.createElement("div",{className:"sidebar__userHeader"},o.createElement(E,{className:"sidebar__userHeader__avatar",src:e.photo}),o.createElement(y,{as:"h4",size:"xs"},e.name))),o.createElement("div",{className:"sidebar__selector"},o.createElement(Ne,{channelName:"Expenses",url:"/expenses"}),o.createElement(Ne,{channelName:"Settings",url:"/settings"}),o.createElement(Ne,{channelName:"Chat room",icon:!0,onClick:async()=>{const e=prompt("Enter a new channel name");e&&await b.post("/api/chat/channel",{channelName:e}),t()}}),o.createElement("div",{className:"sidebar__chatList"},a.map((({name:e,id:t})=>o.createElement(i,{to:`/chat/${t}`,key:t},o.createElement(Ne,{key:t,id:t,channelName:e})))))),o.createElement("div",{className:"sidebar__logout"},o.createElement(u,{onClick:()=>{l({type:"LOGOUT_USER",payload:null}),localStorage.removeItem("secret")},colorScheme:"pink"},"Logout"))):o.createElement(g,{color:"pink"})};Se.propTypes={user:d.PropTypes.object.isRequired},Se.defaultProps={user:null};const _e=v.initializeApp({apiKey:"AIzaSyCku5ougEQOPYHi1zz4vplMIxjNp9FhG34",authDomain:"zip-app--222.firebaseapp.com",databaseURL:"https://zip-app--222.firebaseio.com",projectId:"zip-app--222",storageBucket:"zip-app--222.appspot.com",messagingSenderId:"1066062223453",appId:"1:1066062223453:web:a67fa2964f37dc7e7a15b4",measurementId:"G-J0Q86CJK6Q"}).firestore(),Ie=v.auth();new v.auth.GoogleAuthProvider;const Oe=new Date;const ke=({channelId:e})=>{const{data:t,mutate:a}=w(`/api/chat/messages/${e}`),{register:n,handleSubmit:l,reset:r}=N(),s=c((e=>e.user.user));o.useEffect((()=>{a()}),[e]);return t?o.createElement(o.Fragment,null,o.createElement("div",{className:"chatBox"},o.createElement("div",{className:"chat__messages"},t.map((e=>o.createElement(we,{key:e.message.id,message:e}))))),o.createElement("div",{className:"chat__input"},o.createElement("form",{onSubmit:l((async t=>{const{message:n}=t,l=Oe.toString().split("+")[0];await b.post(`/api/chat/messages?userId=${s.id}`,{message:n,timestamp:l,channelId:e}),a(),r()}))},o.createElement(x,{size:"lg",name:"message",ref:n,disabled:!e,placeholder:"Start typing...",autoComplete:"off"})))):o.createElement(g,{color:"pink"})},Ce=()=>{const{channelId:e}=S();return o.createElement("div",{className:"chat"},o.createElement(ve,{title:"Chat"}),o.createElement(ke,{channelId:e}))};const Pe=_().shape({user:I().required(),value:I().required("You can't add an empty expense"),details:I().max(512,"Description is to long. You can use 512 characters.")}),Te=({user:e,users:t,mutate:a})=>{var n;const{register:l,handleSubmit:r,control:s,watch:c,reset:m,errors:i}=N({defaultValues:{user:"",value:"",details:""},resolver:O.yupResolver(Pe)}),p=c("user"),d=c("value");return o.createElement(f,{className:"expensePopup",d:"flex",alignItems:"center"},o.createElement("form",{onSubmit:r((async t=>{console.log(t),await b.post(`http://localhost:8080/api/expenses/${e.id}`,{values:t,timestamp:(new Date).toLocaleDateString()}),m(),a()}))},o.createElement(k,{w:400,textColor:"white",direction:"column",placeItems:"center",spacing:2},o.createElement(C,{name:"user",control:s,as:o.createElement(P,{isInvalid:i.user},o.createElement(T,{icon:o.createElement(E,{src:p&&(null==(n=t[p])?void 0:n.photo)}),placeholder:"Who owes you money?"},t.map((e=>o.createElement("option",{key:e.id,value:e.id},e.name)))))}),o.createElement(C,{name:"value",control:s,as:o.createElement(P,{isInvalid:i.value},o.createElement(z,{max:1e4,w:400},o.createElement(L,{pointerEvents:"none",color:"gray.300",fontSize:"1.2em",children:"$"}),o.createElement(U,{pl:8}),o.createElement(R,{mr:6,children:d>0?o.createElement(G,{color:"green"}):0===d||""===d?null:o.createElement($,{color:"red"})}),o.createElement(j,null,o.createElement(B,null),o.createElement(A,null))))}),o.createElement(x,{name:"details",type:"text",ref:l,placeholder:"Describe your expense"}),o.createElement(u,{mt:2,type:"submit",w:100,variant:"solid",colorScheme:"blue",textColor:"white"},"Add"))))};Te.propTypes={users:d.PropTypes.array};const ze=({children:e})=>o.createElement("div",{className:"card"},e),Le=()=>{const e=c((e=>e.app.popupVisible));s();const t=c((e=>e.user.user)),{data:a,mutate:n}=w(`/api/expenses?userId=${t.id}`);return a?(console.log(a.expenses),o.createElement("div",{className:"expenses"},o.createElement(ve,{title:"Expenses",expenseButton:!0}),e&&o.createElement(Te,{user:t,users:a.users,mutate:n}),o.createElement(ze,null,o.createElement(M,{size:"lg"},o.createElement(D,null,o.createElement(F,null,o.createElement(H,{w:100}),o.createElement(H,null,"User"),o.createElement(H,{isNumeric:!0},"Expense"),o.createElement(H,{isNumeric:!0},"History"))),o.createElement(V,null,a.expenses&&a.expenses.map((e=>o.createElement(F,{key:e.user.id},o.createElement(W,{w:100},o.createElement(E,{src:e.user.photo})),o.createElement(W,null,e.user.name),o.createElement(W,{isNumeric:!0},e.value),o.createElement(W,{isNumeric:!0},o.createElement(i,{style:{display:"flex",justifyContent:"flex-end",marginRight:23},to:`/history/${e.user.id}`},o.createElement(q,{style:{color:"#fff"}}))))))))))):o.createElement(g,{color:"pink"})};const Ue=()=>{const{register:e,handleSubmit:t}=N(),a=s();o.useEffect((()=>{const e=localStorage.getItem("secret");if(e){const t=Q(e);a(xe(t.userInfo))}}),[]);return o.createElement("div",{className:"login"},o.createElement(y,{as:"h1",fontSize:"6xl",isTruncated:!0,mb:1,colorScheme:"pink"},"Ultimate crew expense tracker ",o.createElement("br",null)),o.createElement("span",{className:"login__loginContainer__textSplit"},o.createElement(Y,{fontSize:"4xl",mb:10,color:"rgb(31, 117, 196)"},"OG edition")),o.createElement(f,{maxWidth:600},o.createElement("form",{autoComplete:"off",onSubmit:t((async e=>{const{data:t}=await b.post("/api/users/login",e),{user:n,token:l}=t;n&&a(xe(n)),l&&localStorage.setItem("secret",l)}),(e=>console.log(e)))},o.createElement(x,{name:"email",ref:e,placeholder:"Email",type:"email",size:"lg",variant:"outline",mb:5}),o.createElement(x,{name:"password",ref:e,placeholder:"Password",type:"password",size:"lg",variant:"outline",mb:5}),o.createElement(J,{spacing:"6"},o.createElement(u,{type:"submit",colorScheme:"blue",variant:"solid"},"Login"),o.createElement(i,{to:"/register"},o.createElement(u,{variant:"outline",colorScheme:"pink"},"Register"))))))};const Re=({user:e})=>{const[t,a]=o.useState([]),{id:n}=S(),{data:l,mutate:r}=w(`/api/expenses/history/${n}?userId=${e.id}`);o.useEffect((()=>{if(l){const{inHistory:e,outHistory:t}=l,n=e.concat(t).sort(((e,t)=>t.id-e.id));a(n)}}),[l]);return l?o.createElement("div",{className:"history"},o.createElement(ve,{title:"History",goBackButton:!0}),o.createElement(ze,null,o.createElement(M,{size:"lg",colorScheme:"blue"},o.createElement(D,null,o.createElement(F,null,o.createElement(H,{w:50},"User"),o.createElement(H,{w:150,isNumeric:!0},"Expense"),o.createElement(H,null,"Time"),o.createElement(H,null,"About"),o.createElement(H,null))),o.createElement(V,null,t.map((t=>o.createElement(F,{key:t.id},o.createElement(W,{w:50},o.createElement(E,{src:t.photo})),o.createElement(W,{w:150,isNumeric:!0},t.value),o.createElement(W,null,t.timestamp),o.createElement(W,null,t.details),o.createElement(W,null,o.createElement(K,{size:20,color:"#e84545",style:{cursor:"pointer"},onClick:()=>(async t=>{console.log(t),console.log(e.id);try{await b.post("/api/expenses/history/delete-request",{expenseId:t,user:e.id})}catch(a){console.error(a)}})(t.id)}))))))))):o.createElement(g,{color:"pink"})};Re.propTypes={historyEl:d.PropTypes.object,historyOf:d.PropTypes.object};const Ge=({children:e})=>o.createElement("div",{className:"utilityCard"},e),$e=({users:e})=>{c((e=>e.app.notifications));const t=s();return o.useEffect((()=>{((e,t)=>{for(const a of e)_e.collection("users").doc(a.uid).collection("expensesFrom").doc(Ie.currentUser.uid).collection(Ie.currentUser.uid).onSnapshot((e=>e.docs.forEach((e=>{e.data().deletion_request&&t({type:"ADD_NOTIFICATION",payload:e.data()})}))))})(e,t)}),[]),o.createElement("div",{className:"history"},o.createElement(ve,{title:"Notifications",goBackButton:!0}),o.createElement(Ge,null,o.createElement("p",null,"tester")))},je=()=>{const{register:e,handleSubmit:t}=N();s();return o.createElement("div",{className:"login"},o.createElement(y,{as:"h1",fontSize:"6xl",isTruncated:!0,mb:1},"Ultimate crew expense tracker ",o.createElement("br",null)),o.createElement(Y,{fontSize:"4xl",mb:10,colorScheme:"blue",color:"rgb(31, 117, 196)"},"OG edition"),o.createElement(f,{maxWidth:600},o.createElement("form",{autoComplete:"off",onSubmit:t((async e=>{console.log(e),await b.post("http://localhost:8080/api/users/register",e)}),(e=>console.log(e)))},o.createElement(x,{name:"email",ref:e,placeholder:"Email",type:"email",size:"lg",variant:"outline",mb:5}),o.createElement(x,{name:"password",ref:e,placeholder:"Password",type:"password",size:"lg",variant:"outline",mb:5}),o.createElement(x,{name:"confirmPassword",ref:e,placeholder:"Confirm password",type:"password",size:"lg",variant:"outline",mb:5}),o.createElement(J,{spacing:"6"},o.createElement(u,{type:"submit",colorScheme:"blue",variant:"solid"},"Register"),o.createElement(i,{to:"/login"},o.createElement(u,{variant:"outline",colorScheme:"pink"},"Login"))))))},Be=({children:e})=>o.createElement(f,{p:5},e);const Ae=({user:e})=>{const[t,a]=o.useState(!1),[n,l]=o.useState(null),{register:r,handleSubmit:s}=N({defaultValues:{password:"",confirmPassword:""}});return console.log(n),o.createElement("div",{className:"settings"},o.createElement(ve,{title:"Settings"}),o.createElement(ze,null,o.createElement(Be,null,o.createElement(y,{size:"md"},"Change your password")),o.createElement(X,null),o.createElement(Be,null,o.createElement("form",{onSubmit:s((async t=>{a(!0);try{const n=await b.put(`/api/users/profile?userId=${e.id}`,t);a(!1),l(n),setTimeout((()=>{l(null)}),3e3)}catch(n){a(!1),l(n.response),setTimeout((()=>{l(null)}),3e3)}}))},o.createElement(P,{mb:4},o.createElement(Z,null,"Password"),o.createElement(x,{ref:r,type:"password",name:"password"})),o.createElement(P,{mb:4},o.createElement(Z,null,"Confirm Password"),o.createElement(x,{ref:r,type:"password",name:"confirmPassword"}),o.createElement(ee,null,"We'll never share your email.")),o.createElement(u,{isLoading:t,loadingText:"Submitting",colorScheme:"teal",variant:"solid",type:"submit",colorScheme:"blue"},"Submit")))),n&&o.createElement(te,{mt:4,status:200===n.status?"success":"warning",variant:"subtle"},o.createElement(ae,null),n.data.message||n.statusText))},Me=()=>{const e=c((e=>e.user.user)),{data:t,mutate:a}=w("/api/chat/channel");return t?o.createElement("div",{className:"app"},o.createElement(ne,null,e?o.createElement(o.Fragment,null,o.createElement(le,{to:"/expenses"}),o.createElement(Se,{user:e,mutate:a,channels:t}),o.createElement(se,null,o.createElement(re,{path:"/expenses"},o.createElement(Le,null)),o.createElement(re,{path:"/settings"},o.createElement(Ae,{user:e})),o.createElement(re,{path:"/history/:id"},o.createElement(Re,{user:e})),o.createElement(re,{path:"/chat/:channelId"},o.createElement(Ce,{user:e})),o.createElement(re,{path:"/notifications"},o.createElement($e,null)))):o.createElement(o.Fragment,null,o.createElement(le,{to:"/login"}),o.createElement(re,{path:"/login",component:Ue}),o.createElement(re,{path:"/register",component:je})))):o.createElement(g,{color:"pink"})},De={channelId:"xxiO3R5c7TbsnEXvMnml",channelName:"PFD"},Fe={user:null},He={popupVisible:!1,navOpen:!1,notifications:[]},Ve=oe(ce({user:(e=Fe,t)=>{switch(t.type){case"LOGIN_USER":return r(r({},e),{user:t.payload});case"LOGOUT_USER":return r(r({},e),{user:null});default:return e}},channel:(e=De,t)=>{switch(t.type){case"SET_CHANNEL":return r(r({},e),{channelId:t.payload.channelId,channelName:t.payload.channelName});default:return e}},app:(e=He,t)=>{switch(t.type){case"TOGGLE_POPUP":return r(r({},e),{popupVisible:!e.popupVisible});case"TOGGLE_NAV":return r(r({},e),{navOpen:!e.navOpen});case"ADD_NOTIFICATION":return r(r({},e),{notifications:[...e.notifications,t.payload]});default:return e}}}),me(ie(ue)));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));const We=pe({config:{initialColorMode:"dark",useSystemColorMode:!1}}),qe=new Ee;de.render(o.createElement(o.StrictMode,null,o.createElement(he,{store:Ve},o.createElement(ge,{client:qe},o.createElement(fe,null,o.createElement(ye,null),o.createElement(be,{initialColorMode:We.config.initialColorMode}),o.createElement(Me,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((e=>{e.unregister()}));

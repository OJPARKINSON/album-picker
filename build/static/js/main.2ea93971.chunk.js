(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{28:function(e,t,n){e.exports=n(57)},33:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),c=n(25),r=n.n(c),o=(n(33),n(6)),u=n(7),i=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Welcome to Album Picker"),l.a.createElement(o.b,{to:"/Login"},"Login"))},m=n(10),E=n(11),h=n.n(E),s=function(e){var t=Object(a.useState)(),n=Object(m.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(),i=Object(m.a)(o,2),E=i[0],s=(i[1],e.location.search.replace("?code=",""));return Object(a.useEffect)((function(){h()({method:"POST",url:"/callback",data:{code:s}}).then((function(e){return r(e.data)})).catch((function(e){return console.log(e)}))})),c?l.a.createElement(u.a,{to:"/main"}):E?l.a.createElement(u.a,{to:"/#error"}):l.a.createElement("h1",null,"Loading")},b=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Album Picker"))},f=function(){var e=Object(a.useState)(""),t=Object(m.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){h()({method:"GET",url:"/auth/spotify"}).then((function(e){return c(e.data)})).catch((function(e){return console.log(e)}))})),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Welcome to Album Picker"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("a",{href:n},"Login"))))};n(56);var d=function(){return l.a.createElement(o.a,null,l.a.createElement("div",null,l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(o.b,{to:"/"},"Home")),l.a.createElement("li",null,l.a.createElement(o.b,{to:"/login"},"login")),l.a.createElement("li",null,l.a.createElement(o.b,{to:"/AlbumPicker"},"Album Picker")))),l.a.createElement(u.d,null,l.a.createElement(u.b,{path:"/login"},l.a.createElement(f,null)),l.a.createElement(u.b,{path:"/AlbumPicker"},l.a.createElement(b,null)),l.a.createElement(u.b,{path:"/callback",component:s}),l.a.createElement(u.b,{path:"/"},l.a.createElement(i,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.2ea93971.chunk.js.map
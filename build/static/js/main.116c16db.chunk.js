(window["webpackJsonpreact-autocomplete"]=window["webpackJsonpreact-autocomplete"]||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n.p+"static/media/logo.25bf045c.svg"},,,function(e,t,n){e.exports=n(17)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(2),o=n.n(i),c=(n(15),n(3)),l=n(4),r=n(5),u=n(8),d=n(6),g=n(9),h=n(7),m=n.n(h);n(16);function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var S=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).onKeyDownToFocusViaSuggestion=function(e){var t,a=document.getElementById("mainOptionBody");if(void 0!==typeof a&&null!==a){var s=a.getElementsByTagName("li").length-1;40===e.which&&(n.setState(v({},n.state,{index:n.state.index+1})),n.state.nextSibling?(n.state.nextSibling.classList.remove("selectedOption"),void 0!==typeof(t=a.getElementsByTagName("li")[n.state.index])&&n.state.index<=s?n.setState(v({},n.state,{nextSibling:t})):n.setState(v({},n.state,{index:0,nextSibling:a.getElementsByTagName("li")[0]})),n.state.nextSibling.classList.add("selectedOption")):(n.setState(v({},n.state,{index:0,nextSibling:a.getElementsByTagName("li")[0]})),n.state.nextSibling.classList.add("selectedOption")),n.state.nextSibling.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})),38===e.which&&(n.state.nextSibling?(n.state.nextSibling.classList.remove("selectedOption"),n.setState(v({},n.state,{index:n.state.index-1})),void 0!==typeof(t=a.getElementsByTagName("li")[n.state.index])&&n.state.index>=0?n.setState(v({},n.state,{nextSibling:t})):n.setState(v({},n.state,{index:s,nextSibling:a.getElementsByTagName("li")[s]})),n.state.nextSibling.classList.add("selectedOption")):(n.setState(v({},n.state,{index:0,nextSibling:a.getElementsByTagName("li")[s]})),n.state.nextSibling.classList.add("selectedOption")),n.state.nextSibling.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})),13===e.which&&n.setState(v({},n.state,{checkvalue:n.state.nextSibling.dataset.value,suggestion:[]}))}},n.clickSomewhere=function(e){"hereInput"!==e.path[0].id&&"removeSuggestionBtn"!==e.path[0].className&&n.setState(v({},n.state,{checkvalue:n.state.checkvalue.trim(),selectedArray:[],suggestion:[],index:-1}))},n.onfocusDataShouldDisplay=function(e){if(!n.state.checkvalue.includes("@")){var t=JSON.parse(window.localStorage.getItem("words")).reverse();t&&n.setState(v({},n.state,{selectedType:"",index:-1,nextSibling:"",suggestion:t.filter((function(e){return e.toLowerCase().includes(n.state.checkvalue)})),showingsearchvalue:""}))}},n.openOptionArea=function(e){n.setState(v({},n.state,{checkvalue:e.target.value,selectedArray:[],showingsearchvalue:"",suggestion:[],selectedType:"",index:-1}));var t="",a="",s=[];e.target.value.includes("@")?(t=e.target.value.split("@")[1].split(" ")[0].toLowerCase(),a=e.target.value.substr(e.target.value.indexOf(" ")+1).toLowerCase()):a=e.target.value.toLowerCase(),fetch("option.json").then((function(e){return e.json()})).then((function(e){t&&(e.forEach((function(e){e.type.toLowerCase()===t&&n.setState((function(t){return v({},n.state,{selectedArray:e.name,selectedType:e.type})}))})),n.setState(v({},n.state,{suggestion:n.state.selectedArray.filter((function(e){return e.toLowerCase().includes(a)}))}))),"@"!==n.state.checkvalue.charAt(0)||n.state.checkvalue.includes(" ")||(e.forEach((function(e){s.push("@"+e.type)})),n.setState((function(e){return v({},n.state,{suggestion:s.filter((function(e){return e.toLowerCase().includes(a)}))})}))),"@"!==n.state.checkvalue.charAt(0)&&n.setState((function(e){return v({},n.state,{suggestion:JSON.parse(window.localStorage.getItem("words")).filter((function(e){return e.toLowerCase().includes(n.state.checkvalue)}))})}))})).catch((function(e){return console.log("err",e)}))},n.btnSearchClick=function(e){var t=JSON.parse(window.localStorage.getItem("words"));t||(t=[]),t.includes(n.state.checkvalue)||(5===t.length&&t.shift(),t.push(n.state.checkvalue.trim())),n.setState(v({},n.state,{checkvalue:"",showingsearchvalue:"Search Happened: ".concat(n.state.checkvalue)})),window.localStorage.setItem("words",JSON.stringify(t))},n.removeSuggestion=function(e,t){var a=JSON.parse(window.localStorage.getItem("words"));a.includes(e)&&(a.splice(a.indexOf(e),1),window.localStorage.setItem("words",JSON.stringify(a))),n.setState(v({},n.state,{suggestion:n.state.suggestion.splice(n.state.suggestion.indexOf(e),1),checkvalue:""}))},n.clickOption=function(e,t){"removeSuggestionBtn"!==t.nativeEvent.path[0].className?n.setState(v({},n.state,{checkvalue:e})):n.setState(v({},n.state))},n.state={checkvalue:"",suggestion:[],selectedArray:[],showingsearchvalue:"",nextSibling:"",index:-1},n}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.clickSomewhere.bind(this)),document.addEventListener("keydown",this.onKeyDownToFocusViaSuggestion.bind(this),!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("click",this.clickSomewhere.bind(this)),document.removeEventListener("keydown",this.onKeyDownToFocusViaSuggestion.bind(this))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("header",{className:"App-header"},s.a.createElement("img",{src:m.a,className:"App-logo",alt:"logo"})),s.a.createElement("div",{style:{display:"flex",justifyContent:"center",marginTop:40}},s.a.createElement("div",null,s.a.createElement("div",{style:{display:"flex"}},s.a.createElement("input",{id:"hereInput",onChange:this.openOptionArea.bind(this),value:this.state.checkvalue,className:"inputArea",onFocus:this.onfocusDataShouldDisplay.bind(this)}),s.a.createElement("button",{className:"btnSearch",onClick:this.btnSearchClick.bind(this)},"\u2315")),0!==this.state.suggestion.length&&s.a.createElement("div",{className:"mainOptionBody",id:"mainOptionBody"},this.state.suggestion.map((function(t,n){return s.a.createElement("li",{key:n,className:"optionArea spaceBetweened",onClick:e.clickOption.bind(e,t),id:"option".concat(n),"data-value":t},s.a.createElement("div",null,t),"@"!==e.state.checkvalue&&""===e.state.selectedType&&s.a.createElement("button",{className:"removeSuggestionBtn",onClick:e.removeSuggestion.bind(e,t)},"x"))}))))),s.a.createElement("div",{className:"showAfterSearch"},s.a.createElement("b",null,this.state.showingsearchvalue)))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.116c16db.chunk.js.map
(function(e){function t(t){for(var r,i,o=t[0],l=t[1],c=t[2],u=0,v=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&v.push(n[i][0]),n[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);d&&d(t);while(v.length)v.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],r=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},n={app:0},s=[];function i(e){return o.p+"js/"+({about:"about"}[e]||e)+"."+{about:"1131f154"}[e]+".js"}function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(e){var t=[],a=n[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise((function(t,r){a=n[e]=[t,r]}));t.push(a[2]=r);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=i(e);var c=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(u);var a=n[e];if(0!==a){if(a){var r=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+s+")",c.name="ChunkLoadError",c.type=r,c.request=s,a[1](c)}n[e]=void 0}};var u=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/SeiyuuLookup/",o.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var d=c;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"1c38":function(e,t,a){"use strict";var r=a("9a91"),n=a.n(r);n.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{dark:""}},[a("v-app-bar",{attrs:{flat:"","clipped-left":"",app:"",outline:""}},[a("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!e.drawer}}}),a("v-toolbar-title",[a("span",{staticClass:"deep-orange--text text--lighten-5 font-weight-bold"},[e._v("Seiyuu")]),a("span",{staticClass:"font-weight-light text-primary"},[e._v("Lookup")])])],1),a("v-navigation-drawer",{attrs:{app:"","mini-variant":"","mini-variant-width":"65",clipped:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",[a("v-list-item",[a("v-list-item-icon",[a("v-btn",{attrs:{icon:""},on:{click:e.openGithub}},[a("v-icon",[e._v("mdi-github")])],1)],1)],1),a("v-list-item",[a("v-list-item-icon",[a("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[a("v-btn",e._g(e._b({attrs:{icon:""}},"v-btn",n,!1),r),[a("v-icon",{on:{click:e.something}},[e._v("mdi-information-outline")])],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-1"},[e._v(" About ")]),a("br"),a("v-card-text",[e._v(" This is a simple app (desktop/mobile) that I have created to test my knowledge of programming while also having a tool to search up Seiyuu (voice actors/actresses) whenever I occasionally need to. My intended audience for this app is mainly myself and my friends. I have used Ali60351's Seiyuu Nostalgia and Ervie's Seiyuu.moe before and they are both great apps that inspired me to make my own one that can suit my personal needs. Be sure to take a look at their great apps. I am a fairly new programmer, especially when it comes to more of the front-end stuff, so there may be some bugs so you can contact me if you would like to. ")]),a("v-card-text",[e._v(" Here are some planned features: "),a("br"),e._v(" --Anilist user filter"),a("br"),e._v(" --Seiyuu search"),a("br"),e._v(" --Color scheme"),a("br"),e._v(" --Results cards clickable"),a("br"),e._v(" --Better error handling"),a("br"),e._v(" --Improve design for inputting username"),a("br"),e._v(" --Optimization"),a("br"),e._v(" --Anilist pictures (maybe)"),a("br"),e._v(" --Ultimately want expand to anime and games but no API for games"),a("br")]),a("v-card-text",[e._v(" Contact me:"),a("br"),e._v(" stendon12@gmail.com ")])],1)],1)],1)],1)],1)],1),a("v-main",[a("v-stepper",{staticClass:"fill-height",model:{value:e.e1,callback:function(t){e.e1=t},expression:"e1"}},[a("v-stepper-header",[a("v-stepper-step",{attrs:{complete:e.e1>1,step:"1",editable:""}},[e._v("Search for anime")]),a("v-divider"),a("v-stepper-step",{attrs:{complete:e.e1>2,step:"2",editable:""}},[e._v("Select a character")]),a("v-divider"),a("v-stepper-step",{attrs:{complete:e.e1>3,step:"3",editable:""}},[e._v("Input MAL Username"),a("small",[e._v("Optional")])]),a("v-divider"),a("v-stepper-step",{attrs:{step:"4"}},[e._v("Results")])],1),a("v-stepper-items",[a("v-stepper-content",{attrs:{step:"1"}},[a("animesearch",{attrs:{cards:e.cards},on:{resetCards:function(t){return e.resetCards(t)},stepup:e.stepup}})],1),a("v-stepper-content",{attrs:{step:"2"}},[a("listchars",{attrs:{selectedVA:e.selectedVA,cards:e.cards},on:{stepup:e.stepup,vaFill:e.vaFill}})],1),a("v-stepper-content",{attrs:{step:"3"}},[a("varoles",{attrs:{selectedVA:e.selectedVA},on:{stepup:e.stepup,fillResults:e.fillResults,allAnimeMALID:e.fillUserAnime}})],1),a("v-stepper-content",{attrs:{step:"4"}},[a("results",{attrs:{results:e.results,selectedVA:e.selectedVA}})],1)],1)],1)],1),a("v-footer",{attrs:{app:"",padless:""}},[a("v-col",{staticClass:"text-center"},[e._v(" © 2020 ")])],1)],1)},s=[],i=(a("ac1f"),a("5319"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-container",[a("v-autocomplete",{attrs:{"prepend-icon":"mdi-magnify",label:"Search and select",items:e.entries,"item-text":"title","search-input":e.searchedTitle,"item-value":"mal_id","no-filter":"",loading:e.loading,autofocus:"","hide-no-data":"",snackbar:e.snackbar},on:{"update:searchInput":function(t){e.searchedTitle=t},"update:search-input":function(t){e.searchedTitle=t},keyup:e.searching,input:e.cardifyChars},scopedSlots:e._u([{key:"item",fn:function(t){return[a("v-list-item-avatar",[a("v-img",{attrs:{src:t.item.image_url}})],1),a("v-list-item-title",[e._v(e._s(t.item.title))])]}}]),model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1),a("v-snackbar",{scopedSlots:e._u([{key:"action",fn:function(t){var r=t.attrs;return[a("v-btn",e._b({attrs:{color:"pink",text:""},on:{click:function(t){e.snackbar=!1}}},"v-btn",r,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" Please enter more than 3 characters ")])],1)}),o=[],l=(a("4160"),a("b0c0"),a("d3b7"),a("841c"),a("159b"),a("ddb0"),{props:{cards:Array},data:function(){return{searchedTitle:"",entries:[],model:null,loading:!1,snackbar:!1,error:!1}},computed:{},methods:{searching:function(){var e=this;this.error=!1,this.loading=!0,this.entries=[];try{if(this.searchedTitle.length>2){var t=a("2a34");t.search("anime",this.searchedTitle,1,{limit:20}).then((function(t){t.results.forEach((function(t){e.entries.push(Object.assign({},{title:t.title,mal_id:t.mal_id,image_url:t.image_url}))})),e.loading=!1})).catch((function(e){console.log(e)}))}else this.loading=!1}catch(r){this.snackbar=!0,this.loading=!1,console.log(r)}},cardifyChars:function(){var e=this;this.$emit("resetCards");var t=a("2a34");t.loadAnime(this.model,"characters_staff").then((function(t){t.characters.forEach((function(t){t.voice_actors.forEach((function(a){"Japanese"==a.language&&e.cards.push(Object.assign({},{name:t.name,image_url:t.image_url,role:t.role,va_id:a.mal_id,voice_actor:a.name,va_image_url:a.image_url}))}))})),e.$emit("stepup",2)}))}}}),c=l,u=a("2877"),d=a("6544"),v=a.n(d),m=a("c6a6"),p=a("8336"),h=a("a523"),f=a("adda"),_=a("8270"),g=a("5d23"),b=a("2db4"),V=Object(u["a"])(c,i,o,!1,null,null,null),y=V.exports;v()(V,{VAutocomplete:m["a"],VBtn:p["a"],VContainer:h["a"],VImg:f["a"],VListItemAvatar:_["a"],VListItemTitle:g["b"],VSnackbar:b["a"]});var A=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",e._l(e.cards,(function(t,r){return a("v-col",{key:r,attrs:{sm:"4",md:"3",lg:"2",cols:"6"}},[a("v-hover",{scopedSlots:e._u([{key:"default",fn:function(r){var n=r.hover;return[a("v-card",{class:{"on-hover":n},attrs:{elevation:n?16:2,ripple:""},on:{click:function(a){return e.selectVA(t.va_id)}}},[a("v-img",{attrs:{"aspect-ratio":"0.6",src:t.image_url},scopedSlots:e._u([{key:"placeholder",fn:function(){return[a("v-row",{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[a("v-progress-circular",{attrs:{size:"150",color:"white",indeterminate:""}})],1)]},proxy:!0}],null,!0)}),a("v-card-text",{staticClass:"text-h6 pb-0 white--text "},[e._v(e._s(t.name))]),a("v-card-text",{staticClass:"text-body-2 pt-0 grey--text"},[e._v(e._s(t.voice_actor))])],1)]}}],null,!0)})],1)})),1),a("v-snackbar",{attrs:{width:"20"},scopedSlots:e._u([{key:"action",fn:function(t){var r=t.attrs;return[a("v-progress-circular",e._b({staticClass:"justify-end align-end",attrs:{size:"28",color:"white",indeterminate:""}},"v-progress-circular",r,!1))]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" Fetching the seiyuu... ")])],1)},w=[],k={props:{cards:Array,selectedVA:{}},data:function(){return{snackbar:!1}},methods:{selectVA:function(e){var t=this;this.snackbar=!0,this.$emit("choseVA",e);var r=a("2a34");r.loadPerson(e).then((function(a){t.$emit("vaFill",e,a.name,a.image_url,a.voice_acting_roles,a.about,a.family_name,a.given_name,a.website_url),t.$emit("stepup",3),t.snackbar=!1}))}}},x=k,C=a("b0af"),S=a("99d9"),I=a("62ad"),L=a("ce87"),T=a("490a"),j=a("0fd9"),O=Object(u["a"])(x,A,w,!1,null,null,null),E=O.exports;v()(O,{VCard:C["a"],VCardText:S["b"],VCol:I["a"],VHover:L["a"],VImg:f["a"],VProgressCircular:T["a"],VRow:j["a"],VSnackbar:b["a"]});var M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-btn",{directives:[{name:"scroll",rawName:"v-scroll",value:e.onScroll,expression:"onScroll"},{name:"show",rawName:"v-show",value:e.fab,expression:"fab"}],attrs:{fab:"",light:"",fixed:"",bottom:"",right:""},on:{click:e.toTop}},[a("v-icon",[e._v("mdi-chevron-up")])],1),a("usernameentry",{attrs:{selectedVA:e.selectedVA},on:{processResults:e.processResults}}),a("br"),a("v-row",e._l(e.selectedVA.va_roles,(function(t,r){return a("v-col",{key:r,attrs:{xs:"12",sm:"6",lg:"6"}},[a("v-card",{attrs:{rounded:""}},[a("v-list-item",[a("v-list-item-avatar",{attrs:{size:"125",rounded:""}},[a("v-img",{attrs:{src:t.character.image_url}})],1),a("v-list-item-content",[a("v-list-item-title",{staticClass:"animename"},[e._v(e._s(t.anime.name))]),a("v-list-item-title",{staticClass:"charname"},[e._v(e._s(t.character.name))])],1)],1)],1)],1)})),1)],1)},$=[],P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-container",[a("v-form",{on:{submit:function(e){e.preventDefault()}}},[a("v-text-field",{attrs:{"append-icon":"mdi-send",label:"Enter your MAL username to filter",loading:e.loading},on:{"click:append":e.getMALList,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getMALList(t)}},model:{value:e.mal_username,callback:function(t){e.mal_username=t},expression:"mal_username"}})],1)],1)],1),a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-card",{attrs:{"max-width":"245"}},[a("v-img",{attrs:{src:this.selectedVA.va_image_url}}),a("v-card-actions",[a("v-card-text",{staticClass:"font-weight-medium  text-body-1 pl-2 "},[e._v(e._s(this.selectedVA.va_name))]),a("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[a("v-btn",e._g(e._b({attrs:{icon:"",right:""}},"v-btn",n,!1),r),[a("v-icon",[e._v("mdi-information-outline")])],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-1"},[e._v(" "+e._s(this.selectedVA.va_name)+" ")]),a("v-card-text",{staticClass:"pt-4"},[e._v("Given name: "+e._s(this.selectedVA.given_name)+" "),a("br"),e._v(" Family name: "+e._s(this.selectedVA.family_name)+" ")]),a("v-card-text",{domProps:{innerHTML:e._s(this.selectedVA.about)}}),a("v-card-text",[e._v("Webpage: "+e._s(this.selectedVA.website_url)+" ")])],1)],1)],1)],1)],1)],1)},R=[],U={props:{selectedVA:{}},data:function(){return{loading:!1,mal_username:"",allAnimeMALID:[],results:[],dialog:!1}},methods:{getMALList:function(){var e=this;this.loading=!0,this.results=[];var t=a("2a34");t.loadUser(this.mal_username,"animelist","watching").then((function(t){t.anime.forEach((function(t){e.allAnimeMALID.push(t.mal_id)}))})).catch((function(e){console.log(e)})),t.loadUser(this.mal_username,"animelist","completed").then((function(t){t.anime.forEach((function(t){e.allAnimeMALID.push(t.mal_id)})),e.$emit("processResults",e.allAnimeMALID),e.loading=!1})).catch((function(e){console.log(e)}))}}},D=U,F=a("169a"),B=a("4bd4"),H=a("132d"),z=a("8654"),N=Object(u["a"])(D,P,R,!1,null,null,null),G=N.exports;v()(N,{VBtn:p["a"],VCard:C["a"],VCardActions:S["a"],VCardText:S["b"],VCardTitle:S["c"],VContainer:h["a"],VDialog:F["a"],VForm:B["a"],VIcon:H["a"],VImg:f["a"],VRow:j["a"],VTextField:z["a"]});var J={components:{usernameentry:G},props:{selectedVA:{}},data:function(){return{allUserAnime:[],results:[],loading:!1,fab:!1,mal_username:""}},methods:{processResults:function(e){var t=this;this.loading=!0,this.results=[],this.allUserAnime=e,this.selectedVA.va_roles.forEach((function(e){var a=0;for(a=0;a<t.allUserAnime.length;a++)if(e.anime.mal_id==t.allUserAnime[a]){t.results.push(Object.assign({},{anime_title:e.anime.name,char_image_url:e.character.image_url,char_name:e.character.name}));break}})),this.$emit("fillResults",this.results),this.$emit("stepup",4),this.loading=!1},onScroll:function(e){if("undefined"!==typeof window){var t=window.pageYOffset||e.target.scrollTop||0;this.fab=t>20}},toTop:function(){this.$vuetify.goTo(0)}}},W=J,q=(a("1c38"),a("da13")),Y=a("269a"),K=a.n(Y),Q=a("f977"),X=Object(u["a"])(W,M,$,!1,null,null,null),Z=X.exports;v()(X,{VBtn:p["a"],VCard:C["a"],VCol:I["a"],VIcon:H["a"],VImg:f["a"],VListItem:q["a"],VListItemAvatar:_["a"],VListItemContent:g["a"],VListItemTitle:g["b"],VRow:j["a"]}),K()(X,{Scroll:Q["b"]});var ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-card",{attrs:{"max-width":"245"}},[a("v-img",{attrs:{src:this.selectedVA.va_image_url}}),a("v-card-actions",[a("v-card-text",{staticClass:"font-weight-medium text-body-1 pl-2"},[e._v(e._s(this.selectedVA.va_name))]),a("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[a("v-btn",e._g(e._b({attrs:{icon:"",right:""}},"v-btn",n,!1),r),[a("v-icon",[e._v("mdi-information-outline")])],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-1"},[e._v(" "+e._s(this.selectedVA.va_name)+" ")]),a("v-card-text",{staticClass:"pt-4"},[e._v("Given name: "+e._s(this.selectedVA.given_name)+" "),a("br"),e._v(" Family name: "+e._s(this.selectedVA.family_name))]),a("v-card-text",{domProps:{innerHTML:e._s(this.selectedVA.about)}}),a("v-card-text",[e._v("Webpage: "+e._s(this.selectedVA.website_url))])],1)],1)],1)],1)],1),a("v-row",e._l(e.results,(function(t,r){return a("v-col",{key:r,attrs:{sm:"4",md:"3",lg:"2",cols:"6"}},[a("v-card",[a("v-img",{attrs:{src:t.char_image_url},scopedSlots:e._u([{key:"placeholder",fn:function(){return[a("v-row",{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[a("v-progress-circular",{attrs:{size:"150",color:"white",indeterminate:""}})],1)]},proxy:!0}],null,!0)}),a("v-card-text",{staticClass:"text-h6 pb-0 white--text"},[e._v(e._s(t.char_name))]),a("v-card-text",{staticClass:"text-body-2 pt-0 grey--text"},[e._v(e._s(t.anime_title))])],1)],1)})),1)],1)},te=[],ae={props:{results:Array,selectedVA:{}},data:function(){return{dialog:!1}}},re=ae,ne=Object(u["a"])(re,ee,te,!1,null,null,null),se=ne.exports;v()(ne,{VBtn:p["a"],VCard:C["a"],VCardActions:S["a"],VCardText:S["b"],VCardTitle:S["c"],VCol:I["a"],VDialog:F["a"],VIcon:H["a"],VImg:f["a"],VProgressCircular:T["a"],VRow:j["a"]});var ie={name:"App",components:{animesearch:y,listchars:E,varoles:Z,results:se},data:function(){return{drawer:!1,cards:[],e1:1,step:1,selectedVA:{va_id:null,va_name:null,va_image_url:null,va_roles:[],about:"",family_name:"",given_name:"",website_url:""},allUserAnime:[],results:[],dialog:!1}},methods:{something:function(){},resetCards:function(){this.cards=[],this.results=[]},stepup:function(e){this.e1=e},vaFill:function(e,t,a,r,n,s,i,o){this.selectedVA.va_id=e,this.selectedVA.va_name=t,this.selectedVA.va_image_url=a,this.selectedVA.va_roles=r,this.selectedVA.about=n,this.selectedVA.family_name=s,this.selectedVA.given_name=i,this.selectedVA.website_url=o;var l=String(this.selectedVA.about).replace(/\\n/g,"<br/>");this.selectedVA.about=l},fillUserAnime:function(e){this.allUserAnime=e},fillResults:function(e){this.results=e},openGithub:function(){window.open("https://github.com/Stendonn/SeiyuuLookup","_blank")}}},oe=ie,le=a("7496"),ce=a("40dc"),ue=a("5bc1"),de=a("ce7e"),ve=a("553a"),me=a("8860"),pe=a("34c3"),he=a("f6c4"),fe=a("f774"),_e=a("7e85"),ge=a("e516"),be=a("9c54"),Ve=a("56a4"),ye=a("2a7f"),Ae=Object(u["a"])(oe,n,s,!1,null,null,null),we=Ae.exports;v()(Ae,{VApp:le["a"],VAppBar:ce["a"],VAppBarNavIcon:ue["a"],VBtn:p["a"],VCard:C["a"],VCardText:S["b"],VCardTitle:S["c"],VCol:I["a"],VDialog:F["a"],VDivider:de["a"],VFooter:ve["a"],VIcon:H["a"],VList:me["a"],VListItem:q["a"],VListItemIcon:pe["a"],VMain:he["a"],VNavigationDrawer:fe["a"],VStepper:_e["a"],VStepperContent:ge["a"],VStepperHeader:be["a"],VStepperItems:be["b"],VStepperStep:Ve["a"],VToolbarTitle:ye["a"]});var ke=a("8c4f"),xe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"})},Ce=[],Se={name:"Home",components:{},data:function(){return{username:""}},methods:{greet:function(){console.log("hi")}}},Ie=Se,Le=Object(u["a"])(Ie,xe,Ce,!1,null,null,null),Te=Le.exports;r["a"].use(ke["a"]);var je=[{path:"/",name:"Home",component:Te},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))}}],Oe=new ke["a"]({mode:"history",base:"/SeiyuuLookup/",routes:je}),Ee=Oe,Me=a("f309");r["a"].use(Me["a"]);var $e=new Me["a"]({theme:{themes:{background:"#6A605C"},dark:!0}});r["a"].config.productionTip=!1,new r["a"]({router:Ee,vuetify:$e,render:function(e){return e(we)}}).$mount("#app")},"9a91":function(e,t,a){}});
//# sourceMappingURL=app.d9d63b50.js.map
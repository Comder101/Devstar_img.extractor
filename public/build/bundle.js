var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function i(e){e.forEach(t)}function s(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let o,r;function l(e,t){return o||(o=document.createElement("a")),o.href=t,e===o.href}function c(e,t){e.appendChild(t)}function u(e,t,n){e.insertBefore(t,n||null)}function d(e){e.parentNode&&e.parentNode.removeChild(e)}function g(e){return document.createElement(e)}function m(e){return document.createTextNode(e)}function h(){return m(" ")}function f(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function p(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function v(e,t){t=""+t,e.data!==t&&(e.data=t)}function b(e,t){e.value=null==t?"":t}function y(e,t,n,i){null==n?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function w(e){r=e}function x(e){(function(){if(!r)throw new Error("Function called outside component initialization");return r})().$$.on_mount.push(e)}const $=[],k=[];let E=[];const C=[],_=Promise.resolve();let S=!1;function I(e){E.push(e)}const A=new Set;let L=0;function T(){if(0!==L)return;const e=r;do{try{for(;L<$.length;){const e=$[L];L++,w(e),U(e.$$)}}catch(e){throw $.length=0,L=0,e}for(w(null),$.length=0,L=0;k.length;)k.pop()();for(let e=0;e<E.length;e+=1){const t=E[e];A.has(t)||(A.add(t),t())}E.length=0}while($.length);for(;C.length;)C.pop()();S=!1,A.clear(),w(e)}function U(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(I)}}const j=new Set;function H(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];E.forEach((i=>-1===e.indexOf(i)?t.push(i):n.push(i))),n.forEach((e=>e())),E=t}(n.after_update),i(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function O(e,t){-1===e.$$.dirty[0]&&($.push(e),S||(S=!0,_.then(T)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function z(a,o,l,c,u,g,m,h=[-1]){const f=r;w(a);const p=a.$$={fragment:null,ctx:[],props:g,update:e,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(f?f.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:o.target||f.$$.root};m&&m(p.root);let v=!1;if(p.ctx=l?l(a,o.props||{},((e,t,...n)=>{const i=n.length?n[0]:t;return p.ctx&&u(p.ctx[e],p.ctx[e]=i)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](i),v&&O(a,e)),t})):[],p.update(),v=!0,i(p.before_update),p.fragment=!!c&&c(p.ctx),o.target){if(o.hydrate){const e=function(e){return Array.from(e.childNodes)}(o.target);p.fragment&&p.fragment.l(e),e.forEach(d)}else p.fragment&&p.fragment.c();o.intro&&((b=a.$$.fragment)&&b.i&&(j.delete(b),b.i(y))),function(e,n,a,o){const{fragment:r,after_update:l}=e.$$;r&&r.m(n,a),o||I((()=>{const n=e.$$.on_mount.map(t).filter(s);e.$$.on_destroy?e.$$.on_destroy.push(...n):i(n),e.$$.on_mount=[]})),l.forEach(I)}(a,o.target,o.anchor,o.customElement),T()}var b,y;w(f)}class B{$destroy(){H(this,1),this.$destroy=e}$on(t,n){if(!s(n))return e;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const e=i.indexOf(n);-1!==e&&i.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function q(e,t,n){const i=e.slice();return i[11]=t[n],i}function M(e){let t,n=e[1],i=[];for(let t=0;t<n.length;t+=1)i[t]=N(q(e,n,t));return{c(){for(let e=0;e<i.length;e+=1)i[e].c();t=m("")},m(e,n){for(let t=0;t<i.length;t+=1)i[t]&&i[t].m(e,n);u(e,t,n)},p(e,s){if(2&s){let a;for(n=e[1],a=0;a<n.length;a+=1){const o=q(e,n,a);i[a]?i[a].p(o,s):(i[a]=N(o),i[a].c(),i[a].m(t.parentNode,t))}for(;a<i.length;a+=1)i[a].d(1);i.length=n.length}},d(e){!function(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}(i,e),e&&d(t)}}}function N(e){let t,n,s,a,o,r,m,v,b,y,w,x,$,k,E,C,_,S,I;function A(){return e[5](e[11])}return{c(){t=g("div"),n=g("div"),s=g("img"),o=h(),r=g("div"),r.textContent="Image_name",m=h(),v=g("div"),b=g("div"),b.innerHTML='<div class="text-wrapper-15 svelte-18gi4ei">980 KB</div>',y=h(),w=g("div"),w.innerHTML='<div class="text-wrapper-4 svelte-18gi4ei">ICO</div>',x=h(),$=g("div"),k=g("button"),k.textContent="Copy Image URL",E=h(),C=g("button"),C.textContent="Download",_=h(),p(s,"class","rectangle svelte-18gi4ei"),l(s.src,a=e[11])||p(s,"src",a),p(s,"alt","image1"),p(s,"id","imageToCopy"),p(r,"class","text-wrapper-14 svelte-18gi4ei"),p(n,"class","frame-2 svelte-18gi4ei"),p(b,"class","file-size svelte-18gi4ei"),p(w,"class","image-type svelte-18gi4ei"),p($,"class","frame-4 svelte-18gi4ei"),p(v,"class","frame-3 svelte-18gi4ei"),p(t,"class","image-frame-vertical svelte-18gi4ei"),p(t,"data-selected","false")},m(e,i){u(e,t,i),c(t,n),c(n,s),c(n,o),c(n,r),c(t,m),c(t,v),c(v,b),c(v,y),c(v,w),c(v,x),c(v,$),c($,k),c($,E),c($,C),c(t,_),S||(I=[f(k,"click",Y),f(C,"click",A)],S=!0)},p(t,n){e=t,2&n&&!l(s.src,a=e[11])&&p(s,"src",a)},d(e){e&&d(t),S=!1,i(I)}}}function R(t){let n,s,a,o,r,w,x,$,k,E,C,_,S,I,A,L,T,U,j,H,O,z,B,q,N,R,P,Y,G,Z,J,K,Q,X,ee,te,ne,ie,se,ae,oe,re,le,ce,ue,de,ge,me,he,fe,pe,ve,be,ye,we,xe,$e,ke,Ee,Ce,_e,Se,Ie,Ae,Le,Te,Ue,je,He,Oe,ze,Be,qe,Me=t[2]?"Scraping...":"Scrape Images",Ne=t[1].length>0&&M(t);return{c(){n=g("link"),s=h(),a=g("link"),o=h(),r=g("nav"),r.innerHTML='<img style="height:100px;width:100px" class="image" src="img/image.png" alt="1"/> \n\t\n\t<span style="color:black;margin-left:30px;" class="home-text svelte-18gi4ei"><span>Extract Image</span></span> \n\t<br/><br/> \n\t\n\t<span class="home-text02 svelte-18gi4ei" style="color:black;margin-top:80px;margin-left:10px;"><span>from any public website!</span></span> \n  <div id="navb" class="navbar-collapse collapse hide"><ul class="navbar-nav" style="font-size:20px;"><li class="nav-item active"><a class="nav-link" href="/">Home</a></li> \n      <li class="nav-item"><a class="nav-link" href="#aboutus">About us</a></li> \n      <li class="nav-item"><a class="nav-link" href="#faq">Help Center</a></li></ul> \n\n    <ul class="nav navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="#"><span class="fas fa-user"></span> Sign Up</a></li> \n      <li class="nav-item"><a class="nav-link" href="#"><span class="fas fa-sign-in-alt"></span> Login</a></li></ul></div>',w=h(),x=g("div"),$=g("div"),k=g("div"),E=g("div"),C=g("input"),_=h(),S=g("button"),I=m(Me),A=h(),L=g("div"),T=g("div"),U=g("div"),j=g("div"),H=g("div"),O=g("div"),z=g("div"),B=g("div"),q=g("img"),R=h(),P=g("div"),Y=g("button"),Y.textContent="Select All",G=h(),Z=g("div"),J=g("img"),Q=h(),X=g("div"),ee=g("button"),ee.textContent="Deselect All",te=h(),ne=g("div"),ie=g("div"),se=g("button"),se.textContent="Download Selected",ae=h(),oe=g("br"),re=h(),le=g("div"),ce=g("div"),ue=g("p"),de=g("span"),de.textContent="Showing images from",ge=h(),me=g("span"),he=m(t[0]),fe=h(),pe=g("div"),Ne&&Ne.c(),ve=h(),be=g("br"),ye=h(),we=g("br"),xe=h(),$e=g("br"),ke=h(),Ee=g("section"),Ee.innerHTML='<h1 class="svelte-18gi4ei">Why Choose Us?</h1> \n\t<br/> \n\t <div class="row svelte-18gi4ei"><div class="services-col svelte-18gi4ei"><img src="img/1_serv.png" alt="Service Image 1" class="svelte-18gi4ei"/> \n\t\t<h3 class="svelte-18gi4ei">Efficiency</h3> \n\t\n\t\t<h5 class="svelte-18gi4ei">Save time and effort with our automated image extraction process.</h5></div> \n\t  <div class="services-col svelte-18gi4ei"><img src="img/2_serv.png" alt="Service Image 2" class="svelte-18gi4ei"/> \n\t\t<h3 class="svelte-18gi4ei">User-Friendly</h3> \n\n\t\t<h5 class="svelte-18gi4ei">Our intuitive interface makes the process accessible to all.</h5></div> \n\t  <div class="services-col svelte-18gi4ei"><img src="img/3_serv.png" alt="Service Image 3" class="svelte-18gi4ei"/> \n\t\t<h3 class="svelte-18gi4ei">Volunteer</h3> \n\t\t<h5 class="svelte-18gi4ei">Tailor your image extraction settings to suit your needs.</h5></div></div>',Ce=h(),_e=g("hr"),Se=h(),Ie=g("section"),Ie.innerHTML="<h2>Frequently Asked Questions:</h2> \n\t<br/> \n\n\n\t<div><h3>Can I download multiple images at once?</h3> \n\t<p>Of course, you can select them by clicking the images and then use the &quot;Download selected&quot; button on the left to download all selected images in a ZIP file. This can take some time depending on how many images you selected. Note that there is a chance that some images cannot be downloaded and won&#39;t be included in the ZIP file.</p></div> \n\n\n\t<div><h3>Why might the extraction process not work?</h3> \n\t<p>There are several reasons why the extraction might fail. The website you entered might not be publicly accessible or it might be protected by a login. Very slow or large websites might also cause issues. Additionally, if there are a lot of people using our website at the same time, it can cause performance issues on our side. In this case, you should try again later or try a different website. We are continuously working on improving the performance of our service.</p></div>",Ae=h(),Le=g("section"),Le.innerHTML='<hr/> \n\t<h3>About Us</h3> \n\t<h4 class="svelte-18gi4ei">VisualHarbor: Your Gateway to Seamless Image Extraction !</h4>',Te=h(),Ue=g("p"),Ue.textContent="Welcome to VisualHarbor, where the art of visual storytelling meets efficiency. Our passion drives our mission – to transform the landscape of image gathering on the web for individuals, designers, content creators, and researchers alike.\n\tBehind VisualHarbor is a dedicated team of professionals committed to simplifying the process of image extraction. We recognize the potency of visuals in communication, creativity, and knowledge sharing. Therefore, our goal is clear: to empower you with tools that effortlessly streamline the collection and utilization of images.\n\tOur platform offers a user-friendly experience, allowing you to extract images seamlessly from web pages, URLs, and online documents. It's a one-stop solution for all your visual content needs, designed to enhance your efficiency and elevate your projects, research, or creative endeavors.\n\tAt VisualHarbor, we understand the value of your time and energy. Our commitment is to help you save both, enabling you to focus on what truly matters – whether it's crafting exceptional projects, conducting groundbreaking research, or unleashing your creative genius.\n\tEmbark on this visual journey with us, and together, let's paint the digital world with vibrant expressions, one extracted image at a time. VisualHarbor – where visuals meet simplicity and creativity knows no bounds.",je=h(),He=g("br"),Oe=h(),ze=g("section"),ze.innerHTML='<h3 class="svelte-18gi4ei">Contact Us</h3><p></p><h4><a href="mailto:dvstrimgextractor@gmail.com">dvstrimgextractor@gmail.com</a>  \n\t\t<a href="tel:+9112345678910">+91 12345678910</a></h4> \n\t<p>Designed By: dvstr-image-extractor</p> \n<p>Some images used under license from Shutterstock, Google. © 2023 Pawsome. All rights reserved.</p>',p(n,"rel","stylesheet"),p(n,"href","https://use.fontawesome.com/releases/v5.5.0/css/all.css"),p(n,"integrity","sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"),p(n,"crossorigin","anonymous"),p(a,"rel","stylesheet"),p(a,"href","https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"),p(r,"class","navbar navbar-expand-md navbar-light bg-light"),y(C,"color","white"),y(C,"font-size","20px"),p(C,"class","home-text05 svelte-18gi4ei"),p(C,"placeholder","Enter any URL"),p(C,"type","text"),p(C,"id","url"),S.disabled=t[2],p(S,"class","home-button svelte-18gi4ei"),y(S,"margin-left","380px"),p(E,"class","home-urlbar svelte-18gi4ei"),y(E,"margin-left","300px"),y(E,"margin-top","200px"),p(k,"class","home-searchbar svelte-18gi4ei"),p($,"class","home-container"),p(x,"class","header svelte-18gi4ei"),p(q,"class","img svelte-18gi4ei"),l(q.src,N="img/check-circle.jpg")||p(q,"src","img/check-circle.jpg"),p(q,"alt","a"),p(P,"class","text-wrapper-11 svelte-18gi4ei"),p(B,"class","white-button svelte-18gi4ei"),p(J,"class","img svelte-18gi4ei"),l(J.src,K="img/radio-button-unchecked.jpg")||p(J,"src","img/radio-button-unchecked.jpg"),p(J,"alt","h"),p(X,"class","text-wrapper-11 svelte-18gi4ei"),p(Z,"class","white-button svelte-18gi4ei"),y(se,"color","green"),p(ie,"class","text-wrapper-11 svelte-18gi4ei"),p(ne,"class","white-button svelte-18gi4ei"),p(z,"class","select-deselect svelte-18gi4ei"),p(O,"class","download-buttons svelte-18gi4ei"),p(H,"class","side-bar-sort svelte-18gi4ei"),p(de,"class","span svelte-18gi4ei"),p(me,"class","text-wrapper-13 svelte-18gi4ei"),p(ue,"class","showing-images-from svelte-18gi4ei"),p(ce,"class","result-header svelte-18gi4ei"),p(pe,"class","horizontal svelte-18gi4ei"),p(le,"class","res-frame svelte-18gi4ei"),p(j,"class","main-res-frame-2 svelte-18gi4ei"),p(j,"id","resultsContainer"),y(j,"display","none"),p(U,"class","main-res-frame svelte-18gi4ei"),p(T,"class","div svelte-18gi4ei"),p(L,"class","res-load svelte-18gi4ei"),p(Ee,"class","services svelte-18gi4ei"),p(Ie,"class","FAQ"),p(Ie,"id","faq"),p(Le,"class","aboutus svelte-18gi4ei"),p(ze,"class","footer svelte-18gi4ei"),p(ze,"id","aboutus")},m(e,i){u(e,n,i),u(e,s,i),u(e,a,i),u(e,o,i),u(e,r,i),u(e,w,i),u(e,x,i),c(x,$),c($,k),c(k,E),c(E,C),b(C,t[0]),c(E,_),c(E,S),c(S,I),u(e,A,i),u(e,L,i),c(L,T),c(T,U),c(U,j),c(j,H),c(H,O),c(O,z),c(z,B),c(B,q),c(B,R),c(B,P),c(P,Y),c(z,G),c(z,Z),c(Z,J),c(Z,Q),c(Z,X),c(X,ee),c(z,te),c(z,ne),c(ne,ie),c(ie,se),c(j,ae),c(j,oe),c(j,re),c(j,le),c(le,ce),c(ce,ue),c(ue,de),c(ue,ge),c(ue,me),c(me,he),c(le,fe),c(le,pe),Ne&&Ne.m(pe,null),u(e,ve,i),u(e,be,i),u(e,ye,i),u(e,we,i),u(e,xe,i),u(e,$e,i),u(e,ke,i),u(e,Ee,i),u(e,Ce,i),u(e,_e,i),u(e,Se,i),u(e,Ie,i),u(e,Ae,i),u(e,Le,i),u(e,Te,i),u(e,Ue,i),u(e,je,i),u(e,He,i),u(e,Oe,i),u(e,ze,i),Be||(qe=[f(C,"input",t[4]),f(S,"click",t[3]),f(S,"click",V),f(Y,"click",D),f(ee,"click",W),f(se,"click",F)],Be=!0)},p(e,[t]){1&t&&C.value!==e[0]&&b(C,e[0]),4&t&&Me!==(Me=e[2]?"Scraping...":"Scrape Images")&&v(I,Me),4&t&&(S.disabled=e[2]),1&t&&v(he,e[0]),e[1].length>0?Ne?Ne.p(e,t):(Ne=M(e),Ne.c(),Ne.m(pe,null)):Ne&&(Ne.d(1),Ne=null)},i:e,o:e,d(e){e&&d(n),e&&d(s),e&&d(a),e&&d(o),e&&d(r),e&&d(w),e&&d(x),e&&d(A),e&&d(L),Ne&&Ne.d(),e&&d(ve),e&&d(be),e&&d(ye),e&&d(we),e&&d(xe),e&&d($e),e&&d(ke),e&&d(Ee),e&&d(Ce),e&&d(_e),e&&d(Se),e&&d(Ie),e&&d(Ae),e&&d(Le),e&&d(Te),e&&d(Ue),e&&d(je),e&&d(He),e&&d(Oe),e&&d(ze),Be=!1,i(qe)}}}function V(){document.getElementById("url").value&&(document.getElementById("resultsContainer").style.display="block")}function P(e,t){fetch(e).then((e=>e.blob())).then((e=>{const n=window.URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=t,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(n),document.body.removeChild(i)})).catch((e=>{console.error("Error downloading image:",e)}))}function D(){document.querySelectorAll(".horizontal .image-frame-vertical .frame-2 img").forEach((e=>{e.setAttribute("data-selected","true"),e.style.border="2px solid blue"}))}function W(){document.querySelectorAll(".horizontal .image-frame-vertical .frame-2 img").forEach((e=>{e.setAttribute("data-selected","false"),e.style.border="1px solid #ccc"}))}function F(){document.querySelectorAll(".horizontal .image-frame-vertical .frame-2 img[data-selected='true']").forEach((e=>{P(e.src,"image_"+Date.now())}))}function Y(){var e=document.getElementById("imageToCopy");if(e&&e.src){var t=e.src;!function(e){var t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}(t),alert("Image URL copied to clipboard: "+t)}}function G(e,t,n){let i="",s=[],a=[],o=!1,r=null;async function l(){n(2,o=!0),r=null;try{const e=await fetch("http://localhost:5000/api/scrape",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:i})}),t=await e.json();t.success?(n(1,s=t.imgUrls),a=t.imgUrls):r=t.error}catch(e){console.error("Error:",e),e="An error occurred during the scraping process."}finally{n(2,o=!1)}}x((()=>{l()}));return[i,s,o,l,function(){i=this.value,n(0,i)},e=>P(e,"image.jpg")]}return new class extends B{constructor(e){super(),z(this,e,G,R,a,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map

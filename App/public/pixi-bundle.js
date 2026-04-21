(function(){"use strict";var T=(n=>(n.Application="application",n.WebGLPipes="webgl-pipes",n.WebGLPipesAdaptor="webgl-pipes-adaptor",n.WebGLSystem="webgl-system",n.WebGPUPipes="webgpu-pipes",n.WebGPUPipesAdaptor="webgpu-pipes-adaptor",n.WebGPUSystem="webgpu-system",n.CanvasSystem="canvas-system",n.CanvasPipesAdaptor="canvas-pipes-adaptor",n.CanvasPipes="canvas-pipes",n.Asset="asset",n.LoadParser="load-parser",n.ResolveParser="resolve-parser",n.CacheParser="cache-parser",n.DetectionParser="detection-parser",n.MaskEffect="mask-effect",n.BlendMode="blend-mode",n.TextureSource="texture-source",n.Environment="environment",n.ShapeBuilder="shape-builder",n.Batcher="batcher",n))(T||{});const Ii=n=>{if(typeof n=="function"||typeof n=="object"&&n.extension){if(!n.extension)throw new Error("Extension class must have an extension object");n={...typeof n.extension!="object"?{type:n.extension}:n.extension,ref:n}}if(typeof n=="object")n={...n};else throw new Error("Invalid extension type");return typeof n.type=="string"&&(n.type=[n.type]),n},rn=(n,e)=>Ii(n).priority??e,$={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...n){return n.map(Ii).forEach(e=>{e.type.forEach(t=>{var r,s;return(s=(r=this._removeHandlers)[t])==null?void 0:s.call(r,e)})}),this},add(...n){return n.map(Ii).forEach(e=>{e.type.forEach(t=>{var i,o;const r=this._addHandlers,s=this._queue;r[t]?(o=r[t])==null||o.call(r,e):(s[t]=s[t]||[],(i=s[t])==null||i.push(e))})}),this},handle(n,e,t){var o;const r=this._addHandlers,s=this._removeHandlers;if(r[n]||s[n])throw new Error(`Extension type ${n} already has a handler`);r[n]=e,s[n]=t;const i=this._queue;return i[n]&&((o=i[n])==null||o.forEach(a=>e(a)),delete i[n]),this},handleByMap(n,e){return this.handle(n,t=>{t.name&&(e[t.name]=t.ref)},t=>{t.name&&delete e[t.name]})},handleByNamedList(n,e,t=-1){return this.handle(n,r=>{e.findIndex(i=>i.name===r.name)>=0||(e.push({name:r.name,value:r.ref}),e.sort((i,o)=>rn(o.value,t)-rn(i.value,t)))},r=>{const s=e.findIndex(i=>i.name===r.name);s!==-1&&e.splice(s,1)})},handleByList(n,e,t=-1){return this.handle(n,r=>{e.includes(r.ref)||(e.push(r.ref),e.sort((s,i)=>rn(i,t)-rn(s,t)))},r=>{const s=e.indexOf(r.ref);s!==-1&&e.splice(s,1)})},mixin(n,...e){for(const t of e)Object.defineProperties(n.prototype,Object.getOwnPropertyDescriptors(t))}},nc={extension:{type:T.Environment,name:"browser",priority:-1},test:()=>!0,load:async()=>{await Promise.resolve().then(()=>dS)}},sc={extension:{type:T.Environment,name:"webworker",priority:0},test:()=>typeof self<"u"&&self.WorkerGlobalScope!==void 0,load:async()=>{await Promise.resolve().then(()=>fS)}};class le{constructor(e,t,r){this._x=t||0,this._y=r||0,this._observer=e}clone(e){return new le(e??this._observer,this._x,this._y)}set(e=0,t=e){return(this._x!==e||this._y!==t)&&(this._x=e,this._y=t,this._observer._onUpdate(this)),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this._observer._onUpdate(this)),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}toString(){return`[pixi.js/math:ObservablePoint x=${this._x} y=${this._y} scope=${this._observer}]`}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this._observer._onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this._observer._onUpdate(this))}}function ic(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Oi={exports:{}},oc;function fb(){return oc||(oc=1,(function(n){var e=Object.prototype.hasOwnProperty,t="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(t=!1));function s(u,l,c){this.fn=u,this.context=l,this.once=c||!1}function i(u,l,c,h,d){if(typeof c!="function")throw new TypeError("The listener must be a function");var f=new s(c,h||u,d),g=t?t+l:l;return u._events[g]?u._events[g].fn?u._events[g]=[u._events[g],f]:u._events[g].push(f):(u._events[g]=f,u._eventsCount++),u}function o(u,l){--u._eventsCount===0?u._events=new r:delete u._events[l]}function a(){this._events=new r,this._eventsCount=0}a.prototype.eventNames=function(){var l=[],c,h;if(this._eventsCount===0)return l;for(h in c=this._events)e.call(c,h)&&l.push(t?h.slice(1):h);return Object.getOwnPropertySymbols?l.concat(Object.getOwnPropertySymbols(c)):l},a.prototype.listeners=function(l){var c=t?t+l:l,h=this._events[c];if(!h)return[];if(h.fn)return[h.fn];for(var d=0,f=h.length,g=new Array(f);d<f;d++)g[d]=h[d].fn;return g},a.prototype.listenerCount=function(l){var c=t?t+l:l,h=this._events[c];return h?h.fn?1:h.length:0},a.prototype.emit=function(l,c,h,d,f,g){var x=t?t+l:l;if(!this._events[x])return!1;var p=this._events[x],b=arguments.length,y,v;if(p.fn){switch(p.once&&this.removeListener(l,p.fn,void 0,!0),b){case 1:return p.fn.call(p.context),!0;case 2:return p.fn.call(p.context,c),!0;case 3:return p.fn.call(p.context,c,h),!0;case 4:return p.fn.call(p.context,c,h,d),!0;case 5:return p.fn.call(p.context,c,h,d,f),!0;case 6:return p.fn.call(p.context,c,h,d,f,g),!0}for(v=1,y=new Array(b-1);v<b;v++)y[v-1]=arguments[v];p.fn.apply(p.context,y)}else{var C=p.length,D;for(v=0;v<C;v++)switch(p[v].once&&this.removeListener(l,p[v].fn,void 0,!0),b){case 1:p[v].fn.call(p[v].context);break;case 2:p[v].fn.call(p[v].context,c);break;case 3:p[v].fn.call(p[v].context,c,h);break;case 4:p[v].fn.call(p[v].context,c,h,d);break;default:if(!y)for(D=1,y=new Array(b-1);D<b;D++)y[D-1]=arguments[D];p[v].fn.apply(p[v].context,y)}}return!0},a.prototype.on=function(l,c,h){return i(this,l,c,h,!1)},a.prototype.once=function(l,c,h){return i(this,l,c,h,!0)},a.prototype.removeListener=function(l,c,h,d){var f=t?t+l:l;if(!this._events[f])return this;if(!c)return o(this,f),this;var g=this._events[f];if(g.fn)g.fn===c&&(!d||g.once)&&(!h||g.context===h)&&o(this,f);else{for(var x=0,p=[],b=g.length;x<b;x++)(g[x].fn!==c||d&&!g[x].once||h&&g[x].context!==h)&&p.push(g[x]);p.length?this._events[f]=p.length===1?p[0]:p:o(this,f)}return this},a.prototype.removeAllListeners=function(l){var c;return l?(c=t?t+l:l,this._events[c]&&o(this,c)):(this._events=new r,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=t,a.EventEmitter=a,n.exports=a})(Oi)),Oi.exports}var pb=fb();const We=ic(pb),ac=Math.PI*2,uc=180/Math.PI,lc=Math.PI/180;class ie{constructor(e=0,t=0){this.x=0,this.y=0,this.x=e,this.y=t}clone(){return new ie(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,t=e){return this.x=e,this.y=t,this}toString(){return`[pixi.js/math:Point x=${this.x} y=${this.y}]`}static get shared(){return Gi.x=0,Gi.y=0,Gi}}const Gi=new ie;class H{constructor(e=1,t=0,r=0,s=1,i=0,o=0){this.array=null,this.a=e,this.b=t,this.c=r,this.d=s,this.tx=i,this.ty=o}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,t,r,s,i,o){return this.a=e,this.b=t,this.c=r,this.d=s,this.tx=i,this.ty=o,this}toArray(e,t){this.array||(this.array=new Float32Array(9));const r=t||this.array;return e?(r[0]=this.a,r[1]=this.b,r[2]=0,r[3]=this.c,r[4]=this.d,r[5]=0,r[6]=this.tx,r[7]=this.ty,r[8]=1):(r[0]=this.a,r[1]=this.c,r[2]=this.tx,r[3]=this.b,r[4]=this.d,r[5]=this.ty,r[6]=0,r[7]=0,r[8]=1),r}apply(e,t){t=t||new ie;const r=e.x,s=e.y;return t.x=this.a*r+this.c*s+this.tx,t.y=this.b*r+this.d*s+this.ty,t}applyInverse(e,t){t=t||new ie;const r=this.a,s=this.b,i=this.c,o=this.d,a=this.tx,u=this.ty,l=1/(r*o+i*-s),c=e.x,h=e.y;return t.x=o*l*c+-i*l*h+(u*i-a*o)*l,t.y=r*l*h+-s*l*c+(-u*r+a*s)*l,t}translate(e,t){return this.tx+=e,this.ty+=t,this}scale(e,t){return this.a*=e,this.d*=t,this.c*=e,this.b*=t,this.tx*=e,this.ty*=t,this}rotate(e){const t=Math.cos(e),r=Math.sin(e),s=this.a,i=this.c,o=this.tx;return this.a=s*t-this.b*r,this.b=s*r+this.b*t,this.c=i*t-this.d*r,this.d=i*r+this.d*t,this.tx=o*t-this.ty*r,this.ty=o*r+this.ty*t,this}append(e){const t=this.a,r=this.b,s=this.c,i=this.d;return this.a=e.a*t+e.b*s,this.b=e.a*r+e.b*i,this.c=e.c*t+e.d*s,this.d=e.c*r+e.d*i,this.tx=e.tx*t+e.ty*s+this.tx,this.ty=e.tx*r+e.ty*i+this.ty,this}appendFrom(e,t){const r=e.a,s=e.b,i=e.c,o=e.d,a=e.tx,u=e.ty,l=t.a,c=t.b,h=t.c,d=t.d;return this.a=r*l+s*h,this.b=r*c+s*d,this.c=i*l+o*h,this.d=i*c+o*d,this.tx=a*l+u*h+t.tx,this.ty=a*c+u*d+t.ty,this}setTransform(e,t,r,s,i,o,a,u,l){return this.a=Math.cos(a+l)*i,this.b=Math.sin(a+l)*i,this.c=-Math.sin(a-u)*o,this.d=Math.cos(a-u)*o,this.tx=e-(r*this.a+s*this.c),this.ty=t-(r*this.b+s*this.d),this}prepend(e){const t=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const r=this.a,s=this.c;this.a=r*e.a+this.b*e.c,this.b=r*e.b+this.b*e.d,this.c=s*e.a+this.d*e.c,this.d=s*e.b+this.d*e.d}return this.tx=t*e.a+this.ty*e.c+e.tx,this.ty=t*e.b+this.ty*e.d+e.ty,this}decompose(e){const t=this.a,r=this.b,s=this.c,i=this.d,o=e.pivot,a=-Math.atan2(-s,i),u=Math.atan2(r,t),l=Math.abs(a+u);return l<1e-5||Math.abs(ac-l)<1e-5?(e.rotation=u,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=a,e.skew.y=u),e.scale.x=Math.sqrt(t*t+r*r),e.scale.y=Math.sqrt(s*s+i*i),e.position.x=this.tx+(o.x*t+o.y*s),e.position.y=this.ty+(o.x*r+o.y*i),e}invert(){const e=this.a,t=this.b,r=this.c,s=this.d,i=this.tx,o=e*s-t*r;return this.a=s/o,this.b=-t/o,this.c=-r/o,this.d=e/o,this.tx=(r*this.ty-s*i)/o,this.ty=-(e*this.ty-t*i)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new H;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}equals(e){return e.a===this.a&&e.b===this.b&&e.c===this.c&&e.d===this.d&&e.tx===this.tx&&e.ty===this.ty}toString(){return`[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`}static get IDENTITY(){return gb.identity()}static get shared(){return mb.identity()}}const mb=new H,gb=new H,Qt=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],Jt=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],er=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],tr=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],ki=[],cc=[],Jn=Math.sign;function _b(){for(let n=0;n<16;n++){const e=[];ki.push(e);for(let t=0;t<16;t++){const r=Jn(Qt[n]*Qt[t]+er[n]*Jt[t]),s=Jn(Jt[n]*Qt[t]+tr[n]*Jt[t]),i=Jn(Qt[n]*er[t]+er[n]*tr[t]),o=Jn(Jt[n]*er[t]+tr[n]*tr[t]);for(let a=0;a<16;a++)if(Qt[a]===r&&Jt[a]===s&&er[a]===i&&tr[a]===o){e.push(a);break}}}for(let n=0;n<16;n++){const e=new H;e.set(Qt[n],Jt[n],er[n],tr[n],0,0),cc.push(e)}}_b();const J={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:n=>Qt[n],uY:n=>Jt[n],vX:n=>er[n],vY:n=>tr[n],inv:n=>n&8?n&15:-n&7,add:(n,e)=>ki[n][e],sub:(n,e)=>ki[n][J.inv(e)],rotate180:n=>n^4,isVertical:n=>(n&3)===2,byDirection:(n,e)=>Math.abs(n)*2<=Math.abs(e)?e>=0?J.S:J.N:Math.abs(e)*2<=Math.abs(n)?n>0?J.E:J.W:e>0?n>0?J.SE:J.SW:n>0?J.NE:J.NW,matrixAppendRotationInv:(n,e,t=0,r=0)=>{const s=cc[J.inv(e)];s.tx=t,s.ty=r,n.append(s)},transformRectCoords:(n,e,t,r)=>{const{x:s,y:i,width:o,height:a}=n,{x:u,y:l,width:c,height:h}=e;return t===J.E?(r.set(s+u,i+l,o,a),r):t===J.S?r.set(c-i-a+u,s+l,a,o):t===J.W?r.set(c-s-o+u,h-i-a+l,o,a):t===J.N?r.set(i+u,h-s-o+l,a,o):r.set(s+u,i+l,o,a)}},es=[new ie,new ie,new ie,new ie];class ne{constructor(e=0,t=0,r=0,s=0){this.type="rectangle",this.x=Number(e),this.y=Number(t),this.width=Number(r),this.height=Number(s)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}isEmpty(){return this.left===this.right||this.top===this.bottom}static get EMPTY(){return new ne(0,0,0,0)}clone(){return new ne(this.x,this.y,this.width,this.height)}copyFromBounds(e){return this.x=e.minX,this.y=e.minY,this.width=e.maxX-e.minX,this.height=e.maxY-e.minY,this}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&t>=this.y&&t<this.y+this.height}strokeContains(e,t,r,s=.5){const{width:i,height:o}=this;if(i<=0||o<=0)return!1;const a=this.x,u=this.y,l=r*(1-s),c=r-l,h=a-l,d=a+i+l,f=u-l,g=u+o+l,x=a+c,p=a+i-c,b=u+c,y=u+o-c;return e>=h&&e<=d&&t>=f&&t<=g&&!(e>x&&e<p&&t>b&&t<y)}intersects(e,t){if(!t){const O=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=O)return!1;const E=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>E}const r=this.left,s=this.right,i=this.top,o=this.bottom;if(s<=r||o<=i)return!1;const a=es[0].set(e.left,e.top),u=es[1].set(e.left,e.bottom),l=es[2].set(e.right,e.top),c=es[3].set(e.right,e.bottom);if(l.x<=a.x||u.y<=a.y)return!1;const h=Math.sign(t.a*t.d-t.b*t.c);if(h===0||(t.apply(a,a),t.apply(u,u),t.apply(l,l),t.apply(c,c),Math.max(a.x,u.x,l.x,c.x)<=r||Math.min(a.x,u.x,l.x,c.x)>=s||Math.max(a.y,u.y,l.y,c.y)<=i||Math.min(a.y,u.y,l.y,c.y)>=o))return!1;const d=h*(u.y-a.y),f=h*(a.x-u.x),g=d*r+f*i,x=d*s+f*i,p=d*r+f*o,b=d*s+f*o;if(Math.max(g,x,p,b)<=d*a.x+f*a.y||Math.min(g,x,p,b)>=d*c.x+f*c.y)return!1;const y=h*(a.y-l.y),v=h*(l.x-a.x),C=y*r+v*i,D=y*s+v*i,B=y*r+v*o,w=y*s+v*o;return!(Math.max(C,D,B,w)<=y*a.x+v*a.y||Math.min(C,D,B,w)>=y*c.x+v*c.y)}pad(e=0,t=e){return this.x-=e,this.y-=t,this.width+=e*2,this.height+=t*2,this}fit(e){const t=Math.max(this.x,e.x),r=Math.min(this.x+this.width,e.x+e.width),s=Math.max(this.y,e.y),i=Math.min(this.y+this.height,e.y+e.height);return this.x=t,this.width=Math.max(r-t,0),this.y=s,this.height=Math.max(i-s,0),this}ceil(e=1,t=.001){const r=Math.ceil((this.x+this.width-t)*e)/e,s=Math.ceil((this.y+this.height-t)*e)/e;return this.x=Math.floor((this.x+t)*e)/e,this.y=Math.floor((this.y+t)*e)/e,this.width=r-this.x,this.height=s-this.y,this}scale(e,t=e){return this.x*=e,this.y*=t,this.width*=e,this.height*=t,this}enlarge(e){const t=Math.min(this.x,e.x),r=Math.max(this.x+this.width,e.x+e.width),s=Math.min(this.y,e.y),i=Math.max(this.y+this.height,e.y+e.height);return this.x=t,this.width=r-t,this.y=s,this.height=i-s,this}getBounds(e){return e||(e=new ne),e.copyFrom(this),e}containsRect(e){if(this.width<=0||this.height<=0)return!1;const t=e.x,r=e.y,s=e.x+e.width,i=e.y+e.height;return t>=this.x&&t<this.x+this.width&&r>=this.y&&r<this.y+this.height&&s>=this.x&&s<this.x+this.width&&i>=this.y&&i<this.y+this.height}set(e,t,r,s){return this.x=e,this.y=t,this.width=r,this.height=s,this}toString(){return`[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`}}const nn={default:-1};function ae(n="default"){return nn[n]===void 0&&(nn[n]=-1),++nn[n]}function xb(){for(const n in nn)delete nn[n]}const hc=new Set,j="8.0.0",dc="8.3.4",br={quiet:!1,noColor:!1},L=(n,e,t=3)=>{if(br.quiet||hc.has(e))return;let r=new Error().stack;const s=`${e}
Deprecated since v${n}`,i=typeof console.groupCollapsed=="function"&&!br.noColor;typeof r>"u"?console.warn("PixiJS Deprecation Warning: ",s):(r=r.split(`
`).splice(t).join(`
`),i?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",s),console.warn(r),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",s),console.warn(r))),hc.add(e)};Object.defineProperties(L,{quiet:{get:()=>br.quiet,set:n=>{br.quiet=n},enumerable:!0,configurable:!1},noColor:{get:()=>br.noColor,set:n=>{br.noColor=n},enumerable:!0,configurable:!1}});const Li=()=>{};function rr(n){return n+=n===0?1:0,--n,n|=n>>>1,n|=n>>>2,n|=n>>>4,n|=n>>>8,n|=n>>>16,n+1}function Ni(n){return!(n&n-1)&&!!n}function bb(n){let e=(n>65535?1:0)<<4;n>>>=e;let t=(n>255?1:0)<<3;return n>>>=t,e|=t,t=(n>15?1:0)<<2,n>>>=t,e|=t,t=(n>3?1:0)<<1,n>>>=t,e|=t,e|n>>1}function ht(n){const e={};for(const t in n)n[t]!==void 0&&(e[t]=n[t]);return e}const fc=Object.create(null);function yb(n){const e=fc[n];return e===void 0&&(fc[n]=ae("resource")),e}const pc=class Px extends We{constructor(e={}){super(),this._resourceType="textureSampler",this._touched=0,this._maxAnisotropy=1,this.destroyed=!1,e={...Px.defaultOptions,...e},this.addressMode=e.addressMode,this.addressModeU=e.addressModeU??this.addressModeU,this.addressModeV=e.addressModeV??this.addressModeV,this.addressModeW=e.addressModeW??this.addressModeW,this.scaleMode=e.scaleMode,this.magFilter=e.magFilter??this.magFilter,this.minFilter=e.minFilter??this.minFilter,this.mipmapFilter=e.mipmapFilter??this.mipmapFilter,this.lodMinClamp=e.lodMinClamp,this.lodMaxClamp=e.lodMaxClamp,this.compare=e.compare,this.maxAnisotropy=e.maxAnisotropy??1}set addressMode(e){this.addressModeU=e,this.addressModeV=e,this.addressModeW=e}get addressMode(){return this.addressModeU}set wrapMode(e){L(j,"TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=e}get wrapMode(){return this.addressMode}set scaleMode(e){this.magFilter=e,this.minFilter=e,this.mipmapFilter=e}get scaleMode(){return this.magFilter}set maxAnisotropy(e){this._maxAnisotropy=Math.min(e,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get _resourceId(){return this._sharedResourceId||this._generateResourceId()}update(){this._sharedResourceId=null,this.emit("change",this)}_generateResourceId(){const e=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._sharedResourceId=yb(e),this._resourceId}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this.removeAllListeners()}};pc.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};let tt=pc;const mc=class Bx extends We{constructor(e={}){super(),this.options=e,this._gpuData=Object.create(null),this._gcLastUsed=-1,this.uid=ae("textureSource"),this._resourceType="textureSource",this._resourceId=ae("resource"),this.uploadMethodId="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm",this.dimension="2d",this.antialias=!1,this._touched=0,this._batchTick=-1,this._textureBindLocation=-1,e={...Bx.defaultOptions,...e},this.label=e.label??"",this.resource=e.resource,this.autoGarbageCollect=e.autoGarbageCollect,this._resolution=e.resolution,e.width?this.pixelWidth=e.width*this._resolution:this.pixelWidth=this.resource?this.resourceWidth??1:1,e.height?this.pixelHeight=e.height*this._resolution:this.pixelHeight=this.resource?this.resourceHeight??1:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=e.format,this.dimension=e.dimensions,this.mipLevelCount=e.mipLevelCount,this.autoGenerateMipmaps=e.autoGenerateMipmaps,this.sampleCount=e.sampleCount,this.antialias=e.antialias,this.alphaMode=e.alphaMode,this.style=new tt(ht(e)),this.destroyed=!1,this._refreshPOT()}get source(){return this}get style(){return this._style}set style(e){var t,r;this.style!==e&&((t=this._style)==null||t.off("change",this._onStyleChange,this),this._style=e,(r=this._style)==null||r.on("change",this._onStyleChange,this),this._onStyleChange())}set maxAnisotropy(e){this._style.maxAnisotropy=e}get maxAnisotropy(){return this._style.maxAnisotropy}get addressMode(){return this._style.addressMode}set addressMode(e){this._style.addressMode=e}get repeatMode(){return this._style.addressMode}set repeatMode(e){this._style.addressMode=e}get magFilter(){return this._style.magFilter}set magFilter(e){this._style.magFilter=e}get minFilter(){return this._style.minFilter}set minFilter(e){this._style.minFilter=e}get mipmapFilter(){return this._style.mipmapFilter}set mipmapFilter(e){this._style.mipmapFilter=e}get lodMinClamp(){return this._style.lodMinClamp}set lodMinClamp(e){this._style.lodMinClamp=e}get lodMaxClamp(){return this._style.lodMaxClamp}set lodMaxClamp(e){this._style.lodMaxClamp=e}_onStyleChange(){this.emit("styleChange",this)}update(){if(this.resource){const e=this._resolution;if(this.resize(this.resourceWidth/e,this.resourceHeight/e))return}this.emit("update",this)}destroy(){this.destroyed=!0,this.unload(),this.emit("destroy",this),this._style&&(this._style.destroy(),this._style=null),this.uploadMethodId=null,this.resource=null,this.removeAllListeners()}unload(){var e,t;this._resourceId=ae("resource"),this.emit("change",this),this.emit("unload",this);for(const r in this._gpuData)(t=(e=this._gpuData[r])==null?void 0:e.destroy)==null||t.call(e);this._gpuData=Object.create(null)}get resourceWidth(){const{resource:e}=this;return e.naturalWidth||e.videoWidth||e.displayWidth||e.width}get resourceHeight(){const{resource:e}=this;return e.naturalHeight||e.videoHeight||e.displayHeight||e.height}get resolution(){return this._resolution}set resolution(e){this._resolution!==e&&(this._resolution=e,this.width=this.pixelWidth/e,this.height=this.pixelHeight/e)}resize(e,t,r){r||(r=this._resolution),e||(e=this.width),t||(t=this.height);const s=Math.round(e*r),i=Math.round(t*r);return this.width=s/r,this.height=i/r,this._resolution=r,this.pixelWidth===s&&this.pixelHeight===i?!1:(this._refreshPOT(),this.pixelWidth=s,this.pixelHeight=i,this.emit("resize",this),this._resourceId=ae("resource"),this.emit("change",this),!0)}updateMipmaps(){this.autoGenerateMipmaps&&this.mipLevelCount>1&&this.emit("updateMipmaps",this)}set wrapMode(e){this._style.wrapMode=e}get wrapMode(){return this._style.wrapMode}set scaleMode(e){this._style.scaleMode=e}get scaleMode(){return this._style.scaleMode}_refreshPOT(){this.isPowerOfTwo=Ni(this.pixelWidth)&&Ni(this.pixelHeight)}static test(e){throw new Error("Unimplemented")}};mc.defaultOptions={resolution:1,format:"bgra8unorm",alphaMode:"premultiply-alpha-on-upload",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,autoGarbageCollect:!1};let fe=mc;class ts extends fe{constructor(e){const t=e.resource||new Float32Array(e.width*e.height*4);let r=e.format;r||(t instanceof Float32Array?r="rgba32float":t instanceof Int32Array||t instanceof Uint32Array?r="rgba32uint":t instanceof Int16Array||t instanceof Uint16Array?r="rgba16uint":(t instanceof Int8Array,r="bgra8unorm")),super({...e,resource:t,format:r}),this.uploadMethodId="buffer"}static test(e){return e instanceof Int8Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array}}ts.extension=T.TextureSource;const gc=new H;class zi{constructor(e,t){this.mapCoord=new H,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,typeof t>"u"?this.clampMargin=e.width<10?0:.5:this.clampMargin=t,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){var t;this.texture!==e&&((t=this._texture)==null||t.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,t){t===void 0&&(t=e);const r=this.mapCoord;for(let s=0;s<e.length;s+=2){const i=e[s],o=e[s+1];t[s]=i*r.a+o*r.c+r.tx,t[s+1]=i*r.b+o*r.d+r.ty}return t}update(){const e=this._texture;this._updateID++;const t=e.uvs;this.mapCoord.set(t.x1-t.x0,t.y1-t.y0,t.x3-t.x0,t.y3-t.y0,t.x0,t.y0);const r=e.orig,s=e.trim;s&&(gc.set(r.width/s.width,0,0,r.height/s.height,-s.x/s.width,-s.y/s.height),this.mapCoord.append(gc));const i=e.source,o=this.uClampFrame,a=this.clampMargin/i._resolution,u=this.clampOffset/i._resolution;return o[0]=(e.frame.x+a+u)/i.width,o[1]=(e.frame.y+a+u)/i.height,o[2]=(e.frame.x+e.frame.width-a+u)/i.width,o[3]=(e.frame.y+e.frame.height-a+u)/i.height,this.uClampOffset[0]=this.clampOffset/i.pixelWidth,this.uClampOffset[1]=this.clampOffset/i.pixelHeight,this.isSimple=e.frame.width===i.width&&e.frame.height===i.height&&e.rotate===0,!0}}class k extends We{constructor({source:e,label:t,frame:r,orig:s,trim:i,defaultAnchor:o,defaultBorders:a,rotate:u,dynamic:l}={}){if(super(),this.uid=ae("texture"),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=new ne,this.noFrame=!1,this.dynamic=!1,this.isTexture=!0,this.label=t,this.source=(e==null?void 0:e.source)??new fe,this.noFrame=!r,r)this.frame.copyFrom(r);else{const{width:c,height:h}=this._source;this.frame.width=c,this.frame.height=h}this.orig=s||this.frame,this.trim=i,this.rotate=u??0,this.defaultAnchor=o,this.defaultBorders=a,this.destroyed=!1,this.dynamic=l||!1,this.updateUvs()}set source(e){this._source&&this._source.off("resize",this.update,this),this._source=e,e.on("resize",this.update,this),this.emit("update",this)}get source(){return this._source}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new zi(this)),this._textureMatrix}get width(){return this.orig.width}get height(){return this.orig.height}updateUvs(){const{uvs:e,frame:t}=this,{width:r,height:s}=this._source,i=t.x/r,o=t.y/s,a=t.width/r,u=t.height/s;let l=this.rotate;if(l){const c=a/2,h=u/2,d=i+c,f=o+h;l=J.add(l,J.NW),e.x0=d+c*J.uX(l),e.y0=f+h*J.uY(l),l=J.add(l,2),e.x1=d+c*J.uX(l),e.y1=f+h*J.uY(l),l=J.add(l,2),e.x2=d+c*J.uX(l),e.y2=f+h*J.uY(l),l=J.add(l,2),e.x3=d+c*J.uX(l),e.y3=f+h*J.uY(l)}else e.x0=i,e.y0=o,e.x1=i+a,e.y1=o,e.x2=i+a,e.y2=o+u,e.x3=i,e.y3=o+u}destroy(e=!1){this._source&&(this._source.off("resize",this.update,this),e&&(this._source.destroy(),this._source=null)),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}update(){this.noFrame&&(this.frame.width=this._source.width,this.frame.height=this._source.height),this.updateUvs(),this.emit("update",this)}get baseTexture(){return L(j,"Texture.baseTexture is now Texture.source"),this._source}}k.EMPTY=new k({label:"EMPTY",source:new fe({label:"EMPTY"})}),k.EMPTY.destroy=Li,k.WHITE=new k({source:new ts({resource:new Uint8Array([255,255,255,255]),width:1,height:1,alphaMode:"premultiply-alpha-on-upload",label:"WHITE"}),label:"WHITE"}),k.WHITE.destroy=Li;function Hi(n,e,t){const{width:r,height:s}=t.orig,i=t.trim;if(i){const o=i.width,a=i.height;n.minX=i.x-e._x*r,n.maxX=n.minX+o,n.minY=i.y-e._y*s,n.maxY=n.minY+a}else n.minX=-e._x*r,n.maxX=n.minX+r,n.minY=-e._y*s,n.maxY=n.minY+s}const _c=new H;class Be{constructor(e=1/0,t=1/0,r=-1/0,s=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=_c,this.minX=e,this.minY=t,this.maxX=r,this.maxY=s}isEmpty(){return this.minX>this.maxX||this.minY>this.maxY}get rectangle(){this._rectangle||(this._rectangle=new ne);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):e.copyFromBounds(this),e}clear(){return this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=_c,this}set(e,t,r,s){this.minX=e,this.minY=t,this.maxX=r,this.maxY=s}addFrame(e,t,r,s,i){i||(i=this.matrix);const o=i.a,a=i.b,u=i.c,l=i.d,c=i.tx,h=i.ty;let d=this.minX,f=this.minY,g=this.maxX,x=this.maxY,p=o*e+u*t+c,b=a*e+l*t+h;p<d&&(d=p),b<f&&(f=b),p>g&&(g=p),b>x&&(x=b),p=o*r+u*t+c,b=a*r+l*t+h,p<d&&(d=p),b<f&&(f=b),p>g&&(g=p),b>x&&(x=b),p=o*e+u*s+c,b=a*e+l*s+h,p<d&&(d=p),b<f&&(f=b),p>g&&(g=p),b>x&&(x=b),p=o*r+u*s+c,b=a*r+l*s+h,p<d&&(d=p),b<f&&(f=b),p>g&&(g=p),b>x&&(x=b),this.minX=d,this.minY=f,this.maxX=g,this.maxY=x}addRect(e,t){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height,t)}addBounds(e,t){this.addFrame(e.minX,e.minY,e.maxX,e.maxY,t)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const t=this.minX,r=this.minY,s=this.maxX,i=this.maxY,{a:o,b:a,c:u,d:l,tx:c,ty:h}=e;let d=o*t+u*r+c,f=a*t+l*r+h;this.minX=d,this.minY=f,this.maxX=d,this.maxY=f,d=o*s+u*r+c,f=a*s+l*r+h,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*t+u*i+c,f=a*t+l*i+h,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*s+u*i+c,f=a*s+l*i+h,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}fitBounds(e,t,r,s){return this.minX<e&&(this.minX=e),this.maxX>t&&(this.maxX=t),this.minY<r&&(this.minY=r),this.maxY>s&&(this.maxY=s),this}pad(e,t=e){return this.minX-=e,this.maxX+=e,this.minY-=t,this.maxY+=t,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new Be(this.minX,this.minY,this.maxX,this.maxY)}scale(e,t=e){return this.minX*=e,this.minY*=t,this.maxX*=e,this.maxY*=t,this}get x(){return this.minX}set x(e){const t=this.maxX-this.minX;this.minX=e,this.maxX=e+t}get y(){return this.minY}set y(e){const t=this.maxY-this.minY;this.minY=e,this.maxY=e+t}get width(){return this.maxX-this.minX}set width(e){this.maxX=this.minX+e}get height(){return this.maxY-this.minY}set height(e){this.maxY=this.minY+e}get left(){return this.minX}get right(){return this.maxX}get top(){return this.minY}get bottom(){return this.maxY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,t,r,s){let i=this.minX,o=this.minY,a=this.maxX,u=this.maxY;s||(s=this.matrix);const l=s.a,c=s.b,h=s.c,d=s.d,f=s.tx,g=s.ty;for(let x=t;x<r;x+=2){const p=e[x],b=e[x+1],y=l*p+h*b+f,v=c*p+d*b+g;i=y<i?y:i,o=v<o?v:o,a=y>a?y:a,u=v>u?v:u}this.minX=i,this.minY=o,this.maxX=a,this.maxY=u}containsPoint(e,t){return this.minX<=e&&this.minY<=t&&this.maxX>=e&&this.maxY>=t}toString(){return`[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}copyFrom(e){return this.minX=e.minX,this.minY=e.minY,this.maxX=e.maxX,this.maxY=e.maxY,this}}var vb={grad:.9,turn:360,rad:360/(2*Math.PI)},Rt=function(n){return typeof n=="string"?n.length>0:typeof n=="number"},Me=function(n,e,t){return e===void 0&&(e=0),t===void 0&&(t=Math.pow(10,e)),Math.round(t*n)/t+0},at=function(n,e,t){return e===void 0&&(e=0),t===void 0&&(t=1),n>t?t:n>e?n:e},xc=function(n){return(n=isFinite(n)?n%360:0)>0?n:n+360},bc=function(n){return{r:at(n.r,0,255),g:at(n.g,0,255),b:at(n.b,0,255),a:at(n.a)}},Vi=function(n){return{r:Me(n.r),g:Me(n.g),b:Me(n.b),a:Me(n.a,3)}},Sb=/^#([0-9a-f]{3,8})$/i,rs=function(n){var e=n.toString(16);return e.length<2?"0"+e:e},yc=function(n){var e=n.r,t=n.g,r=n.b,s=n.a,i=Math.max(e,t,r),o=i-Math.min(e,t,r),a=o?i===e?(t-r)/o:i===t?2+(r-e)/o:4+(e-t)/o:0;return{h:60*(a<0?a+6:a),s:i?o/i*100:0,v:i/255*100,a:s}},vc=function(n){var e=n.h,t=n.s,r=n.v,s=n.a;e=e/360*6,t/=100,r/=100;var i=Math.floor(e),o=r*(1-t),a=r*(1-(e-i)*t),u=r*(1-(1-e+i)*t),l=i%6;return{r:255*[r,a,o,o,u,r][l],g:255*[u,r,r,a,o,o][l],b:255*[o,o,u,r,r,a][l],a:s}},Sc=function(n){return{h:xc(n.h),s:at(n.s,0,100),l:at(n.l,0,100),a:at(n.a)}},Tc=function(n){return{h:Me(n.h),s:Me(n.s),l:Me(n.l),a:Me(n.a,3)}},Cc=function(n){return vc((t=(e=n).s,{h:e.h,s:(t*=((r=e.l)<50?r:100-r)/100)>0?2*t/(r+t)*100:0,v:r+t,a:e.a}));var e,t,r},sn=function(n){return{h:(e=yc(n)).h,s:(s=(200-(t=e.s))*(r=e.v)/100)>0&&s<200?t*r/100/(s<=100?s:200-s)*100:0,l:s/2,a:e.a};var e,t,r,s},Tb=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Cb=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ab=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,wb=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Wi={string:[[function(n){var e=Sb.exec(n);return e?(n=e[1]).length<=4?{r:parseInt(n[0]+n[0],16),g:parseInt(n[1]+n[1],16),b:parseInt(n[2]+n[2],16),a:n.length===4?Me(parseInt(n[3]+n[3],16)/255,2):1}:n.length===6||n.length===8?{r:parseInt(n.substr(0,2),16),g:parseInt(n.substr(2,2),16),b:parseInt(n.substr(4,2),16),a:n.length===8?Me(parseInt(n.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(n){var e=Ab.exec(n)||wb.exec(n);return e?e[2]!==e[4]||e[4]!==e[6]?null:bc({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(n){var e=Tb.exec(n)||Cb.exec(n);if(!e)return null;var t,r,s=Sc({h:(t=e[1],r=e[2],r===void 0&&(r="deg"),Number(t)*(vb[r]||1)),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)});return Cc(s)},"hsl"]],object:[[function(n){var e=n.r,t=n.g,r=n.b,s=n.a,i=s===void 0?1:s;return Rt(e)&&Rt(t)&&Rt(r)?bc({r:Number(e),g:Number(t),b:Number(r),a:Number(i)}):null},"rgb"],[function(n){var e=n.h,t=n.s,r=n.l,s=n.a,i=s===void 0?1:s;if(!Rt(e)||!Rt(t)||!Rt(r))return null;var o=Sc({h:Number(e),s:Number(t),l:Number(r),a:Number(i)});return Cc(o)},"hsl"],[function(n){var e=n.h,t=n.s,r=n.v,s=n.a,i=s===void 0?1:s;if(!Rt(e)||!Rt(t)||!Rt(r))return null;var o=(function(a){return{h:xc(a.h),s:at(a.s,0,100),v:at(a.v,0,100),a:at(a.a)}})({h:Number(e),s:Number(t),v:Number(r),a:Number(i)});return vc(o)},"hsv"]]},Ac=function(n,e){for(var t=0;t<e.length;t++){var r=e[t][0](n);if(r)return[r,e[t][1]]}return[null,void 0]},Eb=function(n){return typeof n=="string"?Ac(n.trim(),Wi.string):typeof n=="object"&&n!==null?Ac(n,Wi.object):[null,void 0]},Xi=function(n,e){var t=sn(n);return{h:t.h,s:at(t.s+100*e,0,100),l:t.l,a:t.a}},$i=function(n){return(299*n.r+587*n.g+114*n.b)/1e3/255},wc=function(n,e){var t=sn(n);return{h:t.h,s:t.s,l:at(t.l+100*e,0,100),a:t.a}},Yi=(function(){function n(e){this.parsed=Eb(e)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return n.prototype.isValid=function(){return this.parsed!==null},n.prototype.brightness=function(){return Me($i(this.rgba),2)},n.prototype.isDark=function(){return $i(this.rgba)<.5},n.prototype.isLight=function(){return $i(this.rgba)>=.5},n.prototype.toHex=function(){return e=Vi(this.rgba),t=e.r,r=e.g,s=e.b,o=(i=e.a)<1?rs(Me(255*i)):"","#"+rs(t)+rs(r)+rs(s)+o;var e,t,r,s,i,o},n.prototype.toRgb=function(){return Vi(this.rgba)},n.prototype.toRgbString=function(){return e=Vi(this.rgba),t=e.r,r=e.g,s=e.b,(i=e.a)<1?"rgba("+t+", "+r+", "+s+", "+i+")":"rgb("+t+", "+r+", "+s+")";var e,t,r,s,i},n.prototype.toHsl=function(){return Tc(sn(this.rgba))},n.prototype.toHslString=function(){return e=Tc(sn(this.rgba)),t=e.h,r=e.s,s=e.l,(i=e.a)<1?"hsla("+t+", "+r+"%, "+s+"%, "+i+")":"hsl("+t+", "+r+"%, "+s+"%)";var e,t,r,s,i},n.prototype.toHsv=function(){return e=yc(this.rgba),{h:Me(e.h),s:Me(e.s),v:Me(e.v),a:Me(e.a,3)};var e},n.prototype.invert=function(){return xt({r:255-(e=this.rgba).r,g:255-e.g,b:255-e.b,a:e.a});var e},n.prototype.saturate=function(e){return e===void 0&&(e=.1),xt(Xi(this.rgba,e))},n.prototype.desaturate=function(e){return e===void 0&&(e=.1),xt(Xi(this.rgba,-e))},n.prototype.grayscale=function(){return xt(Xi(this.rgba,-1))},n.prototype.lighten=function(e){return e===void 0&&(e=.1),xt(wc(this.rgba,e))},n.prototype.darken=function(e){return e===void 0&&(e=.1),xt(wc(this.rgba,-e))},n.prototype.rotate=function(e){return e===void 0&&(e=15),this.hue(this.hue()+e)},n.prototype.alpha=function(e){return typeof e=="number"?xt({r:(t=this.rgba).r,g:t.g,b:t.b,a:e}):Me(this.rgba.a,3);var t},n.prototype.hue=function(e){var t=sn(this.rgba);return typeof e=="number"?xt({h:e,s:t.s,l:t.l,a:t.a}):Me(t.h)},n.prototype.isEqual=function(e){return this.toHex()===xt(e).toHex()},n})(),xt=function(n){return n instanceof Yi?n:new Yi(n)},Ec=[],Pb=function(n){n.forEach(function(e){Ec.indexOf(e)<0&&(e(Yi,Wi),Ec.push(e))})};function Bb(n,e){var t={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},r={};for(var s in t)r[t[s]]=s;var i={};n.prototype.toName=function(o){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,u,l=r[this.toHex()];if(l)return l;if(o!=null&&o.closest){var c=this.toRgb(),h=1/0,d="black";if(!i.length)for(var f in t)i[f]=new n(t[f]).toRgb();for(var g in t){var x=(a=c,u=i[g],Math.pow(a.r-u.r,2)+Math.pow(a.g-u.g,2)+Math.pow(a.b-u.b,2));x<h&&(h=x,d=g)}return d}},e.string.push([function(o){var a=o.toLowerCase(),u=a==="transparent"?"#0000":t[a];return u?new n(u).toRgb():null},"name"])}Pb([Bb]);const yr=class Zn{constructor(e=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=e}get red(){return this._components[0]}get green(){return this._components[1]}get blue(){return this._components[2]}get alpha(){return this._components[3]}setValue(e){return this.value=e,this}set value(e){if(e instanceof Zn)this._value=this._cloneSource(e._value),this._int=e._int,this._components.set(e._components);else{if(e===null)throw new Error("Cannot set Color#value to null");(this._value===null||!this._isSourceEqual(this._value,e))&&(this._value=this._cloneSource(e),this._normalize(this._value))}}get value(){return this._value}_cloneSource(e){return typeof e=="string"||typeof e=="number"||e instanceof Number||e===null?e:Array.isArray(e)||ArrayBuffer.isView(e)?e.slice(0):typeof e=="object"&&e!==null?{...e}:e}_isSourceEqual(e,t){const r=typeof e;if(r!==typeof t)return!1;if(r==="number"||r==="string"||e instanceof Number)return e===t;if(Array.isArray(e)&&Array.isArray(t)||ArrayBuffer.isView(e)&&ArrayBuffer.isView(t))return e.length!==t.length?!1:e.every((i,o)=>i===t[o]);if(e!==null&&t!==null){const i=Object.keys(e),o=Object.keys(t);return i.length!==o.length?!1:i.every(a=>e[a]===t[a])}return e===t}toRgba(){const[e,t,r,s]=this._components;return{r:e,g:t,b:r,a:s}}toRgb(){const[e,t,r]=this._components;return{r:e,g:t,b:r}}toRgbaString(){const[e,t,r]=this.toUint8RgbArray();return`rgba(${e},${t},${r},${this.alpha})`}toUint8RgbArray(e){const[t,r,s]=this._components;return this._arrayRgb||(this._arrayRgb=[]),e||(e=this._arrayRgb),e[0]=Math.round(t*255),e[1]=Math.round(r*255),e[2]=Math.round(s*255),e}toArray(e){this._arrayRgba||(this._arrayRgba=[]),e||(e=this._arrayRgba);const[t,r,s,i]=this._components;return e[0]=t,e[1]=r,e[2]=s,e[3]=i,e}toRgbArray(e){this._arrayRgb||(this._arrayRgb=[]),e||(e=this._arrayRgb);const[t,r,s]=this._components;return e[0]=t,e[1]=r,e[2]=s,e}toNumber(){return this._int}toBgrNumber(){const[e,t,r]=this.toUint8RgbArray();return(r<<16)+(t<<8)+e}toLittleEndianNumber(){const e=this._int;return(e>>16)+(e&65280)+((e&255)<<16)}multiply(e){const[t,r,s,i]=Zn._temp.setValue(e)._components;return this._components[0]*=t,this._components[1]*=r,this._components[2]*=s,this._components[3]*=i,this._refreshInt(),this._value=null,this}premultiply(e,t=!0){return t&&(this._components[0]*=e,this._components[1]*=e,this._components[2]*=e),this._components[3]=e,this._refreshInt(),this._value=null,this}toPremultiplied(e,t=!0){if(e===1)return(255<<24)+this._int;if(e===0)return t?0:this._int;let r=this._int>>16&255,s=this._int>>8&255,i=this._int&255;return t&&(r=r*e+.5|0,s=s*e+.5|0,i=i*e+.5|0),(e*255<<24)+(r<<16)+(s<<8)+i}toHex(){const e=this._int.toString(16);return`#${"000000".substring(0,6-e.length)+e}`}toHexa(){const t=Math.round(this._components[3]*255).toString(16);return this.toHex()+"00".substring(0,2-t.length)+t}setAlpha(e){return this._components[3]=this._clamp(e),this}_normalize(e){let t,r,s,i;if((typeof e=="number"||e instanceof Number)&&e>=0&&e<=16777215){const o=e;t=(o>>16&255)/255,r=(o>>8&255)/255,s=(o&255)/255,i=1}else if((Array.isArray(e)||e instanceof Float32Array)&&e.length>=3&&e.length<=4)e=this._clamp(e),[t,r,s,i=1]=e;else if((e instanceof Uint8Array||e instanceof Uint8ClampedArray)&&e.length>=3&&e.length<=4)e=this._clamp(e,0,255),[t,r,s,i=255]=e,t/=255,r/=255,s/=255,i/=255;else if(typeof e=="string"||typeof e=="object"){if(typeof e=="string"){const a=Zn.HEX_PATTERN.exec(e);a&&(e=`#${a[2]}`)}const o=xt(e);o.isValid()&&({r:t,g:r,b:s,a:i}=o.rgba,t/=255,r/=255,s/=255)}if(t!==void 0)this._components[0]=t,this._components[1]=r,this._components[2]=s,this._components[3]=i,this._refreshInt();else throw new Error(`Unable to convert color ${e}`)}_refreshInt(){this._clamp(this._components);const[e,t,r]=this._components;this._int=(e*255<<16)+(t*255<<8)+(r*255|0)}_clamp(e,t=0,r=1){return typeof e=="number"?Math.min(Math.max(e,t),r):(e.forEach((s,i)=>{e[i]=Math.min(Math.max(s,t),r)}),e)}static isColorLike(e){return typeof e=="number"||typeof e=="string"||e instanceof Number||e instanceof Zn||Array.isArray(e)||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Float32Array||e.r!==void 0&&e.g!==void 0&&e.b!==void 0||e.r!==void 0&&e.g!==void 0&&e.b!==void 0&&e.a!==void 0||e.h!==void 0&&e.s!==void 0&&e.l!==void 0||e.h!==void 0&&e.s!==void 0&&e.l!==void 0&&e.a!==void 0||e.h!==void 0&&e.s!==void 0&&e.v!==void 0||e.h!==void 0&&e.s!==void 0&&e.v!==void 0&&e.a!==void 0}};yr.shared=new yr,yr._temp=new yr,yr.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;let ee=yr;const Pc={cullArea:null,cullable:!1,cullableChildren:!0};let qi=0;const Bc=500;function X(...n){qi!==Bc&&(qi++,qi===Bc?console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS."):console.warn("PixiJS Warning: ",...n))}const nr={_registeredResources:new Set,register(n){this._registeredResources.add(n)},unregister(n){this._registeredResources.delete(n)},release(){this._registeredResources.forEach(n=>n.clear())},get registeredCount(){return this._registeredResources.size},isRegistered(n){return this._registeredResources.has(n)},reset(){this._registeredResources.clear()}};class Rc{constructor(e,t){this._pool=[],this._count=0,this._index=0,this._classType=e,t&&this.prepopulate(t)}prepopulate(e){for(let t=0;t<e;t++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){var r;let t;return this._index>0?t=this._pool[--this._index]:(t=new this._classType,this._count++),(r=t.init)==null||r.call(t,e),t}return(e){var t;(t=e.reset)==null||t.call(e),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._index}get totalUsed(){return this._count-this._index}clear(){if(this._pool.length>0&&this._pool[0].destroy)for(let e=0;e<this._index;e++)this._pool[e].destroy();this._pool.length=0,this._count=0,this._index=0}}class Dc{constructor(){this._poolsByClass=new Map}prepopulate(e,t){this.getPool(e).prepopulate(t)}get(e,t){return this.getPool(e).get(t)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new Rc(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(t=>{const r=e[t._classType.name]?t._classType.name+t._classType.ID:t._classType.name;e[r]={free:t.totalFree,used:t.totalUsed,size:t.totalSize}}),e}clear(){this._poolsByClass.forEach(e=>e.clear()),this._poolsByClass.clear()}}const Te=new Dc;nr.register(Te);const Mc={get isCachedAsTexture(){var n;return!!((n=this.renderGroup)!=null&&n.isCachedAsTexture)},cacheAsTexture(n){typeof n=="boolean"&&n===!1?this.disableRenderGroup():(this.enableRenderGroup(),this.renderGroup.enableCacheAsTexture(n===!0?{}:n))},updateCacheTexture(){var n;(n=this.renderGroup)==null||n.updateCacheTexture()},get cacheAsBitmap(){return this.isCachedAsTexture},set cacheAsBitmap(n){L("v8.6.0","cacheAsBitmap is deprecated, use cacheAsTexture instead."),this.cacheAsTexture(n)}};function ji(n,e,t){const r=n.length;let s;if(e>=r||t===0)return;t=e+t>r?r-e:t;const i=r-t;for(s=e;s<i;++s)n[s]=n[s+t];n.length=i}const Fc={allowChildren:!0,removeChildren(n=0,e){var i;const t=e??this.children.length,r=t-n,s=[];if(r>0&&r<=t){for(let a=t-1;a>=n;a--){const u=this.children[a];u&&(s.push(u),u.parent=null)}ji(this.children,n,t);const o=this.renderGroup||this.parentRenderGroup;o&&o.removeChildren(s);for(let a=0;a<s.length;++a){const u=s[a];(i=u.parentRenderLayer)==null||i.detach(u),this.emit("childRemoved",u,this,a),s[a].emit("removed",this)}return s.length>0&&this._didViewChangeTick++,s}else if(r===0&&this.children.length===0)return s;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(n){const e=this.getChildAt(n);return this.removeChild(e)},getChildAt(n){if(n<0||n>=this.children.length)throw new Error(`getChildAt: Index (${n}) does not exist.`);return this.children[n]},setChildIndex(n,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(n),this.addChildAt(n,e)},getChildIndex(n){const e=this.children.indexOf(n);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(n,e){this.allowChildren||L(j,"addChildAt: Only Containers will be allowed to add children in v8.0.0");const{children:t}=this;if(e<0||e>t.length)throw new Error(`${n}addChildAt: The index ${e} supplied is out of bounds ${t.length}`);if(n.parent){const s=n.parent.children.indexOf(n);if(n.parent===this&&s===e)return n;s!==-1&&n.parent.children.splice(s,1)}e===t.length?t.push(n):t.splice(e,0,n),n.parent=this,n.didChange=!0,n._updateFlags=15;const r=this.renderGroup||this.parentRenderGroup;return r&&r.addChild(n),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",n,this,e),n.emit("added",this),n},swapChildren(n,e){if(n===e)return;const t=this.getChildIndex(n),r=this.getChildIndex(e);this.children[t]=e,this.children[r]=n;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0),this._didContainerChangeTick++},removeFromParent(){var n;(n=this.parent)==null||n.removeChild(this)},reparentChild(...n){return n.length===1?this.reparentChildAt(n[0],this.children.length):(n.forEach(e=>this.reparentChildAt(e,this.children.length)),n[0])},reparentChildAt(n,e){if(n.parent===this)return this.setChildIndex(n,e),n;const t=n.worldTransform.clone();n.removeFromParent(),this.addChildAt(n,e);const r=this.worldTransform.clone();return r.invert(),t.prepend(r),n.setFromMatrix(t),n},replaceChild(n,e){n.updateLocalTransform(),this.addChildAt(e,this.getChildIndex(n)),e.setFromMatrix(n.localTransform),e.updateLocalTransform(),this.removeChild(n)}},Uc={collectRenderables(n,e,t){this.parentRenderLayer&&this.parentRenderLayer!==t||this.globalDisplayStatus<7||!this.includeInBuild||(this.sortableChildren&&this.sortChildren(),this.isSimple?this.collectRenderablesSimple(n,e,t):this.renderGroup?e.renderPipes.renderGroup.addRenderGroup(this.renderGroup,n):this.collectRenderablesWithEffects(n,e,t))},collectRenderablesSimple(n,e,t){const r=this.children,s=r.length;for(let i=0;i<s;i++)r[i].collectRenderables(n,e,t)},collectRenderablesWithEffects(n,e,t){const{renderPipes:r}=e;for(let s=0;s<this.effects.length;s++){const i=this.effects[s];r[i.pipe].push(i,this,n)}this.collectRenderablesSimple(n,e,t);for(let s=this.effects.length-1;s>=0;s--){const i=this.effects[s];r[i.pipe].pop(i,this,n)}}};class on{constructor(){this.pipe="filter",this.priority=1}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null,this.filterArea=null}}class Ic{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this._tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let t=0;t<this._tests.length;t++){const r=this._tests[t];if(r.test(e))return Te.get(r.maskClass,e)}return e}returnMaskEffect(e){Te.return(e)}}const ns=new Ic;$.handleByList(T.MaskEffect,ns._effectClasses);const Oc={_maskEffect:null,_maskOptions:{inverse:!1},_filterEffect:null,effects:[],_markStructureAsChanged(){const n=this.renderGroup||this.parentRenderGroup;n&&(n.structureDidChange=!0)},addEffect(n){this.effects.indexOf(n)===-1&&(this.effects.push(n),this.effects.sort((t,r)=>t.priority-r.priority),this._markStructureAsChanged(),this._updateIsSimple())},removeEffect(n){const e=this.effects.indexOf(n);e!==-1&&(this.effects.splice(e,1),this._markStructureAsChanged(),this._updateIsSimple())},set mask(n){const e=this._maskEffect;(e==null?void 0:e.mask)!==n&&(e&&(this.removeEffect(e),ns.returnMaskEffect(e),this._maskEffect=null),n!=null&&(this._maskEffect=ns.getMaskEffect(n),this.addEffect(this._maskEffect)))},get mask(){var n;return(n=this._maskEffect)==null?void 0:n.mask},setMask(n){this._maskOptions={...this._maskOptions,...n},n.mask&&(this.mask=n.mask),this._markStructureAsChanged()},set filters(n){var i;!Array.isArray(n)&&n&&(n=[n]);const e=this._filterEffect||(this._filterEffect=new on);n=n;const t=(n==null?void 0:n.length)>0,r=((i=e.filters)==null?void 0:i.length)>0,s=t!==r;n=Array.isArray(n)?n.slice(0):n,e.filters=Object.freeze(n),s&&(t?this.addEffect(e):(this.removeEffect(e),e.filters=n??null))},get filters(){var n;return(n=this._filterEffect)==null?void 0:n.filters},set filterArea(n){this._filterEffect||(this._filterEffect=new on),this._filterEffect.filterArea=n},get filterArea(){var n;return(n=this._filterEffect)==null?void 0:n.filterArea}},Gc={label:null,get name(){return L(j,"Container.name property has been removed, use Container.label instead"),this.label},set name(n){L(j,"Container.name property has been removed, use Container.label instead"),this.label=n},getChildByName(n,e=!1){return this.getChildByLabel(n,e)},getChildByLabel(n,e=!1){const t=this.children;for(let r=0;r<t.length;r++){const s=t[r];if(s.label===n||n instanceof RegExp&&n.test(s.label))return s}if(e)for(let r=0;r<t.length;r++){const i=t[r].getChildByLabel(n,!0);if(i)return i}return null},getChildrenByLabel(n,e=!1,t=[]){const r=this.children;for(let s=0;s<r.length;s++){const i=r[s];(i.label===n||n instanceof RegExp&&n.test(i.label))&&t.push(i)}if(e)for(let s=0;s<r.length;s++)r[s].getChildrenByLabel(n,!0,t);return t}},Oe=Te.getPool(H),bt=Te.getPool(Be),Rb=new H,kc={getFastGlobalBounds(n,e){e||(e=new Be),e.clear(),this._getGlobalBoundsRecursive(!!n,e,this.parentRenderLayer),e.isValid||e.set(0,0,0,0);const t=this.renderGroup||this.parentRenderGroup;return e.applyMatrix(t.worldTransform),e},_getGlobalBoundsRecursive(n,e,t){let r=e;if(n&&this.parentRenderLayer&&this.parentRenderLayer!==t||this.localDisplayStatus!==7||!this.measurable)return;const s=!!this.effects.length;if((this.renderGroup||s)&&(r=bt.get().clear()),this.boundsArea)e.addRect(this.boundsArea,this.worldTransform);else{if(this.renderPipeId){const o=this.bounds;r.addFrame(o.minX,o.minY,o.maxX,o.maxY,this.groupTransform)}const i=this.children;for(let o=0;o<i.length;o++)i[o]._getGlobalBoundsRecursive(n,r,t)}if(s){let i=!1;const o=this.renderGroup||this.parentRenderGroup;for(let a=0;a<this.effects.length;a++)this.effects[a].addBounds&&(i||(i=!0,r.applyMatrix(o.worldTransform)),this.effects[a].addBounds(r,!0));i&&r.applyMatrix(o.worldTransform.copyTo(Rb).invert()),e.addBounds(r),bt.return(r)}else this.renderGroup&&(e.addBounds(r,this.relativeGroupTransform),bt.return(r))}};function an(n,e,t){t.clear();let r,s;return n.parent?e?r=n.parent.worldTransform:(s=Oe.get().identity(),r=ss(n,s)):r=H.IDENTITY,Lc(n,t,r,e),s&&Oe.return(s),t.isValid||t.set(0,0,0,0),t}function Lc(n,e,t,r){var a,u;if(!n.visible||!n.measurable)return;let s;r?s=n.worldTransform:(n.updateLocalTransform(),s=Oe.get(),s.appendFrom(n.localTransform,t));const i=e,o=!!n.effects.length;if(o&&(e=bt.get().clear()),n.boundsArea)e.addRect(n.boundsArea,s);else{const l=n.bounds;l&&!l.isEmpty()&&(e.matrix=s,e.addBounds(l));for(let c=0;c<n.children.length;c++)Lc(n.children[c],e,s,r)}if(o){for(let l=0;l<n.effects.length;l++)(u=(a=n.effects[l]).addBounds)==null||u.call(a,e);i.addBounds(e,H.IDENTITY),bt.return(e)}r||Oe.return(s)}function ss(n,e){const t=n.parent;return t&&(ss(t,e),t.updateLocalTransform(),e.append(t.localTransform)),e}function Ki(n,e){if(n===16777215||!e)return e;if(e===16777215||!n)return n;const t=n>>16&255,r=n>>8&255,s=n&255,i=e>>16&255,o=e>>8&255,a=e&255,u=t*i/255|0,l=r*o/255|0,c=s*a/255|0;return(u<<16)+(l<<8)+c}const Nc=16777215;function un(n,e){return n===Nc?e:e===Nc?n:Ki(n,e)}function vr(n){return((n&255)<<16)+(n&65280)+(n>>16&255)}const zc={getGlobalAlpha(n){if(n)return this.renderGroup?this.renderGroup.worldAlpha:this.parentRenderGroup?this.parentRenderGroup.worldAlpha*this.alpha:this.alpha;let e=this.alpha,t=this.parent;for(;t;)e*=t.alpha,t=t.parent;return e},getGlobalTransform(n=new H,e){if(e)return n.copyFrom(this.worldTransform);this.updateLocalTransform();const t=ss(this,Oe.get().identity());return n.appendFrom(this.localTransform,t),Oe.return(t),n},getGlobalTint(n){if(n)return this.renderGroup?vr(this.renderGroup.worldColor):this.parentRenderGroup?vr(un(this.localColor,this.parentRenderGroup.worldColor)):this.tint;let e=this.localColor,t=this.parent;for(;t;)e=un(e,t.localColor),t=t.parent;return vr(e)}};function is(n,e,t){return e.clear(),t||(t=H.IDENTITY),Hc(n,e,t,n,!0),e.isValid||e.set(0,0,0,0),e}function Hc(n,e,t,r,s){var u,l;let i;if(s)i=Oe.get(),i=t.copyTo(i);else{if(!n.visible||!n.measurable)return;n.updateLocalTransform();const c=n.localTransform;i=Oe.get(),i.appendFrom(c,t)}const o=e,a=!!n.effects.length;if(a&&(e=bt.get().clear()),n.boundsArea)e.addRect(n.boundsArea,i);else{n.renderPipeId&&(e.matrix=i,e.addBounds(n.bounds));const c=n.children;for(let h=0;h<c.length;h++)Hc(c[h],e,i,r,!1)}if(a){for(let c=0;c<n.effects.length;c++)(l=(u=n.effects[c]).addLocalBounds)==null||l.call(u,e,r);o.addBounds(e,H.IDENTITY),bt.return(e)}Oe.return(i)}function Zi(n,e){const t=n.children;for(let r=0;r<t.length;r++){const s=t[r],i=s.uid,o=(s._didViewChangeTick&65535)<<16|s._didContainerChangeTick&65535,a=e.index;(e.data[a]!==i||e.data[a+1]!==o)&&(e.data[e.index]=i,e.data[e.index+1]=o,e.didChange=!0),e.index=a+2,s.children.length&&Zi(s,e)}return e.didChange}const Db=new H,Vc={_localBoundsCacheId:-1,_localBoundsCacheData:null,_setWidth(n,e){const t=Math.sign(this.scale.x)||1;e!==0?this.scale.x=n/e*t:this.scale.x=t},_setHeight(n,e){const t=Math.sign(this.scale.y)||1;e!==0?this.scale.y=n/e*t:this.scale.y=t},getLocalBounds(){this._localBoundsCacheData||(this._localBoundsCacheData={data:[],index:1,didChange:!1,localBounds:new Be});const n=this._localBoundsCacheData;return n.index=1,n.didChange=!1,n.data[0]!==this._didViewChangeTick&&(n.didChange=!0,n.data[0]=this._didViewChangeTick),Zi(this,n),n.didChange&&is(this,n.localBounds,Db),n.localBounds},getBounds(n,e){return an(this,n,e||new Be)}},Wc={_onRender:null,set onRender(n){const e=this.renderGroup||this.parentRenderGroup;if(!n){this._onRender&&(e==null||e.removeOnRender(this)),this._onRender=null;return}this._onRender||e==null||e.addOnRender(this),this._onRender=n},get onRender(){return this._onRender}},Xc={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(n){this._zIndex!==n&&(this._zIndex=n,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(Mb))}};function Mb(n,e){return n._zIndex-e._zIndex}const $c={getGlobalPosition(n=new ie,e=!1){return this.parent?this.parent.toGlobal(this._position,n,e):(n.x=this._position.x,n.y=this._position.y),n},toGlobal(n,e,t=!1){const r=this.getGlobalTransform(Oe.get(),t);return e=r.apply(n,e),Oe.return(r),e},toLocal(n,e,t,r){e&&(n=e.toGlobal(n,t,r));const s=this.getGlobalTransform(Oe.get(),r);return t=s.applyInverse(n,t),Oe.return(s),t}};class Qi{constructor(){this.uid=ae("instructionSet"),this.instructions=[],this.instructionSize=0,this.renderables=[],this.gcTick=0}reset(){this.instructionSize=0}destroy(){this.instructions.length=0,this.renderables.length=0,this.renderPipes=null,this.gcTick=0}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}}let Fb=0;class Yc{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1,this.textureStyle=new tt(this.textureOptions)}createTexture(e,t,r){const s=new fe({...this.textureOptions,width:e,height:t,resolution:1,antialias:r,autoGarbageCollect:!1});return new k({source:s,label:`texturePool_${Fb++}`})}getOptimalTexture(e,t,r=1,s){let i=Math.ceil(e*r-1e-6),o=Math.ceil(t*r-1e-6);i=rr(i),o=rr(o);const a=(i<<17)+(o<<1)+(s?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let u=this._texturePool[a].pop();return u||(u=this.createTexture(i,o,s)),u.source._resolution=r,u.source.width=i/r,u.source.height=o/r,u.source.pixelWidth=i,u.source.pixelHeight=o,u.frame.x=0,u.frame.y=0,u.frame.width=e,u.frame.height=t,u.updateUvs(),this._poolKeyHash[u.uid]=a,u}getSameSizeTexture(e,t=!1){const r=e.source;return this.getOptimalTexture(e.width,e.height,r._resolution,t)}returnTexture(e,t=!1){const r=this._poolKeyHash[e.uid];t&&(e.source.style=this.textureStyle),this._texturePool[r].push(e)}clear(e){if(e=e!==!1,e)for(const t in this._texturePool){const r=this._texturePool[t];if(r)for(let s=0;s<r.length;s++)r[s].destroy(!0)}this._texturePool={}}}const ue=new Yc;nr.register(ue);class os{constructor(){this.renderPipeId="renderGroup",this.root=null,this.canBundle=!1,this.renderGroupParent=null,this.renderGroupChildren=[],this.worldTransform=new H,this.worldColorAlpha=4294967295,this.worldColor=16777215,this.worldAlpha=1,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.gcTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new Qi,this._onRenderContainers=[],this.textureNeedsUpdate=!0,this.isCachedAsTexture=!1,this._matrixDirty=7}init(e){this.root=e,e._onRender&&this.addOnRender(e),e.didChange=!0;const t=e.children;for(let r=0;r<t.length;r++){const s=t[r];s._updateFlags=15,this.addChild(s)}}enableCacheAsTexture(e={}){this.textureOptions=e,this.isCachedAsTexture=!0,this.textureNeedsUpdate=!0}disableCacheAsTexture(){this.isCachedAsTexture=!1,this.texture&&(ue.returnTexture(this.texture,!0),this.texture=null)}updateCacheTexture(){this.textureNeedsUpdate=!0;const e=this._parentCacheAsTextureRenderGroup;e&&!e.textureNeedsUpdate&&e.updateCacheTexture()}reset(){this.renderGroupChildren.length=0;for(const e in this.childrenToUpdate){const t=this.childrenToUpdate[e];t.list.fill(null),t.index=0}this.childrenRenderablesToUpdate.index=0,this.childrenRenderablesToUpdate.list.fill(null),this.root=null,this.updateTick=0,this.structureDidChange=!0,this._onRenderContainers.length=0,this.renderGroupParent=null,this.disableCacheAsTexture()}get localTransform(){return this.root.localTransform}addRenderGroupChild(e){e.renderGroupParent&&e.renderGroupParent._removeRenderGroupChild(e),e.renderGroupParent=this,this.renderGroupChildren.push(e)}_removeRenderGroupChild(e){const t=this.renderGroupChildren.indexOf(e);t>-1&&this.renderGroupChildren.splice(t,1),e.renderGroupParent=null}addChild(e){if(this.structureDidChange=!0,e.parentRenderGroup=this,e.updateTick=-1,e.parent===this.root?e.relativeRenderGroupDepth=1:e.relativeRenderGroupDepth=e.parent.relativeRenderGroupDepth+1,e.didChange=!0,this.onChildUpdate(e),e.renderGroup){this.addRenderGroupChild(e.renderGroup);return}e._onRender&&this.addOnRender(e);const t=e.children;for(let r=0;r<t.length;r++)this.addChild(t[r])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&(e.renderGroup||this.removeOnRender(e)),e.parentRenderGroup=null,e.renderGroup){this._removeRenderGroupChild(e.renderGroup);return}const t=e.children;for(let r=0;r<t.length;r++)this.removeChild(t[r])}removeChildren(e){for(let t=0;t<e.length;t++)this.removeChild(e[t])}onChildUpdate(e){let t=this.childrenToUpdate[e.relativeRenderGroupDepth];t||(t=this.childrenToUpdate[e.relativeRenderGroupDepth]={index:0,list:[]}),t.list[t.index++]=e}updateRenderable(e){e.globalDisplayStatus<7||(this.instructionSet.renderPipes[e.renderPipeId].updateRenderable(e),e.didViewUpdate=!1)}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}get isRenderable(){return this.root.localDisplayStatus===7&&this.worldAlpha>0}addOnRender(e){this._onRenderContainers.push(e)}removeOnRender(e){this._onRenderContainers.splice(this._onRenderContainers.indexOf(e),1)}runOnRender(e){for(let t=0;t<this._onRenderContainers.length;t++)this._onRenderContainers[t]._onRender(e)}destroy(){this.disableCacheAsTexture(),this.renderGroupParent=null,this.root=null,this.childrenRenderablesToUpdate=null,this.childrenToUpdate=null,this.renderGroupChildren=null,this._onRenderContainers=null,this.instructionSet=null}getChildren(e=[]){const t=this.root.children;for(let r=0;r<t.length;r++)this._getChildren(t[r],e);return e}_getChildren(e,t=[]){if(t.push(e),e.renderGroup)return t;const r=e.children;for(let s=0;s<r.length;s++)this._getChildren(r[s],t);return t}invalidateMatrices(){this._matrixDirty=7}get inverseWorldTransform(){return(this._matrixDirty&1)===0?this._inverseWorldTransform:(this._matrixDirty&=-2,this._inverseWorldTransform||(this._inverseWorldTransform=new H),this._inverseWorldTransform.copyFrom(this.worldTransform).invert())}get textureOffsetInverseTransform(){return(this._matrixDirty&2)===0?this._textureOffsetInverseTransform:(this._matrixDirty&=-3,this._textureOffsetInverseTransform||(this._textureOffsetInverseTransform=new H),this._textureOffsetInverseTransform.copyFrom(this.inverseWorldTransform).translate(-this._textureBounds.x,-this._textureBounds.y))}get inverseParentTextureTransform(){if((this._matrixDirty&4)===0)return this._inverseParentTextureTransform;this._matrixDirty&=-5;const e=this._parentCacheAsTextureRenderGroup;return e?(this._inverseParentTextureTransform||(this._inverseParentTextureTransform=new H),this._inverseParentTextureTransform.copyFrom(this.worldTransform).prepend(e.inverseWorldTransform).translate(-e._textureBounds.x,-e._textureBounds.y)):this.worldTransform}get cacheToLocalTransform(){return this.isCachedAsTexture?this.textureOffsetInverseTransform:this._parentCacheAsTextureRenderGroup?this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform:null}}function as(n,e,t={}){for(const r in e)!t[r]&&e[r]!==void 0&&(n[r]=e[r])}const Ji=new le(null),us=new le(null),eo=new le(null,1,1),ls=new le(null),ln=1,cs=2,Sr=4,Ub=8;class ce extends We{constructor(e={}){var t,r;super(),this.uid=ae("renderable"),this._updateFlags=15,this.renderGroup=null,this.parentRenderGroup=null,this.parentRenderGroupIndex=0,this.didChange=!1,this.didViewUpdate=!1,this.relativeRenderGroupDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.parentRenderLayer=null,this.updateTick=-1,this.localTransform=new H,this.relativeGroupTransform=new H,this.groupTransform=this.relativeGroupTransform,this.destroyed=!1,this._position=new le(this,0,0),this._scale=eo,this._pivot=us,this._origin=ls,this._skew=Ji,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=16777215,this.localAlpha=1,this.groupAlpha=1,this.groupColor=16777215,this.groupColorAlpha=4294967295,this.localBlendMode="inherit",this.groupBlendMode="normal",this.localDisplayStatus=7,this.globalDisplayStatus=7,this._didContainerChangeTick=0,this._didViewChangeTick=0,this._didLocalTransformChangeId=-1,this.effects=[],as(this,e,{children:!0,parent:!0,effects:!0}),(t=e.children)==null||t.forEach(s=>this.addChild(s)),(r=e.parent)==null||r.addChild(this)}static mixin(e){L("8.8.0","Container.mixin is deprecated, please use extensions.mixin instead."),$.mixin(ce,e)}set _didChangeId(e){this._didViewChangeTick=e>>12&4095,this._didContainerChangeTick=e&4095}get _didChangeId(){return this._didContainerChangeTick&4095|(this._didViewChangeTick&4095)<<12}addChild(...e){if(this.allowChildren||L(j,"addChild: Only Containers will be allowed to add children in v8.0.0"),e.length>1){for(let s=0;s<e.length;s++)this.addChild(e[s]);return e[0]}const t=e[0],r=this.renderGroup||this.parentRenderGroup;return t.parent===this?(this.children.splice(this.children.indexOf(t),1),this.children.push(t),r&&(r.structureDidChange=!0),t):(t.parent&&t.parent.removeChild(t),this.children.push(t),this.sortableChildren&&(this.sortDirty=!0),t.parent=this,t.didChange=!0,t._updateFlags=15,r&&r.addChild(t),this.emit("childAdded",t,this,this.children.length-1),t.emit("added",this),this._didViewChangeTick++,t._zIndex!==0&&t.depthOfChildModified(),t)}removeChild(...e){if(e.length>1){for(let s=0;s<e.length;s++)this.removeChild(e[s]);return e[0]}const t=e[0],r=this.children.indexOf(t);return r>-1&&(this._didViewChangeTick++,this.children.splice(r,1),this.renderGroup?this.renderGroup.removeChild(t):this.parentRenderGroup&&this.parentRenderGroup.removeChild(t),t.parentRenderLayer&&t.parentRenderLayer.detach(t),t.parent=null,this.emit("childRemoved",t,this,r),t.emit("removed",this)),t}_onUpdate(e){e&&e===this._skew&&this._updateSkew(),this._didContainerChangeTick++,!this.didChange&&(this.didChange=!0,this.parentRenderGroup&&this.parentRenderGroup.onChildUpdate(this))}set isRenderGroup(e){!!this.renderGroup!==e&&(e?this.enableRenderGroup():this.disableRenderGroup())}get isRenderGroup(){return!!this.renderGroup}enableRenderGroup(){if(this.renderGroup)return;const e=this.parentRenderGroup;e==null||e.removeChild(this),this.renderGroup=Te.get(os,this),this.groupTransform=H.IDENTITY,e==null||e.addChild(this),this._updateIsSimple()}disableRenderGroup(){if(!this.renderGroup)return;const e=this.parentRenderGroup;e==null||e.removeChild(this),Te.return(this.renderGroup),this.renderGroup=null,this.groupTransform=this.relativeGroupTransform,e==null||e.addChild(this),this._updateIsSimple()}_updateIsSimple(){this.isSimple=!this.renderGroup&&this.effects.length===0}get worldTransform(){return this._worldTransform||(this._worldTransform=new H),this.renderGroup?this._worldTransform.copyFrom(this.renderGroup.worldTransform):this.parentRenderGroup&&this._worldTransform.appendFrom(this.relativeGroupTransform,this.parentRenderGroup.worldTransform),this._worldTransform}get x(){return this._position.x}set x(e){this._position.x=e}get y(){return this._position.y}set y(e){this._position.y=e}get position(){return this._position}set position(e){this._position.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this._skew))}get angle(){return this.rotation*uc}set angle(e){this.rotation=e*lc}get pivot(){return this._pivot===us&&(this._pivot=new le(this,0,0)),this._pivot}set pivot(e){this._pivot===us&&(this._pivot=new le(this,0,0),this._origin!==ls&&X("Setting both a pivot and origin on a Container is not recommended. This can lead to unexpected behavior if not handled carefully.")),typeof e=="number"?this._pivot.set(e):this._pivot.copyFrom(e)}get skew(){return this._skew===Ji&&(this._skew=new le(this,0,0)),this._skew}set skew(e){this._skew===Ji&&(this._skew=new le(this,0,0)),this._skew.copyFrom(e)}get scale(){return this._scale===eo&&(this._scale=new le(this,1,1)),this._scale}set scale(e){this._scale===eo&&(this._scale=new le(this,0,0)),typeof e=="string"&&(e=parseFloat(e)),typeof e=="number"?this._scale.set(e):this._scale.copyFrom(e)}get origin(){return this._origin===ls&&(this._origin=new le(this,0,0)),this._origin}set origin(e){this._origin===ls&&(this._origin=new le(this,0,0),this._pivot!==us&&X("Setting both a pivot and origin on a Container is not recommended. This can lead to unexpected behavior if not handled carefully.")),typeof e=="number"?this._origin.set(e):this._origin.copyFrom(e)}get width(){return Math.abs(this.scale.x*this.getLocalBounds().width)}set width(e){const t=this.getLocalBounds().width;this._setWidth(e,t)}get height(){return Math.abs(this.scale.y*this.getLocalBounds().height)}set height(e){const t=this.getLocalBounds().height;this._setHeight(e,t)}getSize(e){e||(e={});const t=this.getLocalBounds();return e.width=Math.abs(this.scale.x*t.width),e.height=Math.abs(this.scale.y*t.height),e}setSize(e,t){const r=this.getLocalBounds();typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,r.width),t!==void 0&&this._setHeight(t,r.height)}_updateSkew(){const e=this._rotation,t=this._skew;this._cx=Math.cos(e+t._y),this._sx=Math.sin(e+t._y),this._cy=-Math.sin(e-t._x),this._sy=Math.cos(e-t._x)}updateTransform(e){return this.position.set(typeof e.x=="number"?e.x:this.position.x,typeof e.y=="number"?e.y:this.position.y),this.scale.set(typeof e.scaleX=="number"?e.scaleX||1:this.scale.x,typeof e.scaleY=="number"?e.scaleY||1:this.scale.y),this.rotation=typeof e.rotation=="number"?e.rotation:this.rotation,this.skew.set(typeof e.skewX=="number"?e.skewX:this.skew.x,typeof e.skewY=="number"?e.skewY:this.skew.y),this.pivot.set(typeof e.pivotX=="number"?e.pivotX:this.pivot.x,typeof e.pivotY=="number"?e.pivotY:this.pivot.y),this.origin.set(typeof e.originX=="number"?e.originX:this.origin.x,typeof e.originY=="number"?e.originY:this.origin.y),this}setFromMatrix(e){e.decompose(this)}updateLocalTransform(){const e=this._didContainerChangeTick;if(this._didLocalTransformChangeId===e)return;this._didLocalTransformChangeId=e;const t=this.localTransform,r=this._scale,s=this._pivot,i=this._origin,o=this._position,a=r._x,u=r._y,l=s._x,c=s._y,h=-i._x,d=-i._y;t.a=this._cx*a,t.b=this._sx*a,t.c=this._cy*u,t.d=this._sy*u,t.tx=o._x-(l*t.a+c*t.c)+(h*t.a+d*t.c)-h,t.ty=o._y-(l*t.b+c*t.d)+(h*t.b+d*t.d)-d}set alpha(e){e!==this.localAlpha&&(this.localAlpha=e,this._updateFlags|=ln,this._onUpdate())}get alpha(){return this.localAlpha}set tint(e){const r=ee.shared.setValue(e??16777215).toBgrNumber();r!==this.localColor&&(this.localColor=r,this._updateFlags|=ln,this._onUpdate())}get tint(){return vr(this.localColor)}set blendMode(e){this.localBlendMode!==e&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=cs,this.localBlendMode=e,this._onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localDisplayStatus&2)}set visible(e){const t=e?2:0;(this.localDisplayStatus&2)!==t&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=Sr,this.localDisplayStatus^=2,this._onUpdate())}get culled(){return!(this.localDisplayStatus&4)}set culled(e){const t=e?0:4;(this.localDisplayStatus&4)!==t&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=Sr,this.localDisplayStatus^=4,this._onUpdate())}get renderable(){return!!(this.localDisplayStatus&1)}set renderable(e){const t=e?1:0;(this.localDisplayStatus&1)!==t&&(this._updateFlags|=Sr,this.localDisplayStatus^=1,this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._onUpdate())}get isRenderable(){return this.localDisplayStatus===7&&this.groupAlpha>0}destroy(e=!1){var s;if(this.destroyed)return;this.destroyed=!0;let t;if(this.children.length&&(t=this.removeChildren(0,this.children.length)),this.removeFromParent(),this.parent=null,this._maskEffect=null,this._filterEffect=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._origin=null,this._skew=null,this.emit("destroyed",this),this.removeAllListeners(),(typeof e=="boolean"?e:e==null?void 0:e.children)&&t)for(let i=0;i<t.length;++i)t[i].destroy(e);(s=this.renderGroup)==null||s.destroy(),this.renderGroup=null}}$.mixin(ce,Fc,kc,$c,Wc,Vc,Oc,Gc,Xc,Pc,Mc,zc,Uc);class yt extends ce{constructor(e){super(e),this.canBundle=!0,this.allowChildren=!1,this._roundPixels=0,this._lastUsed=-1,this._gpuData=Object.create(null),this.autoGarbageCollect=!0,this._gcLastUsed=-1,this._bounds=new Be(0,1,0,0),this._boundsDirty=!0,this.autoGarbageCollect=e.autoGarbageCollect??!0}get bounds(){return this._boundsDirty?(this.updateBounds(),this._boundsDirty=!1,this._bounds):this._bounds}get roundPixels(){return!!this._roundPixels}set roundPixels(e){this._roundPixels=e?1:0}containsPoint(e){const t=this.bounds,{x:r,y:s}=e;return r>=t.minX&&r<=t.maxX&&s>=t.minY&&s<=t.maxY}onViewUpdate(){if(this._didViewChangeTick++,this._boundsDirty=!0,this.didViewUpdate)return;this.didViewUpdate=!0;const e=this.renderGroup||this.parentRenderGroup;e&&e.onChildViewUpdate(this)}unload(){var e;this.emit("unload",this);for(const t in this._gpuData)(e=this._gpuData[t])==null||e.destroy();this._gpuData=Object.create(null),this.onViewUpdate()}destroy(e){this.unload(),super.destroy(e),this._bounds=null}collectRenderablesSimple(e,t,r){const{renderPipes:s}=t;s.blendMode.pushBlendMode(this,this.groupBlendMode,e),s[this.renderPipeId].addRenderable(this,e),this.didViewUpdate=!1;const o=this.children,a=o.length;for(let u=0;u<a;u++)o[u].collectRenderables(e,t,r);s.blendMode.popBlendMode(e)}}class dt extends yt{constructor(e=k.EMPTY){e instanceof k&&(e={texture:e});const{texture:t=k.EMPTY,anchor:r,roundPixels:s,width:i,height:o,...a}=e;super({label:"Sprite",...a}),this.renderPipeId="sprite",this.batched=!0,this._visualBounds={minX:0,maxX:1,minY:0,maxY:0},this._anchor=new le({_onUpdate:()=>{this.onViewUpdate()}}),r?this.anchor=r:t.defaultAnchor&&(this.anchor=t.defaultAnchor),this.texture=t,this.allowChildren=!1,this.roundPixels=s??!1,i!==void 0&&(this.width=i),o!==void 0&&(this.height=o)}static from(e,t=!1){return e instanceof k?new dt(e):new dt(k.from(e,t))}set texture(e){e||(e=k.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this._width&&this._setWidth(this._width,this._texture.orig.width),this._height&&this._setHeight(this._height,this._texture.orig.height),this.onViewUpdate())}get texture(){return this._texture}get visualBounds(){return Hi(this._visualBounds,this._anchor,this._texture),this._visualBounds}get sourceBounds(){return L("8.6.1","Sprite.sourceBounds is deprecated, use visualBounds instead."),this.visualBounds}updateBounds(){const e=this._anchor,t=this._texture,r=this._bounds,{width:s,height:i}=t.orig;r.minX=-e._x*s,r.maxX=r.minX+s,r.minY=-e._y*i,r.maxY=r.minY+i}destroy(e=!1){if(super.destroy(e),typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(r)}this._texture=null,this._visualBounds=null,this._bounds=null,this._anchor=null}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get width(){return Math.abs(this.scale.x)*this._texture.orig.width}set width(e){this._setWidth(e,this._texture.orig.width),this._width=e}get height(){return Math.abs(this.scale.y)*this._texture.orig.height}set height(e){this._setHeight(e,this._texture.orig.height),this._height=e}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this._texture.orig.width,e.height=Math.abs(this.scale.y)*this._texture.orig.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this._texture.orig.width),t!==void 0&&this._setHeight(t,this._texture.orig.height)}}const Ib=new Be;function hs(n,e,t){const r=Ib;n.measurable=!0,an(n,t,r),e.addBoundsMask(r),n.measurable=!1}function ds(n,e,t){const r=bt.get();n.measurable=!0;const s=Oe.get().identity(),i=qc(n,t,s);is(n,r,i),n.measurable=!1,e.addBoundsMask(r),Oe.return(s),bt.return(r)}function qc(n,e,t){return n?(n!==e&&(qc(n.parent,e,t),n.updateLocalTransform(),t.append(n.localTransform)),t):(X("Mask bounds, renderable is not inside the root container"),t)}class to{constructor(e){this.priority=0,this.inverse=!1,this.pipe="alphaMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof dt),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask!==null&&(this.mask.measurable=!0,this.mask=null)}addBounds(e,t){this.inverse||hs(this.mask,e,t)}addLocalBounds(e,t){ds(this.mask,e,t)}containsPoint(e,t){const r=this.mask;return t(r,e)}destroy(){this.reset()}static test(e){return e instanceof dt}}to.extension=T.MaskEffect;class ro{constructor(e){this.priority=0,this.pipe="colorMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}ro.extension=T.MaskEffect;class no{constructor(e){this.priority=0,this.pipe="stencilMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask!==null&&(this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null)}addBounds(e,t){hs(this.mask,e,t)}addLocalBounds(e,t){ds(this.mask,e,t)}containsPoint(e,t){const r=this.mask;return t(r,e)}destroy(){this.reset()}static test(e){return e instanceof ce}}no.extension=T.MaskEffect;const jc={createCanvas:(n,e)=>{const t=document.createElement("canvas");return t.width=n,t.height=e,t},createImage:()=>new Image,getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>document.baseURI??window.location.href,getFontFaceSet:()=>document.fonts,fetch:(n,e)=>fetch(n,e),parseXML:n=>new DOMParser().parseFromString(n,"text/xml")};let Kc=jc;const Q={get(){return Kc},set(n){Kc=n}};class vt extends fe{constructor(e){e.resource||(e.resource=Q.get().createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),super(e),this.uploadMethodId="image",this.autoDensity=e.autoDensity,this.resizeCanvas(),this.transparent=!!e.transparent}resizeCanvas(){this.autoDensity&&"style"in this.resource&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),(this.resource.width!==this.pixelWidth||this.resource.height!==this.pixelHeight)&&(this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight)}resize(e=this.width,t=this.height,r=this._resolution){const s=super.resize(e,t,r);return s&&this.resizeCanvas(),s}static test(e){return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement||globalThis.OffscreenCanvas&&e instanceof OffscreenCanvas}get context2D(){return this._context2D||(this._context2D=this.resource.getContext("2d"))}}vt.extension=T.TextureSource;class Lt extends fe{constructor(e){super(e),this.uploadMethodId="image",this.autoGarbageCollect=!0}static test(e){return globalThis.HTMLImageElement&&e instanceof HTMLImageElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||globalThis.VideoFrame&&e instanceof VideoFrame}}Lt.extension=T.TextureSource;var St=(n=>(n[n.INTERACTION=50]="INTERACTION",n[n.HIGH=25]="HIGH",n[n.NORMAL=0]="NORMAL",n[n.LOW=-25]="LOW",n[n.UTILITY=-50]="UTILITY",n))(St||{});class fs{constructor(e,t=null,r=0,s=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=e,this._context=t,this.priority=r,this._once=s}match(e,t=null){return this._fn===e&&this._context===t}emit(e){this._fn&&(this._context?this._fn.call(this._context,e):this._fn(e));const t=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),t}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const t=this.next;return this.next=e?null:t,this.previous=null,t}}const Zc=class ot{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new fs(null,null,1/0),this.deltaMS=1/ot.targetFPMS,this.elapsedMS=1/ot.targetFPMS,this._tick=e=>{this._requestId=null,this.started&&(this.update(e),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(e,t,r=St.NORMAL){return this._addListener(new fs(e,t,r))}addOnce(e,t,r=St.NORMAL){return this._addListener(new fs(e,t,r,!0))}_addListener(e){let t=this._head.next,r=this._head;if(!t)e.connect(r);else{for(;t;){if(e.priority>t.priority){e.connect(r);break}r=t,t=t.next}e.previous||e.connect(r)}return this._startIfPossible(),this}remove(e,t){let r=this._head.next;for(;r;)r.match(e,t)?r=r.destroy():r=r.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let e=0,t=this._head;for(;t=t.next;)e++;return e}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let e=this._head.next;for(;e;)e=e.destroy(!0);this._head.destroy(),this._head=null}}update(e=performance.now()){let t;if(e>this.lastTime){if(t=this.elapsedMS=e-this.lastTime,t>this._maxElapsedMS&&(t=this._maxElapsedMS),t*=this.speed,this._minElapsedMS){const i=e-this._lastFrame|0;if(i<this._minElapsedMS)return;this._lastFrame=e-i%this._minElapsedMS}this.deltaMS=t,this.deltaTime=this.deltaMS*ot.targetFPMS;const r=this._head;let s=r.next;for(;s;)s=s.emit(this);r.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=e}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(e){const t=Math.min(this.maxFPS,e),r=Math.min(Math.max(0,t)/1e3,ot.targetFPMS);this._maxElapsedMS=1/r}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(e){if(e===0)this._minElapsedMS=0;else{const t=Math.max(this.minFPS,e);this._minElapsedMS=1/(t/1e3)}}static get shared(){if(!ot._shared){const e=ot._shared=new ot;e.autoStart=!0,e._protected=!0}return ot._shared}static get system(){if(!ot._system){const e=ot._system=new ot;e.autoStart=!0,e._protected=!0}return ot._system}};Zc.targetFPMS=.06;let Re=Zc,so;async function io(){return so??(so=(async()=>{var o;const e=Q.get().createCanvas(1,1).getContext("webgl");if(!e)return"premultiply-alpha-on-upload";const t=await new Promise(a=>{const u=document.createElement("video");u.onloadeddata=()=>a(u),u.onerror=()=>a(null),u.autoplay=!1,u.crossOrigin="anonymous",u.preload="auto",u.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",u.load()});if(!t)return"premultiply-alpha-on-upload";const r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);const s=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);const i=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,i),e.deleteFramebuffer(s),e.deleteTexture(r),(o=e.getExtension("WEBGL_lose_context"))==null||o.loseContext(),i[0]<=i[3]?"premultiplied-alpha":"premultiply-alpha-on-upload"})()),so}const ps=class Rx extends fe{constructor(e){super(e),this.isReady=!1,this.uploadMethodId="video",e={...Rx.defaultOptions,...e},this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=e.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=e.autoPlay!==!1,this.alphaMode=e.alphaMode??"premultiply-alpha-on-upload",this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onCanPlayThrough=this._onCanPlayThrough.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),e.autoLoad!==!1&&this.load()}updateFrame(){if(!this.destroyed){if(this._updateFPS){const e=Re.shared.elapsedMS*this.resource.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-e)}(!this._updateFPS||this._msToNextUpdate<=0)&&(this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0),this.isValid&&this.update()}}_videoFrameRequestCallback(){this.updateFrame(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback)}get isValid(){return!!this.resource.videoWidth&&!!this.resource.videoHeight}async load(){if(this._load)return this._load;const e=this.resource,t=this.options;return(e.readyState===e.HAVE_ENOUGH_DATA||e.readyState===e.HAVE_FUTURE_DATA)&&e.width&&e.height&&(e.complete=!0),e.addEventListener("play",this._onPlayStart),e.addEventListener("pause",this._onPlayStop),e.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._mediaReady():(t.preload||e.addEventListener("canplay",this._onCanPlay),e.addEventListener("canplaythrough",this._onCanPlayThrough),e.addEventListener("error",this._onError,!0)),this.alphaMode=await io(),this._load=new Promise((r,s)=>{this.isValid?r(this):(this._resolve=r,this._reject=s,t.preloadTimeoutMs!==void 0&&(this._preloadTimeout=setTimeout(()=>{this._onError(new ErrorEvent(`Preload exceeded timeout of ${t.preloadTimeoutMs}ms`))})),e.load())}),this._load}_onError(e){this.resource.removeEventListener("error",this._onError,!0),this.emit("error",e),this._reject&&(this._reject(e),this._reject=null,this._resolve=null)}_isSourcePlaying(){const e=this.resource;return!e.paused&&!e.ended}_isSourceReady(){return this.resource.readyState>2}_onPlayStart(){this.isValid||this._mediaReady(),this._configureAutoUpdate()}_onPlayStop(){this._configureAutoUpdate()}_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0)}_onCanPlay(){this.resource.removeEventListener("canplay",this._onCanPlay),this._mediaReady()}_onCanPlayThrough(){this.resource.removeEventListener("canplaythrough",this._onCanPlay),this._preloadTimeout&&(clearTimeout(this._preloadTimeout),this._preloadTimeout=void 0),this._mediaReady()}_mediaReady(){const e=this.resource;this.isValid&&(this.isReady=!0,this.resize(e.videoWidth,e.videoHeight)),this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0,this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.resource.play()}destroy(){this._configureAutoUpdate();const e=this.resource;e&&(e.removeEventListener("play",this._onPlayStart),e.removeEventListener("pause",this._onPlayStop),e.removeEventListener("seeked",this._onSeeked),e.removeEventListener("canplay",this._onCanPlay),e.removeEventListener("canplaythrough",this._onCanPlayThrough),e.removeEventListener("error",this._onError,!0),e.pause(),e.src="",e.load()),super.destroy()}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,this._configureAutoUpdate())}get updateFPS(){return this._updateFPS}set updateFPS(e){e!==this._updateFPS&&(this._updateFPS=e,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.resource.requestVideoFrameCallback?(this._isConnectedToTicker&&(Re.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),this._videoFrameRequestCallbackHandle===null&&(this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(Re.shared.add(this.updateFrame,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(Re.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}static test(e){return globalThis.HTMLVideoElement&&e instanceof HTMLVideoElement}};ps.extension=T.TextureSource,ps.defaultOptions={...fe.defaultOptions,autoLoad:!0,autoPlay:!0,updateFPS:0,crossorigin:!0,loop:!1,muted:!0,playsinline:!0,preload:!1},ps.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};let Tr=ps;const ut=(n,e,t=!1)=>(Array.isArray(n)||(n=[n]),e?n.map(r=>typeof r=="string"||t?e(r):r):n);class Ob{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){const t=this._cache.get(e);return t||X(`[Assets] Asset id ${e} was not found in the Cache`),t}set(e,t){const r=ut(e);let s;for(let u=0;u<this.parsers.length;u++){const l=this.parsers[u];if(l.test(t)){s=l.getCacheableAssets(r,t);break}}const i=new Map(Object.entries(s||{}));s||r.forEach(u=>{i.set(u,t)});const o=[...i.keys()],a={cacheKeys:o,keys:r};r.forEach(u=>{this._cacheMap.set(u,a)}),o.forEach(u=>{const l=s?s[u]:t;this._cache.has(u)&&this._cache.get(u)!==l&&X("[Cache] already has key:",u),this._cache.set(u,i.get(u))})}remove(e){if(!this._cacheMap.has(e)){X(`[Assets] Asset id ${e} was not found in the Cache`);return}const t=this._cacheMap.get(e);t.cacheKeys.forEach(s=>{this._cache.delete(s)}),t.keys.forEach(s=>{this._cacheMap.delete(s)})}get parsers(){return this._parsers}}const se=new Ob,oo=[];$.handleByList(T.TextureSource,oo);function Gb(n={}){return ao(n)}function ao(n={}){const e=n&&n.resource,t=e?n.resource:n,r=e?n:{resource:n};for(let s=0;s<oo.length;s++){const i=oo[s];if(i.test(t))return new i(r)}throw new Error(`Could not find a source type for resource: ${r.resource}`)}function Qc(n={},e=!1){const t=n&&n.resource,r=t?n.resource:n,s=t?n:{resource:n};if(!e&&se.has(r))return se.get(r);const i=new k({source:ao(s)});return i.on("destroy",()=>{se.has(r)&&se.remove(r)}),e||se.set(r,i),i}function Jc(n,e=!1){return typeof n=="string"?se.get(n):n instanceof fe?new k({source:n}):Qc(n,e)}k.from=Jc,fe.from=ao,$.add(to,ro,no,Tr,Lt,vt,ts);var rt=(n=>(n[n.Low=0]="Low",n[n.Normal=1]="Normal",n[n.High=2]="High",n))(rt||{});function ft(n){if(typeof n!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(n)}`)}function cn(n){return n.split("?")[0].split("#")[0]}function kb(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Lb(n,e,t){return n.replace(new RegExp(kb(e),"g"),t)}function Nb(n,e){let t="",r=0,s=-1,i=0,o=-1;for(let a=0;a<=n.length;++a){if(a<n.length)o=n.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(s===a-1||i===1))if(s!==a-1&&i===2){if(t.length<2||r!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){const u=t.lastIndexOf("/");if(u!==t.length-1){u===-1?(t="",r=0):(t=t.slice(0,u),r=t.length-1-t.lastIndexOf("/")),s=a,i=0;continue}}else if(t.length===2||t.length===1){t="",r=0,s=a,i=0;continue}}}else t.length>0?t+=`/${n.slice(s+1,a)}`:t=n.slice(s+1,a),r=a-s-1;s=a,i=0}else o===46&&i!==-1?++i:i=-1}return t}const Xe={toPosix(n){return Lb(n,"\\","/")},isUrl(n){return/^https?:/.test(this.toPosix(n))},isDataUrl(n){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(n)},isBlobUrl(n){return n.startsWith("blob:")},hasProtocol(n){return/^[^/:]+:/.test(this.toPosix(n))},getProtocol(n){ft(n),n=this.toPosix(n);const e=/^file:\/\/\//.exec(n);if(e)return e[0];const t=/^[^/:]+:\/{0,2}/.exec(n);return t?t[0]:""},toAbsolute(n,e,t){if(ft(n),this.isDataUrl(n)||this.isBlobUrl(n))return n;const r=cn(this.toPosix(e??Q.get().getBaseUrl())),s=cn(this.toPosix(t??this.rootname(r)));return n=this.toPosix(n),n.startsWith("/")?Xe.join(s,n.slice(1)):this.isAbsolute(n)?n:this.join(r,n)},normalize(n){if(ft(n),n.length===0)return".";if(this.isDataUrl(n)||this.isBlobUrl(n))return n;n=this.toPosix(n);let e="";const t=n.startsWith("/");this.hasProtocol(n)&&(e=this.rootname(n),n=n.slice(e.length));const r=n.endsWith("/");return n=Nb(n),n.length>0&&r&&(n+="/"),t?`/${n}`:e+n},isAbsolute(n){return ft(n),n=this.toPosix(n),this.hasProtocol(n)?!0:n.startsWith("/")},join(...n){if(n.length===0)return".";let e;for(let t=0;t<n.length;++t){const r=n[t];if(ft(r),r.length>0)if(e===void 0)e=r;else{const s=n[t-1]??"";this.joinExtensions.includes(this.extname(s).toLowerCase())?e+=`/../${r}`:e+=`/${r}`}}return e===void 0?".":this.normalize(e)},dirname(n){if(ft(n),n.length===0)return".";n=this.toPosix(n);let e=n.charCodeAt(0);const t=e===47;let r=-1,s=!0;const i=this.getProtocol(n),o=n;n=n.slice(i.length);for(let a=n.length-1;a>=1;--a)if(e=n.charCodeAt(a),e===47){if(!s){r=a;break}}else s=!1;return r===-1?t?"/":this.isUrl(o)?i+n:i:t&&r===1?"//":i+n.slice(0,r)},rootname(n){ft(n),n=this.toPosix(n);let e="";if(n.startsWith("/")?e="/":e=this.getProtocol(n),this.isUrl(n)){const t=n.indexOf("/",e.length);t!==-1?e=n.slice(0,t):e=n,e.endsWith("/")||(e+="/")}return e},basename(n,e){ft(n),e&&ft(e),n=cn(this.toPosix(n));let t=0,r=-1,s=!0,i;if(e!==void 0&&e.length>0&&e.length<=n.length){if(e.length===n.length&&e===n)return"";let o=e.length-1,a=-1;for(i=n.length-1;i>=0;--i){const u=n.charCodeAt(i);if(u===47){if(!s){t=i+1;break}}else a===-1&&(s=!1,a=i+1),o>=0&&(u===e.charCodeAt(o)?--o===-1&&(r=i):(o=-1,r=a))}return t===r?r=a:r===-1&&(r=n.length),n.slice(t,r)}for(i=n.length-1;i>=0;--i)if(n.charCodeAt(i)===47){if(!s){t=i+1;break}}else r===-1&&(s=!1,r=i+1);return r===-1?"":n.slice(t,r)},extname(n){ft(n),n=cn(this.toPosix(n));let e=-1,t=0,r=-1,s=!0,i=0;for(let o=n.length-1;o>=0;--o){const a=n.charCodeAt(o);if(a===47){if(!s){t=o+1;break}continue}r===-1&&(s=!1,r=o+1),a===46?e===-1?e=o:i!==1&&(i=1):e!==-1&&(i=-1)}return e===-1||r===-1||i===0||i===1&&e===r-1&&e===t+1?"":n.slice(e,r)},parse(n){ft(n);const e={root:"",dir:"",base:"",ext:"",name:""};if(n.length===0)return e;n=cn(this.toPosix(n));let t=n.charCodeAt(0);const r=this.isAbsolute(n);let s;e.root=this.rootname(n),r||this.hasProtocol(n)?s=1:s=0;let i=-1,o=0,a=-1,u=!0,l=n.length-1,c=0;for(;l>=s;--l){if(t=n.charCodeAt(l),t===47){if(!u){o=l+1;break}continue}a===-1&&(u=!1,a=l+1),t===46?i===-1?i=l:c!==1&&(c=1):i!==-1&&(c=-1)}return i===-1||a===-1||c===0||c===1&&i===a-1&&i===o+1?a!==-1&&(o===0&&r?e.base=e.name=n.slice(1,a):e.base=e.name=n.slice(o,a)):(o===0&&r?(e.name=n.slice(1,i),e.base=n.slice(1,a)):(e.name=n.slice(o,i),e.base=n.slice(o,a)),e.ext=n.slice(i,a)),e.dir=this.dirname(n),e},sep:"/",delimiter:":",joinExtensions:[".html"]};function eh(n,e,t,r,s){const i=e[t];for(let o=0;o<i.length;o++){const a=i[o];t<e.length-1?eh(n.replace(r[t],a),e,t+1,r,s):s.push(n.replace(r[t],a))}}function th(n){const e=/\{(.*?)\}/g,t=n.match(e),r=[];if(t){const s=[];t.forEach(i=>{const o=i.substring(1,i.length-1).split(",");s.push(o)}),eh(n,s,0,t,r)}else r.push(n);return r}const hn=n=>!Array.isArray(n);class Nt{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,t)=>`${e}${this._bundleIdConnector}${t}`,extractAssetIdFromBundle:(e,t)=>t.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){if(this._bundleIdConnector=e.connector??this._bundleIdConnector,this._createBundleAssetId=e.createBundleAssetId??this._createBundleAssetId,this._extractAssetIdFromBundle=e.extractAssetIdFromBundle??this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const t=e;this._defaultSearchParams=Object.keys(t).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(t[r])}`).join("&")}}getAlias(e){const{alias:t,src:r}=e;return ut(t||r,i=>typeof i=="string"?i:Array.isArray(i)?i.map(o=>(o==null?void 0:o.src)??o):i!=null&&i.src?i.src:i,!0)}addManifest(e){this._manifest&&X("[Resolver] Manifest already exists, this will be overwritten"),this._manifest=e,e.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}addBundle(e,t){const r=[];let s=t;Array.isArray(t)||(s=Object.entries(t).map(([i,o])=>typeof o=="string"||Array.isArray(o)?{alias:i,src:o}:{alias:i,...o})),s.forEach(i=>{const o=i.src,a=i.alias;let u;if(typeof a=="string"){const l=this._createBundleAssetId(e,a);r.push(l),u=[a,l]}else{const l=a.map(c=>this._createBundleAssetId(e,c));r.push(...l),u=[...a,...l]}this.add({...i,alias:u,src:o})}),this._bundles[e]=r}add(e){const t=[];Array.isArray(e)?t.push(...e):t.push(e);let r;r=i=>{this.hasKey(i)&&X(`[Resolver] already has key: ${i} overwriting`)},ut(t).forEach(i=>{const{src:o}=i;let{data:a,format:u,loadParser:l,parser:c}=i;const h=ut(o).map(x=>typeof x=="string"?th(x):Array.isArray(x)?x:[x]),d=this.getAlias(i);Array.isArray(d)?d.forEach(r):r(d);const f=[],g=x=>{const p=this._parsers.find(b=>b.test(x));return{...p==null?void 0:p.parse(x),src:x}};h.forEach(x=>{x.forEach(p=>{let b={};if(typeof p!="object"?b=g(p):(a=p.data??a,u=p.format??u,(p.loadParser||p.parser)&&(l=p.loadParser??l,c=p.parser??c),b={...g(p.src),...p}),!d)throw new Error(`[Resolver] alias is undefined for this asset: ${b.src}`);b=this._buildResolvedAsset(b,{aliases:d,data:a,format:u,loadParser:l,parser:c,progressSize:i.progressSize}),f.push(b)})}),d.forEach(x=>{this._assetMap[x]=f})})}resolveBundle(e){const t=hn(e);e=ut(e);const r={};return e.forEach(s=>{const i=this._bundles[s];if(i){const o=this.resolve(i),a={};for(const u in o){const l=o[u];a[this._extractAssetIdFromBundle(s,u)]=l}r[s]=a}}),t?r[e[0]]:r}resolveUrl(e){const t=this.resolve(e);if(typeof e!="string"){const r={};for(const s in t)r[s]=t[s].src;return r}return t.src}resolve(e){const t=hn(e);e=ut(e);const r={};return e.forEach(s=>{if(!this._resolverHash[s])if(this._assetMap[s]){let i=this._assetMap[s];const o=this._getPreferredOrder(i);o==null||o.priority.forEach(a=>{o.params[a].forEach(u=>{const l=i.filter(c=>c[a]?c[a]===u:!1);l.length&&(i=l)})}),this._resolverHash[s]=i[0]}else this._resolverHash[s]=this._buildResolvedAsset({alias:[s],src:s},{});r[s]=this._resolverHash[s]}),t?r[e[0]]:r}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let t=0;t<e.length;t++){const r=e[t],s=this._preferredOrder.find(i=>i.params.format.includes(r.format));if(s)return s}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const t=/\?/.test(e)?"&":"?";return`${e}${t}${this._defaultSearchParams}`}_buildResolvedAsset(e,t){const{aliases:r,data:s,loadParser:i,parser:o,format:a,progressSize:u}=t;return(this._basePath||this._rootPath)&&(e.src=Xe.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=r??e.alias??[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data={...s||{},...e.data},e.loadParser=i??e.loadParser,e.parser=o??e.parser,e.format=a??e.format??rh(e.src),u!==void 0&&(e.progressSize=u),e}}Nt.RETINA_PREFIX=/@([0-9\.]+)x/;function rh(n){return n.split(".").pop().split("?").shift().split("#").shift()}const ms=(n,e)=>{const t=e.split("?")[1];return t&&(n+=`?${t}`),n},nh=class Qn{constructor(e,t){this.linkedSheets=[];let r=e;(e==null?void 0:e.source)instanceof fe&&(r={texture:e,data:t});const{texture:s,data:i,cachePrefix:o=""}=r;this.cachePrefix=o,this._texture=s instanceof k?s:null,this.textureSource=s.source,this.textures={},this.animations={},this.data=i;const a=parseFloat(i.meta.scale);a?(this.resolution=a,s.source.resolution=this.resolution):this.resolution=s.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(e=>{this._callback=e,this._batchIndex=0,this._frameKeys.length<=Qn.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(e){let t=e;const r=Qn.BATCH_SIZE;for(;t-e<r&&t<this._frameKeys.length;){const s=this._frameKeys[t],i=this._frames[s],o=i.frame;if(o){let a=null,u=null;const l=i.trimmed!==!1&&i.sourceSize?i.sourceSize:i.frame,c=new ne(0,0,Math.floor(l.w)/this.resolution,Math.floor(l.h)/this.resolution);i.rotated?a=new ne(Math.floor(o.x)/this.resolution,Math.floor(o.y)/this.resolution,Math.floor(o.h)/this.resolution,Math.floor(o.w)/this.resolution):a=new ne(Math.floor(o.x)/this.resolution,Math.floor(o.y)/this.resolution,Math.floor(o.w)/this.resolution,Math.floor(o.h)/this.resolution),i.trimmed!==!1&&i.spriteSourceSize&&(u=new ne(Math.floor(i.spriteSourceSize.x)/this.resolution,Math.floor(i.spriteSourceSize.y)/this.resolution,Math.floor(o.w)/this.resolution,Math.floor(o.h)/this.resolution)),this.textures[s]=new k({source:this.textureSource,frame:a,orig:c,trim:u,rotate:i.rotated?2:0,defaultAnchor:i.anchor,defaultBorders:i.borders,label:s.toString()})}t++}}_processAnimations(){const e=this.data.animations||{};for(const t in e){this.animations[t]=[];for(let r=0;r<e[t].length;r++){const s=e[t][r];this.animations[t].push(this.textures[s])}}}_parseComplete(){const e=this._callback;this._callback=null,this._batchIndex=0,e.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*Qn.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*Qn.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(e=!1){var t;for(const r in this.textures)this.textures[r].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,e&&((t=this._texture)==null||t.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};nh.BATCH_SIZE=1e3;let uo=nh;const zb=["jpg","png","jpeg","avif","webp","basis","etc2","bc7","bc6h","bc5","bc4","bc3","bc2","bc1","eac","astc"];function sh(n,e,t){const r={};if(n.forEach(s=>{r[s]=e}),Object.keys(e.textures).forEach(s=>{r[`${e.cachePrefix}${s}`]=e.textures[s]}),!t){const s=Xe.dirname(n[0]);e.linkedSheets.forEach((i,o)=>{const a=sh([`${s}/${e.data.meta.related_multi_packs[o]}`],i,!0);Object.assign(r,a)})}return r}const ih={extension:T.Asset,cache:{test:n=>n instanceof uo,getCacheableAssets:(n,e)=>sh(n,e,!1)},resolver:{extension:{type:T.ResolveParser,name:"resolveSpritesheet"},test:n=>{const t=n.split("?")[0].split("."),r=t.pop(),s=t.pop();return r==="json"&&zb.includes(s)},parse:n=>{var t;const e=n.split(".");return{resolution:parseFloat(((t=Nt.RETINA_PREFIX.exec(n))==null?void 0:t[1])??"1"),format:e[e.length-2],src:n}}},loader:{name:"spritesheetLoader",id:"spritesheet",extension:{type:T.LoadParser,priority:rt.Normal,name:"spritesheetLoader"},async testParse(n,e){return Xe.extname(e.src).toLowerCase()===".json"&&!!n.frames},async parse(n,e,t){var h,d;const{texture:r,imageFilename:s,textureOptions:i,cachePrefix:o}=(e==null?void 0:e.data)??{};let a=Xe.dirname(e.src);a&&a.lastIndexOf("/")!==a.length-1&&(a+="/");let u;if(r instanceof k)u=r;else{const f=ms(a+(s??n.meta.image),e.src);u=(await t.load([{src:f,data:i}]))[f]}const l=new uo({texture:u.source,data:n,cachePrefix:o});await l.parse();const c=(h=n==null?void 0:n.meta)==null?void 0:h.related_multi_packs;if(Array.isArray(c)){const f=[];for(const x of c){if(typeof x!="string")continue;let p=a+x;(d=e.data)!=null&&d.ignoreMultiPack||(p=ms(p,e.src),f.push(t.load({src:p,data:{textureOptions:i,ignoreMultiPack:!0}})))}const g=await Promise.all(f);l.linkedSheets=g,g.forEach(x=>{x.linkedSheets=[l].concat(l.linkedSheets.filter(p=>p!==x))})}return l},async unload(n,e,t){await t.unload(n.textureSource._sourceOrigin),n.destroy(!1)}}};$.add(ih);class lo{constructor(e){this._lastTransform="",this._observer=null,this._tickerAttached=!1,this.updateTranslation=()=>{if(!this._canvas)return;const t=this._canvas.getBoundingClientRect(),r=this._canvas.width,s=this._canvas.height,i=t.width/r*this._renderer.resolution,o=t.height/s*this._renderer.resolution,a=t.left,u=t.top,l=`translate(${a}px, ${u}px) scale(${i}, ${o})`;l!==this._lastTransform&&(this._domElement.style.transform=l,this._lastTransform=l)},this._domElement=e.domElement,this._renderer=e.renderer,!(globalThis.OffscreenCanvas&&this._renderer.canvas instanceof OffscreenCanvas)&&(this._canvas=this._renderer.canvas,this._attachObserver())}get canvas(){return this._canvas}ensureAttached(){!this._domElement.parentNode&&this._canvas.parentNode&&(this._canvas.parentNode.appendChild(this._domElement),this.updateTranslation())}_attachObserver(){"ResizeObserver"in globalThis?(this._observer&&(this._observer.disconnect(),this._observer=null),this._observer=new ResizeObserver(e=>{for(const t of e){if(t.target!==this._canvas)continue;const r=this.canvas.width,s=this.canvas.height,i=t.contentRect.width/r*this._renderer.resolution,o=t.contentRect.height/s*this._renderer.resolution;(this._lastScaleX!==i||this._lastScaleY!==o)&&(this.updateTranslation(),this._lastScaleX=i,this._lastScaleY=o)}}),this._observer.observe(this._canvas)):this._tickerAttached||Re.shared.add(this.updateTranslation,this,St.HIGH)}destroy(){this._observer?(this._observer.disconnect(),this._observer=null):this._tickerAttached&&Re.shared.remove(this.updateTranslation),this._domElement=null,this._renderer=null,this._canvas=null,this._tickerAttached=!1,this._lastTransform="",this._lastScaleX=null,this._lastScaleY=null}}class Cr{constructor(e){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=Cr.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new ie,this.page=new ie,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=e}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(e,t,r){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(e,t,r,s,i){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}var co=/iPhone/i,oh=/iPod/i,ah=/iPad/i,uh=/\biOS-universal(?:.+)Mac\b/i,ho=/\bAndroid(?:.+)Mobile\b/i,lh=/Android/i,Ar=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,gs=/Silk/i,Dt=/Windows Phone/i,ch=/\bWindows(?:.+)ARM\b/i,hh=/BlackBerry/i,dh=/BB10/i,fh=/Opera Mini/i,ph=/\b(CriOS|Chrome)(?:.+)Mobile/i,mh=/Mobile(?:.+)Firefox\b/i,gh=function(n){return typeof n<"u"&&n.platform==="MacIntel"&&typeof n.maxTouchPoints=="number"&&n.maxTouchPoints>1&&typeof MSStream>"u"};function Hb(n){return function(e){return e.test(n)}}function _h(n){var e={userAgent:"",platform:"",maxTouchPoints:0};!n&&typeof navigator<"u"?e={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0}:typeof n=="string"?e.userAgent=n:n&&n.userAgent&&(e={userAgent:n.userAgent,platform:n.platform,maxTouchPoints:n.maxTouchPoints||0});var t=e.userAgent,r=t.split("[FBAN");typeof r[1]<"u"&&(t=r[0]),r=t.split("Twitter"),typeof r[1]<"u"&&(t=r[0]);var s=Hb(t),i={apple:{phone:s(co)&&!s(Dt),ipod:s(oh),tablet:!s(co)&&(s(ah)||gh(e))&&!s(Dt),universal:s(uh),device:(s(co)||s(oh)||s(ah)||s(uh)||gh(e))&&!s(Dt)},amazon:{phone:s(Ar),tablet:!s(Ar)&&s(gs),device:s(Ar)||s(gs)},android:{phone:!s(Dt)&&s(Ar)||!s(Dt)&&s(ho),tablet:!s(Dt)&&!s(Ar)&&!s(ho)&&(s(gs)||s(lh)),device:!s(Dt)&&(s(Ar)||s(gs)||s(ho)||s(lh))||s(/\bokhttp\b/i)},windows:{phone:s(Dt),tablet:s(ch),device:s(Dt)||s(ch)},other:{blackberry:s(hh),blackberry10:s(dh),opera:s(fh),firefox:s(mh),chrome:s(ph),device:s(hh)||s(dh)||s(fh)||s(mh)||s(ph)},any:!1,phone:!1,tablet:!1};return i.any=i.apple.device||i.android.device||i.windows.device||i.other.device,i.phone=i.apple.phone||i.android.phone||i.windows.phone,i.tablet=i.apple.tablet||i.android.tablet||i.windows.tablet,i}const xh=(_h.default??_h)(globalThis.navigator),Vb=9,bh=100,Wb=0,Xb=0,yh=2,vh=1,$b=-1e3,Yb=-1e3,qb=2,fo=class Dx{constructor(e,t=xh){this._mobileInfo=t,this.debug=!1,this._activateOnTab=!0,this._deactivateOnMouseMove=!0,this._isActive=!1,this._isMobileAccessibility=!1,this._div=null,this._pools={},this._renderId=0,this._children=[],this._androidUpdateCount=0,this._androidUpdateFrequency=500,this._isRunningTests=!1,this._boundOnKeyDown=this._onKeyDown.bind(this),this._boundOnMouseMove=this._onMouseMove.bind(this),this._hookDiv=null,(t.tablet||t.phone)&&this._createTouchHook(),this._renderer=e}get isActive(){return this._isActive}get isMobileAccessibility(){return this._isMobileAccessibility}get hookDiv(){return this._hookDiv}get div(){return this._div}_createTouchHook(){const e=document.createElement("button");e.style.width=`${vh}px`,e.style.height=`${vh}px`,e.style.position="absolute",e.style.top=`${$b}px`,e.style.left=`${Yb}px`,e.style.zIndex=qb.toString(),e.style.backgroundColor="#FF0000",e.title="select to enable accessibility for this content",e.addEventListener("focus",()=>{this._isMobileAccessibility=!0,this._activate(),this._destroyTouchHook()}),document.body.appendChild(e),this._hookDiv=e}_destroyTouchHook(){this._hookDiv&&(document.body.removeChild(this._hookDiv),this._hookDiv=null)}_activate(){if(this._isActive)return;this._isActive=!0,this._div||(this._div=document.createElement("div"),this._div.style.position="absolute",this._div.style.top=`${Wb}px`,this._div.style.left=`${Xb}px`,this._div.style.pointerEvents="none",this._div.style.zIndex=yh.toString(),this._canvasObserver=new lo({domElement:this._div,renderer:this._renderer})),this._activateOnTab&&globalThis.addEventListener("keydown",this._boundOnKeyDown,!1),this._deactivateOnMouseMove&&globalThis.document.addEventListener("mousemove",this._boundOnMouseMove,!0);const e=this._renderer.view.canvas;if(e.parentNode)this._canvasObserver.ensureAttached(),this._initAccessibilitySetup();else{const t=new MutationObserver(()=>{e.parentNode&&(t.disconnect(),this._canvasObserver.ensureAttached(),this._initAccessibilitySetup())});t.observe(document.body,{childList:!0,subtree:!0})}}_initAccessibilitySetup(){this._renderer.runners.postrender.add(this),this._renderer.lastObjectRendered&&this._updateAccessibleObjects(this._renderer.lastObjectRendered)}_deactivate(){var e,t;if(!(!this._isActive||this._isMobileAccessibility)){this._isActive=!1,globalThis.document.removeEventListener("mousemove",this._boundOnMouseMove,!0),this._activateOnTab&&globalThis.addEventListener("keydown",this._boundOnKeyDown,!1),this._renderer.runners.postrender.remove(this);for(const r of this._children)(e=r._accessibleDiv)!=null&&e.parentNode&&(r._accessibleDiv.parentNode.removeChild(r._accessibleDiv),r._accessibleDiv=null),r._accessibleActive=!1;for(const r in this._pools)this._pools[r].forEach(i=>{i.parentNode&&i.parentNode.removeChild(i)}),delete this._pools[r];(t=this._div)!=null&&t.parentNode&&this._div.parentNode.removeChild(this._div),this._pools={},this._children=[]}}_updateAccessibleObjects(e){if(!e.visible||!e.accessibleChildren)return;e.accessible&&(e._accessibleActive||this._addChild(e),e._renderId=this._renderId);const t=e.children;if(t)for(let r=0;r<t.length;r++)this._updateAccessibleObjects(t[r])}init(e){const r={accessibilityOptions:{...Dx.defaultOptions,...(e==null?void 0:e.accessibilityOptions)||{}}};this.debug=r.accessibilityOptions.debug,this._activateOnTab=r.accessibilityOptions.activateOnTab,this._deactivateOnMouseMove=r.accessibilityOptions.deactivateOnMouseMove,r.accessibilityOptions.enabledByDefault&&this._activate(),this._renderer.runners.postrender.remove(this)}postrender(){const e=performance.now();if(this._mobileInfo.android.device&&e<this._androidUpdateCount||(this._androidUpdateCount=e+this._androidUpdateFrequency,(!this._renderer.renderingToScreen||!this._renderer.view.canvas)&&!this._isRunningTests))return;const t=new Set;if(this._renderer.lastObjectRendered){this._updateAccessibleObjects(this._renderer.lastObjectRendered);for(const r of this._children)r._renderId===this._renderId&&t.add(this._children.indexOf(r))}for(let r=this._children.length-1;r>=0;r--){const s=this._children[r];t.has(r)||(s._accessibleDiv&&s._accessibleDiv.parentNode&&(s._accessibleDiv.parentNode.removeChild(s._accessibleDiv),this._getPool(s.accessibleType).push(s._accessibleDiv),s._accessibleDiv=null),s._accessibleActive=!1,ji(this._children,r,1))}this._renderer.renderingToScreen&&this._canvasObserver.ensureAttached();for(let r=0;r<this._children.length;r++){const s=this._children[r];if(!s._accessibleActive||!s._accessibleDiv)continue;const i=s._accessibleDiv,o=s.hitArea||s.getBounds().rectangle;if(s.hitArea){const a=s.worldTransform;i.style.left=`${a.tx+o.x*a.a}px`,i.style.top=`${a.ty+o.y*a.d}px`,i.style.width=`${o.width*a.a}px`,i.style.height=`${o.height*a.d}px`}else this._capHitArea(o),i.style.left=`${o.x}px`,i.style.top=`${o.y}px`,i.style.width=`${o.width}px`,i.style.height=`${o.height}px`}this._renderId++}_updateDebugHTML(e){e.innerHTML=`type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`}_capHitArea(e){e.x<0&&(e.width+=e.x,e.x=0),e.y<0&&(e.height+=e.y,e.y=0);const{width:t,height:r}=this._renderer;e.x+e.width>t&&(e.width=t-e.x),e.y+e.height>r&&(e.height=r-e.y)}_addChild(e){let r=this._getPool(e.accessibleType).pop();r?(r.innerHTML="",r.removeAttribute("title"),r.removeAttribute("aria-label"),r.tabIndex=0):(e.accessibleType==="button"?r=document.createElement("button"):(r=document.createElement(e.accessibleType),r.style.cssText=`
                        color: transparent;
                        pointer-events: none;
                        padding: 0;
                        margin: 0;
                        border: 0;
                        outline: 0;
                        background: transparent;
                        box-sizing: border-box;
                        user-select: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                    `,e.accessibleText&&(r.innerText=e.accessibleText)),r.style.width=`${bh}px`,r.style.height=`${bh}px`,r.style.backgroundColor=this.debug?"rgba(255,255,255,0.5)":"transparent",r.style.position="absolute",r.style.zIndex=yh.toString(),r.style.borderStyle="none",navigator.userAgent.toLowerCase().includes("chrome")?r.setAttribute("aria-live","off"):r.setAttribute("aria-live","polite"),navigator.userAgent.match(/rv:.*Gecko\//)?r.setAttribute("aria-relevant","additions"):r.setAttribute("aria-relevant","text"),r.addEventListener("click",this._onClick.bind(this)),r.addEventListener("focus",this._onFocus.bind(this)),r.addEventListener("focusout",this._onFocusOut.bind(this))),r.style.pointerEvents=e.accessiblePointerEvents,r.type=e.accessibleType,e.accessibleTitle&&e.accessibleTitle!==null?r.title=e.accessibleTitle:(!e.accessibleHint||e.accessibleHint===null)&&(r.title=`container ${e.tabIndex}`),e.accessibleHint&&e.accessibleHint!==null&&r.setAttribute("aria-label",e.accessibleHint),e.interactive?r.tabIndex=e.tabIndex:r.tabIndex=0,this.debug&&this._updateDebugHTML(r),e._accessibleActive=!0,e._accessibleDiv=r,r.container=e,this._children.push(e),this._div.appendChild(e._accessibleDiv)}_dispatchEvent(e,t){const{container:r}=e.target,s=this._renderer.events.rootBoundary,i=Object.assign(new Cr(s),{target:r});s.rootTarget=this._renderer.lastObjectRendered,t.forEach(o=>s.dispatchEvent(i,o))}_onClick(e){this._dispatchEvent(e,["click","pointertap","tap"])}_onFocus(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","assertive"),this._dispatchEvent(e,["mouseover"])}_onFocusOut(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","polite"),this._dispatchEvent(e,["mouseout"])}_onKeyDown(e){e.keyCode!==Vb||!this._activateOnTab||this._activate()}_onMouseMove(e){e.movementX===0&&e.movementY===0||this._deactivate()}destroy(){var e;this._deactivate(),this._destroyTouchHook(),(e=this._canvasObserver)==null||e.destroy(),this._canvasObserver=null,this._div=null,this._pools=null,this._children=null,this._renderer=null,this._hookDiv=null,globalThis.removeEventListener("keydown",this._boundOnKeyDown),this._boundOnKeyDown=null,globalThis.document.removeEventListener("mousemove",this._boundOnMouseMove,!0),this._boundOnMouseMove=null}setAccessibilityEnabled(e){e?this._activate():this._deactivate()}_getPool(e){return this._pools[e]||(this._pools[e]=[]),this._pools[e]}};fo.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"accessibility"},fo.defaultOptions={enabledByDefault:!1,debug:!1,activateOnTab:!0,deactivateOnMouseMove:!0};let Sh=fo;const Th={accessible:!1,accessibleTitle:null,accessibleHint:null,tabIndex:0,accessibleType:"button",accessibleText:null,accessiblePointerEvents:"auto",accessibleChildren:!0,_accessibleActive:!1,_accessibleDiv:null,_renderId:-1},po=Object.create(null),Ch=Object.create(null);function wr(n,e){let t=Ch[n];return t===void 0&&(po[e]===void 0&&(po[e]=1),Ch[n]=t=po[e]++),t}let Er;function mo(){return(!Er||Er!=null&&Er.isContextLost())&&(Er=Q.get().createCanvas().getContext("webgl",{})),Er}let _s;function Ah(){if(!_s){_s="mediump";const n=mo();n&&n.getShaderPrecisionFormat&&(_s=n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision?"highp":"mediump")}return _s}function wh(n,e,t){return e?n:t?(n=n.replace("out vec4 finalColor;",""),`

        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${n}
        `):`

        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${n}
        `}function Eh(n,e,t){const r=t?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(n.substring(0,9)!=="precision"){let s=t?e.requestedFragmentPrecision:e.requestedVertexPrecision;return s==="highp"&&r!=="highp"&&(s="mediump"),`precision ${s} float;
${n}`}else if(r!=="highp"&&n.substring(0,15)==="precision highp")return n.replace("precision highp","precision mediump");return n}function Ph(n,e){return e?`#version 300 es
${n}`:n}const jb={},Kb={};function Bh(n,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const r=t?jb:Kb;return r[e]?(r[e]++,e+=`-${r[e]}`):r[e]=1,n.indexOf("#define SHADER_NAME")!==-1?n:`${`#define SHADER_NAME ${e}`}
${n}`}function Rh(n,e){return e?n.replace("#version 300 es",""):n}const go={stripVersion:Rh,ensurePrecision:Eh,addProgramDefines:wh,setProgramName:Bh,insertVersion:Ph},dn=Object.create(null),Dh=class ql{constructor(e){e={...ql.defaultOptions,...e};const t=e.fragment.indexOf("#version 300 es")!==-1,r={stripVersion:t,ensurePrecision:{requestedFragmentPrecision:e.preferredFragmentPrecision,requestedVertexPrecision:e.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:Ah()},setProgramName:{name:e.name},addProgramDefines:t,insertVersion:t};let s=e.fragment,i=e.vertex;Object.keys(go).forEach(o=>{const a=r[o];s=go[o](s,a,!0),i=go[o](i,a,!1)}),this.fragment=s,this.vertex=i,this.transformFeedbackVaryings=e.transformFeedbackVaryings,this._key=wr(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null,dn[this._cacheKey]=null}static from(e){const t=`${e.vertex}:${e.fragment}`;return dn[t]||(dn[t]=new ql(e),dn[t]._cacheKey=t),dn[t]}};Dh.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let be=Dh;const Mh={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function Mt(n){return Mh[n]??Mh.float32}const Zb={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function Fh({source:n,entryPoint:e}){const t={},r=n.indexOf(`fn ${e}`);if(r!==-1){const s=n.indexOf("->",r);if(s!==-1){const i=n.substring(r,s),o=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let a;for(;(a=o.exec(i))!==null;){const u=Zb[a[3]]??"float32";t[a[2]]={location:parseInt(a[1],10),format:u,stride:Mt(u).stride,offset:0,instance:!1,start:0}}}}return t}function xs(n){var h,d;const e=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,t=/@group\((\d+)\)/,r=/@binding\((\d+)\)/,s=/var(<[^>]+>)? (\w+)/,i=/:\s*(\w+)/,o=/struct\s+(\w+)\s*{([^}]+)}/g,a=/(\w+)\s*:\s*([\w\<\>]+)/g,u=/struct\s+(\w+)/,l=(h=n.match(e))==null?void 0:h.map(f=>({group:parseInt(f.match(t)[1],10),binding:parseInt(f.match(r)[1],10),name:f.match(s)[2],isUniform:f.match(s)[1]==="<uniform>",type:f.match(i)[1]}));if(!l)return{groups:[],structs:[]};const c=((d=n.match(o))==null?void 0:d.map(f=>{const g=f.match(u)[1],x=f.match(a).reduce((p,b)=>{const[y,v]=b.split(":");return p[y.trim()]=v.trim(),p},{});return x?{name:g,members:x}:null}).filter(({name:f})=>l.some(g=>g.type===f)))??[];return{groups:l,structs:c}}var Pr=(n=>(n[n.VERTEX=1]="VERTEX",n[n.FRAGMENT=2]="FRAGMENT",n[n.COMPUTE=4]="COMPUTE",n))(Pr||{});function Uh({groups:n}){const e=[];for(let t=0;t<n.length;t++){const r=n[t];e[r.group]||(e[r.group]=[]),r.isUniform?e[r.group].push({binding:r.binding,visibility:Pr.VERTEX|Pr.FRAGMENT,buffer:{type:"uniform"}}):r.type==="sampler"?e[r.group].push({binding:r.binding,visibility:Pr.FRAGMENT,sampler:{type:"filtering"}}):r.type==="texture_2d"&&e[r.group].push({binding:r.binding,visibility:Pr.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function Ih({groups:n}){const e=[];for(let t=0;t<n.length;t++){const r=n[t];e[r.group]||(e[r.group]={}),e[r.group][r.name]=r.binding}return e}function Oh(n,e){const t=new Set,r=new Set,s=[...n.structs,...e.structs].filter(o=>t.has(o.name)?!1:(t.add(o.name),!0)),i=[...n.groups,...e.groups].filter(o=>{const a=`${o.name}-${o.binding}`;return r.has(a)?!1:(r.add(a),!0)});return{structs:s,groups:i}}const fn=Object.create(null);class pe{constructor(e){var a,u;this._layoutKey=0,this._attributeLocationsKey=0;const{fragment:t,vertex:r,layout:s,gpuLayout:i,name:o}=e;if(this.name=o,this.fragment=t,this.vertex=r,t.source===r.source){const l=xs(t.source);this.structsAndGroups=l}else{const l=xs(r.source),c=xs(t.source);this.structsAndGroups=Oh(l,c)}this.layout=s??Ih(this.structsAndGroups),this.gpuLayout=i??Uh(this.structsAndGroups),this.autoAssignGlobalUniforms=((a=this.layout[0])==null?void 0:a.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((u=this.layout[1])==null?void 0:u.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:e,fragment:t}=this,r=e.source+t.source+e.entryPoint+t.entryPoint;this._layoutKey=wr(r,"program")}get attributeData(){return this._attributeData??(this._attributeData=Fh(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null,fn[this._cacheKey]=null}static from(e){const t=`${e.vertex.source}:${e.fragment.source}:${e.fragment.entryPoint}:${e.vertex.entryPoint}`;return fn[t]||(fn[t]=new pe(e),fn[t]._cacheKey=t),fn[t]}}const _o=["f32","i32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","mat3x3<f32>","mat4x4<f32>","mat3x2<f32>","mat4x2<f32>","mat2x3<f32>","mat4x3<f32>","mat2x4<f32>","mat3x4<f32>","vec2<i32>","vec3<i32>","vec4<i32>"],Gh=_o.reduce((n,e)=>(n[e]=!0,n),{});function kh(n,e){switch(n){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const Lh=class Mx{constructor(e,t){this._touched=0,this.uid=ae("uniform"),this._resourceType="uniformGroup",this._resourceId=ae("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,t={...Mx.defaultOptions,...t},this.uniformStructures=e;const r={};for(const s in e){const i=e[s];if(i.name=s,i.size=i.size??1,!Gh[i.type]){const o=i.type.match(/^array<(\w+(?:<\w+>)?),\s*(\d+)>$/);if(o){const[,a,u]=o;throw new Error(`Uniform type ${i.type} is not supported. Use type: '${a}', size: ${u} instead.`)}throw new Error(`Uniform type ${i.type} is not supported. Supported uniform types are: ${_o.join(", ")}`)}i.value??(i.value=kh(i.type,i.size)),r[s]=i.value}this.uniforms=r,this._dirtyId=1,this.ubo=t.ubo,this.isStatic=t.isStatic,this._signature=wr(Object.keys(r).map(s=>`${s}-${e[s].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};Lh.defaultOptions={ubo:!1,isStatic:!1};let Ce=Lh;class Tt{constructor(e){this.resources=Object.create(null),this._dirty=!0;let t=0;for(const r in e){const s=e[r];this.setResource(s,t++)}this._updateKey()}_updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let t=0;for(const r in this.resources)e[t++]=this.resources[r]._resourceId;this._key=e.join("|")}setResource(e,t){var s,i;const r=this.resources[t];e!==r&&(r&&((s=e.off)==null||s.call(e,"change",this.onResourceChange,this)),(i=e.on)==null||i.call(e,"change",this.onResourceChange,this),this.resources[t]=e,this._dirty=!0)}getResource(e){return this.resources[e]}_touch(e,t){const r=this.resources;for(const s in r)r[s]._gcLastUsed=e,r[s]._touched=t}destroy(){var t;const e=this.resources;for(const r in e){const s=e[r];(t=s==null?void 0:s.off)==null||t.call(s,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(e){if(this._dirty=!0,e.destroyed){const t=this.resources;for(const r in t)t[r]===e&&(t[r]=null)}else this._updateKey()}}var $e=(n=>(n[n.WEBGL=1]="WEBGL",n[n.WEBGPU=2]="WEBGPU",n[n.BOTH=3]="BOTH",n))($e||{});class nt extends We{constructor(e){super(),this.uid=ae("shader"),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[],this._destroyed=!1;let{gpuProgram:t,glProgram:r,groups:s,resources:i,compatibleRenderers:o,groupMap:a}=e;this.gpuProgram=t,this.glProgram=r,o===void 0&&(o=0,t&&(o|=$e.WEBGPU),r&&(o|=$e.WEBGL)),this.compatibleRenderers=o;const u={};if(!i&&!s&&(i={}),i&&s)throw new Error("[Shader] Cannot have both resources and groups");if(!t&&s&&!a)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!t&&s&&a)for(const l in a)for(const c in a[l]){const h=a[l][c];u[h]={group:l,binding:c,name:h}}else if(t&&s&&!a){const l=t.structsAndGroups.groups;a={},l.forEach(c=>{a[c.group]=a[c.group]||{},a[c.group][c.binding]=c.name,u[c.name]=c})}else if(i){s={},a={},t&&t.structsAndGroups.groups.forEach(h=>{a[h.group]=a[h.group]||{},a[h.group][h.binding]=h.name,u[h.name]=h});let l=0;for(const c in i)u[c]||(s[99]||(s[99]=new Tt,this._ownedBindGroups.push(s[99])),u[c]={group:99,binding:l,name:c},a[99]=a[99]||{},a[99][l]=c,l++);for(const c in i){const h=c;let d=i[c];!d.source&&!d._resourceType&&(d=new Ce(d));const f=u[h];f&&(s[f.group]||(s[f.group]=new Tt,this._ownedBindGroups.push(s[f.group])),s[f.group].setResource(d,f.binding))}}this.groups=s,this._uniformBindMap=a,this.resources=this._buildResourceAccessor(s,u)}addResource(e,t,r){var s,i;(s=this._uniformBindMap)[t]||(s[t]={}),(i=this._uniformBindMap[t])[r]||(i[r]=e),this.groups[t]||(this.groups[t]=new Tt,this._ownedBindGroups.push(this.groups[t]))}_buildResourceAccessor(e,t){const r={};for(const s in t){const i=t[s];Object.defineProperty(r,i.name,{get(){return e[i.group].getResource(i.binding)},set(o){e[i.group].setResource(o,i.binding)}})}return r}destroy(e=!1){var t,r;this._destroyed||(this._destroyed=!0,this.emit("destroy",this),e&&((t=this.gpuProgram)==null||t.destroy(),(r=this.glProgram)==null||r.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(s=>{s.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null)}static from(e){const{gpu:t,gl:r,...s}=e;let i,o;return t&&(i=pe.from(t)),r&&(o=be.from(r)),new nt({gpuProgram:i,glProgram:o,...s})}}const Qb={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},xo=0,bo=1,yo=2,vo=3,So=4,To=5,Co=class Fx{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<xo)}set blend(e){!!(this.data&1<<xo)!==e&&(this.data^=1<<xo)}get offsets(){return!!(this.data&1<<bo)}set offsets(e){!!(this.data&1<<bo)!==e&&(this.data^=1<<bo)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<yo)}set culling(e){!!(this.data&1<<yo)!==e&&(this.data^=1<<yo)}get depthTest(){return!!(this.data&1<<vo)}set depthTest(e){!!(this.data&1<<vo)!==e&&(this.data^=1<<vo)}get depthMask(){return!!(this.data&1<<To)}set depthMask(e){!!(this.data&1<<To)!==e&&(this.data^=1<<To)}get clockwiseFrontFace(){return!!(this.data&1<<So)}set clockwiseFrontFace(e){!!(this.data&1<<So)!==e&&(this.data^=1<<So)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=Qb[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const e=new Fx;return e.depthTest=!1,e.blend=!0,e}};Co.default2d=Co.for2d();let st=Co;const Nh=class jl extends nt{constructor(e){e={...jl.defaultOptions,...e},super(e),this.enabled=!0,this._state=st.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1),e.blendRequired&&this.addResource("uBackTexture",0,3)}apply(e,t,r,s){e.applyFilter(this,t,r,s)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:t,gl:r,...s}=e;let i,o;return t&&(i=pe.from(t)),r&&(o=be.from(r)),new jl({gpuProgram:i,glProgram:o,...s})}};Nh.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Fe=Nh;var zh=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uBlend;

uniform sampler2D uTexture;
uniform sampler2D uBackTexture;

{FUNCTIONS}

void main()
{ 
    vec4 back = texture(uBackTexture, vTextureCoord);
    vec4 front = texture(uTexture, vTextureCoord);
    float blendedAlpha = front.a + back.a * (1.0 - front.a);
    
    {MAIN}
}
`,Hh=`in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 backgroundUv;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Vh=`
struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct BlendUniforms {
  uBlend:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(0) @binding(3) var uBackTexture: texture_2d<f32>;

@group(1) @binding(0) var<uniform> blendUniforms : BlendUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

{FUNCTIONS}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>
) -> @location(0) vec4<f32> {


   var back =  textureSample(uBackTexture, uSampler, uv);
   var front = textureSample(uTexture, uSampler, uv);
   var blendedAlpha = front.a + back.a * (1.0 - front.a);
   
   var out = vec4<f32>(0.0,0.0,0.0,0.0);

   {MAIN}

   return out;
}`;class ye extends Fe{constructor(e){const t=e.gpu,r=Wh({source:Vh,...t}),s=pe.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,o=Wh({source:zh,...i}),a=be.from({vertex:Hh,fragment:o}),u=new Ce({uBlend:{value:1,type:"f32"}});super({gpuProgram:s,glProgram:a,blendRequired:!0,resources:{blendUniforms:u,uBackTexture:k.EMPTY}})}}function Wh(n){const{source:e,functions:t,main:r}=n;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",r)}const bs=`
	float getLuminosity(vec3 c) {
		return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
	}

	vec3 setLuminosity(vec3 c, float lum) {
		float modLum = lum - getLuminosity(c);
		vec3 color = c.rgb + vec3(modLum);

		// clip back into legal range
		modLum = getLuminosity(color);
		vec3 modLumVec = vec3(modLum);

		float cMin = min(color.r, min(color.g, color.b));
		float cMax = max(color.r, max(color.g, color.b));

		if(cMin < 0.0) {
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0) {
			color = mix(modLumVec, color, (1.0 - modLum) / (cMax - modLum));
		}

		return color;
	}

	float getSaturation(vec3 c) {
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	vec3 setSaturationMinMidMax(vec3 cSorted, float s) {
		vec3 colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x) {
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else {
			colorSorted.y = 0.0;
			colorSorted.z = 0.0;
		}

		colorSorted.x = 0.0;

		return colorSorted;
	}

	vec3 setSaturation(vec3 c, float s) {
		vec3 color = c;

		if(color.r <= color.g && color.r <= color.b) {
			if(color.g <= color.b) {
				color = setSaturationMinMidMax(color.rgb, s).rgb;
			}
			else {
				color = setSaturationMinMidMax(color.rbg, s).rbg;
			}
		}
		else if(color.g <= color.r && color.g <= color.b) {
			if(color.r <= color.b) {
				color = setSaturationMinMidMax(color.grb, s).grb;
			}
			else {
				color = setSaturationMinMidMax(color.gbr, s).gbr;
			}
		}
		else {
			// Using bgr for both fixes part of hue
			if(color.r <= color.g) {
				color = setSaturationMinMidMax(color.brg, s).brg;
			}
			else {
				color = setSaturationMinMidMax(color.bgr, s).bgr;
			}
		}

		return color;
	}
    `,ys=`
	fn getLuminosity(c: vec3<f32>) -> f32
	{
		return 0.3*c.r + 0.59*c.g + 0.11*c.b;
	}

	fn setLuminosity(c: vec3<f32>, lum: f32) -> vec3<f32>
	{
		var modLum: f32 = lum - getLuminosity(c);
		var color: vec3<f32> = c.rgb + modLum;

		// clip back into legal range
		modLum = getLuminosity(color);
		let modLumVec = vec3<f32>(modLum);

		let cMin: f32 = min(color.r, min(color.g, color.b));
		let cMax: f32 = max(color.r, max(color.g, color.b));

		if(cMin < 0.0)
		{
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0)
		{
			color = mix(modLumVec, color, (1 - modLum) / (cMax - modLum));
		}

		return color;
	}

	fn getSaturation(c: vec3<f32>) -> f32
	{
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	fn setSaturationMinMidMax(cSorted: vec3<f32>, s: f32) -> vec3<f32>
	{
		var colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x)
		{
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else
		{
			colorSorted.y = 0;
			colorSorted.z = 0;
		}

		colorSorted.x = 0;

		return colorSorted;
	}

	fn setSaturation(c: vec3<f32>, s: f32) -> vec3<f32>
	{
		var color = c;

		if (color.r <= color.g && color.r <= color.b)
		{
			if (color.g <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rgb, s)).rgb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rbg, s)).rbg;
			}
		}
		else if (color.g <= color.r && color.g <= color.b)
		{
			if (color.r <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.grb, s)).grb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.gbr, s)).gbr;
			}
		}
		else
		{
			// Using bgr for both fixes part of hue
			if (color.r <= color.g)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.brg, s)).brg;
			}
			else
			{
				color  = vec3<f32>(setSaturationMinMidMax(color.bgr, s)).bgr;
			}
		}

		return color;
	}
	`;class Xh extends ye{constructor(){super({gl:{functions:`
                ${bs}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${ys}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Xh.extension={name:"color",type:T.BlendMode};class $h extends ye{constructor(){super({gl:{functions:`
                float colorBurn(float base, float blend)
                {
                    return max((1.0 - ((1.0 - base) / blend)), 0.0);
                }

                vec3 blendColorBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendColorBurn(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn blendColorBurn(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendColorBurn(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}$h.extension={name:"color-burn",type:T.BlendMode};class Yh extends ye{constructor(){super({gl:{functions:`
                float colorDodge(float base, float blend)
                {
                    return base / (1.0 - blend);
                }

                vec3 blendColorDodge(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColorDodge(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return base / (1.0 - blend);
                }

                fn blendColorDodge(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                    out = vec4<f32>(blendColorDodge(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Yh.extension={name:"color-dodge",type:T.BlendMode};class qh extends ye{constructor(){super({gl:{functions:`
                vec3 blendDarken(vec3 base, vec3 blend, float opacity)
                {
                    return (min(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendDarken(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn blendDarken(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (min(blend,base) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendDarken(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}qh.extension={name:"darken",type:T.BlendMode};class jh extends ye{constructor(){super({gl:{functions:`
                vec3 blendDifference(vec3 base, vec3 blend,  float opacity)
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendDifference(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn blendDifference(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendDifference(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}jh.extension={name:"difference",type:T.BlendMode};class Kh extends ye{constructor(){super({gl:{functions:`
                float divide(float base, float blend)
                {
                    return (blend > 0.0) ? clamp(base / blend, 0.0, 1.0) : 1.0;
                }

                vec3 blendDivide(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendDivide(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn divide(base: f32, blend: f32) -> f32
                {
                    return select(1.0, clamp(base / blend, 0.0, 1.0), blend > 0.0);
                }

                fn blendDivide(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendDivide(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Kh.extension={name:"divide",type:T.BlendMode};class Zh extends ye{constructor(){super({gl:{functions:`
                vec3 exclusion(vec3 base, vec3 blend)
                {
                    return base + blend - 2.0 * base * blend;
                }

                vec3 blendExclusion(vec3 base, vec3 blend, float opacity)
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendExclusion(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn exclusion(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return base+blend-2.0*base*blend;
                }

                fn blendExclusion(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendExclusion(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Zh.extension={name:"exclusion",type:T.BlendMode};class Qh extends ye{constructor(){super({gl:{functions:`
                float hardLight(float base, float blend)
                {
                    return (blend < 0.5) ? 2.0 * base * blend : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
                }

                vec3 blendHardLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendHardLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn hardLight(base: f32, blend: f32) -> f32
                {
                    return select(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, blend < 0.5);
                }

                fn blendHardLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendHardLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Qh.extension={name:"hard-light",type:T.BlendMode};class Jh extends ye{constructor(){super({gl:{functions:`
                float hardMix(float base, float blend)
                {
                    return (base + blend >= 1.0) ? 1.0 : 0.0;
                }

                vec3 blendHardMix(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blended = vec3(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendHardMix(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn hardMix(base: f32, blend: f32) -> f32
                {
                    return select(0.0, 1.0, base + blend >= 1.0);
                }

                fn blendHardMix(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendHardMix(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Jh.extension={name:"hard-mix",type:T.BlendMode};class ed extends ye{constructor(){super({gl:{functions:`
                vec3 blendLighten(vec3 base, vec3 blend, float opacity)
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLighten(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn blendLighten(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLighten(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ed.extension={name:"lighten",type:T.BlendMode};class td extends ye{constructor(){super({gl:{functions:`
                float linearBurn(float base, float blend)
                {
                    return max(0.0, base + blend - 1.0);
                }

                vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLinearBurn(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn blendLinearBurn(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendLinearBurn(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}td.extension={name:"linear-burn",type:T.BlendMode};class rd extends ye{constructor(){super({gl:{functions:`
                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLinearDodge(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1, base + blend);
                }

                fn blendLinearDodge(base:vec3<f32>, blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLinearDodge(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}rd.extension={name:"linear-dodge",type:T.BlendMode};class nd extends ye{constructor(){super({gl:{functions:`
                float linearBurn(float base, float blend) {
                    return max(0.0, base + blend - 1.0);
                }

                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                float linearLight(float base, float blend) {
                    return (blend <= 0.5) ? linearBurn(base,2.0*blend) : linearBurn(base,2.0*(blend-0.5));
                }

                vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendLinearLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base + blend);
                }

                fn linearLight(base: f32, blend: f32) -> f32
                {
                    return select(linearBurn(base,2.0*(blend-0.5)), linearBurn(base,2.0*blend), blend <= 0.5);
                }

                fn blendLinearLightOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLinearLightOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}nd.extension={name:"linear-light",type:T.BlendMode};class sd extends ye{constructor(){super({gl:{functions:`
                ${bs}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${ys}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}sd.extension={name:"luminosity",type:T.BlendMode};class id extends ye{constructor(){super({gl:{functions:`
                vec3 negation(vec3 base, vec3 blend)
                {
                    return 1.0-abs(1.0-base-blend);
                }

                vec3 blendNegation(vec3 base, vec3 blend, float opacity)
                {
                    return (negation(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendNegation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn blendNegation(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return 1.0-abs(1.0-base-blend);
                }

                fn blendNegationOpacity(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendNegationOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}id.extension={name:"negation",type:T.BlendMode};class od extends ye{constructor(){super({gl:{functions:`
                float overlay(float base, float blend)
                {
                    return (base < 0.5) ? (2.0*base*blend) : (1.0-2.0*(1.0-base)*(1.0-blend));
                }

                vec3 blendOverlay(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendOverlay(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn overlay(base: f32, blend: f32) -> f32
                {
                    return select((1.0-2.0*(1.0-base)*(1.0-blend)), (2.0*base*blend), base < 0.5);
                }

                fn blendOverlay(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendOverlay(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}od.extension={name:"overlay",type:T.BlendMode};class ad extends ye{constructor(){super({gl:{functions:`
                float pinLight(float base, float blend)
                {
                    return (blend <= 0.5) ? min(base, 2.0 * blend) : max(base, 2.0 * (blend - 0.5));
                }

                vec3 blendPinLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendPinLight(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn pinLight(base: f32, blend: f32) -> f32
                {
                    return select(max(base,2.0*(blend-0.5)), min(base,2.0*blend), blend <= 0.5);
                }

                fn blendPinLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendPinLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ad.extension={name:"pin-light",type:T.BlendMode};class ud extends ye{constructor(){super({gl:{functions:`
                ${bs}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${ys}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ud.extension={name:"saturation",type:T.BlendMode};class ld extends ye{constructor(){super({gl:{functions:`
                float softLight(float base, float blend)
                {
                    return (blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
                }

                vec3 blendSoftLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendSoftLight(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn softLight(base: f32, blend: f32) -> f32
                {
                    return select(2.0 * base * blend + base * base * (1.0 - 2.0 * blend), sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend), blend < 0.5);
                }

                fn blendSoftLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendSoftLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ld.extension={name:"soft-light",type:T.BlendMode};class cd extends ye{constructor(){super({gl:{functions:`
                float subtract(float base, float blend)
                {
                    return max(0.0, base - blend);
                }

                vec3 blendSubtract(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendSubtract(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn subtract(base: f32, blend: f32) -> f32
                {
                    return max(0, base - blend);
                }

                fn blendSubtract(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendSubtract(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}cd.extension={name:"subtract",type:T.BlendMode};class hd extends ye{constructor(){super({gl:{functions:`
                float colorBurn(float base, float blend)
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                float colorDodge(float base, float blend)
                {
                    return min(1.0, base / (1.0-blend));
                }

                float vividLight(float base, float blend)
                {
                    return (blend < 0.5) ? colorBurn(base,(2.0*blend)) : colorDodge(base,(2.0*(blend-0.5)));
                }

                vec3 blendVividLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendVividLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base / (1.0-blend));
                }

                fn vividLight(base: f32, blend: f32) -> f32
                {
                    return select(colorDodge(base,(2.0*(blend-0.5))), colorBurn(base,(2.0*blend)), blend<0.5);
                }

                fn blendVividLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendVividLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}hd.extension={name:"vivid-light",type:T.BlendMode};const Ao=[];$.handleByNamedList(T.Environment,Ao);async function wo(n){if(!n)for(let e=0;e<Ao.length;e++){const t=Ao[e];if(t.value.test()){await t.value.load();return}}}async function Jb(n){return wo(!n)}let pn;function Eo(){if(typeof pn=="boolean")return pn;try{pn=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{pn=!1}return pn}function dd(n,e,t=2){const r=e&&e.length,s=r?e[0]*t:n.length;let i=fd(n,0,s,t,!0);const o=[];if(!i||i.next===i.prev)return o;let a,u,l;if(r&&(i=s0(n,e,i,t)),n.length>80*t){a=n[0],u=n[1];let c=a,h=u;for(let d=t;d<s;d+=t){const f=n[d],g=n[d+1];f<a&&(a=f),g<u&&(u=g),f>c&&(c=f),g>h&&(h=g)}l=Math.max(c-a,h-u),l=l!==0?32767/l:0}return mn(i,o,t,a,u,l,0),o}function fd(n,e,t,r,s){let i;if(s===m0(n,e,t,r)>0)for(let o=e;o<t;o+=r)i=_d(o/r|0,n[o],n[o+1],i);else for(let o=t-r;o>=e;o-=r)i=_d(o/r|0,n[o],n[o+1],i);return i&&Br(i,i.next)&&(xn(i),i=i.next),i}function sr(n,e){if(!n)return n;e||(e=n);let t=n,r;do if(r=!1,!t.steiner&&(Br(t,t.next)||me(t.prev,t,t.next)===0)){if(xn(t),t=e=t.prev,t===t.next)break;r=!0}else t=t.next;while(r||t!==e);return e}function mn(n,e,t,r,s,i,o){if(!n)return;!o&&i&&l0(n,r,s,i);let a=n;for(;n.prev!==n.next;){const u=n.prev,l=n.next;if(i?t0(n,r,s,i):e0(n)){e.push(u.i,n.i,l.i),xn(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=r0(sr(n),e),mn(n,e,t,r,s,i,2)):o===2&&n0(n,e,t,r,s,i):mn(sr(n),e,t,r,s,i,1);break}}}function e0(n){const e=n.prev,t=n,r=n.next;if(me(e,t,r)>=0)return!1;const s=e.x,i=t.x,o=r.x,a=e.y,u=t.y,l=r.y,c=Math.min(s,i,o),h=Math.min(a,u,l),d=Math.max(s,i,o),f=Math.max(a,u,l);let g=r.next;for(;g!==e;){if(g.x>=c&&g.x<=d&&g.y>=h&&g.y<=f&&gn(s,a,i,u,o,l,g.x,g.y)&&me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function t0(n,e,t,r){const s=n.prev,i=n,o=n.next;if(me(s,i,o)>=0)return!1;const a=s.x,u=i.x,l=o.x,c=s.y,h=i.y,d=o.y,f=Math.min(a,u,l),g=Math.min(c,h,d),x=Math.max(a,u,l),p=Math.max(c,h,d),b=Po(f,g,e,t,r),y=Po(x,p,e,t,r);let v=n.prevZ,C=n.nextZ;for(;v&&v.z>=b&&C&&C.z<=y;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&gn(a,c,u,h,l,d,v.x,v.y)&&me(v.prev,v,v.next)>=0||(v=v.prevZ,C.x>=f&&C.x<=x&&C.y>=g&&C.y<=p&&C!==s&&C!==o&&gn(a,c,u,h,l,d,C.x,C.y)&&me(C.prev,C,C.next)>=0))return!1;C=C.nextZ}for(;v&&v.z>=b;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&gn(a,c,u,h,l,d,v.x,v.y)&&me(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;C&&C.z<=y;){if(C.x>=f&&C.x<=x&&C.y>=g&&C.y<=p&&C!==s&&C!==o&&gn(a,c,u,h,l,d,C.x,C.y)&&me(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function r0(n,e){let t=n;do{const r=t.prev,s=t.next.next;!Br(r,s)&&md(r,t,t.next,s)&&_n(r,s)&&_n(s,r)&&(e.push(r.i,t.i,s.i),xn(t),xn(t.next),t=n=s),t=t.next}while(t!==n);return sr(t)}function n0(n,e,t,r,s,i){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&d0(o,a)){let u=gd(o,a);o=sr(o,o.next),u=sr(u,u.next),mn(o,e,t,r,s,i,0),mn(u,e,t,r,s,i,0);return}a=a.next}o=o.next}while(o!==n)}function s0(n,e,t,r){const s=[];for(let i=0,o=e.length;i<o;i++){const a=e[i]*r,u=i<o-1?e[i+1]*r:n.length,l=fd(n,a,u,r,!1);l===l.next&&(l.steiner=!0),s.push(h0(l))}s.sort(i0);for(let i=0;i<s.length;i++)t=o0(s[i],t);return t}function i0(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const r=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=r-s}return t}function o0(n,e){const t=a0(n,e);if(!t)return e;const r=gd(t,n);return sr(r,r.next),sr(t,t.next)}function a0(n,e){let t=e;const r=n.x,s=n.y;let i=-1/0,o;if(Br(n,t))return t;do{if(Br(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=r&&h>i&&(i=h,o=t.x<t.next.x?t:t.next,h===r))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,u=o.x,l=o.y;let c=1/0;t=o;do{if(r>=t.x&&t.x>=u&&r!==t.x&&pd(s<l?r:i,s,u,l,s<l?i:r,s,t.x,t.y)){const h=Math.abs(s-t.y)/(r-t.x);_n(t,n)&&(h<c||h===c&&(t.x>o.x||t.x===o.x&&u0(o,t)))&&(o=t,c=h)}t=t.next}while(t!==a);return o}function u0(n,e){return me(n.prev,n,e.prev)<0&&me(e.next,n,n.next)<0}function l0(n,e,t,r){let s=n;do s.z===0&&(s.z=Po(s.x,s.y,e,t,r)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,c0(s)}function c0(n){let e,t=1;do{let r=n,s;n=null;let i=null;for(e=0;r;){e++;let o=r,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let u=t;for(;a>0||u>0&&o;)a!==0&&(u===0||!o||r.z<=o.z)?(s=r,r=r.nextZ,a--):(s=o,o=o.nextZ,u--),i?i.nextZ=s:n=s,s.prevZ=i,i=s;r=o}i.nextZ=null,t*=2}while(e>1);return n}function Po(n,e,t,r,s){return n=(n-t)*s|0,e=(e-r)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function h0(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function pd(n,e,t,r,s,i,o,a){return(s-o)*(e-a)>=(n-o)*(i-a)&&(n-o)*(r-a)>=(t-o)*(e-a)&&(t-o)*(i-a)>=(s-o)*(r-a)}function gn(n,e,t,r,s,i,o,a){return!(n===o&&e===a)&&pd(n,e,t,r,s,i,o,a)}function d0(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!f0(n,e)&&(_n(n,e)&&_n(e,n)&&p0(n,e)&&(me(n.prev,n,e.prev)||me(n,e.prev,e))||Br(n,e)&&me(n.prev,n,n.next)>0&&me(e.prev,e,e.next)>0)}function me(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Br(n,e){return n.x===e.x&&n.y===e.y}function md(n,e,t,r){const s=Ss(me(n,e,t)),i=Ss(me(n,e,r)),o=Ss(me(t,r,n)),a=Ss(me(t,r,e));return!!(s!==i&&o!==a||s===0&&vs(n,t,e)||i===0&&vs(n,r,e)||o===0&&vs(t,n,r)||a===0&&vs(t,e,r))}function vs(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Ss(n){return n>0?1:n<0?-1:0}function f0(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&md(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function _n(n,e){return me(n.prev,n,n.next)<0?me(n,e,n.next)>=0&&me(n,n.prev,e)>=0:me(n,e,n.prev)<0||me(n,n.next,e)<0}function p0(n,e){let t=n,r=!1;const s=(n.x+e.x)/2,i=(n.y+e.y)/2;do t.y>i!=t.next.y>i&&t.next.y!==t.y&&s<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next;while(t!==n);return r}function gd(n,e){const t=Bo(n.i,n.x,n.y),r=Bo(e.i,e.x,e.y),s=n.next,i=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,r.next=t,t.prev=r,i.next=r,r.prev=i,r}function _d(n,e,t,r){const s=Bo(n,e,t);return r?(s.next=r.next,s.prev=r,r.next.prev=s,r.next=s):(s.prev=s,s.next=s),s}function xn(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Bo(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function m0(n,e,t,r){let s=0;for(let i=e,o=t-r;i<t;i+=r)s+=(n[o]-n[i])*(n[i+1]+n[o+1]),o=i;return s}const xd=dd.default||dd;var Ye=(n=>(n[n.NONE=0]="NONE",n[n.COLOR=16384]="COLOR",n[n.STENCIL=1024]="STENCIL",n[n.DEPTH=256]="DEPTH",n[n.COLOR_DEPTH=16640]="COLOR_DEPTH",n[n.COLOR_STENCIL=17408]="COLOR_STENCIL",n[n.DEPTH_STENCIL=1280]="DEPTH_STENCIL",n[n.ALL=17664]="ALL",n))(Ye||{});class Ro{constructor(e){this.items=[],this._name=e}emit(e,t,r,s,i,o,a,u){const{name:l,items:c}=this;for(let h=0,d=c.length;h<d;h++)c[h][l](e,t,r,s,i,o,a,u);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const g0=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],bd=class Ux extends We{constructor(e){super(),this.tick=0,this.uid=ae("renderer"),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const t=[...g0,...this.config.runners??[]];this._addRunners(...t),this._unsafeEvalCheck()}async init(e={}){const t=e.skipExtensionImports===!0?!0:e.manageImports===!1;await wo(t),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Ux.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,t){this.tick++;let r=e;if(r instanceof ce&&(r={container:r},t&&(L(j,"passing a second argument is deprecated, please use render options instead"),r.target=t.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const s=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=s?r.clearColor:ee.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.visible&&(r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r))}resize(e,t,r){const s=this.view.resolution;this.view.resize(e,t,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==s&&this.runners.resolutionChange.emit(r)}clear(e={}){const t=this;e.target||(e.target=t.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Ye.ALL);const{clear:r,clearColor:s,target:i}=e;ee.shared.setValue(s??this.background.colorRgba),t.renderTarget.clear(i,r,ee.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(t=>{this.runners[t]=new Ro(t)})}_addSystems(e){let t;for(t in e){const r=e[t];this._addSystem(r.value,r.name)}}_addSystem(e,t){const r=new e(this);if(this[t])throw new Error(`Whoops! The name "${t}" is already in use`);this[t]=r,this._systemsHash[t]=r;for(const s in this.runners)this.runners[s].add(r);return this}_addPipes(e,t){const r=t.reduce((s,i)=>(s[i.name]=i.value,s),{});e.forEach(s=>{const i=s.value,o=s.name,a=r[o];this.renderPipes[o]=new i(this,a?new a:null),this.runners.destroy.add(this.renderPipes[o])})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),(e===!0||typeof e=="object"&&e.releaseGlobalResources)&&nr.release(),Object.values(this.runners).forEach(t=>{t.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Eo())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};bd.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let bn=bd,Ts;function yn(n){return Ts!==void 0||(Ts=(()=>{var t;const e={stencil:!0,failIfMajorPerformanceCaveat:n??bn.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Q.get().getWebGLRenderingContext())return!1;let s=Q.get().createCanvas().getContext("webgl",e);const i=!!((t=s==null?void 0:s.getContextAttributes())!=null&&t.stencil);if(s){const o=s.getExtension("WEBGL_lose_context");o&&o.loseContext()}return s=null,i}catch{return!1}})()),Ts}let Cs;async function vn(n={}){return Cs!==void 0||(Cs=await(async()=>{const e=Q.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(n)).requestDevice(),!0}catch{return!1}})()),Cs}const yd=["webgl","webgpu","canvas"];async function vd(n){let e=[];n.preference?(e.push(n.preference),yd.forEach(i=>{i!==n.preference&&e.push(i)})):e=yd.slice();let t,r={};for(let i=0;i<e.length;i++){const o=e[i];if(o==="webgpu"&&await vn()){const{WebGPURenderer:a}=await Promise.resolve().then(()=>Gv);t=a,r={...n,...n.webgpu};break}else if(o==="webgl"&&yn(n.failIfMajorPerformanceCaveat??bn.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Promise.resolve().then(()=>Bv);t=a,r={...n,...n.webgl};break}else if(o==="canvas")throw r={...n},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!t)throw new Error("No available renderer for the current environment");const s=new t;return await s.init(r),s}const _0=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i,Sn="8.15.0";class Do{static init(){var e;(e=globalThis.__PIXI_APP_INIT__)==null||e.call(globalThis,this,Sn)}static destroy(){}}Do.extension=T.Application;class Mo{constructor(e){this._renderer=e}init(){var e;(e=globalThis.__PIXI_RENDERER_INIT__)==null||e.call(globalThis,this._renderer,Sn)}destroy(){this._renderer=null}}Mo.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"initHook",priority:-10};const Sd=class Kl{constructor(...e){this.stage=new ce,e[0]!==void 0&&L(j,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.stage||(this.stage=new ce),this.renderer=await vd(e),Kl._plugins.forEach(t=>{t.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return L(j,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,t=!1){const r=Kl._plugins.slice(0);r.reverse(),r.forEach(s=>{s.destroy.call(this)}),this.stage.destroy(t),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Sd._plugins=[];let Td=Sd;$.handleByList(T.Application,Td._plugins),$.add(Do);class Fo{static init(e){Object.defineProperty(this,"resizeTo",{configurable:!0,set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:s,clientHeight:i}=this._resizeTo;t=s,r=i}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Fo.extension=T.Application;class Uo{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{configurable:!0,set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,St.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?Re.shared:new Re,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Uo.extension=T.Application;class Io extends We{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.applyFillAsTint=!0,this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return L(j,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return L(j,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return L(j,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return L(j,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return L(j,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(e=!1){var t;this.emit("destroy",this),this.removeAllListeners();for(const r in this.chars)(t=this.chars[r].texture)==null||t.destroy();this.chars=null,e&&(this.pages.forEach(r=>r.texture.destroy(!0)),this.pages=null)}}/**
 * tiny-lru
 *
 * @copyright 2026 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 11.4.7
 */class x0{constructor(e=0,t=0,r=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=r,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){const t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){const t=new Array(e.length);for(let r=0;r<e.length;r++){const s=e[r];t[r]=[s,this.get(s)]}return t}evict(e=!1){if(e||this.size>0){const t=this.first;delete this.items[t.key],--this.size===0?(this.first=null,this.last=null):(this.first=t.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){const t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){const e=new Array(this.size);let t=this.first,r=0;for(;t!==null;)e[r++]=t.key,t=t.next;return e}setWithEvicted(e,t,r=this.resetTtl){let s=null;if(this.has(e))this.set(e,t,!0,r);else{this.max>0&&this.size===this.max&&(s={...this.first},this.evict(!0));let i=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=i:this.last.next=i,this.last=i}return s}set(e,t,r=!1,s=this.resetTtl){let i=this.items[e];return r||i!==void 0?(i.value=t,r===!1&&s&&(i.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(i)):(this.max>0&&this.size===this.max&&this.evict(!0),i=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=i:this.last.next=i,this.last=i),this}values(e=this.keys()){const t=new Array(e.length);for(let r=0;r<e.length;r++)t[r]=this.get(e[r]);return t}}function Cd(n=1e3,e=0,t=!1){if(isNaN(n)||n<0)throw new TypeError("Invalid max value");if(isNaN(e)||e<0)throw new TypeError("Invalid ttl value");if(typeof t!="boolean")throw new TypeError("Invalid resetTtl value");return new x0(n,e,t)}const b0=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function Tn(n){const e=typeof n.fontSize=="number"?`${n.fontSize}px`:n.fontSize;let t=n.fontFamily;Array.isArray(n.fontFamily)||(t=n.fontFamily.split(","));for(let r=t.length-1;r>=0;r--){let s=t[r].trim();!/([\"\'])[^\'\"]+\1/.test(s)&&!b0.includes(s)&&(s=`"${s}"`),t[r]=s}return`${n.fontStyle} ${n.fontVariant} ${n.fontWeight} ${e} ${t.join(",")}`}const Oo={willReadFrequently:!0},pt=class V{static get experimentalLetterSpacingSupported(){let e=V._experimentalLetterSpacingSupported;if(e===void 0){const t=Q.get().getCanvasRenderingContext2D().prototype;e=V._experimentalLetterSpacingSupported="letterSpacing"in t||"textLetterSpacing"in t}return e}constructor(e,t,r,s,i,o,a,u,l){this.text=e,this.style=t,this.width=r,this.height=s,this.lines=i,this.lineWidths=o,this.lineHeight=a,this.maxLineWidth=u,this.fontProperties=l}static measureText(e=" ",t,r=V._canvas,s=t.wordWrap){var y;const i=`${e}-${t.styleKey}-wordWrap-${s}`;if(V._measurementCache.has(i))return V._measurementCache.get(i);const o=Tn(t),a=V.measureFont(o);a.fontSize===0&&(a.fontSize=t.fontSize,a.ascent=t.fontSize);const u=V.__context;u.font=o;const c=(s?V._wordWrap(e,t,r):e).split(/(?:\r\n|\r|\n)/),h=new Array(c.length);let d=0;for(let v=0;v<c.length;v++){const C=V._measureText(c[v],t.letterSpacing,u);h[v]=C,d=Math.max(d,C)}const f=((y=t._stroke)==null?void 0:y.width)||0;let g=d+f;t.dropShadow&&(g+=t.dropShadow.distance);const x=t.lineHeight||a.fontSize;let p=Math.max(x,a.fontSize+f)+(c.length-1)*(x+t.leading);t.dropShadow&&(p+=t.dropShadow.distance);const b=new V(e,t,g,p,c,h,x+t.leading,d,a);return V._measurementCache.set(i,b),b}static _measureText(e,t,r){let s=!1;V.experimentalLetterSpacingSupported&&(V.experimentalLetterSpacing?(r.letterSpacing=`${t}px`,r.textLetterSpacing=`${t}px`,s=!0):(r.letterSpacing="0px",r.textLetterSpacing="0px"));const i=r.measureText(e);let o=i.width;const a=-i.actualBoundingBoxLeft;let l=i.actualBoundingBoxRight-a;if(o>0)if(s)o-=t,l-=t;else{const c=(V.graphemeSegmenter(e).length-1)*t;o+=c,l+=c}return Math.max(o,l)}static _wordWrap(e,t,r=V._canvas){const s=r.getContext("2d",Oo);let i=0,o="",a="";const u=Object.create(null),{letterSpacing:l,whiteSpace:c}=t,h=V._collapseSpaces(c),d=V._collapseNewlines(c);let f=!h;const g=t.wordWrapWidth+l,x=V._tokenize(e);for(let p=0;p<x.length;p++){let b=x[p];if(V._isNewline(b)){if(!d){a+=V._addLine(o),f=!h,o="",i=0;continue}b=" "}if(h){const v=V.isBreakingSpace(b),C=V.isBreakingSpace(o[o.length-1]);if(v&&C)continue}const y=V._getFromCache(b,l,u,s);if(y>g)if(o!==""&&(a+=V._addLine(o),o="",i=0),V.canBreakWords(b,t.breakWords)){const v=V.wordWrapSplit(b);for(let C=0;C<v.length;C++){let D=v[C],B=D,w=1;for(;v[C+w];){const A=v[C+w];if(!V.canBreakChars(B,A,b,C,t.breakWords))D+=A;else break;B=A,w++}C+=w-1;const O=V._getFromCache(D,l,u,s);O+i>g&&(a+=V._addLine(o),f=!1,o="",i=0),o+=D,i+=O}}else{o.length>0&&(a+=V._addLine(o),o="",i=0);const v=p===x.length-1;a+=V._addLine(b,!v),f=!1,o="",i=0}else y+i>g&&(f=!1,a+=V._addLine(o),o="",i=0),(o.length>0||!V.isBreakingSpace(b)||f)&&(o+=b,i+=y)}return a+=V._addLine(o,!1),a}static _addLine(e,t=!0){return e=V._trimRight(e),e=t?`${e}
`:e,e}static _getFromCache(e,t,r,s){let i=r[e];return typeof i!="number"&&(i=V._measureText(e,t,s)+t,r[e]=i),i}static _collapseSpaces(e){return e==="normal"||e==="pre-line"}static _collapseNewlines(e){return e==="normal"}static _trimRight(e){if(typeof e!="string")return"";for(let t=e.length-1;t>=0;t--){const r=e[t];if(!V.isBreakingSpace(r))break;e=e.slice(0,-1)}return e}static _isNewline(e){return typeof e!="string"?!1:V._newlines.includes(e.charCodeAt(0))}static isBreakingSpace(e,t){return typeof e!="string"?!1:V._breakingSpaces.includes(e.charCodeAt(0))}static _tokenize(e){const t=[];let r="";if(typeof e!="string")return t;for(let s=0;s<e.length;s++){const i=e[s],o=e[s+1];if(V.isBreakingSpace(i,o)||V._isNewline(i)){r!==""&&(t.push(r),r=""),i==="\r"&&o===`
`?(t.push(`\r
`),s++):t.push(i);continue}r+=i}return r!==""&&t.push(r),t}static canBreakWords(e,t){return t}static canBreakChars(e,t,r,s,i){return!0}static wordWrapSplit(e){return V.graphemeSegmenter(e)}static measureFont(e){if(V._fonts[e])return V._fonts[e];const t=V._context;t.font=e;const r=t.measureText(V.METRICS_STRING+V.BASELINE_SYMBOL),s={ascent:r.actualBoundingBoxAscent,descent:r.actualBoundingBoxDescent,fontSize:r.actualBoundingBoxAscent+r.actualBoundingBoxDescent};return V._fonts[e]=s,s}static clearMetrics(e=""){e?delete V._fonts[e]:V._fonts={}}static get _canvas(){if(!V.__canvas){let e;try{const t=new OffscreenCanvas(0,0),r=t.getContext("2d",Oo);if(r!=null&&r.measureText)return V.__canvas=t,t;e=Q.get().createCanvas()}catch{e=Q.get().createCanvas()}e.width=e.height=10,V.__canvas=e}return V.__canvas}static get _context(){return V.__context||(V.__context=V._canvas.getContext("2d",Oo)),V.__context}};pt.METRICS_STRING="|ÉqÅ",pt.BASELINE_SYMBOL="M",pt.BASELINE_MULTIPLIER=1.4,pt.HEIGHT_MULTIPLIER=2,pt.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const n=new Intl.Segmenter;return e=>{const t=n.segment(e),r=[];let s=0;for(const i of t)r[s++]=i.segment;return r}}return n=>[...n]})(),pt.experimentalLetterSpacing=!1,pt._fonts={},pt._newlines=[10,13],pt._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],pt._measurementCache=Cd(1e3);let Ge=pt;const Ad=[{offset:0,color:"white"},{offset:1,color:"black"}],Go=class Zl{constructor(...e){this.uid=ae("fillGradient"),this._tick=0,this.type="linear",this.colorStops=[];let t=y0(e);t={...t.type==="radial"?Zl.defaultRadialOptions:Zl.defaultLinearOptions,...ht(t)},this._textureSize=t.textureSize,this._wrapMode=t.wrapMode,t.type==="radial"?(this.center=t.center,this.outerCenter=t.outerCenter??this.center,this.innerRadius=t.innerRadius,this.outerRadius=t.outerRadius,this.scale=t.scale,this.rotation=t.rotation):(this.start=t.start,this.end=t.end),this.textureSpace=t.textureSpace,this.type=t.type,t.colorStops.forEach(s=>{this.addColorStop(s.offset,s.color)})}addColorStop(e,t){return this.colorStops.push({offset:e,color:ee.shared.setValue(t).toHexa()}),this}buildLinearGradient(){if(this.texture)return;let{x:e,y:t}=this.start,{x:r,y:s}=this.end,i=r-e,o=s-t;const a=i<0||o<0;if(this._wrapMode==="clamp-to-edge"){if(i<0){const p=e;e=r,r=p,i*=-1}if(o<0){const p=t;t=s,s=p,o*=-1}}const u=this.colorStops.length?this.colorStops:Ad,l=this._textureSize,{canvas:c,context:h}=Ed(l,1),d=a?h.createLinearGradient(this._textureSize,0,0,0):h.createLinearGradient(0,0,this._textureSize,0);wd(d,u),h.fillStyle=d,h.fillRect(0,0,l,1),this.texture=new k({source:new Lt({resource:c,addressMode:this._wrapMode})});const f=Math.sqrt(i*i+o*o),g=Math.atan2(o,i),x=new H;x.scale(f/l,1),x.rotate(g),x.translate(e,t),this.textureSpace==="local"&&x.scale(l,l),this.transform=x}buildGradient(){this.texture||this._tick++,this.type==="linear"?this.buildLinearGradient():this.buildRadialGradient()}buildRadialGradient(){if(this.texture)return;const e=this.colorStops.length?this.colorStops:Ad,t=this._textureSize,{canvas:r,context:s}=Ed(t,t),{x:i,y:o}=this.center,{x:a,y:u}=this.outerCenter,l=this.innerRadius,c=this.outerRadius,h=a-c,d=u-c,f=t/(c*2),g=(i-h)*f,x=(o-d)*f,p=s.createRadialGradient(g,x,l*f,(a-h)*f,(u-d)*f,c*f);wd(p,e),s.fillStyle=e[e.length-1].color,s.fillRect(0,0,t,t),s.fillStyle=p,s.translate(g,x),s.rotate(this.rotation),s.scale(1,this.scale),s.translate(-g,-x),s.fillRect(0,0,t,t),this.texture=new k({source:new Lt({resource:r,addressMode:this._wrapMode})});const b=new H;b.scale(1/f,1/f),b.translate(h,d),this.textureSpace==="local"&&b.scale(t,t),this.transform=b}destroy(){var e;(e=this.texture)==null||e.destroy(!0),this.texture=null,this.transform=null,this.colorStops=[],this.start=null,this.end=null,this.center=null,this.outerCenter=null}get styleKey(){return`fill-gradient-${this.uid}-${this._tick}`}};Go.defaultLinearOptions={start:{x:0,y:0},end:{x:0,y:1},colorStops:[],textureSpace:"local",type:"linear",textureSize:256,wrapMode:"clamp-to-edge"},Go.defaultRadialOptions={center:{x:.5,y:.5},innerRadius:0,outerRadius:.5,colorStops:[],scale:1,textureSpace:"local",type:"radial",textureSize:256,wrapMode:"clamp-to-edge"};let Ct=Go;function wd(n,e){for(let t=0;t<e.length;t++){const r=e[t];n.addColorStop(r.offset,r.color)}}function Ed(n,e){const t=Q.get().createCanvas(n,e),r=t.getContext("2d");return{canvas:t,context:r}}function y0(n){let e=n[0]??{};return(typeof e=="number"||n[1])&&(L("8.5.2","use options object instead"),e={type:"linear",start:{x:n[0],y:n[1]},end:{x:n[2],y:n[3]},textureSpace:n[4],textureSize:n[5]??Ct.defaultLinearOptions.textureSize}),e}const Pd={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};class Cn{constructor(e,t){this.uid=ae("fillPattern"),this._tick=0,this.transform=new H,this.texture=e,this.transform.scale(1/e.frame.width,1/e.frame.height),t&&(e.source.style.addressModeU=Pd[t].addressModeU,e.source.style.addressModeV=Pd[t].addressModeV)}setTransform(e){const t=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/t.frame.width,1/t.frame.height),this._tick++}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this._tick++)}get styleKey(){return`fill-pattern-${this.uid}-${this._tick}`}destroy(){this.texture.destroy(!0),this.texture=null}}var ko,Bd;function v0(){if(Bd)return ko;Bd=1,ko=t;var n={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},e=/([astvzqmhlc])([^astvzqmhlc]*)/ig;function t(i){var o=[];return i.replace(e,function(a,u,l){var c=u.toLowerCase();for(l=s(l),c=="m"&&l.length>2&&(o.push([u].concat(l.splice(0,2))),c="l",u=u=="m"?"l":"L");;){if(l.length==n[c])return l.unshift(u),o.push(l);if(l.length<n[c])throw new Error("malformed path data");o.push([u].concat(l.splice(0,n[c])))}}),o}var r=/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;function s(i){var o=i.match(r);return o?o.map(Number):[]}return ko}var S0=v0();const T0=ic(S0);function Rd(n,e){const t=T0(n),r=[];let s=null,i=0,o=0;for(let a=0;a<t.length;a++){const u=t[a],l=u[0],c=u;switch(l){case"M":i=c[1],o=c[2],e.moveTo(i,o);break;case"m":i+=c[1],o+=c[2],e.moveTo(i,o);break;case"H":i=c[1],e.lineTo(i,o);break;case"h":i+=c[1],e.lineTo(i,o);break;case"V":o=c[1],e.lineTo(i,o);break;case"v":o+=c[1],e.lineTo(i,o);break;case"L":i=c[1],o=c[2],e.lineTo(i,o);break;case"l":i+=c[1],o+=c[2],e.lineTo(i,o);break;case"C":i=c[5],o=c[6],e.bezierCurveTo(c[1],c[2],c[3],c[4],i,o);break;case"c":e.bezierCurveTo(i+c[1],o+c[2],i+c[3],o+c[4],i+c[5],o+c[6]),i+=c[5],o+=c[6];break;case"S":i=c[3],o=c[4],e.bezierCurveToShort(c[1],c[2],i,o);break;case"s":e.bezierCurveToShort(i+c[1],o+c[2],i+c[3],o+c[4]),i+=c[3],o+=c[4];break;case"Q":i=c[3],o=c[4],e.quadraticCurveTo(c[1],c[2],i,o);break;case"q":e.quadraticCurveTo(i+c[1],o+c[2],i+c[3],o+c[4]),i+=c[3],o+=c[4];break;case"T":i=c[1],o=c[2],e.quadraticCurveToShort(i,o);break;case"t":i+=c[1],o+=c[2],e.quadraticCurveToShort(i,o);break;case"A":i=c[6],o=c[7],e.arcToSvg(c[1],c[2],c[3],c[4],c[5],i,o);break;case"a":i+=c[6],o+=c[7],e.arcToSvg(c[1],c[2],c[3],c[4],c[5],i,o);break;case"Z":case"z":e.closePath(),r.length>0&&(s=r.pop(),s?(i=s.startX,o=s.startY):(i=0,o=0)),s=null;break;default:X(`Unknown SVG path command: ${l}`)}l!=="Z"&&l!=="z"&&s===null&&(s={startX:i,startY:o},r.push(s))}return e}class As{constructor(e=0,t=0,r=0){this.type="circle",this.x=e,this.y=t,this.radius=r}clone(){return new As(this.x,this.y,this.radius)}contains(e,t){if(this.radius<=0)return!1;const r=this.radius*this.radius;let s=this.x-e,i=this.y-t;return s*=s,i*=i,s+i<=r}strokeContains(e,t,r,s=.5){if(this.radius===0)return!1;const i=this.x-e,o=this.y-t,a=this.radius,u=(1-s)*r,l=Math.sqrt(i*i+o*o);return l<=a+u&&l>a-(r-u)}getBounds(e){return e||(e=new ne),e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}toString(){return`[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`}}class ws{constructor(e=0,t=0,r=0,s=0){this.type="ellipse",this.x=e,this.y=t,this.halfWidth=r,this.halfHeight=s}clone(){return new ws(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,t){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let r=(e-this.x)/this.halfWidth,s=(t-this.y)/this.halfHeight;return r*=r,s*=s,r+s<=1}strokeContains(e,t,r,s=.5){const{halfWidth:i,halfHeight:o}=this;if(i<=0||o<=0)return!1;const a=r*(1-s),u=r-a,l=i-u,c=o-u,h=i+a,d=o+a,f=e-this.x,g=t-this.y,x=f*f/(l*l)+g*g/(c*c),p=f*f/(h*h)+g*g/(d*d);return x>1&&p<=1}getBounds(e){return e||(e=new ne),e.x=this.x-this.halfWidth,e.y=this.y-this.halfHeight,e.width=this.halfWidth*2,e.height=this.halfHeight*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}toString(){return`[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`}}function An(n,e,t,r,s,i){const o=n-t,a=e-r,u=s-t,l=i-r,c=o*u+a*l,h=u*u+l*l;let d=-1;h!==0&&(d=c/h);let f,g;d<0?(f=t,g=r):d>1?(f=s,g=i):(f=t+d*u,g=r+d*l);const x=n-f,p=e-g;return x*x+p*p}let C0,A0;class Rr{constructor(...e){this.type="polygon";let t=Array.isArray(e[0])?e[0]:e;if(typeof t[0]!="number"){const r=[];for(let s=0,i=t.length;s<i;s++)r.push(t[s].x,t[s].y);t=r}this.points=t,this.closePath=!0}isClockwise(){let e=0;const t=this.points,r=t.length;for(let s=0;s<r;s+=2){const i=t[s],o=t[s+1],a=t[(s+2)%r],u=t[(s+3)%r];e+=(a-i)*(u+o)}return e<0}containsPolygon(e){const t=this.getBounds(C0),r=e.getBounds(A0);if(!t.containsRect(r))return!1;const s=e.points;for(let i=0;i<s.length;i+=2){const o=s[i],a=s[i+1];if(!this.contains(o,a))return!1}return!0}clone(){const e=this.points.slice(),t=new Rr(e);return t.closePath=this.closePath,t}contains(e,t){let r=!1;const s=this.points.length/2;for(let i=0,o=s-1;i<s;o=i++){const a=this.points[i*2],u=this.points[i*2+1],l=this.points[o*2],c=this.points[o*2+1];u>t!=c>t&&e<(l-a)*((t-u)/(c-u))+a&&(r=!r)}return r}strokeContains(e,t,r,s=.5){const i=r*r,o=i*(1-s),a=i-o,{points:u}=this,l=u.length-(this.closePath?0:2);for(let c=0;c<l;c+=2){const h=u[c],d=u[c+1],f=u[(c+2)%u.length],g=u[(c+3)%u.length],x=An(e,t,h,d,f,g),p=Math.sign((f-h)*(t-d)-(g-d)*(e-h));if(x<=(p<0?a:o))return!0}return!1}getBounds(e){e||(e=new ne);const t=this.points;let r=1/0,s=-1/0,i=1/0,o=-1/0;for(let a=0,u=t.length;a<u;a+=2){const l=t[a],c=t[a+1];r=l<r?l:r,s=l>s?l:s,i=c<i?c:i,o=c>o?c:o}return e.x=r,e.width=s-r,e.y=i,e.height=o-i,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}toString(){return`[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((e,t)=>`${e}, ${t}`,"")}]`}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return L("8.11.0","Polygon.lastX is deprecated, please use Polygon.lastX instead."),this.points[this.points.length-2]}get y(){return L("8.11.0","Polygon.y is deprecated, please use Polygon.lastY instead."),this.points[this.points.length-1]}get startX(){return this.points[0]}get startY(){return this.points[1]}}const Es=(n,e,t,r,s,i,o)=>{const a=n-t,u=e-r,l=Math.sqrt(a*a+u*u);return l>=s-i&&l<=s+o};class Ps{constructor(e=0,t=0,r=0,s=0,i=20){this.type="roundedRectangle",this.x=e,this.y=t,this.width=r,this.height=s,this.radius=i}getBounds(e){return e||(e=new ne),e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new Ps(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&t>=this.y&&t<=this.y+this.height){const r=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(t>=this.y+r&&t<=this.y+this.height-r||e>=this.x+r&&e<=this.x+this.width-r)return!0;let s=e-(this.x+r),i=t-(this.y+r);const o=r*r;if(s*s+i*i<=o||(s=e-(this.x+this.width-r),s*s+i*i<=o)||(i=t-(this.y+this.height-r),s*s+i*i<=o)||(s=e-(this.x+r),s*s+i*i<=o))return!0}return!1}strokeContains(e,t,r,s=.5){const{x:i,y:o,width:a,height:u,radius:l}=this,c=r*(1-s),h=r-c,d=i+l,f=o+l,g=a-l*2,x=u-l*2,p=i+a,b=o+u;return(e>=i-c&&e<=i+h||e>=p-h&&e<=p+c)&&t>=f&&t<=f+x||(t>=o-c&&t<=o+h||t>=b-h&&t<=b+c)&&e>=d&&e<=d+g?!0:e<d&&t<f&&Es(e,t,d,f,l,h,c)||e>p-l&&t<f&&Es(e,t,p-l,f,l,h,c)||e>p-l&&t>b-l&&Es(e,t,p-l,b-l,l,h,c)||e<d&&t>b-l&&Es(e,t,d,b-l,l,h,c)}toString(){return`[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`}}const Dd={};function Bs(n,e,t){let r=2166136261;for(let s=0;s<e;s++)r^=n[s].uid,r=Math.imul(r,16777619),r>>>=0;return Dd[r]||w0(n,e,r,t)}function w0(n,e,t,r){const s={};let i=0;for(let a=0;a<r;a++){const u=a<e?n[a]:k.EMPTY.source;s[i++]=u.source,s[i++]=u.style}const o=new Tt(s);return Dd[t]=o,o}class ir{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this.uint32View=null,this.float32View=null,this.uint16View=null,this._int8View=null,this._uint8View=null,this._int16View=null,this._int32View=null,this._float64Array=null,this._bigUint64Array=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function Rs(n,e){const t=n.byteLength/8|0,r=new Float64Array(n,0,t);new Float64Array(e,0,t).set(r);const i=n.byteLength-t*8;if(i>0){const o=new Uint8Array(n,t*8,i);new Uint8Array(e,t*8,i).set(o)}}const Md={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var ve=(n=>(n[n.DISABLED=0]="DISABLED",n[n.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",n[n.MASK_ACTIVE=2]="MASK_ACTIVE",n[n.INVERSE_MASK_ACTIVE=3]="INVERSE_MASK_ACTIVE",n[n.RENDERING_MASK_REMOVE=4]="RENDERING_MASK_REMOVE",n[n.NONE=5]="NONE",n))(ve||{});function Dr(n,e){return e.alphaMode==="no-premultiply-alpha"&&Md[n]||n}const E0=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function P0(n){let e="";for(let t=0;t<n;++t)t>0&&(e+=`
else `),t<n-1&&(e+=`if(test == ${t}.0){}`);return e}function Lo(n,e){if(n===0)throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");const t=e.createShader(e.FRAGMENT_SHADER);try{for(;;){const r=E0.replace(/%forloop%/gi,P0(n));if(e.shaderSource(t,r),e.compileShader(t),!e.getShaderParameter(t,e.COMPILE_STATUS))n=n/2|0;else break}}finally{e.deleteShader(t)}return n}let Mr=null;function Fd(){var e;if(Mr)return Mr;const n=mo();return Mr=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),Mr=Lo(Mr,n),(e=n.getExtension("WEBGL_lose_context"))==null||e.loseContext(),Mr}class Ud{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){const t=this.textures[e];this.textures[e]=null,this.ids[t.uid]=null}this.count=0}}class Id{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.textures=new Ud,this.blendMode="normal",this.topology="triangle-strip",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}const wn=[];let Ds=0;nr.register({clear:()=>{if(wn.length>0)for(const n of wn)n&&n.destroy();wn.length=0,Ds=0}});function Od(){return Ds>0?wn[--Ds]:new Id}function Gd(n){wn[Ds++]=n}let En=0;const kd=class Ix{constructor(e){this.uid=ae("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._elements=[],e={...Ix.defaultOptions,...e},e.maxTextures||(L("v8.8.0","maxTextures is a required option for Batcher now, please pass it in the options"),e.maxTextures=Fd());const{maxTextures:t,attributesInitialSize:r,indicesInitialSize:s}=e;this.attributeBuffer=new ir(r*4),this.indexBuffer=new Uint16Array(s),this.maxTextures=t}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let e=0;e<this.batchIndex;e++)Gd(this.batches[e]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e._indexStart=this.indexSize,e._attributeStart=this.attributeSize,e._batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.attributeSize*this.vertexSize}checkAndUpdateTexture(e,t){const r=e._batch.textures.ids[t._source.uid];return!r&&r!==0?!1:(e._textureId=r,e.texture=t,!0)}updateElement(e){this.dirty=!0;const t=this.attributeBuffer;e.packAsQuad?this.packQuadAttributes(e,t.float32View,t.uint32View,e._attributeStart,e._textureId):this.packAttributes(e,t.float32View,t.uint32View,e._attributeStart,e._textureId)}break(e){const t=this._elements;if(!t[this.elementStart])return;let r=Od(),s=r.textures;s.clear();const i=t[this.elementStart];let o=Dr(i.blendMode,i.texture._source),a=i.topology;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const u=this.attributeBuffer.float32View,l=this.attributeBuffer.uint32View,c=this.indexBuffer;let h=this._batchIndexSize,d=this._batchIndexStart,f="startBatch";const g=this.maxTextures;for(let x=this.elementStart;x<this.elementSize;++x){const p=t[x];t[x]=null;const y=p.texture._source,v=Dr(p.blendMode,y),C=o!==v||a!==p.topology;if(y._batchTick===En&&!C){p._textureId=y._textureBindLocation,h+=p.indexSize,p.packAsQuad?(this.packQuadAttributes(p,u,l,p._attributeStart,p._textureId),this.packQuadIndex(c,p._indexStart,p._attributeStart/this.vertexSize)):(this.packAttributes(p,u,l,p._attributeStart,p._textureId),this.packIndex(p,c,p._indexStart,p._attributeStart/this.vertexSize)),p._batch=r;continue}y._batchTick=En,(s.count>=g||C)&&(this._finishBatch(r,d,h-d,s,o,a,e,f),f="renderBatch",d=h,o=v,a=p.topology,r=Od(),s=r.textures,s.clear(),++En),p._textureId=y._textureBindLocation=s.count,s.ids[y.uid]=s.count,s.textures[s.count++]=y,p._batch=r,h+=p.indexSize,p.packAsQuad?(this.packQuadAttributes(p,u,l,p._attributeStart,p._textureId),this.packQuadIndex(c,p._indexStart,p._attributeStart/this.vertexSize)):(this.packAttributes(p,u,l,p._attributeStart,p._textureId),this.packIndex(p,c,p._indexStart,p._attributeStart/this.vertexSize))}s.count>0&&(this._finishBatch(r,d,h-d,s,o,a,e,f),d=h,++En),this.elementStart=this.elementSize,this._batchIndexStart=d,this._batchIndexSize=h}_finishBatch(e,t,r,s,i,o,a,u){e.gpuBindGroup=null,e.bindGroup=null,e.action=u,e.batcher=this,e.textures=s,e.blendMode=i,e.topology=o,e.start=t,e.size=r,++En,this.batches[this.batchIndex++]=e,a.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<=this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const t=Math.max(e,this.attributeBuffer.size*2),r=new ir(t);Rs(this.attributeBuffer.rawBinaryData,r.rawBinaryData),this.attributeBuffer=r}_resizeIndexBuffer(e){const t=this.indexBuffer;let r=Math.max(e,t.length*1.5);r+=r%2;const s=r>65535?new Uint32Array(r):new Uint16Array(r);if(s.BYTES_PER_ELEMENT!==t.BYTES_PER_ELEMENT)for(let i=0;i<t.length;i++)s[i]=t[i];else Rs(t.buffer,s.buffer);this.indexBuffer=s}packQuadIndex(e,t,r){e[t]=r+0,e[t+1]=r+1,e[t+2]=r+2,e[t+3]=r+0,e[t+4]=r+2,e[t+5]=r+3}packIndex(e,t,r,s){const i=e.indices,o=e.indexSize,a=e.indexOffset,u=e.attributeOffset;for(let l=0;l<o;l++)t[r++]=s+i[l+a]-u}destroy(e={}){var t;if(this.batches!==null){for(let r=0;r<this.batchIndex;r++)Gd(this.batches[r]);this.batches=null,this.geometry.destroy(!0),this.geometry=null,e.shader&&((t=this.shader)==null||t.destroy(),this.shader=null);for(let r=0;r<this._elements.length;r++)this._elements[r]&&(this._elements[r]._batch=null);this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}};kd.defaultOptions={maxTextures:null,attributesInitialSize:4,indicesInitialSize:6};let Ld=kd;var te=(n=>(n[n.MAP_READ=1]="MAP_READ",n[n.MAP_WRITE=2]="MAP_WRITE",n[n.COPY_SRC=4]="COPY_SRC",n[n.COPY_DST=8]="COPY_DST",n[n.INDEX=16]="INDEX",n[n.VERTEX=32]="VERTEX",n[n.UNIFORM=64]="UNIFORM",n[n.STORAGE=128]="STORAGE",n[n.INDIRECT=256]="INDIRECT",n[n.QUERY_RESOLVE=512]="QUERY_RESOLVE",n[n.STATIC=1024]="STATIC",n))(te||{});class qe extends We{constructor(e){let{data:t,size:r}=e;const{usage:s,label:i,shrinkToFit:o}=e;super(),this._gpuData=Object.create(null),this._gcLastUsed=-1,this.autoGarbageCollect=!0,this.uid=ae("buffer"),this._resourceType="buffer",this._resourceId=ae("resource"),this._touched=0,this._updateID=1,this._dataInt32=null,this.shrinkToFit=!0,this.destroyed=!1,t instanceof Array&&(t=new Float32Array(t)),this._data=t,r??(r=t==null?void 0:t.byteLength);const a=!!t;this.descriptor={size:r,usage:s,mappedAtCreation:a,label:i},this.shrinkToFit=o??!0}get data(){return this._data}set data(e){this.setDataWithSize(e,e.length,!0)}get dataInt32(){return this._dataInt32||(this._dataInt32=new Int32Array(this.data.buffer)),this._dataInt32}get static(){return!!(this.descriptor.usage&te.STATIC)}set static(e){e?this.descriptor.usage|=te.STATIC:this.descriptor.usage&=~te.STATIC}setDataWithSize(e,t,r){if(this._updateID++,this._updateSize=t*e.BYTES_PER_ELEMENT,this._data===e){r&&this.emit("update",this);return}const s=this._data;if(this._data=e,this._dataInt32=null,!s||s.length!==e.length){!this.shrinkToFit&&s&&e.byteLength<s.byteLength?r&&this.emit("update",this):(this.descriptor.size=e.byteLength,this._resourceId=ae("resource"),this.emit("change",this));return}r&&this.emit("update",this)}update(e){this._updateSize=e??this._updateSize,this._updateID++,this.emit("update",this)}unload(){var e;this.emit("unload",this);for(const t in this._gpuData)(e=this._gpuData[t])==null||e.destroy();this._gpuData=Object.create(null)}destroy(){this.destroyed=!0,this.unload(),this.emit("destroy",this),this.emit("change",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}function No(n,e){if(!(n instanceof qe)){let t=e?te.INDEX:te.VERTEX;n instanceof Array&&(e?(n=new Uint32Array(n),t=te.INDEX|te.COPY_DST):(n=new Float32Array(n),t=te.VERTEX|te.COPY_DST)),n=new qe({data:n,label:e?"index-mesh-buffer":"vertex-mesh-buffer",usage:t})}return n}function Nd(n,e,t){const r=n.getAttribute(e);if(!r)return t.minX=0,t.minY=0,t.maxX=0,t.maxY=0,t;const s=r.buffer.data;let i=1/0,o=1/0,a=-1/0,u=-1/0;const l=s.BYTES_PER_ELEMENT,c=(r.offset||0)/l,h=(r.stride||8)/l;for(let d=c;d<s.length;d+=h){const f=s[d],g=s[d+1];f>a&&(a=f),g>u&&(u=g),f<i&&(i=f),g<o&&(o=g)}return t.minX=i,t.minY=o,t.maxX=a,t.maxY=u,t}function B0(n){return(n instanceof qe||Array.isArray(n)||n.BYTES_PER_ELEMENT)&&(n={buffer:n}),n.buffer=No(n.buffer,!1),n}class or extends We{constructor(e={}){super(),this._gpuData=Object.create(null),this.autoGarbageCollect=!0,this._gcLastUsed=-1,this.uid=ae("geometry"),this._layoutKey=0,this.instanceCount=1,this._bounds=new Be,this._boundsDirty=!0;const{attributes:t,indexBuffer:r,topology:s}=e;if(this.buffers=[],this.attributes={},t)for(const i in t)this.addAttribute(i,t[i]);this.instanceCount=e.instanceCount??1,r&&this.addIndex(r),this.topology=s||"triangle-list"}onBufferUpdate(){this._boundsDirty=!0,this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const t=this.attributes[e];return t.buffer.data.length/(t.stride/4||t.size)}return 0}addAttribute(e,t){const r=B0(t);this.buffers.indexOf(r.buffer)===-1&&(this.buffers.push(r.buffer),r.buffer.on("update",this.onBufferUpdate,this),r.buffer.on("change",this.onBufferUpdate,this)),this.attributes[e]=r}addIndex(e){this.indexBuffer=No(e,!0),this.buffers.push(this.indexBuffer)}get bounds(){return this._boundsDirty?(this._boundsDirty=!1,Nd(this,"aPosition",this._bounds)):this._bounds}unload(){var e;this.emit("unload",this);for(const t in this._gpuData)(e=this._gpuData[t])==null||e.destroy();this._gpuData=Object.create(null)}destroy(e=!1){var t;this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(r=>r.destroy()),this.unload(),(t=this.indexBuffer)==null||t.destroy(),this.attributes=null,this.buffers=null,this.indexBuffer=null,this._bounds=null}}const R0=new Float32Array(1),D0=new Uint32Array(1);class zd extends or{constructor(){const t=new qe({data:R0,label:"attribute-batch-buffer",usage:te.VERTEX|te.COPY_DST,shrinkToFit:!1}),r=new qe({data:D0,label:"index-batch-buffer",usage:te.INDEX|te.COPY_DST,shrinkToFit:!1}),s=24;super({attributes:{aPosition:{buffer:t,format:"float32x2",stride:s,offset:0},aUV:{buffer:t,format:"float32x2",stride:s,offset:8},aColor:{buffer:t,format:"unorm8x4",stride:s,offset:16},aTextureIdAndRound:{buffer:t,format:"uint16x2",stride:s,offset:20}},indexBuffer:r})}}function zo(n,e,t){if(n)for(const r in n){const s=r.toLocaleLowerCase(),i=e[s];if(i){let o=n[r];r==="header"&&(o=o.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),t&&i.push(`//----${t}----//`),i.push(o)}else X(`${r} placement hook does not exist in shader`)}}const M0=/\{\{(.*?)\}\}/g;function Ho(n){var r;const e={};return(((r=n.match(M0))==null?void 0:r.map(s=>s.replace(/[{()}]/g,"")))??[]).forEach(s=>{e[s]=[]}),e}function Hd(n,e){let t;const r=/@in\s+([^;]+);/g;for(;(t=r.exec(n))!==null;)e.push(t[1])}function Vo(n,e,t=!1){const r=[];Hd(e,r),n.forEach(a=>{a.header&&Hd(a.header,r)});const s=r;t&&s.sort();const i=s.map((a,u)=>`       @location(${u}) ${a},`).join(`
`);let o=e.replace(/@in\s+[^;]+;\s*/g,"");return o=o.replace("{{in}}",`
${i}
`),o}function Vd(n,e){let t;const r=/@out\s+([^;]+);/g;for(;(t=r.exec(n))!==null;)e.push(t[1])}function F0(n){const t=/\b(\w+)\s*:/g.exec(n);return t?t[1]:""}function U0(n){const e=/@.*?\s+/g;return n.replace(e,"")}function Wd(n,e){const t=[];Vd(e,t),n.forEach(u=>{u.header&&Vd(u.header,t)});let r=0;const s=t.sort().map(u=>u.indexOf("builtin")>-1?u:`@location(${r++}) ${u}`).join(`,
`),i=t.sort().map(u=>`       var ${U0(u)};`).join(`
`),o=`return VSOutput(
            ${t.sort().map(u=>` ${F0(u)}`).join(`,
`)});`;let a=e.replace(/@out\s+[^;]+;\s*/g,"");return a=a.replace("{{struct}}",`
${s}
`),a=a.replace("{{start}}",`
${i}
`),a=a.replace("{{return}}",`
${o}
`),a}function Wo(n,e){let t=n;for(const r in e){const s=e[r];s.join(`
`).length?t=t.replace(`{{${r}}}`,`//-----${r} START-----//
${s.join(`
`)}
//----${r} FINISH----//`):t=t.replace(`{{${r}}}`,"")}return t}const zt=Object.create(null),Xo=new Map;let I0=0;function Xd({template:n,bits:e}){const t=Yd(n,e);if(zt[t])return zt[t];const{vertex:r,fragment:s}=O0(n,e);return zt[t]=qd(r,s,e),zt[t]}function $d({template:n,bits:e}){const t=Yd(n,e);return zt[t]||(zt[t]=qd(n.vertex,n.fragment,e)),zt[t]}function O0(n,e){const t=e.map(o=>o.vertex).filter(o=>!!o),r=e.map(o=>o.fragment).filter(o=>!!o);let s=Vo(t,n.vertex,!0);s=Wd(t,s);const i=Vo(r,n.fragment,!0);return{vertex:s,fragment:i}}function Yd(n,e){return e.map(t=>(Xo.has(t)||Xo.set(t,I0++),Xo.get(t))).sort((t,r)=>t-r).join("-")+n.vertex+n.fragment}function qd(n,e,t){const r=Ho(n),s=Ho(e);return t.forEach(i=>{zo(i.vertex,r,i.name),zo(i.fragment,s,i.name)}),{vertex:Wo(n,r),fragment:Wo(e,s)}}const jd=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}

        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);

        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,Kd=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;

    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {

        {{start}}

        var outColor:vec4<f32>;

        {{main}}

        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,Zd=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;

        {{start}}

        vColor = vec4(1.);

        {{main}}

        vUV = uv;

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,Qd=`

    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {

        {{start}}

        vec4 outColor;

        {{main}}

        finalColor = outColor * vColor;

        {{end}}
    }
`,Jd={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},G0={name:"global-uniforms-ubo-bit",vertex:{header:`
          uniform globalUniforms {
            mat3 uProjectionMatrix;
            mat3 uWorldTransformMatrix;
            vec4 uWorldColorAlpha;
            vec2 uResolution;
          };
        `}},ef={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function Fr({bits:n,name:e}){const t=Xd({template:{fragment:Kd,vertex:jd},bits:[Jd,...n]});return pe.from({name:e,vertex:{source:t.vertex,entryPoint:"main"},fragment:{source:t.fragment,entryPoint:"main"}})}function Ur({bits:n,name:e}){return new be({name:e,...$d({template:{vertex:Zd,fragment:Qd},bits:[ef,...n]})})}const Ms={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},Fs={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},$o={};function k0(n){const e=[];if(n===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let r=0;r<n;r++)e.push(`@group(1) @binding(${t++}) var textureSource${r+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${r+1}: sampler;`)}return e.join(`
`)}function L0(n){const e=[];if(n===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let t=0;t<n;t++)t===n-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function Us(n){return $o[n]||($o[n]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${k0(n)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${L0(n)}
            `}}),$o[n]}const Yo={};function N0(n){const e=[];for(let t=0;t<n;t++)t>0&&e.push("else"),t<n-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uTextures[${t}], vUV);`),e.push("}");return e.join(`
`)}function Is(n){return Yo[n]||(Yo[n]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${n}];

            `,main:`

                ${N0(n)}
            `}}),Yo[n]}const Ir={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},Or={name:"round-pixels-bit",vertex:{header:`
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},tf={};function Os(n){let e=tf[n];if(e)return e;const t=new Int32Array(n);for(let r=0;r<n;r++)t[r]=r;return e=tf[n]=new Ce({uTextures:{value:t,type:"i32",size:n}},{isStatic:!0}),e}class qo extends nt{constructor(e){const t=Ur({name:"batch",bits:[Fs,Is(e),Or]}),r=Fr({name:"batch",bits:[Ms,Us(e),Ir]});super({glProgram:t,gpuProgram:r,resources:{batchSamplers:Os(e)}}),this.maxTextures=e}}let Pn=null;const rf=class Ox extends Ld{constructor(e){super(e),this.geometry=new zd,this.name=Ox.extension.name,this.vertexSize=6,Pn??(Pn=new qo(e.maxTextures)),this.shader=Pn}packAttributes(e,t,r,s,i){const o=i<<16|e.roundPixels&65535,a=e.transform,u=a.a,l=a.b,c=a.c,h=a.d,d=a.tx,f=a.ty,{positions:g,uvs:x}=e,p=e.color,b=e.attributeOffset,y=b+e.attributeSize;for(let v=b;v<y;v++){const C=v*2,D=g[C],B=g[C+1];t[s++]=u*D+c*B+d,t[s++]=h*B+l*D+f,t[s++]=x[C],t[s++]=x[C+1],r[s++]=p,r[s++]=o}}packQuadAttributes(e,t,r,s,i){const o=e.texture,a=e.transform,u=a.a,l=a.b,c=a.c,h=a.d,d=a.tx,f=a.ty,g=e.bounds,x=g.maxX,p=g.minX,b=g.maxY,y=g.minY,v=o.uvs,C=e.color,D=i<<16|e.roundPixels&65535;t[s+0]=u*p+c*y+d,t[s+1]=h*y+l*p+f,t[s+2]=v.x0,t[s+3]=v.y0,r[s+4]=C,r[s+5]=D,t[s+6]=u*x+c*y+d,t[s+7]=h*y+l*x+f,t[s+8]=v.x1,t[s+9]=v.y1,r[s+10]=C,r[s+11]=D,t[s+12]=u*x+c*b+d,t[s+13]=h*b+l*x+f,t[s+14]=v.x2,t[s+15]=v.y2,r[s+16]=C,r[s+17]=D,t[s+18]=u*p+c*b+d,t[s+19]=h*b+l*p+f,t[s+20]=v.x3,t[s+21]=v.y3,r[s+22]=C,r[s+23]=D}_updateMaxTextures(e){this.shader.maxTextures!==e&&(Pn=new qo(e),this.shader=Pn)}destroy(){this.shader=null,super.destroy()}};rf.extension={type:[T.Batcher],name:"default"};let Gs=rf;class je{constructor(e){this.items=Object.create(null);const{renderer:t,type:r,onUnload:s,priority:i,name:o}=e;this._renderer=t,t.gc.addResourceHash(this,"items",r,i??0),this._onUnload=s,this.name=o}add(e){return this.items[e.uid]?!1:(this.items[e.uid]=e,e.once("unload",this.remove,this),e._gcLastUsed=this._renderer.gc.now,!0)}remove(e,...t){var s;if(!this.items[e.uid])return;const r=e._gpuData[this._renderer.uid];r&&((s=this._onUnload)==null||s.call(this,e,...t),r.destroy(),e._gpuData[this._renderer.uid]=null,this.items[e.uid]=null)}removeAll(...e){Object.values(this.items).forEach(t=>t&&this.remove(t,...e))}destroy(...e){this.removeAll(...e),this.items=Object.create(null),this._renderer=null,this._onUnload=null}}function jo(n,e,t,r,s,i,o,a=null){let u=0;t*=e,s*=i;const l=a.a,c=a.b,h=a.c,d=a.d,f=a.tx,g=a.ty;for(;u<o;){const x=n[t],p=n[t+1];r[s]=l*x+h*p+f,r[s+1]=c*x+d*p+g,s+=i,t+=e,u++}}function Ko(n,e,t,r){let s=0;for(e*=t;s<r;)n[e]=0,n[e+1]=0,e+=t,s++}function ks(n,e,t,r,s){const i=e.a,o=e.b,a=e.c,u=e.d,l=e.tx,c=e.ty;t||(t=0),r||(r=2),s||(s=n.length/r-t);let h=t*r;for(let d=0;d<s;d++){const f=n[h],g=n[h+1];n[h]=i*f+a*g+l,n[h+1]=o*f+u*g+c,h+=r}}const z0=new H;class Ls{constructor(){this.packAsQuad=!1,this.batcherName="default",this.topology="triangle-list",this.applyTransform=!0,this.roundPixels=0,this._batcher=null,this._batch=null}get uvs(){return this.geometryData.uvs}get positions(){return this.geometryData.vertices}get indices(){return this.geometryData.indices}get blendMode(){return this.renderable&&this.applyTransform?this.renderable.groupBlendMode:"normal"}get color(){const e=this.baseColor,t=e>>16|e&65280|(e&255)<<16,r=this.renderable;return r?Ki(t,r.groupColor)+(this.alpha*r.groupAlpha*255<<24):t+(this.alpha*255<<24)}get transform(){var e;return((e=this.renderable)==null?void 0:e.groupTransform)||z0}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.attributeOffset=this.attributeOffset,e.attributeSize=this.attributeSize,e.baseColor=this.baseColor,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData,e.topology=this.topology}reset(){this.applyTransform=!0,this.renderable=null,this.topology="triangle-list"}destroy(){this.renderable=null,this.texture=null,this.geometryData=null,this._batcher=null,this._batch=null}}const Gr={extension:{type:T.ShapeBuilder,name:"circle"},build(n,e){let t,r,s,i,o,a;if(n.type==="circle"){const C=n;if(o=a=C.radius,o<=0)return!1;t=C.x,r=C.y,s=i=0}else if(n.type==="ellipse"){const C=n;if(o=C.halfWidth,a=C.halfHeight,o<=0||a<=0)return!1;t=C.x,r=C.y,s=i=0}else{const C=n,D=C.width/2,B=C.height/2;t=C.x+D,r=C.y+B,o=a=Math.max(0,Math.min(C.radius,Math.min(D,B))),s=D-o,i=B-a}if(s<0||i<0)return!1;const u=Math.ceil(2.3*Math.sqrt(o+a)),l=u*8+(s?4:0)+(i?4:0);if(l===0)return!1;if(u===0)return e[0]=e[6]=t+s,e[1]=e[3]=r+i,e[2]=e[4]=t-s,e[5]=e[7]=r-i,!0;let c=0,h=u*4+(s?2:0)+2,d=h,f=l,g=s+o,x=i,p=t+g,b=t-g,y=r+x;if(e[c++]=p,e[c++]=y,e[--h]=y,e[--h]=b,i){const C=r-x;e[d++]=b,e[d++]=C,e[--f]=C,e[--f]=p}for(let C=1;C<u;C++){const D=Math.PI/2*(C/u),B=s+Math.cos(D)*o,w=i+Math.sin(D)*a,O=t+B,A=t-B,E=r+w,R=r-w;e[c++]=O,e[c++]=E,e[--h]=E,e[--h]=A,e[d++]=A,e[d++]=R,e[--f]=R,e[--f]=O}g=s,x=i+a,p=t+g,b=t-g,y=r+x;const v=r-x;return e[c++]=p,e[c++]=y,e[--f]=v,e[--f]=p,s&&(e[c++]=b,e[c++]=y,e[--f]=v,e[--f]=b),!0},triangulate(n,e,t,r,s,i){if(n.length===0)return;let o=0,a=0;for(let c=0;c<n.length;c+=2)o+=n[c],a+=n[c+1];o/=n.length/2,a/=n.length/2;let u=r;e[u*t]=o,e[u*t+1]=a;const l=u++;for(let c=0;c<n.length;c+=2)e[u*t]=n[c],e[u*t+1]=n[c+1],c>0&&(s[i++]=u,s[i++]=l,s[i++]=u-1),u++;s[i++]=l+1,s[i++]=l,s[i++]=u-1}},nf={...Gr,extension:{...Gr.extension,name:"ellipse"}},sf={...Gr,extension:{...Gr.extension,name:"roundedRectangle"}},Zo=1e-4,Qo=1e-4;function of(n){const e=n.length;if(e<6)return 1;let t=0;for(let r=0,s=n[e-2],i=n[e-1];r<e;r+=2){const o=n[r],a=n[r+1];t+=(o-s)*(a+i),s=o,i=a}return t<0?-1:1}function af(n,e,t,r,s,i,o,a){const u=n-t*s,l=e-r*s,c=n+t*i,h=e+r*i;let d,f;o?(d=r,f=-t):(d=-r,f=t);const g=u+d,x=l+f,p=c+d,b=h+f;return a.push(g,x),a.push(p,b),2}function ar(n,e,t,r,s,i,o,a){const u=t-n,l=r-e;let c=Math.atan2(u,l),h=Math.atan2(s-n,i-e);a&&c<h?c+=Math.PI*2:!a&&c>h&&(h+=Math.PI*2);let d=c;const f=h-c,g=Math.abs(f),x=Math.sqrt(u*u+l*l),p=(15*g*Math.sqrt(x)/Math.PI>>0)+1,b=f/p;if(d+=b,a){o.push(n,e),o.push(t,r);for(let y=1,v=d;y<p;y++,v+=b)o.push(n,e),o.push(n+Math.sin(v)*x,e+Math.cos(v)*x);o.push(n,e),o.push(s,i)}else{o.push(t,r),o.push(n,e);for(let y=1,v=d;y<p;y++,v+=b)o.push(n+Math.sin(v)*x,e+Math.cos(v)*x),o.push(n,e);o.push(s,i),o.push(n,e)}return p*2}function uf(n,e,t,r,s,i){const o=Zo;if(n.length===0)return;const a=e;let u=a.alignment;if(e.alignment!==.5){let N=of(n);t&&(N*=-1),u=(u-.5)*N+.5}const l=new ie(n[0],n[1]),c=new ie(n[n.length-2],n[n.length-1]),h=r,d=Math.abs(l.x-c.x)<o&&Math.abs(l.y-c.y)<o;if(h){n=n.slice(),d&&(n.pop(),n.pop(),c.set(n[n.length-2],n[n.length-1]));const N=(l.x+c.x)*.5,oe=(c.y+l.y)*.5;n.unshift(N,oe),n.push(N,oe)}const f=s,g=n.length/2;let x=n.length;const p=f.length/2,b=a.width/2,y=b*b,v=a.miterLimit*a.miterLimit;let C=n[0],D=n[1],B=n[2],w=n[3],O=0,A=0,E=-(D-w),R=C-B,F=0,I=0,z=Math.sqrt(E*E+R*R);E/=z,R/=z,E*=b,R*=b;const Y=u,U=(1-Y)*2,M=Y*2;h||(a.cap==="round"?x+=ar(C-E*(U-M)*.5,D-R*(U-M)*.5,C-E*U,D-R*U,C+E*M,D+R*M,f,!0)+2:a.cap==="square"&&(x+=af(C,D,E,R,U,M,!0,f))),f.push(C-E*U,D-R*U),f.push(C+E*M,D+R*M);for(let N=1;N<g-1;++N){C=n[(N-1)*2],D=n[(N-1)*2+1],B=n[N*2],w=n[N*2+1],O=n[(N+1)*2],A=n[(N+1)*2+1],E=-(D-w),R=C-B,z=Math.sqrt(E*E+R*R),E/=z,R/=z,E*=b,R*=b,F=-(w-A),I=B-O,z=Math.sqrt(F*F+I*I),F/=z,I/=z,F*=b,I*=b;const oe=B-C,W=D-w,we=B-O,Ve=A-w,Ae=oe*we+W*Ve,_e=W*we-Ve*oe,gt=_e<0;if(Math.abs(_e)<.001*Math.abs(Ae)){f.push(B-E*U,w-R*U),f.push(B+E*M,w+R*M),Ae>=0&&(a.join==="round"?x+=ar(B,w,B-E*U,w-R*U,B-F*U,w-I*U,f,!1)+4:x+=2,f.push(B-F*M,w-I*M),f.push(B+F*U,w+I*U));continue}const Ot=(-E+C)*(-R+w)-(-E+B)*(-R+D),Ie=(-F+O)*(-I+w)-(-F+B)*(-I+A),ke=(oe*Ie-we*Ot)/_e,Et=(Ve*Ot-W*Ie)/_e,Le=(ke-B)*(ke-B)+(Et-w)*(Et-w),Ee=B+(ke-B)*U,Qe=w+(Et-w)*U,de=B-(ke-B)*M,Je=w-(Et-w)*M,De=Math.min(oe*oe+W*W,we*we+Ve*Ve),pr=gt?U:M,Zr=De+pr*pr*y;Le<=Zr?a.join==="bevel"||Le/y>v?(gt?(f.push(Ee,Qe),f.push(B+E*M,w+R*M),f.push(Ee,Qe),f.push(B+F*M,w+I*M)):(f.push(B-E*U,w-R*U),f.push(de,Je),f.push(B-F*U,w-I*U),f.push(de,Je)),x+=2):a.join==="round"?gt?(f.push(Ee,Qe),f.push(B+E*M,w+R*M),x+=ar(B,w,B+E*M,w+R*M,B+F*M,w+I*M,f,!0)+4,f.push(Ee,Qe),f.push(B+F*M,w+I*M)):(f.push(B-E*U,w-R*U),f.push(de,Je),x+=ar(B,w,B-E*U,w-R*U,B-F*U,w-I*U,f,!1)+4,f.push(B-F*U,w-I*U),f.push(de,Je)):(f.push(Ee,Qe),f.push(de,Je)):(f.push(B-E*U,w-R*U),f.push(B+E*M,w+R*M),a.join==="round"?gt?x+=ar(B,w,B+E*M,w+R*M,B+F*M,w+I*M,f,!0)+2:x+=ar(B,w,B-E*U,w-R*U,B-F*U,w-I*U,f,!1)+2:a.join==="miter"&&Le/y<=v&&(gt?(f.push(de,Je),f.push(de,Je)):(f.push(Ee,Qe),f.push(Ee,Qe)),x+=2),f.push(B-F*U,w-I*U),f.push(B+F*M,w+I*M),x+=2)}C=n[(g-2)*2],D=n[(g-2)*2+1],B=n[(g-1)*2],w=n[(g-1)*2+1],E=-(D-w),R=C-B,z=Math.sqrt(E*E+R*R),E/=z,R/=z,E*=b,R*=b,f.push(B-E*U,w-R*U),f.push(B+E*M,w+R*M),h||(a.cap==="round"?x+=ar(B-E*(U-M)*.5,w-R*(U-M)*.5,B-E*U,w-R*U,B+E*M,w+R*M,f,!1)+2:a.cap==="square"&&(x+=af(B,w,E,R,U,M,!1,f)));const Z=Qo*Qo;for(let N=p;N<x+p-2;++N)C=f[N*2],D=f[N*2+1],B=f[(N+1)*2],w=f[(N+1)*2+1],O=f[(N+2)*2],A=f[(N+2)*2+1],!(Math.abs(C*(w-A)+B*(A-D)+O*(D-w))<Z)&&i.push(N,N+1,N+2)}function lf(n,e,t,r){const s=Zo;if(n.length===0)return;const i=n[0],o=n[1],a=n[n.length-2],u=n[n.length-1],l=e||Math.abs(i-a)<s&&Math.abs(o-u)<s,c=t,h=n.length/2,d=c.length/2;for(let f=0;f<h;f++)c.push(n[f*2]),c.push(n[f*2+1]);for(let f=0;f<h-1;f++)r.push(d+f,d+f+1);l&&r.push(d+h-1,d)}function Jo(n,e,t,r,s,i,o){const a=xd(n,e,2);if(!a)return;for(let l=0;l<a.length;l+=3)i[o++]=a[l]+s,i[o++]=a[l+1]+s,i[o++]=a[l+2]+s;let u=s*r;for(let l=0;l<n.length;l+=2)t[u]=n[l],t[u+1]=n[l+1],u+=r}const H0=[],cf={extension:{type:T.ShapeBuilder,name:"polygon"},build(n,e){for(let t=0;t<n.points.length;t++)e[t]=n.points[t];return!0},triangulate(n,e,t,r,s,i){Jo(n,H0,e,t,r,s,i)}},hf={extension:{type:T.ShapeBuilder,name:"rectangle"},build(n,e){const t=n,r=t.x,s=t.y,i=t.width,o=t.height;return i>0&&o>0?(e[0]=r,e[1]=s,e[2]=r+i,e[3]=s,e[4]=r+i,e[5]=s+o,e[6]=r,e[7]=s+o,!0):!1},triangulate(n,e,t,r,s,i){let o=0;r*=t,e[r+o]=n[0],e[r+o+1]=n[1],o+=t,e[r+o]=n[2],e[r+o+1]=n[3],o+=t,e[r+o]=n[6],e[r+o+1]=n[7],o+=t,e[r+o]=n[4],e[r+o+1]=n[5],o+=t;const a=r/t;s[i++]=a,s[i++]=a+1,s[i++]=a+2,s[i++]=a+1,s[i++]=a+3,s[i++]=a+2}},df={extension:{type:T.ShapeBuilder,name:"triangle"},build(n,e){return e[0]=n.x,e[1]=n.y,e[2]=n.x2,e[3]=n.y2,e[4]=n.x3,e[5]=n.y3,!0},triangulate(n,e,t,r,s,i){let o=0;r*=t,e[r+o]=n[0],e[r+o+1]=n[1],o+=t,e[r+o]=n[2],e[r+o+1]=n[3],o+=t,e[r+o]=n[4],e[r+o+1]=n[5];const a=r/t;s[i++]=a,s[i++]=a+1,s[i++]=a+2}},V0=new H,W0=new ne;function ff(n,e,t,r){const s=e.matrix?n.copyFrom(e.matrix).invert():n.identity();if(e.textureSpace==="local"){const o=t.getBounds(W0);e.width&&o.pad(e.width);const{x:a,y:u}=o,l=1/o.width,c=1/o.height,h=-a*l,d=-u*c,f=s.a,g=s.b,x=s.c,p=s.d;s.a*=l,s.b*=l,s.c*=c,s.d*=c,s.tx=h*f+d*x+s.tx,s.ty=h*g+d*p+s.ty}else s.translate(e.texture.frame.x,e.texture.frame.y),s.scale(1/e.texture.source.width,1/e.texture.source.height);const i=e.texture.source.style;return!(e.fill instanceof Ct)&&i.addressMode==="clamp-to-edge"&&(i.addressMode="repeat",i.update()),r&&s.append(V0.copyFrom(r).invert()),s}const kr={};$.handleByMap(T.ShapeBuilder,kr),$.add(hf,cf,df,Gr,nf,sf);const X0=new ne,$0=new H;function pf(n,e){const{geometryData:t,batches:r}=e;r.length=0,t.indices.length=0,t.vertices.length=0,t.uvs.length=0;for(let s=0;s<n.instructions.length;s++){const i=n.instructions[s];if(i.action==="texture")Y0(i.data,r,t);else if(i.action==="fill"||i.action==="stroke"){const o=i.action==="stroke",a=i.data.path.shapePath,u=i.data.style,l=i.data.hole;o&&l&&mf(l.shapePath,u,!0,r,t),l&&(a.shapePrimitives[a.shapePrimitives.length-1].holes=l.shapePath.shapePrimitives),mf(a,u,o,r,t)}}}function Y0(n,e,t){const r=[],s=kr.rectangle,i=X0;i.x=n.dx,i.y=n.dy,i.width=n.dw,i.height=n.dh;const o=n.transform;if(!s.build(i,r))return;const{vertices:a,uvs:u,indices:l}=t,c=l.length,h=a.length/2;o&&ks(r,o),s.triangulate(r,a,2,h,l,c);const d=n.image,f=d.uvs;u.push(f.x0,f.y0,f.x1,f.y1,f.x3,f.y3,f.x2,f.y2);const g=Te.get(Ls);g.indexOffset=c,g.indexSize=l.length-c,g.attributeOffset=h,g.attributeSize=a.length/2-h,g.baseColor=n.style,g.alpha=n.alpha,g.texture=d,g.geometryData=t,e.push(g)}function mf(n,e,t,r,s){const{vertices:i,uvs:o,indices:a}=s;n.shapePrimitives.forEach(({shape:u,transform:l,holes:c})=>{const h=[],d=kr[u.type];if(!d.build(u,h))return;const f=a.length,g=i.length/2;let x="triangle-list";if(l&&ks(h,l),t){const v=u.closePath??!0,C=e;C.pixelLine?(lf(h,v,i,a),x="line-list"):uf(h,C,!1,v,i,a)}else if(c){const v=[],C=h.slice();q0(c).forEach(B=>{v.push(C.length/2),C.push(...B)}),Jo(C,v,i,2,g,a,f)}else d.triangulate(h,i,2,g,a,f);const p=o.length/2,b=e.texture;if(b!==k.WHITE){const v=ff($0,e,u,l);jo(i,2,g,o,p,2,i.length/2-g,v)}else Ko(o,p,2,i.length/2-g);const y=Te.get(Ls);y.indexOffset=f,y.indexSize=a.length-f,y.attributeOffset=g,y.attributeSize=i.length/2-g,y.baseColor=e.color,y.alpha=e.alpha,y.texture=b,y.geometryData=s,y.topology=x,r.push(y)})}function q0(n){const e=[];for(let t=0;t<n.length;t++){const r=n[t].shape,s=[];kr[r.type].build(r,s)&&e.push(s)}return e}class gf{constructor(){this.batches=[],this.geometryData={vertices:[],uvs:[],indices:[]}}reset(){this.batches&&this.batches.forEach(e=>{Te.return(e)}),this.graphicsData&&Te.return(this.graphicsData),this.isBatchable=!1,this.context=null,this.batches.length=0,this.geometryData.indices.length=0,this.geometryData.vertices.length=0,this.geometryData.uvs.length=0,this.graphicsData=null}destroy(){this.reset(),this.batches=null,this.geometryData=null}}class _f{constructor(){this.instructions=new Qi}init(e){const t=e.maxTextures;this.batcher?this.batcher._updateMaxTextures(t):this.batcher=new Gs({maxTextures:t}),this.instructions.reset()}get geometry(){return L(dc,"GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."),this.batcher.geometry}destroy(){this.batcher.destroy(),this.instructions.destroy(),this.batcher=null,this.instructions=null}}const ea=class Ql{constructor(e){this._renderer=e,this._managedContexts=new je({renderer:e,type:"resource",name:"graphicsContext"})}init(e){Ql.defaultOptions.bezierSmoothness=(e==null?void 0:e.bezierSmoothness)??Ql.defaultOptions.bezierSmoothness}getContextRenderData(e){return e._gpuData[this._renderer.uid].graphicsData||this._initContextRenderData(e)}updateGpuContext(e){const t=!!e._gpuData[this._renderer.uid],r=e._gpuData[this._renderer.uid]||this._initContext(e);if(e.dirty||!t){t&&r.reset(),pf(e,r);const s=e.batchMode;e.customShader||s==="no-batch"?r.isBatchable=!1:s==="auto"?r.isBatchable=r.geometryData.vertices.length<400:r.isBatchable=!0,e.dirty=!1}return r}getGpuContext(e){return e._gpuData[this._renderer.uid]||this._initContext(e)}_initContextRenderData(e){const t=Te.get(_f,{maxTextures:this._renderer.limits.maxBatchableTextures}),r=e._gpuData[this._renderer.uid],{batches:s,geometryData:i}=r;r.graphicsData=t;const o=i.vertices.length,a=i.indices.length;for(let h=0;h<s.length;h++)s[h].applyTransform=!1;const u=t.batcher;u.ensureAttributeBuffer(o),u.ensureIndexBuffer(a),u.begin();for(let h=0;h<s.length;h++){const d=s[h];u.add(d)}u.finish(t.instructions);const l=u.geometry;l.indexBuffer.setDataWithSize(u.indexBuffer,u.indexSize,!0),l.buffers[0].setDataWithSize(u.attributeBuffer.float32View,u.attributeSize,!0);const c=u.batches;for(let h=0;h<c.length;h++){const d=c[h];d.bindGroup=Bs(d.textures.textures,d.textures.count,this._renderer.limits.maxBatchableTextures)}return t}_initContext(e){const t=new gf;return t.context=e,e._gpuData[this._renderer.uid]=t,this._managedContexts.add(e),t}destroy(){this._managedContexts.destroy(),this._renderer=null}};ea.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"graphicsContext"},ea.defaultOptions={bezierSmoothness:.5};let Ns=ea;const j0=8,zs=11920929e-14,K0=1;function ta(n,e,t,r,s,i,o,a,u,l){const h=Math.min(.99,Math.max(0,l??Ns.defaultOptions.bezierSmoothness));let d=(K0-h)/1;return d*=d,Z0(e,t,r,s,i,o,a,u,n,d),n}function Z0(n,e,t,r,s,i,o,a,u,l){ra(n,e,t,r,s,i,o,a,u,l,0),u.push(o,a)}function ra(n,e,t,r,s,i,o,a,u,l,c){if(c>j0)return;const h=(n+t)/2,d=(e+r)/2,f=(t+s)/2,g=(r+i)/2,x=(s+o)/2,p=(i+a)/2,b=(h+f)/2,y=(d+g)/2,v=(f+x)/2,C=(g+p)/2,D=(b+v)/2,B=(y+C)/2;if(c>0){let w=o-n,O=a-e;const A=Math.abs((t-o)*O-(r-a)*w),E=Math.abs((s-o)*O-(i-a)*w);if(A>zs&&E>zs){if((A+E)*(A+E)<=l*(w*w+O*O)){u.push(D,B);return}}else if(A>zs){if(A*A<=l*(w*w+O*O)){u.push(D,B);return}}else if(E>zs){if(E*E<=l*(w*w+O*O)){u.push(D,B);return}}else if(w=D-(n+o)/2,O=B-(e+a)/2,w*w+O*O<=l){u.push(D,B);return}}ra(n,e,h,d,b,y,D,B,u,l,c+1),ra(D,B,v,C,x,p,o,a,u,l,c+1)}const Q0=8,J0=11920929e-14,e2=1;function xf(n,e,t,r,s,i,o,a){const l=Math.min(.99,Math.max(0,a??Ns.defaultOptions.bezierSmoothness));let c=(e2-l)/1;return c*=c,t2(e,t,r,s,i,o,n,c),n}function t2(n,e,t,r,s,i,o,a){na(o,n,e,t,r,s,i,a,0),o.push(s,i)}function na(n,e,t,r,s,i,o,a,u){if(u>Q0)return;const l=(e+r)/2,c=(t+s)/2,h=(r+i)/2,d=(s+o)/2,f=(l+h)/2,g=(c+d)/2;let x=i-e,p=o-t;const b=Math.abs((r-i)*p-(s-o)*x);if(b>J0){if(b*b<=a*(x*x+p*p)){n.push(f,g);return}}else if(x=f-(e+i)/2,p=g-(t+o)/2,x*x+p*p<=a){n.push(f,g);return}na(n,e,t,l,c,f,g,a,u+1),na(n,f,g,h,d,i,o,a,u+1)}function sa(n,e,t,r,s,i,o,a){let u=Math.abs(s-i);(!o&&s>i||o&&i>s)&&(u=2*Math.PI-u),a||(a=Math.max(6,Math.floor(6*Math.pow(r,1/3)*(u/Math.PI)))),a=Math.max(a,3);let l=u/a,c=s;l*=o?-1:1;for(let h=0;h<a+1;h++){const d=Math.cos(c),f=Math.sin(c),g=e+d*r,x=t+f*r;n.push(g,x),c+=l}}function bf(n,e,t,r,s,i){const o=n[n.length-2],u=n[n.length-1]-t,l=o-e,c=s-t,h=r-e,d=Math.abs(u*h-l*c);if(d<1e-8||i===0){(n[n.length-2]!==e||n[n.length-1]!==t)&&n.push(e,t);return}const f=u*u+l*l,g=c*c+h*h,x=u*c+l*h,p=i*Math.sqrt(f)/d,b=i*Math.sqrt(g)/d,y=p*x/f,v=b*x/g,C=p*h+b*l,D=p*c+b*u,B=l*(b+y),w=u*(b+y),O=h*(p+v),A=c*(p+v),E=Math.atan2(w-D,B-C),R=Math.atan2(A-D,O-C);sa(n,C+e,D+t,i,E,R,l*c>h*u)}const Bn=Math.PI*2,ia={centerX:0,centerY:0,ang1:0,ang2:0},oa=({x:n,y:e},t,r,s,i,o,a,u)=>{n*=t,e*=r;const l=s*n-i*e,c=i*n+s*e;return u.x=l+o,u.y=c+a,u};function r2(n,e){const t=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),r=e===1.5707963267948966?.551915024494:t,s=Math.cos(n),i=Math.sin(n),o=Math.cos(n+e),a=Math.sin(n+e);return[{x:s-i*r,y:i+s*r},{x:o+a*r,y:a-o*r},{x:o,y:a}]}const yf=(n,e,t,r)=>{const s=n*r-e*t<0?-1:1;let i=n*t+e*r;return i>1&&(i=1),i<-1&&(i=-1),s*Math.acos(i)},n2=(n,e,t,r,s,i,o,a,u,l,c,h,d)=>{const f=Math.pow(s,2),g=Math.pow(i,2),x=Math.pow(c,2),p=Math.pow(h,2);let b=f*g-f*p-g*x;b<0&&(b=0),b/=f*p+g*x,b=Math.sqrt(b)*(o===a?-1:1);const y=b*s/i*h,v=b*-i/s*c,C=l*y-u*v+(n+t)/2,D=u*y+l*v+(e+r)/2,B=(c-y)/s,w=(h-v)/i,O=(-c-y)/s,A=(-h-v)/i,E=yf(1,0,B,w);let R=yf(B,w,O,A);a===0&&R>0&&(R-=Bn),a===1&&R<0&&(R+=Bn),d.centerX=C,d.centerY=D,d.ang1=E,d.ang2=R};function vf(n,e,t,r,s,i,o,a=0,u=0,l=0){if(i===0||o===0)return;const c=Math.sin(a*Bn/360),h=Math.cos(a*Bn/360),d=h*(e-r)/2+c*(t-s)/2,f=-c*(e-r)/2+h*(t-s)/2;if(d===0&&f===0)return;i=Math.abs(i),o=Math.abs(o);const g=Math.pow(d,2)/Math.pow(i,2)+Math.pow(f,2)/Math.pow(o,2);g>1&&(i*=Math.sqrt(g),o*=Math.sqrt(g)),n2(e,t,r,s,i,o,u,l,c,h,d,f,ia);let{ang1:x,ang2:p}=ia;const{centerX:b,centerY:y}=ia;let v=Math.abs(p)/(Bn/4);Math.abs(1-v)<1e-7&&(v=1);const C=Math.max(Math.ceil(v),1);p/=C;let D=n[n.length-2],B=n[n.length-1];const w={x:0,y:0};for(let O=0;O<C;O++){const A=r2(x,p),{x:E,y:R}=oa(A[0],i,o,h,c,b,y,w),{x:F,y:I}=oa(A[1],i,o,h,c,b,y,w),{x:z,y:Y}=oa(A[2],i,o,h,c,b,y,w);ta(n,D,B,E,R,F,I,z,Y),D=z,B=Y,x+=p}}function Sf(n,e,t){const r=(o,a)=>{const u=a.x-o.x,l=a.y-o.y,c=Math.sqrt(u*u+l*l),h=u/c,d=l/c;return{len:c,nx:h,ny:d}},s=(o,a)=>{o===0?n.moveTo(a.x,a.y):n.lineTo(a.x,a.y)};let i=e[e.length-1];for(let o=0;o<e.length;o++){const a=e[o%e.length],u=a.radius??t;if(u<=0){s(o,a),i=a;continue}const l=e[(o+1)%e.length],c=r(a,i),h=r(a,l);if(c.len<1e-4||h.len<1e-4){s(o,a),i=a;continue}let d=Math.asin(c.nx*h.ny-c.ny*h.nx),f=1,g=!1;c.nx*h.nx-c.ny*-h.ny<0?d<0?d=Math.PI+d:(d=Math.PI-d,f=-1,g=!0):d>0&&(f=-1,g=!0);const x=d/2;let p,b=Math.abs(Math.cos(x)*u/Math.sin(x));b>Math.min(c.len/2,h.len/2)?(b=Math.min(c.len/2,h.len/2),p=Math.abs(b*Math.sin(x)/Math.cos(x))):p=u;const y=a.x+h.nx*b+-h.ny*p*f,v=a.y+h.ny*b+h.nx*p*f,C=Math.atan2(c.ny,c.nx)+Math.PI/2*f,D=Math.atan2(h.ny,h.nx)-Math.PI/2*f;o===0&&n.moveTo(y+Math.cos(C)*p,v+Math.sin(C)*p),n.arc(y,v,p,C,D,g),i=a}}function Tf(n,e,t,r){const s=(a,u)=>Math.sqrt((a.x-u.x)**2+(a.y-u.y)**2),i=(a,u,l)=>({x:a.x+(u.x-a.x)*l,y:a.y+(u.y-a.y)*l}),o=e.length;for(let a=0;a<o;a++){const u=e[(a+1)%o],l=u.radius??t;if(l<=0){a===0?n.moveTo(u.x,u.y):n.lineTo(u.x,u.y);continue}const c=e[a],h=e[(a+2)%o],d=s(c,u);let f;if(d<1e-4)f=u;else{const p=Math.min(d/2,l);f=i(u,c,p/d)}const g=s(h,u);let x;if(g<1e-4)x=u;else{const p=Math.min(g/2,l);x=i(u,h,p/g)}a===0?n.moveTo(f.x,f.y):n.lineTo(f.x,f.y),n.quadraticCurveTo(u.x,u.y,x.x,x.y,r)}}const s2=new ne;class Cf{constructor(e){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new Be,this._graphicsPath2D=e,this.signed=e.checkForHoles}moveTo(e,t){return this.startPoly(e,t),this}lineTo(e,t){this._ensurePoly();const r=this._currentPoly.points,s=r[r.length-2],i=r[r.length-1];return(s!==e||i!==t)&&r.push(e,t),this}arc(e,t,r,s,i,o){this._ensurePoly(!1);const a=this._currentPoly.points;return sa(a,e,t,r,s,i,o),this}arcTo(e,t,r,s,i){this._ensurePoly();const o=this._currentPoly.points;return bf(o,e,t,r,s,i),this}arcToSvg(e,t,r,s,i,o,a){const u=this._currentPoly.points;return vf(u,this._currentPoly.lastX,this._currentPoly.lastY,o,a,e,t,r,s,i),this}bezierCurveTo(e,t,r,s,i,o,a){this._ensurePoly();const u=this._currentPoly;return ta(this._currentPoly.points,u.lastX,u.lastY,e,t,r,s,i,o,a),this}quadraticCurveTo(e,t,r,s,i){this._ensurePoly();const o=this._currentPoly;return xf(this._currentPoly.points,o.lastX,o.lastY,e,t,r,s,i),this}closePath(){return this.endPoly(!0),this}addPath(e,t){this.endPoly(),t&&!t.isIdentity()&&(e=e.clone(!0),e.transform(t));const r=this.shapePrimitives,s=r.length;for(let i=0;i<e.instructions.length;i++){const o=e.instructions[i];this[o.action](...o.data)}if(e.checkForHoles&&r.length-s>1){let i=null;for(let o=s;o<r.length;o++){const a=r[o];if(a.shape.type==="polygon"){const u=a.shape,l=i==null?void 0:i.shape;l&&l.containsPolygon(u)?(i.holes||(i.holes=[]),i.holes.push(a),r.copyWithin(o,o+1),r.length--,o--):i=a}}}return this}finish(e=!1){this.endPoly(e)}rect(e,t,r,s,i){return this.drawShape(new ne(e,t,r,s),i),this}circle(e,t,r,s){return this.drawShape(new As(e,t,r),s),this}poly(e,t,r){const s=new Rr(e);return s.closePath=t,this.drawShape(s,r),this}regularPoly(e,t,r,s,i=0,o){s=Math.max(s|0,3);const a=-1*Math.PI/2+i,u=Math.PI*2/s,l=[];for(let c=0;c<s;c++){const h=a-c*u;l.push(e+r*Math.cos(h),t+r*Math.sin(h))}return this.poly(l,!0,o),this}roundPoly(e,t,r,s,i,o=0,a){if(s=Math.max(s|0,3),i<=0)return this.regularPoly(e,t,r,s,o);const u=r*Math.sin(Math.PI/s)-.001;i=Math.min(i,u);const l=-1*Math.PI/2+o,c=Math.PI*2/s,h=(s-2)*Math.PI/s/2;for(let d=0;d<s;d++){const f=d*c+l,g=e+r*Math.cos(f),x=t+r*Math.sin(f),p=f+Math.PI+h,b=f-Math.PI-h,y=g+i*Math.cos(p),v=x+i*Math.sin(p),C=g+i*Math.cos(b),D=x+i*Math.sin(b);d===0?this.moveTo(y,v):this.lineTo(y,v),this.quadraticCurveTo(g,x,C,D,a)}return this.closePath()}roundShape(e,t,r=!1,s){return e.length<3?this:(r?Tf(this,e,t,s):Sf(this,e,t),this.closePath())}filletRect(e,t,r,s,i){if(i===0)return this.rect(e,t,r,s);const o=Math.min(r,s)/2,a=Math.min(o,Math.max(-o,i)),u=e+r,l=t+s,c=a<0?-a:0,h=Math.abs(a);return this.moveTo(e,t+h).arcTo(e+c,t+c,e+h,t,h).lineTo(u-h,t).arcTo(u-c,t+c,u,t+h,h).lineTo(u,l-h).arcTo(u-c,l-c,e+r-h,l,h).lineTo(e+h,l).arcTo(e+c,l-c,e,l-h,h).closePath()}chamferRect(e,t,r,s,i,o){if(i<=0)return this.rect(e,t,r,s);const a=Math.min(i,Math.min(r,s)/2),u=e+r,l=t+s,c=[e+a,t,u-a,t,u,t+a,u,l-a,u-a,l,e+a,l,e,l-a,e,t+a];for(let h=c.length-1;h>=2;h-=2)c[h]===c[h-2]&&c[h-1]===c[h-3]&&c.splice(h-1,2);return this.poly(c,!0,o)}ellipse(e,t,r,s,i){return this.drawShape(new ws(e,t,r,s),i),this}roundRect(e,t,r,s,i,o){return this.drawShape(new Ps(e,t,r,s,i),o),this}drawShape(e,t){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:t}),this}startPoly(e,t){let r=this._currentPoly;return r&&this.endPoly(),r=new Rr,r.points.push(e,t),this._currentPoly=r,this}endPoly(e=!1){const t=this._currentPoly;return t&&t.points.length>2&&(t.closePath=e,this.shapePrimitives.push({shape:t})),this._currentPoly=null,this}_ensurePoly(e=!0){if(!this._currentPoly&&(this._currentPoly=new Rr,e)){const t=this.shapePrimitives[this.shapePrimitives.length-1];if(t){let r=t.shape.x,s=t.shape.y;if(t.transform&&!t.transform.isIdentity()){const i=t.transform,o=r;r=i.a*r+i.c*s+i.tx,s=i.b*o+i.d*s+i.ty}this._currentPoly.points.push(r,s)}else this._currentPoly.points.push(0,0)}}buildPath(){const e=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let t=0;t<e.instructions.length;t++){const r=e.instructions[t];this[r.action](...r.data)}this.finish()}get bounds(){const e=this._bounds;e.clear();const t=this.shapePrimitives;for(let r=0;r<t.length;r++){const s=t[r],i=s.shape.getBounds(s2);s.transform?e.addRect(i,s.transform):e.addRect(i)}return e}}class mt{constructor(e,t=!1){this.instructions=[],this.uid=ae("graphicsPath"),this._dirty=!0,this.checkForHoles=t,typeof e=="string"?Rd(e,this):this.instructions=(e==null?void 0:e.slice())??[]}get shapePath(){return this._shapePath||(this._shapePath=new Cf(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,t){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,t]}),this._dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this._dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this._dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this._dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this._dirty=!0,this}bezierCurveToShort(e,t,r,s,i){const o=this.instructions[this.instructions.length-1],a=this.getLastPoint(ie.shared);let u=0,l=0;if(!o||o.action!=="bezierCurveTo")u=a.x,l=a.y;else{u=o.data[2],l=o.data[3];const c=a.x,h=a.y;u=c+(c-u),l=h+(h-l)}return this.instructions.push({action:"bezierCurveTo",data:[u,l,e,t,r,s,i]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this._dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this._dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this._dirty=!0,this}quadraticCurveToShort(e,t,r){const s=this.instructions[this.instructions.length-1],i=this.getLastPoint(ie.shared);let o=0,a=0;if(!s||s.action!=="quadraticCurveTo")o=i.x,a=i.y;else{o=s.data[0],a=s.data[1];const u=i.x,l=i.y;o=u+(u-o),a=l+(l-a)}return this.instructions.push({action:"quadraticCurveTo",data:[o,a,e,t,r]}),this._dirty=!0,this}rect(e,t,r,s,i){return this.instructions.push({action:"rect",data:[e,t,r,s,i]}),this._dirty=!0,this}circle(e,t,r,s){return this.instructions.push({action:"circle",data:[e,t,r,s]}),this._dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this._dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this._dirty=!0,this}regularPoly(...e){return this.instructions.push({action:"regularPoly",data:e}),this._dirty=!0,this}roundPoly(...e){return this.instructions.push({action:"roundPoly",data:e}),this._dirty=!0,this}roundShape(...e){return this.instructions.push({action:"roundShape",data:e}),this._dirty=!0,this}filletRect(...e){return this.instructions.push({action:"filletRect",data:e}),this._dirty=!0,this}chamferRect(...e){return this.instructions.push({action:"chamferRect",data:e}),this._dirty=!0,this}star(e,t,r,s,i,o,a){i||(i=s/2);const u=-1*Math.PI/2+o,l=r*2,c=Math.PI*2/l,h=[];for(let d=0;d<l;d++){const f=d%2?i:s,g=d*c+u;h.push(e+f*Math.cos(g),t+f*Math.sin(g))}return this.poly(h,!0,a),this}clone(e=!1){const t=new mt;if(t.checkForHoles=this.checkForHoles,!e)t.instructions=this.instructions.slice();else for(let r=0;r<this.instructions.length;r++){const s=this.instructions[r];t.instructions.push({action:s.action,data:s.data.slice()})}return t}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(e){if(e.isIdentity())return this;const t=e.a,r=e.b,s=e.c,i=e.d,o=e.tx,a=e.ty;let u=0,l=0,c=0,h=0,d=0,f=0,g=0,x=0;for(let p=0;p<this.instructions.length;p++){const b=this.instructions[p],y=b.data;switch(b.action){case"moveTo":case"lineTo":u=y[0],l=y[1],y[0]=t*u+s*l+o,y[1]=r*u+i*l+a;break;case"bezierCurveTo":c=y[0],h=y[1],d=y[2],f=y[3],u=y[4],l=y[5],y[0]=t*c+s*h+o,y[1]=r*c+i*h+a,y[2]=t*d+s*f+o,y[3]=r*d+i*f+a,y[4]=t*u+s*l+o,y[5]=r*u+i*l+a;break;case"quadraticCurveTo":c=y[0],h=y[1],u=y[2],l=y[3],y[0]=t*c+s*h+o,y[1]=r*c+i*h+a,y[2]=t*u+s*l+o,y[3]=r*u+i*l+a;break;case"arcToSvg":u=y[5],l=y[6],g=y[0],x=y[1],y[0]=t*g+s*x,y[1]=r*g+i*x,y[5]=t*u+s*l+o,y[6]=r*u+i*l+a;break;case"circle":y[4]=Rn(y[3],e);break;case"rect":y[4]=Rn(y[4],e);break;case"ellipse":y[8]=Rn(y[8],e);break;case"roundRect":y[5]=Rn(y[5],e);break;case"addPath":y[0].transform(e);break;case"poly":y[2]=Rn(y[2],e);break;default:X("unknown transform action",b.action);break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}getLastPoint(e){let t=this.instructions.length-1,r=this.instructions[t];if(!r)return e.x=0,e.y=0,e;for(;r.action==="closePath";){if(t--,t<0)return e.x=0,e.y=0,e;r=this.instructions[t]}switch(r.action){case"moveTo":case"lineTo":e.x=r.data[0],e.y=r.data[1];break;case"quadraticCurveTo":e.x=r.data[2],e.y=r.data[3];break;case"bezierCurveTo":e.x=r.data[4],e.y=r.data[5];break;case"arc":case"arcToSvg":e.x=r.data[5],e.y=r.data[6];break;case"addPath":r.data[0].getLastPoint(e);break}return e}}function Rn(n,e){return n?n.prepend(e):e.clone()}function ge(n,e,t){const r=n.getAttribute(e);return r?Number(r):t}function Af(n,e){const t=n.querySelectorAll("defs");for(let r=0;r<t.length;r++){const s=t[r];for(let i=0;i<s.children.length;i++){const o=s.children[i];switch(o.nodeName.toLowerCase()){case"lineargradient":e.defs[o.id]=i2(o);break;case"radialgradient":e.defs[o.id]=o2();break}}}}function i2(n){const e=ge(n,"x1",0),t=ge(n,"y1",0),r=ge(n,"x2",1),s=ge(n,"y2",0),i=n.getAttribute("gradientUnits")||"objectBoundingBox",o=new Ct(e,t,r,s,i==="objectBoundingBox"?"local":"global");for(let a=0;a<n.children.length;a++){const u=n.children[a],l=ge(u,"offset",0),c=ee.shared.setValue(u.getAttribute("stop-color")).toNumber();o.addColorStop(l,c)}return o}function o2(n){return X("[SVG Parser] Radial gradients are not yet supported"),new Ct(0,0,1,0)}function aa(n){const e=n.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);return e?e[1]:""}const ua={fill:{type:"paint",default:0},"fill-opacity":{type:"number",default:1},stroke:{type:"paint",default:0},"stroke-width":{type:"number",default:1},"stroke-opacity":{type:"number",default:1},"stroke-linecap":{type:"string",default:"butt"},"stroke-linejoin":{type:"string",default:"miter"},"stroke-miterlimit":{type:"number",default:10},"stroke-dasharray":{type:"string",default:"none"},"stroke-dashoffset":{type:"number",default:0},opacity:{type:"number",default:1}};function la(n,e){const t=n.getAttribute("style"),r={},s={},i={strokeStyle:r,fillStyle:s,useFill:!1,useStroke:!1};for(const o in ua){const a=n.getAttribute(o);a&&wf(e,i,o,a.trim())}if(t){const o=t.split(";");for(let a=0;a<o.length;a++){const u=o[a].trim(),[l,c]=u.split(":");ua[l]&&wf(e,i,l,c.trim())}}return{strokeStyle:i.useStroke?r:null,fillStyle:i.useFill?s:null,useFill:i.useFill,useStroke:i.useStroke}}function wf(n,e,t,r){switch(t){case"stroke":if(r!=="none"){if(r.startsWith("url(")){const s=aa(r);e.strokeStyle.fill=n.defs[s]}else e.strokeStyle.color=ee.shared.setValue(r).toNumber();e.useStroke=!0}break;case"stroke-width":e.strokeStyle.width=Number(r);break;case"fill":if(r!=="none"){if(r.startsWith("url(")){const s=aa(r);e.fillStyle.fill=n.defs[s]}else e.fillStyle.color=ee.shared.setValue(r).toNumber();e.useFill=!0}break;case"fill-opacity":e.fillStyle.alpha=Number(r);break;case"stroke-opacity":e.strokeStyle.alpha=Number(r);break;case"opacity":e.fillStyle.alpha=Number(r),e.strokeStyle.alpha=Number(r);break}}function Ef(n){if(n.length<=2)return!0;const e=n.map(a=>a.area).sort((a,u)=>u-a),[t,r]=e,s=e[e.length-1],i=t/r,o=r/s;return!(i>3&&o<2)}function a2(n,e=0){const t=n.instructions[e];if(!t||t.action!=="fill")throw new Error(`Expected fill instruction at index ${e}, got ${(t==null?void 0:t.action)||"undefined"}`);return t.data}function Pf(n){return n.split(/(?=[Mm])/).filter(r=>r.trim().length>0)}function Bf(n){const e=n.match(/[-+]?[0-9]*\.?[0-9]+/g);if(!e||e.length<4)return 0;const t=e.map(Number),r=[],s=[];for(let c=0;c<t.length;c+=2)c+1<t.length&&(r.push(t[c]),s.push(t[c+1]));if(r.length===0||s.length===0)return 0;const i=Math.min(...r),o=Math.max(...r),a=Math.min(...s),u=Math.max(...s);return(o-i)*(u-a)}function ca(n,e){const t=new mt(n,!1);for(const r of t.instructions)e.instructions.push(r)}function Rf(n,e){if(typeof n=="string"){const o=document.createElement("div");o.innerHTML=n.trim(),n=o.querySelector("svg")}const t={context:e,defs:{},path:new mt};Af(n,t);const r=n.children,{fillStyle:s,strokeStyle:i}=la(n,t);for(let o=0;o<r.length;o++){const a=r[o];a.nodeName.toLowerCase()!=="defs"&&Df(a,t,s,i)}return e}function Df(n,e,t,r){const s=n.children,{fillStyle:i,strokeStyle:o}=la(n,e);i&&t?t={...t,...i}:i&&(t=i),o&&r?r={...r,...o}:o&&(r=o);const a=!t&&!r;a&&(t={color:0});let u,l,c,h,d,f,g,x,p,b,y,v,C,D,B,w,O;switch(n.nodeName.toLowerCase()){case"path":{D=n.getAttribute("d");const A=n.getAttribute("fill-rule"),E=Pf(D),R=A==="evenodd",F=E.length>1;if(R&&F){const z=E.map(U=>({path:U,area:Bf(U)}));if(z.sort((U,M)=>M.area-U.area),E.length>3||!Ef(z))for(let U=0;U<z.length;U++){const M=z[U],Z=U===0;e.context.beginPath();const N=new mt(void 0,!0);ca(M.path,N),e.context.path(N),Z?(t&&e.context.fill(t),r&&e.context.stroke(r)):e.context.cut()}else for(let U=0;U<z.length;U++){const M=z[U],Z=U%2===1;e.context.beginPath();const N=new mt(void 0,!0);ca(M.path,N),e.context.path(N),Z?e.context.cut():(t&&e.context.fill(t),r&&e.context.stroke(r))}}else{const z=A?A==="evenodd":!0;B=new mt(D,z),e.context.path(B),t&&e.context.fill(t),r&&e.context.stroke(r)}break}case"circle":g=ge(n,"cx",0),x=ge(n,"cy",0),p=ge(n,"r",0),e.context.ellipse(g,x,p,p),t&&e.context.fill(t),r&&e.context.stroke(r);break;case"rect":u=ge(n,"x",0),l=ge(n,"y",0),w=ge(n,"width",0),O=ge(n,"height",0),b=ge(n,"rx",0),y=ge(n,"ry",0),b||y?e.context.roundRect(u,l,w,O,b||y):e.context.rect(u,l,w,O),t&&e.context.fill(t),r&&e.context.stroke(r);break;case"ellipse":g=ge(n,"cx",0),x=ge(n,"cy",0),b=ge(n,"rx",0),y=ge(n,"ry",0),e.context.beginPath(),e.context.ellipse(g,x,b,y),t&&e.context.fill(t),r&&e.context.stroke(r);break;case"line":c=ge(n,"x1",0),h=ge(n,"y1",0),d=ge(n,"x2",0),f=ge(n,"y2",0),e.context.beginPath(),e.context.moveTo(c,h),e.context.lineTo(d,f),r&&e.context.stroke(r);break;case"polygon":C=n.getAttribute("points"),v=C.match(/-?\d+/g).map(A=>parseInt(A,10)),e.context.poly(v,!0),t&&e.context.fill(t),r&&e.context.stroke(r);break;case"polyline":C=n.getAttribute("points"),v=C.match(/-?\d+/g).map(A=>parseInt(A,10)),e.context.poly(v,!1),r&&e.context.stroke(r);break;case"g":case"svg":break;default:{X(`[SVG parser] <${n.nodeName}> elements unsupported`);break}}a&&(t=null);for(let A=0;A<s.length;A++)Df(s[A],e,t,r)}function u2(n){return ee.isColorLike(n)}function Mf(n){return n instanceof Cn}function Ff(n){return n instanceof Ct}function l2(n){return n instanceof k}function c2(n,e,t){const r=ee.shared.setValue(e??0);return n.color=r.toNumber(),n.alpha=r.alpha===1?t.alpha:r.alpha,n.texture=k.WHITE,{...t,...n}}function h2(n,e,t){return n.texture=e,{...t,...n}}function Uf(n,e,t){return n.fill=e,n.color=16777215,n.texture=e.texture,n.matrix=e.transform,{...t,...n}}function If(n,e,t){return e.buildGradient(),n.fill=e,n.color=16777215,n.texture=e.texture,n.matrix=e.transform,n.textureSpace=e.textureSpace,{...t,...n}}function d2(n,e){const t={...e,...n},r=ee.shared.setValue(t.color);return t.alpha*=r.alpha,t.color=r.toNumber(),t}function Ht(n,e){if(n==null)return null;const t={},r=n;return u2(n)?c2(t,n,e):l2(n)?h2(t,n,e):Mf(n)?Uf(t,n,e):Ff(n)?If(t,n,e):r.fill&&Mf(r.fill)?Uf(r,r.fill,e):r.fill&&Ff(r.fill)?If(r,r.fill,e):d2(r,e)}function Dn(n,e){const{width:t,alignment:r,miterLimit:s,cap:i,join:o,pixelLine:a,...u}=e,l=Ht(n,u);return l?{width:t,alignment:r,miterLimit:s,cap:i,join:o,pixelLine:a,...l}:null}const f2=new ie,Of=new H,ha=class Bt extends We{constructor(){super(...arguments),this._gpuData=Object.create(null),this.autoGarbageCollect=!0,this._gcLastUsed=-1,this.uid=ae("graphicsContext"),this.dirty=!0,this.batchMode="auto",this.instructions=[],this.destroyed=!1,this._activePath=new mt,this._transform=new H,this._fillStyle={...Bt.defaultFillStyle},this._strokeStyle={...Bt.defaultStrokeStyle},this._stateStack=[],this._tick=0,this._bounds=new Be,this._boundsDirty=!0}clone(){const e=new Bt;return e.batchMode=this.batchMode,e.instructions=this.instructions.slice(),e._activePath=this._activePath.clone(),e._transform=this._transform.clone(),e._fillStyle={...this._fillStyle},e._strokeStyle={...this._strokeStyle},e._stateStack=this._stateStack.slice(),e._bounds=this._bounds.clone(),e._boundsDirty=!0,e}get fillStyle(){return this._fillStyle}set fillStyle(e){this._fillStyle=Ht(e,Bt.defaultFillStyle)}get strokeStyle(){return this._strokeStyle}set strokeStyle(e){this._strokeStyle=Dn(e,Bt.defaultStrokeStyle)}setFillStyle(e){return this._fillStyle=Ht(e,Bt.defaultFillStyle),this}setStrokeStyle(e){return this._strokeStyle=Ht(e,Bt.defaultStrokeStyle),this}texture(e,t,r,s,i,o){return this.instructions.push({action:"texture",data:{image:e,dx:r||0,dy:s||0,dw:i||e.frame.width,dh:o||e.frame.height,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:t?ee.shared.setValue(t).toNumber():16777215}}),this.onUpdate(),this}beginPath(){return this._activePath=new mt,this}fill(e,t){let r;const s=this.instructions[this.instructions.length-1];return this._tick===0&&(s==null?void 0:s.action)==="stroke"?r=s.data.path:r=this._activePath.clone(),r?(e!=null&&(t!==void 0&&typeof e=="number"&&(L(j,"GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),e={color:e,alpha:t}),this._fillStyle=Ht(e,Bt.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:this.fillStyle,path:r}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}_initNextPathLocation(){const{x:e,y:t}=this._activePath.getLastPoint(ie.shared);this._activePath.clear(),this._activePath.moveTo(e,t)}stroke(e){let t;const r=this.instructions[this.instructions.length-1];return this._tick===0&&(r==null?void 0:r.action)==="fill"?t=r.data.path:t=this._activePath.clone(),t?(e!=null&&(this._strokeStyle=Dn(e,Bt.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:this.strokeStyle,path:t}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}cut(){for(let e=0;e<2;e++){const t=this.instructions[this.instructions.length-1-e],r=this._activePath.clone();if(t&&(t.action==="stroke"||t.action==="fill"))if(t.data.hole)t.data.hole.addPath(r);else{t.data.hole=r;break}}return this._initNextPathLocation(),this}arc(e,t,r,s,i,o){this._tick++;const a=this._transform;return this._activePath.arc(a.a*e+a.c*t+a.tx,a.b*e+a.d*t+a.ty,r,s,i,o),this}arcTo(e,t,r,s,i){this._tick++;const o=this._transform;return this._activePath.arcTo(o.a*e+o.c*t+o.tx,o.b*e+o.d*t+o.ty,o.a*r+o.c*s+o.tx,o.b*r+o.d*s+o.ty,i),this}arcToSvg(e,t,r,s,i,o,a){this._tick++;const u=this._transform;return this._activePath.arcToSvg(e,t,r,s,i,u.a*o+u.c*a+u.tx,u.b*o+u.d*a+u.ty),this}bezierCurveTo(e,t,r,s,i,o,a){this._tick++;const u=this._transform;return this._activePath.bezierCurveTo(u.a*e+u.c*t+u.tx,u.b*e+u.d*t+u.ty,u.a*r+u.c*s+u.tx,u.b*r+u.d*s+u.ty,u.a*i+u.c*o+u.tx,u.b*i+u.d*o+u.ty,a),this}closePath(){var e;return this._tick++,(e=this._activePath)==null||e.closePath(),this}ellipse(e,t,r,s){return this._tick++,this._activePath.ellipse(e,t,r,s,this._transform.clone()),this}circle(e,t,r){return this._tick++,this._activePath.circle(e,t,r,this._transform.clone()),this}path(e){return this._tick++,this._activePath.addPath(e,this._transform.clone()),this}lineTo(e,t){this._tick++;const r=this._transform;return this._activePath.lineTo(r.a*e+r.c*t+r.tx,r.b*e+r.d*t+r.ty),this}moveTo(e,t){this._tick++;const r=this._transform,s=this._activePath.instructions,i=r.a*e+r.c*t+r.tx,o=r.b*e+r.d*t+r.ty;return s.length===1&&s[0].action==="moveTo"?(s[0].data[0]=i,s[0].data[1]=o,this):(this._activePath.moveTo(i,o),this)}quadraticCurveTo(e,t,r,s,i){this._tick++;const o=this._transform;return this._activePath.quadraticCurveTo(o.a*e+o.c*t+o.tx,o.b*e+o.d*t+o.ty,o.a*r+o.c*s+o.tx,o.b*r+o.d*s+o.ty,i),this}rect(e,t,r,s){return this._tick++,this._activePath.rect(e,t,r,s,this._transform.clone()),this}roundRect(e,t,r,s,i){return this._tick++,this._activePath.roundRect(e,t,r,s,i,this._transform.clone()),this}poly(e,t){return this._tick++,this._activePath.poly(e,t,this._transform.clone()),this}regularPoly(e,t,r,s,i=0,o){return this._tick++,this._activePath.regularPoly(e,t,r,s,i,o),this}roundPoly(e,t,r,s,i,o){return this._tick++,this._activePath.roundPoly(e,t,r,s,i,o),this}roundShape(e,t,r,s){return this._tick++,this._activePath.roundShape(e,t,r,s),this}filletRect(e,t,r,s,i){return this._tick++,this._activePath.filletRect(e,t,r,s,i),this}chamferRect(e,t,r,s,i,o){return this._tick++,this._activePath.chamferRect(e,t,r,s,i,o),this}star(e,t,r,s,i=0,o=0){return this._tick++,this._activePath.star(e,t,r,s,i,o,this._transform.clone()),this}svg(e){return this._tick++,Rf(e,this),this}restore(){const e=this._stateStack.pop();return e&&(this._transform=e.transform,this._fillStyle=e.fillStyle,this._strokeStyle=e.strokeStyle),this}save(){return this._stateStack.push({transform:this._transform.clone(),fillStyle:{...this._fillStyle},strokeStyle:{...this._strokeStyle}}),this}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(e){return this._transform.rotate(e),this}scale(e,t=e){return this._transform.scale(e,t),this}setTransform(e,t,r,s,i,o){return e instanceof H?(this._transform.set(e.a,e.b,e.c,e.d,e.tx,e.ty),this):(this._transform.set(e,t,r,s,i,o),this)}transform(e,t,r,s,i,o){return e instanceof H?(this._transform.append(e),this):(Of.set(e,t,r,s,i,o),this._transform.append(Of),this)}translate(e,t=e){return this._transform.translate(e,t),this}clear(){return this._activePath.clear(),this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this._boundsDirty=!0,!this.dirty&&(this.emit("update",this,16),this.dirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;this._boundsDirty=!1;const e=this._bounds;e.clear();for(let t=0;t<this.instructions.length;t++){const r=this.instructions[t],s=r.action;if(s==="fill"){const i=r.data;e.addBounds(i.path.bounds)}else if(s==="texture"){const i=r.data;e.addFrame(i.dx,i.dy,i.dx+i.dw,i.dy+i.dh,i.transform)}if(s==="stroke"){const i=r.data,o=i.style.alignment,a=i.style.width*(1-o),u=i.path.bounds;e.addFrame(u.minX-a,u.minY-a,u.maxX+a,u.maxY+a)}}return e}containsPoint(e){var s;if(!this.bounds.containsPoint(e.x,e.y))return!1;const t=this.instructions;let r=!1;for(let i=0;i<t.length;i++){const o=t[i],a=o.data,u=a.path;if(!o.action||!u)continue;const l=a.style,c=u.shapePath.shapePrimitives;for(let h=0;h<c.length;h++){const d=c[h].shape;if(!l||!d)continue;const f=c[h].transform,g=f?f.applyInverse(e,f2):e;if(o.action==="fill")r=d.contains(g.x,g.y);else{const p=l;r=d.strokeContains(g.x,g.y,p.width,p.alignment)}const x=a.hole;if(x){const p=(s=x.shapePath)==null?void 0:s.shapePrimitives;if(p)for(let b=0;b<p.length;b++)p[b].shape.contains(g.x,g.y)&&(r=!1)}if(r)return!0}}return r}unload(){var e;this.emit("unload",this);for(const t in this._gpuData)(e=this._gpuData[t])==null||e.destroy();this._gpuData=Object.create(null)}destroy(e=!1){if(this.destroyed)return;if(this.destroyed=!0,this._stateStack.length=0,this._transform=null,this.unload(),this.emit("destroy",this),this.removeAllListeners(),typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._fillStyle.texture&&(this._fillStyle.fill&&"uid"in this._fillStyle.fill?this._fillStyle.fill.destroy():this._fillStyle.texture.destroy(r)),this._strokeStyle.texture&&(this._strokeStyle.fill&&"uid"in this._strokeStyle.fill?this._strokeStyle.fill.destroy():this._strokeStyle.texture.destroy(r))}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};ha.defaultFillStyle={color:16777215,alpha:1,texture:k.WHITE,matrix:null,fill:null,textureSpace:"local"},ha.defaultStrokeStyle={width:1,color:16777215,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:k.WHITE,matrix:null,fill:null,textureSpace:"local",pixelLine:!1};let ze=ha;const da=class tn extends We{constructor(e={}){super(),this.uid=ae("textStyle"),this._tick=0,p2(e);const t={...tn.defaultTextStyle,...e};for(const r in t){const s=r;this[s]=t[r]}this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(e){this._dropShadow!==e&&(e!==null&&typeof e=="object"?this._dropShadow=this._createProxy({...tn.defaultDropShadow,...e}):this._dropShadow=e?this._createProxy({...tn.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(typeof e=="string"?this._fontSize=parseInt(e,10):this._fontSize=e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...ze.defaultFillStyle,...e},()=>{this._fill=Ht({...this._originalFill},ze.defaultFillStyle)})),this._fill=Ht(e===0?"black":e,ze.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...ze.defaultStrokeStyle,...e},()=>{this._stroke=Dn({...this._originalStroke},ze.defaultStrokeStyle)})),this._stroke=Dn(e,ze.defaultStrokeStyle),this.update())}update(){this._tick++,this.emit("update",this)}reset(){const e=tn.defaultTextStyle;for(const t in e)this[t]=e[t]}get styleKey(){return`${this.uid}-${this._tick}`}clone(){return new tn({align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0})}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){var r,s,i,o;if(this.removeAllListeners(),typeof e=="boolean"?e:e==null?void 0:e.texture){const a=typeof e=="boolean"?e:e==null?void 0:e.textureSource;(r=this._fill)!=null&&r.texture&&this._fill.texture.destroy(a),(s=this._originalFill)!=null&&s.texture&&this._originalFill.texture.destroy(a),(i=this._stroke)!=null&&i.texture&&this._stroke.texture.destroy(a),(o=this._originalStroke)!=null&&o.texture&&this._originalStroke.texture.destroy(a)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(r,s,i)=>(r[s]===i||(r[s]=i,t==null||t(s,i),this.update()),!0)})}_isFillStyle(e){return(e??null)!==null&&!(ee.isColorLike(e)||e instanceof Ct||e instanceof Cn)}};da.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5},da.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let it=da;function p2(n){const e=n;if(typeof e.dropShadow=="boolean"&&e.dropShadow){const t=it.defaultDropShadow;n.dropShadow={alpha:e.dropShadowAlpha??t.alpha,angle:e.dropShadowAngle??t.angle,blur:e.dropShadowBlur??t.blur,color:e.dropShadowColor??t.color,distance:e.dropShadowDistance??t.distance}}if(e.strokeThickness!==void 0){L(j,"strokeThickness is now a part of stroke");const t=e.stroke;let r={};if(ee.isColorLike(t))r.color=t;else if(t instanceof Ct||t instanceof Cn)r.fill=t;else if(Object.hasOwnProperty.call(t,"color")||Object.hasOwnProperty.call(t,"fill"))r=t;else throw new Error("Invalid stroke value.");n.stroke={...r,width:e.strokeThickness}}if(Array.isArray(e.fillGradientStops)){if(L(j,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(e.fill)||e.fill.length===0)throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");e.fill.length!==e.fillGradientStops.length&&X("The number of fill colors must match the number of fill gradient stops.");const t=new Ct({start:{x:0,y:0},end:{x:0,y:1},textureSpace:"local"}),r=e.fillGradientStops.slice(),s=e.fill.map(i=>ee.shared.setValue(i).toNumber());r.forEach((i,o)=>{t.addColorStop(i,s[o])}),n.fill={fill:t}}}class Gf{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,t){const r=Q.get().createCanvas();r.width=e,r.height=t;const s=r.getContext("2d");return{canvas:r,context:s}}getOptimalCanvasAndContext(e,t,r=1){e=Math.ceil(e*r-1e-6),t=Math.ceil(t*r-1e-6),e=rr(e),t=rr(t);const s=(e<<17)+(t<<1);this._canvasPool[s]||(this._canvasPool[s]=[]);let i=this._canvasPool[s].pop();return i||(i=this._createCanvasAndContext(e,t)),i}returnCanvasAndContext(e){const t=e.canvas,{width:r,height:s}=t,i=(r<<17)+(s<<1);e.context.resetTransform(),e.context.clearRect(0,0,r,s),this._canvasPool[i].push(e)}clear(){this._canvasPool={}}}const At=new Gf;nr.register(At);const kf=1e5;function Mn(n,e,t,r=0){if(n.texture===k.WHITE&&!n.fill)return ee.shared.setValue(n.color).setAlpha(n.alpha??1).toHexa();if(n.fill){if(n.fill instanceof Cn){const s=n.fill,i=e.createPattern(s.texture.source.resource,"repeat"),o=s.transform.copyTo(H.shared);return o.scale(s.texture.frame.width,s.texture.frame.height),i.setTransform(o),i}else if(n.fill instanceof Ct){const s=n.fill,i=s.type==="linear",o=s.textureSpace==="local";let a=1,u=1;o&&t&&(a=t.width+r,u=t.height+r);let l,c=!1;if(i){const{start:h,end:d}=s;l=e.createLinearGradient(h.x*a,h.y*u,d.x*a,d.y*u),c=Math.abs(d.x-h.x)<Math.abs((d.y-h.y)*.1)}else{const{center:h,innerRadius:d,outerCenter:f,outerRadius:g}=s;l=e.createRadialGradient(h.x*a,h.y*u,d*a,f.x*a,f.y*u,g*a)}if(c&&o&&t){const h=t.lineHeight/u;for(let d=0;d<t.lines.length;d++){const f=(d*t.lineHeight+r/2)/u;s.colorStops.forEach(g=>{const x=f+g.offset*h;l.addColorStop(Math.floor(x*kf)/kf,ee.shared.setValue(g.color).toHex())})}}else s.colorStops.forEach(h=>{l.addColorStop(h.offset,ee.shared.setValue(h.color).toHex())});return l}}else{const s=e.createPattern(n.texture.source.resource,"repeat"),i=n.matrix.copyTo(H.shared);return i.scale(n.texture.frame.width,n.texture.frame.height),s.setTransform(i),s}return X("FillStyle not recognised",n),"red"}const Lf=class Gx extends Io{constructor(e){super(),this.resolution=1,this.pages=[],this._padding=0,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentMaxCharHeight=0,this._currentPageIndex=-1,this._skipKerning=!1;const t={...Gx.defaultOptions,...e};this._textureSize=t.textureSize,this._mipmap=t.mipmap;const r=t.style.clone();t.overrideFill&&(r._fill.color=16777215,r._fill.alpha=1,r._fill.texture=k.WHITE,r._fill.fill=null),this.applyFillAsTint=t.overrideFill;const s=r.fontSize;r.fontSize=this.baseMeasurementFontSize;const i=Tn(r);t.overrideSize?r._stroke&&(r._stroke.width*=this.baseRenderedFontSize/s):r.fontSize=this.baseRenderedFontSize=s,this._style=r,this._skipKerning=t.skipKerning??!1,this.resolution=t.resolution??1,this._padding=t.padding??4,t.textureStyle&&(this._textureStyle=t.textureStyle instanceof tt?t.textureStyle:new tt(t.textureStyle)),this.fontMetrics=Ge.measureFont(i),this.lineHeight=r.lineHeight||this.fontMetrics.fontSize||r.fontSize}ensureCharacters(e){var p,b;const t=Ge.graphemeSegmenter(e).filter(y=>!this._currentChars.includes(y)).filter((y,v,C)=>C.indexOf(y)===v);if(!t.length)return;this._currentChars=[...this._currentChars,...t];let r;this._currentPageIndex===-1?r=this._nextPage():r=this.pages[this._currentPageIndex];let{canvas:s,context:i}=r.canvasAndContext,o=r.texture.source;const a=this._style;let u=this._currentX,l=this._currentY,c=this._currentMaxCharHeight;const h=this.baseRenderedFontSize/this.baseMeasurementFontSize,d=this._padding*h;let f=!1;const g=s.width/this.resolution,x=s.height/this.resolution;for(let y=0;y<t.length;y++){const v=t[y],C=Ge.measureText(v,a,s,!1);C.lineHeight=C.height;const D=C.width*h,B=Math.ceil((a.fontStyle==="italic"?2:1)*D),w=C.height*h,O=B+d*2,A=w+d*2;if(f=!1,v!==`
`&&v!=="\r"&&v!=="	"&&v!==" "&&(f=!0,c=Math.ceil(Math.max(A,c))),u+O>g&&(l+=c,c=A,u=0,l+c>x)){o.update();const R=this._nextPage();s=R.canvasAndContext.canvas,i=R.canvasAndContext.context,o=R.texture.source,u=0,l=0,c=0}const E=D/h-(((p=a.dropShadow)==null?void 0:p.distance)??0)-(((b=a._stroke)==null?void 0:b.width)??0);if(this.chars[v]={id:v.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:E,kerning:{}},f){this._drawGlyph(i,C,u+d,l+d,h,a);const R=o.width*h,F=o.height*h,I=new ne(u/R*o.width,l/F*o.height,O/R*o.width,A/F*o.height);this.chars[v].texture=new k({source:o,frame:I}),u+=Math.ceil(O)}}o.update(),this._currentX=u,this._currentY=l,this._currentMaxCharHeight=c,this._skipKerning&&this._applyKerning(t,i)}get pageTextures(){return L(j,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,t){const r=this._measureCache;for(let s=0;s<e.length;s++){const i=e[s];for(let o=0;o<this._currentChars.length;o++){const a=this._currentChars[o];let u=r[i];u||(u=r[i]=t.measureText(i).width);let l=r[a];l||(l=r[a]=t.measureText(a).width);let c=t.measureText(i+a).width,h=c-(u+l);h&&(this.chars[i].kerning[a]=h),c=t.measureText(i+a).width,h=c-(u+l),h&&(this.chars[a].kerning[i]=h)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,t=At.getOptimalCanvasAndContext(this._textureSize,this._textureSize,e);this._setupContext(t.context,this._style,e);const r=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),s=new k({source:new Lt({resource:t.canvas,resolution:r,alphaMode:"premultiply-alpha-on-upload",autoGenerateMipmaps:this._mipmap})});this._textureStyle&&(s.source.style=this._textureStyle);const i={canvasAndContext:t,texture:s};return this.pages[this._currentPageIndex]=i,i}_setupContext(e,t,r){t.fontSize=this.baseRenderedFontSize,e.scale(r,r),e.font=Tn(t),t.fontSize=this.baseMeasurementFontSize,e.textBaseline=t.textBaseline;const s=t._stroke,i=(s==null?void 0:s.width)??0;if(s&&(e.lineWidth=i,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=Mn(s,e)),t._fill&&(e.fillStyle=Mn(t._fill,e)),t.dropShadow){const o=t.dropShadow,a=ee.shared.setValue(o.color).toArray(),u=o.blur*r,l=o.distance*r;e.shadowColor=`rgba(${a[0]*255},${a[1]*255},${a[2]*255},${o.alpha})`,e.shadowBlur=u,e.shadowOffsetX=Math.cos(o.angle)*l,e.shadowOffsetY=Math.sin(o.angle)*l}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,t,r,s,i,o){const a=t.text,u=t.fontProperties,l=o._stroke,c=((l==null?void 0:l.width)??0)*i,h=r+c/2,d=s-c/2,f=u.descent*i,g=t.lineHeight*i;let x=!1;o.stroke&&c&&(x=!0,e.strokeText(a,h,d+g-f));const{shadowBlur:p,shadowOffsetX:b,shadowOffsetY:y}=e;o._fill&&(x&&(e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0),e.fillText(a,h,d+g-f)),x&&(e.shadowBlur=p,e.shadowOffsetX=b,e.shadowOffsetY=y)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:t,texture:r}=this.pages[e];At.returnCanvasAndContext(t),r.destroy(!0)}this.pages=null}};Lf.defaultOptions={textureSize:512,style:new it,mipmap:!0};let fa=Lf;function Hs(n,e,t,r){const s={width:0,height:0,offsetY:0,scale:e.fontSize/t.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};s.offsetY=t.baseLineOffset;let i=s.lines[0],o=null,a=!0;const u={width:0,start:0,index:0,positions:[],chars:[]},l=t.baseMeasurementFontSize/e.fontSize,c=e.letterSpacing*l,h=e.wordWrapWidth*l,d=e.lineHeight?e.lineHeight*l:t.lineHeight,f=e.wordWrap&&e.breakWords,g=b=>{const y=i.width;for(let v=0;v<u.index;v++){const C=b.positions[v];i.chars.push(b.chars[v]),i.charPositions.push(C+y)}i.width+=b.width,a=!1,u.width=0,u.index=0,u.chars.length=0},x=()=>{let b=i.chars.length-1;if(r){let y=i.chars[b];for(;y===" ";)i.width-=t.chars[y].xAdvance,y=i.chars[--b]}s.width=Math.max(s.width,i.width),i={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},a=!0,s.lines.push(i),s.height+=d},p=b=>b-c>h;for(let b=0;b<n.length+1;b++){let y;const v=b===n.length;v||(y=n[b]);const C=t.chars[y]||t.chars[" "];if(/(?:\s)/.test(y)||y==="\r"||y===`
`||v){if(!a&&e.wordWrap&&p(i.width+u.width)?(x(),g(u),v||i.charPositions.push(0)):(u.start=i.width,g(u),v||i.charPositions.push(0)),y==="\r"||y===`
`)x();else if(!v){const O=C.xAdvance+(C.kerning[o]||0)+c;i.width+=O,i.spaceWidth=O,i.spacesIndex.push(i.charPositions.length),i.chars.push(y)}}else{const w=C.kerning[o]||0,O=C.xAdvance+w+c;f&&p(i.width+u.width+O)&&(g(u),x()),u.positions[u.index++]=u.width+w,u.chars.push(y),u.width+=O}o=y}return x(),e.align==="center"?m2(s):e.align==="right"?g2(s):e.align==="justify"&&_2(s),s}function m2(n){for(let e=0;e<n.lines.length;e++){const t=n.lines[e],r=n.width/2-t.width/2;for(let s=0;s<t.charPositions.length;s++)t.charPositions[s]+=r}}function g2(n){for(let e=0;e<n.lines.length;e++){const t=n.lines[e],r=n.width-t.width;for(let s=0;s<t.charPositions.length;s++)t.charPositions[s]+=r}}function _2(n){const e=n.width;for(let t=0;t<n.lines.length;t++){const r=n.lines[t];let s=0,i=r.spacesIndex[s++],o=0;const a=r.spacesIndex.length,l=(e-r.width)/a;for(let c=0;c<r.charPositions.length;c++)c===i&&(i=r.spacesIndex[s++],o+=l),r.charPositions[c]+=o}}function Nf(n){if(n==="")return[];typeof n=="string"&&(n=[n]);const e=[];for(let t=0,r=n.length;t<r;t++){const s=n[t];if(Array.isArray(s)){if(s.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${s.length}.`);if(s[0].length===0||s[1].length===0)throw new Error("[BitmapFont]: Invalid character delimiter.");const i=s[0].charCodeAt(0),o=s[1].charCodeAt(0);if(o<i)throw new Error("[BitmapFont]: Invalid character range.");for(let a=i,u=o;a<=u;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(s))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}let Vs=0;class x2{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1,textureStyle:null},this.measureCache=Cd(1e3)}getFont(e,t){var o;let r=`${t.fontFamily}-bitmap`,s=!0;if(t._fill.fill&&!t._stroke?(r+=t._fill.fill.styleKey,s=!1):(t._stroke||t.dropShadow)&&(r=`${t.styleKey}-bitmap`,s=!1),!se.has(r)){const a=Object.create(t);a.lineHeight=0;const u=new fa({style:a,overrideFill:s,overrideSize:!0,...this.defaultOptions});Vs++,Vs>50&&X("BitmapText",`You have dynamically created ${Vs} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``),u.once("destroy",()=>{Vs--,se.remove(r)}),se.set(r,u)}const i=se.get(r);return(o=i.ensureCharacters)==null||o.call(i,e),i}getLayout(e,t,r=!0){const s=this.getFont(e,t),i=`${e}-${t.styleKey}-${r}`;if(this.measureCache.has(i))return this.measureCache.get(i);const o=Ge.graphemeSegmenter(e),a=Hs(o,t,s,r);return this.measureCache.set(i,a),a}measureText(e,t,r=!0){return this.getLayout(e,t,r)}install(...e){var l,c,h,d;let t=e[0];typeof t=="string"&&(t={name:t,style:e[1],chars:(l=e[2])==null?void 0:l.chars,resolution:(c=e[2])==null?void 0:c.resolution,padding:(h=e[2])==null?void 0:h.padding,skipKerning:(d=e[2])==null?void 0:d.skipKerning},L(j,"BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));const r=t==null?void 0:t.name;if(!r)throw new Error("[BitmapFontManager] Property `name` is required.");t={...this.defaultOptions,...t};const s=t.style,i=s instanceof it?s:new it(s),o=t.dynamicFill??this._canUseTintForStyle(i),a=new fa({style:i,overrideFill:o,skipKerning:t.skipKerning,padding:t.padding,resolution:t.resolution,overrideSize:!1,textureStyle:t.textureStyle}),u=Nf(t.chars);return a.ensureCharacters(u.join("")),se.set(`${r}-bitmap`,a),a.once("destroy",()=>se.remove(`${r}-bitmap`)),a}uninstall(e){const t=`${e}-bitmap`,r=se.get(t);r&&r.destroy()}_canUseTintForStyle(e){return!e._stroke&&(!e.dropShadow||e.dropShadow.color===0)&&!e._fill.fill&&e._fill.color===16777215}}const Lr=new x2;class pa extends Io{constructor(e,t){super();const{textures:r,data:s}=e;Object.keys(s.pages).forEach(i=>{const o=s.pages[parseInt(i,10)],a=r[o.id];this.pages.push({texture:a})}),Object.keys(s.chars).forEach(i=>{const o=s.chars[i],{frame:a,source:u,rotate:l}=r[o.page],c=J.transformRectCoords(o,a,l,new ne),h=new k({frame:c,orig:new ne(0,0,o.width,o.height),source:u,rotate:l});this.chars[i]={id:i.codePointAt(0),xOffset:o.xOffset,yOffset:o.yOffset,xAdvance:o.xAdvance,kerning:o.kerning??{},texture:h}}),this.baseRenderedFontSize=s.fontSize,this.baseMeasurementFontSize=s.fontSize,this.fontMetrics={ascent:0,descent:0,fontSize:s.fontSize},this.baseLineOffset=s.baseLineOffset,this.lineHeight=s.lineHeight,this.fontFamily=s.fontFamily,this.distanceField=s.distanceField??{type:"none",range:0},this.url=t}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{texture:t}=this.pages[e];t.destroy(!0)}this.pages=null}static install(e){Lr.install(e)}static uninstall(e){Lr.uninstall(e)}}const Ws={test(n){return typeof n=="string"&&n.startsWith("info face=")},parse(n){const e=n.match(/^[a-z]+\s+.+$/gm),t={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const h in e){const d=e[h].match(/^[a-z]+/gm)[0],f=e[h].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),g={};for(const x in f){const p=f[x].split("="),b=p[0],y=p[1].replace(/"/gm,""),v=parseFloat(y),C=isNaN(v)?y:v;g[b]=C}t[d].push(g)}const r={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},[s]=t.info,[i]=t.common,[o]=t.distanceField??[];o&&(r.distanceField={range:parseInt(o.distanceRange,10),type:o.fieldType}),r.fontSize=parseInt(s.size,10),r.fontFamily=s.face,r.lineHeight=parseInt(i.lineHeight,10);const a=t.page;for(let h=0;h<a.length;h++)r.pages.push({id:parseInt(a[h].id,10)||0,file:a[h].file});const u={};r.baseLineOffset=r.lineHeight-parseInt(i.base,10);const l=t.char;for(let h=0;h<l.length;h++){const d=l[h],f=parseInt(d.id,10);let g=d.letter??d.char??String.fromCharCode(f);g==="space"&&(g=" "),u[f]=g,r.chars[g]={id:f,page:parseInt(d.page,10)||0,x:parseInt(d.x,10),y:parseInt(d.y,10),width:parseInt(d.width,10),height:parseInt(d.height,10),xOffset:parseInt(d.xoffset,10),yOffset:parseInt(d.yoffset,10),xAdvance:parseInt(d.xadvance,10),kerning:{}}}const c=t.kerning||[];for(let h=0;h<c.length;h++){const d=parseInt(c[h].first,10),f=parseInt(c[h].second,10),g=parseInt(c[h].amount,10);r.chars[u[f]].kerning[u[d]]=g}return r}},ma={test(n){const e=n;return typeof e!="string"&&"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(n){const e={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},t=n.getElementsByTagName("info")[0],r=n.getElementsByTagName("common")[0],s=n.getElementsByTagName("distanceField")[0];s&&(e.distanceField={type:s.getAttribute("fieldType"),range:parseInt(s.getAttribute("distanceRange"),10)});const i=n.getElementsByTagName("page"),o=n.getElementsByTagName("char"),a=n.getElementsByTagName("kerning");e.fontSize=parseInt(t.getAttribute("size"),10),e.fontFamily=t.getAttribute("face"),e.lineHeight=parseInt(r.getAttribute("lineHeight"),10);for(let l=0;l<i.length;l++)e.pages.push({id:parseInt(i[l].getAttribute("id"),10)||0,file:i[l].getAttribute("file")});const u={};e.baseLineOffset=e.lineHeight-parseInt(r.getAttribute("base"),10);for(let l=0;l<o.length;l++){const c=o[l],h=parseInt(c.getAttribute("id"),10);let d=c.getAttribute("letter")??c.getAttribute("char")??String.fromCharCode(h);d==="space"&&(d=" "),u[h]=d,e.chars[d]={id:h,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let l=0;l<a.length;l++){const c=parseInt(a[l].getAttribute("first"),10),h=parseInt(a[l].getAttribute("second"),10),d=parseInt(a[l].getAttribute("amount"),10);e.chars[u[h]].kerning[u[c]]=d}return e}},ga={test(n){return typeof n=="string"&&n.match(/<font(\s|>)/)?ma.test(Q.get().parseXML(n)):!1},parse(n){return ma.parse(Q.get().parseXML(n))}},b2=[".xml",".fnt"],zf={extension:{type:T.CacheParser,name:"cacheBitmapFont"},test:n=>n instanceof pa,getCacheableAssets(n,e){const t={};return n.forEach(r=>{t[r]=e,t[`${r}-bitmap`]=e}),t[`${e.fontFamily}-bitmap`]=e,t}},Hf={extension:{type:T.LoadParser,priority:rt.Normal},name:"loadBitmapFont",id:"bitmap-font",test(n){return b2.includes(Xe.extname(n).toLowerCase())},async testParse(n){return Ws.test(n)||ga.test(n)},async parse(n,e,t){const r=Ws.test(n)?Ws.parse(n):ga.parse(n),{src:s}=e,{pages:i}=r,o=[],a=r.distanceField?{scaleMode:"linear",alphaMode:"premultiply-alpha-on-upload",autoGenerateMipmaps:!1,resolution:1}:{};for(let h=0;h<i.length;++h){const d=i[h].file;let f=Xe.join(Xe.dirname(s),d);f=ms(f,s),o.push({src:f,data:a})}const u=await t.load(o),l=o.map(h=>u[h.src]);return new pa({data:r,textures:l},s)},async load(n,e){return await(await Q.get().fetch(n)).text()},async unload(n,e,t){await Promise.all(n.pages.map(r=>t.unload(r.texture.source._sourceOrigin))),n.destroy()}};class Vf{constructor(e,t=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=t}add(e){e.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],t=Math.min(this._assetList.length,this._maxConcurrent);for(let r=0;r<t;r++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}const Wf={extension:{type:T.CacheParser,name:"cacheTextureArray"},test:n=>Array.isArray(n)&&n.every(e=>e instanceof k),getCacheableAssets:(n,e)=>{const t={};return n.forEach(r=>{e.forEach((s,i)=>{t[r+(i===0?"":i+1)]=s})}),t}};async function _a(n){if("Image"in globalThis)return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=n});if("createImageBitmap"in globalThis&&"fetch"in globalThis){try{const e=await(await fetch(n)).blob();await createImageBitmap(e)}catch{return!1}return!0}return!1}const Xf={extension:{type:T.DetectionParser,priority:1},test:async()=>_a("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),add:async n=>[...n,"avif"],remove:async n=>n.filter(e=>e!=="avif")},$f=["png","jpg","jpeg"],Yf={extension:{type:T.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async n=>[...n,...$f],remove:async n=>n.filter(e=>!$f.includes(e))},y2="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function Fn(n){return y2?!1:document.createElement("video").canPlayType(n)!==""}const qf={extension:{type:T.DetectionParser,priority:0},test:async()=>Fn("video/mp4"),add:async n=>[...n,"mp4","m4v"],remove:async n=>n.filter(e=>e!=="mp4"&&e!=="m4v")},jf={extension:{type:T.DetectionParser,priority:0},test:async()=>Fn("video/ogg"),add:async n=>[...n,"ogv"],remove:async n=>n.filter(e=>e!=="ogv")},Kf={extension:{type:T.DetectionParser,priority:0},test:async()=>Fn("video/webm"),add:async n=>[...n,"webm"],remove:async n=>n.filter(e=>e!=="webm")},Zf={extension:{type:T.DetectionParser,priority:0},test:async()=>_a("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),add:async n=>[...n,"webp"],remove:async n=>n.filter(e=>e!=="webp")},Qf=class Ri{constructor(){this.loadOptions={...Ri.defaultOptions},this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,t,r)=>(this._parsersValidated=!1,e[t]=r,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,t){const r={promise:null,parser:null};return r.promise=(async()=>{var o,a;let s=null,i=null;if((t.parser||t.loadParser)&&(i=this._parserHash[t.parser||t.loadParser],t.loadParser&&X(`[Assets] "loadParser" is deprecated, use "parser" instead for ${e}`),i||X(`[Assets] specified load parser "${t.parser||t.loadParser}" not found while loading ${e}`)),!i){for(let u=0;u<this.parsers.length;u++){const l=this.parsers[u];if(l.load&&((o=l.test)!=null&&o.call(l,e,t,this))){i=l;break}}if(!i)return X(`[Assets] ${e} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`),null}s=await i.load(e,t,this),r.parser=i;for(let u=0;u<this.parsers.length;u++){const l=this.parsers[u];l.parse&&l.parse&&await((a=l.testParse)==null?void 0:a.call(l,s,t,this))&&(s=await l.parse(s,t,this)||s,r.parser=l)}return s})(),r}async load(e,t){this._parsersValidated||this._validateParsers();const r=typeof t=="function"?{...Ri.defaultOptions,...this.loadOptions,onProgress:t}:{...Ri.defaultOptions,...this.loadOptions,...t||{}},{onProgress:s,onError:i,strategy:o,retryCount:a,retryDelay:u}=r;let l=0;const c={},h=hn(e),d=ut(e,x=>({alias:[x],src:x,data:{}})),f=d.reduce((x,p)=>x+(p.progressSize||1),0),g=d.map(async x=>{const p=Xe.toAbsolute(x.src);c[x.src]||(await this._loadAssetWithRetry(p,x,{onProgress:s,onError:i,strategy:o,retryCount:a,retryDelay:u},c),l+=x.progressSize||1,s&&s(l/f))});return await Promise.all(g),h?c[d[0].src]:c}async unload(e){const r=ut(e,s=>({alias:[s],src:s})).map(async s=>{var a,u;const i=Xe.toAbsolute(s.src),o=this.promiseCache[i];if(o){const l=await o.promise;delete this.promiseCache[i],await((u=(a=o.parser)==null?void 0:a.unload)==null?void 0:u.call(a,l,s,this))}});await Promise.all(r)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name||e.id).reduce((e,t)=>(!t.name&&!t.id?X("[Assets] parser should have an id"):(e[t.name]||e[t.id])&&X(`[Assets] parser id conflict "${t.id}"`),e[t.name]=t,t.id&&(e[t.id]=t),e),{})}async _loadAssetWithRetry(e,t,r,s){let i=0;const{onError:o,strategy:a,retryCount:u,retryDelay:l}=r,c=h=>new Promise(d=>setTimeout(d,h));for(;;)try{this.promiseCache[e]||(this.promiseCache[e]=this._getLoadPromiseAndParser(e,t)),s[t.src]=await this.promiseCache[e].promise;return}catch(h){delete this.promiseCache[e],delete s[t.src],i++;const d=a!=="retry"||i>u;if(a==="retry"&&!d){o&&o(h,t),await c(l);continue}if(a==="skip"){o&&o(h,t);return}o&&o(h,t);const f=new Error(`[Loader.load] Failed to load ${e}.
${h}`);throw h instanceof Error&&h.stack&&(f.stack=h.stack),f}}};Qf.defaultOptions={onProgress:void 0,onError:void 0,strategy:"throw",retryCount:3,retryDelay:250};let Jf=Qf;function ur(n,e){if(Array.isArray(e)){for(const t of e)if(n.startsWith(`data:${t}`))return!0;return!1}return n.startsWith(`data:${e}`)}function lt(n,e){const t=n.split("?")[0],r=Xe.extname(t).toLowerCase();return Array.isArray(e)?e.includes(r):r===e}const v2=".json",S2="application/json",ep={extension:{type:T.LoadParser,priority:rt.Low},name:"loadJson",id:"json",test(n){return ur(n,S2)||lt(n,v2)},async load(n){return await(await Q.get().fetch(n)).json()}},T2=".txt",C2="text/plain",tp={name:"loadTxt",id:"text",extension:{type:T.LoadParser,priority:rt.Low,name:"loadTxt"},test(n){return ur(n,C2)||lt(n,T2)},async load(n){return await(await Q.get().fetch(n)).text()}},A2=["normal","bold","100","200","300","400","500","600","700","800","900"],w2=[".ttf",".otf",".woff",".woff2"],E2=["font/ttf","font/otf","font/woff","font/woff2"],P2=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function rp(n){const e=Xe.extname(n),s=Xe.basename(n,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1));let i=s.length>0;for(const a of s)if(!a.match(P2)){i=!1;break}let o=s.join(" ");return i||(o=`"${o.replace(/[\\"]/g,"\\$&")}"`),o}const B2=/^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;function R2(n){return B2.test(n)?n:encodeURI(n)}const np={extension:{type:T.LoadParser,priority:rt.Low},name:"loadWebFont",id:"web-font",test(n){return ur(n,E2)||lt(n,w2)},async load(n,e){var r,s,i;const t=Q.get().getFontFaceSet();if(t){const o=[],a=((r=e.data)==null?void 0:r.family)??rp(n),u=((i=(s=e.data)==null?void 0:s.weights)==null?void 0:i.filter(c=>A2.includes(c)))??["normal"],l=e.data??{};for(let c=0;c<u.length;c++){const h=u[c],d=new FontFace(a,`url(${R2(n)})`,{...l,weight:h});await d.load(),t.add(d),o.push(d)}return se.has(`${a}-and-url`)?se.get(`${a}-and-url`).entries.push({url:n,faces:o}):se.set(`${a}-and-url`,{entries:[{url:n,faces:o}]}),o.length===1?o[0]:o}return X("[loadWebFont] FontFace API is not supported. Skipping loading font"),null},unload(n){const e=Array.isArray(n)?n:[n],t=e[0].family,r=se.get(`${t}-and-url`),s=r.entries.find(i=>i.faces.some(o=>e.indexOf(o)!==-1));s.faces=s.faces.filter(i=>e.indexOf(i)===-1),s.faces.length===0&&(r.entries=r.entries.filter(i=>i!==s)),e.forEach(i=>{Q.get().getFontFaceSet().delete(i)}),r.entries.length===0&&se.remove(`${t}-and-url`)}};function Xs(n,e=1){var r;const t=(r=Nt.RETINA_PREFIX)==null?void 0:r.exec(n);return t?parseFloat(t[1]):e}function Vt(n,e,t){n.label=t,n._sourceOrigin=t;const r=new k({source:n,label:t}),s=()=>{delete e.promiseCache[t],se.has(t)&&se.remove(t)};return r.source.once("destroy",()=>{e.promiseCache[t]&&(X("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource."),s())}),r.once("destroy",()=>{n.destroyed||(X("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."),s())}),r}const D2=".svg",M2="image/svg+xml",sp={extension:{type:T.LoadParser,priority:rt.Low,name:"loadSVG"},name:"loadSVG",id:"svg",config:{crossOrigin:"anonymous",parseAsGraphicsContext:!1},test(n){return ur(n,M2)||lt(n,D2)},async load(n,e,t){var r;return((r=e.data)==null?void 0:r.parseAsGraphicsContext)??this.config.parseAsGraphicsContext?U2(n):F2(n,e,t,this.config.crossOrigin)},unload(n){n.destroy(!0)}};async function F2(n,e,t,r){var p,b,y;const s=await Q.get().fetch(n),i=Q.get().createImage();i.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(await s.text())}`,i.crossOrigin=r,await i.decode();const o=((p=e.data)==null?void 0:p.width)??i.width,a=((b=e.data)==null?void 0:b.height)??i.height,u=((y=e.data)==null?void 0:y.resolution)||Xs(n),l=Math.ceil(o*u),c=Math.ceil(a*u),h=Q.get().createCanvas(l,c),d=h.getContext("2d");d.imageSmoothingEnabled=!0,d.imageSmoothingQuality="high",d.drawImage(i,0,0,o*u,a*u);const{parseAsGraphicsContext:f,...g}=e.data??{},x=new Lt({resource:h,alphaMode:"premultiply-alpha-on-upload",resolution:u,...g});return Vt(x,t,n)}async function U2(n){const t=await(await Q.get().fetch(n)).text(),r=new ze;return r.svg(t),r}const I2=`(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (_e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;let Nr=null,xa=class{constructor(){Nr||(Nr=URL.createObjectURL(new Blob([I2],{type:"application/javascript"}))),this.worker=new Worker(Nr)}};xa.revokeObjectURL=function(){Nr&&(URL.revokeObjectURL(Nr),Nr=null)};const O2=`(function () {
    'use strict';

    async function loadImageBitmap(url, alphaMode) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
      }
      const imageBlob = await response.blob();
      return alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);
    }
    self.onmessage = async (event) => {
      try {
        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);
        self.postMessage({
          data: imageBitmap,
          uuid: event.data.uuid,
          id: event.data.id
        }, [imageBitmap]);
      } catch (e) {
        self.postMessage({
          error: e,
          uuid: event.data.uuid,
          id: event.data.id
        });
      }
    };

})();
`;let zr=null,ip=class{constructor(){zr||(zr=URL.createObjectURL(new Blob([O2],{type:"application/javascript"}))),this.worker=new Worker(zr)}};ip.revokeObjectURL=function(){zr&&(URL.revokeObjectURL(zr),zr=null)};let op=0,ba;class G2{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const{worker:t}=new xa;t.addEventListener("message",r=>{t.terminate(),xa.revokeObjectURL(),e(r.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e,t){var r;return this._run("loadImageBitmap",[e,(r=t==null?void 0:t.data)==null?void 0:r.alphaMode])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){ba===void 0&&(ba=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<ba&&(this._createdWorkers++,e=new ip().worker,e.addEventListener("message",t=>{this._complete(t.data),this._returnWorker(t.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){this._resolveHash[e.uuid]&&(e.error!==void 0?this._resolveHash[e.uuid].reject(e.error):this._resolveHash[e.uuid].resolve(e.data),delete this._resolveHash[e.uuid])}async _run(e,t){await this._initWorkers();const r=new Promise((s,i)=>{this._queue.push({id:e,arguments:t,resolve:s,reject:i})});return this._next(),r}_next(){if(!this._queue.length)return;const e=this._getWorker();if(!e)return;const t=this._queue.pop(),r=t.id;this._resolveHash[op]={resolve:t.resolve,reject:t.reject},e.postMessage({data:t.arguments,uuid:op++,id:r})}reset(){this._workerPool.forEach(e=>e.terminate()),this._workerPool.length=0,Object.values(this._resolveHash).forEach(({reject:e})=>{e==null||e(new Error("WorkerManager has been reset before completion"))}),this._resolveHash={},this._queue.length=0,this._initialized=!1,this._createdWorkers=0}}const ya=new G2,k2=[".jpeg",".jpg",".png",".webp",".avif"],L2=["image/jpeg","image/png","image/webp","image/avif"];async function ap(n,e){var s;const t=await Q.get().fetch(n);if(!t.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${n}: ${t.status} ${t.statusText}`);const r=await t.blob();return((s=e==null?void 0:e.data)==null?void 0:s.alphaMode)==="premultiplied-alpha"?createImageBitmap(r,{premultiplyAlpha:"none"}):createImageBitmap(r)}const va={name:"loadTextures",id:"texture",extension:{type:T.LoadParser,priority:rt.High,name:"loadTextures"},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(n){return ur(n,L2)||lt(n,k2)},async load(n,e,t){var i;let r=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await ya.isImageBitmapSupported()?r=await ya.loadImageBitmap(n,e):r=await ap(n,e):r=await new Promise((o,a)=>{r=Q.get().createImage(),r.crossOrigin=this.config.crossOrigin,r.src=n,r.complete?o(r):(r.onload=()=>{o(r)},r.onerror=a)});const s=new Lt({resource:r,alphaMode:"premultiply-alpha-on-upload",resolution:((i=e.data)==null?void 0:i.resolution)||Xs(n),...e.data});return Vt(s,t,n)},unload(n){n.destroy(!0)}},N2=[".mp4",".m4v",".webm",".ogg",".ogv",".h264",".avi",".mov"];let Sa,Ta;function up(n,e,t){t===void 0&&!e.startsWith("data:")?n.crossOrigin=cp(e):t!==!1&&(n.crossOrigin=typeof t=="string"?t:"anonymous")}function lp(n){return new Promise((e,t)=>{n.addEventListener("canplaythrough",r),n.addEventListener("error",s),n.load();function r(){i(),e()}function s(o){i(),t(o)}function i(){n.removeEventListener("canplaythrough",r),n.removeEventListener("error",s)}})}function cp(n,e=globalThis.location){if(n.startsWith("data:"))return"";e||(e=globalThis.location);const t=new URL(n,document.baseURI);return t.hostname!==e.hostname||t.port!==e.port||t.protocol!==e.protocol?"anonymous":""}function z2(){const n=[],e=[];for(const t of N2){const r=Tr.MIME_TYPES[t.substring(1)]||`video/${t.substring(1)}`;Fn(r)&&(n.push(t),e.includes(r)||e.push(r))}return{validVideoExtensions:n,validVideoMime:e}}const hp={name:"loadVideo",id:"video",extension:{type:T.LoadParser,name:"loadVideo"},test(n){if(!Sa||!Ta){const{validVideoExtensions:r,validVideoMime:s}=z2();Sa=r,Ta=s}const e=ur(n,Ta),t=lt(n,Sa);return e||t},async load(n,e,t){var u,l;const r={...Tr.defaultOptions,resolution:((u=e.data)==null?void 0:u.resolution)||Xs(n),alphaMode:((l=e.data)==null?void 0:l.alphaMode)||await io(),...e.data},s=document.createElement("video"),i={preload:r.autoLoad!==!1?"auto":void 0,"webkit-playsinline":r.playsinline!==!1?"":void 0,playsinline:r.playsinline!==!1?"":void 0,muted:r.muted===!0?"":void 0,loop:r.loop===!0?"":void 0,autoplay:r.autoPlay!==!1?"":void 0};Object.keys(i).forEach(c=>{const h=i[c];h!==void 0&&s.setAttribute(c,h)}),r.muted===!0&&(s.muted=!0),up(s,n,r.crossorigin);const o=document.createElement("source");let a;if(r.mime)a=r.mime;else if(n.startsWith("data:"))a=n.slice(5,n.indexOf(";"));else if(!n.startsWith("blob:")){const c=n.split("?")[0].slice(n.lastIndexOf(".")+1).toLowerCase();a=Tr.MIME_TYPES[c]||`video/${c}`}return o.src=n,a&&(o.type=a),new Promise(c=>{const h=async()=>{const d=new Tr({...r,resource:s});s.removeEventListener("canplay",h),e.data.preload&&await lp(s),c(Vt(d,t,n))};r.preload&&!r.autoPlay&&s.load(),s.addEventListener("canplay",h),s.appendChild(o)})},unload(n){n.destroy(!0)}},Ca={extension:{type:T.ResolveParser,name:"resolveTexture"},test:va.test,parse:n=>{var e;return{resolution:parseFloat(((e=Nt.RETINA_PREFIX.exec(n))==null?void 0:e[1])??"1"),format:n.split(".").pop(),src:n}}},dp={extension:{type:T.ResolveParser,priority:-2,name:"resolveJson"},test:n=>Nt.RETINA_PREFIX.test(n)&&n.endsWith(".json"),parse:Ca.parse};class fp{constructor(){this._detections=[],this._initialized=!1,this.resolver=new Nt,this.loader=new Jf,this.cache=se,this._backgroundLoader=new Vf(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){var i,o;if(this._initialized){X("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");return}if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let a=e.manifest;typeof a=="string"&&(a=await this.load(a)),this.resolver.addManifest(a)}const t=((i=e.texturePreference)==null?void 0:i.resolution)??1,r=typeof t=="number"?[t]:t,s=await this._detectFormats({preferredFormats:(o=e.texturePreference)==null?void 0:o.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:s,resolution:r}}),e.preferences&&this.setPreferences(e.preferences),e.loadOptions&&(this.loader.loadOptions={...this.loader.loadOptions,...e.loadOptions})}add(e){this.resolver.add(e)}async load(e,t){this._initialized||await this.init();const r=hn(e),s=ut(e).map(a=>{if(typeof a!="string"){const u=this.resolver.getAlias(a);return u.some(l=>!this.resolver.hasKey(l))&&this.add(a),Array.isArray(u)?u[0]:u}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),i=this.resolver.resolve(s),o=await this._mapLoadToResolve(i,t);return r?o[s[0]]:o}addBundle(e,t){this.resolver.addBundle(e,t)}async loadBundle(e,t){this._initialized||await this.init();let r=!1;typeof e=="string"&&(r=!0,e=[e]);const s=this.resolver.resolveBundle(e),i={},o=Object.keys(s);let a=0;const u=[],l=()=>{t==null||t(u.reduce((h,d)=>h+d,0)/a)},c=o.map((h,d)=>{const f=s[h],g=Object.values(f),p=[...new Set(g.flat())].reduce((b,y)=>b+(y.progressSize||1),0);return u.push(0),a+=p,this._mapLoadToResolve(f,b=>{u[d]=b*p,l()}).then(b=>{i[h]=b})});return await Promise.all(c),r?i[e[0]]:i}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(t))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolveBundle(e);Object.values(t).forEach(r=>{this._backgroundLoader.add(Object.values(r))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return se.get(e);const t={};for(let r=0;r<e.length;r++)t[r]=se.get(e[r]);return t}async _mapLoadToResolve(e,t){const r=[...new Set(Object.values(e))];this._backgroundLoader.active=!1;const s=await this.loader.load(r,t);this._backgroundLoader.active=!0;const i={};return r.forEach(o=>{const a=s[o.src],u=[o.src];o.alias&&u.push(...o.alias),u.forEach(l=>{i[l]=a}),se.set(u,a)}),i}async unload(e){this._initialized||await this.init();const t=ut(e).map(s=>typeof s!="string"?s.src:s),r=this.resolver.resolve(t);await this._unloadFromResolved(r)}async unloadBundle(e){this._initialized||await this.init(),e=ut(e);const t=this.resolver.resolveBundle(e),r=Object.keys(t).map(s=>this._unloadFromResolved(t[s]));await Promise.all(r)}async _unloadFromResolved(e){const t=Object.values(e);t.forEach(r=>{se.remove(r.src)}),await this.loader.unload(t)}async _detectFormats(e){let t=[];e.preferredFormats&&(t=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(const r of e.detections)e.skipDetections||await r.test()?t=await r.add(t):e.skipDetections||(t=await r.remove(t));return t=t.filter((r,s)=>t.indexOf(r)===s),t}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(t=>{t.config&&Object.keys(t.config).filter(r=>r in e).forEach(r=>{t.config[r]=e[r]})})}}const Un=new fp;$.handleByList(T.LoadParser,Un.loader.parsers).handleByList(T.ResolveParser,Un.resolver.parsers).handleByList(T.CacheParser,Un.cache.parsers).handleByList(T.DetectionParser,Un.detections),$.add(Wf,Yf,Xf,Zf,qf,jf,Kf,ep,tp,np,sp,va,hp,Hf,zf,Ca,dp);const pp={loader:T.LoadParser,resolver:T.ResolveParser,cache:T.CacheParser,detection:T.DetectionParser};$.handle(T.Asset,n=>{const e=n.ref;Object.entries(pp).filter(([t])=>!!e[t]).forEach(([t,r])=>$.add(Object.assign(e[t],{extension:e[t].extension??r})))},n=>{const e=n.ref;Object.keys(pp).filter(t=>!!e[t]).forEach(t=>$.remove(e[t]))});const H2={extension:{type:T.DetectionParser,priority:3},test:async()=>!!(await vn()||yn()),add:async n=>[...n,"basis"],remove:async n=>n.filter(e=>e!=="basis")};class In extends fe{constructor(e){super(e),this.uploadMethodId="compressed",this.resource=e.resource,this.mipLevelCount=this.resource.length}}let $s;function Aa(){if($s)return $s;const e=Q.get().createCanvas(1,1).getContext("webgl");return e?($s=[...e.getExtension("EXT_texture_compression_bptc")?["bc6h-rgb-ufloat","bc6h-rgb-float","bc7-rgba-unorm","bc7-rgba-unorm-srgb"]:[],...e.getExtension("WEBGL_compressed_texture_s3tc")?["bc1-rgba-unorm","bc2-rgba-unorm","bc3-rgba-unorm"]:[],...e.getExtension("WEBGL_compressed_texture_s3tc_srgb")?["bc1-rgba-unorm-srgb","bc2-rgba-unorm-srgb","bc3-rgba-unorm-srgb"]:[],...e.getExtension("EXT_texture_compression_rgtc")?["bc4-r-unorm","bc4-r-snorm","bc5-rg-unorm","bc5-rg-snorm"]:[],...e.getExtension("WEBGL_compressed_texture_etc")?["etc2-rgb8unorm","etc2-rgb8unorm-srgb","etc2-rgba8unorm","etc2-rgba8unorm-srgb","etc2-rgb8a1unorm","etc2-rgb8a1unorm-srgb","eac-r11unorm","eac-rg11unorm"]:[],...e.getExtension("WEBGL_compressed_texture_astc")?["astc-4x4-unorm","astc-4x4-unorm-srgb","astc-5x4-unorm","astc-5x4-unorm-srgb","astc-5x5-unorm","astc-5x5-unorm-srgb","astc-6x5-unorm","astc-6x5-unorm-srgb","astc-6x6-unorm","astc-6x6-unorm-srgb","astc-8x5-unorm","astc-8x5-unorm-srgb","astc-8x6-unorm","astc-8x6-unorm-srgb","astc-8x8-unorm","astc-8x8-unorm-srgb","astc-10x5-unorm","astc-10x5-unorm-srgb","astc-10x6-unorm","astc-10x6-unorm-srgb","astc-10x8-unorm","astc-10x8-unorm-srgb","astc-10x10-unorm","astc-10x10-unorm-srgb","astc-12x10-unorm","astc-12x10-unorm-srgb","astc-12x12-unorm","astc-12x12-unorm-srgb"]:[]],$s):[]}let Ys;async function wa(){if(Ys)return Ys;const n=await Q.get().getNavigator().gpu.requestAdapter();return Ys=[...n.features.has("texture-compression-bc")?["bc1-rgba-unorm","bc1-rgba-unorm-srgb","bc2-rgba-unorm","bc2-rgba-unorm-srgb","bc3-rgba-unorm","bc3-rgba-unorm-srgb","bc4-r-unorm","bc4-r-snorm","bc5-rg-unorm","bc5-rg-snorm","bc6h-rgb-ufloat","bc6h-rgb-float","bc7-rgba-unorm","bc7-rgba-unorm-srgb"]:[],...n.features.has("texture-compression-etc2")?["etc2-rgb8unorm","etc2-rgb8unorm-srgb","etc2-rgb8a1unorm","etc2-rgb8a1unorm-srgb","etc2-rgba8unorm","etc2-rgba8unorm-srgb","eac-r11unorm","eac-r11snorm","eac-rg11unorm","eac-rg11snorm"]:[],...n.features.has("texture-compression-astc")?["astc-4x4-unorm","astc-4x4-unorm-srgb","astc-5x4-unorm","astc-5x4-unorm-srgb","astc-5x5-unorm","astc-5x5-unorm-srgb","astc-6x5-unorm","astc-6x5-unorm-srgb","astc-6x6-unorm","astc-6x6-unorm-srgb","astc-8x5-unorm","astc-8x5-unorm-srgb","astc-8x6-unorm","astc-8x6-unorm-srgb","astc-8x8-unorm","astc-8x8-unorm-srgb","astc-10x5-unorm","astc-10x5-unorm-srgb","astc-10x6-unorm","astc-10x6-unorm-srgb","astc-10x8-unorm","astc-10x8-unorm-srgb","astc-10x10-unorm","astc-10x10-unorm-srgb","astc-12x10-unorm","astc-12x10-unorm-srgb","astc-12x12-unorm","astc-12x12-unorm-srgb"]:[]],Ys}let qs;async function Ea(){return qs!==void 0||(qs=await(async()=>{const n=await vn(),e=yn();if(n&&e){const t=await wa(),r=Aa();return t.filter(s=>r.includes(s))}else{if(n)return await wa();if(e)return Aa()}return[]})()),qs}const mp=["r8unorm","r8snorm","r8uint","r8sint","r16uint","r16sint","r16float","rg8unorm","rg8snorm","rg8uint","rg8sint","r32uint","r32sint","r32float","rg16uint","rg16sint","rg16float","rgba8unorm","rgba8unorm-srgb","rgba8snorm","rgba8uint","rgba8sint","bgra8unorm","bgra8unorm-srgb","rgb9e5ufloat","rgb10a2unorm","rg11b10ufloat","rg32uint","rg32sint","rg32float","rgba16uint","rgba16sint","rgba16float","rgba32uint","rgba32sint","rgba32float","stencil8","depth16unorm","depth24plus","depth24plus-stencil8","depth32float","depth32float-stencil8"];let js;async function On(){if(js!==void 0)return js;const n=await Ea();return js=[...mp,...n],js}const V2=`(function () {
    'use strict';

    function createLevelBuffers(basisTexture, basisTranscoderFormat) {
      const images = basisTexture.getNumImages();
      const levels = basisTexture.getNumLevels(0);
      const success = basisTexture.startTranscoding();
      if (!success) {
        throw new Error("startTranscoding failed");
      }
      const levelBuffers = [];
      for (let levelIndex = 0; levelIndex < levels; ++levelIndex) {
        for (let sliceIndex = 0; sliceIndex < images; ++sliceIndex) {
          const transcodeSize = basisTexture.getImageTranscodedSizeInBytes(sliceIndex, levelIndex, basisTranscoderFormat);
          const levelBuffer = new Uint8Array(transcodeSize);
          const success2 = basisTexture.transcodeImage(levelBuffer, sliceIndex, levelIndex, basisTranscoderFormat, 1, 0);
          if (!success2) {
            throw new Error("transcodeImage failed");
          }
          levelBuffers.push(levelBuffer);
        }
      }
      return levelBuffers;
    }

    const gpuFormatToBasisTranscoderFormatMap = {
      "bc3-rgba-unorm": 3,
      // cTFBC3_RGBA
      "bc7-rgba-unorm": 6,
      // cTFBC7_RGBA,
      "etc2-rgba8unorm": 1,
      // cTFETC2_RGBA,
      "astc-4x4-unorm": 10,
      // cTFASTC_4x4_RGBA,
      // Uncompressed
      rgba8unorm: 13,
      // cTFRGBA32,
      rgba4unorm: 16
      // cTFRGBA4444,
    };
    function gpuFormatToBasisTranscoderFormat(transcoderFormat) {
      const format = gpuFormatToBasisTranscoderFormatMap[transcoderFormat];
      if (format) {
        return format;
      }
      throw new Error(\`Unsupported transcoderFormat: \${transcoderFormat}\`);
    }

    const settings = {
      jsUrl: "basis/basis_transcoder.js",
      wasmUrl: "basis/basis_transcoder.wasm"
    };
    let basisTranscoderFormat;
    let basisTranscodedTextureFormat;
    let basisPromise;
    async function getBasis() {
      if (!basisPromise) {
        const absoluteJsUrl = new URL(settings.jsUrl, location.origin).href;
        const absoluteWasmUrl = new URL(settings.wasmUrl, location.origin).href;
        importScripts(absoluteJsUrl);
        basisPromise = new Promise((resolve) => {
          BASIS({
            locateFile: (_file) => absoluteWasmUrl
          }).then((module) => {
            module.initializeBasis();
            resolve(module.BasisFile);
          });
        });
      }
      return basisPromise;
    }
    async function fetchBasisTexture(url, BasisTexture) {
      const basisResponse = await fetch(url);
      if (basisResponse.ok) {
        const basisArrayBuffer = await basisResponse.arrayBuffer();
        return new BasisTexture(new Uint8Array(basisArrayBuffer));
      }
      throw new Error(\`Failed to load Basis texture: \${url}\`);
    }
    const preferredTranscodedFormat = [
      "bc7-rgba-unorm",
      "astc-4x4-unorm",
      "etc2-rgba8unorm",
      "bc3-rgba-unorm",
      "rgba8unorm"
    ];
    async function load(url) {
      const BasisTexture = await getBasis();
      const basisTexture = await fetchBasisTexture(url, BasisTexture);
      const levelBuffers = createLevelBuffers(basisTexture, basisTranscoderFormat);
      return {
        width: basisTexture.getImageWidth(0, 0),
        height: basisTexture.getImageHeight(0, 0),
        format: basisTranscodedTextureFormat,
        resource: levelBuffers,
        alphaMode: "no-premultiply-alpha"
      };
    }
    async function init(jsUrl, wasmUrl, supportedTextures) {
      if (jsUrl)
        settings.jsUrl = jsUrl;
      if (wasmUrl)
        settings.wasmUrl = wasmUrl;
      basisTranscodedTextureFormat = preferredTranscodedFormat.filter((format) => supportedTextures.includes(format))[0];
      basisTranscoderFormat = gpuFormatToBasisTranscoderFormat(basisTranscodedTextureFormat);
      await getBasis();
    }
    const messageHandlers = {
      init: async (data) => {
        const { jsUrl, wasmUrl, supportedTextures } = data;
        await init(jsUrl, wasmUrl, supportedTextures);
      },
      load: async (data) => {
        try {
          const textureOptions = await load(data.url);
          return {
            type: "load",
            url: data.url,
            success: true,
            textureOptions,
            transferables: textureOptions.resource?.map((arr) => arr.buffer)
          };
        } catch (e) {
          throw e;
        }
      }
    };
    self.onmessage = async (messageEvent) => {
      const message = messageEvent.data;
      const response = await messageHandlers[message.type](message);
      if (response) {
        self.postMessage(response, response.transferables);
      }
    };

})();
`;let Hr=null,gp=class{constructor(){Hr||(Hr=URL.createObjectURL(new Blob([V2],{type:"application/javascript"}))),this.worker=new Worker(Hr)}};gp.revokeObjectURL=function(){Hr&&(URL.revokeObjectURL(Hr),Hr=null)};const Ks={jsUrl:"https://cdn.jsdelivr.net/npm/pixi.js/transcoders/basis/basis_transcoder.js",wasmUrl:"https://cdn.jsdelivr.net/npm/pixi.js/transcoders/basis/basis_transcoder.wasm"};function W2(n){Object.assign(Ks,n)}let Gn;const _p={};function X2(n){return Gn||(Gn=new gp().worker,Gn.onmessage=e=>{const{success:t,url:r,textureOptions:s}=e.data;t||console.warn("Failed to load Basis texture",r),_p[r](s)},Gn.postMessage({type:"init",jsUrl:Ks.jsUrl,wasmUrl:Ks.wasmUrl,supportedTextures:n})),Gn}function xp(n,e){const t=X2(e);return new Promise(r=>{_p[n]=r,t.postMessage({type:"load",url:n})})}const $2={extension:{type:T.LoadParser,priority:rt.High,name:"loadBasis"},name:"loadBasis",id:"basis",test(n){return lt(n,[".basis"])},async load(n,e,t){const r=await On(),s=await xp(n,r),i=new In(s);return Vt(i,t,n)},unload(n){Array.isArray(n)?n.forEach(e=>e.destroy(!0)):n.destroy(!0)}};function Y2(n,e){const t=n.getNumImages(),r=n.getNumLevels(0);if(!n.startTranscoding())throw new Error("startTranscoding failed");const i=[];for(let o=0;o<r;++o)for(let a=0;a<t;++a){const u=n.getImageTranscodedSizeInBytes(a,o,e),l=new Uint8Array(u);if(!n.transcodeImage(l,a,o,e,1,0))throw new Error("transcodeImage failed");i.push(l)}return i}const q2={"bc3-rgba-unorm":3,"bc7-rgba-unorm":6,"etc2-rgba8unorm":1,"astc-4x4-unorm":10,rgba8unorm:13,rgba4unorm:16};function j2(n){const e=q2[n];if(e)return e;throw new Error(`Unsupported transcoderFormat: ${n}`)}const K2={MAGIC:0,SIZE:1,FLAGS:2,HEIGHT:3,WIDTH:4,MIPMAP_COUNT:7,PIXEL_FORMAT:19,PF_FLAGS:20,FOURCC:21,RGB_BITCOUNT:22,R_BIT_MASK:23,G_BIT_MASK:24,B_BIT_MASK:25,A_BIT_MASK:26},Z2={DXGI_FORMAT:0,RESOURCE_DIMENSION:1,MISC_FLAG:2,ARRAY_SIZE:3,MISC_FLAGS2:4};var Pa=(n=>(n[n.DXGI_FORMAT_UNKNOWN=0]="DXGI_FORMAT_UNKNOWN",n[n.DXGI_FORMAT_R32G32B32A32_TYPELESS=1]="DXGI_FORMAT_R32G32B32A32_TYPELESS",n[n.DXGI_FORMAT_R32G32B32A32_FLOAT=2]="DXGI_FORMAT_R32G32B32A32_FLOAT",n[n.DXGI_FORMAT_R32G32B32A32_UINT=3]="DXGI_FORMAT_R32G32B32A32_UINT",n[n.DXGI_FORMAT_R32G32B32A32_SINT=4]="DXGI_FORMAT_R32G32B32A32_SINT",n[n.DXGI_FORMAT_R32G32B32_TYPELESS=5]="DXGI_FORMAT_R32G32B32_TYPELESS",n[n.DXGI_FORMAT_R32G32B32_FLOAT=6]="DXGI_FORMAT_R32G32B32_FLOAT",n[n.DXGI_FORMAT_R32G32B32_UINT=7]="DXGI_FORMAT_R32G32B32_UINT",n[n.DXGI_FORMAT_R32G32B32_SINT=8]="DXGI_FORMAT_R32G32B32_SINT",n[n.DXGI_FORMAT_R16G16B16A16_TYPELESS=9]="DXGI_FORMAT_R16G16B16A16_TYPELESS",n[n.DXGI_FORMAT_R16G16B16A16_FLOAT=10]="DXGI_FORMAT_R16G16B16A16_FLOAT",n[n.DXGI_FORMAT_R16G16B16A16_UNORM=11]="DXGI_FORMAT_R16G16B16A16_UNORM",n[n.DXGI_FORMAT_R16G16B16A16_UINT=12]="DXGI_FORMAT_R16G16B16A16_UINT",n[n.DXGI_FORMAT_R16G16B16A16_SNORM=13]="DXGI_FORMAT_R16G16B16A16_SNORM",n[n.DXGI_FORMAT_R16G16B16A16_SINT=14]="DXGI_FORMAT_R16G16B16A16_SINT",n[n.DXGI_FORMAT_R32G32_TYPELESS=15]="DXGI_FORMAT_R32G32_TYPELESS",n[n.DXGI_FORMAT_R32G32_FLOAT=16]="DXGI_FORMAT_R32G32_FLOAT",n[n.DXGI_FORMAT_R32G32_UINT=17]="DXGI_FORMAT_R32G32_UINT",n[n.DXGI_FORMAT_R32G32_SINT=18]="DXGI_FORMAT_R32G32_SINT",n[n.DXGI_FORMAT_R32G8X24_TYPELESS=19]="DXGI_FORMAT_R32G8X24_TYPELESS",n[n.DXGI_FORMAT_D32_FLOAT_S8X24_UINT=20]="DXGI_FORMAT_D32_FLOAT_S8X24_UINT",n[n.DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS=21]="DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS",n[n.DXGI_FORMAT_X32_TYPELESS_G8X24_UINT=22]="DXGI_FORMAT_X32_TYPELESS_G8X24_UINT",n[n.DXGI_FORMAT_R10G10B10A2_TYPELESS=23]="DXGI_FORMAT_R10G10B10A2_TYPELESS",n[n.DXGI_FORMAT_R10G10B10A2_UNORM=24]="DXGI_FORMAT_R10G10B10A2_UNORM",n[n.DXGI_FORMAT_R10G10B10A2_UINT=25]="DXGI_FORMAT_R10G10B10A2_UINT",n[n.DXGI_FORMAT_R11G11B10_FLOAT=26]="DXGI_FORMAT_R11G11B10_FLOAT",n[n.DXGI_FORMAT_R8G8B8A8_TYPELESS=27]="DXGI_FORMAT_R8G8B8A8_TYPELESS",n[n.DXGI_FORMAT_R8G8B8A8_UNORM=28]="DXGI_FORMAT_R8G8B8A8_UNORM",n[n.DXGI_FORMAT_R8G8B8A8_UNORM_SRGB=29]="DXGI_FORMAT_R8G8B8A8_UNORM_SRGB",n[n.DXGI_FORMAT_R8G8B8A8_UINT=30]="DXGI_FORMAT_R8G8B8A8_UINT",n[n.DXGI_FORMAT_R8G8B8A8_SNORM=31]="DXGI_FORMAT_R8G8B8A8_SNORM",n[n.DXGI_FORMAT_R8G8B8A8_SINT=32]="DXGI_FORMAT_R8G8B8A8_SINT",n[n.DXGI_FORMAT_R16G16_TYPELESS=33]="DXGI_FORMAT_R16G16_TYPELESS",n[n.DXGI_FORMAT_R16G16_FLOAT=34]="DXGI_FORMAT_R16G16_FLOAT",n[n.DXGI_FORMAT_R16G16_UNORM=35]="DXGI_FORMAT_R16G16_UNORM",n[n.DXGI_FORMAT_R16G16_UINT=36]="DXGI_FORMAT_R16G16_UINT",n[n.DXGI_FORMAT_R16G16_SNORM=37]="DXGI_FORMAT_R16G16_SNORM",n[n.DXGI_FORMAT_R16G16_SINT=38]="DXGI_FORMAT_R16G16_SINT",n[n.DXGI_FORMAT_R32_TYPELESS=39]="DXGI_FORMAT_R32_TYPELESS",n[n.DXGI_FORMAT_D32_FLOAT=40]="DXGI_FORMAT_D32_FLOAT",n[n.DXGI_FORMAT_R32_FLOAT=41]="DXGI_FORMAT_R32_FLOAT",n[n.DXGI_FORMAT_R32_UINT=42]="DXGI_FORMAT_R32_UINT",n[n.DXGI_FORMAT_R32_SINT=43]="DXGI_FORMAT_R32_SINT",n[n.DXGI_FORMAT_R24G8_TYPELESS=44]="DXGI_FORMAT_R24G8_TYPELESS",n[n.DXGI_FORMAT_D24_UNORM_S8_UINT=45]="DXGI_FORMAT_D24_UNORM_S8_UINT",n[n.DXGI_FORMAT_R24_UNORM_X8_TYPELESS=46]="DXGI_FORMAT_R24_UNORM_X8_TYPELESS",n[n.DXGI_FORMAT_X24_TYPELESS_G8_UINT=47]="DXGI_FORMAT_X24_TYPELESS_G8_UINT",n[n.DXGI_FORMAT_R8G8_TYPELESS=48]="DXGI_FORMAT_R8G8_TYPELESS",n[n.DXGI_FORMAT_R8G8_UNORM=49]="DXGI_FORMAT_R8G8_UNORM",n[n.DXGI_FORMAT_R8G8_UINT=50]="DXGI_FORMAT_R8G8_UINT",n[n.DXGI_FORMAT_R8G8_SNORM=51]="DXGI_FORMAT_R8G8_SNORM",n[n.DXGI_FORMAT_R8G8_SINT=52]="DXGI_FORMAT_R8G8_SINT",n[n.DXGI_FORMAT_R16_TYPELESS=53]="DXGI_FORMAT_R16_TYPELESS",n[n.DXGI_FORMAT_R16_FLOAT=54]="DXGI_FORMAT_R16_FLOAT",n[n.DXGI_FORMAT_D16_UNORM=55]="DXGI_FORMAT_D16_UNORM",n[n.DXGI_FORMAT_R16_UNORM=56]="DXGI_FORMAT_R16_UNORM",n[n.DXGI_FORMAT_R16_UINT=57]="DXGI_FORMAT_R16_UINT",n[n.DXGI_FORMAT_R16_SNORM=58]="DXGI_FORMAT_R16_SNORM",n[n.DXGI_FORMAT_R16_SINT=59]="DXGI_FORMAT_R16_SINT",n[n.DXGI_FORMAT_R8_TYPELESS=60]="DXGI_FORMAT_R8_TYPELESS",n[n.DXGI_FORMAT_R8_UNORM=61]="DXGI_FORMAT_R8_UNORM",n[n.DXGI_FORMAT_R8_UINT=62]="DXGI_FORMAT_R8_UINT",n[n.DXGI_FORMAT_R8_SNORM=63]="DXGI_FORMAT_R8_SNORM",n[n.DXGI_FORMAT_R8_SINT=64]="DXGI_FORMAT_R8_SINT",n[n.DXGI_FORMAT_A8_UNORM=65]="DXGI_FORMAT_A8_UNORM",n[n.DXGI_FORMAT_R1_UNORM=66]="DXGI_FORMAT_R1_UNORM",n[n.DXGI_FORMAT_R9G9B9E5_SHAREDEXP=67]="DXGI_FORMAT_R9G9B9E5_SHAREDEXP",n[n.DXGI_FORMAT_R8G8_B8G8_UNORM=68]="DXGI_FORMAT_R8G8_B8G8_UNORM",n[n.DXGI_FORMAT_G8R8_G8B8_UNORM=69]="DXGI_FORMAT_G8R8_G8B8_UNORM",n[n.DXGI_FORMAT_BC1_TYPELESS=70]="DXGI_FORMAT_BC1_TYPELESS",n[n.DXGI_FORMAT_BC1_UNORM=71]="DXGI_FORMAT_BC1_UNORM",n[n.DXGI_FORMAT_BC1_UNORM_SRGB=72]="DXGI_FORMAT_BC1_UNORM_SRGB",n[n.DXGI_FORMAT_BC2_TYPELESS=73]="DXGI_FORMAT_BC2_TYPELESS",n[n.DXGI_FORMAT_BC2_UNORM=74]="DXGI_FORMAT_BC2_UNORM",n[n.DXGI_FORMAT_BC2_UNORM_SRGB=75]="DXGI_FORMAT_BC2_UNORM_SRGB",n[n.DXGI_FORMAT_BC3_TYPELESS=76]="DXGI_FORMAT_BC3_TYPELESS",n[n.DXGI_FORMAT_BC3_UNORM=77]="DXGI_FORMAT_BC3_UNORM",n[n.DXGI_FORMAT_BC3_UNORM_SRGB=78]="DXGI_FORMAT_BC3_UNORM_SRGB",n[n.DXGI_FORMAT_BC4_TYPELESS=79]="DXGI_FORMAT_BC4_TYPELESS",n[n.DXGI_FORMAT_BC4_UNORM=80]="DXGI_FORMAT_BC4_UNORM",n[n.DXGI_FORMAT_BC4_SNORM=81]="DXGI_FORMAT_BC4_SNORM",n[n.DXGI_FORMAT_BC5_TYPELESS=82]="DXGI_FORMAT_BC5_TYPELESS",n[n.DXGI_FORMAT_BC5_UNORM=83]="DXGI_FORMAT_BC5_UNORM",n[n.DXGI_FORMAT_BC5_SNORM=84]="DXGI_FORMAT_BC5_SNORM",n[n.DXGI_FORMAT_B5G6R5_UNORM=85]="DXGI_FORMAT_B5G6R5_UNORM",n[n.DXGI_FORMAT_B5G5R5A1_UNORM=86]="DXGI_FORMAT_B5G5R5A1_UNORM",n[n.DXGI_FORMAT_B8G8R8A8_UNORM=87]="DXGI_FORMAT_B8G8R8A8_UNORM",n[n.DXGI_FORMAT_B8G8R8X8_UNORM=88]="DXGI_FORMAT_B8G8R8X8_UNORM",n[n.DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM=89]="DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM",n[n.DXGI_FORMAT_B8G8R8A8_TYPELESS=90]="DXGI_FORMAT_B8G8R8A8_TYPELESS",n[n.DXGI_FORMAT_B8G8R8A8_UNORM_SRGB=91]="DXGI_FORMAT_B8G8R8A8_UNORM_SRGB",n[n.DXGI_FORMAT_B8G8R8X8_TYPELESS=92]="DXGI_FORMAT_B8G8R8X8_TYPELESS",n[n.DXGI_FORMAT_B8G8R8X8_UNORM_SRGB=93]="DXGI_FORMAT_B8G8R8X8_UNORM_SRGB",n[n.DXGI_FORMAT_BC6H_TYPELESS=94]="DXGI_FORMAT_BC6H_TYPELESS",n[n.DXGI_FORMAT_BC6H_UF16=95]="DXGI_FORMAT_BC6H_UF16",n[n.DXGI_FORMAT_BC6H_SF16=96]="DXGI_FORMAT_BC6H_SF16",n[n.DXGI_FORMAT_BC7_TYPELESS=97]="DXGI_FORMAT_BC7_TYPELESS",n[n.DXGI_FORMAT_BC7_UNORM=98]="DXGI_FORMAT_BC7_UNORM",n[n.DXGI_FORMAT_BC7_UNORM_SRGB=99]="DXGI_FORMAT_BC7_UNORM_SRGB",n[n.DXGI_FORMAT_AYUV=100]="DXGI_FORMAT_AYUV",n[n.DXGI_FORMAT_Y410=101]="DXGI_FORMAT_Y410",n[n.DXGI_FORMAT_Y416=102]="DXGI_FORMAT_Y416",n[n.DXGI_FORMAT_NV12=103]="DXGI_FORMAT_NV12",n[n.DXGI_FORMAT_P010=104]="DXGI_FORMAT_P010",n[n.DXGI_FORMAT_P016=105]="DXGI_FORMAT_P016",n[n.DXGI_FORMAT_420_OPAQUE=106]="DXGI_FORMAT_420_OPAQUE",n[n.DXGI_FORMAT_YUY2=107]="DXGI_FORMAT_YUY2",n[n.DXGI_FORMAT_Y210=108]="DXGI_FORMAT_Y210",n[n.DXGI_FORMAT_Y216=109]="DXGI_FORMAT_Y216",n[n.DXGI_FORMAT_NV11=110]="DXGI_FORMAT_NV11",n[n.DXGI_FORMAT_AI44=111]="DXGI_FORMAT_AI44",n[n.DXGI_FORMAT_IA44=112]="DXGI_FORMAT_IA44",n[n.DXGI_FORMAT_P8=113]="DXGI_FORMAT_P8",n[n.DXGI_FORMAT_A8P8=114]="DXGI_FORMAT_A8P8",n[n.DXGI_FORMAT_B4G4R4A4_UNORM=115]="DXGI_FORMAT_B4G4R4A4_UNORM",n[n.DXGI_FORMAT_P208=116]="DXGI_FORMAT_P208",n[n.DXGI_FORMAT_V208=117]="DXGI_FORMAT_V208",n[n.DXGI_FORMAT_V408=118]="DXGI_FORMAT_V408",n[n.DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE=119]="DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE",n[n.DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE=120]="DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE",n[n.DXGI_FORMAT_FORCE_UINT=121]="DXGI_FORMAT_FORCE_UINT",n))(Pa||{}),Ba=(n=>(n[n.DDS_DIMENSION_TEXTURE1D=2]="DDS_DIMENSION_TEXTURE1D",n[n.DDS_DIMENSION_TEXTURE2D=3]="DDS_DIMENSION_TEXTURE2D",n[n.DDS_DIMENSION_TEXTURE3D=6]="DDS_DIMENSION_TEXTURE3D",n))(Ba||{});function Ue(n){return n.charCodeAt(0)+(n.charCodeAt(1)<<8)+(n.charCodeAt(2)<<16)+(n.charCodeAt(3)<<24)}var Ke=(n=>(n[n.UNKNOWN=0]="UNKNOWN",n[n.R8G8B8=20]="R8G8B8",n[n.A8R8G8B8=21]="A8R8G8B8",n[n.X8R8G8B8=22]="X8R8G8B8",n[n.R5G6B5=23]="R5G6B5",n[n.X1R5G5B5=24]="X1R5G5B5",n[n.A1R5G5B5=25]="A1R5G5B5",n[n.A4R4G4B4=26]="A4R4G4B4",n[n.R3G3B2=27]="R3G3B2",n[n.A8=28]="A8",n[n.A8R3G3B2=29]="A8R3G3B2",n[n.X4R4G4B4=30]="X4R4G4B4",n[n.A2B10G10R10=31]="A2B10G10R10",n[n.A8B8G8R8=32]="A8B8G8R8",n[n.X8B8G8R8=33]="X8B8G8R8",n[n.G16R16=34]="G16R16",n[n.A2R10G10B10=35]="A2R10G10B10",n[n.A16B16G16R16=36]="A16B16G16R16",n[n.A8P8=40]="A8P8",n[n.P8=41]="P8",n[n.L8=50]="L8",n[n.A8L8=51]="A8L8",n[n.A4L4=52]="A4L4",n[n.V8U8=60]="V8U8",n[n.L6V5U5=61]="L6V5U5",n[n.X8L8V8U8=62]="X8L8V8U8",n[n.Q8W8V8U8=63]="Q8W8V8U8",n[n.V16U16=64]="V16U16",n[n.A2W10V10U10=67]="A2W10V10U10",n[n.Q16W16V16U16=110]="Q16W16V16U16",n[n.R16F=111]="R16F",n[n.G16R16F=112]="G16R16F",n[n.A16B16G16R16F=113]="A16B16G16R16F",n[n.R32F=114]="R32F",n[n.G32R32F=115]="G32R32F",n[n.A32B32G32R32F=116]="A32B32G32R32F",n[n.UYVY=Ue("UYVY")]="UYVY",n[n.R8G8_B8G8=Ue("RGBG")]="R8G8_B8G8",n[n.YUY2=Ue("YUY2")]="YUY2",n[n.D3DFMT_G8R8_G8B8=Ue("GRGB")]="D3DFMT_G8R8_G8B8",n[n.DXT1=Ue("DXT1")]="DXT1",n[n.DXT2=Ue("DXT2")]="DXT2",n[n.DXT3=Ue("DXT3")]="DXT3",n[n.DXT4=Ue("DXT4")]="DXT4",n[n.DXT5=Ue("DXT5")]="DXT5",n[n.ATI1=Ue("ATI1")]="ATI1",n[n.AT1N=Ue("AT1N")]="AT1N",n[n.ATI2=Ue("ATI2")]="ATI2",n[n.AT2N=Ue("AT2N")]="AT2N",n[n.BC4U=Ue("BC4U")]="BC4U",n[n.BC4S=Ue("BC4S")]="BC4S",n[n.BC5U=Ue("BC5U")]="BC5U",n[n.BC5S=Ue("BC5S")]="BC5S",n[n.DX10=Ue("DX10")]="DX10",n))(Ke||{});const Ra={[Ke.DXT1]:"bc1-rgba-unorm",[Ke.DXT2]:"bc2-rgba-unorm",[Ke.DXT3]:"bc2-rgba-unorm",[Ke.DXT4]:"bc3-rgba-unorm",[Ke.DXT5]:"bc3-rgba-unorm",[Ke.ATI1]:"bc4-r-unorm",[Ke.BC4U]:"bc4-r-unorm",[Ke.BC4S]:"bc4-r-snorm",[Ke.ATI2]:"bc5-rg-unorm",[Ke.BC5U]:"bc5-rg-unorm",[Ke.BC5S]:"bc5-rg-snorm",36:"rgba16uint",110:"rgba16sint",111:"r16float",112:"rg16float",113:"rgba16float",114:"r32float",115:"rg32float",116:"rgba32float"},Ze={70:"bc1-rgba-unorm",71:"bc1-rgba-unorm",72:"bc1-rgba-unorm-srgb",73:"bc2-rgba-unorm",74:"bc2-rgba-unorm",75:"bc2-rgba-unorm-srgb",76:"bc3-rgba-unorm",77:"bc3-rgba-unorm",78:"bc3-rgba-unorm-srgb",79:"bc4-r-unorm",80:"bc4-r-unorm",81:"bc4-r-snorm",82:"bc5-rg-unorm",83:"bc5-rg-unorm",84:"bc5-rg-snorm",94:"bc6h-rgb-ufloat",95:"bc6h-rgb-ufloat",96:"bc6h-rgb-float",97:"bc7-rgba-unorm",98:"bc7-rgba-unorm",99:"bc7-rgba-unorm-srgb",28:"rgba8unorm",29:"rgba8unorm-srgb",87:"bgra8unorm",91:"bgra8unorm-srgb",41:"r32float",49:"rg8unorm",56:"r16uint",61:"r8unorm",24:"rgb10a2unorm",11:"rgba16uint",13:"rgba16sint",10:"rgba16float",54:"r16float",34:"rg16float",16:"rg32float",2:"rgba32float"},K={MAGIC_VALUE:542327876,MAGIC_SIZE:4,HEADER_SIZE:124,HEADER_DX10_SIZE:20,PIXEL_FORMAT_FLAGS:{ALPHAPIXELS:1,ALPHA:2,FOURCC:4,RGB:64,RGBA:65,YUV:512,LUMINANCE:131072,LUMINANCEA:131073},RESOURCE_MISC_TEXTURECUBE:4,HEADER_FIELDS:K2,HEADER_DX10_FIELDS:Z2,DXGI_FORMAT:Pa,D3D10_RESOURCE_DIMENSION:Ba,D3DFMT:Ke},bp={"bc1-rgba-unorm":8,"bc1-rgba-unorm-srgb":8,"bc2-rgba-unorm":16,"bc2-rgba-unorm-srgb":16,"bc3-rgba-unorm":16,"bc3-rgba-unorm-srgb":16,"bc4-r-unorm":8,"bc4-r-snorm":8,"bc5-rg-unorm":16,"bc5-rg-snorm":16,"bc6h-rgb-ufloat":16,"bc6h-rgb-float":16,"bc7-rgba-unorm":16,"bc7-rgba-unorm-srgb":16};function yp(n,e){const{format:t,fourCC:r,width:s,height:i,dataOffset:o,mipmapCount:a}=J2(n);if(!e.includes(t))throw new Error(`Unsupported texture format: ${r} ${t}, supported: ${e}`);if(a<=1)return{format:t,width:s,height:i,resource:[new Uint8Array(n,o)],alphaMode:"no-premultiply-alpha"};const u=Q2(t,s,i,o,a,n);return{format:t,width:s,height:i,resource:u,alphaMode:"no-premultiply-alpha"}}function Q2(n,e,t,r,s,i){const o=[],a=bp[n];let u=e,l=t,c=r;for(let h=0;h<s;++h){const d=Math.ceil(Math.max(4,u)/4)*4,f=Math.ceil(Math.max(4,l)/4)*4,g=a?d/4*f/4*a:u*l*4,x=new Uint8Array(i,c,g);o.push(x),c+=g,u=Math.max(u>>1,1),l=Math.max(l>>1,1)}return o}function J2(n){const e=new Uint32Array(n,0,K.HEADER_SIZE/Uint32Array.BYTES_PER_ELEMENT);if(e[K.HEADER_FIELDS.MAGIC]!==K.MAGIC_VALUE)throw new Error("Invalid magic number in DDS header");const t=e[K.HEADER_FIELDS.HEIGHT],r=e[K.HEADER_FIELDS.WIDTH],s=Math.max(1,e[K.HEADER_FIELDS.MIPMAP_COUNT]),i=e[K.HEADER_FIELDS.PF_FLAGS],o=e[K.HEADER_FIELDS.FOURCC],a=ey(e,i,o,n),u=K.MAGIC_SIZE+K.HEADER_SIZE+(o===K.D3DFMT.DX10?K.HEADER_DX10_SIZE:0);return{format:a,fourCC:o,width:r,height:t,dataOffset:u,mipmapCount:s}}function ey(n,e,t,r){if(e&K.PIXEL_FORMAT_FLAGS.FOURCC){if(t===K.D3DFMT.DX10){const s=new Uint32Array(r,K.MAGIC_SIZE+K.HEADER_SIZE,K.HEADER_DX10_SIZE/Uint32Array.BYTES_PER_ELEMENT);if(s[K.HEADER_DX10_FIELDS.MISC_FLAG]===K.RESOURCE_MISC_TEXTURECUBE)throw new Error("DDSParser does not support cubemap textures");if(s[K.HEADER_DX10_FIELDS.RESOURCE_DIMENSION]===K.D3D10_RESOURCE_DIMENSION.DDS_DIMENSION_TEXTURE3D)throw new Error("DDSParser does not supported 3D texture data");const a=s[K.HEADER_DX10_FIELDS.DXGI_FORMAT];if(a in Ze)return Ze[a];throw new Error(`DDSParser cannot parse texture data with DXGI format ${a}`)}if(t in Ra)return Ra[t];throw new Error(`DDSParser cannot parse texture data with fourCC format ${t}`)}if(e&K.PIXEL_FORMAT_FLAGS.RGB||e&K.PIXEL_FORMAT_FLAGS.RGBA)return ty(n);throw e&K.PIXEL_FORMAT_FLAGS.YUV?new Error("DDSParser does not supported YUV uncompressed texture data."):e&K.PIXEL_FORMAT_FLAGS.LUMINANCE||e&K.PIXEL_FORMAT_FLAGS.LUMINANCEA?new Error("DDSParser does not support single-channel (lumninance) texture data!"):e&K.PIXEL_FORMAT_FLAGS.ALPHA||e&K.PIXEL_FORMAT_FLAGS.ALPHAPIXELS?new Error("DDSParser does not support single-channel (alpha) texture data!"):new Error("DDSParser failed to load a texture file due to an unknown reason!")}function ty(n){const e=n[K.HEADER_FIELDS.RGB_BITCOUNT],t=n[K.HEADER_FIELDS.R_BIT_MASK],r=n[K.HEADER_FIELDS.G_BIT_MASK],s=n[K.HEADER_FIELDS.B_BIT_MASK],i=n[K.HEADER_FIELDS.A_BIT_MASK];switch(e){case 32:if(t===255&&r===65280&&s===16711680&&i===4278190080)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_R8G8B8A8_UNORM];if(t===16711680&&r===65280&&s===255&&i===4278190080)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_B8G8R8A8_UNORM];if(t===1072693248&&r===1047552&&s===1023&&i===3221225472)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_R10G10B10A2_UNORM];if(t===65535&&r===4294901760&&s===0&&i===0)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_R16G16_UNORM];if(t===4294967295&&r===0&&s===0&&i===0)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_R32_FLOAT];break;case 24:break;case 16:if(t===31744&&r===992&&s===31&&i===32768)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_B5G5R5A1_UNORM];if(t===63488&&r===2016&&s===31&&i===0)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_B5G6R5_UNORM];if(t===3840&&r===240&&s===15&&i===61440)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_B4G4R4A4_UNORM];if(t===255&&r===0&&s===0&&i===65280)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_R8G8_UNORM];if(t===65535&&r===0&&s===0&&i===0)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_R16_UNORM];break;case 8:if(t===255&&r===0&&s===0&&i===0)return Ze[K.DXGI_FORMAT.DXGI_FORMAT_R8_UNORM];break}throw new Error(`DDSParser does not support uncompressed texture with configuration:
                bitCount = ${e}, rBitMask = ${t}, gBitMask = ${r}, aBitMask = ${i}`)}const ry={extension:{type:T.LoadParser,priority:rt.High,name:"loadDDS"},name:"loadDDS",id:"dds",test(n){return lt(n,[".dds"])},async load(n,e,t){const r=await On(),i=await(await fetch(n)).arrayBuffer(),o=yp(i,r),a=new In(o);return Vt(a,t,n)},unload(n){Array.isArray(n)?n.forEach(e=>e.destroy(!0)):n.destroy(!0)}};var vp=(n=>(n[n.RGBA8_SNORM=36759]="RGBA8_SNORM",n[n.RGBA=6408]="RGBA",n[n.RGBA8UI=36220]="RGBA8UI",n[n.SRGB8_ALPHA8=35907]="SRGB8_ALPHA8",n[n.RGBA8I=36238]="RGBA8I",n[n.RGBA8=32856]="RGBA8",n[n.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",n[n.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777]="COMPRESSED_RGBA_S3TC_DXT1_EXT",n[n.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778]="COMPRESSED_RGBA_S3TC_DXT3_EXT",n[n.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",n[n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT=35917]="COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT",n[n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT=35918]="COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT",n[n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT=35919]="COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT",n[n.COMPRESSED_SRGB_S3TC_DXT1_EXT=35916]="COMPRESSED_SRGB_S3TC_DXT1_EXT",n[n.COMPRESSED_RED_RGTC1_EXT=36283]="COMPRESSED_RED_RGTC1_EXT",n[n.COMPRESSED_SIGNED_RED_RGTC1_EXT=36284]="COMPRESSED_SIGNED_RED_RGTC1_EXT",n[n.COMPRESSED_RED_GREEN_RGTC2_EXT=36285]="COMPRESSED_RED_GREEN_RGTC2_EXT",n[n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT=36286]="COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT",n[n.COMPRESSED_R11_EAC=37488]="COMPRESSED_R11_EAC",n[n.COMPRESSED_SIGNED_R11_EAC=37489]="COMPRESSED_SIGNED_R11_EAC",n[n.COMPRESSED_RG11_EAC=37490]="COMPRESSED_RG11_EAC",n[n.COMPRESSED_SIGNED_RG11_EAC=37491]="COMPRESSED_SIGNED_RG11_EAC",n[n.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",n[n.COMPRESSED_RGBA8_ETC2_EAC=37496]="COMPRESSED_RGBA8_ETC2_EAC",n[n.COMPRESSED_SRGB8_ETC2=37493]="COMPRESSED_SRGB8_ETC2",n[n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37497]="COMPRESSED_SRGB8_ALPHA8_ETC2_EAC",n[n.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37494]="COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2",n[n.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37495]="COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2",n[n.COMPRESSED_RGBA_ASTC_4x4_KHR=37808]="COMPRESSED_RGBA_ASTC_4x4_KHR",n[n.COMPRESSED_RGBA_ASTC_5x4_KHR=37809]="COMPRESSED_RGBA_ASTC_5x4_KHR",n[n.COMPRESSED_RGBA_ASTC_5x5_KHR=37810]="COMPRESSED_RGBA_ASTC_5x5_KHR",n[n.COMPRESSED_RGBA_ASTC_6x5_KHR=37811]="COMPRESSED_RGBA_ASTC_6x5_KHR",n[n.COMPRESSED_RGBA_ASTC_6x6_KHR=37812]="COMPRESSED_RGBA_ASTC_6x6_KHR",n[n.COMPRESSED_RGBA_ASTC_8x5_KHR=37813]="COMPRESSED_RGBA_ASTC_8x5_KHR",n[n.COMPRESSED_RGBA_ASTC_8x6_KHR=37814]="COMPRESSED_RGBA_ASTC_8x6_KHR",n[n.COMPRESSED_RGBA_ASTC_8x8_KHR=37815]="COMPRESSED_RGBA_ASTC_8x8_KHR",n[n.COMPRESSED_RGBA_ASTC_10x5_KHR=37816]="COMPRESSED_RGBA_ASTC_10x5_KHR",n[n.COMPRESSED_RGBA_ASTC_10x6_KHR=37817]="COMPRESSED_RGBA_ASTC_10x6_KHR",n[n.COMPRESSED_RGBA_ASTC_10x8_KHR=37818]="COMPRESSED_RGBA_ASTC_10x8_KHR",n[n.COMPRESSED_RGBA_ASTC_10x10_KHR=37819]="COMPRESSED_RGBA_ASTC_10x10_KHR",n[n.COMPRESSED_RGBA_ASTC_12x10_KHR=37820]="COMPRESSED_RGBA_ASTC_12x10_KHR",n[n.COMPRESSED_RGBA_ASTC_12x12_KHR=37821]="COMPRESSED_RGBA_ASTC_12x12_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR=37840]="COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR=37841]="COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR=37842]="COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR=37843]="COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR=37844]="COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR=37845]="COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR=37846]="COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR=37847]="COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR=37848]="COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR=37849]="COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR=37850]="COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR=37851]="COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR=37852]="COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR",n[n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR=37853]="COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR",n[n.COMPRESSED_RGBA_BPTC_UNORM_EXT=36492]="COMPRESSED_RGBA_BPTC_UNORM_EXT",n[n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT=36493]="COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT",n[n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT=36494]="COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT",n[n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT=36495]="COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT",n))(vp||{});const Se={FILE_HEADER_SIZE:64,FILE_IDENTIFIER:[171,75,84,88,32,49,49,187,13,10,26,10],FORMATS_TO_COMPONENTS:{6408:4,6407:3,33319:2,6403:1,6409:1,6410:2,6406:1},INTERNAL_FORMAT_TO_BYTES_PER_PIXEL:{33776:.5,33777:.5,33778:1,33779:1,35916:.5,35917:.5,35918:1,35919:1,36283:.5,36284:.5,36285:1,36286:1,37488:.5,37489:.5,37490:1,37491:1,37492:.5,37496:1,37493:.5,37497:1,37494:.5,37495:.5,37808:1,37840:1,37809:.8,37841:.8,37810:.64,37842:.64,37811:.53375,37843:.53375,37812:.445,37844:.445,37813:.4,37845:.4,37814:.33375,37846:.33375,37815:.25,37847:.25,37816:.32,37848:.32,37817:.26625,37849:.26625,37818:.2,37850:.2,37819:.16,37851:.16,37820:.13375,37852:.13375,37821:.11125,37853:.11125,36492:1,36493:1,36494:1,36495:1},INTERNAL_FORMAT_TO_TEXTURE_FORMATS:{33776:"bc1-rgba-unorm",33777:"bc1-rgba-unorm",33778:"bc2-rgba-unorm",33779:"bc3-rgba-unorm",35916:"bc1-rgba-unorm-srgb",35917:"bc1-rgba-unorm-srgb",35918:"bc2-rgba-unorm-srgb",35919:"bc3-rgba-unorm-srgb",36283:"bc4-r-unorm",36284:"bc4-r-snorm",36285:"bc5-rg-unorm",36286:"bc5-rg-snorm",37488:"eac-r11unorm",37490:"eac-rg11snorm",37492:"etc2-rgb8unorm",37496:"etc2-rgba8unorm",37493:"etc2-rgb8unorm-srgb",37497:"etc2-rgba8unorm-srgb",37494:"etc2-rgb8a1unorm",37495:"etc2-rgb8a1unorm-srgb",37808:"astc-4x4-unorm",37840:"astc-4x4-unorm-srgb",37809:"astc-5x4-unorm",37841:"astc-5x4-unorm-srgb",37810:"astc-5x5-unorm",37842:"astc-5x5-unorm-srgb",37811:"astc-6x5-unorm",37843:"astc-6x5-unorm-srgb",37812:"astc-6x6-unorm",37844:"astc-6x6-unorm-srgb",37813:"astc-8x5-unorm",37845:"astc-8x5-unorm-srgb",37814:"astc-8x6-unorm",37846:"astc-8x6-unorm-srgb",37815:"astc-8x8-unorm",37847:"astc-8x8-unorm-srgb",37816:"astc-10x5-unorm",37848:"astc-10x5-unorm-srgb",37817:"astc-10x6-unorm",37849:"astc-10x6-unorm-srgb",37818:"astc-10x8-unorm",37850:"astc-10x8-unorm-srgb",37819:"astc-10x10-unorm",37851:"astc-10x10-unorm-srgb",37820:"astc-12x10-unorm",37852:"astc-12x10-unorm-srgb",37821:"astc-12x12-unorm",37853:"astc-12x12-unorm-srgb",36492:"bc7-rgba-unorm",36493:"bc7-rgba-unorm-srgb",36494:"bc6h-rgb-float",36495:"bc6h-rgb-ufloat",35907:"rgba8unorm-srgb",36759:"rgba8snorm",36220:"rgba8uint",36238:"rgba8sint",6408:"rgba8unorm"},FIELDS:{FILE_IDENTIFIER:0,ENDIANNESS:12,GL_TYPE:16,GL_TYPE_SIZE:20,GL_FORMAT:24,GL_INTERNAL_FORMAT:28,GL_BASE_INTERNAL_FORMAT:32,PIXEL_WIDTH:36,PIXEL_HEIGHT:40,PIXEL_DEPTH:44,NUMBER_OF_ARRAY_ELEMENTS:48,NUMBER_OF_FACES:52,NUMBER_OF_MIPMAP_LEVELS:56,BYTES_OF_KEY_VALUE_DATA:60},TYPES_TO_BYTES_PER_COMPONENT:{5121:1,5123:2,5124:4,5125:4,5126:4,36193:8},TYPES_TO_BYTES_PER_PIXEL:{32819:2,32820:2,33635:2},ENDIANNESS:67305985};function Sp(n,e){const t=new DataView(n);if(!oy(t))throw new Error("Invalid KTX identifier in header");const{littleEndian:r,glType:s,glFormat:i,glInternalFormat:o,pixelWidth:a,pixelHeight:u,numberOfMipmapLevels:l,offset:c}=iy(t),h=Se.INTERNAL_FORMAT_TO_TEXTURE_FORMATS[o];if(!h)throw new Error(`Unknown texture format ${o}`);if(!e.includes(h))throw new Error(`Unsupported texture format: ${h}, supportedFormats: ${e}`);const d=sy(s,i,o),f=ny(t,s,d,a,u,c,l,r);return{format:h,width:a,height:u,resource:f,alphaMode:"no-premultiply-alpha"}}function ny(n,e,t,r,s,i,o,a){const u=r+3&-4,l=s+3&-4;let c=r*s;e===0&&(c=u*l);let h=c*t,d=r,f=s,g=u,x=l,p=i;const b=new Array(o);for(let y=0;y<o;y++){const v=n.getUint32(p,a);let C=p+4;b[y]=new Uint8Array(n.buffer,C,h),C+=h,p+=v+4,p=p%4!==0?p+4-p%4:p,d=d>>1||1,f=f>>1||1,g=d+4-1&-4,x=f+4-1&-4,h=g*x*t}return b}function sy(n,e,t){let r=Se.INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[t];if(n!==0&&(Se.TYPES_TO_BYTES_PER_COMPONENT[n]?r=Se.TYPES_TO_BYTES_PER_COMPONENT[n]*Se.FORMATS_TO_COMPONENTS[e]:r=Se.TYPES_TO_BYTES_PER_PIXEL[n]),r===void 0)throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");return r}function iy(n){const e=n.getUint32(Se.FIELDS.ENDIANNESS,!0)===Se.ENDIANNESS,t=n.getUint32(Se.FIELDS.GL_TYPE,e),r=n.getUint32(Se.FIELDS.GL_FORMAT,e),s=n.getUint32(Se.FIELDS.GL_INTERNAL_FORMAT,e),i=n.getUint32(Se.FIELDS.PIXEL_WIDTH,e),o=n.getUint32(Se.FIELDS.PIXEL_HEIGHT,e)||1,a=n.getUint32(Se.FIELDS.PIXEL_DEPTH,e)||1,u=n.getUint32(Se.FIELDS.NUMBER_OF_ARRAY_ELEMENTS,e)||1,l=n.getUint32(Se.FIELDS.NUMBER_OF_FACES,e),c=n.getUint32(Se.FIELDS.NUMBER_OF_MIPMAP_LEVELS,e),h=n.getUint32(Se.FIELDS.BYTES_OF_KEY_VALUE_DATA,e);if(o===0||a!==1)throw new Error("Only 2D textures are supported");if(l!==1)throw new Error("CubeTextures are not supported by KTXLoader yet!");if(u!==1)throw new Error("WebGL does not support array textures");return{littleEndian:e,glType:t,glFormat:r,glInternalFormat:s,pixelWidth:i,pixelHeight:o,numberOfMipmapLevels:c,offset:Se.FILE_HEADER_SIZE+h}}function oy(n){for(let e=0;e<Se.FILE_IDENTIFIER.length;e++)if(n.getUint8(e)!==Se.FILE_IDENTIFIER[e])return!1;return!0}const ay={extension:{type:T.LoadParser,priority:rt.High,name:"loadKTX"},name:"loadKTX",id:"ktx",test(n){return lt(n,".ktx")},async load(n,e,t){const r=await On(),i=await(await fetch(n)).arrayBuffer(),o=Sp(i,r),a=new In(o);return Vt(a,t,n)},unload(n){Array.isArray(n)?n.forEach(e=>e.destroy(!0)):n.destroy(!0)}},uy=`(function () {
    'use strict';

    const converters = {
      rgb8unorm: {
        convertedFormat: "rgba8unorm",
        convertFunction: convertRGBtoRGBA
      },
      "rgb8unorm-srgb": {
        convertedFormat: "rgba8unorm-srgb",
        convertFunction: convertRGBtoRGBA
      }
    };
    function convertFormatIfRequired(textureOptions) {
      const format = textureOptions.format;
      if (converters[format]) {
        const convertFunction = converters[format].convertFunction;
        const levelBuffers = textureOptions.resource;
        for (let i = 0; i < levelBuffers.length; i++) {
          levelBuffers[i] = convertFunction(levelBuffers[i]);
        }
        textureOptions.format = converters[format].convertedFormat;
      }
    }
    function convertRGBtoRGBA(levelBuffer) {
      const pixelCount = levelBuffer.byteLength / 3;
      const levelBufferWithAlpha = new Uint32Array(pixelCount);
      for (let i = 0; i < pixelCount; ++i) {
        levelBufferWithAlpha[i] = levelBuffer[i * 3] + (levelBuffer[i * 3 + 1] << 8) + (levelBuffer[i * 3 + 2] << 16) + 4278190080;
      }
      return new Uint8Array(levelBufferWithAlpha.buffer);
    }

    function createLevelBuffersFromKTX(ktxTexture) {
      const levelBuffers = [];
      for (let i = 0; i < ktxTexture.numLevels; i++) {
        const imageData = ktxTexture.getImageData(i, 0, 0);
        const levelBuffer = new Uint8Array(imageData.byteLength);
        levelBuffer.set(imageData);
        levelBuffers.push(levelBuffer);
      }
      return levelBuffers;
    }

    const glFormatToGPUFormatMap = {
      6408: "rgba8unorm",
      32856: "bgra8unorm",
      //
      32857: "rgb10a2unorm",
      33189: "depth16unorm",
      33190: "depth24plus",
      33321: "r8unorm",
      33323: "rg8unorm",
      33325: "r16float",
      33326: "r32float",
      33327: "rg16float",
      33328: "rg32float",
      33329: "r8sint",
      33330: "r8uint",
      33331: "r16sint",
      33332: "r16uint",
      33333: "r32sint",
      33334: "r32uint",
      33335: "rg8sint",
      33336: "rg8uint",
      33337: "rg16sint",
      33338: "rg16uint",
      33339: "rg32sint",
      33340: "rg32uint",
      33778: "bc2-rgba-unorm",
      33779: "bc3-rgba-unorm",
      34836: "rgba32float",
      34842: "rgba16float",
      35056: "depth24plus-stencil8",
      35898: "rg11b10ufloat",
      35901: "rgb9e5ufloat",
      35907: "rgba8unorm-srgb",
      // bgra8unorm-srgb
      36012: "depth32float",
      36013: "depth32float-stencil8",
      36168: "stencil8",
      36208: "rgba32uint",
      36214: "rgba16uint",
      36220: "rgba8uint",
      36226: "rgba32sint",
      36232: "rgba16sint",
      36238: "rgba8sint",
      36492: "bc7-rgba-unorm",
      36756: "r8snorm",
      36757: "rg8snorm",
      36759: "rgba8snorm",
      37496: "etc2-rgba8unorm",
      37808: "astc-4x4-unorm"
    };
    function glFormatToGPUFormat(glInternalFormat) {
      const format = glFormatToGPUFormatMap[glInternalFormat];
      if (format) {
        return format;
      }
      throw new Error(\`Unsupported glInternalFormat: \${glInternalFormat}\`);
    }

    const vkFormatToGPUFormatMap = {
      23: "rgb8unorm",
      // VK_FORMAT_R8G8B8_UNORM
      37: "rgba8unorm",
      // VK_FORMAT_R8G8B8A8_UNORM
      43: "rgba8unorm-srgb"
      // VK_FORMAT_R8G8B8A8_SRGB
      // TODO add more!
    };
    function vkFormatToGPUFormat(vkFormat) {
      const format = vkFormatToGPUFormatMap[vkFormat];
      if (format) {
        return format;
      }
      throw new Error(\`Unsupported VkFormat: \${vkFormat}\`);
    }

    function getTextureFormatFromKTXTexture(ktxTexture) {
      if (ktxTexture.classId === 2) {
        return vkFormatToGPUFormat(ktxTexture.vkFormat);
      }
      return glFormatToGPUFormat(ktxTexture.glInternalformat);
    }

    const gpuFormatToBasisTranscoderFormatMap = {
      "bc3-rgba-unorm": "BC3_RGBA",
      "bc7-rgba-unorm": "BC7_M5_RGBA",
      "etc2-rgba8unorm": "ETC2_RGBA",
      "astc-4x4-unorm": "ASTC_4x4_RGBA",
      // Uncompressed
      rgba8unorm: "RGBA32",
      rg11b10ufloat: "R11F_G11F_B10F"
    };
    function gpuFormatToKTXBasisTranscoderFormat(transcoderFormat) {
      const format = gpuFormatToBasisTranscoderFormatMap[transcoderFormat];
      if (format) {
        return format;
      }
      throw new Error(\`Unsupported transcoderFormat: \${transcoderFormat}\`);
    }

    const settings = {
      jsUrl: "",
      wasmUrl: ""
    };
    let basisTranscoderFormat;
    let basisTranscodedTextureFormat;
    let ktxPromise;
    async function getKTX() {
      if (!ktxPromise) {
        const absoluteJsUrl = new URL(settings.jsUrl, location.origin).href;
        const absoluteWasmUrl = new URL(settings.wasmUrl, location.origin).href;
        importScripts(absoluteJsUrl);
        ktxPromise = new Promise((resolve) => {
          LIBKTX({
            locateFile: (_file) => absoluteWasmUrl
          }).then((libktx) => {
            resolve(libktx);
          });
        });
      }
      return ktxPromise;
    }
    async function fetchKTXTexture(url, ktx) {
      const ktx2Response = await fetch(url);
      if (ktx2Response.ok) {
        const ktx2ArrayBuffer = await ktx2Response.arrayBuffer();
        return new ktx.ktxTexture(new Uint8Array(ktx2ArrayBuffer));
      }
      throw new Error(\`Failed to load KTX(2) texture: \${url}\`);
    }
    const preferredTranscodedFormat = [
      "bc7-rgba-unorm",
      "astc-4x4-unorm",
      "etc2-rgba8unorm",
      "bc3-rgba-unorm",
      "rgba8unorm"
    ];
    async function load(url) {
      const ktx = await getKTX();
      const ktxTexture = await fetchKTXTexture(url, ktx);
      let format;
      if (ktxTexture.needsTranscoding) {
        format = basisTranscodedTextureFormat;
        const transcodeFormat = ktx.TranscodeTarget[basisTranscoderFormat];
        const result = ktxTexture.transcodeBasis(transcodeFormat, 0);
        if (result !== ktx.ErrorCode.SUCCESS) {
          throw new Error("Unable to transcode basis texture.");
        }
      } else {
        format = getTextureFormatFromKTXTexture(ktxTexture);
      }
      const levelBuffers = createLevelBuffersFromKTX(ktxTexture);
      const textureOptions = {
        width: ktxTexture.baseWidth,
        height: ktxTexture.baseHeight,
        format,
        mipLevelCount: ktxTexture.numLevels,
        resource: levelBuffers,
        alphaMode: "no-premultiply-alpha"
      };
      convertFormatIfRequired(textureOptions);
      return textureOptions;
    }
    async function init(jsUrl, wasmUrl, supportedTextures) {
      if (jsUrl)
        settings.jsUrl = jsUrl;
      if (wasmUrl)
        settings.wasmUrl = wasmUrl;
      basisTranscodedTextureFormat = preferredTranscodedFormat.filter((format) => supportedTextures.includes(format))[0];
      basisTranscoderFormat = gpuFormatToKTXBasisTranscoderFormat(basisTranscodedTextureFormat);
      await getKTX();
    }
    const messageHandlers = {
      init: async (data) => {
        const { jsUrl, wasmUrl, supportedTextures } = data;
        await init(jsUrl, wasmUrl, supportedTextures);
      },
      load: async (data) => {
        try {
          const textureOptions = await load(data.url);
          return {
            type: "load",
            url: data.url,
            success: true,
            textureOptions,
            transferables: textureOptions.resource?.map((arr) => arr.buffer)
          };
        } catch (e) {
          throw e;
        }
      }
    };
    self.onmessage = async (messageEvent) => {
      const message = messageEvent.data;
      try {
        const response = await messageHandlers[message.type]?.(message);
        if (response) {
          self.postMessage(response, response.transferables);
        }
      } catch (err) {
        self.postMessage({
          type: "error",
          err,
          url: message.url
        });
      }
    };

})();
`;let Vr=null;class Tp{constructor(){Vr||(Vr=URL.createObjectURL(new Blob([uy],{type:"application/javascript"}))),this.worker=new Worker(Vr)}}Tp.revokeObjectURL=function(){Vr&&(URL.revokeObjectURL(Vr),Vr=null)};const Zs={jsUrl:"https://cdn.jsdelivr.net/npm/pixi.js/transcoders/ktx/libktx.js",wasmUrl:"https://cdn.jsdelivr.net/npm/pixi.js/transcoders/ktx/libktx.wasm"};function ly(n){Object.assign(Zs,n)}let kn;const Cp={},Ap={};function cy(n){return kn||(kn=new Tp().worker,kn.onmessage=e=>{const{err:t,success:r,url:s,textureOptions:i}=e.data;if(t){Ap[s](t);return}r||console.warn("Failed to load KTX texture",s),Cp[s](i)},kn.postMessage({type:"init",jsUrl:Zs.jsUrl,wasmUrl:Zs.wasmUrl,supportedTextures:n})),kn}function wp(n,e){const t=cy(e);return new Promise((r,s)=>{Cp[n]=r,Ap[n]=s,t.postMessage({type:"load",url:n})})}const hy={extension:{type:T.LoadParser,priority:rt.High,name:"loadKTX2"},name:"loadKTX2",id:"ktx2",test(n){return lt(n,".ktx2")},async load(n,e,t){const r=await On(),s=await wp(n,r),i=new In(s);return Vt(i,t,n)},async unload(n){Array.isArray(n)?n.forEach(e=>e.destroy(!0)):n.destroy(!0)}},Da={rgb8unorm:{convertedFormat:"rgba8unorm",convertFunction:Ep},"rgb8unorm-srgb":{convertedFormat:"rgba8unorm-srgb",convertFunction:Ep}};function dy(n){const e=n.format;if(Da[e]){const t=Da[e].convertFunction,r=n.resource;for(let s=0;s<r.length;s++)r[s]=t(r[s]);n.format=Da[e].convertedFormat}}function Ep(n){const e=n.byteLength/3,t=new Uint32Array(e);for(let r=0;r<e;++r)t[r]=n[r*3]+(n[r*3+1]<<8)+(n[r*3+2]<<16)+4278190080;return new Uint8Array(t.buffer)}function fy(n){const e=[];for(let t=0;t<n.numLevels;t++){const r=n.getImageData(t,0,0),s=new Uint8Array(r.byteLength);s.set(r),e.push(s)}return e}const py={6408:"rgba8unorm",32856:"bgra8unorm",32857:"rgb10a2unorm",33189:"depth16unorm",33190:"depth24plus",33321:"r8unorm",33323:"rg8unorm",33325:"r16float",33326:"r32float",33327:"rg16float",33328:"rg32float",33329:"r8sint",33330:"r8uint",33331:"r16sint",33332:"r16uint",33333:"r32sint",33334:"r32uint",33335:"rg8sint",33336:"rg8uint",33337:"rg16sint",33338:"rg16uint",33339:"rg32sint",33340:"rg32uint",33778:"bc2-rgba-unorm",33779:"bc3-rgba-unorm",34836:"rgba32float",34842:"rgba16float",35056:"depth24plus-stencil8",35898:"rg11b10ufloat",35901:"rgb9e5ufloat",35907:"rgba8unorm-srgb",36012:"depth32float",36013:"depth32float-stencil8",36168:"stencil8",36208:"rgba32uint",36214:"rgba16uint",36220:"rgba8uint",36226:"rgba32sint",36232:"rgba16sint",36238:"rgba8sint",36492:"bc7-rgba-unorm",36756:"r8snorm",36757:"rg8snorm",36759:"rgba8snorm",37496:"etc2-rgba8unorm",37808:"astc-4x4-unorm"};function Pp(n){const e=py[n];if(e)return e;throw new Error(`Unsupported glInternalFormat: ${n}`)}const my={23:"rgb8unorm",37:"rgba8unorm",43:"rgba8unorm-srgb"};function Bp(n){const e=my[n];if(e)return e;throw new Error(`Unsupported VkFormat: ${n}`)}function gy(n){return n.classId===2?Bp(n.vkFormat):Pp(n.glInternalformat)}const _y={"bc3-rgba-unorm":"BC3_RGBA","bc7-rgba-unorm":"BC7_M5_RGBA","etc2-rgba8unorm":"ETC2_RGBA","astc-4x4-unorm":"ASTC_4x4_RGBA",rgba8unorm:"RGBA32",rg11b10ufloat:"R11F_G11F_B10F"};function xy(n){const e=_y[n];if(e)return e;throw new Error(`Unsupported transcoderFormat: ${n}`)}const Qs=["basis","bc7","bc6h","astc","etc2","bc5","bc4","bc3","bc2","bc1","eac"],by={extension:T.ResolveParser,test:n=>lt(n,[".ktx",".ktx2",".dds"]),parse:n=>{var r;let e;const t=n.split(".");if(t.length>2){const s=t[t.length-2];Qs.includes(s)&&(e=s)}else e=t[t.length-1];return{resolution:parseFloat(((r=Nt.RETINA_PREFIX.exec(n))==null?void 0:r[1])??"1"),format:e,src:n}}};let Js;const yy={extension:{type:T.DetectionParser,priority:2},test:async()=>!!(await vn()||yn()),add:async n=>{const e=await Ea();return Js=vy(e),[...Js,...n]},remove:async n=>Js?n.filter(e=>!(e in Js)):n};function vy(n){const e=["basis"],t={};return n.forEach(r=>{const s=r.split("-")[0];s&&!t[s]&&(t[s]=!0,e.push(s))}),e.sort((r,s)=>{const i=Qs.indexOf(r),o=Qs.indexOf(s);return i===-1?1:o===-1?-1:i-o}),e}const Sy=new Be,Ma=class{cull(e,t,r=!0){this._cullRecursive(e,t,r)}_cullRecursive(e,t,r=!0){if(e.cullable&&e.measurable&&e.includeInBuild){const s=e.cullArea??an(e,r,Sy);e.culled=s.x>=t.x+t.width||s.y>=t.y+t.height||s.x+s.width<=t.x||s.y+s.height<=t.y}else e.culled=!1;if(!(!e.cullableChildren||e.culled||!e.renderable||!e.measurable||!e.includeInBuild))for(let s=0;s<e.children.length;s++)this._cullRecursive(e.children[s],t,r)}};Ma.shared=new Ma;let Rp=Ma;class Dp{static init(e){this._renderRef=this.render.bind(this),this.render=()=>{var r;const t=((r=e==null?void 0:e.culler)==null?void 0:r.updateTransform)!==!0;Rp.shared.cull(this.stage,this.renderer.screen,t),this.renderer.render({container:this.stage})}}static destroy(){this.render=this._renderRef}}Dp.extension={priority:10,type:T.Application,name:"culler"};class Ty extends yt{constructor(e={}){const{element:t,anchor:r,...s}=e;super({label:"DOMContainer",...s}),this.renderPipeId="dom",this.batched=!1,this._anchor=new ie(0,0),r&&(this.anchor=r),this.element=e.element||document.createElement("div")}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set element(e){this._element!==e&&(this._element=e,this.onViewUpdate())}get element(){return this._element}updateBounds(){const e=this._bounds,t=this._element;if(!t){e.minX=0,e.minY=0,e.maxX=0,e.maxY=0;return}const{offsetWidth:r,offsetHeight:s}=t;e.minX=0,e.maxX=r,e.minY=0,e.maxY=s}destroy(e=!1){var t,r;super.destroy(e),(r=(t=this._element)==null?void 0:t.parentNode)==null||r.removeChild(this._element),this._element=null,this._anchor=null}}class Fa{constructor(e){this._attachedDomElements=[],this._renderer=e,this._renderer.runners.postrender.add(this),this._renderer.runners.init.add(this),this._domElement=document.createElement("div"),this._domElement.style.position="absolute",this._domElement.style.top="0",this._domElement.style.left="0",this._domElement.style.pointerEvents="none",this._domElement.style.zIndex="1000"}init(){this._canvasObserver=new lo({domElement:this._domElement,renderer:this._renderer})}addRenderable(e,t){this._attachedDomElements.includes(e)||this._attachedDomElements.push(e)}updateRenderable(e){}validateRenderable(e){return!0}postrender(){const e=this._attachedDomElements;if(e.length===0){this._domElement.remove();return}this._canvasObserver.ensureAttached();for(let t=0;t<e.length;t++){const r=e[t],s=r.element;if(!r.parent||r.globalDisplayStatus<7)s==null||s.remove(),e.splice(t,1),t--;else{this._domElement.contains(s)||(s.style.position="absolute",s.style.pointerEvents="auto",this._domElement.appendChild(s));const i=r.worldTransform,o=r._anchor,a=r.width*o.x,u=r.height*o.y;s.style.transformOrigin=`${a}px ${u}px`,s.style.transform=`matrix(${i.a}, ${i.b}, ${i.c}, ${i.d}, ${i.tx-a}, ${i.ty-u})`,s.style.opacity=r.groupAlpha.toString()}}}destroy(){var e;this._renderer.runners.postrender.remove(this);for(let t=0;t<this._attachedDomElements.length;t++)(e=this._attachedDomElements[t].element)==null||e.remove();this._attachedDomElements.length=0,this._domElement.remove(),this._canvasObserver.destroy(),this._renderer=null}}Fa.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"dom"};var Ln={},Ft={},lr={},Mp;function ei(){if(Mp)return lr;Mp=1;function n(i,o,a){if(a===void 0&&(a=Array.prototype),i&&typeof a.find=="function")return a.find.call(i,o);for(var u=0;u<i.length;u++)if(Object.prototype.hasOwnProperty.call(i,u)){var l=i[u];if(o.call(void 0,l,u,i))return l}}function e(i,o){return o===void 0&&(o=Object),o&&typeof o.freeze=="function"?o.freeze(i):i}function t(i,o){if(i===null||typeof i!="object")throw new TypeError("target is not an object");for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(i[a]=o[a]);return i}var r=e({HTML:"text/html",isHTML:function(i){return i===r.HTML},XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),s=e({HTML:"http://www.w3.org/1999/xhtml",isHTML:function(i){return i===s.HTML},SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});return lr.assign=t,lr.find=n,lr.freeze=e,lr.MIME_TYPE=r,lr.NAMESPACE=s,lr}var Fp;function Up(){if(Fp)return Ft;Fp=1;var n=ei(),e=n.find,t=n.NAMESPACE;function r(m){return m!==""}function s(m){return m?m.split(/[\t\n\f\r ]+/).filter(r):[]}function i(m,_){return m.hasOwnProperty(_)||(m[_]=!0),m}function o(m){if(!m)return[];var _=s(m);return Object.keys(_.reduce(i,{}))}function a(m){return function(_){return m&&m.indexOf(_)!==-1}}function u(m,_){for(var S in m)Object.prototype.hasOwnProperty.call(m,S)&&(_[S]=m[S])}function l(m,_){var S=m.prototype;if(!(S instanceof _)){let P=function(){};P.prototype=_.prototype,P=new P,u(S,P),m.prototype=S=P}S.constructor!=m&&(typeof m!="function"&&console.error("unknown Class:"+m),S.constructor=m)}var c={},h=c.ELEMENT_NODE=1,d=c.ATTRIBUTE_NODE=2,f=c.TEXT_NODE=3,g=c.CDATA_SECTION_NODE=4,x=c.ENTITY_REFERENCE_NODE=5,p=c.ENTITY_NODE=6,b=c.PROCESSING_INSTRUCTION_NODE=7,y=c.COMMENT_NODE=8,v=c.DOCUMENT_NODE=9,C=c.DOCUMENT_TYPE_NODE=10,D=c.DOCUMENT_FRAGMENT_NODE=11,B=c.NOTATION_NODE=12,w={},O={};w.INDEX_SIZE_ERR=(O[1]="Index size error",1),w.DOMSTRING_SIZE_ERR=(O[2]="DOMString size error",2);var A=w.HIERARCHY_REQUEST_ERR=(O[3]="Hierarchy request error",3);w.WRONG_DOCUMENT_ERR=(O[4]="Wrong document",4),w.INVALID_CHARACTER_ERR=(O[5]="Invalid character",5),w.NO_DATA_ALLOWED_ERR=(O[6]="No data allowed",6),w.NO_MODIFICATION_ALLOWED_ERR=(O[7]="No modification allowed",7);var E=w.NOT_FOUND_ERR=(O[8]="Not found",8);w.NOT_SUPPORTED_ERR=(O[9]="Not supported",9);var R=w.INUSE_ATTRIBUTE_ERR=(O[10]="Attribute in use",10);w.INVALID_STATE_ERR=(O[11]="Invalid state",11),w.SYNTAX_ERR=(O[12]="Syntax error",12),w.INVALID_MODIFICATION_ERR=(O[13]="Invalid modification",13),w.NAMESPACE_ERR=(O[14]="Invalid namespace",14),w.INVALID_ACCESS_ERR=(O[15]="Invalid access",15);function F(m,_){if(_ instanceof Error)var S=_;else S=this,Error.call(this,O[m]),this.message=O[m],Error.captureStackTrace&&Error.captureStackTrace(this,F);return S.code=m,_&&(this.message=this.message+": "+_),S}F.prototype=Error.prototype,u(w,F);function I(){}I.prototype={length:0,item:function(m){return m>=0&&m<this.length?this[m]:null},toString:function(m,_){for(var S=[],P=0;P<this.length;P++)Jr(this[P],S,m,_);return S.join("")},filter:function(m){return Array.prototype.filter.call(this,m)},indexOf:function(m){return Array.prototype.indexOf.call(this,m)}};function z(m,_){this._node=m,this._refresh=_,Y(this)}function Y(m){var _=m._node._inc||m._node.ownerDocument._inc;if(m._inc!==_){var S=m._refresh(m._node);if(Ax(m,"length",S.length),!m.$$length||S.length<m.$$length)for(var P=S.length;P in m;P++)Object.prototype.hasOwnProperty.call(m,P)&&delete m[P];u(S,m),m._inc=_}}z.prototype.item=function(m){return Y(this),this[m]||null},l(z,I);function U(){}function M(m,_){for(var S=m.length;S--;)if(m[S]===_)return S}function Z(m,_,S,P){if(P?_[M(_,P)]=S:_[_.length++]=S,m){S.ownerElement=m;var G=m.ownerDocument;G&&(P&&gt(G,m,P),_e(G,m,S))}}function N(m,_,S){var P=M(_,S);if(P>=0){for(var G=_.length-1;P<G;)_[P]=_[++P];if(_.length=G,m){var q=m.ownerDocument;q&&(gt(q,m,S),S.ownerElement=null)}}else throw new F(E,new Error(m.tagName+"@"+S))}U.prototype={length:0,item:I.prototype.item,getNamedItem:function(m){for(var _=this.length;_--;){var S=this[_];if(S.nodeName==m)return S}},setNamedItem:function(m){var _=m.ownerElement;if(_&&_!=this._ownerElement)throw new F(R);var S=this.getNamedItem(m.nodeName);return Z(this._ownerElement,this,m,S),S},setNamedItemNS:function(m){var _=m.ownerElement,S;if(_&&_!=this._ownerElement)throw new F(R);return S=this.getNamedItemNS(m.namespaceURI,m.localName),Z(this._ownerElement,this,m,S),S},removeNamedItem:function(m){var _=this.getNamedItem(m);return N(this._ownerElement,this,_),_},removeNamedItemNS:function(m,_){var S=this.getNamedItemNS(m,_);return N(this._ownerElement,this,S),S},getNamedItemNS:function(m,_){for(var S=this.length;S--;){var P=this[S];if(P.localName==_&&P.namespaceURI==m)return P}return null}};function oe(){}oe.prototype={hasFeature:function(m,_){return!0},createDocument:function(m,_,S){var P=new Ae;if(P.implementation=this,P.childNodes=new I,P.doctype=S||null,S&&P.appendChild(S),_){var G=P.createElementNS(m,_);P.appendChild(G)}return P},createDocumentType:function(m,_,S){var P=new Pi;return P.name=m,P.nodeName=m,P.publicId=_||"",P.systemId=S||"",P}};function W(){}W.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(m,_){return Gt(this,m,_)},replaceChild:function(m,_){Gt(this,m,_,Zr),_&&this.removeChild(_)},removeChild:function(m){return Ie(this,m)},appendChild:function(m){return this.insertBefore(m,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(m){return Yl(this.ownerDocument||this,this,m)},normalize:function(){for(var m=this.firstChild;m;){var _=m.nextSibling;_&&_.nodeType==f&&m.nodeType==f?(this.removeChild(_),m.appendData(_.data)):(m.normalize(),m=_)}},isSupported:function(m,_){return this.ownerDocument.implementation.hasFeature(m,_)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(m){for(var _=this;_;){var S=_._nsMap;if(S){for(var P in S)if(Object.prototype.hasOwnProperty.call(S,P)&&S[P]===m)return P}_=_.nodeType==d?_.ownerDocument:_.parentNode}return null},lookupNamespaceURI:function(m){for(var _=this;_;){var S=_._nsMap;if(S&&Object.prototype.hasOwnProperty.call(S,m))return S[m];_=_.nodeType==d?_.ownerDocument:_.parentNode}return null},isDefaultNamespace:function(m){var _=this.lookupPrefix(m);return _==null}};function we(m){return m=="<"&&"&lt;"||m==">"&&"&gt;"||m=="&"&&"&amp;"||m=='"'&&"&quot;"||"&#"+m.charCodeAt()+";"}u(c,W),u(c,W.prototype);function Ve(m,_){if(_(m))return!0;if(m=m.firstChild)do if(Ve(m,_))return!0;while(m=m.nextSibling)}function Ae(){this.ownerDocument=this}function _e(m,_,S){m&&m._inc++;var P=S.namespaceURI;P===t.XMLNS&&(_._nsMap[S.prefix?S.localName:""]=S.value)}function gt(m,_,S,P){m&&m._inc++;var G=S.namespaceURI;G===t.XMLNS&&delete _._nsMap[S.prefix?S.localName:""]}function Ot(m,_,S){if(m&&m._inc){m._inc++;var P=_.childNodes;if(S)P[P.length++]=S;else{for(var G=_.firstChild,q=0;G;)P[q++]=G,G=G.nextSibling;P.length=q,delete P[P.length]}}}function Ie(m,_){var S=_.previousSibling,P=_.nextSibling;return S?S.nextSibling=P:m.firstChild=P,P?P.previousSibling=S:m.lastChild=S,_.parentNode=null,_.previousSibling=null,_.nextSibling=null,Ot(m.ownerDocument,m),_}function ke(m){return m&&(m.nodeType===W.DOCUMENT_NODE||m.nodeType===W.DOCUMENT_FRAGMENT_NODE||m.nodeType===W.ELEMENT_NODE)}function Et(m){return m&&(Ee(m)||Qe(m)||Le(m)||m.nodeType===W.DOCUMENT_FRAGMENT_NODE||m.nodeType===W.COMMENT_NODE||m.nodeType===W.PROCESSING_INSTRUCTION_NODE)}function Le(m){return m&&m.nodeType===W.DOCUMENT_TYPE_NODE}function Ee(m){return m&&m.nodeType===W.ELEMENT_NODE}function Qe(m){return m&&m.nodeType===W.TEXT_NODE}function de(m,_){var S=m.childNodes||[];if(e(S,Ee)||Le(_))return!1;var P=e(S,Le);return!(_&&P&&S.indexOf(P)>S.indexOf(_))}function Je(m,_){var S=m.childNodes||[];function P(q){return Ee(q)&&q!==_}if(e(S,P))return!1;var G=e(S,Le);return!(_&&G&&S.indexOf(G)>S.indexOf(_))}function De(m,_,S){if(!ke(m))throw new F(A,"Unexpected parent node type "+m.nodeType);if(S&&S.parentNode!==m)throw new F(E,"child not in parent");if(!Et(_)||Le(_)&&m.nodeType!==W.DOCUMENT_NODE)throw new F(A,"Unexpected node type "+_.nodeType+" for parent node type "+m.nodeType)}function pr(m,_,S){var P=m.childNodes||[],G=_.childNodes||[];if(_.nodeType===W.DOCUMENT_FRAGMENT_NODE){var q=G.filter(Ee);if(q.length>1||e(G,Qe))throw new F(A,"More than one element or text in fragment");if(q.length===1&&!de(m,S))throw new F(A,"Element in fragment can not be inserted before doctype")}if(Ee(_)&&!de(m,S))throw new F(A,"Only one element can be added and only after doctype");if(Le(_)){if(e(P,Le))throw new F(A,"Only one doctype is allowed");var he=e(P,Ee);if(S&&P.indexOf(he)<P.indexOf(S))throw new F(A,"Doctype can only be inserted before an element");if(!S&&he)throw new F(A,"Doctype can not be appended since element is present")}}function Zr(m,_,S){var P=m.childNodes||[],G=_.childNodes||[];if(_.nodeType===W.DOCUMENT_FRAGMENT_NODE){var q=G.filter(Ee);if(q.length>1||e(G,Qe))throw new F(A,"More than one element or text in fragment");if(q.length===1&&!Je(m,S))throw new F(A,"Element in fragment can not be inserted before doctype")}if(Ee(_)&&!Je(m,S))throw new F(A,"Only one element can be added and only after doctype");if(Le(_)){if(e(P,function(_t){return Le(_t)&&_t!==S}))throw new F(A,"Only one doctype is allowed");var he=e(P,Ee);if(S&&P.indexOf(he)<P.indexOf(S))throw new F(A,"Doctype can only be inserted before an element")}}function Gt(m,_,S,P){De(m,_,S),m.nodeType===W.DOCUMENT_NODE&&(P||pr)(m,_,S);var G=_.parentNode;if(G&&G.removeChild(_),_.nodeType===D){var q=_.firstChild;if(q==null)return _;var he=_.lastChild}else q=he=_;var et=S?S.previousSibling:m.lastChild;q.previousSibling=et,he.nextSibling=S,et?et.nextSibling=q:m.firstChild=q,S==null?m.lastChild=he:S.previousSibling=he;do{q.parentNode=m;var _t=m.ownerDocument||m;Kt(q,_t)}while(q!==he&&(q=q.nextSibling));return Ot(m.ownerDocument||m,m),_.nodeType==D&&(_.firstChild=_.lastChild=null),_}function Kt(m,_){if(m.ownerDocument!==_){if(m.ownerDocument=_,m.nodeType===h&&m.attributes)for(var S=0;S<m.attributes.length;S++){var P=m.attributes.item(S);P&&(P.ownerDocument=_)}for(var G=m.firstChild;G;)Kt(G,_),G=G.nextSibling}}function xe(m,_){_.parentNode&&_.parentNode.removeChild(_),_.parentNode=m,_.previousSibling=m.lastChild,_.nextSibling=null,_.previousSibling?_.previousSibling.nextSibling=_:m.firstChild=_,m.lastChild=_,Ot(m.ownerDocument,m,_);var S=m.ownerDocument||m;return Kt(_,S),_}Ae.prototype={nodeName:"#document",nodeType:v,doctype:null,documentElement:null,_inc:1,insertBefore:function(m,_){if(m.nodeType==D){for(var S=m.firstChild;S;){var P=S.nextSibling;this.insertBefore(S,_),S=P}return m}return Gt(this,m,_),Kt(m,this),this.documentElement===null&&m.nodeType===h&&(this.documentElement=m),m},removeChild:function(m){return this.documentElement==m&&(this.documentElement=null),Ie(this,m)},replaceChild:function(m,_){Gt(this,m,_,Zr),Kt(m,this),_&&this.removeChild(_),Ee(m)&&(this.documentElement=m)},importNode:function(m,_){return Cx(this,m,_)},getElementById:function(m){var _=null;return Ve(this.documentElement,function(S){if(S.nodeType==h&&S.getAttribute("id")==m)return _=S,!0}),_},getElementsByClassName:function(m){var _=o(m);return new z(this,function(S){var P=[];return _.length>0&&Ve(S.documentElement,function(G){if(G!==S&&G.nodeType===h){var q=G.getAttribute("class");if(q){var he=m===q;if(!he){var et=o(q);he=_.every(a(et))}he&&P.push(G)}}}),P})},createElement:function(m){var _=new Pe;_.ownerDocument=this,_.nodeName=m,_.tagName=m,_.localName=m,_.childNodes=new I;var S=_.attributes=new U;return S._ownerElement=_,_},createDocumentFragment:function(){var m=new Bi;return m.ownerDocument=this,m.childNodes=new I,m},createTextNode:function(m){var _=new zl;return _.ownerDocument=this,_.appendData(m),_},createComment:function(m){var _=new Hl;return _.ownerDocument=this,_.appendData(m),_},createCDATASection:function(m){var _=new Vl;return _.ownerDocument=this,_.appendData(m),_},createProcessingInstruction:function(m,_){var S=new Xl;return S.ownerDocument=this,S.tagName=S.nodeName=S.target=m,S.nodeValue=S.data=_,S},createAttribute:function(m){var _=new Qr;return _.ownerDocument=this,_.name=m,_.nodeName=m,_.localName=m,_.specified=!0,_},createEntityReference:function(m){var _=new Wl;return _.ownerDocument=this,_.nodeName=m,_},createElementNS:function(m,_){var S=new Pe,P=_.split(":"),G=S.attributes=new U;return S.childNodes=new I,S.ownerDocument=this,S.nodeName=_,S.tagName=_,S.namespaceURI=m,P.length==2?(S.prefix=P[0],S.localName=P[1]):S.localName=_,G._ownerElement=S,S},createAttributeNS:function(m,_){var S=new Qr,P=_.split(":");return S.ownerDocument=this,S.nodeName=_,S.name=_,S.namespaceURI=m,S.specified=!0,P.length==2?(S.prefix=P[0],S.localName=P[1]):S.localName=_,S}},l(Ae,W);function Pe(){this._nsMap={}}Pe.prototype={nodeType:h,hasAttribute:function(m){return this.getAttributeNode(m)!=null},getAttribute:function(m){var _=this.getAttributeNode(m);return _&&_.value||""},getAttributeNode:function(m){return this.attributes.getNamedItem(m)},setAttribute:function(m,_){var S=this.ownerDocument.createAttribute(m);S.value=S.nodeValue=""+_,this.setAttributeNode(S)},removeAttribute:function(m){var _=this.getAttributeNode(m);_&&this.removeAttributeNode(_)},appendChild:function(m){return m.nodeType===D?this.insertBefore(m,null):xe(this,m)},setAttributeNode:function(m){return this.attributes.setNamedItem(m)},setAttributeNodeNS:function(m){return this.attributes.setNamedItemNS(m)},removeAttributeNode:function(m){return this.attributes.removeNamedItem(m.nodeName)},removeAttributeNS:function(m,_){var S=this.getAttributeNodeNS(m,_);S&&this.removeAttributeNode(S)},hasAttributeNS:function(m,_){return this.getAttributeNodeNS(m,_)!=null},getAttributeNS:function(m,_){var S=this.getAttributeNodeNS(m,_);return S&&S.value||""},setAttributeNS:function(m,_,S){var P=this.ownerDocument.createAttributeNS(m,_);P.value=P.nodeValue=""+S,this.setAttributeNode(P)},getAttributeNodeNS:function(m,_){return this.attributes.getNamedItemNS(m,_)},getElementsByTagName:function(m){return new z(this,function(_){var S=[];return Ve(_,function(P){P!==_&&P.nodeType==h&&(m==="*"||P.tagName==m)&&S.push(P)}),S})},getElementsByTagNameNS:function(m,_){return new z(this,function(S){var P=[];return Ve(S,function(G){G!==S&&G.nodeType===h&&(m==="*"||G.namespaceURI===m)&&(_==="*"||G.localName==_)&&P.push(G)}),P})}},Ae.prototype.getElementsByTagName=Pe.prototype.getElementsByTagName,Ae.prototype.getElementsByTagNameNS=Pe.prototype.getElementsByTagNameNS,l(Pe,W);function Qr(){}Qr.prototype.nodeType=d,l(Qr,W);function jn(){}jn.prototype={data:"",substringData:function(m,_){return this.data.substring(m,m+_)},appendData:function(m){m=this.data+m,this.nodeValue=this.data=m,this.length=m.length},insertData:function(m,_){this.replaceData(m,0,_)},appendChild:function(m){throw new Error(O[A])},deleteData:function(m,_){this.replaceData(m,_,"")},replaceData:function(m,_,S){var P=this.data.substring(0,m),G=this.data.substring(m+_);S=P+S+G,this.nodeValue=this.data=S,this.length=S.length}},l(jn,W);function zl(){}zl.prototype={nodeName:"#text",nodeType:f,splitText:function(m){var _=this.data,S=_.substring(m);_=_.substring(0,m),this.data=this.nodeValue=_,this.length=_.length;var P=this.ownerDocument.createTextNode(S);return this.parentNode&&this.parentNode.insertBefore(P,this.nextSibling),P}},l(zl,jn);function Hl(){}Hl.prototype={nodeName:"#comment",nodeType:y},l(Hl,jn);function Vl(){}Vl.prototype={nodeName:"#cdata-section",nodeType:g},l(Vl,jn);function Pi(){}Pi.prototype.nodeType=C,l(Pi,W);function bx(){}bx.prototype.nodeType=B,l(bx,W);function yx(){}yx.prototype.nodeType=p,l(yx,W);function Wl(){}Wl.prototype.nodeType=x,l(Wl,W);function Bi(){}Bi.prototype.nodeName="#document-fragment",Bi.prototype.nodeType=D,l(Bi,W);function Xl(){}Xl.prototype.nodeType=b,l(Xl,W);function vx(){}vx.prototype.serializeToString=function(m,_,S){return Sx.call(m,_,S)},W.prototype.toString=Sx;function Sx(m,_){var S=[],P=this.nodeType==9&&this.documentElement||this,G=P.prefix,q=P.namespaceURI;if(q&&G==null){var G=P.lookupPrefix(q);if(G==null)var he=[{namespace:q,prefix:null}]}return Jr(this,S,m,_,he),S.join("")}function Tx(m,_,S){var P=m.prefix||"",G=m.namespaceURI;if(!G||P==="xml"&&G===t.XML||G===t.XMLNS)return!1;for(var q=S.length;q--;){var he=S[q];if(he.prefix===P)return he.namespace!==G}return!0}function $l(m,_,S){m.push(" ",_,'="',S.replace(/[<>&"\t\n\r]/g,we),'"')}function Jr(m,_,S,P,G){if(G||(G=[]),P)if(m=P(m),m){if(typeof m=="string"){_.push(m);return}}else return;switch(m.nodeType){case h:var q=m.attributes,he=q.length,Ne=m.firstChild,et=m.tagName;S=t.isHTML(m.namespaceURI)||S;var _t=et;if(!S&&!m.prefix&&m.namespaceURI){for(var Zt,kt=0;kt<q.length;kt++)if(q.item(kt).name==="xmlns"){Zt=q.item(kt).value;break}if(!Zt)for(var mr=G.length-1;mr>=0;mr--){var gr=G[mr];if(gr.prefix===""&&gr.namespace===m.namespaceURI){Zt=gr.namespace;break}}if(Zt!==m.namespaceURI)for(var mr=G.length-1;mr>=0;mr--){var gr=G[mr];if(gr.namespace===m.namespaceURI){gr.prefix&&(_t=gr.prefix+":"+et);break}}}_.push("<",_t);for(var _r=0;_r<he;_r++){var Pt=q.item(_r);Pt.prefix=="xmlns"?G.push({prefix:Pt.localName,namespace:Pt.value}):Pt.nodeName=="xmlns"&&G.push({prefix:"",namespace:Pt.value})}for(var _r=0;_r<he;_r++){var Pt=q.item(_r);if(Tx(Pt,S,G)){var xr=Pt.prefix||"",Kn=Pt.namespaceURI;$l(_,xr?"xmlns:"+xr:"xmlns",Kn),G.push({prefix:xr,namespace:Kn})}Jr(Pt,_,S,P,G)}if(et===_t&&Tx(m,S,G)){var xr=m.prefix||"",Kn=m.namespaceURI;$l(_,xr?"xmlns:"+xr:"xmlns",Kn),G.push({prefix:xr,namespace:Kn})}if(Ne||S&&!/^(?:meta|link|img|br|hr|input)$/i.test(et)){if(_.push(">"),S&&/^script$/i.test(et))for(;Ne;)Ne.data?_.push(Ne.data):Jr(Ne,_,S,P,G.slice()),Ne=Ne.nextSibling;else for(;Ne;)Jr(Ne,_,S,P,G.slice()),Ne=Ne.nextSibling;_.push("</",_t,">")}else _.push("/>");return;case v:case D:for(var Ne=m.firstChild;Ne;)Jr(Ne,_,S,P,G.slice()),Ne=Ne.nextSibling;return;case d:return $l(_,m.name,m.value);case f:return _.push(m.data.replace(/[<&>]/g,we));case g:return _.push("<![CDATA[",m.data,"]]>");case y:return _.push("<!--",m.data,"-->");case C:var wx=m.publicId,en=m.systemId;if(_.push("<!DOCTYPE ",m.name),wx)_.push(" PUBLIC ",wx),en&&en!="."&&_.push(" ",en),_.push(">");else if(en&&en!=".")_.push(" SYSTEM ",en,">");else{var Ex=m.internalSubset;Ex&&_.push(" [",Ex,"]"),_.push(">")}return;case b:return _.push("<?",m.target," ",m.data,"?>");case x:return _.push("&",m.nodeName,";");default:_.push("??",m.nodeName)}}function Cx(m,_,S){var P;switch(_.nodeType){case h:P=_.cloneNode(!1),P.ownerDocument=m;case D:break;case d:S=!0;break}if(P||(P=_.cloneNode(!1)),P.ownerDocument=m,P.parentNode=null,S)for(var G=_.firstChild;G;)P.appendChild(Cx(m,G,S)),G=G.nextSibling;return P}function Yl(m,_,S){var P=new _.constructor;for(var G in _)if(Object.prototype.hasOwnProperty.call(_,G)){var q=_[G];typeof q!="object"&&q!=P[G]&&(P[G]=q)}switch(_.childNodes&&(P.childNodes=new I),P.ownerDocument=m,P.nodeType){case h:var he=_.attributes,et=P.attributes=new U,_t=he.length;et._ownerElement=P;for(var Zt=0;Zt<_t;Zt++)P.setAttributeNode(Yl(m,he.item(Zt),!0));break;case d:S=!0}if(S)for(var kt=_.firstChild;kt;)P.appendChild(Yl(m,kt,S)),kt=kt.nextSibling;return P}function Ax(m,_,S){m[_]=S}try{if(Object.defineProperty){let m=function(_){switch(_.nodeType){case h:case D:var S=[];for(_=_.firstChild;_;)_.nodeType!==7&&_.nodeType!==8&&S.push(m(_)),_=_.nextSibling;return S.join("");default:return _.nodeValue}};Object.defineProperty(z.prototype,"length",{get:function(){return Y(this),this.$$length}}),Object.defineProperty(W.prototype,"textContent",{get:function(){return m(this)},set:function(_){switch(this.nodeType){case h:case D:for(;this.firstChild;)this.removeChild(this.firstChild);(_||String(_))&&this.appendChild(this.ownerDocument.createTextNode(_));break;default:this.data=_,this.value=_,this.nodeValue=_}}}),Ax=function(_,S,P){_["$$"+S]=P}}}catch{}return Ft.DocumentType=Pi,Ft.DOMException=F,Ft.DOMImplementation=oe,Ft.Element=Pe,Ft.Node=W,Ft.NodeList=I,Ft.XMLSerializer=vx,Ft}var Nn={},Ua={},Ip;function Cy(){return Ip||(Ip=1,(function(n){var e=ei().freeze;n.XML_ENTITIES=e({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),n.HTML_ENTITIES=e({Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",AMP:"&",amp:"&",And:"⩓",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",ap:"≈",apacir:"⩯",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",Barwed:"⌆",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",Because:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxDL:"╗",boxDl:"╖",boxdL:"╕",boxdl:"┐",boxDR:"╔",boxDr:"╓",boxdR:"╒",boxdr:"┌",boxH:"═",boxh:"─",boxHD:"╦",boxHd:"╤",boxhD:"╥",boxhd:"┬",boxHU:"╩",boxHu:"╧",boxhU:"╨",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxUL:"╝",boxUl:"╜",boxuL:"╛",boxul:"┘",boxUR:"╚",boxUr:"╙",boxuR:"╘",boxur:"└",boxV:"║",boxv:"│",boxVH:"╬",boxVh:"╫",boxvH:"╪",boxvh:"┼",boxVL:"╣",boxVl:"╢",boxvL:"╡",boxvl:"┤",boxVR:"╠",boxVr:"╟",boxvR:"╞",boxvr:"├",bprime:"‵",Breve:"˘",breve:"˘",brvbar:"¦",Bscr:"ℬ",bscr:"𝒷",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",Cap:"⋒",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",CenterDot:"·",centerdot:"·",Cfr:"ℭ",cfr:"𝔠",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",cir:"○",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",Colon:"∷",colon:":",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",Conint:"∯",conint:"∮",ContourIntegral:"∮",Copf:"ℂ",copf:"𝕔",coprod:"∐",Coproduct:"∐",COPY:"©",copy:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",Cross:"⨯",cross:"✗",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",Cup:"⋓",cup:"∪",cupbrcap:"⩈",CupCap:"≍",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",Dagger:"‡",dagger:"†",daleth:"ℸ",Darr:"↡",dArr:"⇓",darr:"↓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",DD:"ⅅ",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",Diamond:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",Downarrow:"⇓",downarrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",ecir:"≖",Ecirc:"Ê",ecirc:"ê",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",eDot:"≑",edot:"ė",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp:" ",emsp13:" ",emsp14:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",Escr:"ℰ",escr:"ℯ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",ExponentialE:"ⅇ",exponentiale:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",ForAll:"∀",forall:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",Fscr:"ℱ",fscr:"𝒻",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",gE:"≧",ge:"≥",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",Gg:"⋙",gg:"≫",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gl:"≷",gla:"⪥",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gnE:"≩",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",Gt:"≫",GT:">",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",hArr:"⇔",harr:"↔",harrcir:"⥈",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",Hfr:"ℌ",hfr:"𝔥",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",Hopf:"ℍ",hopf:"𝕙",horbar:"―",HorizontalLine:"─",Hscr:"ℋ",hscr:"𝒽",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",Ifr:"ℑ",ifr:"𝔦",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Im:"ℑ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",Implies:"⇒",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",Int:"∬",int:"∫",intcal:"⊺",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",Iscr:"ℐ",iscr:"𝒾",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",Lang:"⟪",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",Larr:"↞",lArr:"⇐",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",lAtail:"⤛",latail:"⤙",late:"⪭",lates:"⪭︀",lBarr:"⤎",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",lE:"≦",le:"≤",LeftAngleBracket:"⟨",LeftArrow:"←",Leftarrow:"⇐",leftarrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",Ll:"⋘",ll:"≪",llarr:"⇇",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnap:"⪉",lnapprox:"⪉",lnE:"≨",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftarrow:"⟵",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longleftrightarrow:"⟷",longmapsto:"⟼",LongRightArrow:"⟶",Longrightarrow:"⟹",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",Lscr:"ℒ",lscr:"𝓁",Lsh:"↰",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",Lt:"≪",LT:"<",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",Mscr:"ℳ",mscr:"𝓂",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",ne:"≠",nearhk:"⤤",neArr:"⇗",nearr:"↗",nearrow:"↗",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:`
`,nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlArr:"⇍",nlarr:"↚",nldr:"‥",nlE:"≦̸",nle:"≰",nLeftarrow:"⇍",nleftarrow:"↚",nLeftrightarrow:"⇎",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",Nopf:"ℕ",nopf:"𝕟",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nRightarrow:"⇏",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nVDash:"⊯",nVdash:"⊮",nvDash:"⊭",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwArr:"⇖",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",ocir:"⊚",Ocirc:"Ô",ocirc:"ô",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",Or:"⩔",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",Otimes:"⨷",otimes:"⊗",otimesas:"⨶",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",Popf:"ℙ",popf:"𝕡",pound:"£",Pr:"⪻",pr:"≺",prap:"⪷",prcue:"≼",prE:"⪳",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",Prime:"″",prime:"′",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportion:"∷",Proportional:"∝",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",Qopf:"ℚ",qopf:"𝕢",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",QUOT:'"',quot:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",Rang:"⟫",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",Rarr:"↠",rArr:"⇒",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",rAtail:"⤜",ratail:"⤚",ratio:"∶",rationals:"ℚ",RBarr:"⤐",rBarr:"⤏",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",Re:"ℜ",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",REG:"®",reg:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",Rfr:"ℜ",rfr:"𝔯",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrow:"→",Rightarrow:"⇒",rightarrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",Ropf:"ℝ",ropf:"𝕣",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",Rscr:"ℛ",rscr:"𝓇",Rsh:"↱",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",Sc:"⪼",sc:"≻",scap:"⪸",Scaron:"Š",scaron:"š",sccue:"≽",scE:"⪴",sce:"⪰",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",searhk:"⤥",seArr:"⇘",searr:"↘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",Square:"□",square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",Sub:"⋐",sub:"⊂",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",Subset:"⋐",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",Sum:"∑",sum:"∑",sung:"♪",Sup:"⋑",sup:"⊃",sup1:"¹",sup2:"²",sup3:"³",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",Supset:"⋑",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swArr:"⇙",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"	",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",Therefore:"∴",therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",thinsp:" ",ThinSpace:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",Tilde:"∼",tilde:"˜",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",TRADE:"™",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",Uarr:"↟",uArr:"⇑",uarr:"↑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrow:"↑",Uparrow:"⇑",uparrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",Updownarrow:"⇕",updownarrow:"↕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",upsi:"υ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTee:"⊥",UpTeeArrow:"↥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",vArr:"⇕",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",Vbar:"⫫",vBar:"⫨",vBarv:"⫩",Vcy:"В",vcy:"в",VDash:"⊫",Vdash:"⊩",vDash:"⊨",vdash:"⊢",Vdashl:"⫦",Vee:"⋁",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",Verbar:"‖",verbar:"|",Vert:"‖",vert:"|",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",Wedge:"⋀",wedge:"∧",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xhArr:"⟺",xharr:"⟷",Xi:"Ξ",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",Yuml:"Ÿ",yuml:"ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",Zfr:"ℨ",zfr:"𝔷",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",Zopf:"ℤ",zopf:"𝕫",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}),n.entityMap=n.HTML_ENTITIES})(Ua)),Ua}var ti={},Op;function Ay(){if(Op)return ti;Op=1;var n=ei().NAMESPACE,e=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,t=new RegExp("[\\-\\.0-9"+e.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),r=new RegExp("^"+e.source+t.source+"*(?::"+e.source+t.source+"*)?$"),s=0,i=1,o=2,a=3,u=4,l=5,c=6,h=7;function d(A,E){this.message=A,this.locator=E,Error.captureStackTrace&&Error.captureStackTrace(this,d)}d.prototype=new Error,d.prototype.name=d.name;function f(){}f.prototype={parse:function(A,E,R){var F=this.domBuilder;F.startDocument(),C(E,E={}),g(A,E,R,F,this.errorHandler),F.endDocument()}};function g(A,E,R,F,I){function z(xe){if(xe>65535){xe-=65536;var Pe=55296+(xe>>10),Qr=56320+(xe&1023);return String.fromCharCode(Pe,Qr)}else return String.fromCharCode(xe)}function Y(xe){var Pe=xe.slice(1,-1);return Object.hasOwnProperty.call(R,Pe)?R[Pe]:Pe.charAt(0)==="#"?z(parseInt(Pe.substr(1).replace("x","0x"))):(I.error("entity not found:"+xe),xe)}function U(xe){if(xe>Ae){var Pe=A.substring(Ae,xe).replace(/&#?\w+;/g,Y);W&&M(Ae),F.characters(Pe,0,xe-Ae),Ae=xe}}function M(xe,Pe){for(;xe>=N&&(Pe=oe.exec(A));)Z=Pe.index,N=Z+Pe[0].length,W.lineNumber++;W.columnNumber=xe-Z+1}for(var Z=0,N=0,oe=/.*(?:\r\n?|\n)|.*$/g,W=F.locator,we=[{currentNSMap:E}],Ve={},Ae=0;;){try{var _e=A.indexOf("<",Ae);if(_e<0){if(!A.substr(Ae).match(/^\s*$/)){var gt=F.doc,Ot=gt.createTextNode(A.substr(Ae));gt.appendChild(Ot),F.currentElement=Ot}return}switch(_e>Ae&&U(_e),A.charAt(_e+1)){case"/":var De=A.indexOf(">",_e+3),Ie=A.substring(_e+2,De).replace(/[ \t\n\r]+$/g,""),ke=we.pop();De<0?(Ie=A.substring(_e+2).replace(/[\s<].*/,""),I.error("end tag name: "+Ie+" is not complete:"+ke.tagName),De=_e+1+Ie.length):Ie.match(/\s</)&&(Ie=Ie.replace(/[\s<].*/,""),I.error("end tag name: "+Ie+" maybe not complete"),De=_e+1+Ie.length);var Et=ke.localNSMap,Le=ke.tagName==Ie,Ee=Le||ke.tagName&&ke.tagName.toLowerCase()==Ie.toLowerCase();if(Ee){if(F.endElement(ke.uri,ke.localName,Ie),Et)for(var Qe in Et)Object.prototype.hasOwnProperty.call(Et,Qe)&&F.endPrefixMapping(Qe);Le||I.fatalError("end tag name: "+Ie+" is not match the current start tagName:"+ke.tagName)}else we.push(ke);De++;break;case"?":W&&M(_e),De=B(A,_e,F);break;case"!":W&&M(_e),De=D(A,_e,F,I);break;default:W&&M(_e);var de=new w,Je=we[we.length-1].currentNSMap,De=p(A,_e,de,Je,Y,I),pr=de.length;if(!de.closed&&v(A,De,de.tagName,Ve)&&(de.closed=!0,R.nbsp||I.warning("unclosed xml attribute")),W&&pr){for(var Zr=x(W,{}),Gt=0;Gt<pr;Gt++){var Kt=de[Gt];M(Kt.offset),Kt.locator=x(W,{})}F.locator=Zr,b(de,F,Je)&&we.push(de),F.locator=W}else b(de,F,Je)&&we.push(de);n.isHTML(de.uri)&&!de.closed?De=y(A,De,de.tagName,Y,F):De++}}catch(xe){if(xe instanceof d)throw xe;I.error("element parse error: "+xe),De=-1}De>Ae?Ae=De:U(Math.max(_e,Ae)+1)}}function x(A,E){return E.lineNumber=A.lineNumber,E.columnNumber=A.columnNumber,E}function p(A,E,R,F,I,z){function Y(W,we,Ve){R.attributeNames.hasOwnProperty(W)&&z.fatalError("Attribute "+W+" redefined"),R.addValue(W,we.replace(/[\t\n\r]/g," ").replace(/&#?\w+;/g,I),Ve)}for(var U,M,Z=++E,N=s;;){var oe=A.charAt(Z);switch(oe){case"=":if(N===i)U=A.slice(E,Z),N=a;else if(N===o)N=a;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(N===a||N===i)if(N===i&&(z.warning('attribute value must after "="'),U=A.slice(E,Z)),E=Z+1,Z=A.indexOf(oe,E),Z>0)M=A.slice(E,Z),Y(U,M,E-1),N=l;else throw new Error("attribute value no end '"+oe+"' match");else if(N==u)M=A.slice(E,Z),Y(U,M,E),z.warning('attribute "'+U+'" missed start quot('+oe+")!!"),E=Z+1,N=l;else throw new Error('attribute value must after "="');break;case"/":switch(N){case s:R.setTagName(A.slice(E,Z));case l:case c:case h:N=h,R.closed=!0;case u:case i:break;case o:R.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return z.error("unexpected end of input"),N==s&&R.setTagName(A.slice(E,Z)),Z;case">":switch(N){case s:R.setTagName(A.slice(E,Z));case l:case c:case h:break;case u:case i:M=A.slice(E,Z),M.slice(-1)==="/"&&(R.closed=!0,M=M.slice(0,-1));case o:N===o&&(M=U),N==u?(z.warning('attribute "'+M+'" missed quot(")!'),Y(U,M,E)):((!n.isHTML(F[""])||!M.match(/^(?:disabled|checked|selected)$/i))&&z.warning('attribute "'+M+'" missed value!! "'+M+'" instead!!'),Y(M,M,E));break;case a:throw new Error("attribute value missed!!")}return Z;case"":oe=" ";default:if(oe<=" ")switch(N){case s:R.setTagName(A.slice(E,Z)),N=c;break;case i:U=A.slice(E,Z),N=o;break;case u:var M=A.slice(E,Z);z.warning('attribute "'+M+'" missed quot(")!!'),Y(U,M,E);case l:N=c;break}else switch(N){case o:R.tagName,(!n.isHTML(F[""])||!U.match(/^(?:disabled|checked|selected)$/i))&&z.warning('attribute "'+U+'" missed value!! "'+U+'" instead2!!'),Y(U,U,E),E=Z,N=i;break;case l:z.warning('attribute space is required"'+U+'"!!');case c:N=i,E=Z;break;case a:N=u,E=Z;break;case h:throw new Error("elements closed character '/' and '>' must be connected to")}}Z++}}function b(A,E,R){for(var F=A.tagName,I=null,oe=A.length;oe--;){var z=A[oe],Y=z.qName,U=z.value,W=Y.indexOf(":");if(W>0)var M=z.prefix=Y.slice(0,W),Z=Y.slice(W+1),N=M==="xmlns"&&Z;else Z=Y,M=null,N=Y==="xmlns"&&"";z.localName=Z,N!==!1&&(I==null&&(I={},C(R,R={})),R[N]=I[N]=U,z.uri=n.XMLNS,E.startPrefixMapping(N,U))}for(var oe=A.length;oe--;){z=A[oe];var M=z.prefix;M&&(M==="xml"&&(z.uri=n.XML),M!=="xmlns"&&(z.uri=R[M||""]))}var W=F.indexOf(":");W>0?(M=A.prefix=F.slice(0,W),Z=A.localName=F.slice(W+1)):(M=null,Z=A.localName=F);var we=A.uri=R[M||""];if(E.startElement(we,Z,F,A),A.closed){if(E.endElement(we,Z,F),I)for(M in I)Object.prototype.hasOwnProperty.call(I,M)&&E.endPrefixMapping(M)}else return A.currentNSMap=R,A.localNSMap=I,!0}function y(A,E,R,F,I){if(/^(?:script|textarea)$/i.test(R)){var z=A.indexOf("</"+R+">",E),Y=A.substring(E+1,z);if(/[&<]/.test(Y))return/^script$/i.test(R)?(I.characters(Y,0,Y.length),z):(Y=Y.replace(/&#?\w+;/g,F),I.characters(Y,0,Y.length),z)}return E+1}function v(A,E,R,F){var I=F[R];return I==null&&(I=A.lastIndexOf("</"+R+">"),I<E&&(I=A.lastIndexOf("</"+R)),F[R]=I),I<E}function C(A,E){for(var R in A)Object.prototype.hasOwnProperty.call(A,R)&&(E[R]=A[R])}function D(A,E,R,F){var I=A.charAt(E+2);switch(I){case"-":if(A.charAt(E+3)==="-"){var z=A.indexOf("-->",E+4);return z>E?(R.comment(A,E+4,z-E-4),z+3):(F.error("Unclosed comment"),-1)}else return-1;default:if(A.substr(E+3,6)=="CDATA["){var z=A.indexOf("]]>",E+9);return R.startCDATA(),R.characters(A,E+9,z-E-9),R.endCDATA(),z+3}var Y=O(A,E),U=Y.length;if(U>1&&/!doctype/i.test(Y[0][0])){var M=Y[1][0],Z=!1,N=!1;U>3&&(/^public$/i.test(Y[2][0])?(Z=Y[3][0],N=U>4&&Y[4][0]):/^system$/i.test(Y[2][0])&&(N=Y[3][0]));var oe=Y[U-1];return R.startDTD(M,Z,N),R.endDTD(),oe.index+oe[0].length}}return-1}function B(A,E,R){var F=A.indexOf("?>",E);if(F){var I=A.substring(E,F).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);return I?(I[0].length,R.processingInstruction(I[1],I[2]),F+2):-1}return-1}function w(){this.attributeNames={}}w.prototype={setTagName:function(A){if(!r.test(A))throw new Error("invalid tagName:"+A);this.tagName=A},addValue:function(A,E,R){if(!r.test(A))throw new Error("invalid attribute:"+A);this.attributeNames[A]=this.length,this[this.length++]={qName:A,value:E,offset:R}},length:0,getLocalName:function(A){return this[A].localName},getLocator:function(A){return this[A].locator},getQName:function(A){return this[A].qName},getURI:function(A){return this[A].uri},getValue:function(A){return this[A].value}};function O(A,E){var R,F=[],I=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;for(I.lastIndex=E,I.exec(A);R=I.exec(A);)if(F.push(R),R[1])return F}return ti.XMLReader=f,ti.ParseError=d,ti}var Gp;function wy(){if(Gp)return Nn;Gp=1;var n=ei(),e=Up(),t=Cy(),r=Ay(),s=e.DOMImplementation,i=n.NAMESPACE,o=r.ParseError,a=r.XMLReader;function u(p){return p.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028]/g,`
`)}function l(p){this.options=p||{locator:{}}}l.prototype.parseFromString=function(p,b){var y=this.options,v=new a,C=y.domBuilder||new h,D=y.errorHandler,B=y.locator,w=y.xmlns||{},O=/\/x?html?$/.test(b),A=O?t.HTML_ENTITIES:t.XML_ENTITIES;B&&C.setDocumentLocator(B),v.errorHandler=c(D,C,B),v.domBuilder=y.domBuilder||C,O&&(w[""]=i.HTML),w.xml=w.xml||i.XML;var E=y.normalizeLineEndings||u;return p&&typeof p=="string"?v.parse(E(p),w,A):v.errorHandler.error("invalid doc source"),C.doc};function c(p,b,y){if(!p){if(b instanceof h)return b;p=b}var v={},C=p instanceof Function;y=y||{};function D(B){var w=p[B];!w&&C&&(w=p.length==2?function(O){p(B,O)}:p),v[B]=w&&function(O){w("[xmldom "+B+"]	"+O+f(y))}||function(){}}return D("warning"),D("error"),D("fatalError"),v}function h(){this.cdata=!1}function d(p,b){b.lineNumber=p.lineNumber,b.columnNumber=p.columnNumber}h.prototype={startDocument:function(){this.doc=new s().createDocument(null,null,null),this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(p,b,y,v){var C=this.doc,D=C.createElementNS(p,y||b),B=v.length;x(this,D),this.currentElement=D,this.locator&&d(this.locator,D);for(var w=0;w<B;w++){var p=v.getURI(w),O=v.getValue(w),y=v.getQName(w),A=C.createAttributeNS(p,y);this.locator&&d(v.getLocator(w),A),A.value=A.nodeValue=O,D.setAttributeNode(A)}},endElement:function(p,b,y){var v=this.currentElement;v.tagName,this.currentElement=v.parentNode},startPrefixMapping:function(p,b){},endPrefixMapping:function(p){},processingInstruction:function(p,b){var y=this.doc.createProcessingInstruction(p,b);this.locator&&d(this.locator,y),x(this,y)},ignorableWhitespace:function(p,b,y){},characters:function(p,b,y){if(p=g.apply(this,arguments),p){if(this.cdata)var v=this.doc.createCDATASection(p);else var v=this.doc.createTextNode(p);this.currentElement?this.currentElement.appendChild(v):/^\s*$/.test(p)&&this.doc.appendChild(v),this.locator&&d(this.locator,v)}},skippedEntity:function(p){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(p){(this.locator=p)&&(p.lineNumber=0)},comment:function(p,b,y){p=g.apply(this,arguments);var v=this.doc.createComment(p);this.locator&&d(this.locator,v),x(this,v)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(p,b,y){var v=this.doc.implementation;if(v&&v.createDocumentType){var C=v.createDocumentType(p,b,y);this.locator&&d(this.locator,C),x(this,C),this.doc.doctype=C}},warning:function(p){console.warn("[xmldom warning]	"+p,f(this.locator))},error:function(p){console.error("[xmldom error]	"+p,f(this.locator))},fatalError:function(p){throw new o(p,this.locator)}};function f(p){if(p)return`
@`+(p.systemId||"")+"#[line:"+p.lineNumber+",col:"+p.columnNumber+"]"}function g(p,b,y){return typeof p=="string"?p.substr(b,y):p.length>=b+y||b?new java.lang.String(p,b,y)+"":p}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(p){h.prototype[p]=function(){return null}});function x(p,b){p.currentElement?p.currentElement.appendChild(b):p.doc.appendChild(b)}return Nn.__DOMHandler=h,Nn.normalizeLineEndings=u,Nn.DOMParser=l,Nn}var kp;function Ey(){if(kp)return Ln;kp=1;var n=Up();return Ln.DOMImplementation=n.DOMImplementation,Ln.XMLSerializer=n.XMLSerializer,Ln.DOMParser=wy().DOMParser,Ln}var Py=Ey();const By={createCanvas:(n,e)=>new OffscreenCanvas(n??0,e??0),createImage:()=>new Image,getCanvasRenderingContext2D:()=>OffscreenCanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>globalThis.location.href,getFontFaceSet:()=>globalThis.fonts,fetch:(n,e)=>fetch(n,e),parseXML:n=>new Py.DOMParser().parseFromString(n,"text/xml")};class Ry{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){this._tickerAdded||!this.domElement||(Re.system.add(this._tickerUpdate,this,St.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(Re.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const e=this.events._rootPointerEvent;this.events.supportsTouchEvents&&e.pointerType==="touch"||globalThis.document.dispatchEvent(this.events.supportsPointerEvents?new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY,pointerType:e.pointerType,pointerId:e.pointerId}):new MouseEvent("mousemove",{clientX:e.clientX,clientY:e.clientY}))}_tickerUpdate(e){this._deltaTime+=e.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this._update())}destroy(){this.removeTickerListener(),this.events=null,this.domElement=null,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}}const wt=new Ry;class zn extends Cr{constructor(){super(...arguments),this.client=new ie,this.movement=new ie,this.offset=new ie,this.global=new ie,this.screen=new ie}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(e,t,r){return e.worldTransform.applyInverse(r||this.global,t)}getModifierState(e){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(e)}initMouseEvent(e,t,r,s,i,o,a,u,l,c,h,d,f,g,x){throw new Error("Method not implemented.")}}class ct extends zn{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class cr extends zn{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}cr.DOM_DELTA_PIXEL=0,cr.DOM_DELTA_LINE=1,cr.DOM_DELTA_PAGE=2;const Dy=2048,My=new ie,Hn=new ie;class Lp{constructor(e){this.dispatch=new We,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,t){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:t,priority:0}),this.mappingTable[e].sort((r,s)=>r.priority-s.priority)}dispatchEvent(e,t){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,t),this.dispatch.emit(t||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const t=this.mappingTable[e.type];if(t)for(let r=0,s=t.length;r<s;r++)t[r].fn(e);else X(`[EventBoundary]: Event mapping not defined for ${e.type}`)}hitTest(e,t){wt.pauseUpdate=!0;const s=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",i=this[s](this.rootTarget,this.rootTarget.eventMode,My.set(e,t),this.hitTestFn,this.hitPruneFn);return i&&i[0]}propagate(e,t){if(!e.target)return;const r=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let s=0,i=r.length-1;s<i;s++)if(e.currentTarget=r[s],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,t),!(e.propagationStopped||e.propagationImmediatelyStopped)){e.eventPhase=e.BUBBLING_PHASE;for(let s=r.length-2;s>=0;s--)if(e.currentTarget=r[s],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,t,r=this._allInteractiveElements){if(r.length===0)return;e.eventPhase=e.BUBBLING_PHASE;const s=Array.isArray(t)?t:[t];for(let i=r.length-1;i>=0;i--)s.forEach(o=>{e.currentTarget=r[i],this.notifyTarget(e,o)})}propagationPath(e){const t=[e];for(let r=0;r<Dy&&e!==this.rootTarget&&e.parent;r++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");t.push(e.parent),e=e.parent}return t.reverse(),t}hitTestMoveRecursive(e,t,r,s,i,o=!1){let a=!1;if(this._interactivePrune(e))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(wt.pauseUpdate=!1),e.interactiveChildren&&e.children){const c=e.children;for(let h=c.length-1;h>=0;h--){const d=c[h],f=this.hitTestMoveRecursive(d,this._isInteractive(t)?t:d.eventMode,r,s,i,o||i(e,r));if(f){if(f.length>0&&!f[f.length-1].parent)continue;const g=e.isInteractive();(f.length>0||g)&&(g&&this._allInteractiveElements.push(e),f.push(e)),this._hitElements.length===0&&(this._hitElements=f),a=!0}}}const u=this._isInteractive(t),l=e.isInteractive();return l&&l&&this._allInteractiveElements.push(e),o||this._hitElements.length>0?null:a?this._hitElements:u&&!i(e,r)&&s(e,r)?l?[e]:[]:null}hitTestRecursive(e,t,r,s,i){if(this._interactivePrune(e)||i(e,r))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(wt.pauseUpdate=!1),e.interactiveChildren&&e.children){const u=e.children,l=r;for(let c=u.length-1;c>=0;c--){const h=u[c],d=this.hitTestRecursive(h,this._isInteractive(t)?t:h.eventMode,l,s,i);if(d){if(d.length>0&&!d[d.length-1].parent)continue;const f=e.isInteractive();return(d.length>0||f)&&d.push(e),d}}}const o=this._isInteractive(t),a=e.isInteractive();return o&&s(e,r)?a?[e]:[]:null}_isInteractive(e){return e==="static"||e==="dynamic"}_interactivePrune(e){return!e||!e.visible||!e.renderable||!e.measurable||e.eventMode==="none"||e.eventMode==="passive"&&!e.interactiveChildren}hitPruneFn(e,t){if(e.hitArea&&(e.worldTransform.applyInverse(t,Hn),!e.hitArea.contains(Hn.x,Hn.y)))return!0;if(e.effects&&e.effects.length)for(let r=0;r<e.effects.length;r++){const s=e.effects[r];if(s.containsPoint&&!s.containsPoint(t,this.hitTestFn))return!0}return!1}hitTestFn(e,t){return e.hitArea?!0:e!=null&&e.containsPoint?(e.worldTransform.applyInverse(t,Hn),e.containsPoint(Hn)):!1}notifyTarget(e,t){var i,o;if(!e.currentTarget.isInteractive())return;t??(t=e.type);const r=`on${t}`;(o=(i=e.currentTarget)[r])==null||o.call(i,e);const s=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${t}capture`:t;this._notifyListeners(e,s),e.eventPhase===e.AT_TARGET&&this._notifyListeners(e,t)}mapPointerDown(e){if(!(e instanceof ct)){X("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.createPointerEvent(e);if(this.dispatchEvent(t,"pointerdown"),t.pointerType==="touch")this.dispatchEvent(t,"touchstart");else if(t.pointerType==="mouse"||t.pointerType==="pen"){const s=t.button===2;this.dispatchEvent(t,s?"rightdown":"mousedown")}const r=this.trackingData(e.pointerId);r.pressTargetsByButton[e.button]=t.composedPath(),this.freeEvent(t)}mapPointerMove(e){var u,l;if(!(e instanceof ct)){X("EventBoundary cannot map a non-pointer event as a pointer event");return}this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const t=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const r=t.pointerType==="mouse"||t.pointerType==="pen",s=this.trackingData(e.pointerId),i=this.findMountedTarget(s.overTargets);if(((u=s.overTargets)==null?void 0:u.length)>0&&i!==t.target){const c=e.type==="mousemove"?"mouseout":"pointerout",h=this.createPointerEvent(e,c,i);if(this.dispatchEvent(h,"pointerout"),r&&this.dispatchEvent(h,"mouseout"),!t.composedPath().includes(i)){const d=this.createPointerEvent(e,"pointerleave",i);for(d.eventPhase=d.AT_TARGET;d.target&&!t.composedPath().includes(d.target);)d.currentTarget=d.target,this.notifyTarget(d),r&&this.notifyTarget(d,"mouseleave"),d.target=d.target.parent;this.freeEvent(d)}this.freeEvent(h)}if(i!==t.target){const c=e.type==="mousemove"?"mouseover":"pointerover",h=this.clonePointerEvent(t,c);this.dispatchEvent(h,"pointerover"),r&&this.dispatchEvent(h,"mouseover");let d=i==null?void 0:i.parent;for(;d&&d!==this.rootTarget.parent&&d!==t.target;)d=d.parent;if(!d||d===this.rootTarget.parent){const g=this.clonePointerEvent(t,"pointerenter");for(g.eventPhase=g.AT_TARGET;g.target&&g.target!==i&&g.target!==this.rootTarget.parent;)g.currentTarget=g.target,this.notifyTarget(g),r&&this.notifyTarget(g,"mouseenter"),g.target=g.target.parent;this.freeEvent(g)}this.freeEvent(h)}const o=[],a=this.enableGlobalMoveEvents??!0;this.moveOnAll?o.push("pointermove"):this.dispatchEvent(t,"pointermove"),a&&o.push("globalpointermove"),t.pointerType==="touch"&&(this.moveOnAll?o.splice(1,0,"touchmove"):this.dispatchEvent(t,"touchmove"),a&&o.push("globaltouchmove")),r&&(this.moveOnAll?o.splice(1,0,"mousemove"):this.dispatchEvent(t,"mousemove"),a&&o.push("globalmousemove"),this.cursor=(l=t.target)==null?void 0:l.cursor),o.length>0&&this.all(t,o),this._allInteractiveElements.length=0,this._hitElements.length=0,s.overTargets=t.composedPath(),this.freeEvent(t)}mapPointerOver(e){var o;if(!(e instanceof ct)){X("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId),r=this.createPointerEvent(e),s=r.pointerType==="mouse"||r.pointerType==="pen";this.dispatchEvent(r,"pointerover"),s&&this.dispatchEvent(r,"mouseover"),r.pointerType==="mouse"&&(this.cursor=(o=r.target)==null?void 0:o.cursor);const i=this.clonePointerEvent(r,"pointerenter");for(i.eventPhase=i.AT_TARGET;i.target&&i.target!==this.rootTarget.parent;)i.currentTarget=i.target,this.notifyTarget(i),s&&this.notifyTarget(i,"mouseenter"),i.target=i.target.parent;t.overTargets=r.composedPath(),this.freeEvent(r),this.freeEvent(i)}mapPointerOut(e){if(!(e instanceof ct)){X("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId);if(t.overTargets){const r=e.pointerType==="mouse"||e.pointerType==="pen",s=this.findMountedTarget(t.overTargets),i=this.createPointerEvent(e,"pointerout",s);this.dispatchEvent(i),r&&this.dispatchEvent(i,"mouseout");const o=this.createPointerEvent(e,"pointerleave",s);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),r&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;t.overTargets=null,this.freeEvent(i),this.freeEvent(o)}this.cursor=null}mapPointerUp(e){if(!(e instanceof ct)){X("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=performance.now(),r=this.createPointerEvent(e);if(this.dispatchEvent(r,"pointerup"),r.pointerType==="touch")this.dispatchEvent(r,"touchend");else if(r.pointerType==="mouse"||r.pointerType==="pen"){const a=r.button===2;this.dispatchEvent(r,a?"rightup":"mouseup")}const s=this.trackingData(e.pointerId),i=this.findMountedTarget(s.pressTargetsByButton[e.button]);let o=i;if(i&&!r.composedPath().includes(i)){let a=i;for(;a&&!r.composedPath().includes(a);){if(r.currentTarget=a,this.notifyTarget(r,"pointerupoutside"),r.pointerType==="touch")this.notifyTarget(r,"touchendoutside");else if(r.pointerType==="mouse"||r.pointerType==="pen"){const u=r.button===2;this.notifyTarget(r,u?"rightupoutside":"mouseupoutside")}a=a.parent}delete s.pressTargetsByButton[e.button],o=a}if(o){const a=this.clonePointerEvent(r,"click");a.target=o,a.path=null,s.clicksByButton[e.button]||(s.clicksByButton[e.button]={clickCount:0,target:a.target,timeStamp:t});const u=s.clicksByButton[e.button];if(u.target===a.target&&t-u.timeStamp<200?++u.clickCount:u.clickCount=1,u.target=a.target,u.timeStamp=t,a.detail=u.clickCount,a.pointerType==="mouse"){const l=a.button===2;this.dispatchEvent(a,l?"rightclick":"click")}else a.pointerType==="touch"&&this.dispatchEvent(a,"tap");this.dispatchEvent(a,"pointertap"),this.freeEvent(a)}this.freeEvent(r)}mapPointerUpOutside(e){if(!(e instanceof ct)){X("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId),r=this.findMountedTarget(t.pressTargetsByButton[e.button]),s=this.createPointerEvent(e);if(r){let i=r;for(;i;)s.currentTarget=i,this.notifyTarget(s,"pointerupoutside"),s.pointerType==="touch"?this.notifyTarget(s,"touchendoutside"):(s.pointerType==="mouse"||s.pointerType==="pen")&&this.notifyTarget(s,s.button===2?"rightupoutside":"mouseupoutside"),i=i.parent;delete t.pressTargetsByButton[e.button]}this.freeEvent(s)}mapWheel(e){if(!(e instanceof cr)){X("EventBoundary cannot map a non-wheel event as a wheel event");return}const t=this.createWheelEvent(e);this.dispatchEvent(t),this.freeEvent(t)}findMountedTarget(e){if(!e)return null;let t=e[0];for(let r=1;r<e.length&&e[r].parent===t;r++)t=e[r];return t}createPointerEvent(e,t,r){const s=this.allocateEvent(ct);return this.copyPointerData(e,s),this.copyMouseData(e,s),this.copyData(e,s),s.nativeEvent=e.nativeEvent,s.originalEvent=e,s.target=r??this.hitTest(s.global.x,s.global.y)??this._hitElements[0],typeof t=="string"&&(s.type=t),s}createWheelEvent(e){const t=this.allocateEvent(cr);return this.copyWheelData(e,t),this.copyMouseData(e,t),this.copyData(e,t),t.nativeEvent=e.nativeEvent,t.originalEvent=e,t.target=this.hitTest(t.global.x,t.global.y),t}clonePointerEvent(e,t){const r=this.allocateEvent(ct);return r.nativeEvent=e.nativeEvent,r.originalEvent=e.originalEvent,this.copyPointerData(e,r),this.copyMouseData(e,r),this.copyData(e,r),r.target=e.target,r.path=e.composedPath().slice(),r.type=t??r.type,r}copyWheelData(e,t){t.deltaMode=e.deltaMode,t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ}copyPointerData(e,t){e instanceof ct&&t instanceof ct&&(t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist)}copyMouseData(e,t){e instanceof zn&&t instanceof zn&&(t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.copyFrom(e.client),t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.copyFrom(e.movement),t.screen.copyFrom(e.screen),t.shiftKey=e.shiftKey,t.global.copyFrom(e.global))}copyData(e,t){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.detail=e.detail,t.view=e.view,t.which=e.which,t.layer.copyFrom(e.layer),t.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const t=this.eventPool.get(e).pop()||new e(this);return t.eventPhase=t.NONE,t.currentTarget=null,t.defaultPrevented=!1,t.path=null,t.target=null,t}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const t=e.constructor;this.eventPool.has(t)||this.eventPool.set(t,[]),this.eventPool.get(t).push(e)}_notifyListeners(e,t){const r=e.currentTarget._events[t];if(r)if("fn"in r)r.once&&e.currentTarget.removeListener(t,r.fn,void 0,!0),r.fn.call(r.context,e);else for(let s=0,i=r.length;s<i&&!e.propagationImmediatelyStopped;s++)r[s].once&&e.currentTarget.removeListener(t,r[s].fn,void 0,!0),r[s].fn.call(r[s].context,e)}}const Fy=1,Uy={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},Ia=class Jl{constructor(e){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=e,this.rootBoundary=new Lp(null),wt.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new ct(null),this._rootWheelEvent=new cr(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy({...Jl.defaultEventFeatures},{set:(t,r,s)=>(r==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=s),t[r]=s,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(e){const{canvas:t,resolution:r}=this.renderer;this.setTargetElement(t),this.resolution=r,Jl._defaultEventMode=e.eventMode??"passive",Object.assign(this.features,e.eventFeatures??{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(e){this.resolution=e}destroy(){wt.destroy(),this.setTargetElement(null),this.renderer=null,this._currentCursor=null}setCursor(e){e||(e="default");let t=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(t=!1),this._currentCursor===e)return;this._currentCursor=e;const r=this.cursorStyles[e];if(r)switch(typeof r){case"string":t&&(this.domElement.style.cursor=r);break;case"function":r(e);break;case"object":t&&Object.assign(this.domElement.style,r);break}else t&&typeof e=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,e)&&(this.domElement.style.cursor=e)}get pointer(){return this._rootPointerEvent}_onPointerDown(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const t=this._normalizeToPointerData(e);this.autoPreventDefault&&t[0].isNormalized&&(e.cancelable||!("cancelable"in e))&&e.preventDefault();for(let r=0,s=t.length;r<s;r++){const i=t[r],o=this._bootstrapEvent(this._rootPointerEvent,i);this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(e){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,wt.pointerMoved();const t=this._normalizeToPointerData(e);for(let r=0,s=t.length;r<s;r++){const i=this._bootstrapEvent(this._rootPointerEvent,t[r]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let t=e.target;e.composedPath&&e.composedPath().length>0&&(t=e.composedPath()[0]);const r=t!==this.domElement?"outside":"",s=this._normalizeToPointerData(e);for(let i=0,o=s.length;i<o;i++){const a=this._bootstrapEvent(this._rootPointerEvent,s[i]);a.type+=r,this.rootBoundary.mapEvent(a)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const t=this._normalizeToPointerData(e);for(let r=0,s=t.length;r<s;r++){const i=this._bootstrapEvent(this._rootPointerEvent,t[r]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}onWheel(e){if(!this.features.wheel)return;const t=this.normalizeWheelEvent(e);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(t)}setTargetElement(e){this._removeEvents(),this.domElement=e,wt.domElement=e,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;wt.addTickerListener();const e=this.domElement.style;e&&(globalThis.navigator.msPointerEnabled?(e.msContentZooming="none",e.msTouchAction="none"):this.supportsPointerEvents&&(e.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;wt.removeTickerListener();const e=this.domElement.style;e&&(globalThis.navigator.msPointerEnabled?(e.msContentZooming="",e.msTouchAction=""):this.supportsPointerEvents&&(e.touchAction="")),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(e,t,r){const s=this.domElement.isConnected?this.domElement.getBoundingClientRect():{width:this.domElement.width,height:this.domElement.height,left:0,top:0},i=1/this.resolution;e.x=(t-s.left)*(this.domElement.width/s.width)*i,e.y=(r-s.top)*(this.domElement.height/s.height)*i}_normalizeToPointerData(e){const t=[];if(this.supportsTouchEvents&&e instanceof TouchEvent)for(let r=0,s=e.changedTouches.length;r<s;r++){const i=e.changedTouches[r];typeof i.button>"u"&&(i.button=0),typeof i.buttons>"u"&&(i.buttons=1),typeof i.isPrimary>"u"&&(i.isPrimary=e.touches.length===1&&e.type==="touchstart"),typeof i.width>"u"&&(i.width=i.radiusX||1),typeof i.height>"u"&&(i.height=i.radiusY||1),typeof i.tiltX>"u"&&(i.tiltX=0),typeof i.tiltY>"u"&&(i.tiltY=0),typeof i.pointerType>"u"&&(i.pointerType="touch"),typeof i.pointerId>"u"&&(i.pointerId=i.identifier||0),typeof i.pressure>"u"&&(i.pressure=i.force||.5),typeof i.twist>"u"&&(i.twist=0),typeof i.tangentialPressure>"u"&&(i.tangentialPressure=0),typeof i.layerX>"u"&&(i.layerX=i.offsetX=i.clientX),typeof i.layerY>"u"&&(i.layerY=i.offsetY=i.clientY),i.isNormalized=!0,i.type=e.type,t.push(i)}else if(!globalThis.MouseEvent||e instanceof MouseEvent&&(!this.supportsPointerEvents||!(e instanceof globalThis.PointerEvent))){const r=e;typeof r.isPrimary>"u"&&(r.isPrimary=!0),typeof r.width>"u"&&(r.width=1),typeof r.height>"u"&&(r.height=1),typeof r.tiltX>"u"&&(r.tiltX=0),typeof r.tiltY>"u"&&(r.tiltY=0),typeof r.pointerType>"u"&&(r.pointerType="mouse"),typeof r.pointerId>"u"&&(r.pointerId=Fy),typeof r.pressure>"u"&&(r.pressure=.5),typeof r.twist>"u"&&(r.twist=0),typeof r.tangentialPressure>"u"&&(r.tangentialPressure=0),r.isNormalized=!0,t.push(r)}else t.push(e);return t}normalizeWheelEvent(e){const t=this._rootWheelEvent;return this._transferMouseData(t,e),t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ,t.deltaMode=e.deltaMode,this.mapPositionToPoint(t.screen,e.clientX,e.clientY),t.global.copyFrom(t.screen),t.offset.copyFrom(t.screen),t.nativeEvent=e,t.type=e.type,t}_bootstrapEvent(e,t){return e.originalEvent=null,e.nativeEvent=t,e.pointerId=t.pointerId,e.width=t.width,e.height=t.height,e.isPrimary=t.isPrimary,e.pointerType=t.pointerType,e.pressure=t.pressure,e.tangentialPressure=t.tangentialPressure,e.tiltX=t.tiltX,e.tiltY=t.tiltY,e.twist=t.twist,this._transferMouseData(e,t),this.mapPositionToPoint(e.screen,t.clientX,t.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.isTrusted=t.isTrusted,e.type==="pointerleave"&&(e.type="pointerout"),e.type.startsWith("mouse")&&(e.type=e.type.replace("mouse","pointer")),e.type.startsWith("touch")&&(e.type=Uy[e.type]||e.type),e}_transferMouseData(e,t){e.isTrusted=t.isTrusted,e.srcElement=t.srcElement,e.timeStamp=performance.now(),e.type=t.type,e.altKey=t.altKey,e.button=t.button,e.buttons=t.buttons,e.client.x=t.clientX,e.client.y=t.clientY,e.ctrlKey=t.ctrlKey,e.metaKey=t.metaKey,e.movement.x=t.movementX,e.movement.y=t.movementY,e.page.x=t.pageX,e.page.y=t.pageY,e.relatedTarget=null,e.shiftKey=t.shiftKey}};Ia.extension={name:"events",type:[T.WebGLSystem,T.CanvasSystem,T.WebGPUSystem],priority:-1},Ia.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};let Oa=Ia;const Np={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(n){this.eventMode=n?"static":"passive"},_internalEventMode:void 0,get eventMode(){return this._internalEventMode??Oa.defaultEventMode},set eventMode(n){this._internalEventMode=n},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(n,e,t){const r=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,s=typeof t=="object"?t.signal:void 0,i=typeof t=="object"?t.once===!0:!1,o=typeof e=="function"?void 0:e;n=r?`${n}capture`:n;const a=typeof e=="function"?e:e.handleEvent,u=this;s&&s.addEventListener("abort",()=>{u.off(n,a,o)}),i?u.once(n,a,o):u.on(n,a,o)},removeEventListener(n,e,t){const r=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,s=typeof e=="function"?void 0:e;n=r?`${n}capture`:n,e=typeof e=="function"?e:e.handleEvent,this.off(n,e,s)},dispatchEvent(n){if(!(n instanceof Cr))throw new Error("Container cannot propagate events outside of the Federated Events API");return n.defaultPrevented=!1,n.path=null,n.target=this,n.manager.dispatchEvent(n),!n.defaultPrevented}};var Vn=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,zp=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Ga=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct AlphaUniforms {
  uAlpha:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> alphaUniforms : AlphaUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
 
    var sample = textureSample(uTexture, uSampler, uv);
    
    return sample * alphaUniforms.uAlpha;
}`;const Hp=class kx extends Fe{constructor(e){e={...kx.defaultOptions,...e};const t=pe.from({vertex:{source:Ga,entryPoint:"mainVertex"},fragment:{source:Ga,entryPoint:"mainFragment"}}),r=be.from({vertex:Vn,fragment:zp,name:"alpha-filter"}),{alpha:s,...i}=e,o=new Ce({uAlpha:{value:s,type:"f32"}});super({...i,gpuProgram:t,glProgram:r,resources:{alphaUniforms:o}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Hp.defaultOptions={alpha:1};let Iy=Hp;const ka={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},Oy=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uTexture;","out vec4 finalColor;","void main(void)","{","    finalColor = vec4(0.0);","    %blur%","}"].join(`
`);function Vp(n){const e=ka[n],t=e.length;let r=Oy,s="";const i="finalColor += texture(uTexture, vBlurTexCoords[%index%]) * %value%;";let o;for(let a=0;a<n;a++){let u=i.replace("%index%",a.toString());o=a,a>=t&&(o=n-a-1),u=u.replace("%value%",e[o].toString()),s+=u,s+=`
`}return r=r.replace("%blur%",s),r=r.replace("%size%",n.toString()),r}const Gy=`
    in vec2 aPosition;

    uniform float uStrength;

    out vec2 vBlurTexCoords[%size%];

    uniform vec4 uInputSize;
    uniform vec4 uOutputFrame;
    uniform vec4 uOutputTexture;

    vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

    vec2 filterTextureCoord( void )
    {
        return aPosition * (uOutputFrame.zw * uInputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        float pixelStrength = uInputSize.%dimension% * uStrength;

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;function Wp(n,e){const t=Math.ceil(n/2);let r=Gy,s="",i;e?i="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":i="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let o=0;o<n;o++){let a=i.replace("%index%",o.toString());a=a.replace("%sampleIndex%",`${o-(t-1)}.0`),s+=a,s+=`
`}return r=r.replace("%blur%",s),r=r.replace("%size%",n.toString()),r=r.replace("%dimension%",e?"z":"w"),r}function Xp(n,e){const t=Wp(e,n),r=Vp(e);return be.from({vertex:t,fragment:r,name:`blur-${n?"horizontal":"vertical"}-pass-filter`})}var $p=`

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct BlurUniforms {
  uStrength:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    %blur-struct%
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}


@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {

  let filteredCord = filterTextureCoord(aPosition);

  let pixelStrength = gfu.uInputSize.%dimension% * blurUniforms.uStrength;

  return VSOutput(
   filterVertexPosition(aPosition),
    %blur-vertex-out%
  );
}

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  %blur-fragment-in%
) -> @location(0) vec4<f32> {

    var   finalColor = vec4(0.0);

    %blur-sampling%

    return finalColor;
}`;function Yp(n,e){const t=ka[e],r=t.length,s=[],i=[],o=[];for(let h=0;h<e;h++){s[h]=`@location(${h}) offset${h}: vec2<f32>,`,n?i[h]=`filteredCord + vec2(${h-r+1} * pixelStrength, 0.0),`:i[h]=`filteredCord + vec2(0.0, ${h-r+1} * pixelStrength),`;const d=h<r?h:e-h-1,f=t[d].toString();o[h]=`finalColor += textureSample(uTexture, uSampler, offset${h}) * ${f};`}const a=s.join(`
`),u=i.join(`
`),l=o.join(`
`),c=$p.replace("%blur-struct%",a).replace("%blur-vertex-out%",u).replace("%blur-fragment-in%",a).replace("%blur-sampling%",l).replace("%dimension%",n?"z":"w");return pe.from({vertex:{source:c,entryPoint:"mainVertex"},fragment:{source:c,entryPoint:"mainFragment"}})}const qp=class Lx extends Fe{constructor(e){e={...Lx.defaultOptions,...e};const t=Xp(e.horizontal,e.kernelSize),r=Yp(e.horizontal,e.kernelSize);super({glProgram:t,gpuProgram:r,resources:{blurUniforms:{uStrength:{value:0,type:"f32"}}},...e}),this.horizontal=e.horizontal,this._quality=0,this.quality=e.quality,this.blur=e.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(e,t,r,s){if(this._uniforms.uStrength=this.strength/this.passes,this.passes===1)e.applyFilter(this,t,r,s);else{const i=ue.getSameSizeTexture(t);let o=t,a=i;this._state.blend=!1;const u=e.renderer.type===$e.WEBGPU;for(let l=0;l<this.passes-1;l++){e.applyFilter(this,o,a,l===0?!0:u);const c=a;a=o,o=c}this._state.blend=!0,e.applyFilter(this,o,r,s),ue.returnTexture(i)}}get blur(){return this.strength}set blur(e){this.padding=1+Math.abs(e)*2,this.strength=e}get quality(){return this._quality}set quality(e){this._quality=e,this.passes=e}};qp.defaultOptions={strength:8,quality:4,kernelSize:5};let ri=qp;class jp extends Fe{constructor(...e){let t=e[0]??{};typeof t=="number"&&(L(j,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),t={strength:t},e[1]!==void 0&&(t.quality=e[1]),e[2]!==void 0&&(t.resolution=e[2]||"inherit"),e[3]!==void 0&&(t.kernelSize=e[3])),t={...ri.defaultOptions,...t};const{strength:r,strengthX:s,strengthY:i,quality:o,...a}=t;super({...a,compatibleRenderers:$e.BOTH,resources:{}}),this._repeatEdgePixels=!1,this.blurXFilter=new ri({horizontal:!0,...t}),this.blurYFilter=new ri({horizontal:!1,...t}),this.quality=o,this.strengthX=s??r,this.strengthY=i??r,this.repeatEdgePixels=!1}apply(e,t,r,s){const i=Math.abs(this.blurXFilter.strength),o=Math.abs(this.blurYFilter.strength);if(i&&o){const a=ue.getSameSizeTexture(t);this.blurXFilter.blendMode="normal",this.blurXFilter.apply(e,t,a,!0),this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(e,a,r,s),ue.returnTexture(a)}else o?(this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(e,t,r,s)):(this.blurXFilter.blendMode=this.blendMode,this.blurXFilter.apply(e,t,r,s))}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get strength(){if(this.strengthX!==this.strengthY)throw new Error("BlurFilter's strengthX and strengthY are different");return this.strengthX}set strength(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get strengthX(){return this.blurXFilter.blur}set strengthX(e){this.blurXFilter.blur=e,this.updatePadding()}get strengthY(){return this.blurYFilter.blur}set strengthY(e){this.blurYFilter.blur=e,this.updatePadding()}get blur(){return L("8.3.0","BlurFilter.blur is deprecated, please use BlurFilter.strength instead."),this.strength}set blur(e){L("8.3.0","BlurFilter.blur is deprecated, please use BlurFilter.strength instead."),this.strength=e}get blurX(){return L("8.3.0","BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."),this.strengthX}set blurX(e){L("8.3.0","BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."),this.strengthX=e}get blurY(){return L("8.3.0","BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."),this.strengthY}set blurY(e){L("8.3.0","BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."),this.strengthY=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}}jp.defaultOptions={strength:8,quality:4,kernelSize:5};var Kp=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uColorMatrix[20];
uniform float uAlpha;

uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;

    if (uAlpha == 0.0) {
        finalColor = color;
        return;
    }

    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    vec4 result;

    result.r = (uColorMatrix[0] * color.r);
        result.r += (uColorMatrix[1] * color.g);
        result.r += (uColorMatrix[2] * color.b);
        result.r += (uColorMatrix[3] * color.a);
        result.r += uColorMatrix[4];

    result.g = (uColorMatrix[5] * color.r);
        result.g += (uColorMatrix[6] * color.g);
        result.g += (uColorMatrix[7] * color.b);
        result.g += (uColorMatrix[8] * color.a);
        result.g += uColorMatrix[9];

    result.b = (uColorMatrix[10] * color.r);
       result.b += (uColorMatrix[11] * color.g);
       result.b += (uColorMatrix[12] * color.b);
       result.b += (uColorMatrix[13] * color.a);
       result.b += uColorMatrix[14];

    result.a = (uColorMatrix[15] * color.r);
       result.a += (uColorMatrix[16] * color.g);
       result.a += (uColorMatrix[17] * color.b);
       result.a += (uColorMatrix[18] * color.a);
       result.a += uColorMatrix[19];

    vec3 rgb = mix(color.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    finalColor = vec4(rgb, result.a);
}
`,La=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(1) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
  };
  
fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {


  var c = textureSample(uTexture, uSampler, uv);
  
  if (colorMatrixUniforms.uAlpha == 0.0) {
    return c;
  }

 
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.r /= c.a;
      c.g /= c.a;
      c.b /= c.a;
    }

    var cm = colorMatrixUniforms.uColorMatrix;


    var result = vec4<f32>(0.);

    result.r = (cm[0][0] * c.r);
    result.r += (cm[0][1] * c.g);
    result.r += (cm[0][2] * c.b);
    result.r += (cm[0][3] * c.a);
    result.r += cm[1][0];

    result.g = (cm[1][1] * c.r);
    result.g += (cm[1][2] * c.g);
    result.g += (cm[1][3] * c.b);
    result.g += (cm[2][0] * c.a);
    result.g += cm[2][1];

    result.b = (cm[2][2] * c.r);
    result.b += (cm[2][3] * c.g);
    result.b += (cm[3][0] * c.b);
    result.b += (cm[3][1] * c.a);
    result.b += cm[3][2];

    result.a = (cm[3][3] * c.r);
    result.a += (cm[4][0] * c.g);
    result.a += (cm[4][1] * c.b);
    result.a += (cm[4][2] * c.a);
    result.a += cm[4][3];

    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);

    rgb.r *= result.a;
    rgb.g *= result.a;
    rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;class ky extends Fe{constructor(e={}){const t=new Ce({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),r=pe.from({vertex:{source:La,entryPoint:"mainVertex"},fragment:{source:La,entryPoint:"mainFragment"}}),s=be.from({vertex:Vn,fragment:Kp,name:"color-matrix-filter"});super({...e,gpuProgram:r,glProgram:s,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let r=e;t&&(this._multiply(r,this.matrix,e),r=this._colorMatrix(r)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=r,this.resources.colorMatrixUniforms.update()}_multiply(e,t,r){return e[0]=t[0]*r[0]+t[1]*r[5]+t[2]*r[10]+t[3]*r[15],e[1]=t[0]*r[1]+t[1]*r[6]+t[2]*r[11]+t[3]*r[16],e[2]=t[0]*r[2]+t[1]*r[7]+t[2]*r[12]+t[3]*r[17],e[3]=t[0]*r[3]+t[1]*r[8]+t[2]*r[13]+t[3]*r[18],e[4]=t[0]*r[4]+t[1]*r[9]+t[2]*r[14]+t[3]*r[19]+t[4],e[5]=t[5]*r[0]+t[6]*r[5]+t[7]*r[10]+t[8]*r[15],e[6]=t[5]*r[1]+t[6]*r[6]+t[7]*r[11]+t[8]*r[16],e[7]=t[5]*r[2]+t[6]*r[7]+t[7]*r[12]+t[8]*r[17],e[8]=t[5]*r[3]+t[6]*r[8]+t[7]*r[13]+t[8]*r[18],e[9]=t[5]*r[4]+t[6]*r[9]+t[7]*r[14]+t[8]*r[19]+t[9],e[10]=t[10]*r[0]+t[11]*r[5]+t[12]*r[10]+t[13]*r[15],e[11]=t[10]*r[1]+t[11]*r[6]+t[12]*r[11]+t[13]*r[16],e[12]=t[10]*r[2]+t[11]*r[7]+t[12]*r[12]+t[13]*r[17],e[13]=t[10]*r[3]+t[11]*r[8]+t[12]*r[13]+t[13]*r[18],e[14]=t[10]*r[4]+t[11]*r[9]+t[12]*r[14]+t[13]*r[19]+t[14],e[15]=t[15]*r[0]+t[16]*r[5]+t[17]*r[10]+t[18]*r[15],e[16]=t[15]*r[1]+t[16]*r[6]+t[17]*r[11]+t[18]*r[16],e[17]=t[15]*r[2]+t[16]*r[7]+t[17]*r[12]+t[18]*r[17],e[18]=t[15]*r[3]+t[16]*r[8]+t[17]*r[13]+t[18]*r[18],e[19]=t[15]*r[4]+t[16]*r[9]+t[17]*r[14]+t[18]*r[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const r=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(r,t)}tint(e,t){const[r,s,i]=ee.shared.setValue(e).toArray(),o=[r,0,0,0,0,0,s,0,0,0,0,0,i,0,0,0,0,0,1,0];this._loadMatrix(o,t)}greyscale(e,t){const r=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(r,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const r=Math.cos(e),s=Math.sin(e),i=Math.sqrt,o=1/3,a=i(o),u=r+(1-r)*o,l=o*(1-r)-a*s,c=o*(1-r)+a*s,h=o*(1-r)+a*s,d=r+o*(1-r),f=o*(1-r)-a*s,g=o*(1-r)-a*s,x=o*(1-r)+a*s,p=r+o*(1-r),b=[u,l,c,0,0,h,d,f,0,0,g,x,p,0,0,0,0,0,1,0];this._loadMatrix(b,t)}contrast(e,t){const r=(e||0)+1,s=-.5*(r-1),i=[r,0,0,0,s,0,r,0,0,s,0,0,r,0,s,0,0,0,1,0];this._loadMatrix(i,t)}saturate(e=0,t){const r=e*2/3+1,s=(r-1)*-.5,i=[r,s,s,0,0,s,r,s,0,0,s,s,r,0,0,0,0,0,1,0];this._loadMatrix(i,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,r,s,i){e||(e=.2),t||(t=.15),r||(r=16770432),s||(s=3375104);const o=ee.shared,[a,u,l]=o.setValue(r).toArray(),[c,h,d]=o.setValue(s).toArray(),f=[.3,.59,.11,0,0,a,u,l,e,0,c,h,d,t,0,a-c,u-h,l-d,0,0];this._loadMatrix(f,i)}night(e,t){e||(e=.1);const r=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(r,t)}predator(e,t){const r=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(r,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}var Zp=`
in vec2 vTextureCoord;
in vec2 vFilterUv;

out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;

uniform vec4 uInputClamp;
uniform highp vec4 uInputSize;
uniform mat2 uRotation;
uniform vec2 uScale;

void main()
{
    vec4 map = texture(uMapTexture, vFilterUv);
    
    vec2 offset = uInputSize.zw * (uRotation * (map.xy - 0.5)) * uScale; 

    finalColor = texture(uTexture, clamp(vTextureCoord + offset, uInputClamp.xy, uInputClamp.zw));
}
`,Qp=`in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vFilterUv;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

uniform mat3 uFilterMatrix;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( void )
{
  return ( uFilterMatrix * vec3( filterTextureCoord(), 1.0)  ).xy;
}


void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    vFilterUv = getFilterCoord();
}
`,Na=`
struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct DisplacementUniforms {
  uFilterMatrix:mat3x3<f32>,
  uScale:vec2<f32>,
  uRotation:mat2x2<f32>
};



@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : DisplacementUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;
@group(1) @binding(2) var uMapSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{

  
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var map = textureSample(uMapTexture, uMapSampler, filterUv);

    var offset =  gfu.uInputSize.zw * (filterUniforms.uRotation * (map.xy - 0.5)) * filterUniforms.uScale; 
   
    return textureSample(uTexture, uSampler, clamp(uv + offset, gfu.uInputClamp.xy, gfu.uInputClamp.zw));
}`;class Ly extends Fe{constructor(...e){let t=e[0];t instanceof dt&&(e[1]&&L(j,"DisplacementFilter now uses options object instead of params. {sprite, scale}"),t={sprite:t,scale:e[1]});const{sprite:r,scale:s,...i}=t;let o=s??20;typeof o=="number"&&(o=new ie(o,o));const a=new Ce({uFilterMatrix:{value:new H,type:"mat3x3<f32>"},uScale:{value:o,type:"vec2<f32>"},uRotation:{value:new Float32Array([0,0,0,0]),type:"mat2x2<f32>"}}),u=be.from({vertex:Qp,fragment:Zp,name:"displacement-filter"}),l=pe.from({vertex:{source:Na,entryPoint:"mainVertex"},fragment:{source:Na,entryPoint:"mainFragment"}}),c=r.texture.source;super({...i,gpuProgram:l,glProgram:u,resources:{filterUniforms:a,uMapTexture:c,uMapSampler:c.style}}),this._sprite=t.sprite,this._sprite.renderable=!1}apply(e,t,r,s){const i=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(i.uFilterMatrix,this._sprite);const o=this._sprite.worldTransform,a=Math.sqrt(o.a*o.a+o.b*o.b),u=Math.sqrt(o.c*o.c+o.d*o.d);a!==0&&u!==0&&(i.uRotation[0]=o.a/a,i.uRotation[1]=o.b/a,i.uRotation[2]=o.c/u,i.uRotation[3]=o.d/u),this.resources.uMapTexture=this._sprite.texture.source,e.applyFilter(this,t,r,s)}get scale(){return this.resources.filterUniforms.uniforms.uScale}}var Jp=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) *  uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    finalColor = color;
}
`,za=`

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct NoiseUniforms {
  uNoise:f32,
  uSeed:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> noiseUniforms : NoiseUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

fn rand(co:vec2<f32>) -> f32
{
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}



@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var pixelPosition =  globalTextureCoord(position.xy);// / (getSize());//-  gfu.uOutputFrame.xy);
  
    
    var sample = textureSample(uTexture, uSampler, uv);
    var randomValue =  rand(pixelPosition.xy * noiseUniforms.uSeed);
    var diff = (randomValue - 0.5) * noiseUniforms.uNoise;
  
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (sample.a > 0.0) {
      sample.r /= sample.a;
      sample.g /= sample.a;
      sample.b /= sample.a;
    }

    sample.r += diff;
    sample.g += diff;
    sample.b += diff;

    // Premultiply alpha again.
    sample.r *= sample.a;
    sample.g *= sample.a;
    sample.b *= sample.a;
    
    return sample;
}`;const em=class Nx extends Fe{constructor(e={}){e={...Nx.defaultOptions,...e};const t=pe.from({vertex:{source:za,entryPoint:"mainVertex"},fragment:{source:za,entryPoint:"mainFragment"}}),r=be.from({vertex:Vn,fragment:Jp,name:"noise-filter"}),{noise:s,seed:i,...o}=e;super({...o,gpuProgram:t,glProgram:r,resources:{noiseUniforms:new Ce({uNoise:{value:1,type:"f32"},uSeed:{value:1,type:"f32"}})}}),this.noise=s,this.seed=i??Math.random()}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(e){this.resources.noiseUniforms.uniforms.uNoise=e}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(e){this.resources.noiseUniforms.uniforms.uSeed=e}};em.defaultOptions={noise:.5};let Ny=em;var tm=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,Ha=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;class rm extends Fe{constructor(){const e=pe.from({vertex:{source:Ha,entryPoint:"mainVertex"},fragment:{source:Ha,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=be.from({vertex:Vn,fragment:tm,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}}class Va{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Va.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"filter"};function Wa(n,e,t,r,s,i,o,a){const u=o-t,l=a-r,c=s-t,h=i-r,d=n-t,f=e-r,g=u*u+l*l,x=u*c+l*h,p=u*d+l*f,b=c*c+h*h,y=c*d+h*f,v=1/(g*b-x*x),C=(b*p-x*y)*v,D=(g*y-x*p)*v;return C>=0&&D>=0&&C+D<1}class Xa{constructor(e=0,t=0,r=0,s=0,i=0,o=0){this.type="triangle",this.x=e,this.y=t,this.x2=r,this.y2=s,this.x3=i,this.y3=o}contains(e,t){const r=(this.x-this.x3)*(t-this.y3)-(this.y-this.y3)*(e-this.x3),s=(this.x2-this.x)*(t-this.y)-(this.y2-this.y)*(e-this.x);if(r<0!=s<0&&r!==0&&s!==0)return!1;const i=(this.x3-this.x2)*(t-this.y2)-(this.y3-this.y2)*(e-this.x2);return i===0||i<0==r+s<=0}strokeContains(e,t,r,s=.5){const i=r/2,o=i*i,{x:a,x2:u,x3:l,y:c,y2:h,y3:d}=this;return An(e,t,a,c,u,d)<=o||An(e,t,u,h,l,d)<=o||An(e,t,l,d,a,c)<=o}clone(){return new Xa(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e||(e=new ne);const t=Math.min(this.x,this.x2,this.x3),r=Math.max(this.x,this.x2,this.x3),s=Math.min(this.y,this.y2,this.y3),i=Math.max(this.y,this.y2,this.y3);return e.x=t,e.y=s,e.width=r-t,e.height=i-s,e}}const nm=new H;function sm(n,e){e.clear();const t=e.matrix;for(let r=0;r<n.length;r++){const s=n[r];if(s.globalDisplayStatus<7)continue;const i=s.renderGroup??s.parentRenderGroup;i!=null&&i.isCachedAsTexture?e.matrix=nm.copyFrom(i.textureOffsetInverseTransform).append(s.worldTransform):i!=null&&i._parentCacheAsTextureRenderGroup?e.matrix=nm.copyFrom(i._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(s.groupTransform):e.matrix=s.worldTransform,e.addBounds(s.bounds)}return e.matrix=t,e}const zy=new or({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Hy{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new Be,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class $a{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new Ce({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Tt({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,s=this._pushFilterData();s.skip=!1,s.filters=r,s.container=e.container,s.outputRenderSurface=t.renderTarget.renderSurface;const i=t.renderTarget.renderTarget.colorTexture.source,o=i.resolution,a=i.antialias;if(r.every(f=>!f.enabled)){s.skip=!0;return}const u=s.bounds;if(this._calculateFilterArea(e,u),this._calculateFilterBounds(s,t.renderTarget.rootViewPort,a,o,1),s.skip)return;const l=this._getPreviousFilterData(),c=this._findFilterResolution(o);let h=0,d=0;l&&(h=l.bounds.minX,d=l.bounds.minY),this._calculateGlobalFrame(s,h,d,c,i.width,i.height),this._setupFilterTextures(s,u,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const s=e.source,i=s.resolution,o=s.antialias;if(t.every(f=>!f.enabled))return r.skip=!0,e;const a=r.bounds;if(a.addRect(e.frame),this._calculateFilterBounds(r,a.rectangle,o,i,0),r.skip)return e;const u=i;this._calculateGlobalFrame(r,0,0,u,s.width,s.height),r.outputRenderSurface=ue.getOptimalTexture(a.width,a.height,r.resolution,r.antialias),r.backTexture=k.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const d=r.outputRenderSurface;return d.source.alphaMode="premultiplied-alpha",d}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&ue.returnTexture(t.backTexture),ue.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const s=e.colorTexture.source._resolution,i=ue.getOptimalTexture(t.width,t.height,s,!1);let o=t.minX,a=t.minY;r&&(o-=r.minX,a-=r.minY),o=Math.floor(o*s),a=Math.floor(a*s);const u=Math.ceil(t.width*s),l=Math.ceil(t.height*s);return this.renderer.renderTarget.copyToTexture(e,i,{x:o,y:a},{width:u,height:l},{x:0,y:0}),i}applyFilter(e,t,r,s){const i=this.renderer,o=this._activeFilterData,u=o.outputRenderSurface===r,l=i.renderTarget.rootRenderTarget.colorTexture.source._resolution,c=this._findFilterResolution(l);let h=0,d=0;if(u){const g=this._findPreviousFilterOffset();h=g.x,d=g.y}this._updateFilterUniforms(t,r,o,h,d,c,u,s);const f=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(f,t,i)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,s=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),i=t.worldTransform.copyTo(H.shared),o=t.renderGroup||t.parentRenderGroup;return o&&o.cacheToLocalTransform&&i.prepend(o.cacheToLocalTransform),i.invert(),s.prepend(i),s.scale(1/t.texture.orig.width,1/t.texture.orig.height),s.translate(t.anchor.x,t.anchor.y),s}destroy(){var e;(e=this._passthroughFilter)==null||e.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new rm),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const s=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(s,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:zy,shader:e,state:e._state,topology:"triangle-list"}),r.type===$e.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,s){if(e.backTexture=k.EMPTY,e.inputTexture=ue.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const i=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(i,t,s==null?void 0:s.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,s,i,o){const a=e.globalFrame;a.x=t*s,a.y=r*s,a.width=i*s,a.height=o*s}_updateFilterUniforms(e,t,r,s,i,o,a,u){const l=this._filterGlobalUniforms.uniforms,c=l.uOutputFrame,h=l.uInputSize,d=l.uInputPixel,f=l.uInputClamp,g=l.uGlobalFrame,x=l.uOutputTexture;a?(c[0]=r.bounds.minX-s,c[1]=r.bounds.minY-i):(c[0]=0,c[1]=0),c[2]=e.frame.width,c[3]=e.frame.height,h[0]=e.source.width,h[1]=e.source.height,h[2]=1/h[0],h[3]=1/h[1],d[0]=e.source.pixelWidth,d[1]=e.source.pixelHeight,d[2]=1/d[0],d[3]=1/d[1],f[0]=.5*d[2],f[1]=.5*d[3],f[2]=e.frame.width*h[2]-.5*d[2],f[3]=e.frame.height*h[3]-.5*d[3];const p=this.renderer.renderTarget.rootRenderTarget.colorTexture;g[0]=s*o,g[1]=i*o,g[2]=p.source.width*o,g[3]=p.source.height*o,t instanceof k&&(t.source.resource=null);const b=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!u),t instanceof k?(x[0]=t.frame.width,x[1]=t.frame.height):(x[0]=b.width,x[1]=b.height),x[2]=b.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const s=this._filterStack[r];if(!s.skip){e=s.bounds.minX,t=s.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?sm(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const s=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;s&&t.applyMatrix(s)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,s=e.bounds,i=e.filters,o=e.firstEnabledIndex,a=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),o===a)i[o].apply(this,r,e.outputRenderSurface,t);else{let u=e.inputTexture;const l=ue.getOptimalTexture(s.width,s.height,u.source._resolution,!1);let c=l;for(let h=o;h<a;h++){const d=i[h];if(!d.enabled)continue;d.apply(this,u,c,!0);const f=u;u=c,c=f}i[a].apply(this,u,e.outputRenderSurface,t),ue.returnTexture(l)}}_calculateFilterBounds(e,t,r,s,i){var b;const o=this.renderer,a=e.bounds,u=e.filters;let l=1/0,c=0,h=!0,d=!1,f=!1,g=!0,x=-1,p=-1;for(let y=0;y<u.length;y++){const v=u[y];if(!v.enabled)continue;if(x===-1&&(x=y),p=y,l=Math.min(l,v.resolution==="inherit"?s:v.resolution),c+=v.padding,v.antialias==="off"?h=!1:v.antialias==="inherit"&&h&&(h=r),v.clipToViewport||(g=!1),!!!(v.compatibleRenderers&o.type)){f=!1;break}if(v.blendRequired&&!(((b=o.backBuffer)==null?void 0:b.useBackBuffer)??!0)){X("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=!0,d||(d=v.blendRequired)}if(!f){e.skip=!0;return}if(g&&a.fitBounds(0,t.width/s,0,t.height/s),a.scale(l).ceil().scale(1/l).pad((c|0)*i),!a.isPositive){e.skip=!0;return}e.antialias=h,e.resolution=l,e.blendRequired=d,e.firstEnabledIndex=x,e.lastEnabledIndex=p}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new Hy),this._filterStackIndex++,e}}$a.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"filter"};var im=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;

uniform float uAlpha;
uniform vec4 uMaskClamp;
uniform float uInverse;

out vec4 finalColor;

void main(void)
{
    float clip = step(3.5,
        step(uMaskClamp.x, vMaskCoord.x) +
        step(uMaskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, uMaskClamp.z) +
        step(vMaskCoord.y, uMaskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = uAlpha;
    vec4 original = texture(uTexture, vTextureCoord);
    vec4 masky = texture(uMaskTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    float a = alphaMul * masky.r * npmAlpha * clip;

    if (uInverse == 1.0) {
        a = 1.0 - a;
    }

    finalColor = original * a;
}
`,om=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
uniform mat3 uFilterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
       
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`,Ya=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct MaskUniforms {
  uFilterMatrix:mat3x3<f32>,
  uMaskClamp:vec4<f32>,
  uAlpha:f32,
  uInverse:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.uMaskClamp;
    var uAlpha = filterUniforms.uAlpha;

    var clip = step(3.5,
      step(maskClamp.x, filterUv.x) +
      step(maskClamp.y, filterUv.y) +
      step(filterUv.x, maskClamp.z) +
      step(filterUv.y, maskClamp.w));

    var mask = textureSample(uMaskTexture, uSampler, filterUv);
    var source = textureSample(uTexture, uSampler, uv);
    var alphaMul = 1.0 - uAlpha * (1.0 - mask.a);

    var a: f32 = alphaMul * mask.r * uAlpha * clip;

    if (filterUniforms.uInverse == 1.0) {
        a = 1.0 - a;
    }

    return source * a;
}
`;class am extends Fe{constructor(e){const{sprite:t,...r}=e,s=new zi(t.texture),i=new Ce({uFilterMatrix:{value:new H,type:"mat3x3<f32>"},uMaskClamp:{value:s.uClampFrame,type:"vec4<f32>"},uAlpha:{value:1,type:"f32"},uInverse:{value:e.inverse?1:0,type:"f32"}}),o=pe.from({vertex:{source:Ya,entryPoint:"mainVertex"},fragment:{source:Ya,entryPoint:"mainFragment"}}),a=be.from({vertex:om,fragment:im,name:"mask-filter"});super({...r,gpuProgram:o,glProgram:a,clipToViewport:!1,resources:{filterUniforms:i,uMaskTexture:t.texture.source}}),this.sprite=t,this._textureMatrix=s}set inverse(e){this.resources.filterUniforms.uniforms.uInverse=e?1:0}get inverse(){return this.resources.filterUniforms.uniforms.uInverse===1}apply(e,t,r,s){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.uFilterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.uMaskTexture=this.sprite.texture.source,e.applyFilter(this,t,r,s)}}var Vy=`fn getLuminosity(c: vec3<f32>) -> f32 {
  return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
}

fn setLuminosity(c: vec3<f32>, lum: f32) -> vec3<f32> {
  let d: f32 = lum - getLuminosity(c);
  let newColor: vec3<f32> = c.rgb + vec3<f32>(d, d, d);

  // clip back into legal range
  let newLum: f32 = getLuminosity(newColor);
  let cMin: f32 = min(newColor.r, min(newColor.g, newColor.b));
  let cMax: f32 = max(newColor.r, max(newColor.g, newColor.b));

  let t1: f32 = newLum / (newLum - cMin);
  let t2: f32 = (1.0 - newLum) / (cMax - newLum);

  let finalColor = mix(vec3<f32>(newLum, newLum, newLum), newColor, select(select(1.0, t2, cMax > 1.0), t1, cMin < 0.0));

  return finalColor;
}

fn getSaturation(c: vec3<f32>) -> f32 {
  return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
}

// Set saturation if color components are sorted in ascending order.
fn setSaturationMinMidMax(cSorted: vec3<f32>, s: f32) -> vec3<f32> {
  var result: vec3<f32>;
  if (cSorted.z > cSorted.x) {
    let newY = (((cSorted.y - cSorted.x) * s) / (cSorted.z - cSorted.x));
    result = vec3<f32>(0.0, newY, s);
  } else {
    result = vec3<f32>(0.0, 0.0, 0.0);
  }
  return vec3<f32>(result.x, result.y, result.z);
}

fn setSaturation(c: vec3<f32>, s: f32) -> vec3<f32> {
    var result: vec3<f32> = c;

    if (c.r <= c.g && c.r <= c.b) {
        if (c.g <= c.b) {
            result = setSaturationMinMidMax(result, s);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.r, result.b, result.g);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.r, temp.b, temp.g);
        }
    } else if (c.g <= c.r && c.g <= c.b) {
        if (c.r <= c.b) {
            var temp: vec3<f32> = vec3<f32>(result.g, result.r, result.b);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.g, temp.r, temp.b);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.g, result.b, result.r);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.g, temp.b, temp.r);
        }
    } else {
        if (c.r <= c.g) {
            var temp: vec3<f32> = vec3<f32>(result.b, result.r, result.g);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.b, temp.r, temp.g);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.b, result.g, result.r);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.b, temp.g, temp.r);
        }
    }

    return result;
}`;const um=class zx{constructor(e){this._tick=()=>{this._destroyed||(this.timeout=setTimeout(this._processQueue,0))},this._processQueue=()=>{if(this._destroyed)return;const{queue:t}=this;let r=0;for(;t.length&&r<zx.uploadsPerFrame;){const s=t.shift();this.uploadQueueItem(s),r++}t.length?Re.system.addOnce(this._tick,this,St.UTILITY):this._resolve()},this.renderer=e,this.queue=[],this.resolves=[]}getQueue(){return[...this.queue]}add(e){const t=Array.isArray(e)?e:[e];for(const r of t)r instanceof ce?this._addContainer(r):this.resolveQueueItem(r,this.queue);return this}_addContainer(e){this.resolveQueueItem(e,this.queue);for(const t of e.children)this._addContainer(t)}upload(e){return e&&this.add(e),new Promise(t=>{this.queue.length?(this.resolves.push(t),this.dedupeQueue(),Re.system.addOnce(this._tick,this,St.UTILITY)):t()})}dedupeQueue(){const e=Object.create(null);let t=0;for(let r=0;r<this.queue.length;r++){const s=this.queue[r];e[s.uid]||(e[s.uid]=!0,this.queue[t++]=s)}this.queue.length=t}destroy(){this._destroyed=!0,clearTimeout(this.timeout)}_resolve(){const{resolves:e}=this,t=e.slice(0);e.length=0;for(const r of t)r()}};um.uploadsPerFrame=4;let lm=um;class Wr extends yt{constructor(e){e instanceof ze&&(e={context:e});const{context:t,roundPixels:r,...s}=e||{};super({label:"Graphics",...s}),this.renderPipeId="graphics",t?this.context=t:(this.context=this._ownedContext=new ze,this.context.autoGarbageCollect=this.autoGarbageCollect),this.didViewUpdate=!0,this.allowChildren=!1,this.roundPixels=r??!1}set context(e){e!==this._context&&(this._context&&(this._context.off("update",this.onViewUpdate,this),this._context.off("unload",this.unload,this)),this._context=e,this._context.on("update",this.onViewUpdate,this),this._context.on("unload",this.unload,this),this.onViewUpdate())}get context(){return this._context}get bounds(){return this._context.bounds}updateBounds(){}containsPoint(e){return this._context.containsPoint(e)}destroy(e){this._ownedContext&&!e?this._ownedContext.destroy(e):(e===!0||(e==null?void 0:e.context)===!0)&&this._context.destroy(e),this._ownedContext=null,this._context=null,super.destroy(e)}_onTouch(e){this._gcLastUsed=e,this._context._gcLastUsed=e}_callContextMethod(e,t){return this.context[e](...t),this}setFillStyle(...e){return this._callContextMethod("setFillStyle",e)}setStrokeStyle(...e){return this._callContextMethod("setStrokeStyle",e)}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(){return this._callContextMethod("beginPath",[])}cut(){return this._callContextMethod("cut",[])}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(){return this._callContextMethod("closePath",[])}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}regularPoly(...e){return this._callContextMethod("regularPoly",e)}roundPoly(...e){return this._callContextMethod("roundPoly",e)}roundShape(...e){return this._callContextMethod("roundShape",e)}filletRect(...e){return this._callContextMethod("filletRect",e)}chamferRect(...e){return this._callContextMethod("chamferRect",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(){return this._callContextMethod("save",[])}getTransform(){return this.context.getTransform()}resetTransform(){return this._callContextMethod("resetTransform",[])}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(){return this._callContextMethod("clear",[])}get fillStyle(){return this._context.fillStyle}set fillStyle(e){this._context.fillStyle=e}get strokeStyle(){return this._context.strokeStyle}set strokeStyle(e){this._context.strokeStyle=e}clone(e=!1){return e?new Wr(this._context.clone()):(this._ownedContext=null,new Wr(this._context))}lineStyle(e,t,r){L(j,"Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");const s={};return e&&(s.width=e),t&&(s.color=t),r&&(s.alpha=r),this.context.strokeStyle=s,this}beginFill(e,t){L(j,"Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");const r={};return e!==void 0&&(r.color=e),t!==void 0&&(r.alpha=t),this.context.fillStyle=r,this}endFill(){L(j,"Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill();const e=this.context.strokeStyle;return(e.width!==ze.defaultStrokeStyle.width||e.color!==ze.defaultStrokeStyle.color||e.alpha!==ze.defaultStrokeStyle.alpha)&&this.context.stroke(),this}drawCircle(...e){return L(j,"Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return L(j,"Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return L(j,"Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return L(j,"Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return L(j,"Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return L(j,"Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}}const cm=class Hx extends or{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(L(j,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...Hx.defaultOptions,...t};const r=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let s=t.uvs;s||(t.positions?s=new Float32Array(r.length):s=new Float32Array([0,0,1,0,1,1,0,1]));const i=t.indices||new Uint32Array([0,1,2,0,2,3]),o=t.shrinkBuffersToFit,a=new qe({data:r,label:"attribute-mesh-positions",shrinkToFit:o,usage:te.VERTEX|te.COPY_DST}),u=new qe({data:s,label:"attribute-mesh-uvs",shrinkToFit:o,usage:te.VERTEX|te.COPY_DST}),l=new qe({data:i,label:"index-mesh-buffer",shrinkToFit:o,usage:te.INDEX|te.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:u,format:"float32x2",stride:8,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};cm.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let Wt=cm;class Xr extends yt{constructor(...e){let t=e[0];t instanceof or&&(L(j,"Mesh: use new Mesh({ geometry, shader }) instead"),t={geometry:t,shader:e[1]},e[3]&&(L(j,"Mesh: drawMode argument has been removed, use geometry.topology instead"),t.geometry.topology=e[3]));const{geometry:r,shader:s,texture:i,roundPixels:o,state:a,...u}=t;super({label:"Mesh",...u}),this.renderPipeId="mesh",this._shader=null,this.allowChildren=!1,this.shader=s??null,this.texture=i??(s==null?void 0:s.texture)??k.WHITE,this.state=a??st.for2d(),this._geometry=r,this._geometry.on("update",this.onViewUpdate,this),this.roundPixels=o??!1}get material(){return L(j,"mesh.material property has been removed, use mesh.shader instead"),this._shader}set shader(e){this._shader!==e&&(this._shader=e,this.onViewUpdate())}get shader(){return this._shader}set geometry(e){var t;this._geometry!==e&&((t=this._geometry)==null||t.off("update",this.onViewUpdate,this),e.on("update",this.onViewUpdate,this),this._geometry=e,this.onViewUpdate())}get geometry(){return this._geometry}set texture(e){e||(e=k.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this.shader&&(this.shader.texture=e),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}get batched(){return this._shader||(this.state.data&12)!==0?!1:this._geometry instanceof Wt?this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch":!1}get bounds(){return this._geometry.bounds}updateBounds(){this._bounds=this._geometry.bounds}containsPoint(e){const{x:t,y:r}=e;if(!this.bounds.containsPoint(t,r))return!1;const s=this.geometry.getBuffer("aPosition").data,i=this.geometry.topology==="triangle-strip"?3:1;if(this.geometry.getIndex()){const o=this.geometry.getIndex().data,a=o.length;for(let u=0;u+2<a;u+=i){const l=o[u]*2,c=o[u+1]*2,h=o[u+2]*2;if(Wa(t,r,s[l],s[l+1],s[c],s[c+1],s[h],s[h+1]))return!0}}else{const o=s.length/2;for(let a=0;a+2<o;a+=i){const u=a*2,l=(a+1)*2,c=(a+2)*2;if(Wa(t,r,s[u],s[u+1],s[l],s[l+1],s[c],s[c+1]))return!0}}return!1}destroy(e){var r;if(super.destroy(e),typeof e=="boolean"?e:e==null?void 0:e.texture){const s=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(s)}(r=this._geometry)==null||r.off("update",this.onViewUpdate,this),this._texture=null,this._geometry=null,this._shader=null}}class Wn extends dt{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:s=!1,autoUpdate:i=!0,loop:o=!0,onComplete:a=null,onFrameChange:u=null,onLoop:l=null,textures:c,updateAnchor:h=!1,...d}=t,[f]=c;super({...d,texture:f instanceof k?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=o,this.updateAnchor=h,this.onComplete=a,this.onFrameChange=u,this.onLoop=l,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=c,s&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Re.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Re.shared.add(this.update,this,St.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,r=this.animationSpeed*t,s=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const o=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*o,this._currentTime+=o;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):s!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<s||this.animationSpeed<0&&this.currentFrame>s)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._textures.forEach(s=>{this.texture!==s&&s.destroy(r)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let r=0;r<e.length;++r)t.push(k.from(e[r]));return new Wn(t)}static fromImages(e){const t=[];for(let r=0;r<e.length;++r)t.push(k.from(e[r]));return new Wn(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof k)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Re.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Re.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class hm{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new H,this.observer=t,this.position=new le(this,0,0),this.scale=new le(this,1,1),this.pivot=new le(this,0,0),this.skew=new le(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){var t;this.dirty=!0,e===this.skew&&this.updateSkew(),(t=this.observer)==null||t._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const dm=class Di extends yt{constructor(...e){let t=e[0]||{};t instanceof k&&(t={texture:t}),e.length>1&&(L(j,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...Di.defaultOptions,...t};const{texture:r,anchor:s,tilePosition:i,tileScale:o,tileRotation:a,width:u,height:l,applyAnchorToTexture:c,roundPixels:h,...d}=t??{};super({label:"TilingSprite",...d}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new le({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=c,this.texture=r,this._width=u??r.width,this._height=l??r.height,this._tileTransform=new hm({observer:{_onUpdate:()=>this.onViewUpdate()}}),s&&(this.anchor=s),this.tilePosition=i,this.tileScale=o,this.tileRotation=a,this.roundPixels=h??!1}static from(e,t={}){return typeof e=="string"?new Di({texture:se.get(e),...t}):new Di({texture:e,...t})}get uvRespectAnchor(){return L(j,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){L(j,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=k.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,r=this._width,s=this._height;e.minX=-t._x*r,e.maxX=e.minX+r,e.minY=-t._y*s,e.maxY=e.minY+s}containsPoint(e){const t=this._width,r=this._height,s=-t*this._anchor._x;let i=0;return e.x>=s&&e.x<=s+t&&(i=-r*this._anchor._y,e.y>=i&&e.y<=i+r)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(r)}this._texture=null}};dm.defaultOptions={texture:k.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let fm=dm;class ni extends yt{constructor(e,t){const{text:r,resolution:s,style:i,anchor:o,width:a,height:u,roundPixels:l,...c}=e;super({...c}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=r??"",this.style=i,this.resolution=s??null,this.allowChildren=!1,this._anchor=new le({_onUpdate:()=>{this.onViewUpdate()}}),o&&(this.anchor=o),this.roundPixels=l??!1,a!==void 0&&(this.width=a),u!==void 0&&(this.height=u)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){var t;e||(e={}),(t=this._style)==null||t.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,r=this.bounds.height,s=-t*this.anchor.x;let i=0;return e.x>=s&&e.x<=s+t&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e!=null&&e.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function si(n,e){let t=n[0]??{};return(typeof t=="string"||n[1])&&(L(j,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:n[1]}),t}let hr=null,Ut=null;function Wy(n,e){hr||(hr=Q.get().createCanvas(256,128),Ut=hr.getContext("2d",{willReadFrequently:!0}),Ut.globalCompositeOperation="copy",Ut.globalAlpha=1),(hr.width<n||hr.height<e)&&(hr.width=rr(n),hr.height=rr(e))}function pm(n,e,t){for(let r=0,s=4*t*e;r<e;++r,s+=4)if(n[s+3]!==0)return!1;return!0}function mm(n,e,t,r,s){const i=4*e;for(let o=r,a=r*i+4*t;o<=s;++o,a+=i)if(n[a+3]!==0)return!1;return!0}function gm(...n){let e=n[0];e.canvas||(e={canvas:n[0],resolution:n[1]});const{canvas:t}=e,r=Math.min(e.resolution??1,1),s=e.width??t.width,i=e.height??t.height;let o=e.output;if(Wy(s,i),!Ut)throw new TypeError("Failed to get canvas 2D context");Ut.drawImage(t,0,0,s,i,0,0,s*r,i*r);const u=Ut.getImageData(0,0,s,i).data;let l=0,c=0,h=s-1,d=i-1;for(;c<i&&pm(u,s,c);)++c;if(c===i)return ne.EMPTY;for(;pm(u,s,d);)--d;for(;mm(u,s,l,c,d);)++l;for(;mm(u,s,h,c,d);)--h;return++h,++d,Ut.globalCompositeOperation="source-over",Ut.strokeRect(l,c,h-l,d-c),Ut.globalCompositeOperation="copy",o??(o=new ne),o.set(l/r,c/r,(h-l)/r,(d-c)/r),o}const _m=new ne;class Xy{getCanvasAndContext(e){const{text:t,style:r,resolution:s=1}=e,i=r._getFinalPadding(),o=Ge.measureText(t||" ",r),a=Math.ceil(Math.ceil(Math.max(1,o.width)+i*2)*s),u=Math.ceil(Math.ceil(Math.max(1,o.height)+i*2)*s),l=At.getOptimalCanvasAndContext(a,u);this._renderTextToCanvas(t,r,i,s,l);const c=r.trim?gm({canvas:l.canvas,width:a,height:u,resolution:1,output:_m}):_m.set(0,0,a,u);return{canvasAndContext:l,frame:c}}returnCanvasAndContext(e){At.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,r,s,i){var v,C,D,B;const{canvas:o,context:a}=i,u=Tn(t),l=Ge.measureText(e||" ",t),c=l.lines,h=l.lineHeight,d=l.lineWidths,f=l.maxLineWidth,g=l.fontProperties,x=o.height;if(a.resetTransform(),a.scale(s,s),a.textBaseline=t.textBaseline,(v=t._stroke)!=null&&v.width){const w=t._stroke;a.lineWidth=w.width,a.miterLimit=w.miterLimit,a.lineJoin=w.join,a.lineCap=w.cap}a.font=u;let p,b;const y=t.dropShadow?2:1;for(let w=0;w<y;++w){const O=t.dropShadow&&w===0,A=O?Math.ceil(Math.max(1,x)+r*2):0,E=A*s;if(O){a.fillStyle="black",a.strokeStyle="black";const I=t.dropShadow,z=I.color,Y=I.alpha;a.shadowColor=ee.shared.setValue(z).setAlpha(Y).toRgbaString();const U=I.blur*s,M=I.distance*s;a.shadowBlur=U,a.shadowOffsetX=Math.cos(I.angle)*M,a.shadowOffsetY=Math.sin(I.angle)*M+E}else{if(a.fillStyle=t._fill?Mn(t._fill,a,l,r*2):null,(C=t._stroke)!=null&&C.width){const I=t._stroke.width*.5+r*2;a.strokeStyle=Mn(t._stroke,a,l,I)}a.shadowColor="black"}let R=(h-g.fontSize)/2;h-g.fontSize<0&&(R=0);const F=((D=t._stroke)==null?void 0:D.width)??0;for(let I=0;I<c.length;I++)p=F/2,b=F/2+I*h+g.ascent+R,t.align==="right"?p+=f-d[I]:t.align==="center"&&(p+=(f-d[I])/2),(B=t._stroke)!=null&&B.width&&this._drawLetterSpacing(c[I],t,i,p+r,b+r-A,!0),t._fill!==void 0&&this._drawLetterSpacing(c[I],t,i,p+r,b+r-A)}}_drawLetterSpacing(e,t,r,s,i,o=!1){const{context:a}=r,u=t.letterSpacing;let l=!1;if(Ge.experimentalLetterSpacingSupported&&(Ge.experimentalLetterSpacing?(a.letterSpacing=`${u}px`,a.textLetterSpacing=`${u}px`,l=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),u===0||l){o?a.strokeText(e,s,i):a.fillText(e,s,i);return}let c=s;const h=Ge.graphemeSegmenter(e);let d=a.measureText(e).width,f=0;for(let g=0;g<h.length;++g){const x=h[g];o?a.strokeText(x,c,i):a.fillText(x,c,i);let p="";for(let b=g+1;b<h.length;++b)p+=h[b];f=a.measureText(p).width,c+=d-f+u,d=f}}}const $r=new Xy;class ii extends ni{constructor(...e){const t=si(e,"Text");super(t,it),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof tt?t.textureStyle:new tt(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let r=0,s=0;if(this._style.trim){const{frame:i,canvasAndContext:o}=$r.getCanvasAndContext({text:this.text,style:this._style,resolution:1});$r.returnCanvasAndContext(o),r=i.width,s=i.height}else{const i=Ge.measureText(this._text,this._style);r=i.width,s=i.height}e.minX=-t._x*r,e.maxX=e.minX+r,e.minY=-t._y*s,e.maxY=e.minY+s}}class xm extends lm{resolveQueueItem(e,t){return e instanceof ce?this.resolveContainerQueueItem(e,t):e instanceof fe||e instanceof k?t.push(e.source):e instanceof ze&&t.push(e),null}resolveContainerQueueItem(e,t){e instanceof dt||e instanceof fm||e instanceof Xr?t.push(e.texture.source):e instanceof ii?t.push(e):e instanceof Wr?t.push(e.context):e instanceof Wn&&e.textures.forEach(r=>{r.source?t.push(r.source):t.push(r.texture.source)})}resolveGraphicsContextQueueItem(e){this.renderer.graphicsContext.getGpuContext(e);const{instructions:t}=e;for(const r of t)if(r.action==="texture"){const{image:s}=r.data;return s.source}else if(r.action==="fill"){const{texture:s}=r.data.style;return s.source}return null}}class qa extends ni{constructor(...e){var t;const r=si(e,"BitmapText");r.style??(r.style=r.style||{}),(t=r.style).fill??(t.fill=16777215),super(r,it),this.renderPipeId="bitmapText"}_onTouch(e){var t;this._gcLastUsed=e;for(const r in this._gpuData)(t=this._gpuData[r])==null||t._onTouch(e)}updateBounds(){const e=this._bounds,t=this._anchor,r=Lr.measureText(this.text,this._style),s=r.scale,i=r.offsetY*s;let o=r.width*s,a=r.height*s;const u=this._style._stroke;u&&(o+=u.width,a+=u.width),e.minX=-t._x*o,e.maxX=e.minX+o,e.minY=-t._y*(a+i),e.maxY=e.minY+a}set resolution(e){e!==null&&X("[BitmapText] dynamically updating the resolution is not supported. Resolution should be managed by the BitmapFont.")}get resolution(){return this._resolution}}function bm(n){const e=n._stroke,t=n._fill,s=[`div { ${[`color: ${ee.shared.setValue(t.color).toHex()}`,`font-size: ${n.fontSize}px`,`font-family: ${n.fontFamily}`,`font-weight: ${n.fontWeight}`,`font-style: ${n.fontStyle}`,`font-variant: ${n.fontVariant}`,`letter-spacing: ${n.letterSpacing}px`,`text-align: ${n.align}`,`padding: ${n.padding}px`,`white-space: ${n.whiteSpace==="pre"&&n.wordWrap?"pre-wrap":n.whiteSpace}`,...n.lineHeight?[`line-height: ${n.lineHeight}px`]:[],...n.wordWrap?[`word-wrap: ${n.breakWords?"break-all":"break-word"}`,`max-width: ${n.wordWrapWidth}px`]:[],...e?[vm(e)]:[],...n.dropShadow?[ym(n.dropShadow)]:[],...n.cssOverrides].join(";")} }`];return $y(n.tagStyles,s),s.join(" ")}function ym(n){const e=ee.shared.setValue(n.color).setAlpha(n.alpha).toHexa(),t=Math.round(Math.cos(n.angle)*n.distance),r=Math.round(Math.sin(n.angle)*n.distance),s=`${t}px ${r}px`;return n.blur>0?`text-shadow: ${s} ${n.blur}px ${e}`:`text-shadow: ${s} ${e}`}function vm(n){return[`-webkit-text-stroke-width: ${n.width}px`,`-webkit-text-stroke-color: ${ee.shared.setValue(n.color).toHex()}`,`text-stroke-width: ${n.width}px`,`text-stroke-color: ${ee.shared.setValue(n.color).toHex()}`,"paint-order: stroke"].join(";")}const Sm={fontSize:"font-size: {{VALUE}}px",fontFamily:"font-family: {{VALUE}}",fontWeight:"font-weight: {{VALUE}}",fontStyle:"font-style: {{VALUE}}",fontVariant:"font-variant: {{VALUE}}",letterSpacing:"letter-spacing: {{VALUE}}px",align:"text-align: {{VALUE}}",padding:"padding: {{VALUE}}px",whiteSpace:"white-space: {{VALUE}}",lineHeight:"line-height: {{VALUE}}px",wordWrapWidth:"max-width: {{VALUE}}px"},Tm={fill:n=>`color: ${ee.shared.setValue(n).toHex()}`,breakWords:n=>`word-wrap: ${n?"break-all":"break-word"}`,stroke:vm,dropShadow:ym};function $y(n,e){for(const t in n){const r=n[t],s=[];for(const i in r)Tm[i]?s.push(Tm[i](r[i])):Sm[i]&&s.push(Sm[i].replace("{{VALUE}}",r[i]));e.push(`${t} { ${s.join(";")} }`)}}class oi extends it{constructor(e={}){super(e),this._cssOverrides=[],this.cssOverrides=e.cssOverrides??[],this.tagStyles=e.tagStyles??{}}set cssOverrides(e){this._cssOverrides=e instanceof Array?e:[e],this.update()}get cssOverrides(){return this._cssOverrides}update(){this._cssStyle=null,super.update()}clone(){return new oi({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow?{...this.dropShadow}:null,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,cssOverrides:this.cssOverrides,tagStyles:{...this.tagStyles}})}get cssStyle(){return this._cssStyle||(this._cssStyle=bm(this)),this._cssStyle}addOverride(...e){const t=e.filter(r=>!this.cssOverrides.includes(r));t.length>0&&(this.cssOverrides.push(...t),this.update())}removeOverride(...e){const t=e.filter(r=>this.cssOverrides.includes(r));t.length>0&&(this.cssOverrides=this.cssOverrides.filter(r=>!t.includes(r)),this.update())}set fill(e){typeof e!="string"&&typeof e!="number"&&X("[HTMLTextStyle] only color fill is not supported by HTMLText"),super.fill=e}set stroke(e){e&&typeof e!="string"&&typeof e!="number"&&X("[HTMLTextStyle] only color stroke is not supported by HTMLText"),super.stroke=e}}const Cm="http://www.w3.org/2000/svg",Am="http://www.w3.org/1999/xhtml";class ja{constructor(){this.svgRoot=document.createElementNS(Cm,"svg"),this.foreignObject=document.createElementNS(Cm,"foreignObject"),this.domElement=document.createElementNS(Am,"div"),this.styleElement=document.createElementNS(Am,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:s}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(s),this.image=Q.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src="",this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}}let wm;function Ka(n,e,t,r){r||(r=wm||(wm=new ja));const{domElement:s,styleElement:i,svgRoot:o}=r;s.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${n}</div>`,s.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(i.textContent=t),document.body.appendChild(o);const a=s.getBoundingClientRect();o.remove();const u=e.padding*2;return{width:a.width-u,height:a.height-u}}class Em extends ni{constructor(...e){const t=si(e,"HtmlText");super(t,oi),this.renderPipeId="htmlText",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof tt?t.textureStyle:new tt(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor,r=Ka(this.text,this._style),{width:s,height:i}=r;e.minX=-t._x*s,e.maxX=e.minX+s,e.minY=-t._y*i,e.maxY=e.minY+i}get text(){return this._text}set text(e){const t=this._sanitiseText(e.toString());super.text=t}_sanitiseText(e){return this._removeInvalidHtmlTags(e.replace(/<br>/gi,"<br/>").replace(/<hr>/gi,"<hr/>").replace(/&nbsp;/gi,"&#160;"))}_removeInvalidHtmlTags(e){const t=/<[^>]*?(?=<|$)/g;return e.replace(t,"")}}class Pm extends xm{uploadQueueItem(e){e instanceof fe?this.uploadTextureSource(e):e instanceof ii?this.uploadText(e):e instanceof Em?this.uploadHTMLText(e):e instanceof qa?this.uploadBitmapText(e):e instanceof ze&&this.uploadGraphicsContext(e)}uploadTextureSource(e){this.renderer.texture.initSource(e)}uploadText(e){this.renderer.renderPipes.text.initGpuText(e)}uploadBitmapText(e){this.renderer.renderPipes.bitmapText.initGpuText(e)}uploadHTMLText(e){this.renderer.renderPipes.htmlText.initGpuText(e)}uploadGraphicsContext(e){this.renderer.graphicsContext.getGpuContext(e);const{instructions:t}=e;for(const r of t)if(r.action==="texture"){const{image:s}=r.data;this.uploadTextureSource(s.source)}else if(r.action==="fill"){const{texture:s}=r.data.style;this.uploadTextureSource(s.source)}return null}}class Bm extends Pm{destroy(){super.destroy(),clearTimeout(this.timeout),this.renderer=null,this.queue=null,this.resolves=null}}Bm.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"prepare"};class Za{constructor(){this._tempState=st.for2d(),this._didUploadHash={}}init(e){e.renderer.runners.contextChange.add(this)}contextChange(){this._didUploadHash={}}start(e,t,r){const s=e.renderer,i=this._didUploadHash[r.uid];s.shader.bind(r,i),i||(this._didUploadHash[r.uid]=!0),s.shader.updateUniformGroup(s.globalUniforms.uniformGroup),s.geometry.bind(t,r.glProgram)}execute(e,t){const r=e.renderer;this._tempState.blendMode=t.blendMode,r.state.set(this._tempState);const s=t.textures.textures;for(let i=0;i<t.textures.count;i++)r.texture.bind(s[i],i);r.geometry.draw(t.topology,t.size,t.start)}}Za.extension={type:[T.WebGLPipesAdaptor],name:"batch"};function Yy(n){const e=[];let t=0;for(let r=0;r<n;r++)e[t]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:t,visibility:GPUShaderStage.FRAGMENT},t++,e[t]={sampler:{type:"filtering"},binding:t,visibility:GPUShaderStage.FRAGMENT},t++;return e}function qy(n){const e={};let t=0;for(let r=0;r<n;r++)e[`textureSource${r+1}`]=t++,e[`textureSampler${r+1}`]=t++;return e}const ai=st.for2d();class Qa{start(e,t,r){const s=e.renderer,i=s.encoder,o=r.gpuProgram;this._shader=r,this._geometry=t,i.setGeometry(t,o),ai.blendMode="normal",s.pipeline.getPipeline(t,o,ai);const a=s.globalUniforms.bindGroup;i.resetBindGroup(1),i.setBindGroup(0,a,o)}execute(e,t){const r=this._shader.gpuProgram,s=e.renderer,i=s.encoder;if(!t.bindGroup){const u=t.textures;t.bindGroup=Bs(u.textures,u.count,s.limits.maxBatchableTextures)}ai.blendMode=t.blendMode;const o=s.bindGroup.getBindGroup(t.bindGroup,r,1),a=s.pipeline.getPipeline(this._geometry,r,ai,t.topology);t.bindGroup._touch(s.gc.now,s.tick),i.setPipeline(a),i.renderPassEncoder.setBindGroup(1,o),i.renderPassEncoder.drawIndexed(t.size,1,t.start)}}Qa.extension={type:[T.WebGPUPipesAdaptor],name:"batch"};const Ja=class Vx{constructor(e,t){var r,s;this.state=st.for2d(),this._batchersByInstructionSet=Object.create(null),this._activeBatches=Object.create(null),this.renderer=e,this._adaptor=t,(s=(r=this._adaptor).init)==null||s.call(r,this)}static getBatcher(e){return new this._availableBatchers[e]}buildStart(e){let t=this._batchersByInstructionSet[e.uid];t||(t=this._batchersByInstructionSet[e.uid]=Object.create(null),t.default||(t.default=new Gs({maxTextures:this.renderer.limits.maxBatchableTextures}))),this._activeBatches=t,this._activeBatch=this._activeBatches.default;for(const r in this._activeBatches)this._activeBatches[r].begin()}addToBatch(e,t){if(this._activeBatch.name!==e.batcherName){this._activeBatch.break(t);let r=this._activeBatches[e.batcherName];r||(r=this._activeBatches[e.batcherName]=Vx.getBatcher(e.batcherName),r.begin()),this._activeBatch=r}this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){this._activeBatch.break(e);const t=this._activeBatches;for(const r in t){const s=t[r],i=s.geometry;i.indexBuffer.setDataWithSize(s.indexBuffer,s.indexSize,!0),i.buffers[0].setDataWithSize(s.attributeBuffer.float32View,s.attributeSize,!1)}}upload(e){const t=this._batchersByInstructionSet[e.uid];for(const r in t){const s=t[r],i=s.geometry;s.dirty&&(s.dirty=!1,i.buffers[0].update(s.attributeSize*4))}}execute(e){if(e.action==="startBatch"){const t=e.batcher,r=t.geometry,s=t.shader;this._adaptor.start(this,r,s)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor=null;for(const e in this._activeBatches)this._activeBatches[e].destroy();this._activeBatches=null}};Ja.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"batch"},Ja._availableBatchers=Object.create(null);let eu=Ja;$.handleByMap(T.Batcher,eu._availableBatchers),$.add(Gs);function jy(n){const e=n.split(/([\n{}])/g).map(s=>s.trim()).filter(s=>s.length);let t="";return e.map(s=>{let i=t+s;return s==="{"?t+="    ":s==="}"&&(t=t.substr(0,t.length-4),i=t+s),i}).join(`
`)}const Yr={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},Rm={...Yr,vertex:{...Yr.vertex,header:Yr.vertex.header.replace("group(1)","group(2)")}},ui={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}},Dm={name:"texture-bit",vertex:{header:`

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `,main:`
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;


        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},Mm={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;


        `,main:`
            outColor = texture(uTexture, vUV);
        `}},Ky=new Be;class Zy extends on{constructor(){super(),this.filters=[new am({sprite:new dt(k.EMPTY),inverse:!1,resolution:"inherit",antialias:"inherit"})]}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}get inverse(){return this.filters[0].inverse}set inverse(e){this.filters[0].inverse=e}}class tu{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,r){const s=this._renderer;if(s.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskBegin",mask:e,inverse:t._maskOptions.inverse,canBundle:!1,maskedContainer:t}),e.inverse=t._maskOptions.inverse,e.renderMaskToTexture){const i=e.mask;i.includeInBuild=!0,i.collectRenderables(r,s,null),i.includeInBuild=!1}s.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,inverse:t._maskOptions.inverse,canBundle:!1})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"popMaskEnd",mask:e,inverse:t._maskOptions.inverse,canBundle:!1})}execute(e){const t=this._renderer,r=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const s=Te.get(Zy);if(s.inverse=e.inverse,r){e.mask.mask.measurable=!0;const i=an(e.mask.mask,!0,Ky);e.mask.mask.measurable=!1,i.ceil();const o=t.renderTarget.renderTarget.colorTexture.source,a=ue.getOptimalTexture(i.width,i.height,o._resolution,o.antialias);t.renderTarget.push(a,!0),t.globalUniforms.push({offset:i,worldColor:4294967295});const u=s.sprite;u.texture=a,u.worldTransform.tx=i.minX,u.worldTransform.ty=i.minY,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer,filterTexture:a})}else s.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const s=this._activeMaskStage[this._activeMaskStage.length-1];r&&(t.type===$e.WEBGL&&t.renderTarget.finishRenderPass(),t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({renderPipeId:"filter",action:"pushFilter",container:s.maskedContainer,filterEffect:s.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const s=this._activeMaskStage.pop();r&&ue.returnTexture(s.filterTexture),Te.return(s.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}tu.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"alphaMask"};class ru{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,r){this._renderer.renderPipes.batch.break(r);const i=this._colorStack;i[this._colorStackIndex]=i[this._colorStackIndex-1]&e.mask;const o=this._colorStack[this._colorStackIndex];o!==this._currentColor&&(this._currentColor=o,r.add({renderPipeId:"colorMask",colorMask:o,canBundle:!1})),this._colorStackIndex++}pop(e,t,r){this._renderer.renderPipes.batch.break(r);const i=this._colorStack;this._colorStackIndex--;const o=i[this._colorStackIndex-1];o!==this._currentColor&&(this._currentColor=o,r.add({renderPipeId:"colorMask",colorMask:o,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._renderer=null,this._colorStack=null}}ru.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"colorMask"};class Qy{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1}addBounds(e,t){hs(this.mask,e,t)}addLocalBounds(e,t){ds(this.mask,e,t)}containsPoint(e,t){const r=this.mask;return t(r,e)}reset(){this.mask!==null&&(this.mask.measurable=!0,this.mask=null)}destroy(){this.reset()}}class nu{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,r){var s;const i=e,o=this._renderer;o.renderPipes.batch.break(r),o.renderPipes.blendMode.setBlendMode(i.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"pushMaskBegin",mask:e,inverse:t._maskOptions.inverse,canBundle:!1});const a=i.mask;a.includeInBuild=!0,this._maskHash.has(i)||this._maskHash.set(i,{instructionsStart:0,instructionsLength:0});const u=this._maskHash.get(i);u.instructionsStart=r.instructionSize,a.collectRenderables(r,o,null),a.includeInBuild=!1,o.renderPipes.batch.break(r),r.add({renderPipeId:"stencilMask",action:"pushMaskEnd",mask:e,inverse:t._maskOptions.inverse,canBundle:!1});const l=r.instructionSize-u.instructionsStart-1;u.instructionsLength=l;const c=o.renderTarget.renderTarget.uid;(s=this._maskStackHash)[c]??(s[c]=0)}pop(e,t,r){const s=e,i=this._renderer;i.renderPipes.batch.break(r),i.renderPipes.blendMode.setBlendMode(s.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"popMaskBegin",inverse:t._maskOptions.inverse,canBundle:!1});const o=this._maskHash.get(e);for(let a=0;a<o.instructionsLength;a++)r.instructions[r.instructionSize++]=r.instructions[o.instructionsStart++];r.add({renderPipeId:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;const r=this._renderer,s=r.renderTarget.renderTarget.uid;let i=(t=this._maskStackHash)[s]??(t[s]=0);e.action==="pushMaskBegin"?(r.renderTarget.ensureDepthStencil(),r.stencil.setStencilMode(ve.RENDERING_MASK_ADD,i),i++,r.colorMask.setMask(0)):e.action==="pushMaskEnd"?(e.inverse?r.stencil.setStencilMode(ve.INVERSE_MASK_ACTIVE,i):r.stencil.setStencilMode(ve.MASK_ACTIVE,i),r.colorMask.setMask(15)):e.action==="popMaskBegin"?(r.colorMask.setMask(0),i!==0?r.stencil.setStencilMode(ve.RENDERING_MASK_REMOVE,i):(r.renderTarget.clear(null,Ye.STENCIL),r.stencil.setStencilMode(ve.DISABLED,i)),i--):e.action==="popMaskEnd"&&(e.inverse?r.stencil.setStencilMode(ve.INVERSE_MASK_ACTIVE,i):r.stencil.setStencilMode(ve.MASK_ACTIVE,i),r.colorMask.setMask(15)),this._maskStackHash[s]=i}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}nu.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"stencilMask"};var Xn=(n=>(n[n.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",n[n.ARRAY_BUFFER=34962]="ARRAY_BUFFER",n[n.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",n))(Xn||{});class Fm{constructor(e,t){this._lastBindBaseLocation=-1,this._lastBindCallId=-1,this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.type=t}destroy(){this.buffer=null,this.updateID=-1,this.byteLength=-1,this.type=-1,this._lastBindBaseLocation=-1,this._lastBindCallId=-1}}class su{constructor(e){this._boundBufferBases=Object.create(null),this._minBaseLocation=0,this._nextBindBaseIndex=this._minBaseLocation,this._bindCallId=0,this._renderer=e,this._managedBuffers=new je({renderer:e,type:"resource",onUnload:this.onBufferUnload.bind(this),name:"glBuffer"})}destroy(){this._managedBuffers.destroy(),this._renderer=null,this._gl=null,this._boundBufferBases={}}contextChange(){this._gl=this._renderer.gl,this.destroyAll(!0),this._maxBindings=this._renderer.limits.maxUniformBindings}getGlBuffer(e){return e._gcLastUsed=this._renderer.gc.now,e._gpuData[this._renderer.uid]||this.createGLBuffer(e)}bind(e){const{_gl:t}=this,r=this.getGlBuffer(e);t.bindBuffer(r.type,r.buffer)}bindBufferBase(e,t){const{_gl:r}=this;this._boundBufferBases[t]!==e&&(this._boundBufferBases[t]=e,e._lastBindBaseLocation=t,r.bindBufferBase(r.UNIFORM_BUFFER,t,e.buffer))}nextBindBase(e){this._bindCallId++,this._minBaseLocation=0,e&&(this._boundBufferBases[0]=null,this._minBaseLocation=1,this._nextBindBaseIndex<1&&(this._nextBindBaseIndex=1))}freeLocationForBufferBase(e){let t=this.getLastBindBaseLocation(e);if(t>=this._minBaseLocation)return e._lastBindCallId=this._bindCallId,t;let r=0,s=this._nextBindBaseIndex;for(;r<2;){s>=this._maxBindings&&(s=this._minBaseLocation,r++);const i=this._boundBufferBases[s];if(i&&i._lastBindCallId===this._bindCallId){s++;continue}break}return t=s,this._nextBindBaseIndex=s+1,r>=2?-1:(e._lastBindCallId=this._bindCallId,this._boundBufferBases[t]=null,t)}getLastBindBaseLocation(e){const t=e._lastBindBaseLocation;return this._boundBufferBases[t]===e?t:-1}bindBufferRange(e,t,r,s){const{_gl:i}=this;r||(r=0),t||(t=0),this._boundBufferBases[t]=null,i.bindBufferRange(i.UNIFORM_BUFFER,t||0,e.buffer,r*256,s||256)}updateBuffer(e){const{_gl:t}=this,r=this.getGlBuffer(e);if(e._updateID===r.updateID)return r;r.updateID=e._updateID,t.bindBuffer(r.type,r.buffer);const s=e.data,i=e.descriptor.usage&te.STATIC?t.STATIC_DRAW:t.DYNAMIC_DRAW;return s?r.byteLength>=s.byteLength?t.bufferSubData(r.type,0,s,0,e._updateSize/s.BYTES_PER_ELEMENT):(r.byteLength=s.byteLength,t.bufferData(r.type,s,i)):(r.byteLength=e.descriptor.size,t.bufferData(r.type,r.byteLength,i)),r}destroyAll(e=!1){this._managedBuffers.removeAll(e)}onBufferUnload(e,t=!1){const r=e._gpuData[this._renderer.uid];r&&(t||this._gl.deleteBuffer(r.buffer))}createGLBuffer(e){const{_gl:t}=this;let r=Xn.ARRAY_BUFFER;e.descriptor.usage&te.INDEX?r=Xn.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&te.UNIFORM&&(r=Xn.UNIFORM_BUFFER);const s=new Fm(t.createBuffer(),r);return e._gpuData[this._renderer.uid]=s,this._managedBuffers.add(e),s}resetState(){this._boundBufferBases=Object.create(null)}}su.extension={type:[T.WebGLSystem],name:"buffer"};const iu=class Wx{constructor(e){this.supports={uint32Indices:!0,uniformBufferObject:!0,vertexArrayObject:!0,srgbTextures:!0,nonPowOf2wrapping:!0,msaa:!0,nonPowOf2mipmaps:!0},this._renderer=e,this.extensions=Object.create(null),this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this._renderer.gl=e}init(e){e={...Wx.defaultOptions,...e};let t=this.multiView=e.multiView;if(e.context&&t&&(X("Renderer created with both a context and multiview enabled. Disabling multiView as both cannot work together."),t=!1),t?this.canvas=Q.get().createCanvas(this._renderer.canvas.width,this._renderer.canvas.height):this.canvas=this._renderer.view.canvas,e.context)this.initFromContext(e.context);else{const r=this._renderer.background.alpha<1,s=e.premultipliedAlpha??!0,i=e.antialias&&!this._renderer.backBuffer.useBackBuffer;this.createContext(e.preferWebGLVersion,{alpha:r,premultipliedAlpha:s,antialias:i,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference??"default"})}}ensureCanvasSize(e){if(!this.multiView){e!==this.canvas&&X("multiView is disabled, but targetCanvas is not the main canvas");return}const{canvas:t}=this;(t.width<e.width||t.height<e.height)&&(t.width=Math.max(e.width,e.width),t.height=Math.max(e.height,e.height))}initFromContext(e){this.gl=e,this.webGLVersion=e instanceof Q.get().getWebGLRenderingContext()?1:2,this.getExtensions(),this.validateContext(e),this._renderer.runners.contextChange.emit(e);const t=this._renderer.view.canvas;t.addEventListener("webglcontextlost",this.handleContextLost,!1),t.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}createContext(e,t){let r;const s=this.canvas;if(e===2&&(r=s.getContext("webgl2",t)),!r&&(r=s.getContext("webgl",t),!r))throw new Error("This browser does not support WebGL. Try using the canvas renderer");this.gl=r,this.initFromContext(this.gl)}getExtensions(){const{gl:e}=this,t={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc"),bptc:e.getExtension("EXT_texture_compression_bptc"),rgtc:e.getExtension("EXT_texture_compression_rgtc"),loseContext:e.getExtension("WEBGL_lose_context")};if(this.webGLVersion===1)this.extensions={...t,drawBuffers:e.getExtension("WEBGL_draw_buffers"),depthTexture:e.getExtension("WEBGL_depth_texture"),vertexArrayObject:e.getExtension("OES_vertex_array_object")||e.getExtension("MOZ_OES_vertex_array_object")||e.getExtension("WEBKIT_OES_vertex_array_object"),uint32ElementIndex:e.getExtension("OES_element_index_uint"),floatTexture:e.getExtension("OES_texture_float"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),textureHalfFloat:e.getExtension("OES_texture_half_float"),textureHalfFloatLinear:e.getExtension("OES_texture_half_float_linear"),vertexAttribDivisorANGLE:e.getExtension("ANGLE_instanced_arrays"),srgb:e.getExtension("EXT_sRGB")};else{this.extensions={...t,colorBufferFloat:e.getExtension("EXT_color_buffer_float")};const r=e.getExtension("WEBGL_provoking_vertex");r&&r.provokingVertexWEBGL(r.FIRST_VERTEX_CONVENTION_WEBGL)}}handleContextLost(e){e.preventDefault(),this._contextLossForced&&(this._contextLossForced=!1,setTimeout(()=>{var t;this.gl.isContextLost()&&((t=this.extensions.loseContext)==null||t.restoreContext())},0))}handleContextRestored(){this.getExtensions(),this._renderer.runners.contextChange.emit(this.gl)}destroy(){var t;const e=this._renderer.view.canvas;this._renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),(t=this.extensions.loseContext)==null||t.loseContext()}forceContextLoss(){var e;(e=this.extensions.loseContext)==null||e.loseContext(),this._contextLossForced=!0}validateContext(e){const t=e.getContextAttributes();t&&!t.stencil&&X("Provided WebGL context does not have a stencil buffer, masks may not render correctly");const r=this.supports,s=this.webGLVersion===2,i=this.extensions;r.uint32Indices=s||!!i.uint32ElementIndex,r.uniformBufferObject=s,r.vertexArrayObject=s||!!i.vertexArrayObject,r.srgbTextures=s||!!i.srgb,r.nonPowOf2wrapping=s,r.nonPowOf2mipmaps=s,r.msaa=s,r.uint32Indices||X("Provided WebGL context does not support 32 index buffer, large scenes may not render correctly")}};iu.extension={type:[T.WebGLSystem],name:"context"},iu.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:void 0,preferWebGLVersion:2,multiView:!1};let Um=iu;function ou(n,e){for(const t in n.attributes){const r=n.attributes[t],s=e[t];s?(r.format??(r.format=s.format),r.offset??(r.offset=s.offset),r.instance??(r.instance=s.instance)):X(`Attribute ${t} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}Jy(n)}function Jy(n){const{buffers:e,attributes:t}=n,r={},s={};for(const i in e){const o=e[i];r[o.uid]=0,s[o.uid]=0}for(const i in t){const o=t[i];r[o.buffer.uid]+=Mt(o.format).stride}for(const i in t){const o=t[i];o.stride??(o.stride=r[o.buffer.uid]),o.start??(o.start=s[o.buffer.uid]),s[o.buffer.uid]+=Mt(o.format).stride}}var li=(n=>(n[n.RGBA=6408]="RGBA",n[n.RGB=6407]="RGB",n[n.RG=33319]="RG",n[n.RED=6403]="RED",n[n.RGBA_INTEGER=36249]="RGBA_INTEGER",n[n.RGB_INTEGER=36248]="RGB_INTEGER",n[n.RG_INTEGER=33320]="RG_INTEGER",n[n.RED_INTEGER=36244]="RED_INTEGER",n[n.ALPHA=6406]="ALPHA",n[n.LUMINANCE=6409]="LUMINANCE",n[n.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",n[n.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",n[n.DEPTH_STENCIL=34041]="DEPTH_STENCIL",n))(li||{}),au=(n=>(n[n.TEXTURE_2D=3553]="TEXTURE_2D",n[n.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",n[n.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",n[n.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",n[n.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",n[n.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",n[n.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",n[n.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",n[n.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",n))(au||{}),Im=(n=>(n[n.CLAMP=33071]="CLAMP",n[n.REPEAT=10497]="REPEAT",n[n.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",n))(Im||{}),re=(n=>(n[n.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",n[n.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",n[n.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",n[n.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",n[n.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",n[n.UNSIGNED_INT=5125]="UNSIGNED_INT",n[n.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",n[n.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",n[n.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",n[n.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",n[n.BYTE=5120]="BYTE",n[n.SHORT=5122]="SHORT",n[n.INT=5124]="INT",n[n.FLOAT=5126]="FLOAT",n[n.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",n[n.HALF_FLOAT=36193]="HALF_FLOAT",n))(re||{});const Om={uint8x2:re.UNSIGNED_BYTE,uint8x4:re.UNSIGNED_BYTE,sint8x2:re.BYTE,sint8x4:re.BYTE,unorm8x2:re.UNSIGNED_BYTE,unorm8x4:re.UNSIGNED_BYTE,snorm8x2:re.BYTE,snorm8x4:re.BYTE,uint16x2:re.UNSIGNED_SHORT,uint16x4:re.UNSIGNED_SHORT,sint16x2:re.SHORT,sint16x4:re.SHORT,unorm16x2:re.UNSIGNED_SHORT,unorm16x4:re.UNSIGNED_SHORT,snorm16x2:re.SHORT,snorm16x4:re.SHORT,float16x2:re.HALF_FLOAT,float16x4:re.HALF_FLOAT,float32:re.FLOAT,float32x2:re.FLOAT,float32x3:re.FLOAT,float32x4:re.FLOAT,uint32:re.UNSIGNED_INT,uint32x2:re.UNSIGNED_INT,uint32x3:re.UNSIGNED_INT,uint32x4:re.UNSIGNED_INT,sint32:re.INT,sint32x2:re.INT,sint32x3:re.INT,sint32x4:re.INT};function Gm(n){return Om[n]??Om.float32}const ev={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class km{constructor(){this.vaoCache=Object.create(null)}destroy(){this.vaoCache=Object.create(null)}}class uu{constructor(e){this._renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this._managedGeometries=new je({renderer:e,type:"resource",onUnload:this.onGeometryUnload.bind(this),name:"glGeometry"})}contextChange(){const e=this.gl=this._renderer.gl;if(!this._renderer.context.supports.vertexArrayObject)throw new Error("[PixiJS] Vertex Array Objects are not supported on this device");this.destroyAll(!0);const t=this._renderer.context.extensions.vertexArrayObject;t&&(e.createVertexArray=()=>t.createVertexArrayOES(),e.bindVertexArray=s=>t.bindVertexArrayOES(s),e.deleteVertexArray=s=>t.deleteVertexArrayOES(s));const r=this._renderer.context.extensions.vertexAttribDivisorANGLE;r&&(e.drawArraysInstanced=(s,i,o,a)=>{r.drawArraysInstancedANGLE(s,i,o,a)},e.drawElementsInstanced=(s,i,o,a,u)=>{r.drawElementsInstancedANGLE(s,i,o,a,u)},e.vertexAttribDivisor=(s,i)=>r.vertexAttribDivisorANGLE(s,i)),this._activeGeometry=null,this._activeVao=null}bind(e,t){const r=this.gl;this._activeGeometry=e;const s=this.getVao(e,t);this._activeVao!==s&&(this._activeVao=s,r.bindVertexArray(s)),this.updateBuffers()}resetState(){this.unbind()}updateBuffers(){const e=this._activeGeometry,t=this._renderer.buffer;for(let r=0;r<e.buffers.length;r++){const s=e.buffers[r];t.updateBuffer(s)}e._gcLastUsed=this._renderer.gc.now}checkCompatibility(e,t){const r=e.attributes,s=t._attributeData;for(const i in s)if(!r[i])throw new Error(`shader and geometry incompatible, geometry missing the "${i}" attribute`)}getSignature(e,t){const r=e.attributes,s=t._attributeData,i=["g",e.uid];for(const o in r)s[o]&&i.push(o,s[o].location);return i.join("-")}getVao(e,t){var r;return((r=e._gpuData[this._renderer.uid])==null?void 0:r.vaoCache[t._key])||this.initGeometryVao(e,t)}initGeometryVao(e,t,r=!0){const s=this._renderer.gl,i=this._renderer.buffer;this._renderer.shader._getProgramData(t),this.checkCompatibility(e,t);const o=this.getSignature(e,t),a=new km;e._gpuData[this._renderer.uid]=a,this._managedGeometries.add(e);const u=a.vaoCache;let l=u[o];if(l)return u[t._key]=l,l;ou(e,t._attributeData);const c=e.buffers;l=s.createVertexArray(),s.bindVertexArray(l);for(let h=0;h<c.length;h++){const d=c[h];i.bind(d)}return this.activateVao(e,t),u[t._key]=l,u[o]=l,s.bindVertexArray(null),l}onGeometryUnload(e,t=!1){const r=e._gpuData[this._renderer.uid];if(!r)return;const s=r.vaoCache;if(!t)for(const i in s)this._activeVao!==s[i]&&this.resetState(),this.gl.deleteVertexArray(s[i])}destroyAll(e=!1){this._managedGeometries.removeAll(e)}activateVao(e,t){var a;const r=this._renderer.gl,s=this._renderer.buffer,i=e.attributes;e.indexBuffer&&s.bind(e.indexBuffer);let o=null;for(const u in i){const l=i[u],c=l.buffer,h=s.getGlBuffer(c),d=t._attributeData[u];if(d){o!==h&&(s.bind(c),o=h);const f=d.location;r.enableVertexAttribArray(f);const g=Mt(l.format),x=Gm(l.format);if(((a=d.format)==null?void 0:a.substring(1,4))==="int"?r.vertexAttribIPointer(f,g.size,x,l.stride,l.offset):r.vertexAttribPointer(f,g.size,x,g.normalised,l.stride,l.offset),l.instance)if(this.hasInstance){const p=l.divisor??1;r.vertexAttribDivisor(f,p)}else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,t,r,s){const{gl:i}=this._renderer,o=this._activeGeometry,a=ev[e||o.topology];if(s??(s=o.instanceCount),o.indexBuffer){const u=o.indexBuffer.data.BYTES_PER_ELEMENT,l=u===2?i.UNSIGNED_SHORT:i.UNSIGNED_INT;s!==1?i.drawElementsInstanced(a,t||o.indexBuffer.data.length,l,(r||0)*u,s):i.drawElements(a,t||o.indexBuffer.data.length,l,(r||0)*u)}else s!==1?i.drawArraysInstanced(a,r||0,t||o.getSize(),s):i.drawArrays(a,r||0,t||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this._managedGeometries.destroy(),this._renderer=null,this.gl=null,this._activeVao=null,this._activeGeometry=null}}uu.extension={type:[T.WebGLSystem],name:"geometry"};const tv=new or({attributes:{aPosition:[-1,-1,3,-1,-1,3]}}),lu=class Xx{constructor(e){this.useBackBuffer=!1,this._useBackBufferThisRender=!1,this._renderer=e}init(e={}){const{useBackBuffer:t,antialias:r}={...Xx.defaultOptions,...e};this.useBackBuffer=t,this._antialias=r,this._renderer.context.supports.msaa||(X("antialiasing, is not supported on when using the back buffer"),this._antialias=!1),this._state=st.for2d();const s=new be({vertex:`
                attribute vec2 aPosition;
                out vec2 vUv;

                void main() {
                    gl_Position = vec4(aPosition, 0.0, 1.0);

                    vUv = (aPosition + 1.0) / 2.0;

                    // flip dem UVs
                    vUv.y = 1.0 - vUv.y;
                }`,fragment:`
                in vec2 vUv;
                out vec4 finalColor;

                uniform sampler2D uTexture;

                void main() {
                    finalColor = texture(uTexture, vUv);
                }`,name:"big-triangle"});this._bigTriangleShader=new nt({glProgram:s,resources:{uTexture:k.WHITE.source}})}renderStart(e){const t=this._renderer.renderTarget.getRenderTarget(e.target);if(this._useBackBufferThisRender=this.useBackBuffer&&!!t.isRoot,this._useBackBufferThisRender){const r=this._renderer.renderTarget.getRenderTarget(e.target);this._targetTexture=r.colorTexture,e.target=this._getBackBufferTexture(r.colorTexture)}}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){const e=this._renderer;e.renderTarget.finishRenderPass(),this._useBackBufferThisRender&&(e.renderTarget.bind(this._targetTexture,!1),this._bigTriangleShader.resources.uTexture=this._backBufferTexture.source,e.encoder.draw({geometry:tv,shader:this._bigTriangleShader,state:this._state}))}_getBackBufferTexture(e){return this._backBufferTexture=this._backBufferTexture||new k({source:new fe({width:e.width,height:e.height,resolution:e._resolution,antialias:this._antialias})}),this._backBufferTexture.source.resize(e.width,e.height,e._resolution),this._backBufferTexture}destroy(){this._backBufferTexture&&(this._backBufferTexture.destroy(),this._backBufferTexture=null)}};lu.extension={type:[T.WebGLSystem],name:"backBuffer",priority:1},lu.defaultOptions={useBackBuffer:!1};let Lm=lu;class cu{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}}cu.extension={type:[T.WebGLSystem],name:"colorMask"};class hu{constructor(e){this.commandFinished=Promise.resolve(),this._renderer=e}setGeometry(e,t){this._renderer.geometry.bind(e,t.glProgram)}finishRenderPass(){}draw(e){const t=this._renderer,{geometry:r,shader:s,state:i,skipSync:o,topology:a,size:u,start:l,instanceCount:c}=e;t.shader.bind(s,o),t.geometry.bind(r,t.shader._activeProgram),i&&t.state.set(i),t.geometry.draw(a,u,l,c??r.instanceCount)}destroy(){this._renderer=null}}hu.extension={type:[T.WebGLSystem],name:"encoder"};class du{constructor(e){this._renderer=e}contextChange(){const e=this._renderer.gl;this.maxTextures=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.maxBatchableTextures=Lo(this.maxTextures,e);const t=this._renderer.context.webGLVersion===2;this.maxUniformBindings=t?e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS):0}destroy(){}}du.extension={type:[T.WebGLSystem],name:"limits"};class Nm{constructor(){this.width=-1,this.height=-1,this.msaa=!1,this.msaaRenderBuffer=[]}}const It=[];It[ve.NONE]=void 0,It[ve.DISABLED]={stencilWriteMask:0,stencilReadMask:0},It[ve.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}},It[ve.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}},It[ve.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}},It[ve.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"not-equal",passOp:"keep"},stencilBack:{compare:"not-equal",passOp:"keep"}};class fu{constructor(e){this._stencilCache={enabled:!1,stencilReference:0,stencilMode:ve.NONE},this._renderTargetStencilState=Object.create(null),e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this._gl=e,this._comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this._stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP},this.resetState()}onRenderTargetChange(e){if(this._activeRenderTarget===e)return;this._activeRenderTarget=e;let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:ve.DISABLED,stencilReference:0}),this.setStencilMode(t.stencilMode,t.stencilReference)}resetState(){this._stencilCache.enabled=!1,this._stencilCache.stencilMode=ve.NONE,this._stencilCache.stencilReference=0}setStencilMode(e,t){const r=this._renderTargetStencilState[this._activeRenderTarget.uid],s=this._gl,i=It[e],o=this._stencilCache;if(r.stencilMode=e,r.stencilReference=t,e===ve.DISABLED){this._stencilCache.enabled&&(this._stencilCache.enabled=!1,s.disable(s.STENCIL_TEST));return}this._stencilCache.enabled||(this._stencilCache.enabled=!0,s.enable(s.STENCIL_TEST)),(e!==o.stencilMode||o.stencilReference!==t)&&(o.stencilMode=e,o.stencilReference=t,s.stencilFunc(this._comparisonFuncMapping[i.stencilBack.compare],t,255),s.stencilOp(s.KEEP,s.KEEP,this._stencilOpsMapping[i.stencilBack.passOp]))}}fu.extension={type:[T.WebGLSystem],name:"stencil"};class pu{constructor(e){this._syncFunctionHash=Object.create(null),this._adaptor=e,this._systemCheck()}_systemCheck(){if(!Eo())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(e){const t=this.getUniformGroupData(e);e.buffer||(e.buffer=new qe({data:new Float32Array(t.layout.size/4),usage:te.UNIFORM|te.COPY_DST}))}getUniformGroupData(e){return this._syncFunctionHash[e._signature]||this._initUniformGroup(e)}_initUniformGroup(e){const t=e._signature;let r=this._syncFunctionHash[t];if(!r){const s=Object.keys(e.uniformStructures).map(a=>e.uniformStructures[a]),i=this._adaptor.createUboElements(s),o=this._generateUboSync(i.uboElements);r=this._syncFunctionHash[t]={layout:i,syncFunction:o}}return this._syncFunctionHash[t]}_generateUboSync(e){return this._adaptor.generateUboSync(e)}syncUniformGroup(e,t,r){const s=this.getUniformGroupData(e);e.buffer||(e.buffer=new qe({data:new Float32Array(s.layout.size/4),usage:te.UNIFORM|te.COPY_DST}));let i=null;return t||(t=e.buffer.data,i=e.buffer.dataInt32),r||(r=0),s.syncFunction(e.uniforms,t,i,r),!0}updateUniformGroup(e){if(e.isStatic&&!e._dirtyId)return!1;e._dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}}const mu={f32:4,i32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"vec2<i32>":8,"vec3<i32>":12,"vec4<i32>":16,"mat2x2<f32>":32,"mat3x3<f32>":48,"mat4x4<f32>":64};function zm(n){const e=n.map(i=>({data:i,offset:0,size:0})),t=16;let r=0,s=0;for(let i=0;i<e.length;i++){const o=e[i];if(r=mu[o.data.type],!r)throw new Error(`Unknown type ${o.data.type}`);o.data.size>1&&(r=Math.max(r,t)*o.data.size);const a=r===12?16:r;o.size=r;const u=s%t;u>0&&t-u<a?s+=(t-u)%16:s+=(r-u%r)%r,o.offset=s,s+=r}return s=Math.ceil(s/16)*16,{uboElements:e,size:s}}const Xt=[{type:"mat3x3<f32>",test:n=>n.value.a!==void 0,ubo:`
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,uniform:`
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `},{type:"vec4<f32>",test:n=>n.type==="vec4<f32>"&&n.size===1&&n.value.width!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `},{type:"vec2<f32>",test:n=>n.type==="vec2<f32>"&&n.size===1&&n.value.x!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `},{type:"vec4<f32>",test:n=>n.type==="vec4<f32>"&&n.size===1&&n.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `},{type:"vec3<f32>",test:n=>n.type==="vec3<f32>"&&n.size===1&&n.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `}];function gu(n,e,t,r){const s=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `];let i=0;for(let a=0;a<n.length;a++){const u=n[a],l=u.data.name;let c=!1,h=0;for(let d=0;d<Xt.length;d++)if(Xt[d].test(u.data)){h=u.offset/4,s.push(`name = "${l}";`,`offset += ${h-i};`,Xt[d][e]||Xt[d].ubo),c=!0;break}if(!c)if(u.data.size>1)h=u.offset/4,s.push(t(u,h-i));else{const d=r[u.data.type];h=u.offset/4,s.push(`
                    v = uv.${l};
                    offset += ${h-i};
                    ${d};
                `)}i=h}const o=s.join(`
`);return new Function("uv","data","dataInt32","offset",o)}function qr(n,e){return`
        for (let i = 0; i < ${n*e}; i++) {
            data[offset + (((i / ${n})|0) * 4) + (i % ${n})] = v[i];
        }
    `}const _u={f32:`
        data[offset] = v;`,i32:`
        dataInt32[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"vec2<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,"vec3<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,"vec4<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];
        dataInt32[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":qr(3,2),"mat4x2<f32>":qr(4,2),"mat2x3<f32>":qr(2,3),"mat4x3<f32>":qr(4,3),"mat2x4<f32>":qr(2,4),"mat3x4<f32>":qr(3,4)},Hm={..._u,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};function Vm(n,e){const t=Math.max(mu[n.data.type]/16,1),r=n.data.value.length/n.data.size,s=(4-r%4)%4,i=n.data.type.indexOf("i32")>=0?"dataInt32":"data";return`
        v = uv.${n.data.name};
        offset += ${e};

        arrayOffset = offset;

        t = 0;

        for(var i=0; i < ${n.data.size*t}; i++)
        {
            for(var j = 0; j < ${r}; j++)
            {
                ${i}[arrayOffset++] = v[t++];
            }
            ${s!==0?`arrayOffset += ${s};`:""}
        }
    `}function Wm(n){return gu(n,"uboStd40",Vm,_u)}class xu extends pu{constructor(){super({createUboElements:zm,generateUboSync:Wm})}}xu.extension={type:[T.WebGLSystem],name:"ubo"};class Xm{constructor(){this._clearColorCache=[0,0,0,0],this._viewPortCache=new ne}init(e,t){this._renderer=e,this._renderTargetSystem=t,e.runners.contextChange.add(this)}contextChange(){this._clearColorCache=[0,0,0,0],this._viewPortCache=new ne;const e=this._renderer.gl;this._drawBuffersCache=[];for(let t=1;t<=16;t++)this._drawBuffersCache[t]=Array.from({length:t},(r,s)=>e.COLOR_ATTACHMENT0+s)}copyToTexture(e,t,r,s,i){const o=this._renderTargetSystem,a=this._renderer,u=o.getGpuRenderTarget(e),l=a.gl;return this.finishRenderPass(e),l.bindFramebuffer(l.FRAMEBUFFER,u.resolveTargetFramebuffer),a.texture.bind(t,0),l.copyTexSubImage2D(l.TEXTURE_2D,0,i.x,i.y,r.x,r.y,s.width,s.height),t}startRenderPass(e,t=!0,r,s){const i=this._renderTargetSystem,o=e.colorTexture,a=i.getGpuRenderTarget(e);let u=s.y;e.isRoot&&(u=o.pixelHeight-s.height-s.y),e.colorTextures.forEach(h=>{this._renderer.texture.unbind(h)});const l=this._renderer.gl;l.bindFramebuffer(l.FRAMEBUFFER,a.framebuffer),e.colorTextures.length>1&&this._setDrawBuffers(e,l);const c=this._viewPortCache;(c.x!==s.x||c.y!==u||c.width!==s.width||c.height!==s.height)&&(c.x=s.x,c.y=u,c.width=s.width,c.height=s.height,l.viewport(s.x,u,s.width,s.height)),!a.depthStencilRenderBuffer&&(e.stencil||e.depth)&&this._initStencil(a),this.clear(e,t,r)}finishRenderPass(e){const r=this._renderTargetSystem.getGpuRenderTarget(e);if(!r.msaa)return;const s=this._renderer.gl;s.bindFramebuffer(s.FRAMEBUFFER,r.resolveTargetFramebuffer),s.bindFramebuffer(s.READ_FRAMEBUFFER,r.framebuffer),s.blitFramebuffer(0,0,r.width,r.height,0,0,r.width,r.height,s.COLOR_BUFFER_BIT,s.NEAREST),s.bindFramebuffer(s.FRAMEBUFFER,r.framebuffer)}initGpuRenderTarget(e){const r=this._renderer.gl,s=new Nm;return e.colorTexture instanceof vt?(this._renderer.context.ensureCanvasSize(e.colorTexture.resource),s.framebuffer=null,s):(this._initColor(e,s),r.bindFramebuffer(r.FRAMEBUFFER,null),s)}destroyGpuRenderTarget(e){const t=this._renderer.gl;e.framebuffer&&(t.deleteFramebuffer(e.framebuffer),e.framebuffer=null),e.resolveTargetFramebuffer&&(t.deleteFramebuffer(e.resolveTargetFramebuffer),e.resolveTargetFramebuffer=null),e.depthStencilRenderBuffer&&(t.deleteRenderbuffer(e.depthStencilRenderBuffer),e.depthStencilRenderBuffer=null),e.msaaRenderBuffer.forEach(r=>{t.deleteRenderbuffer(r)}),e.msaaRenderBuffer=null}clear(e,t,r){if(!t)return;const s=this._renderTargetSystem;typeof t=="boolean"&&(t=t?Ye.ALL:Ye.NONE);const i=this._renderer.gl;if(t&Ye.COLOR){r??(r=s.defaultClearColor);const o=this._clearColorCache,a=r;(o[0]!==a[0]||o[1]!==a[1]||o[2]!==a[2]||o[3]!==a[3])&&(o[0]=a[0],o[1]=a[1],o[2]=a[2],o[3]=a[3],i.clearColor(a[0],a[1],a[2],a[3]))}i.clear(t)}resizeGpuRenderTarget(e){if(e.isRoot)return;const r=this._renderTargetSystem.getGpuRenderTarget(e);this._resizeColor(e,r),(e.stencil||e.depth)&&this._resizeStencil(r)}_initColor(e,t){const r=this._renderer,s=r.gl,i=s.createFramebuffer();if(t.resolveTargetFramebuffer=i,s.bindFramebuffer(s.FRAMEBUFFER,i),t.width=e.colorTexture.source.pixelWidth,t.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((a,u)=>{const l=a.source;l.antialias&&(r.context.supports.msaa?t.msaa=!0:X("[RenderTexture] Antialiasing on textures is not supported in WebGL1")),r.texture.bindSource(l,0);const h=r.texture.getGlSource(l).texture;s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+u,3553,h,0)}),t.msaa){const a=s.createFramebuffer();t.framebuffer=a,s.bindFramebuffer(s.FRAMEBUFFER,a),e.colorTextures.forEach((u,l)=>{const c=s.createRenderbuffer();t.msaaRenderBuffer[l]=c})}else t.framebuffer=i;this._resizeColor(e,t)}_resizeColor(e,t){const r=e.colorTexture.source;if(t.width=r.pixelWidth,t.height=r.pixelHeight,e.colorTextures.forEach((s,i)=>{i!==0&&s.source.resize(r.width,r.height,r._resolution)}),t.msaa){const s=this._renderer,i=s.gl,o=t.framebuffer;i.bindFramebuffer(i.FRAMEBUFFER,o),e.colorTextures.forEach((a,u)=>{const l=a.source;s.texture.bindSource(l,0);const h=s.texture.getGlSource(l).internalFormat,d=t.msaaRenderBuffer[u];i.bindRenderbuffer(i.RENDERBUFFER,d),i.renderbufferStorageMultisample(i.RENDERBUFFER,4,h,l.pixelWidth,l.pixelHeight),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+u,i.RENDERBUFFER,d)})}}_initStencil(e){if(e.framebuffer===null)return;const t=this._renderer.gl,r=t.createRenderbuffer();e.depthStencilRenderBuffer=r,t.bindRenderbuffer(t.RENDERBUFFER,r),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,r),this._resizeStencil(e)}_resizeStencil(e){const t=this._renderer.gl;t.bindRenderbuffer(t.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?t.renderbufferStorageMultisample(t.RENDERBUFFER,4,t.DEPTH24_STENCIL8,e.width,e.height):t.renderbufferStorage(t.RENDERBUFFER,this._renderer.context.webGLVersion===2?t.DEPTH24_STENCIL8:t.DEPTH_STENCIL,e.width,e.height)}prerender(e){const t=e.colorTexture.resource;this._renderer.context.multiView&&vt.test(t)&&this._renderer.context.ensureCanvasSize(t)}postrender(e){if(this._renderer.context.multiView&&vt.test(e.colorTexture.resource)){const t=this._renderer.context.canvas,r=e.colorTexture;r.context2D.drawImage(t,0,r.pixelHeight-t.height)}}_setDrawBuffers(e,t){const r=e.colorTextures.length,s=this._drawBuffersCache[r];if(this._renderer.context.webGLVersion===1){const i=this._renderer.context.extensions.drawBuffers;i?i.drawBuffersWEBGL(s):X("[RenderTexture] This WebGL1 context does not support rendering to multiple targets")}else t.drawBuffers(s)}}function $m(n,e,t,r,s,i){const o=i?1:-1;return n.identity(),n.a=1/r*2,n.d=o*(1/s*2),n.tx=-1-e*n.a,n.ty=-o-t*n.d,n}const dr=new Map;nr.register(dr);function bu(n,e){if(!dr.has(n)){const t=new k({source:new vt({resource:n,...e})}),r=()=>{dr.get(n)===t&&dr.delete(n)};t.once("destroy",r),t.source.once("destroy",r),dr.set(n,t)}return dr.get(n)}function rv(n){return dr.has(n)}function Ym(n){const e=n.colorTexture.source.resource;return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement&&document.body.contains(e)}const qm=class $x{constructor(e={}){if(this.uid=ae("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),this._managedColorTextures=!1,e={...$x.defaultOptions,...e},this.stencil=e.stencil,this.depth=e.depth,this.isRoot=e.isRoot,typeof e.colorTextures=="number"){this._managedColorTextures=!0;for(let t=0;t<e.colorTextures;t++)this.colorTextures.push(new fe({width:e.width,height:e.height,resolution:e.resolution,antialias:e.antialias}))}else{this.colorTextures=[...e.colorTextures.map(r=>r.source)];const t=this.colorTexture.source;this.resize(t.width,t.height,t._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),(e.depthStencilTexture||this.stencil)&&(e.depthStencilTexture instanceof k||e.depthStencilTexture instanceof fe?this.depthStencilTexture=e.depthStencilTexture.source:this.ensureDepthStencilTexture())}get size(){const e=this._size;return e[0]=this.pixelWidth,e[1]=this.pixelHeight,e}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(e){this.resize(e.width,e.height,e._resolution,!0)}ensureDepthStencilTexture(){this.depthStencilTexture||(this.depthStencilTexture=new fe({width:this.width,height:this.height,resolution:this.resolution,format:"depth24plus-stencil8",autoGenerateMipmaps:!1,antialias:!1,mipLevelCount:1}))}resize(e,t,r=this.resolution,s=!1){this.dirtyId++,this.colorTextures.forEach((i,o)=>{s&&o===0||i.source.resize(e,t,r)}),this.depthStencilTexture&&this.depthStencilTexture.source.resize(e,t,r)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this),this._managedColorTextures&&this.colorTextures.forEach(e=>{e.destroy()}),this.depthStencilTexture&&(this.depthStencilTexture.destroy(),delete this.depthStencilTexture)}};qm.defaultOptions={width:0,height:0,resolution:1,colorTextures:1,stencil:!1,depth:!1,antialias:!1,isRoot:!1};let ci=qm;class yu{constructor(e){this.rootViewPort=new ne,this.viewport=new ne,this.onRenderTargetChange=new Ro("onRenderTargetChange"),this.projectionMatrix=new H,this.defaultClearColor=[0,0,0,0],this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e,e.renderableGC.addManagedHash(this,"_gpuRenderTargetHash")}finishRenderPass(){this.adaptor.finishRenderPass(this.renderTarget)}renderStart({target:e,clear:t,clearColor:r,frame:s}){var i,o;this._renderTargetStack.length=0,this.push(e,t,r,s),this.rootViewPort.copyFrom(this.viewport),this.rootRenderTarget=this.renderTarget,this.renderingToScreen=Ym(this.rootRenderTarget),(o=(i=this.adaptor).prerender)==null||o.call(i,this.rootRenderTarget)}postrender(){var e,t;(t=(e=this.adaptor).postrender)==null||t.call(e,this.rootRenderTarget)}bind(e,t=!0,r,s){const i=this.getRenderTarget(e),o=this.renderTarget!==i;this.renderTarget=i,this.renderSurface=e;const a=this.getGpuRenderTarget(i);(i.pixelWidth!==a.width||i.pixelHeight!==a.height)&&(this.adaptor.resizeGpuRenderTarget(i),a.width=i.pixelWidth,a.height=i.pixelHeight);const u=i.colorTexture,l=this.viewport,c=u.pixelWidth,h=u.pixelHeight;if(!s&&e instanceof k&&(s=e.frame),s){const d=u._resolution;l.x=s.x*d+.5|0,l.y=s.y*d+.5|0,l.width=s.width*d+.5|0,l.height=s.height*d+.5|0}else l.x=0,l.y=0,l.width=c,l.height=h;return $m(this.projectionMatrix,0,0,l.width/u.resolution,l.height/u.resolution,!i.isRoot),this.adaptor.startRenderPass(i,t,r,l),o&&this.onRenderTargetChange.emit(i),i}clear(e,t=Ye.ALL,r){t&&(e&&(e=this.getRenderTarget(e)),this.adaptor.clear(e||this.renderTarget,t,r,this.viewport))}contextChange(){this._gpuRenderTargetHash=Object.create(null)}push(e,t=Ye.ALL,r,s){const i=this.bind(e,t,r,s);return this._renderTargetStack.push({renderTarget:i,frame:s}),i}pop(){this._renderTargetStack.pop();const e=this._renderTargetStack[this._renderTargetStack.length-1];this.bind(e.renderTarget,!1,null,e.frame)}getRenderTarget(e){return e.isTexture&&(e=e.source),this._renderSurfaceToRenderTargetHash.get(e)??this._initRenderTarget(e)}copyToTexture(e,t,r,s,i){r.x<0&&(s.width+=r.x,i.x-=r.x,r.x=0),r.y<0&&(s.height+=r.y,i.y-=r.y,r.y=0);const{pixelWidth:o,pixelHeight:a}=e;return s.width=Math.min(s.width,o-r.x),s.height=Math.min(s.height,a-r.y),this.adaptor.copyToTexture(e,t,r,s,i)}ensureDepthStencil(){this.renderTarget.stencil||(this.renderTarget.stencil=!0,this.adaptor.startRenderPass(this.renderTarget,!1,null,this.viewport))}destroy(){this._renderer=null,this._renderSurfaceToRenderTargetHash.forEach((e,t)=>{e!==t&&e.destroy()}),this._renderSurfaceToRenderTargetHash.clear(),this._gpuRenderTargetHash=Object.create(null)}_initRenderTarget(e){let t=null;return vt.test(e)&&(e=bu(e).source),e instanceof ci?t=e:e instanceof fe&&(t=new ci({colorTextures:[e]}),e.source instanceof vt&&(t.isRoot=!0),e.once("destroy",()=>{t.destroy(),this._renderSurfaceToRenderTargetHash.delete(e);const r=this._gpuRenderTargetHash[t.uid];r&&(this._gpuRenderTargetHash[t.uid]=null,this.adaptor.destroyGpuRenderTarget(r))})),this._renderSurfaceToRenderTargetHash.set(e,t),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||(this._gpuRenderTargetHash[e.uid]=this.adaptor.initGpuRenderTarget(e))}resetState(){this.renderTarget=null,this.renderSurface=null}}class vu extends yu{constructor(e){super(e),this.adaptor=new Xm,this.adaptor.init(e,this)}}vu.extension={type:[T.WebGLSystem],name:"renderTarget"};class hi extends We{constructor({buffer:e,offset:t,size:r}){super(),this.uid=ae("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=ae("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=e,this.offset=t|0,this.size=r,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=ae("resource"),this.emit("change",this)}destroy(e=!1){this.destroyed=!0,e&&this.buffer.destroy(),this.emit("change",this),this.buffer=null,this.removeAllListeners()}}function jm(n,e){const t=[],r=[`
        var g = s.groups;
        var sS = r.shader;
        var p = s.glProgram;
        var ugS = r.uniformGroup;
        var resources;
    `];let s=!1,i=0;const o=e._getProgramData(n.glProgram);for(const u in n.groups){const l=n.groups[u];t.push(`
            resources = g[${u}].resources;
        `);for(const c in l.resources){const h=l.resources[c];if(h instanceof Ce)if(h.ubo){const d=n._uniformBindMap[u][Number(c)];t.push(`
                        sS.bindUniformBlock(
                            resources[${c}],
                            '${d}',
                            ${n.glProgram._uniformBlockData[d].index}
                        );
                    `)}else t.push(`
                        ugS.updateUniformGroup(resources[${c}], p, sD);
                    `);else if(h instanceof hi){const d=n._uniformBindMap[u][Number(c)];t.push(`
                    sS.bindUniformBlock(
                        resources[${c}],
                        '${d}',
                        ${n.glProgram._uniformBlockData[d].index}
                    );
                `)}else if(h instanceof fe){const d=n._uniformBindMap[u][c],f=o.uniformData[d];f&&(s||(s=!0,r.push(`
                        var tS = r.texture;
                        `)),e._gl.uniform1i(f.location,i),t.push(`
                        tS.bind(resources[${c}], ${i});
                    `),i++)}}}const a=[...r,...t].join(`
`);return new Function("r","s","sD",a)}class nv{}class Km{constructor(e,t){this.program=e,this.uniformData=t,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}function Su(n,e,t){const r=n.createShader(e);return n.shaderSource(r,t),n.compileShader(r),r}function Tu(n){const e=new Array(n);for(let t=0;t<e.length;t++)e[t]=!1;return e}function Cu(n,e){switch(n){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return Tu(2*e);case"bvec3":return Tu(3*e);case"bvec4":return Tu(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}let di=null;const Zm={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"},sv={float:"float32",vec2:"float32x2",vec3:"float32x3",vec4:"float32x4",int:"sint32",ivec2:"sint32x2",ivec3:"sint32x3",ivec4:"sint32x4",uint:"uint32",uvec2:"uint32x2",uvec3:"uint32x3",uvec4:"uint32x4",bool:"uint32",bvec2:"uint32x2",bvec3:"uint32x3",bvec4:"uint32x4"};function Au(n,e){if(!di){const t=Object.keys(Zm);di={};for(let r=0;r<t.length;++r){const s=t[r];di[n[s]]=Zm[s]}}return di[e]}function Qm(n,e){const t=Au(n,e);return sv[t]||"float32"}function Jm(n,e,t=!1){const r={},s=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let o=0;o<s;o++){const a=e.getActiveAttrib(n,o);if(a.name.startsWith("gl_"))continue;const u=Qm(e,a.type);r[a.name]={location:0,format:u,stride:Mt(u).stride,offset:0,instance:!1,start:0}}const i=Object.keys(r);if(t){i.sort((o,a)=>o>a?1:-1);for(let o=0;o<i.length;o++)r[i[o]].location=o,e.bindAttribLocation(n,o,i[o]);e.linkProgram(n)}else for(let o=0;o<i.length;o++)r[i[o]].location=e.getAttribLocation(n,i[o]);return r}function eg(n,e){if(!e.ACTIVE_UNIFORM_BLOCKS)return{};const t={},r=e.getProgramParameter(n,e.ACTIVE_UNIFORM_BLOCKS);for(let s=0;s<r;s++){const i=e.getActiveUniformBlockName(n,s),o=e.getUniformBlockIndex(n,i),a=e.getActiveUniformBlockParameter(n,s,e.UNIFORM_BLOCK_DATA_SIZE);t[i]={name:i,index:o,size:a}}return t}function tg(n,e){const t={},r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let s=0;s<r;s++){const i=e.getActiveUniform(n,s),o=i.name.replace(/\[.*?\]$/,""),a=!!i.name.match(/\[.*?\]$/),u=Au(e,i.type);t[o]={name:o,index:s,type:u,size:i.size,isArray:a,value:Cu(u,i.size)}}return t}function rg(n,e){const t=n.getShaderSource(e).split(`
`).map((l,c)=>`${c}: ${l}`),r=n.getShaderInfoLog(e),s=r.split(`
`),i={},o=s.map(l=>parseFloat(l.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(l=>l&&!i[l]?(i[l]=!0,!0):!1),a=[""];o.forEach(l=>{t[l-1]=`%c${t[l-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const u=t.join(`
`);a[0]=u,console.error(r),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function ng(n,e,t,r){n.getProgramParameter(e,n.LINK_STATUS)||(n.getShaderParameter(t,n.COMPILE_STATUS)||rg(n,t),n.getShaderParameter(r,n.COMPILE_STATUS)||rg(n,r),console.error("PixiJS Error: Could not initialize shader."),n.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",n.getProgramInfoLog(e)))}function sg(n,e){const t=Su(n,n.VERTEX_SHADER,e.vertex),r=Su(n,n.FRAGMENT_SHADER,e.fragment),s=n.createProgram();n.attachShader(s,t),n.attachShader(s,r);const i=e.transformFeedbackVaryings;i&&(typeof n.transformFeedbackVaryings!="function"?X("TransformFeedback is not supported but TransformFeedbackVaryings are given."):n.transformFeedbackVaryings(s,i.names,i.bufferMode==="separate"?n.SEPARATE_ATTRIBS:n.INTERLEAVED_ATTRIBS)),n.linkProgram(s),n.getProgramParameter(s,n.LINK_STATUS)||ng(n,s,t,r),e._attributeData=Jm(s,n,!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertex)),e._uniformData=tg(s,n),e._uniformBlockData=eg(s,n),n.deleteShader(t),n.deleteShader(r);const o={};for(const u in e._uniformData){const l=e._uniformData[u];o[u]={location:n.getUniformLocation(s,u),value:Cu(l.type,l.size)}}return new Km(s,o)}const fi={textureCount:0,blockIndex:0};class wu{constructor(e){this._activeProgram=null,this._programDataHash=Object.create(null),this._shaderSyncFunctions=Object.create(null),this._renderer=e}contextChange(e){this._gl=e,this._programDataHash=Object.create(null),this._shaderSyncFunctions=Object.create(null),this._activeProgram=null}bind(e,t){if(this._setProgram(e.glProgram),t)return;fi.textureCount=0,fi.blockIndex=0;let r=this._shaderSyncFunctions[e.glProgram._key];r||(r=this._shaderSyncFunctions[e.glProgram._key]=this._generateShaderSync(e,this)),this._renderer.buffer.nextBindBase(!!e.glProgram.transformFeedbackVaryings),r(this._renderer,e,fi)}updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this._activeProgram,fi)}bindUniformBlock(e,t,r=0){const s=this._renderer.buffer,i=this._getProgramData(this._activeProgram),o=e._bufferResource;o||this._renderer.ubo.updateUniformGroup(e);const a=e.buffer,u=s.updateBuffer(a),l=s.freeLocationForBufferBase(u);if(o){const{offset:h,size:d}=e;h===0&&d===a.data.byteLength?s.bindBufferBase(u,l):s.bindBufferRange(u,l,h)}else s.getLastBindBaseLocation(u)!==l&&s.bindBufferBase(u,l);const c=this._activeProgram._uniformBlockData[t].index;i.uniformBlockBindings[r]!==l&&(i.uniformBlockBindings[r]=l,this._renderer.gl.uniformBlockBinding(i.program,c,l))}_setProgram(e){if(this._activeProgram===e)return;this._activeProgram=e;const t=this._getProgramData(e);this._gl.useProgram(t.program)}_getProgramData(e){return this._programDataHash[e._key]||this._createProgramData(e)}_createProgramData(e){const t=e._key;return this._programDataHash[t]=sg(this._gl,e),this._programDataHash[t]}destroy(){for(const e of Object.keys(this._programDataHash))this._programDataHash[e].destroy();this._programDataHash=null,this._shaderSyncFunctions=null,this._activeProgram=null,this._renderer=null,this._gl=null}_generateShaderSync(e,t){return jm(e,t)}resetState(){this._activeProgram=null}}wu.extension={type:[T.WebGLSystem],name:"shader"};const ig={f32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1f(location, v);
        }`,"vec2<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2f(location, v[0], v[1]);
        }`,"vec3<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3f(location, v[0], v[1], v[2]);
        }`,"vec4<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4f(location, v[0], v[1], v[2], v[3]);
        }`,i32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,"vec2<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,"vec3<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,"vec4<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,u32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1ui(location, v);
        }`,"vec2<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2ui(location, v[0], v[1]);
        }`,"vec3<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3ui(location, v[0], v[1], v[2]);
        }`,"vec4<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
        }`,bool:`if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,"vec2<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,"vec3<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,"vec4<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,"mat2x2<f32>":"gl.uniformMatrix2fv(location, false, v);","mat3x3<f32>":"gl.uniformMatrix3fv(location, false, v);","mat4x4<f32>":"gl.uniformMatrix4fv(location, false, v);"},og={f32:"gl.uniform1fv(location, v);","vec2<f32>":"gl.uniform2fv(location, v);","vec3<f32>":"gl.uniform3fv(location, v);","vec4<f32>":"gl.uniform4fv(location, v);","mat2x2<f32>":"gl.uniformMatrix2fv(location, false, v);","mat3x3<f32>":"gl.uniformMatrix3fv(location, false, v);","mat4x4<f32>":"gl.uniformMatrix4fv(location, false, v);",i32:"gl.uniform1iv(location, v);","vec2<i32>":"gl.uniform2iv(location, v);","vec3<i32>":"gl.uniform3iv(location, v);","vec4<i32>":"gl.uniform4iv(location, v);",u32:"gl.uniform1iv(location, v);","vec2<u32>":"gl.uniform2iv(location, v);","vec3<u32>":"gl.uniform3iv(location, v);","vec4<u32>":"gl.uniform4iv(location, v);",bool:"gl.uniform1iv(location, v);","vec2<bool>":"gl.uniform2iv(location, v);","vec3<bool>":"gl.uniform3iv(location, v);","vec4<bool>":"gl.uniform4iv(location, v);"};function ag(n,e){const t=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
        var name = null;
    `];for(const r in n.uniforms){if(!e[r]){n.uniforms[r]instanceof Ce?n.uniforms[r].ubo?t.push(`
                        renderer.shader.bindUniformBlock(uv.${r}, "${r}");
                    `):t.push(`
                        renderer.shader.updateUniformGroup(uv.${r});
                    `):n.uniforms[r]instanceof hi&&t.push(`
                        renderer.shader.bindBufferResource(uv.${r}, "${r}");
                    `);continue}const s=n.uniformStructures[r];let i=!1;for(let o=0;o<Xt.length;o++){const a=Xt[o];if(s.type===a.type&&a.test(s)){t.push(`name = "${r}";`,Xt[o].uniform),i=!0;break}}if(!i){const a=(s.size===1?ig:og)[s.type].replace("location",`ud["${r}"].location`);t.push(`
            cu = ud["${r}"];
            cv = cu.value;
            v = uv["${r}"];
            ${a};`)}}return new Function("ud","uv","renderer","syncData",t.join(`
`))}class Eu{constructor(e){this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this.gl=null,this._cache={}}contextChange(e){this.gl=e}updateUniformGroup(e,t,r){const s=this._renderer.shader._getProgramData(t);(!e.isStatic||e._dirtyId!==s.uniformDirtyGroups[e.uid])&&(s.uniformDirtyGroups[e.uid]=e._dirtyId,this._getUniformSyncFunction(e,t)(s.uniformData,e.uniforms,this._renderer,r))}_getUniformSyncFunction(e,t){var r;return((r=this._uniformGroupSyncHash[e._signature])==null?void 0:r[t._key])||this._createUniformSyncFunction(e,t)}_createUniformSyncFunction(e,t){const r=this._uniformGroupSyncHash[e._signature]||(this._uniformGroupSyncHash[e._signature]={}),s=this._getSignature(e,t._uniformData,"u");return this._cache[s]||(this._cache[s]=this._generateUniformsSync(e,t._uniformData)),r[t._key]=this._cache[s],r[t._key]}_generateUniformsSync(e,t){return ag(e,t)}_getSignature(e,t,r){const s=e.uniforms,i=[`${r}-`];for(const o in s)i.push(o),t[o]&&i.push(t[o].type);return i.join("-")}destroy(){this._renderer=null,this._cache=null}}Eu.extension={type:[T.WebGLSystem],name:"uniformGroup"};function iv(n){return n=n.replaceAll("texture2D","texture").replaceAll("gl_FragColor","finalColor").replaceAll("varying","in"),n=`
        out vec4 finalColor;
    ${n}
    `,n}const ov={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function av(n){return ov[n]}function ug(n){const e={};if(e.normal=[n.ONE,n.ONE_MINUS_SRC_ALPHA],e.add=[n.ONE,n.ONE],e.multiply=[n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA],e.screen=[n.ONE,n.ONE_MINUS_SRC_COLOR,n.ONE,n.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[n.SRC_ALPHA,n.ONE,n.ONE,n.ONE],e["screen-npm"]=[n.SRC_ALPHA,n.ONE_MINUS_SRC_COLOR,n.ONE,n.ONE_MINUS_SRC_ALPHA],e.erase=[n.ZERO,n.ONE_MINUS_SRC_ALPHA],!(n instanceof Q.get().getWebGLRenderingContext()))e.min=[n.ONE,n.ONE,n.ONE,n.ONE,n.MIN,n.MIN],e.max=[n.ONE,n.ONE,n.ONE,n.ONE,n.MAX,n.MAX];else{const r=n.getExtension("EXT_blend_minmax");r&&(e.min=[n.ONE,n.ONE,n.ONE,n.ONE,r.MIN_EXT,r.MIN_EXT],e.max=[n.ONE,n.ONE,n.ONE,n.ONE,r.MAX_EXT,r.MAX_EXT])}return e}const uv=0,lv=1,cv=2,hv=3,dv=4,fv=5,lg=class ec{constructor(e){this._invertFrontFace=!1,this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[uv]=this.setBlend,this.map[lv]=this.setOffset,this.map[cv]=this.setCullFace,this.map[hv]=this.setDepthTest,this.map[dv]=this.setFrontFace,this.map[fv]=this.setDepthMask,this.checks=[],this.defaultState=st.for2d(),e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){this._invertFrontFace=!e.isRoot,this._cullFace?this.setFrontFace(this._frontFace):this._frontFaceDirty=!0}contextChange(e){this.gl=e,this.blendModesMap=ug(e),this.resetState()}set(e){if(e||(e=this.defaultState),this.stateId!==e.data){let t=this.stateId^e.data,r=0;for(;t;)t&1&&this.map[r].call(this,!!(e.data&1<<r)),t>>=1,r++;this.stateId=e.data}for(let t=0;t<this.checks.length;t++)this.checks[t](this,e)}forceState(e){e||(e=this.defaultState);for(let t=0;t<this.map.length;t++)this.map[t].call(this,!!(e.data&1<<t));for(let t=0;t<this.checks.length;t++)this.checks[t](this,e);this.stateId=e.data}setBlend(e){this._updateCheck(ec._checkBlendMode,e),this.gl[e?"enable":"disable"](this.gl.BLEND)}setOffset(e){this._updateCheck(ec._checkPolygonOffset,e),this.gl[e?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(e){this.gl[e?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(e){this.gl.depthMask(e)}setCullFace(e){this._cullFace=e,this.gl[e?"enable":"disable"](this.gl.CULL_FACE),this._cullFace&&this._frontFaceDirty&&this.setFrontFace(this._frontFace)}setFrontFace(e){this._frontFace=e,this._frontFaceDirty=!1;const t=this._invertFrontFace?!e:e;this._glFrontFace!==t&&(this._glFrontFace=t,this.gl.frontFace(this.gl[t?"CW":"CCW"]))}setBlendMode(e){if(this.blendModesMap[e]||(e="normal"),e===this.blendMode)return;this.blendMode=e;const t=this.blendModesMap[e],r=this.gl;t.length===2?r.blendFunc(t[0],t[1]):r.blendFuncSeparate(t[0],t[1],t[2],t[3]),t.length===6?(this._blendEq=!0,r.blendEquationSeparate(t[4],t[5])):this._blendEq&&(this._blendEq=!1,r.blendEquationSeparate(r.FUNC_ADD,r.FUNC_ADD))}setPolygonOffset(e,t){this.gl.polygonOffset(e,t)}resetState(){this._glFrontFace=!1,this._frontFace=!1,this._cullFace=!1,this._frontFaceDirty=!1,this._invertFrontFace=!1,this.gl.frontFace(this.gl.CCW),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}_updateCheck(e,t){const r=this.checks.indexOf(e);t&&r===-1?this.checks.push(e):!t&&r!==-1&&this.checks.splice(r,1)}static _checkBlendMode(e,t){e.setBlendMode(t.blendMode)}static _checkPolygonOffset(e,t){e.setPolygonOffset(1,t.polygonOffset)}destroy(){this.gl=null,this.checks.length=0}};lg.extension={type:[T.WebGLSystem],name:"state"};let cg=lg;class hg{constructor(e){this.target=au.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=re.UNSIGNED_BYTE,this.internalFormat=li.RGBA,this.format=li.RGBA,this.samplerType=0}destroy(){}}const dg={id:"buffer",upload(n,e,t){e.width===n.width||e.height===n.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,n.width,n.height,e.format,e.type,n.resource):t.texImage2D(e.target,0,e.internalFormat,n.width,n.height,0,e.format,e.type,n.resource),e.width=n.width,e.height=n.height}},pv={"bc1-rgba-unorm":!0,"bc1-rgba-unorm-srgb":!0,"bc2-rgba-unorm":!0,"bc2-rgba-unorm-srgb":!0,"bc3-rgba-unorm":!0,"bc3-rgba-unorm-srgb":!0,"bc4-r-unorm":!0,"bc4-r-snorm":!0,"bc5-rg-unorm":!0,"bc5-rg-snorm":!0,"bc6h-rgb-ufloat":!0,"bc6h-rgb-float":!0,"bc7-rgba-unorm":!0,"bc7-rgba-unorm-srgb":!0,"etc2-rgb8unorm":!0,"etc2-rgb8unorm-srgb":!0,"etc2-rgb8a1unorm":!0,"etc2-rgb8a1unorm-srgb":!0,"etc2-rgba8unorm":!0,"etc2-rgba8unorm-srgb":!0,"eac-r11unorm":!0,"eac-r11snorm":!0,"eac-rg11unorm":!0,"eac-rg11snorm":!0,"astc-4x4-unorm":!0,"astc-4x4-unorm-srgb":!0,"astc-5x4-unorm":!0,"astc-5x4-unorm-srgb":!0,"astc-5x5-unorm":!0,"astc-5x5-unorm-srgb":!0,"astc-6x5-unorm":!0,"astc-6x5-unorm-srgb":!0,"astc-6x6-unorm":!0,"astc-6x6-unorm-srgb":!0,"astc-8x5-unorm":!0,"astc-8x5-unorm-srgb":!0,"astc-8x6-unorm":!0,"astc-8x6-unorm-srgb":!0,"astc-8x8-unorm":!0,"astc-8x8-unorm-srgb":!0,"astc-10x5-unorm":!0,"astc-10x5-unorm-srgb":!0,"astc-10x6-unorm":!0,"astc-10x6-unorm-srgb":!0,"astc-10x8-unorm":!0,"astc-10x8-unorm-srgb":!0,"astc-10x10-unorm":!0,"astc-10x10-unorm-srgb":!0,"astc-12x10-unorm":!0,"astc-12x10-unorm-srgb":!0,"astc-12x12-unorm":!0,"astc-12x12-unorm-srgb":!0},fg={id:"compressed",upload(n,e,t){t.pixelStorei(t.UNPACK_ALIGNMENT,4);let r=n.pixelWidth,s=n.pixelHeight;const i=!!pv[n.format];for(let o=0;o<n.resource.length;o++){const a=n.resource[o];i?t.compressedTexImage2D(t.TEXTURE_2D,o,e.internalFormat,r,s,0,a):t.texImage2D(t.TEXTURE_2D,o,e.internalFormat,r,s,0,e.format,e.type,a),r=Math.max(r>>1,1),s=Math.max(s>>1,1)}}},Pu={id:"image",upload(n,e,t,r){const s=e.width,i=e.height,o=n.pixelWidth,a=n.pixelHeight,u=n.resourceWidth,l=n.resourceHeight;u<o||l<a?((s!==o||i!==a)&&t.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,null),r===2?t.texSubImage2D(t.TEXTURE_2D,0,0,0,u,l,e.format,e.type,n.resource):t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,n.resource)):s===o&&i===a?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,n.resource):r===2?t.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,n.resource):t.texImage2D(e.target,0,e.internalFormat,e.format,e.type,n.resource),e.width=o,e.height=a}},pg={id:"video",upload(n,e,t,r){if(!n.isValid){t.texImage2D(e.target,0,e.internalFormat,1,1,0,e.format,e.type,null);return}Pu.upload(n,e,t,r)}},Bu={linear:9729,nearest:9728},mg={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},pi={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},gg={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};function Ru(n,e,t,r,s,i,o,a){const u=i;if(!a||n.addressModeU!=="repeat"||n.addressModeV!=="repeat"||n.addressModeW!=="repeat"){const l=pi[o?"clamp-to-edge":n.addressModeU],c=pi[o?"clamp-to-edge":n.addressModeV],h=pi[o?"clamp-to-edge":n.addressModeW];e[s](u,e.TEXTURE_WRAP_S,l),e[s](u,e.TEXTURE_WRAP_T,c),e.TEXTURE_WRAP_R&&e[s](u,e.TEXTURE_WRAP_R,h)}if((!a||n.magFilter!=="linear")&&e[s](u,e.TEXTURE_MAG_FILTER,Bu[n.magFilter]),t){if(!a||n.mipmapFilter!=="linear"){const l=mg[n.minFilter][n.mipmapFilter];e[s](u,e.TEXTURE_MIN_FILTER,l)}}else e[s](u,e.TEXTURE_MIN_FILTER,Bu[n.minFilter]);if(r&&n.maxAnisotropy>1){const l=Math.min(n.maxAnisotropy,e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT));e[s](u,r.TEXTURE_MAX_ANISOTROPY_EXT,l)}n.compare&&e[s](u,e.TEXTURE_COMPARE_FUNC,gg[n.compare])}function _g(n){return{r8unorm:n.RED,r8snorm:n.RED,r8uint:n.RED,r8sint:n.RED,r16uint:n.RED,r16sint:n.RED,r16float:n.RED,rg8unorm:n.RG,rg8snorm:n.RG,rg8uint:n.RG,rg8sint:n.RG,r32uint:n.RED,r32sint:n.RED,r32float:n.RED,rg16uint:n.RG,rg16sint:n.RG,rg16float:n.RG,rgba8unorm:n.RGBA,"rgba8unorm-srgb":n.RGBA,rgba8snorm:n.RGBA,rgba8uint:n.RGBA,rgba8sint:n.RGBA,bgra8unorm:n.RGBA,"bgra8unorm-srgb":n.RGBA,rgb9e5ufloat:n.RGB,rgb10a2unorm:n.RGBA,rg11b10ufloat:n.RGB,rg32uint:n.RG,rg32sint:n.RG,rg32float:n.RG,rgba16uint:n.RGBA,rgba16sint:n.RGBA,rgba16float:n.RGBA,rgba32uint:n.RGBA,rgba32sint:n.RGBA,rgba32float:n.RGBA,stencil8:n.STENCIL_INDEX8,depth16unorm:n.DEPTH_COMPONENT,depth24plus:n.DEPTH_COMPONENT,"depth24plus-stencil8":n.DEPTH_STENCIL,depth32float:n.DEPTH_COMPONENT,"depth32float-stencil8":n.DEPTH_STENCIL}}function xg(n,e){let t={},r=n.RGBA;return n instanceof Q.get().getWebGLRenderingContext()?e.srgb&&(t={"rgba8unorm-srgb":e.srgb.SRGB8_ALPHA8_EXT,"bgra8unorm-srgb":e.srgb.SRGB8_ALPHA8_EXT}):(t={"rgba8unorm-srgb":n.SRGB8_ALPHA8,"bgra8unorm-srgb":n.SRGB8_ALPHA8},r=n.RGBA8),{r8unorm:n.R8,r8snorm:n.R8_SNORM,r8uint:n.R8UI,r8sint:n.R8I,r16uint:n.R16UI,r16sint:n.R16I,r16float:n.R16F,rg8unorm:n.RG8,rg8snorm:n.RG8_SNORM,rg8uint:n.RG8UI,rg8sint:n.RG8I,r32uint:n.R32UI,r32sint:n.R32I,r32float:n.R32F,rg16uint:n.RG16UI,rg16sint:n.RG16I,rg16float:n.RG16F,rgba8unorm:n.RGBA,...t,rgba8snorm:n.RGBA8_SNORM,rgba8uint:n.RGBA8UI,rgba8sint:n.RGBA8I,bgra8unorm:r,rgb9e5ufloat:n.RGB9_E5,rgb10a2unorm:n.RGB10_A2,rg11b10ufloat:n.R11F_G11F_B10F,rg32uint:n.RG32UI,rg32sint:n.RG32I,rg32float:n.RG32F,rgba16uint:n.RGBA16UI,rgba16sint:n.RGBA16I,rgba16float:n.RGBA16F,rgba32uint:n.RGBA32UI,rgba32sint:n.RGBA32I,rgba32float:n.RGBA32F,stencil8:n.STENCIL_INDEX8,depth16unorm:n.DEPTH_COMPONENT16,depth24plus:n.DEPTH_COMPONENT24,"depth24plus-stencil8":n.DEPTH24_STENCIL8,depth32float:n.DEPTH_COMPONENT32F,"depth32float-stencil8":n.DEPTH32F_STENCIL8,...e.s3tc?{"bc1-rgba-unorm":e.s3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT,"bc2-rgba-unorm":e.s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT,"bc3-rgba-unorm":e.s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT}:{},...e.s3tc_sRGB?{"bc1-rgba-unorm-srgb":e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,"bc2-rgba-unorm-srgb":e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,"bc3-rgba-unorm-srgb":e.s3tc_sRGB.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}:{},...e.rgtc?{"bc4-r-unorm":e.rgtc.COMPRESSED_RED_RGTC1_EXT,"bc4-r-snorm":e.rgtc.COMPRESSED_SIGNED_RED_RGTC1_EXT,"bc5-rg-unorm":e.rgtc.COMPRESSED_RED_GREEN_RGTC2_EXT,"bc5-rg-snorm":e.rgtc.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}:{},...e.bptc?{"bc6h-rgb-float":e.bptc.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT,"bc6h-rgb-ufloat":e.bptc.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT,"bc7-rgba-unorm":e.bptc.COMPRESSED_RGBA_BPTC_UNORM_EXT,"bc7-rgba-unorm-srgb":e.bptc.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT}:{},...e.etc?{"etc2-rgb8unorm":e.etc.COMPRESSED_RGB8_ETC2,"etc2-rgb8unorm-srgb":e.etc.COMPRESSED_SRGB8_ETC2,"etc2-rgb8a1unorm":e.etc.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2,"etc2-rgb8a1unorm-srgb":e.etc.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2,"etc2-rgba8unorm":e.etc.COMPRESSED_RGBA8_ETC2_EAC,"etc2-rgba8unorm-srgb":e.etc.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC,"eac-r11unorm":e.etc.COMPRESSED_R11_EAC,"eac-rg11unorm":e.etc.COMPRESSED_SIGNED_RG11_EAC}:{},...e.astc?{"astc-4x4-unorm":e.astc.COMPRESSED_RGBA_ASTC_4x4_KHR,"astc-4x4-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR,"astc-5x4-unorm":e.astc.COMPRESSED_RGBA_ASTC_5x4_KHR,"astc-5x4-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR,"astc-5x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_5x5_KHR,"astc-5x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR,"astc-6x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_6x5_KHR,"astc-6x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR,"astc-6x6-unorm":e.astc.COMPRESSED_RGBA_ASTC_6x6_KHR,"astc-6x6-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR,"astc-8x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_8x5_KHR,"astc-8x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR,"astc-8x6-unorm":e.astc.COMPRESSED_RGBA_ASTC_8x6_KHR,"astc-8x6-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR,"astc-8x8-unorm":e.astc.COMPRESSED_RGBA_ASTC_8x8_KHR,"astc-8x8-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR,"astc-10x5-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x5_KHR,"astc-10x5-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR,"astc-10x6-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x6_KHR,"astc-10x6-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR,"astc-10x8-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x8_KHR,"astc-10x8-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR,"astc-10x10-unorm":e.astc.COMPRESSED_RGBA_ASTC_10x10_KHR,"astc-10x10-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR,"astc-12x10-unorm":e.astc.COMPRESSED_RGBA_ASTC_12x10_KHR,"astc-12x10-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR,"astc-12x12-unorm":e.astc.COMPRESSED_RGBA_ASTC_12x12_KHR,"astc-12x12-unorm-srgb":e.astc.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR}:{}}}function bg(n){return{r8unorm:n.UNSIGNED_BYTE,r8snorm:n.BYTE,r8uint:n.UNSIGNED_BYTE,r8sint:n.BYTE,r16uint:n.UNSIGNED_SHORT,r16sint:n.SHORT,r16float:n.HALF_FLOAT,rg8unorm:n.UNSIGNED_BYTE,rg8snorm:n.BYTE,rg8uint:n.UNSIGNED_BYTE,rg8sint:n.BYTE,r32uint:n.UNSIGNED_INT,r32sint:n.INT,r32float:n.FLOAT,rg16uint:n.UNSIGNED_SHORT,rg16sint:n.SHORT,rg16float:n.HALF_FLOAT,rgba8unorm:n.UNSIGNED_BYTE,"rgba8unorm-srgb":n.UNSIGNED_BYTE,rgba8snorm:n.BYTE,rgba8uint:n.UNSIGNED_BYTE,rgba8sint:n.BYTE,bgra8unorm:n.UNSIGNED_BYTE,"bgra8unorm-srgb":n.UNSIGNED_BYTE,rgb9e5ufloat:n.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:n.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:n.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:n.UNSIGNED_INT,rg32sint:n.INT,rg32float:n.FLOAT,rgba16uint:n.UNSIGNED_SHORT,rgba16sint:n.SHORT,rgba16float:n.HALF_FLOAT,rgba32uint:n.UNSIGNED_INT,rgba32sint:n.INT,rgba32float:n.FLOAT,stencil8:n.UNSIGNED_BYTE,depth16unorm:n.UNSIGNED_SHORT,depth24plus:n.UNSIGNED_INT,"depth24plus-stencil8":n.UNSIGNED_INT_24_8,depth32float:n.FLOAT,"depth32float-stencil8":n.FLOAT_32_UNSIGNED_INT_24_8_REV}}function mv(n){n instanceof Uint8ClampedArray&&(n=new Uint8Array(n.buffer));const e=n.length;for(let t=0;t<e;t+=4){const r=n[t+3];if(r!==0){const s=255.001/r;n[t]=n[t]*s+.5,n[t+1]=n[t+1]*s+.5,n[t+2]=n[t+2]*s+.5}}}const gv=4;class Du{constructor(e){this._glSamplers=Object.create(null),this._boundTextures=[],this._activeTextureLocation=-1,this._boundSamplers=Object.create(null),this._uploads={image:Pu,buffer:dg,video:pg,compressed:fg},this._premultiplyAlpha=!1,this._useSeparateSamplers=!1,this._renderer=e,this._managedTextures=new je({renderer:e,type:"resource",onUnload:this.onSourceUnload.bind(this),name:"glTexture"})}get managedTextures(){return Object.values(this._managedTextures.items)}contextChange(e){this._gl=e,this._mapFormatToInternalFormat||(this._mapFormatToInternalFormat=xg(e,this._renderer.context.extensions),this._mapFormatToType=bg(e),this._mapFormatToFormat=_g(e)),this._managedTextures.removeAll(!0),this._glSamplers=Object.create(null),this._boundSamplers=Object.create(null),this._premultiplyAlpha=!1;for(let t=0;t<16;t++)this.bind(k.EMPTY,t)}initSource(e){this.bind(e)}bind(e,t=0){const r=e.source;e?(this.bindSource(r,t),this._useSeparateSamplers&&this._bindSampler(r.style,t)):(this.bindSource(null,t),this._useSeparateSamplers&&this._bindSampler(null,t))}bindSource(e,t=0){const r=this._gl;if(e._gcLastUsed=this._renderer.gc.now,this._boundTextures[t]!==e){this._boundTextures[t]=e,this._activateLocation(t),e||(e=k.EMPTY.source);const s=this.getGlSource(e);r.bindTexture(s.target,s.texture)}}_bindSampler(e,t=0){const r=this._gl;if(!e){this._boundSamplers[t]=null,r.bindSampler(t,null);return}const s=this._getGlSampler(e);this._boundSamplers[t]!==s&&(this._boundSamplers[t]=s,r.bindSampler(t,s))}unbind(e){const t=e.source,r=this._boundTextures,s=this._gl;for(let i=0;i<r.length;i++)if(r[i]===t){this._activateLocation(i);const o=this.getGlSource(t);s.bindTexture(o.target,null),r[i]=null}}_activateLocation(e){this._activeTextureLocation!==e&&(this._activeTextureLocation=e,this._gl.activeTexture(this._gl.TEXTURE0+e))}_initSource(e){const t=this._gl,r=new hg(t.createTexture());if(r.type=this._mapFormatToType[e.format],r.internalFormat=this._mapFormatToInternalFormat[e.format],r.format=this._mapFormatToFormat[e.format],e.autoGenerateMipmaps&&(this._renderer.context.supports.nonPowOf2mipmaps||e.isPowerOfTwo)){const i=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(i))+1}return e._gpuData[this._renderer.uid]=r,this._managedTextures.add(e)&&(e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceUpdate,this),e.on("styleChange",this.onStyleChange,this),e.on("updateMipmaps",this.onUpdateMipmaps,this)),this.onSourceUpdate(e),this.updateStyle(e,!1),r}onStyleChange(e){this.updateStyle(e,!1)}updateStyle(e,t){const r=this._gl,s=this.getGlSource(e);r.bindTexture(r.TEXTURE_2D,s.texture),this._boundTextures[this._activeTextureLocation]=e,Ru(e.style,r,e.mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"texParameteri",r.TEXTURE_2D,!this._renderer.context.supports.nonPowOf2wrapping&&!e.isPowerOfTwo,t)}onSourceUnload(e,t=!1){const r=e._gpuData[this._renderer.uid];r&&(t||(this.unbind(e),this._gl.deleteTexture(r.texture)),e.off("update",this.onSourceUpdate,this),e.off("resize",this.onSourceUpdate,this),e.off("styleChange",this.onStyleChange,this),e.off("updateMipmaps",this.onUpdateMipmaps,this))}onSourceUpdate(e){const t=this._gl,r=this.getGlSource(e);t.bindTexture(t.TEXTURE_2D,r.texture),this._boundTextures[this._activeTextureLocation]=e;const s=e.alphaMode==="premultiply-alpha-on-upload";this._premultiplyAlpha!==s&&(this._premultiplyAlpha=s,t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s)),this._uploads[e.uploadMethodId]?this._uploads[e.uploadMethodId].upload(e,r,t,this._renderer.context.webGLVersion):t.texImage2D(t.TEXTURE_2D,0,r.internalFormat,e.pixelWidth,e.pixelHeight,0,r.format,r.type,null),e.autoGenerateMipmaps&&e.mipLevelCount>1&&this.onUpdateMipmaps(e,!1)}onUpdateMipmaps(e,t=!0){t&&this.bindSource(e,0);const r=this.getGlSource(e);this._gl.generateMipmap(r.target)}_initSampler(e){const t=this._gl,r=this._gl.createSampler();return this._glSamplers[e._resourceId]=r,Ru(e,t,this._boundTextures[this._activeTextureLocation].mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"samplerParameteri",r,!1,!0),this._glSamplers[e._resourceId]}_getGlSampler(e){return this._glSamplers[e._resourceId]||this._initSampler(e)}getGlSource(e){return e._gcLastUsed=this._renderer.gc.now,e._gpuData[this._renderer.uid]||this._initSource(e)}generateCanvas(e){const{pixels:t,width:r,height:s}=this.getPixels(e),i=Q.get().createCanvas();i.width=r,i.height=s;const o=i.getContext("2d");if(o){const a=o.createImageData(r,s);a.data.set(t),o.putImageData(a,0,0)}return i}getPixels(e){const t=e.source.resolution,r=e.frame,s=Math.max(Math.round(r.width*t),1),i=Math.max(Math.round(r.height*t),1),o=new Uint8Array(gv*s*i),a=this._renderer,u=a.renderTarget.getRenderTarget(e),l=a.renderTarget.getGpuRenderTarget(u),c=a.gl;return c.bindFramebuffer(c.FRAMEBUFFER,l.resolveTargetFramebuffer),c.readPixels(Math.round(r.x*t),Math.round(r.y*t),s,i,c.RGBA,c.UNSIGNED_BYTE,o),{pixels:new Uint8ClampedArray(o.buffer),width:s,height:i}}destroy(){this._managedTextures.destroy(),this._glSamplers=null,this._boundTextures=null,this._boundSamplers=null,this._mapFormatToInternalFormat=null,this._mapFormatToType=null,this._mapFormatToFormat=null,this._uploads=null,this._renderer=null}resetState(){this._activeTextureLocation=-1,this._boundTextures.fill(k.EMPTY.source),this._boundSamplers=Object.create(null);const e=this._gl;this._premultiplyAlpha=!1,e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this._premultiplyAlpha)}}Du.extension={type:[T.WebGLSystem],name:"texture"};class Mu{contextChange(e){const t=new Ce({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new H,type:"mat3x3<f32>"},uRound:{value:0,type:"f32"}}),r=e.limits.maxBatchableTextures,s=Ur({name:"graphics",bits:[Fs,Is(r),ui,Or]});this.shader=new nt({glProgram:s,resources:{localUniforms:t,batchSamplers:Os(r)}})}execute(e,t){const r=t.context,s=r.customShader||this.shader,i=e.renderer,o=i.graphicsContext,{batcher:a,instructions:u}=o.getContextRenderData(r);s.groups[0]=i.globalUniforms.bindGroup,i.state.set(e.state),i.shader.bind(s),i.geometry.bind(a.geometry,s.glProgram);const l=u.instructions;for(let c=0;c<u.instructionSize;c++){const h=l[c];if(h.size){for(let d=0;d<h.textures.count;d++)i.texture.bind(h.textures.textures[d],d);i.geometry.draw(h.topology,h.size,h.start)}}}destroy(){this.shader.destroy(!0),this.shader=null}}Mu.extension={type:[T.WebGLPipesAdaptor],name:"graphics"};class Fu{init(){const e=Ur({name:"mesh",bits:[ui,Mm,Or]});this._shader=new nt({glProgram:e,resources:{uTexture:k.EMPTY.source,textureUniforms:{uTextureMatrix:{type:"mat3x3<f32>",value:new H}}}})}execute(e,t){const r=e.renderer;let s=t._shader;if(s){if(!s.glProgram){X("Mesh shader has no glProgram",t.shader);return}}else{s=this._shader;const i=t.texture,o=i.source;s.resources.uTexture=o,s.resources.uSampler=o.style,s.resources.textureUniforms.uniforms.uTextureMatrix=i.textureMatrix.mapCoord}s.groups[100]=r.globalUniforms.bindGroup,s.groups[101]=e.localUniformsBindGroup,r.encoder.draw({geometry:t._geometry,shader:s,state:t.state})}destroy(){this._shader.destroy(!0),this._shader=null}}Fu.extension={type:[T.WebGLPipesAdaptor],name:"mesh"};class Uu{constructor(e){this._renderer=e}updateRenderable(){}destroyRenderable(){}validateRenderable(){return!1}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&e.render(this._renderer)}destroy(){this._renderer=null}}Uu.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"customRender"};class $n{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}destroy(){this.reset()}}function mi(n,e){const t=n.instructionSet,r=t.instructions;for(let s=0;s<t.instructionSize;s++){const i=r[s];e[i.renderPipeId].execute(i)}}const _v=new H;class Iu{constructor(e){this._renderer=e}addRenderGroup(e,t){e.isCachedAsTexture?this._addRenderableCacheAsTexture(e,t):this._addRenderableDirect(e,t)}execute(e){e.isRenderable&&(e.isCachedAsTexture?this._executeCacheAsTexture(e):this._executeDirect(e))}destroy(){this._renderer=null}_addRenderableDirect(e,t){this._renderer.renderPipes.batch.break(t),e._batchableRenderGroup&&(Te.return(e._batchableRenderGroup),e._batchableRenderGroup=null),t.add(e)}_addRenderableCacheAsTexture(e,t){const r=e._batchableRenderGroup??(e._batchableRenderGroup=Te.get($n));r.renderable=e.root,r.transform=e.root.relativeGroupTransform,r.texture=e.texture,r.bounds=e._textureBounds,t.add(e),this._renderer.renderPipes.blendMode.pushBlendMode(e,e.root.groupBlendMode,t),this._renderer.renderPipes.batch.addToBatch(r,t),this._renderer.renderPipes.blendMode.popBlendMode(t)}_executeCacheAsTexture(e){if(e.textureNeedsUpdate){e.textureNeedsUpdate=!1;const t=_v.identity().translate(-e._textureBounds.x,-e._textureBounds.y);this._renderer.renderTarget.push(e.texture,!0,null,e.texture.frame),this._renderer.globalUniforms.push({worldTransformMatrix:t,worldColor:4294967295,offset:{x:0,y:0}}),mi(e,this._renderer.renderPipes),this._renderer.renderTarget.finishRenderPass(),this._renderer.renderTarget.pop(),this._renderer.globalUniforms.pop()}e._batchableRenderGroup._batcher.updateElement(e._batchableRenderGroup),e._batchableRenderGroup._batcher.geometry.buffers[0].update()}_executeDirect(e){this._renderer.globalUniforms.push({worldTransformMatrix:e.inverseParentTextureTransform,worldColor:e.worldColorAlpha}),mi(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop()}}Iu.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"renderGroup"};function gi(n,e){e||(e=0);for(let t=e;t<n.length&&n[t];t++)n[t]=null}const xv=new ce,yg=Sr|ln|cs;function Ou(n,e=!1){vg(n);const t=n.childrenToUpdate,r=n.updateTick++;for(const s in t){const i=Number(s),o=t[s],a=o.list,u=o.index;for(let l=0;l<u;l++){const c=a[l];c.parentRenderGroup===n&&c.relativeRenderGroupDepth===i&&Gu(c,r,0)}gi(a,u),o.index=0}if(e)for(let s=0;s<n.renderGroupChildren.length;s++)Ou(n.renderGroupChildren[s],e)}function vg(n){const e=n.root;let t;if(n.renderGroupParent){const r=n.renderGroupParent;n.worldTransform.appendFrom(e.relativeGroupTransform,r.worldTransform),n.worldColor=un(e.groupColor,r.worldColor),t=e.groupAlpha*r.worldAlpha}else n.worldTransform.copyFrom(e.localTransform),n.worldColor=e.localColor,t=e.localAlpha;t=t<0?0:t>1?1:t,n.worldAlpha=t,n.worldColorAlpha=n.worldColor+((t*255|0)<<24)}function Gu(n,e,t){if(e===n.updateTick)return;n.updateTick=e,n.didChange=!1;const r=n.localTransform;n.updateLocalTransform();const s=n.parent;if(s&&!s.renderGroup?(t|=n._updateFlags,n.relativeGroupTransform.appendFrom(r,s.relativeGroupTransform),t&yg&&Sg(n,s,t)):(t=n._updateFlags,n.relativeGroupTransform.copyFrom(r),t&yg&&Sg(n,xv,t)),!n.renderGroup){const i=n.children,o=i.length;for(let l=0;l<o;l++)Gu(i[l],e,t);const a=n.parentRenderGroup,u=n;u.renderPipeId&&!a.structureDidChange&&a.updateRenderable(u)}}function Sg(n,e,t){if(t&ln){n.groupColor=un(n.localColor,e.groupColor);let r=n.localAlpha*e.groupAlpha;r=r<0?0:r>1?1:r,n.groupAlpha=r,n.groupColorAlpha=n.groupColor+((r*255|0)<<24)}t&cs&&(n.groupBlendMode=n.localBlendMode==="inherit"?e.groupBlendMode:n.localBlendMode),t&Sr&&(n.globalDisplayStatus=n.localDisplayStatus&e.globalDisplayStatus),n._updateFlags=0}function Tg(n,e){const{list:t}=n.childrenRenderablesToUpdate;let r=!1;for(let s=0;s<n.childrenRenderablesToUpdate.index;s++){const i=t[s];if(r=e[i.renderPipeId].validateRenderable(i),r)break}return n.structureDidChange=r,r}const bv=new H;class ku{constructor(e){this._renderer=e}render({container:e,transform:t}){const r=e.parent,s=e.renderGroup.renderGroupParent;e.parent=null,e.renderGroup.renderGroupParent=null;const i=this._renderer,o=bv;t&&(o.copyFrom(e.renderGroup.localTransform),e.renderGroup.localTransform.copyFrom(t));const a=i.renderPipes;this._updateCachedRenderGroups(e.renderGroup,null),this._updateRenderGroups(e.renderGroup),i.globalUniforms.start({worldTransformMatrix:t?e.renderGroup.localTransform:e.renderGroup.worldTransform,worldColor:e.renderGroup.worldColorAlpha}),mi(e.renderGroup,a),a.uniformBatch&&a.uniformBatch.renderEnd(),t&&e.renderGroup.localTransform.copyFrom(o),e.parent=r,e.renderGroup.renderGroupParent=s}destroy(){this._renderer=null}_updateCachedRenderGroups(e,t){if(e._parentCacheAsTextureRenderGroup=t,e.isCachedAsTexture){if(!e.textureNeedsUpdate)return;t=e}for(let r=e.renderGroupChildren.length-1;r>=0;r--)this._updateCachedRenderGroups(e.renderGroupChildren[r],t);if(e.invalidateMatrices(),e.isCachedAsTexture){if(e.textureNeedsUpdate){const r=e.root.getLocalBounds();r.ceil();const s=e.texture;e.texture&&ue.returnTexture(e.texture,!0);const i=this._renderer,o=e.textureOptions.resolution||i.view.resolution,a=e.textureOptions.antialias??i.view.antialias,u=e.textureOptions.scaleMode??"linear",l=ue.getOptimalTexture(r.width,r.height,o,a);l._source.style=new tt({scaleMode:u}),e.texture=l,e._textureBounds||(e._textureBounds=new Be),e._textureBounds.copyFrom(r),s!==e.texture&&e.renderGroupParent&&(e.renderGroupParent.structureDidChange=!0)}}else e.texture&&(ue.returnTexture(e.texture,!0),e.texture=null)}_updateRenderGroups(e){const t=this._renderer,r=t.renderPipes;if(e.runOnRender(t),e.instructionSet.renderPipes=r,e.structureDidChange?gi(e.childrenRenderablesToUpdate.list,0):Tg(e,r),Ou(e),e.structureDidChange?(e.structureDidChange=!1,this._buildInstructions(e,t)):this._updateRenderables(e),e.childrenRenderablesToUpdate.index=0,t.renderPipes.batch.upload(e.instructionSet),!(e.isCachedAsTexture&&!e.textureNeedsUpdate))for(let s=0;s<e.renderGroupChildren.length;s++)this._updateRenderGroups(e.renderGroupChildren[s])}_updateRenderables(e){const{list:t,index:r}=e.childrenRenderablesToUpdate;for(let s=0;s<r;s++){const i=t[s];i.didViewUpdate&&e.updateRenderable(i)}gi(t,r)}_buildInstructions(e,t){const r=e.root,s=e.instructionSet;s.reset();const i=t.renderPipes?t:t.batch.renderer,o=i.renderPipes;o.batch.buildStart(s),o.blendMode.buildStart(),o.colorMask.buildStart(),r.sortableChildren&&r.sortChildren(),r.collectRenderablesWithEffects(s,i,null),o.batch.buildEnd(s),o.blendMode.buildEnd(s)}}ku.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"renderGroup"};class Lu{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.bounds=e.visualBounds,t.texture=e._texture}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=new $n;return t.renderable=e,t.transform=e.groupTransform,t.texture=e._texture,t.bounds=e.visualBounds,t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Lu.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"sprite"};const Nu=class Yx{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new ee(0),this.color=this._backgroundColor,this.alpha=1}init(e){e={...Yx.defaultOptions,...e},this.clearBeforeRender=e.clearBeforeRender,this.color=e.background||e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha,this._backgroundColor.setAlpha(e.backgroundAlpha)}get color(){return this._backgroundColor}set color(e){ee.shared.setValue(e).alpha<1&&this._backgroundColor.alpha===1&&X("Cannot set a transparent background on an opaque canvas. To enable transparency, set backgroundAlpha < 1 when initializing your Application."),this._backgroundColor.setValue(e)}get alpha(){return this._backgroundColor.alpha}set alpha(e){this._backgroundColor.setAlpha(e)}get colorRgba(){return this._backgroundColor.toArray()}destroy(){}};Nu.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"background",priority:0},Nu.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};let Cg=Nu;const Yn={};$.handle(T.BlendMode,n=>{if(!n.name)throw new Error("BlendMode extension must have a name property");Yn[n.name]=n.ref},n=>{delete Yn[n.name]});class zu{constructor(e){this._blendModeStack=[],this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e,this._renderer.runners.prerender.add(this)}prerender(){this._activeBlendMode="normal",this._isAdvanced=!1}pushBlendMode(e,t,r){this._blendModeStack.push(t),this.setBlendMode(e,t,r)}popBlendMode(e){this._blendModeStack.pop();const t=this._blendModeStack[this._activeBlendMode.length-1]??"normal";this.setBlendMode(null,t,e)}setBlendMode(e,t,r){var i;const s=e instanceof os;if(this._activeBlendMode===t){this._isAdvanced&&e&&!s&&((i=this._renderableList)==null||i.push(e));return}this._isAdvanced&&this._endAdvancedBlendMode(r),this._activeBlendMode=t,e&&(this._isAdvanced=!!Yn[t],this._isAdvanced&&this._beginAdvancedBlendMode(e,r))}_beginAdvancedBlendMode(e,t){this._renderer.renderPipes.batch.break(t);const r=this._activeBlendMode;if(!Yn[r]){X(`Unable to assign BlendMode: '${r}'. You may want to include: import 'pixi.js/advanced-blend-modes'`);return}const s=this._ensureFilterEffect(r),i=e instanceof os,o={renderPipeId:"filter",action:"pushFilter",filterEffect:s,renderables:i?null:[e],container:i?e.root:null,canBundle:!1};this._renderableList=o.renderables,t.add(o)}_ensureFilterEffect(e){let t=this._filterHash[e];return t||(t=this._filterHash[e]=new on,t.filters=[new Yn[e]]),t}_endAdvancedBlendMode(e){this._isAdvanced=!1,this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}zu.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"blendMode"};const Hu={png:"image/png",jpg:"image/jpeg",webp:"image/webp"},Vu=class qx{constructor(e){this._renderer=e}_normalizeOptions(e,t={}){return e instanceof ce||e instanceof k?{target:e,...t}:{...t,...e}}async image(e){const t=Q.get().createImage();return t.src=await this.base64(e),t}async base64(e){e=this._normalizeOptions(e,qx.defaultImageOptions);const{format:t,quality:r}=e,s=this.canvas(e);if(s.toBlob!==void 0)return new Promise((i,o)=>{s.toBlob(a=>{if(!a){o(new Error("ICanvas.toBlob failed!"));return}const u=new FileReader;u.onload=()=>i(u.result),u.onerror=o,u.readAsDataURL(a)},Hu[t],r)});if(s.toDataURL!==void 0)return s.toDataURL(Hu[t],r);if(s.convertToBlob!==void 0){const i=await s.convertToBlob({type:Hu[t],quality:r});return new Promise((o,a)=>{const u=new FileReader;u.onload=()=>o(u.result),u.onerror=a,u.readAsDataURL(i)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(e){e=this._normalizeOptions(e);const t=e.target,r=this._renderer;if(t instanceof k)return r.texture.generateCanvas(t);const s=r.textureGenerator.generateTexture(e),i=r.texture.generateCanvas(s);return s.destroy(!0),i}pixels(e){e=this._normalizeOptions(e);const t=e.target,r=this._renderer,s=t instanceof k?t:r.textureGenerator.generateTexture(e),i=r.texture.getPixels(s);return t instanceof ce&&s.destroy(!0),i}texture(e){return e=this._normalizeOptions(e),e.target instanceof k?e.target:this._renderer.textureGenerator.generateTexture(e)}download(e){e=this._normalizeOptions(e);const t=this.canvas(e),r=document.createElement("a");r.download=e.filename??"image.png",r.href=t.toDataURL("image/png"),document.body.appendChild(r),r.click(),document.body.removeChild(r)}log(e){const t=e.width??200;e=this._normalizeOptions(e);const r=this.canvas(e),s=r.toDataURL();console.log(`[Pixi Texture] ${r.width}px ${r.height}px`);const i=["font-size: 1px;",`padding: ${t}px 300px;`,`background: url(${s}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",i)}destroy(){this._renderer=null}};Vu.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"extract"},Vu.defaultImageOptions={format:"png",quality:1};let Ag=Vu;class _i extends k{static create(e){const{dynamic:t,...r}=e;return new _i({source:new fe(r),dynamic:t??!1})}resize(e,t,r){return this.source.resize(e,t,r),this}}const yv=new ne,vv=new Be,Sv=[0,0,0,0];class Wu{constructor(e){this._renderer=e}generateTexture(e){var l;e instanceof ce&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const t=e.resolution||this._renderer.resolution,r=e.antialias||this._renderer.view.antialias,s=e.target;let i=e.clearColor;i?i=Array.isArray(i)&&i.length===4?i:ee.shared.setValue(i).toArray():i=Sv;const o=((l=e.frame)==null?void 0:l.copyTo(yv))||is(s,vv).rectangle;o.width=Math.max(o.width,1/t)|0,o.height=Math.max(o.height,1/t)|0;const a=_i.create({...e.textureSourceOptions,width:o.width,height:o.height,resolution:t,antialias:r}),u=H.shared.translate(-o.x,-o.y);return this._renderer.render({container:s,transform:u,target:a,clearColor:i}),a.source.updateMipmaps(),a}destroy(){this._renderer=null}}Wu.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"textureGenerator"};const Xu=class jx{constructor(e){this._managedResources=[],this._managedResourceHashes=[],this._ready=!1,this._renderer=e}init(e){e={...jx.defaultOptions,...e},this.maxUnusedTime=e.gcMaxUnusedTime,this._frequency=e.gcFrequency,this.enabled=e.gcActive,this.now=performance.now()}get enabled(){return!!this._handler}set enabled(e){this.enabled!==e&&(e?this._handler=this._renderer.scheduler.repeat(()=>{this._ready=!0},this._frequency,!1):(this._renderer.scheduler.cancel(this._handler),this._handler=0))}prerender({container:e}){this.now=performance.now(),e.renderGroup.gcTick=this._renderer.tick++,this._updateInstructionGCTick(e.renderGroup,e.renderGroup.gcTick)}postrender(){!this._ready||!this.enabled||(this.run(),this._ready=!1)}_updateInstructionGCTick(e,t){e.instructionSet.gcTick=t;for(const r of e.renderGroupChildren)this._updateInstructionGCTick(r,t)}addResource(e,t){var s,i;if(e._gcLastUsed!==-1){e._gcLastUsed=this.now,(s=e._onTouch)==null||s.call(e,this.now);return}const r=this._managedResources.length;e._gcData={index:r,type:t},e._gcLastUsed=this.now,(i=e._onTouch)==null||i.call(e,this.now),e.once("unload",this.removeResource,this),this._managedResources.push(e)}removeResource(e){const t=e._gcData;if(!t)return;const r=t.index,s=this._managedResources.length-1;if(r!==s){const i=this._managedResources[s];this._managedResources[r]=i,i._gcData.index=r}this._managedResources.length--,e._gcData=null,e._gcLastUsed=-1}addResourceHash(e,t,r,s=0){this._managedResourceHashes.push({context:e,hash:t,type:r,priority:s}),this._managedResourceHashes.sort((i,o)=>i.priority-o.priority)}run(){const e=performance.now(),t=this._managedResourceHashes;for(const s of t)this.runOnHash(s,e);let r=0;for(let s=0;s<this._managedResources.length;s++){const i=this._managedResources[s];r=this.runOnResource(i,e,r)}this._managedResources.length=r}updateRenderableGCTick(e,t){var i,o;const r=e.renderGroup??e.parentRenderGroup,s=((i=r==null?void 0:r.instructionSet)==null?void 0:i.gcTick)??-1;((r==null?void 0:r.gcTick)??0)===s&&(e._gcLastUsed=t,(o=e._onTouch)==null||o.call(e,t))}runOnResource(e,t,r){const s=e._gcData;return s.type==="renderable"&&this.updateRenderableGCTick(e,t),t-e._gcLastUsed<this.maxUnusedTime||!e.autoGarbageCollect?(this._managedResources[r]=e,s.index=r,r++):(e.unload(),e._gcData=null,e._gcLastUsed=-1,e.off("unload",this.removeResource,this)),r}_createHashClone(e,t){const r=Object.create(null);for(const s in e){if(s===t)break;e[s]!==null&&(r[s]=e[s])}return r}runOnHash(e,t){var l;const{context:r,hash:s,type:i}=e,o=r[s];let a=null,u=0;for(const c in o){const h=o[c];if(h===null){u++,u===1e4&&!a&&(a=this._createHashClone(o,c));continue}if(h._gcLastUsed===-1){h._gcLastUsed=t,(l=h._onTouch)==null||l.call(h,t),a&&(a[c]=h);continue}i==="renderable"&&this.updateRenderableGCTick(h,t),!(t-h._gcLastUsed<this.maxUnusedTime)&&h.autoGarbageCollect?(a||(u+1!==1e4?(o[c]=null,u++):a=this._createHashClone(o,c)),h.unload(),h._gcData=null,h._gcLastUsed=-1):a&&(a[c]=h)}a&&(r[s]=a)}destroy(){this.enabled=!1,this._managedResources.forEach(e=>{e.off("unload",this.removeResource,this)}),this._managedResources.length=0,this._managedResourceHashes.length=0,this._renderer=null}};Xu.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"gc",priority:0},Xu.defaultOptions={gcActive:!0,gcMaxUnusedTime:6e4,gcFrequency:3e4};let wg=Xu;function Tv(n,e,t,r){t[r++]=(n>>16&255)/255,t[r++]=(n>>8&255)/255,t[r++]=(n&255)/255,t[r++]=e}function jr(n,e,t){const r=(n>>24&255)/255;e[t++]=(n&255)/255*r,e[t++]=(n>>8&255)/255*r,e[t++]=(n>>16&255)/255*r,e[t++]=r}class $u{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({size:e,projectionMatrix:t,worldTransformMatrix:r,worldColor:s,offset:i}){const o=this._renderer.renderTarget.renderTarget,a=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{worldTransformMatrix:new H,worldColor:4294967295,offset:new ie},u={projectionMatrix:t||this._renderer.renderTarget.projectionMatrix,resolution:e||o.size,worldTransformMatrix:r||a.worldTransformMatrix,worldColor:s||a.worldColor,offset:i||a.offset,bindGroup:null},l=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(l);const c=l.uniforms;c.uProjectionMatrix=u.projectionMatrix,c.uResolution=u.resolution,c.uWorldTransformMatrix.copyFrom(u.worldTransformMatrix),c.uWorldTransformMatrix.tx-=u.offset.x,c.uWorldTransformMatrix.ty-=u.offset.y,jr(u.worldColor,c.uWorldColorAlpha,0),l.update();let h;this._renderer.renderPipes.uniformBatch?h=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(l,!1):(h=this._bindGroupPool.pop()||new Tt,this._activeBindGroups.push(h),h.setResource(l,0)),u.bindGroup=h,this._currentGlobalUniformData=u}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1],this._renderer.type===$e.WEBGL&&this._currentGlobalUniformData.bindGroup.resources[0].update()}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get globalUniformData(){return this._currentGlobalUniformData}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new Ce({uProjectionMatrix:{value:new H,type:"mat3x3<f32>"},uWorldTransformMatrix:{value:new H,type:"mat3x3<f32>"},uWorldColorAlpha:{value:new Float32Array(4),type:"vec4<f32>"},uResolution:{value:[0,0],type:"vec2<f32>"}},{isStatic:!0})}destroy(){this._renderer=null,this._globalUniformDataStack.length=0,this._uniformsPool.length=0,this._activeUniforms.length=0,this._bindGroupPool.length=0,this._activeBindGroups.length=0,this._currentGlobalUniformData=null}}$u.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"globalUniforms"};let Cv=1;class Yu{constructor(){this._tasks=[],this._offset=0}init(){Re.system.add(this._update,this)}repeat(e,t,r=!0){const s=Cv++;let i=0;return r&&(this._offset+=1e3,i=this._offset),this._tasks.push({func:e,duration:t,start:performance.now(),offset:i,last:performance.now(),repeat:!0,id:s}),s}cancel(e){for(let t=0;t<this._tasks.length;t++)if(this._tasks[t].id===e){this._tasks.splice(t,1);return}}_update(){const e=performance.now();for(let t=0;t<this._tasks.length;t++){const r=this._tasks[t];if(e-r.offset-r.last>=r.duration){const s=e-r.start;r.func(s),r.last=e}}}destroy(){Re.system.remove(this._update,this),this._tasks.length=0}}Yu.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"scheduler",priority:0};let Eg=!1;function Pg(n){if(!Eg){if(Q.get().getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${Sn} (${n}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${Sn} - ${n} - http://www.pixijs.com/`);Eg=!0}}class xi{constructor(e){this._renderer=e}init(e){if(e.hello){let t=this._renderer.name;this._renderer.type===$e.WEBGL&&(t+=` ${this._renderer.context.webGLVersion}`),Pg(t)}}}xi.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"hello",priority:-2},xi.defaultOptions={hello:!1};function Bg(n){let e=!1;for(const r in n)if(n[r]==null){e=!0;break}if(!e)return n;const t=Object.create(null);for(const r in n){const s=n[r];s&&(t[r]=s)}return t}function Rg(n){let e=0;for(let t=0;t<n.length;t++)n[t]==null?e++:n[t-e]=n[t];return n.length-=e,n}let Av=0;const qu=class Kx{constructor(e){this._managedRenderables=[],this._managedHashes=[],this._managedArrays=[],this._renderer=e}init(e){e={...Kx.defaultOptions,...e},this.maxUnusedTime=e.renderableGCMaxUnusedTime,this._frequency=e.renderableGCFrequency,this.enabled=e.renderableGCActive}get enabled(){return!!this._handler}set enabled(e){this.enabled!==e&&(e?(this._handler=this._renderer.scheduler.repeat(()=>this.run(),this._frequency,!1),this._hashHandler=this._renderer.scheduler.repeat(()=>{for(const t of this._managedHashes)t.context[t.hash]=Bg(t.context[t.hash])},this._frequency),this._arrayHandler=this._renderer.scheduler.repeat(()=>{for(const t of this._managedArrays)Rg(t.context[t.hash])},this._frequency)):(this._renderer.scheduler.cancel(this._handler),this._renderer.scheduler.cancel(this._hashHandler),this._renderer.scheduler.cancel(this._arrayHandler)))}addManagedHash(e,t){this._managedHashes.push({context:e,hash:t})}addManagedArray(e,t){this._managedArrays.push({context:e,hash:t})}prerender({container:e}){this._now=performance.now(),e.renderGroup.gcTick=Av++,this._updateInstructionGCTick(e.renderGroup,e.renderGroup.gcTick)}addRenderable(e){this.enabled&&(e._lastUsed===-1&&(this._managedRenderables.push(e),e.once("destroyed",this._removeRenderable,this)),e._lastUsed=this._now)}run(){var i;const e=this._now,t=this._managedRenderables,r=this._renderer.renderPipes;let s=0;for(let o=0;o<t.length;o++){const a=t[o];if(a===null){s++;continue}const u=a.renderGroup??a.parentRenderGroup,l=((i=u==null?void 0:u.instructionSet)==null?void 0:i.gcTick)??-1;if(((u==null?void 0:u.gcTick)??0)===l&&(a._lastUsed=e),e-a._lastUsed>this.maxUnusedTime){if(!a.destroyed){const c=r;u&&(u.structureDidChange=!0),c[a.renderPipeId].destroyRenderable(a)}a._lastUsed=-1,s++,a.off("destroyed",this._removeRenderable,this)}else t[o-s]=a}t.length-=s}destroy(){this.enabled=!1,this._renderer=null,this._managedRenderables.length=0,this._managedHashes.length=0,this._managedArrays.length=0}_removeRenderable(e){const t=this._managedRenderables.indexOf(e);t>=0&&(e.off("destroyed",this._removeRenderable,this),this._managedRenderables[t]=null)}_updateInstructionGCTick(e,t){e.instructionSet.gcTick=t;for(const r of e.renderGroupChildren)this._updateInstructionGCTick(r,t)}};qu.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"renderableGC",priority:0},qu.defaultOptions={renderableGCActive:!0,renderableGCMaxUnusedTime:6e4,renderableGCFrequency:3e4};let Dg=qu;const ju=class Mi{get count(){return this._renderer.tick}get checkCount(){return this._checkCount}set checkCount(e){L("8.15.0","TextureGCSystem.run is deprecated, please use the GCSystem instead."),this._checkCount=e}get maxIdle(){return this._renderer.gc.maxUnusedTime/1e3*60}set maxIdle(e){L("8.15.0","TextureGCSystem.run is deprecated, please use the GCSystem instead."),this._renderer.gc.maxUnusedTime=e/60*1e3}get checkCountMax(){return Math.floor(this._renderer.gc._frequency/1e3)}set checkCountMax(e){L("8.15.0","TextureGCSystem.run is deprecated, please use the GCSystem instead.")}get active(){return this._renderer.gc.enabled}set active(e){L("8.15.0","TextureGCSystem.run is deprecated, please use the GCSystem instead."),this._renderer.gc.enabled=e}constructor(e){this._renderer=e,this._checkCount=0}init(e){e.textureGCActive!==Mi.defaultOptions.textureGCActive&&(this.active=e.textureGCActive),e.textureGCMaxIdle!==Mi.defaultOptions.textureGCMaxIdle&&(this.maxIdle=e.textureGCMaxIdle),e.textureGCCheckCountMax!==Mi.defaultOptions.textureGCCheckCountMax&&(this.checkCountMax=e.textureGCCheckCountMax)}run(){L("8.15.0","TextureGCSystem.run is deprecated, please use the GCSystem instead."),this._renderer.gc.run()}destroy(){this._renderer=null}};ju.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"textureGC"},ju.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:null,textureGCMaxIdle:3600,textureGCCheckCountMax:600};let Mg=ju;const Ku=class Zx{get autoDensity(){return this.texture.source.autoDensity}set autoDensity(e){this.texture.source.autoDensity=e}get resolution(){return this.texture.source._resolution}set resolution(e){this.texture.source.resize(this.texture.source.width,this.texture.source.height,e)}init(e){e={...Zx.defaultOptions,...e},e.view&&(L(j,"ViewSystem.view has been renamed to ViewSystem.canvas"),e.canvas=e.view),this.screen=new ne(0,0,e.width,e.height),this.canvas=e.canvas||Q.get().createCanvas(),this.antialias=!!e.antialias,this.texture=bu(this.canvas,e),this.renderTarget=new ci({colorTextures:[this.texture],depth:!!e.depth,isRoot:!0}),this.texture.source.transparent=e.backgroundAlpha<1,this.resolution=e.resolution}resize(e,t,r){this.texture.source.resize(e,t,r),this.screen.width=this.texture.frame.width,this.screen.height=this.texture.frame.height}destroy(e=!1){(typeof e=="boolean"?e:!!(e!=null&&e.removeView))&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas),this.texture.destroy()}};Ku.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"view",priority:0},Ku.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};let Fg=Ku;const Zu=[Cg,$u,xi,Fg,ku,wg,Mg,Wu,Ag,Mo,Dg,Yu],Qu=[zu,eu,Lu,Iu,tu,nu,ru,Uu],wv=[...Zu,xu,Lm,Um,du,su,Du,vu,uu,Eu,wu,hu,cg,fu,cu],Ev=[...Qu],Pv=[Za,Fu,Mu],Ug=[],Ig=[],Og=[];$.handleByNamedList(T.WebGLSystem,Ug),$.handleByNamedList(T.WebGLPipes,Ig),$.handleByNamedList(T.WebGLPipesAdaptor,Og),$.add(...wv,...Ev,...Pv);class Gg extends bn{constructor(){const e={name:"webgl",type:$e.WEBGL,systems:Ug,renderPipes:Ig,renderPipeAdaptors:Og};super(e)}}const Bv=Object.freeze(Object.defineProperty({__proto__:null,WebGLRenderer:Gg},Symbol.toStringTag,{value:"Module"}));class Ju{constructor(e){this._hash=Object.create(null),this._renderer=e}contextChange(e){this._gpu=e}getBindGroup(e,t,r){return e._updateKey(),this._hash[e._key]||this._createBindGroup(e,t,r)}_createBindGroup(e,t,r){const s=this._gpu.device,i=t.layout[r],o=[],a=this._renderer;for(const c in i){const h=e.resources[c]??e.resources[i[c]];let d;if(h._resourceType==="uniformGroup"){const f=h;a.ubo.updateUniformGroup(f);const g=f.buffer;d={buffer:a.buffer.getGPUBuffer(g),offset:0,size:g.descriptor.size}}else if(h._resourceType==="buffer"){const f=h;d={buffer:a.buffer.getGPUBuffer(f),offset:0,size:f.descriptor.size}}else if(h._resourceType==="bufferResource"){const f=h;d={buffer:a.buffer.getGPUBuffer(f.buffer),offset:f.offset,size:f.size}}else if(h._resourceType==="textureSampler"){const f=h;d=a.texture.getGpuSampler(f)}else if(h._resourceType==="textureSource"){const f=h;d=a.texture.getGpuSource(f).createView()}o.push({binding:i[c],resource:d})}const u=a.shader.getProgramData(t).bindGroups[r],l=s.createBindGroup({layout:u,entries:o});return this._hash[e._key]=l,l}destroy(){this._hash=null,this._renderer=null}}Ju.extension={type:[T.WebGPUSystem],name:"bindGroup"};class kg{constructor(e){this.gpuBuffer=e}destroy(){this.gpuBuffer.destroy(),this.gpuBuffer=null}}class el{constructor(e){this._renderer=e,this._managedBuffers=new je({renderer:e,type:"resource",onUnload:this.onBufferUnload.bind(this),name:"gpuBuffer"})}contextChange(e){this._gpu=e}getGPUBuffer(e){var t;return e._gcLastUsed=this._renderer.gc.now,((t=e._gpuData[this._renderer.uid])==null?void 0:t.gpuBuffer)||this.createGPUBuffer(e)}updateBuffer(e){const t=this.getGPUBuffer(e),r=e.data;return e._updateID&&r&&(e._updateID=0,this._gpu.device.queue.writeBuffer(t,0,r.buffer,0,(e._updateSize||r.byteLength)+3&-4)),t}destroyAll(){this._managedBuffers.removeAll()}onBufferUnload(e){e.off("update",this.updateBuffer,this),e.off("change",this.onBufferChange,this)}createGPUBuffer(e){const t=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e._resourceId=ae("resource"),e.data&&(Rs(e.data.buffer,t.getMappedRange()),t.unmap()),e._gpuData[this._renderer.uid]=new kg(t),this._managedBuffers.add(e)&&(e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this)),t}onBufferChange(e){this._managedBuffers.remove(e),e._updateID=0,this.createGPUBuffer(e)}destroy(){this._managedBuffers.destroy(),this._renderer=null,this._gpu=null}}el.extension={type:[T.WebGPUSystem],name:"buffer"};class Lg{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const t=this.byteIndex;let r=t+e*4;if(r=Math.ceil(r/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,r>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=r,t}addGroup(e){const t=this.addEmptyGroup(e.length);for(let r=0;r<e.length;r++)this.data[t/4+r]=e[r];return t}destroy(){this.data=null}}class tl{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){this._renderer=null,this._colorMaskCache=null}}tl.extension={type:[T.WebGPUSystem],name:"colorMask"};class bi{constructor(e){this._renderer=e}async init(e){return this._initPromise?this._initPromise:(this._initPromise=(e.gpu?Promise.resolve(e.gpu):this._createDeviceAndAdaptor(e)).then(t=>{this.gpu=t,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async _createDeviceAndAdaptor(e){const t=await Q.get().getNavigator().gpu.requestAdapter({powerPreference:e.powerPreference,forceFallbackAdapter:e.forceFallbackAdapter}),r=["texture-compression-bc","texture-compression-astc","texture-compression-etc2"].filter(i=>t.features.has(i)),s=await t.requestDevice({requiredFeatures:r});return{adapter:t,device:s}}destroy(){this.gpu=null,this._renderer=null}}bi.extension={type:[T.WebGPUSystem],name:"device"},bi.defaultOptions={powerPreference:void 0,forceFallbackAdapter:!1};class rl{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}renderStart(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e){this.endRenderPass(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(e.descriptor)}endRenderPass(){this.renderPassEncoder&&this.renderPassEncoder.end(),this.renderPassEncoder=null}setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,t,r,s){const i=this._renderer.pipeline.getPipeline(e,t,r,s);this.setPipeline(i)}setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,t){this._boundVertexBuffer[e]!==t&&(this._boundVertexBuffer[e]=t,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(t)))}_setIndexBuffer(e){if(this._boundIndexBuffer===e)return;this._boundIndexBuffer=e;const t=e.data.BYTES_PER_ELEMENT===2?"uint16":"uint32";this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),t)}resetBindGroup(e){this._boundBindGroup[e]=null}setBindGroup(e,t,r){if(this._boundBindGroup[e]===t)return;this._boundBindGroup[e]=t,t._touch(this._renderer.gc.now,this._renderer.tick);const s=this._renderer.bindGroup.getBindGroup(t,r,e);this.renderPassEncoder.setBindGroup(e,s)}setGeometry(e,t){const r=this._renderer.pipeline.getBufferNamesToBind(e,t);for(const s in r)this._setVertexBuffer(parseInt(s,10),e.attributes[r[s]].buffer);e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,t){for(const r in e.groups){const s=e.groups[r];t||this._syncBindGroup(s),this.setBindGroup(r,s,e.gpuProgram)}}_syncBindGroup(e){for(const t in e.resources){const r=e.resources[t];r.isUniformGroup&&this._renderer.ubo.updateUniformGroup(r)}}draw(e){const{geometry:t,shader:r,state:s,topology:i,size:o,start:a,instanceCount:u,skipSync:l}=e;this.setPipelineFromGeometryProgramAndState(t,r.gpuProgram,s,i),this.setGeometry(t,r.gpuProgram),this._setShaderBindGroups(r,l),t.indexBuffer?this.renderPassEncoder.drawIndexed(o||t.indexBuffer.data.length,u??t.instanceCount,a||0):this.renderPassEncoder.draw(o||t.getSize(),u??t.instanceCount,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished(),this.commandEncoder=null}restoreRenderPass(){const e=this._renderer.renderTarget.adaptor.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const t=this._boundPipeline,r={...this._boundVertexBuffer},s=this._boundIndexBuffer,i={...this._boundBindGroup};this._clearCache();const o=this._renderer.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this.setPipeline(t);for(const a in r)this._setVertexBuffer(a,r[a]);for(const a in i)this.setBindGroup(a,i[a],null);this._setIndexBuffer(s)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){this._renderer=null,this._gpu=null,this._boundBindGroup=null,this._boundVertexBuffer=null,this._boundIndexBuffer=null,this._boundPipeline=null}contextChange(e){this._gpu=e}}rl.extension={type:[T.WebGPUSystem],name:"encoder",priority:1};class nl{constructor(e){this._renderer=e}contextChange(){this.maxTextures=this._renderer.device.gpu.device.limits.maxSampledTexturesPerShaderStage,this.maxBatchableTextures=this.maxTextures}destroy(){}}nl.extension={type:[T.WebGPUSystem],name:"limits"};class sl{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:ve.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const r=this._renderTargetStencilState[this._activeRenderTarget.uid];r.stencilMode=e,r.stencilReference=t;const s=this._renderer;s.pipeline.setStencilMode(e),s.encoder.renderPassEncoder.setStencilReference(t)}destroy(){this._renderer.renderTarget.onRenderTargetChange.remove(this),this._renderer=null,this._activeRenderTarget=null,this._renderTargetStencilState=null}}sl.extension={type:[T.WebGPUSystem],name:"stencil"};const qn={i32:{align:4,size:4},u32:{align:4,size:4},f32:{align:4,size:4},f16:{align:2,size:2},"vec2<i32>":{align:8,size:8},"vec2<u32>":{align:8,size:8},"vec2<f32>":{align:8,size:8},"vec2<f16>":{align:4,size:4},"vec3<i32>":{align:16,size:12},"vec3<u32>":{align:16,size:12},"vec3<f32>":{align:16,size:12},"vec3<f16>":{align:8,size:6},"vec4<i32>":{align:16,size:16},"vec4<u32>":{align:16,size:16},"vec4<f32>":{align:16,size:16},"vec4<f16>":{align:8,size:8},"mat2x2<f32>":{align:8,size:16},"mat2x2<f16>":{align:4,size:8},"mat3x2<f32>":{align:8,size:24},"mat3x2<f16>":{align:4,size:12},"mat4x2<f32>":{align:8,size:32},"mat4x2<f16>":{align:4,size:16},"mat2x3<f32>":{align:16,size:32},"mat2x3<f16>":{align:8,size:16},"mat3x3<f32>":{align:16,size:48},"mat3x3<f16>":{align:8,size:24},"mat4x3<f32>":{align:16,size:64},"mat4x3<f16>":{align:8,size:32},"mat2x4<f32>":{align:16,size:32},"mat2x4<f16>":{align:8,size:16},"mat3x4<f32>":{align:16,size:48},"mat3x4<f16>":{align:8,size:24},"mat4x4<f32>":{align:16,size:64},"mat4x4<f16>":{align:8,size:32}};function Ng(n){const e=n.map(r=>({data:r,offset:0,size:0}));let t=0;for(let r=0;r<e.length;r++){const s=e[r];let i=qn[s.data.type].size;const o=qn[s.data.type].align;if(!qn[s.data.type])throw new Error(`[Pixi.js] WebGPU UniformBuffer: Unknown type ${s.data.type}`);s.data.size>1&&(i=Math.max(i,o)*s.data.size),t=Math.ceil(t/o)*o,s.size=i,s.offset=t,t+=i}return t=Math.ceil(t/16)*16,{uboElements:e,size:t}}function zg(n,e){const{size:t,align:r}=qn[n.data.type],s=(r-t)/4,i=n.data.type.indexOf("i32")>=0?"dataInt32":"data";return`
         v = uv.${n.data.name};
         ${e!==0?`offset += ${e};`:""}

         arrayOffset = offset;

         t = 0;

         for(var i=0; i < ${n.data.size*(t/4)}; i++)
         {
             for(var j = 0; j < ${t/4}; j++)
             {
                 ${i}[arrayOffset++] = v[t++];
             }
             ${s!==0?`arrayOffset += ${s};`:""}
         }
     `}function Hg(n){return gu(n,"uboWgsl",zg,Hm)}class il extends pu{constructor(){super({createUboElements:Ng,generateUboSync:Hg})}}il.extension={type:[T.WebGPUSystem],name:"ubo"};const $t=128;class ol{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._batchBuffer=new Lg({minUniformOffsetAlignment:$t});const t=256/$t;for(let r=0;r<t;r++){let s=te.UNIFORM|te.COPY_DST;r===0&&(s|=te.COPY_SRC),this._buffers.push(new qe({data:this._batchBuffer.data,usage:s}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){this._bindGroupHash=Object.create(null),this._batchBuffer.clear()}getUniformBindGroup(e,t){if(!t&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.ubo.ensureUniformGroup(e);const r=e.buffer.data,s=this._batchBuffer.addEmptyGroup(r.length);return this._renderer.ubo.syncUniformGroup(e,this._batchBuffer.data,s/4),this._bindGroupHash[e.uid]=this._getBindGroup(s/$t),this._bindGroupHash[e.uid]}getUboResource(e){this._renderer.ubo.updateUniformGroup(e);const t=e.buffer.data,r=this._batchBuffer.addGroup(t);return this._getBufferResource(r/$t)}getArrayBindGroup(e){const t=this._batchBuffer.addGroup(e);return this._getBindGroup(t/$t)}getArrayBufferResource(e){const r=this._batchBuffer.addGroup(e)/$t;return this._getBufferResource(r)}_getBufferResource(e){if(!this._bufferResources[e]){const t=this._buffers[e%2];this._bufferResources[e]=new hi({buffer:t,offset:(e/2|0)*256,size:$t})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){const t=new Tt({0:this._getBufferResource(e)});this._bindGroups[e]=t}return this._bindGroups[e]}_uploadBindGroups(){const e=this._renderer.buffer,t=this._buffers[0];t.update(this._batchBuffer.byteIndex),e.updateBuffer(t);const r=this._renderer.gpu.device.createCommandEncoder();for(let s=1;s<this._buffers.length;s++){const i=this._buffers[s];r.copyBufferToBuffer(e.getGPUBuffer(t),$t,e.getGPUBuffer(i),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([r.finish()])}destroy(){var e;for(let t=0;t<this._bindGroups.length;t++)(e=this._bindGroups[t])==null||e.destroy();this._bindGroups=null,this._bindGroupHash=null;for(let t=0;t<this._buffers.length;t++)this._buffers[t].destroy();this._buffers=null;for(let t=0;t<this._bufferResources.length;t++)this._bufferResources[t].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._renderer=null}}ol.extension={type:[T.WebGPUPipes],name:"uniformBatch"};const Rv={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function Dv(n,e,t,r,s){return n<<24|e<<16|t<<10|r<<5|s}function Mv(n,e,t,r,s){return t<<8|n<<5|r<<3|s<<1|e}class al{constructor(e){this._moduleCache=Object.create(null),this._bufferLayoutsCache=Object.create(null),this._bindingNamesCache=Object.create(null),this._pipeCache=Object.create(null),this._pipeStateCaches=Object.create(null),this._colorMask=15,this._multisampleCount=1,this._colorTargetCount=1,this._renderer=e}contextChange(e){this._gpu=e,this.setStencilMode(ve.DISABLED),this._updatePipeHash()}setMultisampleCount(e){this._multisampleCount!==e&&(this._multisampleCount=e,this._updatePipeHash())}setRenderTarget(e){this._multisampleCount=e.msaaSamples,this._depthStencilAttachment=e.descriptor.depthStencilAttachment?1:0,this._colorTargetCount=e.colorTargetCount,this._updatePipeHash()}setColorMask(e){this._colorMask!==e&&(this._colorMask=e,this._updatePipeHash())}setStencilMode(e){this._stencilMode!==e&&(this._stencilMode=e,this._stencilState=It[e],this._updatePipeHash())}setPipeline(e,t,r,s){const i=this.getPipeline(e,t,r);s.setPipeline(i)}getPipeline(e,t,r,s){e._layoutKey||(ou(e,t.attributeData),this._generateBufferKey(e)),s||(s=e.topology);const i=Dv(e._layoutKey,t._layoutKey,r.data,r._blendModeId,Rv[s]);return this._pipeCache[i]?this._pipeCache[i]:(this._pipeCache[i]=this._createPipeline(e,t,r,s),this._pipeCache[i])}_createPipeline(e,t,r,s){const i=this._gpu.device,o=this._createVertexBufferLayouts(e,t),a=this._renderer.state.getColorTargets(r,this._colorTargetCount),u=this._stencilMode===ve.RENDERING_MASK_ADD?0:this._colorMask;for(let d=0;d<a.length;d++)a[d].writeMask=u;const l=this._renderer.shader.getProgramData(t).pipeline,c={vertex:{module:this._getModule(t.vertex.source),entryPoint:t.vertex.entryPoint,buffers:o},fragment:{module:this._getModule(t.fragment.source),entryPoint:t.fragment.entryPoint,targets:a},primitive:{topology:s,cullMode:r.cullMode},layout:l,multisample:{count:this._multisampleCount},label:"PIXI Pipeline"};return this._depthStencilAttachment&&(c.depthStencil={...this._stencilState,format:"depth24plus-stencil8",depthWriteEnabled:r.depthTest,depthCompare:r.depthTest?"less":"always"}),i.createRenderPipeline(c)}_getModule(e){return this._moduleCache[e]||this._createModule(e)}_createModule(e){const t=this._gpu.device;return this._moduleCache[e]=t.createShaderModule({code:e}),this._moduleCache[e]}_generateBufferKey(e){const t=[];let r=0;const s=Object.keys(e.attributes).sort();for(let o=0;o<s.length;o++){const a=e.attributes[s[o]];t[r++]=a.offset,t[r++]=a.format,t[r++]=a.stride,t[r++]=a.instance}const i=t.join("|");return e._layoutKey=wr(i,"geometry"),e._layoutKey}_generateAttributeLocationsKey(e){const t=[];let r=0;const s=Object.keys(e.attributeData).sort();for(let o=0;o<s.length;o++){const a=e.attributeData[s[o]];t[r++]=a.location}const i=t.join("|");return e._attributeLocationsKey=wr(i,"programAttributes"),e._attributeLocationsKey}getBufferNamesToBind(e,t){const r=e._layoutKey<<16|t._attributeLocationsKey;if(this._bindingNamesCache[r])return this._bindingNamesCache[r];const s=this._createVertexBufferLayouts(e,t),i=Object.create(null),o=t.attributeData;for(let a=0;a<s.length;a++){const l=Object.values(s[a].attributes)[0].shaderLocation;for(const c in o)if(o[c].location===l){i[a]=c;break}}return this._bindingNamesCache[r]=i,i}_createVertexBufferLayouts(e,t){t._attributeLocationsKey||this._generateAttributeLocationsKey(t);const r=e._layoutKey<<16|t._attributeLocationsKey;if(this._bufferLayoutsCache[r])return this._bufferLayoutsCache[r];const s=[];return e.buffers.forEach(i=>{const o={arrayStride:0,stepMode:"vertex",attributes:[]},a=o.attributes;for(const u in t.attributeData){const l=e.attributes[u];(l.divisor??1)!==1&&X(`Attribute ${u} has an invalid divisor value of '${l.divisor}'. WebGPU only supports a divisor value of 1`),l.buffer===i&&(o.arrayStride=l.stride,o.stepMode=l.instance?"instance":"vertex",a.push({shaderLocation:t.attributeData[u].location,offset:l.offset,format:l.format}))}a.length&&s.push(o)}),this._bufferLayoutsCache[r]=s,s}_updatePipeHash(){const e=Mv(this._stencilMode,this._multisampleCount,this._colorMask,this._depthStencilAttachment,this._colorTargetCount);this._pipeStateCaches[e]||(this._pipeStateCaches[e]=Object.create(null)),this._pipeCache=this._pipeStateCaches[e]}destroy(){this._renderer=null,this._bufferLayoutsCache=null}}al.extension={type:[T.WebGPUSystem],name:"pipeline"};class Vg{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}class Wg{init(e,t){this._renderer=e,this._renderTargetSystem=t}copyToTexture(e,t,r,s,i){const o=this._renderer,a=this._getGpuColorTexture(e),u=o.texture.getGpuSource(t.source);return o.encoder.commandEncoder.copyTextureToTexture({texture:a,origin:r},{texture:u,origin:i},s),t}startRenderPass(e,t=!0,r,s){const o=this._renderTargetSystem.getGpuRenderTarget(e),a=this.getDescriptor(e,t,r);o.descriptor=a,this._renderer.pipeline.setRenderTarget(o),this._renderer.encoder.beginRenderPass(o),this._renderer.encoder.setViewport(s)}finishRenderPass(){this._renderer.encoder.endRenderPass()}_getGpuColorTexture(e){const t=this._renderTargetSystem.getGpuRenderTarget(e);return t.contexts[0]?t.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,t,r){typeof t=="boolean"&&(t=t?Ye.ALL:Ye.NONE);const s=this._renderTargetSystem,i=s.getGpuRenderTarget(e),o=e.colorTextures.map((l,c)=>{const h=i.contexts[c];let d,f;h?d=h.getCurrentTexture().createView():d=this._renderer.texture.getGpuSource(l).createView({mipLevelCount:1}),i.msaaTextures[c]&&(f=d,d=this._renderer.texture.getTextureView(i.msaaTextures[c]));const g=t&Ye.COLOR?"clear":"load";return r??(r=s.defaultClearColor),{view:d,resolveTarget:f,clearValue:r,storeOp:"store",loadOp:g}});let a;if((e.stencil||e.depth)&&!e.depthStencilTexture&&(e.ensureDepthStencilTexture(),e.depthStencilTexture.source.sampleCount=i.msaa?4:1),e.depthStencilTexture){const l=t&Ye.STENCIL?"clear":"load",c=t&Ye.DEPTH?"clear":"load";a={view:this._renderer.texture.getGpuSource(e.depthStencilTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:l,depthClearValue:1,depthLoadOp:c,depthStoreOp:"store"}}return{colorAttachments:o,depthStencilAttachment:a}}clear(e,t=!0,r,s){if(!t)return;const{gpu:i,encoder:o}=this._renderer,a=i.device;if(o.commandEncoder===null){const l=a.createCommandEncoder(),c=this.getDescriptor(e,t,r),h=l.beginRenderPass(c);h.setViewport(s.x,s.y,s.width,s.height,0,1),h.end();const d=l.finish();a.queue.submit([d])}else this.startRenderPass(e,t,r,s)}initGpuRenderTarget(e){e.isRoot=!0;const t=new Vg;return t.colorTargetCount=e.colorTextures.length,e.colorTextures.forEach((r,s)=>{if(r instanceof vt){const i=r.resource.getContext("webgpu"),o=r.transparent?"premultiplied":"opaque";try{i.configure({device:this._renderer.gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:o})}catch(a){console.error(a)}t.contexts[s]=i}if(t.msaa=r.source.antialias,r.source.antialias){const i=new fe({width:0,height:0,sampleCount:4});t.msaaTextures[s]=i}}),t.msaa&&(t.msaaSamples=4,e.depthStencilTexture&&(e.depthStencilTexture.source.sampleCount=4)),t}destroyGpuRenderTarget(e){e.contexts.forEach(t=>{t.unconfigure()}),e.msaaTextures.forEach(t=>{t.destroy()}),e.msaaTextures.length=0,e.contexts.length=0}ensureDepthStencilTexture(e){const t=this._renderTargetSystem.getGpuRenderTarget(e);e.depthStencilTexture&&t.msaa&&(e.depthStencilTexture.source.sampleCount=4)}resizeGpuRenderTarget(e){const t=this._renderTargetSystem.getGpuRenderTarget(e);t.width=e.width,t.height=e.height,t.msaa&&e.colorTextures.forEach((r,s)=>{const i=t.msaaTextures[s];i==null||i.resize(r.source.width,r.source.height,r.source._resolution)})}}class ul extends yu{constructor(e){super(e),this.adaptor=new Wg,this.adaptor.init(e,this)}}ul.extension={type:[T.WebGPUSystem],name:"renderTarget"};class ll{constructor(){this._gpuProgramData=Object.create(null)}contextChange(e){this._gpu=e}getProgramData(e){return this._gpuProgramData[e._layoutKey]||this._createGPUProgramData(e)}_createGPUProgramData(e){const t=this._gpu.device,r=e.gpuLayout.map(i=>t.createBindGroupLayout({entries:i})),s={bindGroupLayouts:r};return this._gpuProgramData[e._layoutKey]={bindGroups:r,pipeline:t.createPipelineLayout(s)},this._gpuProgramData[e._layoutKey]}destroy(){this._gpu=null,this._gpuProgramData=null}}ll.extension={type:[T.WebGPUSystem],name:"shader"};const He={};He.normal={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},He.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}},He.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}},He.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},He.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},He.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}},He["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},He["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}},He["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}},He.erase={alpha:{srcFactor:"zero",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"one-minus-src",operation:"add"}},He.min={alpha:{srcFactor:"one",dstFactor:"one",operation:"min"},color:{srcFactor:"one",dstFactor:"one",operation:"min"}},He.max={alpha:{srcFactor:"one",dstFactor:"one",operation:"max"},color:{srcFactor:"one",dstFactor:"one",operation:"max"}};class cl{constructor(){this.defaultState=new st,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e,t){const r=He[e.blendMode]||He.normal,s=[],i={format:"bgra8unorm",writeMask:0,blend:r};for(let o=0;o<t;o++)s[o]=i;return s}destroy(){this.gpu=null}}cl.extension={type:[T.WebGPUSystem],name:"state"};const Xg={type:"image",upload(n,e,t){const r=n.resource,s=(n.pixelWidth|0)*(n.pixelHeight|0),i=r.byteLength/s;t.device.queue.writeTexture({texture:e},r,{offset:0,rowsPerImage:n.pixelHeight,bytesPerRow:n.pixelWidth*i},{width:n.pixelWidth,height:n.pixelHeight,depthOrArrayLayers:1})}},hl={"bc1-rgba-unorm":{blockBytes:8,blockWidth:4,blockHeight:4},"bc2-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"bc3-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"bc7-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"etc1-rgb-unorm":{blockBytes:8,blockWidth:4,blockHeight:4},"etc2-rgba8unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"astc-4x4-unorm":{blockBytes:16,blockWidth:4,blockHeight:4}},Fv={blockBytes:4,blockWidth:1,blockHeight:1},$g={type:"compressed",upload(n,e,t){let r=n.pixelWidth,s=n.pixelHeight;const i=hl[n.format]||Fv;for(let o=0;o<n.resource.length;o++){const a=n.resource[o],u=Math.ceil(r/i.blockWidth)*i.blockBytes;t.device.queue.writeTexture({texture:e,mipLevel:o},a,{offset:0,bytesPerRow:u},{width:Math.ceil(r/i.blockWidth)*i.blockWidth,height:Math.ceil(s/i.blockHeight)*i.blockHeight,depthOrArrayLayers:1}),r=Math.max(r>>1,1),s=Math.max(s>>1,1)}}},dl={type:"image",upload(n,e,t){const r=n.resource;if(!r)return;if(globalThis.HTMLImageElement&&r instanceof HTMLImageElement){const a=Q.get().createCanvas(r.width,r.height);a.getContext("2d").drawImage(r,0,0,r.width,r.height),n.resource=a,X("ImageSource: Image element passed, converting to canvas and replacing resource.")}const s=Math.min(e.width,n.resourceWidth||n.pixelWidth),i=Math.min(e.height,n.resourceHeight||n.pixelHeight),o=n.alphaMode==="premultiply-alpha-on-upload";t.device.queue.copyExternalImageToTexture({source:r},{texture:e,premultipliedAlpha:o},{width:s,height:i})}},Yg={type:"video",upload(n,e,t){dl.upload(n,e,t)}};class qg{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let t=this.pipelines[e];return t||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
                        var<private> pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
                        vec2<f32>(-1.0, -1.0), vec2<f32>(-1.0, 3.0), vec2<f32>(3.0, -1.0));

                        struct VertexOutput {
                        @builtin(position) position : vec4<f32>,
                        @location(0) texCoord : vec2<f32>,
                        };

                        @vertex
                        fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
                        var output : VertexOutput;
                        output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
                        output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
                        return output;
                        }

                        @group(0) @binding(0) var imgSampler : sampler;
                        @group(0) @binding(1) var img : texture_2d<f32>;

                        @fragment
                        fn fragmentMain(@location(0) texCoord : vec2<f32>) -> @location(0) vec4<f32> {
                        return textureSample(img, imgSampler, texCoord);
                        }
                    `})),t=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=t),t}generateMipmap(e){const t=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let r=e;const s=e.depthOrArrayLayers||1,i=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!i){const u={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:s},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};r=this.device.createTexture(u)}const o=this.device.createCommandEncoder({}),a=t.getBindGroupLayout(0);for(let u=0;u<s;++u){let l=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:u,arrayLayerCount:1}),c=i?1:0;for(let h=1;h<e.mipLevelCount;++h){const d=r.createView({baseMipLevel:c++,mipLevelCount:1,dimension:"2d",baseArrayLayer:u,arrayLayerCount:1}),f=o.beginRenderPass({colorAttachments:[{view:d,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),g=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:l}]});f.setPipeline(t),f.setBindGroup(0,g),f.draw(3,1,0,0),f.end(),l=d}}if(!i){const u={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:s};for(let l=1;l<e.mipLevelCount;++l)o.copyTextureToTexture({texture:r,mipLevel:l-1},{texture:e,mipLevel:l},u),u.width=Math.ceil(u.width/2),u.height=Math.ceil(u.height/2)}return this.device.queue.submit([o.finish()]),i||r.destroy(),e}}class jg{constructor(e){this.textureView=null,this.gpuTexture=e}destroy(){this.gpuTexture.destroy(),this.textureView=null,this.gpuTexture=null}}class fl{constructor(e){this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._uploads={image:dl,buffer:Xg,video:Yg,compressed:$g},this._renderer=e,e.renderableGC.addManagedHash(this,"_bindGroupHash"),this._managedTextures=new je({renderer:e,type:"resource",onUnload:this.onSourceUnload.bind(this),name:"gpuTextureSource"})}get managedTextures(){return Object.values(this._managedTextures.items)}contextChange(e){this._gpu=e}initSource(e){var t;return((t=e._gpuData[this._renderer.uid])==null?void 0:t.gpuTexture)||this._initSource(e)}_initSource(e){if(e.autoGenerateMipmaps){const l=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(l))+1}let t=GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST;e.uploadMethodId!=="compressed"&&(t|=GPUTextureUsage.RENDER_ATTACHMENT,t|=GPUTextureUsage.COPY_SRC);const r=hl[e.format]||{blockWidth:1,blockHeight:1},s=Math.ceil(e.pixelWidth/r.blockWidth)*r.blockWidth,i=Math.ceil(e.pixelHeight/r.blockHeight)*r.blockHeight,o={label:e.label,size:{width:s,height:i},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:t},a=this._gpu.device.createTexture(o);return e._gpuData[this._renderer.uid]=new jg(a),this._managedTextures.add(e)&&(e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("updateMipmaps",this.onUpdateMipmaps,this)),this.onSourceUpdate(e),a}onSourceUpdate(e){const t=this.getGpuSource(e);t&&(this._uploads[e.uploadMethodId]&&this._uploads[e.uploadMethodId].upload(e,t,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&this.onUpdateMipmaps(e))}onUpdateMipmaps(e){this._mipmapGenerator||(this._mipmapGenerator=new qg(this._gpu.device));const t=this.getGpuSource(e);this._mipmapGenerator.generateMipmap(t)}onSourceUnload(e){e.off("update",this.onSourceUpdate,this),e.off("resize",this.onSourceResize,this),e.off("updateMipmaps",this.onUpdateMipmaps,this)}onSourceResize(e){e._gcLastUsed=this._renderer.gc.now;const t=e._gpuData[this._renderer.uid],r=t==null?void 0:t.gpuTexture;r?(r.width!==e.pixelWidth||r.height!==e.pixelHeight)&&(t.destroy(),this._bindGroupHash[e.uid]=null,e._gpuData[this._renderer.uid]=null,this.initSource(e)):this.initSource(e)}_initSampler(e){return this._gpuSamplers[e._resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e._resourceId]}getGpuSampler(e){return this._gpuSamplers[e._resourceId]||this._initSampler(e)}getGpuSource(e){var t;return e._gcLastUsed=this._renderer.gc.now,((t=e._gpuData[this._renderer.uid])==null?void 0:t.gpuTexture)||this.initSource(e)}getTextureBindGroup(e){return this._bindGroupHash[e.uid]||this._createTextureBindGroup(e)}_createTextureBindGroup(e){const t=e.source;return this._bindGroupHash[e.uid]=new Tt({0:t,1:t.style,2:new Ce({uTextureMatrix:{type:"mat3x3<f32>",value:e.textureMatrix.mapCoord}})}),this._bindGroupHash[e.uid]}getTextureView(e){const t=e.source;t._gcLastUsed=this._renderer.gc.now;let r=t._gpuData[this._renderer.uid],s=null;return r||(this.initSource(t),r=t._gpuData[this._renderer.uid]),s=r.textureView||r.gpuTexture.createView(),s}generateCanvas(e){const t=this._renderer,r=t.gpu.device.createCommandEncoder(),s=Q.get().createCanvas();s.width=e.source.pixelWidth,s.height=e.source.pixelHeight;const i=s.getContext("webgpu");return i.configure({device:t.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:Q.get().getNavigator().gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),r.copyTextureToTexture({texture:t.texture.getGpuSource(e.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:s.width,height:s.height}),t.gpu.device.queue.submit([r.finish()]),s}getPixels(e){const t=this.generateCanvas(e),r=At.getOptimalCanvasAndContext(t.width,t.height),s=r.context;s.drawImage(t,0,0);const{width:i,height:o}=t,a=s.getImageData(0,0,i,o),u=new Uint8ClampedArray(a.data.buffer);return At.returnCanvasAndContext(r),{pixels:u,width:i,height:o}}destroy(){this._managedTextures.destroy();for(const e of Object.keys(this._bindGroupHash)){const t=Number(e),r=this._bindGroupHash[t];r==null||r.destroy()}this._renderer=null,this._gpu=null,this._mipmapGenerator=null,this._gpuSamplers=null,this._bindGroupHash=null}}fl.extension={type:[T.WebGPUSystem],name:"texture"};class pl{constructor(){this._maxTextures=0}contextChange(e){const t=new Ce({uTransformMatrix:{value:new H,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}});this._maxTextures=e.limits.maxBatchableTextures;const r=Fr({name:"graphics",bits:[Ms,Us(this._maxTextures),Rm,Ir]});this.shader=new nt({gpuProgram:r,resources:{localUniforms:t}})}execute(e,t){const r=t.context,s=r.customShader||this.shader,i=e.renderer,o=i.graphicsContext,{batcher:a,instructions:u}=o.getContextRenderData(r),l=i.encoder;l.setGeometry(a.geometry,s.gpuProgram);const c=i.globalUniforms.bindGroup;l.setBindGroup(0,c,s.gpuProgram);const h=i.renderPipes.uniformBatch.getUniformBindGroup(s.resources.localUniforms,!0);l.setBindGroup(2,h,s.gpuProgram);const d=u.instructions;let f=null;for(let g=0;g<u.instructionSize;g++){const x=d[g];if(x.topology!==f&&(f=x.topology,l.setPipelineFromGeometryProgramAndState(a.geometry,s.gpuProgram,e.state,x.topology)),s.groups[1]=x.bindGroup,!x.gpuBindGroup){const p=x.textures;x.bindGroup=Bs(p.textures,p.count,this._maxTextures),x.gpuBindGroup=i.bindGroup.getBindGroup(x.bindGroup,s.gpuProgram,1)}l.setBindGroup(1,x.bindGroup,s.gpuProgram),l.renderPassEncoder.drawIndexed(x.size,1,x.start)}}destroy(){this.shader.destroy(!0),this.shader=null}}pl.extension={type:[T.WebGPUPipesAdaptor],name:"graphics"};class ml{init(){const e=Fr({name:"mesh",bits:[Yr,Dm,Ir]});this._shader=new nt({gpuProgram:e,resources:{uTexture:k.EMPTY._source,uSampler:k.EMPTY._source.style,textureUniforms:{uTextureMatrix:{type:"mat3x3<f32>",value:new H}}}})}execute(e,t){const r=e.renderer;let s=t._shader;if(!s)s=this._shader,s.groups[2]=r.texture.getTextureBindGroup(t.texture);else if(!s.gpuProgram){X("Mesh shader has no gpuProgram",t.shader);return}const i=s.gpuProgram;if(i.autoAssignGlobalUniforms&&(s.groups[0]=r.globalUniforms.bindGroup),i.autoAssignLocalUniforms){const o=e.localUniforms;s.groups[1]=r.renderPipes.uniformBatch.getUniformBindGroup(o,!0)}r.encoder.draw({geometry:t._geometry,shader:s,state:t.state})}destroy(){this._shader.destroy(!0),this._shader=null}}ml.extension={type:[T.WebGPUPipesAdaptor],name:"mesh"};const Uv=[...Zu,il,rl,bi,nl,el,fl,ul,ll,cl,al,tl,sl,Ju],Iv=[...Qu,ol],Ov=[Qa,ml,pl],Kg=[],Zg=[],Qg=[];$.handleByNamedList(T.WebGPUSystem,Kg),$.handleByNamedList(T.WebGPUPipes,Zg),$.handleByNamedList(T.WebGPUPipesAdaptor,Qg),$.add(...Uv,...Iv,...Ov);class Jg extends bn{constructor(){const e={name:"webgpu",type:$e.WEBGPU,systems:Kg,renderPipes:Zg,renderPipeAdaptors:Qg};super(e)}}const Gv=Object.freeze(Object.defineProperty({__proto__:null,WebGPURenderer:Jg},Symbol.toStringTag,{value:"Module"})),e_={POINTS:"point-list",LINES:"line-list",LINE_STRIP:"line-strip",TRIANGLES:"triangle-list",TRIANGLE_STRIP:"triangle-strip"},kv=new Proxy(e_,{get(n,e){return L(j,`DRAW_MODES.${e} is deprecated, use '${e_[e]}' instead`),n[e]}});var yi=(n=>(n.CLAMP="clamp-to-edge",n.REPEAT="repeat",n.MIRRORED_REPEAT="mirror-repeat",n))(yi||{});const Lv=new Proxy(yi,{get(n,e){return L(j,`DRAW_MODES.${e} is deprecated, use '${yi[e]}' instead`),n[e]}});var vi=(n=>(n.NEAREST="nearest",n.LINEAR="linear",n))(vi||{});const Nv=new Proxy(vi,{get(n,e){return L(j,`DRAW_MODES.${e} is deprecated, use '${vi[e]}' instead`),n[e]}});class zv{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}set(e,t,r){const s=t.width,i=t.height;if(r){const o=e.width/2/s,a=e.height/2/i,u=e.x/s+o,l=e.y/i+a;r=J.add(r,J.NW),this.x0=u+o*J.uX(r),this.y0=l+a*J.uY(r),r=J.add(r,2),this.x1=u+o*J.uX(r),this.y1=l+a*J.uY(r),r=J.add(r,2),this.x2=u+o*J.uX(r),this.y2=l+a*J.uY(r),r=J.add(r,2),this.x3=u+o*J.uX(r),this.y3=l+a*J.uY(r)}else this.x0=e.x/s,this.y0=e.y/i,this.x1=(e.x+e.width)/s,this.y1=e.y/i,this.x2=(e.x+e.width)/s,this.y2=(e.y+e.height)/i,this.x3=e.x/s,this.y3=(e.y+e.height)/i;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}toString(){return`[pixi.js/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`}}function Hv(n){const e=n.toString(),t=e.indexOf("{"),r=e.lastIndexOf("}");if(t===-1||r===-1)throw new Error("getFunctionBody: No body found in function definition");return e.slice(t+1,r).trim()}function Vv(n,e){return L("8.7.0","Use container.getFastGlobalBounds() instead"),n.getFastGlobalBounds(!0,e)}class Wv extends yt{constructor(e){typeof e=="function"&&(e={render:e});const{render:t,...r}=e;super({label:"RenderContainer",...r}),this.renderPipeId="customRender",this.batched=!1,t&&(this.render=t),this.containsPoint=e.containsPoint??(()=>!1),this.addBounds=e.addBounds??(()=>!1)}updateBounds(){this._bounds.clear(),this.addBounds(this._bounds)}render(e){}}function Xv(n,e,t){L("8.7.0","Please use container.collectRenderables instead.");const r=t.renderPipes?t:t.batch.renderer;return n.collectRenderables(e,r,null)}function $v(n,e){const t=e._scale,r=e._pivot,s=e._position,i=t._x,o=t._y,a=r._x,u=r._y;n.a=e._cx*i,n.b=e._sx*i,n.c=e._cy*o,n.d=e._sy*o,n.tx=s._x-(a*n.a+u*n.c),n.ty=s._y-(a*n.b+u*n.d)}function Yv(n,e,t){const r=n.a,s=n.b,i=n.c,o=n.d,a=n.tx,u=n.ty,l=e.a,c=e.b,h=e.c,d=e.d;t.a=r*l+s*h,t.b=r*c+s*d,t.c=i*l+o*h,t.d=i*c+o*d,t.tx=a*l+u*h+e.tx,t.ty=a*c+u*d+e.ty}class t_{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{Te.return(e)}),this.batches.length=0}}class gl{constructor(e,t){this.state=st.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this),this._managedGraphics=new je({renderer:e,type:"renderable",priority:-1,name:"graphics"})}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,s=this.renderer.graphicsContext.updateGpuContext(t);return!!(s.isBatchable||r!==s.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let s=0;s<r.length;s++){const i=r[s];i._batcher.updateElement(i)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const i=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const o=i.resources.localUniforms.uniforms;o.uTransformMatrix=e.groupTransform,o.uRound=t._roundPixels|e._roundPixels,jr(e.groupColorAlpha,o.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,s=this._getGpuDataForRenderable(e).batches;for(let i=0;i<s.length;i++){const o=s[i];r.addToBatch(o,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new t_;return e._gpuData[this.renderer.uid]=t,this._managedGraphics.add(e),t}_updateBatchesForRenderable(e,t){const r=e.context,s=this.renderer.graphicsContext.getGpuContext(r),i=this.renderer._roundPixels|e._roundPixels;t.batches=s.batches.map(o=>{const a=Te.get(Ls);return o.copyTo(a),a.renderable=e,a.roundPixels=i,a})}destroy(){this._managedGraphics.destroy(),this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}gl.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"graphics"};function qv(n){n instanceof mt&&(n={path:n,textureMatrix:null,out:null});const e=[],t=[],r=[],s=n.path.shapePath,i=n.textureMatrix;s.shapePrimitives.forEach(({shape:u,transform:l})=>{const c=r.length,h=e.length/2,d=[],f=kr[u.type];f.build(u,d),l&&ks(d,l),f.triangulate(d,e,2,h,r,c);const g=t.length/2;i?(l&&i.append(l.clone().invert()),jo(e,2,h,t,g,2,e.length/2-h,i)):Ko(t,g,2,e.length/2-h)});const o=n.out;return o?(o.positions=new Float32Array(e),o.uvs=new Float32Array(t),o.indices=new Uint32Array(r),o):new Wt({positions:new Float32Array(e),uvs:new Float32Array(t),indices:new Uint32Array(r)})}const r_=class Qx extends ce{constructor(e={}){e={...Qx.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const r=e[t];if(r.parentRenderLayer){if(r.parentRenderLayer===this)continue;r.parentRenderLayer.detach(r)}this.renderLayerChildren.push(r),r.parentRenderLayer=this;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const r=e[t],s=this.renderLayerChildren.indexOf(r);s!==-1&&this.renderLayerChildren.splice(s,1),r.parentRenderLayer=null;const i=this.renderGroup||this.parentRenderGroup;i&&(i.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,r){const s=this.renderLayerChildren,i=s.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let o=0;o<i;o++)s[o].parent||X("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",s[o]),s[o].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,r){if(!e)return;const s=this.renderLayerChildren;for(let i=0;i<s.length;i++)s[i]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};r_.defaultOptions={sortableChildren:!1,sortFunction:(n,e)=>n.zIndex-e.zIndex};let jv=r_;const n_=class Jx extends Wt{constructor(...e){super({});let t=e[0]??{};typeof t=="number"&&(L(j,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(e){e={...Jx.defaultOptions,...e},this.verticesX=this.verticesX??e.verticesX,this.verticesY=this.verticesY??e.verticesY,this.width=this.width??e.width,this.height=this.height??e.height;const t=this.verticesX*this.verticesY,r=[],s=[],i=[],o=this.verticesX-1,a=this.verticesY-1,u=this.width/o,l=this.height/a;for(let h=0;h<t;h++){const d=h%this.verticesX,f=h/this.verticesX|0;r.push(d*u,f*l),s.push(d/o,f/a)}const c=o*a;for(let h=0;h<c;h++){const d=h%o,f=h/o|0,g=f*this.verticesX+d,x=f*this.verticesX+d+1,p=(f+1)*this.verticesX+d,b=(f+1)*this.verticesX+d+1;i.push(g,x,p,x,b,p)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(s),this.indexBuffer.data=new Uint32Array(i),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};n_.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let Si=n_;function s_(n,e,t,r){const s=t.buffers[0],i=s.data,{verticesX:o,verticesY:a}=t,u=n/(o-1),l=e/(a-1);let c=0;const h=r[0],d=r[1],f=r[2],g=r[3],x=r[4],p=r[5],b=r[6],y=r[7],v=r[8];for(let C=0;C<i.length;C+=2){const D=c%o*u,B=(c/o|0)*l,w=h*D+d*B+f,O=g*D+x*B+p,A=b*D+y*B+v;i[C]=w/A,i[C+1]=O/A,c++}s.update()}function i_(n,e){const t=e[0],r=e[1],s=e[2],i=e[3],o=e[4],a=e[5],u=e[6],l=e[7],c=e[8];return n[0]=o*c-a*l,n[1]=s*l-r*c,n[2]=r*a-s*o,n[3]=a*u-i*c,n[4]=t*c-s*u,n[5]=s*i-t*a,n[6]=i*l-o*u,n[7]=r*u-t*l,n[8]=t*o-r*i,n}function o_(n,e,t){const r=e[0],s=e[1],i=e[2],o=e[3],a=e[4],u=e[5],l=e[6],c=e[7],h=e[8],d=t[0],f=t[1],g=t[2],x=t[3],p=t[4],b=t[5],y=t[6],v=t[7],C=t[8];return n[0]=d*r+f*o+g*l,n[1]=d*s+f*a+g*c,n[2]=d*i+f*u+g*h,n[3]=x*r+p*o+b*l,n[4]=x*s+p*a+b*c,n[5]=x*i+p*u+b*h,n[6]=y*r+v*o+C*l,n[7]=y*s+v*a+C*c,n[8]=y*i+v*u+C*h,n}function Kv(n,e,t){const r=t[0],s=t[1],i=t[2];return n[0]=e[0]*r+e[1]*s+e[2]*i,n[1]=e[3]*r+e[4]*s+e[5]*i,n[2]=e[6]*r+e[7]*s+e[8]*i,n}const Zv=[0,0,0,0,0,0,0,0,0],Qv=[0,0,0],Ti=[0,0,0];function a_(n,e,t,r,s,i,o,a,u){const l=Zv;l[0]=e,l[1]=r,l[2]=i,l[3]=t,l[4]=s,l[5]=o,l[6]=1,l[7]=1,l[8]=1;const c=i_(n,l);Ti[0]=a,Ti[1]=u,Ti[2]=1;const h=Kv(Qv,c,Ti),d=n;return n[0]=h[0],n[1]=0,n[2]=0,n[3]=0,n[4]=h[1],n[5]=0,n[6]=0,n[7]=0,n[8]=h[2],o_(n,d,l)}const Jv=[0,0,0,0,0,0,0,0,0],e1=[0,0,0,0,0,0,0,0,0];function u_(n,e,t,r,s,i,o,a,u,l,c,h,d,f,g,x,p){const b=a_(Jv,e,t,i,o,l,c,f,g),y=a_(e1,r,s,a,u,h,d,x,p);return o_(n,i_(b,b),y)}class l_ extends Si{constructor(e){super(e),this._projectionMatrix=[0,0,0,0,0,0,0,0,0];const{width:t,height:r}=e;this.corners=[0,0,t,0,t,r,0,r]}setCorners(e,t,r,s,i,o,a,u){const l=this.corners;l[0]=e,l[1]=t,l[2]=r,l[3]=s,l[4]=i,l[5]=o,l[6]=a,l[7]=u,this.updateProjection()}updateProjection(){const{width:e,height:t}=this,r=this.corners,s=u_(this._projectionMatrix,0,0,r[0],r[1],e,0,r[2],r[3],e,t,r[4],r[5],0,t,r[6],r[7]);s_(e,t,this,s)}}const c_=class eb extends Xr{constructor(e){e={...eb.defaultOptions,...e};const{texture:t,verticesX:r,verticesY:s,...i}=e,o=new l_(ht({width:t.width,height:t.height,verticesX:r,verticesY:s}));super(ht({...i,geometry:o})),this._texture=t,this.geometry.setCorners(e.x0,e.y0,e.x1,e.y1,e.x2,e.y2,e.x3,e.y3)}textureUpdated(){const e=this.geometry;if(!e)return;const{width:t,height:r}=this.texture;(e.width!==t||e.height!==r)&&(e.width=t,e.height=r,e.updateProjection())}set texture(e){this._texture!==e&&(super.texture=e,this.textureUpdated())}get texture(){return this._texture}setCorners(e,t,r,s,i,o,a,u){this.geometry.setCorners(e,t,r,s,i,o,a,u)}};c_.defaultOptions={texture:k.WHITE,verticesX:10,verticesY:10,x0:0,y0:0,x1:100,y1:0,x2:100,y2:100,x3:0,y3:100};let t1=c_;class r1 extends Xr{constructor(e){const{texture:t,verticesX:r,verticesY:s,...i}=e,o=new Si(ht({width:t.width,height:t.height,verticesX:r,verticesY:s}));super(ht({...i,geometry:o,texture:t})),this.texture=t,this.autoResize=!0}textureUpdated(){const e=this.geometry,{width:t,height:r}=this.texture;this.autoResize&&(e.width!==t||e.height!==r)&&(e.width=t,e.height=r,e.build({}))}set texture(e){var t;(t=this._texture)==null||t.off("update",this.textureUpdated,this),super.texture=e,e.on("update",this.textureUpdated,this),this.textureUpdated()}get texture(){return this._texture}destroy(e){this.texture.off("update",this.textureUpdated,this),super.destroy(e)}}const h_=class tb extends Wt{constructor(e){const{width:t,points:r,textureScale:s}={...tb.defaultOptions,...e};super({positions:new Float32Array(r.length*4),uvs:new Float32Array(r.length*4),indices:new Uint32Array((r.length-1)*6)}),this.points=r,this._width=t,this.textureScale=s,this._build()}get width(){return this._width}_build(){const e=this.points;if(!e)return;const t=this.getBuffer("aPosition"),r=this.getBuffer("aUV"),s=this.getIndex();if(e.length<1)return;t.data.length/4!==e.length&&(t.data=new Float32Array(e.length*4),r.data=new Float32Array(e.length*4),s.data=new Uint16Array((e.length-1)*6));const i=r.data,o=s.data;i[0]=0,i[1]=0,i[2]=0,i[3]=1;let a=0,u=e[0];const l=this._width*this.textureScale,c=e.length;for(let d=0;d<c;d++){const f=d*4;if(this.textureScale>0){const g=u.x-e[d].x,x=u.y-e[d].y,p=Math.sqrt(g*g+x*x);u=e[d],a+=p/l}else a=d/(c-1);i[f]=a,i[f+1]=0,i[f+2]=a,i[f+3]=1}let h=0;for(let d=0;d<c-1;d++){const f=d*2;o[h++]=f,o[h++]=f+1,o[h++]=f+2,o[h++]=f+2,o[h++]=f+1,o[h++]=f+3}r.update(),s.update(),this.updateVertices()}updateVertices(){const e=this.points;if(e.length<1)return;let t=e[0],r,s=0,i=0;const o=this.buffers[0].data,a=e.length,u=this.textureScale>0?this.textureScale*this._width/2:this._width/2;for(let l=0;l<a;l++){const c=e[l],h=l*4;l<e.length-1?r=e[l+1]:r=c,i=-(r.x-t.x),s=r.y-t.y;const d=Math.sqrt(s*s+i*i);d<1e-6?(s=0,i=0):(s/=d,i/=d,s*=u,i*=u),o[h]=c.x+s,o[h+1]=c.y+i,o[h+2]=c.x-s,o[h+3]=c.y-i,t=c}this.buffers[0].update()}update(){this.textureScale>0?this._build():this.updateVertices()}};h_.defaultOptions={width:200,points:[],textureScale:0};let d_=h_;const f_=class rb extends Xr{constructor(e){const{texture:t,points:r,textureScale:s,...i}={...rb.defaultOptions,...e},o=new d_(ht({width:t.height,points:r,textureScale:s}));s>0&&(t.source.style.addressMode="repeat"),super(ht({...i,texture:t,geometry:o})),this.autoUpdate=!0,this.onRender=this._render}_render(){const e=this.geometry;(this.autoUpdate||e._width!==this.texture.height)&&(e._width=this.texture.height,e.update())}};f_.defaultOptions={textureScale:0};let n1=f_;class s1 extends Xr{constructor(e){const{texture:t,vertices:r,uvs:s,indices:i,topology:o,...a}=e,u=new Wt(ht({positions:r,uvs:s,indices:i,topology:o}));super(ht({...a,texture:t,geometry:u})),this.autoUpdate=!0,this.onRender=this._render}get vertices(){return this.geometry.getBuffer("aPosition").data}set vertices(e){this.geometry.getBuffer("aPosition").data=e}_render(){this.autoUpdate&&this.geometry.getBuffer("aPosition").update()}}class Ci{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let s=r;const i=this.texture.textureMatrix;return i.isSimple||(s=this._transformedUvs,(this._textureMatrixUpdateId!==i._updateID||this._uvUpdateId!==t._updateID)&&((!s||s.length<r.length)&&(s=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=i._updateID,this._uvUpdateId=t._updateID,i.multiplyUvs(r,s))),s}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}function i1(n,e){const{width:t,height:r}=n.frame;return e.scale(1/t,1/r),e}class _l{destroy(){}}class xl{constructor(e,t){this.localUniforms=new Ce({uTransformMatrix:{value:new H,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Tt({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,s=e.batched;if(t.batched=s,r!==s)return!0;if(s){const i=e._geometry;if(i.indices.length!==t.indexSize||i.positions.length!==t.vertexSize)return t.indexSize=i.indices.length,t.vertexSize=i.positions.length,!0;const o=this._getBatchableMesh(e);return o.texture.uid!==e._texture.uid&&(o._textureMatrixUpdateId=-1),!o._batcher.checkAndUpdateTexture(o,e._texture)}return!1}addRenderable(e,t){var i,o;const r=this.renderer.renderPipes.batch,s=this._getMeshData(e);if(e.didViewUpdate&&(s.indexSize=(i=e._geometry.indices)==null?void 0:i.length,s.vertexSize=(o=e._geometry.positions)==null?void 0:o.length),s.batched){const a=this._getBatchableMesh(e);a.setTexture(e._texture),a.geometry=e._geometry,r.addToBatch(a,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=Dr(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),jr(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new _l),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new _l),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new Ci;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}xl.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"mesh"};class p_{execute(e,t){const r=e.state,s=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;const o=s.gl,a=e.getBuffers(t);s.shader.bind(i),s.state.set(r),s.geometry.bind(a.geometry,i.glProgram);const l=a.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?o.UNSIGNED_SHORT:o.UNSIGNED_INT;o.drawElements(o.TRIANGLES,t.particleChildren.length*6,l,0)}}class m_{execute(e,t){const r=e.renderer,s=t.shader||e.defaultShader;s.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),s.groups[1]=r.texture.getTextureBindGroup(t.texture);const i=e.state,o=e.getBuffers(t);r.encoder.draw({geometry:o.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}}function bl(n,e=null){const t=n*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,s=0;r<t;r+=6,s+=4)e[r+0]=s+0,e[r+1]=s+1,e[r+2]=s+2,e[r+3]=s+0,e[r+4]=s+2,e[r+5]=s+3;return e}function g_(n){return{dynamicUpdate:__(n,!0),staticUpdate:__(n,!1)}}function __(n,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const i in n){const o=n[i];if(e!==o.dynamic)continue;t.push(`offset = index + ${r}`),t.push(o.code);const a=Mt(o.format);r+=a.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const s=t.join(`
`);return new Function("ps","f32v","u32v",s)}class x_{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let s=0,i=0;for(const c in r){const h=r[c],d=Mt(h.format);h.dynamic?i+=d.stride:s+=d.stride}this._dynamicStride=i/4,this._staticStride=s/4,this.staticAttributeBuffer=new ir(t*4*s),this.dynamicAttributeBuffer=new ir(t*4*i),this.indexBuffer=bl(t);const o=new or;let a=0,u=0;this._staticBuffer=new qe({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:te.VERTEX|te.COPY_DST}),this._dynamicBuffer=new qe({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:te.VERTEX|te.COPY_DST});for(const c in r){const h=r[c],d=Mt(h.format);h.dynamic?(o.addAttribute(h.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:a*4,format:h.format}),a+=d.size):(o.addAttribute(h.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:u*4,format:h.format}),u+=d.size)}o.addIndex(this.indexBuffer);const l=this.getParticleUpdate(r);this._dynamicUpload=l.dynamicUpdate,this._staticUpload=l.staticUpdate,this.geometry=o}getParticleUpdate(e){const t=o1(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return g_(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new ir(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new ir(this._size*this._dynamicStride*4*4),this.indexBuffer=bl(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const s=this.staticAttributeBuffer;this._staticUpload(e,s.float32View,s.uint32View),this._staticBuffer.setDataWithSize(s.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function o1(n){const e=[];for(const t in n){const r=n[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var b_=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,y_=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,yl=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class v_ extends nt{constructor(){const e=be.from({vertex:y_,fragment:b_}),t=pe.from({fragment:{source:yl,entryPoint:"mainFragment"},vertex:{source:yl,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:k.WHITE.source,uSampler:new tt({}),uniforms:{uTranslationMatrix:{value:new H,type:"mat3x3<f32>"},uColor:{value:new ee(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class vl{constructor(e,t){this.state=st.for2d(),this.localUniforms=new Ce({uTranslationMatrix:{value:new H,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new v_,this.state=st.for2d(),this._managedContainers=new je({renderer:e,type:"renderable",name:"particleContainer"})}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new x_({size:e.particleChildren.length,properties:e._properties}),this._managedContainers.add(e),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,s=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const i=this.state;s.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=Dr(e.blendMode,e.texture._source);const o=this.localUniforms.uniforms,a=o.uTranslationMatrix;e.worldTransform.copyTo(a),a.prepend(r.globalUniforms.globalUniformData.projectionMatrix),o.uResolution=r.globalUniforms.globalUniformData.resolution,o.uRound=r._roundPixels|e._roundPixels,jr(e.groupColorAlpha,o.uColor,0),this.adaptor.execute(this,e)}destroy(){this._managedContainers.destroy(),this.renderer=null,this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Sl extends vl{constructor(e){super(e,new p_)}}Sl.extension={type:[T.WebGLPipes],name:"particle"};class Tl extends vl{constructor(e){super(e,new m_)}}Tl.extension={type:[T.WebGPUPipes],name:"particle"};const S_=class tc{constructor(e){if(e instanceof k)this.texture=e,as(this,tc.defaultOptions,{});else{const t={...tc.defaultOptions,...e};as(this,t,{})}}get alpha(){return this._alpha}set alpha(e){this._alpha=Math.min(Math.max(e,0),1),this._updateColor()}get tint(){return vr(this._tint)}set tint(e){this._tint=ee.shared.setValue(e??16777215).toBgrNumber(),this._updateColor()}_updateColor(){this.color=this._tint+((this._alpha*255|0)<<24)}};S_.defaultOptions={anchorX:0,anchorY:0,x:0,y:0,scaleX:1,scaleY:1,rotation:0,tint:16777215,alpha:1};let a1=S_;const Cl={vertex:{attributeName:"aVertex",format:"float32x2",code:`
            const texture = p.texture;
            const sx = p.scaleX;
            const sy = p.scaleY;
            const ax = p.anchorX;
            const ay = p.anchorY;
            const trim = texture.trim;
            const orig = texture.orig;

            if (trim)
            {
                w1 = trim.x - (ax * orig.width);
                w0 = w1 + trim.width;

                h1 = trim.y - (ay * orig.height);
                h0 = h1 + trim.height;
            }
            else
            {
                w1 = -ax * (orig.width);
                w0 = w1 + orig.width;

                h1 = -ay * (orig.height);
                h0 = h1 + orig.height;
            }

            f32v[offset] = w1 * sx;
            f32v[offset + 1] = h1 * sy;

            f32v[offset + stride] = w0 * sx;
            f32v[offset + stride + 1] = h1 * sy;

            f32v[offset + (stride * 2)] = w0 * sx;
            f32v[offset + (stride * 2) + 1] = h0 * sy;

            f32v[offset + (stride * 3)] = w1 * sx;
            f32v[offset + (stride * 3) + 1] = h0 * sy;
        `,dynamic:!1},position:{attributeName:"aPosition",format:"float32x2",code:`
            var x = p.x;
            var y = p.y;

            f32v[offset] = x;
            f32v[offset + 1] = y;

            f32v[offset + stride] = x;
            f32v[offset + stride + 1] = y;

            f32v[offset + (stride * 2)] = x;
            f32v[offset + (stride * 2) + 1] = y;

            f32v[offset + (stride * 3)] = x;
            f32v[offset + (stride * 3) + 1] = y;
        `,dynamic:!0},rotation:{attributeName:"aRotation",format:"float32",code:`
            var rotation = p.rotation;

            f32v[offset] = rotation;
            f32v[offset + stride] = rotation;
            f32v[offset + (stride * 2)] = rotation;
            f32v[offset + (stride * 3)] = rotation;
        `,dynamic:!1},uvs:{attributeName:"aUV",format:"float32x2",code:`
            var uvs = p.texture.uvs;

            f32v[offset] = uvs.x0;
            f32v[offset + 1] = uvs.y0;

            f32v[offset + stride] = uvs.x1;
            f32v[offset + stride + 1] = uvs.y1;

            f32v[offset + (stride * 2)] = uvs.x2;
            f32v[offset + (stride * 2) + 1] = uvs.y2;

            f32v[offset + (stride * 3)] = uvs.x3;
            f32v[offset + (stride * 3) + 1] = uvs.y3;
        `,dynamic:!1},color:{attributeName:"aColor",format:"unorm8x4",code:`
            const c = p.color;

            u32v[offset] = c;
            u32v[offset + stride] = c;
            u32v[offset + (stride * 2)] = c;
            u32v[offset + (stride * 3)] = c;
        `,dynamic:!1}},u1=new Be(0,0,0,0),T_=class rc extends yt{constructor(e={}){e={...rc.defaultOptions,...e,dynamicProperties:{...rc.defaultOptions.dynamicProperties,...e==null?void 0:e.dynamicProperties}};const{dynamicProperties:t,shader:r,roundPixels:s,texture:i,particles:o,...a}=e;super({label:"ParticleContainer",...a}),this.renderPipeId="particle",this.batched=!1,this._childrenDirty=!1,this.texture=i||null,this.shader=r,this._properties={};for(const u in Cl){const l=Cl[u],c=t[u];this._properties[u]={...l,dynamic:c}}this.allowChildren=!0,this.roundPixels=s??!1,this.particleChildren=o??[]}addParticle(...e){for(let t=0;t<e.length;t++)this.particleChildren.push(e[t]);return this.onViewUpdate(),e[0]}removeParticle(...e){let t=!1;for(let r=0;r<e.length;r++){const s=this.particleChildren.indexOf(e[r]);s>-1&&(this.particleChildren.splice(s,1),t=!0)}return t&&this.onViewUpdate(),e[0]}update(){this._childrenDirty=!0}onViewUpdate(){this._childrenDirty=!0,super.onViewUpdate()}get bounds(){return u1}updateBounds(){}destroy(e=!1){var r,s;if(super.destroy(e),typeof e=="boolean"?e:e==null?void 0:e.texture){const i=typeof e=="boolean"?e:e==null?void 0:e.textureSource,o=this.texture??((r=this.particleChildren[0])==null?void 0:r.texture);o&&o.destroy(i)}this.texture=null,(s=this.shader)==null||s.destroy()}removeParticles(e,t){e??(e=0),t??(t=this.particleChildren.length);const r=this.particleChildren.splice(e,t-e);return this.onViewUpdate(),r}removeParticleAt(e){const t=this.particleChildren.splice(e,1);return this.onViewUpdate(),t[0]}addParticleAt(e,t){return this.particleChildren.splice(t,0,e),this.onViewUpdate(),e}addChild(...e){throw new Error("ParticleContainer.addChild() is not available. Please use ParticleContainer.addParticle()")}removeChild(...e){throw new Error("ParticleContainer.removeChild() is not available. Please use ParticleContainer.removeParticle()")}removeChildren(e,t){throw new Error("ParticleContainer.removeChildren() is not available. Please use ParticleContainer.removeParticles()")}removeChildAt(e){throw new Error("ParticleContainer.removeChildAt() is not available. Please use ParticleContainer.removeParticleAt()")}getChildAt(e){throw new Error("ParticleContainer.getChildAt() is not available. Please use ParticleContainer.getParticleAt()")}setChildIndex(e,t){throw new Error("ParticleContainer.setChildIndex() is not available. Please use ParticleContainer.setParticleIndex()")}getChildIndex(e){throw new Error("ParticleContainer.getChildIndex() is not available. Please use ParticleContainer.getParticleIndex()")}addChildAt(e,t){throw new Error("ParticleContainer.addChildAt() is not available. Please use ParticleContainer.addParticleAt()")}swapChildren(e,t){throw new Error("ParticleContainer.swapChildren() is not available. Please use ParticleContainer.swapParticles()")}reparentChild(...e){throw new Error("ParticleContainer.reparentChild() is not available with the particle container")}reparentChildAt(e,t){throw new Error("ParticleContainer.reparentChildAt() is not available with the particle container")}};T_.defaultOptions={dynamicProperties:{vertex:!1,position:!0,rotation:!1,uvs:!1,color:!1},roundPixels:!1};let l1=T_;const C_=class nb extends Si{constructor(e={}){e={...nb.defaultOptions,...e},super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){var t,r;this.width=e.width??this.width,this.height=e.height??this.height,this._originalWidth=e.originalWidth??this._originalWidth,this._originalHeight=e.originalHeight??this._originalHeight,this._leftWidth=e.leftWidth??this._leftWidth,this._rightWidth=e.rightWidth??this._rightWidth,this._topHeight=e.topHeight??this._topHeight,this._bottomHeight=e.bottomHeight??this._bottomHeight,this._anchorX=(t=e.anchor)==null?void 0:t.x,this._anchorY=(r=e.anchor)==null?void 0:r.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:t,height:r,_leftWidth:s,_rightWidth:i,_topHeight:o,_bottomHeight:a,_anchorX:u,_anchorY:l}=this,c=s+i,h=t>c?1:t/c,d=o+a,f=r>d?1:r/d,g=Math.min(h,f),x=u*t,p=l*r;e[0]=e[8]=e[16]=e[24]=-x,e[2]=e[10]=e[18]=e[26]=s*g-x,e[4]=e[12]=e[20]=e[28]=t-i*g-x,e[6]=e[14]=e[22]=e[30]=t-x,e[1]=e[3]=e[5]=e[7]=-p,e[9]=e[11]=e[13]=e[15]=o*g-p,e[17]=e[19]=e[21]=e[23]=r-a*g-p,e[25]=e[27]=e[29]=e[31]=r-p,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const t=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};C_.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};let Yt=C_;const A_=class sb extends yt{constructor(e){var d,f,g,x;e instanceof k&&(e={texture:e});const{width:t,height:r,anchor:s,leftWidth:i,rightWidth:o,topHeight:a,bottomHeight:u,texture:l,roundPixels:c,...h}=e;super({label:"NineSliceSprite",...h}),this.renderPipeId="nineSliceSprite",this.batched=!0,this._leftWidth=i??((d=l==null?void 0:l.defaultBorders)==null?void 0:d.left)??Yt.defaultOptions.leftWidth,this._topHeight=a??((f=l==null?void 0:l.defaultBorders)==null?void 0:f.top)??Yt.defaultOptions.topHeight,this._rightWidth=o??((g=l==null?void 0:l.defaultBorders)==null?void 0:g.right)??Yt.defaultOptions.rightWidth,this._bottomHeight=u??((x=l==null?void 0:l.defaultBorders)==null?void 0:x.bottom)??Yt.defaultOptions.bottomHeight,this._width=t??l.width??Yt.defaultOptions.width,this._height=r??l.height??Yt.defaultOptions.height,this.allowChildren=!1,this.texture=l??sb.defaultOptions.texture,this.roundPixels=c??!1,this._anchor=new le({_onUpdate:()=>{this.onViewUpdate()}}),s?this.anchor=s:this.texture.defaultAnchor&&(this.anchor=this.texture.defaultAnchor)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get width(){return this._width}set width(e){this._width=e,this.onViewUpdate()}get height(){return this._height}set height(e){this._height=e,this.onViewUpdate()}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}get leftWidth(){return this._leftWidth}set leftWidth(e){this._leftWidth=e,this.onViewUpdate()}get topHeight(){return this._topHeight}set topHeight(e){this._topHeight=e,this.onViewUpdate()}get rightWidth(){return this._rightWidth}set rightWidth(e){this._rightWidth=e,this.onViewUpdate()}get bottomHeight(){return this._bottomHeight}set bottomHeight(e){this._bottomHeight=e,this.onViewUpdate()}get texture(){return this._texture}set texture(e){e||(e=k.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get originalWidth(){return this._texture.width}get originalHeight(){return this._texture.height}destroy(e){if(super.destroy(e),typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(r)}this._texture=null}updateBounds(){const e=this._bounds,t=this._anchor,r=this._width,s=this._height;e.minX=-t._x*r,e.maxX=e.minX+r,e.minY=-t._y*s,e.maxY=e.minY+s}};A_.defaultOptions={texture:k.EMPTY};let w_=A_;class c1 extends w_{constructor(...e){let t=e[0];t instanceof k&&(L(j,"NineSlicePlane now uses the options object {texture, leftWidth, rightWidth, topHeight, bottomHeight}"),t={texture:t,leftWidth:e[1],topHeight:e[2],rightWidth:e[3],bottomHeight:e[4]}),L(j,"NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(t)}}class E_ extends Ci{constructor(){super(),this.geometry=new Yt}destroy(){this.geometry.destroy()}}class Al{constructor(e){this._renderer=e,this._managedSprites=new je({renderer:e,type:"renderable",name:"nineSliceSprite"})}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new E_,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,this._managedSprites.add(e),e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._managedSprites.destroy(),this._renderer=null}}Al.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"nineSliceSprite"};const P_={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},B_={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let wl,El;class R_ extends nt{constructor(){wl??(wl=Fr({name:"tiling-sprite-shader",bits:[Yr,P_,Ir]})),El??(El=Ur({name:"tiling-sprite-shader",bits:[ui,B_,Or]}));const e=new Ce({uMapCoord:{value:new H,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new H,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:El,gpuProgram:wl,resources:{localUniforms:new Ce({uTransformMatrix:{value:new H,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:k.EMPTY.source,uSampler:k.EMPTY.source.style}})}updateUniforms(e,t,r,s,i,o){const a=this.resources.tilingUniforms,u=o.width,l=o.height,c=o.textureMatrix,h=a.uniforms.uTextureTransform;h.set(r.a*u/e,r.b*u/t,r.c*l/e,r.d*l/t,r.tx/e,r.ty/t),h.invert(),a.uniforms.uMapCoord=c.mapCoord,a.uniforms.uClampFrame=c.uClampFrame,a.uniforms.uClampOffset=c.uClampOffset,a.uniforms.uTextureTransform=h,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=s,a.uniforms.uSizeAnchor[3]=i,o&&(this.resources.uTexture=o.source,this.resources.uSampler=o.source.style)}}class D_ extends Wt{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function M_(n,e){const t=n.anchor.x,r=n.anchor.y;e[0]=-t*n.width,e[1]=-r*n.height,e[2]=(1-t)*n.width,e[3]=-r*n.height,e[4]=(1-t)*n.width,e[5]=(1-r)*n.height,e[6]=-t*n.width,e[7]=(1-r)*n.height}function F_(n,e,t,r){let s=0;const i=n.length/(e||2),o=r.a,a=r.b,u=r.c,l=r.d,c=r.tx,h=r.ty;for(t*=e;s<i;){const d=n[t],f=n[t+1];n[t]=o*d+u*f+c,n[t+1]=a*d+l*f+h,t+=e,s++}}function U_(n,e){const t=n.texture,r=t.frame.width,s=t.frame.height;let i=0,o=0;n.applyAnchorToTexture&&(i=n.anchor.x,o=n.anchor.y),e[0]=e[6]=-i,e[2]=e[4]=1-i,e[1]=e[3]=-o,e[5]=e[7]=1-o;const a=H.shared;a.copyFrom(n._tileTransform.matrix),a.tx/=n.width,a.ty/=n.height,a.invert(),a.scale(n.width/r,n.height/s),F_(e,2,0,a)}const Ai=new D_;class I_{constructor(){this.canBatch=!0,this.geometry=new Wt({indices:Ai.indices.slice(),positions:Ai.positions.slice(),uvs:Ai.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class Pl{constructor(e){this._state=st.default2d,this._renderer=e,this._managedTilingSprites=new je({renderer:e,type:"renderable",name:"tilingSprite"})}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const s=t.canBatch;if(s&&s===r){const{batchableMesh:i}=t;return!i._batcher.checkAndUpdateTexture(i,e.texture)}return r!==s}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const s=this._getTilingSpriteData(e),{geometry:i,canBatch:o}=s;if(o){s.batchableMesh||(s.batchableMesh=new Ci);const a=s.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=i,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(a,t)}else r.break(t),s.shader||(s.shader=new R_),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,jr(e.groupColorAlpha,r.uColor,0),this._state.blendMode=Dr(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:Ai,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:s}=t;e.didViewUpdate&&this._updateBatchableMesh(e),s._batcher.updateElement(s)}else if(e.didViewUpdate){const{shader:s}=t;s.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new I_;return t.renderable=e,e._gpuData[this._renderer.uid]=t,this._managedTilingSprites.add(e),t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,s=e.texture.source.style;s.addressMode!=="repeat"&&(s.addressMode="repeat",s.update()),U_(e,r.uvs),M_(e,r.positions)}destroy(){this._managedTilingSprites.destroy(),this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let s=!0;return this._renderer.type===$e.WEBGL&&(s=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(s||r.source.isPowerOfTwo),t.canBatch}}Pl.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"tilingSprite"};const O_={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},G_={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},k_={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},L_={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let Bl,Rl;class N_ extends nt{constructor(e){const t=new Ce({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new H,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});Bl??(Bl=Fr({name:"sdf-shader",bits:[Ms,Us(e),O_,k_,Ir]})),Rl??(Rl=Ur({name:"sdf-shader",bits:[Fs,Is(e),G_,L_,Or]})),super({glProgram:Rl,gpuProgram:Bl,resources:{localUniforms:t,batchSamplers:Os(e)}})}}class z_ extends Wr{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class Dl{constructor(e){this._renderer=e,this._managedBitmapTexts=new je({renderer:e,type:"renderable",priority:-2,name:"bitmapText"})}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);H_(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);H_(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,s=Lr.getFont(e.text,e._style);r.clear(),s.distanceField.type!=="none"&&(r.customShader||(r.customShader=new N_(this._renderer.limits.maxBatchableTextures)));const i=Ge.graphemeSegmenter(e.text),o=e._style;let a=s.baseLineOffset;const u=Hs(i,o,s,!0),l=o.padding,c=u.scale;let h=u.width,d=u.height+u.offsetY;o._stroke&&(h+=o._stroke.width/c,d+=o._stroke.width/c),r.translate(-e._anchor._x*h-l,-e._anchor._y*d-l).scale(c,c);const f=s.applyFillAsTint?o._fill.color:16777215;let g=s.fontMetrics.fontSize,x=s.lineHeight;o.lineHeight&&(g=o.fontSize/c,x=o.lineHeight/c);let p=(x-g)/2;p-s.baseLineOffset<0&&(p=0);for(let b=0;b<u.lines.length;b++){const y=u.lines[b];for(let v=0;v<y.charPositions.length;v++){const C=y.chars[v],D=s.chars[C];if(D!=null&&D.texture){const B=D.texture;r.texture(B,f||"black",Math.round(y.charPositions[v]+D.xOffset),Math.round(a+D.yOffset+p),B.orig.width,B.orig.height)}}a+=x}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new z_;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),this._managedBitmapTexts.add(e),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,s=se.get(`${r}-bitmap`),{a:i,b:o,c:a,d:u}=e.groupTransform,l=Math.sqrt(i*i+o*o),c=Math.sqrt(a*a+u*u),h=(Math.abs(l)+Math.abs(c))/2,d=s.baseRenderedFontSize/e._style.fontSize,f=h*s.distanceField.range*(1/d);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._managedBitmapTexts.destroy(),this._renderer=null,this._managedBitmapTexts=null}}Dl.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"bitmapText"};function H_(n,e){e.groupTransform=n.groupTransform,e.groupColorAlpha=n.groupColorAlpha,e.groupColor=n.groupColor,e.groupBlendMode=n.groupBlendMode,e.globalDisplayStatus=n.globalDisplayStatus,e.groupTransform=n.groupTransform,e.localDisplayStatus=n.localDisplayStatus,e.groupAlpha=n.groupAlpha,e._roundPixels=n._roundPixels}function V_(n){const{text:e,style:t,chars:r}=n,s=t,i=Lr.getFont(e,s),o=Ge.graphemeSegmenter(e),a=Hs(o,s,i,!0),u=a.scale,l=[],c=[],h=[],d=t.lineHeight?t.lineHeight:i.lineHeight*u;let f=0;for(const g of a.lines){if(g.chars.length===0)continue;const x=new ce({label:"line"});x.y=f,h.push(x);let p=new ce({label:"word"}),b=0;for(let y=0;y<g.chars.length;y++){const v=g.chars[y];if(!v||!i.chars[v])continue;const D=v===" ",B=y===g.chars.length-1;let w;r.length>0?(w=r.shift(),w.text=v,w.style=s,w.label=`char-${v}`,w.x=g.charPositions[y]*u-g.charPositions[b]*u):w=new qa({text:v,style:s,label:`char-${v}`,x:g.charPositions[y]*u-g.charPositions[b]*u}),D||(l.push(w),p.addChild(w)),(D||B)&&p.children.length>0&&(p.x=g.charPositions[b]*u,c.push(p),x.addChild(p),p=new ce({label:"word"}),b=y+1)}f+=d}return{chars:l,lines:h,words:c}}class W_ extends $n{constructor(){super(...arguments),this.generatingTexture=!1,this.currentKey="--"}destroy(){this.texturePromise=null,this.generatingTexture=!1,this.currentKey="--",super.destroy()}}function wi(n,e){const{texture:t,bounds:r}=n,s=e._style._getFinalPadding();Hi(r,e._anchor,t);const i=e._anchor._x*s*2,o=e._anchor._y*s*2;r.minX-=s-i,r.minY-=s-o,r.maxX-=s-i,r.maxY-=s-o}class Ml{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),this._managedTexts=new je({renderer:e,type:"renderable",onUnload:this.onTextUnload.bind(this),name:"htmlText"})}resolutionChange(){for(const e in this._managedTexts.items){const t=this._managedTexts.items[e];t!=null&&t._autoResolution&&t.onViewUpdate()}}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const s=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==s)&&this._updateGpuText(e).catch(i=>{console.error(i)}),e._didTextUpdate=!1,wi(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let s=this._renderer.htmlText.getTexturePromise(e);r&&(s=s.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(r)})),t.texturePromise=s,t.currentKey=e.styleKey,t.texture=await s;const i=e.renderGroup||e.parentRenderGroup;i&&(i.structureDidChange=!0),t.generatingTexture=!1,wi(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new W_;return t.renderable=e,t.transform=e.groupTransform,t.texture=k.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){const t=e._gpuData[this._renderer.uid];if(!t)return;const{htmlText:r}=this._renderer;r.getReferenceCount(t.currentKey)===null?r.returnTexturePromise(t.texturePromise):r.decreaseReferenceCount(t.currentKey)}destroy(){this._managedTexts.destroy(),this._renderer=null}}Ml.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"htmlText"};function X_(){const{userAgent:n}=Q.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(n)}const h1=new Be;function Fl(n,e,t,r){const s=h1;s.minX=0,s.minY=0,s.maxX=n.width/r|0,s.maxY=n.height/r|0;const i=ue.getOptimalTexture(s.width,s.height,r,!1);return i.source.uploadMethodId="image",i.source.resource=n,i.source.alphaMode="premultiply-alpha-on-upload",i.frame.width=e/r,i.frame.height=t/r,i.source.emit("update",i.source),i.updateUvs(),i}function $_(n,e){const t=e.fontFamily,r=[],s={},i=/font-family:([^;"\s]+)/g,o=n.match(i);function a(u){s[u]||(r.push(u),s[u]=!0)}if(Array.isArray(t))for(let u=0;u<t.length;u++)a(t[u]);else a(t);o&&o.forEach(u=>{const l=u.split(":")[1].trim();a(l)});for(const u in e.tagStyles){const l=e.tagStyles[u].fontFamily;a(l)}return r}async function Y_(n){const t=await(await Q.get().fetch(n)).blob(),r=new FileReader;return await new Promise((i,o)=>{r.onloadend=()=>i(r.result),r.onerror=o,r.readAsDataURL(t)})}async function q_(n,e){const t=await Y_(e);return`@font-face {
        font-family: "${n.fontFamily}";
        font-weight: ${n.fontWeight};
        font-style: ${n.fontStyle};
        src: url('${t}');
    }`}const Ei=new Map;async function j_(n){const e=n.filter(t=>se.has(`${t}-and-url`)).map(t=>{if(!Ei.has(t)){const{entries:r}=se.get(`${t}-and-url`),s=[];r.forEach(i=>{const o=i.url,u=i.faces.map(l=>({weight:l.weight,style:l.style}));s.push(...u.map(l=>q_({fontWeight:l.weight,fontStyle:l.style,fontFamily:t},o)))}),Ei.set(t,Promise.all(s).then(i=>i.join(`
`)))}return Ei.get(t)});return(await Promise.all(e)).join(`
`)}function K_(n,e,t,r,s){const{domElement:i,styleElement:o,svgRoot:a}=s;i.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${n}</div>`,i.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),o.textContent=r;const{width:u,height:l}=s.image;return a.setAttribute("width",u.toString()),a.setAttribute("height",l.toString()),new XMLSerializer().serializeToString(a)}function Z_(n,e){const t=At.getOptimalCanvasAndContext(n.width,n.height,e),{context:r}=t;return r.clearRect(0,0,n.width,n.height),r.drawImage(n,0,0),t}function Q_(n,e,t){return new Promise(async r=>{t&&await new Promise(s=>setTimeout(s,100)),n.onload=()=>{r()},n.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,n.crossOrigin="anonymous"})}class Ul{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===$e.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;const r=this._buildTexturePromise(e).then(s=>(this._activeTextures[t].texture=s,s));return this._activeTextures[t]={texture:null,promise:r,usageCount:1},r}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t.texture):t.promise.then(r=>{t.texture=r,this._cleanUp(t.texture)}).catch(()=>{X("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:s,textureStyle:i}=e,o=Te.get(ja),a=$_(t,r),u=await j_(a),l=Ka(t,r,u,o),c=Math.ceil(Math.ceil(Math.max(1,l.width)+r.padding*2)*s),h=Math.ceil(Math.ceil(Math.max(1,l.height)+r.padding*2)*s),d=o.image,f=2;d.width=(c|0)+f,d.height=(h|0)+f;const g=K_(t,r,s,u,o);await Q_(d,g,X_()&&a.length>0);const x=d;let p;this._createCanvas&&(p=Z_(d,s));const b=Fl(p?p.canvas:x,d.width-f,d.height-f,s);return i&&(b.source.style=i),this._createCanvas&&(this._renderer.texture.initSource(b.source),At.returnCanvasAndContext(p)),Te.return(o),b}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{X("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){ue.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}}Ul.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"htmlText"};class Il extends ce{constructor(e){const{text:t,style:r,autoSplit:s,lineAnchor:i,wordAnchor:o,charAnchor:a,...u}=e;super(u),this._dirty=!1,this._canReuseChars=!1,this.chars=[],this.words=[],this.lines=[],this._originalText=t,this._autoSplit=s,this._lineAnchor=i,this._wordAnchor=o,this._charAnchor=a,this.style=r}split(){const e=this.splitFn();this.chars=e.chars,this.words=e.words,this.lines=e.lines,this.addChild(...this.lines),this.charAnchor=this._charAnchor,this.wordAnchor=this._wordAnchor,this.lineAnchor=this._lineAnchor,this._dirty=!1,this._canReuseChars=!0}get text(){return this._originalText}set text(e){this._originalText=e,this.lines.forEach(t=>t.destroy({children:!0})),this.lines.length=0,this.words.length=0,this.chars.length=0,this._canReuseChars=!1,this.onTextUpdate()}_setOrigin(e,t,r){let s;typeof e=="number"?s={x:e,y:e}:s={x:e.x,y:e.y},t.forEach(i=>{const o=i.getLocalBounds(),a=o.minX+o.width*s.x,u=o.minY+o.height*s.y;i.origin.set(a,u)}),this[r]=e}get lineAnchor(){return this._lineAnchor}set lineAnchor(e){this._setOrigin(e,this.lines,"_lineAnchor")}get wordAnchor(){return this._wordAnchor}set wordAnchor(e){this._setOrigin(e,this.words,"_wordAnchor")}get charAnchor(){return this._charAnchor}set charAnchor(e){this._setOrigin(e,this.chars,"_charAnchor")}get style(){return this._style}set style(e){e||(e={}),this._style=new it(e),this.words.forEach(t=>t.destroy()),this.words.length=0,this.lines.forEach(t=>t.destroy()),this.lines.length=0,this._canReuseChars=!0,this.onTextUpdate()}onTextUpdate(){this._dirty=!0,this._autoSplit&&this.split()}destroy(e){super.destroy(e),this.chars=[],this.words=[],this.lines=[],(typeof e=="boolean"?e:e!=null&&e.style)&&this._style.destroy(e),this._style=null,this._originalText=""}}const J_=class Fi extends Il{constructor(e){const t={...Fi.defaultOptions,...e};super(t)}static from(e,t){const r={...Fi.defaultOptions,...t,text:e.text,style:new it(e.style)};return new Fi({...r})}splitFn(){return V_({text:this._originalText,style:this._style,chars:this._canReuseChars?this.chars:[]})}};J_.defaultOptions={autoSplit:!0,lineAnchor:0,wordAnchor:0,charAnchor:0};let d1=J_;function f1(n,e,t){switch(n){case"center":return(t-e)/2;case"right":return t-e;case"left":default:return 0}}function ex(n){return n==="\r"||n===`
`||n===`\r
`}function p1(n,e,t){const r=[];let s=e.lines[0],i="",o=[],a=0;return t.wordWrap=!1,n.forEach(u=>{const l=/^\s*$/.test(u),c=ex(u),h=i.length===0&&l;if(l&&!c&&h)return;c||(i+=u);const d=Ge.measureText(u,t);o.push({char:u,metric:d}),i.length>=s.length&&(r.push({line:i,chars:o,width:o.reduce((f,g)=>f+g.metric.width,0)}),o=[],i="",a++,s=e.lines[a])}),r}function tx(n){var p,b;const{text:e,style:t,chars:r}=n,s=t,i=Ge.measureText(e,s),o=Ge.graphemeSegmenter(e),a=p1(o,i,s.clone()),u=s.align,l=i.lineWidths.reduce((y,v)=>Math.max(y,v),0),c=[],h=[],d=[];let f=0;const g=((p=s.stroke)==null?void 0:p.width)||0,x=((b=s.dropShadow)==null?void 0:b.distance)||0;return a.forEach((y,v)=>{const C=new ce({label:`line-${v}`});C.y=f,h.push(C);const D=i.lineWidths[v];let B=f1(u,D,l),w=new ce({label:"word"});w.x=B,y.chars.forEach((O,A)=>{if(O.metric.width!==0){if(ex(O.char)){B+=O.metric.width-g;return}if(O.char===" ")w.children.length>0&&(d.push(w),C.addChild(w)),B+=O.metric.width+s.letterSpacing-g,w=new ce({label:"word"}),w.x=B;else{let E;r.length>0?(E=r.shift(),E.text=O.char,E.style=s,E.setFromMatrix(H.IDENTITY),E.x=B-w.x-x*A):E=new ii({text:O.char,style:s,x:B-w.x-x*A}),c.push(E),w.addChild(E),B+=O.metric.width+s.letterSpacing-g}}}),w.children.length>0&&(d.push(w),C.addChild(w)),f+=i.lineHeight}),{chars:c,lines:h,words:d}}const rx=class Ui extends Il{constructor(e){const t={...Ui.defaultOptions,...e};super(t)}static from(e,t){const r={...Ui.defaultOptions,...t,text:e.text,style:new it(e.style)};return new Ui({...r})}splitFn(){return tx({text:this._originalText,style:this._style,chars:this._canReuseChars?this.chars:[]})}};rx.defaultOptions={autoSplit:!0,lineAnchor:0,wordAnchor:0,charAnchor:0};let m1=rx;class nx extends $n{}class Ol{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),this._managedTexts=new je({renderer:e,type:"renderable",onUnload:this.onTextUnload.bind(this),name:"canvasText"})}resolutionChange(){for(const e in this._managedTexts.items){const t=this._managedTexts.items[e];t!=null&&t._autoResolution&&t.onViewUpdate()}}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r?!0:e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const s=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==s)&&this._updateGpuText(e),e._didTextUpdate=!1,wi(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new nx;return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){const t=e._gpuData[this._renderer.uid];if(!t)return;const{canvasText:r}=this._renderer;r.getReferenceCount(t.currentKey)>0?r.decreaseReferenceCount(t.currentKey):t.texture&&r.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}}Ol.extension={type:[T.WebGLPipes,T.WebGPUPipes,T.CanvasPipes],name:"text"};class Gl{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,r,s){typeof e=="string"&&(L("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof it||(e.style=new it(e.style)),e.textureStyle instanceof tt||(e.textureStyle=new tt(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:i,style:o,textureStyle:a}=e,u=e.resolution??this._renderer.resolution,{frame:l,canvasAndContext:c}=$r.getCanvasAndContext({text:i,style:o,resolution:u}),h=Fl(c.canvas,l.width,l.height,u);if(a&&(h.source.style=a),o.trim&&(l.pad(o.padding),h.frame.copyFrom(l),h.frame.scale(1/u),h.updateUvs()),o.filters){const d=this._applyFilters(h,o.filters);return this.returnTexture(h),$r.returnCanvasAndContext(c),d}return this._renderer.texture.initSource(h._source),$r.returnCanvasAndContext(c),h}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",ue.returnTexture(e,!0)}renderTextToCanvas(){L("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const r=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:r,usageCount:1},r}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,s=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),s}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}Gl.extension={type:[T.WebGLSystem,T.WebGPUSystem,T.CanvasSystem],name:"canvasText"};const sx=["align","breakWords","cssOverrides","fontVariant","fontWeight","leading","letterSpacing","lineHeight","padding","textBaseline","trim","whiteSpace","wordWrap","wordWrapWidth","fontFamily","fontStyle","fontSize"];function g1(n){const e=[];let t=0;for(let r=0;r<sx.length;r++){const s=`_${sx[r]}`;e[t++]=n[s]}return t=ix(n._fill,e,t),t=x1(n._stroke,e,t),t=b1(n.dropShadow,e,t),t=_1(n.filters,e,t),e.join("-")}function _1(n,e,t){if(!n)return t;for(const r of n)e[t++]=r.uid;return t}function ix(n,e,t){var r;return n&&(e[t++]=n.color,e[t++]=n.alpha,e[t++]=(r=n.fill)==null?void 0:r.styleKey),t}function x1(n,e,t){return n&&(t=ix(n,e,t),e[t++]=n.width,e[t++]=n.alignment,e[t++]=n.cap,e[t++]=n.join,e[t++]=n.miterLimit),t}function b1(n,e,t){return n&&(e[t++]=n.alpha,e[t++]=n.angle,e[t++]=n.blur,e[t++]=n.distance,e[t++]=ee.shared.setValue(n.color).toNumber()),t}async function y1(n,e,t=200){const r=await e.extract.base64(n);await e.encoder.commandFinished;const s=t;console.log(`logging texture ${n.source.width}px ${n.source.height}px`);const i=["font-size: 1px;",`padding: ${s}px 300px;`,`background: url(${r}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",i)}const v1=["#000080","#228B22","#8B0000","#4169E1","#008080","#800000","#9400D3","#FF8C00","#556B2F","#8B008B"];let S1=0;function ox(n,e=0,t={color:"#000000"}){n.renderGroup&&(t.color=v1[S1++]);let r="";for(let o=0;o<e;o++)r+="    ";let s=n.label;!s&&n instanceof dt&&(s=`sprite:${n.texture.label}`);let i=`%c ${r}|- ${s} (worldX:${n.worldTransform.tx}, relativeRenderX:${n.relativeGroupTransform.tx}, renderX:${n.groupTransform.tx}, localX:${n.x})`;n.renderGroup&&(i+=" (RenderGroup)"),n.filters&&(i+="(*filters)"),console.log(i,`color:${t.color}; font-weight:bold;`),e++;for(let o=0;o<n.children.length;o++){const a=n.children[o];ox(a,e,{...t})}}function ax(n,e=0,t={index:0,color:"#000000"}){let r="";for(let i=0;i<e;i++)r+="    ";const s=`%c ${r}- ${t.index}: ${n.root.label} worldX:${n.worldTransform.tx}`;console.log(s,`color:${t.color}; font-weight:bold;`),e++;for(let i=0;i<n.renderGroupChildren.length;i++){const o=n.renderGroupChildren[i];ax(o,e,{...t,index:i})}}$.add(nc,sc);const T1=Object.freeze(Object.defineProperty({__proto__:null,AbstractBitmapFont:Io,AbstractRenderer:bn,AbstractSplitText:Il,AbstractText:ni,AccessibilitySystem:Sh,AlphaFilter:Iy,AlphaMask:to,AlphaMaskPipe:tu,AnimatedSprite:Wn,Application:Td,ApplicationInitHook:Do,Assets:Un,AssetsClass:fp,BLEND_TO_NPM:Md,BUFFER_TYPE:Xn,BackgroundLoader:Vf,BackgroundSystem:Cg,Batch:Id,BatchGeometry:zd,BatchTextureArray:Ud,BatchableGraphics:Ls,BatchableHTMLText:W_,BatchableMesh:Ci,BatchableSprite:$n,BatchableText:nx,Batcher:Ld,BatcherPipe:eu,BigPool:Te,BindGroup:Tt,BindGroupSystem:Ju,BitmapFont:pa,BitmapFontManager:Lr,BitmapText:qa,BitmapTextGraphics:z_,BitmapTextPipe:Dl,BlendModeFilter:ye,BlendModePipe:zu,BlurFilter:jp,BlurFilterPass:ri,Bounds:Be,BrowserAdapter:jc,Buffer:qe,BufferImageSource:ts,BufferResource:hi,BufferUsage:te,CLEAR:Ye,Cache:se,CanvasObserver:lo,CanvasPool:At,CanvasPoolClass:Gf,CanvasSource:vt,CanvasTextGenerator:$r,CanvasTextMetrics:Ge,CanvasTextPipe:Ol,CanvasTextSystem:Gl,Circle:As,Color:ee,ColorBlend:Xh,ColorBurnBlend:$h,ColorDodgeBlend:Yh,ColorMask:ro,ColorMaskPipe:ru,ColorMatrixFilter:ky,CompressedSource:In,Container:ce,Culler:Rp,CullerPlugin:Dp,CustomRenderPipe:Uu,D3D10_RESOURCE_DIMENSION:Ba,D3DFMT:Ke,DATA_URI:_0,DDS:K,DEG_TO_RAD:lc,DEPRECATED_SCALE_MODES:vi,DEPRECATED_WRAP_MODES:yi,DOMAdapter:Q,DOMContainer:Ty,DOMPipe:Fa,DRAW_MODES:kv,DXGI_FORMAT:Pa,DXGI_TO_TEXTURE_FORMAT:Ze,DarkenBlend:qh,DefaultBatcher:Gs,DefaultShader:qo,DifferenceBlend:jh,DisplacementFilter:Ly,DivideBlend:Kh,DynamicBitmapFont:fa,Ellipse:ws,EventBoundary:Lp,EventEmitter:We,EventSystem:Oa,EventsTicker:wt,ExclusionBlend:Zh,ExtensionType:T,ExtractSystem:Ag,FOURCC_TO_TEXTURE_FORMAT:Ra,FederatedContainer:Np,FederatedEvent:Cr,FederatedMouseEvent:zn,FederatedPointerEvent:ct,FederatedWheelEvent:cr,FillGradient:Ct,FillPattern:Cn,Filter:Fe,FilterEffect:on,FilterPipe:Va,FilterSystem:$a,FontStylePromiseCache:Ei,GAUSSIAN_VALUES:ka,GCManagedHash:je,GCSystem:wg,GL_FORMATS:li,GL_INTERNAL_FORMAT:vp,GL_TARGETS:au,GL_TYPES:re,GL_WRAP_MODES:Im,GPUTextureGpuData:jg,GenerateTextureSystem:Wu,Geometry:or,GlBackBufferSystem:Lm,GlBatchAdaptor:Za,GlBuffer:Fm,GlBufferSystem:su,GlColorMaskSystem:cu,GlContextSystem:Um,GlEncoderSystem:hu,GlGeometryGpuData:km,GlGeometrySystem:uu,GlGraphicsAdaptor:Mu,GlLimitsSystem:du,GlMeshAdaptor:Fu,GlParticleContainerAdaptor:p_,GlParticleContainerPipe:Sl,GlProgram:be,GlProgramData:Km,GlRenderTarget:Nm,GlRenderTargetAdaptor:Xm,GlRenderTargetSystem:vu,GlShaderSystem:wu,GlStateSystem:cg,GlStencilSystem:fu,GlTexture:hg,GlTextureSystem:Du,GlUboSystem:xu,GlUniformGroupSystem:Eu,GlobalResourceRegistry:nr,GlobalUniformSystem:$u,GpuBatchAdaptor:Qa,GpuBlendModesToPixi:He,GpuBufferData:kg,GpuBufferSystem:el,GpuColorMaskSystem:tl,GpuDeviceSystem:bi,GpuEncoderSystem:rl,GpuGraphicsAdaptor:pl,GpuGraphicsContext:gf,GpuLimitsSystem:nl,GpuMeshAdapter:ml,GpuMipmapGenerator:qg,GpuParticleContainerAdaptor:m_,GpuParticleContainerPipe:Tl,GpuProgram:pe,GpuRenderTarget:Vg,GpuRenderTargetAdaptor:Wg,GpuRenderTargetSystem:ul,GpuShaderSystem:ll,GpuStateSystem:cl,GpuStencilModesToPixi:It,GpuStencilSystem:sl,GpuTextureSystem:fl,GpuUboSystem:il,GpuUniformBatchPipe:ol,Graphics:Wr,GraphicsContext:ze,GraphicsContextRenderData:_f,GraphicsContextSystem:Ns,GraphicsGpuData:t_,GraphicsPath:mt,GraphicsPipe:gl,HTMLText:Em,HTMLTextPipe:Ml,HTMLTextRenderData:ja,HTMLTextStyle:oi,HTMLTextSystem:Ul,HardLightBlend:Qh,HardMixBlend:Jh,HelloSystem:xi,IGLUniformData:nv,ImageSource:Lt,InstructionSet:Qi,KTX:Se,LightenBlend:ed,LinearBurnBlend:td,LinearDodgeBlend:rd,LinearLightBlend:nd,Loader:Jf,LoaderParserPriority:rt,LuminosityBlend:sd,MaskEffectManager:ns,MaskEffectManagerClass:Ic,MaskFilter:am,Matrix:H,Mesh:Xr,MeshGeometry:Wt,MeshGpuData:_l,MeshPipe:xl,MeshPlane:r1,MeshRope:n1,MeshSimple:s1,NOOP:Li,NegationBlend:id,NineSliceGeometry:Yt,NineSlicePlane:c1,NineSliceSprite:w_,NineSliceSpriteGpuData:E_,NineSliceSpritePipe:Al,NoiseFilter:Ny,ObservablePoint:le,OverlayBlend:od,PI_2:ac,Particle:a1,ParticleBuffer:x_,ParticleContainer:l1,ParticleContainerPipe:vl,ParticleShader:v_,PassthroughFilter:rm,PerspectiveMesh:t1,PerspectivePlaneGeometry:l_,PinLightBlend:ad,PipelineSystem:al,PlaneGeometry:Si,Point:ie,Polygon:Rr,Pool:Rc,PoolGroupClass:Dc,PrepareBase:lm,PrepareQueue:xm,PrepareSystem:Bm,PrepareUpload:Pm,QuadGeometry:D_,RAD_TO_DEG:uc,Rectangle:ne,RenderContainer:Wv,RenderGroup:os,RenderGroupPipe:Iu,RenderGroupSystem:ku,RenderLayer:jv,RenderTarget:ci,RenderTargetSystem:yu,RenderTexture:_i,RenderableGCSystem:Dg,RendererInitHook:Mo,RendererType:$e,ResizePlugin:Fo,Resolver:Nt,RopeGeometry:d_,RoundedRectangle:Ps,SCALE_MODES:Nv,STENCIL_MODES:ve,SVGParser:Rf,SaturationBlend:ud,SchedulerSystem:Yu,ScissorMask:Qy,SdfShader:N_,Shader:nt,ShaderStage:Pr,ShapePath:Cf,SharedRenderPipes:Qu,SharedSystems:Zu,SoftLightBlend:ld,SplitBitmapText:d1,SplitText:m1,Sprite:dt,SpritePipe:Lu,Spritesheet:uo,State:st,StencilMask:no,StencilMaskPipe:nu,SubtractBlend:cd,SystemRunner:Ro,TEXTURE_FORMAT_BLOCK_SIZE:bp,Text:ii,TextStyle:it,Texture:k,TextureGCSystem:Mg,TextureMatrix:zi,TexturePool:ue,TexturePoolClass:Yc,TextureSource:fe,TextureStyle:tt,TextureUvs:zv,Ticker:Re,TickerListener:fs,TickerPlugin:Uo,TilingSprite:fm,TilingSpriteGpuData:I_,TilingSpritePipe:Pl,TilingSpriteShader:R_,Transform:hm,Triangle:Xa,UNIFORM_TO_ARRAY_SETTERS:og,UNIFORM_TO_SINGLE_SETTERS:ig,UNIFORM_TYPES_MAP:Gh,UNIFORM_TYPES_VALUES:_o,UPDATE_BLEND:cs,UPDATE_COLOR:ln,UPDATE_PRIORITY:St,UPDATE_TRANSFORM:Ub,UPDATE_VISIBLE:Sr,UboBatch:Lg,UboSystem:pu,UniformGroup:Ce,VERSION:Sn,VideoSource:Tr,ViewContainer:yt,ViewSystem:Fg,ViewableBuffer:ir,VividLightBlend:hd,WGSL_ALIGN_SIZE_DATA:qn,WGSL_TO_STD40_SIZE:mu,WRAP_MODES:Lv,WebGLRenderer:Gg,WebGPURenderer:Jg,WebWorkerAdapter:By,WorkerManager:ya,accessibilityTarget:Th,addBits:zo,addMaskBounds:hs,addMaskLocalBounds:ds,addProgramDefines:wh,alphaFrag:zp,alphaWgsl:Ga,appendSVGPath:ca,applyMatrix:F_,applyProjectiveTransformationToPlane:s_,applyStyleParams:Ru,assignWithIgnore:as,autoDetectEnvironment:Jb,autoDetectRenderer:vd,autoDetectSource:Gb,basisTranscoderUrls:Ks,bgr2rgb:vr,bitmapFontCachePlugin:zf,bitmapFontTextParser:Ws,bitmapFontXMLParser:ma,bitmapFontXMLStringParser:ga,bitmapTextSplit:V_,blendTemplateFrag:zh,blendTemplateVert:Hh,blendTemplateWgsl:Vh,blockDataMap:hl,blurTemplateWgsl:$p,boundsPool:bt,browserExt:nc,buildAdaptiveBezier:ta,buildAdaptiveQuadratic:xf,buildArc:sa,buildArcTo:bf,buildArcToSvg:vf,buildCircle:Gr,buildContextBatches:pf,buildEllipse:nf,buildGeometryFromPath:qv,buildLine:uf,buildPixelLine:lf,buildPolygon:cf,buildRectangle:hf,buildRoundedRectangle:sf,buildSimpleUvs:Ko,buildTriangle:df,buildUvs:jo,cacheAsTextureMixin:Mc,cacheTextureArray:Wf,calculatePathArea:Bf,calculateProjection:$m,canvasTextSplit:tx,checkChildrenDidChange:Zi,checkDataUrl:ur,checkExtension:lt,checkForNestedPattern:Ef,checkMaxIfStatementsInShader:Lo,childrenHelperMixin:Fc,cleanArray:Rg,cleanHash:Bg,clearList:gi,closePointEps:Zo,collectAllRenderables:Xv,collectRenderablesMixin:Uc,color32BitToUniform:jr,colorBit:Ms,colorBitGl:Fs,colorMatrixFilterFrag:Kp,colorMatrixFilterWgsl:La,colorToUniform:Tv,compareModeToGlCompare:gg,compileHighShader:Xd,compileHighShaderGl:$d,compileHighShaderGlProgram:Ur,compileHighShaderGpuProgram:Fr,compileHooks:Ho,compileInputs:Vo,compileOutputs:Wd,compileShader:Su,compute2DProjection:u_,convertFormatIfRequired:dy,convertToList:ut,copySearchParams:ms,createIdFromString:wr,createIndicesForQuads:bl,createLevelBuffers:Y2,createLevelBuffersFromKTX:fy,createStringVariations:th,createTexture:Vt,createUboElementsSTD40:zm,createUboElementsWGSL:Ng,createUboSyncFunction:gu,createUboSyncFunctionSTD40:Wm,createUboSyncFunctionWGSL:Hg,crossOrigin:up,cullingMixin:Pc,curveEps:Qo,defaultFilterVert:Vn,defaultValue:Cu,definedProps:ht,deprecation:L,detectAvif:Xf,detectBasis:H2,detectCompressed:yy,detectDefaults:Yf,detectMp4:qf,detectOgv:jf,detectVideoAlphaMode:io,detectWebm:Kf,detectWebp:Zf,determineCrossOrigin:cp,displacementFrag:Zp,displacementVert:Qp,displacementWgsl:Na,earcut:xd,effectsMixin:Oc,ensureAttributes:ou,ensureIsBuffer:No,ensurePrecision:Eh,ensureTextOptions:si,executeInstructions:mi,extensions:$,extractAttributesFromGlProgram:Jm,extractAttributesFromGpuProgram:Fh,extractFontFamilies:$_,extractStructAndGroups:xs,extractSubpaths:Pf,extractSvgUrlId:aa,fastCopy:Rs,findMixin:Gc,fontStringFromTextStyle:Tn,formatShader:jy,fragmentGPUTemplate:Kd,fragmentGlTemplate:Qd,generateArraySyncSTD40:Vm,generateArraySyncWGSL:zg,generateBlurFragSource:Vp,generateBlurGlProgram:Xp,generateBlurProgram:Yp,generateBlurVertSource:Wp,generateGPULayout:Yy,generateGpuLayoutGroups:Uh,generateLayout:qy,generateLayoutHash:Ih,generateParticleUpdateFunction:g_,generateProgram:sg,generateShaderSyncCode:jm,generateTextStyleKey:g1,generateTextureBatchBit:Us,generateTextureBatchBitGl:Is,generateTextureMatrix:ff,generateUniformsSync:ag,getAdjustedBlendModeBlend:Dr,getAttributeInfoFromFormat:Mt,getBatchSamplersUniformGroup:Os,getBitmapTextLayout:Hs,getCanvasBoundingBox:gm,getCanvasFillStyle:Mn,getCanvasTexture:bu,getDefaultUniformValue:kh,getFastGlobalBounds:Vv,getFastGlobalBoundsMixin:kc,getFillInstructionData:a2,getFontCss:j_,getFontFamilyName:rp,getGeometryBounds:Nd,getGlTypeFromFormat:Gm,getGlobalBounds:an,getGlobalMixin:zc,getGlobalRenderableBounds:sm,getLocalBounds:is,getMaxFragmentPrecision:Ah,getMaxTexturesPerBatch:Fd,getOrientationOfPoints:of,getPo2TextureFromSource:Fl,getResolutionOfUrl:Xs,getSVGUrl:K_,getSupportedCompressedTextureFormats:Ea,getSupportedGPUCompressedTextureFormats:wa,getSupportedGlCompressedTextureFormats:Aa,getSupportedTextureFormats:On,getTemporaryCanvasFromImage:Z_,getTestContext:mo,getTextureBatchBindGroup:Bs,getTextureDefaultMatrix:i1,getTextureFormatFromKTXTexture:gy,getUboData:eg,getUniformData:tg,getUrlExtension:rh,glFormatToGPUFormat:Pp,glUploadBufferImageResource:dg,glUploadCompressedTextureResource:fg,glUploadImageResource:Pu,glUploadVideoResource:pg,globalUniformsBit:Jd,globalUniformsBitGl:ef,globalUniformsUBOBitGl:G0,gpuFormatToBasisTranscoderFormat:j2,gpuFormatToKTXBasisTranscoderFormat:xy,gpuUploadBufferImageResource:Xg,gpuUploadCompressedTextureResource:$g,gpuUploadImageResource:dl,gpuUploadVideoResource:Yg,groupD8:J,hasCachedCanvasTexture:rv,hslWgsl:Vy,hslgl:bs,hslgpu:ys,injectBits:Wo,insertVersion:Ph,isMobile:xh,isPow2:Ni,isRenderingToScreen:Ym,isSafari:X_,isSingleItem:hn,isWebGLSupported:yn,isWebGPUSupported:vn,ktxTranscoderUrls:Zs,loadBasis:$2,loadBasisOnWorker:xp,loadBitmapFont:Hf,loadDDS:ry,loadEnvironmentExtensions:wo,loadFontAsBase64:Y_,loadFontCSS:q_,loadImageBitmap:ap,loadJson:ep,loadKTX:ay,loadKTX2:hy,loadKTX2onWorker:wp,loadSVGImage:Q_,loadSvg:sp,loadTextures:va,loadTxt:tp,loadVideoTextures:hp,loadWebFont:np,localUniformBit:Yr,localUniformBitGl:ui,localUniformBitGroup2:Rm,localUniformMSDFBit:O_,localUniformMSDFBitGl:G_,log2:bb,logDebugTexture:y1,logProgramError:ng,logRenderGroupScene:ax,logScene:ox,mSDFBit:k_,mSDFBitGl:L_,mapFormatToGlFormat:_g,mapFormatToGlInternalFormat:xg,mapFormatToGlType:bg,mapGlToVertexFormat:Qm,mapSize:av,mapType:Au,mapWebGLBlendModesToPixi:ug,maskFrag:im,maskVert:om,maskWgsl:Ya,matrixPool:Oe,measureHtmlText:Ka,measureMixin:Vc,migrateFragmentFromV7toV8:iv,mipmapScaleModeToGlFilter:mg,multiplyColors:un,multiplyHexColors:Ki,nextPow2:rr,noiseFrag:Jp,noiseWgsl:za,nonCompressedFormats:mp,normalizeExtensionPriority:rn,onRenderMixin:Wc,parseDDS:yp,parseFunctionBody:Hv,parseKTX:Sp,parseSVGDefinitions:Af,parseSVGFloatAttribute:ge,parseSVGPath:Rd,parseSVGStyle:la,particleData:Cl,particlesFrag:b_,particlesVert:y_,particlesWgsl:yl,passthroughFrag:tm,passthroughWgsl:Ha,path:Xe,pointInTriangle:Wa,preloadVideo:lp,removeItems:ji,removeStructAndGroupDuplicates:Oh,resetUids:xb,resolveCharacters:Nf,resolveCompressedTextureUrl:by,resolveJsonUrl:dp,resolveTextureUrl:Ca,resourceToTexture:Qc,roundPixelsBit:Ir,roundPixelsBitGl:Or,roundedShapeArc:Sf,roundedShapeQuadraticCurve:Tf,sayHello:Pg,scaleModeToGlFilter:Bu,setBasisTranscoderPath:W2,setKTXTranscoderPath:ly,setPositions:M_,setProgramName:Bh,setUvs:U_,shapeBuilders:kr,sortMixin:Xc,spritesheetAsset:ih,squaredDistanceToLineSegment:An,stripVersion:Rh,styleAttributes:ua,testImageFormat:_a,testVideoFormat:Fn,textStyleToCSS:bm,textureBit:Dm,textureBitGl:Mm,textureFrom:Jc,tilingBit:P_,tilingBitGl:B_,toFillStyle:Ht,toLocalGlobalMixin:$c,toStrokeStyle:Dn,transformVertices:ks,triangulateWithHoles:Jo,uboSyncFunctionsSTD40:_u,uboSyncFunctionsWGSL:Hm,uid:ae,uniformParsers:Xt,unpremultiplyAlpha:mv,unsafeEvalSupported:Eo,updateLocalTransform:$v,updateQuadBounds:Hi,updateRenderGroupTransform:vg,updateRenderGroupTransforms:Ou,updateTextBounds:wi,updateTransformAndChildren:Gu,updateTransformBackwards:ss,updateWorldTransform:Yv,v8_0_0:j,v8_3_4:dc,validFormats:Qs,validateRenderables:Tg,vertexGPUTemplate:jd,vertexGlTemplate:Zd,vkFormatToGPUFormat:Bp,warn:X,webworkerExt:sc,wrapModeToGlAddress:pi},Symbol.toStringTag,{value:"Module"}));var qt=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,jt=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}`,C1=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uStrength;
uniform vec3 uColor;
uniform float uKnockout;
uniform float uAlpha;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159265358979323846264;

// Hard-assignment of DIST and ANGLE_STEP_SIZE instead of using uDistance and uQuality to allow them to be use on GLSL loop conditions
const float DIST = __DIST__;
const float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.);
const float ANGLE_STEP_NUM = ceil(PI * 2. / ANGLE_STEP_SIZE);
const float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.) / 2.;

void main(void) {
    vec2 px = vec2(1.) / uInputSize.xy;

    float totalAlpha = 0.;

    vec2 direction;
    vec2 displaced;
    vec4 curColor;

    for (float angle = 0.; angle < PI * 2.; angle += ANGLE_STEP_SIZE) {
      direction = vec2(cos(angle), sin(angle)) * px;

      for (float curDistance = 0.; curDistance < DIST; curDistance++) {
          displaced = clamp(vTextureCoord + direction * (curDistance + 1.), uInputClamp.xy, uInputClamp.zw);
          curColor = texture(uTexture, displaced);
          totalAlpha += (DIST - curDistance) * curColor.a;
      }
    }
    
    curColor = texture(uTexture, vTextureCoord);

    vec4 glowColor = vec4(uColor, uAlpha);
    bool knockout = uKnockout > .5;
    float innerStrength = uStrength[0];
    float outerStrength = uStrength[1];

    float alphaRatio = totalAlpha / MAX_TOTAL_ALPHA;
    float innerGlowAlpha = (1. - alphaRatio) * innerStrength * curColor.a * uAlpha;
    float innerGlowStrength = min(1., innerGlowAlpha);
    
    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);
    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a) * uAlpha;
    float outerGlowStrength = min(1. - innerColor.a, outerGlowAlpha);
    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;

    if (knockout) {
      float resultAlpha = outerGlowAlpha + innerGlowAlpha;
      finalColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);
    }
    else {
      finalColor = innerColor + outerGlowColor;
    }
}
`,A1=`struct GlowUniforms {
  uDistance: f32,
  uStrength: vec2<f32>,
  uColor: vec3<f32>,
  uAlpha: f32,
  uQuality: f32,
  uKnockout: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> glowUniforms : GlowUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let quality = glowUniforms.uQuality;
  let distance = glowUniforms.uDistance;

  let dist: f32 = glowUniforms.uDistance;
  let angleStepSize: f32 = min(1. / quality / distance, PI * 2.0);
  let angleStepNum: f32 = ceil(PI * 2.0 / angleStepSize);

  let px: vec2<f32> = vec2<f32>(1.0 / gfu.uInputSize.xy);

  var totalAlpha: f32 = 0.0;

  var direction: vec2<f32>;
  var displaced: vec2<f32>;
  var curColor: vec4<f32>;

  for (var angle = 0.0; angle < PI * 2.0; angle += angleStepSize) {
    direction = vec2<f32>(cos(angle), sin(angle)) * px;
    for (var curDistance = 0.0; curDistance < dist; curDistance+=1) {
      displaced = vec2<f32>(clamp(uv + direction * (curDistance + 1.0), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
      curColor = textureSample(uTexture, uSampler, displaced);
      totalAlpha += (dist - curDistance) * curColor.a;
    }
  }
    
  curColor = textureSample(uTexture, uSampler, uv);

  let glowColorRGB = glowUniforms.uColor;
  let glowAlpha = glowUniforms.uAlpha;
  let glowColor = vec4<f32>(glowColorRGB, glowAlpha);
  let knockout: bool = glowUniforms.uKnockout > 0.5;
  let innerStrength = glowUniforms.uStrength[0];
  let outerStrength = glowUniforms.uStrength[1];

  let alphaRatio: f32 = (totalAlpha / (angleStepNum * dist * (dist + 1.0) / 2.0));
  let innerGlowAlpha: f32 = (1.0 - alphaRatio) * innerStrength * curColor.a * glowAlpha;
  let innerGlowStrength: f32 = min(1.0, innerGlowAlpha);
  
  let innerColor: vec4<f32> = mix(curColor, glowColor, innerGlowStrength);
  let outerGlowAlpha: f32 = alphaRatio * outerStrength * (1. - curColor.a) * glowAlpha;
  let outerGlowStrength: f32 = min(1.0 - innerColor.a, outerGlowAlpha);
  let outerGlowColor: vec4<f32> = outerGlowStrength * glowColor.rgba;
  
  if (knockout) {
    let resultAlpha: f32 = outerGlowAlpha + innerGlowAlpha;
    return vec4<f32>(glowColor.rgb * resultAlpha, resultAlpha);
  }
  else {
    return innerColor + outerGlowColor;
  }
}

const PI: f32 = 3.14159265358979323846264;`,w1=Object.defineProperty,E1=(n,e,t)=>e in n?w1(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,kl=(n,e,t)=>(E1(n,typeof e!="symbol"?e+"":e,t),t);const ux=class ib extends Fe{constructor(e){e={...ib.DEFAULT_OPTIONS,...e};const t=e.distance??10,r=e.quality??.1,s=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:A1,entryPoint:"mainFragment"}}),i=be.from({vertex:qt,fragment:C1.replace(/__ANGLE_STEP_SIZE__/gi,`${(1/r/t).toFixed(7)}`).replace(/__DIST__/gi,`${t.toFixed(0)}.0`),name:"glow-filter"});super({gpuProgram:s,glProgram:i,resources:{glowUniforms:{uDistance:{value:t,type:"f32"},uStrength:{value:[e.innerStrength,e.outerStrength],type:"vec2<f32>"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uAlpha:{value:e.alpha,type:"f32"},uQuality:{value:r,type:"f32"},uKnockout:{value:(e==null?void 0:e.knockout)??!1?1:0,type:"f32"}}},padding:t}),kl(this,"uniforms"),kl(this,"_color"),this.uniforms=this.resources.glowUniforms.uniforms,this._color=new ee,this.color=e.color??16777215}get distance(){return this.uniforms.uDistance}set distance(e){this.uniforms.uDistance=this.padding=e}get innerStrength(){return this.uniforms.uStrength[0]}set innerStrength(e){this.uniforms.uStrength[0]=e}get outerStrength(){return this.uniforms.uStrength[1]}set outerStrength(e){this.uniforms.uStrength[1]=e}get color(){return this._color.value}set color(e){this._color.setValue(e);const[t,r,s]=this._color.toArray();this.uniforms.uColor[0]=t,this.uniforms.uColor[1]=r,this.uniforms.uColor[2]=s}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}get quality(){return this.uniforms.uQuality}set quality(e){this.uniforms.uQuality=e}get knockout(){return this.uniforms.uKnockout===1}set knockout(e){this.uniforms.uKnockout=e?1:0}};kl(ux,"DEFAULT_OPTIONS",{distance:10,outerStrength:4,innerStrength:0,color:16777215,alpha:1,quality:.1,knockout:!1});let P1=ux;var B1=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uTime;
uniform float uSpeed;
uniform vec4 uWave;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159;

void main()
{
    float uAmplitude = uWave[0];
    float uWavelength = uWave[1];
    float uBrightness = uWave[2];
    float uRadius = uWave[3];

    float halfWavelength = uWavelength * 0.5 / uInputSize.x;
    float maxRadius = uRadius / uInputSize.x;
    float currentRadius = uTime * uSpeed / uInputSize.x;

    float fade = 1.0;

    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            finalColor = texture(uTexture, vTextureCoord);
            return;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }

    vec2 dir = vec2(vTextureCoord - uCenter / uInputSize.xy);
    dir.y *= uInputSize.y / uInputSize.x;
    float dist = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        finalColor = texture(uTexture, vTextureCoord);
        return;
    }

    vec2 diffUV = normalize(dir);

    float diff = (dist - currentRadius) / halfWavelength;

    float p = 1.0 - pow(abs(diff), 2.0);

    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );
    float powDiff = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );

    vec2 offset = diffUV * powDiff / uInputSize.xy;

    // Do clamp :
    vec2 coord = vTextureCoord + offset;
    vec2 clampedCoord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    vec4 color = texture(uTexture, clampedCoord);
    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    // No clamp :
    // finalColor = texture(uTexture, vTextureCoord + offset);

    color.rgb *= 1.0 + (uBrightness - 1.0) * p * fade;

    finalColor = color;
}
`,R1=`
struct ShockWaveUniforms {
    uTime: f32,
    uOffset: vec2<f32>,
    uSpeed: f32,
    uWave: vec4<f32>,
};

struct GlobalFilterUniforms {
    uInputSize:vec4<f32>,
    uInputPixel:vec4<f32>,
    uInputClamp:vec4<f32>,
    uOutputFrame:vec4<f32>,
    uGlobalFrame:vec4<f32>,
    uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> shockwaveUniforms : ShockWaveUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {

    let uTime = shockwaveUniforms.uTime;
    let uOffset = shockwaveUniforms.uOffset;
    let uSpeed = shockwaveUniforms.uSpeed;
    let uAmplitude = shockwaveUniforms.uWave[0];
    let uWavelength = shockwaveUniforms.uWave[1];
    let uBrightness = shockwaveUniforms.uWave[2];
    let uRadius = shockwaveUniforms.uWave[3];
    let halfWavelength: f32 = uWavelength * 0.5 / gfu.uInputSize.x;
    let maxRadius: f32 = uRadius / gfu.uInputSize.x;
    let currentRadius: f32 = uTime * uSpeed / gfu.uInputSize.x;
    var fade: f32 = 1.0;
    var returnColorOnly: bool = false;
    
    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            returnColorOnly = true;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }
    var dir: vec2<f32> = vec2<f32>(uv - uOffset / gfu.uInputSize.xy);
    dir.y *= gfu.uInputSize.y / gfu.uInputSize.x;

    let dist:f32 = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        returnColorOnly = true;
    }

    let diffUV: vec2<f32> = normalize(dir);
    let diff: f32 = (dist - currentRadius) / halfWavelength;
    let p: f32 = 1.0 - pow(abs(diff), 2.0);
    let powDiff: f32 = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );
    let offset: vec2<f32> = diffUV * powDiff / gfu.uInputSize.xy;
    // Do clamp :
    let coord: vec2<f32> = uv + offset;
    let clampedCoord: vec2<f32> = clamp(coord, gfu.uInputClamp.xy, gfu.uInputClamp.zw);

    var clampedColor: vec4<f32> = textureSample(uTexture, uSampler, clampedCoord);
    
    if (boolVec2(coord, clampedCoord)) 
    {
        clampedColor *= max(0.0, 1.0 - length(coord - clampedCoord));
    }
    // No clamp :
    var finalColor = clampedColor;

    return select(finalColor, textureSample(uTexture, uSampler, uv), returnColorOnly);
}

fn boolVec2(x: vec2<f32>, y: vec2<f32>) -> bool
{
    if (x.x == y.x && x.y == y.y)
    {
        return true;
    }
    
    return false;
}

const PI: f32 = 3.14159265358979323846264;
`,D1=Object.defineProperty,M1=(n,e,t)=>e in n?D1(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Ll=(n,e,t)=>(M1(n,typeof e!="symbol"?e+"":e,t),t);const lx=class ob extends Fe{constructor(...e){let t=e[0]??{};(Array.isArray(t)||"x"in t&&"y"in t)&&(L("6.0.0","ShockwaveFilter constructor params are now options object. See params: { center, speed, amplitude, wavelength, brightness, radius, time }"),t={center:t,...e[1]},e[2]!==void 0&&(t.time=e[2])),t={...ob.DEFAULT_OPTIONS,...t};const r=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:R1,entryPoint:"mainFragment"}}),s=be.from({vertex:qt,fragment:B1,name:"shockwave-filter"});super({gpuProgram:r,glProgram:s,resources:{shockwaveUniforms:{uTime:{value:t.time,type:"f32"},uCenter:{value:t.center,type:"vec2<f32>"},uSpeed:{value:t.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}}}}),Ll(this,"uniforms"),Ll(this,"time"),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,t)}apply(e,t,r,s){this.uniforms.uTime=this.time,e.applyFilter(this,t,r,s)}get center(){return this.uniforms.uCenter}set center(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uCenter=e}get centerX(){return this.uniforms.uCenter.x}set centerX(e){this.uniforms.uCenter.x=e}get centerY(){return this.uniforms.uCenter.y}set centerY(e){this.uniforms.uCenter.y=e}get speed(){return this.uniforms.uSpeed}set speed(e){this.uniforms.uSpeed=e}get amplitude(){return this.uniforms.uWave[0]}set amplitude(e){this.uniforms.uWave[0]=e}get wavelength(){return this.uniforms.uWave[1]}set wavelength(e){this.uniforms.uWave[1]=e}get brightness(){return this.uniforms.uWave[2]}set brightness(e){this.uniforms.uWave[2]=e}get radius(){return this.uniforms.uWave[3]}set radius(e){this.uniforms.uWave[3]=e}};Ll(lx,"DEFAULT_OPTIONS",{center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1});let F1=lx;var U1=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTwist;
uniform vec2 uOffset;
uniform vec4 uInputSize;

vec2 mapCoord( vec2 coord )
{
    coord *= uInputSize.xy;
    coord += uInputSize.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= uInputSize.zw;
    coord /= uInputSize.xy;

    return coord;
}

vec2 twist(vec2 coord)
{
    coord -= uOffset;

    float dist = length(coord);
    float uRadius = uTwist[0];
    float uAngle = uTwist[1];

    if (dist < uRadius)
    {
        float ratioDist = (uRadius - dist) / uRadius;
        float angleMod = ratioDist * ratioDist * uAngle;
        float s = sin(angleMod);
        float c = cos(angleMod);
        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);
    }

    coord += uOffset;

    return coord;
}

void main(void)
{
    vec2 coord = mapCoord(vTextureCoord);
    coord = twist(coord);
    coord = unmapCoord(coord);
    finalColor = texture(uTexture, coord);
}
`,I1=`struct TwistUniforms {
  uTwist:vec2<f32>,
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> twistUniforms : TwistUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  return textureSample(uTexture, uSampler, unmapCoord(twist(mapCoord(uv))));
}

fn mapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord *= gfu.uInputSize.xy;
  mappedCoord += gfu.uOutputFrame.xy;
  return mappedCoord;
}

fn unmapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord -= gfu.uOutputFrame.xy;
  mappedCoord /= gfu.uInputSize.xy;
  return mappedCoord;
}

fn twist(coord: vec2<f32>) -> vec2<f32>
{
  var twistedCoord: vec2<f32> = coord;
  let uRadius = twistUniforms.uTwist[0];
  let uAngle = twistUniforms.uTwist[1];
  let uOffset = twistUniforms.uOffset;

  twistedCoord -= uOffset;
  
  let dist = length(twistedCoord);

  if (dist < uRadius)
  {
    let ratioDist: f32 = (uRadius - dist) / uRadius;
    let angleMod: f32 = ratioDist * ratioDist * uAngle;
    let s: f32 = sin(angleMod);
    let c: f32 = cos(angleMod);
    twistedCoord = vec2<f32>(twistedCoord.x * c - twistedCoord.y * s, twistedCoord.x * s + twistedCoord.y * c);
  }

  twistedCoord += uOffset;
  return twistedCoord;
}
`,O1=Object.defineProperty,G1=(n,e,t)=>e in n?O1(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,cx=(n,e,t)=>(G1(n,typeof e!="symbol"?e+"":e,t),t);const hx=class ab extends Fe{constructor(e){e={...ab.DEFAULT_OPTIONS,...e};const t=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:I1,entryPoint:"mainFragment"}}),r=be.from({vertex:qt,fragment:U1,name:"twist-filter"});super({gpuProgram:t,glProgram:r,resources:{twistUniforms:{uTwist:{value:[e.radius??0,e.angle??0],type:"vec2<f32>"},uOffset:{value:e.offset,type:"vec2<f32>"}}},...e}),cx(this,"uniforms"),this.uniforms=this.resources.twistUniforms.uniforms}get radius(){return this.uniforms.uTwist[0]}set radius(e){this.uniforms.uTwist[0]=e}get angle(){return this.uniforms.uTwist[1]}set angle(e){this.uniforms.uTwist[1]=e}get offset(){return this.uniforms.uOffset}set offset(e){this.uniforms.uOffset=e}get offsetX(){return this.offset.x}set offsetX(e){this.offset.x=e}get offsetY(){return this.offset.y}set offsetY(e){this.offset.y=e}};cx(hx,"DEFAULT_OPTIONS",{padding:20,radius:200,angle:4,offset:{x:0,y:0}});let k1=hx;var L1=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uDimensions;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uStrength;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

void main()
{
    vec2 coord = vTextureCoord * uInputSize.xy;
    coord -= uCenter * uDimensions.xy;
    float distance = length(coord);

    if (distance < uRadius) {
        float percent = distance / uRadius;
        if (uStrength > 0.0) {
            coord *= mix(1.0, smoothstep(0.0, uRadius / distance, percent), uStrength * 0.75);
        } else {
            coord *= mix(1.0, pow(percent, 1.0 + uStrength * 0.75) * uRadius / distance, 1.0 - percent);
        }
    }

    coord += uCenter * uDimensions.xy;
    coord /= uInputSize.xy;
    vec2 clampedCoord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    vec4 color = texture(uTexture, clampedCoord);

    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    finalColor = color;
}
`,N1=`struct BulgePinchUniforms {
  uDimensions: vec2<f32>,
  uCenter: vec2<f32>,
  uRadius: f32,
  uStrength: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> bulgePinchUniforms : BulgePinchUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let dimensions: vec2<f32> = bulgePinchUniforms.uDimensions;
  let center: vec2<f32> = bulgePinchUniforms.uCenter;
  let radius: f32 = bulgePinchUniforms.uRadius;
  let strength: f32 = bulgePinchUniforms.uStrength;
  var coord: vec2<f32> = (uv * gfu.uInputSize.xy) - center * dimensions.xy;

  let distance: f32 = length(coord);

  if (distance < radius) {
      let percent: f32 = distance / radius;
      if (strength > 0.0) {
          coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);
      } else {
          coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);
      }
  }
    coord += (center * dimensions.xy);
    coord /= gfu.uInputSize.xy;

    let clampedCoord: vec2<f32> = clamp(coord, gfu.uInputClamp.xy, gfu.uInputClamp.zw);
    var color: vec4<f32> = textureSample(uTexture, uSampler, clampedCoord);
    if (coord.x != clampedCoord.x && coord.y != clampedCoord.y) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    return color;
}

fn compareVec2(x: vec2<f32>, y: vec2<f32>) -> bool
{
  if (x.x == y.x && x.y == y.y)
  {
    return true;
  }

  return false;
}`,z1=Object.defineProperty,H1=(n,e,t)=>e in n?z1(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,dx=(n,e,t)=>(H1(n,typeof e!="symbol"?e+"":e,t),t);const fx=class ub extends Fe{constructor(e){e={...ub.DEFAULT_OPTIONS,...e};const t=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:N1,entryPoint:"mainFragment"}}),r=be.from({vertex:qt,fragment:L1,name:"bulge-pinch-filter"});super({gpuProgram:t,glProgram:r,resources:{bulgePinchUniforms:{uDimensions:{value:[0,0],type:"vec2<f32>"},uCenter:{value:{x:0,y:0},type:"vec2<f32>"},uRadius:{value:e.radius,type:"f32"},uStrength:{value:e.strength,type:"f32"}}}}),dx(this,"uniforms"),this.uniforms=this.resources.bulgePinchUniforms.uniforms,Object.assign(this,e)}apply(e,t,r,s){this.uniforms.uDimensions[0]=t.frame.width,this.uniforms.uDimensions[1]=t.frame.height,e.applyFilter(this,t,r,s)}get center(){return this.uniforms.uCenter}set center(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uCenter=e}get centerX(){return this.uniforms.uCenter.x}set centerX(e){this.uniforms.uCenter.x=e}get centerY(){return this.uniforms.uCenter.y}set centerY(e){this.uniforms.uCenter.y=e}get radius(){return this.uniforms.uRadius}set radius(e){this.uniforms.uRadius=e}get strength(){return this.uniforms.uStrength}set strength(e){this.uniforms.uStrength=e}};dx(fx,"DEFAULT_OPTIONS",{center:{x:.5,y:.5},radius:100,strength:1});let V1=fx;var W1=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uVelocity;
uniform int uKernelSize;
uniform float uOffset;

uniform vec4 uInputSize;

const int MAX_KERNEL_SIZE = 2048;

// Notice:
// the perfect way:
//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);
// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.
// So use uKernelSize directly.

void main(void)
{
    vec4 color = texture(uTexture, vTextureCoord);

    if (uKernelSize == 0)
    {
        finalColor = color;
        return;
    }

    vec2 velocity = uVelocity / uInputSize.xy;
    float offset = -uOffset / length(uVelocity) - 0.5;
    int k = uKernelSize - 1;

    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {
        if (i == k) {
            break;
        }
        vec2 bias = velocity * (float(i) / float(k) + offset);
        color += texture(uTexture, vTextureCoord + bias);
    }
    finalColor = color / float(uKernelSize);
}
`,X1=`struct MotionBlurUniforms {
  uVelocity: vec2<f32>,
  uKernelSize: i32,
  uOffset: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> motionBlurUniforms : MotionBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uVelocity = motionBlurUniforms.uVelocity;
  let uKernelSize = motionBlurUniforms.uKernelSize;
  let uOffset = motionBlurUniforms.uOffset;

  let velocity: vec2<f32> = uVelocity / gfu.uInputSize.xy;
  let offset: f32 = -uOffset / length(uVelocity) - 0.5;
  let k: i32 = min(uKernelSize - 1, MAX_KERNEL_SIZE - 1);

  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  for(var i: i32 = 0; i < k; i += 1) {
    let bias: vec2<f32> = velocity * (f32(i) / f32(k) + offset);
    color += textureSample(uTexture, uSampler, uv + bias);
  }
  
  return select(color / f32(uKernelSize), textureSample(uTexture, uSampler, uv), uKernelSize == 0);
}

const MAX_KERNEL_SIZE: i32 = 2048;`,$1=Object.defineProperty,Y1=(n,e,t)=>e in n?$1(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Nl=(n,e,t)=>(Y1(n,typeof e!="symbol"?e+"":e,t),t);const px=class lb extends Fe{constructor(...e){let t=e[0]??{};if(Array.isArray(t)||"x"in t&&"y"in t||t instanceof le){L("6.0.0","MotionBlurFilter constructor params are now options object. See params: { velocity, kernelSize, offset }");const i="x"in t?t.x:t[0],o="y"in t?t.y:t[1];t={velocity:{x:i,y:o}},e[1]!==void 0&&(t.kernelSize=e[1]),e[2]!==void 0&&(t.offset=e[2])}t={...lb.DEFAULT_OPTIONS,...t};const r=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:X1,entryPoint:"mainFragment"}}),s=be.from({vertex:qt,fragment:W1,name:"motion-blur-filter"});super({gpuProgram:r,glProgram:s,resources:{motionBlurUniforms:{uVelocity:{value:{x:0,y:0},type:"vec2<f32>"},uKernelSize:{value:Math.trunc(t.kernelSize??5),type:"i32"},uOffset:{value:t.offset,type:"f32"}}}}),Nl(this,"uniforms"),Nl(this,"_kernelSize"),this.uniforms=this.resources.motionBlurUniforms.uniforms,Object.assign(this,t)}get velocity(){return this.uniforms.uVelocity}set velocity(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uVelocity=e,this._updateDirty()}get velocityX(){return this.velocity.x}set velocityX(e){this.velocity.x=e,this._updateDirty()}get velocityY(){return this.velocity.y}set velocityY(e){this.velocity.y=e,this._updateDirty()}get kernelSize(){return this._kernelSize}set kernelSize(e){this._kernelSize=e,this._updateDirty()}get offset(){return this.uniforms.uOffset}set offset(e){this.uniforms.uOffset=e}_updateDirty(){this.padding=(Math.max(Math.abs(this.velocityX),Math.abs(this.velocityY))>>0)+1,this.uniforms.uKernelSize=this.velocityX!==0||this.velocityY!==0?this._kernelSize:0}};Nl(px,"DEFAULT_OPTIONS",{velocity:{x:0,y:0},kernelSize:5,offset:0});let q1=px;var j1=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample top right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample bottom right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));

    // Sample bottom left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));

    // Average
    color *= 0.25;

    finalColor = color;
}`,K1=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4<f32>(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y));
  // Average
  color *= 0.25;

  return color;
}`,Z1=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

uniform vec4 uInputClamp;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample top right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Average
    color *= 0.25;

    finalColor = color;
}
`,Q1=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Average
  color *= 0.25;
    
  return color;
}`,J1=Object.defineProperty,eS=(n,e,t)=>e in n?J1(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,fr=(n,e,t)=>(eS(n,typeof e!="symbol"?e+"":e,t),t);const mx=class cb extends Fe{constructor(...e){let t=e[0]??{};(typeof t=="number"||Array.isArray(t))&&(L("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),t={strength:t},e[1]!==void 0&&(t.quality=e[1]),e[2]!==void 0&&(t.clamp=e[2])),t={...cb.DEFAULT_OPTIONS,...t};const r=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:t!=null&&t.clamp?Q1:K1,entryPoint:"mainFragment"}}),s=be.from({vertex:qt,fragment:t!=null&&t.clamp?Z1:j1,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:s,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),fr(this,"uniforms"),fr(this,"_pixelSize",{x:0,y:0}),fr(this,"_clamp"),fr(this,"_kernels",[]),fr(this,"_blur"),fr(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=t.pixelSize??{x:1,y:1},Array.isArray(t.strength)?this.kernels=t.strength:typeof t.strength=="number"&&(this._blur=t.strength,this.quality=t.quality??3),this._clamp=!!t.clamp}apply(e,t,r,s){const i=this.pixelSizeX/t.source.width,o=this.pixelSizeY/t.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*o,e.applyFilter(this,t,r,s);else{const u=ue.getSameSizeTexture(t);let l=t,c=u,h;const d=this._quality-1;for(let f=0;f<d;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*o,e.applyFilter(this,l,c,!0),h=l,l=c,c=h;a=this._kernels[d]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*o,e.applyFilter(this,l,r,s),ue.returnTexture(u)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,t)=>e+t+.5,0))}_generateKernels(){const e=this._blur,t=this._quality,r=[e];if(e>0){let s=e;const i=e/t;for(let o=1;o<t;o++)s-=i,r.push(s)}this._kernels=r,this._updatePadding()}};fr(mx,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let tS=mx;var rS=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;
uniform float uBloomScale;
uniform float uBrightness;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);
    color.rgb *= uBrightness;
    vec4 bloomColor = vec4(texture(uMapTexture, vTextureCoord).rgb, 0.0);
    bloomColor.rgb *= uBloomScale;
    finalColor = color + bloomColor;
}
`,nS=`struct AdvancedBloomUniforms {
  uBloomScale: f32,
  uBrightness: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> advancedBloomUniforms : AdvancedBloomUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color = textureSample(uTexture, uSampler, uv);
  color = vec4<f32>(color.rgb * advancedBloomUniforms.uBrightness, color.a);

  var bloomColor = vec4<f32>(textureSample(uMapTexture, uSampler, uv).rgb, 0.0);
  bloomColor = vec4<f32>(bloomColor.rgb * advancedBloomUniforms.uBloomScale, bloomColor.a);
  
  return color + bloomColor;
}
`,sS=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uThreshold;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);

    // A simple & fast algorithm for getting brightness.
    // It's inaccuracy , but good enought for this feature.
    float _max = max(max(color.r, color.g), color.b);
    float _min = min(min(color.r, color.g), color.b);
    float brightness = (_max + _min) * 0.5;

    if(brightness > uThreshold) {
        finalColor = color;
    } else {
        finalColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
`,iS=`struct ExtractBrightnessUniforms {
  uThreshold: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> extractBrightnessUniforms : ExtractBrightnessUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  // A simple & fast algorithm for getting brightness.
  // It's inaccurate, but good enough for this feature.
  let max: f32 = max(max(color.r, color.g), color.b);
  let min: f32 = min(min(color.r, color.g), color.b);
  let brightness: f32 = (max + min) * 0.5;

  return select(vec4<f32>(0.), color, brightness > extractBrightnessUniforms.uThreshold);
}
`,oS=Object.defineProperty,aS=(n,e,t)=>e in n?oS(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,gx=(n,e,t)=>(aS(n,typeof e!="symbol"?e+"":e,t),t);const _x=class hb extends Fe{constructor(e){e={...hb.DEFAULT_OPTIONS,...e};const t=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:iS,entryPoint:"mainFragment"}}),r=be.from({vertex:qt,fragment:sS,name:"extract-brightness-filter"});super({gpuProgram:t,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),gx(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};gx(_x,"DEFAULT_OPTIONS",{threshold:.5});let uS=_x;var lS=Object.defineProperty,cS=(n,e,t)=>e in n?lS(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Kr=(n,e,t)=>(cS(n,typeof e!="symbol"?e+"":e,t),t);const xx=class db extends Fe{constructor(e){e={...db.DEFAULT_OPTIONS,...e};const t=pe.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:nS,entryPoint:"mainFragment"}}),r=be.from({vertex:qt,fragment:rS,name:"advanced-bloom-filter"});super({gpuProgram:t,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:k.WHITE}}),Kr(this,"uniforms"),Kr(this,"bloomScale",1),Kr(this,"brightness",1),Kr(this,"_extractFilter"),Kr(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new uS({threshold:e.threshold}),this._blurFilter=new tS({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,t,r,s){const i=ue.getSameSizeTexture(t);this._extractFilter.apply(e,t,i,!0);const o=ue.getSameSizeTexture(t);this._blurFilter.apply(e,i,o,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=o.source,e.applyFilter(this,t,r,s),ue.returnTexture(o),ue.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Kr(xx,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let hS=xx;window.PIXI=T1,window.PIXI_FILTERS={GlowFilter:P1,ShockwaveFilter:F1,TwistFilter:k1,BulgePinchFilter:V1,MotionBlurFilter:q1,AdvancedBloomFilter:hS},$.add(Sh),$.mixin(ce,Th),$.add(Fo),$.add(Uo),$.add(Oa),$.mixin(ce,Np),$.add(Fa),$.add(gl),$.add(Ns),$.add(xl),$.add(Sl),$.add(Tl),$.add(Gl),$.add(Ol),$.add(Dl),$.add(Ul),$.add(Ml),$.add(Pl),$.add(Al),$.add($a),$.add(Va);const dS=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),fS=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}))})();

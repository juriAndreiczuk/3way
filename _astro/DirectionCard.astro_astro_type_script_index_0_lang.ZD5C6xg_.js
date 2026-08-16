const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/BitmapFont.zSwypk1l.js","_astro/Geometry.w6HqEPxZ.js","_astro/canvasUtils.CyQIp_1O.js","_astro/Cache.B_FBVqgZ.js","_astro/GraphicsContext.CuF-Y6YE.js","_astro/getTextureBatchBindGroup.BXAXMjfN.js","_astro/GCManagedHash.xyxcKCqL.js","_astro/CanvasPool.B8fKSFnp.js"])))=>i.map(i=>d[i]);
import{B as e,F as t,O as n,P as r,a as i,c as a,k as o,p as s,s as c,u as l,v as u,x as d,z as f}from"./Geometry.w6HqEPxZ.js";import{n as p,t as m}from"./lib.Bf_xPjBR.js";import{o as h,t as g,u as _}from"./Filter.Cjcx3eCq.js";import{a as v,i as y,n as b,o as x,r as S,s as ee,t as te}from"./init.BmsBAdCf.js";import{r as C}from"./canvasUtils.CyQIp_1O.js";import{n as w,t as T}from"./Cache.B_FBVqgZ.js";import{t as ne}from"./GraphicsContext.CuF-Y6YE.js";import{t as re}from"./defaultFilter.vert.Bj4g9K4z.js";import{t as E}from"./gsap.DWxn8li7.js";var D={test(e){return typeof e==`string`&&e.startsWith(`info face=`)},parse(e){let t=e.match(/^[a-z]+\s+.+$/gm),n={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(let e in t){let r=t[e].match(/^[a-z]+/gm)[0],i=t[e].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),a={};for(let e in i){let t=i[e].split(`=`),n=t[0],r=t[1].replace(/"/gm,``),o=parseFloat(r);a[n]=isNaN(o)?r:o}n[r].push(a)}let r={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:``,distanceField:null,baseLineOffset:0},[i]=n.info,[a]=n.common,[o]=n.distanceField??[];o&&(r.distanceField={range:parseInt(o.distanceRange,10),type:o.fieldType}),r.fontSize=parseInt(i.size,10),r.fontFamily=i.face,r.lineHeight=parseInt(a.lineHeight,10);let s=n.page;for(let e=0;e<s.length;e++)r.pages.push({id:parseInt(s[e].id,10)||0,file:s[e].file});let c={};r.baseLineOffset=r.lineHeight-parseInt(a.base,10);let l=n.char;for(let e=0;e<l.length;e++){let t=l[e],n=parseInt(t.id,10),i=t.letter??t.char??String.fromCharCode(n);i===`space`&&(i=` `),c[n]=i,r.chars[i]={id:n,page:parseInt(t.page,10)||0,x:parseInt(t.x,10),y:parseInt(t.y,10),width:parseInt(t.width,10),height:parseInt(t.height,10),xOffset:parseInt(t.xoffset,10),yOffset:parseInt(t.yoffset,10),xAdvance:parseInt(t.xadvance,10),kerning:{}}}let u=n.kerning||[];for(let e=0;e<u.length;e++){let t=parseInt(u[e].first,10),n=parseInt(u[e].second,10),i=parseInt(u[e].amount,10);r.chars[c[n]]&&(r.chars[c[n]].kerning[c[t]]=i)}return r}},O={test(e){let t=e;return typeof t!=`string`&&`getElementsByTagName`in t&&t.getElementsByTagName(`page`).length&&t.getElementsByTagName(`info`)[0].getAttribute(`face`)!==null},parse(e){let t={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:``,distanceField:null,baseLineOffset:0},n=e.getElementsByTagName(`info`)[0],r=e.getElementsByTagName(`common`)[0],i=e.getElementsByTagName(`distanceField`)[0];i&&(t.distanceField={type:i.getAttribute(`fieldType`),range:parseInt(i.getAttribute(`distanceRange`),10)});let a=e.getElementsByTagName(`page`),o=e.getElementsByTagName(`char`),s=e.getElementsByTagName(`kerning`);t.fontSize=parseInt(n.getAttribute(`size`),10),t.fontFamily=n.getAttribute(`face`),t.lineHeight=parseInt(r.getAttribute(`lineHeight`),10);for(let e=0;e<a.length;e++)t.pages.push({id:parseInt(a[e].getAttribute(`id`),10)||0,file:a[e].getAttribute(`file`)});let c={};t.baseLineOffset=t.lineHeight-parseInt(r.getAttribute(`base`),10);for(let e=0;e<o.length;e++){let n=o[e],r=parseInt(n.getAttribute(`id`),10),i=n.getAttribute(`letter`)??n.getAttribute(`char`)??String.fromCharCode(r);i===`space`&&(i=` `),c[r]=i,t.chars[i]={id:r,page:parseInt(n.getAttribute(`page`),10)||0,x:parseInt(n.getAttribute(`x`),10),y:parseInt(n.getAttribute(`y`),10),width:parseInt(n.getAttribute(`width`),10),height:parseInt(n.getAttribute(`height`),10),xOffset:parseInt(n.getAttribute(`xoffset`),10),yOffset:parseInt(n.getAttribute(`yoffset`),10),xAdvance:parseInt(n.getAttribute(`xadvance`),10),kerning:{}}}for(let e=0;e<s.length;e++){let n=parseInt(s[e].getAttribute(`first`),10),r=parseInt(s[e].getAttribute(`second`),10),i=parseInt(s[e].getAttribute(`amount`),10);t.chars[c[r]]&&(t.chars[c[r]].kerning[c[n]]=i)}return t}},k={test(e){return typeof e==`string`&&e.match(/<font(\s|>)/)?O.test(s.get().parseXML(e)):!1},parse(e){return O.parse(s.get().parseXML(e))}},ie=[`.xml`,`.fnt`],ae={extension:{type:f.CacheParser,name:`cacheBitmapFont`},test:e=>!!e?.pages&&!!e?.chars&&typeof e?.fontFamily==`string`&&e.fontFamily!==``,getCacheableAssets(e,t){let n={};return e.forEach(e=>{n[e]=t,n[`${e}-bitmap`]=t}),n[`${t.fontFamily}-bitmap`]=t,n}},oe={extension:{type:f.LoadParser,priority:v.Normal},name:`loadBitmapFont`,id:`bitmap-font`,test(e){return ie.includes(y.extname(e).toLowerCase())},async testParse(e){return D.test(e)||k.test(e)},async parse(e,t,n){let r=D.test(e)?D.parse(e):k.parse(e),{src:i}=t,{pages:a}=r,o=[],s=r.distanceField?{scaleMode:`linear`,alphaMode:`premultiply-alpha-on-upload`,autoGenerateMipmaps:!1,resolution:1}:{};for(let e=0;e<a.length;++e){let t=a[e].file,n=y.join(y.dirname(i),t);n=te(n,i),o.push({src:n,data:s})}let[c,{BitmapFont:l}]=await Promise.all([n.load(o),p(()=>import(`./BitmapFont.zSwypk1l.js`).then(e=>e.t),__vite__mapDeps([0,1,2,3,4,5,6,7]))]);return new l({data:r,textures:o.map(e=>c[e.src])},i)},async load(e,t){return await(await s.get().fetch(e)).text()},async unload(e,t,n){await Promise.all(e.pages.map(e=>n.unload(e.texture.source._sourceOrigin))),e.destroy()}},se=class{constructor(e,t=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=t}add(e){e.forEach(e=>{this._assetList.push(e)}),this.verbose&&console.log(`[BackgroundLoader] assets: `,this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;let e=[],t=Math.min(this._assetList.length,this._maxConcurrent);for(let n=0;n<t;n++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}},ce={extension:{type:f.CacheParser,name:`cacheTextureArray`},test:e=>Array.isArray(e)&&e.every(e=>e instanceof d),getCacheableAssets:(e,t)=>{let n={};return e.forEach(e=>{t.forEach((t,r)=>{n[e+(r===0?``:r+1)]=t})}),n}};async function le(e){if(`Image`in globalThis)return new Promise(t=>{let n=new Image;n.onload=()=>{t(!0)},n.onerror=()=>{t(!1)},n.src=e});if(`createImageBitmap`in globalThis&&`fetch`in globalThis){try{let t=await(await fetch(e)).blob();await createImageBitmap(t)}catch{return!1}return!0}return!1}var ue={extension:{type:f.DetectionParser,priority:1},test:async()=>le(`data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=`),add:async e=>[...e,`avif`],remove:async e=>e.filter(e=>e!==`avif`)},de=[`png`,`jpg`,`jpeg`],fe={extension:{type:f.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async e=>[...e,...de],remove:async e=>e.filter(e=>!de.includes(e))},pe=`WorkerGlobalScope`in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function A(e){return!pe&&document.createElement(`video`).canPlayType(e)!==``}var me={extension:{type:f.DetectionParser,priority:0},test:async()=>A(`video/mp4`),add:async e=>[...e,`mp4`,`m4v`],remove:async e=>e.filter(e=>e!==`mp4`&&e!==`m4v`)},he={extension:{type:f.DetectionParser,priority:0},test:async()=>A(`video/ogg`),add:async e=>[...e,`ogv`],remove:async e=>e.filter(e=>e!==`ogv`)},ge={extension:{type:f.DetectionParser,priority:0},test:async()=>A(`video/webm`),add:async e=>[...e,`webm`],remove:async e=>e.filter(e=>e!==`webm`)},_e={extension:{type:f.DetectionParser,priority:0},test:async()=>le(`data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=`),add:async e=>[...e,`webp`],remove:async e=>e.filter(e=>e!==`webp`)},j=class e{constructor(){this.loadOptions={...e.defaultOptions},this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,t,n)=>(this._parsersValidated=!1,e[t]=n,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,t){let n={promise:null,parser:null};return n.promise=(async()=>{let r=null,i=null;if((t.parser||t.loadParser)&&(i=this._parserHash[t.parser||t.loadParser],t.loadParser&&u(`[Assets] "loadParser" is deprecated, use "parser" instead for ${e}`),i||u(`[Assets] specified load parser "${t.parser||t.loadParser}" not found while loading ${e}`)),!i){for(let n=0;n<this.parsers.length;n++){let r=this.parsers[n];if(r.load&&r.test?.(e,t,this)){i=r;break}}if(!i)return u(`[Assets] ${e} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`),null}r=await i.load(e,t,this),n.parser=i;for(let e=0;e<this.parsers.length;e++){let i=this.parsers[e];i.parse&&i.parse&&await i.testParse?.(r,t,this)&&(r=await i.parse(r,t,this)||r,n.parser=i)}return r})(),n}async load(t,n){this._parsersValidated||this._validateParsers();let{onProgress:r,onError:i,strategy:a,retryCount:o,retryDelay:s}=typeof n==`function`?{...e.defaultOptions,...this.loadOptions,onProgress:n}:{...e.defaultOptions,...this.loadOptions,...n||{}},c=0,l={},u=S(t),d=w(t,e=>({alias:[e],src:e,data:{}})),f=d.reduce((e,t)=>e+(t.progressSize||1),0),p=d.map(async e=>{let t=y.toAbsolute(e.src);l[e.src]||(await this._loadAssetWithRetry(t,e,{onProgress:r,onError:i,strategy:a,retryCount:o,retryDelay:s},l),c+=e.progressSize||1,r&&r(c/f))});return await Promise.all(p),u?l[d[0].src]:l}async unload(e){let t=w(e,e=>({alias:[e],src:e})).map(async e=>{let t=y.toAbsolute(e.src),n=this.promiseCache[t];if(n){let r=await n.promise;delete this.promiseCache[t],await n.parser?.unload?.(r,e,this)}});await Promise.all(t)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name||e.id).reduce((e,t)=>(!t.name&&!t.id?u(`[Assets] parser should have an id`):(e[t.name]||e[t.id])&&u(`[Assets] parser id conflict "${t.id}"`),e[t.name]=t,t.id&&(e[t.id]=t),e),{})}async _loadAssetWithRetry(e,t,n,r){let i=0,{onError:a,strategy:o,retryCount:s,retryDelay:c}=n,l=e=>new Promise(t=>setTimeout(t,e));for(;;)try{this.promiseCache[e]||(this.promiseCache[e]=this._getLoadPromiseAndParser(e,t)),r[t.src]=await this.promiseCache[e].promise;return}catch(n){if(delete this.promiseCache[e],delete r[t.src],i++,o===`retry`&&!(o!==`retry`||i>s)){a&&a(n,t),await l(c);continue}if(o===`skip`){a&&a(n,t);return}a&&a(n,t);let u=Error(`[Loader.load] Failed to load ${e}.
${n}`);throw n instanceof Error&&n.stack&&(u.stack=n.stack),u}}};j.defaultOptions={onProgress:void 0,onError:void 0,strategy:`throw`,retryCount:3,retryDelay:250};var ve=j;function M(e,t){if(Array.isArray(t)){for(let n of t)if(e.startsWith(`data:${n}`))return!0;return!1}return e.startsWith(`data:${t}`)}function N(e,t){let n=e.split(`?`)[0],r=y.extname(n).toLowerCase();return Array.isArray(t)?t.includes(r):r===t}var ye=`.json`,be=`application/json`,xe={extension:{type:f.LoadParser,priority:v.Low},name:`loadJson`,id:`json`,test(e){return M(e,be)||N(e,ye)},async load(e){return await(await s.get().fetch(e)).json()}},Se=`.txt`,Ce=`text/plain`,we={name:`loadTxt`,id:`text`,extension:{type:f.LoadParser,priority:v.Low,name:`loadTxt`},test(e){return M(e,Ce)||N(e,Se)},async load(e){return await(await s.get().fetch(e)).text()}},Te=[`normal`,`bold`,`100`,`200`,`300`,`400`,`500`,`600`,`700`,`800`,`900`],Ee=[`.ttf`,`.otf`,`.woff`,`.woff2`],De=[`font/ttf`,`font/otf`,`font/woff`,`font/woff2`],Oe=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function ke(e){let t=y.extname(e),n=y.basename(e,t).replace(/(-|_)/g,` `).toLowerCase().split(` `).map(e=>e.charAt(0).toUpperCase()+e.slice(1)),r=n.length>0;for(let e of n)if(!e.match(Oe)){r=!1;break}let i=n.join(` `);return r||(i=`"${i.replace(/[\\"]/g,`\\$&`)}"`),i}var Ae=/^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;function je(e){return Ae.test(e)?e:encodeURI(e)}var Me={extension:{type:f.LoadParser,priority:v.Low},name:`loadWebFont`,id:`web-font`,test(e){return M(e,De)||N(e,Ee)},async load(e,t){let n=s.get().getFontFaceSet();if(n){let r=[],i=t.data?.family??ke(e),a=t.data?.weights?.filter(e=>Te.includes(e))??[`normal`],o=t.data??{};for(let t=0;t<a.length;t++){let s=a[t],c=new FontFace(i,`url('${je(e)}')`,{...o,weight:s});await c.load(),n.add(c),r.push(c)}return T.has(`${i}-and-url`)?T.get(`${i}-and-url`).entries.push({url:e,faces:r}):T.set(`${i}-and-url`,{entries:[{url:e,faces:r}]}),r.length===1?r[0]:r}return u(`[loadWebFont] FontFace API is not supported. Skipping loading font`),null},unload(e){let t=Array.isArray(e)?e:[e],n=t[0].family,r=T.get(`${n}-and-url`),i=r.entries.find(e=>e.faces.some(e=>t.indexOf(e)!==-1));i.faces=i.faces.filter(e=>t.indexOf(e)===-1),i.faces.length===0&&(r.entries=r.entries.filter(e=>e!==i)),t.forEach(e=>{s.get().getFontFaceSet().delete(e)}),r.entries.length===0&&T.remove(`${n}-and-url`)}};function P(e,t=1){let n=b.RETINA_PREFIX?.exec(e);return n?parseFloat(n[1]):t}function F(e,t,n){e.label=n,e._sourceOrigin=n;let r=new d({source:e,label:n}),i=()=>{delete t.promiseCache[n],T.has(n)&&T.remove(n)};return r.source.once(`destroy`,()=>{t.promiseCache[n]&&(u(`[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource.`),i())}),r.once(`destroy`,()=>{e.destroyed||(u(`[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture.`),i())}),r}var Ne=`.svg`,Pe=`image/svg+xml`,Fe={extension:{type:f.LoadParser,priority:v.Low,name:`loadSVG`},name:`loadSVG`,id:`svg`,config:{crossOrigin:`anonymous`,parseAsGraphicsContext:!1},test(e){return M(e,Pe)||N(e,Ne)},async load(e,t,n){return t.data?.parseAsGraphicsContext??this.config.parseAsGraphicsContext?Le(e):Ie(e,t,n,this.config.crossOrigin)},unload(e){e.destroy(!0)}};async function Ie(e,t,n,r){let i=await s.get().fetch(e),a=s.get().createImage();a.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(await i.text())}`,a.crossOrigin=r,await a.decode();let o=t.data?.width??a.width,c=t.data?.height??a.height,l=t.data?.resolution||P(e),u=Math.ceil(o*l),d=Math.ceil(c*l),f=s.get().createCanvas(u,d),p=f.getContext(`2d`);p.imageSmoothingEnabled=!0,p.imageSmoothingQuality=`high`,p.drawImage(a,0,0,o*l,c*l);let{parseAsGraphicsContext:m,...h}=t.data??{};return F(new C({resource:f,alphaMode:`premultiply-alpha-on-upload`,resolution:l,...h}),n,e)}async function Le(e){let t=await(await s.get().fetch(e)).text(),n=new ne;return n.svg(t),n}var Re=`(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function") return false;
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
`,I=null,L=class{constructor(){I||=URL.createObjectURL(new Blob([Re],{type:`application/javascript`})),this.worker=new Worker(I)}};L.revokeObjectURL=function(){I&&=(URL.revokeObjectURL(I),null)};var ze=`(function () {
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
`,R=null,z=class{constructor(){R||=URL.createObjectURL(new Blob([ze],{type:`application/javascript`})),this.worker=new Worker(R)}};z.revokeObjectURL=function(){R&&=(URL.revokeObjectURL(R),null)};var B=0,V,Be=new class{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported===void 0&&(this._isImageBitmapSupported=new Promise(e=>{let{worker:t}=new L;t.addEventListener(`message`,n=>{t.terminate(),L.revokeObjectURL(),e(n.data)})})),this._isImageBitmapSupported}loadImageBitmap(e,t){return this._run(`loadImageBitmap`,[e,t?.data?.alphaMode])}async _initWorkers(){this._initialized||=!0}_getWorker(){V===void 0&&(V=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<V&&(this._createdWorkers++,e=new z().worker,e.addEventListener(`message`,e=>{this._complete(e.data),this._returnWorker(e.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){this._resolveHash[e.uuid]&&(e.error===void 0?this._resolveHash[e.uuid].resolve(e.data):this._resolveHash[e.uuid].reject(e.error),delete this._resolveHash[e.uuid])}async _run(e,t){await this._initWorkers();let n=new Promise((n,r)=>{this._queue.push({id:e,arguments:t,resolve:n,reject:r})});return this._next(),n}_next(){if(!this._queue.length)return;let e=this._getWorker();if(!e)return;let t=this._queue.pop(),n=t.id;this._resolveHash[B]={resolve:t.resolve,reject:t.reject},e.postMessage({data:t.arguments,uuid:B++,id:n})}reset(){this._workerPool.forEach(e=>e.terminate()),this._workerPool.length=0,Object.values(this._resolveHash).forEach(({reject:e})=>{e?.(Error(`WorkerManager has been reset before completion`))}),this._resolveHash={},this._queue.length=0,this._initialized=!1,this._createdWorkers=0}},Ve=[`.jpeg`,`.jpg`,`.png`,`.webp`,`.avif`],He=[`image/jpeg`,`image/png`,`image/webp`,`image/avif`];async function Ue(e,t){let n=await s.get().fetch(e);if(!n.ok)throw Error(`[loadImageBitmap] Failed to fetch ${e}: ${n.status} ${n.statusText}`);let r=await n.blob();return t?.data?.alphaMode===`premultiplied-alpha`?createImageBitmap(r,{premultiplyAlpha:`none`}):createImageBitmap(r)}var H={name:`loadTextures`,id:`texture`,extension:{type:f.LoadParser,priority:v.High,name:`loadTextures`},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:`anonymous`},test(e){return M(e,He)||N(e,Ve)},async load(e,t,n){let r=null;return r=globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await Be.isImageBitmapSupported()?await Be.loadImageBitmap(e,t):await Ue(e,t):await new Promise((t,n)=>{r=s.get().createImage(),r.crossOrigin=this.config.crossOrigin,r.src=e,r.complete?t(r):(r.onload=()=>{t(r)},r.onerror=n)}),F(new C({resource:r,alphaMode:`premultiply-alpha-on-upload`,resolution:t.data?.resolution||P(e),...t.data}),n,e)},unload(e){e.destroy(!0)}},We=[`.mp4`,`.m4v`,`.webm`,`.ogg`,`.ogv`,`.h264`,`.avi`,`.mov`],U,W;function Ge(e,t,n){n===void 0&&!t.startsWith(`data:`)?e.crossOrigin=qe(t):n!==!1&&(e.crossOrigin=typeof n==`string`?n:`anonymous`)}function Ke(e){return new Promise((t,n)=>{e.addEventListener(`canplaythrough`,r),e.addEventListener(`error`,i),e.load();function r(){a(),t()}function i(e){a(),n(e)}function a(){e.removeEventListener(`canplaythrough`,r),e.removeEventListener(`error`,i)}})}function qe(e,t=globalThis.location){if(e.startsWith(`data:`))return``;t||=globalThis.location;let n=new URL(e,document.baseURI);return n.hostname!==t.hostname||n.port!==t.port||n.protocol!==t.protocol?`anonymous`:``}function Je(){let e=[],t=[];for(let n of We){let r=x.MIME_TYPES[n.substring(1)]||`video/${n.substring(1)}`;A(r)&&(e.push(n),t.includes(r)||t.push(r))}return{validVideoExtensions:e,validVideoMime:t}}var Ye={name:`loadVideo`,id:`video`,extension:{type:f.LoadParser,name:`loadVideo`},test(e){if(!U||!W){let{validVideoExtensions:e,validVideoMime:t}=Je();U=e,W=t}let t=M(e,W),n=N(e,U);return t||n},async load(e,t,n){let r={...x.defaultOptions,resolution:t.data?.resolution||P(e),alphaMode:t.data?.alphaMode||await ee(),...t.data},i=document.createElement(`video`),a={preload:r.autoLoad===!1?void 0:`auto`,"webkit-playsinline":r.playsinline===!1?void 0:``,playsinline:r.playsinline===!1?void 0:``,muted:r.muted===!0?``:void 0,loop:r.loop===!0?``:void 0,autoplay:r.autoPlay===!1?void 0:``};Object.keys(a).forEach(e=>{let t=a[e];t!==void 0&&i.setAttribute(e,t)}),r.muted===!0&&(i.muted=!0),Ge(i,e,r.crossorigin);let o=document.createElement(`source`),s;if(r.mime)s=r.mime;else if(e.startsWith(`data:`))s=e.slice(5,e.indexOf(`;`));else if(!e.startsWith(`blob:`)){let t=e.split(`?`)[0].slice(e.lastIndexOf(`.`)+1).toLowerCase();s=x.MIME_TYPES[t]||`video/${t}`}return o.src=e,s&&(o.type=s),new Promise((a,s)=>{r.preload&&!r.autoPlay&&i.load(),i.addEventListener(`canplay`,c),i.addEventListener(`error`,l),o.addEventListener(`error`,l),i.appendChild(o);async function c(){let o=new x({...r,resource:i});u(),t.data.preload&&await Ke(i),a(F(o,n,e))}function l(e){u(),s(e)}function u(){i.removeEventListener(`canplay`,c),i.removeEventListener(`error`,l),o.removeEventListener(`error`,l)}})},unload(e){e.destroy(!0)}},G={extension:{type:f.ResolveParser,name:`resolveTexture`},test:H.test,parse:e=>({resolution:parseFloat(b.RETINA_PREFIX.exec(e)?.[1]??`1`),format:e.split(`.`).pop(),src:e})},Xe={extension:{type:f.ResolveParser,priority:-2,name:`resolveJson`},test:e=>b.RETINA_PREFIX.test(e)&&e.endsWith(`.json`),parse:G.parse},K=new class{constructor(){this._detections=[],this._initialized=!1,this.resolver=new b,this.loader=new ve,this.cache=T,this._backgroundLoader=new se(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){if(this._initialized){u(`[Assets]AssetManager already initialized, did you load before calling this Assets.init()?`);return}if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let t=e.manifest;typeof t==`string`&&(t=await this.load(t)),this.resolver.addManifest(t)}let t=e.texturePreference?.resolution??1,n=typeof t==`number`?[t]:t,r=await this._detectFormats({preferredFormats:e.texturePreference?.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:r,resolution:n}}),e.preferences&&this.setPreferences(e.preferences),e.loadOptions&&(this.loader.loadOptions={...this.loader.loadOptions,...e.loadOptions})}add(e){this.resolver.add(e)}async load(e,t){this._initialized||await this.init();let n=S(e),r=w(e).map(e=>{if(typeof e!=`string`){let t=this.resolver.getAlias(e);return t.some(e=>!this.resolver.hasKey(e))&&this.add(e),Array.isArray(t)?t[0]:t}return this.resolver.hasKey(e)||this.add({alias:e,src:e}),e}),i=this.resolver.resolve(r),a=await this._mapLoadToResolve(i,t);return n?a[r[0]]:a}addBundle(e,t){this.resolver.addBundle(e,t)}async loadBundle(e,t){this._initialized||await this.init();let n=!1;typeof e==`string`&&(n=!0,e=[e]);let r=this.resolver.resolveBundle(e),i={},a=Object.keys(r),o=0,s=[],c=()=>{t?.(s.reduce((e,t)=>e+t,0)/o)},l=a.map((e,t)=>{let n=r[e],a=Object.values(n),l=[...new Set(a.flat())].reduce((e,t)=>e+(t.progressSize||1),0);return s.push(0),o+=l,this._mapLoadToResolve(n,e=>{s[t]=e*l,c()}).then(t=>{i[e]=t})});return await Promise.all(l),n?i[e[0]]:i}async backgroundLoad(e){this._initialized||await this.init(),typeof e==`string`&&(e=[e]);let t=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(t))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e==`string`&&(e=[e]);let t=this.resolver.resolveBundle(e);Object.values(t).forEach(e=>{this._backgroundLoader.add(Object.values(e))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e==`string`)return T.get(e);let t={};for(let n=0;n<e.length;n++)t[n]=T.get(e[n]);return t}async _mapLoadToResolve(e,t){let n=[...new Set(Object.values(e))];this._backgroundLoader.active=!1;let r=await this.loader.load(n,t);this._backgroundLoader.active=!0;let i={};return n.forEach(e=>{let t=r[e.src],n=[e.src];e.alias&&n.push(...e.alias),n.forEach(e=>{i[e]=t}),T.set(n,t)}),i}async unload(e){this._initialized||await this.init();let t=w(e).map(e=>typeof e==`string`?e:e.src),n=this.resolver.resolve(t);await this._unloadFromResolved(n)}async unloadBundle(e){this._initialized||await this.init(),e=w(e);let t=this.resolver.resolveBundle(e),n=Object.keys(t).map(e=>this._unloadFromResolved(t[e]));await Promise.all(n)}async _unloadFromResolved(e){let t=Object.values(e);t.forEach(e=>{T.remove(e.src)}),await this.loader.unload(t)}async _detectFormats(e){let t=[];e.preferredFormats&&(t=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(let n of e.detections)e.skipDetections||await n.test()?t=await n.add(t):e.skipDetections||(t=await n.remove(t));return t=t.filter((e,n)=>t.indexOf(e)===n),t}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(t=>{t.config&&Object.keys(t.config).filter(t=>t in e).forEach(n=>{t.config[n]=e[n]})})}};e.handleByList(f.LoadParser,K.loader.parsers).handleByList(f.ResolveParser,K.resolver.parsers).handleByList(f.CacheParser,K.cache.parsers).handleByList(f.DetectionParser,K.detections),e.add(ce,fe,ue,_e,me,he,ge,xe,we,Me,Fe,H,Ye,oe,ae,G,Xe);var q={loader:f.LoadParser,resolver:f.ResolveParser,cache:f.CacheParser,detection:f.DetectionParser};e.handle(f.Asset,t=>{let n=t.ref;Object.entries(q).filter(([e])=>!!n[e]).forEach(([t,r])=>e.add(Object.assign(n[t],{extension:n[t].extension??r})))},t=>{let n=t.ref;Object.keys(q).filter(e=>!!n[e]).forEach(t=>e.remove(n[t]))});var Ze={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},Qe=[`in vec2 vBlurTexCoords[%size%];`,`uniform sampler2D uTexture;`,`out vec4 finalColor;`,`void main(void)`,`{`,`    %blur%`,`}`].join(`
`);function $e(e){let t=Ze[e],n=t.length,r=``;for(let i=0;i<e;i++){let a=i===0?`finalColor = `:`    + `,o=i<n?i:e-i-1,s=`texture(uTexture, vBlurTexCoords[%index%]) * %value%`.replace(`%index%`,i.toString()).replace(`%value%`,t[o].toString());r+=`${a}${s}
`}return Qe.replace(`%blur%`,`${r};`).replace(`%size%`,e.toString())}var et=`
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
    }`;function tt(e,t){let n=Math.ceil(e/2),r=et,i=``,a;a=t?`vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);`:`vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);`;for(let t=0;t<e;t++){let e=a.replace(`%index%`,t.toString());e=e.replace(`%sampleIndex%`,`${t-(n-1)}.0`),i+=e,i+=`
`}return r=r.replace(`%blur%`,i),r=r.replace(`%size%`,e.toString()),r=r.replace(`%dimension%`,t?`z`:`w`),r}function nt(e,t){let n=tt(t,e),r=$e(t);return l.from({vertex:n,fragment:r,name:`blur-${e?`horizontal`:`vertical`}-pass-filter`})}var rt=`

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
}
`;function it(e,t){let n=Ze[t],r=n.length,i=[],o=[],s=[];for(let a=0;a<t;a++){i[a]=`@location(${a}) offset${a}: vec2<f32>,`,e?o[a]=`filteredCord + vec2(${a-r+1} * pixelStrength, 0.0),`:o[a]=`filteredCord + vec2(0.0, ${a-r+1} * pixelStrength),`;let c=n[a<r?a:t-a-1].toString();s[a]=`finalColor += textureSample(uTexture, uSampler, offset${a}) * ${c};`}let c=i.join(`
`),l=o.join(`
`),u=s.join(`
`),d=rt.replace(`%blur-struct%`,c).replace(`%blur-vertex-out%`,l).replace(`%blur-fragment-in%`,c).replace(`%blur-sampling%`,u).replace(`%dimension%`,e?`z`:`w`);return a.from({vertex:{source:d,entryPoint:`mainVertex`},fragment:{source:d,entryPoint:`mainFragment`}})}var at=class e extends g{constructor(t){t={...e.defaultOptions,...t};let n=nt(t.horizontal,t.kernelSize),r=it(t.horizontal,t.kernelSize);super({glProgram:n,gpuProgram:r,resources:{blurUniforms:{uStrength:{value:0,type:`f32`}}},...t}),this.horizontal=t.horizontal,this.legacy=t.legacy??!1,this._quality=0,this.quality=t.quality,this.blur=t.strength,this._blurUniforms=this.resources.blurUniforms,this._uniforms=this._blurUniforms.uniforms}apply(e,t,n,r){this.legacy?this._applyLegacy(e,t,n,r):this._applyOptimized(e,t,n,r)}_applyLegacy(e,t,n,r){if(this._uniforms.uStrength=this.strength/this.passes,this.passes===1)e.applyFilter(this,t,n,r);else{let a=_.getSameSizeTexture(t),o=t,s=a;this._state.blend=!1;let c=e.renderer.type===i.WEBGPU;for(let t=0;t<this.passes-1;t++){e.applyFilter(this,o,s,t===0||c);let n=s;s=o,o=n}this._state.blend=!0,e.applyFilter(this,o,n,r),_.returnTexture(a)}}_applyOptimized(e,t,n,r){if(this._uniforms.uStrength=this._calculateInitialStrength(),this.passes===1)e.applyFilter(this,t,n,r);else{let a=_.getSameSizeTexture(t),o=t,s=a;this._state.blend=!1;let c=e.renderer,l=c.type===i.WEBGPU,u=l?c.renderPipes.uniformBatch:null;for(let t=0;t<this.passes-1;t++){u&&this.groups[1].setResource(u.getUboResource(this._blurUniforms),0),e.applyFilter(this,o,s,l);let t=s;s=o,o=t,this._uniforms.uStrength*=.5}u&&this.groups[1].setResource(u.getUboResource(this._blurUniforms),0),this._state.blend=!0,e.applyFilter(this,o,n,r),_.returnTexture(a)}}_calculateInitialStrength(){let e=1,t=.5;for(let n=1;n<this.passes;n++)e+=t*t,t*=.5;return this.strength/Math.sqrt(e)}get blur(){return this.strength}set blur(e){this.padding=1+Math.abs(e)*2,this.strength=e}get quality(){return this._quality}set quality(e){this._quality=e,this.passes=e}};at.defaultOptions={strength:8,quality:4,kernelSize:5,legacy:!1};var J=at,ot=class extends g{constructor(...e){let t=e[0]??{};typeof t==`number`&&(n(o,`BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }`),t={strength:t},e[1]!==void 0&&(t.quality=e[1]),e[2]!==void 0&&(t.resolution=e[2]||`inherit`),e[3]!==void 0&&(t.kernelSize=e[3])),t={...J.defaultOptions,...t};let{strength:r,strengthX:a,strengthY:s,quality:c,...l}=t;super({...l,compatibleRenderers:i.BOTH,resources:{}}),this._repeatEdgePixels=!1,this.blurXFilter=new J({horizontal:!0,...t}),this.blurYFilter=new J({horizontal:!1,...t}),this.quality=c,this.strengthX=a??r,this.strengthY=s??r,this.repeatEdgePixels=!1}apply(e,t,n,r){let i=Math.abs(this.blurXFilter.strength),a=Math.abs(this.blurYFilter.strength);if(i&&a){let i=_.getSameSizeTexture(t);this.blurXFilter.blendMode=`normal`,this.blurXFilter.apply(e,t,i,!0),this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(e,i,n,r),_.returnTexture(i)}else a?(this.blurYFilter.blendMode=this.blendMode,this.blurYFilter.apply(e,t,n,r)):(this.blurXFilter.blendMode=this.blendMode,this.blurXFilter.apply(e,t,n,r))}updatePadding(){this.padding=this._repeatEdgePixels?0:Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get strength(){if(this.strengthX!==this.strengthY)throw Error(`BlurFilter's strengthX and strengthY are different`);return this.strengthX}set strength(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get strengthX(){return this.blurXFilter.blur}set strengthX(e){this.blurXFilter.blur=e,this.updatePadding()}get strengthY(){return this.blurYFilter.blur}set strengthY(e){this.blurYFilter.blur=e,this.updatePadding()}get blur(){return n(`8.3.0`,`BlurFilter.blur is deprecated, please use BlurFilter.strength instead.`),this.strength}set blur(e){n(`8.3.0`,`BlurFilter.blur is deprecated, please use BlurFilter.strength instead.`),this.strength=e}get blurX(){return n(`8.3.0`,`BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead.`),this.strengthX}set blurX(e){n(`8.3.0`,`BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead.`),this.strengthX=e}get blurY(){return n(`8.3.0`,`BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead.`),this.strengthY}set blurY(e){n(`8.3.0`,`BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead.`),this.strengthY=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}};ot.defaultOptions={strength:8,quality:4,kernelSize:5,legacy:!1};var st=`
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
`,ct=`in vec2 aPosition;
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
`,Y=`
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
}`,lt=class extends g{constructor(...e){let i=e[0];i instanceof h&&(e[1]&&n(o,`DisplacementFilter now uses options object instead of params. {sprite, scale}`),i={sprite:i,scale:e[1]});let{sprite:s,scale:u,...d}=i,f=u??20;typeof f==`number`&&(f=new t(f,f));let p=new c({uFilterMatrix:{value:new r,type:`mat3x3<f32>`},uScale:{value:f,type:`vec2<f32>`},uRotation:{value:new Float32Array([0,0,0,0]),type:`mat2x2<f32>`}}),m=l.from({vertex:ct,fragment:st,name:`displacement-filter`}),g=a.from({vertex:{source:Y,entryPoint:`mainVertex`},fragment:{source:Y,entryPoint:`mainFragment`}}),_=s.texture.source;super({...d,gpuProgram:g,glProgram:m,resources:{filterUniforms:p,uMapTexture:_,uMapSampler:_.style}}),this._sprite=i.sprite,this._sprite.renderable=!1}apply(e,t,n,r){let i=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(i.uFilterMatrix,this._sprite);let a=this._sprite.worldTransform,o=Math.sqrt(a.a*a.a+a.b*a.b),s=Math.sqrt(a.c*a.c+a.d*a.d);o!==0&&s!==0&&(i.uRotation[0]=a.a/o,i.uRotation[1]=a.b/o,i.uRotation[2]=a.c/s,i.uRotation[3]=a.d/s),this.resources.uMapTexture=this._sprite.texture.source,e.applyFilter(this,t,n,r)}get scale(){return this.resources.filterUniforms.uniforms.uScale}},ut=`
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
`,dt=`

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
}`,ft=class e extends g{constructor(t={}){t={...e.defaultOptions,...t};let n=a.from({vertex:{source:dt,entryPoint:`mainVertex`},fragment:{source:dt,entryPoint:`mainFragment`}}),r=l.from({vertex:re,fragment:ut,name:`noise-filter`}),{noise:i,seed:o,...s}=t;super({...s,gpuProgram:n,glProgram:r,resources:{noiseUniforms:new c({uNoise:{value:1,type:`f32`},uSeed:{value:1,type:`f32`}})}}),this.noise=i,this.seed=o??Math.random()}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(e){this.resources.noiseUniforms.uniforms.uNoise=e}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(e){this.resources.noiseUniforms.uniforms.uSeed=e}};ft.defaultOptions={noise:.5};var pt=ft,mt=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,ht=`interactive-web:revealed-directions`,X=[],Z=0,gt=()=>{try{let e=window.localStorage.getItem(ht);if(!e)return new Set;let t=JSON.parse(e);return new Set(Array.isArray(t)?t.filter(e=>typeof e==`string`):[])}catch{return new Set}},_t=e=>{let t=e.dataset.directionCard;if(t)try{let e=gt();e.add(t),window.localStorage.setItem(ht,JSON.stringify([...e]))}catch{}},vt=(e,t)=>{let n=e.querySelector(`[data-card-content]`),r=e.querySelector(`[data-show-direction]`),i=e.querySelector(`[data-status-copy]`),a=e.querySelector(`[data-pixi-host]`);e.dataset.revealed=`true`,delete e.dataset.animating,t.disabled=!0,t.setAttribute(`aria-expanded`,`true`),n?.setAttribute(`aria-hidden`,`false`),r&&(r.setAttribute(`aria-disabled`,`false`),r.removeAttribute(`tabindex`)),i&&(i.textContent=`odkryto`),E.set(e.querySelector(`[data-mystery-number]`),{opacity:0,scale:.55}),E.set(e.querySelector(`[data-real-number]`),{opacity:1,scale:1}),n&&E.set(n,{opacity:1,y:0,filter:`blur(0px)`}),a&&E.set(a,{display:`none`,opacity:0})},Q=(e,t,n)=>{if(e.dataset.revealed===`true`||e.dataset.animating===`true`)return;_t(e),e.dataset.animating=`true`,t.disabled=!0,t.setAttribute(`aria-expanded`,`true`);let r=e.querySelector(`[data-card-content]`),i=e.querySelector(`[data-show-direction]`),a=e.querySelector(`[data-status-copy]`),o=e.querySelector(`[data-pixi-host]`);if(r?.setAttribute(`aria-hidden`,`false`),i&&(i.setAttribute(`aria-disabled`,`false`),i.removeAttribute(`tabindex`)),a&&(a.textContent=`odkryto`),n){n();return}let s=E.timeline({defaults:{ease:`power3.out`},onComplete:()=>{e.dataset.revealed=`true`,delete e.dataset.animating}});s.to(e.querySelector(`[data-mystery-number]`),{opacity:0,scale:.55,duration:.3},0).to(e.querySelector(`[data-real-number]`),{opacity:1,scale:1,duration:.55},.16).to(e.querySelector(`.direction-card__veil`),{opacity:.18,duration:.45},0).to(o,{opacity:0,scale:1.06,duration:.82},0).to(r,{opacity:1,y:0,filter:`blur(0px)`,duration:.8},.28).set(o,{display:`none`}),s.timeScale(.5)},yt=()=>{let e=document.createElement(`canvas`);e.width=72,e.height=72;let t=e.getContext(`2d`);if(!t)return d.WHITE;let n=t.createImageData(e.width,e.height);for(let e=0;e<n.data.length;e+=4){let t=Math.random()*255;n.data[e]=t,n.data[e+1]=t,n.data[e+2]=t,n.data[e+3]=255}t.putImageData(n,0,0);let r=d.from(e);return r.source.addressMode=`repeat`,r},bt=async e=>{let t=e.querySelector(`[data-pixi-host]`),n=e.querySelector(`[data-pixi-canvas]`),r=e.querySelector(`[data-reveal-trigger]`),i=e.querySelector(`[data-card-content]`),a=e.dataset.imageSrc;if(!(!t||!n||!r||!i||!a)){if(mt){let t=()=>Q(e,r);return r.addEventListener(`click`,t),()=>r.removeEventListener(`click`,t)}try{let o=new m;await o.init({canvas:n,resizeTo:t,backgroundAlpha:0,antialias:!0,autoDensity:!0,resolution:Math.min(window.devicePixelRatio,2),preference:`webgl`});let s=await K.load(a),c=new h(s);c.anchor.set(.5);let l=new h(yt());l.alpha=0,l.width=Math.max(t.clientWidth,1),l.height=Math.max(t.clientHeight,1);let u=new ot({strength:32,quality:4,kernelSize:7});u.repeatEdgePixels=!0;let d=new lt({sprite:l,scale:{x:155,y:112}}),f=new pt({noise:.58,seed:Math.random()});c.filters=[d,u,f],o.stage.addChild(l),o.stage.addChild(c);let p=()=>{let e=Math.max(t.clientWidth,1),n=Math.max(t.clientHeight,1),r=Math.max(e/s.width,n/s.height);c.scale.set(r),c.position.set(e/2,n/2),l.width=e,l.height=n};p();let g=new ResizeObserver(p);g.observe(t);let _=0;return o.ticker.add(t=>{if(e.dataset.revealed===`true`||e.dataset.animating===`true`)return;let n=t.lastTime*.001;l.x=(l.x+t.deltaTime*1.55)%72,l.y=(l.y+t.deltaTime*1.05)%72,d.scale.x=155+Math.sin(n*1.9)*48,d.scale.y=112+Math.cos(n*2.3)*36,u.strength=32+Math.sin(n*2.6)*10,f.noise=.52+Math.abs(Math.sin(n*3.7))*.22,_+=1,_%2==0&&(f.seed=Math.random())}),e.dataset.pixiReady=`true`,r.addEventListener(`click`,()=>{Q(e,r,()=>{let n=E.timeline({defaults:{ease:`power3.out`},onComplete:()=>{e.dataset.revealed=`true`,delete e.dataset.animating,o.stop(),g.disconnect(),t.style.display=`none`}});n.to(d.scale,{x:0,y:0,duration:1.25},0).to(u,{strength:0,duration:1.15},0).to(f,{noise:0,duration:.95},0).to(e.querySelector(`.direction-card__veil`),{opacity:.12,duration:.55},0).to(t,{opacity:0,scale:1.08,duration:1.18},.35).to(e.querySelector(`[data-mystery-number]`),{opacity:0,scale:.55,duration:.3},.12).to(e.querySelector(`[data-real-number]`),{opacity:1,scale:1,duration:.55},.28).to(i,{opacity:1,y:0,filter:`blur(0px)`,duration:.85},.48),n.timeScale(.5)})}),()=>{o.stop(),g.disconnect(),E.killTweensOf(e),E.killTweensOf(i),o.destroy()}}catch{e.dataset.pixiReady=`false`,n.hidden=!0;let t=()=>Q(e,r);return r.addEventListener(`click`,t),()=>r.removeEventListener(`click`,t)}}},$=()=>{Z+=1,X.forEach(e=>e()),X=[]};document.addEventListener(`astro:page-load`,()=>{$();let e=Z,t=gt();Array.from(document.querySelectorAll(`[data-reveal-card]`)).forEach(n=>{let r=n.querySelector(`[data-reveal-trigger]`),i=n.dataset.directionCard;if(r&&i&&t.has(i)){vt(n,r);return}bt(n).then(t=>{t&&(e===Z?X.push(t):t())})})}),document.addEventListener(`astro:before-swap`,$);
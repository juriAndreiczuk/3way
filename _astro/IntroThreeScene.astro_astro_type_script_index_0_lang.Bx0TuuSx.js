import{C as e,E as t,I as n,L as r,N as i,O as a,P as o,R as s,S as c,T as l,_ as u,a as d,b as f,d as p,f as ee,g as m,h as te,k as h,m as g,n as ne,o as _,p as v,r as y,s as re,t as ie,w as b,x,y as S,z as C}from"./three.module.C62C-dFa.js";var w={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},T=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},E=new c(-1,1,1,-1,0,1),D=new class extends y{constructor(){super(),this.setAttribute(`position`,new p([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new p([0,2,0,0,2,0],2))}},O=class{constructor(e){this._mesh=new f(D,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,E)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},k=class extends T{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof h?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=n.clone(e.uniforms),this.material=new h({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new O(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},A=class extends T{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},j=class extends T{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},ae=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new r);this._width=n.width,this._height=n.height,t=new C(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:g}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new k(w),this.copyPass.material.blending=0,this.timer=new i}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}A!==void 0&&(r instanceof A?n=!0:r instanceof j&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new r);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},M={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},oe=class extends T{constructor(){super(),this.isOutputPass=!0,this.uniforms=n.clone(M.uniforms),this.material=new t({name:M.name,uniforms:this.uniforms,vertexShader:M.vertexShader,fragmentShader:M.fragmentShader}),this._fsQuad=new O(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},_.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},se=class extends T{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new d}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},N={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new d(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},P=class e extends T{constructor(e,t=1,i,a){super(),this.strength=t,this.radius=i,this.threshold=a,this.resolution=e===void 0?new r(256,256):new r(e.x,e.y),this.clearColor=new d(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);this.renderTargetBright=new C(o,c,{type:g}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new C(o,c,{type:g});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new C(o,c,{type:g});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),o=Math.round(o/2),c=Math.round(c/2)}let l=N;this.highPassUniforms=n.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new h({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];let u=[6,10,14,18,22];o=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(u[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new r(1/o,1/c),o=Math.round(o/2),c=Math.round(c/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new s(1,1,1),new s(1,1,1),new s(1,1,1),new s(1,1,1),new s(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=n.clone(w.uniforms),this.blendMaterial=new h({uniforms:this.copyUniforms,vertexShader:w.vertexShader,fragmentShader:w.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new d,this._oldClearAlpha=1,this._basic=new x,this._fsQuad=new O(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,i),this.renderTargetsVertical[e].setSize(n,i),this.separableBlurMaterials[e].uniforms.invSize.value=new r(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new h({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new r(.5,.5)},direction:{value:new r(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new h({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};P.BlurDirectionX=new r(1,0),P.BlurDirectionY=new r(0,1);var F,I=t=>{let n=t.querySelector(`[data-three-canvas]`),i=t.querySelector(`[data-mode-label]`),c=t.querySelector(`[data-mode-toggle]`),d=t.querySelector(`[data-toggle-label]`);if(n)try{let p=n.getContext(`webgl2`,{alpha:!0,antialias:!0,powerPreference:`high-performance`});if(!p)throw Error(`WebGL 2 is unavailable`);let h=new ie({canvas:n,context:p,alpha:!0,antialias:!0,powerPreference:`high-performance`});h.setClearColor(0,0),h.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),h.toneMapping=4,h.toneMappingExposure=.78;let g=new a,_=new e(38,1,.1,50);_.position.set(0,0,7.2);let C=new v;g.add(C);let w=11032055,T=5991679,E=1300735,D=[],O=(e,t)=>{let n=new v,r=new te(e,3),i=new f(r,new x({color:t,transparent:!0,opacity:.025,blending:2,depthWrite:!1})),a=new f(r,new x({color:t,wireframe:!0,transparent:!0,opacity:.42,depthWrite:!1})),s=new f(new o(e*1.28,e*.022,8,64),new x({color:t,transparent:!0,opacity:.2,blending:2,depthWrite:!1}));return n.add(i,a,s),D.push({material:i.material,dim:.025,bright:.075},{material:a.material,dim:.42,bright:.76},{material:s.material,dim:.2,bright:.55}),n},k=O(.72,w);k.position.set(-2.15,0,0),C.add(k);let A=new v;A.position.set(2.12,0,0);let j=O(.46,E);A.add(j);let M=[];[[-.72,-.24,.04],[.72,-.24,-.04],[0,.78,.02]].forEach(([e,t,n])=>{let r=O(.25,E);r.position.set(e,t,n),M.push(r),A.add(r);let i=new y().setFromPoints([new s(0,0,0),new s(e*.82,t*.82,n)]),a=new m(i,new u({color:E,transparent:!0,opacity:.42}));A.add(a)});let N=new f(new o(.98,.012,6,80),new x({color:E,transparent:!0,opacity:.3,depthWrite:!1}));N.rotation.x=.12,A.add(N),C.add(A);let F=new ee(8,22,T,T);F.rotation.x=Math.PI/2,F.position.z=-1.35,(Array.isArray(F.material)?F.material:[F.material]).forEach(e=>{e.transparent=!0,e.opacity=.075,e.depthWrite=!1}),C.add(F);let I=(e,t=46)=>{let n=new y,r=new Float32Array(t*3);n.setAttribute(`position`,new ne(r,3));let i=new l({color:e,size:.052,transparent:!0,opacity:.78,blending:2,depthWrite:!1,sizeAttenuation:!0});return{points:new b(n,i),positions:r,material:i,count:t}},L=I(w),R=I(E,40);C.add(L.points,R.points);let ce=(e,t)=>{let n=new f(new re(.12,.34,12),new x({color:e,transparent:!0,opacity:.9,blending:2,depthWrite:!1}));return n.rotation.z=t===1?-Math.PI/2:Math.PI/2,n.position.set(t===1?1.24:-1.25,t===1?.22:-.25,0),n},z=ce(w,1),B=ce(E,-1);C.add(z,B);let V=new ae(h);V.addPass(new se(g,_));let H=new P(new r(1,1),.18,.24,.2);V.addPass(H),V.addPass(new oe);let U=new r,W=new r;t.addEventListener(`pointermove`,e=>{let n=t.getBoundingClientRect();W.set(((e.clientX-n.left)/n.width-.5)*2,-((e.clientY-n.top)/n.height-.5)*2)}),t.addEventListener(`pointerleave`,()=>W.set(0,0));let G=()=>{let e=Math.max(t.clientWidth,1),n=Math.max(t.clientHeight,1);h.setSize(e,n,!1),V.setSize(e,n),_.aspect=e/n,_.updateProjectionMatrix()},K=new ResizeObserver(G);K.observe(t),G();let q=0,J=performance.now(),le=0,Y=0,X=!1,Z=!1,Q=0,ue=0;c?.addEventListener(`click`,()=>{Z=!Z,ue=+!!Z,t.toggleAttribute(`data-collaboration`,Z),c.setAttribute(`aria-pressed`,String(Z)),i&&(i.textContent=Z?`Komunikacja dwukierunkowa`:`Komunikacja jednokierunkowa`),d&&(d.textContent=Z?`Wyłącz współpracę`:`Włącz współpracę`)});let de=(e,t,n,r)=>{for(let i=0;i<e.count;i+=1){let a=(i/e.count+t*.105)%1,o=n===1?a:1-a,s=i*3;e.positions[s]=S.lerp(-1.3,1.3,o),e.positions[s+1]=r+Math.sin(a*Math.PI)*.17*n,e.positions[s+2]=Math.sin(a*Math.PI*2)*.09}e.points.geometry.attributes.position.needsUpdate=!0},fe=e=>{if(!X||(Y=requestAnimationFrame(fe),e-le<41.666666666666664))return;let t=Math.min((e-J)/1e3,.08);J=e,le=e,q+=t,Q=S.damp(Q,ue,2,t);let n=1+Math.sin(q*2.4)*.09*Q;D.forEach(({material:e,dim:t,bright:r})=>{e.opacity=S.lerp(t,r,Q)*n}),H.strength=S.lerp(.18,.62,Q)*n,h.toneMappingExposure=S.lerp(.68,.86,Q),L.material.opacity=S.lerp(.48,.84,Q),R.material.opacity=Q*.78,B.material.opacity=Q*.76,z.material.opacity=S.lerp(.55,.9,Q),de(L,q,1,.22),de(R,q,-1,-.25),k.rotation.y+=t*(.18+Q*.12),k.rotation.x+=t*(.09+Q*.055),A.rotation.y-=t*(.13+Q*.09),j.rotation.x+=t*(.12+Q*.1),j.rotation.y-=t*Q*.075,M.forEach((e,n)=>{let r=n%2==0?1:-1;e.rotation.y+=t*Q*.22*r,e.rotation.x+=t*Q*.11}),N.rotation.z+=t*(.04+Q*.2),k.position.x=S.lerp(-2.15,-1.54,Q),A.position.x=S.lerp(2.12,1.54,Q);let r=1+Q*.045;k.scale.setScalar(r),A.scale.setScalar(r),z.scale.setScalar(1+Q*.2),B.scale.setScalar(.75+Q*.45),U.lerp(W,.045),C.rotation.y=U.x*.12,C.rotation.x=U.y*.07,_.position.x=U.x*.18,_.position.y=U.y*.12,_.lookAt(0,0,0),V.render()},pe=()=>{X||document.hidden||(X=!0,J=performance.now(),Y=requestAnimationFrame(fe))},$=()=>{X=!1,cancelAnimationFrame(Y)},me=new IntersectionObserver(([e])=>e?.isIntersecting?pe():$(),{threshold:.08});me.observe(t);let he=()=>document.hidden?$():pe();return document.addEventListener(`visibilitychange`,he),t.dataset.ready=`true`,V.render(),()=>{$(),K.disconnect(),me.disconnect(),document.removeEventListener(`visibilitychange`,he),V.dispose(),h.dispose(),g.traverse(e=>{(e instanceof f||e instanceof b||e instanceof m)&&(e.geometry?.dispose(),(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>e?.dispose()))})}}catch{t.dataset.ready=`false`}};document.addEventListener(`astro:page-load`,()=>{F?.(),F=void 0;let e=document.querySelector(`[data-three-intro]`);e&&(F=I(e))}),document.addEventListener(`astro:before-swap`,()=>{F?.(),F=void 0});
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`piston`,`core`,`hammer`];function t(e){return e===`body`?`core`:e}function n(e,t){let n=e.tuning;return t===`piston`?n.pistonHp:t===`hammer`?n.hammerHp:n.coreHp}function r(e){return{piston:n(e,`piston`),hammer:n(e,`hammer`),core:n(e,`core`)}}function i(e,t){return e[t]<=0}function a(e){return+!!i(e,`piston`)+ +!!i(e,`hammer`)}function o(e){return a(e)===0}function s(t){return e.filter(e=>!i(t,e))}function c(e,t,n,r){return t===`core`&&o(e)?Math.floor(n*r.tuning.coreArmourPercent/100):n}function l(e){return[...new Set(e.beats.map(e=>e.limb))]}function u(e,t){return e.core*2<n(t,`core`)}function d(e,n,r){let{parts:o,turn:s}=n;return a(o)<e.minEnrage||s<e.minTurn||e.coreBelowHalf&&!u(o,r)?!1:l(e).every(e=>!i(o,t(e)))}function f(e,t){return e.attacks.flatMap((n,r)=>d(n,t,e)?[r]:[])}function p(e,t){return f(e,t).reverse()}function m(e,t,n){let r=e.indexOf(t),i=e.length-1;return e[r<0?n>0?0:i:(r+n+e.length)%e.length]??t}var h=e=>({parts:e.parts,turn:e.boss.turnNumber});function g(e,t){e.slowmo=Math.min(e.slowmo,t.tuning.slowmoTailTicks)}var _=e=>e.outcome===`victory`&&e.freeze>0;function v(e,t,n,r,i=!1){let o=e.parts[t];if(o<=0)return 0;let s=Math.min(o,i?n:c(e.parts,t,n,r));return e.parts={...e.parts,[t]:o-s},e.parts[t]>0||(e.freeze=Math.max(e.freeze,r.tuning.freezeBreak),e.events.push({type:`partBroken`,part:t,enrage:a(e.parts)}),t===`core`&&(e.outcome=`victory`,e.slowmo=0,e.events.push({type:`victory`}))),s}function y(e,t,n=`level`){return{step:e,tick:0,target:t,opener:n,cuts:[],beat:-1,drawSince:-1,holdSince:-1,doneAt:-1,sunderCuts:[]}}function b(e){let t=s(e.parts),n=t.includes(e.player.target)?e.player.target:t[0]??`core`;e.turn=`player`,e.player=y(`choose`,n),e.boss={...e.boss,phase:`lull`,tick:0},e.hero={...e.hero,action:`idle`,actionTick:0},e.slowmo=0,e.counter=null,e.answering&&=!1,e.events.push({type:`turn`,who:`player`})}function x(e,t){let n=t.tuning.bossSequences+a(e.parts);e.turn=`boss`,e.boss={...e.boss,phase:`lull`,tick:0,nextAttack:-1,lullLength:t.tuning.bossTurnLullTicks,sequencesLeft:Math.max(1,n-e.boss.staggered),turnNumber:e.boss.turnNumber+1,staggered:0},e.hero={...e.hero,action:`idle`,actionTick:0},e.events.push({type:`turn`,who:`boss`})}var S=.45,C=.275;function w(e){let t=a(e.parts),n=_(e),r=e.outcome===`fighting`&&e.turn===`player`&&e.player.step===`sunder`&&e.player.doneAt<0,i=n?.15:r?.5:1;return{wind:i,fire:i,furnace:e.outcome!==`victory`||n?Math.min(1,S+t*C)*i:0,heat:Math.min(1,t/2)}}var T=.6,E={wind:.07,fire:.045,furnace:.083},D={cold:220,hot:900};function O(e){let t=e.createBuffer(1,e.sampleRate*5,e.sampleRate),n=t.getChannelData(0);for(let e=0;e<70;e++){let e=Math.floor(Math.random()*(n.length-2e3)),t=Math.random()**3,r=60+Math.floor(Math.random()*500);for(let i=0;i<r;i++)n[e+i]=(n[e+i]??0)+(Math.random()*2-1)*t*Math.exp(-i/(r/5))}return t}function k(e){let t,n;e.whenReady(e=>{let i=e.context,a=i.createBuffer(1,i.sampleRate*3,i.sampleRate),o=a.getChannelData(0);for(let e=0;e<o.length;e++)o[e]=Math.random()*2-1;let s=e=>{let t=i.createBufferSource();return t.buffer=e,t.loop=!0,t.start(),t},c=()=>{let t=i.createGain();return t.gain.value=0,t.connect(e.hall),t},l=c(),u=i.createBiquadFilter();u.type=`bandpass`,u.frequency.value=420,u.Q.value=.7;let d=i.createOscillator();d.frequency.value=.11;let f=i.createGain();f.gain.value=180,d.connect(f).connect(u.frequency),d.start(),s(a).connect(u).connect(l);let p=c(),m=i.createBiquadFilter();m.type=`bandpass`,m.frequency.value=2600,m.Q.value=.5,s(O(i)).connect(m).connect(p);let h=c(),g=i.createBiquadFilter();g.type=`lowpass`,g.frequency.value=D.cold;for(let e of[43.6,44.3,87.5]){let t=i.createOscillator();t.type=`sawtooth`,t.frequency.value=e;let n=i.createGain();n.gain.value=e>60?.25:.5,t.connect(n).connect(g),t.start()}let _=i.createGain();_.gain.value=.5,s(a).connect(_).connect(g),g.connect(h),n={context:i,wind:l,fire:p,furnace:h,furnaceTone:g};let v=t;t=void 0,v&&r(v)});function r(e){let r=t!==void 0&&t.wind===e.wind&&t.fire===e.fire&&t.furnace===e.furnace&&t.heat===e.heat;if(t=e,r||!n)return;let i=n.context.currentTime;n.wind.gain.setTargetAtTime(e.wind*E.wind,i,T),n.fire.gain.setTargetAtTime(e.fire*E.fire,i,T),n.furnace.gain.setTargetAtTime(e.furnace*E.furnace,i,T);let a=D.cold+(D.hot-D.cold)*e.heat;n.furnaceTone.frequency.setTargetAtTime(a,i,T)}return{set:r,get now(){return t}}}var A=[`castHigh`,`castLevel`,`castLow`,`finJudgement`,`finMending`,`finSanctuary`,`finHour`,`finAnswer`,`finBenediction`,`hourToll`,`ward`,`wardLight`,`wardHeavy`,`wardHuge`,`wardCrack`,`wardBurst`,`greatDraw`,`greatCut`,`stepHeavy`,`charge`,`hopHeavy`],j=[`windJab`,`windSlam`,`windSweep`,`windSwing`,`windPlunge`,`windBody`,`windBeam`,`chimeAmber`,`hornRed`,`strikeJab`,`strikeSlam`,`strikeSweep`,`strikeSwing`,`strikePlunge`,`strikeBody`,`wave`,`beam`,`landJab`,`landSlam`,`landSweep`,`landSwing`,`landPlunge`,`landBody`,`guard`,`swish`,`roll`,`hop`,`clashLight`,`clashHeavy`,`clashHuge`,`ironLight`,`ironHeavy`,`ironHuge`,`sting`,`sizzle`,`slowmo`,`hurt`,`hurtHeavy`,`turn`,`tick`,`settle`,`fumble`,`cutHigh`,`cutLevel`,`cutLow`,`bitePlate`,`rendPlate`,`finTripleDraw`,`finCrosscut`,`finRisingMoon`,`finTwinFang`,`finFallingLeaf`,`finSwallowTurn`,`cutSwell`,`chimeWhite`,`iaiCut`,`draw`,`sheathe`,`dash`,`slash`,`flashCounter`,`sunderReady`,`sunderStart`,`sunderCut`,`sunderMiss`,`sunderFinal`,`scarLit`,`sundered`,`crunch`,`hiss`,`roar`,`armLand`,`collapse`,`down`,`toll`,...A],ee=[`guard`,`swish`,`roll`,`hop`,`hurt`,`hurtHeavy`,`settle`,`fumble`,`cutSwell`,`draw`,`sheathe`,`dash`,`sunderReady`,`down`,...A],M=`windJab.windSlam.windSweep.windSwing.windPlunge.windBody.windBeam.strikeJab.strikeSlam.strikeSweep.strikeSwing.strikePlunge.strikeBody.beam.cutHigh.cutLevel.cutLow.bitePlate.rendPlate.finTripleDraw.finCrosscut.finRisingMoon.finTwinFang.finFallingLeaf.finSwallowTurn.iaiCut.slash.sunderCut.sunderFinal.scarLit.sundered.crunch.hiss.roar.armLand.collapse`.split(`.`);function N(e){return ee.includes(e)?`hero`:M.includes(e)?`warden`:`centre`}var te={hero:-.3,warden:.3,centre:0},P=e=>te[N(e)];j.filter(e=>e.startsWith(`wind`)),[...j.filter(e=>e.startsWith(`strike`))],j.filter(e=>e.startsWith(`land`)),[...j.filter(e=>e.startsWith(`fin`)&&!A.some(t=>t===e))],[...A];var ne={jab:`windJab`,slam:`windSlam`,sweep:`windSweep`,swing:`windSwing`,plunge:`windPlunge`,bodySlam:`windBody`,beam:`windBeam`},re={jab:`strikeJab`,slam:`strikeSlam`,sweep:`strikeSweep`,swing:`strikeSwing`,plunge:`strikePlunge`,bodySlam:`strikeBody`,shockwave:`wave`,beam:`beam`},ie={jab:`landJab`,slam:`landSlam`,sweep:`landSweep`,swing:`landSwing`,plunge:`landPlunge`,bodySlam:`landBody`},ae={high:`cutHigh`,level:`cutLevel`,low:`cutLow`},oe={plate:{cut:`bitePlate`,deep:`rendPlate`,struck:{light:`ironLight`,heavy:`ironHeavy`,huge:`ironHuge`}}},se=`plate`,ce={high:5,level:0,low:-7},le=(e=0,t=1,n=0)=>({sound:oe[se].cut,pitch:e,gain:t,delay:n}),ue=(e=1,t=0)=>({sound:oe[se].deep,pitch:0,gain:e,delay:t}),de={finTripleDraw:[0,.06,.12],finCrosscut:[.1],finRisingMoon:[0],finTwinFang:[0,.09],finFallingLeaf:[.2],finSwallowTurn:[.17]};function fe(e){let t=de[e]??[0];return t.map((e,n)=>n<t.length-1?le(n*2,1,e):ue(1,e))}var pe={"Triple Draw":`finTripleDraw`,Crosscut:`finCrosscut`,"Rising Moon":`finRisingMoon`,"Twin Fang":`finTwinFang`,"Falling Leaf":`finFallingLeaf`,"Swallow Turn":`finSwallowTurn`};function me(e,t){return t===`beam`?`light`:e===`body`||t===`bodySlam`?`huge`:e===`hammer`?`heavy`:`light`}var he={light:`clashLight`,heavy:`clashHeavy`,huge:`clashHuge`},ge=[`slam`,`swing`,`bodySlam`],F=(e,t=0,n=1)=>({sound:e,pitch:t,gain:n}),_e=(...e)=>e.map(e=>F(e)),ve=(e,t=`good`,n=``)=>({type:`cut`,index:2,stance:e,quality:t,special:n,boon:``,damage:30,part:`core`});[...Object.keys(pe).map(e=>[`a finisher: ${e}`,[ve(`level`,`perfect`,e)]]),{...ve(`level`,`perfect`,`Falling Leaf`)}];function ye(e,t){return t?.(e)??be(e)}function be(e){switch(e.type){case`windup`:return e.motion===`shockwave`?[]:_e(ne[e.motion]);case`glint`:return _e(e.colour===`amber`?`chimeAmber`:`hornRed`);case`strike`:return _e(re[e.motion]);case`move`:return _e(e.move===`parry`?`guard`:e.move===`dodge`?`swish`:e.move===`roll`?`roll`:`hop`);case`parry`:{let t=me(e.limb,e.motion),n=e.perfect?1.15:1,r=[F(he[t],0,n)];return e.motion!==`beam`&&r.push(F(oe[se].struck[t],0,n)),e.perfect?[...r,F(`sting`)]:r}case`evade`:{let t=ie[e.motion];return[...t?[F(t)]:[],...e.perfect?[F(`slowmo`)]:[]]}case`hurt`:return _e(ge.includes(e.motion)?`hurtHeavy`:`hurt`);case`flashCounter`:return _e(`flashCounter`);case`riposteSlash`:return[F(`cutLevel`,e.index*2),le(e.index*2)];case`riposteHit`:return[F(`slash`),ue()];case`down`:return _e(`down`);case`victory`:return _e(`toll`);case`turn`:return _e(`turn`);case`target`:return _e(`tick`);case`linkBeat`:return _e(`settle`);case`cut`:{let t=ae[e.stance],n=ce[e.stance],r=pe[e.special];return r?[F(t),F(r),...fe(r),F(`sting`)]:e.quality===`perfect`?[F(t,0,1.15),le(n,1.15),F(`sting`)]:[F(t),le(n)]}case`chainDrop`:return _e(`fumble`);case`iaiDraw`:return _e(`cutSwell`);case`iaiFlash`:return _e(`chimeWhite`);case`iai`:return e.perfect?[F(`iaiCut`),ue(1.15)]:_e(`fumble`);case`counter`:return e.strong?[F(`dash`),F(ae[e.style],0,1.15),F(`slash`),ue(1.15),F(`sting`)]:[F(`dash`),F(ae[e.style]),F(`slash`),ue()];case`hourStrike`:case`wardAnswer`:return[];case`partBroken`:return e.part===`core`?[F(`crunch`,0,.8),F(`hiss`)]:_e(`crunch`,`hiss`,`roar`);case`sunderReady`:return _e(`sunderReady`);case`sunderStart`:return _e(`sunderStart`);case`sunderFlash`:return _e(`chimeWhite`);case`sunderCut`:{if(e.quality===`miss`&&!e.final)return _e(`sunderMiss`);let t=e.index*2,n=e.quality===`perfect`?1.15:1,r=e.final?[F(`sunderCut`,t,n),F(`sunderFinal`),ue(.9)]:[F(`sunderCut`,t,n),le(t,n)];return e.quality===`perfect`?[...r,F(`sting`)]:r}case`beamCatch`:return e.perfect?_e(`clashLight`,`sizzle`,`sting`):_e(`clashLight`,`sizzle`);case`interrupt`:return _e(`sunderStart`,`clashHeavy`,oe[se].struck.heavy);case`interruptCut`:return e.final?[F(`sunderCut`,e.index*2),F(`sunderFinal`),ue(.9)]:[F(`sunderCut`,e.index*2),le(e.index*2)];case`beamBreak`:case`sunderEnd`:case`restart`:return[]}}function xe(e){switch(e.type){case`armLanded`:return e.bounce?[F(`armLand`,3,.45)]:_e(`armLand`);case`collapse`:return _e(`collapse`);case`scarLit`:return[F(`scarLit`,e.index,e.last?1.2:.8)];case`sundered`:return _e(`sundered`)}}var Se=.7,I=.4,Ce=.12;function we(e){return e.outcome===`down`?`down`:e.outcome===`victory`&&!_(e)?`lament`:a(e.parts)>0?`enraged`:`opening`}function Te(e){let t=e.player,n=e.turn===`player`&&t.step===`sunder`&&t.doneAt<0,r=e.hero.action===`interrupt`,i=1;return(n||r)&&(i=I),_(e)&&(i=Ce),{stage:we(e),level:i,muffled:e.slowmo>0&&e.outcome===`fighting`}}function L(e,t){return t[e]??(e===`enraged`?t.opening:void 0)}function Ee(e,t){return e===`opening`&&L(`enraged`,t)===t.opening}function R(e,t){let n=Ee(e.stage,t),r=e.muffled?`muffled`:n?`held`:`open`;return{level:e.level*(n?Se:1),tone:r}}var De={master:.8,music:.55,effects:.8,hall:.55,muted:!1},Oe=`sunder.audio.v1`,ke=(e,t)=>typeof e==`number`&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):t;function Ae(e){let t=typeof e==`object`&&e?e:{};return{master:ke(t.master,De.master),music:ke(t.music,De.music),effects:ke(t.effects,De.effects),hall:ke(t.hall,De.hall),muted:typeof t.muted==`boolean`?t.muted:De.muted}}var je=e=>Math.max(0,Math.min(1,e))**2;function Me(e){return{master:e.muted?0:je(e.master),music:je(e.music),effects:je(e.effects),hall:je(e.hall)}}function Ne(){try{let e=localStorage.getItem(Oe);return Ae(e?JSON.parse(e):void 0)}catch{return De}}function Pe(e){try{localStorage.setItem(Oe,JSON.stringify(e))}catch{}}var Fe=.04;function Ie(e){let t=Ne(),n,r,i=[],a,o=new Float32Array(2048),s=e=>{e.getFloatTimeDomainData(o);let t=0;for(let e of o)t+=e*e;return Math.sqrt(t/o.length)};function c(){if(!n||!r)return;let e=Me(t),i=n.context.currentTime;r.gain.setTargetAtTime(e.master,i,Fe),n.music.gain.setTargetAtTime(e.music,i,Fe),n.effects.gain.setTargetAtTime(e.effects,i,Fe),n.hall.gain.setTargetAtTime(e.hall,i,Fe)}let l=()=>{if(!n){let e=new AudioContext,s=e.createDynamicsCompressor();s.threshold.value=-8,s.knee.value=6,s.ratio.value=12,s.attack.value=.003,s.release.value=.2,r=e.createGain(),r.connect(s).connect(e.destination);let c=()=>{let t=e.createGain();return t.connect(r),t};n={context:e,music:c(),effects:c(),hall:c()};let l=t=>{let n=e.createAnalyser();return n.fftSize=o.length,t.connect(n),n};a={out:l(s),music:l(n.music)};let u=Me(t);r.gain.value=u.master,n.music.gain.value=u.music,n.effects.gain.value=u.effects,n.hall.gain.value=u.hall;for(let e of i.splice(0))e(n)}n.context.state===`suspended`&&!document.hidden&&n.context.resume()};return e.addEventListener(`keydown`,l),e.addEventListener(`pointerdown`,l),document.addEventListener(`visibilitychange`,()=>{n&&(document.hidden?n.context.suspend():n.context.resume())}),{get buses(){return n},get settings(){return t},set(e){t=Ae({...t,...e}),Pe(t),c()},whenReady(e){n?e(n):i.push(e)},level(){return a?{out:s(a.out),music:s(a.music)}:{out:0,music:0}}}}var Le=1.6,Re=.18,ze=4e3,Be=2,Ve=.9,z={open:2e4,held:3200,muffled:700};function He(e){let t=new Map,n,r,i,a={level:1,tone:`open`},o=new Map;function s(e,i){let a=t.get(e.id);if(a)return a;let s=fetch(e.file).then(t=>{if(!t.ok)throw Error(`${e.file}: ${t.status}`);return t.arrayBuffer()}).then(e=>i.decodeAudioData(e));s.catch(n=>{t.delete(e.id),o.set(e.id,performance.now()),console.error(`Music failed to load: ${e.title}`,n)}),t.set(e.id,s);for(let e of[...t.keys()].slice(0,Math.max(0,t.size-Be)))e!==r?.id&&e!==n?.id&&t.delete(e);return s}function c(t){let o=e.buses;if(!o)return;let{context:c}=o;if(!i){let e=c.createBiquadFilter();e.type=`lowpass`,e.frequency.value=z[a.tone];let t=c.createGain();t.gain.value=a.level,e.connect(t).connect(o.music),i={filter:e,level:t}}let l=i.filter,u=e=>{let t=c.currentTime;e.gain.gain.cancelScheduledValues(t),e.gain.gain.setValueAtTime(e.gain.gain.value,t),e.gain.gain.linearRampToValueAtTime(0,t+Le),e.source.stop(t+Le+.05)};t?s(t,c).then(e=>{if(n?.id!==t.id||r?.id===t.id)return;r&&u(r);let i=c.createBufferSource();i.buffer=e,i.loop=!0,t.loop&&(i.loopStart=t.loop.start,i.loopEnd=Math.min(t.loop.end,e.duration));let a=c.createGain(),o=c.currentTime;a.gain.setValueAtTime(0,o),a.gain.linearRampToValueAtTime(t.gain,o+Le),i.connect(a).connect(l),i.start(o),r={id:t.id,source:i,gain:a}},()=>{}):(r&&u(r),r=void 0)}return e.whenReady(()=>c(n)),{play(e){if(e?.id===n?.id){let t=e?o.get(e.id):void 0;e&&t!==void 0&&performance.now()-t>ze&&(o.delete(e.id),c(e))}else n=e,c(e)},shape(t,n){if(t===a.level&&n===a.tone)return;let r=a;if(a={level:t,tone:n},!i||!e.buses)return;let o=e.buses.context.currentTime,s=r.tone===`held`&&n===`open`?Ve:Re;t!==r.level&&i.level.gain.setTargetAtTime(t,o,s),n!==r.tone&&i.filter.frequency.setTargetAtTime(z[n],o,s)},warm(t){e.buses&&s(t,e.buses.context).catch(()=>{})},get playing(){return n?.id},get sounding(){return r!==void 0&&r.id===n?.id}}}var Ue={strikeSeconds:.2,cutSeconds:.3},We=[[1180,.2,.5],[1307,.12,.45],[1890,.14,.55],[2210,.1,.5],[2760,.18,.6],[3480,.12,.5],[4310,.12,.42],[5230,.08,.34],[6120,.07,.28],[8350,.04,.18]],Ge=[[640,.1,.22],[905,.16,.34],[1187,.2,.5],[1490,.14,.6],[1940,.16,.66],[2330,.1,.6],[2890,.1,.5],[3620,.07,.4],[4470,.05,.3]],Ke=[[1570,.07,.6],[2290,.07,.6],[3120,.09,.7],[3152,.07,.7],[4710,.06,.5],[6380,.045,.4],[8230,.03,.3]],qe=[[98,.3,4.2],[196,.26,3.4],[233,.16,2.6],[294,.12,2.2],[392,.14,1.8],[587,.07,1.2],[784,.05,.9]],Je=[[1047,.14,.8],[2890,.08,.6],[5650,.05,.4],[9300,.025,.25]],Ye=[[1397,.16,.6],[3750,.08,.4],[7200,.04,.25]],Xe=[[820,.08,.8],[1210,.07,.7],[1830,.06,.6],[2650,.04,.5]],Ze=[1,1.483,1.932,2.546,2.63,3.897],Qe=[1,1.47,1.93,2.58,3.41,4.32,5.6,7.1],$e=500,et=.02,tt=.015,nt=4,rt=e=>({make:e,wet:.08,drive:0,max:nt}),it=(e,t)=>({make:t,wet:e,drive:0,max:nt}),B=(e,t,n,r=nt)=>({make:n,wet:e,drive:t,max:r}),at=(e,t,n=6)=>({make:t,wet:e,drive:0,max:n});function ot(e,t){e.noise(`bandpass`,t*2.2,.28,.34,{to:t*3.4,q:2,attack:.03,slow:!0}),e.noise(`highpass`,6e3,.26,.07,{attack:.04}),e.tone(`sine`,t,.5,.15,{attack:.025,slow:!0}),e.tone(`sine`,t*1.004,.5,.1,{attack:.025,slow:!0}),e.tone(`sine`,t*2.76,.3,.05,{attack:.03,slow:!0}),e.ring(Je,{gain:.5,pitch:t/1047,at:.03})}function st(e,t,n){e.crack(.8),e.ring(Je,{gain:n,pitch:t}),e.scrape(3800,7e3,.2,.12,{rough:140,q:4,at:.015})}function ct(e,t,n,r=.22,i=0){let a=n>0?t*1.6:n<0?t*.6:t*1.1,o=n>0?t*.6:n<0?t*1.6:t*.9;e.noise(`highpass`,5200,.012,.12,{at:i}),e.zip(a,o,r*.8,.5,i),e.noise(`bandpass`,a*1.3,r,1.6,{to:o*1.3,q:5,at:i,attack:.02}),e.noise(`bandpass`,t*.16,r*1.2,1.6,{to:t*.09,q:.8,at:i,attack:.03,slow:!0}),e.noise(`lowpass`,520,.1,1.1,{to:160,q:.5,at:i})}function lt(e,t,n=0){e.noise(`highpass`,5200,.01,.6,{at:n}),e.noise(`bandpass`,t,.06,1.6,{to:t*1.5,q:5,at:n}),e.noise(`bandpass`,600,.09,1.2,{q:1,at:n,slow:!0}),e.zip(t*1.2,t*2.4,.08,.35,n)}function ut(e,t,n,r,i){e.noise(`bandpass`,t,e.timing.strikeSeconds,i,{to:n,q:r,swell:!0})}function dt(e,t,n,r){let i=e.timing.strikeSeconds;e.tone(`sawtooth`,t*2,i,r,{to:n*2,attack:i,cut:900}),e.tone(`triangle`,t,i,r*.8,{to:n,attack:i}),e.noise(`bandpass`,t*3,i,r*1.6,{to:n*3,q:1.2,swell:!0})}function ft(e,t,n,r,i,a){for(let o=0;o<t;o++){let s=r+(i-r)*o/Math.max(1,t-1);e.noise(`bandpass`,s,.03,a,{q:8,at:o*n})}}function pt(e,t,n,r=0){e.noise(`lowpass`,1300,t,n,{to:180,at:r,slow:!0}),e.noise(`bandpass`,2400,t*.4,n*.4,{q:.7,at:r+.03}),e.grit(900,t*.8,n*1.2,{to:420,q:.8,at:r})}function mt(e,t,n,r=0){e.scrape(1100,380,t,n,{rough:38,q:2,at:r}),e.scrape(2600,1200,t*.8,n*.6,{rough:70,q:3,at:r}),e.grit(1600,t,n*1.6,{to:600,q:2,at:r})}var ht={windJab:B(.15,1.2,e=>{e.thud(180,.25,.3),ft(e,4,.045,2400,3300,.17),e.tone(`sawtooth`,150,.22,.09,{to:260,attack:.03}),e.clang(520,.05,.1,.18)}),windSlam:B(.25,1.6,e=>{e.tone(`sawtooth`,104,.5,.2,{to:184,attack:.12,cut:900}),e.tone(`triangle`,52,.5,.2,{to:92,attack:.1});for(let t=0;t<3;t++)e.clang(190,.07,.21,t*.15),e.noise(`bandpass`,720,.06,.2,{q:4,at:t*.15})}),windSweep:B(.2,1.4,e=>{e.scrape(420,980,.42,.34,{rough:34,q:1.6}),e.scrape(160,300,.42,.3,{rough:22,q:1.2}),e.tone(`triangle`,148,.4,.2,{to:116,attack:.05})}),windSwing:B(.22,1.5,e=>{e.tone(`sawtooth`,192,.42,.16,{to:120,attack:.06,cut:900}),e.tone(`triangle`,96,.42,.2,{to:66,attack:.06});for(let t of[0,.2])e.clang(240,.06,.21,t),e.noise(`bandpass`,1150,.03,.2,{q:8,at:t})}),windPlunge:B(.18,1.2,e=>{for(let t=0;t<6;t++){let n=.36*(1-(1-t/6)**1.7);e.noise(`bandpass`,2e3+t*420,.028,.16,{q:9,at:n})}e.tone(`sawtooth`,190,.38,.08,{to:450,attack:.05}),e.clang(430,.08,.18,.36),e.thud(180,.22,.3,.36)}),windBody:B(.35,1.8,e=>{e.tone(`sawtooth`,80,.75,.24,{to:116,attack:.16,cut:800}),e.tone(`square`,120,.7,.1,{to:168,attack:.16,cut:1200}),e.tone(`triangle`,40,.75,.24,{to:58,attack:.12}),e.noise(`highpass`,3e3,.55,.12,{to:5200,swell:!0}),e.thud(64,.5,.4),e.clang(130,.2,.18)}),windBeam:it(.2,e=>{e.sear(260,.8,.1,{to:1040,buzz:9,buzzTo:52,attack:.5,cut:5e3}),e.tone(`sine`,1320,.8,.05,{to:2640,attack:.5}),e.tone(`sine`,1327,.8,.04,{to:2654,attack:.55}),e.noise(`highpass`,6e3,.75,.05,{swell:!0})}),chimeAmber:rt(e=>{e.noise(`highpass`,5e3,.008,.2),e.tone(`sine`,1568,.36,.25,{attack:.002,slow:!0}),e.tone(`sine`,1577,.36,.12,{attack:.002,slow:!0}),e.tone(`sine`,4328,.24,.1,{attack:.002,slow:!0}),e.tone(`sine`,8467,.12,.05,{attack:.002})}),hornRed:rt(e=>{e.noise(`bandpass`,1200,.02,.2,{q:1}),e.sear(311,.3,.2,{to:294,buzz:46,attack:.004,cut:2400}),e.sear(440,.3,.16,{to:415,buzz:46,attack:.004,cut:2800}),e.tone(`square`,155.5,.28,.08,{to:147,attack:.004,cut:900})}),chimeWhite:rt(e=>{e.tone(`sine`,3136,.4,.2,{attack:.002,slow:!0}),e.tone(`sine`,3149,.4,.1,{attack:.002,slow:!0}),e.tone(`sine`,6272,.25,.07,{attack:.002,slow:!0}),e.tone(`triangle`,4699,.2,.04,{attack:.002})}),strikeJab:B(.1,1,e=>{ut(e,1800,5200,2,.34),dt(e,150,240,.08)}),strikeSlam:B(.15,1.6,e=>{ut(e,300,1400,1,.44),dt(e,110,70,.2)}),strikeSweep:B(.1,1.2,e=>{ut(e,600,2e3,1,.3),e.scrape(700,1500,e.timing.strikeSeconds,.14,{rough:50}),e.scrape(180,320,e.timing.strikeSeconds,.2,{rough:26,q:1.2})}),strikeSwing:B(.15,1.6,e=>{ut(e,250,1100,1.2,.42),dt(e,84,132,.2)}),strikePlunge:B(.1,1,e=>{ut(e,2400,900,2,.3),e.tone(`sine`,1800,e.timing.strikeSeconds,.09,{to:520,attack:e.timing.strikeSeconds*.5}),dt(e,170,100,.1)}),strikeBody:B(.18,1.8,e=>{e.noise(`lowpass`,400,e.timing.strikeSeconds,.5,{to:1500,swell:!0}),dt(e,62,104,.26)}),wave:B(.25,1.4,e=>{e.noise(`lowpass`,320,.55,.5,{to:140,q:2,slow:!0}),e.thud(60,.5,.5),e.grit(700,.5,.6,{to:260,q:.9}),e.noise(`bandpass`,520,.4,.3,{to:200,q:1.2,at:.05,slow:!0})}),beam:B(.25,1.2,e=>{let t=e.timing.strikeSeconds;e.noise(`bandpass`,1500,t,.16,{to:7e3,q:3,swell:!0}),e.tone(`sine`,2e3,t,.06,{to:5200,attack:t*.9}),e.crack(.8,t),e.thud(110,.35,.4,t),e.sear(392,.75,.16,{at:t,buzz:82,attack:.004,cut:3600}),e.sear(554,.75,.1,{at:t,buzz:82,attack:.004,cut:4400}),e.sear(131,.75,.05,{at:t,buzz:13,attack:.01,cut:700}),e.scrape(5200,4200,.75,.3,{at:t,rough:95,q:1.2}),e.noise(`highpass`,3e3,.25,.1,{at:t+.7})}),landJab:B(.3,1.8,e=>{e.crack(.9),e.grit(2600,.14,.7,{q:1.5}),e.clank(1300,.25,.06,{ratio:2.76,index:3}),e.ring(We,{gain:.12}),e.thud(150,.3,.5),pt(e,.2,.3)}),landSlam:B(.4,2.4,e=>{e.crack(1),e.thud(62,.7,1),e.thud(120,.4,.5),e.clang(260,.2,.39),e.clank(820,.4,.06,{index:4}),e.ring(Ge,{gain:.12,pitch:.9}),pt(e,.6,.6)}),landSweep:B(.3,1.8,e=>{e.scrape(1500,480,.3,.42,{rough:44,q:1.4}),e.scrape(420,180,.34,.4,{rough:24,q:1.1}),e.thud(150,.3,.4),e.clang(380,.14,.26),e.ring(We,{gain:.06}),e.grit(1800,.3,.5,{q:1.5})}),landSwing:B(.38,2.2,e=>{e.crack(.7),e.thud(74,.5,.75),e.clank(900,.35,.06,{index:3}),e.clang(280,.18,.39),e.ring(Ge,{gain:.09}),e.scrape(520,220,.3,.4,{rough:30,q:1}),e.grit(1200,.25,.6,{q:1.2})}),landPlunge:B(.38,2,e=>{e.crack(1),e.clank(1100,.4,.08,{ratio:2.76,index:3}),e.ring(We,{gain:.2,pitch:.85}),e.thud(84,.5,.75),e.grit(2e3,.2,.7,{q:1.5}),pt(e,.35,.4)}),landBody:B(.45,2.6,e=>{e.crack(1),e.thud(50,.7,1),e.thud(96,.45,.7),e.clang(180,.22,.52),e.clank(620,.5,.07,{index:4}),e.ring(Ge,{gain:.16,pitch:.75}),e.grit(700,.5,.8,{to:300,q:.9}),pt(e,.9,.7)}),guard:rt(e=>{e.noise(`bandpass`,3200,.04,.12,{q:6}),e.ring(Ke,{gain:.18})}),swish:rt(e=>e.noise(`bandpass`,1200,.16,.25,{to:400,q:2})),roll:rt(e=>{e.noise(`bandpass`,700,.22,.3,{to:300,q:1.5}),e.thud(140,.2,.2,.08)}),hop:rt(e=>{e.noise(`highpass`,2200,.05,.14),e.tone(`sine`,300,.12,.13,{to:600})}),clashLight:B(.3,1.6,e=>{e.crack(.9),e.ring(Ke,{gain:.24}),e.scrape(4200,7400,.2,.14,{rough:150,q:4,at:.015}),e.thud(140,.32,.9)}),clashHeavy:B(.38,2,e=>{e.crack(1),e.ring(Ke,{gain:.18}),e.scrape(3400,6200,.22,.14,{rough:130,q:4,at:.02}),e.thud(92,.5,1.7),e.thud(170,.3,.8)}),clashHuge:B(.45,2.4,e=>{e.crack(1),e.ring(Ke,{gain:.16}),e.thud(64,.6,2),e.thud(110,.4,1.3),pt(e,.4,.35)}),ironLight:B(.3,1.6,e=>{e.clank(1480,.4,.1,{index:4}),e.clank(990,.3,.06,{ratio:2.76,index:2}),e.clang(420,.14,.47),e.ring(We,{gain:.22}),e.grit(2e3,.12,.3,{q:2})}),ironHeavy:B(.38,2,e=>{e.clank(880,.5,.1,{index:5}),e.clank(1480,.4,.06,{ratio:2.76,index:3}),e.clang(300,.22,.52),e.ring(Ge,{gain:.26}),e.ring(We,{gain:.14}),e.grit(1400,.2,.5,{q:1.5})}),ironHuge:B(.45,2.4,e=>{e.clank(700,.6,.11,{index:5}),e.clank(1180,.5,.068,{ratio:2.76,index:3}),e.clang(220,.2,.58),e.ring(Ge,{pitch:.8,gain:.28}),e.ring(We,{gain:.12}),e.grit(1e3,.3,.6,{to:500,q:1.2})}),sting:rt(e=>{e.tone(`square`,1568,.25,.08,{at:.04}),e.tone(`sine`,3136,.4,.15,{at:.04}),e.tone(`sine`,2093,.5,.15,{at:.08})}),sizzle:B(.15,1.2,e=>{e.scrape(3200,5200,.7,.3,{rough:160,q:1.5}),e.grit(5e3,.7,.6,{q:3}),e.sear(1400,.7,.06,{buzz:110,attack:.004,cut:5e3}),e.noise(`highpass`,4e3,.03,.3)}),slowmo:it(.3,e=>{e.tone(`sine`,600,.7,.25,{to:120,attack:.02}),e.noise(`lowpass`,2e3,.6,.2,{to:200})}),hurt:B(.15,1.6,e=>{e.noise(`bandpass`,1500,.03,.6,{q:.8}),e.thud(e.vary(140),.35,.9),e.noise(`lowpass`,900,.2,.5,{slow:!0}),e.noise(`bandpass`,620,.16,.35,{to:380,q:1.5,at:.03,attack:.02})}),hurtHeavy:B(.25,2,e=>{e.noise(`bandpass`,1200,.04,.7,{q:.7}),e.thud(e.vary(84),.5,1.2),e.thud(150,.3,.7),e.noise(`lowpass`,800,.3,.6,{to:180,slow:!0}),e.noise(`bandpass`,560,.2,.4,{to:320,q:1.5,at:.03,attack:.02})}),turn:rt(e=>{e.tone(`triangle`,659,.18,.1),e.tone(`triangle`,988,.24,.1,{at:.08})}),tick:rt(e=>e.tone(`square`,1760,.04,.06)),settle:rt(e=>{e.tone(`square`,2637,.03,.08),e.noise(`bandpass`,5200,.025,.12,{q:10})}),fumble:rt(e=>{e.tone(`sine`,220,.18,.3,{to:110}),e.noise(`lowpass`,600,.12,.25)}),cutHigh:B(.2,2,e=>ct(e,4200,1),6),cutLevel:B(.2,2,e=>ct(e,3200,0),6),cutLow:B(.2,2,e=>ct(e,2300,-1),6),bitePlate:B(.28,1.8,e=>{e.crack(.7),e.clank(1320,.32,.084,{ratio:2.76,index:3}),e.clang(400,.12,.39),e.ring(Ke,{gain:.24}),e.ring(We,{gain:.08}),e.scrape(3400,6800,.2,.18,{rough:130,q:4,at:.01}),e.thud(150,.3,.6),e.grit(2200,.1,.3,{q:2})},8),rendPlate:B(.4,2.2,e=>{e.crack(1),e.clank(760,.5,.1,{index:5}),e.clank(1480,.4,.068,{ratio:2.76,index:3}),e.clang(300,.16,.52),e.ring(Ge,{gain:.2}),e.ring(We,{gain:.14}),e.ring(Ke,{gain:.26}),e.thud(84,.5,1.3),e.thud(150,.3,.6),e.grit(1500,.3,.7,{to:700,q:1.5})}),finTripleDraw:B(.25,1.4,e=>{for(let t=0;t<3;t++)ct(e,2600+t*900,0,.1,t*.06)}),finCrosscut:B(.25,1.4,e=>{e.noise(`bandpass`,6e3,.14,.4,{to:1500,q:2}),e.noise(`bandpass`,1500,.14,.4,{to:6e3,q:2}),ct(e,3400,0,.14,.1)}),finRisingMoon:B(.25,1.4,e=>{ct(e,2400,-1,.26),e.tone(`triangle`,440,.3,.14,{to:1320}),e.scrape(2400,7200,.24,.2,{rough:120,q:4,at:.02})}),finTwinFang:B(.22,1.4,e=>{lt(e,2600),lt(e,2900,.09)}),finFallingLeaf:B(.25,1.4,e=>{e.noise(`bandpass`,5200,.26,.4,{to:500,q:2}),e.tone(`triangle`,1320,.28,.14,{to:330}),ct(e,3e3,1,.16,.2)}),finSwallowTurn:B(.25,1.4,e=>{e.noise(`bandpass`,800,.17,.36,{to:3200,q:1.5,swell:!0}),ct(e,3600,0,.16,.17)}),cutSwell:rt(e=>e.noise(`highpass`,1200,e.timing.cutSeconds,.22,{to:5200,swell:!0})),iaiCut:B(.5,1.6,e=>{ct(e,3400,1,.32),e.scrape(3e3,8200,.3,.24,{rough:130,q:4,at:.01}),e.noise(`bandpass`,700,.4,.6,{to:300,q:1,slow:!0}),e.ring(Ke,{gain:.24,at:.04}),e.tone(`sine`,2637,.9,.12,{at:.02}),e.tone(`sine`,1319,.9,.1,{at:.02})}),draw:rt(e=>{e.scrape(1700,6200,.24,.5,{rough:85,q:2}),e.scrape(3400,9200,.22,.2,{rough:120,q:4,at:.02}),e.ring(Ke,{at:.2})}),sheathe:rt(e=>{e.scrape(5e3,1500,.26,.3,{rough:60,q:2}),e.scrape(7600,3e3,.24,.1,{rough:95,q:4});let t=.27;e.tone(`square`,1250,.022,.16,{at:t}),e.tone(`triangle`,2600,.03,.1,{at:t}),e.tone(`sine`,190,.07,.2,{at:t,to:120}),e.noise(`highpass`,3e3,.02,.18,{at:t})}),dash:rt(e=>{e.noise(`bandpass`,500,.12,.3,{to:2600,q:1.5,swell:!0}),e.noise(`highpass`,2400,.04,.12)}),slash:B(.3,2,e=>{ct(e,3e3,1,.26),e.scrape(2600,6400,.26,.22,{rough:120,q:4,at:.01})}),flashCounter:B(.4,1.6,e=>{e.crack(.9),e.ring(Ke,{gain:.22}),e.noise(`highpass`,1800,.14,.42),e.thud(110,.4,.5),e.tone(`sine`,2637,.9,.14,{at:.02}),e.tone(`sine`,1319,.9,.11,{at:.02})}),sunderReady:rt(e=>{for(let[t,n]of[1319,1760,2637].entries())e.tone(`sine`,n,.5,.14,{at:t*.07,attack:.01});e.noise(`highpass`,3e3,.5,.1,{to:7e3,swell:!0})}),sunderStart:B(.4,1.4,e=>{e.thud(70,.7,.7),e.noise(`lowpass`,600,.5,.4,{to:160,slow:!0}),e.noise(`bandpass`,700,.6,.22,{to:3200,q:1.5,swell:!0})}),sunderCut:B(.25,2,e=>ct(e,3800,0,.18),8),sunderMiss:rt(e=>e.noise(`bandpass`,1600,.14,.2,{to:500,q:2})),sunderFinal:B(.45,2,e=>{ct(e,3e3,1,.3),e.scrape(2600,7e3,.28,.2,{rough:120,q:4,at:.01}),e.thud(60,.7,.9)}),scarLit:B(.35,1.4,e=>{e.crack(.5),e.zip(4200,9e3,.08,.3),e.tone(`sine`,2093,.3,.1),e.tone(`sine`,3136,.22,.06),e.thud(190,.25,.3)},12),sundered:B(.5,2.6,e=>{e.crack(1),e.noise(`lowpass`,1800,.6,.7,{to:160,slow:!0}),mt(e,.6,.4),e.clank(620,.6,.1,{index:5}),e.clang(200,.22,.59),e.thud(56,.65,1.4),e.thud(100,.45,.8),e.ring(Ge,{gain:.22,pitch:.85}),e.ring(Ke,{gain:.2})}),crunch:B(.35,2.6,e=>{e.crack(.8),e.noise(`lowpass`,1600,.4,.7,{to:180,slow:!0}),mt(e,.45,.4),e.clank(700,.4,.08,{index:5}),e.clang(200,.25,.52),e.thud(78,.5,.7)}),hiss:it(.3,e=>e.noise(`highpass`,4e3,1.2,.24,{to:2500,at:.1})),roar:B(.45,2,e=>{e.tone(`sawtooth`,124,.9,.3,{to:96,attack:.08,at:.15,cut:1e3}),e.tone(`square`,93,.8,.14,{to:70,attack:.08,at:.15,cut:1400}),e.tone(`triangle`,62,.9,.3,{to:48,attack:.08,at:.15}),e.noise(`lowpass`,600,.8,.3,{to:220,at:.15,slow:!0})}),armLand:B(.42,2.2,e=>{e.crack(.9),e.clank(760,.5,.1,{index:5}),e.clang(240,.18,.59),e.ring(Ge,{gain:.24}),e.thud(76,.5,1.3),e.grit(1100,.3,.6,{q:1.2}),pt(e,.35,.4)}),collapse:B(.5,2.4,e=>{e.tone(`sawtooth`,140,.9,.2,{to:68,attack:.1,cut:1e3});for(let[t,n]of[.2,.42,.66].entries())e.crack(.5,n),e.clank(900-t*120,.25,.048,{index:4,at:n}),e.clang(300-t*50,.14,.31,n),e.ring(Ge,{at:n,gain:.06,pitch:1.1-t*.12}),e.thud(120,.3,.4,n);e.crack(1,.86),e.thud(54,.7,1,.86),e.thud(100,.5,.6,.86),e.clank(600,.6,.088,{index:5,at:.86}),e.clang(180,.22,.59,.86),e.ring(Ge,{at:.86,gain:.2,pitch:.8}),e.grit(800,.6,.8,{to:300,q:1,at:.86}),pt(e,.9,.6,.86)}),down:it(.4,e=>{e.tone(`triangle`,392,.4,.18,{to:196}),e.tone(`triangle`,294,.6,.18,{to:147,at:.25}),e.thud(90,.4,.3,.5)}),toll:{wet:.7,drive:0,max:2,make:e=>{e.ring(qe),e.noise(`bandpass`,900,.05,.2,{q:1}),e.tone(`sine`,98,.5,.3,{slow:!0})}},castHigh:at(.3,e=>ot(e,1568)),castLevel:at(.3,e=>ot(e,1175)),castLow:at(.3,e=>ot(e,880)),finJudgement:at(.4,e=>{e.tone(`sine`,55,.34,.3,{to:130,attack:.3}),e.tone(`triangle`,110,.34,.12,{to:260,attack:.3,cut:900}),e.noise(`bandpass`,500,.32,.3,{to:3e3,q:1,swell:!0}),e.crack(.5,.34),e.ring(Je,{gain:1,pitch:1.2,at:.34}),e.tone(`sine`,2349,.6,.12,{at:.34,attack:.01,slow:!0})}),finMending:at(.45,e=>{e.tone(`sine`,880,1,.18,{attack:.012,slow:!0}),e.tone(`sine`,882.5,1,.1,{attack:.012,slow:!0}),e.tone(`triangle`,1760,.6,.05,{attack:.012,slow:!0}),e.tone(`sine`,440,.8,.1,{attack:.2,slow:!0}),e.noise(`bandpass`,700,.6,.18,{to:1600,q:1,attack:.2,slow:!0})}),finSanctuary:at(.5,e=>{for(let t of[660,990,1320])e.tone(`sine`,t,.9,.07,{attack:.25}),e.tone(`sine`,t*1.006,.9,.06,{attack:.25});e.noise(`highpass`,4e3,.8,.05,{attack:.3})}),finHour:at(.3,e=>{for(let t of[0,.11])e.tone(`square`,1900,.014,.07,{at:t}),e.noise(`bandpass`,3600,.02,.2,{q:8,at:t});e.ring(Ye,{gain:.9,at:.24})}),finAnswer:at(.6,e=>{e.ring(Je,{gain:1.3,pitch:.9}),e.tone(`sine`,940,1.5,.1,{attack:.02,slow:!0}),e.tone(`sine`,944,1.5,.08,{attack:.02,slow:!0}),e.noise(`highpass`,5e3,.12,.05,{attack:.02})}),finBenediction:at(.5,e=>{for(let[t,n]of[659,880,1109,1319].entries())e.tone(`sine`,n,.55,.12,{at:t*.09,attack:.02,slow:!0}),e.tone(`sine`,n*1.005,.55,.08,{at:t*.09,attack:.02,slow:!0});e.noise(`highpass`,3500,.5,.07,{to:8e3,swell:!0})}),hourToll:at(.35,e=>{e.noise(`bandpass`,4200,.01,.15,{q:8}),e.ring(Ye,{gain:1,at:.005}),e.tone(`sine`,1397,.5,.06,{attack:.005,slow:!0})},8),ward:at(.3,e=>{e.tone(`sine`,1175,.28,.12,{to:1760,attack:.02,slow:!0}),e.tone(`sine`,2349,.28,.06,{to:3520,attack:.02,slow:!0}),e.ring(Je,{gain:.6,pitch:1.3,at:.1}),e.noise(`highpass`,6e3,.1,.05,{attack:.03})}),wardLight:B(.3,1.2,e=>{st(e,1.1,.3),e.thud(140,.32,.9)}),wardHeavy:B(.38,1.6,e=>{st(e,.85,.28),e.thud(92,.5,1.7),e.thud(170,.3,.8)}),wardHuge:B(.45,2,e=>{st(e,.65,.26),e.thud(64,.6,2),e.thud(110,.4,1.3),pt(e,.4,.35)}),wardCrack:B(.3,1.2,e=>{e.crack(.6),e.grit(4200,.25,.4,{to:2e3,q:3}),e.tone(`sine`,2600,.3,.1,{to:900,attack:.004,slow:!0}),e.ring(Je,{gain:.4,pitch:1.5})}),wardBurst:B(.35,1.2,e=>{e.noise(`bandpass`,1e3,.25,.55,{to:6e3,q:1.2,attack:.02}),e.ring(Je,{gain:.5,pitch:1.1}),e.thud(130,.25,.4)}),greatDraw:rt(e=>{let t=e.timing.cutSeconds;e.scrape(600,3200,t,.5,{rough:60,q:1.6}),e.scrape(300,1400,t,.4,{rough:40,q:1.2}),e.ring(Xe,{at:t*.92})}),greatCut:B(.5,2,e=>{e.noise(`bandpass`,300,.14,1.2,{to:1400,q:1,swell:!0}),ct(e,1800,1,.34,.1),e.crack(.8,.14),e.thud(60,.7,1,.14),e.thud(110,.4,.5,.14),e.noise(`lowpass`,500,.5,.6,{to:160,at:.14,slow:!0}),e.ring(Xe,{gain:.6,at:.14})}),stepHeavy:rt(e=>{e.noise(`bandpass`,800,.22,.32,{to:300,q:1.5}),e.noise(`lowpass`,400,.12,.3,{to:150,at:.03}),e.thud(110,.15,.18,.05)}),charge:B(.15,1.2,e=>{e.noise(`bandpass`,400,.24,.5,{to:1600,q:1.2,swell:!0}),e.noise(`lowpass`,500,.2,.4,{to:160,at:.2,slow:!0}),e.thud(90,.3,.35,.22)}),hopHeavy:rt(e=>{e.noise(`highpass`,1500,.06,.14),e.noise(`lowpass`,700,.14,.3,{to:250}),e.tone(`sine`,190,.16,.15,{to:400}),e.thud(100,.14,.2)})},gt={windJab:.42,windSlam:.52,windSweep:.7,windSwing:.55,windPlunge:.41,windBody:.54,windBeam:1.88,chimeAmber:.93,hornRed:.83,chimeWhite:1.16,strikeJab:.86,strikeSlam:.66,strikeSweep:.96,strikeSwing:.7,strikePlunge:.91,strikeBody:.67,wave:.77,beam:.62,landJab:.8,landSlam:.96,landSwing:.96,landPlunge:.91,landBody:.89,guard:3.45,swish:3,roll:.56,hop:1.24,clashLight:.83,clashHeavy:.75,clashHuge:.74,wardLight:.85,wardHeavy:.62,wardHuge:.6,greatCut:.58,charge:.45,sting:1.35,slowmo:1.43,hurt:.89,hurtHeavy:.92,turn:2,tick:2.25,settle:2,cutHigh:.67,cutLevel:.68,cutLow:.68,finTripleDraw:.65,finCrosscut:.68,finRisingMoon:.67,finTwinFang:.62,finFallingLeaf:.64,finSwallowTurn:.66,iaiCut:.67,draw:.77,dash:1.83,slash:.72,flashCounter:.9,sunderReady:1.47,sunderStart:.77,sunderCut:.69,sunderMiss:5.33,sunderFinal:.62,scarLit:.32,sundered:.69,crunch:.73,roar:.61,armLand:.73,collapse:.7,down:.78,landSweep:.97,toll:.6,bitePlate:.44,rendPlate:.57,sizzle:.51,ironLight:.83,ironHeavy:.75,ironHuge:.74};Object.keys(ht);var _t=1.9,vt=.014,yt=220,bt=[[[.031,.4],[.067,.3],[.113,.2],[.171,.12]],[[.037,.4],[.059,.3],[.127,.2],[.157,.12]]],xt=900;function St(e,t){let n=Math.floor(e.sampleRate*_t),r=e.createBuffer(2,n,e.sampleRate),i=Math.floor(e.sampleRate*vt);for(let a=0;a<2;a++){let o=r.getChannelData(a),s=0;for(let r=i;r<n;r++){let n=(r-i)/e.sampleRate,a=.08+.5*Math.exp(-n*3);s+=(t()*2-1-s)*a,o[r]=s*Math.exp(-n/.42)*.9}}return r}function Ct(e){let t=Math.floor(e.sampleRate*.2),n=e.createBuffer(2,t,e.sampleRate);for(let r=0;r<2;r++){let i=n.getChannelData(r);for(let[n,a]of bt[r]??[]){let r=Math.floor(e.sampleRate*n);for(let[e,n]of[.5,.3,.2].entries())r+e<t&&(i[r+e]=(i[r+e]??0)+a*n)}}return n}function wt(e,t){let n=e.createBuffer(1,e.sampleRate,e.sampleRate),r=n.getChannelData(0);for(let e=0;e<150;e++){let e=Math.floor(t()*(r.length-200)),n=.25+.75*t()**2,i=20+Math.floor(t()*120);for(let a=0;a<i;a++)r[e+a]=(r[e+a]??0)+(t()*2-1)*n*Math.exp(-a/(i/4))}return n}function Tt(e){let t=1024,n=new Float32Array(new ArrayBuffer(t*4)),r=1+e*2;for(let e=0;e<t;e++){let t=e/1023*2-1;n[e]=Math.tanh(r*t)/Math.tanh(r)}return n}function Et(e,t,n=Math.random){let r=e.createBuffer(1,e.sampleRate,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<i.length;e++)i[e]=n()*2-1;let a=wt(e,n),o=e.createBiquadFilter();o.type=`highpass`,o.frequency.value=yt;let s=e.createConvolver();s.buffer=St(e,n),o.connect(s).connect(t);let c=e.createBiquadFilter();c.type=`highpass`,c.frequency.value=xt;let l=e.createConvolver();l.normalize=!1,l.buffer=Ct(e),o.connect(c).connect(l).connect(t);let u=new Map,d=new Map;function f(t,i,o,s){let c=0,l=e=>{c=Math.max(c,e)},u=e=>e*(.97+n()*.06),d=(e,t,n,r,i=!1)=>{i?(e.exponentialRampToValueAtTime(t*et,n+r),e.linearRampToValueAtTime(0,n+r+tt)):e.exponentialRampToValueAtTime(1e-4,n+r)},f=(t,r,i)=>{let a=e.createBufferSource();return a.buffer=t,a.loop=!0,a.start(r,n()*.5),a.stop(r+i+.1),a},p={timing:s,vary:u,tone(n,r,a,s,c={}){let u=i+(c.at??0),f=e.createOscillator(),p=e.createGain();f.type=n,f.frequency.setValueAtTime(r*o,u),c.to&&f.frequency.exponentialRampToValueAtTime(c.to*o,u+a);let m=Math.min(c.attack??.004,a*.9);if(p.gain.setValueAtTime(1e-4,u),p.gain.exponentialRampToValueAtTime(s,u+m),d(p.gain,s,u,a,c.slow),c.cut){let n=e.createBiquadFilter();n.type=`lowpass`,n.frequency.value=c.cut*o,f.connect(n).connect(p).connect(t)}else f.connect(p).connect(t);f.start(u),f.stop(u+a+.02),l((c.at??0)+a+(c.slow?tt:0))},noise(n,a,s,c,u={}){let p=i+(u.at??0),m=e.createBiquadFilter();m.type=n,m.Q.value=u.q??1,m.frequency.setValueAtTime(a*o,p),u.to&&m.frequency.exponentialRampToValueAtTime(u.to*o,p+s);let h=e.createGain();u.swell?(h.gain.setValueAtTime(1e-4,p),h.gain.exponentialRampToValueAtTime(c,p+s),h.gain.exponentialRampToValueAtTime(1e-4,p+s+.05)):u.attack?(h.gain.setValueAtTime(1e-4,p),h.gain.exponentialRampToValueAtTime(c,p+Math.min(u.attack,s*.5)),d(h.gain,c,p,s,u.slow)):(h.gain.setValueAtTime(c,p),d(h.gain,c,p,s,u.slow)),f(r,p,s).connect(m).connect(h).connect(t),l((u.at??0)+s+(u.swell?.05:u.slow?tt:0))},scrape(n,a,s,c,u={}){let d=i+(u.at??0),p=e.createBiquadFilter();p.type=`bandpass`,p.Q.value=u.q??2.5,p.frequency.setValueAtTime(n*o,d),p.frequency.exponentialRampToValueAtTime(a*o,d+s);let m=e.createGain();m.gain.setValueAtTime(1e-4,d),m.gain.exponentialRampToValueAtTime(c,d+s*.18),m.gain.setValueAtTime(c,d+s*.72),m.gain.exponentialRampToValueAtTime(1e-4,d+s);let h=e.createGain();h.gain.value=.7;let g=e.createOscillator();g.type=`sawtooth`,g.frequency.value=u.rough??70;let _=e.createGain();_.gain.value=.3,g.connect(_).connect(h.gain),f(r,d,s).connect(p).connect(m).connect(h).connect(t),g.start(d),g.stop(d+s+.05),l((u.at??0)+s)},ring(e,t={}){let r=u(t.pitch??1),i=t.at??0;for(let[a,o,s]of e){let e=u(a)*r,c=o*(t.gain??1);p.tone(`triangle`,e,s,c,{at:i,attack:.003,slow:!0}),s>=.5&&p.tone(`sine`,e*(1.004+n()*.008),s,c*.6,{at:i,attack:.003,slow:!0})}},clang(n,r,a,s=0){let c=i+s,f=e.createGain();f.gain.setValueAtTime(a,c),d(f.gain,a,c,r,!0);let p=e.createBiquadFilter();p.type=`bandpass`,p.frequency.value=n*2.6*o,p.Q.value=.6;let m=u(1);for(let t of Ze){let i=e.createOscillator();i.type=`square`,i.frequency.value=n*t*m*o;let a=e.createGain();a.gain.value=1/Ze.length,i.connect(a).connect(f),i.start(c),i.stop(c+r+.03)}f.connect(p).connect(t),l(s+r+tt)},clank(n,r,a,s={}){let c=s.at??0,f=i+c,p=u(n)*o,m=e.createOscillator();m.frequency.value=p;let h=e.createOscillator();h.frequency.value=p*(s.ratio??Math.SQRT2);let g=e.createGain(),_=p*(s.index??4);g.gain.setValueAtTime(_,f),g.gain.exponentialRampToValueAtTime(_*.25,f+r*.5),h.connect(g).connect(m.frequency);let v=e.createGain();v.gain.setValueAtTime(a,f),d(v.gain,a,f,r,!0);let y=e.createBiquadFilter();y.type=`highpass`,y.frequency.value=$e,m.connect(v).connect(y).connect(t);for(let e of[m,h])e.start(f),e.stop(f+r+.03);l(c+r+tt)},crack(e,t=0){p.noise(`highpass`,700,.014,e,{at:t}),p.noise(`bandpass`,2600,.035,e*.5,{q:.7,at:t})},thud(e,t,r,i=0){for(let[a,o]of Qe.entries())p.tone(`sine`,u(e*o),t*(.55+n()*.45),r*.9/(1+a*.3),{at:i,attack:.002});p.noise(`lowpass`,e*6,t*.5,r*1.4,{to:e*1.5,q:.5,at:i})},grit(n,r,s,c={}){let u=c.at??0,p=i+u,m=e.createBiquadFilter();m.type=`bandpass`,m.Q.value=c.q??2,m.frequency.setValueAtTime(n*o,p),c.to&&m.frequency.exponentialRampToValueAtTime(c.to*o,p+r);let h=e.createGain();h.gain.setValueAtTime(s,p),d(h.gain,s,p,r,!0),f(a,p,r).connect(m).connect(h).connect(t),l(u+r+tt)},sear(n,r,a,s={}){let c=s.at??0,u=i+c,d=e.createBiquadFilter();d.type=`lowpass`,d.frequency.value=(s.cut??n*6)*o;for(let t of[1,1.007]){let i=e.createOscillator();i.type=`sawtooth`,i.frequency.setValueAtTime(n*t*o,u),s.to&&i.frequency.exponentialRampToValueAtTime(s.to*t*o,u+r),i.connect(d),i.start(u),i.stop(u+r+.03)}let f=e.createGain();f.gain.value=.6;let p=e.createOscillator();p.type=`square`,p.frequency.setValueAtTime(s.buzz??60,u),s.buzzTo&&p.frequency.exponentialRampToValueAtTime(s.buzzTo,u+r);let m=e.createGain();m.gain.value=.4,p.connect(m).connect(f.gain),p.start(u),p.stop(u+r+.03);let h=e.createGain();h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(a,u+Math.min(s.attack??.01,r*.7)),h.gain.setValueAtTime(a,u+r*.8),h.gain.exponentialRampToValueAtTime(1e-4,u+r),d.connect(f).connect(h).connect(t),l(c+r)},zip(e,t,n,r,i=0){p.noise(`highpass`,e,n,r,{to:t,at:i})}};return{kit:p,length:()=>c}}return{play(n,r={}){let i=ht[n],a=e.currentTime,s=(d.get(n)??[]).filter(e=>e>a);if(s.length>=i.max)return d.set(n,s),0;let c=e.createGain();c.gain.value=(r.gain??1)*(gt[n]??1);let l=e.createStereoPanner();l.pan.value=Math.max(-1,Math.min(1,r.pan??0));let p=e.createGain();p.gain.value=i.wet,c.connect(l).connect(t),l.connect(p).connect(o);let m=c;if(i.drive>0){let t=e.createWaveShaper(),n=u.get(i.drive);n||(n=Tt(i.drive),u.set(i.drive,n)),t.curve=n,t.oversample=`2x`,t.connect(c),m=t}let h=2**((r.pitch??0)/12),g=Math.max(0,r.delay??0),{kit:_,length:v}=f(m,a+g,h,r.timing??Ue);return i.make(_),s.push(a+g+v()),d.set(n,s),g+v()}}}function Dt(e){let t,n,r=new Set,i=!1,a={};return e.whenReady(e=>{t=Et(e.context,e.effects)}),{play(i,o,s=!1){let{sound:c,pitch:l,gain:u,delay:d}=typeof i==`string`?{sound:i}:i;if(!t||e.buses?.context.state===`closed`)return;let f=s&&n?n:t;(f!==n||r.has(c))&&f.play(c,{timing:o,pitch:l,gain:u,delay:d,pan:P(c)})>0&&f===t&&(a[c]=(a[c]??0)+1)},played:a,keep(t,a){i=!0,r=new Set(a),e.whenReady(e=>{n=t(e.context,e.effects)})},get kept(){return i}}}var Ot=[{id:`juggernaut`,title:`Juggernaut`,author:`Scott Buckley`,licence:`CC-BY 4.0`,source:`https://www.scottbuckley.com.au/library/juggernaut/`,file:`music/juggernaut.ogg`,gain:1},{id:`a-dragons-lullaby`,title:`A Dragon's Lullaby`,author:`Scott Buckley`,licence:`CC-BY 4.0`,source:`https://www.scottbuckley.com.au/library/a-dragons-lullaby-2023/`,file:`music/a-dragons-lullaby.ogg`,gain:1}];function kt(e,t=Ot){return e===void 0?void 0:t.find(t=>t.id===e)}var At=e=>`"${e.title}" by ${e.author} (${e.licence})`,jt={armsPercent:100,piercesArmour:!1,extraCuts:0,staggers:0,heal:0};({...jt}),{...jt},{...jt},{...jt},{...jt},{...jt};var Mt={id:`seraine`,finisher:`Iai`,wardLateTicks:0,wardLatePercent:0,blessingPercent:0,hourDamagePerLink:0,hourStrikeBeforeEnd:0,answerDamage:0};function Nt(e,t){return{...e,tuning:{...e.tuning,...t.tuning},moves:{...e.moves,...t.moves},combos:t.combos??e.combos,hero:t.hero}}var Pt={hero:Mt},Ft={minEnrage:0,minTurn:1,coreBelowHalf:!1},V=(e,t,n,r)=>({kind:`hit`,limb:e,motion:t,colour:n,delays:[],active:1,...r}),It=(e,t,n,r,i)=>({kind:`feint`,limb:e,motion:t,colour:`amber`,gap:n,delays:[],raise:r,hold:i,active:1,damage:0}),Lt=(e,t,n,r=[])=>V(e,`shockwave`,`red`,{gap:t,raise:0,hold:0,active:10,damage:n,delays:r}),Rt=(e,t,n,r=[])=>V(`body`,`beam`,`amber`,{gap:e,raise:36,hold:12,active:t,damage:n,delays:r}),zt=[{name:`Lance Thrusts`,...Ft,beats:[V(`piston`,`jab`,`amber`,{gap:54,raise:20,hold:10,damage:10}),V(`piston`,`jab`,`amber`,{gap:30,raise:8,hold:6,damage:10}),V(`piston`,`jab`,`amber`,{gap:30,raise:8,hold:6,damage:10})]},{name:`Delayed Hammer`,...Ft,beats:[V(`hammer`,`slam`,`amber`,{gap:56,delays:[0,18,36],raise:22,hold:8,damage:18}),Lt(`hammer`,34,14),V(`piston`,`jab`,`amber`,{gap:42,raise:16,hold:8,damage:12})]},{name:`Feint Combo`,...Ft,beats:[It(`piston`,`jab`,50,18,14),V(`hammer`,`slam`,`amber`,{gap:34,raise:14,hold:4,damage:12}),V(`piston`,`jab`,`amber`,{gap:28,raise:10,hold:2,damage:10}),V(`hammer`,`slam`,`amber`,{gap:36,delays:[0,20,40],raise:16,hold:6,damage:14})]},{name:`Sweep and Crush`,...Ft,beats:[V(`piston`,`sweep`,`red`,{gap:54,raise:22,hold:10,active:8,damage:14}),V(`hammer`,`slam`,`amber`,{gap:42,delays:[0,14],raise:20,hold:6,damage:20})]},{name:`Hammer Fury`,...Ft,minEnrage:1,beats:[V(`hammer`,`slam`,`amber`,{gap:50,delays:[0,24],raise:20,hold:8,damage:18}),Lt(`hammer`,34,14),V(`hammer`,`slam`,`amber`,{gap:44,delays:[0,30],raise:16,hold:4,damage:18}),V(`hammer`,`slam`,`amber`,{gap:40,delays:[0,12,36],raise:14,hold:10,damage:22})]},{name:`Lance Barrage`,...Ft,minEnrage:1,beats:[V(`piston`,`jab`,`amber`,{gap:46,raise:16,hold:6,damage:10}),V(`piston`,`jab`,`amber`,{gap:24,raise:6,hold:4,damage:10}),V(`piston`,`jab`,`amber`,{gap:24,raise:6,hold:4,damage:10}),It(`piston`,`jab`,36,10,10),V(`piston`,`jab`,`amber`,{gap:30,delays:[0,22],raise:8,hold:4,damage:14})]},{name:`Pendulum`,...Ft,minTurn:2,beats:[V(`piston`,`sweep`,`red`,{gap:54,raise:20,hold:8,active:8,damage:14}),V(`piston`,`jab`,`amber`,{gap:44,raise:8,hold:4,damage:10}),V(`piston`,`sweep`,`red`,{gap:34,delays:[0,16],raise:14,hold:6,active:8,damage:14}),V(`piston`,`jab`,`amber`,{gap:44,delays:[0,14],raise:8,hold:4,damage:12})]},{name:`Double Feint`,...Ft,minTurn:3,beats:[It(`piston`,`jab`,50,18,14),It(`hammer`,`slam`,36,14,10),V(`hammer`,`slam`,`amber`,{gap:60,delays:[0,20,40],raise:18,hold:22,damage:24})]},{name:`Anvil Drop`,...Ft,minEnrage:1,beats:[V(`hammer`,`slam`,`amber`,{gap:56,delays:[0,20],raise:24,hold:14,damage:22}),Lt(`hammer`,34,14),Lt(`hammer`,44,14,[0,14]),V(`hammer`,`slam`,`amber`,{gap:44,raise:16,hold:6,damage:18})]},{name:`Lance Lunge`,...Ft,minEnrage:1,beats:[V(`piston`,`sweep`,`red`,{gap:52,raise:20,hold:8,active:8,damage:14}),V(`piston`,`sweep`,`red`,{gap:40,delays:[0,12],raise:12,hold:6,active:8,damage:14}),It(`piston`,`jab`,40,10,10),V(`piston`,`jab`,`amber`,{gap:30,delays:[0,18],raise:8,hold:4,damage:16})]},{name:`Furnace Overload`,...Ft,minEnrage:2,beats:[Lt(`body`,60,14),V(`body`,`bodySlam`,`amber`,{gap:46,delays:[0,20],raise:20,hold:8,damage:22})]},{name:`Overdrive`,...Ft,minEnrage:2,beats:[V(`body`,`bodySlam`,`amber`,{gap:56,delays:[0,16],raise:22,hold:8,damage:20}),V(`body`,`bodySlam`,`amber`,{gap:50,delays:[0,24],raise:16,hold:10,damage:20}),V(`body`,`bodySlam`,`amber`,{gap:46,delays:[0,12,30],raise:14,hold:12,damage:24})]},{name:`Steam Burst`,...Ft,minEnrage:2,coreBelowHalf:!0,beats:[V(`body`,`bodySlam`,`amber`,{gap:56,raise:20,hold:8,damage:20}),Lt(`body`,30,16,[0,12,24]),V(`body`,`bodySlam`,`amber`,{gap:50,delays:[0,20],raise:18,hold:10,damage:24})]},{name:`Last Stand`,...Ft,minEnrage:2,coreBelowHalf:!0,beats:[Lt(`body`,56,14),V(`body`,`bodySlam`,`amber`,{gap:50,raise:18,hold:6,damage:20}),Lt(`body`,30,14,[0,16]),It(`body`,`bodySlam`,44,16,12),V(`body`,`bodySlam`,`amber`,{gap:40,delays:[0,14,28],raise:14,hold:8,damage:26})]},{name:`Shield Breaker`,...Ft,beats:[V(`hammer`,`swing`,`red`,{gap:56,raise:22,hold:10,active:8,damage:16}),V(`piston`,`jab`,`amber`,{gap:44,delays:[0,12],raise:14,hold:6,damage:12})]},{name:`Measured Advance`,...Ft,minTurn:2,beats:[V(`piston`,`jab`,`amber`,{gap:54,raise:20,hold:10,damage:10}),V(`piston`,`jab`,`amber`,{gap:52,delays:[0,16],raise:12,hold:14,damage:10}),It(`hammer`,`slam`,40,14,10),V(`hammer`,`slam`,`amber`,{gap:44,delays:[0,18],raise:16,hold:8,damage:18})]},{name:`Hammer Wheel`,...Ft,minEnrage:1,beats:[V(`hammer`,`swing`,`red`,{gap:54,raise:22,hold:8,active:8,damage:16}),V(`hammer`,`swing`,`red`,{gap:48,delays:[0,14],raise:16,hold:6,active:8,damage:16}),V(`hammer`,`slam`,`amber`,{gap:50,delays:[0,20],raise:18,hold:8,damage:22})]},{name:`Impale`,...Ft,minEnrage:1,beats:[V(`piston`,`plunge`,`amber`,{gap:58,delays:[0,18,34],raise:24,hold:10,damage:20}),Lt(`piston`,34,14),V(`piston`,`jab`,`amber`,{gap:44,raise:16,hold:6,damage:12})]},{name:`Quake`,...Ft,minEnrage:2,beats:[Lt(`body`,58,14),Lt(`body`,44,14,[0,14]),Lt(`body`,40,14,[0,10,22]),V(`body`,`bodySlam`,`amber`,{gap:50,delays:[0,18],raise:20,hold:8,damage:22})]},{name:`Death Throes`,...Ft,minEnrage:2,coreBelowHalf:!0,beats:[It(`body`,`bodySlam`,50,18,12),Lt(`body`,40,16),V(`body`,`bodySlam`,`amber`,{gap:48,raise:18,hold:6,damage:22}),V(`body`,`bodySlam`,`amber`,{gap:38,delays:[0,12],raise:10,hold:4,damage:24})]},{name:`Searing Gaze`,...Ft,minTurn:2,beats:[Rt(72,40,18),V(`piston`,`jab`,`amber`,{gap:70,delays:[0,14],raise:14,hold:6,damage:12})]},{name:`Gaze and Reap`,...Ft,minTurn:3,beats:[V(`hammer`,`slam`,`amber`,{gap:56,raise:20,hold:8,damage:16}),Rt(52,34,18,[0,16]),V(`piston`,`sweep`,`red`,{gap:60,raise:16,hold:6,active:8,damage:14}),V(`hammer`,`slam`,`amber`,{gap:44,delays:[0,14],raise:16,hold:6,damage:18})]},{name:`Burning Wheel`,...Ft,minEnrage:1,beats:[V(`hammer`,`swing`,`red`,{gap:54,raise:22,hold:8,active:8,damage:16}),Rt(50,46,20,[0,12]),V(`hammer`,`slam`,`amber`,{gap:76,delays:[0,18],raise:18,hold:8,damage:22})]},{name:`Pin and Burn`,...Ft,minEnrage:1,beats:[V(`piston`,`jab`,`amber`,{gap:50,raise:16,hold:6,damage:10}),Rt(48,56,20),V(`piston`,`plunge`,`amber`,{gap:84,delays:[0,16],raise:20,hold:6,damage:20})]},{name:`Furnace Gaze`,...Ft,minEnrage:2,beats:[Lt(`body`,58,14),Rt(52,44,20,[0,14]),V(`body`,`bodySlam`,`amber`,{gap:88,delays:[0,16],raise:20,hold:8,damage:24})]},{name:`Last Light`,...Ft,minEnrage:2,coreBelowHalf:!0,beats:[Rt(72,26,18),Rt(90,60,22,[0,12]),V(`body`,`bodySlam`,`amber`,{gap:100,delays:[0,14],raise:18,hold:6,damage:26})]},{name:`Three Heights`,...Ft,beats:[V(`piston`,`jab`,`amber`,{gap:54,raise:20,hold:10,damage:10}),V(`hammer`,`swing`,`red`,{gap:46,raise:20,hold:8,active:8,damage:16}),V(`piston`,`plunge`,`amber`,{gap:50,delays:[0,14],raise:20,hold:8,damage:18})]},{name:`Hammer and Anvil`,...Ft,beats:[V(`hammer`,`slam`,`amber`,{gap:54,raise:20,hold:8,damage:16}),V(`hammer`,`swing`,`red`,{gap:48,raise:18,hold:6,active:8,damage:16}),V(`piston`,`jab`,`amber`,{gap:44,raise:14,hold:6,damage:10}),V(`piston`,`jab`,`amber`,{gap:28,delays:[0,14],raise:8,hold:4,damage:12})]},{name:`Falling Sky`,...Ft,minTurn:2,beats:[V(`piston`,`plunge`,`amber`,{gap:58,delays:[0,16],raise:24,hold:10,damage:18}),V(`hammer`,`slam`,`amber`,{gap:40,raise:18,hold:6,damage:18}),Lt(`hammer`,34,14),V(`piston`,`jab`,`amber`,{gap:44,delays:[0,12],raise:14,hold:6,damage:12})]},{name:`Tempest`,...Ft,minTurn:3,beats:[V(`piston`,`sweep`,`red`,{gap:54,raise:20,hold:8,active:8,damage:14}),V(`hammer`,`swing`,`red`,{gap:44,raise:18,hold:6,active:8,damage:16}),V(`hammer`,`slam`,`amber`,{gap:46,raise:16,hold:6,damage:18}),Rt(56,36,18),V(`piston`,`plunge`,`amber`,{gap:78,delays:[0,14],raise:20,hold:8,damage:20})]},{name:`Earthshaker`,...Ft,minEnrage:1,beats:[V(`hammer`,`slam`,`amber`,{gap:54,delays:[0,16],raise:20,hold:8,damage:18}),Lt(`hammer`,34,14),V(`hammer`,`swing`,`red`,{gap:46,raise:18,hold:6,active:8,damage:16}),Rt(52,38,20),V(`hammer`,`slam`,`amber`,{gap:78,delays:[0,14],raise:18,hold:8,damage:22})]},{name:`Skewer`,...Ft,minEnrage:1,beats:[V(`piston`,`jab`,`amber`,{gap:48,raise:16,hold:6,damage:10}),V(`piston`,`sweep`,`red`,{gap:40,raise:14,hold:6,active:8,damage:14}),V(`piston`,`plunge`,`amber`,{gap:52,delays:[0,18],raise:20,hold:8,damage:20}),Lt(`piston`,34,14),It(`piston`,`jab`,40,10,10),V(`piston`,`jab`,`amber`,{gap:30,delays:[0,16],raise:8,hold:4,damage:14})]},{name:`Meltdown`,...Ft,minEnrage:2,beats:[V(`body`,`bodySlam`,`amber`,{gap:56,raise:20,hold:8,damage:20}),Rt(80,40,20),Lt(`body`,66,14),Lt(`body`,40,14,[0,12]),V(`body`,`bodySlam`,`amber`,{gap:52,delays:[0,18],raise:18,hold:8,damage:24})]},{name:`Cataclysm`,...Ft,minEnrage:2,coreBelowHalf:!0,beats:[Lt(`body`,56,14),Lt(`body`,40,14,[0,12]),Rt(60,50,22),It(`body`,`bodySlam`,92,16,12),V(`body`,`bodySlam`,`amber`,{gap:40,delays:[0,14],raise:14,hold:8,damage:24}),V(`body`,`bodySlam`,`amber`,{gap:40,raise:10,hold:4,damage:26})]}];function Bt(e,t){let n=[],r=0;return e.beats.forEach((e,i)=>{r+=e.gap+(t[i]??0),n.push(r)}),n}function Vt(e,t,n,r){return t-r.tuning.strikeTicks-e.hold-n-e.raise}function Ht(e,t,n){let r=Bt(e,t),i=e.beats.length-1,a=e.beats[i];return(r[i]??0)+(a?.active??1)+n.tuning.sequenceTail}function Ut(e,t){return e.phase===`attack`?t.attacks[e.attack]:void 0}var Wt=e=>e===`pending`||e===`evading`||e===`evadingPerfect`||e===`holding`||e===`holdingPerfect`;function Gt(e,t){let n=Ut(e,t);if(!n)return;let r=Bt(n,e.delays);for(let t=0;t<n.beats.length;t++){let i=n.beats[t],a=e.results[t];if(i?.kind!==`hit`||!Wt(a))continue;let o=r[t]??0;return{index:t,beat:i,impact:o,ticksUntil:o-e.tick}}}function Kt(e,t){let n=Ut(e,t),{glintLead:r,glintTicks:i}=t.tuning;if(!n)return;let a=Bt(n,e.delays);for(let t=0;t<n.beats.length;t++){let o=n.beats[t];if(o?.kind!==`hit`)continue;let s=e.tick-((a[t]??0)-r);if(s>=0&&s<i)return{beat:o,age:s}}}function qt(e,t){let n=Ut(e,t);if(!n)return;let r=Bt(n,e.delays);for(let t=0;t<n.beats.length;t++){let i=n.beats[t];if(i?.motion!==`beam`)continue;let a=e.tick-(r[t]??0);if(a<0||a>=i.active)continue;let o=e.results[t],s=o===`holding`||o===`holdingPerfect`,c=o===`parried`||o===`perfectParry`;return{age:a,length:i.active,held:s||c}}}function Jt(e,t){let n=t.attacks[e.attack];if(!n)return`body`;let r=n.beats.findIndex((t,n)=>t.kind===`hit`&&Wt(e.results[n]));return(r>=0?n.beats[r]:n.beats[n.beats.length-1])?.limb??`body`}function Yt(e,t,n){let r=Bt(e,t);return e.beats.flatMap((e,i)=>{if(e.motion!==`shockwave`)return[];let a=r[i]??0,o=e.gap+(t[i]??0);return[{beat:e,impact:a,start:a-Math.min(o,n.tuning.waveTravelTicks)}]})}function Xt(e,t){let n=Ut(e,t);if(n){for(let{beat:r,impact:i,start:a}of Yt(n,e.delays,t))if(!(e.tick<a||e.tick>=i+r.active))return{travel:Math.trunc((e.tick-a)*1e3/(i-a))}}}function Zt(e,t,n){let r=Ut(e,t);if(!r)return;let i;for(let{start:a}of Yt(r,e.delays,t)){let t=e.tick-a;Math.abs(t)>n||(i===void 0||Math.abs(t)<Math.abs(i))&&(i=t)}return i}function Qt(e,t){let n=0;for(let r=0;r<e.length;r++){let[i,a]=e[r]??[0,0];if(t<i)break;n=a;let o=e[r+1];if(o&&t<o[0]){let[e,n]=o;return a+Math.trunc((n-a)*(t-i)/(e-i))}}return n}function $t(e,t){let n=Qt(e,t);for(;e.length>0&&(e[e.length-1]?.[0]??0)>=t;)e.pop();e.push([t,n])}function en(e,t,n,r){let{strikeTicks:i,recoverTicks:a}=r.tuning,o=[[0,0]],s=[[0,0]],c=[],l=Bt(e,t);return e.beats.forEach((e,u)=>{if(e.limb!==n||e.motion===`shockwave`)return;let d=l[u]??0,f=Vt(e,d,t[u]??0,r),p=f+e.raise,m=d-i;if($t(o,f),$t(s,f),o.push([p,1e3],[m,1e3]),s.push([p,1e3],[m,1e3]),e.kind===`feint`)o.push([m+14,0]),s.push([m+14,0]);else{let t=d+e.active-1,n=t+a;o.push([t,1e3],[n,0]),s.push([d,-1e3],[t,-1e3],[n,0])}c.push([f,e.motion])}),{raise:o,swing:s,motions:c}}function tn(e,t,n){let r=Ut(e,n),i={raise:0,swing:0,motion:t===`piston`?`jab`:`slam`};if(!r)return i;let a=en(r,e.delays,t,n),o=i.motion;for(let[t,n]of a.motions)e.tick>=t&&(o=n);return{raise:Qt(a.raise,e.tick),swing:Qt(a.swing,e.tick),motion:o}}var nn={armsPercent:100,piercesArmour:!1,extraCuts:0,staggers:0,heal:0},rn=[{name:`Triple Draw`,stances:[`level`,`level`,`level`],...nn,damagePercent:250,sunderGain:6,boon:`HEAVY`},{name:`Crosscut`,stances:[`high`,`low`,`high`],...nn,damagePercent:125,armsPercent:180,sunderGain:6,boon:`SHEARS ARMS`},{name:`Rising Moon`,stances:[`low`,`low`,`high`],...nn,damagePercent:160,piercesArmour:!0,sunderGain:6,boon:`PIERCES ARMOUR`},{name:`Twin Fang`,stances:[`low`,`high`],...nn,damagePercent:130,sunderGain:4,extraCuts:1,boon:`+1 CUT`},{name:`Falling Leaf`,stances:[`high`,`high`,`low`],...nn,damagePercent:240,armsPercent:50,sunderGain:6,staggers:1,boon:`STAGGERS`},{name:`Swallow Turn`,stances:[`level`,`high`,`level`],...nn,damagePercent:120,sunderGain:10,heal:8,boon:`MENDS`}];function an(e,t){let n;for(let r of e){let e=r.stances.length;e>t.length||e<=(n?.stances.length??0)||t.slice(t.length-e).every((e,t)=>e===r.stances[t])&&(n=r)}return n}var on={tuning:{heroHp:100,pistonHp:330,hammerHp:400,coreHp:720,coreArmourPercent:50,glintLead:20,glintTicks:10,strikeTicks:12,recoverTicks:16,sequenceTail:30,waveTravelTicks:34,bossTurnLullTicks:50,lullTicks:60,practiceLullTicks:40,bossSequences:2,enrageHoldCut:5,dashTicks:16,linkBeat:26,linkPerfect:4,linkGood:10,maxChain:6,levelDamage:14,highDamage:16,lowDamage:12,linkPerfectPercent:150,iaiAfterPerfects:3,iaiHoldTicks:14,iaiDrawTicks:30,iaiPerfect:4,iaiDamage:90,iaiMissDamage:8,freezeIai:24,counterWindowTicks:40,counterTicks:34,counterStrikeTick:12,counterDamage:30,rollCounterDamage:45,freezeCounter:8,strikeRecoverTicks:46,sunderMax:100,sunderPerfectParry:16,sunderParry:6,sunderPerfectCut:4,sunderPerfectIai:10,sunderHurt:12,sunderGuardTicks:18,sunderCutTicks:[56,92,128,176],sunderPerfect:4,sunderGood:9,sunderPerfectDamage:48,sunderGoodDamage:32,sunderMissDamage:12,sunderFinalPercent:180,sunderRecoverTicks:64,freezeSunderCut:8,freezeSunderPerfect:14,freezeSunderFinal:30,sunderBreakCutTicks:[18,34],sunderBreakDamage:50,sunderBreakTicks:72,freezeSunderBreak:14,freezeBeamCatch:5,freezeParry:7,freezePerfectParry:16,freezeHurt:7,freezeFlashCounter:28,freezeRiposteHit:9,freezeDown:24,freezeCut:6,freezePerfectCut:10,freezeBreak:30,freezeVictory:96,deflectTicks:8,hurtTicks:18,slowmoMaxTicks:240,slowmoTailTicks:14,riposteTicks:48,riposteStrikeTick:18,riposteSlashTicks:[11,14],riposteDamage:40,riposteDamagePerPerfect:12},moves:{parry:{duration:24,windowStart:0,windowEnd:10,perfectEnd:4},dodge:{duration:26,windowStart:2,windowEnd:14,perfectEnd:6},roll:{duration:28,windowStart:2,windowEnd:10,perfectEnd:5},jump:{duration:36,windowStart:4,windowEnd:32,perfectEnd:0}},attacks:zt,combos:rn,hero:Mt},sn=1e3;function cn(e){let t=[],{tuning:n,moves:r,attacks:i}=e,a=(e,n)=>{e||t.push(n)},o=(e,t)=>{if(typeof e==`number`)a(Number.isInteger(e)&&e>=0,`${t} must be a whole number ≥ 0`);else if(Array.isArray(e))for(let n of e)o(n,t);else if(typeof e==`object`&&e)for(let[t,n]of Object.entries(e))o(n,t)};o(n,`tuning`);for(let e of Object.values(r))o(e,`move`);for(let e of i)o(e.minEnrage,`${e.name}: min enrage`),o(e.minTurn,`${e.name}: min turn`),a(e.minEnrage<=2,`${e.name}: the boss has only two arms to lose`),e.beats.forEach((t,n)=>{for(let[r,i]of Object.entries(t))o(i,`${e.name}, beat ${n+1}: ${r}`)});a(n.heroHp>0,`the hero's HP must be above 0`),a(n.bossSequences>0,`the boss needs at least one sequence per turn`),a(n.pistonHp>0&&n.hammerHp>0&&n.coreHp>0,`every part's HP must be above 0`),a(n.coreArmourPercent<=100,`the core's armour can't add damage`),a(n.glintTicks>0&&n.glintTicks<=n.glintLead,`the glint must fit before impact`),a(n.strikeTicks>0,`strikes need at least 1 frame`),a(n.freezeVictory>=n.freezeBreak&&n.freezeVictory>=n.freezeSunderFinal,`the winning blow must be held at least as long as any other hit-pause`),a(n.riposteStrikeTick<n.riposteTicks,`the riposte must land before it ends`),a(n.riposteSlashTicks.every(e=>e<n.riposteStrikeTick),`riposte cuts must come before the decisive strike`),a(n.slowmoTailTicks<=n.slowmoMaxTicks,`the slow-motion tail can't outlast its maximum`),a(n.counterWindowTicks>0,`the counter needs a window to press it in`),a(n.dashTicks>0,`the opener needs time to arrive`),a(n.linkPerfect<=n.linkGood,`the perfect window must sit inside the good one`),a(2*n.linkGood<n.linkBeat,`a link's window must fit between two beats`),a(n.maxChain>0,`the chain needs at least one cut`),a(n.iaiHoldTicks>0,`the Iai needs a hold to start it`),a(n.iaiHoldTicks<n.linkBeat-n.linkGood,`holding for the Iai must start the draw before the next link's window opens`),a(n.iaiPerfect<n.iaiDrawTicks,`the Iai's flash must come after its draw begins`),a(n.iaiAfterPerfects>0,`the Iai needs at least one perfect link first`),a(n.sunderMax>0,`the Sunder meter needs a size`),a(n.sunderCutTicks.length>0,`the Sunder strike needs at least one cut`),a(n.sunderPerfect<=n.sunderGood,`the Sunder strike's perfect window must sit inside the good one`),a(n.sunderGood<n.glintLead,`the Sunder strike's window must open after its flash shows`),n.sunderCutTicks.forEach((e,t)=>{let r=e-n.glintLead;if(t===0){a(r>0,`the Sunder strike's first flash must come after the strike starts`);return}let i=(n.sunderCutTicks[t-1]??0)+n.sunderGood+1;a(r>i,`the Sunder strike's cut ${t+1} must flash after cut ${t} can no longer be pressed`)}),a(n.sunderBreakCutTicks.length>0,`the Sunder break needs at least one cut`),n.sunderBreakCutTicks.forEach((e,t)=>{let r=t===0?0:n.sunderBreakCutTicks[t-1]??0;a(e>r,`the Sunder break's cut ${t+1} must come after the one before`),a(e<n.sunderBreakTicks,`the Sunder break's cut ${t+1} must land before it ends`)});let s=e.hero;o({...s,id:0,finisher:0},`hero`),a(s.wardLatePercent<=100,`the ward can't block more than the whole blow`),a(s.blessingPercent<=100,`a blessing can't block more than the whole blow`),a(s.hourDamagePerLink===0||s.hourStrikeBeforeEnd>0&&s.hourStrikeBeforeEnd<n.strikeRecoverTicks,`the hour must strike after the chain ends and before the turn passes`),a(s.finisher!==``,`the finisher needs a name`),a(e.combos.every(e=>e.name!==s.finisher),`a string can't share the finisher's name`);for(let t of e.combos)o(t.sunderGain,`${t.name}: Sunder gain`),o(t.extraCuts,`${t.name}: extra cuts`),o(t.staggers,`${t.name}: staggers`),o(t.heal,`${t.name}: heal`),o(t.damagePercent,`${t.name}: damage`),o(t.armsPercent,`${t.name}: arms bonus`),a(t.stances.length>=2&&t.stances.length<=n.maxChain,`${t.name}: a string needs 2 to ${n.maxChain} cuts`);for(let t of[1,0])for(let r of[1,0])for(let i of[n.coreHp,1])for(let n of[1,sn]){let o={parts:{piston:t,hammer:r,core:i},turn:n},s=[t?``:`the lance arm broken`,r?``:`the hammer arm broken`,i===1?`the core below half`:``,n===1?`on its first turn`:`late in the fight`].filter(Boolean);a(f(e,o).length>=2,`the boss needs at least two attacks with ${s.join(`, `)}`)}for(let[e,t]of Object.entries(r))a(t.windowStart<t.windowEnd,`${e}: the window must end after it starts`),a(t.windowEnd<=t.duration,`${e}: the window must end within the move`),a(t.perfectEnd===0||t.perfectEnd>t.windowStart&&t.perfectEnd<=t.windowEnd,`${e}: the perfect zone must sit inside the window`);return i.forEach((t,r)=>{let i=t.name||`attack ${r+1}`,o=t.beats[t.beats.length-1];a(o?.kind===`hit`&&o.colour===`amber`,`${i}: must end on an amber hit`);for(let e of t.beats)a(e.active>=1,`${i}: hits stay dangerous for at least 1 frame`),e.kind===`hit`&&a(e.damage>0,`${i}: hits must do damage`),e.motion===`shockwave`?a(e.colour===`red`,`${i}: shockwaves are red`):a(e.raise>0,`${i}: wind-ups need at least 1 frame`),e.motion===`beam`&&(a(e.kind===`hit`&&e.colour===`amber`,`${i}: beams are amber hits`),a(e.active>=2,`${i}: a beam must burn for at least 2 frames`));let s=2*n.enrageHoldCut,c=t.beats.map(e=>Math.max(0,...e.delays)),l=t.beats.map(()=>0),u=t.beats.map(e=>-Math.min(s,e.hold));for(let r of[l,c,u]){let o=Bt(t,r);t.beats.forEach((s,c)=>{let l=o[c]??0,u=Vt(s,l,r[c]??0,e);s.motion!==`shockwave`&&a(u>0,`${i}: beat ${c+1} winds up too early`),a(l-n.glintLead>0,`${i}: beat ${c+1} glints before the attack starts`);let d=o[c+1];if(d!==void 0&&a(d>=l+s.active,`${i}: beats ${c+1} and ${c+2} overlap`),s.motion===`shockwave`)return;let f=t.beats.slice(0,c).map((e,t)=>({b:e,at:o[t]??0})).reverse().find(e=>e.b.limb===s.limb&&e.b.motion!==`shockwave`);f&&a(u>=f.at+f.b.active-1,`${i}: beat ${c+1} winds up before the same limb's last blow lands`)})}}),[...new Set(t)]}function ln(e,t){if(t.tuning===void 0&&t.moves===void 0&&t.combos===void 0&&t.hero===e.hero)return e;let n=Nt(e,t);return cn(n).length>0?e:n}var H=(e,t)=>({x:e,y:t}),un=(e,t)=>({x:e.x+t.x,y:e.y+t.y}),dn=(e,t)=>({x:e.x-t.x,y:e.y-t.y}),fn=(e,t)=>({x:e.x*t,y:e.y*t}),pn=e=>Math.hypot(e.x,e.y),mn=(e,t,n)=>({x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n}),hn=Math.PI/180,gn=e=>({x:Math.cos(e*hn),y:Math.sin(e*hn)}),_n=e=>Math.atan2(e.y,e.x)/hn,vn=(e,t,n=H(0,0))=>{let r=Math.cos(t*hn),i=Math.sin(t*hn),a=dn(e,n);return{x:n.x+a.x*r-a.y*i,y:n.y+a.x*i+a.y*r}},yn={thigh:31,shin:31,waist:12,chest:15,neck:4,head:10,upperArm:20,foreArm:19,hipHeight:64},bn={hip:H(0,-yn.hipHeight-.4),lean:2,chest:0,head:0,footN:H(-5,-3),footF:H(6,-3),handN:H(3,30),handF:H(7,33),blade:0,bladeOut:0,bladeF:0,bladeFOut:0,sheathBack:0,spin:0,blink:0,wind:0};function xn(e,t,n,r,i){let a=dn(t,e),o=Math.min(Math.max(pn(a),Math.abs(n-r)+.01),n+r-.01),s=_n(a),c=(n*n+o*o-r*r)/(2*n*o);return{mid:un(e,fn(gn(s+Math.acos(Math.min(1,Math.max(-1,c)))/hn*i),n)),end:un(e,fn(gn(s),o))}}function Sn(e,t=yn){let n=-90+e.lean,r=e.hip,i=un(r,fn(gn(-90+e.lean*.5),t.waist)),a=n+e.chest,o=un(i,fn(gn(a),t.chest)),s=un(o,fn(gn(a),t.neck)),c=e.lean*.5+e.chest*.5+e.head,l=un(s,fn(gn(-90+c),t.head)),u=gn(a+90),d=t.shoulderSpread??1,f=un(o,un(fn(u,-7.2*d),fn(gn(a),-2))),p=un(o,un(fn(u,7.4*d),fn(gn(a),-3))),m=un(r,H(-3.5,0)),h=un(r,H(4,0)),g=xn(m,e.footN,t.thigh,t.shin,-1),_=xn(h,e.footF,t.thigh,t.shin,-1),v=xn(f,un(f,e.handN),t.upperArm,t.foreArm,1),y=xn(p,un(p,e.handF),t.upperArm,t.foreArm,1),b={hip:r,waist:i,chest:o,neck:s,head:l,spine:a,headAngle:c,hipN:m,hipF:h,kneeN:g.mid,kneeF:_.mid,footN:g.end,footF:_.end,shoulderN:f,shoulderF:p,elbowN:v.mid,elbowF:y.mid,handN:v.end,handF:y.end};if(e.spin===0)return b;let x=un(r,H(0,-6));return Object.fromEntries(Object.entries(b).map(([t,n])=>typeof n==`number`?[t,n+e.spin]:[t,vn(n,e.spin,x)]))}function Cn(e,t,n){if(n<=0)return e;if(n>=1)return t;let r=(e,t)=>e+(t-e)*n;return{hip:mn(e.hip,t.hip,n),lean:r(e.lean,t.lean),chest:r(e.chest,t.chest),head:r(e.head,t.head),footN:mn(e.footN,t.footN,n),footF:mn(e.footF,t.footF,n),handN:mn(e.handN,t.handN,n),handF:mn(e.handF,t.handF,n),blade:r(e.blade,t.blade),bladeOut:r(e.bladeOut,t.bladeOut),bladeF:r(e.bladeF,t.bladeF),bladeFOut:r(e.bladeFOut,t.bladeFOut),sheathBack:r(e.sheathBack,t.sheathBack),spin:r(e.spin,t.spin),blink:r(e.blink,t.blink),wind:r(e.wind,t.wind),...e.pocket===void 0&&t.pocket===void 0?{}:{pocket:r(e.pocket??0,t.pocket??0)}}}var U={upper:50,fore:48,lanceBase:24,lanceThrow:46,haft:104,headHalf:17},wn={lance:H(-46,-170),hammer:H(40,-173)},Tn=H(0,-98),En=5,Dn=.34,On=9;function kn(e){let{drop:t,lean:n}=e,r=Math.sign(n)*Math.max(0,Math.abs(n)-En),i=-Math.max(-9,Math.min(On,r*Dn)),a=H(Tn.x-n*.6,Tn.y+t),o=e=>un(a,vn(e,i)),s=(e,t)=>un(o(dn(e,Tn)),t??H(0,0));return{torso:a,neck:un(o(H(-9,-92)),H(-n*.12,0)),cape:un(o(H(12,-88)),H(n*.12,0)),shoulder:{lance:s(wn.lance,e.shrug?.lance),hammer:s(wn.hammer,e.shrug?.hammer)},turn:i,on:o}}var An=e=>(Math.round(e/5)%72+72)%72,jn=e=>e*5,Mn=e=>U.lanceBase+e*U.lanceThrow;function Nn(e,t,n){let r=un(t,fn(gn(n.a1),U.upper)),i=un(r,fn(gn(n.a2),U.fore));return{elbow:r,hand:i,tip:e===`lance`?un(i,fn(gn(n.a2),Mn(n.ext))):un(i,fn(gn(n.a3),U.haft))}}var Pn=e=>(e%360+360)%360,Fn=(e,t,n)=>e+(t-e)*n,In=(e,t,n)=>Math.max(t,Math.min(n,e)),Ln=(e,t,n)=>({a1:Fn(e.a1,t.a1,n),a2:Fn(e.a2,t.a2,n),a3:Fn(e.a3,t.a3,n),ext:Fn(e.ext,t.ext,n)}),Rn=(e,t)=>({...e,a1:e.a1+t,a2:e.a2+t,a3:e.a3+t}),zn={a1:104,a2:163,a3:163,ext:.2},Bn=.85;function Vn(e,t){let n=t;for(let t=0;t<45&&Nn(`lance`,e,n).tip.y>-3;t++){let e=n.a2+(gn(n.a2).x<0?2:-2);n={...n,a2:e,a3:e}}return n}function Hn(e,t){let{raise:n,swing:r,knock:i,shoulder:a,target:o}=t;if(e===`rest`)return zn;let s=(1-r)/2,c;if(e===`jab`){let e=_n(dn(o,a)),t=pn(dn(o,a))-U.upper-U.fore-U.lanceBase,n={a1:62,a2:e,a3:e,ext:0},r={a1:e,a2:e,a3:e,ext:In(t/U.lanceThrow,.5,1)},l=In(s-i*.45,0,1);c={...Ln(n,r,l),ext:Fn(n.ext,r.ext,l*l)}}else if(e===`plunge`){let e={a1:252,a2:148,a3:148,ext:0},{mid:t,end:n}=xn(a,o,U.upper,U.fore+Mn(1),1),r=Pn(_n(dn(n,t))),l={a1:Pn(_n(dn(t,a))),a2:r,a3:r,ext:1},u=In(s-i*.45,0,1);c={...Ln(e,l,u),ext:Fn(e.ext,l.ext,u*u)}}else{let e=In(s-i*.35,0,1),t=H(a.x+92,-5-i*22),n=H(o.x-26,-5-i*22),{mid:r,end:l}=xn(a,H(Fn(t.x,n.x,e),Fn(t.y,n.y,e)-Math.sin(e*Math.PI)*4),U.upper,U.fore+Mn(Bn),-1),u=_n(dn(l,r));c={a1:_n(dn(r,a)),a2:u,a3:u,ext:Bn}}return Vn(a,Ln(zn,c,n))}var Un=H(6,-U.headHalf),Wn=-90;function Gn(e,t){let n=t;for(let t=0;t<45&&Nn(`hammer`,e,n).tip.y>-U.headHalf+.5;t++)n={...n,a3:n.a3+(gn(n.a3).x<0?2:-2)};return n}var Kn=6;function qn(e,t){let{raise:n,swing:r,knock:i,shoulder:a,target:o}=t,s=xn(a,un(Un,fn(gn(Wn),U.haft)),U.upper,U.fore,-1),c={a1:Pn(_n(dn(s.mid,a))),a2:Pn(_n(dn(s.end,s.mid))),a3:Pn(_n(dn(Un,s.end))),ext:0};if(e===`rest`)return c;if(e===`swing`){let e=In((1-r)/2,0,1),t=-U.headHalf-Kn,i=H(Fn(a.x+62,o.x-8,e),t),s=xn(a,dn(i,fn(gn(Fn(38,154,e*e*(3-2*e))),U.haft)),U.upper,U.fore,-1);return Gn(a,Ln(c,{a1:Pn(_n(dn(s.mid,a))),a2:Pn(_n(dn(s.end,s.mid))),a3:Pn(_n(dn(i,s.end))),ext:0},n))}let l={a1:324,a2:284,a3:394,ext:0},{mid:u,end:d}=xn(a,dn(o,fn(gn(150),U.haft)),U.upper,U.fore,1),f={a1:Pn(_n(dn(u,a))),a2:Pn(_n(dn(d,u))),a3:150,ext:0},p=In((1-r)/2,0,1);return Gn(a,Rn(Ln(c,{...Ln(l,f,p),a3:Fn(l.a3,f.a3,p**1.5)},n),i*58))}function Jn(e,t,n){let r=(e,t)=>e+In(((t-e)%360+540)%360-180,-n,n);return{a1:r(e.a1,t.a1),a2:r(e.a2,t.a2),a3:r(e.a3,t.a3),ext:e.ext+In(t.ext-e.ext,-n/90,n/90)}}var Yn=11/16,Xn=e=>(Math.round(e*100)/100).toString(),Zn=e=>e.map(e=>`${Xn(e.x)},${Xn(e.y)}`).join(` `),Qn=1.15/Yn,$n=class{minLine;out=[];constructor(e=Qn){this.minLine=e}poly(e,t,n=null,r=this.minLine){let i=n?` stroke="${n}" stroke-width="${r}" stroke-linejoin="round"`:``;this.out.push(`<polygon points="${Zn(e)}" fill="${t}"${i}/>`)}line(e,t,n){let r=Math.max(this.minLine,n*1.25);this.out.push(`<polyline points="${Zn(e)}" fill="none" stroke="${t}" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"/>`)}dot(e,t,n,r=null,i=this.minLine){let a=r?` stroke="${r}" stroke-width="${i}"`:``;this.out.push(`<circle cx="${Xn(e.x)}" cy="${Xn(e.y)}" r="${Xn(t)}" fill="${n}"${a}/>`)}oval(e,t,n,r,i,a=null){let o=a?` stroke="${a}" stroke-width="${Xn(this.minLine)}"`:``;this.out.push(`<ellipse cx="${Xn(e.x)}" cy="${Xn(e.y)}" rx="${Xn(t)}" ry="${Xn(n)}" transform="rotate(${Xn(r)} ${Xn(e.x)} ${Xn(e.y)})" fill="${i}"${o}/>`)}},er=1/24,tr={x:2.3,y:8.6,z:38.812},nr={x:2,y:5.1,z:0},rr=1.4,ir={x:-2.8,z:1},ar={x:5.4,z:-.5},or=Yn*er,sr={x:21*or,y:86*or},cr={x:(ir.x+sr.x-(ar.x-rr))/er,y:-sr.y/er},lr=e=>er*(tr.z-e)/(tr.z-1),ur=(tr.z-1)/11.743,dr=(e,t=0)=>({clip:e,at:Math.min(1,Math.max(0,t))}),fr=(e,t)=>dr(e,Math.min(1,Math.max(0,t))**1.8),pr=1.25,mr=(e,t)=>dr(e,Math.min(1,Math.max(0,t))**pr),hr=(e,t,n)=>({clip:e,at:(t%n+n)%n/n}),gr=e=>e.outcome!==`fighting`&&!_(e),_r=e=>e.outcome===`victory`&&gr(e)?`idle`:e.hero.action;function vr(e){return e.outcome!==`victory`||_(e)?e:{...e,turn:`boss`,boss:{...e.boss,phase:`lull`},hero:{...e.hero,action:`idle`}}}function yr(e,t,n){return _(e)?Math.max(0,n.tuning.freezeVictory-e.freeze):Math.max(0,t-e.freeze)}function br(e,t,n,r,i){let a=yr(e,n,r);if(!(e.freeze<=0||a>=i))return dr(`${t}In`,a/(i-1))}function xr(e,t,n){let r=e.named(t),i=Math.max(0,Math.min(r.frames-1,Math.round(n)));return r.loop?{clip:t,at:(i+.5)/r.frames}:{clip:t,at:r.frames>1?i/(r.frames-1):0}}function Sr(e,t){let n=e.named(t.clip),r=n.loop?Math.floor(t.at*n.frames)%n.frames:Math.round(t.at*(n.frames-1));return e.start(t.clip)+r}var Cr=new Set([`hip`,`footN`,`footF`,`handN`,`handF`]);function W(e,t){let n={...e};for(let[e,r]of Object.entries(t))n[e]=Cr.has(e)?H(r[0],r[1]):r;return n}var wr=e=>e*e*(3-2*e),Tr=e=>1-(1-e)**3;function Er(e,t){let n=e.keys,r=n[0];if(t<=r.at)return r.pose;for(let e=1;e<n.length;e++){let r=n[e-1],i=n[e];if(t>i.at)continue;let a=(t-r.at)/(i.at-r.at||1);if(i.arrive===`hold`)return a>=1?i.pose:r.pose;let o=i.arrive===`snap`?Tr(a):i.arrive===`linear`?a:wr(a);return Cn(r.pose,i.pose,o)}return n[n.length-1].pose}var Dr=1.5;function Or(e,t){return e<3?e:t?Math.round(e*Dr):Math.round((e-1)*Dr)+1}function kr(e,t,n,r={}){let i=r.loop??!1,a=Or(t,i),o=e=>i?Math.floor(e/Dr):Math.round(e*(t-1)/Math.max(1,a-1)),s={};for(let e=0;e<a;e++){let t=r.smears?.[o(e)];t&&(s[e]=t)}return{name:e,frames:a,loop:i,keys:n.map(([e,t,n])=>n?{at:e,pose:t,arrive:n}:{at:e,pose:t}),smears:s,...r.lead?{lead:r.lead}:{},...r.quietFrom===void 0?{}:{quietFrom:r.quietFrom},...r.leap?{leap:r.leap}:{}}}function Ar(e,t){if(!e.leap)return 0;let[n,r,i]=e.leap,a=(t-n)/(r-n);return a<=0||a>=1?0:i*4*a*(1-a)}var jr={West:16,North:32,South:64,East:128},Mr=256,G={Up:1,Down:2,Left:4,Right:8,...jr,Shoulder:Mr,Parry:jr.West,Jump:jr.South,Dodge:jr.East,Counter:jr.North,Break:Mr,Level:jr.West,High:jr.North,Low:jr.South,Sunder:jr.East|Mr,Confirm:jr.South},Nr=G.Up|G.Down|G.Left|G.Right,Pr=G.Level|G.High|G.Low;function Fr(e,t){return(e&t)!==0}function Ir(e,t){return e&~t}var Lr=(e,t)=>e.sunder>=t.tuning.sunderMax;function Rr(e,t,n){if(t<=0)return;let r=n.tuning.sunderMax,i=e.sunder;e.sunder=Math.min(r,i+t),i<r&&e.sunder>=r&&e.events.push({type:`sunderReady`})}function zr(e,t){e.sunder=Math.max(0,e.sunder-t)}function Br(e,t){e.sunder=0,e.player=y(`sunder`,t),e.hero={...e.hero,action:`strike`,actionTick:0},e.events.push({type:`sunderStart`,part:t})}function Vr(e,t,n,r){let i=r.tuning,a=t.tick+1;if(e.hero={...e.hero,action:`strike`,actionTick:a},e.player={...t,tick:a},t.doneAt>=0){a>=t.doneAt&&x(e,r);return}let o=t.sunderCuts.length,s=i.sunderCutTicks[o];if(s===void 0)return;let c=a-s;c===-i.glintLead&&e.events.push({type:`sunderFlash`,index:o});let l=(n&Pr)!==0&&c>=-i.glintLead;if(!l&&c<=i.sunderGood)return;let u=Math.abs(c);Hr(e,l?u<=i.sunderPerfect?`perfect`:u<=i.sunderGood?`good`:`miss`:`miss`,r)}function Hr(e,t,n){let r=n.tuning,i=e.player,a=i.sunderCuts.length,o=a>=r.sunderCutTicks.length-1,s=t===`perfect`?r.sunderPerfectDamage:t===`good`?r.sunderGoodDamage:r.sunderMissDamage,c=o?Math.floor(s*r.sunderFinalPercent/100):s;e.freeze=o?r.freezeSunderFinal:t===`perfect`?r.freezeSunderPerfect:r.freezeSunderCut;let l=v(e,i.target,c,n,!0),u=[...i.sunderCuts,{quality:t,tick:i.tick}],d=o||e.parts[i.target]<=0;if(e.events.push({type:`sunderCut`,index:a,quality:t,damage:l,part:i.target,final:d}),e.player={...e.player,sunderCuts:u,doneAt:d?i.tick+r.sunderRecoverTicks:-1},d){let t=u.filter(e=>e.quality===`perfect`).length;e.events.push({type:`sunderEnd`,perfects:t,cuts:u.length})}}var Ur=G.Parry|G.Dodge,Wr=new Set([`idle`,`deflect`,`parry`,`dodge`,`roll`,`brace`]),Gr=6;function Kr(e,t,n,r){if(!Lr(e,r)||e.boss.phase!==`attack`)return!1;let{action:i,actionTick:a}=e.hero;if(!Wr.has(i))return!1;if(Fr(t,G.Break))return!0;let o=t&Ur;return(n&Ur)!==Ur||o===0?!1:o===Ur?!0:i===`brace`?o===G.Dodge:(o===G.Dodge?i===`parry`:i===`dodge`||i===`roll`)&&a<=Gr}function qr(e,n){let r=t(Jt(e.boss,n));e.sunder=0,e.slowmo=0,e.counter=null,e.hero={...e.hero,action:`interrupt`,actionTick:0},e.boss={...e.boss,phase:`interrupt`,tick:0},e.events.push({type:`interrupt`,part:r})}function Jr(e,n,r){let i=r.tuning,a=i.sunderBreakCutTicks.indexOf(n);if(a>=0){let o=t(Jt(e.boss,r));if(e.parts[o]<=0)return n>=i.sunderBreakTicks;let s=a===i.sunderBreakCutTicks.length-1;e.freeze=i.freezeSunderBreak;let c=v(e,o,i.sunderBreakDamage,r,!0);e.events.push({type:`interruptCut`,index:a,damage:c,part:o,final:s})}return n>=i.sunderBreakTicks}function Yr(e){if(Fr(e,G.Level))return`level`;if(Fr(e,G.High))return`high`;if(Fr(e,G.Low))return`low`}function Xr(e,t){if(e.some(e=>e.special===t.hero.finisher))return!1;let n=0;for(let r of e.slice(1))if(n=r.quality===`perfect`?n+1:0,n>=t.tuning.iaiAfterPerfects)return!0;return!1}function Zr(e,t){let n=new Set(e.map(e=>e.special)),r=t.tuning.maxChain;for(let e of t.combos)n.has(e.name)&&(r+=e.extraCuts);return r}function Qr(e,t,n,r){let i=e.player;i.step===`choose`?$r(e,i,t,r):i.step===`sunder`?Vr(e,i,t,r):ei(e,i,t,n,r)}function $r(e,t,n,r){let i=s(e.parts),a=i.includes(t.target)?t.target:i[0]??t.target,o=+!!Fr(n,G.Right)-!!Fr(n,G.Left);o!==0&&i.length>1&&(a=i[(i.indexOf(a)+o+i.length)%i.length]??a,e.events.push({type:`target`,part:a}));let c=t.tick>=r.tuning.sunderGuardTicks;if(Fr(n,G.Sunder)&&Lr(e,r)&&c){Br(e,a);return}let l=Yr(n);l?(e.player=y(`strike`,a,l),e.hero={...e.hero,action:`strike`,actionTick:0}):e.player={...t,tick:t.tick+1,target:a}}function ei(e,t,n,r,i){let a=i.tuning,o=t.tick+1;if(e.hero={...e.hero,action:`strike`,actionTick:o},e.player={...t,tick:o},t.doneAt>=0){if((t.mark??-1)>=0&&o>=t.doneAt-i.hero.hourStrikeBeforeEnd){ni(e,i);return}o>=t.doneAt&&x(e,i);return}if(t.cuts.length===0){o>=a.dashTicks&&ti(e,t.opener,`opener`,i);return}if(t.drawSince>=0){let n=o-t.drawSince;n===a.iaiDrawTicks&&e.events.push({type:`iaiFlash`});let s=!Fr(r,G.Level),c=n>a.iaiDrawTicks+a.iaiPerfect;if(!s&&!c)return;e.player={...e.player,drawSince:-1},ri(e,Math.abs(n-a.iaiDrawTicks)<=a.iaiPerfect&&s,i);return}if(t.holdSince>=0){let n=t.beat<0;if(!Fr(r,G.Level)){let r=n?t.holdSince+a.strikeRecoverTicks:-1;if(e.player={...e.player,holdSince:-1,doneAt:r},n)return}else if(o-t.holdSince>=a.iaiHoldTicks){e.player={...e.player,holdSince:-1,drawSince:o,beat:-1},e.events.push({type:`iaiDraw`});return}else if(n)return}o===t.beat&&e.events.push({type:`linkBeat`,index:t.cuts.length});let s=Yr(n),c=o-t.beat;if(s){if(Math.abs(c)>a.linkGood){ii(e,o,c<0,i);return}ti(e,s,Math.abs(c)<=a.linkPerfect?`perfect`:`good`,i);let t=e.player,n=e.outcome===`fighting`&&e.parts[t.target]>0;s===`level`&&n&&Xr(t.cuts,i)&&(e.player={...t,holdSince:o,doneAt:-1})}else c>a.linkGood&&ii(e,o,!1,i)}function ti(e,t,n,r){let i=r.tuning,a=e.player,o=a.tick,s=a.cuts.map(e=>e.special!==``).lastIndexOf(!0),c=[...a.cuts.slice(s+1).map(e=>e.stance),t],l=an(r.combos,c),u=t===`level`?i.levelDamage:t===`high`?i.highDamage:i.lowDamage,d=n===`perfect`?Math.floor(u*i.linkPerfectPercent/100):u;l&&(d=Math.floor(d*l.damagePercent/100),a.target!==`core`&&(d=Math.floor(d*l.armsPercent/100))),e.freeze=n===`perfect`||l?i.freezePerfectCut:i.freezeCut;let f=v(e,a.target,d,r,l?.piercesArmour??!1);Rr(e,(n===`perfect`?i.sunderPerfectCut:0)+(l?.sunderGain??0),r),l&&l.heal>0&&(e.hero={...e.hero,hp:Math.min(i.heroHp,e.hero.hp+l.heal)}),l&&l.staggers>0&&(e.boss={...e.boss,staggered:e.boss.staggered+l.staggers}),l?.blesses&&(e.blessed=!0),l?.answers&&(e.answering=!0);let p={stance:t,quality:n,special:l?.name??``,tick:o},m=[...a.cuts,p],h=a.cuts.length;e.events.push({type:`cut`,index:h,stance:t,quality:n,special:p.special,boon:l?.boon??``,damage:f,part:a.target});let g=m.length>=Zr(m,r)||e.parts[a.target]<=0;e.player={...e.player,cuts:m,beat:g?-1:o+i.linkBeat,doneAt:g?o+i.strikeRecoverTicks:-1},l?.marks&&(e.player={...e.player,mark:m.length})}function ni(e,t){let n=e.player,r=n.cuts.slice(n.mark??0).filter(e=>e.quality===`perfect`).length,i=r*t.hero.hourDamagePerLink,a=i>0?v(e,n.target,i,t):0;a>0&&(e.freeze=Math.max(e.freeze,t.tuning.freezePerfectCut)),e.events.push({type:`hourStrike`,links:r,damage:a,part:n.target}),e.player={...e.player,mark:-1}}function ri(e,t,n){let r=n.tuning,i=e.player;e.freeze=t?r.freezeIai:r.freezeCut;let a=t?r.iaiDamage:r.iaiMissDamage,o=v(e,i.target,a,n,t);t&&Rr(e,r.sunderPerfectIai,n),e.events.push({type:`iai`,perfect:t,damage:o,part:i.target});let s={stance:`level`,quality:t?`perfect`:`good`,special:n.hero.finisher,tick:i.tick};e.player={...e.player,cuts:[...i.cuts,s],beat:-1,doneAt:i.tick+r.strikeRecoverTicks}}function ii(e,t,n,r){e.events.push({type:`chainDrop`,index:e.player.cuts.length,early:n}),e.player={...e.player,beat:-1,doneAt:t+r.tuning.strikeRecoverTicks}}var ai={width:320,height:288,originX:128,originY:224},oi={width:ai.width*Yn,height:ai.height*Yn,originX:ai.originX*Yn,originY:ai.originY*Yn},si={main:89,off:67};function ci(e,t,n){let r=(t%360+360)%360;if(r<=90||r>=180)return t;let i=(-2-e.y)/n;return Math.sin(r*Math.PI/180)<=i?t:t-r+180-Math.asin(Math.max(0,Math.min(1,i)))*180/Math.PI}function li(e,t){let n=gn(e.spine+90),r=t.lean*.7+t.spin,i=un(e.hip,un(fn(n,6.4),H(0,-4))),a=ci(i,146+r,si.main+t.sheathBack),o=un(e.hip,un(fn(n,8.8),H(0,2.6)));return{hipUpper:{mouth:un(i,fn(gn(a),t.sheathBack)),deg:a,length:si.main},hipLower:{mouth:o,deg:ci(o,122+r,si.off),length:si.off}}}function ui(e,t,n=!1){let r=li(e,t);return n?r.hipLower:r.hipUpper}function di(e){let t=Sn(e),n=ui(t,e);return{...e,handN:dn(un(n.mouth,fn(gn(n.deg+180),6)),t.shoulderN),handF:dn(un(n.mouth,fn(gn(n.deg),5)),t.shoulderF)}}var K=W(bn,{hip:[-1,-63.4],lean:-3,chest:-4,head:4,footN:[13,-3],footF:[-10,-3],handN:[-1,25],handF:[4,33],wind:1.2}),fi={footN:[-21,-3],footF:[19,-3]},pi=di(W(K,{chest:0,hip:[-4,-47],lean:24,head:-17,footN:[-23,-3],footF:[22,-3],wind:2.4})),mi=di(W(K,{chest:0,hip:[-8,-57],lean:4,head:-3,footN:[-18,-3],footF:[4,-3],wind:-2.5})),hi=(e,t)=>({handN:[e,t],handF:[e-14,t+4]}),gi=W(K,{chest:0,hip:[-4,-48],lean:20,head:-15,footN:[-23,-3],footF:[22,-3],...hi(4,6),blade:-120,bladeOut:1,wind:2}),_i=e=>W(gi,{blade:e}),vi=W(K,{...fi,hip:[-3,-55],lean:9,chest:0,head:-5,handN:[21,-8]}),yi=W(K,{...fi,hip:[-3,-48],lean:20,chest:0,head:-14,handN:[24,14]}),bi=W(K,{...fi,chest:0,hip:[-3,-54],lean:10,head:-6,handN:[20,10],handF:[9,-18],blade:276,bladeOut:1}),xi=W(K,{...fi,chest:0,hip:[-3,-52],lean:6,head:4,handN:[6,-26],handF:[26,-28],blade:354,bladeOut:1}),Si=di(W(K,{chest:0,hip:[8,-47],lean:34,head:-22,footN:[-19,-5],footF:[20,-3],wind:6})),Ci=di(W(K,{chest:0,hip:[-1,-44],lean:20,head:-10,footN:[-12,-3],footF:[12,-3]})),wi=di(W(pi,{hip:[-7,-41],lean:36,chest:6,head:-27,footN:[-24,-3],footF:[18,-3]})),Ti={hip:[13,-49],lean:31,head:-19,footN:[-24,-3],footF:[24,-3]};function Ei(e,t,n){let r={radius:150,from:e,to:e,width:12,streak:!0,dx:t,dy:n};return Object.fromEntries([0,.15,.35,.55].map((e,t)=>[t,[{...r,fade:e}]]))}var Di=(e,t)=>e+360*Math.round((t-e)/360),Oi=34;function ki(e,t){let n=Sn(e),r=ui(n,e),i=t*56,a=e=>un(r.mouth,fn(gn(r.deg+180),6+e)),o=yn.upperArm+yn.foreArm-1.5,s=t*Oi;for(;s>0&&pn(dn(a(s),n.shoulderN))>o;)s-=.5;s=Math.max(0,s);let c=i-s,l=un(r.mouth,fn(gn(r.deg),Math.min(c+5,12)));return{...e,handN:dn(a(s),n.shoulderN),handF:dn(l,n.shoulderF),blade:r.deg,bladeOut:i/86,sheathBack:c}}function Ai(e,t,n,r,i,a,o){let s=kr(`${e}In`,5,n);return[s,kr(e,t,r,{lead:s,...i?{smears:i}:{},...a===void 0?{}:{quietFrom:a},...o?{leap:o}:{}})]}function ji(e,t,n){let r=_i(n),i=(e,n)=>{let i=W(Cn(t,r,e),n),a=Math.max(0,Math.sin(i.blade*Math.PI/180));return{...i,bladeOut:1-.55*a*a}};return kr(e,10,[[0,t],[.18,i(.2,{hip:[-5,-55],lean:10,footN:[-18,-3],footF:[8,-3],wind:-2})],[.4,i(.5,{hip:[-9,-57],lean:4,head:-4,footN:[-18,-3],footF:[4,-3],wind:-2.5})],[.62,i(.78,{hip:[-6,-58],lean:8,head:-8,footN:[-17,-3],footF:[6,-12],wind:1})],[.86,i(1,{hip:[-2,-44],lean:26,head:-18,wind:4}),`snap`],[1,r]],{quietFrom:0})}function Mi(e,t=0,n=mi){let r=W(Cn(e,K,.35),{hip:[4,-54],lean:16,handN:[26,16],spin:0,wind:2}),i=W(r,{blade:Di(34,e.blade),bladeOut:1,bladeF:Di(ui(Sn(r),r,!0).deg,e.bladeF)}),a=ki(W(mi,{hip:[-2,-55],lean:8}),1),o={...a,blade:Di(a.blade,i.blade)},s={...ki(n,.3),blade:o.blade},c={...Cn(i,o,.5),bladeOut:.42};return[[.22,i,`snap`],[.36,W(i,{wind:0})],[.5,c],[.64,o],[.86,s],[1,{...n,blade:o.blade}]].map(([e,n,r])=>{let i=t+e*(1-t);return r?[i,n,r]:[i,n]})}function Ni(e,t,n=mi){return kr(e,10,[[0,t],...Mi(t,0,n)],{quietFrom:0})}function Pi(e,t){let n=ki(W(wi,{hip:[-5,-44],lean:30}),1),r=Di(n.blade,t.blade);return kr(e,6,[[0,t],[.5,{...n,blade:r}],[1,{...wi,blade:r}]],{quietFrom:0})}function Fi(e){let t=e.hit[e.hit.length-1][1];return[...Ai(e.name,e.frames??8,e.lead,e.hit,e.smears,void 0,e.leap),ji(`${e.name}Flow`,t,e.guard),Ni(`${e.name}Noto`,t),...e.coil?[Pi(`${e.name}Coil`,t)]:[]]}var Ii=(e,t)=>[[0,e],[.4,t,`snap`],[1,W(t,{wind:0})]],Li=ki(pi,.55),Ri=(e,t={})=>[[0,Li],[.5,ki(W(pi,t),1)],[1,e]],zi=W(pi,{...Ti,handN:[36,2],handF:[-14,18],bladeOut:1,wind:8}),Bi=W(pi,{...Ti,hip:[15,-48],lean:28,handN:[30,0],handF:[-16,20],bladeOut:.9,wind:3}),Vi=W(pi,{...Ti,hip:[12,-53],lean:24,...hi(33,2),blade:14,bladeOut:1,wind:8}),Hi=W(pi,{...Ti,hip:[15,-45],lean:38,...hi(27,22),blade:28,bladeOut:1,wind:3}),Ui=W(pi,{hip:[12,-56],lean:6,head:-22,footN:[-18,-3],footF:[19,-9],...hi(26,-14),blade:-50,bladeOut:1,wind:5}),Wi=W(pi,{hip:[13,-62],lean:-2,head:-24,footN:[-16,-3],footF:[19,-5],...hi(16,-30),blade:-98,bladeOut:1,wind:2}),Gi=W(Wi,{hip:[14,-72],head:-28,footN:[-6,-18],footF:[12,-28],...hi(14,-20),blade:-110,bladeOut:.92,wind:-5}),Ki=[.04,.96,26],qi=[[0,Ui],[.3,Gi,`snap`],[.62,W(Gi,{hip:[14,-69],footN:[-8,-12],footF:[13,-20],wind:-2})],[1,W(Wi,{wind:0})]],Ji=[[0,gi],[.55,W(gi,{hip:[-2,-51],lean:12,head:-8,...hi(6,-22),blade:-104,wind:1})],[1,W(gi,{hip:[6,-52],lean:20,...hi(24,-16),blade:-30,wind:5})]],Yi=[[0,_i(240)],[.5,W(gi,{hip:[2,-44],lean:30,head:-20,...hi(-6,20),blade:130,bladeOut:.5,wind:2})],[1,W(gi,{hip:[8,-48],lean:22,...hi(18,20),blade:30,bladeOut:.8,wind:5})]],Xi=e=>[[0,gi],[.45,W(gi,e?{hip:[-2,-40],lean:34,head:-22,...hi(-2,22),blade:-188,wind:2}:{hip:[-4,-47],lean:22,...hi(-4,14),blade:-182,wind:2})],[1,W(gi,e?{hip:[6,-38],lean:40,handN:[16,28],handF:[4,28],blade:-274,bladeOut:.3,wind:6}:{hip:[6,-48],lean:28,handN:[16,12],handF:[2,16],blade:-272,bladeOut:.3,wind:6})]],Zi=.7,Qi=.5,$i=.6,ea=.5,ta=e=>{let t=Math.max(0,Math.sin(e.blade*Math.PI/180));return{...e,bladeOut:1-.55*t*t}},na=W(zi,{hip:[12,-38],lean:44,handN:[29,25],handF:[-14,14],blade:-360}),ra=W(Bi,{hip:[14,-39],lean:42,handN:[28,24],handF:[-16,16],blade:-395}),ia=W(pi,{...Ti,hip:[13,-51],lean:26,handN:[34,2],handF:[30,-6],blade:16,bladeOut:1,bladeF:-22,bladeFOut:1,wind:9}),aa=W(ia,{hip:[15,-47],lean:34,handN:[28,20],handF:[24,-30],blade:30,bladeF:-68,wind:3}),oa=W(pi,{...Ti,hip:[13,-51],lean:26,handN:[30,-9],handF:[31,7],blade:40,bladeOut:1,bladeF:-40,bladeFOut:1,wind:10}),sa=W(oa,{hip:[17,-44],lean:40,head:-4,handN:[-11,11],handF:[-12,-15],blade:128,bladeF:-148,wind:3}),ca=W(gi,{lean:22,head:-6,footN:[-2,-38],footF:[10,-42],...hi(6,-6),blade:-150,bladeOut:.85,wind:-3}),la=W(gi,{...Ti,hip:[15,-40],lean:44,...hi(26,24),blade:24,wind:-4}),ua=[...Fi({name:`openLevel`,coil:!0,lead:Ri(W(pi,{hip:[9,-48],lean:30,handN:[24,12],blade:96,bladeOut:.3,wind:5}),{hip:[4,-47],lean:28}),hit:Ii(W(zi,{blade:0}),W(Bi,{blade:-26})),guard:-120}),...Fi({name:`openHigh`,lead:Ri(W(pi,{hip:[6,-52],lean:20,handN:[14,-24],handF:[-6,16],blade:262,bladeOut:1,wind:4}),{hip:[0,-50],lean:16}),hit:Ii(W(Vi,{blade:374}),W(Hi,{blade:388})),guard:600}),...Fi({name:`openLow`,leap:Ki,lead:Ri(W(pi,{hip:[8,-48],lean:22,handN:[22,16],blade:70,bladeOut:.9,wind:5}),{hip:[2,-44],lean:30}),hit:qi,guard:-120}),...Fi({name:`cutHighA`,lead:Ji,hit:Ii(Vi,Hi),guard:240}),...Fi({name:`cutHighB`,lead:[[0,gi],[.4,W(gi,{hip:[0,-40],lean:26,head:-18,blade:-110})],[1,W(gi,{hip:[8,-62],lean:22,footN:[-10,-18],footF:[14,-26],...hi(10,-24),blade:-96,wind:6})]],hit:Ii(W(gi,{hip:[12,-66],lean:30,head:-22,footN:[-10,-22],footF:[16,-32],...hi(28,14),blade:6,wind:9}),W(gi,{...Ti,hip:[15,-40],lean:44,...hi(26,26),blade:20,wind:-4})),guard:240}),...Fi({name:`cutLevelA`,coil:!0,lead:Xi(!1),hit:Ii(W(zi,{blade:-360}),W(Bi,{blade:-388})),guard:-480}),...Fi({name:`cutLevelB`,coil:!0,lead:[[0,gi],[.5,W(gi,{hip:[-8,-48],lean:14,head:-10,...hi(-8,12),blade:-14,wind:0})],[1,W(gi,{hip:[8,-48],lean:30,...hi(18,4),blade:-4,wind:6})]],hit:Ii(W(gi,{hip:[20,-48],lean:38,head:-26,footN:[-28,-3],footF:[28,-3],handN:[38,-2],handF:[-18,14],blade:-3,wind:9}),W(gi,{hip:[22,-47],lean:40,head:-27,footN:[-28,-3],footF:[28,-3],handN:[38,-1],handF:[-20,16],blade:-2,wind:4})),guard:-120,smears:Ei(-3,8,-2)}),...Fi({name:`cutLowA`,lead:Xi(!0),hit:Ii(na,ra),guard:-480}),...Fi({name:`cutLowB`,lead:Yi,hit:qi,guard:-120,leap:Ki}),...Fi({name:`tripleDraw`,coil:!0,frames:16,lead:Xi(!1),hit:[[0,W(zi,{blade:-360})],[.1,W(Bi,{blade:-388}),`snap`],[.22,W(zi,{hip:[12,-50],handN:[20,10],blade:-270,bladeOut:.3}),`linear`],[.34,W(zi,{hip:[6,-50],lean:20,handN:[-4,10],blade:-186}),`linear`],[.5,W(zi,{hip:[-2,-48],lean:14,head:-10,handN:[-10,12],handF:[-16,18],blade:-172,wind:-3})],[.6,W(zi,{hip:[12,-48],handN:[18,10],blade:-270,bladeOut:.3}),`linear`],[Zi,W(zi,{hip:[20,-46],lean:38,handN:[38,2],blade:-360,wind:11}),`linear`],[.82,W(Bi,{hip:[21,-46],lean:36,blade:-388}),`snap`],[1,W(Bi,{hip:[21,-46],lean:36,blade:-388,wind:0})]],guard:-480}),...Fi({name:`crosscut`,frames:12,lead:[[0,gi],[.5,W(gi,{hip:[-3,-50],lean:14,head:-10,handN:[6,-18],handF:[-4,16],blade:-112,bladeF:150,bladeFOut:.45,wind:1})],[1,W(gi,{hip:[5,-51],lean:22,handN:[16,-22],handF:[4,22],blade:-70,bladeF:118,bladeFOut:1,wind:5})]],hit:[[0,ia],[.3,aa,`snap`],[1,W(aa,{wind:0})]],guard:240}),...Fi({name:`sunderFinish`,frames:12,lead:[[0,gi],[.5,W(gi,{hip:[-3,-50],lean:14,head:-10,handN:[6,-18],handF:[-4,16],blade:-112,bladeF:150,bladeFOut:.45,wind:1})],[1,W(gi,{hip:[5,-51],lean:22,handN:[18,-24],handF:[10,20],blade:-40,bladeF:60,bladeFOut:1,wind:5})]],hit:[[0,oa],[.34,sa,`snap`],[1,W(sa,{wind:0})]],guard:240}),...Fi({name:`risingMoon`,leap:[.02,.8,72],frames:16,lead:Yi,hit:[[0,W(Ui,{hip:[12,-54],blade:-40})],[.14,W(Wi,{hip:[14,-66],head:-30,footN:[-4,-14],footF:[12,-24],...hi(12,-22),blade:-100,bladeOut:.9,wind:-6}),`snap`],[.3,W(ca,{hip:[14,-86],spin:40})],[.48,W(ca,{hip:[14,-86],spin:200}),`linear`],[.66,W(ca,{hip:[15,-66],footN:[-10,-18],footF:[14,-22],spin:320}),`linear`],[.8,{...la,spin:360},`linear`],[.801,la,`hold`],[1,W(la,{wind:0})]],guard:240}),...Fi({name:`twinFang`,frames:12,leap:[.04,Qi,24],lead:Yi,hit:[[0,Ui],[.16,Gi,`snap`],[.36,W(Gi,{hip:[14,-70],...hi(12,-24),blade:-116,wind:-3})],[Qi,W(Vi,{wind:10}),`linear`],[.66,Hi,`snap`],[1,W(Hi,{wind:0})]],guard:240}),...Fi({name:`fallingLeaf`,frames:14,lead:Xi(!0),hit:[[0,na],[.12,ra,`snap`],[.3,ta(W(na,{hip:[8,-38],handN:[12,26],blade:-270,wind:0})),`linear`],[.42,W(na,{hip:[2,-38],lean:34,head:-18,handN:[-8,24],handF:[-16,18],blade:-188,wind:-3})],[.52,ta(W(na,{hip:[10,-37],handN:[14,26],blade:-274})),`linear`],[$i,W(na,{hip:[18,-37],lean:46,handN:[36,24],blade:-360,wind:11}),`linear`],[.76,W(ra,{hip:[19,-38],blade:-395}),`snap`],[1,W(ra,{hip:[19,-38],blade:-395,wind:0})]],guard:-480}),...Fi({name:`swallowTurn`,coil:!0,frames:12,lead:Xi(!1),hit:[[0,W(zi,{blade:-360})],[.14,W(Bi,{blade:-388}),`snap`],[.36,W(Bi,{hip:[12,-42],lean:36,head:-20,...hi(20,18),blade:-328,wind:-2})],[ea,W(Ui,{blade:-410,wind:8}),`linear`],[.66,W(Wi,{blade:-458}),`snap`],[1,W(Wi,{blade:-458,wind:0})]],guard:-480})],da=W(pi,{hip:[22,-44],lean:44,head:-30,footN:[-28,-3],footF:[28,-3],handN:[34,-6],handF:[-22,16],blade:-22,bladeOut:1,wind:7}),fa=W(da,{hip:[20,-45],lean:42,handN:[39,0],handF:[-18,16],blade:2,wind:11}),pa=W(da,{blade:-22}),ma=e=>[[0,ki(Si,.15)],[.5,ki(W(Si,{hip:[10,-47],lean:36}),1)],[1,e]],ha=W(Si,{...Ti,hip:[15,-47],lean:36,handN:[36,0],handF:[-16,16],blade:-6,bladeOut:1,wind:9}),ga=W(ha,{hip:[15,-58],lean:4,head:-24,footN:[-18,-3],footF:[20,-6],handN:[18,-28],blade:-424,wind:2}),_a=W(Si,{hip:[15,-70],lean:0,head:-26,footN:[-8,-22],footF:[14,-30],handN:[14,-34],handF:[-12,14],blade:-112,bladeOut:1,wind:-3}),va=W(_a,{hip:[12,-50],lean:14,footN:[-24,-3],footF:[24,-3],handN:[16,-26],blade:-110,wind:1}),ya=[Pi(`iaiCoil`,gi),kr(`iaiHold`,2,[[0,wi],[.5,W(wi,{hip:[-7,-40.2],lean:37,wind:3.2}),`hold`],[1,wi,`hold`]],{loop:!0}),...Ai(`iaiCut`,10,[[0,ki(wi,.1)],[.5,ki(W(wi,{hip:[2,-43],lean:40}),1)],[1,W(wi,{hip:[12,-45],lean:42,handN:[26,10],handF:[-16,16],blade:96,bladeOut:.3,wind:9})]],Ii(W(da,{hip:[20,-45],lean:42,handN:[39,0],handF:[-18,16],blade:2,wind:11}),da)),Ni(`iaiCutNoto`,W(da,{wind:0})),kr(`riposteDown`,6,[[0,Vi],[.45,Hi,`snap`],[1,Ui,`linear`]]),kr(`riposteRise`,6,[[0,Ui],[.45,Wi,`snap`],[1,Vi,`linear`]]),kr(`riposteDownEnd`,6,[[0,Vi],[.35,Hi,`snap`],[1,fa,`linear`]]),kr(`riposteRiseEnd`,6,[[0,Ui],[.35,Wi,`snap`],[1,fa,`linear`]]),kr(`riposteFinish`,10,Ii(fa,pa)),Ni(`riposteFinishNoto`,W(pa,{wind:0})),kr(`iaiMiss`,6,[[0,wi],[.4,{...ki(W(wi,{hip:[2,-50],lean:18,head:6}),.7),blink:1}],[1,K]],{quietFrom:0}),...Ai(`counterLevel`,18,ma(W(Si,{hip:[12,-47],lean:36,handN:[26,10],blade:84,bladeOut:.7,wind:8})),[[0,ha],[.09,W(ha,{hip:[16,-47],handN:[31,-14],blade:-36,wind:3}),`snap`],[.18,W(ha,{hip:[10,-48],lean:26,handN:[4,-16],blade:-170}),`linear`],[.26,W(ha,{hip:[8,-44],lean:32,handN:[-2,18],blade:-250,bladeOut:.5}),`linear`],[.34,W(ha,{hip:[14,-52],lean:14,handN:[26,-4],blade:-340,wind:8}),`linear`],[.44,ga,`snap`],[.56,W(ga,{wind:0})],...Mi(ga,.56,K)],void 0,.5),...Ai(`counterHigh`,18,[[0,ki(Si,.15)],[.25,ki(Si,.5)],[.5,ki(W(Si,{hip:[10,-47],lean:36}),1)],[.75,W(Si,{hip:[12,-66],lean:30,footN:[-8,-18],footF:[12,-26],...hi(8,-10),blade:-150,bladeOut:.85,wind:8})],[1,W(ca,{hip:[13,-81],spin:150})]],[[0,W(ca,{hip:[13,-82],spin:170})],[.1,W(ca,{hip:[14,-80],spin:250}),`linear`],[.2,W(ca,{hip:[15,-62],footN:[-10,-18],footF:[14,-22],spin:325}),`linear`],[.3,{...la,spin:360},`linear`],[.301,la,`hold`],[.5,W(la,{wind:0})],...Mi(la,.5,K)],void 0,.42),...Ai(`counterLow`,18,ma(W(Si,{hip:[12,-34],lean:48,handN:[24,22],blade:86,bladeOut:.6,wind:8})),[[0,W(Si,{hip:[14,-30],lean:52,head:-34,footN:[-28,-3],footF:[30,-3],handN:[34,22],handF:[-18,10],blade:2,bladeOut:1,wind:9})],[.12,W(Si,{hip:[16,-32],lean:48,head:-32,footN:[-28,-3],footF:[30,-3],handN:[28,14],handF:[-18,12],blade:-44,bladeOut:1,wind:5}),`linear`],[.24,W(Si,{hip:[15,-62],lean:4,head:-24,footN:[-12,-10],footF:[16,-22],handN:[20,-30],handF:[-12,16],blade:-98,bladeOut:1,wind:-5}),`snap`],[.36,_a],[.5,va],[.56,W(va,{wind:0})],...Mi(va,.56,K)],void 0,.42,[.13,.5,30])];function ba(e,t,n,r,i,a){let o=n?[[0,K],[.5,n],[1,t,`snap`]]:[[0,K],[1,t,`snap`]],s=n?[[0,t],[.6,n],[1,K]]:[[0,t],[1,K]],c=(e,t)=>({...e,hip:H(e.hip.x+t,e.hip.y+Math.abs(t)*.4),lean:e.lean+t*1.6,handN:H(e.handN.x+t*.8,e.handN.y-t*.5),blade:e.blade+t*2.4}),l=(e,t)=>kr(e,2,[[0,c(t,-1.6)],[.5,c(t,1.4),`hold`],[1,c(t,-1.6),`hold`]],{loop:!0}),u=n?[[.8,n]]:[];return[kr(`parryRaise${e}`,4,o,{quietFrom:0}),kr(`guard${e}`,1,[[0,t]]),kr(`parryLower${e}`,4,s,{quietFrom:0}),l(`strain${e}`,r),kr(`deflect${e}`,10,[[0,r],[.2,i,`snap`],[.55,W(i,{wind:0})],...u,[1,K]],{quietFrom:0}),l(`strain${e}P`,Er(a,0)),a]}var xa=ki(K,1),Sa=[...ba(`G`,vi,void 0,W(vi,{hip:[-8,-52],lean:-6,head:8,handN:[24,-6],wind:-5}),W(vi,{hip:[-10,-51],lean:-10,handN:[19,-2],wind:-3}),kr(`deflectGP`,12,[[0,W(vi,{hip:[1,-50],lean:20,head:-12,handN:[31,8],wind:4})],[.2,W(vi,{hip:[3,-49],lean:24,handN:[24,26],wind:2}),`snap`],[.55,W(vi,{hip:[3,-50],lean:22,handN:[24,26]})],[1,K]])),...ba(`L`,yi,void 0,W(yi,{hip:[-7,-46],lean:12,head:-8,handN:[26,16],wind:-5}),W(yi,{hip:[-10,-46],lean:6,handN:[20,18],wind:-3}),kr(`deflectLP`,12,[[0,W(yi,{hip:[0,-46],lean:26,head:-16,handN:[28,10],wind:3})],[.2,W(yi,{hip:[2,-57],lean:2,head:-20,handN:[22,-26],wind:4}),`snap`],[.55,W(yi,{hip:[2,-56],lean:4,head:-18,handN:[20,-24]})],[1,K]])),...ba(`S`,bi,xa,W(bi,{hip:[-8,-52],lean:-5,head:6,handN:[18,8],blade:298,wind:-5}),W(bi,{hip:[-10,-51],lean:-9,handN:[14,10],blade:306,wind:-3}),kr(`deflectSP`,12,[[0,W(bi,{hip:[-2,-52],lean:12,head:-8,handN:[20,6],blade:298,wind:-3})],[.24,W(bi,{hip:[4,-50],lean:24,head:-16,handN:[30,14],handF:[-12,18],blade:384,wind:4}),`snap`],[.55,W(bi,{hip:[5,-50],lean:24,head:-16,handN:[31,14],handF:[-12,18],blade:386})],[.8,{...xa,blade:Di(xa.blade,386)}],[1,K]],{quietFrom:.5})),...ba(`H`,xi,xa,W(xi,{hip:[-4,-46],lean:4,head:8,handN:[6,-20],handF:[26,-22],blade:357,wind:-4}),W(xi,{hip:[-6,-48],lean:0,handN:[4,-22],handF:[24,-24],blade:352,wind:-2}),kr(`deflectHP`,12,[[0,W(xi,{hip:[-2,-46],lean:8,head:6,handN:[8,-20],handF:[28,-22],blade:358,wind:3})],[.22,W(xi,{hip:[3,-57],lean:14,head:-14,handN:[20,-30],handF:[-12,10],blade:294,wind:4}),`snap`],[.55,W(xi,{hip:[3,-56],lean:12,head:-12,handN:[20,-30],handF:[-12,12],blade:290})],[.8,xa],[1,K]],{quietFrom:.5}))],Ca=W(gi,{hip:[-5,-57],lean:-12,head:-12,footN:[-17,-3],footF:[5,-3],handN:[16,14],handF:[-4,22],blade:30,blink:1,wind:-3}),wa=[kr(`idle`,12,[[0,W(K,{wind:1.2})],[.5,W(K,{hip:[0,-62.2],chest:-5.4,head:4,wind:2.6})],[1,W(K,{wind:1.2})]],{loop:!0}),kr(`dodgeA`,14,[[0,K],[.1,W(Ci,{hip:[1,-40],lean:26}),`snap`],[.28,W(bn,{hip:[-8,-76],lean:-24,chest:-8,head:-20,footN:[-4,-30],footF:[8,-34],handN:[-10,16],handF:[-12,12],spin:-70,wind:-6}),`snap`],[.6,W(bn,{hip:[-8,-80],lean:40,chest:24,head:20,footN:[2,-30],footF:[8,-34],handN:[8,22],handF:[6,20],spin:-290,wind:-6}),`linear`],[.8,W(K,{hip:[-10,-40],lean:30,head:-24,footN:[-26,-3],footF:[14,-3],handN:[18,34],handF:[-10,18],spin:-360,wind:-7})],[1,W(K,{spin:-360})]]),kr(`dodgeB`,14,[[0,K],[.1,W(Ci,{hip:[1,-40],lean:26}),`snap`],[.3,W(K,{hip:[-13,-33],lean:-32,head:16,footN:[-30,-3],footF:[22,-5],handN:[-16,30],handF:[-14,8],wind:-9}),`snap`],[.68,W(K,{hip:[-12,-35],lean:-26,head:12,footN:[-30,-3],footF:[20,-4],handN:[-16,31],handF:[-14,10],wind:-4})],[.86,W(Ci,{hip:[-5,-44],lean:10,wind:-2})],[1,K]]),kr(`rollA`,12,[[0,K],[.1,W(Ci,{hip:[3,-40],lean:36,head:-22}),`snap`],[.26,W(bn,{hip:[2,-30],lean:62,chest:30,head:26,footN:[6,-12],footF:[10,-15],handN:[10,22],handF:[6,20],spin:40,wind:3}),`snap`],[.74,W(bn,{hip:[2,-30],lean:62,chest:30,head:26,footN:[6,-12],footF:[10,-15],handN:[10,22],handF:[6,20],spin:330,wind:3}),`linear`],[.88,W(Ci,{hip:[1,-42],lean:24,spin:360})],[1,W(K,{spin:360})]]),kr(`rollB`,12,[[0,K],[.1,W(Ci,{hip:[3,-40],lean:30}),`snap`],[.28,W(K,{hip:[10,-24],lean:-44,head:22,footN:[-4,-4],footF:[32,-6],handN:[-20,20],handF:[-12,14],wind:8}),`snap`],[.7,W(K,{hip:[12,-25],lean:-40,head:20,footN:[-2,-4],footF:[32,-5],handN:[-20,21],handF:[-12,15],wind:4})],[.88,W(Ci,{hip:[2,-42],lean:24})],[1,K]]),kr(`jumpA`,10,[[0,K],[.1,W(Ci,{hip:[0,-40],lean:22}),`snap`],[.24,W(K,{hip:[0,-64],lean:4,head:-8,footN:[-6,-1],footF:[7,-5],handN:[16,2],handF:[-10,6],wind:0}),`snap`],[.5,W(K,{hip:[0,-60],lean:14,footN:[2,-24],footF:[13,-30],handN:[-8,16],handF:[-12,12],wind:0})],[.8,W(K,{hip:[0,-64],lean:2,footN:[-8,-6],footF:[8,-2],handN:[-12,8],handF:[-14,6],wind:-2})],[.92,W(Ci,{hip:[-1,-42],lean:22})],[1,K]]),kr(`jumpB`,12,[[0,K],[.1,W(Ci,{hip:[0,-40],lean:22}),`snap`],[.24,W(K,{hip:[0,-64],lean:4,head:-8,footN:[-6,-1],footF:[7,-5],handN:[16,2],handF:[-10,6],wind:0}),`snap`],[.36,W(bn,{hip:[0,-62],lean:50,chest:26,head:24,footN:[4,-24],footF:[10,-28],handN:[10,22],handF:[6,20],spin:40,wind:2})],[.72,W(bn,{hip:[0,-62],lean:50,chest:26,head:24,footN:[4,-24],footF:[10,-28],handN:[10,22],handF:[6,20],spin:330,wind:2}),`linear`],[.9,W(Ci,{hip:[-1,-42],lean:22,spin:360})],[1,W(K,{spin:360})]]),kr(`hurt`,6,[[0,W(bn,{hip:[-8,-58],lean:-22,head:-18,footN:[-18,-3],footF:[10,-7],handN:[18,0],handF:[10,8],blink:1,wind:-7})],[.5,W(bn,{hip:[-7,-56],lean:-10,head:-8,footN:[-18,-3],footF:[8,-3],handN:[12,20],handF:[0,24],blink:1,wind:-2})],[1,K]]),kr(`down`,6,[[0,W(bn,{hip:[-4,-56],lean:-10,head:-10,blink:1})],[1,W(bn,{hip:[-2,-31],lean:36,chest:10,head:32,footN:[15,-3],footF:[-22,-3],handN:[20,28],handF:[4,22],blink:1})]]),kr(`dashIn`,8,[[0,K],[.2,W(Ci,{hip:[2,-41],lean:32,head:-20}),`snap`],[.45,Si],[.5,ki(W(Si,{hip:[6,-48],footN:[16,-6],footF:[-16,-4]}),.06)],[.75,ki(W(Si,{hip:[8,-49],footN:[18,-6],footF:[-18,-4]}),.3)],[1,Li]]),kr(`dashStart`,4,[[0,W(Si,{hip:[3,-51],lean:22,head:-14,footN:[-15,-3],footF:[16,-3]})],[1,Si]]),kr(`dashStop`,4,[[0,Si],[.5,W(Si,{hip:[3,-55],lean:14,head:-8,footN:[-14,-3],footF:[14,-3]})],[1,K]]),kr(`dash`,4,[[0,Si],[.25,W(Si,{hip:[8,-50],footN:[-4,-9],footF:[6,-3]})],[.5,W(Si,{hip:[8,-48],footN:[18,-5],footF:[-18,-3]})],[.75,W(Si,{hip:[8,-50],footN:[5,-3],footF:[-5,-9]})],[1,Si]],{loop:!0}),kr(`kamae`,1,[[0,gi]]),kr(`drop`,8,[[0,gi],[.3,Ca,`snap`],...Mi(Ca,.3)],{quietFrom:0}),kr(`dashBack`,6,[[0,W(mi,{hip:[-9,-51],lean:-14,footN:[-20,-4],footF:[14,-3],wind:-7})],[.6,W(K,{hip:[-6,-54],lean:2,footN:[-18,-3],footF:[12,-3],wind:-3})],[1,K]])],Ta=[...wa,...Sa,...ua,...ya],Ea={Moves:wa,Guards:Sa,Cuts:ua,Finishers:ya};function Da(e){let t=Ta.find(t=>t.name===e);if(!t)throw Error(`no clip called ${e}`);return t}Ta.reduce((e,t)=>e+t.frames,0);function Oa(e){let t=0;for(let n of Ta){if(n.name===e)return t;t+=n.frames}throw Error(`no clip called ${e}`)}var ka={named:Da,start:Oa},Aa=6,ja=new Set([`openLevel`,`cutLevelA`,`cutLevelB`,`tripleDraw`,`swallowTurn`]),Ma={"Triple Draw":`tripleDraw`,Crosscut:`crosscut`,"Rising Moon":`risingMoon`,"Twin Fang":`twinFang`,"Falling Leaf":`fallingLeaf`,"Swallow Turn":`swallowTurn`},Na=(e,t,n,r)=>br(e,t,n,r,5),Pa=e=>Math.ceil(20*e**(1/pr));function Fa(e,t){let{counterTicks:n,counterStrikeTick:r}=t.tuning;return Math.ceil(Math.max(1,n-1-r)*e**(1/pr))}var Ia=()=>Pa(Zi);function La(e){let t=e.boss.results.indexOf(`pending`);return t<0?e.boss.results.length:t}function Ra(e){let t=e.boss.results,n=0;return t.forEach((e,t)=>{(e===`parried`||e===`perfectParry`)&&(n=t)}),{beat:n,perfect:t[n]===`perfectParry`}}function za(e,t,n){let r=t.attacks[e.boss.attack]?.beats[n]?.motion,i=e.hero.moves;return r===`beam`?`S`:r===`slam`||r===`plunge`?i%2==0?`H`:`G`:r===`jab`?[`S`,`L`,`G`][i%3]??`G`:i%2==0?`S`:`G`}var Ba=e=>e.hero.moves%2==0?`A`:`B`,Va=e=>`${e[0]?.toUpperCase()}${e.slice(1)}`;function Ha(e,t){return e.special===`Iai`?`iaiCut`:Ma[e.special]||(t===0?`open${Va(e.stance)}`:`cut${Va(e.stance)}${t%2==1?`A`:`B`}`)}var Ua=`sunderFinish`;function Wa(e,t){return e<=0?`openLevel`:e>=t-1?Ua:e%2==1?`cutHighB`:`cutLowB`}var Ga=11,Ka=6,qa=(e,t)=>+(e>0&&(t-e)%2==0);function Ja(e,t,n){let r=t.tuning,i=e.player.sunderCuts[n]?.quality;return n>=r.sunderCutTicks.length-1?r.freezeSunderFinal:i===`perfect`?r.freezeSunderPerfect:r.freezeSunderCut}function Ya(e,t){let n=e.player;if(e.turn!==`player`||n.step!==`sunder`||gr(e))return;let r=t.tuning.sunderCutTicks.length,i=n.sunderCuts.length,a=n.sunderCuts[i-1],o=e=>e*e*(3-2*e);if(!a)return{reach:o(Math.min(1,n.tick/16)),across:0,facing:1};let s=qa(i-1,r),c=qa(i,r),l=n.tick-a.tick,u=Ja(e,t,i-1),d=l===0?yr(e,u,t):u,f=o(Math.min(1,(d+l)/Ga)),p=s+(c-s)*f,m=s===c||f>=1?c===1?-1:1:s===0?1:-1;if(n.doneAt<0)return{reach:1,across:p,facing:m};c===1&&f>=1&&(m=1);let h=c===1?24:14,g=o(Math.min(1,Math.max(0,(n.tick-(n.doneAt-h))/h)));return g>0&&c===1&&(m=-1),{reach:1-g,across:p*(1-g),facing:m}}function Xa(e,t){let n=t.tuning,{tick:r,sunderCuts:i,doneAt:a}=e.player,o=qa(i.length,n.sunderCutTicks.length)===1,s=o?24:14;if(a>=0&&r>=a-s){if(!o)return dr(`dashBack`,(r-(a-14))/14);let e=r-(a-s),t=r-(a-Ka);return t>=0?dr(`dashStop`,t/5):e<4?dr(`dashStart`,e/4):hr(`dash`,e,8)}let c=i[i.length-1];if(!c)return dr(`dashIn`,r/16);let l=n.sunderCutTicks.length,u=i.length-1,d=Wa(u,l),f=r-c.tick,p=u>=l-1?n.freezeSunderFinal:c.quality===`perfect`?n.freezeSunderPerfect:n.freezeSunderCut;if(f===0){let n=Na(e,d,p,t);if(n)return n}let m=d===Ua,h=m?20:10;if(f<h)return m?mr(d,f/h):fr(d,f/h);let g=c.tick+h;if(a>=0){let e=a-s;return dr(`${d}Noto`,(r-g)/Math.max(1,e-g))}let _=n.sunderCutTicks[u+1]??g;return r>=_?dr(`kamae`):dr(`${d}Flow`,(r-g)/Math.max(1,_-g))}function Za(e,t){let n=t.tuning,{tick:r,cuts:i,doneAt:a,beat:o,drawSince:s,holdSince:c,target:l}=e.player;if(a>=0&&r>=a-14)return dr(`dashBack`,(r-(a-14))/14);if(s>=0){let e=r-s;if(e>=8)return hr(`iaiHold`,e,8);let t=i[i.length-1],n=t?Ha(t,i.length-1):``;return dr(ja.has(n)?`${n}Coil`:`iaiCoil`,e/8)}let u=i[i.length-1];if(!u)return dr(`dashIn`,r/16);let d=r-u.tick,f=u.special===`Iai`;if(f&&u.quality!==`perfect`)return dr(`iaiMiss`,d/14);let p=Ha(u,i.length-1),m=!f&&Ma[u.special]!==void 0,h=f?16:m?20:10,g=f?n.freezeIai:u.quality===`perfect`||m?n.freezePerfectCut:n.freezeCut;if(d===0){let n=Na(e,p,g,t);if(n)return n}if(d<h||c>=0)return m?mr(p,d/h):fr(p,Math.min(1,d/h));let _=u.tick+h;if(a>=0){if(!f&&i.length<Zr(i,t)&&e.parts[l]>0)return dr(`drop`,(r-(a-n.strikeRecoverTicks))/14);let o=a-14;return dr(`${p}Noto`,(r-_)/Math.max(1,o-_))}return o<0||r>=o?dr(`kamae`):dr(`${p}Flow`,(r-_)/Math.max(1,o-_))}var Qa=e=>e%2==0?`cutHighA`:`cutLowB`,$a=e=>`counter${Va(e)}`;function eo(e,t,n,r){if(e>=n){let t=r-n,i=Math.floor(t*.45),a=e-n;return a<i?fr(`riposteFinish`,a/i):dr(`riposteFinishNoto`,(a-i)/Math.max(1,t-i))}let i=-1;t.forEach((t,n)=>{e>=t&&(i=n)});let a=t[i];if(a===void 0){let r=e-((t[0]??n)-Aa);return r>=0?dr(`openHighIn`,r/5):e<4?dr(`dashStart`,e/4):hr(`dash`,e,8)}let o=t[i+1];return dr(`riposte${i%2==0?`Down`:`Rise`}${o===void 0?`End`:``}`,(e-a)/Math.max(1,(o??n)-a))}function to(e,t){let n=t.tuning,r=e.boss.tick;if(e.boss.phase===`interrupt`){let e=n.sunderBreakCutTicks,t=e[e.length-1]??0;return eo(r,e.slice(0,-1),t,n.sunderBreakTicks)}return e.boss.phase!==`riposte`||r<=0?dr(`dashStart`):eo(r,n.riposteSlashTicks,n.riposteStrikeTick,n.riposteTicks)}function no(e,t,n,r=0){let{actionTick:i}=e.hero,a=_r(e);switch(a){case`parry`:{let{windowEnd:n,duration:r}=t.moves.parry,a=za(e,t,La(e));if(i<3)return dr(`parryRaise${a}`,i/3);if(i<n)return dr(`guard${a}`);let o=(i-n)/Math.max(1,r-n);return dr(`parryLower${a}`,o)}case`deflect`:{let{beat:n,perfect:r}=Ra(e),a=`${za(e,t,n)}${r?`P`:``}`;return e.freeze>0&&i===0?hr(`strain${a}`,e.freeze,4):fr(`deflect${a}`,i/Math.max(1,t.tuning.deflectTicks-1))}case`dodge`:case`roll`:case`jump`:return dr(`${a}${Ba(e)}`,i/t.moves[a].duration);case`hurt`:return dr(`hurt`,i/t.tuning.hurtTicks);case`down`:return dr(`down`,r/.5);case`riposte`:case`interrupt`:return to(e,t);case`brace`:return hr(`strainS${e.boss.results.includes(`holdingPerfect`)?`P`:``}`,i,4);case`strike`:if(gr(e)||e.turn!==`player`)break;return e.player.step===`sunder`?Xa(e,t):Za(e,t);case`counter`:{let{counterStrikeTick:n,counterTicks:r,freezeCounter:a}=t.tuning;if(i<n)return i<4?dr(`dashStart`,i/4):hr(`dash`,i,8);let o=$a(e.counter?.style??`high`);return(i===n?Na(e,o,a,t):void 0)??mr(o,(i-n)/Math.max(1,r-1-n))}}return hr(`idle`,Math.floor(n*60),150)}function ro(e){if(e.endsWith(`Noto`))return .6;if(e.endsWith(`Coil`))return .3;if(e.startsWith(`counter`)&&!e.endsWith(`In`))return .82}var io=/^(?:open\w+In|counter\w+In|iaiCutIn)$/;function ao(e,t){let n=e.clip!==t.clip;if(n&&io.test(t.clip))return[`draw`];let r=ro(t.clip);return r!==void 0&&t.at>=r&&(n||e.at<r)?[`sheathe`]:[]}var oo=e=>Ar(Da(e.clip),e.at),so=(e,t)=>xr(ka,e,t),co=e=>Sr(ka,e),lo=[[4090,4090],[4073,942]],uo=[[0,0,0,68,92,38,64],[0,69,0,68,92,38,64],[0,138,0,68,92,38,64],[0,207,0,68,92,38,64],[0,276,0,68,92,38,64],[0,345,0,68,92,38,64],[0,414,0,70,91,36,65],[0,485,0,70,91,37,65],[0,556,0,71,92,36,65],[0,628,0,69,92,38,65],[0,698,0,70,92,37,65],[0,769,0,74,91,33,65],[0,844,0,75,91,31,65],[0,920,0,76,92,30,64],[0,997,0,74,92,32,64],[0,1072,0,72,92,34,64],[0,1145,0,68,92,38,64],[0,1214,0,68,92,38,64],[0,1283,0,74,92,32,64],[0,1358,0,84,78,30,79],[0,1443,0,87,75,29,82],[0,1531,0,76,81,45,76],[0,1608,0,86,77,40,79],[0,1695,0,88,72,39,77],[0,1784,0,92,70,39,72],[0,1877,0,103,71,42,65],[0,1981,0,100,84,46,53],[0,2082,0,79,89,55,49],[0,2162,0,95,107,44,32],[0,2258,0,109,108,36,28],[0,2368,0,115,91,35,37],[0,2484,0,124,84,31,50],[0,2609,0,132,74,20,77],[0,2742,0,128,76,18,80],[0,2871,0,115,83,21,74],[0,2987,0,98,93,23,64],[0,3086,0,84,96,28,61],[0,3171,0,71,96,35,61],[0,3243,0,68,92,38,64],[0,3312,0,74,92,32,64],[0,3387,0,84,78,30,79],[0,3472,0,87,75,29,82],[0,3560,0,85,74,28,83],[0,3646,0,86,76,25,86],[0,3733,0,89,79,23,87],[0,3823,0,93,76,23,87],[0,3917,0,97,74,23,87],[0,0,109,97,72,23,87],[0,98,109,94,73,23,86],[0,193,109,92,74,24,86],[0,286,109,92,77,24,86],[0,379,109,90,76,24,85],[0,470,109,86,73,24,85],[0,557,109,85,74,25,85],[0,643,109,84,76,27,81],[0,728,109,82,79,30,78],[0,811,109,82,80,30,77],[0,894,109,79,83,31,74],[0,974,109,71,89,35,68],[0,1046,109,68,92,38,64],[0,1115,109,74,92,32,64],[0,1190,109,87,76,29,81],[0,1278,109,101,67,26,91],[0,1380,109,97,65,34,88],[0,1478,109,93,76,37,82],[0,1572,109,82,98,44,69],[0,1655,109,62,111,61,62],[0,1718,109,78,94,57,78],[0,1797,109,106,77,47,95],[0,1904,109,102,73,47,104],[0,2007,109,96,91,40,92],[0,2104,109,82,97,33,85],[0,2187,109,84,72,34,85],[0,2272,109,95,87,31,70],[0,2368,109,88,102,31,57],[0,2457,109,94,99,30,58],[0,2552,109,92,87,33,70],[0,2645,109,79,92,38,64],[0,2725,109,74,92,32,64],[0,2800,109,86,76,30,81],[0,2887,109,85,74,35,83],[0,2973,109,87,66,36,91],[0,3061,109,87,70,36,95],[0,3149,109,91,71,32,96],[0,3241,109,98,73,25,95],[0,3340,109,102,74,21,95],[0,3443,109,106,75,18,95],[0,3550,109,101,76,23,95],[0,3652,109,96,78,29,94],[0,3749,109,93,79,32,94],[0,3843,109,92,77,33,94],[0,3936,109,89,75,35,88],[0,0,221,83,75,36,82],[0,84,221,86,77,30,80],[0,171,221,74,86,34,71],[0,246,221,68,92,38,64],[0,315,221,74,92,32,64],[0,390,221,85,76,30,81],[0,476,221,76,89,33,68],[0,553,221,71,94,36,63],[0,625,221,72,94,35,63],[0,698,221,78,91,34,64],[0,777,221,83,88,33,66],[0,861,221,85,88,32,66],[0,947,221,90,88,33,66],[0,1038,221,92,90,34,65],[0,1131,221,90,92,35,64],[0,1222,221,87,94,36,64],[0,1310,221,88,86,33,71],[0,1399,221,86,78,29,79],[0,1486,221,70,92,38,64],[0,1557,221,74,92,32,64],[0,1632,221,85,77,30,80],[0,1718,221,82,82,31,75],[0,1801,221,72,93,35,64],[0,1874,221,71,95,36,62],[0,1946,221,100,82,24,70],[0,2047,221,98,72,32,68],[0,2146,221,73,106,50,42],[0,2220,221,70,100,55,49],[0,2291,221,106,76,46,69],[0,2398,221,95,73,46,76],[0,2494,221,85,93,42,64],[0,2580,221,79,91,39,66],[0,2660,221,85,103,34,54],[0,2746,221,86,114,31,43],[0,2833,221,94,104,29,53],[0,2928,221,97,84,32,73],[0,3026,221,81,92,38,64],[0,3108,221,80,90,38,67],[0,3189,221,78,90,38,67],[0,3268,221,73,90,38,67],[0,3342,221,73,89,37,68],[0,3416,221,75,89,37,68],[0,3492,221,76,90,37,67],[0,3569,221,76,91,37,66],[0,3646,221,68,93,38,64],[0,3715,221,68,92,38,64],[0,3784,221,67,89,39,68],[0,3852,221,69,88,38,69],[0,3922,221,71,86,36,71],[0,3994,221,74,83,33,74],[0,0,336,80,79,30,78],[0,81,336,88,75,28,82],[0,170,336,95,69,26,88],[0,266,336,99,66,25,92],[0,366,336,100,65,25,94],[0,467,336,74,92,32,64],[0,542,336,84,79,30,78],[0,627,336,87,76,29,81],[0,715,336,88,77,29,80],[0,804,336,87,79,31,78],[0,892,336,87,80,32,77],[0,980,336,85,81,30,76],[0,1066,336,86,82,29,76],[0,1153,336,90,82,28,76],[0,1244,336,91,81,26,76],[0,1336,336,95,81,21,76],[0,1432,336,97,81,18,76],[0,1530,336,82,84,32,73],[0,1613,336,83,84,32,73],[0,1697,336,84,83,32,74],[0,1782,336,85,81,32,76],[0,1868,336,86,80,32,77],[0,1955,336,87,80,32,77],[0,2043,336,87,80,32,77],[0,2131,336,84,83,33,74],[0,2216,336,79,86,34,71],[0,2296,336,77,88,34,69],[0,2374,336,71,91,36,66],[0,2446,336,68,92,38,64],[0,2515,336,87,80,32,77],[0,2603,336,84,81,32,76],[0,2688,336,84,82,32,75],[0,2773,336,84,81,32,76],[0,2858,336,84,82,32,75],[0,2943,336,84,81,32,76],[0,3028,336,85,105,27,52],[0,3114,336,85,105,27,52],[0,3200,336,115,88,34,69],[0,3316,336,111,89,38,68],[0,3428,336,107,90,39,67],[0,3536,336,123,87,35,70],[0,3660,336,129,86,34,71],[0,3790,336,129,86,34,71],[0,3920,336,97,87,24,70],[0,0,442,109,87,14,70],[0,110,442,103,88,19,69],[0,214,442,97,89,26,68],[0,312,442,90,89,30,68],[0,403,442,88,85,33,72],[0,492,442,86,85,34,72],[0,579,442,82,86,34,71],[0,662,442,79,86,34,71],[0,742,442,83,86,33,71],[0,826,442,88,86,32,71],[0,915,442,83,88,34,69],[0,999,442,75,92,36,65],[0,1075,442,70,92,38,64],[0,1146,442,74,92,32,64],[0,1221,442,74,90,32,67],[0,1296,442,77,89,31,68],[0,1374,442,78,88,31,69],[0,1453,442,78,87,32,70],[0,1532,442,78,87,32,70],[0,1611,442,78,87,32,70],[0,1690,442,78,87,32,70],[0,1769,442,77,88,32,69],[0,1847,442,73,89,34,68],[0,1921,442,70,91,36,66],[0,1992,442,69,91,37,65],[0,2062,442,68,92,38,64],[0,2131,442,83,84,33,73],[0,2215,442,79,85,34,72],[0,2295,442,84,85,34,72],[0,2380,442,85,85,33,72],[0,2466,442,84,85,32,72],[0,2551,442,78,86,32,71],[0,2630,442,77,86,32,71],[0,2708,442,77,86,32,71],[0,2786,442,77,86,32,71],[0,2864,442,77,86,32,71],[0,2942,442,77,86,32,71],[0,3020,442,73,86,34,71],[0,3094,442,70,88,36,69],[0,3165,442,68,90,36,67],[0,3234,442,67,91,37,66],[0,3302,442,67,93,38,64],[0,3370,442,74,92,32,64],[0,3445,442,84,83,30,74],[0,3530,442,87,83,31,74],[0,3618,442,85,83,31,74],[0,3704,442,84,82,31,75],[0,3789,442,85,82,31,75],[0,3875,442,85,82,31,75],[0,3961,442,85,82,31,75],[0,0,536,85,82,31,75],[0,86,536,84,82,31,75],[0,171,536,84,82,31,75],[0,256,536,83,83,32,74],[0,340,536,83,83,32,74],[0,424,536,83,83,32,74],[0,508,536,82,84,32,73],[0,591,536,78,86,33,71],[0,670,536,74,88,34,69],[0,745,536,73,90,35,67],[0,819,536,71,91,36,66],[0,891,536,69,92,37,64],[0,961,536,68,92,38,64],[0,1030,536,74,92,32,64],[0,1105,536,75,88,32,69],[0,1181,536,81,85,30,72],[0,1263,536,83,83,29,74],[0,1347,536,85,82,28,75],[0,1433,536,85,82,28,75],[0,1519,536,85,82,28,75],[0,1605,536,85,82,28,75],[0,1691,536,83,83,29,74],[0,1775,536,78,86,31,71],[0,1854,536,72,90,34,67],[0,1927,536,69,92,37,65],[0,1997,536,68,92,38,64],[0,2066,536,94,81,28,76],[0,2161,536,89,81,28,76],[0,2251,536,95,81,28,76],[0,2347,536,94,82,28,75],[0,2442,536,92,82,28,75],[0,2535,536,88,82,28,75],[0,2624,536,81,82,28,75],[0,2706,536,81,82,28,75],[0,2788,536,82,82,28,75],[0,2871,536,81,82,28,75],[0,2953,536,81,82,28,75],[0,3035,536,80,84,29,73],[0,3116,536,77,86,31,71],[0,3194,536,73,88,33,69],[0,3268,536,70,91,35,66],[0,3339,536,69,92,37,65],[0,3409,536,71,92,35,64],[0,3481,536,86,80,28,77],[0,3568,536,88,79,29,78],[0,3657,536,86,80,29,77],[0,3744,536,79,87,34,70],[0,3824,536,75,90,37,67],[0,3900,536,73,90,38,67],[0,3974,536,73,90,38,67],[0,0,629,73,90,38,67],[0,74,629,74,90,37,67],[0,149,629,75,90,37,67],[0,225,629,76,90,36,67],[0,302,629,75,90,37,67],[0,378,629,75,90,37,67],[0,454,629,73,90,37,67],[0,528,629,72,91,37,66],[0,601,629,70,91,37,66],[0,672,629,70,92,37,65],[0,743,629,68,93,38,64],[0,812,629,68,92,38,64],[0,881,629,68,92,38,64],[0,950,629,74,92,32,64],[0,1025,629,74,92,31,64],[0,1100,629,94,93,18,64],[0,1195,629,87,90,24,67],[0,1283,629,81,116,30,41],[0,1365,629,80,117,31,40],[0,1446,629,80,117,31,40],[0,1527,629,80,117,31,40],[0,1608,629,83,107,27,50],[0,1692,629,93,92,21,65],[0,1786,629,101,93,15,64],[0,1888,629,77,92,28,64],[0,1966,629,68,92,38,64],[0,2035,629,83,109,33,48],[0,2119,629,91,106,34,51],[0,2211,629,86,109,34,48],[0,2298,629,89,104,33,53],[0,2388,629,91,102,32,55],[0,2480,629,91,102,32,55],[0,2572,629,91,102,32,55],[0,2664,629,91,102,32,55],[0,2756,629,91,102,32,55],[0,2848,629,91,102,32,55],[0,2940,629,88,104,32,53],[0,3029,629,79,109,27,48],[0,3109,629,90,91,20,66],[0,3200,629,101,93,15,64],[0,3302,629,88,93,21,64],[0,3391,629,73,92,32,64],[0,3465,629,78,92,28,64],[0,3544,629,92,112,31,45],[0,3637,629,104,110,31,47],[0,3742,629,99,111,31,46],[0,3842,629,139,109,31,48],[0,0,747,142,108,32,49],[0,143,747,141,83,32,74],[0,285,747,141,83,32,74],[0,427,747,141,83,32,74],[0,569,747,141,83,32,74],[0,711,747,141,83,32,74],[0,853,747,141,83,32,74],[0,995,747,141,85,32,72],[0,1137,747,137,86,31,71],[0,1275,747,110,87,26,70],[0,1386,747,95,90,21,67],[0,1482,747,100,93,16,64],[0,1583,747,98,93,16,64],[0,1682,747,95,93,25,64],[0,1778,747,71,92,34,64],[0,1850,747,68,92,38,64],[0,1919,747,74,92,32,64],[0,1994,747,74,92,31,64],[0,2069,747,94,93,18,64],[0,2164,747,81,118,25,39],[0,2246,747,116,97,32,60],[0,2363,747,119,85,33,72],[0,2483,747,119,85,33,72],[0,2603,747,119,85,33,72],[0,2723,747,93,124,29,33],[0,2817,747,90,91,21,66],[0,2908,747,101,93,15,64],[0,3010,747,77,92,28,64],[0,3088,747,68,92,38,64],[0,3157,747,116,81,32,76],[0,3274,747,120,81,33,76],[0,3395,747,118,81,33,76],[0,3514,747,115,82,33,75],[0,3630,747,114,82,33,75],[0,3745,747,113,82,33,75],[0,3859,747,113,82,33,75],[0,3973,747,113,82,33,75],[0,0,872,113,82,33,75],[0,114,872,113,82,33,75],[0,228,872,113,85,33,72],[0,342,872,82,123,27,34],[0,425,872,89,90,20,67],[0,515,872,101,93,15,64],[0,617,872,88,93,21,64],[0,706,872,73,92,32,64],[0,780,872,68,92,38,64],[0,849,872,120,81,32,76],[0,970,872,124,81,33,76],[0,1095,872,124,81,31,76],[0,1220,872,122,120,33,37],[0,1343,872,121,137,34,20],[0,1465,872,96,141,34,16],[0,1562,872,96,141,34,16],[0,1659,872,95,142,34,15],[0,1755,872,94,142,34,15],[0,1850,872,93,142,34,15],[0,1944,872,91,142,35,15],[0,2036,872,90,142,35,15],[0,2127,872,82,142,34,15],[0,2210,872,81,124,29,33],[0,2292,872,91,92,23,65],[0,2384,872,99,93,17,64],[0,2484,872,99,93,16,64],[0,2584,872,80,93,25,64],[0,2665,872,71,92,34,64],[0,2737,872,68,92,38,64],[0,2806,872,97,81,18,76],[0,2904,872,102,81,16,76],[0,3007,872,110,81,12,76],[0,3118,872,115,81,10,76],[0,3234,872,108,81,16,76],[0,3343,872,93,81,28,76],[0,3437,872,86,81,34,76],[0,3524,872,154,82,36,75],[0,3679,872,152,82,37,75],[0,3832,872,140,81,38,76],[0,0,1015,136,81,38,76],[0,137,1015,136,83,38,74],[0,274,1015,136,83,38,74],[0,411,1015,136,83,38,74],[0,548,1015,136,83,38,74],[0,685,1015,136,83,38,74],[0,822,1015,136,83,38,74],[0,959,1015,136,83,38,74],[0,1096,1015,136,83,38,74],[0,1233,1015,136,83,38,74],[0,1370,1015,130,91,35,66],[0,1501,1015,118,103,31,54],[0,1620,1015,113,106,30,51],[0,1734,1015,100,114,30,43],[0,1835,1015,85,120,29,37],[0,1921,1015,93,121,29,36],[0,2015,1015,96,123,30,34],[0,2112,1015,95,123,30,34],[0,2208,1015,85,118,29,39],[0,2294,1015,85,109,28,48],[0,2380,1015,87,102,27,55],[0,2468,1015,88,102,27,55],[0,2557,1015,86,103,27,54],[0,2644,1015,85,105,27,52],[0,2730,1015,136,83,38,74],[0,2867,1015,138,85,35,72],[0,3006,1015,130,87,34,70],[0,3137,1015,129,87,34,70],[0,3267,1015,129,87,34,70],[0,3397,1015,129,87,34,70],[0,3527,1015,103,87,29,70],[0,3631,1015,91,87,23,70],[0,3723,1015,98,87,18,70],[0,3822,1015,106,87,12,70],[0,3929,1015,99,88,16,69],[0,0,1139,86,88,23,69],[0,87,1139,80,89,26,68],[0,168,1139,80,89,28,68],[0,249,1139,82,89,30,68],[0,332,1139,136,83,38,74],[0,469,1139,122,98,33,59],[0,592,1139,100,95,22,62],[0,693,1139,111,79,10,78],[0,805,1139,115,78,5,79],[0,921,1139,110,78,7,79],[0,1032,1139,99,76,13,81],[0,1132,1139,93,75,19,82],[0,1226,1139,91,75,21,82],[0,1318,1139,97,81,18,76],[0,1416,1139,101,82,16,75],[0,1518,1139,106,84,13,73],[0,1625,1139,110,84,11,73],[0,1736,1139,101,85,17,72],[0,1838,1139,88,116,28,41],[0,1927,1139,82,138,34,19],[0,2010,1139,147,138,37,19],[0,2158,1139,146,138,37,19],[0,2305,1139,144,79,37,78],[0,2450,1139,142,78,37,79],[0,2593,1139,143,78,37,79],[0,2737,1139,143,77,37,80],[0,2881,1139,143,77,37,80],[0,3025,1139,143,77,37,80],[0,3169,1139,143,77,37,80],[0,3313,1139,143,77,37,80],[0,3457,1139,143,77,37,80],[0,3601,1139,143,77,37,80],[0,3745,1139,143,77,37,80],[0,3889,1139,120,82,34,75],[0,0,1278,89,87,30,70],[0,90,1278,79,89,30,68],[0,170,1278,80,89,30,68],[0,251,1278,81,89,29,68],[0,333,1278,77,96,29,61],[0,411,1278,77,96,30,61],[0,489,1278,84,100,24,57],[0,574,1278,82,96,28,61],[0,657,1278,85,98,28,59],[0,743,1278,87,101,27,56],[0,831,1278,88,102,27,55],[0,920,1278,86,103,27,54],[0,1007,1278,85,105,27,52],[0,1093,1278,143,77,37,80],[0,1237,1278,134,84,34,73],[0,1372,1278,129,86,34,71],[0,1502,1278,129,87,34,70],[0,1632,1278,129,87,34,70],[0,1762,1278,129,87,34,70],[0,1892,1278,103,87,29,70],[0,1996,1278,91,87,23,70],[0,2088,1278,98,87,18,70],[0,2187,1278,106,87,12,70],[0,2294,1278,99,88,16,69],[0,2394,1278,86,88,23,69],[0,2481,1278,85,89,26,68],[0,2567,1278,84,89,28,68],[0,2652,1278,81,89,30,68],[0,2734,1278,97,81,18,76],[0,2832,1278,101,80,16,77],[0,2934,1278,111,79,11,78],[0,3046,1278,116,78,8,79],[0,3163,1278,107,79,15,78],[0,3271,1278,91,81,28,76],[0,3363,1278,92,82,35,75],[0,3456,1278,130,120,43,37],[0,3587,1278,127,140,46,16],[0,3715,1278,126,140,47,16],[0,3842,1278,71,133,48,17],[0,3914,1278,77,134,48,17],[0,3992,1278,87,134,48,18],[0,0,1419,89,134,48,19],[0,90,1419,90,135,48,19],[0,181,1419,88,138,48,17],[0,270,1419,81,143,47,13],[0,352,1419,71,148,47,10],[0,424,1419,69,148,47,9],[0,494,1419,69,148,47,9],[0,564,1419,73,145,41,12],[0,638,1419,77,140,32,17],[0,716,1419,77,138,30,19],[0,794,1419,76,135,30,22],[0,871,1419,74,131,29,26],[0,946,1419,80,129,29,28],[0,1027,1419,82,126,30,31],[0,1110,1419,81,120,30,37],[0,1192,1419,81,117,29,40],[0,1274,1419,85,108,28,49],[0,1360,1419,87,105,27,52],[0,1448,1419,88,102,27,55],[0,1537,1419,86,103,27,54],[0,1624,1419,85,105,27,52],[0,1710,1419,69,148,47,9],[0,1780,1419,133,94,38,63],[0,1914,1419,131,87,35,70],[0,2046,1419,129,87,34,70],[0,2176,1419,129,87,34,70],[0,2306,1419,129,87,34,70],[0,2436,1419,103,87,29,70],[0,2540,1419,91,87,23,70],[0,2632,1419,98,87,18,70],[0,2731,1419,106,87,12,70],[0,2838,1419,99,88,16,69],[0,2938,1419,86,88,23,69],[0,3025,1419,88,89,26,68],[0,3114,1419,93,89,28,68],[0,3208,1419,92,89,30,68],[0,3301,1419,85,105,27,52],[0,3387,1419,84,112,28,45],[0,3472,1419,82,126,30,31],[0,3555,1419,81,134,31,23],[0,3637,1419,81,136,32,21],[0,3719,1419,109,136,33,21],[0,3829,1419,131,136,34,21],[0,0,1568,147,136,37,21],[0,148,1568,146,119,37,38],[0,295,1568,144,79,37,78],[0,440,1568,142,78,37,79],[0,583,1568,143,80,37,77],[0,727,1568,143,80,37,77],[0,871,1568,143,77,37,80],[0,1015,1568,143,77,37,80],[0,1159,1568,143,77,37,80],[0,1303,1568,143,77,37,80],[0,1447,1568,143,77,37,80],[0,1591,1568,143,77,37,80],[0,1735,1568,143,77,37,80],[0,1879,1568,120,82,34,75],[0,2e3,1568,89,87,30,70],[0,2090,1568,82,89,30,68],[0,2173,1568,81,89,30,68],[0,2255,1568,79,89,29,68],[0,2335,1568,77,92,29,65],[0,2413,1568,77,97,30,60],[0,2491,1568,84,92,24,65],[0,2576,1568,82,90,28,67],[0,2659,1568,85,98,28,59],[0,2745,1568,87,101,27,56],[0,2833,1568,88,102,27,55],[0,2922,1568,86,103,27,54],[0,3009,1568,85,105,27,52],[0,3095,1568,143,77,37,80],[0,3239,1568,134,84,34,73],[0,3374,1568,129,86,34,71],[0,3504,1568,129,87,34,70],[0,3634,1568,129,87,34,70],[0,3764,1568,129,87,34,70],[0,3894,1568,103,87,29,70],[0,3998,1568,91,87,23,70],[0,0,1705,98,87,18,70],[0,99,1705,106,87,12,70],[0,206,1705,99,88,16,69],[0,306,1705,86,88,23,69],[0,393,1705,84,89,26,68],[0,478,1705,82,89,28,68],[0,561,1705,81,89,30,68],[0,643,1705,85,105,27,52],[0,729,1705,86,105,28,52],[0,816,1705,88,106,28,51],[0,905,1705,88,109,29,48],[0,994,1705,87,123,31,34],[0,1082,1705,85,135,34,19],[0,1168,1705,85,140,35,11],[0,1254,1705,147,134,36,13],[0,1402,1705,148,141,36,13],[0,1551,1705,148,76,36,81],[0,1700,1705,148,73,36,84],[0,1849,1705,148,72,36,85],[0,1998,1705,148,73,36,84],[0,2147,1705,148,72,36,85],[0,2296,1705,148,74,36,85],[0,2445,1705,148,72,36,85],[0,2594,1705,148,72,36,85],[0,2743,1705,148,72,36,85],[0,2892,1705,148,72,36,85],[0,3041,1705,148,72,36,85],[0,3190,1705,127,79,33,78],[0,3318,1705,93,87,30,70],[0,3412,1705,83,89,30,68],[0,3496,1705,78,89,30,68],[0,3575,1705,78,89,29,68],[0,3654,1705,74,95,29,62],[0,3729,1705,76,96,30,61],[0,3806,1705,84,100,24,57],[0,3891,1705,83,90,27,67],[0,3975,1705,85,98,28,59],[0,0,1847,87,101,27,56],[0,88,1847,88,102,27,55],[0,177,1847,86,103,27,54],[0,264,1847,85,105,27,52],[0,350,1847,148,72,36,85],[0,499,1847,136,83,34,74],[0,636,1847,130,86,34,71],[0,767,1847,129,87,34,70],[0,897,1847,129,87,34,70],[0,1027,1847,129,87,34,70],[0,1157,1847,103,87,29,70],[0,1261,1847,91,87,23,70],[0,1353,1847,98,87,18,70],[0,1452,1847,106,87,12,70],[0,1559,1847,99,88,16,69],[0,1659,1847,86,88,23,69],[0,1746,1847,81,89,26,68],[0,1828,1847,85,89,28,68],[0,1914,1847,90,89,30,68],[0,2005,1847,85,105,27,52],[0,2091,1847,85,101,27,56],[0,2177,1847,93,100,19,57],[0,2271,1847,94,100,19,57],[0,2366,1847,97,89,18,68],[0,2464,1847,88,81,29,76],[0,2553,1847,89,81,29,76],[0,2643,1847,154,82,36,75],[0,2798,1847,152,82,37,75],[0,2951,1847,139,81,38,76],[0,3091,1847,136,84,38,73],[0,3228,1847,133,82,38,75],[0,3362,1847,133,82,38,75],[0,3496,1847,133,82,38,75],[0,3630,1847,133,82,38,75],[0,3764,1847,133,82,38,75],[0,3898,1847,133,82,38,75],[0,0,1953,133,82,38,75],[0,134,1953,133,82,38,75],[0,268,1953,133,82,38,75],[0,402,1953,127,90,35,67],[0,530,1953,116,103,31,54],[0,647,1953,112,108,30,49],[0,760,1953,99,115,30,42],[0,860,1953,84,120,29,37],[0,945,1953,86,121,29,36],[0,1032,1953,90,123,30,34],[0,1123,1953,91,123,30,34],[0,1215,1953,87,118,29,39],[0,1303,1953,85,109,28,48],[0,1389,1953,87,102,27,55],[0,1477,1953,88,102,27,55],[0,1566,1953,86,103,27,54],[0,1653,1953,85,105,27,52],[0,1739,1953,133,82,38,75],[0,1873,1953,138,85,35,72],[0,2012,1953,131,87,34,70],[0,2144,1953,129,87,34,70],[0,2274,1953,129,87,34,70],[0,2404,1953,129,87,34,70],[0,2534,1953,103,87,29,70],[0,2638,1953,91,87,23,70],[0,2730,1953,98,87,18,70],[0,2829,1953,106,87,12,70],[0,2936,1953,99,88,16,69],[0,3036,1953,86,88,23,69],[0,3123,1953,80,89,26,68],[0,3204,1953,81,89,28,68],[0,3286,1953,85,89,30,68],[0,3372,1953,133,82,38,75],[0,3506,1953,120,99,33,58],[0,3627,1953,100,95,22,62],[0,3728,1953,111,79,10,78],[0,3840,1953,115,78,5,79],[0,3956,1953,110,78,7,79],[0,0,2077,99,76,13,81],[0,100,2077,93,75,19,82],[0,194,2077,91,75,21,82],[0,286,2077,85,105,27,52],[0,372,2077,85,114,27,43],[0,458,2077,101,114,27,43],[0,560,2077,113,114,26,43],[0,674,2077,120,82,28,75],[0,795,2077,133,81,31,76],[0,929,2077,141,81,33,76],[0,1071,2077,168,79,40,77],[0,1240,2077,161,79,41,77],[0,1402,2077,162,78,41,78],[0,1565,2077,158,79,41,77],[0,1724,2077,159,82,41,74],[0,1884,2077,159,81,41,75],[0,2044,2077,159,78,41,78],[0,2204,2077,159,78,41,78],[0,2364,2077,159,78,41,78],[0,2524,2077,159,78,41,78],[0,2684,2077,159,78,41,78],[0,2844,2077,159,78,41,78],[0,3004,2077,159,78,41,78],[0,3164,2077,152,83,36,74],[0,3317,2077,135,88,31,69],[0,3453,2077,131,91,30,66],[0,3585,2077,116,103,30,54],[0,3702,2077,100,114,29,43],[0,3803,2077,94,117,29,40],[0,3898,2077,79,121,30,36],[0,3978,2077,78,123,30,34],[0,0,2201,81,120,29,37],[0,82,2201,85,110,28,47],[0,168,2201,87,105,27,52],[0,256,2201,88,102,27,55],[0,345,2201,86,103,27,54],[0,432,2201,85,105,27,52],[0,518,2201,159,78,41,78],[0,678,2201,141,85,36,72],[0,820,2201,131,87,34,70],[0,952,2201,129,87,34,70],[0,1082,2201,129,87,34,70],[0,1212,2201,129,87,34,70],[0,1342,2201,103,87,29,70],[0,1446,2201,91,87,23,70],[0,1538,2201,98,87,18,70],[0,1637,2201,106,87,12,70],[0,1744,2201,99,88,16,69],[0,1844,2201,86,88,23,69],[0,1931,2201,80,89,26,68],[0,2012,2201,80,89,28,68],[0,2093,2201,85,89,30,68],[0,2179,2201,159,78,41,78],[0,2339,2201,153,78,35,78],[0,2493,2201,108,79,23,78],[0,2602,2201,113,78,10,79],[0,2716,2201,115,78,5,79],[0,2832,2201,110,78,7,79],[0,2943,2201,99,76,13,81],[0,3043,2201,93,75,19,82],[0,3137,2201,91,75,21,82],[0,3229,2201,85,105,27,52],[0,3315,2201,86,99,27,58],[0,3402,2201,92,98,23,59],[0,3495,2201,93,98,23,59],[0,3589,2201,94,85,23,73],[0,3684,2201,97,72,23,85],[0,3782,2201,91,72,30,85],[0,3874,2201,154,71,34,86],[0,0,2322,152,72,35,85],[0,153,2322,140,72,35,85],[0,294,2322,137,72,35,85],[0,432,2322,135,72,35,85],[0,568,2322,135,72,35,85],[0,704,2322,135,72,35,85],[0,840,2322,135,72,35,85],[0,976,2322,135,72,35,85],[0,1112,2322,135,72,35,85],[0,1248,2322,135,72,35,85],[0,1384,2322,135,72,35,85],[0,1520,2322,135,72,35,85],[0,1656,2322,127,78,33,79],[0,1784,2322,112,94,30,63],[0,1897,2322,107,99,30,58],[0,2005,2322,93,107,30,50],[0,2099,2322,84,113,29,44],[0,2184,2322,81,114,29,43],[0,2266,2322,79,117,30,40],[0,2346,2322,78,118,30,39],[0,2425,2322,81,115,29,42],[0,2507,2322,85,107,28,50],[0,2593,2322,87,103,27,54],[0,2681,2322,88,102,27,55],[0,2770,2322,86,103,27,54],[0,2857,2322,85,105,27,52],[0,2943,2322,135,72,35,85],[0,3079,2322,140,83,34,74],[0,3220,2322,131,86,34,71],[0,3352,2322,129,87,34,70],[0,3482,2322,129,87,34,70],[0,3612,2322,129,87,34,70],[0,3742,2322,103,87,29,70],[0,3846,2322,91,87,23,70],[0,3938,2322,98,87,18,70],[0,0,2441,106,87,12,70],[0,107,2441,99,88,16,69],[0,207,2441,86,88,23,69],[0,294,2441,85,89,26,68],[0,380,2441,85,89,28,68],[0,466,2441,85,89,30,68],[0,552,2441,85,105,27,52],[0,638,2441,85,101,28,56],[0,724,2441,87,100,29,57],[0,812,2441,88,100,29,57],[0,901,2441,87,79,31,78],[0,989,2441,97,81,33,76],[0,1087,2441,119,82,35,75],[0,1207,2441,124,120,43,37],[0,1332,2441,121,140,46,16],[0,1454,2441,120,135,47,16],[0,1575,2441,71,133,48,17],[0,1647,2441,77,134,48,17],[0,1725,2441,87,134,48,18],[0,1813,2441,89,134,48,19],[0,1903,2441,87,135,48,19],[0,1991,2441,88,138,48,17],[0,2080,2441,82,143,47,13],[0,2163,2441,71,148,47,10],[0,2235,2441,69,148,47,9],[0,2305,2441,69,148,47,9],[0,2375,2441,73,145,41,12],[0,2449,2441,77,140,32,17],[0,2527,2441,77,138,30,19],[0,2605,2441,76,135,30,22],[0,2682,2441,74,131,29,26],[0,2757,2441,80,129,29,28],[0,2838,2441,82,126,30,31],[0,2921,2441,81,120,30,37],[0,3003,2441,81,117,29,40],[0,3085,2441,85,108,28,49],[0,3171,2441,87,105,27,52],[0,3259,2441,88,102,27,55],[0,3348,2441,86,103,27,54],[0,3435,2441,85,105,27,52],[0,3521,2441,69,148,47,9],[0,3591,2441,133,94,38,63],[0,3725,2441,131,87,35,70],[0,3857,2441,129,87,34,70],[0,0,2590,129,87,34,70],[0,130,2590,129,87,34,70],[0,260,2590,103,87,29,70],[0,364,2590,91,87,23,70],[0,456,2590,98,87,18,70],[0,555,2590,106,87,12,70],[0,662,2590,99,88,16,69],[0,762,2590,86,88,23,69],[0,849,2590,88,89,26,68],[0,938,2590,93,89,28,68],[0,1032,2590,92,89,30,68],[0,1125,2590,85,105,27,52],[0,1211,2590,85,101,27,56],[0,1297,2590,93,100,19,57],[0,1391,2590,94,100,19,57],[0,1486,2590,97,89,18,68],[0,1584,2590,88,81,29,76],[0,1673,2590,89,81,29,76],[0,1763,2590,154,82,36,75],[0,1918,2590,151,81,38,76],[0,2070,2590,133,82,38,75],[0,2204,2590,150,83,38,74],[0,2355,2590,137,82,37,75],[0,2493,2590,138,81,36,75],[0,2632,2590,131,83,35,74],[0,2764,2590,103,84,35,73],[0,2868,2590,94,84,24,73],[0,2963,2590,96,84,21,73],[0,3060,2590,99,83,16,74],[0,3160,2590,101,83,13,74],[0,3262,2590,98,82,17,75],[0,3361,2590,99,82,20,75],[0,3461,2590,102,81,20,76],[0,3564,2590,121,79,36,78],[0,3686,2590,155,77,40,79],[0,3842,2590,155,78,41,79],[0,0,2696,137,80,41,77],[0,138,2696,139,83,41,74],[0,278,2696,139,83,41,74],[0,418,2696,139,83,41,74],[0,558,2696,139,83,41,74],[0,698,2696,139,83,41,74],[0,838,2696,139,83,41,74],[0,978,2696,132,91,36,66],[0,1111,2696,118,104,31,53],[0,1230,2696,112,108,30,49],[0,1343,2696,99,115,30,42],[0,1443,2696,84,120,29,37],[0,1528,2696,84,121,29,36],[0,1613,2696,80,123,30,34],[0,1694,2696,78,123,30,34],[0,1773,2696,81,118,29,39],[0,1855,2696,85,109,28,48],[0,1941,2696,87,102,27,55],[0,2029,2696,88,102,27,55],[0,2118,2696,86,103,27,54],[0,2205,2696,85,105,27,52],[0,2291,2696,139,83,41,74],[0,2431,2696,139,84,36,73],[0,2571,2696,131,86,34,71],[0,2703,2696,129,87,34,70],[0,2833,2696,129,87,34,70],[0,2963,2696,129,87,34,70],[0,3093,2696,103,87,29,70],[0,3197,2696,91,87,23,70],[0,3289,2696,98,87,18,70],[0,3388,2696,106,87,12,70],[0,3495,2696,99,88,16,69],[0,3595,2696,86,88,23,69],[0,3682,2696,80,89,26,68],[0,3763,2696,82,89,28,68],[0,3846,2696,80,89,30,68],[0,3927,2696,139,83,41,74],[0,0,2820,123,97,35,60],[0,124,2820,102,95,23,62],[0,227,2820,112,78,10,79],[0,340,2820,115,78,5,79],[0,456,2820,110,78,7,79],[0,567,2820,99,76,13,81],[0,667,2820,93,75,19,82],[0,761,2820,91,75,21,82],[0,853,2820,85,105,27,52],[0,939,2820,84,113,28,44],[0,1024,2820,83,123,29,34],[0,1108,2820,82,128,30,29],[0,1191,2820,82,133,31,24],[0,1274,2820,83,136,32,21],[0,1358,2820,93,134,33,23],[0,1452,2820,148,130,37,27],[0,1601,2820,147,130,37,27],[0,1749,2820,143,109,37,48],[0,1893,2820,142,113,37,44],[0,2036,2820,141,115,37,42],[0,2178,2820,141,115,37,42],[0,2320,2820,141,115,37,42],[0,2462,2820,141,115,37,42],[0,2604,2820,141,115,37,42],[0,2746,2820,141,115,37,42],[0,2888,2820,141,115,37,42],[0,3030,2820,141,115,37,42],[0,3172,2820,141,115,37,42],[0,3314,2820,141,115,37,42],[0,3456,2820,141,115,37,42],[0,3598,2820,141,115,37,42],[0,3740,2820,141,115,37,42],[0,3882,2820,141,115,37,42],[0,0,2957,141,115,37,42],[0,142,2957,120,112,34,45],[0,263,2957,99,107,31,50],[0,363,2957,98,105,30,52],[0,462,2957,94,95,30,62],[0,557,2957,88,89,29,68],[0,646,2957,91,92,29,65],[0,738,2957,90,92,30,65],[0,829,2957,97,90,24,67],[0,927,2957,91,93,28,64],[0,1019,2957,85,99,28,58],[0,1105,2957,87,101,27,56],[0,1193,2957,88,102,27,55],[0,1282,2957,86,103,27,54],[0,1369,2957,85,105,27,52],[0,1455,2957,141,115,37,42],[0,1597,2957,133,85,35,72],[0,1731,2957,129,86,34,71],[0,1861,2957,129,87,34,70],[0,1991,2957,129,87,34,70],[0,2121,2957,129,87,34,70],[0,2251,2957,103,87,29,70],[0,2355,2957,91,87,23,70],[0,2447,2957,98,87,18,70],[0,2546,2957,106,87,12,70],[0,2653,2957,99,88,16,69],[0,2753,2957,86,88,23,69],[0,2840,2957,83,89,26,68],[0,2924,2957,85,89,28,68],[0,3010,2957,85,89,30,68],[0,3096,2957,85,105,27,52],[0,3182,2957,84,113,28,44],[0,3267,2957,83,123,29,34],[0,3351,2957,82,128,30,29],[0,3434,2957,82,134,31,23],[0,3517,2957,103,135,32,22],[0,3621,2957,121,135,33,22],[0,3743,2957,141,135,37,22],[0,3885,2957,141,126,37,31],[0,0,3093,141,110,37,47],[0,142,3093,89,89,38,68],[0,232,3093,91,85,38,73],[0,324,3093,91,83,38,75],[0,416,3093,91,83,38,75],[0,508,3093,91,83,38,75],[0,600,3093,91,83,38,75],[0,692,3093,91,83,38,75],[0,784,3093,91,83,38,75],[0,876,3093,91,83,38,75],[0,968,3093,91,83,38,75],[0,1060,3093,91,83,38,75],[0,1152,3093,91,83,38,75],[0,1244,3093,91,83,38,75],[0,1336,3093,91,83,38,75],[0,1428,3093,91,83,38,75],[0,1520,3093,91,83,38,75],[0,1612,3093,85,90,34,67],[0,1698,3093,84,99,30,58],[0,1783,3093,90,100,25,57],[0,1874,3093,97,97,17,60],[0,1972,3093,102,90,10,67],[0,2075,3093,98,94,10,63],[0,2174,3093,91,99,15,58],[0,2266,3093,84,101,24,56],[0,2351,3093,81,98,29,59],[0,2433,3093,85,103,28,54],[0,2519,3093,87,102,27,55],[0,2607,3093,88,102,27,55],[0,2696,3093,86,103,27,54],[0,2783,3093,85,105,27,52],[0,2869,3093,91,83,38,75],[0,2961,3093,93,84,35,73],[0,3055,3093,126,86,34,71],[0,3182,3093,129,86,34,71],[0,3312,3093,129,86,34,71],[0,3442,3093,129,86,34,71],[0,3572,3093,103,86,29,71],[0,3676,3093,91,86,23,71],[0,3768,3093,98,87,18,70],[0,3867,3093,106,87,12,70],[0,3974,3093,99,88,16,69],[0,0,3204,86,88,23,69],[0,87,3204,88,89,26,68],[0,176,3204,92,89,28,68],[0,269,3204,88,89,30,68],[0,358,3204,85,105,27,52],[0,444,3204,85,101,28,56],[0,530,3204,87,100,29,57],[0,618,3204,88,100,29,57],[0,707,3204,87,79,31,78],[0,795,3204,97,81,33,76],[0,893,3204,119,82,35,75],[0,1013,3204,125,111,43,46],[0,1139,3204,122,137,46,20],[0,1262,3204,121,137,47,18],[0,1384,3204,71,136,48,18],[0,1456,3204,81,133,44,18],[0,1538,3204,100,119,35,20],[0,1639,3204,108,102,34,25],[0,1748,3204,115,96,37,26],[0,1864,3204,105,88,52,27],[0,1970,3204,97,104,63,24],[0,2068,3204,91,108,71,27],[0,2160,3204,96,103,66,46],[0,2257,3204,106,95,56,63],[0,2364,3204,98,86,55,72],[0,2463,3204,97,90,42,71],[0,2561,3204,96,94,34,63],[0,2658,3204,95,106,34,52],[0,2754,3204,100,118,34,39],[0,2855,3204,150,119,34,39],[0,3006,3204,148,118,36,39],[0,3155,3204,147,93,36,64],[0,3303,3204,147,77,36,80],[0,3451,3204,147,72,36,85],[0,3599,3204,147,72,36,85],[0,3747,3204,147,72,36,85],[0,3895,3204,125,79,33,78],[0,0,3342,91,87,30,70],[0,92,3342,84,89,30,68],[0,177,3342,78,89,30,68],[0,256,3342,74,89,29,68],[0,331,3342,74,90,29,67],[0,406,3342,76,94,30,63],[0,483,3342,84,93,24,64],[0,568,3342,82,92,28,65],[0,651,3342,85,99,28,58],[0,737,3342,87,101,27,56],[0,825,3342,88,102,27,55],[0,914,3342,86,103,27,54],[0,1001,3342,85,105,27,52],[0,1087,3342,147,72,36,85],[0,1235,3342,135,83,34,74],[0,1371,3342,129,86,34,71],[0,1501,3342,129,87,34,70],[0,1631,3342,129,87,34,70],[0,1761,3342,132,87,31,70],[0,1894,3342,103,87,29,70],[0,1998,3342,91,87,23,70],[0,2090,3342,98,89,18,68],[0,2189,3342,106,92,12,65],[0,2296,3342,99,93,16,64],[0,2396,3342,86,92,23,65],[0,2483,3342,90,89,26,68],[0,2574,3342,93,89,28,68],[0,2668,3342,90,89,30,68],[0,2759,3342,85,105,27,52],[0,2845,3342,85,101,28,56],[0,2931,3342,87,100,29,57],[0,3019,3342,88,100,29,57],[0,3108,3342,87,79,31,78],[0,3196,3342,97,81,33,76],[0,3294,3342,119,82,35,75],[0,3414,3342,124,120,43,37],[0,3539,3342,121,140,46,16],[0,3661,3342,119,134,48,16],[0,3781,3342,71,133,48,17],[0,3853,3342,81,134,48,17],[0,3935,3342,90,133,48,18],[0,0,3483,89,134,48,18],[0,90,3483,93,139,43,15],[0,184,3483,139,143,39,15],[0,324,3483,146,142,37,15],[0,471,3483,143,87,37,70],[0,615,3483,143,77,37,80],[0,759,3483,143,77,37,80],[0,903,3483,143,77,37,80],[0,1047,3483,143,77,37,80],[0,1191,3483,143,77,37,80],[0,1335,3483,143,77,37,80],[0,1479,3483,143,77,37,80],[0,1623,3483,143,77,37,80],[0,1767,3483,120,82,34,75],[0,1888,3483,89,87,30,70],[0,1978,3483,82,89,30,68],[0,2061,3483,81,89,30,68],[0,2143,3483,79,89,29,68],[0,2223,3483,77,92,29,65],[0,2301,3483,77,97,30,60],[0,2379,3483,84,92,24,65],[0,2464,3483,82,90,28,67],[0,2547,3483,85,98,28,59],[0,2633,3483,87,101,27,56],[0,2721,3483,88,102,27,55],[0,2810,3483,86,103,27,54],[0,2897,3483,85,105,27,52],[0,2983,3483,143,77,37,80],[0,3127,3483,134,84,34,73],[0,3262,3483,129,86,34,71],[0,3392,3483,129,87,34,70],[0,3522,3483,129,87,34,70],[0,3652,3483,129,87,34,70],[0,3782,3483,103,87,29,70],[0,3886,3483,91,87,23,70],[0,3978,3483,98,87,18,70],[0,0,3627,106,87,12,70],[0,107,3627,99,88,16,69],[0,207,3627,86,88,23,69],[0,294,3627,84,89,26,68],[0,379,3627,82,89,28,68],[0,462,3627,81,89,30,68],[0,544,3627,85,105,27,52],[0,630,3627,86,99,27,58],[0,717,3627,92,98,23,59],[0,810,3627,93,98,23,59],[0,904,3627,94,85,23,73],[0,999,3627,97,72,23,85],[0,1097,3627,91,72,30,85],[0,1189,3627,154,71,34,86],[0,1344,3627,152,72,35,85],[0,1497,3627,136,72,35,85],[0,1634,3627,151,72,35,85],[0,1786,3627,139,72,34,85],[0,1926,3627,141,73,32,86],[0,2068,3627,142,74,31,86],[0,2211,3627,127,73,30,85],[0,2339,3627,91,73,28,84],[0,2431,3627,97,73,23,85],[0,2529,3627,99,71,23,86],[0,2629,3627,115,70,25,87],[0,2745,3627,157,70,38,87],[0,2903,3627,156,71,38,86],[0,3060,3627,137,71,39,86],[0,3198,3627,136,73,39,84],[0,3335,3627,135,77,39,80],[0,3471,3627,135,77,39,80],[0,3607,3627,135,73,39,84],[0,3743,3627,135,74,39,85],[0,3879,3627,135,72,39,85],[0,0,3733,135,72,39,85],[0,136,3733,128,78,35,79],[0,265,3733,112,93,30,64],[0,378,3733,107,99,30,58],[0,486,3733,93,107,30,50],[0,580,3733,84,113,29,44],[0,665,3733,75,114,29,43],[0,741,3733,76,117,30,40],[0,818,3733,78,118,30,39],[0,897,3733,81,115,29,42],[0,979,3733,85,107,28,50],[0,1065,3733,87,103,27,54],[0,1153,3733,88,102,27,55],[0,1242,3733,86,103,27,54],[0,1329,3733,85,105,27,52],[0,1415,3733,135,72,39,85],[0,1551,3733,140,82,35,75],[0,1692,3733,131,86,34,71],[0,1824,3733,129,87,34,70],[0,1954,3733,129,87,34,70],[0,2084,3733,129,87,34,70],[0,2214,3733,103,87,29,70],[0,2318,3733,91,87,23,70],[0,2410,3733,98,87,18,70],[0,2509,3733,106,87,12,70],[0,2616,3733,99,88,16,69],[0,2716,3733,86,88,23,69],[0,2803,3733,80,89,26,68],[0,2884,3733,86,89,28,68],[0,2971,3733,91,89,30,68],[0,3063,3733,85,105,27,52],[0,3149,3733,85,101,27,56],[0,3235,3733,93,100,19,57],[0,3329,3733,94,100,19,57],[0,3424,3733,97,89,18,68],[0,3522,3733,88,81,29,76],[0,3611,3733,89,81,29,76],[0,3701,3733,154,82,36,75],[0,3856,3733,151,81,38,76],[0,0,3852,136,84,38,73],[0,137,3852,137,81,38,76],[0,275,3852,141,79,37,78],[0,417,3852,136,77,36,80],[0,554,3852,130,76,35,81],[0,685,3852,139,82,37,75],[0,825,3852,133,99,41,58],[0,959,3852,129,138,45,19],[0,1089,3852,127,147,47,10],[0,1217,3852,69,148,47,9],[0,1287,3852,69,148,47,9],[0,1357,3852,69,148,47,9],[0,1427,3852,69,148,47,9],[0,1497,3852,73,148,43,9],[0,1571,3852,71,148,45,9],[0,1643,3852,69,148,47,9],[0,1713,3852,69,148,47,9],[0,1783,3852,73,145,41,12],[0,1857,3852,79,140,32,17],[0,1937,3852,85,138,30,19],[0,2023,3852,84,135,30,22],[0,2108,3852,83,131,29,26],[0,2192,3852,84,129,29,28],[0,2277,3852,84,126,30,31],[0,2362,3852,82,120,30,37],[0,2445,3852,81,117,29,40],[0,2527,3852,85,108,28,49],[0,2613,3852,87,105,27,52],[0,2701,3852,88,102,27,55],[0,2790,3852,86,103,27,54],[0,2877,3852,85,105,27,52],[0,2963,3852,69,148,47,9],[0,3033,3852,133,89,38,68],[0,3167,3852,131,87,35,70],[0,3299,3852,129,87,34,70],[0,3429,3852,129,87,34,70],[0,3559,3852,129,87,34,70],[0,3689,3852,103,87,29,70],[0,3793,3852,91,87,23,70],[0,3885,3852,98,87,18,70],[0,3984,3852,106,87,12,70],[0,0,4001,99,88,16,69],[0,100,4001,86,88,23,69],[0,187,4001,86,89,26,68],[0,274,4001,88,89,28,68],[0,363,4001,90,89,30,68],[1,0,0,69,148,47,9],[1,70,0,76,133,40,24],[1,147,0,89,93,26,64],[1,237,0,108,81,11,76],[1,346,0,115,78,5,79],[1,462,0,110,78,7,79],[1,573,0,99,76,13,81],[1,673,0,93,75,19,82],[1,767,0,91,75,21,82],[1,859,0,85,105,27,52],[1,945,0,88,94,24,63],[1,1034,0,96,80,16,77],[1,1131,0,109,79,8,78],[1,1241,0,115,78,5,79],[1,1357,0,110,78,7,79],[1,1468,0,99,76,13,81],[1,1568,0,93,75,19,82],[1,1662,0,91,75,21,82],[1,1754,0,91,75,21,82],[1,1846,0,91,74,21,83],[1,1938,0,92,75,20,82],[1,2031,0,96,75,17,82],[1,2128,0,109,75,11,82],[1,2238,0,118,75,8,82],[1,2357,0,111,75,15,82],[1,2469,0,100,75,27,81],[1,2570,0,93,75,34,81],[1,2664,0,159,77,40,79],[1,2824,0,158,76,40,80],[1,2983,0,156,76,40,80],[1,3140,0,154,78,40,78],[1,3295,0,152,80,41,76],[1,3448,0,151,80,41,76],[1,3600,0,151,80,41,76],[1,3752,0,151,80,41,76],[1,3904,0,151,80,41,76],[1,0,149,151,80,41,76],[1,152,149,151,80,41,76],[1,304,149,151,80,41,76],[1,456,149,151,80,41,76],[1,608,149,151,80,41,76],[1,760,149,151,80,41,76],[1,912,149,151,80,41,76],[1,1064,149,143,84,35,73],[1,1208,149,131,87,34,70],[1,1340,149,129,87,34,70],[1,1470,149,129,87,34,70],[1,1600,149,129,87,34,70],[1,1730,149,103,87,29,70],[1,1834,149,91,87,23,70],[1,1926,149,98,87,18,70],[1,2025,149,106,87,12,70],[1,2132,149,99,88,16,69],[1,2232,149,86,88,23,69],[1,2319,149,90,89,26,68],[1,2410,149,92,89,28,68],[1,2503,149,84,89,30,68],[1,2588,149,147,86,37,71],[1,2736,149,145,81,37,76],[1,2882,149,143,78,37,79],[1,3026,149,142,77,37,80],[1,3169,149,145,79,37,78],[1,3315,149,145,82,38,75],[1,3461,149,140,86,39,72],[1,3602,149,127,99,41,58],[1,3730,149,110,120,43,37],[1,3841,149,117,120,36,37],[1,3959,149,114,143,38,14],[1,0,293,70,147,47,10],[1,71,293,69,148,47,9],[1,141,293,72,148,46,9],[1,214,293,96,148,43,9],[1,311,293,123,148,41,9],[1,435,293,141,145,39,12],[1,577,293,147,131,37,26],[1,725,293,147,86,37,71],[1,873,293,144,80,37,77],[1,1018,293,143,78,37,79],[1,1162,293,144,77,37,80],[1,1307,293,148,77,37,80],[1,1456,293,152,77,38,79],[1,1609,293,155,77,38,79],[1,1765,293,158,77,39,79],[1,1924,293,159,77,40,79],[1,2084,293,117,120,36,37],[1,2202,293,114,145,38,12],[1,2317,293,105,148,47,9],[1,2423,293,71,148,46,9],[1,2495,293,84,140,44,17],[1,2580,293,111,126,42,31],[1,2692,293,134,105,41,52],[1,2827,293,150,81,40,76],[1,2978,293,159,77,40,79],[1,3138,293,159,77,40,79],[1,3298,293,158,76,40,80],[1,3457,293,156,76,40,80],[1,3614,293,154,78,40,78],[1,3769,293,152,80,41,76],[1,3922,293,151,80,41,76],[1,0,442,151,80,41,76],[1,152,442,151,80,41,76],[1,304,442,151,80,41,76],[1,456,442,151,80,41,76],[1,608,442,151,80,41,76],[1,760,442,151,80,41,76],[1,912,442,151,80,41,76],[1,1064,442,151,80,41,76],[1,1216,442,151,80,41,76],[1,1368,442,151,80,41,76],[1,1520,442,143,84,35,73],[1,1664,442,131,87,34,70],[1,1796,442,129,87,34,70],[1,1926,442,129,87,34,70],[1,2056,442,129,87,34,70],[1,2186,442,103,87,29,70],[1,2290,442,91,87,23,70],[1,2382,442,98,87,18,70],[1,2481,442,106,87,12,70],[1,2588,442,99,88,16,69],[1,2688,442,86,88,23,69],[1,2775,442,90,89,26,68],[1,2866,442,92,89,28,68],[1,2959,442,84,89,30,68],[1,3044,442,91,75,21,82],[1,3136,442,92,76,21,81],[1,3229,442,93,80,21,77],[1,3323,442,100,83,22,74],[1,3424,442,96,84,23,73],[1,3521,442,83,87,27,70],[1,3605,442,74,90,32,67],[1,3680,442,68,92,36,65],[1,3749,442,68,92,38,64],[1,3818,442,89,80,30,77],[1,3908,442,93,80,26,77],[1,0,535,109,80,17,77],[1,110,535,117,79,13,77],[1,228,535,111,79,18,78],[1,340,535,96,80,29,77],[1,437,535,91,79,35,78],[1,529,535,155,79,37,78],[1,685,535,155,94,37,63],[1,841,535,139,102,38,54],[1,981,535,154,127,37,30],[1,1136,535,134,129,36,28],[1,1271,535,134,129,35,28],[1,1406,535,99,129,34,28],[1,1506,535,87,109,34,48],[1,1594,535,100,83,38,74],[1,1695,535,136,87,42,70],[1,1832,535,137,127,41,30],[1,1970,535,138,140,40,18],[1,2109,535,92,140,44,18],[1,2202,535,90,140,46,18],[1,2293,535,90,140,46,18],[1,2384,535,127,92,41,66],[1,2512,535,132,87,35,70],[1,2645,535,129,87,34,70],[1,2775,535,129,87,34,70],[1,2905,535,123,87,33,70],[1,3029,535,90,87,24,70],[1,3120,535,97,87,19,70],[1,3218,535,106,87,12,70],[1,3325,535,93,90,22,67],[1,3419,535,78,92,33,64],[1,3498,535,74,92,35,64],[1,3573,535,74,92,38,64],[1,3648,535,89,80,30,77],[1,3738,535,94,80,26,77],[1,3833,535,102,80,22,77],[1,3936,535,117,79,13,77],[1,0,676,132,112,30,43],[1,133,676,127,117,35,38],[1,261,676,105,117,57,38],[1,367,676,103,98,57,38],[1,471,676,96,115,65,39],[1,568,676,100,93,55,64],[1,669,676,92,85,55,72],[1,762,676,94,88,39,69],[1,857,676,96,93,34,64],[1,954,676,92,113,36,46],[1,1047,676,127,116,36,41],[1,1175,676,149,116,36,41],[1,1325,676,147,94,36,63],[1,1473,676,147,90,36,67],[1,1621,676,147,72,36,85],[1,1769,676,147,72,36,85],[1,1917,676,147,72,36,85],[1,2065,676,134,83,34,74],[1,2200,676,129,86,34,71],[1,2330,676,129,87,34,70],[1,2460,676,129,87,34,70],[1,2590,676,127,87,30,70],[1,2718,676,91,87,25,70],[1,2810,676,93,87,21,70],[1,2904,676,105,87,13,70],[1,3010,676,101,88,16,69],[1,3112,676,87,91,26,66],[1,3200,676,76,92,34,64],[1,3277,676,71,92,36,64],[1,3349,676,68,92,38,64],[1,3418,676,89,80,30,77],[1,3508,676,93,80,26,77],[1,3602,676,109,80,17,77],[1,3712,676,117,79,13,77],[1,3830,676,111,77,18,80],[1,3942,676,98,71,28,86],[1,0,794,93,68,33,89],[1,94,794,158,67,35,92],[1,253,794,158,68,35,91],[1,412,794,147,68,36,90],[1,560,794,137,78,36,80],[1,698,794,132,130,41,27],[1,831,794,127,146,45,11],[1,959,794,85,148,46,8],[1,1045,794,92,148,46,7],[1,1138,794,101,146,47,7],[1,1240,794,97,146,47,5],[1,1338,794,87,146,47,6],[1,1426,794,88,143,44,13],[1,1515,794,89,139,41,19],[1,1605,794,85,135,40,22],[1,1691,794,81,135,40,22],[1,1773,794,114,111,37,46],[1,1888,794,133,87,35,70],[1,2022,794,129,87,34,70],[1,2152,794,129,87,34,70],[1,2282,794,123,87,33,70],[1,2406,794,90,87,24,70],[1,2497,794,97,87,19,70],[1,2595,794,106,87,12,70],[1,2702,794,93,90,22,67],[1,2796,794,78,92,33,64],[1,2875,794,70,92,35,64],[1,2946,794,68,92,38,64]],fo={buttons:[{defend:`<amber>Parry</amber> amber glints · level counter`,attack:`Level cut`},{defend:`High counter, after a perfect dodge`,attack:`High cut`},{defend:`<red>Jump</red> red hits · low counter`,attack:`Low cut`},{defend:`<teal>Dodge</teal> back · with → roll through`,attack:``}],yourTurn:`Your first cut dashes you in. Chain up to {maxChain} cuts in any order: press each
        as her blade settles (a click). On the beat is perfect; too early or late ends your turn.`,finisher:{keys:`{iaiAfterPerfects} perfect links, then hold {key:J}`,note:`She sheathes; release on the flash. Ignores armour. It waits for the rest of the chain: use it when you like.`},sunderMeter:`Parries fill it (a perfect one most), and so does each perfect link of your own; a hit drains some.
        Full, choose a part and press {key:U} (LB on a gamepad; {key:L} works too) in place of a chain: she cuts {sunderCuts} times. Press
        {key:I} {key:J} or {key:K} on each white flash. Every cut ignores armour; a missed one is weak, but the strike goes on.`,onItsTurn:`<amber>A beam from its eye</amber> is parried like any amber hit, but it burns on: keep {key:J} held until it ends. Let go and it lands.
        With the Sunder meter full, {key:U} (LB on a gamepad) is the <gold>Sunder break</gold>: it cuts the Warden's sequence short for about half the strike's damage. {key:J} and {key:L} pressed together do the same.
        Between its attacks, {key:↑} {key:↓} step through its attacks to pick the next one, for practice.`},po=or,mo=80*er+21*po,ho=2*mo+.9,go=e=>e*e*(3-2*e);function _o(e){if(gr(e))return 0;let{tick:t,doneAt:n}=e.player;return n>=0&&t>=n-14?1-go(Math.min(1,(t-(n-14))/14)):go(Math.min(1,t/16))}function vo(e,t,n){let{actionTick:r}=e.hero,i=_r(e),a=0,o=1;if(i===`dodge`)a=-(Math.sin(r/t.moves.dodge.duration*Math.PI)*1.1);else if(i===`roll`)a=Math.sin(r/t.moves.roll.duration*Math.PI)*1.6;else if(i===`counter`){let{counterTicks:e,counterStrikeTick:i}=t.tuning,o=i+(e-i)*.5,s=r<i?go(r/i):r<o?1:1-go((r-o)/(e-o));a=(n-mo-ir.x)*Math.max(0,Math.min(1,s))}else if(i===`hurt`)a=-((1-r/t.tuning.hurtTicks)*.35);else if(i===`strike`&&e.turn===`player`){let r=n-mo,i=Ya(e,t);i?(a=(r-ir.x)*i.reach+ho*i.across,o=i.facing):a=(r-ir.x)*_o(e)}else if(i===`riposte`&&e.boss.phase===`riposte`||i===`interrupt`&&e.boss.phase===`interrupt`){let r=n-mo,o=e.boss.tick,{riposteStrikeTick:s,riposteTicks:c,sunderBreakCutTicks:l,sunderBreakTicks:u}=t.tuning,[d,f,p]=i===`riposte`?[s,s,c]:[l[0]??1,l[l.length-1]??1,u],m=f+12,h=o<d?go(o/d):o<m?1:1-go((o-m)/(p-m));a=(r-ir.x)*Math.max(0,Math.min(1,h))}return{dx:a,facing:o}}function yo(e){let t=_r(e);return t===`riposte`&&e.boss.phase===`riposte`||t===`interrupt`||t===`strike`||t===`dodge`||t===`roll`||t===`counter`}var bo=/^(?:tripleDraw|crosscut|risingMoon|twinFang|fallingLeaf|swallowTurn|sunderFinish)/;function xo(e,t){let n=t.tuning,r=/^(dodge|roll|jump)[AB]$/.exec(e);if(r?.[1])return t.moves[r[1]].duration;let{windowEnd:i,duration:a}=t.moves.parry,o=n.riposteSlashTicks,s=n.riposteTicks-n.riposteStrikeTick,c=Math.max(1,Math.floor((n.riposteStrikeTick-(o[0]??0))/o.length));switch(e){case`idle`:return 150;case`hurt`:return n.hurtTicks;case`down`:return 30;case`dashIn`:return 16;case`dashBack`:return 14;case`dashStart`:return 4;case`dashStop`:return 6;case`dash`:return 8;case`drop`:case`iaiMiss`:return 14;case`iaiCoil`:case`iaiHold`:return 8;case`iaiCut`:return 16;case`iaiCutIn`:return n.freezeIai;case`riposteDown`:case`riposteRise`:case`riposteDownEnd`:case`riposteRiseEnd`:return c;case`riposteFinish`:return Math.floor(s*.45);case`riposteFinishNoto`:return s-Math.floor(s*.45)}if(e.startsWith(`parryRaise`))return 3;if(e.startsWith(`parryLower`))return Math.max(1,a-i);if(e.startsWith(`strain`))return 4;if(e.startsWith(`deflect`))return Math.max(1,n.deflectTicks-1);if(e.endsWith(`Coil`))return 8;if(e.endsWith(`In`))return e.startsWith(`counter`)?n.freezeCounter:n.freezePerfectCut;if(e.endsWith(`Flow`))return Math.max(1,n.linkBeat-10);if(e.endsWith(`Noto`))return Math.max(1,n.strikeRecoverTicks-14-10);if(e.startsWith(`counter`))return Math.max(1,n.counterTicks-1-n.counterStrikeTick);if(bo.test(e))return 20;if(/^(?:open|cut)/.test(e))return 10}var So={id:`seraine`,portraitFile:`sprites/portrait.png`,words:fo,frames:uo,sheets:lo,sheetFile:e=>`sprites/hero-${e}.png`,originX:oi.originX,originY:oi.originY,shot:no,frameIndex:co,lift:oo,place:vo,clipSounds:ao,dashing:yo,guard:{x:21,y:86},hilt:{x:6,y:54},clipGroups:Object.fromEntries(Object.entries(Ea).map(([e,t])=>[e,t.map(e=>e.name)])),clipFrames:e=>Da(e).frames,clipTicks:xo,shotOfFrame:so};G.Parry,G.Dodge,G.Jump,G.Level,G.High,G.Low;function Co(e,t){return{frame:0,previousInput:0,rng:e,outcome:`fighting`,freeze:0,slowmo:0,buffered:0,turn:`player`,player:y(`choose`,`piston`),sunder:0,hero:{action:`idle`,actionTick:0,hp:t.tuning.heroHp,moves:0},boss:{phase:`lull`,tick:0,attack:-1,nextAttack:-1,lullLength:t.tuning.bossTurnLullTicks,delays:[],results:[],sequencesLeft:0,turnNumber:0,staggered:0},parts:r(t),counter:null,events:[]}}var wo=2e3,To=G.Parry|G.Dodge|G.Jump|G.Counter;function Eo(e){return e===`parry`||e===`dodge`||e===`roll`||e===`jump`}function Do(e,t,n){if(e.action!==t)return!1;let r=n.moves[t];return e.actionTick>=r.windowStart&&e.actionTick<r.windowEnd}function Oo(e,t){if(Do(e,`parry`,t))return e.actionTick<t.moves.parry.perfectEnd?`perfect`:`normal`}function ko(e,t,n){if(e.action===`counter`)return{how:`counter`,perfect:!1};for(let t of[`dodge`,`roll`])if(Do(e,t,n))return{how:t,perfect:e.actionTick<n.moves[t].perfectEnd};if(t===`red`&&Do(e,`jump`,n))return{how:`jump`,perfect:!1}}function Ao(e,t){if(e.action!==`jump`)return 0;let{windowStart:n,windowEnd:r}=t.moves.jump,i=e.actionTick-n,a=r-n;return i<=0||i>=a?0:Math.floor(4*wo*i*(a-i)/(a*a))}function jo(e,t){if(Eo(e))return t.moves[e].duration;if(e===`deflect`)return t.tuning.deflectTicks;if(e===`hurt`)return t.tuning.hurtTicks;if(e===`counter`)return t.tuning.counterTicks}function Mo(e){return e===`idle`||e===`deflect`}var No=G.High|G.Level|G.Low;function Po(e){return Mo(e)||e===`dodge`||e===`roll`}function Fo(e,t,n,r,i,a){let o=e;if(e.action!==`idle`){let t=e.actionTick+1,n=jo(e.action,a);o=n===void 0||t<n?{...e,actionTick:t}:{...e,action:`idle`,actionTick:0}}if(r&&Fr(t,No)&&Po(o.action))return{...o,action:`counter`,actionTick:0,moves:o.moves+1};if(!Mo(o.action))return o;let s;return Fr(t,G.Parry)?s=`parry`:Fr(t,G.Dodge)?s=Fr(n,G.Right)?`roll`:`dodge`:Fr(t,G.Jump)&&(s=`jump`),s?(i.push({type:`move`,move:s}),{...o,action:s,actionTick:0,moves:o.moves+1}):o}function Io(e){let t=e+1831565813|0,n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,{value:(n^n>>>14)>>>0,seed:t}}function Lo(e,t){let n=Io(e);return{value:n.value%t,seed:n.seed}}function Ro(e,t,n){let r=zo(e,t,n);return r.outcome===`victory`&&e.outcome===`fighting`?{...r,freeze:Math.max(r.freeze,n.tuning.freezeVictory)}:r}function zo(e,t,n){let r=Ir(t,e.previousInput),i=e.frame+1;if(e.outcome!==`fighting`)return Fr(r,G.Confirm)&&e.freeze===0?{...Co(e.rng,n),frame:i,previousInput:t,events:[{type:`restart`}]}:{...e,frame:i,previousInput:t,freeze:Math.max(0,e.freeze-1),events:[]};if(e.freeze>0)return{...e,frame:i,previousInput:t,freeze:e.freeze-1,buffered:e.buffered|r&Uo,events:[]};let a=r|e.buffered,o=[];if(e.turn===`player`){let r={...e,frame:i,previousInput:t,buffered:0,events:o};return Qr(r,a,t,n),r}if(Kr(e,a,t,n)){let r={...e,frame:i,previousInput:t,buffered:0,events:o};return qr(r,n),r}let s=e.slowmo%2==0,c={...e,frame:i,previousInput:t,buffered:s?0:a&Nr,slowmo:Math.max(0,e.slowmo-1),hero:Fo(e.hero,a,t,Vo(e),o,n),events:o};if(c.counter&&c.hero.action===`counter`&&e.hero.action!==`counter`){let e=Fr(a,G.Level)?`level`:Fr(a,G.Low)?`low`:`high`;c.counter={...c.counter,style:e}}return Ho(c,n),s&&Go(c,a,t,n),Bo(c,n),c}function Bo(e,t){let n=t.tuning;if(e.slowmo<=n.slowmoTailTicks||e.boss.phase!==`attack`)return;let r=Gt(e.boss,t);r&&r.ticksUntil<=n.glintLead+n.slowmoTailTicks&&g(e,t)}function Vo(e){return e.counter!==null&&e.counter.ticksLeft>0&&e.counter.style===null}function Ho(e,t){let n=t.tuning,r=e.counter;if(!r)return;if(r.ticksLeft===0){e.hero.action!==`counter`&&(e.counter=null);return}if(e.hero.action===`counter`){if(e.hero.actionTick!==n.counterStrikeTick)return;let i=r.strong?n.rollCounterDamage:n.counterDamage;e.freeze=n.freezeCounter;let a=v(e,r.part,i,t);e.events.push({type:`counter`,style:r.style??`high`,strong:r.strong,damage:a,part:r.part}),e.counter={...r,ticksLeft:0},a>0&&e.parts[r.part]<=0&&e.outcome===`fighting`&&e.boss.phase===`attack`&&Ko(e,t,n.counterTicks-n.counterStrikeTick);return}let i=r.ticksLeft-1;e.counter=i>0?{...r,ticksLeft:i}:null}var Uo=To|G.Break|Nr|Pr,Wo=[[G.Down,1],[G.Up,-1]];function Go(e,n,r,i){let a=i.tuning,o=e.boss,s=o.tick+1;if(o.phase===`lull`){if(o.sequencesLeft<=0){s>=o.lullLength?b(e):e.boss={...o,tick:s};return}let{nextAttack:t,lullLength:r}=o,c=p(i,h(e));for(let[e,i]of Wo)Fr(n,e)&&c.length!==0&&(t=m(c,t,i),r=s+a.practiceLullTicks);s>=r?qo(e,t,i):e.boss={...o,tick:s,nextAttack:t,lullLength:r};return}if(o.phase===`interrupt`){e.boss={...o,tick:s},Jr(e,s,i)&&e.outcome===`fighting`&&Ko(e,i);return}if(o.phase===`riposte`){if(e.boss={...o,tick:s},a.riposteSlashTicks.forEach((t,n)=>{s===t&&e.events.push({type:`riposteSlash`,index:n})}),s===a.riposteStrikeTick){let n=i.attacks[o.attack],r=n?.beats[n.beats.length-1],s=t(r?.limb??`body`),c=o.results.filter(e=>e===`perfectParry`).length,l=a.riposteDamage+c*a.riposteDamagePerPerfect;e.freeze=a.freezeRiposteHit;let u=v(e,s,l,i);if(e.events.push({type:`riposteHit`,damage:u,part:s}),e.outcome!==`fighting`)return}s>=a.riposteTicks&&Ko(e,i);return}let c=i.attacks[o.attack];c&&(e.boss={...o,tick:s},Jo(e,c,r,i),e.boss.phase===`attack`&&s>=Ht(c,e.boss.delays,i)&&Ko(e,i))}function Ko(e,t,n=0){(e.hero.action===`riposte`||e.hero.action===`interrupt`)&&(e.hero={...e.hero,action:`idle`,actionTick:0}),e.boss.sequencesLeft>1?(g(e,t),e.boss={...e.boss,phase:`lull`,tick:0,nextAttack:-1,lullLength:t.tuning.lullTicks,sequencesLeft:e.boss.sequencesLeft-1}):n>0?(g(e,t),e.boss={...e.boss,phase:`lull`,tick:0,nextAttack:-1,lullLength:n,sequencesLeft:0}):b(e)}function qo(e,t,n){let r=f(n,h(e)),i=e.rng,o=t;if(!r.includes(o)){let t=r.length>1?r.filter(t=>t!==e.boss.attack):r,n=Lo(i,Math.max(1,t.length));o=t[n.value]??r[0]??0,i=n.seed}let s=n.attacks[o],c=a(e.parts)*n.tuning.enrageHoldCut,l=s.beats.map(e=>{let t=e.delays[0]??0;if(e.delays.length>1){let n=Lo(i,e.delays.length);i=n.seed,t=e.delays[n.value]??0}return t-Math.min(c,e.hold+t)});e.rng=i,e.boss={...e.boss,phase:`attack`,tick:0,attack:o,nextAttack:-1,delays:l,results:s.beats.map(e=>e.kind===`feint`?`feint`:`pending`)}}function Jo(e,t,n,r){let i=r.tuning,{tick:a,delays:o}=e.boss,s=Bt(t,o);t.beats.forEach((c,l)=>{let u=s[l]??0,{limb:d,motion:f}=c;f!==`shockwave`&&a===Vt(c,u,o[l]??0,r)&&e.events.push({type:`windup`,limb:d,motion:f}),c.kind===`hit`&&(a===u-i.glintLead&&e.events.push({type:`glint`,colour:c.colour,limb:d,motion:f}),a===u-i.strikeTicks&&e.events.push({type:`strike`,limb:d,motion:f}),a>=u&&a<u+c.active&&(c.motion===`beam`?Zo(e,t,l,c,u,n,r):Xo(e,t,l,c,u,r)))})}function Yo(e,t,n){let r=e.boss.results.slice();r[t]=n,e.boss={...e.boss,results:r}}function Xo(e,n,r,i,a,o){let s=o.tuning;if(e.outcome!==`fighting`||e.boss.phase!==`attack`)return;let c=e.boss.results[r],l=e.hero,{tick:u}=e.boss;if(c===`pending`&&u===a&&i.colour===`amber`){let t=Oo(l,o);if(t){let a=t===`perfect`;if(Yo(e,r,a?`perfectParry`:`parried`),e.hero={...l,action:`deflect`,actionTick:0},e.freeze=a?s.freezePerfectParry:s.freezeParry,g(e,o),e.events.push({type:`parry`,perfect:a,limb:i.limb,motion:i.motion}),Rr(e,a?s.sunderPerfectParry:s.sunderParry,o),a&&Qo(e,i,o))return;r===n.beats.length-1&&ns(e,o);return}}if(c!==`pending`&&c!==`evading`&&c!==`evadingPerfect`)return;let d=ko(l,i.colour,o);if(!d){es(e,r,i,o);return}let f=c===`pending`?d.perfect:c===`evadingPerfect`,p=i.motion===`shockwave`&&(d.how===`dodge`||d.how===`roll`);if(u<a+i.active-1&&!p){Yo(e,r,f?`evadingPerfect`:`evading`);return}let m=l.action===`jump`;Yo(e,r,m?`jumped`:f?`perfectDodge`:`dodged`);let h=m?`jump`:l.action===`roll`?`roll`:`dodge`;e.events.push({type:`evade`,how:h,perfect:f,motion:i.motion}),g(e,o),f&&(e.slowmo=s.slowmoMaxTicks,e.counter={part:t(i.limb),strong:h===`roll`,ticksLeft:s.counterWindowTicks,style:null})}function Zo(e,t,n,r,i,a,o){let s=o.tuning;if(e.outcome!==`fighting`||e.boss.phase!==`attack`)return;let c=e.boss.results[n],l=e.hero,{tick:u}=e.boss;if(c===`pending`){if(u!==i)return;let t=Oo(l,o);if(!t){es(e,n,r,o);return}let a=t===`perfect`;Yo(e,n,a?`holdingPerfect`:`holding`),e.hero={...l,action:`brace`,actionTick:0},e.freeze=s.freezeBeamCatch,g(e,o),e.events.push({type:`beamCatch`,perfect:a});return}if(c!==`holding`&&c!==`holdingPerfect`)return;if(!Fr(a,G.Parry)||l.action!==`brace`){e.events.push({type:`beamBreak`}),es(e,n,r,o);return}if(u<i+r.active-1)return;let d=c===`holdingPerfect`;Yo(e,n,d?`perfectParry`:`parried`),e.hero={...l,action:`deflect`,actionTick:0},e.freeze=d?s.freezePerfectParry:s.freezeParry,e.events.push({type:`parry`,perfect:d,limb:r.limb,motion:r.motion}),Rr(e,d?s.sunderPerfectParry:s.sunderParry,o),d&&Qo(e,r,o)||n===t.beats.length-1&&ns(e,o)}function Qo(e,n,r){if(!e.answering)return!1;e.answering=!1;let i=t(n.limb);e.freeze=Math.max(e.freeze,r.tuning.freezeCounter);let a=v(e,i,r.hero.answerDamage,r);return e.events.push({type:`wardAnswer`,damage:a,part:i}),!(a>0&&e.parts[i]<=0)||e.outcome!==`fighting`?e.outcome!==`fighting`:(Ko(e,r),!0)}function $o(e,t,n){let r=n.hero,i=e.hero,{windowEnd:a}=n.moves.parry,o=r.wardLateTicks>0&&t.colour===`amber`&&i.action===`parry`&&i.actionTick>=a&&i.actionTick<a+r.wardLateTicks?Math.floor(t.damage*r.wardLatePercent/100):0;return e.blessed&&=(o+=Math.floor((t.damage-o)*r.blessingPercent/100),!1),o}function es(e,t,n,r){let i=r.tuning;Yo(e,t,`landed`),g(e,r);let a=$o(e,n,r),o=n.damage-a,s=Math.max(0,e.hero.hp-o);e.events.push({type:`hurt`,damage:o,motion:n.motion,...a>0?{blocked:a}:{}}),zr(e,i.sunderHurt),s>0?(e.hero={...e.hero,action:`hurt`,actionTick:0,hp:s},e.freeze=i.freezeHurt):(e.hero={...e.hero,action:`down`,actionTick:0,hp:s},e.outcome=`down`,e.freeze=i.freezeDown,e.slowmo=0,e.events.push({type:`down`}))}function ts(e,t){return e.beats.every((e,n)=>{let r=t[n];return e.kind===`feint`?!0:e.colour===`amber`?r===`parried`||r===`perfectParry`:r===`dodged`||r===`perfectDodge`||r===`jumped`})}function ns(e,t){let n=t.tuning,r=t.attacks[e.boss.attack];if(!r||!ts(r,e.boss.results))return;let i=e.boss.results.filter(e=>e===`perfectParry`).length;e.freeze=n.freezeFlashCounter,e.slowmo=0,e.hero={...e.hero,action:`riposte`,actionTick:0},e.boss={...e.boss,phase:`riposte`,tick:0},e.events.push({type:`flashCounter`,perfects:i})}var rs=`sunder-replay`;function is(e){let t=[];for(let n of e){let e=t[t.length-1];e&&e[0]===n?e[1]++:t.push([n,1])}return t}function as(e){return JSON.stringify(e)}var os={light:!0,hits:!0,sound:!0};function ss(e,t){return t?e:os}G.High,G.Level,G.Low;var cs=new Map([[`KeyW`,G.Up],[`KeyS`,G.Down],[`KeyA`,G.Left],[`KeyD`,G.Right],[`ArrowUp`,G.Up],[`ArrowDown`,G.Down],[`ArrowLeft`,G.Left],[`ArrowRight`,G.Right],[`KeyJ`,G.West],[`KeyI`,G.North],[`KeyK`,G.South],[`KeyL`,G.East],[`KeyU`,G.Shoulder],[`Space`,G.South],[`Enter`,G.South]]),ls=new Set([`INPUT`,`TEXTAREA`,`SELECT`]);function us(e){let t=e?.tagName;return typeof t==`string`&&ls.has(t)}function ds(e){let t=new Set,n=0,r=0,i=0,a=0,o=()=>{t.clear(),n=0,a=0},s=e=>{if(us(e.target))return;let{code:s,repeat:c,ctrlKey:l,metaKey:u,altKey:d}=e;if(l||u||d){u&&o();return}let f=cs.get(s);f!==void 0&&(t.add(s),c||(r&i&f?a|=f:n|=f),e.preventDefault())},c=e=>{let{code:n}=e;t.delete(n),i|=cs.get(n)??0};return e.addEventListener(`keydown`,s),e.addEventListener(`keyup`,c),e.addEventListener(`blur`,o),{sample(){let e=n;for(let n of t)e|=cs.get(n)??0;return e&=~a,n=a,a=0,i=0,r=e,e},dispose(){e.removeEventListener(`keydown`,s),e.removeEventListener(`keyup`,c),e.removeEventListener(`blur`,o)}}}G.Up,G.Down,G.Left,G.Right,G.Up|G.Left,G.Up|G.Right,G.Down|G.Left,G.Down|G.Right;function fs(e){let t=document.createElement(`div`);t.dataset.testid=`toast`,Object.assign(t.style,{position:`fixed`,top:`12px`,left:`50%`,transform:`translateX(-50%)`,padding:`6px 12px`,background:`rgba(3, 12, 16, 0.92)`,border:`1px solid #2f5960`,color:`#e9f4f1`,font:`13px/1.3 ui-monospace, monospace`,opacity:`0`,transition:`opacity 300ms`,pointerEvents:`none`,zIndex:`30`}),e.appendChild(t);let n;return e=>{t.textContent=e,t.style.opacity=`1`,clearTimeout(n),n=setTimeout(()=>{t.style.opacity=`0`},2600)}}function ps(e){let t=e=>String(e).padStart(2,`0`);return`sunder-replay-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`}-${`${t(e.getHours())}${t(e.getMinutes())}${t(e.getSeconds())}`}.json`}function ms(e){let t=ps(new Date(e.savedAt)),n=URL.createObjectURL(new Blob([as(e)],{type:`application/json`})),r=document.createElement(`a`);return r.href=n,r.download=t,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3),t}function hs(e,t,n){let r=Ut(e,t);if(!r)return`none`;let i=Bt(r,e.delays),{glintLead:a,glintTicks:o,strikeTicks:s}=t.tuning,c=`none`,l={none:0,windup:1,feint:1,strike:2,"glint-amber":3,"glint-red":3,"active-amber":4,"active-red":4},u=e=>{l[e]>l[c]&&(c=e)};return r.beats.forEach((r,c)=>{let l=i[c]??0,d=e.delays[c]??0;if(r.motion!==`shockwave`){let e=Vt(r,l,d,t),i=r.kind===`feint`?l-s+14:l-s;n>=e&&n<i&&u(r.kind===`feint`?`feint`:`windup`)}if(r.kind!==`hit`)return;let f=l-a;n>=f&&n<f+o&&u(`glint-${r.colour}`),n>=l-s&&n<l&&u(`strike`),n>=l&&n<l+r.active&&u(`active-${r.colour}`)}),c}function gs(e,t,n){let{action:r}=e;if(r!==`parry`&&r!==`dodge`&&r!==`jump`)return`none`;let i=t.moves[r];return n>=i.duration?`none`:n>=i.windowStart&&n<i.perfectEnd?`perfect`:n>=i.windowStart&&n<i.windowEnd?`window`:`recovery`}function _s(e,t,n){let r=e.player;if(e.turn!==`player`||r.step===`choose`||r.doneAt>=0)return`none`;let i=t.tuning;if(r.step===`sunder`){let e=i.sunderCutTicks[r.sunderCuts.length];if(e===void 0)return`none`;let t=Math.abs(n-e);return t<=i.sunderPerfect?`perfect`:t<=i.sunderGood?`window`:`none`}if(r.drawSince>=0)return Math.abs(n-(r.drawSince+i.iaiDrawTicks))<=i.iaiPerfect?`perfect`:`none`;if(r.beat<0)return`none`;let a=Math.abs(n-r.beat);return a<=i.linkPerfect?`perfect`:a<=i.linkGood?`window`:`none`}function vs(e,t,n){if(e.turn===`player`){let r=_s(e,t,n);return{hero:r,move:r===`none`?`none`:`cut`}}let r=gs(e.hero,t,n);return{hero:r,move:r===`none`?`none`:ys(e.hero)}}function ys(e){return e.action===`parry`||e.action===`dodge`||e.action===`jump`?e.action:`none`}function bs(e){let t;for(let n of e){if(n.type===`flashCounter`)return`flash`;n.type===`parry`&&(t=n.perfect?`perfect`:`parry`),n.type===`evade`&&(t=n.how===`jump`?`jump`:n.perfect?`perfect-dodge`:`dodge`),n.type===`hurt`&&(t=`hit`),n.type===`cut`&&(t=n.quality===`perfect`?`perfect`:`parry`),n.type===`iai`&&(t=n.perfect?`flash`:`parry`),n.type===`chainDrop`&&(t=`hit`),n.type===`counter`&&(t=`perfect`),n.type===`beamCatch`&&(t=n.perfect?`perfect`:`parry`),n.type===`interruptCut`&&(t=`flash`),n.type===`sunderCut`&&(t=n.quality===`perfect`?`perfect`:n.quality===`good`?`parry`:`hit`)}return t}function xs(e=60,t=120){let n=[];return{record(t,r){let i=bs(t.events),a=t.turn===`player`?t.player.tick:t.hero.actionTick;n.push({boss:hs(t.boss,r,t.boss.tick),...vs(t,r,a),...i?{marker:i}:{}}),n.length>e+1&&n.shift()},reset(){n.length=0},columns(e,r){let i=n.map((e,t)=>({...e,offset:t-(n.length-1)})),a=e.freeze,o=e.slowmo,s=e.boss.tick,c=e.turn===`player`?e.player.tick:e.hero.actionTick;for(let n=1;n<=t;n++)a>0?a--:(o%2==0&&s++,o=Math.max(0,o-1),c++),i.push({offset:n,boss:hs(e.boss,r,s),...vs(e,r,c)});return i}}}var Ss=1e3;function Cs(e,t,n,r){let i=e+Math.max(0,t)*n,a=Math.min(Math.floor(i/Ss),r),o=i-a*Ss;return{ticks:a,budget:o>=Ss?0:o}}function ws(e){let t=e.requestFrame??(e=>requestAnimationFrame(e)),n=e.cancelFrame??(e=>cancelAnimationFrame(e)),r=0,i,a=!1,o=t(s);function s(n){if(a)return;o=t(s);let c=i===void 0?0:n-i;i=n;let l=Cs(r,c,e.tickRate,5);r=l.budget;for(let t=0;t<l.ticks;t++)e.tick();e.render(n)}return()=>{a=!0,n(o)}}var Ts=[[0,G.South],[1,G.East],[2,G.West],[3,G.North],[5,G.Parry],[4,G.Shoulder],[12,G.Up],[13,G.Down],[14,G.Left],[15,G.Right]],Es=.5;function Ds(e){if(e.mapping!==`standard`)return 0;let t=0;for(let[n,r]of Ts)e.buttons[n]?.pressed&&(t|=r);let[n=0,r=0]=e.axes;return n<-.5&&(t|=G.Left),n>Es&&(t|=G.Right),r<-.5&&(t|=G.Up),r>Es&&(t|=G.Down),t}var Os=8,ks=9;function As(e=()=>navigator.getGamepads()){return{rightStickY(){let t=0;for(let n of e()){if(n?.mapping!==`standard`)continue;let e=n.axes[3]??0;Math.abs(e)>Math.abs(t)&&(t=e)}return t},status(){let t=e().filter(e=>e!==null);return t.length===0?`none`:t.some(e=>e.mapping===`standard`)?`ready`:`unknown`},sample(){let t=0;for(let n of e())n&&(t|=Ds(n));return t},backHeld(){return e().some(e=>e?.mapping===`standard`&&e.buttons[Os]?.pressed)},startHeld(){return e().some(e=>e?.mapping===`standard`&&e.buttons[ks]?.pressed)}}}function js(e,t){let n=(Object.hasOwn(e,t)?e[t]:void 0)??e.seraine??Object.values(e)[0];if(!n)throw Error(`no figures to show`);return n}var Ms=`sunder.trial.pass`,Ns=e=>e.trim().toLowerCase().replace(/\s+/g,` `);async function Ps(e,t){let n=new TextEncoder().encode(`${e}:${Ns(t)}`),r=await crypto.subtle.digest(`SHA-256`,n);return[...new Uint8Array(r)].map(e=>e.toString(16).padStart(2,`0`)).join(``)}var Fs=`
.gate { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center;
  background: #05060a; color: #eef2f6;
  font: 700 16px/1.3 "Bahnschrift", "DIN Alternate", "Arial Narrow", "Segoe UI", sans-serif;
  font-stretch: 85%; letter-spacing: 0.06em; }
.gate form { display: flex; flex-direction: column; align-items: center; gap: 14px;
  width: min(420px, 86vw); }
.gate .word { font-size: 64px; font-style: italic; font-weight: 900; line-height: 1;
  letter-spacing: 0.32em; text-indent: 0.32em; color: #fff; text-shadow: 3px 3px 0 #ffb347; }
.gate .sub { font-size: 13px; letter-spacing: 0.42em; text-transform: uppercase; color: #e9cf8f; }
.gate label { margin-top: 18px; font-size: 14px; font-weight: 500; color: #b4bccb; }
.gate input { width: 100%; box-sizing: border-box; padding: 10px 14px; text-align: center;
  font: inherit; font-size: 18px; letter-spacing: 0.14em; color: #fff;
  background: #0b0d14; border: 1px solid #8a7440; outline: none; }
.gate input:focus { border-color: #e9cf8f; box-shadow: 0 0 12px rgba(233, 207, 143, 0.35); }
.gate button { padding: 8px 28px; font: inherit; font-size: 14px; letter-spacing: 0.22em;
  text-transform: uppercase; color: #e9cf8f; background: #1b1f2c; border: 1px solid #8a7440;
  cursor: pointer; }
.gate .wrong { min-height: 1.3em; font-size: 13px; font-weight: 500; color: #ff7a7a; }
`;async function Is(e,t){if(!t)return;try{if(localStorage.getItem(`sunder.trial.pass`)===t.hash)return}catch{}let n=document.createElement(`style`);n.textContent=Fs,document.head.appendChild(n);let r=document.createElement(`div`);r.className=`gate`,r.dataset.testid=`gate`;let i=document.createElement(`form`),a=document.createElement(`div`);a.className=`word`,a.textContent=`SUNDER`;let o=document.createElement(`div`);o.className=`sub`,o.textContent=`Trial build`;let s=document.createElement(`label`);s.htmlFor=`gate-pass`,s.textContent=`Enter the passcode to play`;let c=document.createElement(`input`);c.id=`gate-pass`,c.dataset.testid=`gate-pass`,c.type=`text`,c.autocomplete=`off`,c.spellcheck=!1;let l=document.createElement(`button`);l.type=`submit`,l.textContent=`Enter`;let u=document.createElement(`div`);u.className=`wrong`,u.dataset.testid=`gate-wrong`,i.append(a,o,s,c,l,u),r.append(i),e.appendChild(r),c.focus(),await new Promise(e=>{i.addEventListener(`submit`,n=>{n.preventDefault(),Ps(t.salt,c.value).then(n=>{if(n!==t.hash)u.textContent=`That isn't it. Check with whoever sent you the link.`,c.select();else{try{localStorage.setItem(Ms,n)}catch{}e()}})})}),r.remove(),n.remove()}var Ls={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Rs=e=>String(e).replace(/[&<>"']/g,e=>Ls[e]??e),zs=e=>`<span class="key">${Rs(e)}</span>`;function Bs(e,t){return Rs(e).replace(/&#39;/g,`'`).replace(/&lt;(amber|red|teal|gold)&gt;/g,`<span class="$1">`).replace(/&lt;\/(amber|red|teal|gold)&gt;/g,`</span>`).replace(/\{key:([^}]*)\}/g,(e,t)=>`<span class="key">${t}</span>`).replace(/\{(maxChain|iaiAfterPerfects|finisher|sunderCuts)\}/g,(e,n)=>Rs(t[n]))}var Vs=`sunder.guide.seen`,Hs=`
.guide { position: fixed; inset: 0; display: grid; place-items: center; z-index: 40;
  background: radial-gradient(ellipse at center, rgba(5, 6, 10, 0.78), rgba(5, 6, 10, 0.93));
  pointer-events: none; color: #dfe4ee;
  font: 500 15px/1.5 "Bahnschrift", "DIN Alternate", "Arial Narrow", "Segoe UI", sans-serif; }
.guide[hidden] { display: none; }
/* The menu has outgrown a small window: it scrolls there, so its last lines can be reached. */
.guide .card { max-height: calc(100vh - 28px); overflow-y: auto; pointer-events: auto;
  scrollbar-width: thin; scrollbar-color: #8a7440 #0b0d14; }
.guide .card { position: relative; width: min(880px, 92vw); padding: 26px 34px 22px;
  background: linear-gradient(#141722, #0b0d14); border: 1px solid #05060a;
  box-shadow: 0 0 0 1px #8a7440, 0 0 0 5px #0b0d14, 0 0 0 6px #4a3c22,
    0 24px 60px rgba(0, 0, 0, 0.7);
  animation: guide-open 220ms cubic-bezier(0.2, 0.9, 0.3, 1); }
/* Gold corners, like the plates of the Warden's armour. */
.guide .card::before, .guide .card::after { content: ""; position: absolute; width: 22px;
  height: 22px; border: 2px solid #cdb26c; }
.guide .card::before { left: -7px; top: -7px; border-right: 0; border-bottom: 0; }
.guide .card::after { right: -7px; bottom: -7px; border-left: 0; border-top: 0; }
.guide h2 { display: flex; align-items: center; gap: 16px; margin: 0 0 14px; font-size: 22px;
  font-style: italic; font-weight: 800; letter-spacing: 0.34em; color: #e9cf8f; }
.guide h2::before, .guide h2::after { content: ""; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, #8a7440 40%, #cdb26c); }
.guide h2::after { transform: scaleX(-1); }
.guide h2 small { font-size: 12px; font-style: normal; font-weight: 500; letter-spacing: 0.14em;
  color: #8e96a8; }
.guide h3 { margin: 18px 0 6px; padding-bottom: 4px; font-size: 13px; font-weight: 700;
  letter-spacing: 0.3em; color: #e9cf8f; border-bottom: 1px solid #2c3040; }
.guide table { border-collapse: collapse; width: 100%; }
.guide td, .guide th { padding: 5px 14px 5px 0; text-align: left; vertical-align: middle; }
.guide th { font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
  color: #8e96a8; }
.guide tr + tr td { border-top: 1px solid #1c1f2b; }
.guide .keys { white-space: nowrap; }
/* A key cap: a raised, slanted plate. */
.guide .key { display: inline-block; min-width: 1.5em; margin-right: 4px; padding: 1px 8px;
  transform: skewX(-12deg); text-align: center; font-weight: 800; color: #ffffff;
  background: linear-gradient(#3a3f52, #23263a); border: 1px solid #05060a;
  box-shadow: 0 0 0 1px #6c7384, 0 3px 0 #05060a; }
.guide .pad { margin-left: 4px; font-size: 12px; letter-spacing: 0.1em; color: #8e96a8; }
.guide .amber { color: #ffc463; }
.guide .red { color: #ff7a7a; }
.guide .teal { color: #9af7e8; }
.guide .gold { color: #ffe7a6; font-weight: 700; font-style: italic; letter-spacing: 0.06em; }
.guide .note { color: #b4bccb; }
.guide .foot { display: flex; flex-wrap: wrap; gap: 6px 22px; margin-top: 18px;
  padding-top: 12px; border-top: 1px solid #2c3040; font-size: 13px; color: #8e96a8; }
@keyframes guide-open { 0% { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1); opacity: 1; } }
`,Us=e=>e[0]?.toUpperCase()+e.slice(1);function Ws(e){let t=[];e.extraCuts>0&&t.push(`the chain may run ${e.extraCuts} cut longer`),e.staggers>0&&t.push(`staggers it: its next turn is a sequence shorter`),e.heal>0&&t.push(`gives back ${e.heal} HP`),e.piercesArmour&&t.push(`ignores armour`),e.armsPercent>100&&t.push(`much heavier on an arm`),e.armsPercent<100&&t.push(`heaviest on the open heart`),e.blesses&&t.push(`the next blow that lands on him does half`),e.answers&&t.push(`his next perfect ward this boss turn hits back at once`),e.marks&&t.push(`an hour is set on the part: when the chain ends it strikes once for each perfect link after`),t.length===0&&e.sunderGain>10&&t.push(`fills the Sunder meter fast`),t.length===0&&t.push(`a heavy cut, ${e.damagePercent}%`);let n=t.join(`; `);return`${n[0]?.toUpperCase()}${n.slice(1)}.`}function Gs(e,t,n){let r=e.tuning,i={maxChain:r.maxChain,iaiAfterPerfects:r.iaiAfterPerfects,finisher:e.hero.finisher,sunderCuts:r.sunderCutTicks.length},a=e=>Bs(e,i),o=(e,t,n,r)=>`<tr><td class="keys">${e}<span class="pad">${Rs(t)}</span></td><td>${n}</td><td>${r}</td></tr>`,[s,c,l,u]=t.buttons,d=e.combos.map(e=>`<tr><td class="keys">${e.stances.map(e=>zs(Us(e))).join(``)}</td><td><span class="gold">${Rs(e.name)}</span> <span class="note">${Rs(Ws(e))}</span></td></tr>`).join(``),f=n?`<span>${zs(`F2`)} timing strip</span><span>${zs(`F3`)} lab</span><span>${zs(`F4`)} tuning</span>`:``;return`
      <div class="card">
        <h2>CONTROLS <small>Esc to go back</small></h2>
        <table>
          <tr><th>Button</th><th>Boss's turn: defend</th><th>Your turn: attack</th></tr>
          ${o(zs(`J`),`X`,a(s.defend),a(s.attack))}
          ${o(zs(`I`),`Y`,a(c.defend),a(c.attack))}
          ${o(zs(`K`),`A`,a(l.defend),a(l.attack))}
          ${o(zs(`L`),`B`,a(u.defend),a(u.attack))}
          ${o(zs(`U`),`LB`,`<span class="gold">Sunder break</span>, with the meter full`,`<span class="gold">Sunder strike</span>, with the meter full`)}
          ${o(zs(`←`)+zs(`→`),`stick`,`Steer the dodge`,`Choose a part`)}
        </table>
        <h3>YOUR TURN</h3>
        <div class="note">${a(t.yourTurn)}</div>
        <h3>COMBO STRINGS</h3>
        <table>${d}
          <tr><td class="keys">${a(t.finisher.keys)}</td><td><span class="gold">${Rs(e.hero.finisher)}</span> <span class="note">${a(t.finisher.note)}</span></td></tr>
        </table>
        <h3>THE SUNDER METER</h3>
        <div class="note">${a(t.sunderMeter)}</div>
        <h3>ON ITS TURN</h3>
        <div class="note">${a(t.onItsTurn)}</div>
        <div class="foot"><span><span class="red">Red glint</span> dodge ${zs(`L`)} or jump ${zs(`K`)}</span><span><span class="amber">Amber glint</span> parry ${zs(`J`)}</span><span>${zs(`Esc`)} pause</span>${f}<span>${zs(`F8`)} save replay</span></div>
      </div>`}function Ks(e,t,n){let r=document.createElement(`style`);r.textContent=Hs,document.head.appendChild(r);let i=document.createElement(`div`);i.className=`guide`,i.dataset.testid=`guide`,i.hidden=!0,e.appendChild(i);let a,o=()=>{let e=t(),r=n();a={rules:e,words:r},i.innerHTML=Gs(e,r,!1)};return{get visible(){return i.hidden===!1},show(e){e&&o(),i.hidden=!e},scrollBy(e){let t=i.querySelector(`.card`);t&&(t.scrollTop+=e)},update(){i.hidden===!1&&(t()!==a?.rules||n()!==a?.words)&&o()}}}function qs(){try{let e=localStorage.getItem(Vs)===`1`;return localStorage.setItem(Vs,`1`),!e}catch{return!1}}var Js=1e3,Ys=1001,Xs=1002,Zs=1003,Qs=1004,$s=1005,ec=1006,tc=1007,nc=1008,rc=1009,ic=1010,ac=1011,oc=1012,sc=1013,cc=1014,lc=1015,uc=1016,dc=1017,fc=1018,pc=1020,mc=35902,hc=35899,gc=1021,_c=1022,vc=1023,yc=1026,bc=1027,xc=1028,Sc=1029,Cc=1030,wc=1031,Tc=1033,Ec=33776,Dc=33777,Oc=33778,kc=33779,Ac=35840,jc=35841,Mc=35842,Nc=35843,Pc=36196,Fc=37492,Ic=37496,Lc=37488,Rc=37489,zc=37490,Bc=37491,Vc=37808,Hc=37809,Uc=37810,Wc=37811,Gc=37812,Kc=37813,qc=37814,Jc=37815,Yc=37816,Xc=37817,Zc=37818,Qc=37819,$c=37820,el=37821,tl=36492,nl=36494,rl=36495,il=36283,al=36284,ol=36285,sl=36286,cl=2300,ll=2301,ul=2302,dl=2303,fl=2400,pl=2401,ml=2402,hl=3200,gl=`srgb`,_l=`srgb-linear`,vl=`linear`,yl=`srgb`,bl=7680,xl=35044,Sl=2e3;function Cl(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function wl(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Tl(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function El(){let e=Tl(`canvas`);return e.style.display=`block`,e}var Dl={};function Ol(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function kl(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function q(...e){e=kl(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Al(...e){e=kl(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function jl(...e){let t=e.join(` `);t in Dl||(Dl[t]=!0,q(...e))}function Ml(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Nl={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},Pl=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Fl=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Il=Math.PI/180,Ll=180/Math.PI;function Rl(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Fl[e&255]+Fl[e>>8&255]+Fl[e>>16&255]+Fl[e>>24&255]+`-`+Fl[t&255]+Fl[t>>8&255]+`-`+Fl[t>>16&15|64]+Fl[t>>24&255]+`-`+Fl[n&63|128]+Fl[n>>8&255]+`-`+Fl[n>>16&255]+Fl[n>>24&255]+Fl[r&255]+Fl[r>>8&255]+Fl[r>>16&255]+Fl[r>>24&255]).toLowerCase()}function zl(e,t,n){return Math.max(t,Math.min(n,e))}function Bl(e,t){return(e%t+t)%t}function Vl(e,t,n){return(1-n)*e+n*t}function Hl(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ul(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Wl(e,t){if(t.constructor===Float32Array)return e;let n=Ul(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Gl(e,t){if(t.constructor===Float32Array)return e;let n=Ul(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var Kl=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=zl(this.x,e.x,t.x),this.y=zl(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=zl(this.x,e,t),this.y=zl(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zl(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(zl(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ql=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:q(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zl(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},J=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=zl(this.x,e.x,t.x),this.y=zl(this.y,e.y,t.y),this.z=zl(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=zl(this.x,e,t),this.y=zl(this.y,e,t),this.z=zl(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zl(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jl.copy(this).projectOnVector(e),this.sub(Jl)}reflect(e){return this.sub(Jl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(zl(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jl=new J,Yl=new ql,Xl=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return jl(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Zl.makeScale(e,t)),this}rotate(e){return jl(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Zl.makeRotation(-e)),this}translate(e,t){return jl(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Zl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Zl=new Xl,Ql=new Xl().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$l=new Xl().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function eu(){let e={enabled:!0,workingColorSpace:_l,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=nu(e.r),e.g=nu(e.g),e.b=nu(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=ru(e.r),e.g=ru(e.g),e.b=ru(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?vl:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[_l]:{primaries:t,whitePoint:r,transfer:vl,toXYZ:Ql,fromXYZ:$l,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:gl},outputColorSpaceConfig:{drawingBufferColorSpace:gl}},[gl]:{primaries:t,whitePoint:r,transfer:yl,toXYZ:Ql,fromXYZ:$l,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:gl}}}),e}var tu=eu();function nu(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function ru(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var iu,au=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{iu===void 0&&(iu=Tl(`canvas`)),iu.width=e.width,iu.height=e.height;let t=iu.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=iu}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Tl(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=nu(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(nu(t[e]/255)*255):t[e]=nu(t[e]);return{data:t,width:e.width,height:e.height}}return q(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},ou=0,su=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=Rl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(cu(r[t].image)):e.push(cu(r[t]))}else e=cu(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function cu(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?au.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(q(`Texture: Unable to serialize Texture.`),{})}var lu=0,uu=new J,du=class e extends Pl{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Ys,i=Ys,a=ec,o=nc,s=vc,c=rc,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=Rl(),this.name=``,this.source=new su(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new Kl(0,0),this.repeat=new Kl(1,1),this.center=new Kl(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xl,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(uu).x}get height(){return this.source.getSize(uu).y}get depth(){return this.source.getSize(uu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){q(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?q(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Js:e.x-=Math.floor(e.x);break;case Ys:e.x=e.x<0?0:1;break;case Xs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Js:e.y-=Math.floor(e.y);break;case Ys:e.y=e.y<0?0:1;break;case Xs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};du.DEFAULT_IMAGE=null,du.DEFAULT_MAPPING=300,du.DEFAULT_ANISOTROPY=1;var fu=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=zl(this.x,e.x,t.x),this.y=zl(this.y,e.y,t.y),this.z=zl(this.z,e.z,t.z),this.w=zl(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=zl(this.x,e,t),this.y=zl(this.y,e,t),this.z=zl(this.z,e,t),this.w=zl(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zl(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pu=class extends Pl{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ec,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new fu(0,0,e,t),this.scissorTest=!1,this.viewport=new fu(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new du({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:ec,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new su(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},mu=class extends pu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},hu=class extends du{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Zs,this.minFilter=Zs,this.wrapR=Ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},gu=class extends du{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Zs,this.minFilter=Zs,this.wrapR=Ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},_u=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/vu.setFromMatrixColumn(e,0).length(),i=1/vu.setFromMatrixColumn(e,1).length(),a=1/vu.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bu,e,xu)}lookAt(e,t,n){let r=this.elements;return wu.subVectors(e,t),wu.lengthSq()===0&&(wu.z=1),wu.normalize(),Su.crossVectors(n,wu),Su.lengthSq()===0&&(Math.abs(n.z)===1?wu.x+=1e-4:wu.z+=1e-4,wu.normalize(),Su.crossVectors(n,wu)),Su.normalize(),Cu.crossVectors(wu,Su),r[0]=Su.x,r[4]=Cu.x,r[8]=wu.x,r[1]=Su.y,r[5]=Cu.y,r[9]=wu.y,r[2]=Su.z,r[6]=Cu.z,r[10]=wu.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],N=r[7],te=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*ee+c*P,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*ee+f*P,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*ee+g*P,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*ee+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=vu.set(r[0],r[1],r[2]).length(),o=vu.set(r[4],r[5],r[6]).length(),s=vu.set(r[8],r[9],r[10]).length();i<0&&(a=-a),yu.copy(this);let c=1/a,l=1/o,u=1/s;return yu.elements[0]*=c,yu.elements[1]*=c,yu.elements[2]*=c,yu.elements[4]*=l,yu.elements[5]*=l,yu.elements[6]*=l,yu.elements[8]*=u,yu.elements[9]*=u,yu.elements[10]*=u,t.setFromRotationMatrix(yu),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Sl,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Sl,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},vu=new J,yu=new _u,bu=new J(0,0,0),xu=new J(1,1,1),Su=new J,Cu=new J,wu=new J,Tu=new _u,Eu=new ql,Du=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(zl(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-zl(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(zl(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-zl(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(zl(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-zl(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:q(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Tu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Eu.setFromEuler(this),this.setFromQuaternion(Eu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Du.DEFAULT_ORDER=`XYZ`;var Ou=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},ku=0,Au=new J,ju=new ql,Mu=new _u,Nu=new J,Pu=new J,Fu=new J,Iu=new ql,Lu=new J(1,0,0),Ru=new J(0,1,0),zu=new J(0,0,1),Bu={type:`added`},Vu={type:`removed`},Hu={type:`childadded`,child:null},Uu={type:`childremoved`,child:null},Wu=class e extends Pl{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Rl(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new J,n=new Du,r=new ql,i=new J(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _u},normalMatrix:{value:new Xl}}),this.matrix=new _u,this.matrixWorld=new _u,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ou,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ju.setFromAxisAngle(e,t),this.quaternion.multiply(ju),this}rotateOnWorldAxis(e,t){return ju.setFromAxisAngle(e,t),this.quaternion.premultiply(ju),this}rotateX(e){return this.rotateOnAxis(Lu,e)}rotateY(e){return this.rotateOnAxis(Ru,e)}rotateZ(e){return this.rotateOnAxis(zu,e)}translateOnAxis(e,t){return Au.copy(e).applyQuaternion(this.quaternion),this.position.add(Au.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lu,e)}translateY(e){return this.translateOnAxis(Ru,e)}translateZ(e){return this.translateOnAxis(zu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mu.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Nu.copy(e):Nu.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Pu.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mu.lookAt(Pu,Nu,this.up):Mu.lookAt(Nu,Pu,this.up),this.quaternion.setFromRotationMatrix(Mu),r&&(Mu.extractRotation(r.matrixWorld),ju.setFromRotationMatrix(Mu),this.quaternion.premultiply(ju.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(Al(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bu),Hu.child=e,this.dispatchEvent(Hu),Hu.child=null):Al(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vu),Uu.child=e,this.dispatchEvent(Uu),Uu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mu.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mu.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mu),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bu),Hu.child=e,this.dispatchEvent(Hu),Hu.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pu,e,Fu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pu,Iu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Wu.DEFAULT_UP=new J(0,1,0),Wu.DEFAULT_MATRIX_AUTO_UPDATE=!0,Wu.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Gu=class extends Wu{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Ku={type:`move`},qu=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ku)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Gu;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ju={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yu={h:0,s:0,l:0},Xu={h:0,s:0,l:0};function Zu(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gl){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tu.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=tu.workingColorSpace){return this.r=e,this.g=t,this.b=n,tu.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=tu.workingColorSpace){if(e=Bl(e,1),t=zl(t,0,1),n=zl(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Zu(i,r,e+1/3),this.g=Zu(i,r,e),this.b=Zu(i,r,e-1/3)}return tu.colorSpaceToWorking(this,r),this}setStyle(e,t=gl){function n(t){t!==void 0&&parseFloat(t)<1&&q(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:q(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);q(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gl){let n=Ju[e.toLowerCase()];return n===void 0?q(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=nu(e.r),this.g=nu(e.g),this.b=nu(e.b),this}copyLinearToSRGB(e){return this.r=ru(e.r),this.g=ru(e.g),this.b=ru(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gl){return tu.workingToColorSpace(Qu.copy(this),e),Math.round(zl(Qu.r*255,0,255))*65536+Math.round(zl(Qu.g*255,0,255))*256+Math.round(zl(Qu.b*255,0,255))}getHexString(e=gl){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tu.workingColorSpace){tu.workingToColorSpace(Qu.copy(this),t);let n=Qu.r,r=Qu.g,i=Qu.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=tu.workingColorSpace){return tu.workingToColorSpace(Qu.copy(this),t),e.r=Qu.r,e.g=Qu.g,e.b=Qu.b,e}getStyle(e=gl){tu.workingToColorSpace(Qu.copy(this),e);let t=Qu.r,n=Qu.g,r=Qu.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Yu),this.setHSL(Yu.h+e,Yu.s+t,Yu.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Yu),e.getHSL(Xu);let n=Vl(Yu.h,Xu.h,t),r=Vl(Yu.s,Xu.s,t),i=Vl(Yu.l,Xu.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qu=new Y;Y.NAMES=Ju;var $u=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new Y(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},ed=class extends Wu{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Du,this.environmentIntensity=1,this.environmentRotation=new Du,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},td=new J,nd=new J,rd=new J,id=new J,ad=new J,od=new J,sd=new J,cd=new J,ld=new J,ud=new J,dd=new fu,fd=new fu,pd=new fu,md=class e{constructor(e=new J,t=new J,n=new J){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),td.subVectors(e,t),r.cross(td);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){td.subVectors(r,t),nd.subVectors(n,t),rd.subVectors(e,t);let a=td.dot(td),o=td.dot(nd),s=td.dot(rd),c=nd.dot(nd),l=nd.dot(rd),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,id)!==null&&id.x>=0&&id.y>=0&&id.x+id.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,id)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,id.x),s.addScaledVector(a,id.y),s.addScaledVector(o,id.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return dd.setScalar(0),fd.setScalar(0),pd.setScalar(0),dd.fromBufferAttribute(e,t),fd.fromBufferAttribute(e,n),pd.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(dd,i.x),a.addScaledVector(fd,i.y),a.addScaledVector(pd,i.z),a}static isFrontFacing(e,t,n,r){return td.subVectors(n,t),nd.subVectors(e,t),td.cross(nd).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return td.subVectors(this.c,this.b),nd.subVectors(this.a,this.b),td.cross(nd).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;ad.subVectors(r,n),od.subVectors(i,n),cd.subVectors(e,n);let s=ad.dot(cd),c=od.dot(cd);if(s<=0&&c<=0)return t.copy(n);ld.subVectors(e,r);let l=ad.dot(ld),u=od.dot(ld);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(ad,a);ud.subVectors(e,i);let f=ad.dot(ud),p=od.dot(ud);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(od,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return sd.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(sd,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(ad,a).addScaledVector(od,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},hd=class{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_d.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_d.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_d.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,_d):_d.fromBufferAttribute(r,t),_d.applyMatrix4(e.matrixWorld),this.expandByPoint(_d);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),vd.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),vd.copy(e.boundingBox)),vd.applyMatrix4(e.matrixWorld),this.union(vd)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_d),_d.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Td),Ed.subVectors(this.max,Td),yd.subVectors(e.a,Td),bd.subVectors(e.b,Td),xd.subVectors(e.c,Td),Sd.subVectors(bd,yd),Cd.subVectors(xd,bd),wd.subVectors(yd,xd);let t=[0,-Sd.z,Sd.y,0,-Cd.z,Cd.y,0,-wd.z,wd.y,Sd.z,0,-Sd.x,Cd.z,0,-Cd.x,wd.z,0,-wd.x,-Sd.y,Sd.x,0,-Cd.y,Cd.x,0,-wd.y,wd.x,0];return!kd(t,yd,bd,xd,Ed)||(t=[1,0,0,0,1,0,0,0,1],!kd(t,yd,bd,xd,Ed))?!1:(Dd.crossVectors(Sd,Cd),t=[Dd.x,Dd.y,Dd.z],kd(t,yd,bd,xd,Ed))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_d).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_d).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(gd[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gd[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gd[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gd[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gd[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gd[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gd[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gd[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gd)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},gd=[new J,new J,new J,new J,new J,new J,new J,new J],_d=new J,vd=new hd,yd=new J,bd=new J,xd=new J,Sd=new J,Cd=new J,wd=new J,Td=new J,Ed=new J,Dd=new J,Od=new J;function kd(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Od.fromArray(e,a);let o=i.x*Math.abs(Od.x)+i.y*Math.abs(Od.y)+i.z*Math.abs(Od.z),s=t.dot(Od),c=n.dot(Od),l=r.dot(Od);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Ad=new J,jd=new Kl,Md=0,Nd=class extends Pl{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Md++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=xl,this.updateRanges=[],this.gpuType=lc,this.version=0,this._normalizationScale=e===void 0?void 0:Ul(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)jd.fromBufferAttribute(this,t),jd.applyMatrix3(e),this.setXY(t,jd.x,jd.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ad.fromBufferAttribute(this,t),Ad.applyMatrix3(e),this.setXYZ(t,Ad.x,Ad.y,Ad.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ad.fromBufferAttribute(this,t),Ad.applyMatrix4(e),this.setXYZ(t,Ad.x,Ad.y,Ad.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ad.fromBufferAttribute(this,t),Ad.applyNormalMatrix(e),this.setXYZ(t,Ad.x,Ad.y,Ad.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ad.fromBufferAttribute(this,t),Ad.transformDirection(e),this.setXYZ(t,Ad.x,Ad.y,Ad.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Wl(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Gl(e,this.array):Math.round(e*t)}},Pd=class extends Nd{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Fd=class extends Nd{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Id=class extends Nd{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ld=new hd,Rd=new J,zd=new J,Bd=class{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Ld.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rd.subVectors(e,this.center);let t=Rd.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Rd,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rd.copy(e.center).add(zd)),this.expandByPoint(Rd.copy(e.center).sub(zd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Vd=0,Hd=new _u,Ud=new Wu,Wd=new J,Gd=new hd,Kd=new hd,qd=new J,Jd=class e extends Pl{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Rl(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Cl(e)?Fd:Pd)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Xl().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Hd.makeRotationFromQuaternion(e),this.applyMatrix4(Hd),this}rotateX(e){return Hd.makeRotationX(e),this.applyMatrix4(Hd),this}rotateY(e){return Hd.makeRotationY(e),this.applyMatrix4(Hd),this}rotateZ(e){return Hd.makeRotationZ(e),this.applyMatrix4(Hd),this}translate(e,t,n){return Hd.makeTranslation(e,t,n),this.applyMatrix4(Hd),this}scale(e,t,n){return Hd.makeScale(e,t,n),this.applyMatrix4(Hd),this}lookAt(e){return Ud.lookAt(e),Ud.updateMatrix(),this.applyMatrix4(Ud.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wd).negate(),this.translate(Wd.x,Wd.y,Wd.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Id(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&q(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hd);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)Al(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Gd.setFromBufferAttribute(n),this.morphTargetsRelative?(qd.addVectors(this.boundingBox.min,Gd.min),this.boundingBox.expandByPoint(qd),qd.addVectors(this.boundingBox.max,Gd.max),this.boundingBox.expandByPoint(qd)):(this.boundingBox.expandByPoint(Gd.min),this.boundingBox.expandByPoint(Gd.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Al(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bd);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)Al(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new J,1/0);else if(e){let n=this.boundingSphere.center;if(Gd.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Kd.setFromBufferAttribute(n),this.morphTargetsRelative?(qd.addVectors(Gd.min,Kd.min),Gd.expandByPoint(qd),qd.addVectors(Gd.max,Kd.max),Gd.expandByPoint(qd)):(Gd.expandByPoint(Kd.min),Gd.expandByPoint(Kd.max))}Gd.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)qd.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(qd));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)qd.fromBufferAttribute(a,t),o&&(Wd.fromBufferAttribute(e,t),qd.add(Wd)),r=Math.max(r,n.distanceToSquared(qd))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Al(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Al(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Nd(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new J,s[e]=new J;let l=new J,u=new J,d=new J,f=new Kl,p=new Kl,m=new Kl,h=new J,g=new J;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new J,b=new J,x=new J,S=new J;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Nd(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new J,i=new J,a=new J,o=new J,s=new J,c=new J,l=new J,u=new J;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qd.fromBufferAttribute(e,t),qd.normalize(),e.setXYZ(t,qd.x,qd.y,qd.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Nd(a,r,i)}if(this.index===null)return q(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Yd=new J,Xd=new J,Zd=new Xl,Qd=class{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Yd.subVectors(n,t).cross(Xd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Yd),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zd.getNormalMatrix(e),r=this.coplanarPoint(Yd).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},$d=0,ef=class extends Pl{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Rl(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bl,this.stencilZFail=bl,this.stencilZPass=bl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){q(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?q(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Qd().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new Kl().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Kl().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},tf=new J,nf=new J,rf=new J,af=new J,of=class{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,tf)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=tf.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(tf.copy(this.origin).addScaledVector(this.direction,t),tf.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){nf.copy(e).add(t).multiplyScalar(.5),rf.copy(t).sub(e).normalize(),af.copy(this.origin).sub(nf);let i=e.distanceTo(t)*.5,a=-this.direction.dot(rf),o=af.dot(this.direction),s=-af.dot(rf),c=af.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(nf).addScaledVector(rf,d),f}intersectSphere(e,t){if(e.radius<0)return null;tf.subVectors(e.center,this.origin);let n=tf.dot(this.direction),r=tf.dot(tf)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,tf)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let N=S/w,te=C/w,P=1/w,ne=T-N*D,re=E-te*D,ie=O-N*A,ae=k-te*A,oe=j-N*M,se=ee-te*M,ce=oe*ae-se*ie,le=ne*se-re*oe,ue=ie*re-ae*ne;if(r){if(ce<0||le<0||ue<0)return null}else if((ce<0||le<0||ue<0)&&(ce>0||le>0||ue>0))return null;let de=ce+le+ue;if(de===0)return null;let fe=P*(ce*D+le*A+ue*M);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},sf=class extends ef{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Du,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},cf=new _u,lf=new of,uf=new Bd,df=new J,ff=new J,pf=new J,mf=new J,hf=new J,gf=new J,_f=new J,vf=new J,yf=class extends Wu{constructor(e=new Jd,t=new sf){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){gf.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(hf.fromBufferAttribute(s,e),a?gf.addScaledVector(hf,r):gf.addScaledVector(hf.sub(t),r))}t.add(gf)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),uf.copy(n.boundingSphere),uf.applyMatrix4(i),lf.copy(e.ray).recast(e.near),uf.containsPoint(lf.origin)===!1&&(lf.intersectSphere(uf,df)===null||lf.origin.distanceToSquared(df)>(e.far-e.near)**2)||(cf.copy(i).invert(),lf.copy(e.ray).applyMatrix4(cf),(n.boundingBox===null||lf.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,lf)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=xf(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=xf(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=xf(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=xf(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function bf(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;vf.copy(s),vf.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(vf);return l<n.near||l>n.far?null:{distance:l,point:vf.clone(),object:e}}function xf(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ff),e.getVertexPosition(c,pf),e.getVertexPosition(l,mf);let u=bf(e,t,n,r,ff,pf,mf,_f);if(u){let e=new J;md.getBarycoord(_f,ff,pf,mf,e),i&&(u.uv=md.getInterpolatedAttribute(i,s,c,l,e,new Kl)),a&&(u.uv1=md.getInterpolatedAttribute(a,s,c,l,e,new Kl)),o&&(u.normal=md.getInterpolatedAttribute(o,s,c,l,e,new J),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new J,materialIndex:0};md.getNormal(ff,pf,mf,t.normal),u.face=t,u.barycoord=e}return u}var Sf=class extends du{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Zs,l=Zs,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Cf=new Bd,wf=new Kl(.5,.5),Tf=new J,Ef=class{constructor(e=new Qd,t=new Qd,n=new Qd,r=new Qd,i=new Qd,a=new Qd){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sl,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cf.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cf.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cf)}intersectsSprite(e){return Cf.center.set(0,0,0),Cf.radius=.7071067811865476+wf.distanceTo(e.center),Cf.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cf)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Tf.x=r.normal.x>0?e.max.x:e.min.x,Tf.y=r.normal.y>0?e.max.y:e.min.y,Tf.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Tf)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Df=new _u,Of=class e{constructor(){this.coordinateSystem=Sl,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Df.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Ef),n[e].setFromProjectionMatrix(Df,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Ef),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},kf=class extends ef{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Y(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Af=new J,jf=new J,Mf=new _u,Nf=new of,Pf=new Bd,Ff=new J,If=new J,Lf=class extends Wu{constructor(e=new Jd,t=new kf){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Af.fromBufferAttribute(t,e-1),jf.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Af.distanceTo(jf);e.setAttribute(`lineDistance`,new Id(n,1))}else q(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pf.copy(n.boundingSphere),Pf.applyMatrix4(r),Pf.radius+=i,e.ray.intersectsSphere(Pf)===!1)return;Mf.copy(r).invert(),Nf.copy(e.ray).applyMatrix4(Mf);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Rf(this,e,Nf,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Rf(this,e,Nf,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Rf(this,e,Nf,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Rf(this,e,Nf,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Rf(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Af.fromBufferAttribute(s,i),jf.fromBufferAttribute(s,a),n.distanceSqToSegment(Af,jf,Ff,If)>r)return;Ff.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ff);if(!(c<t.near||c>t.far))return{distance:c,point:If.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var zf=new J,Bf=new J,Vf=class extends Lf{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)zf.fromBufferAttribute(t,e),Bf.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+zf.distanceTo(Bf);e.setAttribute(`lineDistance`,new Id(n,1))}else q(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Hf=class extends ef{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Uf=new _u,Wf=new of,Gf=new Bd,Kf=new J,qf=class extends Wu{constructor(e=new Jd,t=new Hf){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gf.copy(n.boundingSphere),Gf.applyMatrix4(r),Gf.radius+=i,e.ray.intersectsSphere(Gf)===!1)return;Uf.copy(r).invert(),Wf.copy(e.ray).applyMatrix4(Uf);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Kf.fromBufferAttribute(l,n),Jf(Kf,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Kf.fromBufferAttribute(l,a),Jf(Kf,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Jf(e,t,n,r,i,a,o){let s=Wf.distanceSqToPoint(e);if(s<n){let n=new J;Wf.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Yf=class extends du{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Xf=class extends du{constructor(e,t,n=cc,r,i,a,o=Zs,s=Zs,c,l=yc,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new su(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Zf=class extends Xf{constructor(e,t=cc,n=301,r,i,a=Zs,o=Zs,s,c=yc){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Qf=class extends du{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},$f=class e extends Jd{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Id(c,3)),this.setAttribute(`normal`,new Id(l,3)),this.setAttribute(`uv`,new Id(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new J;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ep=class e extends Jd{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new J,l=new Kl;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Id(a,3)),this.setAttribute(`normal`,new Id(o,3)),this.setAttribute(`uv`,new Id(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},tp=class e extends Jd{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Id(p,3)),this.setAttribute(`normal`,new Id(m,3)),this.setAttribute(`uv`,new Id(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function np(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(ip(i))i.isRenderTargetTexture?(q(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(ip(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function rp(e){let t={};for(let n=0;n<e.length;n++){let r=np(e[n]);for(let e in r)t[e]=r[e]}return t}function ip(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ap(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function op(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:tu.workingColorSpace}var sp={clone:np,merge:rp},cp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,up=class extends ef{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cp,this.fragmentShader=lp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=np(e.uniforms),this.uniformsGroups=ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new Kl().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new fu().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Xl().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new _u().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},dp=class extends up{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},fp=class extends ef{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Kl(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Du,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},pp=class extends ef{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=hl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},mp=class extends ef{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function hp(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function gp(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var _p=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},vp=class extends _p{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fl,endingEnd:fl}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case pl:i=e,o=2*t-n;break;case ml:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case pl:a=e,s=2*n-t;break;case ml:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},yp=class extends _p{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},bp=class extends _p{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},xp=class extends _p{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=wp(n,t,g,y,r);i[p]=Sp(x,o,_,b,m)}return i}};function Sp(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Cp(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function wp(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Sp(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Cp(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Tp=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=hp(t,this.TimeBufferType),this.values=hp(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:hp(e.times,Array),values:hp(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),gp(e.settings)&&(n.settings={inTangents:hp(e.settings.inTangents,Array),outTangents:hp(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new xp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case cl:t=this.InterpolantFactoryMethodDiscrete;break;case ll:t=this.InterpolantFactoryMethodLinear;break;case ul:t=this.InterpolantFactoryMethodSmooth;break;case dl:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return q(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cl;case this.InterpolantFactoryMethodLinear:return ll;case this.InterpolantFactoryMethodSmooth:return ul;case this.InterpolantFactoryMethodBezier:return dl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;gp(this.settings)&&(Ep(this.settings.inTangents,e),Ep(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;gp(this.settings)&&(Dp(this.settings.inTangents,e),Dp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Al(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(Al(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){Al(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){Al(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&wl(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){Al(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ul,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,gp(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ep(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function Dp(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Tp.prototype.ValueTypeName=``,Tp.prototype.TimeBufferType=Float32Array,Tp.prototype.ValueBufferType=Float32Array,Tp.prototype.DefaultInterpolation=ll;var Op=class extends Tp{constructor(e,t,n){super(e,t,n)}};Op.prototype.ValueTypeName=`bool`,Op.prototype.ValueBufferType=Array,Op.prototype.DefaultInterpolation=cl,Op.prototype.InterpolantFactoryMethodLinear=void 0,Op.prototype.InterpolantFactoryMethodSmooth=void 0;var kp=class extends Tp{constructor(e,t,n,r){super(e,t,n,r)}};kp.prototype.ValueTypeName=`color`;var Ap=class extends Tp{constructor(e,t,n,r){super(e,t,n,r)}};Ap.prototype.ValueTypeName=`number`;var jp=class extends _p{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ql.slerpFlat(i,0,a,c-o,a,c,s);return i}},Mp=class extends Tp{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new jp(this.times,this.values,this.getValueSize(),e)}};Mp.prototype.ValueTypeName=`quaternion`,Mp.prototype.InterpolantFactoryMethodSmooth=void 0;var Np=class extends Tp{constructor(e,t,n){super(e,t,n)}};Np.prototype.ValueTypeName=`string`,Np.prototype.ValueBufferType=Array,Np.prototype.DefaultInterpolation=cl,Np.prototype.InterpolantFactoryMethodLinear=void 0,Np.prototype.InterpolantFactoryMethodSmooth=void 0;var Pp=class extends Tp{constructor(e,t,n,r){super(e,t,n,r)}};Pp.prototype.ValueTypeName=`vector`;var Fp={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Ip(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Ip(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Ip(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Lp=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Rp=class{constructor(e){this.manager=e===void 0?Lp:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Rp.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var zp=new WeakMap,Bp=class extends Rp{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Fp.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=zp.get(a);e===void 0&&(e=[],zp.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Tl(`img`);function s(){l(),t&&t(this);let n=zp.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}zp.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Fp.remove(`image:${e}`);let n=zp.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}zp.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Fp.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},Vp=class extends Rp{constructor(e){super(e)}load(e,t,n,r){let i=new du,a=new Bp(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Hp=class extends Wu{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Up=class extends Hp{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Wu.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Wp=new _u,Gp=new J,Kp=new J,qp=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Kl(512,512),this.mapType=rc,this.map=null,this.mapPass=null,this.matrix=new _u,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ef,this._frameExtents=new Kl(1,1),this._viewportCount=1,this._viewports=[new fu(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Gp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gp),Kp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Wp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Wp,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Wp)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Jp=new J,Yp=new ql,Xp=new J,Zp=class extends Wu{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new _u,this.projectionMatrix=new _u,this.projectionMatrixInverse=new _u,this.coordinateSystem=Sl,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Jp,Yp,Xp),Xp.x===1&&Xp.y===1&&Xp.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jp,Yp,Xp.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Jp,Yp,Xp),Xp.x===1&&Xp.y===1&&Xp.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jp,Yp,Xp.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Qp=new J,$p=new Kl,em=new Kl,tm=class extends Zp{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ll*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Il*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ll*2*Math.atan(Math.tan(Il*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qp.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qp.x,Qp.y).multiplyScalar(-e/Qp.z),Qp.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qp.x,Qp.y).multiplyScalar(-e/Qp.z)}getViewSize(e,t){return this.getViewBounds(e,$p,em),t.subVectors(em,$p)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Il*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},nm=class extends qp{constructor(){super(new tm(90,1,.5,500)),this.isPointLightShadow=!0}},rm=class extends Hp{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new nm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},im=class extends Zp{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},am=class extends qp{constructor(){super(new im(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},om=class extends Hp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Wu.DEFAULT_UP),this.updateMatrix(),this.target=new Wu,this.shadow=new am}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},sm=-90,cm=1,lm=class extends Wu{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new tm(sm,cm,e,t);r.layers=this.layers,this.add(r);let i=new tm(sm,cm,e,t);i.layers=this.layers,this.add(i);let a=new tm(sm,cm,e,t);a.layers=this.layers,this.add(a);let o=new tm(sm,cm,e,t);o.layers=this.layers,this.add(o);let s=new tm(sm,cm,e,t);s.layers=this.layers,this.add(s);let c=new tm(sm,cm,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},um=class extends tm{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},dm=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=fm.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function fm(){this._document.hidden===!1&&this.reset()}var pm=`\\[\\]\\.:\\/`,mm=RegExp(`[\\[\\]\\.:\\/]`,`g`),hm=`[^\\[\\]\\.:\\/]`,gm=`[^`+pm.replace(`\\.`,``)+`]`,_m=`((?:WC+[\\/:])*)`.replace(`WC`,hm),vm=`(WCOD+)?`.replace(`WCOD`,gm),ym=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,hm),bm=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,hm),xm=RegExp(`^`+_m+vm+ym+bm+`$`),Sm=[`material`,`materials`,`bones`,`map`],Cm=class{constructor(e,t,n){let r=n||wm.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},wm=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(mm,``)}static parseTrackName(e){let t=xm.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Sm.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){q(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){Al(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){Al(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){Al(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){Al(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){Al(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){Al(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){Al(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;Al(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){Al(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){Al(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};wm.Composite=Cm,wm.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},wm.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},wm.prototype.GetterByBindingType=[wm.prototype._getValue_direct,wm.prototype._getValue_array,wm.prototype._getValue_arrayElement,wm.prototype._getValue_toArray],wm.prototype.SetterByBindingTypeAndVersioning=[[wm.prototype._setValue_direct,wm.prototype._setValue_direct_setNeedsUpdate,wm.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wm.prototype._setValue_array,wm.prototype._setValue_array_setNeedsUpdate,wm.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wm.prototype._setValue_arrayElement,wm.prototype._setValue_arrayElement_setNeedsUpdate,wm.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wm.prototype._setValue_fromArray,wm.prototype._setValue_fromArray_setNeedsUpdate,wm.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Tm(e,t,n,r){let i=Em(r);switch(n){case gc:return e*t;case xc:return e*t/i.components*i.byteLength;case Sc:return e*t/i.components*i.byteLength;case Cc:return e*t*2/i.components*i.byteLength;case wc:return e*t*2/i.components*i.byteLength;case _c:return e*t*3/i.components*i.byteLength;case vc:return e*t*4/i.components*i.byteLength;case Tc:return e*t*4/i.components*i.byteLength;case Ec:case Dc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Oc:case kc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jc:case Nc:return Math.max(e,16)*Math.max(t,8)/4;case Ac:case Mc:return Math.max(e,8)*Math.max(t,8)/2;case Pc:case Fc:case Lc:case Rc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ic:case zc:case Bc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Vc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Hc:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Uc:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Wc:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Gc:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Kc:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case qc:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Jc:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Yc:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Xc:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Zc:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Qc:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case $c:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case el:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case tl:case nl:case rl:return Math.ceil(e/4)*Math.ceil(t/4)*16;case il:case al:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ol:case sl:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Em(e){switch(e){case rc:case ic:return{byteLength:1,components:1};case oc:case ac:case uc:return{byteLength:2,components:1};case dc:case fc:return{byteLength:2,components:4};case cc:case sc:case lc:return{byteLength:4,components:1};case mc:case hc:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?q(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Dm(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Om(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var km={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xl},alphaMap:{value:null},alphaMapTransform:{value:new Xl},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xl}},envmap:{envMap:{value:null},envMapRotation:{value:new Xl},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xl}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xl}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xl},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xl},normalScale:{value:new Kl(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xl},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xl}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xl}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xl}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xl},alphaTest:{value:0},uvTransform:{value:new Xl}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new Kl(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xl},alphaMap:{value:null},alphaMapTransform:{value:new Xl},alphaTest:{value:0}}},Am={basic:{uniforms:rp([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:km.meshbasic_vert,fragmentShader:km.meshbasic_frag},lambert:{uniforms:rp([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:km.meshlambert_vert,fragmentShader:km.meshlambert_frag},phong:{uniforms:rp([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:km.meshphong_vert,fragmentShader:km.meshphong_frag},standard:{uniforms:rp([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:km.meshphysical_vert,fragmentShader:km.meshphysical_frag},toon:{uniforms:rp([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new Y(0)}}]),vertexShader:km.meshtoon_vert,fragmentShader:km.meshtoon_frag},matcap:{uniforms:rp([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:km.meshmatcap_vert,fragmentShader:km.meshmatcap_frag},points:{uniforms:rp([X.points,X.fog]),vertexShader:km.points_vert,fragmentShader:km.points_frag},dashed:{uniforms:rp([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:km.linedashed_vert,fragmentShader:km.linedashed_frag},depth:{uniforms:rp([X.common,X.displacementmap]),vertexShader:km.depth_vert,fragmentShader:km.depth_frag},normal:{uniforms:rp([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:km.meshnormal_vert,fragmentShader:km.meshnormal_frag},sprite:{uniforms:rp([X.sprite,X.fog]),vertexShader:km.sprite_vert,fragmentShader:km.sprite_frag},background:{uniforms:{uvTransform:{value:new Xl},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:km.background_vert,fragmentShader:km.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xl}},vertexShader:km.backgroundCube_vert,fragmentShader:km.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:km.cube_vert,fragmentShader:km.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:km.equirect_vert,fragmentShader:km.equirect_frag},distance:{uniforms:rp([X.common,X.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:km.distance_vert,fragmentShader:km.distance_frag},shadow:{uniforms:rp([X.lights,X.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:km.shadow_vert,fragmentShader:km.shadow_frag}};Am.physical={uniforms:rp([Am.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xl},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xl},clearcoatNormalScale:{value:new Kl(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xl},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Xl},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xl},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xl},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xl},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xl},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xl},transmissionSamplerSize:{value:new Kl},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xl},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xl},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xl},anisotropyVector:{value:new Kl},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xl}}]),vertexShader:km.meshphysical_vert,fragmentShader:km.meshphysical_frag};var jm={r:0,b:0,g:0},Mm=new _u,Nm=new Xl;Nm.set(-1,0,0,0,1,0,0,0,1);function Pm(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new yf(new $f(1,1,1),new up({name:`BackgroundCubeMaterial`,uniforms:np(Am.backgroundCube.uniforms),vertexShader:Am.backgroundCube.vertexShader,fragmentShader:Am.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Mm.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Nm),l.material.toneMapped=tu.getTransfer(i.colorSpace)!==yl,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new yf(new tp(2,2),new up({name:`BackgroundMaterial`,uniforms:np(Am.background.uniforms),vertexShader:Am.background.vertexShader,fragmentShader:Am.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=tu.getTransfer(i.colorSpace)!==yl,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(jm,op(e)),n.buffers.color.setClear(jm.r,jm.g,jm.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Fm(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Im(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Lm(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(q(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&q(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&q(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Rm(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Qd,s=new Xl,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var zm=class extends mu{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Yf(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new $f(5,5,5),i=new up({name:`CubemapFromEquirect`,uniforms:np(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new yf(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=ec),new lm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Bm=256,Vm=3,Hm=20,Um=256,Wm=16,Gm=3,Km=new J,qm=new Y,Jm=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new lm(1,10,null),this._boxMesh=new yf(new $f(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Km}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(qm));let h=new lm(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=th(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Bm,Hl(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Bm:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Ym(e,!1,!1),n=Math.log2(e)-Vm;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Ym(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=th()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=eh()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Zm(),this._integrationMaterial=Qm());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Wm);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Gm)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Um*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=$m());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Ym(e,t,n){return new zm(e,{minFilter:nc,generateMipmaps:t,type:uc,colorSpace:_l,depthBuffer:n})}function Xm(e,t,n){return new up({name:e,uniforms:t,vertexShader:km.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Zm(){return Xm(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Um}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Qm(){return Xm(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Wm}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function $m(){return Xm(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Hm}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function eh(){return Xm(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function th(){return Xm(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function nh(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new zm(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Jm(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Jm(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function rh(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&jl(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ih(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Fd:Pd)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function ah(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function oh(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:Al(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function sh(e,t,n){let r=new WeakMap,i=new fu;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new hu(h,p,m,u);g.type=lc,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Kl(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ch(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var lh={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function uh(e,t,n,r,i,a){let o=new mu(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Jd;u.setAttribute(`position`,new Id([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new Id([0,2,0,0,2,0],2));let d=new dp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

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

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new yf(u,d),p=new im(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new mu(t,n,{type:uc,depthBuffer:!1,stencilBuffer:!1}),c=new mu(t,n,{type:uc,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Xf(t,n),a===!0&&(l.format=bc,l.type=pc)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},tu.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=lh[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var dh=new du,fh=new Xf(1,1),ph=new Zf(1),mh=new hu,hh=new gu,gh=new Yf,_h=[],vh=[],yh=new Float32Array(16),bh=new Float32Array(9),xh=new Float32Array(4);function Sh(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=_h[i];if(a===void 0&&(a=new Float32Array(i),_h[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ch(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function wh(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Th(e,t){let n=vh[t];n===void 0&&(n=new Int32Array(t),vh[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Eh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Dh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ch(n,t))return;e.uniform2fv(this.addr,t),wh(n,t)}}function Oh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ch(n,t))return;e.uniform3fv(this.addr,t),wh(n,t)}}function kh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ch(n,t))return;e.uniform4fv(this.addr,t),wh(n,t)}}function Ah(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ch(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),wh(n,t)}else{if(Ch(n,r))return;xh.set(r),e.uniformMatrix2fv(this.addr,!1,xh),wh(n,r)}}function jh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ch(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),wh(n,t)}else{if(Ch(n,r))return;bh.set(r),e.uniformMatrix3fv(this.addr,!1,bh),wh(n,r)}}function Mh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ch(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),wh(n,t)}else{if(Ch(n,r))return;yh.set(r),e.uniformMatrix4fv(this.addr,!1,yh),wh(n,r)}}function Nh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ph(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ch(n,t))return;e.uniform2iv(this.addr,t),wh(n,t)}}function Fh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ch(n,t))return;e.uniform3iv(this.addr,t),wh(n,t)}}function Ih(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ch(n,t))return;e.uniform4iv(this.addr,t),wh(n,t)}}function Lh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Rh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ch(n,t))return;e.uniform2uiv(this.addr,t),wh(n,t)}}function zh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ch(n,t))return;e.uniform3uiv(this.addr,t),wh(n,t)}}function Bh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ch(n,t))return;e.uniform4uiv(this.addr,t),wh(n,t)}}function Vh(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Hh(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Vh(fh):dh,n.setTexture2D(t||a,i)}function Uh(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||hh,i)}function Wh(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Vh(ph):gh,n.setTextureCube(t||a,i)}function Gh(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||mh,i)}function Kh(e){switch(e){case 5126:return Eh;case 35664:return Dh;case 35665:return Oh;case 35666:return kh;case 35674:return Ah;case 35675:return jh;case 35676:return Mh;case 5124:case 35670:return Nh;case 35667:case 35671:return Ph;case 35668:case 35672:return Fh;case 35669:case 35673:return Ih;case 5125:return Lh;case 36294:return Rh;case 36295:return zh;case 36296:return Bh;case 35678:case 36198:case 36298:case 36306:case 35682:return Hh;case 35679:case 36299:case 36307:return Uh;case 35680:case 36300:case 36308:case 36293:return Wh;case 36289:case 36303:case 36311:case 36292:return Gh}}function qh(e,t){e.uniform1fv(this.addr,t)}function Jh(e,t){let n=Sh(t,this.size,2);e.uniform2fv(this.addr,n)}function Yh(e,t){let n=Sh(t,this.size,3);e.uniform3fv(this.addr,n)}function Xh(e,t){let n=Sh(t,this.size,4);e.uniform4fv(this.addr,n)}function Zh(e,t){let n=Sh(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Qh(e,t){let n=Sh(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $h(e,t){let n=Sh(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function eg(e,t){e.uniform1iv(this.addr,t)}function tg(e,t){e.uniform2iv(this.addr,t)}function ng(e,t){e.uniform3iv(this.addr,t)}function rg(e,t){e.uniform4iv(this.addr,t)}function ig(e,t){e.uniform1uiv(this.addr,t)}function ag(e,t){e.uniform2uiv(this.addr,t)}function og(e,t){e.uniform3uiv(this.addr,t)}function sg(e,t){e.uniform4uiv(this.addr,t)}function cg(e,t,n){let r=this.cache,i=t.length,a=Th(n,i);Ch(r,a)||(e.uniform1iv(this.addr,a),wh(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Vh(fh):dh;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function lg(e,t,n){let r=this.cache,i=t.length,a=Th(n,i);Ch(r,a)||(e.uniform1iv(this.addr,a),wh(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||hh,a[e])}function ug(e,t,n){let r=this.cache,i=t.length,a=Th(n,i);Ch(r,a)||(e.uniform1iv(this.addr,a),wh(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Vh(ph):gh;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function dg(e,t,n){let r=this.cache,i=t.length,a=Th(n,i);Ch(r,a)||(e.uniform1iv(this.addr,a),wh(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||mh,a[e])}function fg(e){switch(e){case 5126:return qh;case 35664:return Jh;case 35665:return Yh;case 35666:return Xh;case 35674:return Zh;case 35675:return Qh;case 35676:return $h;case 5124:case 35670:return eg;case 35667:case 35671:return tg;case 35668:case 35672:return ng;case 35669:case 35673:return rg;case 5125:return ig;case 36294:return ag;case 36295:return og;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return lg;case 35680:case 36300:case 36308:case 36293:return ug;case 36289:case 36303:case 36311:case 36292:return dg}}var pg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kh(t.type)}},mg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fg(t.type)}},hg=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},gg=/(\w+)(\])?(\[|\.)?/g;function _g(e,t){e.seq.push(t),e.map[t.id]=t}function vg(e,t,n){let r=e.name,i=r.length;for(gg.lastIndex=0;;){let a=gg.exec(r),o=gg.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){_g(n,l===void 0?new pg(s,e,t):new mg(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new hg(s),_g(n,e)),n=e}}}var yg=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);vg(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function bg(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var xg=37297,Sg=0;function Cg(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var wg=new Xl;function Tg(e){tu._getMatrix(wg,tu.workingColorSpace,e);let t=`mat3( ${wg.elements.map(e=>e.toFixed(4))} )`;switch(tu.getTransfer(e)){case vl:return[t,`LinearTransferOETF`];case yl:return[t,`sRGBTransferOETF`];default:return q(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Eg(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Cg(e.getShaderSource(t),r)}return i}function Dg(e,t){let n=Tg(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Og={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function kg(e,t){let n=Og[t];return n===void 0?(q(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ag=new J;function jg(){return tu.getLuminanceCoefficients(Ag),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ag.x.toFixed(4)}, ${Ag.y.toFixed(4)}, ${Ag.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Mg(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Fg).join(`
`)}function Ng(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Pg(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Fg(e){return e!==``}function Ig(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Lg(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rg=/^[ \t]*#include +<([\w\d./]+)>/gm;function zg(e){return e.replace(Rg,Bg)}function Bg(e,t){let n=km[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return zg(n)}var Vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hg(e){return e.replace(Vg,Ug)}function Ug(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Wg(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Gg={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Kg(e){return Gg[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var qg={302:`ENVMAP_MODE_REFRACTION`};function Jg(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:qg[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Yg={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Xg(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Yg[e.combine]||`ENVMAP_BLENDING_NONE`}function Zg(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Kg(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Jg(n),d=Xg(n),f=Mg(n),p=Ng(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fg).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Fg).join(`
`),g.length>0&&(g+=`
`)):(h=[Wg(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Fg).join(`
`),g=[Wg(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:km.tonemapping_pars_fragment,n.toneMapping===0?``:kg(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,km.colorspace_pars_fragment,Dg(`linearToOutputTexel`,n.outputColorSpace),jg(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Fg).join(`
`)),o=zg(o),o=Ig(o,n),o=Lg(o,n),s=zg(s),s=Ig(s,n),s=Lg(s,n),o=Hg(o),s=Hg(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=bg(i,i.VERTEX_SHADER,v),x=bg(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Eg(i,b,`vertex`),n=Eg(i,x,`fragment`);Al(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):q(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new yg(i,m),w=Pg(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,xg)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Sg++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Qg=0,$g=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new e_(e),t.set(e,n)),n}},e_=class{constructor(e){this.id=Qg++,this.code=e,this.usedTimes=0}};function t_(e){return e===1030||e===37490||e===36285}function n_(e,t,n,r,i,a){let o=new Ou,s=new $g,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&q(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Am[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),ee=m.isInstancedMesh===!0,M=m.isBatchedMesh===!0,N=!!i.map,te=!!i.matcap,P=!!b,ne=P&&b.isPMREMTexture===!0,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.diffuseRoughness>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,F=i.sheen>0,_e=i.transmission>0,ve=de&&!!i.anisotropyMap,ye=fe&&!!i.clearcoatMap,be=fe&&!!i.clearcoatNormalMap,xe=fe&&!!i.clearcoatRoughnessMap,Se=pe&&!!i.diffuseRoughnessMap,I=ge&&!!i.iridescenceMap,Ce=ge&&!!i.iridescenceThicknessMap,we=F&&!!i.sheenColorMap,Te=F&&!!i.sheenRoughnessMap,L=!!i.specularMap,Ee=!!i.specularColorMap,R=!!i.specularIntensityMap,De=_e&&!!i.transmissionMap,Oe=_e&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,je=i.alphaTest>0,Me=!!i.alphaHash,Ne=!!i.extensions,Pe=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Pe=e.toneMapping);let Fe=ne?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Ie={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:M,batchingColor:M&&m._colorsTexture!==null,instancing:ee,instancingColor:ee&&m.instanceColor!==null,instancingMorph:ee&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:tu.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:te,envMap:P,envMapMode:P&&b.mapping,envMapPMREM:ne,envMapMaxLod:ne?Fe.length-1:null,envMapSize:ne?Fe[0].width:null,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&t_(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:de,anisotropyMap:ve,clearcoat:fe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,diffuseRoughness:pe,diffuseRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:I,iridescenceThicknessMap:Ce,sheen:F,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:L,specularColorMap:Ee,specularIntensityMap:R,transmission:_e,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:je,alphaHash:Me,combine:i.combine,mapUv:N&&p(i.map.channel),aoMapUv:re&&p(i.aoMap.channel),lightMapUv:ie&&p(i.lightMap.channel),bumpMapUv:ae&&p(i.bumpMap.channel),normalMapUv:oe&&p(i.normalMap.channel),displacementMapUv:se&&p(i.displacementMap.channel),emissiveMapUv:ce&&p(i.emissiveMap.channel),metalnessMapUv:le&&p(i.metalnessMap.channel),roughnessMapUv:ue&&p(i.roughnessMap.channel),anisotropyMapUv:ve&&p(i.anisotropyMap.channel),clearcoatMapUv:ye&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Se&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:I&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&p(i.sheenRoughnessMap.channel),specularMapUv:L&&p(i.specularMap.channel),specularColorMapUv:Ee&&p(i.specularColorMap.channel),specularIntensityMapUv:R&&p(i.specularIntensityMap.channel),transmissionMapUv:De&&p(i.transmissionMap.channel),thicknessMapUv:Oe&&p(i.thicknessMap.channel),alphaMapUv:Ae&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(oe||de),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(N||Ae),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&tu.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&tu.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ne&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ne&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Am[t];n=sp.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Zg(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function r_(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function i_(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function a_(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function o_(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||i_),r.length>1&&r.sort(t||a_),i.length>1&&i.sort(t||a_)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function s_(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new o_,e.set(t,[i])):n>=r.length?(i=new o_,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function c_(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new J,color:new Y};break;case`SpotLight`:n={position:new J,direction:new J,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new J,halfWidth:new J,halfHeight:new J}}return e[t.id]=n,n}}}function l_(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kl};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kl};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kl,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var u_=0;function d_(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function f_(e){let t=new c_,n=l_(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new _u,o=new _u;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(d_);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=u_++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function p_(e){let t=new f_(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function m_(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new p_(e),t.set(n,[a])):r>=i.length?(a=new p_(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var h_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,__=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],v_=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],y_=new _u,b_=new J,x_=new J;function S_(e,t,n){let r=new Ef,i=new Kl,a=new Kl,o=new fu,s=new pp,c=new mp,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new up({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Kl},radius:{value:4}},vertexShader:h_,fragmentShader:g_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Jd;m.setAttribute(`position`,new Nd(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new yf(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(q(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){q(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){q(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new mu(i.x,i.y,{format:Cc,type:uc,minFilter:ec,magFilter:ec,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Xf(i.x,i.y,lc),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=yc,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Zs,d.map.depthTexture.magFilter=Zs}else l.isPointLight?(d.map=new zm(i.x),d.map.depthTexture=new Zf(i.x,cc)):(d.map=new mu(i.x,i.y),d.map.depthTexture=new Xf(i.x,i.y,cc)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=yc,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=ec,d.map.depthTexture.magFilter=ec):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Zs,d.map.depthTexture.magFilter=Zs);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),b_.setFromMatrixPosition(l.matrixWorld),e.position.copy(b_),x_.copy(e.position),x_.add(__[t]),e.up.copy(v_[t]),e.lookAt(x_),e.updateMatrixWorld(),n.makeTranslation(-b_.x,-b_.y,-b_.z),y_.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(y_,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new mu(i.x,i.y,{format:Cc,type:uc}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function C_(e,t){function n(){let t=!1,n=new fu,r=null,i=new fu(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Nl[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(te)[1]),M=N>=1);let P=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new fu().fromArray(re),oe=new fu().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),_e(!1),ve(1),le(e.CULL_FACE),ge(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ue(e.BLEND),g=!1);else if(g===!1&&(le(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Al(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:Al(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:Al(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:Al(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function F(t,n){t.side===2?ue(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),_e(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),be(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function _e(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ve(t){t===0?ue(e.CULL_FACE):(le(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ye(t){t!==k&&(M&&e.lineWidth(t),k=t)}function be(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function xe(t){t?le(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Se(t){t===void 0&&(t=e.TEXTURE0+ee-1),P!==t&&(e.activeTexture(t),P=t)}function I(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+ee-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function Ce(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function Te(){try{e.compressedTexImage3D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function L(){try{e.texSubImage2D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function R(){try{e.compressedTexSubImage2D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function Ae(){try{e.texImage2D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function je(){try{e.texImage3D(...arguments)}catch(e){Al(`WebGLState:`,e)}}function Me(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ne(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Pe(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Fe(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Ie(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Le(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:F,setFlipSided:_e,setCullFace:ve,setLineWidth:ye,setPolygonOffset:be,setScissorTest:xe,activeTexture:Se,bindTexture:I,unbindTexture:Ce,compressedTexImage2D:we,compressedTexImage3D:Te,texImage2D:Ae,texImage3D:je,pixelStorei:Ne,getParameter:Me,updateUBOMapping:Ie,uniformBlockBinding:Le,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:L,texSubImage3D:Ee,compressedTexSubImage2D:R,compressedTexSubImage3D:De,scissor:Pe,viewport:Fe,reset:Re}}function w_(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Kl,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):Tl(`canvas`)}function v(e,t,n){let r=1,i=Oe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),q(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&q(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];q(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||q(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?vl:tu.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,q(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),ee(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),N(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function ee(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&M(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function M(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function N(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let te=0;function P(){te=0}function ne(){return te}function re(e){te=e}function ie(){let e=te;return e>=i.maxTextures&&q(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),te+=1,e}function ae(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function oe(t,i){let a=r.get(t);if(t.isVideoTexture&&R(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)q(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)q(`WebGLRenderer: Texture marked for update but image is incomplete`);else{F(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?F(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ce(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?F(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function le(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?_e(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ue={[Js]:e.REPEAT,[Ys]:e.CLAMP_TO_EDGE,[Xs]:e.MIRRORED_REPEAT},de={[Zs]:e.NEAREST,[Qs]:e.NEAREST_MIPMAP_NEAREST,[$s]:e.NEAREST_MIPMAP_LINEAR,[ec]:e.LINEAR,[tc]:e.LINEAR_MIPMAP_NEAREST,[nc]:e.LINEAR_MIPMAP_LINEAR},fe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function pe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&q(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ue[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ue[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ue[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,de[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,de[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,fe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function me(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ae(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function he(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ge(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=he(n.start,r.width,4),c=he(t.start,r.width,4);n.start<=i+1&&a===c&&he(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function F(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=me(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=tu.getPrimaries(tu.workingColorSpace),r=o.colorSpace===``?null:tu.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=De(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);pe(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===bc,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ge(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=Tm(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else q(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?q(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Tm(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=Oe(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=Oe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,o,s){if(o.image.length!==6)return;let c=me(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=tu.getPrimaries(tu.workingColorSpace),r=o.colorSpace===``?null:tu.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=De(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);pe(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===bc,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?q(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=Oe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ve(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,L(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,L(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,L(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,L(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,L(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function be(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?le(i.depthTexture,0):oe(i.depthTexture,0);let u=c.__webglTexture,d=L(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function xe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)be(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?be(i.__webglFramebuffer[0],t,0):be(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ye(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ye(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,i){let a=r.get(t);n!==void 0&&ve(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&xe(t)}function I(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ee(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=L(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ye(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),pe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ve(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ve(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),pe(c,a),ve(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),pe(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ve(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ve(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&xe(t)}function Ce(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let we=[];function Te(t){if(t.samples>0){if(Ee(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(we.length=0,we.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&we.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,we))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function L(e){return Math.min(i.maxSamples,e.samples)}function Ee(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function R(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(tu.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&q(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):Al(`WebGLTextures: Unsupported texture color space:`,n)),t}function Oe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ie,this.resetTextureUnits=P,this.getTextureUnits=ne,this.setTextureUnits=re,this.setTexture2D=oe,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=le,this.rebindTextures=Se,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Ee,this.dispose=j}function T_(e,t){function n(n,r=``){let i,a=tu.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var E_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,O_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new up({vertexShader:E_,fragmentShader:D_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yf(new tp(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},k_=class extends Pl{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new O_,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new Kl,C=null,w=null,T=new tm;T.viewport=new fu;let E=new tm;E.viewport=new fu;let D=[T,E],O=new um,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new qu,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new qu,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new qu,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,re.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&q(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&q(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?bc:yc,a=_.stencil?pc:cc);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new mu(d.textureWidth,d.textureHeight,{format:vc,type:rc,depthTexture:new Xf(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new mu(f.framebufferWidth,f.framebufferHeight,{format:vc,type:rc,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),re.setContext(r),re.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function N(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;N(O,i);for(let e=0;e<a.length;e++)N(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),te(e,O,i)};function te(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Ll*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let P=null;function ne(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new tm,o.layers.enable(n),o.viewport=new fu,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Qf,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}P&&P(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let re=new Dm;re.setAnimationLoop(ne),this.setAnimationLoop=function(e){P=e},this.dispose=function(){}}},A_=new _u,j_=new Xl;j_.set(-1,0,0,0,1,0,0,0,1);function M_(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,op(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(A_.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(j_),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function N_(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?q(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):q(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var P_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),F_=null;function I_(){return F_===null&&(F_=new Sf(P_,16,16,Cc,uc),F_.name=`DFG_LUT`,F_.minFilter=ec,F_.magFilter=ec,F_.wrapS=Ys,F_.wrapT=Ys,F_.generateMipmaps=!1,F_.needsUpdate=!0),F_}var L_=class{constructor(e={}){let{canvas:t=El(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=rc}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Tc,wc,Sc]),g=new Set([rc,cc,oc,pc,dc,fc]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=gl;let j=0,ee=0,M=null,N=-1,te=null,P=new fu,ne=new fu,re=null,ie=new Y(0),ae=0,oe=t.width,se=t.height,ce=1,le=null,ue=null,de=new fu(0,0,oe,se),fe=new fu(0,0,oe,se),pe=!1,me=new Ef,he=new Of,ge=!1,F=!1,_e=new _u,ve=new J,ye=new fu,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},xe=!1;function Se(){return M===null?ce:1}let I=n;function Ce(e,n){return t.getContext(e,n)}let we,Te,L,Ee,R,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,z,He,Ue;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,Ke,!1),t.addEventListener(`webglcontextrestored`,qe,!1),t.addEventListener(`webglcontextcreationerror`,Je,!1),I===null){let t=`webgl2`;if(I=Ce(t,e),I===null)throw Ce(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}We()}catch(e){throw t.removeEventListener(`webglcontextlost`,Ke,!1),t.removeEventListener(`webglcontextrestored`,qe,!1),t.removeEventListener(`webglcontextcreationerror`,Je,!1),Al(`WebGLRenderer: `+e.message),e}function We(){we=new rh(I),we.init(),z=new T_(I,we),Te=new Lm(I,we,e,z),L=new C_(I,we),Te.reversedDepthBuffer&&d&&L.buffers.depth.setReversed(!0),O=I.createFramebuffer(),k=I.createFramebuffer(),A=I.createFramebuffer(),Ee=new oh(I),R=new r_,De=new w_(I,we,L,R,Te,z,Ee),Oe=new nh(T),ke=new Om(I),He=new Fm(I,ke),Ae=new ih(I,ke,Ee,He),je=new ch(I,Ae,ke,He,Ee),ze=new sh(I,Te,De),Ie=new Rm(R),Me=new n_(T,Oe,we,Te,He,Ie),Ne=new M_(T,R),Pe=new s_,Fe=new m_(we),Re=new Pm(T,Oe,L,je,p,s),Le=new S_(T,je,Te),Ue=new N_(I,Ee,Te,L),Be=new Im(I,we,Ee),Ve=new ah(I,we,Ee),Ee.programs=Me.programs,T.capabilities=Te,T.extensions=we,T.properties=R,T.renderLists=Pe,T.shadowMap=Le,T.state=L,T.info=Ee}m!==1009&&(w=new uh(m,t.width,t.height,o,r,i));let Ge=new k_(T,I);this.xr=Ge,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=we.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=we.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(e){e!==void 0&&(ce=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){Ge.isPresenting?q(`WebGLRenderer: Can't change size while VR device is presenting.`):(oe=e,se=n,t.width=Math.floor(e*ce),t.height=Math.floor(n*ce),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(oe*ce,se*ce).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,ce=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)Al(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){q(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(de)},this.setViewport=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),L.viewport(P.copy(de).multiplyScalar(Se()).round())},this.getScissor=function(e){return e.copy(fe)},this.setScissor=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),L.scissor(ne.copy(fe).multiplyScalar(Se()).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(e){L.setScissorTest(pe=e)},this.setOpaqueSort=function(e){le=e},this.setTransparentSort=function(e){ue=e},this.getClearColor=function(e){return e.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Re.getClearColor(),r=Re.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,I.clearBufferuiv(I.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,I.clearBufferiv(I.COLOR,0,v))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ke,!1),t.removeEventListener(`webglcontextrestored`,qe,!1),t.removeEventListener(`webglcontextcreationerror`,Je,!1),Re.dispose(),Pe.dispose(),Fe.dispose(),De.dispose(),R.dispose(),Oe.dispose(),je.dispose(),Ae.dispose(),He.dispose(),Ue.dispose(),Me.dispose(),Ge.dispose(),Ge.removeEventListener(`sessionstart`,tt),Ge.removeEventListener(`sessionend`,nt),rt.stop()};function Ke(e){e.preventDefault(),Ol(`WebGLRenderer: Context Lost.`),E=!0}function qe(){Ol(`WebGLRenderer: Context Restored.`),E=!1;let e=Ee.autoReset,t=Le.enabled,n=Le.autoUpdate,r=Le.needsUpdate,i=Le.type;We(),Ee.autoReset=e,Le.enabled=t,Le.autoUpdate=n,Le.needsUpdate=r,Le.type=i}function Je(e){Al(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ye(e){let t=e.target;t.removeEventListener(`dispose`,Ye),Xe(t)}function Xe(e){Ze(e),R.remove(e)}function Ze(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){Me.releaseProgram(e)}),e.isShaderMaterial&&Me.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=be);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=pt(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ae.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;He.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=ke.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*Se()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*Se()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh){if(we.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ke.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Qe(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),ge===!0&&Ie.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,lt(e,t,r),e.side=0,e.needsUpdate=!0,lt(e,t,r),e.side=2):lt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Fe.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),F=this.localClippingEnabled,ge=Ie.init(this.clippingPlanes,F),ge===!0&&Ie.setGlobalState(this.clippingPlanes,t),D!==null&&Le.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Qe(o,n,t,e),r.add(o)}else Qe(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=R.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}we.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let $e=null;function et(e){$e&&$e(e)}function tt(){rt.stop()}function nt(){rt.start()}let rt=new Dm;rt.setAnimationLoop(et),typeof self<`u`&&rt.setContext(self),this.setAnimationLoop=function(e){$e=e,Ge.setAnimationLoop(e),e===null?rt.stop():rt.start()},Ge.addEventListener(`sessionstart`,tt),Ge.addEventListener(`sessionend`,nt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){Al(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ge.enabled===!0&&Ge.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(t),t=Ge.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Fe.get(e,C.length),x.init(t),x.state.textureUnits=De.getTextureUnits(),C.push(x),_e.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?he.setFromArrayCamera(t):me.setFromProjectionMatrix(_e,Sl,t.reversedDepth),F=this.localClippingEnabled,ge=Ie.init(this.clippingPlanes,F),b=Pe.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,Ge.enabled===!0&&Ge.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&it(e,t,-1/0,T.sortObjects)}it(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(le,ue),xe=Ge.enabled===!1||Ge.isPresenting===!1||Ge.hasDepthSensing()===!1,xe&&Re.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),ge===!0&&Ie.beginShadows();let i=x.state.shadowsArray;if(Le.render(i,e,t),ge===!0&&Ie.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];at(n,r,e,a)}xe&&Re.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];B(b,e,n,n.viewport)}}else r.length>0&&at(n,r,e,t),xe&&Re.render(e),B(b,e,t)}M!==null&&ee===0&&(De.updateMultisampleRenderTarget(M),De.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),He.resetDefaultState(),N=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],De.setTextureUnits(x.state.textureUnits),ge===!0&&Ie.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function it(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?he:me;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&ye.setFromMatrixPosition(e.matrixWorld).applyMatrix4(_e);let i=je.update(e),a=e.material;a.visible&&b.push(e,i,a,n,ye.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?he:me;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=je.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ye.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ye.copy(e.boundingSphere.center)),ye.applyMatrix4(e.matrixWorld).applyMatrix4(_e)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,ye.z,s,t)}}else a.visible&&b.push(e,i,a,n,ye.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)it(i[e],t,n,r)}function B(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&Ie.setGlobalState(T.clippingPlanes,n),r&&L.viewport(P.copy(r)),i.length>0&&ot(i,t,n),a.length>0&&ot(a,t,n),o.length>0&&ot(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function at(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=we.has(`EXT_color_buffer_half_float`)||we.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new mu(1,1,{generateMipmaps:!0,type:e?uc:rc,minFilter:nc,samples:Math.max(4,Te.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tu.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),xe&&Re.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&Ie.setGlobalState(T.clippingPlanes,r),ot(e,n,r),De.updateMultisampleRenderTarget(a),De.updateRenderTargetMipmap(a),we.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,st(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(De.updateMultisampleRenderTarget(a),De.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ot(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&st(o,t,n,s,l,c)}}function st(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ct(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function lt(e,t,n){t.isScene!==!0&&(t=be);let r=R.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Me.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Me.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Oe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ye),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ft(e,s),d}else s.uniforms=Me.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Me.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ie.uniform),ft(e,s),r.needsLights=ht(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=ct(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function ut(e,t,n,r,i){let a=R.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=lt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=yg.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ft(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function pt(e,t,n,r,i){t.isScene!==!0&&(t=be),De.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:tu.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Oe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=R.get(r),b=x.state.lights;if(ge===!0&&(F===!0||e!==te)){let t=e===te&&r.id===N;Ie.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ie.numPlanes||v.numIntersection!==Ie.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===ct(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?ut(r,t,i,s,h):lt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(L.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==N&&(N=r.id,O=!0),E||te!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(I,`projectionMatrix`,e.projectionMatrix),A.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(I,ve.setFromMatrixPosition(e.matrixWorld)),Te.logarithmicDepthBuffer&&A.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(I,`sunShadowMap`,b.state.sunShadowMap,De),b.state.directionalShadowMap.length>0&&A.setValue(I,`directionalShadowMap`,b.state.directionalShadowMap,De),b.state.spotShadowMap.length>0&&A.setValue(I,`spotShadowMap`,b.state.spotShadowMap,De),b.state.pointShadowMap.length>0&&A.setValue(I,`pointShadowMap`,b.state.pointShadowMap,De)),i.isSkinnedMesh){A.setOptional(I,i,`bindMatrix`),A.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(I,`boneTexture`,e.boneTexture,De))}i.isBatchedMesh&&(A.setOptional(I,i,`batchingTexture`),A.setValue(I,`batchingTexture`,i._matricesTexture,De),A.setOptional(I,i,`batchingIdTexture`),A.setValue(I,`batchingIdTexture`,i._indirectTexture,De),A.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(I,`batchingColorTexture`,i._colorsTexture,De));let ee=n.morphAttributes;if((ee.position!==void 0||ee.normal!==void 0||ee.color!==void 0)&&ze.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(I,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=I_()),O){if(A.setValue(I,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&mt(j,k),a&&r.fog===!0&&Ne.refreshFogUniforms(j,a),Ne.refreshMaterialUniforms(j,r,ce,se,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}yg.upload(I,dt(v),j,De)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(yg.upload(I,dt(v),j,De),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(I,`center`,i.center),A.setValue(I,`modelViewMatrix`,i.modelViewMatrix),A.setValue(I,`normalMatrix`,i.normalMatrix),A.setValue(I,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ue.update(n,w),Ue.bind(n,w)}}return w}function mt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ht(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=R.get(e);if(o.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(I.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,L.viewport(P),L.scissor(ne),L.setScissorTest(re),N=-1;return}if(o.__webglFramebuffer===void 0)De.setupRenderTarget(e);else if(o.__hasExternalTextures)De.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);De.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&De.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else P.copy(de).multiplyScalar(ce).floor(),ne.copy(fe).multiplyScalar(ce).floor(),re=pe;if(n!==0&&(r=O),L.bindFramebuffer(I.FRAMEBUFFER,r)&&L.drawBuffers(e,r),L.viewport(P),L.scissor(ne),L.setScissorTest(re),i){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}N=-1};function gt(e){let t=R.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Te.textureFormatReadable(e.format),t.__typeReadable=Te.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){Al(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let u=gt(o);if(u.__formatReadable===!1){Al(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){Al(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&I.readPixels(t,n,r,i,z.convert(c),z.convert(l),a)}finally{let e=M===null?null:R.get(M).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let d=gt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),I.readPixels(t,n,r,i,z.convert(l),z.convert(u),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let p=M===null?null:R.get(M).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,p);let m=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Ml(I,m,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(f),I.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;De.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=z.convert(t.format),_=z.convert(t.type),v;t.isData3DTexture?(De.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(De.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(De.setTexture2D(t,0),v=I.TEXTURE_2D),L.activeTexture(I.TEXTURE0),L.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),L.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),L.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=L.getParameter(I.UNPACK_ROW_LENGTH),b=L.getParameter(I.UNPACK_IMAGE_HEIGHT),x=L.getParameter(I.UNPACK_SKIP_PIXELS),S=L.getParameter(I.UNPACK_SKIP_ROWS),C=L.getParameter(I.UNPACK_SKIP_IMAGES);L.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),L.pixelStorei(I.UNPACK_SKIP_PIXELS,l),L.pixelStorei(I.UNPACK_SKIP_ROWS,u),L.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,k),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);L.pixelStorei(I.UNPACK_ROW_LENGTH,y),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),L.pixelStorei(I.UNPACK_SKIP_PIXELS,x),L.pixelStorei(I.UNPACK_SKIP_ROWS,S),L.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&De.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?De.setTextureCube(e,0):e.isData3DTexture?De.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?De.setTexture2DArray(e,0):De.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,L.reset(),He.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Sl}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=tu._getDrawingBufferColorSpace(e),t.unpackColorSpace=tu._getUnpackColorSpace()}};function R_(e,t){return{width:e,height:t,pixels:new Int32Array(e*t).fill(-1)}}function z_(e,t,n){return t<0||n<0||t>=e.width||n>=e.height?-1:e.pixels[n*e.width+t]??-1}function Z(e,t,n,r){t<0||n<0||t>=e.width||n>=e.height||(e.pixels[n*e.width+t]=r)}function B_(e,t,n,r,i,a){for(let o=Math.floor(n-i);o<=Math.ceil(n+i);o++)for(let s=Math.floor(t-r);s<=Math.ceil(t+r);s++){let c=(s+.5-t)/r,l=(o+.5-n)/i;c*c+l*l<=1&&Z(e,s,o,a)}}function V_(e,t,n,r,i,a){let o=Math.abs(r-t),s=-Math.abs(i-n),c=t<r?1:-1,l=n<i?1:-1,u=o+s,d=t,f=n;for(;;){if(Z(e,d,f,a),d===r&&f===i)return;let t=2*u;t>=s&&(u+=s,d+=c),t<=o&&(u+=o,f+=l)}}function H_(e,t){let n=[];for(let t=0;t<e.height;t++)for(let r=0;r<e.width;r++)z_(e,r,t)===-1&&(z_(e,r-1,t)!==-1||z_(e,r+1,t)!==-1||z_(e,r,t-1)!==-1||z_(e,r,t+1)!==-1)&&n.push(t*e.width+r);for(let r of n)e.pixels[r]=t}function U_(e){let t=new Uint8Array(e.width*e.height*4);for(let n=0;n<e.height;n++){let r=(e.height-1-n)*e.width;for(let i=0;i<e.width;i++){let a=z_(e,i,n),o=(r+i)*4;a!==-1&&(t[o]=a>>16&255,t[o+1]=a>>8&255,t[o+2]=a&255,t[o+3]=255)}}return t}function W_(e,t,n){let r=Math.imul(e,374761393)^Math.imul(t,668265263)^Math.imul(n,2147483647);return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296}var G_=`#ff00ff`,K_=`#0b0c12`,Q=[`#1b1f29`,`#292e3b`,`#383e4d`,`#4a5163`,`#5e667a`,`#757e95`],q_=[`#4f566a`,`#6a7187`,`#878ea2`,`#a7adbd`],J_={deep:`#14151c`,dark:`#1f2029`,mid:`#2e303c`,light:`#474a5a`},Y_={deep:`#4a3c22`,dark:`#6b5730`,mid:`#8a7440`,light:`#ad9558`},X_={deep:`#181a2a`,dark:`#22253a`,mid:`#2d314d`,light:`#3d4263`},Z_={deep:`#17130f`,dark:`#241d17`,mid:`#352a20`,light:`#4a3b2c`},Q_={core:`#fff0b8`,bright:`#ffc057`,mid:`#ff8a2e`,deep:`#c4471a`},$_=()=>new $n(1.15);function ev(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function $(e,t,n,r,i,a){e.poly([H(t,n),H(t+r,n),H(t+r,n+i),H(t,n+i)],a)}var tv=(e,t,n)=>Math.max(t,Math.min(n,e)),nv=(e,t)=>e[tv(Math.round(t),0,e.length-1)];function rv(e,t){let n=t.ramp??Q,r=ev(t.seed);$(e,t.x,t.y,t.w,t.h,n[0]);let i=0;for(let a=t.y;a<t.y+t.h;a+=t.course,i++){let o=Math.min(t.course,t.y+t.h-a)-1,s=t.x-(i%2?t.block/2:0)-Math.floor(r()*3);for(;s<t.x+t.w;){let i=t.block+Math.floor((r()-.5)*t.block*.5),c=Math.max(t.x,s),l=Math.min(t.x+t.w,s+i)-1;if(l>c&&o>0){let s=t.shade+(r()-.5)*1.7+(t.tone?.(c+i/2,a)??0);$(e,c,a,l-c,o,nv(n,s));let u=r();u<.22&&o>2?$(e,c,a,l-c,1,nv(n,s+1)):u>.93&&$(e,l-3,a+o-2,3,2,n[0])}s+=i}}}function iv(e,t,n,r,i,a=K_,o=1){let s=ev(i),c=[t],l=t,u=n,d=Math.max(2,Math.round(r/7));for(let t=0;t<d;t++){u+=(s()-.5)*70,u+=(n-u)*.35;let f=r/d*(.6+s()*.8),p=u*Math.PI/180;l=H(l.x+Math.cos(p)*f,l.y+Math.sin(p)*f),c.push(l),t===Math.floor(d/2)&&r>24&&iv(e,l,n+(s()<.5?-50:50),r*.4,i+17,a,o)}e.line(c,a,o*.8)}function av(e,t,n,r,i,a,o,s=Q){let c=(a()-.5)*i*.5,l=(a()-.5)*r*.3,u=[H(t-r/2,n),H(t-r/2+l*.4,n-i+c),H(t+r/2+l,n-i-c),H(t+r/2,n)];e.poly(u,nv(s,o),K_,1);let d=Math.max(1.5,i*.28);e.poly([u[1],u[2],H(u[2].x-1.5,u[2].y+d),H(u[1].x+1.5,u[1].y+d)],nv(s,o+1.4))}function ov(e,t,n,r,i,a,o=2,s=Q){let c=ev(a),l=Math.max(5,Math.round(r*i/90)),u=Array.from({length:l},()=>{let e=(c()+c()+c())/3-.5,t=(1-Math.abs(e)*2)**.8*i;return{along:e,rise:c()*t*.75,size:.55+c()*.9}});u.sort((e,t)=>t.rise-e.rise);let d=Math.max(5,Math.sqrt(r*i/l)*.95);for(let i of u){let a=d*i.size*(.9+c()*.7),l=d*i.size*(.5+c()*.4);av(e,t+i.along*r,n-i.rise,a,l,c,o+(c()-.5)*1.6,s)}for(let i=0;i<l;i++)av(e,t+(c()-.5)*r*1.15,n,2+c()*3,1.5+c()*2,c,o+c(),s)}function sv(e,t,n,r,i){let a=n/2,o=[H(e-a,t),H(e-a,r)];for(let t=1;t<5;t++){let n=t/5;o.push(H(e-a+a*n**1.6,r-(r-i)*Math.sin(n*Math.PI/2)))}o.push(H(e,i));for(let t=4;t>=1;t--){let n=t/5;o.push(H(e+a-a*n**1.6,r-(r-i)*Math.sin(n*Math.PI/2)))}return o.push(H(e+a,r),H(e+a,t)),o}var cv={width:116,height:166};function lv(e,t,n,r,i,a){$(e,t,n,r,i,nv(Q,a)),$(e,t,n,r,2,nv(Q,a+2)),$(e,t,n,2,i,nv(Q,a+1)),$(e,t+r-2,n,2,i,nv(Q,a-1)),$(e,t,n+i-1,r,1,K_),$(e,t-1,n,1,i,K_),$(e,t+r,n,1,i,K_),$(e,t,n-1,r,1,K_)}function uv(e,t,n,r,i,a=[]){for(let o=0;o<r;o++){if(a.includes(o))continue;let s=o/r*Math.PI*2+Math.PI/r;e.poly([H(t.x+Math.cos(s-.2)*n,t.y+Math.sin(s-.2)*n),H(t.x+Math.cos(s)*(n+i),t.y+Math.sin(s)*(n+i)),H(t.x+Math.cos(s+.2)*n,t.y+Math.sin(s+.2)*n)],Y_.mid)}e.dot(t,n,Y_.mid,K_,1),e.dot(t,n*.62,Y_.dark),e.dot(H(t.x-1,t.y-1),n*.3,Y_.light)}var dv={name:`throne`,width:cv.width,height:cv.height,outlined:!0,draw(e){let t=ev(71),n=cv.height-3,r=n-40,i=r-26,a=n-116;e.poly([H(76,n-14),H(92,n-14),H(96,a+10),H(87,a-8),H(78,a+6)],nv(Q,2),K_,1),e.poly([H(72,r),H(77,r),H(79,a+10),H(74,a+14)],X_.mid,K_,1);for(let t=r-8;t>a+18;t-=9)e.dot(H(76,t),1.1,Y_.light);e.poly([H(79,a+6),H(87,a-7),H(89,a-3),H(82,a+9)],nv(Q,4)),e.line([H(90,n-20),H(93,a+14)],nv(Q,0),1),e.poly([H(81,r-6),H(88,r-6),H(90,a+22),H(83,a+22)],nv(Q,1)),e.line([H(85,r-10),H(86.5,a+28)],Y_.dark,1.2),e.line([H(87,a-6),H(87,a-14)],Y_.dark,2),uv(e,H(88.5,a-21),7.5,10,6,[1,2,6,7]),e.line([H(85,a-23),H(91,a-19)],K_,.9),lv(e,32,r,50,n-14-r,2),$(e,38,r+7,36,14,nv(Q,1)),$(e,40,r+9,32,10,nv(Q,2)),uv(e,H(57,r+14),2.6,8,2.4),$(e,29,r-6,46,6,X_.mid),$(e,29,r-6,46,2,X_.light),$(e,29,r-7,46,1,K_),$(e,28,r-6,1,6,K_),$(e,38,i+6,38,r-i-13,nv(Q,0));let o=H(50,r-7);e.poly([H(o.x-7,o.y),H(o.x-8,o.y-7),H(o.x-4,o.y-4),H(o.x,o.y-9),H(o.x+4,o.y-4),H(o.x+8,o.y-7),H(o.x+7,o.y)],Y_.light,K_,1),$(e,o.x-7,o.y-2,14,2,Y_.mid),lv(e,32,i+4,7,r-i-10,3),lv(e,28,i,52,6,3),e.dot(H(28,i+2),5,Y_.mid,K_,1),e.dot(H(27,i+1),2,Y_.light),lv(e,14,n-21,20,7,2),lv(e,8,n-14,cv.width-8-8,7,3),lv(e,4,n-7,cv.width-8,7,2),$(e,10,n-10,cv.width-8-12,1,Y_.dark),$(e,6,n-3,cv.width-8-4,1,Y_.dark),e.poly([H(91.5,a+1),H(99,a-2),H(99,a+27),H(95,a+22),H(96,a+15),H(92.5,a+9)],G_),e.poly([H(2,n-9),H(12,n-9),H(10,n-5),H(7,n-4),H(6,n+1),H(2,n+1)],G_),e.poly([H(cv.width-15,n-15),H(cv.width-6,n-15),H(cv.width-6,n-9),H(cv.width-11,n-10),H(cv.width-12,n-13)],G_),iv(e,H(91,a+30),100,50,5,K_,1.2),iv(e,H(82,a+20),78,30,12,K_),iv(e,H(52,r+3),82,22,9,K_),iv(e,H(70,i+1),20,16,21,K_),iv(e,H(38,n-13),12,26,33,K_),iv(e,H(78,n-6),170,22,41,K_);for(let[t,r,i]of[[42,26,5],[49,17,3],[82,44,6],[89,30,4]])e.poly([H(t,n-14),H(t+i,n-14),H(t+i*.8,n-14-r*.6),H(t+i*.4,n-14-r),H(t+i*.1,n-14-r*.5)],nv(Q,0));for(let t=0;t<3;t++){let n=60+t*5;e.line([H(n,r+24),H(n+9,r+5)],K_,1.1),e.line([H(n+1,r+24),H(n+10,r+5)],nv(Q,4),.8)}e.line([H(36,r-5),H(41,r-2),H(45,r-5)],K_,1),e.dot(H(41,r-5),1.4,nv(Q,5)),e.dot(H(44,r-3),1,nv(Q,4)),e.poly([H(28,r-5),H(33,r-5),H(33,r+6),H(31,r+3),H(30,r+9),H(28,r+4)],X_.dark,K_,.8),e.poly([H(63,i-1),H(81,i-1),H(82,i+16),H(78,i+11),H(75,i+20),H(71,i+13),H(68,i+23),H(65,i+12),H(63,i+15)],X_.mid,K_,.9),$(e,63,i-1,19,2,X_.light),e.line([H(66,i+3),H(67,i+12)],X_.dark,1),e.line([H(74,i+3),H(74.5,i+17)],X_.dark,1),e.line([H(79,i+2),H(80,i+13)],Y_.dark,1);for(let[t,n,r]of[[82,a+34,15],[85,a+52,13],[81,a+70,5]])e.line([H(t,n),H(t-r,n-r*.45)],Z_.light,1.2),r>8&&(e.line([H(t-r,n-r*.45-2),H(t-r+4,n-r*.45+1.4)],Y_.dark,1),e.line([H(t-r-1,n-r*.45+1),H(t-r+3,n-r*.45+3.4)],Y_.dark,1));$(e,30,n-10,9,1,nv(Q,3)),$(e,74,n-10,6,1,nv(Q,3)),$(e,48,n-3,11,1,nv(Q,2));for(let r=0;r<12;r++)$(e,8+t()*84,n-14+t()*12,2+t()*2,1,nv(Q,t()<.5?0:4));av(e,20,n-14,6,4,t,3),av(e,25,n-7,4,3,t,2),av(e,60,n-14,5,3,t,3);for(let r=0;r<4;r++)av(e,80+t()*22,n-(r%2?14:0),4+t()*5,3+t()*3,t,2)}},fv={width:104,height:46},pv=[H(22,17),H(52,9),H(83,20)],mv={name:`chandelier`,width:fv.width,height:fv.height,outlined:!0,draw(e){let t=ev(19),n=H(52,30);e.oval(n,44,11,-5,J_.dark,K_),e.oval(H(n.x,n.y-2),44,9,-5,J_.mid),e.oval(H(n.x,n.y-1),39,6,-5,G_);for(let t of[-36,-14,12,34])e.line([H(n.x+t,n.y-3-t*.08),H(n.x,n.y-9)],J_.mid,1.2);e.dot(H(n.x,n.y-9),3.5,J_.light,K_,1);let r=[H(n.x,n.y-11)];for(let e=1;e<9;e++)r.push(H(n.x+e*5.5,n.y-12+Math.sin(e*1.3)*3+e*1.6));e.line(r,J_.light,1.2);for(let r=0;r<9;r++){let i=r/9*Math.PI*2,a=n.x+Math.cos(i)*42,o=n.y-3+Math.sin(i)*8-Math.cos(i)*3.5;$(e,a-2.5,o-2,5,2.5,Y_.dark),t()<.5&&$(e,a-1,o-5-t()*3,2,4,q_[3])}for(let t of pv)$(e,t.x-1,t.y,2,6,q_[3]);for(let n=0;n<7;n++)av(e,8+t()*88,fv.height-3,3+t()*3,2+t()*2,t,1.5)},glow(e){for(let t of pv)e.poly([H(t.x-1.5,t.y),H(t.x,t.y-5),H(t.x+1.5,t.y)],Q_.bright),$(e,t.x-.5,t.y-2,1,2,Q_.core)}},hv={width:40,height:60},gv={name:`brazier`,width:hv.width,height:hv.height,outlined:!0,draw(e){let t=hv.height-3,n=hv.width/2;for(let r of[-12,0,12])e.line([H(n+r*.25,t-26),H(n+r,t)],J_.mid,1.8);$(e,n-4,t-30,8,5,J_.light),e.poly([H(n-15,t-40),H(n+15,t-40),H(n+10,t-29),H(n-10,t-29)],J_.dark,K_,1),e.poly([H(n-15,t-40),H(n-6,t-40),H(n-5,t-29),H(n-10,t-29)],J_.light),$(e,n-16,t-42,32,3,J_.light),$(e,n-16,t-42,32,1,Y_.dark);for(let r of[-9,-3,4,9])e.dot(H(n+r,t-43),3,Z_.deep)},glow(e){let t=hv.height-3,n=hv.width/2;e.poly([H(n-10,t-43),H(n-7,t-50),H(n-3,t-46),H(n,t-56),H(n+4,t-47),H(n+7,t-52),H(n+10,t-43)],Q_.mid),e.poly([H(n-5,t-43),H(n-1,t-50),H(n+2,t-46),H(n+5,t-43)],Q_.bright),$(e,n-1,t-46,2,3,Q_.core);for(let r of[-8,6])$(e,n+r,t-42,2,1,Q_.deep)}},_v={width:170,height:150},vv=[H(38,96),H(84,60),H(120,118),H(61,132)],yv={name:`beams`,width:_v.width,height:_v.height,outlined:!0,draw(e){let t=ev(27),n=_v.height-3,r=(n,r,i)=>{let a=r.x-n.x,o=r.y-n.y,s=Math.hypot(a,o)||1,c=-o/s*i*.5,l=a/s*i*.5;e.poly([H(n.x+c,n.y+l),H(r.x+c,r.y+l),H(r.x-c,r.y-l),H(n.x-c,n.y-l)],Z_.dark,K_,1),e.line([H(n.x-c*.6,n.y-l*.6),H(r.x-c*.6,r.y-l*.6)],Z_.light,1);for(let r=0;r<s/13;r++){let r=t();e.oval(H(n.x+a*r,n.y+o*r),2+t()*3,i*.3,Math.atan2(o,a)*180/Math.PI,Z_.deep)}};r(H(8,n),H(128,14),10),r(H(54,n),H(160,70),9),r(H(20,n-4),H(96,n-8),8),r(H(100,n),H(132,40),7),ov(e,60,n,110,16,31,1.5)},glow(e){for(let t of vv)$(e,t.x,t.y,3,1,Q_.deep),$(e,t.x+1,t.y-1,1,1,Q_.mid)}};function bv(e,t,n,r,i){let a=Math.round(t*1.2)+12;return{name:e,width:a,height:n+18,outlined:!0,draw(e){ov(e,a/2,n+15,t,n,r,i)}}}var xv={breach:bv(`rubble-breach`,190,46,41,2.2),small:bv(`rubble-small`,78,22,52,2.4),low:bv(`rubble-low`,120,18,63,2.2),near:bv(`rubble-near`,300,84,74,1.6)},Sv={chandelier:pv[1],brazier:H(hv.width/2,hv.height-50),beams:vv[1]};[...Object.values(xv)];var Cv=68,wv=40,Tv=2;function Ev(e){let t=3.9-Math.abs(e-.26)*5.2;return Math.max(t,e>.86?1.6:.9)}function Dv(e,t,n,r,i){let a=ev(i),o=t-wv/2;for(let t=0;t<wv;t+=5){let i=Ev((t+5/2)/wv);$(e,o+t,n,5,r-n,nv(Q,i)),$(e,o+t,n,1,r-n,nv(Q,i-1.3)),i>2.4&&$(e,o+t+1,n,1,r-n,nv(Q,i+1))}for(let t=r-58;t>n;t-=58+Math.floor(a()*6))$(e,o,t,wv,1,Q[0]),$(e,o,t+1,wv,1,nv(Q,3.5));for(let t=0;t<(r-n)/34;t++){let s=n+6+a()*Math.max(1,r-n-30),c=o+8+a()*24;a()<.5?iv(e,H(c,s),85+a()*10,10+a()*14,i+t,Q[0]):e.oval(H(c,s),2+a()*3,1.5+a()*3,a()*90,nv(Q,.6))}$(e,o-1,n,1,r-n,K_),$(e,o+wv,n,1,r-n,K_)}function Ov(e,t,n,r,i,a){$(e,t-r/2,n,r,i,nv(Q,a)),$(e,t-r/2,n,r*.45,i,nv(Q,a+1)),$(e,t-r/2,n,r,1,nv(Q,a+2)),$(e,t-r/2,n+i-1,r,1,Q[0]),$(e,t-r/2-1,n,1,i,K_),$(e,t+r/2,n,1,i,K_)}function kv(e,t,n){return Ov(e,t,n-9,58,9,2.2),Ov(e,t,n-14,52,5,2.8),Ov(e,t,n-18,46,4,2.4),n-18}function Av(e,t,n,r){let i=Math.round(t*20)+Tv;return{name:e,width:Cv,height:i,outlined:!0,draw(e){let t=ev(r),a=Cv/2,o=kv(e,a,i-Tv),s=Tv+(n?22:0);Dv(e,a,s,o,r);for(let n=0;n<26;n++){let n=a-wv/2+t()*wv,r=o-t()**2*60;$(e,Math.round(n),Math.round(r),2,1+Math.round(t()*2),Q[0])}if(n)Ov(e,a,s-4,44,4,2.6),e.poly([H(12,s-4),H(56,s-4),H(62,s-14),H(6,s-14)],nv(Q,2.6),K_,1),e.poly([H(12,s-4),H(30,s-4),H(28,s-14),H(6,s-14)],nv(Q,3.6)),Ov(e,a,s-22,60,8,3);else{let n=t()<.5?-1:1,r=[H(a-wv/2-3,0)];for(let e=-23;e<=23;e+=4.6){let i=(e/wv*n+.5)*16;r.push(H(a+e,5+i+t()*9))}r.push(H(57,0)),e.poly(r,G_);for(let r=-18;r<wv/2-2;r+=4){let i=(r/wv*n+.5)*16;$(e,a+r,15+i+t()*4,3,2,nv(Q,4.5))}}}}}function jv(e,t){return{name:e,width:58,height:40,outlined:!0,draw(e){let n=ev(t);for(let t=0;t<35;t+=4){let n=Ev(t/35)-.3;$(e,12,3+t,42,4,nv(Q,n)),$(e,12,3+t+3,42,1,nv(Q,n-1.4))}e.poly([H(50,3),H(55,13.5),H(52,24),H(56,38),H(44,38),H(44,3)],nv(Q,1.4)),e.oval(H(13,20.5),10,35/2,0,nv(Q,3.2),K_),e.oval(H(13,20.5),6,35/2-5,0,nv(Q,2.4)),e.dot(H(13,20.5),2,Q[0]),iv(e,H(20+n()*20,6),80,29,t+3,Q[0])}}}var Mv={whole:Av(`column-whole`,13.2,!0,5),tall:Av(`column-tall`,8.4,!1,12),mid:Av(`column-mid`,5.2,!1,23),stump:Av(`column-stump`,2.1,!1,34)},Nv=[jv(`drum-a`,3),jv(`drum-b`,8)];[...Object.values(Mv),...Nv];var Pv={width:60,depth:24,back:-8.2},Fv={back:-1.5,front:2.3,end:13},Iv=32,Lv=[2961982,3685964,4475739,5331307],Rv=[1645605,2040621,2501430,3027776],zv=1184795,Bv=5660274,Vv=[3488584,4278101,5133411],Hv=[921622,1316381,1711398],Uv=[1710896,2369349,3027545,3817326],Wv=[5982761,8021560];function Gv(e,t,n,r){let i=e/n,a=t/n,o=Math.floor(i),s=Math.floor(a),c=i-o,l=a-s,u=c*c*(3-2*c),d=l*l*(3-2*l),f=W_(o,s,r),p=W_(o+1,s,r),m=W_(o,s+1,r),h=W_(o+1,s+1,r);return f+(p-f)*u+(m-f)*d+(f-p-m+h)*u*d}var Kv=(e,t)=>e[Math.max(0,Math.min(e.length-1,Math.round(t)))],qv=[[4.2,-3.6,3.4],[-9.5,-2.6,1.8],[-1.2,.6,1.5],[11,4.5,2.2],[-15,3,2.6],[1.5,6.5,1.6]];function Jv(){let e=Pv.width*16,t=Pv.depth*16,n=R_(e,t),r=e=>e/16-Pv.width/2,i=e=>e/16+Pv.back;for(let r=0;r<t;r++)for(let t=0;t<e;t++){let i=Math.floor(t/Iv),a=Math.floor(r/Iv),o=(i+a)%2==0,s=1+W_(i,a,3)*1.4+(Gv(t,r,9,5)-.5)*1.3;W_(t,r,7)>.95&&(s+=1);let c=Kv(o?Rv:Lv,s);(t%Iv===0||r%Iv===0)&&(c=zv),n.pixels[r*e+t]=c}for(let r=0;r<150;r++){let i=Math.floor(W_(r,1,11)*e),a=Math.floor(W_(r,2,11)*t),o=W_(r,3,11)<.25,s={x:i,y:a},c=o?9:3;for(let e=0;e<c;e++){let t={x:s.x+Math.round((W_(r,e,13)-.5)*(o?44:22)),y:s.y+Math.round((W_(r,e,17)-.5)*(o?20:14))};V_(n,s.x,s.y,t.x,t.y,o?zv:Bv),s=t}}for(let a=0;a<t;a++)for(let t=0;t<e;t++){let o=r(t),s=i(a),c=W_(t,a,23),l=(Gv(t,0,5,29)-.5)*.35,u=Math.min(s-(Fv.back+l),Fv.front-l-s),d=Gv(t,a,26,31)+Gv(t,a,7,37)*.35;if(u>0&&d<.93&&o<Fv.end){let r=Kv(Uv,1+Gv(t,a*3,30,41)*2+ +(c>.9)-(d>.86?2:0));u>.3&&u<.48&&(r=Kv(Wv,c*1.6)),Math.abs(s-(Fv.back+Fv.front)/2)+Math.abs((o%2+2)%2-1)*.35<.16&&(r=Kv(Wv,0)),n.pixels[a*e+t]=r}for(let[r,i,l]of qv){let u=Math.hypot(o-r,(s-i)*1.25)/l;u<1&&c>u**2.2&&(n.pixels[a*e+t]=Kv(Hv,(1-u)*1.5+c))}let f=Gv(t,a,40,43)*.75+Gv(t,a,11,47)*.25,p=Math.max(0,1-(s-Pv.back)/2.2)*.3;f+p>.7&&c>.3&&(n.pixels[a*e+t]=Kv(Vv,(f+p-.7)*9+c*.6-.3))}for(let r=0;r<520;r++){let i=Math.floor(W_(r,5,53)*e),a=Math.floor(W_(r,6,53)*t);Z(n,i,a,W_(r,7,53)<.5?Vv[1]:zv),W_(r,8,53)<.3&&Z(n,i+1,a,zv)}return n}function Yv(){let e=R_(Iv,Iv);for(let t=0;t<Iv;t++)for(let n=0;n<Iv;n++){let r=1.6+(Gv(n,t,8,61)-.5)*1.6+ +(W_(n,t,67)>.94);Z(e,n,t,n===0||t===0?zv:Kv(Lv,r))}return V_(e,5,9,14,13,Bv),V_(e,14,13,19,24,Bv),e}function Xv(){let e=R_(96,7);for(let t=0;t<7;t++)for(let n=0;n<96;n++){let r=1.2+W_(Math.floor(n/24),0,71)*1.3+(W_(n,t,73)>.9?.8:0);t===0&&(r+=1.4),Z(e,n,t,n%24==0||t===6?zv:Kv(Lv,r))}return e}var Zv=Fv.front-Fv.back,Qv=(Fv.back+Fv.front)/2;function $v(e){let t=Math.round(Zv*16),n=R_(e?t:32,e?32:t);for(let r=0;r<t;r++)for(let i=0;i<32;i++){let a=(Math.min(r,t-1-r)+.5)/16,o=Math.abs((r+.5)/16-Zv/2),s=Math.abs((i+.5)/16-1),c=W_(r,i,97),l=Kv(Uv,1.4+c);a>.3&&a<.48&&(l=Kv(Wv,c*1.6)),!e&&o+s*.35<.16&&(l=Kv(Wv,0)),Z(n,e?r:i,e?i:r,l)}return n}var ey=[`#10141f`,`#151b29`,`#1b2334`,`#232d41`,`#2d394f`,`#3a475e`,`#4a586e`,`#5d6b80`,`#73808f`,`#8b949b`],ty={width:900,height:150},ny={name:`sky`,width:ty.width,height:ty.height,outlined:!1,draw(e){let{width:t,height:n}=ty,r=ev(41),i=0;ey.forEach((r,a)=>{let o=Math.round(n/ey.length);$(e,0,i,t,o+1,r);let s=ey[a+1];s&&($(e,0,i+o-5,t,1,s),$(e,0,i+o-2,t,1,s),$(e,0,i+o+1,t,1,r)),i+=o}),$(e,0,i,t,n-i,ey[ey.length-1]);for(let i=0;i<16;i++){let i=20+r()*(n-50),a=Math.min(ey.length-2,Math.floor(i/n*ey.length)),o=ey[a+(r()<.6?1:-1)]??ey[a],s=r()*t,c=30+r()*90,l=1.5+r()*3;e.poly([H(s-c,i),H(s-c*.3,i-l),H(s+c*.5,i-l*.6),H(s+c,i+.5),H(s+c*.2,i+l*.7)],o)}}};function ry(e){let t=ev(e.seed+500);return Array.from({length:e.fires},()=>H(40+t()*(e.width-80),e.height*(.62+t()*.2)))}function iy(e,t){let n=ev(t.seed),r=t.height*.78;$(e,0,r,t.width,t.height-r,t.fill);let i=-10;for(;i<t.width;){let a=t.span*(.5+n()*1.1),o=t.height*t.rise*(.25+n()**1.6*.75),s=r-o,c=n(),l=[H(i,r),H(i,s)];if(c<.22&&a<t.span){let e=s-o*.5;n()<.5?l.push(H(i,e+6),H(i+a*.35,e),H(i+a*.7,e+6)):l.push(H(i,e),H(i+a*.3,e+3),H(i+a*.45,e+11),H(i+a*.7,e+8)),l.push(H(i+a*.7,s))}else if(c<.36)for(let e=0;e<=6;e++){let t=Math.PI-e/6*Math.PI,n=e===4?.55:1;l.push(H(i+a/2+Math.cos(t)*a*.5,s-Math.sin(t)*a*.42*n))}else{let e=i,t=s;for(;e<i+a;){let s=3+n()*(a*.35);e=Math.min(i+a,e+s),l.push(H(e,t)),t=Math.min(r-3,t+(n()<.55?n()*o*.3:-n()*5)),l.push(H(e,t))}}l.push(H(i+a,r)),e.poly(l,t.fill),e.line([H(i+.5,r),H(i+.5,s+1)],t.edge,.8);for(let r=0;r<a/9;r++){if(n()<.5)continue;let r=i+3+n()*Math.max(1,a-6),c=s+4+n()*Math.max(1,o-8);$(e,Math.round(r),Math.round(c),1,2,t.edge)}i+=a*(.7+n()*.6)}}function ay(e){let t={name:e.name,width:e.width,height:e.height,outlined:!1,draw:t=>iy(t,e)};return e.fires===0?t:{...t,glow(t){let n=ev(e.seed+900);for(let r of ry(e)){let e=1+Math.floor(n()*3);$(t,Math.round(r.x),Math.round(r.y)-1,e+1,1,Q_.mid),$(t,Math.round(r.x),Math.round(r.y)-2,e,1,Q_.bright),n()<.6&&$(t,Math.round(r.x)+1,Math.round(r.y)-3,1,1,Q_.mid)}}}}var oy={name:`skyline-far`,width:900,height:80,seed:61,fill:`#4f5b6e`,edge:`#5d6a7f`,rise:.62,span:26,fires:0},sy={name:`skyline-mid`,width:900,height:130,seed:73,fill:`#394356`,edge:`#48546a`,rise:.62,span:40,fires:5},cy={name:`skyline-near`,width:900,height:124,seed:87,fill:`#222936`,edge:`#303848`,rise:.45,span:58,fires:2},ly={far:oy,mid:sy,near:cy},uy=[ay(oy),ay(sy),ay(cy)],dy=e=>ry(e),fy={width:1026,height:246},py=-fy.width/18/2,my=e=>Math.round((e-py)*18),hy=e=>fy.height-Math.round(e*18),gy=5.87,_y=[-5,-4,-3,-2,-1,1,2,3,4].map(e=>4+e*gy),vy=[-5,-4,-3,-2,-1,0,1,2,3].map(e=>4+(e+.5)*gy),yy=2.3,by=8.2,xy=10.4,Sy=2.5,Cy=2.5;function wy(e,t,n){let r=18+Math.max(0,(e-1.6)/11)**1.25*84+t*6;return Math.round((r+(n()-.5)*22)/8)*8}function Ty(e,t){let n=py+e/18,r=Math.abs(n-4),i=Math.abs(n+12.5);return 13.4-Math.max(0,2.2-i*.45)-Math.max(0,1.6-r*.12)-t()*.9}function Ey(e){let t=ev(7),{width:n,height:r}=fy,i=my(4),a=(e,t)=>{let n=(r-t)/18,a=Math.abs(e-i)/18;return-Math.max(0,1.5-Math.max(0,a-1.5-n*.42)*.42)-Math.max(0,n-10)*.35};rv(e,{x:0,y:0,w:n,h:r,course:7,block:17,seed:11,shade:2.3,tone:a});for(let t of vy){let n=my(t);rv(e,{x:n-11,y:hy(11.6),w:22,h:hy(Cy)-hy(11.6),course:9,block:22,seed:31+n,shade:3.1,tone:a}),$(e,n-12,hy(11.6),1,hy(Cy)-hy(11.6),Q[0]),$(e,n+11,hy(11.6),1,hy(Cy)-hy(11.6),Q[0]);for(let[t,r]of[[hy(11.6)-8,8],[hy(Cy)-6,6]])$(e,n-15,t,30,r,Q[3]),$(e,n-15,t,30,1,Q[5]),$(e,n-15,t+r-1,30,1,Q[0])}rv(e,{x:0,y:hy(Cy),w:n,h:r-hy(Cy),course:15,block:34,seed:5,shade:1.5,tone:(e,t)=>a(e,t)*.5}),$(e,0,hy(Cy)-3,n,3,Q[3]),$(e,0,hy(Cy)-3,n,1,Q[4]),$(e,0,hy(Cy),n,1,Q[0]);for(let n=0;n<9;n++){let r=n%2?-1:1,a=2.5+t()*7;iv(e,H(i+r*(10+Math.max(0,(a-1.6)/11)**1.25*84),hy(a)),r>0?-30+t()*70:210-t()*70,40+t()*60,90+n)}for(let r=0;r<12;r++)iv(e,H(t()*n,hy(11.5-t()*2)),80+t()*20,24+t()*60,200+r,Q[0]);for(let t of vy){let n=my(t);e.line([H(n-13,hy(9.7)),H(n+13,hy(9.7))],J_.mid,1.4),e.dot(H(n-13,hy(9.7)),1.5,Y_.dark),e.dot(H(n+13,hy(9.7)),1.5,Y_.dark)}for(let t of _y){let n=my(t),r=Sy*18;e.poly(sv(n,hy(yy)+3,55,hy(by),hy(xy)-7),Q[4]),e.poly(sv(n,hy(yy)+1,51,hy(by),hy(xy)-4),Q[1]),$(e,n-r/2-7,hy(yy),59,4,Q[3]),$(e,n-r/2-7,hy(yy),59,1,Q[5]),e.poly(sv(n,hy(yy),r,hy(by),hy(xy)),G_)}let o=[],s=[];for(let e=0;e<=hy(1.7);e+=7){let n=(r-e)/18,a=i-wy(n,0,t),c=i+wy(n,1,t);o.push(H(a,e),H(a,e+7)),s.push(H(c,e),H(c,e+7))}e.poly([...o,...s.reverse()],G_);let c=[H(0,0)];for(let e=0;e<n;e+=17){let n=Math.round(hy(Ty(e,t))/7)*7;c.push(H(e,n),H(e+17,n))}c.push(H(n,0)),e.poly(c,G_);for(let n of _y){let r=my(n),i=Sy*18/2,a=18+t()*70;$(e,r-1.5,hy(yy)-a,3,a,Q[3]),$(e,r-1.5,hy(yy)-a,1,a,Q[5]),e.poly([H(r-1.5,hy(yy)-a),H(r+1.5,hy(yy)-a),H(r+.5,hy(yy)-a-5)],Q[3]);let o=8+t()*26;$(e,r-1.5,hy(xy)+2,3,o,Q[2]);for(let n of[3.6,5.4,7.1]){if(t()<.3)continue;let a=hy(n),o=t()<.4?3+t()*5:0,s=t()<.3?i*(.3+t()*.5):i;e.line([H(r-i,a),H(r-i+s,a+o),H(r-i+s*2,a)],J_.dark,1)}for(let n=0;n<9;n++){let n=t()<.5?-1:1,a=hy(2.5999999999999996+t()*5.8999999999999995),o=3+t()*7,s=3+t()*7,c=r+n*i;e.poly([H(c,a),H(c-n*o,a+s*.3),H(c,a+s)],t()<.3?`#3f5868`:`#22303c`)}}}var Dy={name:`wall`,width:fy.width,height:fy.height,outlined:!1,draw:Ey},Oy=vy,ky={width:44,height:122};function Ay(e,t,n){return{name:e,width:ky.width,height:ky.height,outlined:!0,draw(e){let r=ev(t),i=ky.width,a=i-4,o=ky.height-4-n,s=[];for(let e=a;e>=4;e-=4){let t=(a-e)/(a-4);s.push(H(e,o-n*t*.6+(r()-.5)*9+(e%8?5:0)))}e.poly([H(4,5),H(a,5),...s],X_.mid);for(let[t,r,i]of[[4,5,X_.dark],[18,4,X_.dark],[a-9,3,X_.light],[a-4,4,X_.deep]])e.poly([H(t,6),H(t+r,6),H(t+r,o-n*.6-8),H(t,o-n*.6-6)],i);$(e,6,9,a-4-4,2,Y_.mid),e.line([H(6.5,12),H(6.5,o-n*.6-14)],Y_.dark,1),e.line([H(a-2.5,12),H(a-2.5,o-n*.6-14)],Y_.dark,1);let c=H(i/2,38);for(let t=0;t<8;t++){let n=t/8*Math.PI*2+Math.PI/8;e.line([H(c.x+Math.cos(n)*7,c.y+Math.sin(n)*7),H(c.x+Math.cos(n)*12,c.y+Math.sin(n)*12)],Y_.mid,1.4)}e.dot(c,6.5,Y_.mid),e.dot(c,4,X_.mid),e.dot(c,1.8,Y_.light),$(e,i/2-9,58,18,2,Y_.mid),e.poly([H(i/2-6,64),H(i/2+6,64),H(i/2,76)],Y_.dark);for(let t=0;t<2+n/14;t++){let t=9+r()*(a-4-10),i=o-n*.6-4-r()*38;e.oval(H(t,i),1.5+r()*2.5,2+r()*4,r()*60,G_)}$(e,4,3,i-8,3,J_.mid),$(e,4,3,i-8,1,J_.light),e.dot(H(5,4.5),2,Y_.mid,K_,1),e.dot(H(i-5,4.5),2,Y_.mid,K_,1)}}}var jy=[Ay(`banner-a`,3,6),Ay(`banner-b`,9,34),Ay(`banner-c`,21,60)],My=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Ny=`
uniform float time;
uniform float seed;
uniform float strength;
uniform vec3 tint;
varying vec2 vUv;

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), f);
}

void main() {
  float u = vUv.x;
  // 1 under the opening, 0 at the floor.
  float v = vUv.y;
  float edge = smoothstep(0.0, 0.24, u) * smoothstep(1.0, 0.76, u);
  // Broad and fine streaks, drifting slowly across each other: the light comes through
  // broken glass and smoke, and is never one even sheet.
  float rays = 0.4 + 0.42 * noise(u * 7.0 + seed + time * 0.035)
    + 0.3 * noise(u * 19.0 - seed * 2.0 - time * 0.05);
  rays *= 0.72 + 0.28 * noise(u * 3.0 + time * 0.11 + seed * 5.0);
  float fall = mix(0.16, 1.0, pow(v, 1.25)) * smoothstep(1.0, 0.9, v) * smoothstep(0.0, 0.07, v);
  gl_FragColor = vec4(tint * (strength * edge * rays * fall), 1.0);
}`,Py=`
uniform float time;
uniform float seed;
uniform float strength;
uniform vec3 tint;
varying vec2 vUv;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float glow = 1.0 - smoothstep(0.0, 1.0, length(p));
  float breathe = 0.86 + 0.14 * sin(time * 0.35 + seed);
  gl_FragColor = vec4(tint * (strength * glow * glow * breathe), 1.0);
}`,Fy=22,Iy=1.5;function Ly(e,t){let n=new Y(t),r=[],i=[],a=[];e.forEach((e,t)=>{let o=e.floor??0,s=e.wide/2,c=e.x+e.lean,l=[e.x-s,e.top,0,e.x+s,e.top,0,c-s*Iy,o,0,c+s*Iy,o,0],u=new Jd;u.setAttribute(`position`,new Nd(new Float32Array(l),3)),u.setAttribute(`uv`,new Nd(new Float32Array([0,1,1,1,0,0,1,0]),2)),u.setIndex([0,2,1,1,2,3]);let d=(e,r)=>{let a={time:{value:0},seed:{value:t*3.7+1.3},strength:{value:r},tint:{value:n}};return i.push(a.time),new up({uniforms:a,vertexShader:My,fragmentShader:e,transparent:!0,blending:2,depthWrite:!1,side:2,fog:!1})},f=new yf(u,d(Ny,e.strength));if(f.position.z=e.z,r.push(f),!e.noPool){let t=new yf(new tp(e.wide*Iy*1.5,2.6),d(Py,e.strength*1.5));t.rotation.x=-Math.PI/2,t.position.set(c+.3,o+.03,e.z+1.1),r.push(t)}let p=new Float32Array(66),m=new Nd(p,3),h=new Jd;h.setAttribute(`position`,m);let g=new qf(h,new Hf({color:n,size:2,sizeAttenuation:!1,transparent:!0,opacity:Math.min(.9,.3+e.strength*2.4),blending:2,depthWrite:!1,fog:!1}));g.frustumCulled=!1,r.push(g),a.push({spec:e,attribute:m,positions:p,index:t})});let o=e=>e-Math.floor(e);return{objects:r,update(e){for(let t of i)t.value=e;for(let{spec:t,attribute:n,positions:r,index:i}of a){let a=t.floor??0;for(let n=0;n<Fy;n++){let s=i*31+n*7.31,c=o(o(s*.618)+e*(.012+o(s*.37)*.02)),l=o(s*.271)+Math.sin(e*.4+s)*.05,u=t.wide*(1+.5*c)*.8;r[n*3]=t.x+t.lean*c+(l-.5)*u,r[n*3+1]=t.top+(a-t.top)*c,r[n*3+2]=t.z+.1+o(s*.53)*.6}n.needsUpdate=!0}}}}var Ry=`
vec2 crispUv(sampler2D picture, vec2 uv) {
  vec2 size = vec2(textureSize(picture, 0));
  vec2 pixel = uv * size;
  // The nearest seam between two of the picture's pixels, and how far from it we are,
  // measured in screen pixels: beyond half of one either side, it's pure colour.
  vec2 seam = floor(pixel + 0.5);
  // (Never by nothing: a plane shrunk to a point has no change across a pixel, and one bad
  // sample turns the whole picture black once the bloom has spread it.)
  pixel = seam + clamp((pixel - seam) / max(fwidth(pixel), vec2(0.0001)), -0.5, 0.5);
  return pixel / size;
}
`,zy=(e,t,n)=>e.replace(`texture2D( ${t}, ${n} )`,`texture2D( ${t}, crispUv( ${t}, ${n} ) )`),By=zy(km.map_fragment,`map`,`vMapUv`),Vy=zy(km.emissivemap_fragment,`emissiveMap`,`vEmissiveMapUv`);By!==km.map_fragment&&Vy!==km.emissivemap_fragment||console.error(`pixel-material: three.js's shader text has changed; sprites are not crisp`);function Hy(e){return e.onBeforeCompile=e=>{e.fragmentShader=`${Ry}\n${e.fragmentShader}`.replace(`#include <map_fragment>`,By).replace(`#include <emissivemap_fragment>`,Vy)},e.customProgramCacheKey=()=>`crisp`,e}function Uy(e){return e.magFilter=ec,e.minFilter=ec,e.generateMipmaps=!1,e}var Wy=new Vp,Gy=new Map;function Ky(){let e=0,t=0,n=new Set,r={get pending(){return e},get failed(){return t},begin(){e++;let r=!1;return i=>{if(!r&&(r=!0,e--,i||t++,e===0))for(let e of[...n])e()}},onIdle(e){return n.add(e),()=>n.delete(e)},whenSettled(){return e===0?Promise.resolve():new Promise(e=>{let t=r.onIdle(()=>{t(),e()})})}};return r}var qy=Ky();function Jy(e){let t=qy.begin(),n=new Image;n.onload=()=>t(!0),n.onerror=()=>{console.error(`A picture failed to load from ${e}`),t(!1)},n.src=e}function Yy(e,t){let n=`./${e}`,r=Gy.get(n);if(r)return r;let i=qy.begin(),a=Wy.load(n,e=>{t?.(e),i(!0)},void 0,()=>{console.error(`A sprite failed to load from ${n} (npm run sprites)`),i(!1)});return a.colorSpace=gl,Uy(a),Gy.set(n,a),a}function Xy(e){let t=new Sf(U_(e),e.width,e.height,vc);return t.colorSpace=gl,t.magFilter=Zs,t.minFilter=Zs,t.generateMipmaps=!1,t.needsUpdate=!0,t}var Zy=(e,t=!1)=>Yy(`sprites/scenery/${e.name}${t?`-glow`:``}.png`);function Qy(e,t){let n=t.texel??lr(t.z),r=new tp(e.width*n,e.height*n,1,t.rows??1);return r.translate(0,e.height*n/2,0),r}function $y(e,t){let n=Qy(e,t),r=Zy(e),i=t.lit??!0,a;i?(a=Hy(new fp({map:r,alphaTest:.5,roughness:1,metalness:0})),e.glow&&(a.emissiveMap=Zy(e,!0),a.emissive.setRGB(1,1,1),a.emissiveIntensity=t.glow??2)):a=Hy(new sf({map:r,alphaTest:.5,fog:!1})),a.color.setScalar(t.lift??1);let o=new yf(n,a);return o.position.set(t.x,t.y??0,t.z),t.flip&&(o.scale.x=-1),o.castShadow=i&&(t.shadow??!0),o.receiveShadow=i,o}function eb(e,t){let n=Qy(e,t),r=Hy(new sf({map:Zy(e,!0),alphaTest:.5,fog:!1}));r.color.setScalar(t.glow??2);let i=new yf(n,r);return i.position.set(t.x,t.y??0,t.z+.05),i}function tb(e,t,n){let r=t.texel??lr(t.z),i=(n.x-e.width/2)*r;return{x:t.x+(t.flip?-i:i),y:(t.y??0)+(e.height-n.y)*r,z:t.z}}var nb=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,rb=`
uniform float time;
uniform float seed;
uniform float lean;
uniform float rise;
uniform float underlit;
uniform float lift;
uniform vec2 cells;
uniform vec3 deep;
uniform vec3 dark;
uniform vec3 mid;
uniform vec3 light;
uniform vec3 sky;
uniform vec3 glow;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float billows(vec2 p) {
  return noise(p) * 0.55 + noise(p * 2.1 + 7.3) * 0.3 + noise(p * 4.3 + 2.9) * 0.15;
}

void main() {
  // The scene's pixel grid: smoke is cut into the same squares as everything else.
  vec2 p = (floor(vUv * cells) + 0.5) / cells;
  float h = p.y;
  // Billows boil upward; the finer ones climb faster, so the column churns as it rises.
  float big = billows(vec2(p.x * 6.0 + seed, h * 5.0 - time * rise));
  float fine = billows(vec2(p.x * 14.0 + seed * 3.0, h * 11.0 - time * rise * 1.8));
  float puff = big * 0.7 + fine * 0.3;
  // The column: thin at the fire, broad aloft, bent over by the wind and never quite still.
  float centre = 0.28 + lean * pow(h, 1.4) + (big - 0.5) * 0.09 * h + 0.012 * sin(h * 9.0 + time * 0.3 + seed);
  float halfWide = mix(0.03, 0.24, pow(h, 0.75));
  float core = 1.0 - abs(p.x - centre) / halfWide;
  float density = core + (puff - 0.5) * 1.35;
  // It leaves the fire as a thread, and tears into wisps where the wind takes it.
  float torn = smoothstep(0.5, 1.0, h);
  density *= smoothstep(0.0, 0.04, h);
  if (density < 0.3 + torn * 0.8) discard;
  // Lit from the last of the sky on its windward side: four flat tones, no gradients.
  float shade = puff + (centre - p.x) / halfWide * 0.22 + 0.06;
  vec3 colour = shade > 0.66 ? light : shade > 0.52 ? mid : shade > 0.38 ? dark : deep;
  // Its foot is lit from beneath by what's burning; its top fades into the sky's own colour.
  colour = mix(colour, glow, (1.0 - smoothstep(0.0, 0.2, h)) * underlit * (0.4 + 0.6 * puff));
  colour = mix(colour, sky, torn * 0.5 + h * 0.1);
  gl_FragColor = vec4(colour * lift, 1.0);
}`;function ib(e){let t=lr(e.z),n=new tp(e.wide,e.tall);n.translate(e.wide*(.5-.28),e.tall/2,0);let r={time:{value:0},seed:{value:e.seed},lean:{value:e.lean},rise:{value:e.rise},underlit:{value:e.underlit},lift:{value:e.lift},cells:{value:[Math.round(e.wide/t),Math.round(e.tall/t)]},deep:{value:new Y(1843500)},dark:{value:new Y(2501947)},mid:{value:new Y(3357774)},light:{value:new Y(4542824)},sky:{value:new Y(4148065)},glow:{value:new Y(9061411)}},i=new yf(n,new up({uniforms:r,vertexShader:nb,fragmentShader:rb,side:2,fog:!1}));return i.position.set(e.x,e.y,e.z),{mesh:i,update(e){r.time.value=e}}}var ab=1711915,ob=-8.1,sb={left:ar.x+7.7,rise:.42,tread:.5,steps:3},cb=sb.rise*sb.steps,lb={front:sb.left+(sb.steps-1)*sb.tread+.4,z:Qv},ub=lb.z+Zv*.16,db=1.7,fb={wall:2.3,hall:1.9,near:.5};function pb(e){let t=mb(e),n=hb(e);_b(e),yb(e);let r=xb(e);Sb(e),Cb(e);let i=wb(),a=Ab(),o=Eb(),s=Db(r.map(e=>e.at)),c=Ob();return e.add(o.points,s.points,c.points,...i.objects,...a.meshes),{update(e){t.update(e);for(let t of n)t.sway(e);for(let t of r)t.flicker(e);i.update(e),a.update(e),o.update(e),s.update(e),c.update(e)}}}function mb(e){e.add($y(ny,{x:0,y:-1,z:-110,lit:!1,lift:db}));let t=[{prop:uy[0],line:ly.far,x:4,y:.6,z:-80},{prop:uy[1],line:ly.mid,x:-3,y:-3.2,z:-45},{prop:uy[2],line:ly.near,x:2,y:-4.4,z:-22}],n=[],r=[];for(let{prop:i,line:a,x:o,y:s,z:c}of t){if(!i||(e.add($y(i,{x:o,y:s,z:c,lit:!1,lift:db})),a.fires===0))continue;let t=eb(i,{x:o,y:s,z:c,glow:2.2});n.push(t),e.add(t);for(let e of dy(a))r.push(tb(i,{x:o,y:s,z:c},e))}let i=[{x:-32,y:0,z:-62,tall:46,wide:40,lean:.5,rise:.05,underlit:.25},{x:24,y:1,z:-66,tall:50,wide:44,lean:.55,rise:.045,underlit:.2},{x:-2,y:3,z:-78,tall:44,wide:36,lean:.45,rise:.04,underlit:.15},...r.map((e,t)=>({...e,z:e.z-.5,tall:13+t%3*3,wide:9+t%2*2,lean:.4+t%3*.06,rise:.09+t%2*.02,underlit:.9}))].map((e,t)=>ib({...e,seed:3.7+t*11.3,lift:db}));for(let t of i)e.add(t.mesh);let a=Db(r,5,7);return e.add(a.points),{update(e){for(let t of i)t.update(e);n.forEach((t,n)=>{let r=.8+.22*Math.sin(e*7.3+n*2.1)+.14*Math.sin(e*17.9+n);t.material.color.setScalar(2.2*r)}),a.update(e)}}}function hb(e){let t=1/18;e.add($y(Dy,{x:0,z:ob,texel:t,shadow:!1,lift:fb.wall}));let n=[{pier:0,banner:2},{pier:1,banner:1},{pier:3,banner:0},{pier:7,banner:2},{pier:8,banner:1}],r=[];for(let{pier:i,banner:a}of n){let n=jy[a],o=Oy[i];if(!n||o===void 0)continue;let s=$y(n,{x:o,y:9.9-n.height*t,z:-7.949999999999999,texel:t,shadow:!1,lift:fb.wall,flip:i%2==1,rows:8});e.add(s),r.push(gb(s,n.height*t,t,i))}return r}function gb(e,t,n,r){let i=e.geometry.attributes.position,a=i?Float32Array.from(i.array):new Float32Array;return{sway(e){if(i){for(let o=0;o<i.count;o++){let s=1-(a[o*3+1]??0)/t,c=Math.sin(e*1.1+r*2+s*2.4)*2.2+Math.sin(e*2.3+r)*.8;i.setX(o,(a[o*3]??0)+Math.round(c*s*s)*n)}i.needsUpdate=!0}}}}function _b(e){let t=new yf(new tp(Pv.width,Pv.depth),new fp({map:Xy(Jv()),roughness:.9,metalness:0}));t.rotation.x=-Math.PI/2,t.position.set(0,0,Pv.back+Pv.depth/2),t.receiveShadow=!0,e.add(t)}function vb(e,t,n,r){let i=Xy(e);i.wrapS=Js,i.wrapT=Js,i.repeat.set(t*16/e.width,n*16/e.height);let a=new fp({map:i,roughness:.9,metalness:0});a.color.setScalar(r);let o=new yf(new tp(t,n),a);return o.receiveShadow=!0,o}function yb(e){let t=Pv.width/2,n=Yv(),r=Xv(),i=Pv.back+Pv.depth-ob;for(let a=0;a<sb.steps;a++){let o=sb.left+a*sb.tread,s=(a+1)*sb.rise,c=t-o,l=vb(n,c,i,1.25);l.rotation.x=-Math.PI/2,l.position.set(o+c/2,s,ob+i/2);let u=vb(r,i,sb.rise,fb.hall*.7);u.rotation.y=-Math.PI/2,u.position.set(o,s-sb.rise/2,ob+i/2),e.add(l,u)}let a=$v(!1),o=$v(!0);for(let n=0;n<sb.steps;n++){let r=sb.left+n*sb.tread,i=(n+1)*sb.rise,s=n===sb.steps-1?t-r:sb.tread,c=vb(a,s,Zv,1.5);c.rotation.x=-Math.PI/2,c.position.set(r+s/2,i+.012,lb.z);let l=vb(o,Zv,sb.rise,1.1);l.rotation.y=-Math.PI/2,l.position.set(r-.012,i-sb.rise/2,lb.z),e.add(c,l)}}function bb(e,t,n,r,i){let a=new rm(16751176,n,r,1.6);a.position.set(t.x,t.y+.6,t.z+.5),e.add(a);let o=t.x*1.7+t.z;return{at:t,flicker(e){let t=.84+.1*Math.sin(e*9.1+o)+.06*Math.sin(e*23.7+o*2)+.05*Math.sin(e*3.3+o);a.intensity=n*t;let r=i?.material;r instanceof fp&&(r.emissiveIntensity=2.4*t)}}}function xb(e){let t=(t,n)=>{let r=$y(t,{lift:fb.hall,...n});return e.add(r),r},n=-4.6;t(Mv.tall,{x:-23.2,z:n,flip:!0}),t(Mv.whole,{x:-16.4,z:n}),t(Mv.tall,{x:-9.4,z:n}),t(Mv.stump,{x:-.5,z:n,flip:!0}),t(Mv.mid,{x:sb.left-1.1,z:n}),t(Mv.whole,{x:20.4,z:-5.199999999999999,y:cb,flip:!0}),t(Nv[0],{x:-9.9,z:-3.6}),t(Nv[1],{x:1.4,z:-4.1,flip:!0}),t(xv.breach,{x:4.4,z:-7.2}),t(xv.small,{x:-6.3,z:-6.6}),t(xv.low,{x:-2.6,z:-5.6,flip:!0}),t(xv.small,{x:sb.left-2.4,z:-3.2,flip:!0});let r=lb.front;t(xv.low,{x:r+3.6,z:-6.2,y:cb}),t(xv.small,{x:r+2.2,z:-6,y:cb}),t(Nv[1],{x:r+2,z:6.6,y:cb});let i=lr(ub);return t(dv,{x:lb.front+(dv.width/2-8)*i,z:ub,y:cb-3*i}),[{prop:gv,at:{x:-11.9,z:-1.9},flame:Sv.brazier,strength:26,reach:10},{prop:gv,at:{x:lb.front+1.3,z:-3.9999999999999996,y:cb,flip:!0},flame:Sv.brazier,strength:14,reach:7},{prop:mv,at:{x:-6.9,z:-3.3},flame:Sv.chandelier,strength:7,reach:5.5},{prop:yv,at:{x:-14.6,z:-6.6},flame:Sv.beams,strength:6,reach:6}].map(({prop:n,at:r,flame:i,strength:a,reach:o})=>{let s=t(n,{...r,glow:2.6});return bb(e,tb(n,r,i),a,o,s)})}function Sb(e){let t=(t,n)=>e.add($y(t,{lift:fb.near,shadow:!1,...n}));t(xv.near,{x:-13.2,z:7.4}),t(xv.near,{x:lb.front+4.6,z:9.8,y:cb,flip:!0}),t(Mv.mid,{x:-13.4,z:6.3}),t(Mv.stump,{x:3.6,z:9.4,flip:!0}),t(Nv[0],{x:6.6,z:7.2})}function Cb(e){e.add(new Up(9413320,1842728,1.9));let t=new om(12372966,2.1);t.position.set(-9,15,12),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-20,right:20,top:16,bottom:-12,near:1,far:50}),t.shadow.bias=-5e-4,e.add(t)}function wb(){let e=e=>4+e*gy,t=(t,n)=>({x:e(t),top:8.8,wide:2.3,z:-7.5,lean:2.8,strength:n}),n=e=>{let t=e.lean*21/e.top;return{...e,top:21,lean:t,x:e.x-(t-e.lean)}};return Ly([n({x:3.7,top:12.5,wide:5.4,z:-7.6,lean:3.4,strength:.5}),n({x:4.9,top:12.5,wide:3,z:-5.699999999999999,lean:3.9,strength:.24}),t(-4,.38),t(-3,.44),t(-2,.13),t(-1,.3),t(1,.36),n({x:-20,top:16,wide:6,z:-3.2,lean:9,strength:.3}),{x:lb.front-1.8,top:16,wide:4.4,z:ub+.6,lean:5.6,strength:.34,floor:cb,noPool:!0}],11124974)}function Tb(e,t,n,r,i){let a=new Float32Array(e*3),o=new Nd(a,3),s=new Jd;s.setAttribute(`position`,o);let c=new qf(s,new Hf({color:t,size:n,sizeAttenuation:!1,transparent:!0,opacity:r,blending:i?2:1,depthWrite:!1}));return c.frustumCulled=!1,{points:c,positions:a,attribute:o}}function Eb(){let{points:e,positions:t,attribute:n}=Tb(320,10134452,2,.5,!1);return{points:e,update(e){for(let n=0;n<320;n++){let r=.25+W_(n,1,31)*.4,i=15-(W_(n,2,31)*15+e*r)%15,a=(W_(n,3,31)*48+e*(.12+W_(n,4,31)*.2))%48;t[n*3]=24-a+Math.sin(e*.7+n)*.25,t[n*3+1]=i,t[n*3+2]=(W_(n,5,31)-.5)*14}n.needsUpdate=!0}}}function Db(e,t=7,n=3.2){let r=e.length*t,{points:i,positions:a,attribute:o}=Tb(r,16751168,2,.9,!0);return{points:i,update(i){for(let o=0;o<r;o++){let r=e[Math.floor(o/t)];if(!r)continue;let s=2.2+W_(o,1,57)*2,c=(i+W_(o,2,57)*s)%s/s,l=c<.45+W_(o,3,57)*.4,u=Math.sin(i*2+o)*.04*n*c,d=(W_(o,4,57)-.5)*.22*n;a[o*3]=r.x+d+u-c*.16*n,a[o*3+1]=l?r.y+c*n:-100,a[o*3+2]=r.z+.3}o.needsUpdate=!0}}}function Ob(){let{points:e,positions:t,attribute:n}=Tb(34,16747066,2,.85,!0);return{points:e,update(e){for(let n=0;n<34;n++){let r=.9+W_(n,1,83)*1.3,i=(W_(n,2,83)*52+e*r)%52,a=i/52,o=Math.sin(e*(1.3+W_(n,3,83))+n*1.9)>-.35;t[n*3]=24-i,t[n*3+1]=o?6.5+W_(n,4,83)*7+Math.sin(a*9+n)*1.1+a*2.5:-100,t[n*3+2]=-7+W_(n,5,83)*9+Math.sin(a*5+n*.7)*.8}n.needsUpdate=!0}}}function kb(){let e=new Uint8Array(16384);for(let t=0;t<32;t++)for(let n=0;n<128;n++){let r=Gv(n,t,16,91)*.6+Gv((n+64)%128,t,16,91)*.4*Math.abs(n/128-.5)*2,i=1-t/31,a=Math.max(0,r*1.5-.25)*i**1.4,o=(t*128+n)*4;e[o]=e[o+1]=e[o+2]=255,e[o+3]=Math.round(Math.min(1,a)*255)}let t=new Sf(e,128,32,vc);return t.magFilter=ec,t.minFilter=ec,t.wrapS=Js,t.needsUpdate=!0,t}function Ab(){let e=[{z:-7.3,tall:7,opacity:.26,speed:.004,colour:7307167},{z:-3.4,tall:4,opacity:.16,speed:.007,colour:7899046},{z:3.4,tall:1.8,opacity:.1,speed:.012,colour:8688302}].map(({z:e,tall:t,opacity:n,speed:r,colour:i},a)=>{let o=kb();o.repeat.set(2+a,1),o.offset.x=a*.37;let s=new yf(new tp(Pv.width+10,t),new sf({map:o,color:i,transparent:!0,opacity:n,depthWrite:!1,fog:!1}));return s.position.set(0,t/2,e),{mesh:s,map:o,speed:r}});return{meshes:e.map(e=>e.mesh),update(t){for(let n of e)n.map.offset.x=t*n.speed}}}var jb=[{colour:16747054,wide:.5,opacity:.5},{colour:16767392,wide:.2,opacity:.85},{colour:16777215,wide:.07,opacity:1}],Mb=[{colour:16747054,size:1,opacity:.7},{colour:16773328,size:.5,opacity:1}],Nb=.45;function Pb(e){let t=(t,n,r)=>{let i=new yf(new tp(1,1),new sf({color:t,transparent:!0,opacity:n,blending:2,depthWrite:!1}));return i.visible=!1,i.frustumCulled=!1,i.renderOrder=r,e.add(i),i},n=jb.map(e=>({mesh:t(e.colour,e.opacity,6),layer:e})),r=Mb.map(e=>({mesh:t(e.colour,e.opacity,7),layer:e})),i=t(16756832,0,6),a=new rm(16756832,0,7,2);e.add(a);let o=new rm(16756832,0,5,2);e.add(o);let s=(e,t,n,r)=>{let i=n.x-t.x,a=n.y-t.y;e.position.set((t.x+n.x)/2,(t.y+n.y)/2,Math.max(t.z,n.z)+.05),e.rotation.z=Math.atan2(a,i),e.scale.set(Math.hypot(i,a),r,1)};return{update(e,t,r,i){let o=e!==void 0&&t!==void 0&&r>0;a.intensity=0;for(let{mesh:e}of n)e.visible=o;if(!o||!e||!t)return;let c=.85+.15*Math.sin(i*70);for(let{mesh:i,layer:a}of n)s(i,e,t,a.wide*r*c),i.material.opacity=a.opacity*Math.min(1,r*1.6);a.position.set(t.x,t.y,t.z+.6),a.intensity=26*r*c},charge(e,t,n,a){let c=n>0;for(let{mesh:e}of r)e.visible=c;if(i.visible=c&&n>Nb,o.intensity=0,!c)return;let l=.8+.2*Math.sin(a*(14+40*n));for(let{mesh:t,layer:i}of r){let r=i.size*(.12+.85*n*n)*l;t.position.set(e.x,e.y,e.z+.08),t.rotation.z=Math.PI/4+a*2.5,t.scale.set(r,r,1),t.material.opacity=i.opacity*Math.min(1,.35+n)}if(i.visible){let r=(n-Nb)/.55;s(i,e,t,.05),i.material.opacity=.42*r*l}o.position.set(e.x-.3,e.y,e.z+.7),o.intensity=9*n*l}}}var Fb=723728,Ib={dark:2500918,mid:3488330,light:6581122},Lb={mid:8283958,light:13480556};function Rb(){let e=R_(48,16);for(let t=0;t<48;t++){let n=t/47,r=Math.round(12-Math.sin(n*Math.PI)*9),i=Math.round(Math.sin(n*Math.PI)*3);for(let n=0;n<=i;n++)Z(e,t,r+n,16777215)}return e}function zb(){let e=R_(9,9);for(let t=1;t<8;t++){let n=t<4?4-t:t-3;for(let r=n;r<8-(t>5?t-5:0);r++)Z(e,r,t,Ib.mid)}for(let t=1;t<6;t++)Z(e,5-Math.min(t,3),t,Ib.light);for(let t=3;t<7;t++)Z(e,t,6,Ib.dark);return Z(e,6,2,Lb.light),Z(e,6,3,Lb.mid),Z(e,7,3,Lb.mid),H_(e,Fb),e}function Bb(){let e=R_(6,4);for(let t=2;t<5;t++)Z(e,t,1,Ib.light);for(let t=2;t<5;t++)Z(e,t,2,Ib.mid);for(let t=0;t<4;t++)Z(e,0,t,Lb.light),Z(e,1,t,Lb.mid);return H_(e,Fb),e}var Vb=e=>{let t=Math.max(0,Math.min(255,Math.round(e*255)));return t<<16|t<<8|t};function Hb(){let e=R_(41,41);for(let t=0;t<41;t++){let n=Math.abs(t-20)/20;Z(e,t,20,Vb(1.15-n)),n<.78&&Z(e,20,t,Vb(1.1-n*1.25))}for(let t=-7;t<=7;t++){let n=Vb(.85-Math.abs(t)/9);Z(e,20+t,20+t,n),Z(e,20+t,20-t,n)}for(let t=-4;t<=4;t++)for(let n=-4;n<=4;n++)Math.abs(n)+Math.abs(t)<=4&&Z(e,20+n,20+t,Vb(1.2-(Math.abs(n)+Math.abs(t))/9));for(let t=-9;t<=9;t++)for(let n of[-1,1])Z(e,20+t,20+n,Vb(.75-Math.abs(t)/12)),Math.abs(t)<7&&Z(e,20+n,20+t,Vb(.7-Math.abs(t)/10));return e}function Ub(){let e=R_(33,33);for(let t=0;t<33;t++)for(let n=0;n<33;n++){let r=Math.hypot(n-16,t-16)/16;if(r>=1)continue;let i=Math.ceil((1-r)**1.7*5-(n+t)%2*.35)/5;Z(e,n,t,Vb(i*.7))}return e}function Wb(){let e=R_(65,65);for(let t=0;t<14;t++){let n=t/14*Math.PI*2+.2,r=t%2==0?32:19.84;for(let t=8.96;t<r;t+=.5){let i=Vb(1.1-t/r);Z(e,Math.round(32+Math.cos(n)*t),Math.round(32+Math.sin(n)*t),i)}}return e}function Gb(){let e=R_(65,65);for(let t=0;t<65;t++)for(let n=0;n<65;n++){let r=Math.hypot(n-32,t-32);r>31.8||r<29.4||Z(e,n,t,Vb(r>30.6?1:.5))}return e}function Kb(){let e=R_(56,34);for(let t=0;t<56;t++){let n=t/55,r=n<.3?(n/.3)**.6:(1-(n-.3)/.7)**1.6,i=Math.round(32-r*28);for(let n=i;n<34;n++){let r=(n-i)/Math.max(1,34-i),a=(t*3+n*5)%7<3?.25:0;Z(e,t,n,Vb(1.05-r*.9-a))}}for(let t=0;t<9;t++)for(let n=0;n<3;n++)Z(e,13-t,5+Math.round(t*t/9)+n,Vb(1-t/12));for(let[t,n]of[[3,22],[7,14],[1,28],[10,9]])Z(e,t,n,Vb(.8)),Z(e,t+1,n,Vb(.5));return e}function qb(){let e=R_(12,10);return B_(e,6,5.5,5,4,16777215),B_(e,3.5,4,3,2.6,16777215),B_(e,8,3.5,3.2,2.8,16777215),B_(e,6.5,7,3.6,1.6,12105912),e}var Jb=e=>new sf({map:e,transparent:!0,blending:2,depthWrite:!1,side:2});function Yb(e,t,n=!1){let r=Xy(Hb()),i=.62*ur,a=(t,n=i,r=i)=>{let a=new yf(new tp(n,r),Jb(t));return a.visible=!1,a.renderOrder=10,e.add(a),a},o=a(Xy(Ub())),s=a(Xy(Gb())),c=a(r,i*2.4,i*.5),l=a(r),u=a(r),d=[o,s,c,l,u],f=new rm(16777215,0,6,2);return e.add(f),{show(e,r,i,a,p){let m=Math.max(0,Math.min(1,r)),h=1+.12*Math.sin(p*43)+.06*Math.sin(p*71),g=Math.min(1,m*9),_=a*(.55+1.55*(1-m)**1.6)*(.5+.5*g)*h,v=2.4-m*1.1;for(let n of d)n.visible=!0,n.position.set(e.x,e.y,e.z),n.quaternion.copy(t.quaternion),n.material.color.setHex(i);u.scale.setScalar(_),u.rotateZ(m*1.5),u.material.color.multiplyScalar(v),l.scale.setScalar(_*.6),l.rotateZ(Math.PI/4-m*2.2),l.material.color.multiplyScalar(v*.7),c.scale.set(_*(1+.25*Math.sin(p*31)),_*.9,1),c.material.color.multiplyScalar(v*.8),o.scale.setScalar(_*1.5),o.material.color.multiplyScalar(.55*(1-m*.5));let y=Math.min(1,m/.34);s.visible=!n&&y<1,s.scale.setScalar(a*(.5+2.6*(1-(1-y)**2))),s.material.color.multiplyScalar(1.6*(1-y)**1.5),f.color.setHex(i),f.position.set(e.x,e.y,e.z),f.intensity=n?0:16*a*(1-m*.8)},hide(){for(let e of d)e.visible=!1;f.intensity=0}}}var Xb=ar.x-2.2;function Zb(e,t,n){let r=Xy(Kb()),i=(t,n)=>{let i=new tp(t,n);i.translate(t/2-t*.2,n/2,0);let a=new yf(i,new sf({map:r,transparent:!0,blending:2,depthWrite:!1,side:2}));return a.visible=!1,e.add(a),a},a=.72*ur,o=i(a*2.6,a*1.6),s=i(a*1.9,a*1.1),c=new yf(new tp(a*4.2,a*2),new sf({map:Xy(Ub()),color:n,transparent:!0,opacity:.7,blending:2,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.visible=!1,e.add(c);let l=new rm(n,0,5,2);e.add(l);let u=-1;return{update(e,r,i){let d=Xt(e.boss,i);if(o.visible=s.visible=c.visible=d!==void 0,!d){l.intensity=0;return}let f=Xb+(ir.x-Xb)*(d.travel/1e3),p=ir.z-.2,m=Math.min(1,d.travel/140),h=1+.1*Math.sin(r*37)+.05*Math.sin(r*61);return o.position.set(f,0,p),o.scale.set(1,m*h,1),o.material.color.copy(n).multiplyScalar(1.5),s.position.set(f+.15,0,p+.02),s.scale.set(1,m*(2-h),1),s.material.color.setRGB(1,.75,.6).multiplyScalar(1.3),c.position.set(f+a*.9,.03,p),l.position.set(f,.7,p+.6),l.intensity=10,e.frame!==u&&e.frame%2==0&&(t.smoke({x:f+.9,y:.2,z:p-.3},1,`dust`),e.frame%6==0&&t.sparks({x:f,y:.3,z:p},3,5,n,1)),u=e.frame,{x:f-.1,y:a*1.15*m,z:p+.3}}}}var Qb=30,$b=14085375;function ex(e,t){let n=t=>{let n=new yf(new tp(2,2),new sf({map:Xy(t),color:$b,transparent:!0,blending:2,depthWrite:!1,side:2}));return n.visible=!1,e.add(n),n},r=[n(Gb()),n(Gb())],i=n(Ub()),a=new rm($b,0,8,2);e.add(a);let o=new Float32Array(90),s=new Nd(o,3),c=new Jd;c.setAttribute(`position`,s);let l=new qf(c,new Hf({color:$b,size:3,sizeAttenuation:!1,transparent:!0,opacity:.9,blending:2,depthWrite:!1}));l.frustumCulled=!1,l.visible=!1,e.add(l);let u=e=>e-Math.floor(e);return{update(e,n,c){let d=e!==void 0&&n>0;for(let e of r)e.visible=d;if(i.visible=d,l.visible=d,!e||!d){a.intensity=0;return}let f=Math.min(1,n);r.forEach((n,r)=>{let i=r*.3,a=Math.max(0,Math.min(1,(f-i)/(1-i)));n.visible=f>i,n.position.set(e.x,e.y,e.z+.6+r*.01),n.quaternion.copy(t.quaternion),n.rotateZ(c*(r?-2.2:2.8)),n.scale.setScalar(ur*(.28+(2.6+r*1.3)*(1-a)**1.5)),n.material.color.setHex($b).multiplyScalar(.2+.55*a)});let p=f>=1?.75+.25*Math.sin(c*30):1;i.position.set(e.x,e.y,e.z+.58),i.quaternion.copy(t.quaternion),i.scale.setScalar(ur*(.3+.45*f)*p),i.material.color.setHex($b).multiplyScalar(.1+.3*f),a.position.set(e.x,e.y,e.z+.7),a.intensity=(2+7*f)*p;let m=Math.round(8+22*f);for(let t=0;t<Qb;t++){let n=t*.618,r=u(n+c*(1.1+u(n*3.3)*1.2+f)),i=(1-r)**1.3*(1.1+u(n*7.1)*2.4)*ur,a=t*2.4+r*2.2,s=t>=m;o[t*3]=e.x+Math.cos(a)*i,o[t*3+1]=s?-100:e.y+Math.sin(a)*i*.75,o[t*3+2]=e.z+.62}s.needsUpdate=!0}}}var tx=-1.2,nx=1.1,rx=.06,ix=.14,ax=(e,t=0,n=1,r=0,i=!1)=>({angle:e,at:t,size:n,rise:r,thin:i}),ox={openHigh:[ax(tx)],cutHighA:[ax(tx)],cutHighB:[ax(tx,0,1.15)],openLevel:[ax(rx)],cutLevelA:[ax(-.06)],cutLevelB:[ax(0,0,1.3,0,!0)],openLow:[ax(nx)],cutLowA:[ax(ix)],cutLowB:[ax(nx)],tripleDraw:[ax(rx,0,1.1),ax(-.1,.3,1.1),ax(.02,Zi,1.5)],crosscut:[ax(-.85,0,1.4),ax(.85,0,1.4)],risingMoon:[ax(nx,0,1.5,1),ax(tx,.8,1.4)],twinFang:[ax(nx,0,1.2,.6),ax(tx,Qi,1.4)],fallingLeaf:[ax(ix,0,1.2),ax(-.14,$i,1.6)],swallowTurn:[ax(rx,0,1.2),ax(nx,ea,1.4,.6)],sunderFinish:[ax(-.95,0,1.3),ax(.95,0,1.3)],iaiCut:[ax(-.13,0,1.6)],counterLevel:[ax(rx,0,1.3),ax(nx,.34,1.3)],counterHigh:[ax(tx,0,1.3),ax(-1.3,.3,1.4)],counterLow:[ax(ix,0,1.3),ax(nx,.24,1.4,.6)]};Object.keys(ox);function sx(e){return ox[e]??[ax(rx)]}function cx(e){return new sf({...e?{map:e}:{},transparent:!0,blending:2,depthWrite:!1,side:2})}var lx=9;function ux(e,t){let n=Xy(Gb()),r=Xy(Wb()),i=Xy(Ub()),a=Array.from({length:5},()=>{let t=t=>{let n=new yf(new tp(2,2),cx(t));return n.visible=!1,e.add(n),n};return{ring:t(n),disc:t(n),spikes:t(r),core:t(i),start:-10,size:1,turn:0}}),o=0,s=.4,c=Xy(Rb()),l=Array.from({length:5},()=>{let t=new yf(new tp(3*ur,.5*ur),cx(c));return t.visible=!1,e.add(t),{mesh:t}}),u=.34,d=Array.from({length:8},()=>{let t=new yf(new tp(2.8*ur,.42*ur),cx(c));return t.visible=!1,e.add(t),{mesh:t,stroke:void 0,wait:0,start:-10,x:0,y:0,z:0}}),f=0,p=Array.from({length:10},()=>{let t=new yf(new tp(2.8*ur,.42*ur),cx(c));return t.visible=!1,e.add(t),{mesh:t,on:!1,angle:0,size:1,colour:new Y,litAt:void 0}}),m=0,h=0,g=new yf(new tp(3.2*ur,.6*ur),cx(c)),_=new yf(new tp(3.2*ur,.6*ur),cx(c));g.visible=!1,_.visible=!1,e.add(g,_);let v=Array.from({length:6},()=>{let t=new yf(new tp(1.4,.16),cx(c));return t.visible=!1,e.add(t),{mesh:t,start:-10,size:1,angle:0}}),y=0,b=.3,x=.7,S=new yf(new tp(90,1),cx()),C=new yf(new tp(90,1),cx());S.visible=!1,C.visible=!1,e.add(S,C);let w=-10,T=0;return{ring(e,t,n){let r=a[o];if(o=(o+1)%a.length,r){r.start=T,r.size=t*ur,r.turn=s,s+=1.1;for(let t of[r.ring,r.disc,r.spikes,r.core])t.position.set(e.x,e.y,e.z+.5),t.material.color.copy(n)}},clash(e,t,n){for(let r=0;r<3;r++){let i=v[y];y=(y+1)%v.length,i&&(i.start=T,i.size=t*ur*(r===0?1:.7),i.angle=b+r*1.05+(r===2?.4:0),i.mesh.position.set(e.x,e.y,e.z+.55),i.mesh.material.color.copy(n))}b+=.7},marks(e,t){t.forEach((t,n)=>{let r=d[f];f=(f+1)%d.length,r&&(r.stroke=t,r.wait=t.wait,r.start=T,r.x=e.x,r.y=e.y,r.z=e.z+.7+n*.01)})},scar(e,t){let n=p[m];m=(m+1)%p.length,n&&(n.on=!0,n.litAt=void 0,n.angle=t.angle,n.size=t.size,n.colour.copy(t.colour),n.mesh.position.set(e.x,e.y,e.z+.72))},ignite(e){let t=0;for(let n=0;n<p.length;n++){let r=p[(m+n)%p.length];r?.on&&r.litAt===void 0&&(r.litAt=T+t*e,t++)}},clearScars(){for(let e of p)e.on=!1},clear(){for(let e of p)e.on=!1;for(let e of d)e.stroke=void 0,e.mesh.visible=!1;w=-10},sever(e){w=T;for(let t of[S,C])t.position.set(e.x,e.y,e.z+.8)},update(e,n,r){let i=n-T;T=n,e.freeze>0&&T-w>x*.2&&(w+=i);let o=(T-w)/x,s=o>=0&&o<1;if(S.visible=s,C.visible=s,s){let e=Math.min(1,o*12),n=(1-o)**2;for(let e of[S,C])e.quaternion.copy(t.quaternion),e.rotateZ(-.13);S.scale.set(e,.04+.3*n,1),S.material.color.setScalar(1.6),C.scale.set(e,.12+.95*n,1),C.material.color.setRGB(.25,.6,.7).multiplyScalar(n)}let c=e.frame-h;h=e.frame;let f=e.freeze===0&&c>0&&c<30?c:0;for(let n of d){let r=n.stroke;if(!r)continue;if(n.wait>0){if(n.wait-=f,n.mesh.visible=!1,n.wait>0)continue;n.start=T}e.freeze>0&&T-n.start>u*.25&&(n.start+=i);let a=(T-n.start)/u;if(n.mesh.visible=a>=0&&a<1,!n.mesh.visible)continue;let{angle:o,size:s,colour:c,rise:l,thin:d}=r;n.mesh.position.set(n.x,n.y+l*a,n.z),n.mesh.quaternion.copy(t.quaternion),n.mesh.rotateZ(o);let p=s*(d?1.35:1)*(.3+.7*Math.min(1,a*4));n.mesh.scale.set(p,s*(d?.4:1)*(1-a*.7),1),n.mesh.material.color.copy(c).multiplyScalar(2.4*(1-a))}p.forEach((n,r)=>{if(n.mesh.visible=n.on,!n.on)return;n.mesh.quaternion.copy(t.quaternion),n.mesh.rotateZ(n.angle);let a=n.litAt===void 0?-1:(T-n.litAt)/.5;if(a<0){let e=n.litAt===void 0?0:1;n.mesh.scale.set(n.size*1.05,n.size*(.14+.06*e),1),n.mesh.material.color.copy(n.colour).multiplyScalar(.5+.9*e+.14*Math.sin(T*7+r*1.7));return}if(a>=1){n.on=!1,n.mesh.visible=!1;return}e.freeze>0&&a>.5&&n.litAt!==void 0&&(n.litAt+=i);let o=Math.min(1,a*8);n.mesh.scale.set(n.size*1.05*(1+.8*o),n.size*(.14+o*(1-a)**2),1),n.mesh.material.color.copy(n.colour).multiplyScalar(.5+2.6*(1-a))});let m=-1;if(e.turn===`player`)for(let t of e.player.cuts){if(t.special!==`Triple Draw`)continue;let n=e.player.tick-t.tick-Ia();n>=0&&n<16&&(m=n)}let y=m>=0&&m<16;if(g.visible=y,_.visible=y,y){let e=m/16,n=ar.x-2.6+9.8*(1-(1-e)**2);for(let[r,i]of[[g,1],[_,1.25]])r.position.set(n-(i-1)*1.2,2.2,ar.z+1.5),r.quaternion.copy(t.quaternion),r.rotateZ(-Math.PI/2),r.scale.set(i*(.55+.35*e),i*(1.3-e*.5),1);g.material.color.setRGB(.85,1.1,1.15).multiplyScalar(1-e*e),_.material.color.setRGB(.12,.5,.6).multiplyScalar(1-e)}for(let e of a){let n=(T-e.start)/.36,r=n>=0&&n<1;for(let n of[e.ring,e.disc,e.spikes,e.core])n.visible=r,r&&n.quaternion.copy(t.quaternion);if(!r)continue;let i=1-(1-n)**3;e.ring.scale.setScalar(e.size*(.15+.85*i)),e.ring.material.opacity=(1-n)**1.5;let a=Math.max(0,(n-.1)/.9),o=e.size*1.35*(.2+.8*(1-(1-a)**2.4));e.disc.rotateZ(e.turn),e.disc.scale.set(o,o*.34,1),e.disc.material.opacity=n>.1?.8*(1-a)**1.8:0,e.spikes.rotateZ(e.turn*.7+n*.6),e.spikes.scale.setScalar(e.size*(.35+1.25*i)),e.spikes.material.opacity=Math.max(0,1-n*1.5)**1.4,e.core.scale.setScalar(e.size*(.75-.35*n)),e.core.material.opacity=Math.max(0,1-n*2.6)*1.2}for(let e of v){let n=(T-e.start)/.2;e.mesh.visible=n>=0&&n<1,e.mesh.visible&&(e.mesh.quaternion.copy(t.quaternion),e.mesh.rotateZ(e.angle),e.mesh.scale.set(e.size*(.5+1.1*(1-(1-n)**3)),1-n*.85,1),e.mesh.material.opacity=1-n*n)}let b=e.boss.phase===`riposte`,E=[...r.tuning.riposteSlashTicks,r.tuning.riposteStrikeTick];l.forEach((n,r)=>{let i=E[r],a=i===void 0?-1:e.boss.tick-i;if(n.mesh.visible=b&&a>=0&&a<lx,!n.mesh.visible)return;let o=r===E.length-1,s=a/lx,c=o?1.5:1;n.mesh.quaternion.copy(t.quaternion),n.mesh.rotateZ(sx(o?`iaiCut`:Qa(r))[0]?.angle??0),n.mesh.scale.set(c*(.4+.6*Math.min(1,s*3)),c*(1-s*.6),1),n.mesh.position.set(ar.x-1.05,2.4+(o?0:.3),ar.z+1.4),n.mesh.material.color.setScalar(o?2.4:1.6).multiplyScalar(1-s*.8)})}}}var dx=e=>{let t=Math.max(0,Math.min(255,Math.round(e*255)));return t<<16|t<<8|t},fx=65,px=32;function mx(e){let t=R_(fx,fx);for(let e=0;e<fx;e++)for(let n=0;n<fx;n++){let r=Math.hypot(n-px,e-px);r>31.8||r<29.6||Z(t,n,e,dx(r>30.7?1:.55))}for(let e=0;e<12;e++){let n=e/12*Math.PI*2,r=e%3==0;for(let e=px-(r?9:6);e<29;e+=.5)Z(t,Math.round(px+Math.sin(n)*e),Math.round(px-Math.cos(n)*e),dx(r?1:.8))}if(e){for(let e=0;e<=21;e++)Z(t,px,px-e,dx(1));for(let e=0;e<=13;e++)Z(t,31,px-e,dx(.7)),Z(t,33,px-e,dx(.7))}for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)Z(t,px+n,px+e,dx(1));return t}function hx(){let e=R_(fx,fx);for(let t=0;t<=27;t++)Z(e,px,px-t,dx(1.1-t/(px*1.4))),t<10&&(Z(e,31,px-t,dx(.6)),Z(e,33,px-t,dx(.6)));return e}var gx=e=>Math.max(0,Math.min(1,e)),_x=e=>e<=0?1:Math.sqrt(Math.max(0,1-e*e));function vx(){let e=R_(128,33);for(let t=0;t<128;t++){let n=t/127,r=Math.min(1,n*1.6),i=Math.min(_x(1-n/.07),_x((n-.9)/.1));for(let n=0;n<=16;n++){let a=1-(n/17)**3,o=.65*Math.exp(-((n/(2.2*i))**2)),s=.5*Math.exp(-((n/(7.5*i))**2)),c=Math.min(1,o+s)*a*r*+(i>.05);Z(e,t,16+n,dx(c)),Z(e,t,16-n,dx(c))}}return e}function yx(){let e=63/2,t=R_(64,64);for(let n=0;n<64;n++)for(let r=0;r<64;r++){let i=Math.hypot(r-e,n-e)/e;i>=1||Z(t,r,n,dx(Math.exp(-i*i*4.2)*(1-i**3)))}return t}function bx(){let e=23/2,t=R_(24,24);for(let n=0;n<24;n++)for(let r=0;r<24;r++){let i=Math.hypot(r-e,n-e)/e;if(i>=1)continue;let a=i<.3?1-i*.6:0;Z(t,r,n,dx(Math.max(a,.55*(1-i)**2)))}return t}function xx(){let e=127/2,t=R_(128,128);for(let n=0;n<128;n++)for(let r=0;r<128;r++){let i=Math.hypot(r-e,n-e)/e;if(i>=1)continue;let a=Math.exp(-(((i-.88)/.04)**2)),o=.12*Math.exp(-(((i-.88)/.16)**2));Z(t,r,n,dx(Math.min(1,a+o)*(i>.97?(1-i)/.03:1)))}return t}function Sx(){let e=R_(fx,fx);for(let t=0;t<fx;t++)for(let n=0;n<fx;n++){let r=Math.hypot(n-px,t-px);r>31.8||r<26.4||Z(e,n,t,dx(r>30.4?1:r>28?.85:.6))}for(let t=0;t<12;t++){let n=t/12*Math.PI*2,r=t%3==0,i=Math.sin(n),a=Math.cos(n);for(let t=px-(r?15:12);t<25.5;t+=.5)for(let n of[-.5,.5])Z(e,Math.round(px+i*t+a*n),Math.round(px-a*t+i*n),dx(1))}for(let t=0;t<=22;t++)for(let n of[-1,0,1])Z(e,px+n,px-t,dx(n===0?1:.75));for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)Z(e,px+n,px+t,dx(1));return e}function Cx(){let e=R_(fx,fx);for(let t=0;t<fx;t++)for(let n=0;n<fx;n++){let r=Math.hypot(n-px,t-px)/27;r>=1||Z(e,n,t,dx(Math.ceil((.45+.55*r**3)*6)/6))}return e}function wx(){let e=R_(128,33);for(let t=0;t<128;t++){let n=t/127,r=Math.min(_x(1-n/.1),_x((n-.9)/.1));for(let n=0;n<=16;n++){let i=r>.001?n/r:99,a=gx(1-(i-6)/5),o=i<=6?1:a*a*(3-2*a);Z(e,t,16+n,dx(o)),Z(e,t,16-n,dx(o))}}return e}function Tx(){let e=63/2,t=30.5,n=R_(64,64);for(let r=0;r<64;r++)for(let i=0;i<64;i++){let a=i-e,o=r-e,s=gx(t-Math.hypot(a,o)+.5),c=gx(Math.hypot(a-t*.34,o)-t*.82+.5),l=gx(1.4-Math.abs(Math.hypot(a,o)-t*.92))*.4;Z(n,i,r,dx(Math.max(s*c,l*s)))}return n}var Ex=128,Dx=127/2,Ox=62.5,kx=(e,t,n,r,i,a=1)=>({kind:`line`,ax:e,ay:t,bx:n,by:r,width:i,level:a}),Ax=(e,t,n=1)=>({kind:`ring`,r:e,width:t,level:n});function jx(e,t,n){if(e.kind===`ring`)return gx(e.width/2+.5-Math.abs(Math.hypot(t,n)-e.r))*e.level;let r=e.bx-e.ax,i=e.by-e.ay,a=r*r+i*i,o=a===0?0:gx(((t-e.ax)*r+(n-e.ay)*i)/a),s=Math.hypot(t-(e.ax+r*o),n-(e.ay+i*o));return gx(e.width/2+.5-s)*e.level}function Mx(e){let t=R_(Ex,Ex);for(let n=0;n<Ex;n++)for(let r=0;r<Ex/2;r++){let i=r-Dx,a=n-Dx,o=0;for(let t of e)o=Math.max(o,jx(t,i,a));let s=dx(o);Z(t,r,n,s),Z(t,127-r,n,s)}return t}var Nx=(e,t,n)=>{let r=Math.sin(e),i=Math.cos(e);return[r*t+i*n,-i*t+r*n]};function Px(e,t,n,r,i){let a=r/2,o=(e,r,o,s)=>{let[c,l]=Nx(t,n+e*a,r*a),[u,d]=Nx(t,n+o*a,s*a);return kx(c,l,u,d,i)};switch(e){case 0:return[o(-1,0,1,0),o(0,-.8,0,.8)];case 1:return[o(-.8,-.9,.8,0),o(-.8,.9,.8,0)];case 2:return[o(-1,0,0,.7),o(0,.7,1,0),o(1,0,0,-.7),o(0,-.7,-1,0)];case 3:return[o(-1,0,-.1,0),o(-.1,-.5,-.1,.5),o(-.1,.5,.9,.5),o(.9,.5,.9,-.5),o(.9,-.5,-.1,-.5)];case 4:return[o(-.9,-.55,.9,-.55),o(-.9,.55,.9,.55)];default:return[o(-1,0,1,0),o(.1,-.8,1,-.8),o(.1,.8,1,.8),o(.1,-.8,.1,.8)]}}function Fx(e,t,n){let r=[];for(let i of[0,Math.PI/4])for(let a=0;a<4;a++){let[o,s]=Nx(i+a*Math.PI/2,e,0),[c,l]=Nx(i+(a+1)*Math.PI/2,e,0);r.push(kx(o,s,c,l,t,n))}return r}function Ix(){let e=Ox,t=[Ax(e*.96,2.6),Ax(e*.7,2,.85),Ax(e*.99,1,.5)];for(let n=0;n<24;n++){let r=(n+.5)/24*Math.PI*2,i=n%12,a=Math.min(i,11-i)%6;t.push(...Px(a,r,e*.83,9,1.4))}return t.push(...Fx(e*.62,1.8,.7)),t.push(Ax(e*.2,1.4,.6)),Mx(t)}function Lx(){let e=Ox;return Mx([...Fx(e*.62,2.4,1),Ax(e*.2,1.8,1)])}function Rx(){let e=Ox,t=[Ax(e*.9,1.8)];for(let n=0;n<8;n++){let r=(n+.5)/8*Math.PI*2,i=n%4;t.push(...Px(+(Math.min(i,3-i)===0),r,e*.9,12,1.6))}return Mx(t)}function zx(){let e=Ox,t=[Ax(e*.96,2.2),Ax(e*.99,1,.45),Ax(e*.58,1.3,.7)];for(let n=0;n<4;n++){let r=n*Math.PI/2,[i,a]=Nx(r,e*.96,-6.25),[o,s]=Nx(r,e*.96,e*.1),[c,l]=Nx(r,e*.7,0);t.push(kx(i,a,c,l,2.2),kx(o,s,c,l,2.2),kx(i,a,o,s,2.2))}for(let n=0;n<16;n++){let r=(n+.5)/16*Math.PI*2,i=n%8;t.push(...Px(Math.min(i,7-i)%3,r,e*.77,8,1.3))}for(let n=0;n<4;n++){let[r,i]=Nx(n*Math.PI/2,e*.16,0),[a,o]=Nx(n*Math.PI/2,e*.46,0);t.push(kx(r,i,a,o,1.2,.75))}return t.push(Ax(0,7,1),Ax(e*.1,1.2,.8)),Mx(t)}var Bx=64,Vx=96;function Hx(){let e=R_(Bx,Vx),t=63/2,n=Vx*.38,r=[];for(let e=0;e<=160;e++){let i=Math.PI+e/160*Math.PI;r.push([t+Math.cos(i)*30,n+Math.sin(i)*34.980000000000004])}r.unshift([1.5,94]),r.push([61.5,94]);let i=(e,r)=>r>94?!1:r>=n?Math.abs(e-t)<=30:((e-t)/30)**2+((r-n)/34.980000000000004)**2<=1;for(let t=0;t<Vx;t++)for(let n=0;n<Bx;n++){if(!i(n,t))continue;let a=99;for(let[e,i]of r)a=Math.min(a,Math.hypot(n-e,t-i));let o=gx((94-t)/10),s=.1+.3*Math.exp(-a/7),c=a<2.4?gx(2.4-a)*gx((91-t)/8):0,l=n<23.5&&t>12&&t<32.480000000000004?.32*gx(1.4-Math.abs(a-9)):0;Z(e,n,t,dx(Math.min(1,s+c*.75+l)*(c>0?1:o)))}return e}function Ux(){let e=Ox,t=[Ax(e*.97,1.8),Ax(e*.68,1.4,.75)];for(let n=0;n<12;n++){let r=(n+.5)/12*Math.PI*2,i=n%6;t.push(...Px(Math.min(i,5-i)%3,r,e*.83,11,1.5))}for(let n=0;n<4;n++){let[r,i]=Nx(n*Math.PI/2,e*.97,0),[a,o]=Nx(n*Math.PI/2,e*.86,0);t.push(kx(r,i,a,o,2))}return Mx(t)}function Wx(){let e=R_(16,32);for(let t=0;t<32;t++){let n=t/31,r=(n<.33?n/.33:(1-n)/.67)*7;for(let n=0;n<16;n++){let i=Math.abs(n-15/2);i>r||Z(e,n,t,dx(r<1?.6:.55+.45*(1-i/r)))}}return e}var Gx={core:16776175,light:16775398,edge:15721666},Kx=new Y(Gx.core),qx=new Y(Gx.edge);function Jx(e,t){let n=e===``?void 0:t.find(t=>t.name===e);if(n)return n.marks?`hour`:n.answers?`answer`:n.blesses?`sanctuary`:n.heal>0?`mending`:n.piercesArmour?`judgement`:`benediction`}function Yx(e,t){return{burst:e.quality===`perfect`?`big`:`small`,string:Jx(e.special,t)}}function Xx(e){return e===`high`?`lance`:e===`level`?`burst`:`floor`}function Zx(e,t){let{windowStart:n,windowEnd:r}=t.moves.parry,i=t.hero.wardLateTicks;return e<n?{phase:`rising`,level:.35+.65*(e+1)/(n+1),flicker:!1}:e<r?{phase:`whole`,level:1,flicker:!1}:e<r+i?{phase:`fading`,level:.7-.5*((e-r)/i),flicker:e%2==1}:{phase:`gone`,level:0,flicker:!1}}var Qx=.55;function $x(e,t){let n=Zx(e,t);return n.level*(n.flicker?.5:1)*Qx}function eS(e,t){let n=n=>W_(e,t,n),r=t%3/3*Math.PI*2+(n(1)-.5)*1+.6,i=1.1+n(2)*1.1;return{dx:Math.cos(r)*i*1.25,dy:Math.sin(r)*i*.9,size:1.8+n(3)*1.4,turn:(n(4)-.5)*Math.PI*2}}var tS=2.8;function nS(e,t){let n=e.player;if(e.turn!==`player`||n.step!==`strike`||n.beat<0||n.drawSince>=0||n.doneAt>=0)return;let r=n.cuts[n.cuts.length-1];if(!r)return;let i=MS((n.tick-r.tick)/Math.max(1,n.beat-r.tick)),a=Math.abs(n.tick-n.beat)<=t.tuning.linkGood;return{size:3-2*i,level:a?1:.3+.5*i,inWindow:a}}var rS=20;function iS(e,t){let n=e.player;if(e.turn!==`player`||n.step!==`sunder`||n.doneAt>=0)return;let r=t.tuning.sunderCutTicks.length,i=n.sunderCuts[n.sunderCuts.length-1];if(!i||n.sunderCuts.length!==r-1)return;let a=t.tuning.sunderCutTicks[r-1]??n.tick,o=i.tick+rS;if(!(n.tick<o))return MS((n.tick-o)/Math.max(1,a-o))}var aS=.7,oS=.2;function sS(e,t,n){let r=Math.hypot(t.x-e.x,t.y-e.y),i=r<.001?0:(t.x-e.x)/r,a=r<.001?1:(t.y-e.y)/r;return{x:t.x+i*n,y:t.y+a*n,z:t.z}}function cS(e,t){return t>=.08&&(Math.abs(e)<.2||t>=.3)}function lS(e,t,n,r){let i=[],a=r/n;for(let o=1;o<=n;o++){let n=a*o,s;for(let r of e)(!s||Math.abs(t-r.at-n)<Math.abs(t-s.at-n))&&(s=r);s&&Math.abs(t-s.at-n)<=a&&i.push({sample:s,k:1-n/r*.85})}return i}function uS(e,t,n){let r=n.tuning.sunderCutTicks[t];if(r===void 0)return 0;let i=Math.max(1,n.tuning.glintLead);return MS((e-(r-i))/i)}var dS=.35,fS=8,pS={high:[`lance`,`core`,`ring`,`halo`,`lance`,`core`,`ring`],level:[`disc`,`halo`,`ring`,...Array.from({length:fS},()=>`lance`),...Array.from({length:fS},()=>`core`)],low:[`lance`,`core`,`ring`,`lance`,`core`,`halo`,`ring`]},mS=(e,t,n)=>MS((e-t)/(n-t));function hS(e,t){let n=t<=.35?1:MS(1-(t-dS)/.65);return e===`high`?{travel:mS(t,0,.12),open:mS(t,.07,.18),land:mS(t,.16,dS),fade:n}:e===`level`?{travel:mS(t,0,dS),open:mS(t,.1,dS),land:mS(t,dS,.7),fade:n}:{travel:mS(t,0,.22),open:mS(t,.1,.3),land:mS(t,.22,.39999999999999997),fade:n}}function gS(e,t){return e!==void 0&&e!==t}function _S(e,t){let n=e.player;return e.turn!==`player`||n.step!==`strike`||n.drawSince<0||n.doneAt>=0?0:Math.min(1,Math.max(.001,(n.tick-n.drawSince)/t.tuning.iaiDrawTicks))}function vS(e,t){let n=e.player;if(!(e.turn!==`player`||n.step!==`strike`||n.cuts.length>0||n.doneAt>=0))return Math.min(1,Math.max(0,n.tick/t.tuning.dashTicks))}function yS(e){return e.turn===`player`&&(e.player.mark??-1)>=0}function bS(e){return e.turn===`player`&&e.player.step===`sunder`&&e.player.doneAt<0}var xS=2.6,SS=1.5,CS=1.1,wS={size:.6,depth:.9},TS={size:.8,depth:1.3},ES=.3,DS=2.4,OS={w:4.4,h:6.6},kS=1.5,AS=.5,jS=.12,MS=e=>Math.max(0,Math.min(1,e)),NS=(e,t,n)=>e+(t-e)*n;function PS(e,t,n,r,i){let a=e=>new sf({map:e,color:Gx.light,transparent:!0,blending:2,depthWrite:!1,side:2}),o=t=>{let n=new yf(new tp(1,1),a(t));return n.visible=!1,n.frustumCulled=!1,e.add(n),n},s=Xy(xx()),c=Xy(yx()),l=Xy(bx()),u=Xy(mx(!1)),d=Xy(Sx()),f=Xy(Cx()),p=Xy(hx()),m=Xy(vx()),h=Xy(wx()),g=Xy(Tx()),_=Xy(Ix()),v=Xy(Lx()),y=Xy(Rx()),b=Xy(zx()),x=Xy(Hx()),S=Xy(Ux()),C=Xy(Wx()),w=new Set,T=(e,t)=>{let n=Array.from({length:t},()=>o(e));return{take(){let e=n.find(e=>!w.has(e));return e&&w.add(e),e}}},E=e=>{e.visible=!1,w.delete(e)},D=T(s,28),O=T(c,20),k=T(m,96),A=T(h,80),j={lance:k,core:A,ring:D,halo:O,disc:T(g,8)},ee=T(s,10),M=T(s,10),N=T(b,10),te=T(C,24),P=o(d),ne=o(f),re=o(c),ie=o(s),ae=o(l),oe=o(_),se=e=>e===`lance`?m:e===`core`?h:e===`ring`?s:e===`halo`?c:g,ce={high:pS.high.map(e=>o(se(e))),level:pS.level.map(e=>o(se(e))),low:pS.low.map(e=>o(se(e)))},le=o(c),ue=o(y),de=o(_),fe=o(v),pe=o(c),me=o(c),he=o(S),ge=o(x),F=o(u),_e=o(p),ve=o(s),ye=o(c),be=[o(s),o(s)],xe=Array.from({length:14},()=>o(m)),Se=o(c),I=o(m),Ce=o(h),we=o(c),Te=o(s),L=Array.from({length:5},()=>o(m)),Ee=o(m),R=o(m),De=[...xe,Se,I,Ce,we,Te,...L,P,ne,oe,re,ie,ae,...ce.high,...ce.level,...ce.low,le,ue,de,fe,pe,me,he,ge,F,_e,ve,ye,...be],Oe=new rm(Gx.light,0,9,2);e.add(Oe);let ke=0,Ae=r.clashPoint,je=Array.from({length:120},()=>o(l)),Me=Array.from({length:120},()=>({x:0,y:-100,z:0,vx:0,vy:0,ay:0,life:0,max:1,size:.3,streak:!1})),Ne=0,Pe=(e,t,n,r,i,a,o=0,s=.34,c=!1)=>{let l=Me[Ne];Ne=(Ne+1)%120,l&&(l.x=e,l.y=t,l.z=n,l.vx=r,l.vy=i,l.ay=o,l.life=a,l.max=a,l.size=s,l.streak=c)},Fe=e=>{Me.forEach((n,r)=>{let i=je[r];if(!i)return;n.life>0&&(n.life-=e,n.vy+=n.ay*e,n.x+=n.vx*e,n.y+=n.vy*e);let a=n.life>0;if(i.visible=a,!a)return;let o=Math.min(1,n.life/n.max*2)*.95;i.position.set(n.x,n.y,n.z),i.quaternion.copy(t.quaternion),n.streak?(i.rotateZ(Math.atan2(n.vy,n.vx)),i.scale.set(n.size*(1+Math.hypot(n.vx,n.vy)*.3),n.size,1)):i.scale.set(n.size,n.size,1),i.material.color.copy(Kx).multiplyScalar(o)})},Ie=(e,t,n,r,i=1)=>{for(let r=0;r<Math.ceil(t/4);r++){let t=Math.random()*Math.PI*2,r=n*(.5+Math.random()*.7),a=i*n*.15;Pe(e.x,e.y,e.z+.3,Math.cos(t)*r+a,Math.sin(t)*r,.3,0,.3,!0)}},Le=e=>(Math.random()-.5)*2*e,Re=[],ze=[],Be=(e,t,n)=>{if(!t.every(e=>e===void 0)){for(let e of t)e&&(e.visible=!0);Re.push({age:0,life:e,pieces:t,draw:n})}},Ve=e=>{for(let t of e)t&&E(t)},z=(e,n,r,i,a)=>{e.position.set(n.x,n.y,n.z),e.quaternion.copy(t.quaternion),e.scale.set(r,i,1),e.material.color.copy(qx).lerp(Kx,MS(a)).multiplyScalar(Math.max(0,a))},He=(e,t,n,r,i,a,o)=>{let s=NS(t.x,n.x,i),c=NS(t.y,n.y,i),l=NS(t.x,n.x,r),u=NS(t.y,n.y,r),d=Math.hypot(l-s,u-c);e.visible=d>.02&&o>.01,e.position.set((s+l)/2,(c+u)/2,(t.z+n.z)/2+.5),e.rotation.set(0,0,Math.atan2(u-c,l-s)),e.scale.set(Math.max(.01,d),a,1),e.material.color.copy(Kx).multiplyScalar(Math.max(0,o))},Ue=new J,We=e=>(n.partPosition(e,Ue),{x:Ue.x,y:Ue.y,z:Ue.z+.6}),Ge=()=>({x:r.feetPoint.x+.2,y:r.feetPoint.y+1.9,z:r.feetPoint.z+.2}),Ke=(e,t)=>{ke=Math.max(ke,t),Ae=e},qe=(e,t,n=1,r=1)=>{Ke(e,n*12);let i=t*ur;Be(.4,[D.take(),O.take(),O.take()],(t,[a,o,s])=>{let c=1-(1-t)**3,l=(1-t)*n;if(a&&z(a,e,i*(.35+c)*.9,i*(.35+c)*.9*r,l*1.2),o){let t=i*(.9+.7*c);z(o,e,t,t*r,l*.6)}if(s){let n=i*.55*(1-t*.6);z(s,e,n,n*r,l*1.1)}})},Je=(e,t,n,r,i=1)=>{Be(n,[k.take(),A.take()],(n,[a,o])=>{let s=MS(n/.4),c=MS((n-.3)/.7),l=(1-n*n)*i;a&&He(a,e,t,s,c,r*kS,l),o&&He(o,e,t,s,c,r*kS*.5,l*1.2)})},Ye=(e,t,n,r,i,a)=>{let o=e.length;e.forEach((e,s)=>{if(!e)return;let c=s/o,l=(s+1)/o,u=Math.max(c,r),d=Math.min(l+.7/o,n);if(d<=u){e.visible=!1;return}let f=MS(((c+l)/2-r)/Math.max(.01,n-r));He(e,t(u),t(d),1,0,i*AS,a*(.2+.8*f))})},Xe=(e,t,n,r,i=10,a=!1)=>{let o=a?A:k,s=Array.from({length:i},()=>o.take());Be(t,s,(t,i)=>{Ye(i,e,MS(t/.45),MS((t-.25)/.75),n,(1-t*t)*r)})},Ze=(e,t,n,i,a,o)=>{let{travel:s,open:c,land:l,fade:u}=hS(e,a),d=kS*o,[f,p,m,h,g,_,v]=t,y=.3;if(e===`high`){let e={x:n.x+(i.x-n.x)*.2,y:n.y+9,z:n.z},t={x:i.x,y:i.y+5,z:i.z+.3},r=mS(a,.1,.25);f&&He(f,n,e,s,r,.8*d,u*.9),p&&He(p,n,e,s,r,.35*d,u*1.1);let y=4*o*c;m&&z(m,t,y,y*.32,c*u*1.3),h&&z(h,t,y*.9,y*.5,c*u*.5);let b={...i,z:i.z+.4},x=mS(a,.3,.7);g&&He(g,t,b,l,x,1.5*d,u),_&&He(_,t,b,l,x,.6*d,u*1.2);let S=mS(a,dS,.8),C=1-(1-S)**3;v&&z(v,b,(1+C*3)*o,(1+C*3)*o,S>0?(1-S)*1.1:0)}else if(e===`level`){let e={...n,z:n.z+.5},r={x:i.x,y:i.y,z:i.z+.5},c=t=>({x:NS(e.x,r.x,t),y:NS(e.y,r.y,t),z:e.z}),h=1-mS(a,dS,.43),g=c(s),_=1.5*o;f&&(z(f,g,_,_,1.3*h),f.rotateZ(-a*38)),p&&z(p,g,_*1.9,_*1.9,.45*h);let v=Math.min(1,Math.max(0,s-.6)+l*.6);Ye(t.slice(3,11),c,s,v,1.1*d,u*.9),Ye(t.slice(11),c,s,v,.5*d,u*1.2);let y=1-(1-l)**3;m&&z(m,r,(1+y*3.2)*o*1.2,(1+y*3.2)*o*1.2,l>0?(1-l)*1.2:0)}else{let e={x:r.feetPoint.x+.5,y:.35,z:r.feetPoint.z+.4},t={x:i.x,y:.35,z:i.z+.4},n=mS(a,.15,.5);f&&He(f,e,t,s,n,.9*d,u),p&&He(p,e,t,s,n,.4*d,u*1.2);let c=2.2*o*(1-s*.3);m&&z(m,e,c,c*.28,(1-s)*u);let b={x:i.x,y,z:i.z+.3},x=MS((i.y-.3)/8)*5.5+2,S={x:b.x,y:NS(y,y+x,l),z:b.z},C=mS(a,dS,.85);h&&He(h,b,S,1,C,1.8*d,u),g&&He(g,b,S,1,C,.7*d,u*1.2),_&&z(_,b,4*o,2.2*o,l*u*.8);let w=mS(a,dS,.8),T=(2+(1-(1-w)**3)*7)*o;v&&z(v,b,T,T*.26,w>0?(1-w)*1.1:0)}},Qe=(e,t,n,i,a)=>{let o=a?dS:0,s=pS[n].map(e=>j[e].take()),c=i?1.3:1;Be(.7*(1-o),s,(r,i)=>Ze(n,i,e,t,NS(o,1,r),c));let l=i=>n===`high`?{x:t.x,y:NS(t.y+5,t.y,i),z:t.z}:n===`level`?{x:NS(e.x,t.x,i),y:NS(e.y,t.y,i),z:t.z}:{x:NS(r.feetPoint.x,t.x,i),y:.4,z:t.z};for(let e of[.25,.5,.75])Ie(l(e),i?8:4,6,Kx,1);for(let e=1;e<=7;e++){let t=e/8;ze.push({wait:t*.15,run:()=>{let e=l(t);Pe(e.x+Le(.2),e.y+Le(.2),e.z,Le(.8),Le(.8)-.4,.4)}})}},$e=(e,t,n)=>{let r={x:e.x+t,y:e.y+15,z:e.z},i=t=>({x:NS(r.x,e.x,t),y:NS(r.y,e.y,t),z:e.z});Xe(i,.65,n*4.2,.6,6),Xe(i,.65,n*1.6,1,6),Xe(i,.65,n*2.2,1.3,6,!0);for(let t of[0,Math.PI])Xe(i=>({x:NS(r.x,e.x,i)+Math.sin(i*Math.PI*4+t)*1.6*n*(.3+.7*i),y:NS(r.y,e.y,i),z:e.z+.1}),.65,.7,.9,10);let a={x:e.x,y:.3,z:e.z+.2};ze.push({wait:.16,run:()=>{qe(e,3.2*n,1.2),Be(.55,[D.take(),D.take()],(e,[t,n])=>{let r=1-(1-e)**3;t&&z(t,a,3+r*9,(3+r*9)*.26,(1-e)*1.1),n&&z(n,a,1.5+r*6,(1.5+r*6)*.26,(1-e)*.8)}),tt(e,30,8),Ie(e,50,12,Kx,1)}})},et=(e,t,n,r,i)=>{for(let a=0;a<t;a++){let o=a/t;ze.push({wait:o*.5,run:()=>{let t=o*i*Math.PI*2;Pe(e.x+Math.cos(t)*r*(1-o*.3),e.y+o*n,e.z+Math.sin(t)*.3,0,.6,.45,0,.2)}})}},tt=(e,t,n)=>{for(let r=0;r<Math.ceil(t/2.5);r++){let t=Math.random()*Math.PI*2,i=n*(.4+Math.random()*.6),a=.32+Math.random()*.3;Pe(e.x,e.y,e.z+.3,Math.cos(t)*i,Math.sin(t)*i,.45+Math.random()*.3,0,a,r%3==0)}},nt=(e,t)=>{Be(.16,[M.take()],(n,[r])=>{if(!r)return;let i=t*(1.7-1.1*n);z(r,e,i,i,.4+.8*n),r.rotateZ(n*3)});for(let n=0;n<4;n++){let n=Math.random()*Math.PI*2,r=t*(.9+Math.random()*.8),i=Math.cos(n)*r,a=Math.sin(n)*r;Pe(e.x+i,e.y+a,e.z+.3,-i*6,-a*6,.16)}},rt=()=>({x:r.handPoint.x+1,y:r.handPoint.y+.6,z:r.handPoint.z+.4}),it=e=>{let t={...r.handPoint,z:r.handPoint.z+.3},n=e.x-t.x,i=e.y-t.y,a={x:e.x+n*.5,y:e.y+i*.5,z:e.z},o=e=>({x:NS(t.x,a.x,e),y:NS(t.y,a.y,e),z:NS(t.z,a.z,e)});Xe(o,.45,4.2,.7,4),Xe(o,.45,1.6,1.1,4),Xe(o,.45,2.4,1.3,4,!0);let s=Array.from({length:12},()=>k.take());Be(.7,[...s,ee.take(),O.take()],(t,n)=>{let r=n[12],i=n[13];for(let r=0;r<12;r++){let i=n[r];if(!i)continue;let a=Math.PI/2-r/12*Math.PI*2,o=r*.03,s=MS((t-o)/.2),c={x:e.x+Math.cos(a)*1.8,y:e.y+Math.sin(a)*1.8,z:e.z+.2},l={x:e.x+Math.cos(a)*7.5,y:e.y+Math.sin(a)*7.5,z:e.z+.2};He(i,c,l,s,MS((t-o-.1)/.5),.9,(1-t)*1.2)}if(r){let n=4.4*(.8+.4*(1-(1-MS(t/.25))**2));z(r,{...e,z:e.z+.3},n,n,(1-t)*1.6)}i&&z(i,e,9*(1-t*.3),9*(1-t*.3),(1-t)*.7)})},B=e=>{Be(.5,[O.take()],(t,[n])=>{n&&z(n,e,12,9,(1-MS(t/.5))*.6)}),qe(e,3.5,1.2),$e(e,0,1.8),tt(e,40,11),Ie(e,60,14,Kx,1);let t={x:e.x,y:.3,z:e.z+.3};Be(.8,[D.take(),D.take()],(e,[n,r])=>{let i=1-(1-e)**3;n&&z(n,t,5+i*14,(5+i*14)*.18,(1-e)*1.1),r&&z(r,t,3+i*9,(3+i*9)*.18,(1-e)*.8)})},at=(e,t,n)=>{let r=Array.from({length:14},()=>te.take()),i=r.map(()=>{let e=Math.random()*Math.PI*2;return{x:Math.cos(e)*t*.5*(.5+Math.random()*.5),y:Math.abs(Math.sin(e))*n*.45-n*.1,vx:Math.cos(e)*(1.5+Math.random()*3),vy:1+Math.random()*3,spin:(Math.random()-.5)*12,turn:Math.random()*Math.PI,size:.5+Math.random()*.6}});Be(.8,r,(t,n)=>{n.forEach((n,r)=>{let a=i[r];if(!n||!a)return;let o=t*.8,s={x:e.x+a.x+a.vx*o,y:e.y+a.y+a.vy*o-9*o*o,z:e.z+.2};z(n,s,a.size*.5,a.size,(1-t)**1.5*1.1),n.rotateZ(a.turn+a.spin*o)})}),Ie(e,16,7,Kx,1)},ot=(e,t,n)=>{let i=Ge();switch(e){case`judgement`:$e(n,0,1);break;case`mending`:{let e={x:r.feetPoint.x+.2,y:r.feetPoint.y,z:r.feetPoint.z+.3};Be(1,[O.take(),D.take(),D.take()],(t,[n,r,a])=>{if(n&&z(n,i,4.8+t,6+t,Math.sin(t*Math.PI)*.6),r){let n=3.6-t,i=Math.sin(t*Math.PI*3)*.5;z(r,{...e,x:e.x+i,y:.2+t*4.2},n,n*.16,Math.sin(t*Math.PI)*1.2)}if(a){let n=MS(t*1.3-.3),r=3.1-n,i=-Math.sin(n*Math.PI*3)*.5;z(a,{...e,x:e.x+i,y:.2+n*4.2},r,r*.16,Math.sin(n*Math.PI)*.9)}}),et({...e,y:.2},16,4.2,1.3,2);for(let e=0;e<10;e++){let e=1.8+Math.random()*2.2;Pe(i.x+Le(1.3),.3+Math.random()*2.2,i.z,Le(.3),e,1.1)}Ke(i,11);break}case`sanctuary`:qe({...i,z:i.z+.3},1.3,.9,1.3);break;case`hour`:dt=t.part,ut=Math.max(ut,.8),qe(n,1.3,.8);break;case`answer`:qe(rt(),.8,.8);break;case`benediction`:Be(.9,[O.take()],(e,[t])=>{if(t){let n={...i,y:i.y+e*1.6};z(t,n,2.4+e,6.2,Math.sin(e*Math.PI)*.45)}}),et({x:i.x,y:.2,z:i.z},28,4.6,1.4,3);for(let e=0;e<22;e++){let e=4+Math.random()*5;Pe(i.x+Le(.5),i.y-.6,i.z,Le(2.2),e,1.1+Math.random()*.5,-9)}qe({...i,z:i.z+.3},1.6,.9,1.2),Ke(i,10)}},st=0,ct=0,lt=0,ut=0,dt,ft=0,pt=[],mt=[],ht=[],gt=-1,_t={x:0,y:0,z:0},vt=!1,yt=[],bt=!1,xt=!1,St=!1,Ct,wt=()=>{for(let e of pt)E(e.mesh);pt=[],mt=[]},Tt=()=>{for(let e of Re)Ve(e.pieces);Re=[],ze=[],wt();for(let e of De)e.visible=!1;for(let e of Me)e.life=0;Fe(0),st=0,ct=0,lt=0,ut=0,ft=0,gt=-1,yt=[],bt=!1,ht.length=0,St=!1,Ct=void 0,ke=0,Oe.intensity=0,dt=void 0};return{trigger(e,t){switch(e.type){case`sunderStart`:wt();break;case`target`:break;case`linkBeat`:qe({...r.handPoint,z:r.handPoint.z+.3},1.2,1.3);break;case`cut`:{let n=We(e.part),{burst:i,string:a}=Yx(e,t.combos),o=i===`big`,s={...r.handPoint,z:r.handPoint.z+.3};nt(s,o?1.9:1.4),Qe(s,n,e.stance,o,e.index===0&&St),St=!1,qe(n,o?2.6:1.7,o?1.2:.9),o&&ze.push({wait:.07,run:()=>qe(n,1.8,.8)}),tt(n,o?28:14,o?7:5),Ie(n,o?40:18,o?11:6,Kx,1),a&&ot(a,e,n);break}case`parry`:st=Math.max(st,e.perfect?1:.55),Ke(r.clashPoint,e.perfect?16:8),e.perfect?(qe({...r.clashPoint,z:r.clashPoint.z+.4},1.5,1,1.9),Ie(r.clashPoint,24,10,Kx,1)):Ie(r.clashPoint,8,6,qx,1);break;case`hurt`:if((e.blocked??0)>0){st=Math.max(st,.5),Ie(r.clashPoint,18,8,qx,-1),Ie(r.clashPoint,10,5,Kx,1);for(let e=0;e<4;e++){let{x:e,y:t,z:n}=r.clashPoint;Pe(e+Le(.3),t+Le(1.4),n+.4,Le(3),Le(3),.5)}}break;case`hourStrike`:{let t=We(e.part);if(dt=e.part,e.links<=0)break;ut=1;for(let n=0;n<e.links;n++)ze.push({wait:n*jS,run:()=>{qe(t,1.2,.9),Ie(t,14,8,Kx,1)}});break}case`wardAnswer`:{let t=We(e.part),n=rt();Je(n,t,.16,.8),qe(n,.7,.8),qe(t,1.1,.9),Ie(t,18,8,Kx,1);break}case`iai`:{let t=We(e.part);if(!e.perfect){Ie(t,8,4,qx,1);break}it(t),qe(t,2.6,1.1),Ie(t,40,12,Kx,1);break}case`sunderFlash`:{let n=t.tuning.sunderCutTicks.length;if(e.index>=n-1)break;mt.push(e.index);break}case`sunderCut`:{let t=pt[e.index];if(t&&t.lit<0&&(t.lit=0,qe(t.at,e.quality===`perfect`?1.1:.8,.9)),e.final){for(let e of pt)e.lit<0&&(e.lit=0),qe(e.at,1.4,1);gt=0,vt=!1,yt=[],_t=We(e.part)}break}case`counter`:{let t=We(e.part),n=Xx(e.style);if(n===`lance`)Je({x:t.x,y:t.y+14,z:t.z},t,.2,1.3);else if(n===`burst`)qe({...r.clashPoint,z:r.clashPoint.z+.4},2,1,1.4),Je(r.handPoint,t,.14,.7);else{let e={x:r.feetPoint.x,y:.35,z:r.feetPoint.z};Je(e,{x:t.x,y:.35,z:t.z},.3,.9)}qe(t,e.strong?1.8:1.3,1),Ie(t,e.strong?30:18,9,Kx,1);break}case`riposteHit`:{let t=We(e.part);$e(t,(r.handPoint.x-t.x)*.3,1.2);break}case`interruptCut`:{let t=We(e.part);if(e.final)$e(t,(r.handPoint.x-t.x)*.3,1.2);else{let e={...r.handPoint,z:r.handPoint.z+.3};Qe(e,t,`high`,!1,!1),qe(t,1.7,.9)}break}case`riposteSlash`:qe({...r.clashPoint,z:r.clashPoint.z+.4},1.8,1,1.5),Ie(r.clashPoint,18,9,Kx,1);break;case`restart`:Tt()}},update(e,t,n,i){xt=!0;let a=e.player;if(ze.length>0){for(let e of ze)e.wait-=n;let e=ze.filter(e=>e.wait<=0);ze=ze.filter(e=>e.wait>0);for(let t of e)t.run()}let o=(e,t,r,i)=>e+(t-e)*(1-Math.exp(-n*(t>e?r:i))),s=e.hero.action,c=0,l=!1;if(s===`parry`){let t=Zx(e.hero.actionTick,i);c=t.level,l=t.flicker}else(s===`brace`||s===`deflect`)&&(c=s===`brace`?.9+.1*Math.sin(t*24):1);st*=Math.exp(-n*7);let u=c*(l?.5:1)+st,d={x:r.feetPoint.x+(r.clashPoint.x-r.feetPoint.x)*SS,y:r.clashPoint.y,z:r.clashPoint.z+.35};if(P.visible=c>0||st>.03,re.visible=P.visible,ne.visible=P.visible,ie.visible=P.visible,ae.visible=P.visible,P.visible){let t=1+st*.25,n=(e,t)=>{e.rotateY(CS),e.rotateX(-.52),Ue.set(0,0,1).applyQuaternion(e.quaternion),e.position.addScaledVector(Ue,t)};z(P,d,2.1*t,3.1*t,u),n(P,0),z(re,d,2.6*t,4.4*t,u*.22),n(re,0);let r=s===`parry`?$x(e.hero.actionTick,i)+st*Qx:u*Qx;z(ne,{...d,z:d.z-.02},2.1*t,3.1*t,r),n(ne,0),ne.material.color.setHex(16180136).multiplyScalar(Math.max(0,r));let a=wS.size*t;z(ie,d,2.1*a,3.1*a,u*.9),n(ie,wS.depth),z(ae,d,TS.size*t,TS.size*t*1.3,u*1.1),n(ae,TS.depth)}let f=vS(e,i);f===void 0?a.step!==`strike`&&(St=!1):St=f>.3||St;for(let e of[`high`,`level`,`low`]){let t=ce[e];if(f!==void 0&&e===a.opener){for(let e of t)e.visible=!0;let n=We(a.target),i={...r.handPoint,z:r.handPoint.z+.3};Ze(e,t,i,n,f*dS,1)}else for(let e of t)e.visible=!1}if(f!==void 0){let e={...r.handPoint,z:r.handPoint.z+.3},i=1.9-.9*f;if(oe.visible=!0,z(oe,e,i,i,.4+.8*f),oe.rotateZ(t*1.5),n>0&&Math.random()<.6){let t=Math.random()*Math.PI*2,n=Math.cos(t)*1.4,r=Math.sin(t)*1.4;Pe(e.x+n,e.y+r,e.z,-n*4,-r*4,.3)}}else oe.visible=!1;let p=nS(e,i);if(ue.visible=p!==void 0,de.visible=p!==void 0,fe.visible=p!==void 0,pe.visible=p!==void 0,p){let e={...r.handPoint,z:r.handPoint.z+.4},i=(3-p.size)/2,a=tS*(p.inWindow?1.1:1),o=t*.5;z(de,e,a,a,p.inWindow?1:.5),de.rotateZ(o),z(fe,{...e,z:e.z+.005},a,a,p.inWindow?1.4:0),fe.rotateZ(o),z(ue,{...e,z:e.z+.01},tS*p.size,tS*p.size,p.level*1.3),ue.rotateZ(-(i*2.4+t*.8));let s=a*(1.6+.6*(1-i));if(z(pe,e,s,s,p.inWindow?.6:.12*i),n>0&&Math.random()<(p.inWindow?.9:.5)){let t=Math.random()*Math.PI*2,n=tS*(.55+.5*p.size*.3),r=Math.cos(t)*n,i=Math.sin(t)*n;Pe(e.x+r,e.y+i,e.z,-r*2.2-i*1.6,-i*2.2+r*1.6,.3)}}let m=e.blessed===!0,h={w:OS.w,h:OS.h},g={x:r.feetPoint.x+.2,y:r.feetPoint.y+h.h*.5-.2,z:r.feetPoint.z+.3};if(bt&&!m&&ct>.4&&(Ke(Ge(),9),at(g,h.w,h.h)),bt=m,ct=m?o(ct,1,5,4):ct*Math.exp(-n*22),me.visible=ct>.02,he.visible=me.visible,ge.visible=me.visible,me.visible){let e=.88+.12*Math.sin(t*2.4),i={x:r.feetPoint.x+.2,y:r.feetPoint.y+.15,z:r.feetPoint.z+.3};z(me,g,h.w*1.1,h.h*.9,ct*.1*e),z(ge,g,h.w,h.h,ct*.62*e),ge.material.color.setHex(16180136).multiplyScalar(ct*.62*e),z(he,{...i,z:i.z+.05},h.w*1.05,h.w*1.05,ct*.75),he.rotateX(-1.15),he.rotateZ(t*.35),n>0&&Math.random()<n*5&&Pe(i.x+Le(h.w*.35),i.y+.3+Math.random()*2,i.z,Le(.15),.7+Math.random()*.5,1.3,0,.2)}if(lt=o(lt,+!!yS(e),8,6),ut*=Math.exp(-n*6),F.visible=lt>.02,_e.visible=F.visible,F.visible){let e=We(dt??a.target),t=lt*.7+ut;z(F,e,xS,xS,t),z(_e,e,xS,xS,t),_e.rotateZ(-a.tick*.09)}if(ft=o(ft,+!!e.answering,8,6),ve.visible=ft>.02,ve.visible){let e=rt(),n=Math.sin(t*2.2)*.12;z(ve,{...e,y:e.y+n},1.5,1.5,ft*.85)}let _=iS(e,i),v=_!==void 0;gt>=0&&(gt+=n,gt>aS&&(gt=-1));let y=gt>=0;for(let e of[we,Te])e.visible=v;if(I.visible=v||y,Ce.visible=v||y,!y)for(let e of L)e.visible=!1;if(_!==void 0||y){let e=_??1,i=y?1-MS((gt-.3)/.39999999999999997):1,a=r.blade.drawn,o=a?{...r.bladeGuard,z:r.bladeGuard.z+.4}:{x:r.handPoint.x,y:r.handPoint.y,z:r.handPoint.z+.4},s=a?{...r.bladeTip,z:r.bladeTip.z+.4}:{x:o.x,y:o.y+DS,z:o.z},c=Math.max(.001,Math.hypot(s.x-o.x,s.y-o.y)),l=y?1:MS(((s.y-o.y)/c-.75)/.2),u=MS(1+(s.x-o.x)/c*3),d=y?sS(o,s,1.5+15*u):sS(o,s,1.5+16.5*l),f=.93+.07*Math.sin(t*37);if(He(I,o,d,1,0,(2.8+10*e)*f*(.55+.45*i),(.25+.55*e)*(.4+.6*l)*i),He(Ce,o,d,1,0,1+4*e,(.6+.8*e)*f*i),y){n>0&&(yt.push({at:t,guard:o,top:d}),yt=yt.filter(e=>t-e.at<=.25));let e=lS(yt,t,L.length,oS);L.forEach((t,n)=>{let r=e[n];r?He(t,r.sample.guard,r.sample.top,1,0,4*r.k,.35*r.k*i):t.visible=!1}),Ke(s,8*i);let r=Math.atan2(_t.y-o.y,_t.x-o.x),a=Math.atan2(d.y-o.y,d.x-o.x),c=Math.atan2(Math.sin(a-r),Math.cos(a-r));!vt&&cS(c,gt)&&(vt=!0,B(_t))}let p=2.2+4*e;z(we,s,p,p,.3+.7*e);let m=4.2-2.4*e;if(z(Te,s,m,m,.3+.6*e),Te.rotateZ(t*3),v&&Ke(s,3+10*e),v&&n>0&&Math.random()<.5+.4*e){let e=Math.random()*Math.PI*2,t=1.5+Math.random()*1.5;Pe(s.x+Math.cos(e)*t,s.y+Math.sin(e)*t,s.z,-Math.cos(e)*t*3,-Math.sin(e)*t*3,.4)}}let b={...r.handPoint,z:r.handPoint.z+.4};gS(Ct,r.blade.drawn)&&(Ke(b,10),Be(.28,[le,D.take()],(e,[t,n])=>{let r=(1-e)**1.5;t&&z(t,b,2.6*(.7+.5*e),2.6*(.7+.5*e),r*1.5),n&&z(n,b,.8+2*e,.8+2*e,r*1.2)}),Ie(b,16,7,Kx,1)),Ct=r.blade.drawn;let x=_S(e,i);if(Ee.visible=r.blade.drawn,R.visible=r.blade.drawn,r.blade.drawn){let e={...r.bladeGuard,z:r.bladeGuard.z+.3},n={...r.bladeTip,z:r.bladeTip.z+.3},i=Math.max(.45,_??0,x),a=.9+.1*Math.sin(t*11);He(Ee,e,n,1,0,(.9+1.4*i)*a,.35+.5*i),He(R,e,n,1,0,.35+.4*i,.6+.4*i)}let S={x:r.handPoint.x,y:r.handPoint.y,z:r.handPoint.z};if(ye.visible=x>0,be.forEach((e,n)=>{let r=n*.3,i=MS((x-r)/(1-r));if(e.visible=x>r,!e.visible)return;let a=.7+(3.2+n*1.4)*(1-i)**1.5;z(e,{...S,z:S.z+.4},a,a,.2+.6*i),e.rotateZ(t*(n?-2.2:2.8))}),x>0){let e=x>=1?.75+.25*Math.sin(t*30):1,r=(1+x*1.6)*e;if(z(ye,{...S,z:S.z+.38},r,r,.15+.5*x),Ke(S,3+9*x),n>0&&Math.random()<x*.7){let e=Math.random()*Math.PI*2,t=1.2+Math.random()*1.2,n=Math.cos(e)*t,r=Math.sin(e)*t;Pe(S.x+n,S.y+r,S.z+.4,-n*3,-r*3,.4)}}if(n>0){for(ht.push({x:r.handPoint.x,y:r.handPoint.y,z:r.handPoint.z+.3,at:t});ht.length>0&&t-(ht[0]?.at??t)>ES;)ht.shift();ht.length>15&&ht.splice(0,ht.length-14-1)}let C=0;for(let e=1;e<ht.length;e++){let n=ht[e-1],r=ht[e],i=xe[e-1];if(!n||!r||!i)continue;let a=Math.hypot(r.x-n.x,r.y-n.y);C+=a;let o=MS((t-r.at)/ES);He(i,n,r,1,0,.9*AS,(1-o)*.9),a<.03&&(i.visible=!1)}for(let e=Math.max(0,ht.length-1);e<14;e++){let t=xe[e];t&&(t.visible=!1)}let w=MS(C/3.5);if(Se.visible=w>.05,Se.visible&&z(Se,{...r.handPoint,z:r.handPoint.z+.35},1.5,1.5,.7*w),mt.length>0){let t=e.frame-a.tick,n=We(a.target);for(let e of mt){let r=N.take();if(!r)continue;let i=eS(t,e);r.visible=!0,pt.push({mesh:r,index:e,at:{x:n.x+i.dx,y:n.y+i.dy,z:n.z+.2},size:i.size,turn:i.turn,lit:-1})}mt=[]}for(let e of pt){e.lit>=0&&(e.lit+=n);let r=e.lit<0?uS(a.tick,e.index,i):1,o=e.lit<0?.5+.2*r+.08*Math.sin(t*6):Math.max(0,1.5-e.lit*3.3),s=e.lit<0?1-.16*r:1+e.lit*2.6;e.mesh.visible=o>.02,z(e.mesh,e.at,e.size*s,e.size*s,o),e.mesh.rotateZ(e.turn+t*(e.index%2?-.4:.4))}if(!bS(e)){let e=pt.filter(e=>e.lit<0||e.lit>.45);for(let t of e)E(t.mesh);pt=pt.filter(t=>!e.includes(t))}let T=[];for(let e of Re)e.age+=n,e.draw(Math.min(1,e.age/e.life),e.pieces),e.age>=e.life&&T.push(e);for(let e of T)Ve(e.pieces);Re=Re.filter(e=>!T.includes(e)),Fe(n),ke*=Math.exp(-n*10),Oe.position.set(Ae.x+.3,Ae.y,Ae.z+.8),Oe.intensity=ke},hide(){xt&&(xt=!1,Tt())},reset:Tt}}var FS={smoke:{colour:2369070,rise:1.5,life:1.5,size:1,opacity:.85},steam:{colour:11186877,rise:2.2,life:.9,size:.9,opacity:.6},dust:{colour:7301734,rise:.7,life:.8,size:.75,opacity:.55}},IS=84,LS=()=>({x:0,y:-100,z:0,vx:0,vy:0,vz:0,life:0,maxLife:1,r:0,g:0,b:0});function RS(e){let t=Array.from({length:e},LS),n=0;return{items:t,take(){let r=t[n]??LS();return n=(n+1)%e,r}}}var zS=160,BS=80,VS=18,HS=.03;function US(e){let t=RS(zS),n=new Float32Array(960),r=new Float32Array(960),i=new Jd,a=new Nd(n,3),o=new Nd(r,3);i.setAttribute(`position`,a),i.setAttribute(`color`,o);let s=new Vf(i,new kf({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1}));s.frustumCulled=!1;let c=RS(BS),l=new Float32Array(240),u=new Float32Array(240),d=new Jd,f=new Nd(l,3),p=new Nd(u,3);d.setAttribute(`position`,f),d.setAttribute(`color`,p);let m=new qf(d,new Hf({size:3,sizeAttenuation:!1,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1}));m.frustumCulled=!1;let h=[zb(),Bb()].map(e=>new fp({map:Xy(e),alphaTest:.5,side:2,roughness:.4,metalness:.5,emissive:16752704,emissiveIntensity:.35,emissiveMap:Xy(e)})),g=Array.from({length:VS},(t,n)=>{let r=n%3!=2,i=new yf(new tp((r?9:6)*er*2,(r?9:4)*er*2),h[+!r]);return i.visible=!1,i.castShadow=!0,e.add(i),{mesh:i,p:LS(),spin:0}}),_=0,v=Xy(qb()),y=Array.from({length:IS},()=>{let t=new yf(new tp(12*er*2,10*er*2),new sf({map:v,transparent:!0,depthWrite:!1}));return t.visible=!1,e.add(t),{mesh:t,p:LS(),size:1,opacity:1}}),b=0;return e.add(s,m),{sparks(e,n,r,i,a){for(let o=0;o<n;o++){let n=t.take(),o=(Math.random()-.5)*Math.PI*1.3,s=1.6*r*(.35+Math.random()*.9),c=Math.random()<.3;Object.assign(n,{x:e.x,y:e.y,z:e.z,vx:Math.cos(o)*s*a,vy:Math.sin(o)*s+s*.25,vz:(Math.random()-.5)*s*.5,life:.18+Math.random()*.32,r:c?1:i.r,g:c?1:i.g,b:c?1:i.b}),n.maxLife=n.life}},embers(e,t){for(let n=0;n<t;n++){let t=c.take();Object.assign(t,{x:e.x+(Math.random()-.5)*.4,y:e.y+(Math.random()-.5)*.4,z:e.z,vx:(Math.random()-.3)*1.2,vy:.2+Math.random()*.8,vz:(Math.random()-.5)*.4,life:.8+Math.random()*1,r:1,g:.55+Math.random()*.25,b:.15}),t.maxLife=t.life}},smoke(e,t,n){let r=FS[n];for(let n=0;n<t;n++){let t=y[b];b=(b+1)%IS,t&&(Object.assign(t.p,{x:e.x+(Math.random()-.5)*.35,y:e.y+(Math.random()-.5)*.2,z:e.z+.35,vx:(Math.random()-.35)*.7,vy:r.rise*(.7+Math.random()*.6),vz:(Math.random()-.5)*.3,life:r.life*(.75+Math.random()*.5)}),t.p.maxLife=t.p.life,t.size=r.size*(.7+Math.random()*.6),t.opacity=r.opacity,t.mesh.material.color.setHex(r.colour),t.mesh.rotation.z=Math.random()<.5?0:Math.PI)}},debris(e,t){for(let n=0;n<t;n++){let t=g[_];_=(_+1)%VS,t&&(Object.assign(t.p,{x:e.x+(Math.random()-.5)*.8,y:e.y+(Math.random()-.5)*.8,z:e.z+.8,vx:-(.5+Math.random()*3),vy:1.5+Math.random()*3,vz:(Math.random()-.5)*1.5,life:1.6+Math.random()*.6}),t.p.maxLife=t.p.life,t.spin=(Math.random()-.5)*18,t.mesh.visible=!0)}},update(e){let i=Math.exp(-e*3);t.items.forEach((t,a)=>{t.life>0&&(t.life-=e,t.vx*=i,t.vy=t.vy*i-8*e,t.vz*=i,t.x+=t.vx*e,t.y=Math.max(.02,t.y+t.vy*e),t.z+=t.vz*e);let o=t.life>0?t.life/t.maxLife:0,s=t.life>0,c=s?t.y:-100,l=s?t.y-t.vy*HS:-100,u=o*.15,d=a*6;n[d]=t.x,n[d+1]=c,n[d+2]=t.z,n[d+3]=t.x-t.vx*HS,n[d+4]=l,n[d+5]=t.z,r[d]=t.r*o,r[d+1]=t.g*o,r[d+2]=t.b*o,r[d+3]=t.r*u,r[d+4]=t.g*u,r[d+5]=t.b*u}),a.needsUpdate=!0,o.needsUpdate=!0,c.items.forEach((t,n)=>{t.life>0&&(t.life-=e,t.vx*=Math.exp(-e*1.5),t.vy+=.3*e,t.x+=t.vx*e+Math.sin(t.life*9+n)*.003,t.y+=t.vy*e,t.z+=t.vz*e);let r=t.life>0?Math.min(1,t.life/t.maxLife):0,i=n*3;l[i]=t.x,l[i+1]=t.life>0?t.y:-100,l[i+2]=t.z,u[i]=t.r*r,u[i+1]=t.g*r,u[i+2]=t.b*r}),f.needsUpdate=!0,p.needsUpdate=!0;for(let t of y){let{p:n,mesh:r}=t;if(n.life<=0){r.visible=!1;continue}n.life-=e,n.vy*=Math.exp(-e*.9),n.x+=(n.vx-.25)*e,n.y+=n.vy*e,n.z+=n.vz*e;let i=Math.min(1,1-n.life/n.maxLife);r.visible=!0,r.position.set(n.x,n.y,n.z),r.scale.setScalar(t.size*(.5+i*1.7)),r.material.opacity=t.opacity*Math.min(1,i*8)*(1-i)**1.2}for(let t of g){let{p:n,mesh:r}=t;n.life<=0?r.visible=!1:(n.life-=e,n.vy-=7*e,n.x+=n.vx*e,n.y+=n.vy*e,n.z+=n.vz*e,n.y<.03&&(n.y=.03,n.vy=Math.abs(n.vy)*.35,n.vx*=.6,t.spin*=.5),r.position.set(n.x,n.y,n.z),r.rotation.z+=t.spin*e,r.scale.setScalar(Math.min(1,n.life/n.maxLife*3)))}}}}var WS={amber:16757818,red:16722490},GS={x:1.5,y:1.1},KS=.36,qS=.04,JS=.2,YS=new Y(WS.amber),XS=new Y(16769696),ZS=new Y(16777215),QS=new Y(9434084),$S=new Y(Gx.light),eC=new Y(16738906);function tC(e,t){let n=e.player;return e.turn===`player`&&n.step===`strike`&&n.doneAt<0&&n.drawSince<0&&Xr(n.cuts,t)}function nC(e,t){let n=e.player;return e.turn!==`player`||n.step!==`strike`||n.drawSince<0||n.doneAt>=0?0:Math.min(1,Math.max(.001,(n.tick-n.drawSince)/t.tuning.iaiDrawTicks))}function rC(e,t){let n=e.player;if(e.turn!==`player`||n.step!==`strike`||n.drawSince<0)return;let r=n.tick-(n.drawSince+t.tuning.iaiDrawTicks);return r>=0&&r<t.tuning.glintTicks?r:void 0}function iC(e){let t=e.player;return(e.outcome===`fighting`||_(e))&&e.turn===`player`&&t.step===`sunder`&&t.doneAt<0}function aC(e,t){if(!iC(e))return;let n=e.player,r=t.tuning.sunderCutTicks[n.sunderCuts.length];if(r===void 0)return;let i=n.tick-(r-t.tuning.glintLead);return i>=0&&i<t.tuning.glintTicks?i:void 0}function oC(e,t,n,r,i){let a={flash:0,tint:new Y,tintAmount:0,shake:new J,kick:0,pushIn:0,lean:0,focus:new J},s=US(e),c=ux(e,t),l=Yb(e,t),u=Yb(e,t,!0),d=ex(e,t),f=Pb(e),p=new J,m=Zb(e,s,new Y(WS.red)),h=PS(e,t,n,r,s),g=new rm(16766106,0,6,2);e.add(g);let v=0,y=0,b=0,x=0,S=0,C=0,w=0,T=new J,E={x:ar.x-1.6,y:6,z:ar.z+.9},D=new J,O=0,k=!1,A=!0,j=0,ee=0,M,N=[],te=[],P,ne=0,re=0,ie=!1,ae=new J(ir.x+1,2,ir.z);a.focus.copy(ae);function oe(e){ae.set(e.x,e.y,e.z)}let se=on,ce=!1,le=!0,ue=!0,de=(e,t,n,r)=>sx(e).map(e=>({angle:e.angle,size:e.size*n,colour:t,wait:e.at>0?r(e.at):0,rise:e.rise,thin:e.thin}));return{screen:a,setLight(e){ce=e},setLayers(e){le=e.light,ue=e.hits},trigger(e){let t=r.clashPoint,i=ce,a=e.type===`restart`;if(i&&(le||a)&&h.trigger(e,se),ue||a)switch(e.type){case`parry`:e.perfect?(s.sparks(t,70,15,YS,1),s.sparks(t,40,9,ZS,-1),s.embers(t,20),c.ring(t,1.8,XS),c.clash(t,2.6,XS),C=1,x=1,v=Math.max(v,.24),S=1,oe(t),r.flash(1),r.push(.12),n.knock(e.limb,2.2),n.stagger(1.1)):(s.sparks(t,26,8,YS,1),c.ring(t,1,YS),c.clash(t,1.3,YS),C=.45,v=Math.max(v,.08),r.flash(.15),r.push(.45),n.knock(e.limb,.45));break;case`flashCounter`:y=.3,x=1,v=Math.max(v,.16),w=1,oe(t),s.sparks(t,70,12,ZS,1),s.embers(t,20),c.ring(t,2.6,ZS),c.clash(t,4,ZS),s.sparks(t,60,18,XS,1),r.flash(1),n.stagger(1);break;case`riposteSlash`:s.sparks(E,16,7,YS,1),v=Math.max(v,.06),n.flash(.5),n.stagger(.5);break;case`riposteHit`:{let t=n.partPosition(e.part,D);y=Math.max(y,.7),v=Math.max(v,.24),S=Math.max(S,.7),oe(t),n.flash(1,e.part),n.stagger(1.3),s.sparks(t,60,11,YS,1),s.embers(t,24),s.debris(t,12),c.ring(t,3,XS),C=1;break}case`cut`:{let t=n.partPosition(e.part,D),r=e.quality===`perfect`||e.special!==``;n.flash(r?1:.5,e.part),n.stagger(r?.6:.3),s.sparks(t,r?34:14,r?9:5,i?$S:r?ZS:YS,1),c.ring(t,r?1.8:1,i?$S:r?ZS:YS),i||c.marks(t,de(Ha(e,e.index),e.special?XS:ZS,r?1.2:1,Pa)),v=Math.max(v,r?.1:.05),r&&(y=Math.max(y,e.special?.4:.2),S=Math.max(S,e.special?.9:.5),oe(t),s.sparks(t,e.special?50:26,14,i?$S:e.special?XS:ZS,1));break}case`linkBeat`:r.flash(.35),s.smoke({x:r.clashPoint.x-.9,y:.1,z:r.clashPoint.z+.2},4,`dust`);break;case`chainDrop`:v=Math.max(v,.03);break;case`iai`:{let t=n.partPosition(e.part,D);if(!e.perfect){s.sparks(t,8,4,YS,1);break}y=.5,x=1.8,i||c.sever(t),v=Math.max(v,.3),S=1,w=Math.max(w,.5),oe(t),r.flash(1),n.flash(1,e.part),n.stagger(1.4),s.sparks(t,80,13,ZS,1),s.embers(t,30),c.ring(t,3.4,ZS),c.clash(t,4.4,ZS),s.sparks(t,70,20,XS,1),i||(M={at:{x:t.x,y:t.y,z:t.z},wait:.2}),i||c.marks(t,de(`iaiCut`,ZS,1.3,()=>0));break}case`beamCatch`:s.sparks(t,e.perfect?40:20,10,e.perfect?ZS:YS,-1),c.ring(t,e.perfect?1.6:1,e.perfect?XS:YS),v=Math.max(v,.08),r.flash(e.perfect?.8:.3),C=.6;break;case`interrupt`:{let t=n.partPosition(e.part,D);y=Math.max(y,.25),x=Math.max(x,1.2),v=Math.max(v,.16),S=Math.max(S,.7),oe(t),r.flash(1),n.flash(.8),n.stagger(1.3),n.knock(e.part===`core`?`body`:e.part,1.6),s.embers(r.hiltPoint,20),c.ring(r.hiltPoint,2.2,XS);break}case`interruptCut`:{let t=n.partPosition(e.part,D),r=e.final;oe(t),n.flash(1,e.part),n.stagger(r?1.2:.6),s.sparks(t,r?60:24,r?12:8,r?XS:YS,1),c.ring(t,r?3:1.6,XS),i||c.marks(t,de(r?`iaiCut`:`cutHighA`,XS,r?1.3:1,()=>0)),v=Math.max(v,r?.24:.1),S=Math.max(S,r?.8:.4),r&&(y=Math.max(y,.35),s.embers(t,20),s.debris(t,8)),C=1;break}case`sunderReady`:r.flash(.6),s.embers(r.hiltPoint,14),c.ring(r.hiltPoint,1.4,XS);break;case`sunderStart`:y=Math.max(y,.15),v=Math.max(v,.1),r.flash(1),s.embers(r.hiltPoint,24),c.ring(r.hiltPoint,2.4,XS),oe(n.partPosition(e.part,D)),N=[],te=[],c.clearScars();break;case`sunderCut`:{let t=n.partPosition(e.part,D),a=se.tuning.sunderCutTicks.length,o=Wa(e.index,a),l=e.quality===`perfect`,u=e.quality===`miss`,d=l?ZS:u?YS:XS;oe(t),n.flash(u?.4:1,e.part),n.stagger(u?.3:l?.9:.6),s.sparks(t,u?12:l?60:34,u?5:12,d,1),c.ring(t,u?1:l?2.6:1.8,d);let f=u?.9:l?1.5:1.2,p={x:t.x+(Math.random()-.5)*GS.x,y:t.y+(Math.random()-.5)*GS.y,z:t.z},m=(Math.random()-.5)*KS,h=de(o,d,f,()=>0).map(e=>({...e,angle:e.angle+m})),g=!i;g&&!e.final&&c.marks(p,h);for(let e of g?h:[])c.scar(p,e),N.push({at:p,angle:e.angle,size:e.size});if(v=Math.max(v,u?.04:l?.2:.12),S=Math.max(S,u?.2:l?.8:.5),u||(c.clash(t,l?3.4:2.2,d),s.embers(t,l?16:8),C=1),!e.final)break;y=Math.max(y,u?.2:.4),x=Math.max(x,1.6),v=Math.max(v,u?.14:.32),S=1,r.flash(1),s.sparks(t,70,18,XS,-1),s.sparks(t,40,15,ZS,1),s.debris(t,10),c.ignite(qS),te=N.map((e,t,n)=>({...e,wait:t*qS,last:t===n.length-1,index:t})),P={lines:N,wait:(N.length-1)*qS+JS},N=[];break}case`counter`:{let t=n.partPosition(e.part,D);y=Math.max(y,e.strong?.45:.3),v=Math.max(v,e.strong?.18:.12),S=Math.max(S,.8),oe(t),n.flash(1,e.part),n.stagger(e.strong?1:.6),s.sparks(t,e.strong?50:30,10,QS,1),c.ring(t,2.4,QS),i||c.marks(t,de($a(e.style),QS,e.strong?1.2:1,e=>Fa(e,se)));break}case`move`:e.move===`dodge`&&(j=-1),e.move===`roll`&&(j=1);break;case`partBroken`:{let t=n.partPosition(e.part,D);n.breakOff(e.part),k=e.part!==`core`,y=Math.max(y,.6),v=Math.max(v,.32),S=Math.max(S,.8),oe(t),s.debris(t,18),s.sparks(t,70,12,YS,1),s.smoke(t,10,`steam`),s.smoke(t,6,`smoke`),c.ring(t,3.4,XS),s.sparks(t,60,16,XS,-1);break}case`hurt`:b=1,v=Math.max(v,e.damage>=16?.16:.11),s.sparks(t,8,4,eC,-1);break;case`evade`:e.perfect&&(y=Math.max(y,.2),c.ring({x:t.x-.6,y:t.y-.5,z:t.z},2.4,QS));break;case`strike`:(e.motion===`slam`||e.motion===`plunge`)&&(v=Math.max(v,.03));break;case`windup`:n.windup(e.limb);break;case`restart`:M=void 0,h.reset(),N=[],te=[],P=void 0,c.clearScars(),ne=0,re=0,ie=!1}},reset(){this.trigger({type:`restart`}),c.clear(),y=0,v=0,S=0,w=0,x=0,b=0,C=0},update(e,t,E,N){se=N;let ue=o(e.parts);if(k&&A&&!ue){let e=n.partPosition(`core`,D);n.flash(1,`core`),s.debris(e,12),s.sparks(e,50,12,YS,-1),s.embers(e,18),c.ring(e,2.6,YS)}k=!1,A=ue;let de=nC(e,se);de>0&&ee<.02&&oe(r.hiltPoint);let fe=!ce;d.update(fe&&de>0?r.hiltPoint:void 0,de,t),ee+=(de-ee)*(1-Math.exp(-E*(de>ee?9:16))),de>0&&(v=Math.max(v,.014*de));let pe=+!!iC(e);ne+=(pe-ne)*(1-Math.exp(-E*(pe>ne?7:3)));let me=_(e);if(ie&&!me&&e.outcome===`victory`&&(y=Math.max(y,.9)),ie=me,re+=(+!!me-re)*(1-Math.exp(-E*(me?14:5))),te.length>0){for(let e of te){if(e.wait-=E,e.wait>0)continue;i({type:`scarLit`,index:e.index,last:e.last});let t=e.size*1.5*ur;for(let n of[-1,-.5,0,.5,1]){let r={x:e.at.x+Math.cos(e.angle)*t*n,y:e.at.y+Math.sin(e.angle)*t*n,z:e.at.z};s.sparks(r,14,15,n===0?ZS:XS,n<0?-1:1)}v=Math.max(v,.2),S=Math.max(S,.55),y=Math.max(y,.1),C=1,e.last&&(s.embers(e.at,30),s.debris(e.at,14),c.ring(e.at,5.2,ZS),c.ring(e.at,3,XS),c.clash(e.at,6,ZS),n.flash(1),n.stagger(1.2),v=Math.max(v,.4),S=1)}te=te.filter(e=>e.wait>0)}if(P&&(P.wait-=E,P.wait<=0)){let{lines:e}=P;P=void 0,i({type:`sundered`});let t=e[e.length-1]?.at??r.clashPoint;for(let t of e){let e=t.size*2*ur;for(let n of[-1,-.6,-.2,.2,.6,1]){let r={x:t.at.x+Math.cos(t.angle)*e*n,y:t.at.y+Math.sin(t.angle)*e*n,z:t.at.z};s.sparks(r,12,17,n>0?ZS:XS,n<0?-1:1)}}s.debris(t,16),s.embers(t,36),s.smoke(t,8,`steam`),c.ring(t,6.4,ZS),c.ring(t,4.2,XS),c.clash(t,7,XS),n.flash(1),n.stagger(1.3),y=Math.max(y,.4),v=Math.max(v,.45),S=1,C=1}if(M&&(M.wait-=E,M.wait<=0)){let{at:e}=M;M=void 0;for(let t=-2;t<=2;t++){let n={x:e.x+t*2.3,y:e.y-t*.3,z:e.z};s.sparks(n,24,12,t%2==0?ZS:XS,t<0?-1:1)}s.debris(e,10),s.embers(e,20),c.ring(e,4.4,ZS),c.clash(e,5,XS),n.flash(1),n.stagger(1.1),y=Math.max(y,.35),v=Math.max(v,.3),S=Math.max(S,.8),C=1}if(fe&&tC(e,se)){let e=r.hiltPoint,n=t*2%1;u.show({x:e.x,y:e.y,z:e.z+.55},n,16769696,.34,t)}else u.hide();e.hero.action===`deflect`&&e.freeze>0&&E>0&&s.sparks(r.clashPoint,3,9,YS,1);let he=m.update(e,t,se),ge=qt(e.boss,se);if(ge){n.eyePosition(p);let e={x:p.x,y:p.y,z:p.z},i=r.clashPoint,a=(i.y-p.y)/(i.x-p.x||-1),o={x:i.x-9,y:i.y-9*a,z:i.z},c=ge.length-ge.age;f.update(e,ge.held?i:o,Math.min(1,.35+c/8),t),ge.held&&E>0&&(s.sparks(i,4,9,YS,-1),v=Math.max(v,.03),C=Math.max(C,.5))}else f.update(void 0,void 0,0,t);let F=tn(e.boss,`body`,se),_e=0;F.motion===`beam`&&!ge&&(F.swing>0?_e=Math.min(F.raise,F.swing)/1e3:F.raise===1e3&&F.swing>-1e3&&(_e=1)),f.charge(n.eyePosition(p),r.clashPoint,_e,t);let ve=rC(e,se)??aC(e,se),ye=ve===void 0?Kt(e.boss,se):void 0;if(ve!==void 0){let e={x:r.clashPoint.x+.5,y:r.clashPoint.y+.4,z:r.clashPoint.z+.6};l.show(e,ve/se.tuning.glintTicks,16777215,.75,t)}else if(ye){ye.beat.motion===`shockwave`&&he?T.set(he.x,he.y,he.z):ye.beat.motion===`beam`?n.eyePosition(T):n.tipPosition(ye.beat.limb,T);let e={x:T.x,y:T.y,z:T.z+.4};l.show(e,ye.age/se.tuning.glintTicks,WS[ye.beat.colour],1,t)}else l.hide();if(O+=E,O>.09){O=0;for(let t of[`piston`,`hammer`])e.parts[t]<=0&&s.smoke(n.partPosition(t,D,!0),1,`smoke`)}fe||!le?h.hide():h.update(e,t,E,se),s.update(E),c.update(e,t,se),g.position.set(r.clashPoint.x+.3,r.clashPoint.y,r.clashPoint.z+.5),g.intensity=C*24;let be=(e,t)=>e*Math.exp(-E*t);C=be(C,12),y=be(y,9),b=be(b,6),e.freeze===0&&(x=be(x,7)),v=be(v,10),S=be(S,7),w=e.hero.action===`riposte`?Math.min(1,w+E*3):be(w,3),a.focus.lerp(ae,1-Math.exp(-E*10)),a.flash=y,a.shake.set((Math.random()-.5)*2*v,(Math.random()-.5)*2*v,0),a.kick=S,j=be(j,5),a.lean=j,a.pushIn=Math.max(w,ee*.32,ne*.6,re*.8),b>.02?(a.tint.setRGB(1,.1,.1),a.tintAmount=b*.4):x>.02||ee>.02||ne>.02?(a.tint.setRGB(.02,.05,.08),a.tintAmount=Math.min(1,Math.max(x,ee*.8,ne*.95))*.5):e.slowmo>0?(a.tint.setRGB(.25,.95,.9),a.tintAmount=.28*Math.min(1,e.slowmo/10)):a.tintAmount=0}}}var sC=.05,cC=6,lC=30;function uC(){let e=0,t=0,n=0,r=-1,i=!1,a=!1,o=-1,s=0;return{fire(o){e=o,t=n,i=!0,a=!1,r=-1},settle(){(n!==0||i)&&(a=!0,o=-1,i=!1,r=-1)},value(c,l){if(a)return o<0&&(o=c,s=n),n=s*Math.exp(-(c-o)*lC),n<.005&&(n=0,a=!1),n;if(i){if(l)return n;r=c,i=!1}if(r<0)return n;let u=c-r;return n=u<sC?t+(e-t)*(u/sC):e*Math.exp(-(u-sC)*cC),u>sC&&n<.005&&(n=0,r=-1),n}}}var dC=er,fC=.22;function pC(e,t,n){let r=e.frames[n],i=r&&e.sheets[r[0]],{uv:a,position:o}=t.attributes;if(!r||!i||!a||!o)return;let[,s,c,l,u,d,f]=r,p=s/i[0],m=(s+l)/i[0],h=1-c/i[1],g=1-(c+u)/i[1],_=(d-e.originX)*dC,v=_+l*dC,y=(e.originY-f)*dC,b=y-u*dC;a.setXY(0,p,h),a.setXY(1,m,h),a.setXY(2,p,g),a.setXY(3,m,g),o.setXY(0,_,y),o.setXY(1,v,y),o.setXY(2,_,b),o.setXY(3,v,b),a.needsUpdate=!0,o.needsUpdate=!0}var mC=or,hC=1/16,gC=8,_C=.3;function vC(e,t,n){let r=()=>new tp(1,1),i=n.sheets.map((e,r)=>Yy(n.sheetFile(r),t)),a=e=>i[n.frames[e]?.[0]??0]??null,o=r(),s=Hy(new fp({map:a(0),emissiveMap:a(0),alphaTest:.5,side:2,roughness:.85,metalness:0})),c=new yf(o,s);c.frustumCulled=!1,c.castShadow=!0,e.add(c);let l=-1,u,d={x:0,y:0,z:0},f={x:0,y:0,z:0},p={x:0,y:0,z:0},m={x:0,y:0,z:0},h={x:0,y:0,z:0},g={x:0,y:0,z:0},_={x:0,y:0,z:0},v={drawn:!1},y=0,b=0,x=0,S=0,C=0,w=uC(),T=Array.from({length:gC},()=>{let t=new yf(r(),Hy(new sf({transparent:!0,blending:2,depthWrite:!1,alphaTest:.01,color:14212578,map:a(0)})));return t.visible=!1,t.frustumCulled=!1,e.add(t),{mesh:t,born:-10}}),E=0,D=0;return{clashPoint:d,hiltPoint:f,handPoint:p,overheadPoint:m,feetPoint:h,bladeGuard:g,bladeTip:_,blade:v,push(e){w.fire(e)},hide(){c.visible=!1;for(let e of T)e.mesh.visible=!1},flash(e){x=e,y=S,b=S+.22},update(e,t,r,i,O=ar.x){let k=S;S=t,e.hero.action===`down`?u??=t:u=void 0;let A=i??n.shot(e,r,t,t-(u??t)),j=n.frameIndex(A);j!==l&&(pC(n,o,j),s.map=a(j),s.emissiveMap=s.map,l=j);let{actionTick:ee}=e.hero,M=_r(e),{dx:N,facing:te}=n.place(e,r,O),P=ir.x+N;P-=w.value(t,e.freeze>0),M===`deflect`&&e.freeze>0&&(P+=e.freeze%2==0?.045:-.045);let ne=Math.min(.1,Math.max(0,t-k)),re=Ao(e.hero,r)/100*hC,ie=M===`jump`?re:Math.max(0,C-ne*8);C=ie,c.position.set(P,ie+n.lift(A)*mC,ir.z),c.scale.x=te,c.visible=M!==`hurt`||Math.floor(ee/3)%2!=1;let ae=e.freeze===0&&n.dashing(e,r);if(ae&&Math.abs(P-D)>.22){let e=T[E];if(E=(E+1)%gC,e){e.born=t,e.mesh.position.copy(c.position),e.mesh.scale.x=te,pC(n,e.mesh.geometry,j),e.mesh.material.map=a(j);let r=M===`dodge`||M===`roll`;e.mesh.material.color.setHex(r?7332054:14212578)}D=P}ae||(D=P);for(let e of T){let n=(t-e.born)/_C;e.mesh.visible=n>=0&&n<1,e.mesh.material.opacity=.7*(1-n)}d.x=P+n.guard.x*mC*te,d.y=ie+n.guard.y*mC,d.z=ir.z+.1,f.x=P+n.hilt.x*mC*te,f.y=ie+n.hilt.y*mC,f.z=ir.z+.1;let oe=n.handAt?.(A)??n.hand??n.guard;p.x=P+oe.x*mC*te,p.y=ie+(oe.y+(n.handAt?n.lift(A):0))*mC,p.z=ir.z+.1;let se=n.bladeAt?.(A);if(v.drawn=se!==void 0,se){let e=n.lift(A);for(let[t,n]of[[g,se.guard],[_,se.tip]])t.x=P+n.x*mC*te,t.y=ie+(n.y+e)*mC,t.z=ir.z+.1}let ce=n.overhead??{x:n.guard.x*.4,y:n.guard.y+70};m.x=P+ce.x*mC*te,m.y=ie+ce.y*mC,m.z=ir.z+.1,h.x=P,h.y=ie+.1,h.z=ir.z+.1;let le=b>S?(b-S)/(b-y)*x:0;s.color.setScalar(1+le*5),s.emissive.setScalar(1),s.emissiveIntensity=fC+le*3}}}var yC={width:64,height:72},bC={"throne-warden":{text:{name:`The Throne Warden`,parts:{piston:`Lance arm`,hammer:`Hammer arm`,core:`Heart`},falls:`THE WARDEN FALLS`,enrages:`THE WARDEN ENRAGES`},music:{opening:`juggernaut`,lament:`a-dragons-lullaby`}}},xC={id:`prologue`,act:`Prologue`,place:`The ruined throne hall`,foe:`The Throne Warden`,boss:`throne-warden`,before:{heading:`Prologue`,lines:[`The ruined throne hall.`]}};({...xC});var SC={id:`trial`,fights:[xC],end:{heading:`End of the trial.`,lines:[`Thank you for playing.`]}},CC=e=>e.boss===void 0?void 0:bC[e.boss],wC=e=>e.music??CC(e)?.music??{},TC=`SUNDERED`,EC=14;function DC(e,t){return _(e)?{banner:`fighting`,card:t.tuning.freezeVictory-e.freeze>=EC}:{banner:e.outcome,card:!1}}var OC=`
.hud { position: absolute; inset: 0; pointer-events: none; overflow: hidden; color: #eef2f6;
  font: 700 1em/1.15 "Bahnschrift", "DIN Alternate", "Arial Narrow", "Segoe UI", sans-serif;
  font-stretch: 85%; letter-spacing: 0.06em;
  text-shadow: 0 0.1em 0 #05060a, 0 0 0.35em #05060a; }

/* Bars: slanted, gold-edged, with a pale ghost that drains after the fill does. */
.hud .bar { position: relative; height: 0.62em; transform: skewX(-22deg);
  background: linear-gradient(#0b0d14, #171a25); border: 0.09em solid #05060a;
  box-shadow: 0 0 0 0.07em #8a7440, 0 0.2em 0.5em rgba(0, 0, 0, 0.6); }
.hud .bar .ghost, .hud .bar .fill { position: absolute; inset: 0 auto 0 0; }
.hud .bar .ghost { background: #f4f1e6; transition: width 700ms cubic-bezier(0.5, 0, 0.9, 0.6) 260ms; }
.hud .bar .fill { transition: width 90ms linear; }

.hud .boss { position: absolute; top: 0.9em; left: 17%; right: 17%; }
.hud .boss-name { display: flex; align-items: center; gap: 0.8em; justify-content: center;
  font-size: 1.05em; letter-spacing: 0.34em; text-transform: uppercase; color: #e9cf8f; }
.hud .boss-name::before, .hud .boss-name::after { content: ""; flex: 1; height: 0.08em;
  background: linear-gradient(90deg, transparent, #8a7440 30%, #cdb26c); }
.hud .boss-name::after { transform: scaleX(-1); }
.hud .parts { display: flex; gap: 1.3em; margin-top: 0.45em; }
.hud .part { flex: 1; font-size: 0.74em; transition: opacity 300ms; }
.hud .part.core { flex: 1.5; }
.hud .part .name { display: flex; justify-content: space-between; margin: 0 0.5em 0.25em;
  text-transform: uppercase; letter-spacing: 0.14em; color: #aab1c2; }
.hud .part .tag { color: #f1dca4; letter-spacing: 0.06em; }
.hud .part .fill { background: linear-gradient(#ffd27a, #e08a1e 60%, #a8560f); }
.hud .part.core .fill { background: linear-gradient(#fff0b8, #ff9a36 55%, #c4471a); }
.hud .part.core.armoured .fill { background: repeating-linear-gradient(115deg,
  #6c7384 0 0.4em, #474e61 0.4em 0.8em); }
.hud .part.broken { opacity: 0.32; }
.hud .part.broken .name { text-decoration: line-through; }
.hud .part.target .name { color: #ffffff; }
.hud .part.target .bar { box-shadow: 0 0 0 0.07em #ffe9b0, 0 0 0.7em #ffcf70; }
.hud .part.hit .bar { animation: hud-jolt 220ms; }

.hud .hero { position: absolute; bottom: 1.3em; left: 1.6em; width: 37%; display: flex;
  align-items: flex-end; gap: 0.9em; }
.hud .hero .vitals { flex: 1; padding-bottom: 0.35em; }
/* Her portrait: framed in the HUD's gold, with corner brackets like the control menu's.
   Pixel art like her sprite, its pixels about the size of hers (an em is 10.5 of the
   game's pixels). */
.hud .portrait { position: relative; flex: none; width: ${yC.width*1/10.5}em;
  aspect-ratio: ${yC.width} / ${yC.height};
  background: radial-gradient(ellipse at 60% 30%, #34405c, #131826 75%);
  border: 0.09em solid #05060a;
  box-shadow: 0 0 0 0.07em #8a7440, 0 0 0 0.3em #0b0d14, 0 0 0 0.37em #4a3c22,
    0 0.3em 0.9em rgba(0, 0, 0, 0.7); }
.hud .portrait::before, .hud .portrait::after { content: ""; position: absolute; z-index: 1;
  width: 0.9em; height: 0.9em; border: 0.14em solid #cdb26c; }
.hud .portrait::before { left: -0.5em; top: -0.5em; border-right: 0; border-bottom: 0; }
.hud .portrait::after { right: -0.5em; bottom: -0.5em; border-left: 0; border-top: 0; }
.hud .portrait .face { position: absolute; inset: 0; overflow: hidden; }
.hud .portrait img { display: block; width: 100%; height: 100%; }
.hud .portrait .wash { position: absolute; inset: 0; background: #ff3b3b; opacity: 0;
  mix-blend-mode: multiply; }
.hud .hero.hit .portrait .wash { animation: hud-wince 420ms ease-out; }
.hud .hero.low .portrait { box-shadow: 0 0 0 0.07em #c9485b, 0 0 0 0.3em #0b0d14,
  0 0 0 0.37em #771420, 0 0 0.9em rgba(255, 60, 60, 0.55); }
.hud .hero.low .portrait .wash { opacity: 0.22; }
.hud .hero-label { margin: 0 0 0.3em 0.5em; font-size: 0.85em; letter-spacing: 0.16em; }
.hud .hero .bar { height: 0.8em; }
/* The Sunder meter, under her HP: gold as it fills, alight when it's full. */
.hud .sunder { position: relative; height: 0.42em; margin: 0.42em 22% 0 0.6em;
  transform: skewX(-18deg); background: rgba(8, 10, 16, 0.78);
  box-shadow: 0 0 0 0.07em #05060a, 0 0 0 0.13em #6b5730; }
.hud .sunder .fill { height: 100%; width: 0; transition: width 180ms ease-out;
  background: linear-gradient(#fff1c4, #e2b24c 55%, #a8772a); }
.hud .sunder .word { position: absolute; left: 100%; top: 50%; margin-left: 0.8em;
  transform: skewX(18deg) translateY(-50%); font-size: 0.72em; font-style: italic;
  letter-spacing: 0.22em; white-space: nowrap; color: #8e8262; }
/* (A gain flares it. The bar is skewed, so neither animation may touch its transform; and
   the full state's comes last, so a full bar keeps pulsing.) */
.hud .sunder.gain { animation: hud-gain 260ms ease-out; }
.hud .sunder.full { box-shadow: 0 0 0 0.07em #05060a, 0 0 0 0.13em #ffe9b0, 0 0 0.9em #ffcf70;
  animation: hud-sunder 900ms ease-in-out infinite; }
.hud .sunder.full .fill { background: linear-gradient(#ffffff, #ffe9a8 50%, #ffc463); }
.hud .sunder.full .word { color: #ffe9b0; text-shadow: 0 0 0.6em #ffb43a; }
.hud .hero .fill { background: linear-gradient(#ffffff, #b9c4d6 60%, #7f8ea8); }
.hud .hero .ghost { background: #ff5a5a; }
.hud .hero.hit { animation: hud-jolt 260ms; }

/* Turn banner: a band that sweeps across behind the words. */
.hud .turn { position: absolute; top: 14%; left: 0; right: 0; text-align: center;
  font-size: 1.7em; font-style: italic; letter-spacing: 0.42em; opacity: 0; }
.hud .turn.show { animation: hud-turn 1500ms ease-out; }
.hud .turn::before { content: ""; position: absolute; inset: -0.25em 22%; z-index: -1;
  transform: skewX(-22deg); background: linear-gradient(90deg, transparent,
  rgba(5, 6, 10, 0.75) 25% 75%, transparent); }
.hud .turn.player { color: #ffffff; }
.hud .turn.boss { color: #ffc463; }

.hud .marker { position: absolute; font-size: 2.4em; color: #ffffff;
  text-shadow: 0 0 0.35em #ffffff, 0 0.1em 0 #05060a;
  transform: translate(-50%, -100%); animation: hud-bob 700ms ease-in-out infinite; }

/* Call-outs: each slams in big, settles, holds, then lifts away. */
.hud .callouts { position: absolute; top: 21%; left: 0; right: 0; height: 0;
  display: flex; flex-direction: column-reverse; align-items: center; }
.hud .pop { position: relative; display: flex; align-items: baseline; gap: 0.35em;
  font-size: 2.3em; font-style: italic; font-weight: 800; letter-spacing: 0.08em;
  white-space: nowrap; -webkit-text-stroke: 0.14em #05060a; paint-order: stroke fill;
  animation: hud-pop 1150ms cubic-bezier(0.2, 0.9, 0.3, 1) forwards; }
.hud .pop .num { font-size: 1.25em; letter-spacing: 0; }
.hud .pop::after { content: ""; position: absolute; left: -8%; right: -8%; bottom: -0.06em;
  height: 0.09em; transform: skewX(-30deg); background: linear-gradient(90deg, transparent,
  currentColor 20% 80%, transparent); animation: hud-rule 1150ms ease-out forwards; }
.hud .pop.big { font-size: 3.1em; }
.hud .pop.huge { font-size: 2.6em; letter-spacing: 0.2em; }
.hud .pop.amber { color: #ffc463; text-shadow: 0 0 0.5em #ff9a2a; }
.hud .pop.white { color: #ffffff; text-shadow: 0 0 0.45em #ffe9b0, 0 0 1.1em #ffb43a; }
.hud .pop.gold { color: #ffe7a6; text-shadow: 0 0 0.5em #ffcf70, 0 0 1.2em #ff9a2a; }
.hud .pop.teal { color: #9af7e8; text-shadow: 0 0 0.5em #2fd6c2; }
.hud .pop.red { color: #ff6f6f; text-shadow: 0 0 0.5em #ff2a3a;
  animation-name: hud-pop, hud-shake; animation-duration: 1150ms, 320ms; }
/* A perfect one flares: a burst of light thrown out behind the word. */
.hud .pop.big::before { content: ""; position: absolute; left: 50%; top: 50%; width: 9em;
  height: 0.5em; margin: -0.25em 0 0 -4.5em; z-index: -1; border-radius: 50%;
  background: radial-gradient(closest-side, currentColor, transparent);
  animation: hud-flare 520ms ease-out forwards; }

/* The combo: a count of clean actions in a row, at the right. */
.hud .combo { position: absolute; right: 4%; top: 36%; text-align: right; font-style: italic;
  opacity: 0; transition: opacity 500ms; -webkit-text-stroke: 0.12em #05060a;
  paint-order: stroke fill; }
.hud .combo.on { opacity: 1; transition: none; }
.hud .combo .count { display: inline-block; font-size: 4.2em; font-weight: 800;
  line-height: 0.9; color: #ffffff; text-shadow: 0 0 0.3em #ffcf70; }
.hud .combo .label { margin-left: 0.3em; font-size: 1.1em; letter-spacing: 0.2em; color: #e9cf8f; }
.hud .combo .rank { display: block; font-size: 1.15em; letter-spacing: 0.26em; color: #ffc463; }
.hud .combo.bump .count { animation: hud-bump 260ms cubic-bezier(0.2, 0.9, 0.3, 1.4); }
.hud .combo.lost { animation: hud-lost 600ms ease-in forwards; }
.hud .combo.lost .count { color: #ff6f6f; text-shadow: 0 0 0.3em #ff2a3a; }

.hud .hint { position: absolute; bottom: 1.5em; right: 2em; text-align: right;
  font-size: 0.78em; color: #c3cbdb; opacity: 0.92; white-space: pre; letter-spacing: 0.08em; }
.hud .banner { position: absolute; top: 38%; left: 0; right: 0; text-align: center; }
.hud .banner .title { font-size: 3.2em; font-style: italic; font-weight: 800;
  letter-spacing: 0.3em; -webkit-text-stroke: 0.12em #05060a; paint-order: stroke fill;
  color: #ffe7a6; text-shadow: 0 0 0.6em #ff9a2a; animation: hud-title 900ms ease-out; }
.hud .banner.down .title { color: #ff6f6f; text-shadow: 0 0 0.6em #ff2a3a; }
.hud .banner .sub { margin-top: 0.6em; font-size: 1em; letter-spacing: 0.24em; color: #c3cbdb; }

/* The freeze-frame on the winning blow: bars close in, and one word is struck across it. */
.hud .finish { position: absolute; inset: 0; display: none; pointer-events: none; }
.hud .finish.on { display: block; }
.hud .finish .bar { position: absolute; left: 0; right: 0; height: 11%; background: #020308;
  animation: hud-bar 160ms ease-out; }
.hud .finish .bar.top { top: 0; transform-origin: top; }
.hud .finish .bar.bottom { bottom: 0; transform-origin: bottom; }
.hud .finish .card { position: absolute; left: 5%; bottom: 17%; transform: skewX(-8deg); }
.hud .finish .word { font-size: 5.6em; font-style: italic; font-weight: 900; line-height: 1;
  letter-spacing: 0.1em; color: #fff; -webkit-text-stroke: 0.05em #05060a;
  paint-order: stroke fill; text-shadow: 0.06em 0.06em 0 #ffb347;
  animation: hud-struck 180ms cubic-bezier(0.2, 1.6, 0.4, 1); }
.hud .finish .rule { height: 0.22em; margin-top: 0.5em; background: #ffe7a6;
  transform-origin: left; animation: hud-rule 320ms ease-out; }
.hud .finish .of { margin-top: 0.5em; font-size: 1.05em; font-weight: 700;
  letter-spacing: 0.42em; color: #ffe7a6; }
@keyframes hud-bar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hud-struck {
  0% { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes hud-rule { from { transform: scaleX(0); } to { transform: scaleX(1); } }

@keyframes hud-pop {
  0% { transform: scale(2.4) rotate(-5deg); opacity: 0; }
  9% { transform: scale(0.92) rotate(1deg); opacity: 1; }
  16% { transform: scale(1.07) rotate(-0.5deg); }
  24%, 68% { transform: scale(1) translateY(0); opacity: 1; }
  100% { transform: scale(0.96) translateY(-1.1em); opacity: 0; }
}
@keyframes hud-rule { 0% { transform: skewX(-30deg) scaleX(0); } 22% { transform: skewX(-30deg) scaleX(1.15); }
  100% { transform: skewX(-30deg) scaleX(1); } }
@keyframes hud-flare { 0% { transform: scale(0.2, 1.6); opacity: 0.95; }
  100% { transform: scale(2.2, 0.2); opacity: 0; } }
@keyframes hud-shake { 0%, 100% { margin-left: 0; } 20% { margin-left: -0.35em; }
  40% { margin-left: 0.3em; } 60% { margin-left: -0.2em; } 80% { margin-left: 0.12em; } }
@keyframes hud-wince { 0% { opacity: 0.85; } 100% { opacity: 0; } }
@keyframes hud-jolt { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(-0.3em, 0.12em); }
  55% { transform: translate(0.25em, -0.1em); } 80% { transform: translate(-0.1em, 0); } }
@keyframes hud-bump { 0% { transform: scale(1.9) rotate(-6deg); } 100% { transform: scale(1); } }
@keyframes hud-lost { 0% { transform: translate(0, 0) rotate(0); opacity: 1; }
  100% { transform: translate(0.6em, 2.4em) rotate(9deg); opacity: 0; } }
@keyframes hud-gain { 0% { filter: brightness(2.4); } 100% { filter: brightness(1); } }
@keyframes hud-sunder { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.45); } }
@keyframes hud-bob { 0%, 100% { margin-top: 0; } 50% { margin-top: -0.14em; } }
@keyframes hud-turn { 0% { opacity: 0; letter-spacing: 1.2em; } 14% { opacity: 1; letter-spacing: 0.42em; }
  70% { opacity: 1; } 100% { opacity: 0; } }
@keyframes hud-title { 0% { transform: scale(1.8); opacity: 0; letter-spacing: 0.7em; }
  100% { transform: scale(1); opacity: 1; letter-spacing: 0.3em; } }
`;function kC(e,t=bC[`throne-warden`].text){switch(e.type){case`parry`:return e.perfect?{word:`PERFECT`,tone:`white`,size:`big`}:{word:`PARRY`,tone:`amber`};case`evade`:return e.perfect?{word:`PERFECT DODGE`,tone:`teal`,size:`big`}:{word:e.how===`jump`?`CLEAR`:`DODGE`,tone:`teal`};case`flashCounter`:return{word:`FLASH COUNTER`,tone:`gold`,size:`big`};case`riposteHit`:return{word:`RIPOSTE`,num:e.damage,tone:`amber`};case`hurt`:return{word:`HIT`,num:-e.damage,tone:`red`};case`cut`:return e.special?{word:e.special.toUpperCase(),num:e.damage,tone:`gold`,size:`big`}:e.quality===`perfect`?{word:`PERFECT`,num:e.damage,tone:`white`,size:`big`}:{word:`CUT`,num:e.damage,tone:`amber`};case`chainDrop`:return{word:e.early?`TOO EARLY`:`TOO LATE`,tone:`red`};case`iai`:return e.perfect?{word:`IAI`,num:e.damage,tone:`gold`,size:`big`}:{word:`IAI MISSED`,tone:`red`};case`counter`:return{word:`COUNTER`,num:e.damage,tone:`teal`};case`beamCatch`:return{word:e.perfect?`PERFECT · HOLD`:`HOLD`,tone:e.perfect?`white`:`amber`};case`beamBreak`:return{word:`LET GO`,tone:`red`};case`interrupt`:return{word:`SUNDER BREAK`,tone:`gold`,size:`huge`};case`interruptCut`:return{word:`BREAK`,num:e.damage,tone:`gold`,size:e.final?`big`:void 0};case`sunderReady`:return{word:`SUNDER READY`,tone:`gold`,size:`big`};case`sunderStart`:return{word:`SUNDER`,tone:`gold`,size:`huge`};case`sunderCut`:return e.quality===`perfect`?{word:`PERFECT`,num:e.damage,tone:`white`,size:`big`}:e.quality===`good`?{word:`GOOD`,num:e.damage,tone:`amber`}:{word:`WEAK`,num:e.damage,tone:`red`};case`partBroken`:return e.part===`core`?{word:`HEART BROKEN`,tone:`gold`,size:`huge`}:{word:`${t.parts[e.part].toUpperCase()} BROKEN`,tone:`gold`,size:`huge`};default:return}}function AC(e){switch(e.type){case`parry`:case`evade`:case`cut`:case`riposteHit`:case`counter`:return`up`;case`iai`:return e.perfect?`up`:void 0;case`sunderCut`:return e.quality===`miss`?void 0:`up`;case`interruptCut`:return`up`;case`hurt`:return`lost`;default:return}}var jC=e=>e>=40?`FLAWLESS`:e>=25?`SUPERB`:e>=12?`GREAT`:e>=6?`GOOD`:``,MC={chain:`chain I J K: press as she settles`,ready:`cut with J and keep holding`};function NC(e,t,n=MC){if(e.outcome!==`fighting`)return``;if(e.turn===`player`){let r=e.player;if(r.step===`choose`)return Lr(e,t)?`← → choose a part
I J K  attack   ·   U  SUNDER   ·   Esc  menu`:`← → choose a part
I J K  attack   ·   Esc  menu`;if(r.step===`sunder`)return r.doneAt<0?`SUNDER: press I J K on each flash`:``;let i=t.hero.finisher.toUpperCase();return r.drawSince>=0?`${i}: release J on the flash`:Xr(r.cuts,t)?`${i} READY: ${n.ready}`:n.chain}if(e.counter?.style===null)return`I J K  COUNTER`;if(e.hero.action===`interrupt`)return``;if(e.hero.action===`brace`)return`HOLD J`;if(e.boss.phase===`attack`){let n=Gt(e.boss,t)?.beat.motion===`beam`,r=Lr(e,t);return[n?`BEAM: parry with J and keep holding`:``,r?`U  SUNDER BREAK`:``].filter(Boolean).join(`
`)}if(e.boss.phase!==`lull`||e.boss.sequencesLeft<=0)return``;let r=p(t,h(e));return FC(r.map(e=>t.attacks[e]?.name??``),r.indexOf(e.boss.nextAttack))}var PC=5;function FC(e,t){let n=Math.max(0,Math.min(e.length-PC,t-2)),r=e.slice(n,n+PC).map((e,r)=>n+r===t?`▶ ${e}`:e);return`PRACTICE: ↑ ↓ pick the next attack${t>=0?`   ${t+1} / ${e.length}`:`   ${e.length} attacks`}\n${r.join(`
`)}`}var IC=4,LC=5e3;function RC(e){let t=document.createElement(`style`);t.textContent=OC,document.head.appendChild(t);let r=document.createElement(`div`);r.className=`hud`,r.dataset.testid=`hud`;let i=e=>`
      <div class="part ${e}" data-testid="part-${e}">
        <div class="name"><span>${bC[`throne-warden`].text.parts[e]}</span><span class="tag"></span></div>
        <div class="bar"><div class="ghost"></div><div class="fill"></div></div>
      </div>`;r.innerHTML=`
    <div class="boss">
      <div class="boss-name">${bC[`throne-warden`].text.name}</div>
      <div class="parts">${i(`piston`)}${i(`core`)}${i(`hammer`)}</div>
    </div>
    <div class="hero" data-testid="hero">
      <div class="portrait" data-testid="portrait">
        <div class="face"><img src="sprites/portrait.png" alt="" draggable="false"><div class="wash"></div></div>
      </div>
      <div class="vitals">
        <div class="hero-label" data-testid="hero-hp-label"></div>
        <div class="bar"><div class="ghost"></div><div class="fill" data-testid="hero-hp"></div></div>
        <div class="sunder" data-testid="sunder"><div class="fill"></div><span class="word">SUNDER</span></div>
      </div>
    </div>
    <div class="turn show player" data-testid="turn">YOUR TURN</div>
    <div class="marker" data-testid="marker" hidden>▼</div>
    <div class="callouts" data-testid="callout"></div>
    <div class="combo" data-testid="combo">
      <span class="count"></span><span class="label">HITS</span><span class="rank"></span>
    </div>
    <div class="hint" data-testid="hint"></div>
    <div class="banner" data-testid="banner"></div>
    <div class="finish" data-testid="finish">
      <div class="bar top"></div><div class="bar bottom"></div>
      <div class="card">
        <div class="word">${TC}</div><div class="rule"></div>
        <div class="of">${bC[`throne-warden`].text.name.toUpperCase()}</div>
      </div>
    </div>`,e.appendChild(r);let a=e=>r.querySelector(`[data-testid="${e}"]`),s=(e,t)=>e.querySelector(t),c=[`piston`,`hammer`,`core`].map(e=>{let t=a(`part-${e}`);return{part:e,row:t,fill:s(t,`.fill`),ghost:s(t,`.ghost`),tag:s(t,`.tag`),hp:-1}}),l=a(`hero`),u=a(`hero-hp`),d=s(l,`.ghost`),f=a(`hero-hp-label`),p=a(`sunder`),m=s(p,`.fill`),h=s(p,`.word`),g=a(`turn`),_=a(`marker`),v=a(`callout`),y=a(`combo`),b=s(y,`.count`),x=s(y,`.rank`),S=a(`hint`),C=a(`banner`),w=a(`finish`),T=s(r,`.boss-name`),E=s(w,`.of`),D={parts:``,hero:-1,hint:``,hintKey:``,rules:void 0,banner:``,sunder:``},O=bC[`throne-warden`].text,k=`press K to fight again`,A=MC,j=0,ee,M=(e,t)=>{e.classList.remove(t),e.offsetWidth,e.classList.add(t)},N=e=>{let t=document.createElement(`div`);t.className=`pop ${e.tone} ${e.size??``}`;let n=document.createElement(`span`);if(n.textContent=e.word,t.appendChild(n),e.num!==void 0){let n=document.createElement(`span`);n.className=`num`,n.textContent=`${e.num}`,t.appendChild(n)}for(t.addEventListener(`animationend`,e=>{e.animationName===`hud-pop`&&t.remove()}),v.appendChild(t);v.childElementCount>IC;)v.firstElementChild?.remove()},te=e=>{clearTimeout(ee),e===`lost`?(j>=2&&M(y,`lost`),j=0,y.classList.remove(`on`)):(j++,j<2||(b.textContent=`${j}`,x.textContent=jC(j),y.classList.remove(`lost`),y.classList.add(`on`),M(y,`bump`),ee=setTimeout(()=>y.classList.remove(`on`),LC)))};return{setScale(e){r.style.fontSize=`${e*10.5}px`},setVisible(e){r.style.visibility=e?``:`hidden`},setBoss(e,t){O=e,k=t,T.textContent=e.name;for(let t of c){let n=t.row.querySelector(`.name span`);n&&(n.textContent=e.parts[t.part])}E.textContent=e.name.toUpperCase(),D.banner=``},setPortrait(e,t){A=t??MC;let n=s(a(`portrait`),`img`);n.getAttribute(`src`)!==e&&n.setAttribute(`src`,e)},dispose(){clearTimeout(ee),t.remove(),r.remove()},update(e,t,r,i){for(let e of t){e.type===`turn`&&(g.textContent=e.who===`player`?`YOUR TURN`:`BOSS TURN`,g.className=`turn ${e.who}`,M(g,`show`)),e.type===`restart`&&(j=0,y.classList.remove(`on`,`lost`));let t=kC(e,O);t&&N(t),e.type===`cut`&&e.boon&&N({word:e.boon,tone:`teal`}),e.type===`partBroken`&&e.part!==`core`&&N({word:O.enrages,tone:`red`});let n=AC(e);n&&te(n),e.type===`hurt`&&M(l,`hit`)}let a=o(e.parts),s=`${JSON.stringify(e.parts)}${a}${e.turn}${e.player.target}`;if(s!==D.parts){D.parts=s;for(let t of c){let i=e.parts[t.part],o=`${Math.min(100,i/n(r,t.part)*100)}%`;t.fill.style.width=o,t.ghost.style.width=o,t.hp>=0&&i<t.hp&&M(t.row,`hit`),t.hp=i,t.row.classList.toggle(`broken`,i<=0),t.row.classList.toggle(`armoured`,t.part===`core`&&a),t.row.classList.toggle(`target`,e.turn===`player`&&e.player.target===t.part),t.tag.textContent=i<=0?`broken`:t.part===`core`&&a?`armoured`:`${i}`}}if(_.hidden=i===void 0,i&&(_.style.left=`${i.x*100}%`,_.style.top=`${i.y*100}%`),e.hero.hp!==D.hero){let t=`${e.hero.hp/r.tuning.heroHp*100}%`;u.style.width=t,d.style.width=t,f.textContent=`HP ${e.hero.hp}`,l.classList.toggle(`low`,e.hero.hp*10<=r.tuning.heroHp*3),D.hero=e.hero.hp}let v=Lr(e,r),b=`${e.sunder}/${r.tuning.sunderMax}`;if(b!==D.sunder){let t=Number.parseInt(D.sunder,10);D.sunder=b;let n=Math.min(1,e.sunder/Math.max(1,r.tuning.sunderMax));m.style.width=`${n*100}%`,p.dataset.value=`${e.sunder}`,p.classList.toggle(`full`,v),h.textContent=v?`SUNDER  ·  L`:`SUNDER`,e.sunder>t&&M(p,`gain`)}let x=e.player,T=e.counter?.style===null,E=e.turn===`boss`&&Gt(e.boss,r)?.beat.motion===`beam`,ee=`${e.outcome}${e.turn}${x.step}${x.cuts.length}${x.drawSince>=0}${x.doneAt>=0}${v}${T}${e.boss.phase}${e.hero.action===`brace`}${E}${e.boss.nextAttack}${D.parts}`;if(ee!==D.hintKey||r!==D.rules){D.hintKey=ee,D.rules=r;let t=NC(e,r,A);t!==D.hint&&(S.textContent=D.hint=t)}let P=DC(e,r);if(w.classList.toggle(`on`,P.card),P.banner!==D.banner){D.banner=P.banner,C.className=`banner ${P.banner}`;let[e,t]=P.banner===`down`?[`DOWN`,`press K to retry`]:P.banner===`victory`?[O.falls,k]:[``,``];if(C.replaceChildren(),e)for(let[n,r]of[[`title`,e],[`sub`,t]]){if(!r)continue;let e=document.createElement(`div`);e.className=n,e.textContent=r,C.appendChild(e)}}}}}var zC={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},BC=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},VC=new im(-1,1,1,-1,0,1),HC=new class extends Jd{constructor(){super(),this.setAttribute(`position`,new Id([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Id([0,2,0,0,2,0],2))}},UC=class{constructor(e){this._mesh=new yf(HC,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,VC)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},WC=class extends BC{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof up?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=sp.clone(e.uniforms),this.material=new up({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new UC(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},GC=class extends BC{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},KC=class extends BC{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},qC=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Kl);this._width=n.width,this._height=n.height,t=new mu(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:uc}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new WC(zC),this.copyPass.material.blending=0,this.timer=new dm}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}GC!==void 0&&(r instanceof GC?n=!0:r instanceof KC&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Kl);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},JC={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},YC=class extends BC{constructor(){super(),this.isOutputPass=!0,this.uniforms=sp.clone(JC.uniforms),this.material=new dp({name:JC.name,uniforms:this.uniforms,vertexShader:JC.vertexShader,fragmentShader:JC.fragmentShader}),this._fsQuad=new UC(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},tu.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},XC=class extends BC{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Y}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},ZC={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Y(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},QC=class e extends BC{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new Kl(256,256):new Kl(e.x,e.y),this.clearColor=new Y(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new mu(i,a,{type:uc,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new mu(i,a,{type:uc,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new mu(i,a,{type:uc,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=ZC;this.highPassUniforms=sp.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new up({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new Kl(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=sp.clone(zC.uniforms),this.blendMaterial=new up({uniforms:this.copyUniforms,vertexShader:zC.vertexShader,fragmentShader:zC.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Y,this._oldClearAlpha=1,this._basic=new sf,this._fsQuad=new UC(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new Kl(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new up({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new Kl(.5,.5)},direction:{value:new Kl(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

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
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new up({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};QC.BlurDirectionX=new Kl(1,0),QC.BlurDirectionY=new Kl(0,1);var $C={name:`TiltShiftVignette`,uniforms:{tDiffuse:{value:null},resolution:{value:new Kl(1,1)},view:{value:new fu(0,0,1,1)},focusY:{value:.42},focusBand:{value:.16},maxBlur:{value:1.9},vignette:{value:.62},glare:{value:.085},flash:{value:0},tint:{value:new Y},tintAmount:{value:0},still:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform vec4 view;
    uniform float focusY;
    uniform float focusBand;
    uniform float maxBlur;
    uniform float vignette;
    uniform float glare;
    uniform float flash;
    uniform vec3 tint;
    uniform float tintAmount;
    uniform float still;
    varying vec2 vUv;
    void main() {
      // Where this pixel is on the whole screen: a window that trims the picture mustn't
      // move the focus band or the vignette against the scene.
      vec2 screen = view.xy + vUv * view.zw;
      float distance = max(0.0, abs(screen.y - focusY) - focusBand);
      float blur = clamp(distance / 0.3, 0.0, 1.0) * maxBlur;
      vec2 texel = blur / resolution;
      vec4 sum = vec4(0.0);
      for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
          sum += texture2D(tDiffuse, vUv + vec2(float(x), float(y)) * texel);
        }
      }
      vec4 color = sum / 9.0;
      vec2 fromCentre = screen - 0.5;
      float edge = dot(fromCentre, fromCentre) * 2.0;
      // The grade: shadows pulled a little cold and highlights a little warm, so firelight
      // and steel stand out of the blue dusk, as in the games this look comes from.
      float tone = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb *= mix(vec3(0.93, 0.98, 1.08), vec3(1.07, 1.01, 0.93), smoothstep(0.08, 0.7, tone));
      // The evening light spilling in from the upper left, where the shafts come from.
      float spill = max(0.0, 1.0 - length(screen - vec2(0.02, 1.08)) / 1.15);
      color.rgb += vec3(0.56, 0.68, 0.95) * (glare * spill * spill * spill);
      color.rgb *= 1.0 - vignette * edge;
      // Colour wash (hurt, slow motion): strongest at the edges, keeping the centre readable.
      float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(color.rgb, tint * (luma * 1.4 + 0.08), tintAmount * (0.45 + edge * 1.6));
      // The freeze-frame: the picture printed hard in two inks, a cold dark and a pale
      // light, so the cut and its sparks are all that's bright.
      float ink = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      vec3 print = mix(vec3(0.008, 0.024, 0.062), vec3(1.2, 1.1, 0.92), smoothstep(0.1, 0.85, ink));
      color.rgb = mix(color.rgb, print, still * 0.8);
      color.rgb = mix(color.rgb, vec3(1.6), flash);
      gl_FragColor = color;
    }`};function ew(e,t,n){let r=new qC(e);r.setPixelRatio(1),r.addPass(new XC(t,n)),r.addPass(new QC(new Kl(1,1),.58,.5,.86));let i=new WC($C);r.addPass(i);let a=i.uniforms,o={blur:a.maxBlur.value,vignette:a.vignette.value};return r.addPass(new YC),{composer:r,setScreen(e,t,n,r){a.still.value=r,a.flash.value=e,a.tint.value.copy(t),a.tintAmount.value=n},setLens(e){a.maxBlur.value=o.blur*e,a.vignette.value=o.vignette*(.4+.6*e)},setSize(e,t,n){r.setSize(e,t),a.resolution.value.set(e,t),a.view.value.copy(n)}}}var tw=1280,nw={width:1120,height:620},rw=.3;function iw(e,t){let n=1;for(;e/(n+1)>=nw.width&&t/(n+1)>=nw.height;)n++;let r=e=>Math.max(2,Math.floor(e/2)*2),i=Math.min(tw,r(e/n)),a=Math.min(720,r(t/n));return{scale:n,width:i,height:a,left:(tw-i)/2,top:Math.round((720-a)*rw)}}function aw(e){function t(){let t=window.devicePixelRatio||1;e(iw(window.innerWidth*t,window.innerHeight*t),t)}return t(),window.addEventListener(`resize`,t),()=>window.removeEventListener(`resize`,t)}var ow=`#0b0b10`,sw=[`#0e0e13`,`#17181e`,`#22232b`,`#31333d`,`#464954`,`#62667a`],cw=[`#3b2f1a`,`#5a4826`,`#7e6736`,`#a68b4c`,`#cdb26c`],lw=[`#3c4252`,`#596075`,`#7d859b`,`#a9b0c2`,`#d3d8e4`],uw=`#07070b`,dw=e=>sw[Math.max(0,Math.min(sw.length-1,Math.round(e)))],fw=e=>cw[Math.max(0,Math.min(cw.length-1,Math.round(e)))],pw=e=>lw[Math.max(0,Math.min(lw.length-1,Math.round(e)))],mw=H(-.6,-.8);function hw(e,t,n){let r=gn(n),i=gn(n+90),a=(e,n)=>H(t.x+r.x*e+i.x*n,t.y+r.y*e+i.y*n),o=i.x*mw.x+i.y*mw.y>=0?1:-1,s=r.x*mw.x+r.y*mw.y,c=(t,n,r,i,o,s=!1)=>e.poly([a(t,r),a(n,r),a(n,i),a(t,i)],o,s?ow:null,1);return{at:a,lit:o,forward:s,quad:c,plate:(t,n,r,i,s,c=dw)=>{e.poly([a(t,-r),a(n,-i),a(n,i),a(t,r)],c(s),ow,1),e.poly([a(t,o*r*.35),a(n,o*i*.35),a(n,o*i),a(t,o*r)],c(s+1)),e.poly([a(t,-o*r*.45),a(n,-o*i*.45),a(n,-o*i),a(t,-o*r)],c(s-1)),e.line([a(t+1,o*(r-1.5)),a(n-1,o*(i-1.5))],c(s+2),.8)},band:(e,t,n,r)=>c(e-n/2,e+n/2,-t,t,r),rivet:(t,n,r)=>e.dot(a(t,n),1,r)}}function gw(e,t,n,r,i=dw){e.dot(t,n,i(r),ow,1),e.dot(H(t.x+mw.x*n*.28,t.y+mw.y*n*.28),n*.62,i(r+1)),e.dot(H(t.x+mw.x*n*.5,t.y+mw.y*n*.5),n*.26,i(r+2))}var _w=148,vw=H(_w/2,_w/2);function yw(e,t){return{name:e,width:_w,height:_w,origin:vw,frames:72,columns:9,draw(e,n){let r=hw(e,vw,jn(n));r.plate(-2,U.upper-4,12*t,10.5*t,2),r.plate(8,30,13.5*t,12.5*t,3),r.band(8,13.5*t,2,fw(2)),r.band(30,12.5*t,1.6,dw(0)),r.rivet(19,r.lit*9*t,fw(3)),r.rivet(19,-r.lit*9*t,fw(1)),e.poly([r.at(U.upper-6,-r.lit*8*t),r.at(U.upper+1,-r.lit*22*t),r.at(U.upper+6,-r.lit*8*t)],dw(3),ow,1),gw(e,r.at(U.upper,0),12.5*t,3),gw(e,r.at(U.upper,0),4*t,2,fw)}}}var bw=yw(`upper`,1),xw=yw(`upper-near`,1.28),Sw=1.3,Cw={name:`fore`,width:_w,height:_w,origin:vw,frames:72,columns:9,draw(e,t){let n=hw(e,vw,jn(t));n.plate(2,U.fore-8,10.5*Sw,9.5*Sw,2),n.plate(6,28,12*Sw,11.5*Sw,3),n.band(6,12*Sw,2,fw(2)),n.band(28,11.5*Sw,2,fw(1));for(let e of[11,17,23])n.rivet(e,n.lit*8*Sw,fw(3));e.poly([n.at(8,-n.lit*11*Sw),n.at(18,-n.lit*19*Sw),n.at(30,-n.lit*11*Sw)],dw(3),ow,1),n.plate(U.fore-13,U.fore-5,11.5*Sw,12.5*Sw,3),gw(e,n.at(U.fore,0),10.5*Sw,2);for(let t of[-6,0,6])e.line([n.at(U.fore-7,t),n.at(U.fore+9,t)],dw(0),.8)}},ww=140,Tw=H(ww/2,ww/2),Ew=[14,21,28],Dw={name:`housing`,width:ww,height:ww,origin:Tw,frames:72,columns:9,draw(e,t){let n=hw(e,Tw,jn(t));n.plate(0,U.fore+4,14.5,14.5,2);for(let e of[5,36])n.plate(e-3.5,e+3.5,16.5,16.5,3),n.band(e+3,16.5,1.4,fw(2));for(let e of Ew)n.quad(e-1.5,e+1.5,n.lit*4,n.lit*10,uw);e.line([n.at(4,-n.lit*17),n.at(20,-n.lit*19),n.at(36,-n.lit*17)],dw(4),2),n.plate(U.fore+2,U.fore+10,13,16.5,4),n.band(U.fore+9.5,16.5,1.6,fw(3)),n.quad(U.fore+10,U.fore+11.5,-9,9,uw)},glow(e,t){let n=hw(e,Tw,jn(t));for(let e of Ew)n.quad(e-.8,e+.8,n.lit*5,n.lit*9,Q_.mid)}},Ow=U.lanceBase+U.lanceThrow,kw=2*(Ow+12),Aw=H(kw/2,kw/2),jw={name:`shaft`,width:kw,height:kw,origin:Aw,frames:72,columns:9,draw(e,t){let n=hw(e,Aw,jn(t)),r=Ow-26;n.plate(-6,r,5.5,5.5,1,pw);for(let e=2;e<r-4;e+=9)n.band(e,5.5,1.6,pw(0));n.plate(r-3,r+3,8.5,8.5,2,fw),e.poly([n.at(r+3,-8),n.at(Ow,0),n.at(r+3,8)],pw(2),ow,1),e.poly([n.at(r+3,n.lit*8),n.at(Ow,0),n.at(r+3,0)],pw(4)),e.line([n.at(r+4,0),n.at(Ow-2,0)],pw(1),.8)}},Mw={half:31,thick:U.headHalf},Nw=2*Math.ceil(Math.hypot(U.haft+Mw.thick+6,Mw.half+6)),Pw=H(Nw/2,Nw/2),Fw={name:`hammer`,width:Nw,height:Nw,origin:Pw,frames:72,columns:9,draw(e,t){let n=hw(e,Pw,jn(t)),r=U.haft;n.plate(-16,r-Mw.thick,4,4,1),gw(e,n.at(-17,0),5.5,2,fw);for(let e of[14,30,46,62])n.band(e,4.5,2.4,fw(e%4?1:2));let i=r-Mw.thick,a=r+Mw.thick;e.poly([n.at(i,-Mw.half),n.at(a,-Mw.half),n.at(a,Mw.half-10),n.at(i,Mw.half-10)],dw(2),ow,1),e.poly([n.at(i,n.lit*4),n.at(a,n.lit*4),n.at(a,n.lit*(Mw.half-10)),n.at(i,n.lit*(Mw.half-10))],dw(n.lit>0?3:2)),e.poly([n.at(i+4,-4),n.at(a-4,-4),n.at(a-4,4),n.at(i+4,4)],dw(1)),e.poly([n.at(i-3,-Mw.half-5),n.at(a+3,-Mw.half-5),n.at(a+3,-Mw.half+3),n.at(i-3,-Mw.half+3)],pw(n.lit<0?2:1),ow,1);for(let e of[i+3,r,a-3])n.rivet(e,-Mw.half-1,pw(4));e.poly([n.at(i+4,Mw.half-10),n.at(r,Mw.half+5),n.at(a-4,Mw.half-10)],pw(1),ow,1),n.band(i,Mw.half-8,2,fw(2)),n.band(a,Mw.half-8,2,fw(1)),gw(e,n.at(r,0),6,2,fw),e.dot(n.at(r,0),2.2,dw(0))}};function Iw(e,t,n,r,i=dw){e.poly(n.map(([e,n])=>H(t.x+e,t.y+n)),i(r),ow,1)}var Lw=(e,t,n,r)=>e.poly(n.map(([e,n])=>H(t.x+e,t.y+n)),r),Rw=(e,t,n,r,i=1)=>e.line(n.map(([e,n])=>H(t.x+e,t.y+n)),r,i),zw={width:244,height:124},Bw=[0,6,12,18,24,30,36],Vw=H(zw.width/2,zw.height-3);function Hw(e,t,n,r,i){let a=i?1:2,o=H(r.x+4,r.y-16),s=xn(n,o,50,46,1).mid,c=H(s.x,Math.min(s.y,-16)),l=(n,r,i,a,o)=>{let s=Math.atan2(r.y-n.y,r.x-n.x)*180/Math.PI,c=hw(e,H(t.x+n.x,t.y+n.y),s);return c.plate(0,Math.hypot(r.x-n.x,r.y-n.y),i,a,o),c};l(n,c,17,13,a).band(14,15.5,2,fw(+!i));let u=l(c,o,13,12,a+1);u.band(34,14,2.2,fw(i?1:2)),u.rivet(12,u.lit*8,fw(3)),u.rivet(24,u.lit*9,fw(3)),Iw(e,t,[[r.x-24,r.y],[r.x-20,r.y-9],[r.x-2,r.y-15],[r.x+16,r.y-13],[r.x+19,r.y]],a+1),Lw(e,t,[[r.x-19,r.y-9],[r.x-2,r.y-14],[r.x+6,r.y-13],[r.x-12,r.y-6]],dw(a+2)),Rw(e,t,[[r.x-23,r.y-1],[r.x+18,r.y-1]],dw(0),1),Lw(e,t,[[c.x-6,c.y-7],[c.x-24,c.y+1],[c.x-6,c.y+7]],dw(a+2)),Rw(e,t,[[c.x-6,c.y-7],[c.x-24,c.y+1],[c.x-6,c.y+7]],ow,1),gw(e,H(t.x+c.x,t.y+c.y),13.5,a+1),gw(e,H(t.x+c.x,t.y+c.y),4.5,i?1:2,fw)}var Uw=[H(-41,-9),H(-40,-19),H(-38,-29),H(-36,-38)],Ww={name:`legs`,width:zw.width,height:zw.height,origin:Vw,frames:Bw.length+Uw.length,columns:Bw.length+Uw.length,draw(e,t){let n=Uw[t-Bw.length],r=n?0:Bw[t]??0,i=H(Tn.x,Tn.y+r);Hw(e,Vw,H(i.x+20,i.y+4),H(46,0),!0),Hw(e,Vw,H(i.x-18,i.y+4),n??H(-42,0),!1)}},Gw={width:140,height:158},Kw=H(72,104),qw=H(-9,-57),Jw={name:`torso`,width:Gw.width,height:Gw.height,origin:Kw,frames:2,columns:2,draw(e,t){let n=Kw,r=t===1,i=ev(51);Iw(e,n,[[16,-82],[50,-74],[54,-46],[38,-14],[14,-8]],1),Iw(e,n,[[-34,-9],[30,-9],[38,8],[-42,8]],2),Lw(e,n,[[-34,-9],[2,-9],[0,6],[-41,6]],dw(3)),Rw(e,n,[[-40,5],[36,5]],fw(2),1.6);for(let[t,r,i]of[[-44,26,3],[16,24,1]])Iw(e,n,[[t,7],[t+r,7],[t+r-1,32],[t+r/2,42],[t+1,32]],i),Lw(e,n,[[t+1,8],[t+r/2,8],[t+r/2,40],[t+2,31]],dw(i+1)),Rw(e,n,[[t+3,30],[t+r/2,38],[t+r-3,30]],fw(i>1?3:1),1.3),e.dot(H(n.x+t+r/2,n.y+16),2.2,fw(i>1?3:1));let a=[];for(let e=16;e>=-18;e-=4)a.push([e,46+(e%8?6:0)-i()*7]);Lw(e,n,[[-18,7],[16,7],...a],X_.mid),Lw(e,n,[[-18,7],[-11,7],[-12,44],[-18,42]],X_.light),Lw(e,n,[[9,7],[16,7],[16,40],[10,44]],X_.deep),Rw(e,n,[[-18,7],[-18,41]],ow,1),Rw(e,n,[[16,7],[16,40]],ow,1),Rw(e,n,[[-15,10],[-15,36]],fw(1),1),e.dot(H(n.x-1,n.y+22),5,fw(2)),e.dot(H(n.x-1,n.y+22),2.8,X_.mid);for(let[t,r]of[[-30,28],[-23,26],[-16,28]])Iw(e,n,[[-r-2,t],[r-2,t],[r,t+8],[-r-4,t+8]],2),Lw(e,n,[[-r-2,t+1],[-6,t+1],[-6,t+7],[-r-3,t+7]],dw(3)),Rw(e,n,[[-r-3,t+7],[r-1,t+7]],fw(1),1);Iw(e,n,[[-58,-72],[-36,-86],[12,-86],[40,-76],[42,-52],[28,-32],[-5,-25],[-32,-32],[-54,-50]],2),Lw(e,n,[[-56,-71],[-36,-84],[-9,-84],[-6,-27],[-31,-33],[-52,-50]],dw(3)),Lw(e,n,[[-54,-70],[-37,-80],[-26,-80],[-30,-56],[-50,-52]],dw(4)),Lw(e,n,[[-50,-68],[-40,-74],[-36,-66],[-46,-60]],dw(5)),Rw(e,n,[[-9,-85],[-5,-26]],dw(0),1),Rw(e,n,[[-57,-71],[-36,-84],[12,-84],[39,-75]],fw(3),1.7),Rw(e,n,[[-52,-50],[-32,-33],[-5,-27],[27,-33],[40,-52]],fw(2),1.5);for(let t of[-78,-34])e.dot(H(n.x-12,n.y+t),1.3,fw(4));for(let t=0;t<9;t++){let t=-50+i()*84,r=-78+i()*44;Math.hypot(t-qw.x,r-qw.y)<23||Rw(e,n,[[t,r],[t+3+i()*5,r+2+i()*3]],dw(i()<.5?0:1),1)}Iw(e,n,[[-30,-86],[-25,-97],[8,-97],[13,-86]],3),Lw(e,n,[[-29,-87],[-25,-96],[-10,-96],[-10,-87]],dw(4)),Rw(e,n,[[-27,-91],[10,-91]],fw(2),1.2);let o=H(n.x+qw.x,n.y+qw.y);if(!r)e.dot(o,19,dw(1),ow,1),e.dot(o,16.5,fw(1)),e.dot(o,14,uw);else{let t=[];for(let e=0;e<14;e++){let n=e/14*Math.PI*2,r=18+(e%2?5:0)+i()*4;t.push(H(o.x+Math.cos(n)*r,o.y+Math.sin(n)*r*.95))}e.poly(t,uw,ow,1);for(let t=0;t<7;t++){let n=t/7*Math.PI*2+.3,r=21+i()*4,a=H(o.x+Math.cos(n)*(r+9),o.y+Math.sin(n)*(r+9));e.poly([H(o.x+Math.cos(n-.2)*r,o.y+Math.sin(n-.2)*r),a,H(o.x+Math.cos(n+.2)*r,o.y+Math.sin(n+.2)*r)],dw(Math.cos(n)<0?4:2),ow,1)}for(let t of[-7,0,7])e.line([H(o.x+t,o.y-14),H(o.x+t*1.2,o.y+14)],dw(1),1.6);for(let t=0;t<5;t++)$w(e,o,t*1.3+.4,26,12+i()*10,i)}},glow(e,t){let n=H(Kw.x+qw.x,Kw.y+qw.y);if(t===0)e.dot(n,14,Q_.deep);else{e.oval(n,16,15,0,Q_.deep),e.oval(n,12.5,11.5,0,Q_.mid),e.oval(H(n.x-1,n.y-1),8,7.5,0,Q_.bright),e.oval(H(n.x-1,n.y-2),3.8,3.8,0,Q_.core);for(let t of[-7,0,7])e.line([H(n.x+t,n.y-14),H(n.x+t*1.2,n.y+14)],uw,1.6)}}},Yw={width:40,height:40},Xw=H(Yw.width/2,Yw.height/2),Zw=e=>Array.from({length:8},(t,n)=>(n+e/9)/8*Math.PI*2),Qw={name:`sun`,width:Yw.width,height:Yw.height,origin:Xw,frames:9,columns:9,draw(e,t){let n=Xw;e.dot(n,13.5,dw(2),ow,1);for(let r of Zw(t))e.dot(H(n.x+Math.cos(r)*12,n.y+Math.sin(r)*12),1.3,fw(3)),e.line([H(n.x+Math.cos(r)*5.5,n.y+Math.sin(r)*5.5),H(n.x+Math.cos(r)*10.5,n.y+Math.sin(r)*10.5)],uw,1.8);e.dot(n,4.8,fw(3),ow,1),e.dot(n,2.2,uw)},glow(e,t){let n=Xw;for(let r of Zw(t))e.line([H(n.x+Math.cos(r)*6.5,n.y+Math.sin(r)*6.5),H(n.x+Math.cos(r)*9.5,n.y+Math.sin(r)*9.5)],Q_.mid,1);e.dot(n,1.5,Q_.bright)}};function $w(e,t,n,r,i,a){let o=[],s=n;for(let e=r;e<r+i;e+=5)s+=(a()-.5)*.7,o.push(H(t.x+Math.cos(s)*e,t.y+Math.sin(s)*e));o.length>1&&e.line(o,uw,1)}var eT=[-7,-11,-15,-21.5,-28],tT=.84,nT=H(-23*tT,-22*tT),rT={width:76,height:84},iT=H(42,74),aT={name:`head`,width:rT.width,height:rT.height,origin:iT,frames:eT.length,columns:eT.length,draw(e,t){let n=hw(e,iT,-90+(eT[t]??0)),r=(e,t)=>n.at(-t*tT,e*tT),i=(t,n,i=!0)=>e.poly(t.map(([e,t])=>r(e,t)),n,i?ow:null,1);for(let[t,n]of[[-16,20],[-7,28],[3,31],[13,23]])i([[t-4,-42],[t,-42-n],[t+4,-42]],fw(t<-4?3:2)),e.dot(r(t,-43-n),1.6,fw(4));i([[-22,-4],[-24,-30],[-18,-44],[0,-50],[16,-44],[20,-28],[16,-4]],dw(2)),i([[-22,-5],[-24,-30],[-18,-43],[-4,-48],[-6,-5]],dw(3),!1),i([[-22,-8],[-23,-30],[-18,-41],[-12,-43],[-14,-8]],dw(4),!1),i([[-25,-34],[20,-34],[20,-40],[-25,-40]],fw(2)),i([[-25,-37],[-4,-37],[-4,-40],[-25,-40]],fw(3),!1);for(let t of[-18,-8,2,12])e.dot(r(t,-37),1.2,fw(4));i([[-30,-20],[-8,-30],[8,-26],[6,-8],[-10,-3],[-28,-8]],dw(3)),i([[-30,-20],[-8,-29],[-10,-16],[-29,-12]],dw(4),!1),e.line([r(-29,-12),r(-10,-16),r(6,-14)],dw(0),1),i([[-25,-23.5],[-4,-27],[-4,-22.5],[-25,-19.5]],uw,!1);for(let t of[-22,-17,-12])e.line([r(t,-8),r(t+1,-4)],uw,1.2);e.line([r(-20,-44),r(0,-51),r(16,-45)],dw(5),1.2),gw(e,r(9,-21),4,2,fw)},glow(e,t){let n=hw(e,iT,-90+(eT[t]??0)),r=(e,t)=>n.at(-t*tT,e*tT);t!==eT.length-1&&(e.poly([r(-23,-22.4),r(-7,-25.2),r(-7,-23.2),r(-23,-20.6)],Q_.mid),e.poly([r(-19,-22.6),r(-12,-23.8),r(-12,-22.8),r(-19,-21.6)],Q_.core))}},oT={width:168,height:190},sT=H(48,6),cT={name:`cape`,width:oT.width,height:oT.height,origin:sT,frames:12,columns:12,draw(e,t){let n=sT,r=ev(63),i=t/12*Math.PI*2,a=(e,t=0)=>Math.sin(i-e/34-t)*(e/150)**1.3*11,o=[];for(let e=92;e>=-26;e-=6){let t=(e+26)/118,n=Math.floor(e/6)%3==0?22:0,s=Math.sin(i-t*4.2)*5;o.push([e+a(150)*t,152+t*14-n-r()*12+s])}let s=(e,t)=>[e+a(t)*(e>0?1:.25),t];Iw(e,n,[[-30,0],[40,0],s(60,50),s(78,100),s(92,146),...o,s(-34,70)],0,()=>X_.dark);for(let[t,i,o,s]of[[-22,-20,X_.light,0],[-6,2,X_.deep,.4],[10,26,X_.mid,.8],[24,54,X_.deep,1.2],[36,74,X_.mid,1.6]]){let c=126-r()*14,l=a(c,s)*((i+30)/110);Lw(e,n,[[t,4],[t+6,4],[i+10+l,c],[i+l,c+5]],o)}Rw(e,n,[[-28,4],[-32+a(70)*.25,70],[-27+a(128)*.25,128]],`#7e6736`,1.4)}},lT={width:92,height:92},uT=H(46,54);function dT(e,t){return{name:e,width:lT.width,height:lT.height,origin:uT,frames:1,columns:1,draw(e){let n=uT,r=t?1:2,i=fw(t?1:3);for(let[t,a]of[[20,23],[11,27]])Iw(e,n,[[-a,t-8],[a,t-8],[a-3,t+6],[0,t+9],[-a+3,t+6]],r),Lw(e,n,[[-a+1,t-7],[-4,t-7],[-4,t+7],[-a+4,t+5]],dw(r+1)),Rw(e,n,[[-a+4,t+5],[0,t+8],[a-4,t+5]],i,1.3);Iw(e,n,[[-9,-24],[-3,-50],[5,-24]],r+1),Lw(e,n,[[-8,-24],[-3,-47],[-2,-24]],dw(r+3));let a=[];for(let e=0;e<=10;e++){let t=Math.PI+e/10*Math.PI;a.push([Math.cos(t)*30,6+Math.sin(t)*31])}Iw(e,n,[...a,[27,10],[-27,10]],r+1),Lw(e,n,[...a.slice(0,6),[-4,8],[-26,8]],dw(r+2)),Lw(e,n,[[-26,-8],[-18,-20],[-6,-25],[-8,-16],[-20,-6]],dw(r+3)),Rw(e,n,[[-28,8],[28,8]],i,1.8),Rw(e,n,[[-3,-27],[-1,6]],dw(0),1);for(let r of[-22,-12,8,20])e.dot(H(n.x+r,n.y+3),1.3,fw(t?2:4))}}}var fT={width:64,height:68},pT=H(32,30),mT={name:`stump`,width:fT.width,height:fT.height,origin:pT,frames:1,columns:1,draw(e){let t=pT,n=ev(77),r=[];for(let e=0;e<12;e++){let i=e/12*Math.PI*2,a=13+(e%2?5:0)+n()*3;r.push(H(t.x+Math.cos(i)*a,t.y+Math.sin(i)*a))}e.poly(r,dw(3),ow,1),e.dot(t,10,uw);for(let[n,r]of[[-5,16],[1,22],[6,13]])e.line([H(t.x+n,t.y+4),H(t.x+n-2,t.y+4+r*.6),H(t.x+n+1,t.y+4+r)],dw(4),1.4)},glow(e){e.dot(H(pT.x-1,pT.y),4.5,Q_.deep),e.dot(H(pT.x-1,pT.y-1),2.2,Q_.bright)}},hT={lance:24,hammer:34};function gT(e,t){let n=t===`lance`?196:276,r=t===`lance`?66:104,i=H(30,r-hT[t]-6);return{name:e,width:n,height:r,origin:i,frames:1,columns:1,draw(e){let n=$_(),r=H(i.x+U.upper,i.y),a=H(r.x+U.fore,r.y),o=(e,t,r)=>{let i=$_();e.draw(i,r);let a=t.x-e.origin.x,o=t.y-e.origin.y;n.out.push(`<g transform="translate(${a} ${o})">${i.out.join(``)}</g>`)};t===`lance`?(o(jw,H(a.x+U.lanceBase+U.lanceThrow*.4-Ow,a.y),0),o(bw,i,0),o(Dw,r,0)):(o(Fw,a,0),o(bw,i,0),o(Cw,r,0)),e.out.push(...n.out),e.dot(i,9,uw,ow,1)}}}var _T={legs:Ww,torso:Jw,sun:Qw,head:aT,cape:cT,pauldronNear:dT(`pauldron-near`,!1),pauldronFar:dT(`pauldron-far`,!0),stump:mT,upper:bw,upperNear:xw,fore:Cw,housing:Dw,shaft:jw,hammer:Fw,lanceFallen:gT(`lance-fallen`,`lance`),hammerFallen:gT(`hammer-fallen`,`hammer`)};Object.values(_T);var vT={cape:_T.cape,lanceUpper:_T.upper,shaft:_T.shaft,housing:_T.housing,lanceStump:_T.stump,pauldronFar:_T.pauldronFar,legs:_T.legs,torso:_T.torso,sun:_T.sun,head:_T.head,hammerStump:_T.stump,hammerUpper:_T.upperNear,hammer:_T.hammer,fore:_T.fore,pauldronNear:_T.pauldronNear};function yT(e){let t=0;return Bw.forEach((n,r)=>{Math.abs(n-e)<Math.abs((Bw[t]??0)-e)&&(t=r)}),t}function bT(e){let t=An(e);return{frame:t,turn:((e-jn(t))%360+540)%360-180}}function xT(e){let t=kn(e.body),n=Nn(`lance`,t.shoulder.lance,e.lance),r=Nn(`hammer`,t.shoulder.hammer,e.hammer),i=U.lanceBase+e.lance.ext*U.lanceThrow,a=un(n.hand,fn(gn(e.lance.a2),i-Ow)),o=bT(e.lance.a1),s=bT(e.lance.a2),c=bT(e.hammer.a1),l=bT(e.hammer.a2),u=bT(e.hammer.a3),d={frame:0,turn:t.turn},f=t.on(qw),p=e=>un(e,vn(H(0,12),t.turn)),[m,h]=[eT[0],eT[eT.length-1]??eT[0]],g=m+(h-m)*e.bow,_=0;eT.forEach((e,t)=>{Math.abs(e-g)<Math.abs((eT[_]??0)-g)&&(_=t)});let v=(e.spin%9+9)%9,y=Math.floor(v),b=Math.floor((e.cape%12+12)%12),x=Math.round(Math.max(0,Math.min(1,e.stomp))*Uw.length),S=x>0?Bw.length-1+x:yT(e.body.drop),C=e.lanceBroken?[]:[{layer:`lanceUpper`,at:t.shoulder.lance,...o},{layer:`shaft`,at:a,...s},{layer:`housing`,at:n.elbow,...s}],w=[...e.lanceBroken?[{layer:`lanceStump`,at:p(t.shoulder.lance),...d}]:[],{layer:`pauldronFar`,at:t.shoulder.lance,...d}],T=[{layer:`legs`,at:H(0,0),frame:S,turn:0},{layer:`torso`,at:t.torso,frame:+!!e.open,turn:t.turn},...e.open?[]:[{layer:`sun`,at:f,frame:y,turn:(v-y)*5+t.turn}],{layer:`head`,at:t.neck,frame:_,turn:g-(eT[_]??0)+t.turn*.5}],E=e.hammerBroken?[{layer:`hammerStump`,at:p(t.shoulder.hammer),...d}]:[{layer:`hammerUpper`,at:t.shoulder.hammer,...c},{layer:`hammer`,at:r.hand,...u},{layer:`fore`,at:r.elbow,...l}],D=e.across&&!e.lanceBroken;return{placed:[{layer:`cape`,at:t.cape,frame:b,turn:t.turn*.7},...D?[]:C,...w,...T,...D?C:[],...E,{layer:`pauldronNear`,at:t.shoulder.hammer,...d}],points:{heart:f,eye:un(t.neck,vn(nT,g+t.turn*.5)),lanceTip:n.tip,lanceMid:mn(n.elbow,n.tip,.6),lanceShoulder:t.shoulder.lance,hammerTip:r.tip,hammerMid:mn(r.hand,r.tip,.45),hammerShoulder:t.shoulder.hammer}}}var ST=er,CT=1.45,wT=45,TT=20,ET=10,DT=5,OT=.012,kT={piston:[`lanceUpper`,`shaft`,`housing`,`lanceStump`,`pauldronFar`],hammer:[`hammerUpper`,`hammer`,`fore`,`hammerStump`,`pauldronNear`],core:[`legs`,`torso`,`sun`,`head`,`cape`]};function AT(e,t){let n=new tp(e.width*ST,e.height*ST);n.translate((e.width/2-e.origin.x)*ST,(e.origin.y-e.height/2)*ST,0);let r=Hy(new fp({map:Yy(`sprites/warden/${e.name}.png`,t),alphaTest:.5,roughness:.75,metalness:0}));e.glow&&(r.emissiveMap=Yy(`sprites/warden/${e.name}-glow.png`,t),r.emissive.setRGB(1,1,1),r.emissiveIntensity=2),r.color.setScalar(CT);let i=new yf(n,r);i.castShadow=!0;let a=Math.ceil(e.frames/e.columns),o=-1,s=t=>{if(t===o)return;o=t;let r=n.attributes.uv;if(!r)return;let i=t%e.columns,s=Math.floor(t/e.columns),c=i/e.columns,l=(i+1)/e.columns,u=1-s/a,d=1-(s+1)/a;r.setXY(0,c,u),r.setXY(1,l,u),r.setXY(2,c,d),r.setXY(3,l,d),r.needsUpdate=!0};return s(0),{mesh:i,show:s,place(e,t){i.position.x=e.x*ST,i.position.y=-e.y*ST,i.rotation.z=-t*Math.PI/180}}}function jT(e,t,n){let r=new Gu;r.position.set(ar.x,0,ar.z),e.add(r);let i=Object.fromEntries(Object.keys(vT).map(e=>{let n=AT(vT[e],t);return r.add(n.mesh),[e,n]})),s=Object.fromEntries([`piston`,`hammer`].map(n=>{let r=AT(n===`piston`?_T.lanceFallen:_T.hammerFallen,t);return r.mesh.visible=!1,e.add(r.mesh),[n,{layer:r,rest:hT[n===`piston`?`lance`:`hammer`]*ST,flying:!1,landed:!1,vx:0,vy:0,vz:0,spin:0}]})),c=new rm(16754240,1.5,9,2);r.add(c);let l={piston:{start:0,until:0,strength:0},hammer:{start:0,until:0,strength:0},core:{start:0,until:0,strength:0},all:{start:0,until:0,strength:0}},u={piston:uC(),hammer:uC(),body:uC()},d=uC(),f=0,p=0,m=-1,h,g=0,v=0,y=0,b,x,S,C=(e,t,n=.4)=>t.set(r.position.x+(e?.x??0)*ST,-(e?.y??0)*ST,r.position.z+n);function w(e){let t=l[e];return t.until>f?(t.until-f)/(t.until-t.start)*t.strength:0}function T(e,t){if(!e.flying||t<=0)return;let{position:r,rotation:i}=e.layer.mesh;e.vy-=14*t,r.x=Math.max(-1,Math.min(7,r.x+e.vx*t)),r.y+=e.vy*t,r.z=Math.max(-2,Math.min(1-.8,r.z+e.vz*t)),i.z+=e.spin*t,r.y>e.rest||(r.y=e.rest,(!e.landed||Math.abs(e.vy)>=2.5)&&n({type:`armLanded`,bounce:e.landed}),e.landed=!0,Math.abs(e.vy)<2.5?(e.flying=!1,i.z=0):(e.vy=Math.abs(e.vy)*.3,e.vx*=.5,e.vz*=.5,e.spin*=.4))}function E(e){let t=s[e];if(t.layer.mesh.visible)return;let{mesh:n}=t.layer;C(e===`piston`?S?.lanceShoulder:S?.hammerShoulder,n.position,0),n.rotation.z=0,n.visible=!0,t.flying=!0,t.landed=!1,t.vx=(e===`piston`?-1:1)*(.5+Math.random()*2.2),t.vy=3+Math.random()*3,t.vz=(Math.random()-.5)*1.6,t.spin=(Math.random()<.5?-1:1)*(3+Math.random()*4)}return{group:r,update(e,t,l){let{riposteStrikeTick:C}=l.tuning,D=Math.min(.1,Math.max(0,t-p));p=t,f=t;let O=e.freeze>0,k=_(e),A=e.outcome===`victory`&&!k;A?h===void 0&&(h=t,n({type:`collapse`})):h=void 0;let j=A?Math.min(1,(t-(h??t))/.9)**2:0,ee=t=>{let n=tn(e.boss,t,l),r=n.raise/1e3,i=n.swing/1e3;return{motion:n.motion,raise:r,swing:i,winding:r*Math.max(0,i),striking:r*Math.max(0,-i),knock:u[t].value(f,O)}},M=ee(`piston`),N=ee(`hammer`),te=M.motion===`sweep`?M.raise:0,P=N.motion===`swing`?N.raise:0,ne=P*(4+22*N.swing**2),re=M.motion===`plunge`?M.raise:0,ie=tn(e.boss,`body`,l),ae=ie.motion===`bodySlam`?ie.raise/1e3:0,oe=ie.motion===`beam`?ie.raise/1e3:0,se=+!!qt(e.boss,l),ce=ae*Math.max(0,ie.swing/1e3),le=ae*Math.max(0,-ie.swing/1e3),ue=Math.max(M.knock,N.knock)*.5+u.body.value(f,O)*.5+d.value(f,O),de=0;e.boss.phase===`riposte`&&e.boss.tick>=C&&(de=Math.max(0,1-(e.boss.tick-C)/20));let fe=Zt(e.boss,l,TT),pe=0,me=0;fe!==void 0&&e.parts.core>0&&(fe<0?pe=1- -fe/TT:fe<ET&&(me=1-fe/ET));let he=Math.max(24*te,ne,36*j)+12*N.striking*(1-P)+18*re*M.striking-8*re*M.winding+10*le+6*ce+14*me,ge=DT*(1-j)-9*pe+8*me+(te>0?14:10)*M.striking-6*M.winding+4*te+16*N.striking+10*P*N.striking-10*N.winding-22*ce+30*le+7*oe-12*ue-14*de+14*j,F=A||k?0:Math.sin(e.frame*.03)*1.8,_e=A||k?0:Math.sin(e.frame*.03-.6)*.9,ve={drop:he+F,lean:ge,shrug:{lance:{x:4*M.winding-5*M.striking,y:-3*M.winding+2*M.striking-_e},hammer:{x:3*N.winding-5*N.striking,y:-7*N.winding+4*N.striking-2*pe-_e}}},{shoulder:ye}=kn(ve),be=Math.max(M.striking,N.striking,le);r.position.x=ar.x-be*rr-le*2.2+de*.4;let xe=e.frame-m;m=e.frame;let Se=xe<0||xe>6,I=Hn(M.motion===`sweep`?`sweep`:M.motion===`plunge`?`plunge`:`jab`,{...M,shoulder:ye.lance,target:cr}),Ce=qn(N.motion===`swing`?`swing`:`slam`,{...N,shoulder:ye.hammer,target:cr});b=b&&!Se?Jn(b,I,xe*wT):I,x=x&&!Se?Jn(x,Ce,xe*wT):Ce;let we=Se||k?0:xe,Te=Math.max(M.raise,N.raise,ae,oe,pe,me);g+=we*(.07+a(e.parts)*.06+Te*.3),y+=we*(.068+Te*.09);let L=Math.max(M.striking,N.striking,le,te,P,me),Ee=Math.max(j,.5*Math.min(1,L*2.5),.38*oe);v=Se?Ee:v+(Ee-v)*(1-Math.exp(-D*12));let R=o(e.parts),De=xT({body:ve,bow:v,open:!R,spin:g,cape:y,stomp:pe,lance:b,hammer:x,lanceBroken:e.parts.piston<=0,hammerBroken:e.parts.hammer<=0,across:te>.1});S=De.points;for(let e of Object.values(i))e.mesh.visible=!1;De.placed.forEach((e,t)=>{let n=i[e.layer];n.mesh.visible=!0,n.mesh.position.z=t*OT,n.show(e.frame),n.place(e.at,e.turn)});for(let t of[`piston`,`hammer`]){let n=s[t];e.parts[t]>0?n.layer.mesh.visible=!1:E(t),T(n,D)}let Oe=a(e.parts),ke=Math.max(M.raise,N.raise,ae),Ae=oe*5+se*9,je=Math.sin(e.frame*.035),Me=Math.max(.04,1-j*1.3);i.torso.mesh.material.emissiveIntensity=Me*(1.8+Oe*1.2+ke*1.6+(Oe>0?je*.4:0)),i.sun.mesh.material.emissiveIntensity=i.torso.mesh.material.emissiveIntensity,i.head.mesh.material.emissiveIntensity=Me*(2.4+ke*1.2+Ae),i.housing.mesh.material.emissiveIntensity=1+M.winding*4,c.position.set(S.heart.x*ST,-S.heart.y*ST,.9),c.intensity=Me*(1.5+Oe*1.6+je*.4+ke*3);let Ne=e.turn===`player`&&e.player.step===`choose`&&!A,Pe=.35+.25*Math.sin(t*8);for(let t of[`piston`,`hammer`,`core`]){let n=(Ne&&e.player.target===t?Pe:0)+(w(t)+w(`all`))*4;for(let e of kT[t])i[e].mesh.material.color.setScalar(CT*(1+n))}},eyePosition(e){return C(S?.eye,e,.6)},tipPosition(e,t){return e===`body`?C(S?.heart,t,.5):C(e===`piston`?S?.lanceTip:S?.hammerTip,t)},get x(){return r.position.x},partPosition(e,t,n=!1){if(e===`core`)return C(S?.heart,t,.5);let r=i[e===`piston`?`lanceStump`:`hammerStump`].mesh.visible;return C(e===`piston`?n&&r?S?.lanceShoulder:S?.lanceMid:n&&r?S?.hammerShoulder:S?.hammerMid,t)},flash(e=1,t){let n=l[t??`all`];n.strength=e,n.start=f,n.until=f+.18},knock(e,t){u[e].fire(t)},windup(e){u[e].settle()},stagger(e){d.fire(e)},breakOff(e){e!==`core`&&E(e)},reset(){b=void 0,x=void 0,m=-1/0;for(let e of Object.values(u))e.settle();d.settle()}}}var MT={hero:new J(ir.x+.4,2.3,0),boss:new J(ar.x-2.4,5.2,0)},NT=new J(tr.x,tr.y,tr.z),PT=new J(nr.x,nr.y,nr.z),FT=16,IT=.04;function LT(e,t){let n=document.createElement(`div`);n.style.position=`relative`,n.style.lineHeight=`0`,e.appendChild(n);let r=new L_({antialias:!1});r.setPixelRatio(1),r.shadowMap.enabled=!0,r.shadowMap.type=1,r.toneMapping=4,r.toneMappingExposure=1.05,r.domElement.dataset.testid=`game`,n.appendChild(r.domElement);let i=new ed;i.background=new Y(ab),i.fog=new $u(ab,.011);let a=new tm(30,tw/720,.1,200);a.position.copy(NT),a.lookAt(PT);let o=pb(i),s=e=>r.initTexture(e),c=[],l=e=>{c.push(e)},u=jT(i,s,l),d=new Map,f,p=e=>{let n=js(t,e.hero.id),r=d.get(n.id);return r||(r=vC(i,s,n),d.set(n.id,r)),r!==f&&(f?.hide(),f=r,v.setLight(n.light??!1),y.setPortrait(n.portraitFile,n.hints)),r},m={x:0,y:0,z:0},h={drawn:!1},g={get clashPoint(){return f?.clashPoint??m},get hiltPoint(){return f?.hiltPoint??m},get handPoint(){return f?.handPoint??m},get overheadPoint(){return f?.overheadPoint??m},get feetPoint(){return f?.feetPoint??m},get bladeGuard(){return f?.bladeGuard??m},get bladeTip(){return f?.bladeTip??m},get blade(){return f?.blade??h},flash:e=>f?.flash(e),push:e=>f?.push(e)};i.add(RT(.55,ir.x,ir.z),RT(3.4,ar.x,ar.z));let v=oC(i,a,u,g,l),y=RC(n),b=ew(r,i,a),x=aw((e,t)=>{let i=Math.round(e.width*1),o=Math.round(e.height*1);r.setSize(i,o,!1),b.setSize(i,o,new fu(e.left/tw,(720-e.top-e.height)/720,e.width/tw,e.height/720)),r.domElement.style.width=`${e.width*e.scale/t}px`,r.domElement.style.height=`${e.height*e.scale/t}px`,a.setViewOffset(tw,720,e.left,e.top,e.width,e.height),y.setScale(e.scale/t),n.style.fontSize=`${e.scale/t*10.5}px`}),S,C=0,w=0,T=new J,E=new J;return{render(e,t,n,r,i){let s=S===void 0?0:Math.min(.1,(t-S)/1e3);S=t;let l=i?.passed??s,d=(_(e)?r.tuning.freezeVictory-e.freeze:-1)>=FT,f=l*(d?IT:1);C+=f;let m=C;w=d?w+(1-w)*(1-Math.exp(-l*18)):0;let h=vr(e);o.update(m),u.update(h,m,r),p(r).update(h,m,r,i?.hero,u.x),v.setLayers(i?.layers??{light:!0,hits:!0});for(let e of n)v.trigger(e);v.update(h,m,f,r),d&&(v.screen.shake.set(0,0,0),v.screen.flash=0);let{shake:g,pushIn:x,kick:D,focus:O}=v.screen;T.lerpVectors(PT,O,x*.55+D*.2),a.position.set(NT.x+(T.x-PT.x)-x*2.4*ur+g.x*ur,NT.y-x*.9*ur+g.y*ur,NT.z-x*3.2*ur-D*1.4*ur);let k=Math.max(1,i?.zoom??1);if(k>1){let e=MT[i?.subject??`hero`],t=e.x-PT.x,n=e.y-PT.y;a.position.x+=t,a.position.y+=n,T.x+=t,T.y+=n}a.zoom!==k&&(a.zoom=k,a.updateProjectionMatrix(),b.setLens(k>1?0:1)),a.lookAt(T),a.rotateZ(D*.045-x*.03+v.screen.lean*.03),a.updateMatrixWorld();let A;if(e.outcome===`fighting`&&e.turn===`player`&&e.player.step===`choose`){let t=e.player.target;u.partPosition(t,E),E.y+=t===`core`?1.3:1,E.project(a),A={x:(E.x+1)/2,y:(1-E.y)/2}}y.update(e,n,r,A),y.setVisible(i?.hud??!0),b.setScreen(v.screen.flash,v.screen.tint,v.screen.tintAmount,w),b.composer.render();let j=c;return c=[],j},frame:n,preload(e){let n=js(t,e.hero.id);n.sheets.forEach((e,t)=>{Yy(n.sheetFile(t),s)}),Jy(n.portraitFile)},setBoss(e,t){y.setBoss(e,t)},reset(){v.reset(),u.reset(),c=[]},dispose(){x(),b.composer.dispose(),r.dispose(),y.dispose(),n.remove()}}}function RT(e,t,n){let r=new yf(new ep(e,20),new sf({color:0,transparent:!0,opacity:.45,depthWrite:!1}));return r.rotation.x=-Math.PI/2,r.scale.set(1,.45,1),r.position.set(t,.02,n),r}var zT=.05,BT=[`master`,`music`,`effects`,`hall`],VT=`↑ ↓  choose   ·   K / Enter  confirm`;function HT(e,t){switch(e){case`title`:return t.loading?[]:t.canContinue?[{id:`continue`,label:`Continue`},{id:`new`,label:`New game`}]:[{id:`new`,label:`New game`}];case`startOver`:return[{id:`no`,label:`No, go back`},{id:`yes`,label:`Yes, start over`}];case`pause`:return[{id:`resume`,label:`Resume`},{id:`controls`,label:`Controls`},{id:`settings`,label:`Settings`},{id:`title`,label:`Back to title`}];case`settings`:return[{id:`master`,label:`Volume`},{id:`music`,label:`Music`},{id:`effects`,label:`Effects`},{id:`hall`,label:`Hall`},{id:`mute`,label:`Mute`}];case`leave`:return[{id:`no`,label:`No, keep fighting`},{id:`yes`,label:`Yes, back to the title`}];default:return[]}}function UT(e){switch(e){case`title`:return{hint:VT};case`startOver`:return{heading:`Start over?`,note:`Saved progress will be replaced.`,hint:`${VT}   ·   Esc  back`};case`card`:return{hint:`K  continue`};case`end`:return{hint:`K  back to the title`};case`pause`:return{heading:`PAUSED`,hint:`${VT}   ·   Esc  resume`};case`controls`:return{hint:``};case`settings`:return{heading:`SETTINGS`,hint:`↑ ↓  choose   ·   ← →  change   ·   Esc  back`};case`leave`:return{heading:`Leave this fight?`,note:`It starts over when you come back.`,hint:`${VT}   ·   Esc  back`}}}function WT(e,t){return e===`controls`?{page:e,at:0,direct:!0}:{page:e,at:0}}function GT(e,t,n){return Math.max(0,HT(e,n).findIndex(e=>e.id===t))}var KT={type:`resume`};function qT(e,t,n){let r={state:e},{page:i}=e,a=HT(i,n),o=(e,t)=>({state:{page:e,at:t===void 0?0:GT(e,t,n)}});if(t===`up`||t===`down`){if(a.length===0)return r;let n=(e.at+(t===`up`?-1:1)+a.length)%a.length;return n===e.at?r:{state:{...e,at:n}}}let s=a[e.at]?.id;if(t===`left`||t===`right`)return i!==`settings`||s===void 0||!BT.includes(s)?r:{state:e,action:{type:`volume`,which:s,by:t===`left`?-.05:zT}};if(t===`start`&&[`pause`,`controls`,`settings`,`leave`].includes(i))return{state:e,action:KT};switch(i){case`title`:return t===`back`||n.loading?r:s===`continue`?{state:e,action:{type:`continue`}}:s===`new`?n.hasSave?o(`startOver`):{state:e,action:{type:`new`}}:r;case`startOver`:return t===`back`?o(`title`,`new`):s===`yes`?{state:{page:`title`,at:0},action:{type:`new`}}:o(`title`,`new`);case`card`:case`end`:return{state:e,action:{type:`next`}};case`pause`:return t===`back`||s===`resume`?{state:e,action:KT}:s===`controls`?o(`controls`):s===`settings`?o(`settings`):s===`title`?o(`leave`):r;case`controls`:return e.direct?{state:e,action:KT}:o(`pause`,`controls`);case`settings`:return t===`back`?o(`pause`,`settings`):t===`confirm`&&s===`mute`?{state:e,action:{type:`mute`}}:r;case`leave`:return t===`back`?o(`pause`,`title`):s===`yes`?{state:e,action:{type:`title`}}:o(`pause`,`title`)}}var JT=.2;function YT(e,t,n=0){if(e!==`controls`)return 0;let r=(t&G.Down?1:0)-(t&G.Up?1:0);return r===0?Math.abs(n)<=JT?0:Math.round(Math.sign(n)*Math.min(1,Math.abs(n))*14):r*14}function XT(e,t,n,r=!1){let i=e&~t,a=[];return i&G.Up&&a.push(`up`),i&G.Down&&a.push(`down`),i&G.Left&&a.push(`left`),i&G.Right&&a.push(`right`),i&G.Confirm&&!r&&a.push(`confirm`),(n.back||i&G.East&&!r)&&a.push(`back`),n.start&&a.push(`start`),a}var ZT={none:``,ready:`Gamepad ready   ·   A  confirm   ·   B  back   ·   Start  pause`,unknown:`A gamepad is connected, but this browser can't tell its buttons apart.
If it has an X / D switch, set it to X. Otherwise use the keyboard.`},QT={card:30,end:30,title:15,pause:8},$T=`
.screens { position: absolute; inset: 0; z-index: 30; pointer-events: none; overflow: hidden;
  color: #eef2f6; font: 700 1em/1.15 "Bahnschrift", "DIN Alternate", "Arial Narrow", "Segoe UI", sans-serif;
  font-stretch: 85%; letter-spacing: 0.06em; text-shadow: 0 0.1em 0 #05060a, 0 0 0.35em #05060a; }
.screens .screen { position: absolute; inset: 0; }
.screens .item { cursor: pointer; pointer-events: auto; }
.screens .hint { position: absolute; left: 0; right: 0; bottom: 1.5em; text-align: center;
  font-size: 0.95em; color: #8e96a8; white-space: pre; letter-spacing: 0.08em; }

/* Title: the hall shows through, darkened. */
.screens .title { background: radial-gradient(ellipse at 50% 42%, rgba(5, 6, 10, 0.35), rgba(5, 6, 10, 0.88)); }
.screens .title .word { position: absolute; top: 30%; left: 0; right: 0; transform: translateY(-50%);
  text-align: center; font-size: 6.4em; font-style: italic; font-weight: 900; line-height: 1;
  letter-spacing: 0.32em; text-indent: 0.32em; color: #fff; -webkit-text-stroke: 0.03em #05060a;
  paint-order: stroke fill; text-shadow: 0.06em 0.06em 0 #ffb347; }
.screens .title .rule { position: absolute; top: calc(30% + 4.2em); left: 28%; right: 28%; height: 0.1em;
  background: linear-gradient(90deg, transparent, #cdb26c 30% 70%, transparent); }
.screens .title > .items { position: absolute; top: 58%; left: 0; right: 0; display: flex;
  flex-direction: column; align-items: center; gap: 0.7em; }
.screens .title > .items .item { position: relative; font-size: 1.5em; letter-spacing: 0.22em;
  text-transform: uppercase; color: #8e96a8; padding: 0 0.3em; }
.screens .title > .items .item.on { color: #fff; text-shadow: 0 0 0.6em rgba(233, 207, 143, 0.7), 0 0.1em 0 #05060a; }
.screens .title > .items .item.on::before { content: "\\25B6"; position: absolute; left: -1.3em; top: 0.12em;
  font-size: 0.6em; color: #e9cf8f; letter-spacing: 0; }
.screens .title > .note { position: absolute; left: 1.8em; bottom: 1.7em; font-size: 0.85em;
  color: #8e96a8; opacity: 0.8; }
.screens .title > .hint { bottom: 1.5em; }
/* What the game sees of a gamepad: said, so that one that does nothing isn't a puzzle. */
.screens .padnote { font-size: 0.85em; color: #8e96a8; letter-spacing: 0.08em; text-align: center;
  white-space: pre-line; }
.screens .padnote.unknown { color: #ffc463; }
.screens .padnote:empty { display: none; }
.screens .title > .padnote { position: absolute; left: 12%; right: 12%; bottom: 3.6em; }
.screens .panel .padnote { margin-top: 0.7em; font-size: 0.7em; }

/* Card and end: a black page with a few lines. */
.screens .plain { background: #05060a; animation: screens-fade 400ms ease-out; }
.screens .plain .body { position: absolute; left: 12%; right: 12%; top: 50%; transform: translateY(-50%);
  display: flex; flex-direction: column; align-items: center; text-align: center; }
.screens .plain .heading { display: flex; align-items: center; gap: 0.8em; align-self: stretch;
  justify-content: center; font-size: 1.05em; letter-spacing: 0.42em; text-transform: uppercase;
  color: #e9cf8f; margin-bottom: 1.6em; }
.screens .plain .heading::before, .screens .plain .heading::after { content: ""; flex: 1; height: 0.08em;
  background: linear-gradient(90deg, transparent, #8a7440 30%, #cdb26c); }
.screens .plain .heading::after { transform: scaleX(-1); }
.screens .plain .lines p { margin: 0.5em 0; font-size: 2.1em; font-style: italic; font-weight: 500;
  color: #eef2f6; letter-spacing: 0.04em; line-height: 1.25; }
.screens .plain .hint { left: auto; right: 2em; text-align: right; }

/* Pause and its questions: a panel like the control guide's card. */
.screens .dim { background: rgba(5, 6, 10, 0.72); }
.screens .dim.controls { background: none; }
.screens .panel { position: absolute; top: 50%; left: 50%; width: 26em; transform: translate(-50%, -50%);
  box-sizing: border-box; padding: 1.8em 2em 1.4em; background: linear-gradient(#141722, #0b0d14);
  border: 0.09em solid #05060a; box-shadow: 0 0 0 0.07em #8a7440, 0 0 0 0.3em #0b0d14,
    0 0 0 0.37em #4a3c22, 0 1.6em 4em rgba(0, 0, 0, 0.7); }
.screens .panel::before, .screens .panel::after { content: ""; position: absolute; width: 1.4em;
  height: 1.4em; border: 0.14em solid #cdb26c; }
.screens .panel::before { left: -0.5em; top: -0.5em; border-right: 0; border-bottom: 0; }
.screens .panel::after { right: -0.5em; bottom: -0.5em; border-left: 0; border-top: 0; }
.screens .panel.hide { display: none; }
.screens .panel .heading { display: flex; align-items: center; gap: 0.8em; margin: 0 0 0.7em;
  font-size: 1.5em; font-style: italic; font-weight: 800; letter-spacing: 0.3em; color: #e9cf8f; }
.screens .panel .heading::before, .screens .panel .heading::after { content: ""; flex: 1; height: 0.06em;
  background: linear-gradient(90deg, transparent, #8a7440 40%, #cdb26c); }
.screens .panel .heading::after { transform: scaleX(-1); }
.screens .panel .note { margin: 0 0 0.8em; font-size: 0.9em; color: #8e96a8; text-align: center; }
.screens .panel .items { display: flex; flex-direction: column; gap: 0.35em; margin: 0.8em 0 1em; }
.screens .panel .item { position: relative; display: flex; align-items: center;
  justify-content: space-between; padding: 0.15em 0 0.15em 1.4em; font-size: 1.25em;
  letter-spacing: 0.12em; color: #8e96a8; }
.screens .panel .item.on { color: #fff; text-shadow: 0 0 0.6em rgba(233, 207, 143, 0.55), 0 0.1em 0 #05060a; }
.screens .panel .item.on::before { content: "\\25B6"; position: absolute; left: 0; top: 0.3em;
  font-size: 0.6em; color: #e9cf8f; }
.screens .panel .item input[type="range"] { width: 8em; accent-color: #cdb26c; pointer-events: auto; }
.screens .panel .item button { padding: 0.1em 0.8em; font: inherit; font-size: 0.7em; color: #e9cf8f;
  background: #1b1f2c; border: 0.08em solid #8a7440; cursor: pointer; pointer-events: auto; }
.screens .panel .credits { margin: 0 0 0.8em; font-size: 0.7em; line-height: 1.4; color: #8e96a8; }
.screens .panel .hint { position: static; margin-top: 0.4em; padding-top: 0.8em;
  border-top: 0.08em solid #2c3040; font-size: 0.76em; }
@keyframes screens-fade { from { opacity: 0; } to { opacity: 1; } }
`,eE=[`master`,`music`,`effects`,`hall`],tE=e=>Math.max(0,Math.min(1,e));function nE(e,t){let{sound:n,guide:r}=t,i=document.createElement(`div`);i.className=`padnote`,i.dataset.testid=`pad-note`;function a(){let e=t.pad?.()??`none`,n=ZT[e];i.textContent!==n&&(i.textContent=n),i.classList.toggle(`unknown`,e===`unknown`)}let o=document.createElement(`style`);o.textContent=$T,document.head.appendChild(o);let s=document.createElement(`div`);s.className=`screens`,s.dataset.testid=`screens`,e.appendChild(s);let c=new Map;for(let e of eE){let t=document.createElement(`input`);t.type=`range`,t.min=`0`,t.max=`100`,t.dataset.testid=`volume-${e}`,t.addEventListener(`input`,()=>n.set({[e]:Number(t.value)/100})),t.addEventListener(`change`,()=>t.blur()),c.set(e,t)}let l=document.createElement(`button`);l.dataset.testid=`mute`,l.addEventListener(`mousedown`,e=>e.preventDefault());let u=document.createElement(`div`);u.className=`credits`;function d(){let e=n.get();for(let[t,n]of c){let r=String(Math.round(e[t]*100));n.value!==r&&document.activeElement!==n&&(n.value=r)}let t=e.muted?`Muted (M)`:`Mute (M)`;l.textContent!==t&&(l.textContent=t);let r=n.credits(),i=r.length>0?`Music: ${r.join(` · `)}`:``;u.textContent!==i&&(u.textContent=i)}let f,p,m=-1,h=0,g,_,v=!1,y=!0,b=[],x=!1,S=()=>f?.kind===`title`?{canContinue:f.canContinue,hasSave:f.hasSave,loading:x}:{canContinue:!1,hasSave:!1},C=()=>f?QT[f.kind]:0;function w(){let e=y&&p?.page===`controls`;e!==v&&(v=e,r.show(e))}function T(e,t,n,r){let i=document.createElement(e);return t&&(i.className=t),n&&(i.dataset.testid=n),r!==void 0&&(i.textContent=r),i}function E(e){if(e)switch(e.type){case`volume`:{let t=Math.round(tE(n.get()[e.which]+e.by)*100)/100;n.set({[e.which]:t}),d();return}case`mute`:n.set({muted:!n.get().muted}),d();return;default:return e.type}}function D(){p&&b.forEach((e,t)=>{let n=t===p?.at;e.classList.toggle(`on`,n),e.setAttribute(`aria-selected`,n?`true`:`false`)})}function O(e){if(!p)return;let t=qT({...p,at:e},`confirm`,S());p=t.state;let n=E(t.action);n&&(g=n),te()}function k(e,t){let n=T(`div`,t);return b=[],A(e).forEach((t,r)=>{let i=T(`div`,`item`,`menu-${t.id}`);if(i.setAttribute(`role`,`option`),e===`settings`&&t.id!==`mute`){i.append(T(`span`,void 0,void 0,t.label));let e=c.get(t.id);e&&i.append(e)}else e===`settings`?i.append(T(`span`,void 0,void 0,t.label),l):i.textContent=t.label;i.addEventListener(`click`,()=>O(r)),b.push(i),n.append(i)}),n}let A=e=>HT(e,S());function j(e){let t=UT(e).hint;return t?T(`div`,`hint`,`menu-hint`,t):void 0}function ee(e){let t=UT(e),n=T(`div`,`panel${e===`controls`?` hide`:``}`);t.heading&&n.append(T(`div`,`heading`,`menu-heading`,t.heading)),t.note&&n.append(T(`div`,`note`,void 0,t.note)),e!==`controls`&&n.append(k(e,`items`)),e===`settings`&&(n.append(u),d());let r=j(e);return r&&n.append(r),e===`pause`&&n.append(i),n}function M(e,t){let n=T(`div`,`screen plain`,`screen-${e}`),r=T(`div`,`body`);r.append(T(`div`,`heading`,`card-heading`,t.heading));let i=T(`div`,`lines`,`card-lines`);for(let e of t.lines)i.append(T(`p`,void 0,void 0,e));r.append(i),n.append(r);let a=j(e);return a&&n.append(a),n}function N(){if(s.replaceChildren(),b=[],!f||!p)return;let e=p.page;if(_=e,f.kind===`card`||f.kind===`end`)s.append(M(f.kind,f.card));else if(f.kind===`title`){let t=T(`div`,`screen title`,`screen-title`);if(t.append(T(`div`,`word`,void 0,`SUNDER`),T(`div`,`rule`)),e===`title`&&x)t.append(T(`div`,`items`,`title-loading`,`Loading…`));else if(e===`title`){t.append(k(e,`items`));let n=j(e);n&&t.append(n),t.append(i)}else{let n=T(`div`,`screen dim`);n.append(ee(e)),t.append(n)}f.note&&t.append(T(`div`,`note`,`title-note`,f.note)),s.append(t)}else{let t=T(`div`,`screen dim${e===`controls`?` controls`:``}`,`screen-pause`);t.append(ee(e)),s.append(t)}D()}function te(){p&&p.page!==_?N():D(),w()}return{show(e){if(f=e,g=void 0,m=-1,h=0,_=void 0,!e){p=void 0,s.replaceChildren(),b=[],w();return}let t=S();p=e.kind===`pause`?WT(e.page===`controls`?`controls`:`pause`,t):WT(e.kind,t),N(),w()},get shown(){return f},get menu(){return p},input(e,t){if(!f||!p)return;h++;let n=XT(e,m,t,h<=C());m=e;let i=YT(p.page,e,t.scroll);if(i!==0&&r.scrollBy?.(i),g){let e=g;return g=void 0,e}let a=S();for(let e of n){let t=qT(p,e,a),n=t.state!==p;p=t.state,n&&te();let r=E(t.action);if(r)return r}},setLoading(e){e!==x&&(x=e,f?.kind===`title`&&p?.page===`title`&&N())},setVisible(e){y=e,s.style.display=e?``:`none`,w()},update(){a(),p?.page===`settings`&&d()},dispose(){v&&r.show(!1),v=!1,s.remove(),o.remove()}}}var rE=600;function iE(e=3600){let t=[],n,r=0;return{get ticks(){return r},record(i,a,o){o!==n&&(t=[],r=0,n=o);let s=t[t.length-1];for((!s||s.inputs.length>=rE)&&(s={start:i,inputs:[]},t.push(s)),s.inputs.push(a),r++;t.length>1&&r-(t[0]?.inputs.length??0)>=e;)r-=t.shift()?.inputs.length??0},save(e,r){let i=t[0];if(i&&n)return{format:rs,version:8,commit:r.commit,savedAt:r.savedAt,...r.fight===void 0?{}:{fight:r.fight},rules:n,start:i.start,inputs:is(t.flatMap(e=>e.inputs)),end:e}},clear(){t=[],r=0,n=void 0}}}function aE(e,t){let n=t.tuning;if(!n||Object.keys(n).length===0)return e;let r={...e,tuning:{...e.tuning,...n}};return cn(r).length>0?e:r}function oE(e=[]){return{screen:{at:`title`},cleared:e}}function sE(e){let t=e.fights.findIndex(e=>e.boss===void 0);return t<0?e.fights:e.fights.slice(0,t)}function cE(e,t){let n=sE(t),r=0;for(let t of n){if(!e.includes(t.id))break;r++}return r}function lE(e,t){let n=cE(e.cleared,t);return n>0&&n<sE(t).length}function uE(e,t,n){let r=sE(n)[t];return r?{screen:r.before?{at:`card`,fight:t,when:`before`}:{at:`fight`,fight:t},cleared:e}:{screen:{at:`end`},cleared:e}}function dE(e,t,n){let{screen:r}=e;if(t===`title`)return r.at===`title`?e:{screen:{at:`title`},cleared:e.cleared};switch(r.at){case`title`:return t===`new`?uE([],0,n):t===`continue`&&lE(e,n)?uE(e.cleared,cE(e.cleared,n),n):e;case`card`:return t===`next`?r.when===`before`?{screen:{at:`fight`,fight:r.fight},cleared:e.cleared}:uE(e.cleared,r.fight+1,n):e;case`fight`:{if(t!==`won`)return e;let i=sE(n)[r.fight];if(!i)return e;let a=new Set(e.cleared);a.add(i.id);let o=n.fights.map(e=>e.id),s=[...o.filter(e=>a.has(e)),...e.cleared.filter(e=>!o.includes(e))];return i.after?{screen:{at:`card`,fight:r.fight,when:`after`},cleared:s}:uE(s,r.fight+1,n)}case`end`:return t===`next`?{screen:{at:`title`},cleared:e.cleared}:e}}var fE=`sunder.save`,pE={version:1,cleared:[]},mE=200,hE=64;function gE(e){if(typeof e!=`object`||!e||Array.isArray(e))return pE;let t=e;if(t.version!==1||!Array.isArray(t.cleared))return pE;let n=[];for(let e of t.cleared){if(n.length>=mE)break;typeof e==`string`&&e.length<=hE&&!n.includes(e)&&n.push(e)}return{version:1,cleared:n}}function _E(e){try{let t=e();return t?gE(JSON.parse(t)):pE}catch{return pE}}function vE(e,t){try{t(JSON.stringify(e))}catch{}}await Is(document.body,{salt:`c65b305a811c3ac8`,hash:`8a7aa0133ab8e8bc1d32b836ee521e82bc6a6829c15e09a6eb217fe6fc39dbed`});var yE=SC,bE=sE(yE),xE=`daac5ba`;function SE(){return on}var CE=SE(),wE=Pt,TE=e=>ln(e?aE(CE,e):CE,wE),EE=TE(void 0),DE=()=>Date.now()&2147483647|1,OE=Co(DE(),EE),kE=!1,AE=oE(_E(()=>window.localStorage.getItem(fE)).cleared),jE,ME=!1,NE=!1,PE=0,FE=0,IE=240,LE=ds(window),RE=As(),zE={seraine:So},BE=LT(document.body,zE),VE=Ie(window),HE=Dt(VE),UE=He(VE),WE=k(VE),GE={},KE=[],qE={clip:`idle`,at:0},JE={strikeSeconds:.2,cutSeconds:.3};function YE(e,t,n){JE={strikeSeconds:t.tuning.strikeTicks/60*(n.slowmo>0?2:1),cutSeconds:t.tuning.iaiDrawTicks/60};let{sound:r}=eD();for(let t of e){if(KE.push(t),r)for(let e of ye(t,void 0))HE.play(e,JE);GE[t.type]=(GE[t.type]??0)+1}let i=js(zE,t.hero.id),a=i.shot(n,t,0,0);if(r)for(let e of i.clipSounds(qE,a))HE.play(e,JE);qE=a}var XE=iE(),ZE=xs(),QE=fs(document.body),$E;function eD(){let e=$E?.open===!0&&$E.choice.tab===`hero`&&!1;return ss($E?.choice.layers??os,e)}var tD=()=>($E?.open??!1)||!1,nD=!1;window.addEventListener(`keydown`,e=>{e.code!==`Escape`||e.repeat||us(e.target)||tD()||(nD=!0)});var rD=[{name:`whole hall`,zoom:1,subject:`hero`},{name:`close on her`,zoom:2.4,subject:`hero`},{name:`close on the Warden`,zoom:1.45,subject:`boss`}],iD=0,aD=0,oD=Ks(document.body,()=>EE,()=>js(zE,EE.hero.id).words),sD=nE(BE.frame,{sound:{get:()=>VE.settings,set:e=>VE.set(e),credits:()=>bD().tracks.map(At)},guide:oD,pad:()=>RE.status()});function cD(){XE.clear(),ZE.reset(),BE.reset(),qE={clip:`idle`,at:0},KE=[],FE=0}function lD(e,t){let n=bE[e];n&&(jE=n,EE=TE(n),OE=Co(DE(),EE),cD(),PE=t,BE.setBoss((CC(n)??bC[`throne-warden`]).text,kE?`press K to fight again`:``),!kE&&qs()&&(ME=!0,NE=!0),KE=[{type:`restart`}],NE||KE.push(uD))}var uD={type:`turn`,who:`player`};function dD(){jE=void 0,kE=!1,EE=CE,OE=Co(DE(),EE),cD(),BE.setBoss(bC[`throne-warden`].text,``)}function fD(){let{screen:e}=AE;if(e.at===`title`){let e=`Trial · ${xE}`;sD.show({kind:`title`,canContinue:lE(AE,yE),hasSave:AE.cleared.length>0,note:e})}else if(e.at===`card`){let t=bE[e.fight],n=e.when===`before`?t?.before:t?.after;sD.show(n?{kind:`card`,card:n}:void 0)}else e.at===`end`?sD.show({kind:`end`,card:yE.end}):ME?sD.show(NE?{kind:`pause`,page:`controls`}:{kind:`pause`}):sD.show(void 0)}function pD(e,t){if(e===AE)return;let n=AE;AE=e,e.cleared!==n.cleared&&vE({version:1,cleared:e.cleared},e=>window.localStorage.setItem(fE,e)),ME=!1,NE=!1,e.screen.at===`fight`?(kE=!1,lD(e.screen.fight,t)):e.screen.at===`title`&&dD(),fD()}var mD=(e,t)=>pD(dE(AE,e,yE),t);function hD(e,t){e===`resume`?(NE&&KE.push(uD),ME=!1,NE=!1,PE=t,fD()):mD(e,t)}function gD(){ME=!0,fD()}window.addEventListener(`keydown`,e=>{e.code!==`KeyM`||e.repeat||us(e.target)||VE.set({muted:!VE.settings.muted})});var _D=`opening`,vD=`open`,yD=.6;function bD(){let e=($E?.candidates??[]).map(e=>({id:e.id,title:e.title,author:e.author,licence:e.licence,source:e.source,file:e.file,gain:1})),t=[...Ot,...e.filter(e=>!Ot.some(t=>t.id===e.id))],n=jE??bE[0],r={...n?wC(n):{},...$E?.choice.music.score??{}};return{score:r,all:t,tracks:[...new Set(Object.values(r))].map(e=>kt(e,t)).filter(e=>e!==void 0)}}function xD(){let e=OE,t=w(e),n=tD(),r=!n&&AE.screen.at!==`fight`&&e.outcome===`fighting`;WE.set(r?{...t,furnace:0,heat:0}:t);let i=Te(e),{score:a,all:o}=bD(),s=$E?.open&&$E.choice.tab===`music`?$E.choice.music.hear:`fight`;_D=s===`fight`?i.stage:s,UE.play(r?void 0:kt(L(_D,a),o));let c=s===`fight`?R(i,a):{level:1,tone:`open`},l=ME&&!n?{level:c.level*yD,tone:`muffled`}:c;UE.shape(l.level,l.tone),vD=l.tone;let u=kt(L(`enraged`,a),o);u&&_D===`opening`&&UE.sounding&&UE.warm(u)}function SD(){let e=OE;return XE.save(e,{commit:xE,savedAt:new Date().toISOString(),fight:jE?.id})}var CD;$E=void 0;function wD(){let e=SD();QE(e?`Replay saved: ${ms(e)}`:`Nothing to save yet.`)}window.addEventListener(`keydown`,e=>{e.code!==`F8`||e.repeat||(e.preventDefault(),wD())});function TD(e){if($E?.choice.tab===`music`){let{score:e,all:t}=bD(),n=kt(L(_D,e),t),r=n?`${n.title}, by ${n.author}`:`nothing given to it yet`,i=n&&vD===`held`?`
Held back until the Warden is enraged.`:``,a=VE.buses?``:`
Press any key to start the sound.`;return`The ${_D}: ${r}${i}${a}`}return $E?.choice.tab===`sound`?VE.buses?`Click a sound to hear it alone.`:`Press any key to start the sound.`:``}dD(),BE.preload(EE),qy.pending>0&&(sD.setLoading(!0),qy.whenSettled().then(()=>sD.setLoading(!1))),fD();var ED=!1,DD=!1;ws({tickRate:60,tick(){let e=LE.sample()|RE.sample(),t=RE.backHeld();t&&!ED&&wD(),ED=t;let n=RE.startHeld(),r=n&&!DD;DD=n;let i=nD;nD=!1;let a=tD();if(!a){if(sD.shown){let t=sD.input(e,{back:i,start:r,scroll:RE.rightStickY()});t&&hD(t,e);return}if(AE.screen.at!==`fight`)return;if(i||r){gD();return}}PE&=e;let o=e&~PE|aD|0;aD=0;let s=!kE&&!a&&AE.screen.at===`fight`;!kE&&OE.outcome===`victory`&&(o&=~G.Confirm),XE.record(OE,o,EE),OE=Ro(OE,o,EE),YE(OE.events,EE,OE),s&&OE.outcome===`victory`&&OE.freeze===0?(FE++,FE>=IE&&mD(`won`,e)):FE=0},render(e){let t=EE,n=rD[iD]??rD[0],r=tD();sD.setVisible(!r);let i=r?void 0:sD.shown,a=eD(),o=$E?.open?{layers:{light:a.light,hits:a.hits},zoom:n.zoom,subject:n.subject,hud:!0}:i?.kind===`pause`?{passed:0}:i?{hud:!1}:void 0;for(let n of BE.render(OE,e,KE,t,o))if(a.sound)for(let e of xe(n))HE.play(e,JE);if(KE=[],CD){let e=CD;CD=void 0,BE.frame.querySelector(`canvas`)?.toBlob(e,`image/png`)}$E?.open&&$E.status(TD(n.name),void 0),xD(),oD.update(),sD.update()}});
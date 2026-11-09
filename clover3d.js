(function(){function init(){const cvs=document.getElementById('bg-3d-canvas');if(!cvs||!window.THREE)return;
const w=()=>window.innerWidth,h=()=>window.innerHeight;
const R=new THREE.WebGLRenderer({canvas:cvs,alpha:true,antialias:true,powerPreference:'high-performance'});
R.setPixelRatio(Math.min(window.devicePixelRatio||1,2));R.setSize(w(),h());R.toneMapping=THREE.ACESFilmicToneMapping;
const S=new THREE.Scene();S.fog=new THREE.FogExp2(0,0.035);
const C=new THREE.PerspectiveCamera(45,w()/h(),0.1,100);
function fitCam(){C.aspect=w()/h();C.position.z=C.aspect<1?9.2:6.8;C.updateProjectionMatrix();}
fitCam();
const ec=document.createElement('canvas');ec.width=2;ec.height=256;
const ctx=ec.getContext('2d'),g=ctx.createLinearGradient(0,0,0,256);
g.addColorStop(0,'#fff');g.addColorStop(0.35,'#888');g.addColorStop(0.7,'#222');g.addColorStop(1,'#050505');
ctx.fillStyle=g;ctx.fillRect(0,0,2,256);
const et=new THREE.CanvasTexture(ec);et.mapping=THREE.EquirectangularReflectionMapping;
const pm=new THREE.PMREMGenerator(R);S.environment=pm.fromEquirectangular(et).texture;
et.dispose();pm.dispose();
function petal(a){
const s=new THREE.Shape(),c=Math.cos(a),n=Math.sin(a),r=(x,y)=>[x*c-y*n,x*n+y*c];
s.moveTo(0,0);
const a1=r(-.8,1),a2=r(-.8,2.2),a3=r(0,1.8),b1=r(.8,2.2),b2=r(.8,1);
s.bezierCurveTo(a1[0],a1[1],a2[0],a2[1],a3[0],a3[1]);
s.bezierCurveTo(b1[0],b1[1],b2[0],b2[1],0,0);
return s;
}
const PI=Math.PI,geo=new THREE.ExtrudeGeometry([0,PI*.5,PI,PI*1.5].map(petal),{depth:.2,bevelEnabled:true,bevelSegments:1,bevelSize:.09,bevelThickness:.09,curveSegments:5});
geo.center();
const clover=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:0x1f1f1f,metalness:.85,roughness:.3,flatShading:true}));
const baseY=1.15;clover.position.set(0,baseY,0);S.add(clover);
S.add(new THREE.AmbientLight(0xffffff,1.4));
const l1=new THREE.PointLight(0x00d8ff,160,30,2);l1.position.set(-6,6,5);S.add(l1);
const l2=new THREE.PointLight(0xff2255,160,30,2);l2.position.set(6,-6,5);S.add(l2);
const lr=new THREE.PointLight(0xffffff,85,25,2);lr.position.set(0,baseY,-4.5);S.add(lr);
let tx=0,ty=0;
window.addEventListener('pointermove',e=>{tx=(e.clientX/w()-.5)*1.2;ty=(e.clientY/h()-.5)*-1.2;},{passive:true});
const prm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let act=true;
document.addEventListener('visibilitychange',()=>{act=!document.hidden;if(act&&!prm)requestAnimationFrame(loop);});
window.addEventListener('resize',()=>{fitCam();R.setSize(w(),h());if(prm)R.render(S,C);},{passive:true});
if(prm){clover.rotation.set(.3,.4,0);R.render(S,C);return;}
let clk=new THREE.Clock();
function loop(){
if(!act)return;
const t=clk.getElapsedTime();
clover.rotation.x=t*.28;clover.rotation.y=t*.42;
clover.position.y=baseY+Math.sin(t*1.1)*.22;
C.position.x+=(tx-C.position.x)*.05;
C.position.y+=(ty-C.position.y)*.05;
C.lookAt(0,baseY*.6,0);
R.render(S,C);
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
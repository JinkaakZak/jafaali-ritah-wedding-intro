import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

type CharacterProps = {
  type: 'timo' | 'lulu' | 'bobo';
  x: number;
  y: number;
  scale?: number;
  bounce?: number;
};

const characters = {
  timo: {body: '#A96F45', belly: '#D99A68', shirt: '#F4C542', accent: '#3977C8', ear: '#D99A68'},
  lulu: {body: '#F08AB6', belly: '#FFD4E7', shirt: '#36BFC5', accent: '#7B4BB7', ear: '#F08AB6'},
  bobo: {body: '#9DA7AD', belly: '#D5DBDE', shirt: '#62A94D', accent: '#E05252', ear: '#8E989E'}
};

function Character({type, x, y, scale = 1, bounce = 0}: CharacterProps) {
  const c = characters[type];
  return (
    <div style={{
      position:'absolute', left:x, top:y, transform:`translate(-50%, -50%) scale(${scale}) translateY(${bounce}px)`,
      width: type === 'bobo' ? 260 : 190, height: type === 'bobo' ? 260 : 250
    }}>
      {type === 'timo' && <><div style={{position:'absolute',left:40,top:0,width:55,height:130,background:c.body,borderRadius:'80% 80% 30% 30%',transform:'rotate(-10deg)'}}/><div style={{position:'absolute',right:40,top:0,width:55,height:130,background:c.body,borderRadius:'80% 80% 30% 30%',transform:'rotate(10deg)'}}/></>}
      <div style={{position:'absolute',left:15,top:65,width:type==='bobo'?230:160,height:type==='bobo'?180:165,background:c.body,borderRadius:'48% 48% 44% 44%',boxShadow:'0 14px 25px rgba(0,0,0,.15)'}}/>
      {type==='bobo' && <><div style={{position:'absolute',left:-20,top:65,width:75,height:130,background:c.ear,borderRadius:'50%'}}/><div style={{position:'absolute',right:-20,top:65,width:75,height:130,background:c.ear,borderRadius:'50%'}}/><div style={{position:'absolute',left:102,top:128,width:58,height:82,background:c.body,borderRadius:'45%'}}/></>}
      <div style={{position:'absolute',left:type==='bobo'?55:48,top:92,width:type==='bobo'?120:105,height:60,display:'flex',gap:25,alignItems:'center',justifyContent:'center'}}>
        <i style={{width:22,height:30,background:'#20252B',borderRadius:'50%'}}/><i style={{width:22,height:30,background:'#20252B',borderRadius:'50%'}}/>
      </div>
      <div style={{position:'absolute',left:type==='bobo'?83:70,top:145,width:type==='bobo'?65:55,height:18,borderBottom:'7px solid #7B3E45',borderRadius:'50%'}}/>
      <div style={{position:'absolute',left:type==='bobo'?65:52,top:188,width:type==='bobo'?100:105,height:type==='bobo'?75:65,background:c.shirt,borderRadius:'25px 25px 35px 35px'}}/>
      {type==='timo' && <div style={{position:'absolute',left:94,top:210,width:42,height:42,background:c.accent,borderRadius:'50%'}}/>}
      {type==='lulu' && <div style={{position:'absolute',left:112,top:8,width:48,height:28,background:c.accent,borderRadius:'50% 50% 50% 0',transform:'rotate(12deg)'}}/>}
      {type==='bobo' && <div style={{position:'absolute',left:105,top:212,width:48,height:42,background:c.accent,borderRadius:'50%'}}/>}
    </div>
  );
}

const scenes = [
  {title:'A Magical Rainbow', bg:'#A9D9FF', ground:'#79C86B', text:'Lulu! Look! A magical rainbow!', sub:'Wow! Where do you think it leads?', chars:[['timo',430,650],['lulu',690,650]]},
  {title:'Follow the Rainbow', bg:'#8FD3FF', ground:'#78C76A', text:'Did you hear that?', sub:'Let’s find out!', chars:[['timo',620,660],['lulu',850,660]]},
  {title:'Bobo Needs Help', bg:'#8BCBFF', ground:'#6EBE68', text:'My ball is over there. I can’t reach it.', sub:'Don’t worry, Bobo. Friends help friends!', chars:[['timo',420,690],['lulu',680,680],['bobo',1040,670]]},
  {title:'Teamwork', bg:'#79C3F2', ground:'#64B75F', text:'Almost there!', sub:'Together!', chars:[['timo',520,700],['lulu',770,690],['bobo',1060,680]]},
  {title:'We Did It!', bg:'#82D2FF', ground:'#70C966', text:'Thank you, friends!', sub:'Helping makes everyone happy!', chars:[['timo',520,660],['lulu',760,640],['bobo',1040,650]]},
  {title:'The Rainbow Path', bg:'#A6E2FF', ground:'#82CE70', text:'Look! The rainbow is showing us something!', sub:'Let’s follow it!', chars:[['timo',600,700],['lulu',850,690],['bobo',1100,700]]},
  {title:'The Secret Garden', bg:'#6EC9EA', ground:'#58B85B', text:'This is amazing!', sub:'Our adventure brought us here!', chars:[['timo',580,700],['lulu',820,650],['bobo',1080,690]]},
  {title:'Kindness Makes Magic', bg:'#F6B6C8', ground:'#73B85D', text:'Do you know what makes a day magical?', sub:'Kindness… and friendship!', chars:[['timo',600,700],['lulu',850,680],['bobo',1100,700]]}
] as const;

function Rainbow({bright=1}: {bright?:number}) {
  const arcs = ['#F04B4B','#F5A623','#F5D547','#55B95B','#43A9E8','#8065C7'];
  return <div style={{position:'absolute',left:'50%',top:70,width:1000,height:520,transform:'translateX(-50%)',opacity:bright}}>
    {arcs.map((color,i)=><div key={color} style={{position:'absolute',left:i*38,top:i*38,width:1000-i*76,height:520-i*76,borderRadius:'600px 600px 0 0',border:`28px solid ${color}`,borderBottom:'0 solid transparent',boxSizing:'border-box'}}/>)}
  </div>;
}

function Scene({index}:{index:number}) {
  const frame=useCurrentFrame();
  const local=frame%450;
  const scene=scenes[index];
  const fadeIn=interpolate(local,[0,24],[0,1],{extrapolateRight:'clamp'});
  const fadeOut=interpolate(local,[420,449],[1,0],{extrapolateLeft:'clamp'});
  const opacity=Math.min(fadeIn,fadeOut);
  const bounce=Math.sin(local/18)*4;
  const sunset=index===7;
  return <AbsoluteFill style={{opacity,background:scene.bg,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 50% 15%, rgba(255,255,255,.65), transparent 38%), linear-gradient(180deg, ${scene.bg} 0%, ${scene.bg} 62%, ${scene.ground} 62%, ${scene.ground} 100%)`}}/>
    <div style={{position:'absolute',left:-80,top:560,width:600,height:280,borderRadius:'50%',background:'rgba(42,135,73,.35)'}}/>
    <div style={{position:'absolute',right:-100,top:520,width:700,height:320,borderRadius:'50%',background:'rgba(42,135,73,.28)'}}/>
    <Rainbow bright={index===0||index===5||index===7?1:.45}/>
    {[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',left:180+i*340,top:330+(i%2)*70,width:12,height:12,borderRadius:'50%',background:'#fff',opacity:.7,boxShadow:'0 0 18px #fff'}}/>)}
    {scene.chars.map(([type,x,y])=><Character key={type} type={type} x={x} y={y} bounce={bounce}/>)}
    {index===2 && <div style={{position:'absolute',left:1270,top:690,width:95,height:95,borderRadius:'50%',background:'#E64C4C',boxShadow:'0 8px 12px rgba(0,0,0,.2)'}}/>}
    {index===7 && <div style={{position:'absolute',left:'50%',top:240,transform:'translateX(-50%)',width:260,height:260,borderRadius:'50%',background:'rgba(255,224,130,.5)',boxShadow:'0 0 100px rgba(255,240,170,.8)'}}/>}
    <div style={{position:'absolute',left:70,right:70,bottom:48,display:'flex',flexDirection:'column',alignItems:'center',gap:14}}>
      <div style={{fontSize:30,fontWeight:800,letterSpacing:2,textTransform:'uppercase',color:'rgba(25,55,65,.75)'}}>{scene.title}</div>
      <div style={{fontSize:42,fontWeight:800,color:'#fff',textAlign:'center',textShadow:'0 4px 12px rgba(0,0,0,.32)',background:'rgba(35,65,75,.28)',padding:'12px 28px',borderRadius:24}}>{local<225?scene.text:scene.sub}</div>
    </div>
    <div style={{position:'absolute',right:35,top:30,fontSize:22,fontWeight:700,color:'rgba(255,255,255,.9)'}}>TIMO & FRIENDS</div>
  </AbsoluteFill>;
}

export const TimoMagicRainbow: React.FC = () => {
  const frame=useCurrentFrame();
  const sceneIndex=Math.min(7,Math.floor(frame/450));
  return <Scene index={sceneIndex}/>;
};

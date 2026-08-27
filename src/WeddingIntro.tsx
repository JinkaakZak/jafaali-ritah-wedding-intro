import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';

const GOLD = '#D8B56A';
const CREAM = '#F8F1E6';
const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
const fade = (f: number, s: number, e: number) => interpolate(f, [s, s + 20, e - 20, e], [0, 1, 1, 0], clamp);

export const WeddingIntro: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / 30;
  const glow = 0.45 + Math.sin(f / 25) * 0.12;
  const scene = f < 105 ? 1 : f < 195 ? 2 : f < 285 ? 3 : f < 480 ? 4 : f < 585 ? 5 : 6;
  const sceneStart = [0, 105, 195, 285, 480, 585][scene - 1];
  const sceneEnd = [105, 195, 285, 480, 585, 690][scene - 1];
  const op = fade(f, sceneStart, sceneEnd);
  const rise = interpolate(f, [sceneStart, sceneStart + 65], [28, 0], clamp);
  const zoom = interpolate(f, [sceneStart, sceneStart + 90], [1.08, 1], clamp);
  const photos = ['/1.png', '/2.png', '/3.png', '/4.jpeg'];
  const photoIndex = Math.min(3, Math.floor(f / 90));

  return <AbsoluteFill style={{ background: '#080604', color: CREAM, fontFamily: 'Georgia, Times New Roman, serif', overflow: 'hidden' }}>
    {photos.map((src, i) => {
      const start = i * 90;
      const end = start + 120;
      const photoOpacity = fade(f, start, end);
      const photoZoom = interpolate(f, [start, end], [1.12, 1.02], clamp);
      return <AbsoluteFill key={src} style={{ opacity: photoOpacity, transform: `scale(${photoZoom})` }}><Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.55) saturate(.82) contrast(1.06)' }} /></AbsoluteFill>;
    })}

    <AbsoluteFill style={{ background: 'linear-gradient(120deg, rgba(4,3,2,.78), rgba(18,11,6,.18) 48%, rgba(3,2,1,.76))' }} />
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${50 + Math.sin(sec / 2) * 18}% ${45 + Math.cos(sec / 2.7) * 12}%, rgba(255,220,150,${glow * .25}), transparent 34%)` }} />
    <div style={{ position: 'absolute', top: -300, left: -750 + f * 11, width: 480, height: 1700, transform: 'rotate(18deg)', background: 'linear-gradient(90deg,transparent,rgba(255,224,160,.18),transparent)', filter: 'blur(25px)' }} />

    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
      const x = 6 + ((i * 19) % 88), y = 10 + ((i * 31) % 78), drift = Math.sin(f / 32 + i) * 20;
      return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 5 + (i % 4) * 3, height: 5 + (i % 4) * 3, borderRadius: '50%', background: GOLD, opacity: .2 + .22 * Math.sin(f / 18 + i), filter: 'blur(1.5px)', transform: `translate(${drift}px,${-f * (.05 + i * .006)}px)` }} />;
    })}

    <div style={{ position: 'absolute', inset: 55, border: `1px solid rgba(216,181,106,.38)` }} />
    <AbsoluteFill style={{ background: 'radial-gradient(circle,transparent 18%,rgba(0,0,0,.18) 58%,rgba(0,0,0,.82) 100%)' }} />

    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 120 }}>
      {scene === 1 && <div style={{ opacity: op, transform: `translateY(${rise}px) scale(${zoom})`, fontSize: 84, fontStyle: 'italic' }}>Two hearts…</div>}
      {scene === 2 && <div style={{ opacity: op, transform: `translateY(${rise}px) scale(${zoom})`, fontSize: 74, fontStyle: 'italic' }}>One beautiful journey…</div>}
      {scene === 3 && <div style={{ opacity: op, transform: `scale(${zoom})`, fontFamily: 'Arial, sans-serif', fontSize: 43, letterSpacing: 12 }}>THE MARRIAGE CELEBRATIONS OF</div>}
      {scene === 4 && <div style={{ opacity: op, transform: `translateY(${rise}px) scale(${zoom})`, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
        <div style={{ fontSize: 88, letterSpacing: 4 }}>JAFAALI SUUNA NKATA</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, color: GOLD }}><div style={{ width: 100, height: 1, background: GOLD }} /><div style={{ fontSize: 50, fontStyle: 'italic' }}>&</div><div style={{ width: 100, height: 1, background: GOLD }} /></div>
        <div style={{ fontSize: 88, letterSpacing: 4 }}>RITAH BIRUNGI</div>
      </div>}
      {scene === 5 && <div style={{ opacity: op, transform: `translateY(${rise}px)`, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 50, letterSpacing: 9 }}>14TH AUGUST 2026</div>
        <div style={{ width: interpolate(f, [480, 555], [0, 440], clamp), height: 2, background: GOLD }} />
      </div>}
      {scene === 6 && <div style={{ opacity: op, transform: `translateY(${rise}px)`, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
        <div style={{ fontSize: 70, letterSpacing: 11 }}>KIWATULE</div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 31, letterSpacing: 3 }}>Mr. & Mrs. Nkata’s Home</div>
      </div>}
    </AbsoluteFill>
    <div style={{ position: 'absolute', bottom: 35, left: 0, right: 0, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 13, letterSpacing: 6, opacity: .32 }}>A WEDDING FILM</div>
  </AbsoluteFill>;
};

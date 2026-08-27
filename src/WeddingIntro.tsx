import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const cream = '#F6F0E6';
const gold = '#D7B56D';

const fade = (frame: number, start: number, end: number) => interpolate(frame, [start, start + 18, end - 18, end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

export const WeddingIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = fade(frame, Math.floor(frame / 90) * 90, Math.floor(frame / 90) * 90 + 90);
  const base = { opacity, textAlign: 'center' as const };

  return <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 45%, #2a2117 0%, #0b0907 70%)', color: cream, fontFamily: 'Georgia, Times New Roman, serif', overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 50%, rgba(215,181,109,.18), transparent 40%)' }} />
    <div style={{ position: 'absolute', left: 150, right: 150, top: 78, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, opacity: .7 }} />
    <div style={{ position: 'absolute', left: 150, right: 150, bottom: 78, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, opacity: .7 }} />

    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
      {frame < 90 && <div style={{ ...base, fontSize: 72, fontStyle: 'italic' }}>Two hearts…</div>}
      {frame >= 90 && frame < 180 && <div style={{ ...base, fontSize: 68, fontStyle: 'italic' }}>One beautiful journey…</div>}
      {frame >= 180 && frame < 270 && <div style={{ ...base, fontFamily: 'Arial, sans-serif', fontSize: 42, letterSpacing: 9 }}>THE MARRIAGE CELEBRATIONS OF</div>}
      {frame >= 270 && frame < 450 && <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 22 }}><div style={{ fontSize: 78, letterSpacing: 3 }}>JAFAALI SUUNA NKATA</div><div style={{ fontSize: 48, color: gold, fontStyle: 'italic' }}>&</div><div style={{ fontSize: 78, letterSpacing: 3 }}>RITAH BIRUNGI</div></div>}
      {frame >= 450 && frame < 540 && <div style={{ ...base, fontFamily: 'Arial, sans-serif', fontSize: 48, letterSpacing: 7 }}>14TH AUGUST 2026</div>}
      {frame >= 540 && <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 18 }}><div style={{ fontSize: 60, letterSpacing: 8 }}>KIWATULE</div><div style={{ fontFamily: 'Arial, sans-serif', fontSize: 28, letterSpacing: 3 }}>Mr. & Mrs. Nkata’s Home</div></div>}
    </AbsoluteFill>
    <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 14, letterSpacing: 5, opacity: .35 }}>A WEDDING FILM</div>
  </AbsoluteFill>;
};

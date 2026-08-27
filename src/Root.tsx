import React from 'react';
import { Composition } from 'remotion';
import { WeddingIntro } from './WeddingIntro';

export const RemotionRoot: React.FC = () => (
  <Composition id="WeddingIntro" component={WeddingIntro} durationInFrames={690} fps={30} width={1920} height={1080} />
);

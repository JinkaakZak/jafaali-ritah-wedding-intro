import {Composition, registerRoot} from 'remotion';
import {TimoMagicRainbow} from './TimoMagicRainbow';

export const RemotionRoot = () => (
  <Composition
    id="TimoMagicRainbow"
    component={TimoMagicRainbow}
    durationInFrames={3600}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);

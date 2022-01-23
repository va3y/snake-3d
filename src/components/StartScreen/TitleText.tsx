import React, { useMemo, useRef } from "react";
import { extend, TextGeometryProps, useFrame, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import fontUrl from "assets/fonts/Pixeboy_Regular.blob";
import { Mesh } from "three";
import { useTurntable } from "hooks/useTurntable";
import { useSpring, animated, config } from "@react-spring/three";

extend({ TextGeometry });

const TitleText: React.FC = ({ children, ...props }) => {
  const font = useLoader(FontLoader, fontUrl);
  const fontConfig = useMemo<TextGeometryProps>(
    () => ({
      font,
      size: 12,
      height: 2,
    }),
    [font]
  );
  const mesh = useRef<Mesh<TextGeometry>>(null);

  useFrame(() => {
    if (!mesh?.current) return;
    mesh.current.geometry.center();
  });
  const turntableRef = useTurntable();
  const { scale } = useSpring({
    from: { scale: 0.5 },
    to: { scale: 1 },
    config: config.wobbly,
    loop: { reverse: true },
    delay: 200,
  });

  return (
    <group ref={turntableRef}>
      <animated.mesh scale={scale}>
        <mesh {...props} ref={mesh}>
          <textGeometry args={[children, fontConfig]} />
          <meshNormalMaterial />
        </mesh>
      </animated.mesh>
    </group>
  );
};

export default TitleText;

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GameCanvas: React.FC = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 35, 0] }}>
      <ambientLight intensity={2} />
      {children}
      <gridHelper args={[30, 30]} />
    </Canvas>
  );
};

export default GameCanvas;

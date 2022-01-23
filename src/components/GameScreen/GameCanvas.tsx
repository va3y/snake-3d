import { Canvas } from "@react-three/fiber";

const GameCanvas: React.FC = ({ children }) => {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      {children}
    </Canvas>
  );
};

export default GameCanvas;

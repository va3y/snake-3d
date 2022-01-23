import { Canvas } from "@react-three/fiber";

const GameCanvas: React.FC = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 35, 0] }}>
      <ambientLight intensity={2} />
      {children}
    </Canvas>
  );
};

export default GameCanvas;

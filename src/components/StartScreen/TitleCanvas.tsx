import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const TitleCanvas: React.FC = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      {children}
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
      />
    </Canvas>
  );
};

export default TitleCanvas;

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Snake from "./Snake";
import Grid from "./Grid";
import { GridHelper } from "three";
import { extend, Object3DNode } from "@react-three/fiber";
// Create our custom element
class CustomElement extends GridHelper {}

// Extend so the reconciler will learn about it
extend({ CustomElement });

// Add types to JSX.Intrinsic elements so primitives pick up on it
declare global {
  namespace JSX {
    interface IntrinsicElements {
      customElement: Object3DNode<CustomElement, typeof CustomElement>;
    }
  }
}

const GameCanvas: React.FC = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <Snake />
      <Grid size={30} />
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      <gridHelper args={[30, 30]} />
    </Canvas>
  );
};

export default GameCanvas;

import { MeshProps } from "@react-three/fiber";
import { forwardRef } from "react";

const SnakeBlock: React.FC<MeshProps> = forwardRef((props, ref) => {
  return (
    <mesh {...props} ref={ref}>
      <meshPhongMaterial attach="material" color="#ff0000" />
      <boxGeometry />
    </mesh>
  );
});

export default SnakeBlock;

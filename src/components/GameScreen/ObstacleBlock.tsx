import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

const ObstacleBlock: React.FC<{ position: Vector3 }> = (props) => {
  return (
    <Box {...props}>
      <meshPhongMaterial attach="material" color="#f3f3f3" />
    </Box>
  );
};

export default ObstacleBlock;

import { Vector3 } from "@react-three/fiber";
import ObstacleBlock from "./ObstacleBlock";

interface GridProps {
  size: number;
}

const Grid: React.FC<GridProps> = ({ size = 10 }) => {
  const height = 0;
  const offset = size / 2 - 0.5;
  const vecArr: Vector3[] = [];
  for (let i = 0; i < size; i++) {
    vecArr.push([i - offset, height, offset]);
    vecArr.push([i - offset, height, -offset]);
    vecArr.push([offset, height, offset - i]);
    vecArr.push([-offset, height, i - offset]);
  }
  return (
    <>
      {vecArr.map((vec, i) => (
        <ObstacleBlock key={i} position={vec} />
      ))}
    </>
  );
};

export default Grid;

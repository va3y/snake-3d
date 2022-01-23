import { Vector3 } from "@react-three/fiber";
import ObstacleBlock from "./Blocks/ObstacleBlock";

const Board: React.FC<{ boardSize: number }> = ({ boardSize }) => {
  const height = 0;
  const offset = boardSize / 2 - 0.5;
  const vecArr: Vector3[] = [];
  for (let i = 0; i < boardSize; i++) {
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

export default Board;

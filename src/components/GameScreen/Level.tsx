import * as THREE from "three";
import { useEffect, useRef } from "react";
import { InstancedMesh } from "three";
import { Coordinate } from "hooks/useSnake/types";

const tempObject3D = new THREE.Object3D();
const tempColor = new THREE.Color();
const height = 0;

const Level: React.FC<{ boardSize: number; obstacleBlocks: Coordinate[] }> = ({ boardSize, obstacleBlocks }) => {
  const ref = useRef<InstancedMesh>();

  useEffect(() => {
    if (!ref.current) return;

    let count = 0;
    const createBlock = (x: number, y: number) => {
      if (!ref.current) return;
      tempObject3D.position.set(x, height, y);
      tempObject3D.updateMatrix();
      ref.current.setColorAt(count, tempColor.set(count % 2 ? 0x098898 : 0xffffff));
      ref.current.setMatrixAt(count, tempObject3D.matrix);
      count++;
    };

    for (let x = -1; x < boardSize + 2; x++) {
      createBlock(x, boardSize + 1);
    }
    for (let x = 0; x < boardSize + 1; x++) {
      createBlock(x, -1);
    }
    for (let y = -1; y < boardSize + 1; y++) {
      createBlock(boardSize + 1, y);
    }
    for (let y = -1; y < boardSize + 1; y++) {
      createBlock(-1, y);
    }

    obstacleBlocks.forEach(([x, y]) => createBlock(x, y));
    // ref.current.instanceMatrix.needsUpdate = true;
    // ref.current.instanceColor && (ref.current.instanceColor.needsUpdate = true);
  }, [boardSize, obstacleBlocks]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, (boardSize + 2) * 4 + obstacleBlocks.length]}>
      <boxBufferGeometry />
    </instancedMesh>
  );
};

export default Level;

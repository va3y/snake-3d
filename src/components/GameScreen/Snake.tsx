import { useFrame, Vector3 } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mesh } from "three";

import * as THREE from "three";
import SnakeBlock from "./SnakeBlock";

interface SnakeProps {
  speed?: number;
}

const Snake: React.FC<SnakeProps> = ({ speed = 0.05 }) => {
  const moveDirections = useMemo(
    () => ({
      up: new THREE.Vector3(1 * speed, 0, 0),
      down: new THREE.Vector3(-1 * speed, 0, 0),
      left: new THREE.Vector3(0, 0, -1 * speed),
      right: new THREE.Vector3(0, 0, 1 * speed),
    }),
    [speed]
  );
  const [moveDir, setMoveDir] = useState<Vector3>(moveDirections.up);
  const [userMoveDir, setUserMoveDir] = useState<Vector3>(moveDirections.up);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "KeyW") setUserMoveDir(moveDirections.up);
      if (e.code === "KeyS") setUserMoveDir(moveDirections.down);
      if (e.code === "KeyA") setUserMoveDir(moveDirections.left);
      if (e.code === "KeyD") setUserMoveDir(moveDirections.right);
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [moveDirections]);

  const snakeRef = useRef<Mesh>();
  useFrame((state) => {
    if (moveDir && snakeRef?.current) {
      if (snakeRef.current.position.x % 1 < 0.09 && snakeRef.current.position.y % 1 < 0.09) {
        snakeRef.current.position.round();
        setMoveDir(userMoveDir);
      }

      snakeRef.current.position.add(moveDir as THREE.Vector3);
    }
  });

  return <SnakeBlock ref={snakeRef} />;
};

export default Snake;

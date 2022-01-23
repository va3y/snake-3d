import { CameraShake, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { Mesh, PerspectiveCamera as PerspectiveCameraImpl } from "three";
import * as THREE from "three";
import { Direction } from "hooks/useSnake/types";

interface ThirdPersonCameraProps {
  firstSnakeBlockRef?: MutableRefObject<Mesh | undefined>;
  direction: MutableRefObject<Direction>;
}

const ThirdPersonCamera: React.FC<ThirdPersonCameraProps> = ({ firstSnakeBlockRef, direction }) => {
  const ref = useRef<PerspectiveCameraImpl>();
  useThree(({ camera }) => {
    // rotate the cam, so up is up
    camera.position.y = 20;
    // camera.position.z = 0;
    // camera.position.x = 0;
  });

  useFrame(({ camera }) => {
    if (!firstSnakeBlockRef?.current || !direction.current) return;
    const offset = 15;
    const speed = 0.005;

    firstSnakeBlockRef.current.updateMatrixWorld();
    camera.updateMatrixWorld();

    const { x: currX, z: currZ } = camera.position;
    const { x: headX, z: headZ, y: headY } = firstSnakeBlockRef.current.position;

    let targetX = headX;
    let targetZ = headZ;
    if (direction.current === "up") {
      targetZ = headZ - offset;
    }
    if (direction.current === "down") {
      targetZ = headZ + offset;
    }

    if (direction.current === "left") {
      targetX = headX - offset;
    }

    if (direction.current === "right") {
      targetX = headX + offset;
    }

    camera.position.z = THREE.MathUtils.lerp(currZ, targetZ, speed);
    camera.position.x = THREE.MathUtils.lerp(currX, targetX, speed);

    const { x, y, z } = camera.rotation;
    camera.rotation.x = 1;
    camera.rotation.y = THREE.MathUtils.lerp(headY, y, speed);
    camera.rotation.z = THREE.MathUtils.lerp(headZ, z, speed);

    // camera.lookAt(firstSnakeBlockRef.current.position);
    camera.updateMatrix();
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
  });

  return (
    <PerspectiveCamera makeDefault ref={ref}>
      <mesh />
    </PerspectiveCamera>
  );
};

export default ThirdPersonCamera;

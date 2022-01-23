import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const BirdEyeCamera: React.FC<{ boardSize: number }> = ({ boardSize, children }) => {
  const fov = useRef(100);
  const height = useRef(30);

  useThree(({ camera }) => {
    // rotate the cam, so up is up
    camera.rotation.z = Math.PI;
    camera.position.x = boardSize / 2;
    camera.position.y = height.current;
    camera.position.z = boardSize / 2;
    camera.lookAt(boardSize / 2, 0, boardSize / 2);
  });

  useEffect(() => {
    const onResize = () => {
      //   const newFov = (250 / window.innerWidth) * 360;
      //   console.log(newFov);
      //   // fov.current = newFov;
      //   fov.current = newFov;
    };
    // window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <PerspectiveCamera fov={fov.current} makeDefault></PerspectiveCamera>
      {children}
    </>
  );
};

export default BirdEyeCamera;

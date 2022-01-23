import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const BirdEyeCamera: React.FC<{ boardSize: number }> = ({ boardSize, children }) => {
  useThree(({ camera }) => {
    // rotate the cam, so up is up
    camera.lookAt(boardSize / 2, 0, boardSize / 2);
    camera.rotation.z = Math.PI;
    camera.position.x = boardSize / 2;
    camera.position.y = 20;
    camera.position.z = boardSize / 2;
  });

  return <PerspectiveCamera fov={80 + boardSize * 1.5} makeDefault />;
};

export default BirdEyeCamera;

import { useThree } from "@react-three/fiber";

const BirdEyeCamera: React.FC<{ boardSize: number }> = ({ boardSize }) => {
  useThree(({ camera }) => {
    // rotate the cam, so up is up
    camera.rotation.z = Math.PI;
    camera.position.x = boardSize / 2;
    camera.position.z = boardSize / 2;
  });

  return <></>;
};

export default BirdEyeCamera;

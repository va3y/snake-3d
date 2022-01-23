import { useGLTF } from "@react-three/drei";
import { useTurntable } from "hooks/useTurntable";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useTurntable();

  // current issue with useGLTF typings https://github.com/pmndrs/drei/issues/469
  const { nodes } = useGLTF(process.env.PUBLIC_URL + "/models/banana.glb") as any;
  return (
    <group ref={group} {...props} scale={0.3}>
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry}>
        <meshPhongMaterial attach="material" color="#ff7135" />
      </mesh>
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/models/banana.glb");

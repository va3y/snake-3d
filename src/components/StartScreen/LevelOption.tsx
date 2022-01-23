import { Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Level from "components/GameScreen/Level";
import InputRadio from "components/UI/InputRadio";
import { Coordinate } from "hooks/useSnake/types";

interface LevelOptionsProps {
  obstacleBlocks: Coordinate[];
  title: string;
  id: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
  record: number;
}

const LevelOption: React.FC<LevelOptionsProps> = ({
  obstacleBlocks,
  title,
  id,
  name,
  defaultChecked,
  value,
  record,
}) => {
  return (
    <InputRadio
      id={id}
      defaultChecked={defaultChecked}
      name={name}
      value={value}
      inputClass="appearance-none"
      labelClass="peer-checked:bg-blue-100 rounded-xl border-2 border-transparent h-32 transition transition-background flex flex-col items-center justify-center text-base w-full pl-0"
    >
      <Canvas>
        <Center scale={0.15}>
          <group position={[-10, 0, -10]}>
            <Level obstacleBlocks={obstacleBlocks} boardSize={20} />
          </group>
          <OrbitControls
            autoRotate
            autoRotateSpeed={5}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 6}
            enablePan={false}
            enableZoom={false}
          />
        </Center>
      </Canvas>
      {title}
      <div className="text-sm">best score: {record}</div>
    </InputRadio>
  );
};

export default LevelOption;

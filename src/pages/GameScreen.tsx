import GameCanvas from "components/GameScreen/GameCanvas";
import FoodBlock from "components/GameScreen/Blocks/FoodBlock";
import Level from "components/GameScreen/Level";
import SnakeBlock from "components/GameScreen/Blocks/SnakeBlock";
import useSnake from "hooks/useSnake";
import useControls from "hooks/useControls";
import Modal from "components/UI/Modal";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_BOARD_SIZE, DEFAULT_CAMERA_MODE } from "helpers/constants";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import BirdEyeCamera from "components/GameScreen/Cameras/BirdEyeCamera";
import ThirdPersonCamera from "components/GameScreen/Cameras/ThirdPersonCamera";
import Button from "components/UI/Button";
import { level1, levelNames } from "hooks/useSnake/levels";
import { useLocalStorage } from "react-use";
import { defaultRecordsState, lskeys } from "helpers/ls";

export enum CameraMode {
  BirdEye,
  ThirdPerson,
}

const StartScreen: React.FC = () => {
  const location = useLocation();
  const state = location.state as { boardSize: number; cameraMode: CameraMode; levelSelect: string };
  const boardSize = state?.boardSize ?? DEFAULT_BOARD_SIZE;
  const cameraMode = state?.cameraMode ?? DEFAULT_CAMERA_MODE;
  const levelName = state?.levelSelect ?? "level1";
  const level = levelNames[levelName](boardSize);

  const { snake, food, changeDirection, alive, reset, direction, score } = useSnake(boardSize, level);
  useControls(changeDirection);

  const [record, setRecord] = useLocalStorage(lskeys.records, defaultRecordsState);

  useEffect(() => {
    if (record && score > record[levelName])
      setRecord(() => ({
        ...record,
        [levelName]: score,
      }));
  }, [record, score, setRecord, levelName]);

  const firstSnakeBlockRef = useRef<Mesh>();

  return (
    <div className="h-screen flex flex-col items-center">
      <Link to="/" className="text-xl absolute left-5 top-5 z-10">
        <Button>&lt;- Go back</Button>
      </Link>
      <div className="absolute top-20 text-3xl left-5">
        Current score: {score} <br />
        Best score: {record && record[levelName]}
      </div>
      <GameCanvas>
        <Level obstacleBlocks={level.obstacleBlocks} boardSize={boardSize} />
        {snake.map(([x, y], i) => {
          if (i === 0) return <SnakeBlock ref={firstSnakeBlockRef} key={`${x}${y}`} position={[x, 0, y]} />;
          return <SnakeBlock key={`${x}${y}`} position={[x, 0, y]} />;
        })}
        {food && <FoodBlock position={[food[0], 0, food[1]]} />}
        {cameraMode === CameraMode.BirdEye && <BirdEyeCamera boardSize={boardSize} />}
        {cameraMode === CameraMode.ThirdPerson && (
          <ThirdPersonCamera firstSnakeBlockRef={firstSnakeBlockRef} direction={direction} />
        )}
        <gridHelper args={[boardSize + 2, boardSize + 2]} position={[boardSize / 2 - 0.5, -0.5, boardSize / 2 - 0.5]} />
      </GameCanvas>
      {!alive && (
        <Modal titleText="You lost">
          <div className="flex justify-center">
            <Link to="/" className="mr-4">
              <Button>Go back</Button>
            </Link>
            <Button onClick={reset}>Try again</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StartScreen;

import TitleCanvas from "../components/StartScreen/TitleCanvas";
import { lazy, Suspense } from "react";
import InputRange from "components/UI/InputRange";
import Button from "components/UI/Button";
import { useNavigate } from "react-router-dom";
import InputRadio from "components/UI/InputRadio";
import { CameraMode } from "./GameScreen";
import LevelSelector from "components/StartScreen/LevelSelector";

const TitleText = lazy(() => import("../components/StartScreen/TitleText"));

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto flex flex-col pb-10 text-3xl">
      <div className="flex-1 w-full max-h-80">
        <TitleCanvas>
          <Suspense fallback={null}>
            <TitleText>Snake 3D</TitleText>
          </Suspense>
        </TitleCanvas>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
            boardSize: { value: string };
            cameraMode: { value: string };
            levelSelect: { value: string };
          };
          let cameraMode;
          if (formElements.cameraMode.value === "birdEye") cameraMode = CameraMode.BirdEye;
          if (formElements.cameraMode.value === "thirdPerson") cameraMode = CameraMode.ThirdPerson;
          navigate("game", {
            state: {
              boardSize: parseInt(formElements.boardSize.value),
              cameraMode,
              levelSelect: formElements.levelSelect.value,
            },
          });
        }}
        className="flex flex-col items-center"
      >
        <div className="py-8">Menu</div>
        <InputRange className="mb-16 max-w-xs" id="boardSize" label="Board size: " min="10" max="30" step="5">
          <InputRange.Item>10</InputRange.Item>
          <InputRange.Item>15</InputRange.Item>
          <InputRange.Item>20</InputRange.Item>
          <InputRange.Item>25</InputRange.Item>
          <InputRange.Item>30</InputRange.Item>
        </InputRange>
        Levels:
        <LevelSelector />
        Camera mode:
        <div className="flex flex-col items-start text-xl my-2 ">
          <InputRadio name="cameraMode" id="birdEye" value="birdEye" defaultChecked>
            🐦 Bird-eye
          </InputRadio>
          <InputRadio name="cameraMode" id="thirdPerson" value="thirdPerson">
            🎥 Third person
          </InputRadio>
        </div>
        <Button className="mt-8" type="submit">
          Start game
        </Button>
      </form>
    </div>
  );
};

export default StartScreen;

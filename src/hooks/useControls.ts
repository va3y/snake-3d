import { useSwipeable } from "react-swipeable";
import { RefObject, useCallback, useEffect } from "react";
import { Direction } from "./useSnake/types";
import { CameraMode } from "pages/GameScreen";

export default function useControls(
  changeDirection: (arg1: Direction) => void,
  cameraMode: CameraMode,
  currentDirection: RefObject<Direction>
) {
  const handleCamera = useCallback(
    (direction: Direction): Direction => {
      if (cameraMode === CameraMode.BirdEye) return direction;

      //  more intuitive to discard up/down events with 3rd person cam
      if (direction === "up" || direction === "down") return currentDirection.current || "up";

      if (currentDirection.current === "up") return direction;

      if (direction === "left") {
        if (currentDirection.current === "left") return "down";
        if (currentDirection.current === "down") return "right";
        if (currentDirection.current === "right") return "up";
      }

      if (direction === "right") {
        if (currentDirection.current === "left") return "up";
        if (currentDirection.current === "down") return "left";
        if (currentDirection.current === "right") return "down";
      }

      return "up";
    },
    [cameraMode, currentDirection]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "KeyW") changeDirection(handleCamera("up"));
      if (e.code === "KeyS") changeDirection(handleCamera("down"));
      if (e.code === "KeyA") changeDirection(handleCamera("left"));
      if (e.code === "KeyD") changeDirection(handleCamera("right"));
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [changeDirection, handleCamera]);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => changeDirection(handleCamera("up")),
    onSwipedDown: () => changeDirection(handleCamera("down")),
    onSwipedLeft: () => changeDirection(handleCamera("left")),
    onSwipedRight: () => changeDirection(handleCamera("right")),
    trackMouse: true,
  });

  return { swipeHandlers };
}

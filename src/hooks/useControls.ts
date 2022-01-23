import { useEffect } from "react";
import { Direction } from "./useSnake/types";

export default function useControls(changeDirection: (arg1: Direction) => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "KeyW") changeDirection("up");
      if (e.code === "KeyS") changeDirection("down");
      if (e.code === "KeyA") changeDirection("left");
      if (e.code === "KeyD") changeDirection("right");
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [changeDirection]);
}

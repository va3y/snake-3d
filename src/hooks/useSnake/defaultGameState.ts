import randomIntInRange from "helpers/randomIntInRange";
import { GameState } from "./types";

export default function defaultGameState(boardSize: number): GameState {
  const startSnakePos = randomIntInRange(0, boardSize - 1);

  return {
    snake: [[startSnakePos, startSnakePos]],
    snakeMap: {
      [startSnakePos]: {
        [startSnakePos]: true,
      },
    },
    alive: true,
    food: null,
    score: 0,
  };
}

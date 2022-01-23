import randomIntInRange from "helpers/randomIntInRange";
import useInterval from "../useInterval";
import { useReducer, useRef, useCallback } from "react";
import { addToSnakeMap, isEqualCoordinates, isOppositeDirections, removeFromSnakeMap } from "./utils";
import { Coordinate, Direction, GameState, Level } from "./types";
import defaultGameState from "./defaultGameState";
import { DEFAULT_SNAKE_SPEED } from "helpers/constants";
import cloneDeep from "lodash.clonedeep";

const offsets = {
  up: [0, 1],
  down: [0, -1],
  left: [1, 0],
  right: [-1, 0],
} as Record<Direction, Coordinate>;

enum ActionType {
  GameTick,
  Reset,
}

export default function useSnake(boardSize: number, level: Level) {
  const direction = useRef<Direction>("up");
  const changeDirection = useCallback(
    (dir: Direction) => {
      if (isOppositeDirections(dir, direction.current)) return;
      direction.current = dir;
    },
    [direction]
  );
  const reset = useCallback(() => dispatchGame(ActionType.Reset), []);

  const speedRef = useRef(DEFAULT_SNAKE_SPEED);
  useInterval(() => {
    dispatchGame(ActionType.GameTick);
  }, speedRef.current);

  const gameTick = (gameState: GameState): GameState => {
    const [[oldHeadX, oldHeadY]] = gameState.snake;
    const [offsetX, offsetY] = offsets[direction.current];
    const newHead = [oldHeadX + offsetX, oldHeadY + offsetY] as Coordinate;

    const isValidBlock = ([x, y]: Coordinate) => {
      if ([x, y].some((coord) => coord < 0 || coord > boardSize)) return false;
      if (gameState.snakeMap[x] && gameState.snakeMap[x][y]) return false;
      if (level.levelMap[x] && level.levelMap[x][y]) return false;

      return true;
    };

    if (!isValidBlock(newHead)) {
      gameState.alive = false;
      speedRef.current = DEFAULT_SNAKE_SPEED;
      return gameState;
    }
    gameState.snake = [newHead, ...gameState.snake];
    addToSnakeMap(gameState.snakeMap, newHead);

    if (gameState.food && isEqualCoordinates(gameState.food, newHead)) {
      gameState.score++;
      speedRef.current = Math.max(speedRef.current * 0.9, 100);
      gameState.food = null;
      return gameState;
    }

    const tail = gameState.snake.pop();
    tail && removeFromSnakeMap(gameState.snakeMap, tail);

    if (!gameState.food && Math.random() < 1 / 3) {
      const spawnFood = () => {
        const [rndX, rndY] = [randomIntInRange(0, boardSize), randomIntInRange(0, boardSize)];
        if (isValidBlock([rndX, rndY])) {
          gameState.food = [rndX, rndY];
          return;
        }
        spawnFood();
      };
      spawnFood();
    }
    return gameState;
  };

  const [game, dispatchGame] = useReducer((gameState: GameState, actionType: ActionType) => {
    if (actionType === ActionType.Reset) return defaultGameState(boardSize);
    if (actionType === ActionType.GameTick) return gameTick(cloneDeep(gameState));
    return gameState;
  }, defaultGameState(boardSize));

  return {
    changeDirection,
    direction,
    reset,
    ...game,
  };
}

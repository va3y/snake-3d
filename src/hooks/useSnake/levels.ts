import { Coordinate, Level, SnakeMap } from "./types";
import { addToSnakeMap } from "./utils";

export const level1 = (boardSize: number): Level => {
  return {
    obstacleBlocks: [],
    levelMap: [],
  };
};

export const level2 = (boardSize: number): Level => {
  const obstacleBlocks: Coordinate[] = [];
  const levelMap: SnakeMap = [];
  const middle = Math.floor(boardSize / 2);
  const offset = Math.floor(boardSize * 0.2);

  for (let i = offset; i <= boardSize - offset; i++) {
    obstacleBlocks.push([i, middle]);
    obstacleBlocks.push([middle, i]);
    addToSnakeMap(levelMap, [i, middle]);
    addToSnakeMap(levelMap, [middle, i]);
  }

  return {
    obstacleBlocks,
    levelMap,
  };
};

export const level3 = (boardSize: number): Level => {
  const obstacleBlocks: Coordinate[] = [];
  const levelMap: SnakeMap = [];
  const quater = Math.floor(boardSize / 4);
  const middle = Math.floor(boardSize / 2);

  for (let i = quater; i <= boardSize - quater; i++) {
    if (i > middle - 2 && i < middle + 2) continue;

    obstacleBlocks.push([i, quater]);
    obstacleBlocks.push([quater, i]);
    obstacleBlocks.push([i, boardSize - quater]);
    obstacleBlocks.push([boardSize - quater, i]);

    addToSnakeMap(levelMap, [i, quater]);
    addToSnakeMap(levelMap, [quater, i]);
    addToSnakeMap(levelMap, [i, boardSize - quater]);
    addToSnakeMap(levelMap, [boardSize - quater, i]);
  }

  return {
    obstacleBlocks,
    levelMap,
  };
};

export const level4 = (boardSize: number): Level => {
  const obstacleBlocks: Coordinate[] = [];
  const levelMap: SnakeMap = [];
  const middle = Math.floor(boardSize / 2);
  const offset = Math.floor(boardSize * 0.2);
  for (let i = offset; i < boardSize - offset; i++) {
    if (i > middle - 2 && i < middle + 2) continue;
    obstacleBlocks.push([i, i + offset]);
    obstacleBlocks.push([boardSize - i, boardSize - i - offset]);

    addToSnakeMap(levelMap, [i, i + offset]);
    addToSnakeMap(levelMap, [boardSize - i, boardSize - i - offset]);
  }

  return {
    obstacleBlocks,
    levelMap,
  };
};

export const levelNames = {
  level1: level1,
  level2: level2,
  level3: level3,
  level4: level4,
} as Record<string, (boardSize: number) => Level>;

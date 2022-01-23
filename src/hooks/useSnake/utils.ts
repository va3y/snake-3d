import { Coordinate, Direction, SnakeMap } from "./types";

export const isEqualCoordinates = (a: Coordinate, b: Coordinate) => a[0] === b[0] && a[1] === b[1];

export const isOppositeDirections = (a: Direction, b: Direction) => {
  const oppositeDirection = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  } as Record<Direction, Direction>;

  return oppositeDirection[a] === b;
};

export const addToSnakeMap = (map: SnakeMap, [x, y]: Coordinate) => {
  map[x] = map[x] || {};
  map[x][y] = true;
};

export const removeFromSnakeMap = (map: SnakeMap, [x, y]: Coordinate) => {
  const row = map[x];
  delete row[y];
};

export type Coordinate = [number, number];

export type SnakeMap = {
  [key: number]: {
    [key: number]: true;
  };
};

export type GameState = {
  alive: boolean;
  snake: Coordinate[];
  snakeMap: SnakeMap;
  food: Coordinate | null;
  score: number;
};

export type Level = {
  obstacleBlocks: Coordinate[];
  levelMap: SnakeMap;
};

export type Direction = "up" | "down" | "left" | "right";

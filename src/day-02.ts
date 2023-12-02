import { EOL, strToNum } from "./lib/utils";

type Set = {
  blue: number;
  red: number;
  green: number;
  [index: string]: number;
};

type Game = {
  id: number;
  sets: Set[];
};

type PowerSet = Set & {
  power: number;
};

function calculateSetPower(set: Set): PowerSet {
  return { ...set, power: set.red * set.blue * set.green };
}

function findMinimumSetReducer(minimum: Set, set: Set): Set {
  if (set.red > minimum.red) minimum.red = set.red;
  if (set.blue > minimum.blue) minimum.blue = set.blue;
  if (set.green > minimum.green) minimum.green = set.green;
  return minimum;
}

function isSetPossible(set: Set): boolean {
  return set.red <= 12 && set.blue <= 14 && set.green <= 13;
}

function parseGame(line: string, ix: number): Game {
  return {
    id: ix + 1,
    sets: line
      .substring(line.indexOf(":") + 1)
      .split(";")
      .map(parseSet),
  };
}

function parseSet(str: string): Set {
  const set: Set = { red: 0, green: 0, blue: 0 };
  const cubes = str.split(",").map((s): [number, string] => {
    const parts = s.trim().split(" ");
    return [strToNum(parts[0]), parts[1]];
  });
  for (let [count, color] of cubes) {
    set[color] = count;
  }
  return set;
}

function solvePart1(input: Game[]): number {
  return input.filter((game) => game.sets.every(isSetPossible)).reduce((result, game) => result + game.id, 0);
}

function solvePart2(input: Game[]): number {
  return input
    .map((game) =>
      calculateSetPower(
        game.sets.reduce(findMinimumSetReducer, {
          red: Number.MIN_VALUE,
          blue: Number.MIN_VALUE,
          green: Number.MIN_VALUE,
        })
      )
    )
    .reduce((result, set) => (result += set.power), 0);
}

export default async (input: string) => {
  const data = input.split(EOL).map(parseGame);

  console.log(`Part 1: The result is: ${solvePart1(data)}`); // 2512 is correct
  console.log(`Part 2: The result is: ${solvePart2(data)}`); // 67335 is correct
};

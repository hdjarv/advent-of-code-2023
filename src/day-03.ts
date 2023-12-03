import { EOL, strToNum } from "./lib/utils";

type InputValue = {
  type: "number" | "symbol";
  row: number;
  startIx: number;
  endIx: number;
};

type Number = InputValue & {
  type: "number";
  number: number;
};

type Symbol = InputValue & {
  type: "symbol";
  symbol: string;
};

function parseInput(input: string): InputValue[] {
  return input.split(EOL).map(parseInputLine).flatMap(parseMatchesToInputs);
}

function parseInputLine(line: string): RegExpMatchArray[] {
  // find numbers & symbols in a line
  return [...line.matchAll(/(\d+|[^\.])/g)];
}

function parseMatchesToInputs(matches: RegExpMatchArray[], row: number): InputValue[] {
  // convert output from parseInputLine to the type to work with
  return matches.flatMap((match) => {
    if (/\d+/.test(match[1])) {
      return {
        type: "number",
        number: strToNum(match[1]),
        row,
        startIx: match.index!,
        endIx: match.index! + match[1].length - 1,
      };
    }
    return {
      type: "symbol",
      symbol: match[1],
      row,
      startIx: match.index!,
      endIx: match.index! + match[1].length - 1,
    };
  });
}

function solve(
  inputs: InputValue[],
  symbolFilter: (input: InputValue) => input is Symbol,
  symbolResultFn: (result: number, partNos: Number[]) => number
): number {
  let result = 0;
  for (let symbol of inputs.filter(symbolFilter)) {
    let partNos = inputs.filter(
      (partNo): partNo is Number =>
        partNo.type === "number" &&
        partNo.row >= symbol.row - 1 &&
        partNo.row <= symbol.row + 1 &&
        partNo.endIx >= symbol.startIx - 1 &&
        partNo.startIx <= symbol.endIx + 1
    );
    result = symbolResultFn(result, partNos);
  }
  return result;
}

function solvePart1(inputs: InputValue[]): number {
  return solve(
    inputs,
    (input): input is Symbol => input.type === "symbol",
    (result, partNos) => result + partNos.reduce((result, partNo) => (result += partNo.number), 0)
  );
}

function solvePart2(inputs: InputValue[]): number {
  return solve(
    inputs,
    (input): input is Symbol => input.type === "symbol" && (input as Symbol).symbol === "*",
    (result, partNos) =>
      partNos.length === 2 ? result + partNos.reduce((result, partNo) => (result *= partNo.number), 1) : result
  );
}

export default async (input: string) => {
  const data: InputValue[] = parseInput(input);

  console.log(`Part 1: The result is: ${solvePart1(data)}`); // 554003 is correct
  console.log(`Part 2: The result is: ${solvePart2(data)}`); // 87263515 is correct
};

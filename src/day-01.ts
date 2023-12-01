import { EOL, strToNum } from "./lib/utils";

const NUM_WORDS: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function findNumbers(str: string): string {
  const result: string[] = [];

  const re = /^(\d|one|two|three|four|five|six|seven|eight|nine)/i;
  for (let ix = 0; ix < str.length; ix++) {
    const match = re.exec(str.substring(ix, str.length));
    if (match) {
      result.push(match[1]);
    }
  }

  return result.map(parseNumberStringToDigit).join("");
}

function parseNumberStringToDigit(str: string): string {
  return /\d/.test(str) ? str : NUM_WORDS[str];
}

function solvePart1(input: string[]): number {
  return input
    .map((line) => {
      const numbers: string[] = [];
      let matches = line.match(/\d/g);
      if (matches) {
        return strToNum([matches[0], matches[matches?.length - 1]].map(parseNumberStringToDigit).join(""));
      }
      throw Error(`No numbers found in line: ${line}`);
    })
    .reduce((result, value) => result + value, 0);
}

function solvePart2(input: string[]): number {
  return solvePart1(input.flatMap(findNumbers));
}

export default async (input: string) => {
  const data = input.split(EOL);

  console.log(`Part 1: The result is: ${solvePart1(data)}`); // 56042 is correct
  console.log(`Part 2: The result is: ${solvePart2(data)}`); // 55358 is correct
};

import { existsSync as fileExists, PathLike, readFile as _readFile } from "fs";
import { EOL } from "os";
import { basename, extname, join } from "path";
import { promisify } from "util";

export { basename, EOL, extname, fileExists, join };

export const readFile = promisify(_readFile);
export const readFileAsString = async (path: PathLike) => await readFile(path, { encoding: "utf8" });

export const numToStr = (n: number): string => `${n}`;
export const strToNum = (s: string): number => Number.parseInt(s, 10);

export const splitStringIntoNumberArray = (s: string, sep: string = ","): number[] => s.split(sep).map(strToNum);

export const sortAscending = (a: number, b: number): number => a - b;
export const sortDescending = (a: number, b: number): number => b - a;

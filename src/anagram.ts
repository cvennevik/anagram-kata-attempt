import { readFile } from "fs/promises";

export function isTwoWordAnagram(
  originalWord: string,
  anagrams: [string, string]
): boolean {
  const originalLetters = originalWord.split("").sort().join("");
  const anagramLetters = (anagrams[0] + anagrams[1]).split("").sort().join("");
  return originalLetters === anagramLetters;
}

export async function getWordList(): Promise<string[]> {
  let fileText = await readFile("src/word_list.txt", "utf-8");
  let wordList = fileText.split(" ").filter((x) => x !== "");
  return wordList;
}

export async function getTwoWordAnagrams(
  word: string
): Promise<[string, string][]> {
  const wordList = await getWordList();
  wordList.sort();

  const twoWordAnagrams: [string, string][] = [];
  wordList.forEach((firstWord, index) => {
    const uncheckedWords = wordList.slice(index);
    uncheckedWords.forEach((secondWord) => {
      if (isTwoWordAnagram(word, [firstWord, secondWord])) {
        twoWordAnagrams.push([firstWord, secondWord]);
      }
    });
  });
  return twoWordAnagrams;
}

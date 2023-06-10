import { expect, it } from "vitest";
import { getTwoWordAnagrams, getWordList, isTwoWordAnagram } from "./anagram";

it("recognizes two-word anagrams", () => {
  expect(isTwoWordAnagram("hello", ["lol", "he"])).toBe(true);
  expect(isTwoWordAnagram("hello", ["he", "lo"])).toBe(false);
});

it("loads word list", async () => {
  const wordList = await getWordList();
  expect(wordList).toContain("madonna");
  expect(wordList).not.toContain("");
});

it("finds two-word anagrams for 'xaxaff'", async () => {
  const results = await getTwoWordAnagrams("xaxaff");
  expect(results).toStrictEqual([["fax", "fax"]]);
});

it("finds two-word anagrams for 'fiskax'", async () => {
  const results = await getTwoWordAnagrams("fiskax");
  expect(results).toStrictEqual([["fax", "ski"]]);
});

it("finds two-word anagrams for 'documenting'", async () => {
  const results = await getTwoWordAnagrams("documenting");
  expect(results.length).toBeGreaterThan(0); // Fails here - no two-word anagrams found.
  expect(results).toSatisfy((result: [string, string]) =>
    isTwoWordAnagram("documenting", result)
  );
});

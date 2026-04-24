import path from "node:path";
import { readFile } from "node:fs/promises";

interface RawCorpusEntry {
  id: string;
  language: string;
  voiceId: string;
  scriptPath: string;
}

export interface CorpusEntry {
  id: string;
  language: string;
  voiceId: string;
  scriptPath: string;
}

export async function loadCorpusEntries(corpusPath: string): Promise<CorpusEntry[]> {
  const manifestPath = corpusPath.endsWith(".json")
    ? corpusPath
    : path.join(corpusPath, "manifest.json");
  const manifestDir = path.dirname(manifestPath);
  const contents = await readFile(manifestPath, "utf8");
  const rawEntries = JSON.parse(contents) as RawCorpusEntry[];

  return rawEntries.map((entry) => ({
    ...entry,
    scriptPath: path.resolve(manifestDir, entry.scriptPath),
  }));
}

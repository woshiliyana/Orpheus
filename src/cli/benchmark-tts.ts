import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

import type { BenchmarkRow, ProviderName } from "../domain/types.js";
import { loadCorpusEntries } from "../benchmark/corpus.js";
import { buildBenchmarkSummary } from "../benchmark/summary.js";
import { runNarrationJob } from "../pipeline/narration.js";
import { createProviderAdapter } from "../providers/index.js";
import { ensureDir } from "../utils/files.js";
import { parseArgs } from "./shared.js";

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const corpusArg = args.corpus ?? "fixtures/frozen-corpus";
  const outputDir = path.resolve(args["output-dir"] ?? "benchmark-results");
  const providers = (args.providers ?? "inworld,cartesia")
    .split(",")
    .map((provider) => provider.trim())
    .filter(Boolean) as ProviderName[];

  const corpusEntries = await loadCorpusEntries(path.resolve(corpusArg));
  const rows: BenchmarkRow[] = [];

  await ensureDir(outputDir);

  for (const entry of corpusEntries) {
    const script = await readFile(entry.scriptPath, "utf8");

    const providerRows = await Promise.all(providers.map(async (providerName) => {
      const requestId = `${providerName}_${entry.id}`;
      const rowOutputDir = path.join(outputDir, providerName, entry.id);
      try {
        const result = await runNarrationJob({
          requestId,
          provider: providerName,
          language: entry.language,
          voiceId: entry.voiceId,
          outputFormat: "mp3",
          script,
          outputDir: rowOutputDir,
        }, createProviderAdapter(providerName));

        return {
          corpusId: entry.id,
          provider: providerName,
          success: true,
          chunkCount: result.metrics.chunkCount,
          chunkRetryCount: result.metrics.chunkRetryCount,
          totalWallTimeMs: result.metrics.totalWallTimeMs,
          audioDurationSec: result.metrics.audioDurationSec,
          timestampCoveragePct: result.metrics.timestampCoveragePct,
          estimatedTotalCostUsd: result.metrics.estimatedTotalCostUsd,
          outputDir: path.dirname(result.audioPath),
        } satisfies BenchmarkRow;
      } catch (error) {
        return {
          corpusId: entry.id,
          provider: providerName,
          success: false,
          chunkCount: 0,
          chunkRetryCount: 0,
          totalWallTimeMs: 0,
          audioDurationSec: 0,
          timestampCoveragePct: 0,
          estimatedTotalCostUsd: 0,
          outputDir: rowOutputDir,
        } satisfies BenchmarkRow;
      }
    }));

    rows.push(...providerRows);
  }

  const summary = buildBenchmarkSummary(rows);
  await ensureDir(outputDir);
  await writeFile(path.join(outputDir, "summary.csv"), `${summary.csv}\n`, "utf8");
  await writeFile(path.join(outputDir, "summary.md"), `${summary.markdown}\n`, "utf8");

  process.stdout.write(`${JSON.stringify({
    outputDir,
    rowCount: rows.length,
    summaryCsv: path.join(outputDir, "summary.csv"),
    summaryMarkdown: path.join(outputDir, "summary.md"),
  }, null, 2)}\n`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});

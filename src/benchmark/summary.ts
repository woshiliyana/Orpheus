import type { BenchmarkRow } from "../domain/types.js";

export function buildBenchmarkSummary(rows: BenchmarkRow[]): { csv: string; markdown: string } {
  const csvHeader = "provider,corpusId,success,chunkCount,chunkRetryCount,totalWallTimeMs,audioDurationSec,timestampCoveragePct,estimatedTotalCostUsd,outputDir";
  const csvRows = rows.map((row) =>
    [
      row.provider,
      row.corpusId,
      String(row.success),
      row.chunkCount,
      row.chunkRetryCount,
      row.totalWallTimeMs,
      row.audioDurationSec,
      row.timestampCoveragePct,
      row.estimatedTotalCostUsd,
      row.outputDir,
    ].join(",")
  );

  const markdownHeader = [
    "| Provider | Corpus | Success | Chunks | Retries | Wall Time (ms) | Audio (sec) | Coverage % | Cost USD | Output |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ];
  const markdownRows = rows.map((row) =>
    `| ${row.provider} | ${row.corpusId} | ${row.success ? "yes" : "no"} | ${row.chunkCount} | ${row.chunkRetryCount} | ${row.totalWallTimeMs} | ${row.audioDurationSec} | ${row.timestampCoveragePct} | ${row.estimatedTotalCostUsd} | ${row.outputDir} |`
  );

  return {
    csv: [csvHeader, ...csvRows].join("\n"),
    markdown: [...markdownHeader, ...markdownRows].join("\n"),
  };
}

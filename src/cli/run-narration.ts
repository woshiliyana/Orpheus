import path from "node:path";

import type { ProviderName } from "../domain/types.js";
import { runNarrationJob } from "../pipeline/narration.js";
import { createProviderAdapter } from "../providers/index.js";
import { parseArgs, readScriptInput } from "./shared.js";

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const provider = (args.provider ?? "inworld") as ProviderName;
  const outputDir = path.resolve(args["output-dir"] ?? "runs");
  const requestId = args["request-id"] ?? `run_${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const language = args.language ?? "en";
  const voiceId = args.voice ?? args.voiceId;

  if (voiceId === undefined) {
    throw new Error("Provide --voice <voiceId>");
  }

  const script = await readScriptInput(args);
  const adapter = createProviderAdapter(provider);
  const result = await runNarrationJob({
    requestId,
    provider,
    language,
    voiceId,
    outputFormat: (args.format ?? "mp3") as "mp3" | "wav",
    script,
    outputDir,
  }, adapter);

  const output = {
    requestId,
    provider: result.provider,
    audioPath: result.audioPath,
    srtPath: result.srtPath,
    vttPath: result.vttPath,
    wordTimingsPath: result.wordTimingsPath,
    spliceReportPath: result.spliceReportPath,
    artifactManifestPath: result.artifactManifestPath,
    metricsPath: result.metricsPath,
  };
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});

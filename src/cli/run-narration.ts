import path from "node:path";

import type { InputValidationMode, PacingMode, ProviderName } from "../domain/types.js";
import { runNarrationJob } from "../pipeline/narration.js";
import { createProviderAdapter } from "../providers/index.js";
import { parseArgs, readScriptInput } from "./shared.js";

function parsePacingMode(value: string | undefined): PacingMode {
  if (value === undefined) {
    return "natural_basic";
  }
  if (value === "exact" || value === "natural_basic") {
    return value;
  }
  throw new Error("--pacing-mode must be exact or natural_basic");
}

function parseInputValidationMode(value: string | undefined): InputValidationMode {
  if (value === undefined) {
    return "strict";
  }
  if (value === "warn" || value === "strict") {
    return value;
  }
  throw new Error("--input-validation must be warn or strict");
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const provider = (args.provider ?? "inworld") as ProviderName;
  const outputDir = path.resolve(args["output-dir"] ?? "runs");
  const requestId = args["request-id"] ?? `run_${new Date().toISOString().replace(/[:.]/g, "-")}`;
  const language = args.language ?? "en";
  const voiceId = args.voice ?? args.voiceId;
  const pacingMode = parsePacingMode(args["pacing-mode"]);
  const inputValidationMode = parseInputValidationMode(args["input-validation"]);

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
    reuseCompletedChunks: args["resume-existing-chunks"] === "true",
    pacingMode,
    inputValidationMode,
  }, adapter);

  const output = {
    requestId,
    provider: result.provider,
    pacingMode: result.pacingPlan.effectiveMode,
    inputQualityStatus: result.inputQualityReport.status,
    audioPath: result.audioPath,
    srtPath: result.srtPath,
    vttPath: result.vttPath,
    wordTimingsPath: result.wordTimingsPath,
    spliceReportPath: result.spliceReportPath,
    artifactManifestPath: result.artifactManifestPath,
    metricsPath: result.metricsPath,
    sourceScriptPath: result.sourceScriptPath,
    spokenScriptPath: result.spokenScriptPath,
    providerInputPath: result.providerInputPath,
    providerInputChunksPath: result.providerInputChunksPath,
    pacingPlanPath: result.pacingPlanPath,
    inputQualityReportPath: result.inputQualityReportPath,
  };
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});

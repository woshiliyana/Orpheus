export type OutputAudioFormat = "mp3" | "wav";
export type ProviderName = "inworld" | "cartesia";
export type AlignmentSource = "provider_native" | "stt_fallback";

export interface ScriptChunk {
  index: number;
  id: string;
  text: string;
  startChar: number;
  endChar: number;
}

export interface WordTiming {
  text: string;
  startSec: number;
  endSec: number;
}

export interface NormalizedWordTiming extends WordTiming {
  chunkIndex: number;
}

export interface SubtitleCue {
  index: number;
  text: string;
  startSec: number;
  endSec: number;
}

export interface ChunkSynthesisInput {
  chunk: ScriptChunk;
  language: string;
  voiceId: string;
  outputFormat: OutputAudioFormat;
  outputDir: string;
}

export interface ChunkSynthesisResult {
  audioPath: string;
  durationSec: number;
  words: WordTiming[];
  rawResponsePaths: string[];
  attemptCount: number;
  providerCharactersProcessed: number;
}

export interface ProviderAttemptError extends Error {
  statusCode?: number;
  rawResponsePaths?: string[];
  attemptCount?: number;
  providerCharactersProcessed?: number;
}

export interface TtsProviderAdapter {
  readonly name: ProviderName;
  readonly rateUsdPer1mChars: number;
  synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult>;
}

export interface RunMetrics {
  provider: ProviderName;
  requestId: string;
  scriptChars: number;
  chunkCount: number;
  chunkRetryCount: number;
  totalWallTimeMs: number;
  audioDurationSec: number;
  timestampCoveragePct: number;
  estimatedTtsCostUsd: number;
  estimatedTotalCostUsd: number;
  estimatedCostPerCompletedAudioMinuteUsd: number;
  timestampWordCount?: number;
  failureReason?: string;
}

export interface ArtifactManifest {
  project_id: string;
  run_id: string;
  run_status: "succeeded" | "failed";
  failure_reason?: string;
  source_script_hash: string;
  provider_summary: {
    primary_provider: ProviderName;
    selected_voice: string;
    fallback_provider?: ProviderName;
  };
  orchestration_summary: {
    chunk_count: number;
    stitch_count: number;
    retry_count: number;
    warning_flags: string[];
  };
  output_language: string;
  final_audio_asset_ref?: string;
  final_audio_duration_seconds?: number;
  internal_alignment_asset_ref?: {
    word_timings_json: string;
    srt: string;
    vtt: string;
    alignment_source: AlignmentSource;
  };
  billing_fact: {
    billable_seconds: number;
    usage_event_type: "initial_render_success" | "non_billable_failure";
    estimated_total_cost_usd: number;
  };
  delivery_ref?: string;
  warning_codes?: string[];
}

export interface NarrationJobInput {
  requestId: string;
  projectId?: string;
  provider: ProviderName;
  language: string;
  voiceId: string;
  outputFormat: OutputAudioFormat;
  script: string;
  outputDir: string;
  minChunkSize?: number;
  maxChunkSize?: number;
  concurrency?: number;
}

export interface NarrationRunResult {
  audioPath: string;
  srtPath: string;
  vttPath: string;
  wordTimingsPath: string;
  spliceReportPath: string;
  artifactManifestPath: string;
  metricsPath: string;
  timings: NormalizedWordTiming[];
  durationSec: number;
  provider: ProviderName;
  metrics: RunMetrics;
}

export interface BenchmarkRow {
  corpusId: string;
  provider: ProviderName;
  success: boolean;
  chunkCount: number;
  chunkRetryCount: number;
  totalWallTimeMs: number;
  audioDurationSec: number;
  timestampCoveragePct: number;
  estimatedTotalCostUsd: number;
  outputDir: string;
}

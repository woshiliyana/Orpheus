export type OutputAudioFormat = "mp3" | "wav";
export type ProviderName = "inworld" | "cartesia";
export type AlignmentSource = "provider_native" | "stt_fallback";
export type AudioAssetFormat = OutputAudioFormat | "raw_pcm";
export type AudioContainer = "mp3" | "wav" | "raw";
export type AudioCodec = "mp3" | "pcm_s16le" | "linear16";
export type AudioFormatSource =
  | "provider_native_lossless"
  | "provider_native_lossy"
  | "derived_from_master"
  | "transcoded_from_mp3_packaging_only";
export type AudioFormatVerdict =
  | "ready_for_internal_master"
  | "ready_for_delivery"
  | "ready_for_export"
  | "hold_for_export"
  | "blocked";
export type FailureStage =
  | "input_validation"
  | "entitlement_check"
  | "provider_precheck"
  | "orchestration"
  | "rendering"
  | "alignment"
  | "packaging"
  | "delivery"
  | "canceled_by_user"
  | "canceled_by_admin";
export type PacingMode = "exact" | "natural_basic";
export type InputValidationMode = "warn" | "strict";

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
  reuseCompletedChunk?: boolean;
}

export interface ChunkSynthesisResult {
  audioPath: string;
  durationSec: number;
  words: WordTiming[];
  rawResponsePaths: string[];
  attemptCount: number;
  providerCharactersProcessed: number;
  productionMasterAudioRef?: ProviderAudioAssetRef;
  cacheHit?: boolean;
  cacheSource?: "chunk_result_metadata" | "legacy_provider_response";
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

export interface InputQualityIssue {
  code:
    | "missing_sentence_punctuation"
    | "low_sentence_punctuation_density"
    | "long_run_on_segment"
    | "missing_paragraph_breaks";
  severity: "warning" | "blocker";
  message: string;
}

export interface InputQualityReport {
  status: "pass" | "warning" | "blocked";
  validationMode: InputValidationMode;
  language: string;
  wordCount: number;
  paragraphCount: number;
  terminalPunctuationCount: number;
  maxRunOnTokenCount: number;
  warnings: InputQualityIssue[];
  blockers: InputQualityIssue[];
  recommendation: string;
}

export interface PauseMarker {
  id: string;
  sourceCharOffset: number;
  durationMs: number;
  reason:
    | "heading_break"
    | "paragraph_break"
    | "list_item_break"
    | "provider_unavailable";
  delivery: "provider_break" | "none";
}

export interface PacingPlan {
  version: "natural_basic_v1";
  requestedMode: PacingMode;
  effectiveMode: PacingMode;
  provider: ProviderName;
  language: string;
  sourceScriptHash: string;
  spokenScriptHash: string;
  providerInputHash: string;
  tokenPreserved: boolean;
  insertedBreakCount: number;
  maxBreakTagsPerRequest: number;
  markupOverheadChars: number;
  pauses: PauseMarker[];
  warnings: string[];
}

export interface ProviderInputChunkReport {
  chunkIndex: number;
  id: string;
  startChar: number;
  endChar: number;
  providerInputChars: number;
  breakTagCount: number;
}

export interface RunMetrics {
  provider: ProviderName;
  requestId: string;
  scriptChars: number;
  chunkCount: number;
  chunkRetryCount: number;
  cachedChunkCount?: number;
  providerCharactersReused?: number;
  totalWallTimeMs: number;
  audioDurationSec: number;
  timestampCoveragePct: number;
  estimatedTtsCostUsd: number;
  estimatedTotalCostUsd: number;
  estimatedCostPerCompletedAudioMinuteUsd: number;
  timestampWordCount?: number;
  failureReason?: string;
}

export interface ProviderAudioAssetRef {
  asset_ref: string;
  format: AudioAssetFormat;
  source: AudioFormatSource;
  provider_native: boolean;
  lossless: boolean;
  container?: AudioContainer;
  codec?: AudioCodec;
  sample_rate_hertz?: number;
  bitrate_bps?: number;
  channel_count?: number;
  derived_from_asset_ref?: string;
  derived_from_asset_refs?: string[];
}

export interface AudioAssetRef extends ProviderAudioAssetRef {
  role: "production_master_audio" | "delivery_audio";
  audio_format_verdict: AudioFormatVerdict;
}

export interface AudioFormatPolicy {
  requested_provider_source_format: AudioAssetFormat;
  provider_source_encoding: string;
  provider_source_lossless: boolean;
  production_master_audio: {
    status: "generated" | "not_generated";
    audio_format_verdict: AudioFormatVerdict;
    reason?: string;
  };
  default_delivery_audio: {
    format: OutputAudioFormat;
    generated: boolean;
    audio_format_verdict: AudioFormatVerdict;
  };
  delivery_audio_formats: OutputAudioFormat[];
  optional_wav_export: {
    audio_format_verdict: AudioFormatVerdict;
    reason: string;
  };
  notes: string[];
}

export interface ArtifactManifest {
  project_id: string;
  run_id: string;
  run_status: "succeeded" | "failed";
  failure_reason?: string;
  failure_stage?: FailureStage;
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
    cached_chunk_count?: number;
    warning_flags: string[];
  };
  input_adapter_ref: {
    pacing_mode: PacingMode;
    requested_pacing_mode: PacingMode;
    effective_pacing_mode: PacingMode;
    input_validation_mode: InputValidationMode;
    token_preserved: boolean;
    inserted_break_count: number;
    max_break_tags_per_request: number;
    source_script: string;
    spoken_script: string;
    provider_input: string;
    provider_input_chunks_json: string;
    pacing_plan_json: string;
    input_quality_report_json: string;
  };
  output_language: string;
  final_audio_asset_ref?: string;
  final_audio_duration_seconds?: number;
  audio_format_policy?: AudioFormatPolicy;
  production_master_audio_ref?: AudioAssetRef[];
  delivery_audio_ref?: AudioAssetRef[];
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
  reuseCompletedChunks?: boolean;
  pacingMode?: PacingMode;
  inputValidationMode?: InputValidationMode;
}

export interface NarrationRunResult {
  audioPath: string;
  srtPath: string;
  vttPath: string;
  wordTimingsPath: string;
  spliceReportPath: string;
  artifactManifestPath: string;
  metricsPath: string;
  sourceScriptPath: string;
  spokenScriptPath: string;
  providerInputPath: string;
  providerInputChunksPath: string;
  pacingPlanPath: string;
  inputQualityReportPath: string;
  timings: NormalizedWordTiming[];
  durationSec: number;
  provider: ProviderName;
  metrics: RunMetrics;
  pacingPlan: PacingPlan;
  inputQualityReport: InputQualityReport;
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

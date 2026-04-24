import { readFile } from "node:fs/promises";

export function parseArgs(argv: string[]): Record<string, string> {
  const parsed: Record<string, string> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]!;
    if (!current.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];
    if (next === undefined || next.startsWith("--")) {
      parsed[key] = "true";
      continue;
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

export async function readScriptInput(args: Record<string, string>): Promise<string> {
  if (args["script-text"] !== undefined) {
    return args["script-text"];
  }

  if (args["script-file"] !== undefined) {
    return readFile(args["script-file"], "utf8");
  }

  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const script = Buffer.concat(chunks).toString("utf8").trim();
  if (script.length === 0) {
    throw new Error("Provide --script-text, --script-file, or pipe script text through stdin");
  }

  return script;
}

interface RetryOptions {
  maxAttempts: number;
  baseDelayMs?: number;
  sleep?: (delayMs: number) => Promise<void>;
  shouldRetry?: (error: unknown) => boolean;
}

function defaultSleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function getStatusCode(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const candidate = error as { statusCode?: number; status?: number; cause?: { statusCode?: number; status?: number } };
  return candidate.statusCode ?? candidate.status ?? candidate.cause?.statusCode ?? candidate.cause?.status;
}

export function isRetryableError(error: unknown): boolean {
  const statusCode = getStatusCode(error);
  return statusCode === 429 || (statusCode !== undefined && statusCode >= 500 && statusCode < 600);
}

export async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  const {
    maxAttempts,
    baseDelayMs = 500,
    sleep = defaultSleep,
    shouldRetry = isRetryableError,
  } = options;

  let attempt = 0;
  let lastError: unknown;

  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt >= maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      const delayMs = baseDelayMs * 2 ** (attempt - 1);
      await sleep(delayMs);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Retry attempts exhausted");
}

export async function mapWithConcurrency<T, TResult>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<TResult>,
): Promise<TResult[]> {
  if (concurrency < 1) {
    throw new Error("Concurrency must be at least 1");
  }

  const results: TResult[] = new Array(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= items.length) {
        return;
      }

      results[currentIndex] = await mapper(items[currentIndex]!, currentIndex);
    }
  }

  const workerCount = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

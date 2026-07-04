export interface MockApiOptions {
  minDelay?: number;
  maxDelay?: number;
  failureRate?: number;
}

const defaultOptions: Required<MockApiOptions> = {
  minDelay: 300,
  maxDelay: 1000,
  failureRate: 0
};

const delay = (duration: number) => new Promise((resolve) => window.setTimeout(resolve, duration));

export async function mockApi<T>(factory: () => T, options: MockApiOptions = {}): Promise<T> {
  const config = { ...defaultOptions, ...options };
  const wait = config.minDelay + Math.random() * (config.maxDelay - config.minDelay);
  await delay(wait);

  if (Math.random() < config.failureRate) {
    throw new Error("The mock API could not complete this request. Please retry.");
  }

  return structuredClone(factory());
}

export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];

  if (value === undefined || value === "") {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function generateJobId(): string {
  return `job_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getAppVersion(): string {
  return process.env.npm_package_version ?? "0.1.0";
}

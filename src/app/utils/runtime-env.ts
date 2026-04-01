type BrowserWindow = Window & {
  __env?: Record<string, string | undefined>;
};

export function getRuntimeEnv(key: string): string {
  const browserEnv =
    typeof window !== 'undefined'
      ? (window as BrowserWindow).__env
      : undefined;

  const browserValue = browserEnv?.[key];
  if (typeof browserValue === 'string' && browserValue.length > 0) {
    return browserValue;
  }

  const processEnv = (globalThis as any)?.process?.env as
    | Record<string, string | undefined>
    | undefined;
  return String(processEnv?.[key] ?? '');
}

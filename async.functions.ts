/**
 * apply sleep
 * @param ms : time in MS
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

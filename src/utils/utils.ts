export function arraySum(a: (number | undefined)[]): number {
  return a.reduce((sum, a) => (sum || 0) + (a || 0), 0) || -1;
}

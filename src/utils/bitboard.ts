const baseToPrefixMap: Map<number, string> = new Map([
  [16, "0x"],
  [10, ""],
  [2, "0b"],
]);

export function stringToBigint(base: number, str: string) {
  try {
    const prefix = baseToPrefixMap.get(base);
    const bg = BigInt(`${prefix}${str}`);
    return { value: bg, ok: true };
  } catch {
    return { value: undefined, ok: false };
  }
}

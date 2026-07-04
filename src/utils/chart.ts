export const sparklinePoints = (base: number) =>
  Array.from({ length: 8 }, (_, index) => ({
    label: `P${index + 1}`,
    value: Math.max(0, Math.round(base + Math.sin(index) * 8 + index * 2))
  }));

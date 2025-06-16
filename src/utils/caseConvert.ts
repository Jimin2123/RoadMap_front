// utils/caseConverter.ts
export const toCamelCase = (str: string): string => str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

export const convertKeysToCamelCase = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>).reduce(
      (acc, [key, value]) => {
        (acc as Record<string, unknown>)[toCamelCase(key)] = convertKeysToCamelCase(value);
        return acc;
      },
      {} as Record<string, unknown>
    );
  }
  return obj;
};

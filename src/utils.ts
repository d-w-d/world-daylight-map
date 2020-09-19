let count = 0;

/**
 * Simple unique-id generator
 */
export const simpleUID = (): string => {
  count++;
  return `uid-${count}`;
};

const hashStringToNumber = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

const seededRandom = (seed: number): () => number => {
    return () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  };
  

export const generateColorFromCongId = (groupId: string): string => {
  const hash = hashStringToNumber(String(groupId));
  const goldenAngle = 137.508;
  const hue = (hash * goldenAngle) % 360;
  const saturation = (70 * hash) % 100;
  const lightness = 50

  return `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`;
  };
  
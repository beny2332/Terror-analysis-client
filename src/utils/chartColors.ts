export const generateColors = (count: number) => {
    const hueStep = 360 / count;
    return Array.from({ length: count }, (_, i) => {
      const hue = i * hueStep;
      return {
        backgroundColor: `hsla(${hue}, 70%, 60%, 0.6)`,
        borderColor: `hsla(${hue}, 70%, 50%, 1)`,
      };
    });
  };
  
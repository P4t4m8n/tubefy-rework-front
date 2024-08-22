import { useAppSelector } from "./useStore";
import { useEffectUpdate } from "./useEffectUpdate";
import { setGradientForBackground } from "../store/actions/imgGradient.action";

interface ColorMap {
  [key: string]: number;
}

export const useGradient = () => {
  const { imgUrl, gradient } = useAppSelector((state) => state.imgGradient);

  useEffectUpdate(() => {
    if (!imgUrl) {
      setGradientForBackground("");
      return;
    }
    const img: HTMLImageElement = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      sampleColors(ctx, img.width, img.height);
    };

    const sampleColors = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ): void => {
      const pixelData: Uint8ClampedArray = ctx.getImageData(
        0,
        0,
        width,
        height
      ).data;
      const colorMap: ColorMap = {};

      for (let i = 0; i < pixelData.length; i++) {
        const r: number = pixelData[i];
        const g: number = pixelData[i + 1];
        const b: number = pixelData[i + 2];

        const rgb: string = `${r},${g},${b}`;

        if (colorMap[rgb]) {
          colorMap[rgb]++;
        } else {
          colorMap[rgb] = 1;
        }
      }

      const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
      const topColors: string[] = sortedColors
        .slice(0, 2)
        .map(([color]) => `rgb(${color})`);
      topColors.push("rgb(18, 18, 18)", "rgba(0, 0, 0, 0.5)");
      const _gradient = createVerticalGradient(topColors);
      setGradientForBackground(_gradient);
    };
  }, [imgUrl]);

  const createVerticalGradient = (colors: string[]): string => {
    if (colors.length === 0) return "";

    const gradient = `linear-gradient(to bottom, ${colors.join(", ")})`;
    return gradient;
  };

  return gradient;
};

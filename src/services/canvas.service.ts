const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

const img: HTMLImageElement = new Image();
img.src = "path_to_your_image.jpg";
img.onload = () => {
  if (!ctx) return;

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  sampleColors(ctx, img.width, img.height);
};

interface ColorMap {
  [key: string]: number;
}

function sampleColors(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const pixelData: Uint8ClampedArray = ctx.getImageData(
    0,
    0,
    width,
    height
  ).data;
  const colorMap: ColorMap = {};

  for (let i = 0; i < pixelData.length; i += 40) {
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
    .slice(0, 5)
    .map(([color]) => `rgb(${color})`);

  createGradient(topColors);
}

function createGradient(colors: string[]): void {
  const gradientCanvas: HTMLCanvasElement = document.createElement("canvas");
  const gradientCtx: CanvasRenderingContext2D | null =
    gradientCanvas.getContext("2d");

  if (!gradientCtx) return;

  gradientCanvas.width = 500;
  gradientCanvas.height = 100;

  const gradient: CanvasGradient = gradientCtx.createLinearGradient(
    0,
    0,
    gradientCanvas.width,
    0
  );

  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  gradientCtx.fillStyle = gradient;
  gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

  document.body.appendChild(gradientCanvas);
}

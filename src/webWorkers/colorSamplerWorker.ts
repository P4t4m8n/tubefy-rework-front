// self.onmessage = (event) => {
//   const { pixelData, width, height } = event.data;

//   const colorMap: { [key: string]: number } = {};

//   for (let i = 0; i < pixelData.length; i += 40) {
//     const r = pixelData[i];
//     const g = pixelData[i + 1];
//     const b = pixelData[i + 2];
//     const rgb = `${r},${g},${b}`;

//     if (colorMap[rgb]) {
//       colorMap[rgb]++;
//     } else {
//       colorMap[rgb] = 1;
//     }
//   }

//   const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
//   const topColors = sortedColors.slice(0, 2).map(([color]) => `rgb(${color})`);

//   // Send the result back to the main thread
//   self.postMessage({ topColors });
// };

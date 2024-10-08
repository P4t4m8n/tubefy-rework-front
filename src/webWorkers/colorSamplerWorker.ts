// self.onmessage = (event) => {
//     const { imgUrl } = event.data;
//     const img = new Image();
//     img.src = imgUrl;
//     img.crossOrigin = "anonymous";
  
//     img.onload = () => {
//       const canvas = new OffscreenCanvas(img.width, img.height);
//       const ctx = canvas.getContext("2d");
//       ctx?.drawImage(img, 0, 0);
//       const pixelData = ctx?.getImageData(0, 0, img.width, img.height).data;
      
//       const colorMap = {};
//       for (let i = 0; i < pixelData.length; i += 40) {
//         const r = pixelData[i];
//         const g = pixelData[i + 1];
//         const b = pixelData[i + 2];
//         const rgb = `${r},${g},${b}`;
//         colorMap[rgb] = (colorMap[rgb] || 0) + 1;
//       }
  
//       const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
//       const topColors = sortedColors.slice(0, 3).map(([color]) => `rgb(${color})`);
//       topColors.push("rgb(18, 18, 18)");
  
//       const gradient = `linear-gradient(to bottom, ${topColors.join(", ")})`;
//       self.postMessage({ gradient });
//     };
//   };

export function loadImage(url) :Promise<HTMLImageElement>{
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject); // don't forget this one
    img.src = url;
  });
}
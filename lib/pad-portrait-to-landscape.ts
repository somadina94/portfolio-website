/** Matches `aspect-[16/10]` used in project image carousel. */
const LANDSCAPE_ASPECT = 16 / 10;
const MAX_CANVAS_SIDE = 4096;
const PAD_COLOR = "#f4f4f5";

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to decode image"));
    };
    img.src = url;
  });
}

function baseNameWithoutExt(fileName: string): string {
  const i = fileName.lastIndexOf(".");
  return i === -1 ? fileName : fileName.slice(0, i);
}

/**
 * If the image is portrait (taller than wide), draws it centered on a 16:10
 * landscape canvas with horizontal padding. Landscape and square images are
 * returned unchanged.
 */
export async function padPortraitToLandscape(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  let img: HTMLImageElement;
  try {
    img = await loadImageElement(file);
  } catch {
    return file;
  }

  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (w === 0 || h === 0 || w >= h) {
    return file;
  }

  const canvasW0 = Math.round(h * LANDSCAPE_ASPECT);
  const canvasH0 = h;
  const maxSide = Math.max(canvasW0, canvasH0);
  const scale = maxSide > MAX_CANVAS_SIDE ? MAX_CANVAS_SIDE / maxSide : 1;

  const cw = Math.round(canvasW0 * scale);
  const ch = Math.round(canvasH0 * scale);
  const iw = Math.round(w * scale);
  const ih = Math.round(h * scale);
  const x = Math.round((cw - iw) / 2);
  const y = Math.round((ch - ih) / 2);

  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return file;
  }

  ctx.fillStyle = PAD_COLOR;
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, x, y, iw, ih);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", 0.92)
  );
  if (!blob) {
    return file;
  }

  const outName = `${baseNameWithoutExt(file.name)}.jpg`;
  return new File([blob], outName, { type: "image/jpeg" });
}

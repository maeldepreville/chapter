type Dimensions = { width: number; height: number };
type Crop = { x: number; y: number; zoom: number };

export function startPhotoImport(file: File, ready: (source: string, dimensions: Dimensions) => void, failed: (message: string) => void) {
  let cancelled = false;
  let reader: FileReader | undefined;
  let probe: HTMLImageElement | undefined;
  const fail = (message = "Cette image ne peut pas être lue.") => { if (!cancelled) failed(message); };
  const cancel = () => {
    cancelled = true;
    if (reader?.readyState === 1) reader.abort();
    if (probe) { probe.onload = null; probe.onerror = null; }
  };
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    fail("Choisissez une image JPEG, PNG ou WebP.");
    return cancel;
  }
  if (file.size > 8 * 1024 * 1024) {
    fail("Cette image dépasse 8 Mo.");
    return cancel;
  }
  try {
    reader = new FileReader();
    reader.onload = () => {
      if (cancelled) return;
      const source = typeof reader?.result === "string" ? reader.result : "";
      if (!source) return fail();
      try {
        const image = new window.Image();
        probe = image;
        image.onload = () => {
          if (cancelled) return;
          if (Math.min(image.naturalWidth, image.naturalHeight) < 512) return fail("Le petit côté de l’image doit mesurer au moins 512 px pour rester net.");
          ready(source, { width: image.naturalWidth, height: image.naturalHeight });
        };
        image.onerror = () => fail();
        image.src = source;
      } catch { fail(); }
    };
    reader.onerror = () => fail();
    reader.readAsDataURL(file);
  } catch { fail(); }
  return cancel;
}

// Canvas can fall back to PNG when WebP encoding is unavailable.
export function validCropPreview(value: string) {
  const match = /^data:image\/(png|webp|jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match) return false;
  try {
    const bytes = atob(match[2]);
    if (match[1] === "png") return bytes.startsWith("\x89PNG\r\n\x1a\n") && bytes.length > 8;
    if (match[1] === "jpeg") return bytes.startsWith("\xff\xd8\xff") && bytes.length > 3;
    return bytes.startsWith("RIFF") && bytes.slice(8, 12) === "WEBP" && bytes.length > 12;
  } catch { return false; }
}

export function cropPreview(image: HTMLImageElement, dimensions: Dimensions, crop: Crop) {
  if (!image.complete || !image.naturalWidth || !dimensions.width || !dimensions.height) throw new Error("Image indisponible");
  const scale = Math.max(320 / dimensions.width, 320 / dimensions.height) * crop.zoom;
  const size = 320 / scale;
  const x = (dimensions.width - size) / 2 - crop.x / scale;
  const y = (dimensions.height - size) / 2 - crop.y / scale;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Recadrage indisponible");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, x, y, size, size, 0, 0, 1024, 1024);
  const preview = canvas.toDataURL("image/webp", 0.9);
  if (!validCropPreview(preview)) throw new Error("Export invalide");
  return preview;
}

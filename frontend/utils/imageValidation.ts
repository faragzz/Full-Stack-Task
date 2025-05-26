export default function normalizeImageSrc(src: string | null | undefined): string | null {
    if (!src) return null;
    src = src.trim();
    if (src.length === 0) return null;
    if (/^https?:\/\//.test(src)) return src;

    if (src.startsWith("/")) return src;
    return "/" + src;
}

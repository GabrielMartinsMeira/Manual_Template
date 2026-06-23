import fs from "fs";
import path from "path";
import matter from "gray-matter";

const memoize = (fn) => {
  const cacheMap = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cacheMap.has(key)) {
      return cacheMap.get(key);
    }
    const result = fn(...args);
    cacheMap.set(key, result);
    return result;
  };
};

const CONTENT_PATH = path.join(process.cwd(), "content");

export const ALLOWED_LANGS = ["pt", "en", "es"];
export const ALLOWED_TYPES = ["manual-main", "manual-other"];

export const getManualMetadata = memoize((lang = "pt", type = "manual-main", includeContent = false) => {
  if (!ALLOWED_LANGS.includes(lang) || !ALLOWED_TYPES.includes(type)) {
    return [];
  }

  const dir = path.join(CONTENT_PATH, type, lang);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf-8");

      const { data = {}, content = "" } = matter(raw);

      return {
        slug: file.replace(/\.mdx$/, "").toLowerCase(),
        title: data.title ?? null,
        order: data.order ?? 0,
        group: data.group ?? "Outros", // Ensure group is always present
        ...data,
        ...(includeContent ? { content } : {}),
      };
    })
    .sort((a, b) => a.order - b.order);
});

export const getSection = memoize((slug, lang = "pt", type = "manual-main") => {
  if (!ALLOWED_LANGS.includes(lang) || !ALLOWED_TYPES.includes(type)) {
    return null;
  }

  const dir = path.join(CONTENT_PATH, type, lang);

  if (!fs.existsSync(dir)) {
    return null;
  }

  // Find the file that matches the slug (case-insensitive search for robustness)
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  const filename = files.find(
    (file) => file.replace(/\.mdx$/, "").toLowerCase() === slug.toLowerCase()
  );

  if (!filename) {
    return null;
  }

  const fullPath = path.join(dir, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data = {}, content = "" } = matter(raw);

  return {
    slug: slug.toLowerCase(),
    title: data.title ?? null,
    order: data.order ?? 0,
    ...data,
    content,
  };
});

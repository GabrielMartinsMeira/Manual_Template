import { getManualMetadata, ALLOWED_LANGS, ALLOWED_TYPES } from "@/lib/mdx";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "pt";
  const type = searchParams.get("type") || "manual-main";

  if (!ALLOWED_LANGS.includes(lang) || !ALLOWED_TYPES.includes(type)) {
    return Response.json(
      { error: "Invalid lang or type parameter" },
      { status: 400 }
    );
  }

  const includeContent = searchParams.get("content") === "true";
  const sections = getManualMetadata(lang, type, includeContent);

  return Response.json({
    language: lang,
    type,
    sections
  });
}

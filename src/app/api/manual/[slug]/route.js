import { getSection, ALLOWED_LANGS, ALLOWED_TYPES } from "@/lib/mdx";

export async function GET(request) {
  const pathname = request.nextUrl.pathname;
  const slug = pathname.split("/").pop();

  if (!slug) {
    return Response.json(
      { error: "Slug is required" },
      { status: 400 }
    );
  }
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "pt";
  const type = searchParams.get("type") || "manual-main";

  if (!ALLOWED_LANGS.includes(lang) || !ALLOWED_TYPES.includes(type)) {
    return Response.json(
      { error: "Invalid lang or type parameter" },
      { status: 400 }
    );
  }

  const section = getSection(slug, lang, type);

  if (!section) {
    return Response.json(
      { error: "Section not found", slug },
      { status: 404 }
    );
  }

  return Response.json(section);
}

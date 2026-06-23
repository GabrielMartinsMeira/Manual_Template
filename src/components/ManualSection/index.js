import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import LinkRenderer from "./LinkRenderer";
import "../../css/manual.css";

const schema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        '*': ['className', 'style', 'class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan']
    }
};

const ManualSection = ({ section, language, type }) => {
    if (!section) {
        return null;
    }

    const isMainSection = /^\d+\.\s/.test(section.title) || section.title === "Introdução" || section.title === "Introduction";
    const headerClass = isMainSection ? "manual-header-main" : "manual-header-sub";
    const titleClass = isMainSection ? "manual-title-main" : "manual-title-sub";

    return (
        <section id={section.slug} className="manual-section">
            <header className={headerClass}>
                <h2 className={titleClass}>{section.title}</h2>
            </header>

            <article className="manual-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], rehypeHighlight]}
                    components={{
                        a: LinkRenderer
                    }}
                >
                    {section.content}
                </ReactMarkdown>
            </article>
        </section>
    );
};

export default ManualSection;
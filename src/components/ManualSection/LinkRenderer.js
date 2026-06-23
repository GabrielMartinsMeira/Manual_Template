import React from 'react';

const LinkRenderer = (props) => {
    const { href, children } = props;

    // Check if the link is an internal link to another MDX file
    const isMdxLink = href && (href.endsWith('.mdx') || href.startsWith('./Section_'));

    const handleClick = (e) => {
        if (isMdxLink) {
            e.preventDefault();
            // Extract the slug from the href
            const slug = href.split('/').pop().replace('.mdx', '').toLowerCase();

            const element = document.getElementById(slug);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`Section with id ${slug} not found`);
            }
        }
    };

    if (isMdxLink) {
        return (
            <a href={href} onClick={handleClick}>
                {children}
            </a>
        );
    }

    // Default behavior for other links
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
};

export default LinkRenderer;

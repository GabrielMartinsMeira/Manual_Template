module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './src/**/*.{js,jsx,ts,tsx,mdx}',
              './content/**/*.{md,mdx}',
              './app/**/*.{js,jsx,ts,tsx,mdx}',
            ],
            safelist: {
              standard: [
                'show',
                'active',
                'collapse',
                'collapsing',
                'dropdown-menu',
                'dropdown-menu-end',
                'dropdown-menu-center',
                /^modal-/,
                /^offcanvas-/,
                /^hljs-/,
                /^theme-switch-icon/,
                /^form-check-/,
                'cursor-pointer',
                'invisible'
              ],
              deep: [/^data-bs-theme/],
              greedy: [/^modal/, /^offcanvas/, /^dropdown/]
            },
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
          },
        }
      : {}),
  },
};

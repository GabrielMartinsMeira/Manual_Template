import Script from 'next/script';
import "../css/bootstrap-custom.css";
import "../css/app.css";
import "../css/sidebar.css";
import "../css/theme.css";
import "../css/print.css";

import { ThemeProvider } from "../components/ThemeProvider";

export const metadata = {
  title: "Manual Template",
  description: "Manual Template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />

        <link rel="manifest" href="/manifest.json" />

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
      </head>
      <body>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-SVRZNTTYSW" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SVRZNTTYSW');
            `,
          }}
        />

        <ThemeProvider>
          <div id="wrapper">{children}</div>
        </ThemeProvider>
      </body>

    </html>
  );
}

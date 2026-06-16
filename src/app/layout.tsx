import React from 'react';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PoliShield | Smart Insurance Analytics</title>
        <meta name="description" content="PoliShield uses AI to analyze insurance policies, predict claim rejections, and simplify finance." />
      </head>
      <body>
        <ThemeProvider {...{ attribute: "class", defaultTheme: "system", enableSystem: true } as any}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

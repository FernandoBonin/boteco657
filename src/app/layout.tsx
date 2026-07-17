import React from 'react';
import '../index.css';

export const metadata = {
  title: 'Boteco 647',
  description: 'O melhor torresmo de São Paulo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

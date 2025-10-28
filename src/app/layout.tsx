import '../globals.css';
import { ThemeScript } from '../components/ThemeScript';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

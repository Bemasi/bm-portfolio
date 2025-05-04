import '@/app/styles/globals.css';
import ThemeProvider from '@/themes/theme-provider';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio de Benja',
  description: 'Ingeniero de software especializado en desarrollo backend y cloud',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-(family-name:--font-jetbrains) bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

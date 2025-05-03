import '@/app/styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio de Benja',
  description: 'Ingeniero de software especializado en desarrollo backend y cloud',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

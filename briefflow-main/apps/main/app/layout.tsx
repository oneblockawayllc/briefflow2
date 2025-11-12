import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BriefFlow Prototype',
  description: 'Creative brief automation — prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-5xl p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">BriefFlow</h1>
            <nav className="space-x-4 text-sm">
              <a href="/">Home</a>
              <a href="/intake">New Brief</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}


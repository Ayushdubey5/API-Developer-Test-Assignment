import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'CelebNetwork - Celebrity Discovery Platform',
  description: 'Discover and connect with your favorite celebrities through AI-powered search and fan engagement',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

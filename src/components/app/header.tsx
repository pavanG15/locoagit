import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="font-bold font-headline text-2xl tracking-tighter">LocalPulse</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm ml-auto">
          <Button asChild>
            <Link href="/register-business">Register Business</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

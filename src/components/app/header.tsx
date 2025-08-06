import { Wifi } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex items-center gap-3">
            <Wifi className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight">
              SignalSage
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

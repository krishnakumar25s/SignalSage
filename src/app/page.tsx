import { AIChat } from '@/components/app/ai-chat';
import { Header } from '@/components/app/header';
import { SignalPredictor } from '@/components/app/signal-predictor';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-5 xl:grid-cols-3">
          <div className="lg:col-span-2 xl:col-span-1">
            <SignalPredictor />
          </div>
          <div className="lg:col-span-3 xl:col-span-2">
            <AIChat />
          </div>
        </div>
      </main>
    </div>
  );
}


'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AIChat } from '@/components/app/ai-chat';
import { Header } from '@/components/app/header';
import { SignalPredictor } from '@/components/app/signal-predictor';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Wifi } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

function IntroSection() {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-primary">
              {t.SignalSage}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
              Never settle for a bad connection again. Find the strongest, fastest mobile network in your area with AI-powered predictions.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 text-center">
              <div className="p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Wifi className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold font-headline">Signal Prediction</h3>
                <p className="mt-2 text-muted-foreground">
                  Use your location to instantly see which network operator offers the best signal strength and data speeds.
                </p>
              </div>
              <div className="p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Bot className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold font-headline">AI Assistant</h3>
                <p className="mt-2 text-muted-foreground">
                  Have questions about plans, pricing, or telecom concepts? Our AI Nanban is here to help you in your language.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto p-8">
            <div className="grid gap-8 lg:grid-cols-5 xl:grid-cols-3">
                <div className="lg:col-span-2 xl:col-span-1">
                    <Skeleton className="h-[500px] w-full" />
                </div>
                <div className="lg:col-span-3 xl:col-span-2">
                    <Skeleton className="h-[500px] w-full" />
                </div>
            </div>
        </main>
        </div>
    );
  }

  if (!user) {
    return <IntroSection />;
  }

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

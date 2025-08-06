'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AIChat } from '@/components/app/ai-chat';
import { Header } from '@/components/app/header';
import { SignalPredictor } from '@/components/app/signal-predictor';
import { Skeleton } from '@/components/ui/skeleton';


export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
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
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Wifi, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: t.signupFailed,
        description: t.passwordsDoNotMatch,
      });
      return;
    }
    setIsLoading(true);
    try {
      await signup(email, password);
      router.push('/');
      toast({
        title: t.signupSuccessful,
        description: t.accountCreated,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t.signupFailed,
        description: error.message || t.signupError,
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-8">
            <Wifi className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold font-headline text-primary tracking-tight">
              {t.SignalSage}
            </h1>
          </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t.SignUp}</CardTitle>
          <CardDescription>{t.signupDescription}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t.Email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t.Password}</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.createAccount}
            </Button>
            <div className="mt-4 text-center text-sm">
              {t.alreadyHaveAccount}{' '}
              <Link href="/login" className="underline">
                {t.SignIn}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

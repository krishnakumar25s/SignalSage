"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { StarRating } from '@/components/app/star-rating';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface Prediction {
  operator: string;
  logo: string;
  dataAiHint: string;
  rating: number;
}

const mockPredictions: Prediction[] = [
  { operator: 'Jio', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 5 },
  { operator: 'Airtel', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 4 },
  { operator: 'Vi', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 3 },
  { operator: 'BSNL', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 2 },
];

export function SignalPredictor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const { toast } = useToast();

  const handlePredict = () => {
    setIsLoading(true);
    setError(null);
    setPredictions(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser.",
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Simulate API call
        setTimeout(() => {
          setPredictions(mockPredictions.map(p => ({...p, rating: Math.floor(Math.random() * 5) + 1})));
          setIsLoading(false);
          toast({
            title: "Success!",
            description: "Signal strength predicted for your area.",
          });
        }, 1500);
      },
      (err) => {
        let errorMessage = "An unknown error occurred.";
        if (err.code === err.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please enable it in your browser settings to use this feature.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is unavailable.";
        } else if (err.code === err.TIMEOUT) {
            errorMessage = "The request to get user location timed out.";
        }
        setError(errorMessage);
        toast({
            variant: "destructive",
            title: "Geolocation Error",
            description: errorMessage,
        });
        setIsLoading(false);
      }
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <MapPin className="h-6 w-6 text-accent" />
          Signal Strength Predictor
        </CardTitle>
        <CardDescription>
          Find the best mobile network in your area. Click the button to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button onClick={handlePredict} disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            'Predict Signal in My Area'
          )}
        </Button>

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {predictions && (
          <div className="space-y-4 pt-4">
             <h3 className="font-semibold text-lg text-center">Prediction Results</h3>
            {predictions.map((pred) => (
              <div key={pred.operator} className="flex items-center justify-between p-3 rounded-lg bg-background border">
                <div className='flex items-center gap-4'>
                    <Image src={pred.logo} alt={`${pred.operator} logo`} width={40} height={40} className="rounded-full" data-ai-hint={pred.dataAiHint} />
                    <span className="font-semibold text-md">{pred.operator}</span>
                </div>
                <StarRating rating={pred.rating} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

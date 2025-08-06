
"use client";

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, XCircle, ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { JioIcon, AirtelIcon, ViIcon, BsnlIcon } from '@/components/app/icons';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { StarRating } from './star-rating';


interface Prediction {
  operator: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  rating: number;
  frequency: string;
  downloadSpeed: number; // in Mbps
  uploadSpeed: number; // in Mbps
  applyUrl: string;
}

const initialPredictions: Omit<Prediction, 'rating' | 'downloadSpeed' | 'uploadSpeed'>[] = [
    { operator: 'Jio', logo: JioIcon, frequency: '700 MHz (5G)', applyUrl: 'https://www.jio.com' },
    { operator: 'Airtel', logo: AirtelIcon, frequency: '900 MHz (4G)', applyUrl: 'https://www.airtel.in' },
    { operator: 'Vi', logo: ViIcon, frequency: '2100 MHz (4G)', applyUrl: 'https://www.myvi.in' },
    { operator: 'BSNL', logo: BsnlIcon, frequency: '1800 MHz (4G)', applyUrl: 'https://www.bsnl.co.in' },
];

export function SignalPredictor() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopPrediction = () => {
    setIsPredicting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Clear interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const generateRandomValues = (p: Omit<Prediction, 'rating' | 'downloadSpeed' | 'uploadSpeed'>): Prediction => ({
    ...p,
    rating: Math.floor(Math.random() * 5) + 1,
    downloadSpeed: Math.floor(Math.random() * (150 - 10 + 1)) + 10,
    uploadSpeed: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
  });


  const handlePredict = () => {
    setIsPredicting(true);
    setError(null);
    setPredictions(null);

    if (!navigator.geolocation) {
      const errorMsg = t.geolocationNotSupported;
      setError(errorMsg);
      toast({
        variant: "destructive",
        title: t.Error,
        description: errorMsg,
      });
      setIsPredicting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Initial prediction and sort
        const initialSortedPredictions = initialPredictions
          .map(generateRandomValues)
          .sort((a, b) => b.rating - a.rating || b.downloadSpeed - a.downloadSpeed);
        setPredictions(initialSortedPredictions);

        toast({
          title: t.Success,
          description: t.signalStrengthPredicted,
        });

        // Start interval to update predictions without re-sorting
        intervalRef.current = setInterval(() => {
          setPredictions(prevPredictions => {
            if (!prevPredictions) return null;
            // Update values but keep the same order
            return prevPredictions.map(p => ({
              ...p,
              rating: Math.floor(Math.random() * 5) + 1,
              downloadSpeed: Math.floor(Math.random() * (150 - 10 + 1)) + 10,
              uploadSpeed: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
            }));
          });
        }, 2000);
      },
      (err) => {
        let errorMessage = t.geolocationUnknownError;
        if (err.code === err.PERMISSION_DENIED) {
            errorMessage = t.geolocationPermissionDenied;
        } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMessage = t.geolocationPositionUnavailable;
        } else if (err.code === err.TIMEOUT) {
            errorMessage = t.geolocationTimeout;
        }
        setError(errorMessage);
        toast({
            variant: "destructive",
            title: t.GeolocationError,
            description: errorMessage,
        });
        setIsPredicting(false);
      }
    );
  };
  
  return (
    <Card className="shadow-lg bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl text-slate-800">
          <MapPin className="h-6 w-6 text-accent" />
          {t.SignalStrengthPredictor}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {t.findBestNetwork}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isPredicting ? (
            <Button onClick={handlePredict} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                {t.predictSignalInMyArea}
            </Button>
        ) : (
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-accent font-semibold mb-2">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.Predicting}...
                </div>
                <Button onClick={stopPrediction} variant="outline" size="sm">
                    <XCircle className="mr-2 h-4 w-4" />
                    Stop Scanning
                </Button>
            </div>
        )}

        {error && !isPredicting && (
            <Alert variant="destructive">
                <AlertTitle>{t.Error}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {predictions && (
          <div className="space-y-4 pt-4">
             <h3 className="font-semibold text-lg text-center text-slate-700 mb-4">{t.predictionResults}</h3>
              <div className="flex flex-col gap-3">
                {predictions.map((pred, index) => (
                    <Link key={pred.operator} href={`/operator/${pred.operator.toLowerCase()}`} className="block">
                        <Card className="hover:shadow-md hover:border-accent transition-all">
                           <CardContent className="p-4 flex items-center gap-4">
                                <div className="text-lg font-bold text-slate-500 w-4">{index + 1}.</div>
                                <pred.logo className="h-10 w-10" />
                                <div className="flex-1">
                                    <div className='flex justify-between items-center'>
                                        <p className="font-bold text-slate-800">{pred.operator}</p>
                                        <StarRating rating={pred.rating} />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                                        <div className="flex items-center gap-1">
                                            <ArrowDown className="h-4 w-4 text-green-500" />
                                            <span>{pred.downloadSpeed} Mbps</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ArrowUp className="h-4 w-4 text-orange-500" />
                                            <span>{pred.uploadSpeed} Mbps</span>
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="text-slate-400" />
                           </CardContent>
                        </Card>
                    </Link>
                ))}
              </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

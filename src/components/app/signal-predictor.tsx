
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, ArrowRight, ArrowDown, ArrowUp, Award } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { JioIcon, AirtelIcon, ViIcon, BsnlIcon } from '@/components/app/icons';
import { useLanguage } from '@/context/language-context';
import { StarRating } from './star-rating';


interface Prediction {
  operator: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  rating: number;
  downloadSpeed: number; // in Mbps
  uploadSpeed: number; // in Mbps
}

const initialPredictions: Omit<Prediction, 'rating' | 'downloadSpeed' | 'uploadSpeed'>[] = [
    { operator: 'Airtel', logo: AirtelIcon },
    { operator: 'BSNL', logo: BsnlIcon },
    { operator: 'Jio', logo: JioIcon },
    { operator: 'Vi', logo: ViIcon },
];

export function SignalPredictor() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [bestPrediction, setBestPrediction] = useState<Prediction | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

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
    setBestPrediction(null);

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
        const generatedPredictions = initialPredictions.map(generateRandomValues);
        
        const best = generatedPredictions.reduce((max, p) => p.rating > max.rating ? p : max, generatedPredictions[0]);
        setBestPrediction(best);

        const otherPredictions = generatedPredictions
            .filter(p => p.operator !== best.operator)
            .sort((a, b) => a.operator.localeCompare(b.operator));
        
        setPredictions(otherPredictions);
        setIsPredicting(false);

        toast({
          title: t.Success,
          description: t.signalStrengthPredicted,
        });
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
        <Button onClick={handlePredict} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold" disabled={isPredicting}>
            {isPredicting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPredicting ? t.Predicting + '...' : t.predictSignalInMyArea}
        </Button>

        {error && (
            <Alert variant="destructive">
                <AlertTitle>{t.Error}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {(bestPrediction || (predictions && predictions.length > 0)) && (
          <div className="space-y-4 pt-4">
             <h3 className="font-semibold text-lg text-center text-slate-700 mb-4">{t.predictionResults}</h3>
            
            {bestPrediction && (
                 <Card className="border-primary border-2 bg-primary/5">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-center gap-2 text-lg text-primary">
                            <Award />
                            Best Choice
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <Link href={`/operator/${bestPrediction.operator.toLowerCase()}`} className="block">
                            <Card className="hover:shadow-md hover:border-accent transition-all bg-white">
                               <CardContent className="p-4 flex items-center gap-4">
                                    <bestPrediction.logo className="h-10 w-10" />
                                    <div className="flex-1">
                                        <div className='flex justify-between items-center'>
                                            <p className="font-bold text-slate-800">{bestPrediction.operator}</p>
                                            <StarRating rating={bestPrediction.rating} />
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                                            <div className="flex items-center gap-1">
                                                <ArrowDown className="h-4 w-4 text-green-500" />
                                                <span>{bestPrediction.downloadSpeed} Mbps</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ArrowUp className="h-4 w-4 text-orange-500" />
                                                <span>{bestPrediction.uploadSpeed} Mbps</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-slate-400" />
                               </CardContent>
                            </Card>
                        </Link>
                    </CardContent>
                </Card>
            )}

            {predictions && predictions.length > 0 && (
                 <div className="flex flex-col gap-3 pt-4">
                    {predictions.map((pred) => (
                        <Link key={pred.operator} href={`/operator/${pred.operator.toLowerCase()}`} className="block">
                            <Card className="hover:shadow-md hover:border-accent transition-all">
                               <CardContent className="p-4 flex items-center gap-4">
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
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

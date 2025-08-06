
"use client";

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Loader2, MapPin, Wifi, XCircle } from 'lucide-react';
import { StarRating } from '@/components/app/star-rating';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { JioIcon, AirtelIcon, ViIcon, BsnlIcon } from '@/components/app/icons';
import { useLanguage } from '@/context/language-context';

interface Prediction {
  operator: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  rating: number;
  frequency: string;
  downloadSpeed: number; // in Mbps
  uploadSpeed: number; // in Mbps
}

const initialPredictions: Omit<Prediction, 'rating' | 'downloadSpeed' | 'uploadSpeed'>[] = [
    { operator: 'Jio', logo: JioIcon, frequency: '700 MHz (5G)' },
    { operator: 'Airtel', logo: AirtelIcon, frequency: '900 MHz (4G)' },
    { operator: 'Vi', logo: ViIcon, frequency: '2100 MHz (4G)' },
    { operator: 'BSNL', logo: BsnlIcon, frequency: '1800 MHz (4G)' },
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

  const generatePredictions = () => {
    const mockPredictions = initialPredictions.map(p => ({
        ...p, 
        rating: Math.floor(Math.random() * 5) + 1,
        downloadSpeed: Math.floor(Math.random() * (150 - 10 + 1)) + 10,
        uploadSpeed: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
      })).sort((a, b) => b.rating - a.rating || b.downloadSpeed - a.downloadSpeed);
    setPredictions(mockPredictions);
  };

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
        generatePredictions(); // Generate initial predictions immediately
        toast({
          title: t.Success,
          description: t.signalStrengthPredicted,
        });

        // Start interval to update predictions every 2 seconds
        intervalRef.current = setInterval(() => {
          generatePredictions();
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
             <h3 className="font-semibold text-lg text-center text-slate-700">{t.predictionResults}</h3>
            {predictions.map((pred) => (
              <Link href={`/operator/${pred.operator.toLowerCase()}`} key={pred.operator}>
                <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                  <CardHeader className='p-4'>
                      <div className="flex items-center justify-between">
                          <div className='flex items-center gap-4'>
                              <pred.logo className="rounded-full" />
                              <span className="font-semibold text-md text-slate-800">{pred.operator}</span>
                          </div>
                          <StarRating rating={pred.rating} />
                      </div>
                  </CardHeader>
                  <CardContent className='p-0'>
                      <Table>
                          <TableBody>
                              <TableRow>
                                  <TableCell className="font-medium flex items-center gap-2 text-slate-600"><Wifi size={16}/>{t.Frequency}</TableCell>
                                  <TableCell className="text-right text-slate-800">{pred.frequency}</TableCell>
                              </TableRow>
                              <TableRow>
                                  <TableCell className="font-medium flex items-center gap-2 text-slate-600"><ArrowDown size={16}/>{t.Download}</TableCell>
                                  <TableCell className="text-right text-slate-800">{pred.downloadSpeed} Mbps</TableCell>
                              </TableRow>
                              <TableRow>
                                  <TableCell className="font-medium flex items-center gap-2 text-slate-600"><ArrowUp size={16}/>{t.Upload}</TableCell>
                                  <TableCell className="text-right text-slate-800">{pred.uploadSpeed} Mbps</TableCell>
                              </TableRow>
                          </TableBody>
                      </Table>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

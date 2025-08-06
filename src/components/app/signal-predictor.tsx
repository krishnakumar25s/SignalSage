
"use client";

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, XCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { JioIcon, AirtelIcon, ViIcon, BsnlIcon } from '@/components/app/icons';
import { useLanguage } from '@/context/language-context';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';


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
    { operator: 'Jio', logo: JioIcon, frequency: '700 MHz (5G)', applyUrl: 'https://www.jio.com/get-jio-sim' },
    { operator: 'Airtel', logo: AirtelIcon, frequency: '900 MHz (4G)', applyUrl: 'https://www.airtel.in/prepaid/new-prepaid-sim-connection/' },
    { operator: 'Vi', logo: ViIcon, frequency: '2100 MHz (4G)', applyUrl: 'https://www.myvi.in/new-connection/buy-prepaid-sim-card-online' },
    { operator: 'BSNL', logo: BsnlIcon, frequency: '1800 MHz (4G)', applyUrl: 'https://www.bsnl.co.in/opencms/bsnl/BSNL/services/mobile/new_mobile_connection.html' },
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
  
  const chartConfig = {
    downloadSpeed: {
      label: "Download (Mbps)",
      color: "hsl(var(--chart-1))",
    },
    uploadSpeed: {
      label: "Upload (Mbps)",
      color: "hsl(var(--chart-2))",
    },
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
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={predictions}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="operator"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <YAxis
                        width={30}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="downloadSpeed" fill="var(--color-downloadSpeed)" radius={4} name="Download" />
                    <Bar dataKey="uploadSpeed" fill="var(--color-uploadSpeed)" radius={4} name="Upload" />
                </BarChart>
              </ChartContainer>

              <div className="flex flex-col gap-2">
                {predictions.map(pred => (
                    <div key={pred.operator}>
                        <Button asChild variant="outline" className="w-full justify-center">
                             <Link href={`/operator/${pred.operator.toLowerCase()}`}>
                                <pred.logo className="mr-2" />
                                {pred.operator}
                            </Link>
                        </Button>
                    </div>
                ))}
              </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

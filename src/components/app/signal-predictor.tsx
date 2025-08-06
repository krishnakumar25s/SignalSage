"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Loader2, MapPin, Wifi } from 'lucide-react';
import { StarRating } from '@/components/app/star-rating';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface Prediction {
  operator: string;
  logo: string;
  dataAiHint: string;
  rating: number;
  frequency: string;
  downloadSpeed: number; // in Mbps
  uploadSpeed: number; // in Mbps
}

const initialPredictions: Prediction[] = [
    { operator: 'Jio', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 0, frequency: '700 MHz (5G)', downloadSpeed: 0, uploadSpeed: 0 },
    { operator: 'Airtel', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 0, frequency: '900 MHz (4G)', downloadSpeed: 0, uploadSpeed: 0 },
    { operator: 'Vi', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 0, frequency: '2100 MHz (4G)', downloadSpeed: 0, uploadSpeed: 0 },
    { operator: 'BSNL', logo: 'https://placehold.co/40x40.png', dataAiHint: 'telecom logo', rating: 0, frequency: '1800 MHz (4G)', downloadSpeed: 0, uploadSpeed: 0 },
];

export function SignalPredictor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const { toast } = useToast();

   useEffect(() => {
    // This empty useEffect ensures the component is treated as a client component,
    // preventing hydration errors with the random data generation.
  }, []);

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
          const mockPredictions = initialPredictions.map(p => ({
              ...p, 
              rating: Math.floor(Math.random() * 5) + 1,
              downloadSpeed: Math.floor(Math.random() * (150 - 10 + 1)) + 10,
              uploadSpeed: Math.floor(Math.random() * (50 - 5 + 1)) + 5,
            })).sort((a, b) => b.rating - a.rating || b.downloadSpeed - a.downloadSpeed);
          setPredictions(mockPredictions);
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
    <Card className="shadow-lg bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl text-slate-800">
          <MapPin className="h-6 w-6 text-accent" />
          Signal Strength Predictor
        </CardTitle>
        <CardDescription className="text-slate-600">
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
             <h3 className="font-semibold text-lg text-center text-slate-700">Prediction Results</h3>
            {predictions.map((pred) => (
              <Link href={`/operator/${pred.operator.toLowerCase()}`} key={pred.operator}>
                <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                  <CardHeader className='p-4'>
                      <div className="flex items-center justify-between">
                          <div className='flex items-center gap-4'>
                              <Image src={pred.logo} alt={`${pred.operator} logo`} width={40} height={40} className="rounded-full" data-ai-hint={pred.dataAiHint} />
                              <span className="font-semibold text-md text-slate-800">{pred.operator}</span>
                          </div>
                          <StarRating rating={pred.rating} />
                      </div>
                  </CardHeader>
                  <CardContent className='p-0'>
                      <Table>
                          <TableBody>
                              <TableRow>
                                  <TableCell className="font-medium flex items-center gap-2 text-slate-600"><Wifi size={16}/>Frequency</TableCell>
                                  <TableCell className="text-right text-slate-800">{pred.frequency}</TableCell>
                              </TableRow>
                              <TableRow>
                                  <TableCell className="font-medium flex items-center gap-2 text-slate-600"><ArrowDown size={16}/>Download</TableCell>
                                  <TableCell className="text-right text-slate-800">{pred.downloadSpeed} Mbps</TableCell>
                              </TableRow>
                              <TableRow>
                                  <TableCell className="font-medium flex items-center gap-2 text-slate-600"><ArrowUp size={16}/>Upload</TableCell>
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

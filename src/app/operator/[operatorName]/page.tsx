import { Header } from '@/components/app/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StarRating } from '@/components/app/star-rating';
import { Wifi, ArrowDown, ArrowUp, BarChart, TrendingUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { JioIcon, AirtelIcon, ViIcon, BsnlIcon } from '@/components/app/icons';

const OPERATOR_LOGOS = {
  jio: JioIcon,
  airtel: AirtelIcon,
  vi: ViIcon,
  bsnl: BsnlIcon,
};


// This is mock data. In a real application, you would fetch this data
// based on the operatorName from a database or an API.
const MOCK_OPERATOR_DATA = {
  jio: {
    name: 'Jio',
    logo: JioIcon,
    rating: 5,
    description: 'Jio is known for its extensive 5G network and competitive data plans across India.',
    details: [
      { metric: 'Signal Strength', value: 'Excellent', icon: Wifi },
      { metric: '5G Availability', value: 'High', icon: BarChart },
      { metric: 'Avg. Download Speed', value: '145 Mbps', icon: ArrowDown },
      { metric: 'Avg. Upload Speed', value: '48 Mbps', icon: ArrowUp },
      { metric: 'Customer Support', value: 'Good', icon: HelpCircle },
      { metric: 'Value for Money', value: 'Excellent', icon: TrendingUp },
    ],
  },
  airtel: {
    name: 'Airtel',
    logo: AirtelIcon,
    rating: 4,
    description: 'Airtel offers reliable 4G connectivity and is rapidly expanding its 5G services.',
    details: [
        { metric: 'Signal Strength', value: 'Good', icon: Wifi },
        { metric: '5G Availability', value: 'Medium', icon: BarChart },
        { metric: 'Avg. Download Speed', value: '80 Mbps', icon: ArrowDown },
        { metric: 'Avg. Upload Speed', value: '30 Mbps', icon: ArrowUp },
        { metric: 'Customer Support', value: 'Excellent', icon: HelpCircle },
        { metric: 'Value for Money', value: 'Good', icon: TrendingUp },
    ],
  },
  vi: {
    name: 'Vi',
    logo: ViIcon,
    rating: 3,
    description: 'Vi (Vodafone Idea) provides good coverage in urban areas with competitive pricing.',
    details: [
        { metric: 'Signal Strength', value: 'Average', icon: Wifi },
        { metric: '5G Availability', value: 'Low', icon: BarChart },
        { metric: 'Avg. Download Speed', value: '45 Mbps', icon: ArrowDown },
        { metric: 'Avg. Upload Speed', value: '15 Mbps', icon: ArrowUp },
        { metric: 'Customer Support', value: 'Average', icon: HelpCircle },
        { metric: 'Value for Money', 'value': 'Good', icon: TrendingUp },
    ],
  },
  bsnl: {
    name: 'BSNL',
    logo: BsnlIcon,
    rating: 2,
    description: 'BSNL has wide coverage in rural India, though data speeds can be slower.',
    details: [
        { metric: 'Signal Strength', value: 'Average', icon: Wifi },
        { metric: '5G Availability', value: 'None', icon: BarChart },
        { metric: 'Avg. Download Speed', value: '12 Mbps', icon: ArrowDown },
        { metric: 'Avg. Upload Speed', value: '5 Mbps', icon: ArrowUp },
        { metric: 'Customer Support', value: 'Needs Improvement', icon: HelpCircle },
        { metric: 'Value for Money', value: 'Average', icon: TrendingUp },
    ],
  },
};

type OperatorData = typeof MOCK_OPERATOR_DATA.jio;

export default function OperatorPage({ params }: { params: { operatorName: string } }) {
  const operatorKey = params.operatorName.toLowerCase() as keyof typeof MOCK_OPERATOR_DATA;
  const operatorData: OperatorData | undefined = MOCK_OPERATOR_DATA[operatorKey];

  if (!operatorData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto p-8 flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Operator Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The operator you are looking for does not exist.</p>
              <Button asChild className="mt-4">
                <Link href="/">Go Back Home</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
  const { name, logo: Logo, rating, description, details } = operatorData;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 w-full container mx-auto p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-2xl mx-auto shadow-xl bg-white border-slate-200">
          <CardHeader className="text-center items-center">
            <Logo className="rounded-full mb-4 h-20 w-20" />
            <CardTitle className="text-3xl font-headline text-slate-800">{name}</CardTitle>
            <div className="pt-2">
                <StarRating rating={rating} />
            </div>
            <CardDescription className="pt-2 text-slate-600 text-base">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-slate-700'>Metric</TableHead>
                        <TableHead className="text-right text-slate-700">Value</TableHead>
                    </TableRow>
                </TableHeader>
              <TableBody>
                {details.map((item) => (
                  <TableRow key={item.metric}>
                    <TableCell className="font-medium flex items-center gap-2 text-slate-600">
                        <item.icon size={18} /> {item.metric}
                    </TableCell>
                    <TableCell className="text-right text-slate-800">{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/">Back to Predictions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

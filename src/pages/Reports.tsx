import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BarChart3, 
  Download, 
  Share,
  TrendingUp,
  TrendingDown,
  Activity,
  Hand,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Simulated data for charts
  const tremorData = [
    { day: 'Mon', intensity: 45, frequency: 4.2 },
    { day: 'Tue', intensity: 38, frequency: 3.8 },
    { day: 'Wed', intensity: 52, frequency: 4.6 },
    { day: 'Thu', intensity: 41, frequency: 4.1 },
    { day: 'Fri', intensity: 48, frequency: 4.4 },
    { day: 'Sat', intensity: 35, frequency: 3.6 },
    { day: 'Sun', intensity: 42, frequency: 4.0 }
  ];

  const gripUsage = [
    { name: 'Precision', value: 35, color: 'bg-primary' },
    { name: 'Power', value: 25, color: 'bg-secondary' },
    { name: 'Tripod', value: 20, color: 'bg-accent' },
    { name: 'Hook', value: 12, color: 'bg-status-mild' },
    { name: 'Spherical', value: 8, color: 'bg-status-normal' }
  ];

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report...`,
      variant: "default",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Report",
      description: "Report prepared for sharing with healthcare provider.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-medical-lg font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm">Track your progress and trends</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share className="w-4 h-4" />
        </Button>
      </div>

      {/* Period Selection */}
      <div className="flex gap-2 mb-6">
        {['day', 'week', 'month'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
            className="capitalize"
          >
            <Calendar className="w-4 h-4 mr-1" />
            {period}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="tremor" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tremor">Tremor Trends</TabsTrigger>
          <TabsTrigger value="grip">Grip Usage</TabsTrigger>
          <TabsTrigger value="correlation">Medication</TabsTrigger>
        </TabsList>

        {/* Tremor Trends Tab */}
        <TabsContent value="tremor" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">Avg Intensity</span>
                </div>
                <p className="text-2xl font-bold text-secondary">43.2</p>
                <p className="text-xs text-secondary">-8% this week</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Avg Frequency</span>
                </div>
                <p className="text-2xl font-bold text-primary">4.1Hz</p>
                <p className="text-xs text-primary">Stable</p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Tremor Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-medical-md flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Weekly Tremor Intensity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end justify-between gap-2 p-4">
                {tremorData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-primary rounded-t w-full mb-2"
                      style={{ height: `${(data.intensity / 60) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{data.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="font-semibold">Best Day</p>
                  <p className="text-secondary">Saturday</p>
                </div>
                <div>
                  <p className="font-semibold">Worst Day</p>
                  <p className="text-status-severe">Wednesday</p>
                </div>
                <div>
                  <p className="font-semibold">Improvement</p>
                  <p className="text-secondary">-8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grip Usage Tab */}
        <TabsContent value="grip" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-medical-md flex items-center gap-2">
                <Hand className="w-5 h-5" />
                Grip Pattern Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gripUsage.map((grip, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-medical-sm font-medium">{grip.name}</span>
                      <span className="text-sm text-muted-foreground">{grip.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${grip.color}`}
                        style={{ width: `${grip.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Weekly Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Most Used</p>
                    <p className="font-semibold">Precision Grip</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Changes</p>
                    <p className="font-semibold">84 times</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medication Correlation Tab */}
        <TabsContent value="correlation" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-medical-md">Medication vs Tremor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Morning Medication</span>
                    <Badge variant="secondary">8:00 AM</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Tremor reduced by 35% within 2 hours</p>
                    <div className="w-full bg-background rounded-full h-2 mt-2">
                      <div className="bg-secondary h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Evening Medication</span>
                    <Badge variant="secondary">6:00 PM</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Tremor reduced by 28% within 2 hours</p>
                    <div className="w-full bg-background rounded-full h-2 mt-2">
                      <div className="bg-secondary h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <h4 className="font-semibold text-primary mb-2">Insights</h4>
                <ul className="text-sm space-y-1">
                  <li>• Morning medication shows better tremor control</li>
                  <li>• Optimal timing appears to be 8:00 AM and 6:00 PM</li>
                  <li>• Consider discussing timing adjustments with doctor</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card className="mt-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md">Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleExport('csv')}
              className="h-12"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExport('pdf')}
              className="h-12"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Reports include all tremor data, grip usage, and medication correlation
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
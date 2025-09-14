import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Activity, 
  AlertTriangle, 
  Bell,
  Play,
  Pause,
  Save
} from "lucide-react";

const TremorMonitoring = () => {
  const navigate = useNavigate();
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [currentFrequency, setCurrentFrequency] = useState(4.2);
  const [currentAmplitude, setCurrentAmplitude] = useState(65);
  const [status, setStatus] = useState<'normal' | 'mild' | 'severe'>('mild');
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  // Simulate real-time tremor data
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Generate simulated tremor data (3-8 Hz range)
      const frequency = 3 + Math.random() * 5;
      const amplitude = 30 + Math.random() * 70;
      
      setCurrentFrequency(Number(frequency.toFixed(1)));
      setCurrentAmplitude(Number(amplitude.toFixed(0)));
      
      // Update status based on amplitude
      if (amplitude < 40) setStatus('normal');
      else if (amplitude < 70) setStatus('mild');
      else setStatus('severe');

      // Update chart data
      setDataPoints(prev => [...prev.slice(-19), amplitude]);
    }, 1000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-gradient-status-normal';
      case 'mild': return 'bg-gradient-status-mild';
      case 'severe': return 'bg-gradient-status-severe';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal Range';
      case 'mild': return 'Mild Tremor';
      case 'severe': return 'Severe Tremor';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-medical-lg font-bold">Tremor Monitoring</h1>
          <p className="text-muted-foreground text-sm">Real-time tremor analysis</p>
        </div>
      </div>

      {/* Status Card */}
      <Card className="mb-6 shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></div>
              <span className="text-medical-md font-semibold">{getStatusText(status)}</span>
            </div>
            {status === 'severe' && (
              <AlertTriangle className="w-6 h-6 text-status-severe" />
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-primary">{currentFrequency}</p>
              <p className="text-sm text-muted-foreground">Hz</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-secondary">{currentAmplitude}</p>
              <p className="text-sm text-muted-foreground">Amplitude</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Chart Simulation */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Tremor Graph
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted rounded-lg p-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-end p-4 gap-1">
              {dataPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-primary rounded-t"
                  style={{
                    height: `${(point / 100) * 100}%`,
                    width: '12px',
                    opacity: 0.7 + (index / dataPoints.length) * 0.3
                  }}
                />
              ))}
            </div>
            <div className="absolute top-4 left-4 text-sm text-muted-foreground">
              100%
            </div>
            <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
              0%
            </div>
            <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
              20s
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-medical-sm">Monitoring</p>
                <p className="text-sm text-muted-foreground">Real-time tracking</p>
              </div>
              <Button
                variant={isMonitoring ? "default" : "secondary"}
                size="sm"
                onClick={() => setIsMonitoring(!isMonitoring)}
              >
                {isMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-medical-sm">Alerts</p>
                <p className="text-sm text-muted-foreground">Threshold notifications</p>
              </div>
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full h-12 text-medical-md font-semibold"
          variant="default"
        >
          <Save className="w-5 h-5 mr-2" />
          Log Current Episode
        </Button>
        
        <Button 
          className="w-full h-12 text-medical-md"
          variant="outline"
          onClick={() => navigate("/control")}
        >
          <Activity className="w-5 h-5 mr-2" />
          Open Prosthetic Control
        </Button>
      </div>

      {/* Alert Card */}
      {status === 'severe' && alertsEnabled && (
        <Card className="mt-6 border-status-severe bg-status-severe/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-status-severe" />
              <div>
                <p className="font-semibold text-status-severe">High Tremor Detected</p>
                <p className="text-sm text-muted-foreground">Consider activating stabilization mode</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TremorMonitoring;
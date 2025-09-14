import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Zap, 
  Hand,
  Grip,
  Settings,
  Send,
  Bluetooth,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProstheticControl = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGrip, setSelectedGrip] = useState<string>('precision');
  const [adaptiveDamping, setAdaptiveDamping] = useState([75]);
  const [stabilizationMode, setStabilizationMode] = useState(true);
  const [responsiveness, setResponsiveness] = useState([60]);
  const [isConnected, setIsConnected] = useState(true);

  const gripPatterns = [
    {
      id: 'precision',
      name: 'Precision',
      description: 'Fine motor tasks',
      icon: '🎯',
      color: 'bg-primary'
    },
    {
      id: 'power',
      name: 'Power',
      description: 'Strong grip tasks',
      icon: '💪',
      color: 'bg-secondary'
    },
    {
      id: 'tripod',
      name: 'Tripod',
      description: 'Writing & tools',
      icon: '✏️',
      color: 'bg-accent'
    },
    {
      id: 'hook',
      name: 'Hook',
      description: 'Carrying objects',
      icon: '🪝',
      color: 'bg-status-mild'
    },
    {
      id: 'spherical',
      name: 'Spherical',
      description: 'Round objects',
      icon: '🏀',
      color: 'bg-status-normal'
    }
  ];

  const handleSendToDevice = () => {
    if (!isConnected) {
      toast({
        title: "Connection Error",
        description: "Please connect to your prosthetic device first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Settings Updated",
      description: `${gripPatterns.find(g => g.id === selectedGrip)?.name} grip pattern activated.`,
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
          <h1 className="text-medical-lg font-bold">Prosthetic Control</h1>
          <p className="text-muted-foreground text-sm">Configure grip patterns and tremor compensation</p>
        </div>
        <div className="flex items-center gap-2">
          <Bluetooth className={`w-5 h-5 ${isConnected ? 'text-primary' : 'text-muted-foreground'}`} />
          <Badge variant={isConnected ? "default" : "secondary"}>
            {isConnected ? "Connected" : "Offline"}
          </Badge>
        </div>
      </div>

      {/* Grip Pattern Selection */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <Hand className="w-5 h-5" />
            Grip Pattern Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {gripPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedGrip === pattern.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedGrip(pattern.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{pattern.icon}</div>
                  <h3 className="font-semibold text-medical-sm">{pattern.name}</h3>
                  <p className="text-xs text-muted-foreground">{pattern.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Current: {gripPatterns.find(g => g.id === selectedGrip)?.name}</span>
          </div>
        </CardContent>
      </Card>

      {/* Tremor Control Settings */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Tremor Compensation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Adaptive Damping */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-medical-sm">Adaptive Damping</label>
              <span className="text-sm text-muted-foreground">{adaptiveDamping[0]}%</span>
            </div>
            <Slider
              value={adaptiveDamping}
              onValueChange={setAdaptiveDamping}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Automatically reduces tremor-induced movements
            </p>
          </div>

          {/* Stabilization Mode */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-medical-sm">Stabilization Mode</p>
              <p className="text-xs text-muted-foreground">Real-time tremor cancellation</p>
            </div>
            <Switch
              checked={stabilizationMode}
              onCheckedChange={setStabilizationMode}
            />
          </div>

          {/* Responsiveness Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-medical-sm">Responsiveness</label>
              <span className="text-sm text-muted-foreground">{responsiveness[0]}%</span>
            </div>
            <Slider
              value={responsiveness}
              onValueChange={setResponsiveness}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Controls how quickly the device responds to commands
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Haptic Feedback Display */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md">Haptic Feedback Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <div className="w-4 h-4 bg-status-normal rounded-full mx-auto mb-2"></div>
              <p className="text-xs font-semibold">Normal</p>
              <p className="text-xs text-muted-foreground">Gentle pulse</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="w-4 h-4 bg-status-mild rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-xs font-semibold">Alert</p>
              <p className="text-xs text-muted-foreground">Medium pulse</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="w-4 h-4 bg-status-severe rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-xs font-semibold">Warning</p>
              <p className="text-xs text-muted-foreground">Strong pulse</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send to Device Button */}
      <div className="space-y-3">
        <Button 
          onClick={handleSendToDevice}
          disabled={!isConnected}
          className="w-full h-12 text-medical-md font-semibold"
          size="lg"
        >
          <Send className="w-5 h-5 mr-2" />
          Send to Device
        </Button>

        <Button 
          variant="outline"
          className="w-full h-12 text-medical-md"
          onClick={() => navigate("/monitoring")}
        >
          <Grip className="w-5 h-5 mr-2" />
          View Tremor Monitor
        </Button>
      </div>

      {/* Quick Settings */}
      <Card className="mt-6 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-medical-sm">Quick Calibration</p>
              <p className="text-sm text-muted-foreground">Reset to factory settings</p>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProstheticControl;
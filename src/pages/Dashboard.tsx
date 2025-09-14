import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Settings, 
  BarChart3, 
  Zap, 
  User, 
  Bell,
  Bluetooth,
  Battery
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tremorStatus, setTremorStatus] = useState<'normal' | 'mild' | 'severe'>('normal');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate tremor status changes for demo
      const statuses: ('normal' | 'mild' | 'severe')[] = ['normal', 'mild', 'severe'];
      setTremorStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-gradient-status-normal text-white';
      case 'mild': return 'bg-gradient-status-mild text-white';
      case 'severe': return 'bg-gradient-status-severe text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-medical-lg font-bold">John Smith</h1>
            <p className="text-muted-foreground text-sm">Good Morning</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bluetooth className="w-4 h-4 text-primary" />
            <span>Connected</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Battery className="w-4 h-4 text-secondary" />
            <span>85%</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/settings")}>
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Current Status Card */}
      <Card className="mb-6 shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-medical-md">Current Status</CardTitle>
            <Bell className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg ${getStatusColor(tremorStatus)} font-semibold text-medical-sm capitalize`}>
              {tremorStatus}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Action Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card 
          className="shadow-card hover:shadow-medical transition-shadow cursor-pointer"
          onClick={() => navigate("/monitoring")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-medical-md font-semibold mb-2">Tremor Monitor</h3>
            <p className="text-sm text-muted-foreground">Real-time tracking</p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-card hover:shadow-medical transition-shadow cursor-pointer"
          onClick={() => navigate("/control")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-medical-md font-semibold mb-2">Prosthetic Control</h3>
            <p className="text-sm text-muted-foreground">Grip patterns</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Action Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="shadow-card hover:shadow-medical transition-shadow cursor-pointer"
          onClick={() => navigate("/reports")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-medical-md font-semibold mb-2">Reports</h3>
            <p className="text-sm text-muted-foreground">View trends</p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-card hover:shadow-medical transition-shadow cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Settings className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-medical-md font-semibold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">Configuration</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Summary */}
      <Card className="mt-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md">Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">8.2hrs</p>
              <p className="text-sm text-muted-foreground">Active time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">12</p>
              <p className="text-sm text-muted-foreground">Grip changes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">4.1Hz</p>
              <p className="text-sm text-muted-foreground">Avg frequency</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
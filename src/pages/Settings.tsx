import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User, 
  Settings as SettingsIcon,
  Bluetooth,
  Cloud,
  Shield,
  Bell,
  RotateCcw,
  Save,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Patient Profile State
  const [profile, setProfile] = useState({
    name: "John Smith",
    age: "68",
    conditionSeverity: "Moderate",
    medicationSchedule: "8:00 AM, 6:00 PM"
  });

  // Settings State
  const [settings, setSettings] = useState({
    bluetoothEnabled: true,
    cloudBackup: true,
    notifications: true,
    hapticFeedback: true,
    autoCalibration: false
  });

  const [isConnected, setIsConnected] = useState(true);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your patient profile has been saved successfully.",
      variant: "default",
    });
  };

  const handleRunCalibration = () => {
    toast({
      title: "Calibration Started",
      description: "Please follow the on-screen instructions...",
      variant: "default",
    });
  };

  const handleBluetoothPair = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Device Disconnected" : "Device Connected",
      description: isConnected ? "Prosthetic device disconnected" : "Successfully paired with prosthetic device",
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
        <div>
          <h1 className="text-medical-lg font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Patient Profile */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <User className="w-5 h-5" />
            Patient Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-medical-sm font-semibold">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="age" className="text-medical-sm font-semibold">Age</Label>
              <Input
                id="age"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="severity" className="text-medical-sm font-semibold">Condition Severity</Label>
            <div className="mt-2 flex gap-2">
              {['Mild', 'Moderate', 'Severe'].map((severity) => (
                <Button
                  key={severity}
                  variant={profile.conditionSeverity === severity ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProfile({...profile, conditionSeverity: severity})}
                >
                  {severity}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="medication" className="text-medical-sm font-semibold">Medication Schedule</Label>
            <Input
              id="medication"
              value={profile.medicationSchedule}
              onChange={(e) => setProfile({...profile, medicationSchedule: e.target.value})}
              className="mt-1"
              placeholder="e.g., 8:00 AM, 6:00 PM"
            />
          </div>

          <Button onClick={handleSaveProfile} className="w-full h-12 text-medical-md">
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Device Calibration */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Device Calibration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-medical-sm">Last Calibration</span>
              <Badge variant="secondary">3 days ago</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Baseline EMG readings and tremor intensity levels were recorded
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-medical-sm">Auto-Calibration</p>
              <p className="text-sm text-muted-foreground">Run daily calibration automatically</p>
            </div>
            <Switch
              checked={settings.autoCalibration}
              onCheckedChange={(checked) => setSettings({...settings, autoCalibration: checked})}
            />
          </div>

          <Button 
            onClick={handleRunCalibration} 
            variant="outline" 
            className="w-full h-12 text-medical-md"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Run Calibration Now
          </Button>
        </CardContent>
      </Card>

      {/* Connectivity */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <Bluetooth className="w-5 h-5" />
            Connectivity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-secondary' : 'bg-muted-foreground'}`}></div>
              <div>
                <p className="font-semibold text-medical-sm">Prosthetic Device</p>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBluetoothPair}
            >
              {isConnected ? "Disconnect" : "Pair Device"}
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-medical-sm">Bluetooth</p>
              <p className="text-sm text-muted-foreground">Enable device connectivity</p>
            </div>
            <Switch
              checked={settings.bluetoothEnabled}
              onCheckedChange={(checked) => setSettings({...settings, bluetoothEnabled: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-medical-sm">Cloud Backup</p>
              <p className="text-sm text-muted-foreground">Sync data to secure cloud storage</p>
            </div>
            <Switch
              checked={settings.cloudBackup}
              onCheckedChange={(checked) => setSettings({...settings, cloudBackup: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Privacy */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-medical-sm">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Calibration reminders and alerts</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-medical-sm">Haptic Feedback</p>
              <p className="text-sm text-muted-foreground">Vibration alerts on device</p>
            </div>
            <Switch
              checked={settings.hapticFeedback}
              onCheckedChange={(checked) => setSettings({...settings, hapticFeedback: checked})}
            />
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary text-sm">Privacy Protected</span>
            </div>
            <p className="text-xs text-muted-foreground">
              All health data is encrypted and HIPAA compliant. Your information is never shared without consent.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency & Safety */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-md flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Safety & Emergency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="destructive" 
            className="w-full h-12 text-medical-md"
          >
            Activate Safe Mode
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Safe mode disables all prosthetic functions and locks the device in a neutral position
          </p>

          <Separator />

          <div className="text-center space-y-2">
            <p className="text-sm font-semibold">Emergency Contact</p>
            <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
            <p className="text-sm text-primary">+1 (555) 123-4567</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Shield, Activity } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to dashboard after 3 seconds (for demo purposes)
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center px-6">
      {/* Logo & Branding */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-elevated">
          <Activity className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-4xl font-bold mb-2">SteadyCare</h1>
        <p className="text-white/90 text-lg">Tremor Support & Control</p>
      </div>

      {/* Feature Icons */}
      <div className="flex gap-8 mb-12">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/80 text-sm">Monitor</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/80 text-sm">Control</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/80 text-sm">Support</p>
        </div>
      </div>

      {/* Action Buttons */}
      <Card className="w-full max-w-md p-6 bg-white/95 backdrop-blur-sm border-none shadow-elevated">
        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/dashboard")}
            className="w-full h-14 text-medical-lg font-semibold bg-primary hover:bg-primary-hover"
            size="lg"
          >
            Enter Dashboard
          </Button>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Continuing as demo patient
            </p>
          </div>
        </div>
      </Card>

      {/* Loading Indicator */}
      <div className="mt-8 text-white/70 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
          <span>Loading your profile...</span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
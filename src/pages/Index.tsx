
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Lock, Play, Settings, AlertCircle, CheckCircle } from "lucide-react";
import { AppSelector } from "@/components/AppSelector";
import { SessionLogger, addSessionToLog } from "@/components/SessionLogger";

interface App {
  name: string;
  path: string;
  icon?: string;
}

const Index = () => {
  const [selectedApps, setSelectedApps] = useState<App[]>([]);
  const [timeLimit, setTimeLimit] = useState("60");
  const [sessionActive, setSessionActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (sessionActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeSession(true);
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sessionActive, timeRemaining]);

  const startSession = () => {
    const duration = parseInt(timeLimit);
    setTimeRemaining(duration);
    setSessionActive(true);
    setSessionStartTime(new Date());
    
    // Simulate system notification
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('LockTFin Session Started', {
            body: `Focus session active for ${duration} minutes`,
            icon: '/favicon.ico'
          });
        }
      });
    }
  };

  const completeSession = (natural: boolean = true) => {
    const plannedDuration = parseInt(timeLimit);
    const actualDuration = natural ? plannedDuration : plannedDuration - timeRemaining;
    
    // Log the session
    const sessionData = addSessionToLog(
      actualDuration,
      plannedDuration,
      selectedApps.map(app => app.name),
      natural
    );

    setSessionActive(false);
    setTimeRemaining(0);
    setSessionStartTime(null);

    // Show completion notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(natural ? 'Focus Session Completed!' : 'Session Ended Early', {
        body: natural 
          ? `Great job! You focused for ${actualDuration} minutes.`
          : `Session ended after ${actualDuration} minutes.`,
        icon: '/favicon.ico'
      });
    }
  };

  const emergencyExit = () => {
    completeSession(false);
  };

  // Global keyboard shortcut simulation
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Cmd + Option + Shift + E (⌘⌥⇧E)
      if (event.metaKey && event.altKey && event.shiftKey && event.key === 'E') {
        if (sessionActive) {
          event.preventDefault();
          emergencyExit();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [sessionActive]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LockTFin
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Focus like never before. Lock into productivity.</p>
        </div>

        {!sessionActive ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Setup Panel */}
            <div className="lg:col-span-2">
              <Card className="rounded-3xl shadow-2xl border-0 bg-white/80 backdrop-blur">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-gray-800">Set Up Your Focus Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <Tabs defaultValue="apps" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                      <TabsTrigger value="apps" className="rounded-xl">Select Apps</TabsTrigger>
                      <TabsTrigger value="time" className="rounded-xl">Set Timer</TabsTrigger>
                      <TabsTrigger value="start" className="rounded-xl">Launch</TabsTrigger>
                    </TabsList>

                    <TabsContent value="apps" className="space-y-6 mt-6">
                      <AppSelector 
                        selectedApps={selectedApps}
                        onAppsChange={setSelectedApps}
                      />
                    </TabsContent>

                    <TabsContent value="time" className="space-y-6 mt-6">
                      <div className="text-center space-y-6">
                        <Label className="text-lg font-semibold text-gray-700 block">
                          How long do you want to focus?
                        </Label>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {["15", "30", "60", "90"].map((minutes) => (
                            <Button
                              key={minutes}
                              variant={timeLimit === minutes ? "default" : "outline"}
                              className={`h-16 rounded-2xl text-lg font-semibold transition-all duration-200 ${
                                timeLimit === minutes 
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105" 
                                  : "hover:bg-gray-50 border-2 hover:border-purple-200"
                              }`}
                              onClick={() => setTimeLimit(minutes)}
                            >
                              {minutes}m
                            </Button>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 justify-center">
                          <Label htmlFor="custom-time" className="text-gray-600">Custom:</Label>
                          <Input
                            id="custom-time"
                            type="number"
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(e.target.value)}
                            className="w-20 text-center rounded-xl border-2"
                            min="1"
                            max="480"
                          />
                          <span className="text-gray-600">minutes</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="start" className="space-y-8 mt-6">
                      <div className="text-center space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to Focus?</h3>
                          
                          <div className="space-y-3 text-left max-w-md mx-auto">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Settings className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-gray-700">
                                {selectedApps.length} apps selected
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                <Clock className="w-4 h-4 text-pink-600" />
                              </div>
                              <span className="text-gray-700">
                                {timeLimit} minute focus session
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Lock className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-gray-700">
                                Press ⌘⌥⇧E to exit anytime
                              </span>
                            </div>
                          </div>
                        </div>

                        {selectedApps.length === 0 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-orange-500" />
                            <span className="text-orange-700">Please select at least one application to continue</span>
                          </div>
                        )}

                        <Button
                          onClick={startSession}
                          disabled={selectedApps.length === 0}
                          className="w-full h-16 rounded-2xl text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Play className="w-6 h-6 mr-3" />
                          Start Focus Session
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Stats Panel */}
            <div className="lg:col-span-1">
              <SessionLogger onNewSession={() => {}} />
            </div>
          </div>
        ) : (
          <Card className="rounded-3xl shadow-2xl border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <Lock className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Focus Mode Active</h2>
              <p className="text-xl mb-2">You're locked into your selected apps</p>
              <div className="text-6xl font-bold mb-4">{formatTime(timeRemaining)}</div>
              <p className="text-green-100 mb-8">Time remaining</p>
              
              <div className="bg-white/20 rounded-2xl p-4 mb-6">
                <p className="text-sm text-green-100 mb-2">Active Applications:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedApps.map((app) => (
                    <span key={app.path} className="bg-white/30 rounded-lg px-3 py-1 text-sm">
                      {app.icon} {app.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-green-100">
                Press ⌘⌥⇧E to exit early
              </p>
              
              <Button
                onClick={emergencyExit}
                variant="outline"
                className="mt-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Emergency Exit
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;

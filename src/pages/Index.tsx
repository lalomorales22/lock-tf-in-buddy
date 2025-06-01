
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Lock, Plus, X, Play, Settings } from "lucide-react";

const Index = () => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState("60");
  const [sessionActive, setSessionActive] = useState(false);

  const availableApps = [
    "Safari", "Chrome", "Firefox", "VS Code", "Figma", "Notion", 
    "Slack", "Discord", "Terminal", "Xcode", "Photoshop", "Sketch"
  ];

  const toggleApp = (app: string) => {
    setSelectedApps(prev => 
      prev.includes(app) 
        ? prev.filter(a => a !== app)
        : [...prev, app]
    );
  };

  const removeApp = (app: string) => {
    setSelectedApps(prev => prev.filter(a => a !== app));
  };

  const startSession = () => {
    setSessionActive(true);
    // In a real app, this would lock the system
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
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
                  <div>
                    <Label className="text-lg font-semibold text-gray-700 mb-4 block">
                      Choose apps to keep open
                    </Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableApps.map((app) => (
                        <Button
                          key={app}
                          variant={selectedApps.includes(app) ? "default" : "outline"}
                          className={`h-20 rounded-2xl flex flex-col gap-2 transition-all duration-200 ${
                            selectedApps.includes(app) 
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg scale-105" 
                              : "hover:bg-gray-50 border-2 hover:border-purple-200"
                          }`}
                          onClick={() => toggleApp(app)}
                        >
                          <Settings className="w-5 h-5" />
                          <span className="text-xs font-medium">{app}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedApps.length > 0 && (
                    <div className="bg-purple-50 rounded-2xl p-4">
                      <Label className="text-sm font-semibold text-purple-700 mb-3 block">
                        Selected Apps ({selectedApps.length})
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedApps.map((app) => (
                          <Badge
                            key={app}
                            variant="secondary"
                            className="bg-white text-purple-700 rounded-xl px-3 py-1 flex items-center gap-2"
                          >
                            {app}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-red-500"
                              onClick={() => removeApp(app)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
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

                    <Button
                      onClick={startSession}
                      disabled={selectedApps.length === 0}
                      className="w-full h-16 rounded-2xl text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <Play className="w-6 h-6 mr-3" />
                      Start Focus Session
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-3xl shadow-2xl border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="text-center py-12">
              <Lock className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Focus Mode Active</h2>
              <p className="text-xl mb-2">You're locked into your selected apps</p>
              <p className="text-green-100 mb-8">{timeLimit} minutes remaining</p>
              <p className="text-sm text-green-100">
                Press ⌘⌥⇧E to exit early
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;

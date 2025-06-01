
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Settings, Folder } from "lucide-react";

interface App {
  name: string;
  path: string;
  icon?: string;
}

interface AppSelectorProps {
  selectedApps: App[];
  onAppsChange: (apps: App[]) => void;
}

const defaultApps: App[] = [
  { name: "Safari", path: "/Applications/Safari.app", icon: "🌐" },
  { name: "Chrome", path: "/Applications/Google Chrome.app", icon: "🔵" },
  { name: "Firefox", path: "/Applications/Firefox.app", icon: "🦊" },
  { name: "VS Code", path: "/Applications/Visual Studio Code.app", icon: "💙" },
  { name: "Figma", path: "/Applications/Figma.app", icon: "🎨" },
  { name: "Notion", path: "/Applications/Notion.app", icon: "📝" },
  { name: "Slack", path: "/Applications/Slack.app", icon: "💬" },
  { name: "Discord", path: "/Applications/Discord.app", icon: "🎮" },
  { name: "Terminal", path: "/Applications/Utilities/Terminal.app", icon: "⚫" },
  { name: "Xcode", path: "/Applications/Xcode.app", icon: "🔨" }
];

export const AppSelector = ({ selectedApps, onAppsChange }: AppSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customAppName, setCustomAppName] = useState("");
  const [customAppPath, setCustomAppPath] = useState("");
  const [availableApps] = useState<App[]>(defaultApps);

  const addCustomApp = () => {
    if (customAppName && customAppPath) {
      const newApp: App = {
        name: customAppName,
        path: customAppPath,
        icon: "📱"
      };
      onAppsChange([...selectedApps, newApp]);
      setCustomAppName("");
      setCustomAppPath("");
    }
  };

  const toggleApp = (app: App) => {
    const isSelected = selectedApps.some(selected => selected.path === app.path);
    if (isSelected) {
      onAppsChange(selectedApps.filter(selected => selected.path !== app.path));
    } else {
      onAppsChange([...selectedApps, app]);
    }
  };

  const removeApp = (appPath: string) => {
    onAppsChange(selectedApps.filter(app => app.path !== appPath));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold text-gray-700">
          Selected Applications ({selectedApps.length})
        </Label>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Apps
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                Select Applications
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Available Apps Grid */}
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-3 block">
                  Common Applications
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableApps.map((app) => {
                    const isSelected = selectedApps.some(selected => selected.path === app.path);
                    return (
                      <Button
                        key={app.path}
                        variant={isSelected ? "default" : "outline"}
                        className={`h-16 rounded-xl flex flex-col gap-1 transition-all ${
                          isSelected 
                            ? "bg-purple-500 hover:bg-purple-600 text-white" 
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => toggleApp(app)}
                      >
                        <span className="text-lg">{app.icon}</span>
                        <span className="text-xs">{app.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Custom App Input */}
              <div className="border-t pt-6">
                <Label className="text-sm font-medium text-gray-600 mb-3 block">
                  Add Custom Application
                </Label>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="app-name" className="text-xs text-gray-500">App Name</Label>
                    <Input
                      id="app-name"
                      placeholder="e.g., Photoshop"
                      value={customAppName}
                      onChange={(e) => setCustomAppName(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="app-path" className="text-xs text-gray-500">Application Path</Label>
                    <Input
                      id="app-path"
                      placeholder="e.g., /Applications/Adobe Photoshop 2024/Adobe Photoshop 2024.app"
                      value={customAppPath}
                      onChange={(e) => setCustomAppPath(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <Button 
                    onClick={addCustomApp}
                    disabled={!customAppName || !customAppPath}
                    className="w-full rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Application
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Selected Apps Display */}
      {selectedApps.length > 0 ? (
        <div className="bg-purple-50 rounded-2xl p-4">
          <div className="flex flex-wrap gap-2">
            {selectedApps.map((app) => (
              <Badge
                key={app.path}
                variant="secondary"
                className="bg-white text-purple-700 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <span>{app.icon}</span>
                <span>{app.name}</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => removeApp(app.path)}
                />
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No applications selected</p>
          <p className="text-sm text-gray-400">Click "Add Apps" to select applications</p>
        </div>
      )}
    </div>
  );
};

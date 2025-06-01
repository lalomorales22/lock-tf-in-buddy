
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Target } from "lucide-react";

interface SessionLog {
  id: string;
  date: string;
  duration: number;
  plannedDuration: number;
  appsUsed: string[];
  completed: boolean;
}

interface SessionLoggerProps {
  onNewSession: (session: SessionLog) => void;
}

export const SessionLogger = ({ onNewSession }: SessionLoggerProps) => {
  const [sessions, setSessions] = useState<SessionLog[]>([]);

  useEffect(() => {
    // Load sessions from localStorage
    const savedSessions = localStorage.getItem('locktfin-sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  const addSession = (session: SessionLog) => {
    const newSessions = [...sessions, session];
    setSessions(newSessions);
    localStorage.setItem('locktfin-sessions', JSON.stringify(newSessions));
    onNewSession(session);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTotalFocusTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const getCompletionRate = () => {
    if (sessions.length === 0) return 0;
    const completed = sessions.filter(s => s.completed).length;
    return Math.round((completed / sessions.length) * 100);
  };

  return (
    <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Target className="w-5 h-5 text-purple-600" />
          Focus Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{sessions.length}</div>
            <div className="text-sm text-gray-500">Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{formatDuration(getTotalFocusTime())}</div>
            <div className="text-sm text-gray-500">Total Focus</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{getCompletionRate()}%</div>
            <div className="text-sm text-gray-500">Completion</div>
          </div>
        </div>

        {/* Recent Sessions */}
        {sessions.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Recent Sessions</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sessions.slice(-5).reverse().map((session) => (
                <div key={session.id} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{session.date}</span>
                    </div>
                    <Badge variant={session.completed ? "default" : "secondary"} className="rounded-lg">
                      {session.completed ? "Completed" : "Interrupted"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{formatDuration(session.duration)} / {formatDuration(session.plannedDuration)}</span>
                    </div>
                    <div className="text-gray-500">
                      {session.appsUsed.length} apps
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Export the function to add sessions for use in the main component
export const addSessionToLog = (
  duration: number,
  plannedDuration: number,
  appsUsed: string[],
  completed: boolean = true
): SessionLog => {
  return {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
    duration,
    plannedDuration,
    appsUsed,
    completed
  };
};

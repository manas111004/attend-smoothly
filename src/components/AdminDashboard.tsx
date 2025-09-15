import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Clock, Settings, Play, Pause, RotateCcw } from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

interface Counter {
  id: number;
  name: string;
  status: 'active' | 'paused' | 'closed';
  currentToken: string | null;
  queueLength: number;
  totalServed: number;
}

interface QueueItem {
  id: number;
  tokenNumber: string;
  customerName: string;
  bookingTime: string;
  status: 'waiting' | 'serving' | 'completed';
  counterId: number;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');
  const [adminCode, setAdminCode] = useState("");

  // Mock data
  const [counters, setCounters] = useState<Counter[]>([
    { id: 1, name: "Counter 1", status: 'active', currentToken: "A001", queueLength: 3, totalServed: 15 },
    { id: 2, name: "Counter 2", status: 'active', currentToken: "B003", queueLength: 5, totalServed: 12 },
    { id: 3, name: "Counter 3", status: 'paused', currentToken: null, queueLength: 7, totalServed: 8 },
    { id: 4, name: "Counter 4", status: 'closed', currentToken: null, queueLength: 0, totalServed: 0 },
  ]);

  const queueItems: QueueItem[] = [
    { id: 1, tokenNumber: "A001", customerName: "John Doe", bookingTime: "2:30 PM", status: 'serving', counterId: 1 },
    { id: 2, tokenNumber: "A002", customerName: "Jane Smith", bookingTime: "2:35 PM", status: 'waiting', counterId: 1 },
    { id: 3, tokenNumber: "B003", customerName: "Mike Johnson", bookingTime: "2:32 PM", status: 'serving', counterId: 2 },
    { id: 4, tokenNumber: "B004", customerName: "Sarah Wilson", bookingTime: "2:38 PM", status: 'waiting', counterId: 2 },
  ];

  const handleLogin = () => {
    if (adminCode === "admin123") {
      setCurrentView('dashboard');
    }
  };

  const toggleCounterStatus = (counterId: number) => {
    setCounters(prev => prev.map(counter => 
      counter.id === counterId 
        ? { 
            ...counter, 
            status: counter.status === 'active' ? 'paused' : 'active' 
          }
        : counter
    ));
  };

  const serveNext = (counterId: number) => {
    // Mock implementation - would connect to backend
    console.log(`Serving next customer for counter ${counterId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-muted text-muted-foreground';
      case 'serving': return 'bg-primary text-primary-foreground';
      case 'waiting': return 'bg-muted text-muted-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Login View
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto pt-20">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-8 p-0 h-auto font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Card className="p-8 border-0 shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-light text-foreground mb-2">Staff Login</h1>
              <p className="text-muted-foreground font-light">Enter your admin code to continue</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <input 
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Enter admin code"
                />
              </div>
              
              <Button 
                onClick={handleLogin}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!adminCode}
              >
                Sign In
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Demo code: <span className="font-mono">admin123</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4 p-0 h-auto font-light"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-light text-foreground">Staff Dashboard</h1>
            <p className="text-muted-foreground font-light">Monitor and manage queue operations</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light text-foreground">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-0 shadow-sm">
            <div className="text-2xl font-light text-foreground">{counters.filter(c => c.status === 'active').length}</div>
            <div className="text-sm text-muted-foreground">Active Counters</div>
          </Card>
          <Card className="p-4 border-0 shadow-sm">
            <div className="text-2xl font-light text-foreground">{counters.reduce((sum, c) => sum + c.queueLength, 0)}</div>
            <div className="text-sm text-muted-foreground">Total in Queue</div>
          </Card>
          <Card className="p-4 border-0 shadow-sm">
            <div className="text-2xl font-light text-foreground">{counters.reduce((sum, c) => sum + c.totalServed, 0)}</div>
            <div className="text-sm text-muted-foreground">Served Today</div>
          </Card>
          <Card className="p-4 border-0 shadow-sm">
            <div className="text-2xl font-light text-foreground">4.2</div>
            <div className="text-sm text-muted-foreground">Avg Wait (min)</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Counter Management */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-0 shadow-sm">
              <h2 className="text-lg font-medium text-foreground mb-6">Counter Management</h2>
              <div className="space-y-4">
                {counters.map(counter => (
                  <div key={counter.id} className="border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h3 className="font-medium text-foreground">{counter.name}</h3>
                        <Badge className={getStatusColor(counter.status)}>
                          {counter.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleCounterStatus(counter.id)}
                          className="p-2"
                        >
                          {counter.status === 'active' ? 
                            <Pause className="w-4 h-4" /> : 
                            <Play className="w-4 h-4" />
                          }
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => serveNext(counter.id)}
                          disabled={counter.status !== 'active'}
                          className="p-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current Token</div>
                        <div className="font-medium text-lg">
                          {counter.currentToken || 'None'}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Queue Length</div>
                        <div className="font-medium text-lg">{counter.queueLength}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Served Today</div>
                        <div className="font-medium text-lg">{counter.totalServed}</div>
                      </div>
                    </div>

                    {counter.status === 'active' && counter.queueLength > 0 && (
                      <Button 
                        onClick={() => serveNext(counter.id)}
                        className="w-full mt-4 bg-primary hover:bg-primary/90"
                        size="sm"
                      >
                        Serve Next Customer
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Live Queue */}
          <div>
            <Card className="p-6 border-0 shadow-sm">
              <h2 className="text-lg font-medium text-foreground mb-6">Live Queue</h2>
              <div className="space-y-3">
                {queueItems.map(item => (
                  <div key={item.id} className={`p-4 rounded-lg border ${
                    item.status === 'serving' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-foreground">{item.tokenNumber}</div>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.customerName}</div>
                    <div className="text-xs text-muted-foreground">Booked: {item.bookingTime}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
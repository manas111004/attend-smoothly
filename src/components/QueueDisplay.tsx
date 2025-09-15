import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";

interface QueueDisplayProps {
  onBack: () => void;
}

interface DisplayItem {
  counterName: string;
  currentToken: string | null;
  nextTokens: string[];
  status: 'active' | 'paused' | 'closed';
}

const QueueDisplay = ({ onBack }: QueueDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock data - would come from real-time updates
  const displayData: DisplayItem[] = [
    {
      counterName: "Counter 1",
      currentToken: "A001",
      nextTokens: ["A002", "A003", "A004"],
      status: 'active'
    },
    {
      counterName: "Counter 2", 
      currentToken: "B003",
      nextTokens: ["B004", "B005", "B006"],
      status: 'active'
    },
    {
      counterName: "Counter 3",
      currentToken: null,
      nextTokens: ["C001", "C002", "C003"],
      status: 'paused'
    },
    {
      counterName: "Counter 4",
      currentToken: null,
      nextTokens: [],
      status: 'closed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'paused': return 'text-warning';
      case 'closed': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header - only show on smaller screens, hidden on display mode */}
      <div className="lg:hidden mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 p-0 h-auto font-light"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-foreground mb-4">
            Queue<span className="text-primary font-medium">Flow</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-xl text-muted-foreground">
            <Clock className="w-6 h-6" />
            <span>{currentTime.toLocaleTimeString()}</span>
            <span className="mx-4">|</span>
            <span>{currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Now Serving Section */}
        <Card className="p-8 mb-8 border-0 shadow-sm bg-gradient-to-r from-primary/5 to-transparent">
          <h2 className="text-2xl font-light text-center text-foreground mb-8">Now Serving</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayData.map((counter, index) => (
              <div key={index} className="text-center">
                <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-medium text-foreground mb-4">{counter.counterName}</h3>
                  
                  <div className={`text-6xl font-light mb-4 ${
                    counter.currentToken ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {counter.currentToken || '---'}
                  </div>
                  
                  <div className={`text-sm font-medium uppercase tracking-wide ${getStatusColor(counter.status)}`}>
                    {counter.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Up Next Section */}
        <Card className="p-8 border-0 shadow-sm">
          <h2 className="text-2xl font-light text-center text-foreground mb-8">Up Next</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayData.map((counter, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-medium text-foreground mb-6">{counter.counterName}</h3>
                
                {counter.nextTokens.length > 0 ? (
                  <div className="space-y-3">
                    {counter.nextTokens.slice(0, 3).map((token, tokenIndex) => (
                      <div 
                        key={tokenIndex}
                        className={`py-3 px-4 rounded-lg border ${
                          tokenIndex === 0 
                            ? 'border-primary/30 bg-primary/10 text-primary font-medium' 
                            : 'border-border bg-muted/30 text-muted-foreground'
                        }`}
                      >
                        {token}
                      </div>
                    ))}
                    {counter.nextTokens.length > 3 && (
                      <div className="text-sm text-muted-foreground">
                        +{counter.nextTokens.length - 3} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-muted-foreground">
                    No customers waiting
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm">Please wait for your number to be called</p>
        </div>
      </div>
    </div>
  );
};

export default QueueDisplay;
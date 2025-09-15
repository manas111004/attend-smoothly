import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, MapPin, Users, CheckCircle2 } from "lucide-react";

interface CustomerDashboardProps {
  onBack: () => void;
}

interface Counter {
  id: number;
  name: string;
  waitTime: number;
  queueLength: number;
  status: 'active' | 'busy' | 'closed';
}

interface Booking {
  id: number;
  counterName: string;
  tokenNumber: string;
  estimatedTime: string;
  status: 'confirmed' | 'active' | 'completed';
}

const CustomerDashboard = ({ onBack }: CustomerDashboardProps) => {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'booking' | 'confirmation'>('login');
  const [selectedCounter, setSelectedCounter] = useState<Counter | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  // Mock data
  const counters: Counter[] = [
    { id: 1, name: "Counter 1", waitTime: 5, queueLength: 3, status: 'active' },
    { id: 2, name: "Counter 2", waitTime: 8, queueLength: 5, status: 'active' },
    { id: 3, name: "Counter 3", waitTime: 12, queueLength: 7, status: 'busy' },
    { id: 4, name: "Counter 4", waitTime: 0, queueLength: 0, status: 'closed' },
  ];

  const mockBookings: Booking[] = [
    { id: 1, counterName: "Counter 1", tokenNumber: "A001", estimatedTime: "2:30 PM", status: 'active' },
    { id: 2, counterName: "Counter 2", tokenNumber: "B015", estimatedTime: "1:45 PM", status: 'completed' },
  ];

  const handleLogin = () => {
    if (customerName && customerPhone) {
      setCurrentView('dashboard');
    }
  };

  const handleBookSlot = (counter: Counter) => {
    setSelectedCounter(counter);
    setCurrentView('booking');
  };

  const confirmBooking = () => {
    if (selectedCounter) {
      const newBooking: Booking = {
        id: Date.now(),
        counterName: selectedCounter.name,
        tokenNumber: `${selectedCounter.name.slice(-1)}${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
        estimatedTime: new Date(Date.now() + selectedCounter.waitTime * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'confirmed'
      };
      setCurrentBooking(newBooking);
      setCurrentView('confirmation');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'busy': return 'bg-warning/10 text-warning border-warning/20';
      case 'closed': return 'bg-muted text-muted-foreground border-border';
      case 'confirmed': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
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
              <h1 className="text-2xl font-light text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground font-light">Enter your details to continue</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                <Input 
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-2 border-border focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                <Input 
                  id="phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-2 border-border focus:border-primary"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <Button 
                onClick={handleLogin}
                className="w-full bg-primary hover:bg-primary/90 mt-8"
                disabled={!customerName || !customerPhone}
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Booking Confirmation View
  if (currentView === 'confirmation' && currentBooking) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto pt-20">
          <Card className="p-8 border-0 shadow-sm text-center">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-6" />
            <h1 className="text-2xl font-light text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground font-light mb-8">Your slot has been reserved successfully</p>
            
            <div className="bg-primary/5 rounded-xl p-6 mb-8">
              <div className="text-3xl font-light text-primary mb-2">{currentBooking.tokenNumber}</div>
              <div className="text-sm text-muted-foreground mb-4">Token Number</div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Counter</div>
                  <div className="font-medium">{currentBooking.counterName}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Est. Time</div>
                  <div className="font-medium">{currentBooking.estimatedTime}</div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setCurrentView('dashboard')}
              className="w-full bg-primary hover:bg-primary/90 mb-4"
            >
              Go to Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="w-full font-light"
            >
              Back to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Booking View
  if (currentView === 'booking' && selectedCounter) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto pt-12">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('dashboard')}
            className="mb-6 p-0 h-auto font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Card className="p-8 border-0 shadow-sm">
            <h1 className="text-2xl font-light text-foreground mb-6">Confirm Booking</h1>
            
            <div className="bg-muted/30 rounded-xl p-6 mb-8">
              <h3 className="font-medium text-foreground mb-4">{selectedCounter.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Wait Time:</span>
                  <span className="font-medium">{selectedCounter.waitTime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Queue:</span>
                  <span className="font-medium">{selectedCounter.queueLength} people</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2">Customer Details</div>
              <div className="bg-background border rounded-lg p-4">
                <div className="font-medium">{customerName}</div>
                <div className="text-sm text-muted-foreground">{customerPhone}</div>
              </div>
            </div>
            
            <Button 
              onClick={confirmBooking}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Confirm Booking
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-light text-foreground">Hi, {customerName}</h1>
            <p className="text-muted-foreground font-light">Book your slot or check your queue status</p>
          </div>
        </div>

        {/* Current Bookings */}
        {mockBookings.some(b => b.status === 'active') && (
          <Card className="p-6 mb-8 border-0 shadow-sm">
            <h2 className="text-lg font-medium text-foreground mb-4">Current Booking</h2>
            {mockBookings.filter(b => b.status === 'active').map(booking => (
              <div key={booking.id} className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-light text-primary mb-1">{booking.tokenNumber}</div>
                    <div className="text-sm text-muted-foreground">{booking.counterName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Estimated Time</div>
                    <div className="font-medium">{booking.estimatedTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Available Counters */}
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-medium text-foreground mb-6">Available Counters</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {counters.map(counter => (
              <div key={counter.id} className="border border-border rounded-xl p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">{counter.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(counter.status)}`}>
                    {counter.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Wait:</span>
                    <span className="font-medium">{counter.waitTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Queue:</span>
                    <span className="font-medium">{counter.queueLength}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleBookSlot(counter)}
                  disabled={counter.status !== 'active'}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {counter.status === 'active' ? 'Book Slot' : 'Unavailable'}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
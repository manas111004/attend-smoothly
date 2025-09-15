import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShieldCheck, Clock, QrCode } from "lucide-react";
import CustomerDashboard from "@/components/CustomerDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import QueueDisplay from "@/components/QueueDisplay";

type UserRole = 'customer' | 'admin' | 'display' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  const handleBack = () => {
    setUserRole(null);
  };

  if (userRole === 'customer') {
    return <CustomerDashboard onBack={handleBack} />;
  }

  if (userRole === 'admin') {
    return <AdminDashboard onBack={handleBack} />;
  }

  if (userRole === 'display') {
    return <QueueDisplay onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-4">
            Queue<span className="text-primary font-medium">Flow</span>
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Smart queue management for modern retail
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm hover:shadow-primary/5"
            onClick={() => handleRoleSelect('customer')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Customer</h3>
              <p className="text-muted-foreground font-light mb-6">
                Book your billing slot and track queue status in real-time
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Continue as Customer
              </Button>
            </div>
          </Card>

          <Card 
            className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm hover:shadow-primary/5"
            onClick={() => handleRoleSelect('admin')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Staff</h3>
              <p className="text-muted-foreground font-light mb-6">
                Manage counters, monitor queues, and assist customers
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Staff Login
              </Button>
            </div>
          </Card>

          <Card 
            className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm hover:shadow-primary/5"
            onClick={() => handleRoleSelect('display')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Queue Display</h3>
              <p className="text-muted-foreground font-light mb-6">
                Live display showing current serving numbers and wait times
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Open Display
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-light text-foreground mb-8">Why QueueFlow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <QrCode className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-medium text-foreground mb-2">Instant Booking</h4>
              <p className="text-muted-foreground text-sm font-light">
                Reserve your slot in seconds, no more waiting in long lines
              </p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-medium text-foreground mb-2">Real-Time Updates</h4>
              <p className="text-muted-foreground text-sm font-light">
                Get live updates on your queue position and estimated wait time
              </p>
            </div>
            <div>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-medium text-foreground mb-2">Smart Management</h4>
              <p className="text-muted-foreground text-sm font-light">
                Intelligent queue allocation for optimal customer flow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
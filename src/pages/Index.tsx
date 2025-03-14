
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Shield, Server, Database } from "lucide-react";
import DocsSection from "@/components/Documentation/DocsSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-background/50 pt-32 pb-16 px-4">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Real-Time Financial <span className="text-primary">Data Stream</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Advanced real-time financial data processing and analytics platform with high-performance, low-latency architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth">Sign Up</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology for processing real-time financial data at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-card rounded-lg p-6 shadow-sm border"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-muted-foreground">
                Advanced real-time stock analytics and charting tools with predictive modeling.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card rounded-lg p-6 shadow-sm border"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Microservices</h3>
              <p className="text-muted-foreground">
                Scalable microservices architecture with event-driven design for high performance.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card rounded-lg p-6 shadow-sm border"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">TimescaleDB</h3>
              <p className="text-muted-foreground">
                Optimized time-series database for high-frequency financial data storage and queries.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card rounded-lg p-6 shadow-sm border"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                JWT-based authentication with OAuth2 and role-based access control for maximum security.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <DocsSection />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to explore our financial platform?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get started with the most advanced real-time financial data processing system.
          </p>
          <Button size="lg" asChild>
            <Link to="/dashboard">
              Launch Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BarChart2 className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg">DataStream</span>
          </div>
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} DataStream. Advanced Financial Data Processing.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

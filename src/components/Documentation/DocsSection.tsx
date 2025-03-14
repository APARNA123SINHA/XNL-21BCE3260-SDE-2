
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Github, Database, Server, Shield, Activity, Video, BarChart2, Code, Cloud } from "lucide-react";

const DocsSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Project Documentation</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive documentation for the real-time financial data processing application, including architecture designs, infrastructure provisioning, and security testing.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Repository Structure
              </CardTitle>
              <CardDescription>
                Project repository organization and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Repository Format</h4>
                  <p className="text-sm text-muted-foreground mt-1">XNL-21BCEXXXX-SDE-2</p>
                  <Badge className="mt-2">GitHub</Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium">Main Components</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span>Frontend React Application</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-primary" />
                      <span>Microservices Backend</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      <span>PostgreSQL + TimescaleDB</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <span>Real-time Data Processing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://github.com/username/XNL-21BCEXXXX-SDE-2" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Visit Repository
                </a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Demo & Presentation
              </CardTitle>
              <CardDescription>
                System demonstration and architectural explanation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <Video className="h-12 w-12 text-muted-foreground/50" />
                <span className="ml-2 text-muted-foreground">Demo Video</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Comprehensive walkthrough of the system architecture, implementation challenges, and solutions.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Video className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="architecture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Architecture Diagrams
              </CardTitle>
              <CardDescription>
                System design and data flow visualizations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Event-Driven Architecture</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed diagrams showing the event flow between microservices and data processing pipelines.
                </p>
                <div className="mt-3 h-48 bg-muted rounded flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Architecture Diagram</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium">Database Schema</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Users, Orders, Transactions Tables</li>
                  <li>• Positions, Market Data, Alerts Tables</li>
                  <li>• TimescaleDB Hypertables for Time-Series Data</li>
                  <li>• Sharding & Replication Configuration</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                API Documentation
              </CardTitle>
              <CardDescription>
                GraphQL and REST API specifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">GraphQL API</h4>
                  <p className="text-sm text-muted-foreground mt-1">Schema definitions and query examples using Apollo Server.</p>
                </div>
                
                <div>
                  <h4 className="font-medium">WebSocket Streaming API</h4>
                  <p className="text-sm text-muted-foreground mt-1">Real-time order book updates and market data streaming.</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Authentication API</h4>
                  <p className="text-sm text-muted-foreground mt-1">JWT-based OAuth2 authentication endpoints and RBAC specifications.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View API Docs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Infrastructure Provisioning
              </CardTitle>
              <CardDescription>
                Terraform, Pulumi, and CloudFormation scripts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Multi-Cloud Deployment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Infrastructure as Code (IaC) for AWS and GCP deployment with Kubernetes.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">AWS</Badge>
                    <Badge variant="outline">GCP</Badge>
                    <Badge variant="outline">Kubernetes</Badge>
                    <Badge variant="outline">Terraform</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium">CI/CD Pipeline</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• GitOps Workflow with ArgoCD</li>
                    <li>• Automated Deployment Pipelines</li>
                    <li>• Container Security Scanning</li>
                    <li>• Automated Rollbacks on Failure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Deployment Docs
                </Button>
                <Button variant="outline" className="flex-1">
                  Visit App
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Performance Testing Results
              </CardTitle>
              <CardDescription>
                Load testing and system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Load Testing</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Results from k6 and JMeter tests with 10M+ concurrent users.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Response Time</div>
                      <div className="font-bold text-green-500">42ms avg</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Throughput</div>
                      <div className="font-bold">120K req/s</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium">Monitoring Dashboard</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Real-time system performance and metrics visualization.
                  </p>
                  <div className="mt-3 h-48 bg-muted rounded flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Performance Dashboard</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Testing
              </CardTitle>
              <CardDescription>
                Penetration testing and security audit reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Security Test Reports</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Results from penetration testing with OWASP ZAP and Burp Suite.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">OWASP Top 10</Badge>
                    <Badge variant="outline">Burp Suite</Badge>
                    <Badge variant="outline">ZAP</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium">Authentication & Security Measures</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• JWT-based authentication with OAuth2</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• mTLS for service-to-service communication</li>
                    <li>• API Gateway security (Kong/Nginx)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Security Documentation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DocsSection;

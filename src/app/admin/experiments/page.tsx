'use client';

import { useState, useEffect } from 'react';
import { getAllExperimentResults, EXPERIMENTS, resetExperimentResults, getExperimentResults } from '@/lib/ab-testing';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw, BarChart3, Copy, Check } from 'lucide-react';

export default function ExperimentsAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [results, setResults] = useState<ReturnType<typeof getAllExperimentResults>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setResults(getAllExperimentResults());
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      trackEvent('admin_login');
    } else {
      alert('Incorrect password');
    }
  };

  const handleReset = () => {
    if (confirm('Reset all experiment data? This cannot be undone.')) {
      resetExperimentResults();
      setResults(getAllExperimentResults());
      trackEvent('admin_reset_experiments');
    }
  };

  const handleRefresh = () => {
    setResults(getAllExperimentResults());
  };

  const generateWinnerCode = (experimentId: string) => {
    const result = getExperimentResults(experimentId);
    const winner = result.variants.find(v => v.isWinner);
    if (!winner) return null;

    const experiment = EXPERIMENTS[experimentId];
    const winnerVariant = experiment.variants.find(v => v.id === winner.id);

    return `// To implement the winner for ${experiment.name}:
// Replace the control variant with:
// ${winnerVariant?.name}
// (Conversion rate: ${(winner.rate * 100).toFixed(1)}% from ${winner.impressions} impressions)`;
  };

  const handleCopyWinner = (experimentId: string) => {
    const code = generateWinnerCode(experimentId);
    if (code) {
      navigator.clipboard.writeText(code);
      setCopiedCode(experimentId);
      setTimeout(() => setCopiedCode(null), 2000);
      trackEvent('admin_copy_winner', { experiment_id: experimentId });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Experiments Admin</CardTitle>
            <CardDescription className="text-center">Enter admin password to view results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm"
              />
              <Button onClick={handleLogin} className="w-full">View Results</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">A/B Test Results</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time experiment performance from localStorage tracking
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(results).map(([experimentId, data]) => {
            const totalImpressions = data.totalImpressions;
            const totalConversions = data.totalConversions;
            const overallRate = totalImpressions > 0 ? (totalConversions / totalImpressions * 100).toFixed(1) : '0.0';

            return (
              <Card key={experimentId}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {data.experiment.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{data.experiment.description}</CardDescription>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-muted-foreground">
                        {totalImpressions} impressions · {totalConversions} conversions
                      </div>
                      <div className="text-primary font-bold">{overallRate}% overall rate</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {totalImpressions === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No data yet — impressions will appear as visitors see the variants.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid gap-3">
                        {data.variants.map((variant) => (
                          <div
                            key={variant.id}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                              variant.isWinner
                                ? 'border-green-500/50 bg-green-500/5'
                                : 'border-border/40'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {variant.isWinner && (
                                  <Trophy className="w-4 h-4 text-green-600" />
                                )}
                                <span className="text-sm font-medium">
                                  {variant.name}
                                </span>
                                {variant.isWinner && (
                                  <Badge variant="default" className="bg-green-600 text-xs">
                                    Winner
                                  </Badge>
                                )}
                              </div>
                              <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                                <span>{variant.impressions} impressions</span>
                                <span>{variant.conversions} conversions</span>
                                <span className="font-medium text-foreground">
                                  {variant.impressions > 0 ? (variant.rate * 100).toFixed(1) : '0.0'}% rate
                                </span>
                              </div>
                            </div>
                            {variant.isWinner && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyWinner(experimentId)}
                                className="text-xs"
                              >
                                {copiedCode === experimentId ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/40">
          <h3 className="text-sm font-medium mb-2">How it works</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Impressions are tracked when a variant is first shown to a visitor</li>
            <li>• Conversions are tracked when the visitor clicks the CTA for that variant</li>
            <li>• Data is stored in localStorage and synced to Firebase Analytics</li>
            <li>• The winner is the variant with the highest conversion rate (min 1 impression)</li>
            <li>• Use the Copy button to get the implementation code for the winning variant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
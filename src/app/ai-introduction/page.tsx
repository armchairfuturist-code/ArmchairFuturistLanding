import { EmailForm } from './components/EmailForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function AiIntroductionPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">AI-Powered Email Introduction</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Generate a personalized introductory email to a prospective client using AI.
              Provide some details, and let Alex's AI assistant craft a compelling message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmailForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Copy, Check, Loader2 } from 'lucide-react';
import { submitEmailGeneration, type FormState } from '../actions';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Generate Email
    </Button>
  );
}

export function EmailForm() {
  const initialState: FormState = { message: '', data: undefined };
  const [state, formAction] = useFormState(submitEmailGeneration, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (state.message) {
      if (state.data?.email) {
        setGeneratedEmail(state.data.email);
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
        });
        // formRef.current?.reset(); // Optionally reset form on success
      } else if (state.message && !state.data && !state.fields && !state.issues ) { // Only show error if it's not a validation error
         toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);
  
  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(generatedEmail).then(() => {
        setIsCopied(true);
        toast({ title: "Copied!", description: "Email content copied to clipboard." });
        setTimeout(() => setIsCopied(false), 2000);
      }).catch(err => {
        toast({ title: "Copy Failed", description: "Could not copy text.", variant: "destructive" });
      });
    }
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="linkedinProfileUrl">LinkedIn Profile URL</Label>
        <Input id="linkedinProfileUrl" name="linkedinProfileUrl" type="url" placeholder="https://linkedin.com/in/prospectname" required />
        {state.fields?.linkedinProfileUrl && <p className="text-sm text-destructive mt-1">{state.fields.linkedinProfileUrl}</p>}
      </div>

      <div>
        <Label htmlFor="recentPosts">Recent Posts by Prospect</Label>
        <Textarea id="recentPosts" name="recentPosts" placeholder="Copy-paste a few recent, relevant posts..." required rows={4} />
        {state.fields?.recentPosts && <p className="text-sm text-destructive mt-1">{state.fields.recentPosts}</p>}
      </div>

      <div>
        <Label htmlFor="companyNews">Latest Company News</Label>
        <Textarea id="companyNews" name="companyNews" placeholder="Any recent news, announcements, or articles about their company..." required rows={4} />
         {state.fields?.companyNews && <p className="text-sm text-destructive mt-1">{state.fields.companyNews}</p>}
      </div>
      
      <div>
        <Label htmlFor="tone">Tone (Optional)</Label>
        <Input id="tone" name="tone" placeholder="e.g., professional, intelligent, approachable (default)" />
      </div>

      {state.issues && state.issues.length > 0 && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Form Error</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside">
              {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <SubmitButton />

      {generatedEmail && (
        <Card className="mt-8 shadow-inner">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-primary">
              Generated Email
              <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy email">
                {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">{generatedEmail}</pre>
          </CardContent>
        </Card>
      )}
    </form>
  );
}

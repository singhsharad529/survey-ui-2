
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

interface SuccessScreenProps {
  surveyId: string | undefined;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ surveyId }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl mb-4">Thank You!</CardTitle>
            <CardDescription className="text-lg mb-6">
              Your responses have been successfully submitted. We appreciate your feedback!
            </CardDescription>
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Survey ID: {surveyId}
              </p>
              <p className="text-sm text-muted-foreground">
                Submitted: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessScreen;

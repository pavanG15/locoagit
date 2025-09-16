'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { registerBusiness, FormState } from '@/app/register-business/actions';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Submitting for AI Validation...' : 'Register Business'}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
  success: false,
};

export function BusinessRegistrationForm() {
  const [state, formAction] = useFormState(registerBusiness, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Card>
      <form ref={formRef} action={formAction}>
        <CardHeader>
           <CardTitle>Business Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" name="businessName" required defaultValue={state.fields?.businessName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input id="ownerName" name="ownerName" required defaultValue={state.fields?.ownerName} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Input id="businessAddress" name="businessAddress" required defaultValue={state.fields?.businessAddress} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select name="city" required defaultValue={state.fields?.city}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Nagpur">Nagpur</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" required defaultValue={state.fields?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" name="contactNumber" type="tel" required defaultValue={state.fields?.contactNumber} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" required defaultValue={state.fields?.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number (Optional)</Label>
            <Input id="gstNumber" name="gstNumber" defaultValue={state.fields?.gstNumber} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopRegistrationNumber">Shop Registration Number (Optional)</Label>
            <Input id="shopRegistrationNumber" name="shopRegistrationNumber" defaultValue={state.fields?.shopRegistrationNumber}/>
          </div>
          
          {state.message && (
            <div className="md:col-span-2 mt-4">
              {state.success ? (
                <Alert variant="default" className="bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-600/30">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Success!</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    {state.message}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Submission Error</AlertTitle>
                  <AlertDescription>
                    {state.message}
                    {state.issues && (
                      <ul className="list-disc list-inside mt-2">
                        {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                      </ul>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}

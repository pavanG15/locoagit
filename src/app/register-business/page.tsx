import Header from '@/components/app/header';
import { BusinessRegistrationForm } from '@/components/app/business-registration-form';

export default function RegisterBusinessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-headline font-bold">Register Your Business</h1>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Join our platform to reach more customers. Our AI will perform a quick check on your submission.
              </p>
            </div>
            <BusinessRegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
}

import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import Textbox from '@/components/shared/Textbox';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" bg-bgPrimary h-screen">
      <div className="flex flex-col h-full px-2 sm:px-6 w-full sm:flex-row">
        <div className="flex-1 h-full">
          <div className="mt-10">
            <Textbox
              title="Let's get you set up in just 4 steps"
              desc="We'll keep short and simple, just what we need to personalize your experience"
            />
            <OnboardingStepper currentStep={1} />
          </div>
        </div>
        <div className="flex-1/2"> {children}</div>
      </div>
    </main>
  );
}

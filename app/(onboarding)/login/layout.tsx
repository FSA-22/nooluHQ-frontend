import OnboardingStepper from '@/components/onboarding/OnboardingStepper';
import Textbox from '@/components/shared/Textbox';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" bg-bgPrimary h-screen">
      <div className="flex-1/2"> {children}</div>
    </main>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full bg-bgPrimary h-2xl"> Onboarding</div>
      <div className="flex flex-col sm:flex-row">
        <div className="bg-primaryLight flex-1">Aside</div>
        <div className="flex-1/2"> {children}</div>
      </div>
    </div>
  );
}

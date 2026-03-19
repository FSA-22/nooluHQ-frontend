import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-white h-screen">
      <div className=" flex flex-col sm:flex-row h-full min-h-screen w-full ">
        <Sidebar />
        <div className="flex-1/2 min-h-screen py-2">{children}</div>
      </div>
    </main>
  );
}

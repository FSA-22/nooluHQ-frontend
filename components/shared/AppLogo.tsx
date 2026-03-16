import Image from 'next/image';
import Link from 'next/link';

const AppLogo = () => {
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
        aria-label="Go to homepage"
      >
        <Image
          src="/icons/app-logo-1.svg"
          alt="nooluHQ Logo"
          width={26}
          height={26}
          className="w-6 h-6"
        />
        <span className=" text-darkGrey max-sm:hidden">DIAG</span>
      </Link>
    </>
  );
};

export default AppLogo;

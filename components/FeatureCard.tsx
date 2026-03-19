import Image from 'next/image';
import Link from 'next/link';

const FeatureCard = () => {
  return (
    <div
      className="
        bg-bgPrimary border rounded-2xl
        py-3 sm:p-4
        flex flex-col items-center text-center w-full
        gap-4
        shadow-sm hover:shadow-md
        transition
      "
    >
      {/* ICON BADGE */}
      <div className="p-3 flex justify-start w-full ">
        <Image src={'/icons/badge.svg'} alt="badge" width={26} height={26} />
      </div>

      {/* TITLE */}
      <h3 className="text-sm sm:text-base text-left font-semibold text-darkGrey">
        You&apos;re on a 7-day free trie
      </h3>
      <h3 className="desc-text text-xs text-left">
        Enjoy full access to all features, no limits, no commitment (yet).{' '}
        <br /> Make the most of before your trial ends
      </h3>

      {/* BUTTON */}
      <Link href={'#'} className="onboarding-button-primary h-11 flex-center">
        Choose a Plan
      </Link>
    </div>
  );
};

export default FeatureCard;

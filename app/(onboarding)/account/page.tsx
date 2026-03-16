import OnboardingForm from '@/components/onboarding/AccountForm';

const Account = () => {
  return (
    <section className="home">
      <div className="home-container flex-center">
        <OnboardingForm page="account" />
      </div>
    </section>
  );
};

export default Account;

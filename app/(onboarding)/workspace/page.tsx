import OnboardingForm from '@/components/onboarding/AccountForm';

const Workspace = () => {
  return (
    <section className="home">
      <div className="home-container flex-center">
        <OnboardingForm page="Workspace" />
      </div>
    </section>
  );
};

export default Workspace;

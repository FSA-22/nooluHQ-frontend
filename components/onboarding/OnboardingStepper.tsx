// components/OnboardingStepper.tsx
import { ONBOARDING_STEPS } from '@/constants/onboardingSteps';
import { StepperProps } from '@/types';

const OnboardingStepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="flex flex-col h-full items-start gap-4">
      {ONBOARDING_STEPS.map(({ title, id }) => {
        const isActive = id === currentStep;
        const isCompleted = id < currentStep;
        return (
          <div key={id} className="flex items-center gap-3">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                isActive
                  ? 'desc-text text-xs bg-primaryLight text-white '
                  : isCompleted
                    ? 'desc-text text-xs bg-primaryLight text-white '
                    : 'border border-darkGrey'
              }`}
            >
              {id}
            </div>
            <div className="flex flex-col desc-text">
              <span
                className={`${isActive ? 'text-primaryLight' : isCompleted ? 'text-primaryLight' : ''}`}
              >
                {title}
              </span>
              {/* We might need descriptive words later -- destructure description from ONBOARDING_STEPS */}
              {/* <span className="text-[8px] ">{description}</span> */}
            </div>
            {id < ONBOARDING_STEPS.length && (
              <div className="absolute h-4 border-l border-darkGrey ml-3 mt-11" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingStepper;

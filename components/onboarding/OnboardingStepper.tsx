// components/OnboardingStepper.tsx
import { ONBOARDING_STEPS } from '@/constants/onboardingSteps';

interface StepperProps {
  currentStep: number;
}

export default function OnboardingStepper({ currentStep }: StepperProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      {ONBOARDING_STEPS.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                isActive
                  ? 'desc-text'
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'border-gray-300'
              }`}
            >
              {step.id}
            </div>
            <div className="flex flex-col">
              <span className={`${isActive ? 'font-bold' : ''}`}>
                {step.title}
              </span>
              <span className="text-sm text-gray-500">{step.description}</span>
            </div>
            {idx < ONBOARDING_STEPS.length - 1 && (
              <div className="absolute h-10 border-l-2 border-gray-300 ml-3 -mt-1"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

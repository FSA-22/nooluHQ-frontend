import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface OnboardingFormProps {
  page: string;
}

export interface TextBoxProps {
  title: string;
  desc: string;
}

export interface StepperProps {
  currentStep: number;
}

export interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'password';
}

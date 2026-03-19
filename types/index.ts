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

export interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  plan: string;
  joined: string;
  status: 'active' | 'pending' | 'inactive';
}

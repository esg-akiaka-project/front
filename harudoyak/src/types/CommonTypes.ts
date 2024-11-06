export interface StepperItemProps {
  stepNumber: number;
  stepName: string;
  status: "completed" | "active" | "default";
}

export interface StepperProps {
  steps: StepperItemProps[];
}

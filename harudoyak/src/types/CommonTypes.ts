export interface User {
  isLogin: boolean;

  userinfo: {
    userId: string | null;
    botId: string | null;
    password: string | null;
  } | null;

  login: (userinfo: {
    userId: string;
    botId: string;
    password: string;
  }) => void;
}

export interface StepperItemProps {
  stepNumber: number;
  stepName: string;
  status: "completed" | "active" | "default";
}

export interface StepperProps {
  steps: StepperItemProps[];
}

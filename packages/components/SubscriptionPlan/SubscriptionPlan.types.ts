export interface SubscriptionPlanProps {
  selectedPlan: string;
  plan: any;
  token: any;
  updateSelectedPlan: (planId: string) => void;
}

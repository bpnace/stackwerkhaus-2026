import {
  isValidEmail,
  normalizeWebsiteUrl,
} from "@/lib/baustellencheck.mjs";

export const stepLabels = ["URL", "Zustand", "Ziel", "Kontakt"] as const;

export type BaustellencheckStep = 0 | 1 | 2 | 3;

export type BaustellencheckFormState = {
  websiteUrl: string;
  currentState: string;
  goals: string[];
  name: string;
  email: string;
  termsAccepted: boolean;
};

export type BaustellencheckApiResult = {
  success?: boolean;
  message?: string;
};

export function isWebsiteUrlReady(value: string) {
  return normalizeWebsiteUrl(value).length > 0;
}

export function isContactStepReady(state: BaustellencheckFormState) {
  return (
    state.name.trim().length >= 2 &&
    isValidEmail(state.email) &&
    state.termsAccepted
  );
}

export function isStepReady(
  state: BaustellencheckFormState,
  stepIndex: BaustellencheckStep,
) {
  switch (stepIndex) {
    case 0:
      return isWebsiteUrlReady(state.websiteUrl);
    case 1:
      return state.currentState.length > 0;
    case 2:
      return state.goals.length > 0;
    case 3:
      return isContactStepReady(state);
    default:
      return false;
  }
}

export function isFormReady(state: BaustellencheckFormState) {
  return (
    isWebsiteUrlReady(state.websiteUrl) &&
    state.currentState.length > 0 &&
    state.goals.length > 0 &&
    isContactStepReady(state)
  );
}

export function getFirstIncompleteStep(state: BaustellencheckFormState) {
  if (!isWebsiteUrlReady(state.websiteUrl)) {
    return 0;
  }

  if (!state.currentState) {
    return 1;
  }

  if (state.goals.length === 0) {
    return 2;
  }

  return 3;
}

export function canVisitStep(
  state: BaustellencheckFormState,
  currentStep: BaustellencheckStep,
  targetStep: BaustellencheckStep,
) {
  if (targetStep <= currentStep) {
    return true;
  }

  if (targetStep === 1) {
    return isWebsiteUrlReady(state.websiteUrl);
  }

  if (targetStep === 2) {
    return isWebsiteUrlReady(state.websiteUrl) && state.currentState.length > 0;
  }

  return (
    isWebsiteUrlReady(state.websiteUrl) &&
    state.currentState.length > 0 &&
    state.goals.length > 0
  );
}

export async function readBaustellencheckResponse(response: Response) {
  try {
    return (await response.json()) as BaustellencheckApiResult;
  } catch {
    return {};
  }
}

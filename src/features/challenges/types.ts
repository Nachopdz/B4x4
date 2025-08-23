export type ChallengeType = 'skill' | 'time' | 'trick';
export type ChallengeStatus = 'open' | 'closed' | 'settled';
export type AttemptStatus = 'pending' | 'approved' | 'rejected';
export type ValidationDecision = 'approve' | 'reject';

export interface Challenge {
  id: string;
  title: string;
  type: ChallengeType;
  rules: string;
  creatorUid: string;
  status: ChallengeStatus;
  deadlineAt: number;
  minValidators: number;
  createdAt: any; // Firestore Timestamp
}

export interface ChallengeAttempt {
  id: string;
  uid: string;
  mediaUrl: string;
  note: string;
  status: AttemptStatus;
  score?: number;
  createdAt: any; // Firestore Timestamp
}

export interface ChallengeValidation {
  id: string;
  validatorUid: string;
  targetUid: string;
  decision: ValidationDecision;
  createdAt: any; // Firestore Timestamp
}

export interface CreateChallengeData {
  title: string;
  type: ChallengeType;
  rules: string;
  creatorUid: string;
  deadlineAt: number;
  minValidators: number;
}

export interface CreateAttemptData {
  uid: string;
  mediaUrl: string;
  note?: string;
}

export interface CreateValidationData {
  validatorUid: string;
  targetUid: string;
  decision: ValidationDecision;
}

// Tipos para las respuestas de las funciones
export interface ChallengesListResponse {
  items: Challenge[];
  nextCursor?: any;
}

export interface AttemptsListResponse {
  items: ChallengeAttempt[];
  nextCursor?: any;
}

export interface ValidationsListResponse {
  items: ChallengeValidation[];
  nextCursor?: any;
}

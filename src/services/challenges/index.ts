// B4X4 v5.1 START
import { ENV } from '@/config/env';
import { ChallengeServiceHttp } from './ChallengeService.http';
import { ChallengeService as ChallengeServiceMock } from '../ChallengeService';

export const ChallengeService = ENV.USE_MOCK_CHALLENGES ? (ChallengeServiceMock as any) : (ChallengeServiceHttp as any);
// B4X4 v5.1 END
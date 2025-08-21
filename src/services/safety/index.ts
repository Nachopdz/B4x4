// B4X4 v5.1 START
import { ENV } from '@/config/env';
import { SafetyServiceHttp } from './SafetyService.http';
import { SafetyService as SafetyServiceMock } from '../SafetyService';

export const SafetyService = ENV.USE_MOCK_SAFETY ? (SafetyServiceMock as any) : (SafetyServiceHttp as any);
// B4X4 v5.1 END
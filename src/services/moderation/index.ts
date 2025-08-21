// B4X4 v5.1 START
import { ENV } from '@/config/env';
import { ModerationServiceHttp } from './ModerationService.http';
import { ModerationService as ModerationServiceMock } from '../ModerationService';

export const ModerationService = ENV.USE_MOCK_MODERATION ? (ModerationServiceMock as any) : (ModerationServiceHttp as any);
// B4X4 v5.1 END
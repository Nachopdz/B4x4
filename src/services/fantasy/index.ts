// B4X4 v6.1 START
import { ENV } from '@/config/env';
import { FantasyServiceMock } from './FantasyService.mock';
import { FantasyServiceHttp } from './FantasyService.http';

export const FantasyService = ENV.USE_MOCK_FANTASY ? FantasyServiceMock : FantasyServiceHttp;
// B4X4 v6.1 END
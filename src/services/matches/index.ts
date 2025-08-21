// B4X4 v5.4 START
import { ENV } from '@/config/env';
import { MatchesServiceMock } from './MatchesService.mock';
import { MatchesServiceHttp } from './MatchesService.http';

export const MatchesService = ENV.USE_MOCK_MATCHES ? MatchesServiceMock : MatchesServiceHttp;
// B4X4 v5.4 END
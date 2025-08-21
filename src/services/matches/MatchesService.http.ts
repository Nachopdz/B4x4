// B4X4 v5.4 START
import { Http } from '@/services/ApiClient';
import { routes } from '@/services/http/routes';
import { Match, MatchDTO } from '@/types/dto';
import { mapMatch } from '@/utils/mappers';

export const MatchesServiceHttp = {
  async list(): Promise<Match[]> {
    const data = await Http.get<MatchDTO[]>(routes.matches.list);
    return data.map(mapMatch);
  },
  async get(id: string): Promise<Match | null> {
    const data = await Http.get<MatchDTO>(routes.matches.item(id));
    return mapMatch(data);
  },
};
// B4X4 v5.4 END
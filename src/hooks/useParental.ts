// B4X4 v4.8 HOTFIX START
import { useSafety } from '@/safety/useSafety';

/**
 * Adapter ligero para compatibilidad:
 * - parental.settings === safety (react-query result)
 * - parental.update   === mutation de SafetyService.set
 */
export function useParental(userId: string, age?: number | null) {
  const { safety, update } = useSafety(userId, age);
  return { settings: safety, update };
}
// B4X4 v4.8 HOTFIX END
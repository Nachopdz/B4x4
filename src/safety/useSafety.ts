// B4X4 v4.8 START
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SafetyService } from '@/services/safety';

export function useSafety(userId: string, age?: number | null) {
  const qc = useQueryClient();
  const safety = useQuery({
    queryKey: ['safety', userId],
    queryFn: () => SafetyService.get(userId, age),
  });

  const update = useMutation({
    mutationFn: (partial: any) => SafetyService.set(userId, partial),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['safety', userId] }),
  });

  return { safety, update };
}
// B4X4 v4.8 END
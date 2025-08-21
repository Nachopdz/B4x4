// B4X4 v4.8 START
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ModerationService } from '@/services/ModerationService';

export function useReports(userId: string) {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['reports', userId],
    queryFn: () => ModerationService.listReports(userId),
  });

  const resolve = useMutation({
    mutationFn: ({ reportId, action }: { reportId: string; action: 'warn'|'delete'|'ignore' }) =>
      ModerationService.resolve(reportId, action, userId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reports', userId] }),
  });

  return { list, resolve };
}
// B4X4 v4.8 END
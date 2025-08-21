// B4X4 v4.7 START
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VaultService } from '@/services/VaultService';

export function useVault(userId: string) {
  const qc = useQueryClient();

  const wallet = useQuery({ queryKey: ['wallet', userId], queryFn: () => VaultService.getWallet(userId) });
  const txs = useInfiniteQuery({
    queryKey: ['walletTxs', userId],
    queryFn: ({ pageParam }) => VaultService.listTransactions(userId, { cursor: pageParam ?? null }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });

  const earn = useMutation({
    mutationFn: ({ amount, reason }: { amount: number; reason: any }) => VaultService.earn(userId, amount, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wallet', userId] });
      qc.invalidateQueries({ queryKey: ['walletTxs', userId] });
    },
  });

  return { wallet, txs, earn };
}

export function useSkins(userId: string) {
  const qc = useQueryClient();
  const catalog = useQuery({ queryKey: ['skinsCatalog'], queryFn: () => VaultService.listSkins() });
  const inv = useQuery({ queryKey: ['inventory', userId], queryFn: () => VaultService.getInventory(userId) });

  const buy = useMutation({
    mutationFn: (skinId: string) => VaultService.buySkin(userId, skinId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wallet', userId] });
      qc.invalidateQueries({ queryKey: ['inventory', userId] });
      qc.invalidateQueries({ queryKey: ['walletTxs', userId] });
    },
  });

  const equip = useMutation({
    mutationFn: (skinId: string) => VaultService.equipSkin(userId, skinId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['inventory', userId] }),
  });

  return { catalog, inv, buy, equip };
}

export function useEntitlements(userId: string) {
  const qc = useQueryClient();
  const ent = useQuery({ queryKey: ['entitlements', userId], queryFn: () => VaultService.getEntitlements(userId) });

  const activatePro = useMutation({
    mutationFn: () => VaultService.activatePro(userId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['entitlements', userId] }),
  });
  const deactivatePro = useMutation({
    mutationFn: () => VaultService.deactivatePro(userId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['entitlements', userId] }),
  });

  return { ent, activatePro, deactivatePro };
}
// B4X4 v4.7 END
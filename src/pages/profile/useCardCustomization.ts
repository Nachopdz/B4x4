// B4X4 v5.7 START
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { VaultService } from '@/services/VaultService';
import { useEntitlements, useVault, useSkins } from '@/pages/vault/useVault';

export function useCardCustomization() {
  const qc = useQueryClient();
  const session = useAuthStore((s) => s.session);
  const userId = session?.user?.id ?? (session as any)?.userId ?? 'u1';

  // Inventory directo contra el servicio (shape: { userId, skins: string[], equippedSkin?: string })
  const inventory = useQuery({
    queryKey: ['inventory', userId],
    queryFn: () => VaultService.getInventory(userId),
  });

  // Wallet y entitlements existentes
  const wallet = useVault(userId);
  const ents = useEntitlements(userId);
  const catalog = useSkins(userId).catalog; // lista de skins con price

  const buySkin = useMutation({
    mutationFn: async ({ skinId }: { skinId: string }) => {
      // La lógica de precio vive en el servicio mock vía catálogo; si quieres descuento Pro, hacemos cashback
      const isPro = ents.ent.data?.proActive === true;
      // Ejecuta compra al precio del catálogo
      const inv = await VaultService.buySkin(userId, skinId);
      // Cashback 30% si Pro activo
      if (isPro) {
        const price = catalog.data?.find((s) => s.id === skinId)?.price ?? 0;
        if (price > 0) {
          await VaultService.earn(userId, Math.floor(price * 0.3), 'admin_grant');
        }
      }
      return inv;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory', userId] });
      qc.invalidateQueries({ queryKey: ['wallet', userId] });
      qc.invalidateQueries({ queryKey: ['walletTxs', userId] });
    },
  });

  const equipSkin = useMutation({
    mutationFn: ({ skinId }: { skinId: string }) => VaultService.equipSkin(userId, skinId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory', userId] });
    },
  });

  return { userId, inventory, wallet, ents, catalog, buySkin, equipSkin };
}
// B4X4 v5.7 END
// B4X4 v4.7 START
import type { Wallet, Transaction, Skin, Inventory, Entitlements } from '@/types';

const wallets: Record<string, Wallet> = {};
const txs: Record<string, Transaction[]> = {};
const inventories: Record<string, Inventory> = {};
const entitlements: Record<string, Entitlements> = {};
const catalog: Skin[] = [
  { id: 'skin_glow_green', name: 'Glow Verde', price: 200, rarity: 'common', previewUrl: 'https://picsum.photos/seed/green/200/200' },
  { id: 'skin_glow_purple', name: 'Glow Púrpura', price: 350, rarity: 'rare', previewUrl: 'https://picsum.photos/seed/purple/200/200' },
  { id: 'skin_neon_turq', name: 'Neón Turquesa', price: 500, rarity: 'epic', previewUrl: 'https://picsum.photos/seed/turq/200/200' },
];

function nowISO() { return new Date().toISOString(); }
function ensureUser(userId: string) {
  if (!wallets[userId]) wallets[userId] = { userId, balance: 300, updatedAt: nowISO() };
  if (!txs[userId]) txs[userId] = [];
  if (!inventories[userId]) inventories[userId] = { userId, skins: [], equippedSkin: undefined };
  if (!entitlements[userId]) entitlements[userId] = { proActive: false };
}

export const VaultService = {
  async getWallet(userId: string): Promise<Wallet> {
    ensureUser(userId);
    await new Promise((r) => setTimeout(r, 120));
    return wallets[userId];
  },
  async listTransactions(userId: string, { cursor, limit = 20 }: { cursor?: string | null; limit?: number }) {
    ensureUser(userId);
    const page = cursor ? parseInt(cursor, 10) : 0;
    const all = txs[userId].slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const start = page * limit;
    const items = all.slice(start, start + limit);
    const nextCursor = start + limit >= all.length ? null : String(page + 1);
    await new Promise((r) => setTimeout(r, 120));
    return { items, nextCursor };
  },
  async earn(userId: string, amount: number, reason: Transaction['reason']): Promise<Wallet> {
    ensureUser(userId);
    const w = wallets[userId];
    w.balance += amount;
    w.updatedAt = nowISO();
    txs[userId].unshift({ id: 't_' + Date.now(), userId, amount, type: 'earn', reason, createdAt: nowISO() });
    await new Promise((r) => setTimeout(r, 100));
    return w;
  },
  async spend(userId: string, amount: number, reason: Transaction['reason']): Promise<Wallet> {
    ensureUser(userId);
    const w = wallets[userId];
    if (w.balance < amount) throw new Error('Saldo insuficiente');
    w.balance -= amount;
    w.updatedAt = nowISO();
    txs[userId].unshift({ id: 't_' + Date.now(), userId, amount: -amount, type: 'spend', reason, createdAt: nowISO() });
    await new Promise((r) => setTimeout(r, 100));
    return w;
  },
  async listSkins(): Promise<Skin[]> {
    await new Promise((r) => setTimeout(r, 80));
    return catalog;
  },
  async getInventory(userId: string): Promise<Inventory> {
    ensureUser(userId);
    await new Promise((r) => setTimeout(r, 100));
    return inventories[userId];
  },
  async buySkin(userId: string, skinId: string): Promise<Inventory> {
    ensureUser(userId);
    const skin = catalog.find((s) => s.id === skinId);
    if (!skin) throw new Error('Skin no encontrada');
    const inv = inventories[userId];
    if (inv.skins.includes(skinId)) return inv;
    await VaultService.spend(userId, skin.price, 'skin_purchase');
    inv.skins = [skinId, ...inv.skins];
    await new Promise((r) => setTimeout(r, 60));
    return inv;
  },
  async equipSkin(userId: string, skinId: string): Promise<Inventory> {
    ensureUser(userId);
    const inv = inventories[userId];
    if (!inv.skins.includes(skinId)) throw new Error('No posees esta skin');
    inv.equippedSkin = skinId;
    await new Promise((r) => setTimeout(r, 60));
    return inv;
  },
  async getEntitlements(userId: string): Promise<Entitlements> {
    ensureUser(userId);
    await new Promise((r) => setTimeout(r, 60));
    return entitlements[userId];
  },
  async activatePro(userId: string): Promise<Entitlements> {
    ensureUser(userId);
    entitlements[userId] = { proActive: true, grantedAt: nowISO() };
    await new Promise((r) => setTimeout(r, 80));
    return entitlements[userId];
  },
  async deactivatePro(userId: string): Promise<Entitlements> {
    ensureUser(userId);
    entitlements[userId] = { proActive: false };
    await new Promise((r) => setTimeout(r, 80));
    return entitlements[userId];
  },
};
// B4X4 v4.7 END
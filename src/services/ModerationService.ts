// B4X4 v4.8 START
import type { ModerationAction, Report } from '@/types';

type TargetType = Report['targetType'];

type ReportStore = {
  reports: Record<string, Report>; // reportId -> Report
  byUser: Record<string, string[]>; // userId -> reportIds
  actions: Record<string, ModerationAction[]>; // reportId -> actions
};

const STORE: ReportStore = {
  reports: {},
  byUser: {},
  actions: {},
};

function nowISO() { return new Date().toISOString(); }

export const ModerationService = {
  async report(userId: string, targetId: string, type: TargetType, reason: Report['reason']): Promise<Report> {
    const reportId = `rep_${Date.now()}_${Math.floor(Math.random()*1000)}`;
    const r: Report = { reportId, targetId, targetType: type, reason, status: 'pending', createdAt: nowISO() };
    STORE.reports[reportId] = r;
    STORE.byUser[userId] = [reportId, ...(STORE.byUser[userId] ?? [])];
    await new Promise(r => setTimeout(r, 120));
    return r;
  },

  async listReports(userId: string): Promise<Report[]> {
    const ids = STORE.byUser[userId] ?? [];
    const items = ids.map(id => STORE.reports[id]).filter(Boolean);
    await new Promise(r => setTimeout(r, 80));
    return items;
  },

  async resolve(reportId: string, action: ModerationAction['type'], resolvedBy?: string): Promise<{ report: Report; action: ModerationAction }>{
    const rep = STORE.reports[reportId];
    if (!rep) throw new Error('Reporte no encontrado');
    rep.status = 'resolved';
    rep.resolvedBy = resolvedBy;
    const act: ModerationAction = { actionId: `act_${Date.now()}`, reportId, type: action, resolvedAt: nowISO() };
    STORE.actions[reportId] = [act, ...(STORE.actions[reportId] ?? [])];
    await new Promise(r => setTimeout(r, 100));
    return { report: rep, action: act };
  },
};
// B4X4 v4.8 END
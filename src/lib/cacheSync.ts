// B4X4 v4.4 START
import type { QueryClient } from '@tanstack/react-query';
import type { Match } from '@/types';

export function applyAttendeeInPages(data: any, matchId: string, userId: string, join: boolean) {
  if (!data) return data;
  const pages = data.pages.map((p: any) => ({
    ...p,
    items: p.items.map((m: Match) => {
      if (m.id !== matchId) return m;
      const has = m.attendees.includes(userId);
      if (join && !has) return { ...m, attendees: [...m.attendees, userId] };
      if (!join && has) return { ...m, attendees: m.attendees.filter((id) => id !== userId) };
      return m;
    }),
  }));
  return { ...data, pages };
}

export function syncAttendeeToList(qc: QueryClient, matchId: string, userId: string, join: boolean) {
  qc.setQueriesData(['matches', 'nearby'], (data: any) => applyAttendeeInPages(data, matchId, userId, join));
}

export function syncAttendeeToDetail(qc: QueryClient, matchId: string, userId: string, join: boolean) {
  qc.setQueriesData(['match', matchId], (m: Match | any) => {
    if (!m) return m;
    const has = m.attendees?.includes?.(userId);
    if (join && !has) return { ...m, attendees: [...m.attendees, userId] };
    if (!join && has) return { ...m, attendees: m.attendees.filter((id: string) => id !== userId) };
    return m;
  });
}
// B4X4 v4.4 END

// B4X4 v4.5 START
export function setWaitlist(qc: QueryClient, where: 'list' | 'detail', matchId: string, userId: string, join: boolean) {
  const apply = (m: Match) => {
    const list = m.waitlist ?? [];
    const has = list.includes(userId);
    if (join && !has) return { ...m, waitlist: [...list, userId] };
    if (!join && has) return { ...m, waitlist: list.filter((id) => id !== userId) };
    return m;
  };
  if (where === 'detail') {
    qc.setQueriesData(['match', matchId], (m: Match | any) => (m ? apply(m) : m));
  } else {
    qc.setQueriesData(['matches', 'nearby'], (data: any) => {
      if (!data) return data;
      const pages = data.pages.map((p: any) => ({
        ...p,
        items: p.items.map((it: Match) => (it.id === matchId ? apply(it) : it)),
      }));
      return { ...data, pages };
    });
  }
}

export function promoteFromWaitlist(qc: QueryClient, matchId: string, promotedUserId?: string) {
  if (!promotedUserId) return;
  qc.setQueriesData(['match', matchId], (m: Match | any) => {
    if (!m) return m;
    const wl = (m.waitlist ?? []).filter((id: string) => id !== promotedUserId);
    const at = m.attendees.includes(promotedUserId) ? m.attendees : [...m.attendees, promotedUserId];
    return { ...m, waitlist: wl, attendees: at };
  });
  qc.setQueriesData(['matches', 'nearby'], (data: any) => {
    if (!data) return data;
    const pages = data.pages.map((p: any) => ({
      ...p,
      items: p.items.map((m: Match) => {
        if (m.id !== matchId) return m;
        const wl = (m.waitlist ?? []).filter((id) => id !== promotedUserId);
        const at = m.attendees.includes(promotedUserId!) ? m.attendees : [...m.attendees, promotedUserId!];
        return { ...m, waitlist: wl, attendees: at };
      }),
    }));
    return { ...data, pages };
  });
}
// B4X4 v4.5 END
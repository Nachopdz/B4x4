// B4X4 v4.5 START
import type { Court, Match } from '@/types';

function buildSporttiaLink(court: Court, dateISO: string) {
  const d = new Date(dateISO);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `https://sporttia.com/${court.providerCourtSlug}?date=${y}-${m}-${day}`;
}

function buildPlayfinderLink(court: Court, dateISO: string) {
  const d = new Date(dateISO).toISOString();
  return `https://www.playfinder.com/${court.providerCourtSlug}?when=${encodeURIComponent(d)}`;
}

export const BookingService = {
  getDeeplink(court: Court, match: Match) {
    if (!court.provider) return null;
    if (court.provider === 'sporttia') return buildSporttiaLink(court, match.date);
    if (court.provider === 'playfinder') return buildPlayfinderLink(court, match.date);
    return null;
  },

  buildICS(match: Match, court?: Court) {
    const dt = new Date(match.date);
    const pad = (n: number) => String(n).padStart(2, '0');
    const toICS = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(
        d.getUTCMinutes()
      )}00Z`;

    const dtStart = toICS(dt);
    const dtEnd = toICS(new Date(dt.getTime() + 90 * 60 * 1000));
    const loc = court ? `${court.name}${court.city ? ', ' + court.city : ''}` : 'Outdoor court';
    const desc = `B4X4 Pickup Match (${match.attendees.length}/${match.maxPlayers})`;

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//B4X4//Matches//ES',
      'BEGIN:VEVENT',
      `UID:${match.id}@b4x4`,
      `DTSTAMP:${dtStart}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:Partido B4X4`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  },
};
// B4X4 v4.5 END
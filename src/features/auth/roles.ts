export type Role = 'player'|'creator'|'viewer'|'organizer'|'mod'|'admin';

export const can = {
  createLeague: (r?:Role)=> r==='organizer'||r==='admin',
  createChallenge: (r?:Role)=> ['player','creator','organizer','admin'].includes(r||'player'),
  moderate: (r?:Role)=> r==='mod'||r==='admin',
};

import { getCollection, type CollectionEntry } from 'astro:content';
import { ROLES } from '../content/config';

export type Session = CollectionEntry<'sessions'>;
export type Paper = CollectionEntry<'papers'>;
export type Member = CollectionEntry<'members'>;

const cache: { sessions?: Session[]; papers?: Paper[]; members?: Member[] } = {};

export async function getSessions(): Promise<Session[]> {
  if (!cache.sessions) {
    const all = await getCollection('sessions');
    cache.sessions = all.sort(
      (a, b) => b.data.date.getTime() - a.data.date.getTime(),
    );
  }
  return cache.sessions;
}

export async function getPapers(): Promise<Paper[]> {
  if (!cache.papers) {
    cache.papers = (await getCollection('papers')).sort((a, b) =>
      a.data.title.localeCompare(b.data.title),
    );
  }
  return cache.papers;
}

export async function getMembers(): Promise<Member[]> {
  if (!cache.members) {
    cache.members = (await getCollection('members')).sort((a, b) =>
      a.data.name.localeCompare(b.data.name),
    );
  }
  return cache.members;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function roleLabel(role: string): string {
  return role
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(' ');
}

export { ROLES };

export interface ConceptNode {
  id: string;
  label: string;
  weight: number;
}
export interface ConceptEdge {
  source: string;
  target: string;
  weight: number;
}

export function buildConceptGraph(
  sessions: Session[],
  papers: Paper[] = [],
): { nodes: ConceptNode[]; edges: ConceptEdge[] } {
  const tagCount = new Map<string, number>();
  const pairCount = new Map<string, number>();

  const bumpTag = (t: string) => tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
  const bumpPair = (a: string, b: string, w = 1) => {
    const [x, y] = [a, b].sort();
    const key = `${x}::${y}`;
    pairCount.set(key, (pairCount.get(key) ?? 0) + w);
  };

  const collect = (tagsArr: readonly string[][]) => {
    for (const tags of tagsArr) {
      const uniq = [...new Set(tags)];
      for (const t of uniq) bumpTag(t);
      for (let i = 0; i < uniq.length; i++) {
        for (let j = i + 1; j < uniq.length; j++) {
          bumpPair(uniq[i], uniq[j]);
        }
      }
    }
  };

  collect(sessions.map((s) => s.data.tags ?? []));
  collect(papers.map((p) => p.data.tags ?? []));

  const nodes: ConceptNode[] = [...tagCount.entries()].map(([id, w]) => ({
    id,
    label: id,
    weight: w,
  }));
  const edges: ConceptEdge[] = [...pairCount.entries()].map(([k, w]) => {
    const [source, target] = k.split('::');
    return { source, target, weight: w };
  });
  return { nodes, edges };
}

export interface PaperNode {
  id: string;
  label: string;
  weight: number;
}
export interface PaperEdge {
  source: string;
  target: string;
}

export function buildCitationWeb(sessions: Session[], papers: Paper[]): {
  nodes: PaperNode[];
  edges: PaperEdge[];
} {
  // Only papers we've actually read are nodes in the citation web.
  const readSlugs = getReadPaperSlugs(sessions);
  const refCount = new Map<string, number>();
  for (const slug of readSlugs) refCount.set(slug, 0);

  for (const s of sessions) {
    const sessionPapers = (s.data.papers ?? []).map((r: any) =>
      typeof r === 'string' ? r : r.slug,
    );
    for (const sp of sessionPapers) {
      refCount.set(sp, (refCount.get(sp) ?? 0) + 1);
    }
  }

  const readPapers = papers.filter((p) => readSlugs.has(p.slug));

  // Edges are derived from shared tags between read papers.
  // Weight = number of tags they share.
  const edges: PaperEdge[] = [];
  for (let i = 0; i < readPapers.length; i++) {
    const a = readPapers[i];
    const aTags = new Set(a.data.tags ?? []);
    for (let j = i + 1; j < readPapers.length; j++) {
      const b = readPapers[j];
      let shared = 0;
      for (const t of b.data.tags ?? []) {
        if (aTags.has(t)) shared++;
      }
      if (shared > 0) {
        edges.push({ source: a.slug, target: b.slug, weight: shared });
      }
    }
  }

  const nodes: PaperNode[] = readPapers.map((p) => ({
    id: p.slug,
    label: p.data.title,
    weight: refCount.get(p.slug) ?? 0,
  }));

  return { nodes, edges };
}

export interface MemberStats {
  member: Member;
  sessionsAttended: Session[];
  rolesPlayed: { role: string; session: Session }[];
}

export async function getMemberStats(slug: string): Promise<MemberStats | null> {
  const members = await getMembers();
  const member = members.find((m) => m.slug === slug);
  if (!member) return null;
  const sessions = await getSessions();
  const attended: Session[] = [];
  const roles: { role: string; session: Session }[] = [];

  for (const s of sessions) {
    const attendeeSlugs = (s.data.attendees ?? []).map((r: any) =>
      typeof r === 'string' ? r : r.slug,
    );
    if (attendeeSlugs.includes(slug)) attended.push(s);
    for (const role of ROLES) {
      const r = (s.data.roles as Record<string, any>)?.[role];
      if (!r) continue;
      const rSlug = typeof r === 'string' ? r : r.slug;
      if (rSlug === slug) roles.push({ role, session: s });
    }
  }
  return { member, sessionsAttended: attended, rolesPlayed: roles };
}

export async function getPaperSessions(paperSlug: string): Promise<Session[]> {
  const sessions = await getSessions();
  return sessions.filter((s) =>
    (s.data.papers ?? []).some((r: any) =>
      (typeof r === 'string' ? r : r.slug) === paperSlug,
    ),
  );
}

export function getReadPaperSlugs(sessions: Session[]): Set<string> {
  const read = new Set<string>();
  for (const s of sessions) {
    for (const r of s.data.papers ?? []) {
      read.add(typeof r === 'string' ? r : (r as any).slug);
    }
  }
  return read;
}

export function partitionPapers(
  papers: Paper[],
  readSlugs: Set<string>,
): { read: Paper[]; considered: Paper[] } {
  const read: Paper[] = [];
  const considered: Paper[] = [];
  for (const p of papers) {
    (readSlugs.has(p.slug) ? read : considered).push(p);
  }
  return { read, considered };
}

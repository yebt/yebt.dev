import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, langs, ui, type Lang, type UIKey } from './ui';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (langs as string[]).includes(value);
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return isLang(segment) ? segment : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/** Build a localized, trailing-slash path: path('es', 'garden') -> /es/garden/ */
export function path(lang: Lang, ...segments: string[]) {
  const rest = segments.filter(Boolean).join('/');
  return `/${lang}/${rest ? `${rest}/` : ''}`;
}

/** Same page in the other language. */
export function swapLang(url: URL, to: Lang) {
  const parts = url.pathname.split('/');
  if (isLang(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join('/') || `/${to}/`;
}

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

export function formatDate(date: Date, lang: Lang, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
    ...opts,
  }).format(date);
}

export const getStaticLangPaths = () => langs.map((lang) => ({ params: { lang } }));

/* ---------- content helpers ---------- */

type Localized = 'projects' | 'garden' | 'resources';

/** Entries live in `<collection>/<lang>/<slug>.md`. */
export const slugOf = (entry: { id: string }) => entry.id.split('/').slice(1).join('/');
export const langOf = (entry: { id: string }) => entry.id.split('/')[0] as Lang;

const showDrafts = import.meta.env.DEV;

export async function getLocalized<C extends Localized>(collection: C, lang: Lang) {
  const entries = (await getCollection(collection)) as CollectionEntry<C>[];
  return entries.filter(
    (e) => langOf(e) === lang && (showDrafts || !(e.data as { draft?: boolean }).draft),
  );
}

export function readingTime(body = '') {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));
}

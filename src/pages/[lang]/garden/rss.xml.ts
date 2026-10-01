import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '@/data/site';
import type { Lang } from '@/i18n/ui';
import { getLocalized, getStaticLangPaths, path, slugOf, useTranslations } from '@/i18n/utils';

export const getStaticPaths = getStaticLangPaths;

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const t = useTranslations(lang);
  const entries = (await getLocalized('garden', lang)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `${site.name} — ${t('garden.title')}`,
    description: t('garden.lede'),
    site: context.site ?? site.url,
    customData: `<language>${lang === 'es' ? 'es-co' : 'en-us'}</language>`,
    items: entries.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.date,
      link: path(lang, 'garden', slugOf(e)),
      categories: [e.data.kind, ...e.data.tags],
    })),
  });
}

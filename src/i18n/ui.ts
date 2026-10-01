export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];

export const ui = {
  en: {
    'meta.description':
      'Yahir Bravo — software engineer focused on backend and software architecture. Case studies, system design videos and resources.',
    'nav.home': 'Index',
    'nav.projects': 'Projects',
    'nav.garden': 'Garden',
    'nav.resources': 'Resources',
    'nav.cv': 'CV',
    'nav.skip': 'Skip to content',
    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Leer en español',

    'hero.kicker': 'Software engineer · Backend & architecture',
    'hero.title.a': 'I design',
    'hero.title.b': 'systems',
    'hero.title.c': 'that teams can ship.',
    'hero.lede':
      'I build and deploy backend-heavy web applications, lead three projects in parallel, and write internal tools that remove repetitive work for other areas of the company. I care about clear boundaries, boring infrastructure and decisions that can be explained.',
    'hero.cta.cv': 'Download CV (ATS · PDF)',
    'hero.cta.projects': 'See case studies',
    'hero.available': 'Open to remote backend / architecture roles',

    'now.title': 'Now',
    'impact.title': 'Measured impact',
    'principles.title': 'How I work',
    'stack.title': 'Toolbox',
    'featured.title': 'Featured projects',
    'featured.all': 'All projects',
    'garden.latest': 'From the garden',
    'garden.all': 'Enter the garden',
    'contact.title': 'Let’s talk',
    'contact.lede':
      'Hiring for backend or architecture work, or want to compare notes on a system? Reach out.',

    'projects.title': 'Projects',
    'projects.lede':
      'Case studies, not screenshots. Each one covers the context, the constraints, the decisions and the trade-offs — and what I would do differently.',
    'projects.role': 'Role',
    'projects.stack': 'Stack',
    'projects.year': 'Year',
    'projects.status': 'Status',
    'projects.outcomes': 'Outcomes',
    'projects.repo': 'Source',
    'projects.live': 'Live',
    'projects.related': 'Related garden entries',
    'projects.private': 'Private / company work — details anonymised',
    'projects.back': 'All projects',

    'garden.title': 'Garden',
    'garden.lede':
      'Long-form notes and videos: system design walkthroughs, how a project was built, what broke and why. Some entries are seedlings, some are evergreen.',
    'garden.empty': 'The first seeds are being planted. Come back soon.',
    'garden.video.pending': 'Video in production',
    'garden.back': 'Back to the garden',
    'garden.project': 'Project',
    'garden.stage.seedling': 'Seedling',
    'garden.stage.budding': 'Budding',
    'garden.stage.evergreen': 'Evergreen',
    'garden.rss': 'RSS',

    'resources.title': 'Resources',
    'resources.lede':
      'Tools, templates, scripts and references I use and share. Free to take.',
    'resources.empty': 'Nothing published yet — resources are on the way.',
    'resources.open': 'Open',
    'resources.all': 'All',

    'cv.title': 'Curriculum vitae',
    'cv.lede':
      'Single-column, text-based and parser-friendly. The same content you see here is in the PDF.',
    'cv.download': 'Download PDF',
    'cv.other': 'Versión en español',
    'cv.print': 'Print',

    'common.readMore': 'Read',
    'common.minutes': 'min',
    'common.updated': 'Updated',
    'common.draft': 'Draft',
    'common.present': 'Present',

    '404.title': 'Signal lost',
    '404.lede': 'This page does not exist, or it moved.',
    '404.back': 'Go to the index',
  },
  es: {
    'meta.description':
      'Yahir Bravo — ingeniero de software enfocado en backend y arquitectura de software. Casos de estudio, videos de diseño de sistemas y recursos.',
    'nav.home': 'Índice',
    'nav.projects': 'Proyectos',
    'nav.garden': 'Garden',
    'nav.resources': 'Recursos',
    'nav.cv': 'CV',
    'nav.skip': 'Ir al contenido',
    'theme.toggle': 'Cambiar tema',
    'lang.switch': 'Read in English',

    'hero.kicker': 'Ingeniero de software · Backend y arquitectura',
    'hero.title.a': 'Diseño',
    'hero.title.b': 'sistemas',
    'hero.title.c': 'que los equipos pueden entregar.',
    'hero.lede':
      'Construyo y despliego aplicaciones web con foco en backend, lidero tres proyectos en paralelo y creo herramientas internas que eliminan trabajo repetitivo en distintas áreas de la empresa. Me importan los límites claros, la infraestructura aburrida y las decisiones que se pueden explicar.',
    'hero.cta.cv': 'Descargar CV (ATS · PDF)',
    'hero.cta.projects': 'Ver casos de estudio',
    'hero.available': 'Abierto a roles remotos de backend / arquitectura',

    'now.title': 'Ahora',
    'impact.title': 'Impacto medido',
    'principles.title': 'Cómo trabajo',
    'stack.title': 'Herramientas',
    'featured.title': 'Proyectos destacados',
    'featured.all': 'Todos los proyectos',
    'garden.latest': 'Desde el garden',
    'garden.all': 'Entrar al garden',
    'contact.title': 'Hablemos',
    'contact.lede':
      '¿Buscas a alguien para backend o arquitectura, o quieres conversar sobre un sistema? Escríbeme.',

    'projects.title': 'Proyectos',
    'projects.lede':
      'Casos de estudio, no capturas. Cada uno cuenta el contexto, las restricciones, las decisiones y los trade-offs — y lo que haría diferente.',
    'projects.role': 'Rol',
    'projects.stack': 'Stack',
    'projects.year': 'Año',
    'projects.status': 'Estado',
    'projects.outcomes': 'Resultados',
    'projects.repo': 'Código',
    'projects.live': 'En vivo',
    'projects.related': 'Entradas relacionadas del garden',
    'projects.private': 'Trabajo privado / de empresa — detalles anonimizados',
    'projects.back': 'Todos los proyectos',

    'garden.title': 'Garden',
    'garden.lede':
      'Notas largas y videos: recorridos de diseño de sistemas, cómo se construyó un proyecto, qué falló y por qué. Algunas entradas son brotes, otras son perennes.',
    'garden.empty': 'Las primeras semillas se están plantando. Vuelve pronto.',
    'garden.video.pending': 'Video en producción',
    'garden.back': 'Volver al garden',
    'garden.project': 'Proyecto',
    'garden.stage.seedling': 'Brote',
    'garden.stage.budding': 'En crecimiento',
    'garden.stage.evergreen': 'Perenne',
    'garden.rss': 'RSS',

    'resources.title': 'Recursos',
    'resources.lede':
      'Herramientas, plantillas, scripts y referencias que uso y comparto. Tómalos libremente.',
    'resources.empty': 'Aún no hay nada publicado — los recursos vienen en camino.',
    'resources.open': 'Abrir',
    'resources.all': 'Todos',

    'cv.title': 'Hoja de vida',
    'cv.lede':
      'Una sola columna, basada en texto y fácil de leer para los ATS. Lo que ves aquí es lo mismo que contiene el PDF.',
    'cv.download': 'Descargar PDF',
    'cv.other': 'English version',
    'cv.print': 'Imprimir',

    'common.readMore': 'Leer',
    'common.minutes': 'min',
    'common.updated': 'Actualizado',
    'common.draft': 'Borrador',
    'common.present': 'Actualidad',

    '404.title': 'Señal perdida',
    '404.lede': 'Esta página no existe o se movió.',
    '404.back': 'Ir al índice',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

import type { Lang } from '@/i18n/ui';

/**
 * Single source of truth for the CV page, the ATS PDF and the home page.
 * Keep bullets as "verb + what + measurable result".
 */

type L = Record<Lang, string>;

export interface Job {
  role: L;
  company: string;
  place: L;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, undefined = present
  summary?: L;
  bullets: L[];
}

export const cv = {
  headline: {
    en: 'Software Engineer — Backend & Software Architecture',
    es: 'Ingeniero de Software — Backend y Arquitectura de Software',
  } satisfies L,

  summary: {
    en: 'Software engineer with 4 years of experience designing, building and deploying web applications, with a focus on backend and software architecture. Currently Lead Developer leading three projects in parallel (e-commerce, CRM and a record-linking system). I apply design patterns and architecture principles (SOLID, layered/hexagonal boundaries, separation of concerns) to keep systems maintainable, and I build internal tools that cut manual work and turnaround times across several areas of the company. I value clear communication, code review culture and realistic, measurable goals.',
    es: 'Ingeniero de software con 4 años de experiencia diseñando, construyendo y desplegando aplicaciones web, con foco en backend y arquitectura de software. Actualmente Lead Developer liderando tres proyectos en paralelo (e-commerce, CRM y un sistema de vinculación de registros). Aplico patrones de diseño y principios de arquitectura (SOLID, límites por capas/hexagonales, separación de responsabilidades) para mantener los sistemas mantenibles, y construyo herramientas internas que reducen el trabajo manual y los tiempos de respuesta en varias áreas de la empresa. Valoro la comunicación clara, la cultura de code review y las metas realistas y medibles.',
  } satisfies L,

  experience: [
    {
      role: { en: 'Lead Developer', es: 'Lead Developer' },
      company: 'Webclostrer SAS — IT',
      place: { en: 'Tuluá, Colombia', es: 'Tuluá, Colombia' },
      start: '2024-10',
      bullets: [
        {
          en: 'Lead three concurrent projects (e-commerce, CRM, record-linking system) and a team of 3 developers (1 onsite, 2 remote), owning architecture, code review and delivery.',
          es: 'Lidero tres proyectos simultáneos (e-commerce, CRM, sistema de vinculación de registros) y un equipo de 3 desarrolladores (1 presencial, 2 remotos), con responsabilidad sobre la arquitectura, el code review y la entrega.',
        },
        {
          en: 'Design and implement backend and front-end solutions applying design patterns and architecture principles, balancing scalability, maintainability and delivery speed.',
          es: 'Diseño e implemento soluciones backend y front-end aplicando patrones de diseño y principios de arquitectura, equilibrando escalabilidad, mantenibilidad y velocidad de entrega.',
        },
        {
          en: 'Reduced deployment time from 30 to 5 minutes with custom deployment scripts, enabling faster and safer release cycles.',
          es: 'Reduje el tiempo de despliegue de 30 a 5 minutos con scripts de despliegue propios, habilitando ciclos de release más rápidos y seguros.',
        },
        {
          en: 'Cut page load time from ~4 s to ~1.1 s through template refactoring, query optimization and caching strategies; improved SEO and Lighthouse scores on key landing pages.',
          es: 'Reduje el tiempo de carga de ~4 s a ~1,1 s mediante refactorización de plantillas, optimización de consultas y estrategias de caché; mejoré SEO y puntajes de Lighthouse en landing pages clave.',
        },
        {
          en: 'Built internal tools (cross-database record validation, task automation) adopted by several areas of the company, reducing manual effort, errors and turnaround times.',
          es: 'Construí herramientas internas (validación de registros entre bases de datos, automatización de tareas) adoptadas por varias áreas de la empresa, reduciendo esfuerzo manual, errores y tiempos de respuesta.',
        },
        {
          en: 'Improved incident response with a Sentry → Telegram alerting integration, giving the team real-time visibility of production errors.',
          es: 'Mejoré la respuesta a incidentes con una integración de alertas Sentry → Telegram, dando al equipo visibilidad en tiempo real de los errores en producción.',
        },
        {
          en: 'Own deployments and merge-request reviews; streamlined onboarding by containerizing environments with Docker.',
          es: 'Responsable de despliegues y revisión de merge requests; agilicé el onboarding contenedorizando los entornos con Docker.',
        },
        {
          en: 'Negotiate requirements with stakeholders and product, and run requirement walkthroughs and system overviews that improved task clarity and delivery speed.',
          es: 'Negocio requerimientos con stakeholders y producto, y dirijo sesiones de requerimientos y vistas generales del sistema que mejoraron la claridad de las tareas y la velocidad de entrega.',
        },
      ],
    },
    {
      role: { en: 'Junior Developer', es: 'Desarrollador Junior' },
      company: 'Webclostrer SAS — IT',
      place: { en: 'Tuluá, Colombia', es: 'Tuluá, Colombia' },
      start: '2022-11',
      end: '2024-10',
      bullets: [
        {
          en: 'Contributed to an e-commerce platform, order management system, biographical data system, authentication services and event control modules.',
          es: 'Contribuí a una plataforma de e-commerce, un sistema de gestión de pedidos, un sistema de datos biográficos, servicios de autenticación y módulos de control de eventos.',
        },
        {
          en: 'Improved reliability by integrating Sentry for error monitoring, enabling faster detection and resolution of runtime errors.',
          es: 'Mejoré la confiabilidad integrando Sentry para monitoreo de errores, permitiendo detectar y resolver fallos en tiempo de ejecución más rápido.',
        },
        {
          en: 'Introduced unit and integration tests on critical components, and resolved key data-integrity issues in authentication and order management.',
          es: 'Introduje pruebas unitarias y de integración en componentes críticos, y resolví problemas clave de integridad de datos en autenticación y gestión de pedidos.',
        },
        {
          en: 'Dockerized application environments and shipped updates with minimal downtime.',
          es: 'Dockericé los entornos de las aplicaciones y desplegué actualizaciones con mínimo tiempo de inactividad.',
        },
      ],
    },
    {
      role: {
        en: 'Private Tutor — Mathematics and Programming (C++, Scheme)',
        es: 'Tutor Privado — Matemáticas y Programación (C++, Scheme)',
      },
      company: 'Universidad del Valle',
      place: { en: 'Tuluá, Colombia', es: 'Tuluá, Colombia' },
      start: '2020-11',
      end: '2022-11',
      bullets: [],
    },
  ] satisfies Job[],

  skills: [
    { label: { en: 'Backend', es: 'Backend' }, items: ['PHP (Laravel, Slim)', 'Node.js', 'Bun', 'REST APIs', 'Authentication'] },
    { label: { en: 'Architecture', es: 'Arquitectura' }, items: ['Design patterns', 'SOLID', 'Layered / hexagonal architecture', 'Domain modelling', 'Caching strategies'] },
    { label: { en: 'Databases', es: 'Bases de datos' }, items: ['MySQL', 'PostgreSQL', 'SQLite', 'Query optimization'] },
    { label: { en: 'DevOps', es: 'DevOps' }, items: ['Docker', 'Linux', 'CI/CD', 'Deployment scripting', 'Sentry'] },
    { label: { en: 'Scripting', es: 'Scripting' }, items: ['Bash', 'Python', 'Lua', 'Make'] },
    { label: { en: 'Front-end', es: 'Front-end' }, items: ['JavaScript', 'Vue.js', 'Astro', 'HTML', 'CSS', 'Tailwind CSS'] },
    { label: { en: 'Practices', es: 'Prácticas' }, items: ['Code review', 'Git (GitHub, GitLab)', 'Unit & integration testing', 'Technical leadership'] },
  ],

  education: [
    {
      title: { en: 'Systems Engineering (B.Eng.)', es: 'Ingeniería de Sistemas' },
      org: 'Universidad del Valle',
      period: '2017 — 2022',
    },
    { title: { en: 'Course — JavaScript, Vue.js, Astro', es: 'Curso — JavaScript, Vue.js, Astro' }, org: 'Platzi', period: '2023' },
    { title: { en: 'Course — Laravel', es: 'Curso — Laravel' }, org: 'Udemy', period: '2022' },
    { title: { en: 'Course — PHP', es: 'Curso — PHP' }, org: 'Udemy, Platzi', period: '2021 — 2022' },
  ],

  languages: [
    { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
    { name: { en: 'English', es: 'Inglés' }, level: { en: 'B1 — professional working', es: 'B1 — trabajo profesional' } },
  ],
};

/** Headline numbers for the home page. */
export const impact = [
  { value: '30→5', unit: 'min', label: { en: 'deployment time', es: 'tiempo de despliegue' } },
  { value: '4→1.1', unit: 's', label: { en: 'page load time', es: 'tiempo de carga' } },
  { value: '3', unit: '', label: { en: 'projects led in parallel', es: 'proyectos liderados en paralelo' } },
  { value: '4', unit: 'yrs', label: { en: 'shipping to production', es: 'desplegando a producción' } },
] as const;

export const principles = [
  {
    title: { en: 'Boundaries first', es: 'Primero los límites' },
    body: {
      en: 'Model the domain, then draw the seams. Clear modules and contracts make change cheap and teams independent.',
      es: 'Modelar el dominio y luego trazar las fronteras. Módulos y contratos claros abaratan el cambio y dan independencia a los equipos.',
    },
  },
  {
    title: { en: 'Boring infrastructure', es: 'Infraestructura aburrida' },
    body: {
      en: 'Reproducible environments, one-command deploys, alerts that reach people. Reliability is a feature.',
      es: 'Entornos reproducibles, despliegues de un comando, alertas que llegan a las personas. La confiabilidad es una funcionalidad.',
    },
  },
  {
    title: { en: 'Measure, then optimize', es: 'Medir y luego optimizar' },
    body: {
      en: 'Profiling and numbers before opinions. Every improvement on this site comes with a before and after.',
      es: 'Perfilado y números antes que opiniones. Cada mejora en este sitio tiene un antes y un después.',
    },
  },
  {
    title: { en: 'Automate the second time', es: 'Automatizar la segunda vez' },
    body: {
      en: 'If a task repeats, it becomes a tool. Internal tooling is leverage for the whole company, not just engineering.',
      es: 'Si una tarea se repite, se vuelve herramienta. Las herramientas internas son palanca para toda la empresa, no solo para ingeniería.',
    },
  },
  {
    title: { en: 'Decisions in writing', es: 'Decisiones por escrito' },
    body: {
      en: 'Trade-offs documented, requirements negotiated, reviews as teaching. Leading is mostly making context shareable.',
      es: 'Trade-offs documentados, requerimientos negociados, reviews como enseñanza. Liderar es, sobre todo, hacer el contexto compartible.',
    },
  },
] as const;

export const now = {
  en: [
    'Leading three projects in parallel: e-commerce, CRM and a record-linking system.',
    'Building internal tooling that removes manual work for operations and other areas.',
    'Recording system-design walkthroughs of my projects for the garden.',
  ],
  es: [
    'Liderando tres proyectos en paralelo: e-commerce, CRM y un sistema de vinculación de registros.',
    'Construyendo herramientas internas que eliminan trabajo manual en operaciones y otras áreas.',
    'Grabando recorridos de diseño de sistemas de mis proyectos para el garden.',
  ],
} satisfies Record<Lang, string[]>;

export function formatPeriod(start: string, end: string | undefined, lang: Lang) {
  const fmt = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(y, m - 1, 1)));
  };
  return `${fmt(start)} — ${end ? fmt(end) : lang === 'es' ? 'Actualidad' : 'Present'}`;
}

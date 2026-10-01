---
title: Rendimiento de un e-commerce
summary: Perfilé y reconstruí las rutas más lentas de un e-commerce en producción — tiempo de carga de ~4 s a ~1,1 s, con mejor SEO y Lighthouse.
year: 2025
role: Lead developer · rendimiento y backend
stack: [PHP, Laravel, MySQL, Caché, JavaScript]
status: production
featured: true
order: 2
private: true
outcomes:
  - { value: '4→1,1 s', label: 'tiempo de carga' }
  - { value: '↑ SEO', label: 'Lighthouse y visibilidad' }
---

## Contexto

Un e-commerce en producción con landing pages clave que tardaban cerca de **4 segundos** en cargar. Las páginas lentas afectan la conversión y el posicionamiento.

## Diagnóstico

Primero medir: tiempos de request, logs de consultas y auditorías de Lighthouse en las páginas que importan para el negocio. <!-- TODO: agrega los 2–3 cuellos de botella principales (p. ej. consultas N+1, plantillas pesadas, fragmentos sin caché). -->

## Qué cambió

- **Optimización de consultas** — eliminé consultas redundantes y agregué los índices que las rutas críticas realmente necesitaban.
- **Refactorización de plantillas** — reescribí componentes pesados y saqué trabajo del render.
- **Estrategia de caché** — cacheé fragmentos y datos costosos con reglas de invalidación explícitas.
- **Presupuesto front-end** — assets más livianos y componentes reescritos en las landing pages.

## Decisiones y trade-offs

- Cachear lo que se lee mucho y cambia poco; invalidación explícita (no por tiempo) donde la exactitud importa (precios, stock).
- Arreglar el 20% de rutas que sirven el 80% del tráfico antes de tocar el resto.

## Resultado

- Carga de **~4 s a ~1,1 s** en páginas clave.
- Mejores puntajes de SEO y Lighthouse, mejorando visibilidad y engagement.

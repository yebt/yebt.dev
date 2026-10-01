---
title: Alertas de errores en producción
summary: Sentry integrado en las aplicaciones y conectado a Telegram para que el equipo vea los errores de producción en tiempo real — y responda antes de que los usuarios los reporten.
year: 2024
role: Developer → Lead · observabilidad
stack: [Sentry, Telegram Bot API, PHP, Laravel]
status: production
featured: true
order: 4
private: true
outcomes:
  - { value: 'tiempo real', label: 'visibilidad de errores' }
  - { value: '↓ MTTR', label: 'respuesta más rápida' }
---

## Contexto

Los errores en producción se descubrían cuando un usuario o un stakeholder se quejaba. No había un lugar único para ver qué estaba fallando.

## Qué construí

1. Integré **Sentry** en las aplicaciones para rastrear errores con contexto (release, usuario, request).
2. Construí un puente **Sentry → Telegram** para que las alertas relevantes lleguen al canal del equipo de inmediato, filtrando el ruido para que la gente las siga leyendo.

## Decisiones y trade-offs

- Telegram porque el equipo ya estaba ahí — una alerta que nadie ve no es una alerta.
- Enrutar por severidad y proyecto; agrupar errores repetidos para evitar la fatiga de alertas.

## Resultado

- Visibilidad en tiempo real de los errores de producción y respuesta más rápida a incidentes. <!-- TODO: agrega el tiempo de detección antes/después si lo tienes -->

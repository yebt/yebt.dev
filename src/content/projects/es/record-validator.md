---
title: Validador de registros entre bases de datos
summary: Herramienta interna que compara y valida registros entre bases de datos, reemplazando horas de revisión manual en equipos fuera de ingeniería.
year: 2025
role: Lead developer · herramientas internas
stack: [PHP, Python, MySQL, PostgreSQL, Bash]
status: production
featured: true
order: 3
private: true
outcomes:
  - { value: '↓ manual', label: 'esfuerzo y errores' }
  - { value: 'N áreas', label: 'la usan' }
---

## Contexto

Distintos sistemas (e-commerce, CRM, vinculación de registros) tienen datos que se solapan. Otras áreas de la empresa verificaban la consistencia a mano — exportando, comparando hojas de cálculo y corrigiendo diferencias una por una.

## Problema

- Trabajo lento y repetitivo para equipos que no son de ingeniería.
- Errores humanos en la misma comparación.
- Diferencias descubiertas tarde, cuando ya habían causado problemas.

## Enfoque

- Una herramienta pequeña con **adaptadores por fuente** de datos y un modelo común de registro, para que nuevas fuentes se conecten sin cambiar el núcleo (puertos y adaptadores).
- **Reglas como datos** — cada validación se declara, no se codifica a mano, para que los dueños de los datos entiendan qué se revisa.
- Reportes claros: qué difiere, dónde y la corrección sugerida.

```text
 [adaptador MySQL] ──┐
 [adaptador Postgres]├─► normalizar ─► motor de reglas ─► reporte / cola de corrección
 [adaptador CSV] ────┘
```

## Resultado

- Menos esfuerzo manual y errores en varias áreas de la empresa. <!-- TODO: agrega horas ahorradas por semana / áreas que la usan -->
- Problemas de datos detectados antes de que lleguen a los clientes.

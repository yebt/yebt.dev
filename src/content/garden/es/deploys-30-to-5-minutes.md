---
title: 'Cómo pasamos de despliegues de 30 minutos a 5'
description: 'Recorrido por el sistema de scripts detrás de nuestros releases: los pasos, los modos de fallo y los trade-offs de elegir Bash + Make en lugar de una plataforma.'
date: 2026-10-01
stage: seedling
kind: system-design
video: { provider: pending }
project: deploy-pipeline
tags: [devops, despliegue, bash, docker]
---

> Esta entrada es un brote. El video se está grabando — las notas de abajo son el guion que sigue.

## Por qué importa

Los despliegues lentos no son solo lentos. Hacen que los equipos acumulen cambios, y los lotes grandes son los que convierten un release en un incidente.

## El pipeline, paso a paso

1. **Preflight** — no arranca si el árbol de trabajo está sucio, la rama es incorrecta o faltan variables de entorno.
2. **Fetch y build** — dependencias y assets, igual en todos los entornos.
3. **Migrate** — protegido, con backup primero.
4. **Switch** — atómico, para que los usuarios nunca vean una app a medio desplegar.
5. **Verify y notify** — health check y luego avisar al equipo.

## Modos de fallo que diseñé

| Fallo | Qué pasa |
| --- | --- |
| Falla el build | No se cambia nada; el release actual sigue sirviendo |
| Falla la migración | Se detiene, se restaura el backup, se notifica |
| Falla el health check | Se alerta al equipo (el rollback es lo siguiente) |

## Trade-offs

Bash y Make no son glamorosos, pero todos los servidores ya los tienen y todo desarrollador los puede leer. El objetivo era **menos piezas móviles**, no más.

## Qué sigue

- Disparar los mismos pasos desde CI con tags.
- Rollback automático.

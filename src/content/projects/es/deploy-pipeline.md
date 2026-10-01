---
title: Despliegues de un solo comando
summary: Reemplacé un proceso de release manual y propenso a errores por despliegues automatizados y repetibles — de ~30 a ~5 minutos por release.
year: 2025
role: Lead developer · diseño e implementación
stack: [Bash, Make, Docker, Git, Linux, Laravel]
status: production
featured: true
order: 1
private: true
outcomes:
  - { value: '30→5 min', label: 'por despliegue' }
  - { value: '1 cmd', label: 'para publicar' }
  - { value: 'Docker', label: 'entornos reproducibles' }
---

<!-- Plantilla de caso de estudio: Contexto → Problema → Restricciones → Arquitectura → Decisiones → Resultado → Siguiente. Reemplaza los TODO con detalles reales. -->

## Contexto

Varias aplicaciones web (e-commerce, CRM y sistemas internos) se desplegaban a mano: pull, instalar dependencias, compilar assets, correr migraciones, limpiar cachés y reiniciar servicios. Cada release tomaba unos **30 minutos** de atención completa de un desarrollador y dependía de recordar cada paso.

## Problema

- Los releases eran lentos, así que el equipo acumulaba cambios — y cada release era más riesgoso.
- Los pasos eran conocimiento tribal; olvidar limpiar una caché o una migración significaba un incidente.
- Los nuevos desarrolladores no podían desplegar (ni siquiera levantar el proyecto localmente) sin ayuda.

## Restricciones

- Servidores y hosting existentes; sin presupuesto para una plataforma gestionada.
- Varios proyectos con stacks ligeramente distintos.
- Cero tolerancia a caídas largas en el e-commerce.

## Arquitectura

```text
 desarrollador ──► make deploy ENV=prod
                     │
                     ├─ preflight   (rama, árbol limpio, variables, disco)
                     ├─ fetch       (git fetch + checkout del tag)
                     ├─ build       (composer / npm, assets)
                     ├─ migrate     (protegido, con backup)
                     ├─ switch      (symlink atómico / reinicio de contenedor)
                     └─ verify      (health check → notificar al equipo)
```

Los mismos scripts corren en un entorno local basado en Docker, así que "funciona en mi máquina" y "funciona en el servidor" son lo mismo.

## Decisiones y trade-offs

- **Scripts antes que plataforma.** Bash + Make ya están en todos los servidores y todo el equipo los puede leer. Trade-off: menos pulido que un producto de CI/CD completo, pero cero infraestructura nueva.
- **Fallar temprano.** Las verificaciones previas detienen el release antes de cambiar nada.
- **Pasos idempotentes.** Cada paso se puede re-ejecutar de forma segura tras un fallo.
- **Entornos con Docker.** El onboarding pasó a ser "clonar y correr un comando".

## Resultado

- El tiempo de despliegue bajó de **~30 a ~5 minutos**.
- Los releases se volvieron más pequeños y frecuentes.
- Los nuevos desarrolladores se integran sin acompañamiento constante.

## Qué haría después

- Mover los mismos pasos a un pipeline de CI disparado por tags. <!-- TODO: actualizar cuando esté hecho -->
- Agregar rollback automático cuando falle el health check.

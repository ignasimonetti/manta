# RECAP SESSION - Navbar Scroll Behavior Fix
Date: 2026-02-26

## Contexto de la Sesión
El usuario reportó que el **Navbar tipo dock** (barra flotante en la parte superior con ítems de Servicios, Proyectos, Enfoque, Lab, Contacto) **dejó de verse** en todas las secciones tras un cambio previo (en otra conversación) donde se pidió que se ocultara al llegar al footer.

## Diagnóstico

### Bug 1: Doble multiplicación de opacidad
- En `Navbar.tsx` línea 128 existía un wrapper `<motion.div style={{ opacity: globalHideOpacity }}>` que envolvía **todo** el componente (navbar + sticky logo).
- Sin embargo, `globalHideOpacity` ya estaba siendo multiplicado **internamente** dentro de `navbarOpacity` y `stickyLogoOpacity` (las fórmulas `nav * hide` y `logo * hide`).
- **Resultado**: La opacidad se calculaba como `hide × (nav × hide)` = se aplastaba al cuadrado, haciendo que el navbar desapareciera mucho antes de lo esperado y fuera prácticamente invisible.

### Bug 2: `initial/animate` de Framer Motion compitiendo con scroll
- El `<motion.nav>` tenía `initial={{ y: -100, opacity: 0 }}` y `animate={{ y: 0, opacity: 1 }}`.
- Framer Motion usa `animate` como valor final "declarativo" y **sobreescribe** el `style.opacity` basado en scroll.
- **Resultado**: El sistema de scroll perdía el control de la visibilidad; Framer imponía `opacity: 1` independientemente del scroll.

## Correcciones Aplicadas

### Archivo: `src/components/Navbar.tsx`

| Cambio | Antes | Después |
|--------|-------|---------|
| Wrapper exterior | `<motion.div style={{ opacity: globalHideOpacity }}>` | `<div>` (simple, sin opacidad extra) |
| Tag cierre | `</motion.div>` | `</div>` |
| Nav `initial` | `initial={{ y: -100, opacity: 0 }}` | **Eliminado** |
| Nav `animate` | `animate={{ y: 0, opacity: 1 }}` | **Eliminado** |
| Nav `transition` | `transition={{ duration: 1.2, ease: [...] }}` | **Eliminado** |
| Nav `style.y` | (no existía) | `y: 0` (estático) |
| Navbar appear range | `scrollY [vh*1.5, vh*2.0]` | `scrollY [vh*2.5, vh*2.8]` |
| Sticky logo range | `scrollY [vh*2.5, vh*2.8]` | `scrollY [vh*2.5, vh*2.8]` (sin cambio) |
| Footer hide range | `scrollYProgress [0.92, 0.96]` | `scrollYProgress [0.88, 0.92]` |

### Lógica Actual de Visibilidad
```
scrollY < vh*2.5        → Navbar invisible (Hero animándose)
scrollY vh*2.5 ~ vh*2.8 → Navbar fade-in (cross-fade con hero)
scrollYProgress < 0.88  → Navbar visible (todas las secciones)
scrollYProgress 0.88~92 → Navbar fade-out (footer)
scrollYProgress > 0.92  → Navbar invisible (footer completo)
```

## Principio de Diseño Clave
> La opacidad basada en scroll (`useTransform` + `useSpring`) debe ser la **única fuente de verdad** para la visibilidad del navbar. No combinar con `initial/animate` de Framer Motion ni con wrappers extras que multipliquen la misma variable.

## Estado del Navbar
- ✅ **Aparece** después de que termina la animación del Hero (~2.5vh)
- ✅ **Permanece visible** durante todas las secciones intermedias
- ✅ **Se oculta** suavemente al llegar al footer (~88-92% scroll)
- ✅ **Sticky Logo** (esquina superior izquierda) sigue la misma lógica

## Archivos Modificados
| Archivo | Acción |
|---------|--------|
| `src/components/Navbar.tsx` | Fix de doble opacidad + eliminación de initial/animate conflictivos |

## Estado General del Sitio
| Sección | Estado |
|---------|--------|
| Hero + Brand Intro | ✅ Finalizado |
| Navbar (dock flotante) | ✅ **Corregido** — scroll-driven visibility |
| Sticky Logo | ✅ Funcional |
| VideoLight / VideoShowcase | ✅ Finalizado |
| ParticlesSection | ✅ Finalizado |
| ManifestoSection | ✅ Finalizado |
| ServicesSection | ✅ Finalizado |
| PortfolioSection | ✅ Finalizado |
| ContactSection | ✅ Finalizado |
| FooterSignature | ✅ Finalizado |
| Lab Page (`/lab`) | ✅ Coming Soon |
| 404 Page | ✅ Finalizado |

## Recomendaciones para Próxima Sesión
1. **Fine-tuning de timing**: Si se desea ajustar el momento exacto de aparición/desaparición, solo modificar los rangos en `useTransform` (líneas 98 y 95 de `Navbar.tsx`).
2. **Mobile testing**: Verificar que los breakpoints de `vh` funcionan correctamente en dispositivos móviles reales.
3. **Performance**: El navbar usa `useSpring` con stiffness/damping; si se nota lag en móviles, considerar reducir la complejidad del spring.

---
*Este documento cierra la sesión de fix del Navbar. Se recomienda abrir un chat nuevo para la próxima tarea.*

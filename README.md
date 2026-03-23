# UniToolsML — Landing Pages

UniToolsML-landingpages es la aplicación de frontend para la suite UniToolsML. Sitio de aterrizaje construido con Astro y React para presentar las herramientas, documentación y enlaces de descarga.

## Estado
- Estado: Desarrollo
- Plataforma: Web estática generada con Astro

## Características principales
- Landing responsive con secciones: Hero, Features, Tech Stack, FAQ, Newsletter y Footer
- Integración con Tailwind CSS para estilos utilitarios y variables CSS para temas claro/oscuro
- Favicon y assets en `public/`

## Tecnologías
- Astro
- React 18
- TypeScript
- Tailwind CSS
- Lucide icons

## Estructura relevante
- `src/pages/` — Páginas Astro
- `src/layouts/` — Layouts reutilizables (ej. `BaseLayout.astro`)
- `src/components/` — Componentes React y secciones
- `src/styles/global.css` — Variables y utilidades globales
- `public/` — Archivos estáticos (favicon `icono.ico`)

## Configuración local
1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:4321/`.

3. Generar build de producción:

```bash
npm run build
```

4. Vista previa del build:

```bash
npm run preview
```

## Notas de diseño
- Palette principal actualizada a tonos azules mediante variables CSS en `src/styles/global.css`.
- El favicon oficial se encuentra en `public/icono.ico` y el `Navbar` usa dicho archivo.

## Contribuciones
1. Crea una rama con el prefijo `feat/` o `fix/`.
2. Realiza cambios claros y atómicos.
3. Abre un Pull Request con descripción y cambios relevantes.

## Buenas prácticas
- Evitar commits con cambios mixtos (UI + lógica) en un solo commit.
- Ejecutar `npm run dev` y verificar consola por warnings antes de abrir PR.

## Licencia
Añade un archivo `LICENSE` si deseas publicar el proyecto bajo una licencia específica.

## Contacto
Para coordinación y acceso al repositorio remoto: usa el control de acceso de GitHub del equipo o contacta al propietario del repositorio.

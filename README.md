# 🚀 Javeriana Lead & Events Manager

## 📌 Descripción General

Single Page Application (SPA) para la **Pontificia Universidad Javeriana**, diseñada para visualizar la oferta académica y gestionar registros de interesados (leads).

![Demo Interactiva](./assets/demo.webp)

---

## ▶️ Ejecución Local

1. **Instalar dependencias**: `npm install`
2. **Desarrollo**: `npm run dev` (disponible en `localhost:5173`)
3. **Producción**: `npm run build`

---

## 🏗️ Decisiones Técnicas

- **Diseño con Stitch**: Se utilizó **Stitch** como herramienta base para idear la interfaz. En este [link del diseño](https://stitch.withgoogle.com/projects/3046567644677806417) se puede ver el enfoque visual y algunas decisiones de UX aplicadas.
- **Estructura por Features**: Organización por módulos (`events`, `leads`) para escalabilidad. Se descartó la estructura básica por tipo para evitar el desorden en proyectos grandes.
- **Manejo de Datos y API**: Como la API (JSONPlaceholder) solo entrega datos básicos de posts, se implementó una **capa de transformación** en los servicios para añadir fechas, tipos de programa y campus de forma aleatoria/estática, enriqueciendo la experiencia.
- **Filtros y Paginación**: Se añadió lógica de filtrado por categoría y búsqueda, además de un sistema de **paginación** para manejar el volumen de datos de forma eficiente.
- **Persistencia de Leads**: Los registros de interesados se gestionan con **Zustand** y se sincronizan automáticamente con `localStorage`, asegurando que los datos no se pierdan al recargar.
- **Arquitectura**: Enfoque modular pragmático. Se consideró Clean Architecture pero se descartó por **sobreingeniería** para el alcance actual.


---

## 🎨 Diseño y UI

🔗 **Diseño en Stitch**: [Academic Excellence Portal](https://stitch.withgoogle.com/projects/3046567644677806417)

### Colores e Identidad
Los colores se tomaron directamente de la **web principal de la Javeriana** para que la prueba sea acorde a su marca:
- **Primary**: `#2C5697` (Azul institucional)
- **Secondary**: `#FFC107` (Amarillo de acento)

### Especificaciones Visuales
- **Bordes**: Se usó predominantemente `rounded-lg` (8px) para un look limpio y profesional. Se evitaron bordes muy redondeados para no perder el tono institucional.
- **Tipografía**: 
  - **Titulares**: Noto Serif (32px / 24px)
  - **Cuerpo/UI**: Public Sans (16px / 14px / 12px)

---

### 📸 Capturas
#### Desktop
![Diseño Desktop](./assets/design-desktop.png)

#### Paleta
![Paleta de Colores](./assets/color-palette.png)

#### Mobile
![Diseño Mobile](./assets/design-mobile.png)

---

## 🛠️ Stack Tecnológico
Dominio y experiencia en este stack para desarrollo rápido y seguro:
- **React 19 & Vite**: Para un entorno de desarrollo veloz.
- **Tailwind CSS**: Estilizado eficiente sin archivos CSS pesados.
- **Zustand**: Gestión de estado ligera.
- **Zod & React Hook Form**: Validación estricta de formularios.
- **Axios**: Consumo de API con manejo de errores centralizado.

---

Desarrollado con ❤️ para el proceso de selección de la **Pontificia Universidad Javeriana**.




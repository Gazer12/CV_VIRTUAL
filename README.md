# CV Virtual

Mini CV / portafolio personal hecho con HTML, CSS y JavaScript puro (sin frameworks), con un diseño inspirado en un editor de código.

## 🧩 Estructura

```
cv-virtual/
├── index.html        → contenido (estructura del CV)
├── css/style.css     → estilos (colores, tipografías, layout)
├── js/script.js       → interactividad (menú, scroll, formulario)
└── README.md
```

## ✏️ Cómo personalizarlo

Buscá los comentarios `✏️ EDITAR` en los archivos. Los puntos clave son:

1. **`index.html`**
   - Nombre, rol y avatar (sección `.profile`)
   - Texto de presentación (sección `#sobre-mi`)
   - Lista de tecnologías (sección `#tecnologias`)
   - Tus proyectos reales: título, descripción, tags y links (sección `#proyectos`)
   - Email y redes sociales (sección `#contacto`)
2. **`js/script.js`**
   - La frase del efecto de tipeo (variable `phrase`)
   - El `FORM_ENDPOINT` del formulario (ver paso de Formspree abajo)

## 📬 Activar el formulario de contacto (Formspree)

El formulario funciona sin backend gracias a [Formspree](https://formspree.io), que es gratis para uso personal:

1. Entrá a formspree.io y creá una cuenta gratuita.
2. Creá un nuevo formulario ("New Form") y copiá el endpoint que te da, algo como `https://formspree.io/f/abcd1234`.
3. En `js/script.js`, reemplazá `TU_ID_AQUI` en la constante `FORM_ENDPOINT` por ese ID.
4. Formspree te va a pedir confirmar tu email la primera vez que alguien envíe el formulario. Después de eso, los mensajes te llegan directo a tu correo.

## 🚀 Cómo se sube a Vercel

Ver la guía completa paso a paso en la conversación, resumen rápido:

1. Subir el proyecto a un repositorio de GitHub.
2. Entrar a [vercel.com](https://vercel.com), iniciar sesión con GitHub.
3. "Add New Project" → seleccionar el repositorio → Deploy.
4. Vercel detecta que es un sitio estático y lo publica automáticamente.

Cada vez que hagas `git push` a la rama principal, Vercel vuelve a desplegar solo.

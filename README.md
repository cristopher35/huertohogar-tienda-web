# HuertoHogar - Tienda Web

Proyecto práctico para la asignatura **Desarrollo Fullstack II (DSY1104)**, Duoc UC —
Evaluación Formativa N°1: *"Creando mi primera tienda web"*, desarrollado en base al
caso **HuertoHogar** (Forma A).

HuertoHogar es una tienda online chilena dedicada a llevar productos frescos del
campo directamente a sus clientes. Este sitio implementa su presencia web: catálogo
de productos, registro de usuarios y contacto.

## Tecnologías utilizadas

- **HTML5** semántico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** (hoja de estilos externa, variables CSS, Flexbox)
- **JavaScript** (validación de formularios en el cliente)
- **Git y GitHub** para control de versiones

## Estructura del proyecto

```
├── index.html          Página de inicio (bienvenida, banner, categorías, misión/visión)
├── productos.html       Catálogo de productos agrupado por categoría
├── nosotros.html        Quiénes somos, misión, visión, puntos de venta
├── registro.html        Formulario de registro de usuario (con validación JS)
├── contacto.html        Formulario de contacto (con validación JS)
├── css/
│   └── styles.css       Hoja de estilos externa (paleta e identidad visual HuertoHogar)
├── js/
│   └── validacion.js    Validación de los formularios de registro y contacto
├── img/                 Logo, banner y fotografías de productos
├── prompt-logo.txt              Prompt usado para generar el logo con IA
└── prompts-fotos-productos.txt  Prompts usados para generar las fotos de productos con IA
```

## Cómo verlo

No requiere instalación ni servidor: basta con abrir `index.html` en el navegador.

## Contenido y fidelidad al caso

Todo el contenido textual (misión, visión, descripciones de categorías, precios,
stock y descripciones de producto) proviene directamente del documento del caso
**"Forma A: Caso HuertoHogar"**. No se inventó información de negocio.

Excepciones explícitas:

- **PO003 (Quinua Orgánica)** y **PL001 (Leche Entera)** no tenían precio/stock/
  descripción en el documento del caso. Quinua Orgánica no se incluyó en el
  catálogo; Leche Entera se incluyó marcando explícitamente esos datos como "no
  especificado en el documento del caso".
- El documento menciona *"más de 9 puntos"* de venta pero solo nombra 7 ciudades
  (Santiago, Puerto Montt, Villarica, Nacimiento, Viña del Mar, Valparaíso,
  Concepción) — son las únicas que se muestran, no se inventaron las restantes.
- El logo y las fotografías de productos fueron generados con herramientas de IA
  (prompts incluidos en este repositorio) ya que no se contaba con material
  fotográfico real del caso.

## Pendientes

- [ ] Video institucional embebido en `nosotros.html` (placeholder visible en la página)
- [ ] Datos de precio/stock de Leche Entera y Quinua Orgánica, si el docente los
      proporciona

## Pauta de evaluación cubierta

- Estructura HTML5 semántica ✅
- Hipervínculos, imágenes, botones y formularios funcionales ✅
- Páginas interconectadas ✅
- Hoja de estilos CSS externa aplicada consistentemente ✅
- Validación de formularios en JavaScript con mensajes de error específicos ✅
- Repositorio Git con commits descriptivos, subido a GitHub ✅
- Video embebido ⏳ pendiente

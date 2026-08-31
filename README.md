# HuertoHogar - Tienda Web

Sitio web desarrollado para **HuertoHogar**, tienda online chilena dedicada a
llevar productos frescos del campo directamente a sus clientes, en base al
documento de requerimientos y estándares de diseño proporcionado por la empresa.

El sitio implementa su presencia web: catálogo de productos, registro de
usuarios y contacto.

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

## Notas

- El catálogo no incluye Quinua Orgánica (PO003): el documento de requerimientos
  no especifica su precio ni stock. Leche Entera (PL001) sí se muestra, con esos
  datos marcados como pendientes de confirmar con el cliente.
- El cliente menciona presencia en "más de 9 puntos" de venta, pero solo entrega
  7 ciudades (Santiago, Puerto Montt, Villarica, Nacimiento, Viña del Mar,
  Valparaíso, Concepción); son las que se muestran en el sitio.
- El logo y las fotografías de producto se generaron con herramientas de IA
  (prompts incluidos en este repositorio), a la espera de material fotográfico
  propio del cliente.

## Pendientes

- [ ] Video institucional embebido en `nosotros.html` (placeholder visible en la página)
- [ ] Datos de precio/stock de Leche Entera y Quinua Orgánica, si el cliente los
      proporciona

## Requisitos cubiertos

- Estructura HTML5 semántica ✅
- Hipervínculos, imágenes, botones y formularios funcionales ✅
- Páginas interconectadas ✅
- Hoja de estilos CSS externa aplicada consistentemente ✅
- Validación de formularios en JavaScript con mensajes de error específicos ✅
- Repositorio Git con commits descriptivos, subido a GitHub ✅
- Video embebido ⏳ pendiente

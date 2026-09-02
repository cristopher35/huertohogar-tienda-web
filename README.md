# HuertoHogar - Tienda Web

🔗 **Ver el sitio en línea:** https://cristopher35.github.io/huertohogar-tienda-web/

Sitio web desarrollado para **HuertoHogar**, tienda online chilena dedicada a
llevar productos frescos del campo directamente a sus clientes, en base al
documento de requerimientos y estándares de diseño proporcionado por la empresa.

El proyecto tiene dos partes: la **tienda** (pública) y el **panel de
administrador** (protegido con inicio de sesión y roles).

## Tecnologías utilizadas

- **HTML5** semántico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** (hoja de estilos externa, variables CSS, Flexbox)
- **JavaScript** (renderizado de datos, validación de formularios, carrito de
  compras, sesión de usuario, todo con `localStorage` como almacenamiento —
  no hay backend en esta etapa)
- **Git y GitHub** para control de versiones

## Estructura del proyecto

```
├── index.html                 Home: bienvenida, banner, categorías, misión/visión
├── productos.html              Catálogo (renderizado desde un arreglo de productos)
├── producto-detalle.html       Detalle de un producto + añadir al carrito
├── carrito.html                 Carrito de compras
├── login.html                  Inicio de sesión
├── registro.html               Registro de usuario (RUN, región/comuna, etc.)
├── nosotros.html                Quiénes somos, video, misión/visión, puntos de venta
├── blogs.html                  Listado de artículos
├── blog-detalle.html            Detalle de un artículo
├── contacto.html                Formulario de contacto
├── css/styles.css               Hoja de estilos externa (tienda + admin)
├── img/                         Logo, banner y fotografías de productos
├── js/
│   ├── productos-data.js        Arreglo de productos + guardado en localStorage
│   ├── usuarios-data.js         Usuarios semilla + guardado en localStorage
│   ├── regiones.js              Regiones/comunas y selects en cascada
│   ├── auth.js                  Inicio/cierre de sesión, protección de rutas por rol
│   ├── carrito.js                Lógica del carrito (localStorage)
│   ├── validacion.js            Validaciones de formularios (RUN, correo, contraseña...)
│   ├── utilidades.js            Funciones de apoyo (leer parámetros de la URL, formato de precio)
│   ├── productos-listado.js     Renderiza el catálogo
│   ├── producto-detalle.js      Renderiza el detalle de un producto
│   ├── carrito-pagina.js         Renderiza la página del carrito
│   └── blogs.js / blogs-data.js  Listado y detalle de artículos
└── admin/
    ├── index.html                Home del panel (protegido)
    ├── productos.html            Listado de productos
    ├── producto-form.html        Crear/editar producto
    ├── producto-mostrar.html     Ver un producto
    ├── usuarios.html             Listado de usuarios (solo Administrador)
    ├── usuario-form.html         Crear/editar usuario
    └── usuario-mostrar.html      Ver un usuario
```

## Cómo verlo

No requiere instalación ni servidor: basta con abrir `index.html` en el
navegador. El video institucional de `nosotros.html` solo carga correctamente
en la versión publicada (GitHub Pages); localmente como archivo puede mostrar
un error de YouTube, es una limitación conocida de probar `file://` en local.

## Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@duoc.cl | admin123 |
| Vendedor | vendedor@duoc.cl | vend1234 |
| Cliente | cliente@gmail.com | cliente1 |

Un Vendedor solo puede **ver** productos (no editarlos) y no tiene acceso a
Usuarios. Un Cliente no puede entrar al panel de administrador.

## Notas y decisiones tomadas

- El catálogo no incluye Quinua Orgánica (PO003): el documento de
  requerimientos no especifica su precio ni stock. Leche Entera (PL001) sí se
  muestra, con esos datos marcados como pendientes de confirmar con el cliente.
- El cliente menciona presencia en "más de 9 puntos" de venta, pero solo
  entrega 7 ciudades; son las que se muestran en el sitio.
- El logo y las fotografías de producto se generaron con herramientas de IA,
  a la espera de material fotográfico propio del cliente.
- Como todavía no hay backend/base de datos, el catálogo de productos y los
  usuarios viven en `localStorage` del navegador (se inicializan solos la
  primera vez). Los cambios hechos desde el panel de administrador (crear,
  editar) quedan guardados solo en ese navegador.
- La protección del panel de administrador es solo del lado del cliente
  (JavaScript). No reemplaza una autenticación real de backend, que
  corresponde a una etapa posterior del proyecto.
- El listado de regiones/comunas es un set reducido de ejemplo (no las 16
  regiones completas de Chile), suficiente para probar los selects en cascada.
- El cupón de descuento en el carrito es solo de interfaz (no aplica
  descuentos reales), ya que no había reglas de negocio definidas para eso.

## Pendientes

- [ ] Documento ERS (Especificación de Requerimientos de Software)
- [ ] Datos de precio/stock de Leche Entera y Quinua Orgánica, si el cliente
      los proporciona
- [ ] Comprimir el proyecto en `.zip` para la entrega

## Requisitos cubiertos

- Estructura HTML5 semántica ✅
- Hipervínculos, imágenes, botones y formularios funcionales ✅
- Video institucional embebido ✅
- Menús de navegación y carrito de compras ✅
- Páginas interconectadas ✅
- Hoja de estilos CSS externa aplicada consistentemente ✅
- Listado y detalle de productos generados por JavaScript desde un arreglo ✅
- Carrito de compras con `localStorage` ✅
- Validaciones en JavaScript (RUN, correo con dominio restringido, largo de
  contraseña, campos requeridos y largos máximos) con mensajes de error
  específicos ✅
- Inicio de sesión y roles (Administrador / Vendedor / Cliente) ✅
- Panel de administrador con mantenedores de productos y usuarios ✅
- Repositorio Git con commits descriptivos, subido a GitHub ✅

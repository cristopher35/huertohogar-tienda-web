function renderizarDetalleProducto() {
  var contenedor = document.getElementById("detalle-producto");
  if (!contenedor) {
    return;
  }

  var id = obtenerParametroUrl("id");
  var producto = ProductosStorage.obtenerPorId(id);

  if (!producto) {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  document.title = producto.nombre + " - HuertoHogar";

  var precioTexto = "Precio no especificado en el documento del caso";
  var clasePrecio = "precio-detalle precio-pendiente";
  if (producto.precio !== null) {
    precioTexto = formatearPrecio(producto.precio);
    if (producto.unidad) {
      precioTexto = precioTexto + " por " + producto.unidad;
    }
    clasePrecio = "precio-detalle";
  }

  var stockTexto = "Stock no especificado en el documento del caso";
  if (producto.stock !== null) {
    stockTexto = producto.stock + " unidades disponibles";
  }

  var puedeComprar = producto.precio !== null && producto.stock > 0;

  var htmlCompra = '<button type="button" class="boton" disabled>No disponible</button>';
  if (puedeComprar) {
    htmlCompra =
      '<div class="campo-cantidad">' +
      '<label for="cantidad">Cantidad</label>' +
      '<input type="number" id="cantidad" min="1" value="1" />' +
      "</div>" +
      '<button type="button" class="boton" id="boton-agregar-carrito">Añadir al carrito</button>' +
      '<p id="mensaje-agregado" class="mensaje-exito" hidden>Producto agregado al carrito.</p>';
  }

  contenedor.innerHTML =
    '<div class="detalle-producto-imagen">' +
    '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" />' +
    "</div>" +
    '<div class="detalle-producto-info">' +
    '<p class="breadcrumb"><a href="productos.html">Productos</a> &gt; ' + producto.categoria + " &gt; " + producto.nombre + "</p>" +
    "<h2>" + producto.nombre + "</h2>" +
    '<p class="' + clasePrecio + '">' + precioTexto + "</p>" +
    '<p class="stock">' + stockTexto + "</p>" +
    "<p>" + producto.descripcion + "</p>" +
    htmlCompra +
    "</div>";

  var boton = document.getElementById("boton-agregar-carrito");
  if (boton) {
    boton.addEventListener("click", function () {
      var campoCantidad = document.getElementById("cantidad");
      var cantidad = parseInt(campoCantidad.value, 10);
      if (!cantidad || cantidad < 1) {
        cantidad = 1;
      }
      Carrito.agregar(producto.id, cantidad);
      document.getElementById("mensaje-agregado").hidden = false;
    });
  }
}

document.addEventListener("DOMContentLoaded", renderizarDetalleProducto);

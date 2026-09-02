function crearTarjetaProducto(producto) {
  var precioTexto = "Precio no especificado en el documento del caso";
  var claseP = "precio precio-pendiente";
  if (producto.precio !== null) {
    precioTexto = formatearPrecio(producto.precio);
    if (producto.unidad) {
      precioTexto = precioTexto + " por " + producto.unidad;
    }
    claseP = "precio";
  }

  var stockTexto = "Stock no especificado en el documento del caso";
  if (producto.stock !== null) {
    stockTexto = "Stock: " + producto.stock;
  }

  var puedeComprar = producto.precio !== null && producto.stock > 0;
  var botonHtml = '<button type="button" class="boton" disabled>No disponible</button>';
  if (puedeComprar) {
    botonHtml =
      '<button type="button" class="boton" onclick="Carrito.agregar(\'' +
      producto.id +
      "', 1)\">Agregar al carrito</button>";
  }

  var article = document.createElement("article");
  article.className = "producto";
  article.innerHTML =
    '<a href="producto-detalle.html?id=' + producto.id + '">' +
    '<div class="producto-img"><img src="' + producto.imagen + '" alt="' + producto.nombre + '" /></div>' +
    "</a>" +
    "<h4><a href=\"producto-detalle.html?id=" + producto.id + '">' + producto.id + " - " + producto.nombre + "</a></h4>" +
    '<p class="' + claseP + '">' + precioTexto + "</p>" +
    '<p class="stock">' + stockTexto + "</p>" +
    "<p>" + producto.descripcion + "</p>" +
    botonHtml;
  return article;
}

function renderizarCatalogo() {
  var productos = ProductosStorage.obtenerTodos();
  var contenedores = {
    "Frutas Frescas": document.getElementById("grid-frutas"),
    "Verduras Orgánicas": document.getElementById("grid-verduras"),
    "Productos Orgánicos": document.getElementById("grid-organicos"),
    "Productos Lácteos": document.getElementById("grid-lacteos"),
  };

  for (var nombreCategoria in contenedores) {
    if (contenedores.hasOwnProperty(nombreCategoria) && contenedores[nombreCategoria]) {
      contenedores[nombreCategoria].innerHTML = "";
    }
  }

  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
    var contenedor = contenedores[producto.categoria];
    if (contenedor) {
      contenedor.appendChild(crearTarjetaProducto(producto));
    }
  }
}

document.addEventListener("DOMContentLoaded", renderizarCatalogo);

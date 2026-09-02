function renderizarPaginaCarrito() {
  var contenedor = document.getElementById("items-carrito");
  if (!contenedor) {
    return;
  }

  var items = Carrito.obtener();
  var productos = ProductosStorage.obtenerTodos();

  if (items.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío. <a href="productos.html">Ver productos</a>.</p>';
    document.getElementById("total-carrito").textContent = "$0";
    return;
  }

  contenedor.innerHTML = "";
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var producto = null;
    for (var j = 0; j < productos.length; j++) {
      if (productos[j].id === item.id) {
        producto = productos[j];
      }
    }
    if (!producto) {
      continue;
    }
    var precioUnitario = producto.precio || 0;
    var subtotal = precioUnitario * item.cantidad;

    var fila = document.createElement("div");
    fila.className = "carrito-item";
    fila.innerHTML =
      '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" />' +
      '<div class="carrito-item-info">' +
      "<h4>" + producto.nombre + "</h4>" +
      "<p>" + formatearPrecio(precioUnitario) + " c/u</p>" +
      "</div>" +
      '<div class="carrito-item-cantidad">' +
      '<button type="button" onclick="cambiarCantidadCarrito(\'' + producto.id + "', " + (item.cantidad - 1) + ')">-</button>' +
      '<input type="number" min="1" value="' + item.cantidad + '" onchange="cambiarCantidadCarrito(\'' + producto.id + "', this.value)\" />" +
      '<button type="button" onclick="cambiarCantidadCarrito(\'' + producto.id + "', " + (item.cantidad + 1) + ')">+</button>' +
      "</div>" +
      '<p class="carrito-item-subtotal">' + formatearPrecio(subtotal) + "</p>" +
      '<button type="button" class="carrito-item-quitar" onclick="Carrito.quitar(\'' + producto.id + "'); renderizarPaginaCarrito();\">✕</button>";
    contenedor.appendChild(fila);
  }

  document.getElementById("total-carrito").textContent = formatearPrecio(Carrito.totalPrecio());
}

function cambiarCantidadCarrito(id, cantidad) {
  Carrito.actualizarCantidad(id, Number(cantidad));
  renderizarPaginaCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarPaginaCarrito();

  var formCupon = document.getElementById("form-cupon");
  if (formCupon) {
    formCupon.addEventListener("submit", function (evento) {
      evento.preventDefault();
      document.getElementById("mensaje-cupon").textContent = "Cupón no válido.";
    });
  }

  var botonPagar = document.getElementById("boton-pagar");
  if (botonPagar) {
    botonPagar.addEventListener("click", function () {
      if (Carrito.obtener().length === 0) {
        return;
      }
      alert("¡Gracias por tu compra! Este es un flujo de demostración, no se procesó ningún pago real.");
      Carrito.vaciar();
      renderizarPaginaCarrito();
    });
  }
});

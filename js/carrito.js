var Carrito = {
  CLAVE: "huertohogar_carrito",

  obtener: function () {
    var datos = localStorage.getItem(this.CLAVE);
    if (!datos) {
      return [];
    }
    return JSON.parse(datos);
  },

  guardar: function (items) {
    localStorage.setItem(this.CLAVE, JSON.stringify(items));
    this.actualizarContador();
  },

  agregar: function (idProducto, cantidad) {
    var items = this.obtener();
    var encontrado = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === idProducto) {
        encontrado = items[i];
      }
    }
    if (encontrado) {
      encontrado.cantidad = encontrado.cantidad + cantidad;
    } else {
      items.push({ id: idProducto, cantidad: cantidad });
    }
    this.guardar(items);
  },

  actualizarCantidad: function (idProducto, cantidad) {
    var items = this.obtener();
    var nuevaLista = [];
    if (cantidad <= 0) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id !== idProducto) {
          nuevaLista.push(items[i]);
        }
      }
      this.guardar(nuevaLista);
      return;
    }
    for (var j = 0; j < items.length; j++) {
      if (items[j].id === idProducto) {
        items[j].cantidad = cantidad;
      }
    }
    this.guardar(items);
  },

  quitar: function (idProducto) {
    var items = this.obtener();
    var nuevaLista = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id !== idProducto) {
        nuevaLista.push(items[i]);
      }
    }
    this.guardar(nuevaLista);
  },

  vaciar: function () {
    this.guardar([]);
  },

  totalUnidades: function () {
    var items = this.obtener();
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      total = total + items[i].cantidad;
    }
    return total;
  },

  totalPrecio: function () {
    var items = this.obtener();
    var productos = ProductosStorage.obtenerTodos();
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      var precioProducto = 0;
      for (var j = 0; j < productos.length; j++) {
        if (productos[j].id === items[i].id && productos[j].precio) {
          precioProducto = productos[j].precio;
        }
      }
      total = total + precioProducto * items[i].cantidad;
    }
    return total;
  },

  actualizarContador: function () {
    var badge = document.getElementById("carrito-contador");
    if (badge) {
      badge.textContent = this.totalUnidades();
    }
  },
};

document.addEventListener("DOMContentLoaded", function () {
  Carrito.actualizarContador();
});

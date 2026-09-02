function renderizarListadoProductos() {
  var cuerpo = document.getElementById("cuerpo-tabla-productos");
  if (!cuerpo) {
    return;
  }
  var productos = ProductosStorage.obtenerTodos();
  var sesion = Auth.sesionActual();
  var esVendedor = sesion && sesion.tipo === "Vendedor";

  cuerpo.innerHTML = "";
  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    var precioTexto = "No especificado";
    if (p.precio !== null) {
      precioTexto = formatearPrecio(p.precio);
    }
    var stockTexto = "No especificado";
    if (p.stock !== null) {
      stockTexto = p.stock;
    }

    var botonEditar = "";
    if (!esVendedor) {
      botonEditar = '<a href="producto-form.html?id=' + p.id + '" class="boton">Editar</a>';
    }

    var fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" + p.id + "</td>" +
      "<td>" + p.nombre + "</td>" +
      "<td>" + p.categoria + "</td>" +
      "<td>" + precioTexto + "</td>" +
      "<td>" + stockTexto + "</td>" +
      '<td class="acciones-tabla">' +
      '<a href="producto-mostrar.html?id=' + p.id + '" class="boton boton-secundario">Ver</a>' +
      botonEditar +
      "</td>";
    cuerpo.appendChild(fila);
  }
}

function cargarFormularioProducto() {
  var titulo = document.getElementById("titulo-form-producto");
  if (!titulo) {
    return;
  }

  var id = obtenerParametroUrl("id");

  var selectCategoria = document.getElementById("categoria");
  if (selectCategoria) {
    for (var i = 0; i < CATEGORIAS.length; i++) {
      var opcion = document.createElement("option");
      opcion.value = CATEGORIAS[i];
      opcion.textContent = CATEGORIAS[i];
      selectCategoria.appendChild(opcion);
    }
  }

  if (id) {
    var producto = ProductosStorage.obtenerPorId(id);
    if (producto) {
      titulo.textContent = "Editar producto";
      document.getElementById("codigo").value = producto.id;
      document.getElementById("codigo").disabled = true;
      document.getElementById("nombre").value = producto.nombre;
      document.getElementById("descripcion").value = producto.descripcion || "";
      document.getElementById("precio").value = producto.precio !== null ? producto.precio : "";
      document.getElementById("stock").value = producto.stock !== null ? producto.stock : "";
      document.getElementById("stockCritico").value = producto.stockCritico !== null ? producto.stockCritico : "";
      document.getElementById("categoria").value = producto.categoria;
      document.getElementById("imagen").value = producto.imagen || "";
      document.getElementById("unidad").value = producto.unidad || "";
    }
  } else {
    titulo.textContent = "Nuevo producto";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarListadoProductos();
  cargarFormularioProducto();

  var formProducto = document.getElementById("form-producto");
  if (formProducto) {
    formProducto.addEventListener("submit", validarYGuardarProducto);
  }
});

function validarYGuardarProducto(evento) {
  evento.preventDefault();
  var esValido = true;

  var idExistente = obtenerParametroUrl("id");

  var codigo = document.getElementById("codigo").value.trim();
  var nombre = document.getElementById("nombre").value.trim();
  var descripcion = document.getElementById("descripcion").value.trim();
  var precio = document.getElementById("precio").value;
  var stock = document.getElementById("stock").value;
  var stockCritico = document.getElementById("stockCritico").value;
  var categoria = document.getElementById("categoria").value;
  var imagen = document.getElementById("imagen").value.trim();
  var unidad = document.getElementById("unidad").value.trim();

  if (codigo.length < 3) {
    mostrarError("codigo", "El código debe tener al menos 3 caracteres.");
    esValido = false;
  } else {
    limpiarError("codigo");
  }

  if (nombre === "" || nombre.length > 100) {
    mostrarError("nombre", "Nombre requerido (máximo 100 caracteres).");
    esValido = false;
  } else {
    limpiarError("nombre");
  }

  if (descripcion.length > 500) {
    mostrarError("descripcion", "Máximo 500 caracteres.");
    esValido = false;
  } else {
    limpiarError("descripcion");
  }

  if (precio === "" || Number(precio) < 0) {
    mostrarError("precio", "El precio es requerido y no puede ser negativo.");
    esValido = false;
  } else {
    limpiarError("precio");
  }

  var stockEsEntero = Number(stock) === Math.floor(Number(stock));
  if (stock === "" || !stockEsEntero || Number(stock) < 0) {
    mostrarError("stock", "El stock es requerido, debe ser un número entero mayor o igual a 0.");
    esValido = false;
  } else {
    limpiarError("stock");
  }

  var stockCriticoEsEntero = Number(stockCritico) === Math.floor(Number(stockCritico));
  if (stockCritico !== "" && (!stockCriticoEsEntero || Number(stockCritico) < 0)) {
    mostrarError("stockCritico", "El stock crítico debe ser un número entero mayor o igual a 0.");
    esValido = false;
  } else {
    limpiarError("stockCritico");
  }

  if (categoria === "") {
    mostrarError("categoria", "Selecciona una categoría.");
    esValido = false;
  } else {
    limpiarError("categoria");
  }

  var mensajeExito = document.getElementById("mensaje-exito-producto");
  if (esValido) {
    var idFinal = codigo;
    if (idExistente) {
      idFinal = idExistente;
    }
    var imagenFinal = imagen;
    if (imagenFinal === "") {
      imagenFinal = "img/manzanas-fuji.jpg";
    }
    var stockCriticoFinal = null;
    if (stockCritico !== "") {
      stockCriticoFinal = Number(stockCritico);
    }
    ProductosStorage.guardar({
      id: idFinal,
      nombre: nombre,
      categoria: categoria,
      precio: Number(precio),
      unidad: unidad || null,
      stock: Number(stock),
      stockCritico: stockCriticoFinal,
      descripcion: descripcion,
      imagen: imagenFinal,
    });
    mensajeExito.hidden = false;
    setTimeout(function () {
      window.location.href = "productos.html";
    }, 800);
  } else {
    mensajeExito.hidden = true;
  }
}

function mostrarProducto() {
  var contenedor = document.getElementById("detalle-producto-admin");
  if (!contenedor) {
    return;
  }
  var id = obtenerParametroUrl("id");
  var producto = ProductosStorage.obtenerPorId(id);
  if (!producto) {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  var precioTexto = "No especificado";
  if (producto.precio !== null) {
    precioTexto = formatearPrecio(producto.precio);
    if (producto.unidad) {
      precioTexto = precioTexto + " por " + producto.unidad;
    }
  }
  var stockTexto = "No especificado";
  if (producto.stock !== null) {
    stockTexto = producto.stock;
  }
  var stockCriticoTexto = "No definido";
  if (producto.stockCritico !== null) {
    stockCriticoTexto = producto.stockCritico;
  }

  contenedor.innerHTML =
    '<img src="../' + producto.imagen + '" alt="' + producto.nombre + '" class="mostrar-producto-img" />' +
    "<dl>" +
    "<dt>Código</dt><dd>" + producto.id + "</dd>" +
    "<dt>Nombre</dt><dd>" + producto.nombre + "</dd>" +
    "<dt>Categoría</dt><dd>" + producto.categoria + "</dd>" +
    "<dt>Precio</dt><dd>" + precioTexto + "</dd>" +
    "<dt>Stock</dt><dd>" + stockTexto + "</dd>" +
    "<dt>Stock crítico</dt><dd>" + stockCriticoTexto + "</dd>" +
    "<dt>Descripción</dt><dd>" + producto.descripcion + "</dd>" +
    "</dl>";

  var linkEditar = document.getElementById("link-editar-producto");
  var sesion = Auth.sesionActual();
  if (linkEditar) {
    if (sesion && sesion.tipo === "Vendedor") {
      linkEditar.hidden = true;
    } else {
      linkEditar.href = "producto-form.html?id=" + producto.id;
    }
  }
}

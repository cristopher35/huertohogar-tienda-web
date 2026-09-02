function renderizarListadoBlogs() {
  var contenedor = document.getElementById("lista-blogs");
  if (!contenedor) {
    return;
  }
  contenedor.innerHTML = "";
  for (var i = 0; i < BLOGS.length; i++) {
    var b = BLOGS[i];
    var article = document.createElement("article");
    article.className = "blog-tarjeta";
    article.innerHTML =
      '<img src="' + b.imagen + '" alt="' + b.titulo + '" />' +
      "<h3>" + b.titulo + "</h3>" +
      "<p>" + b.resumen + "</p>" +
      '<a href="blog-detalle.html?id=' + b.id + '" class="boton">Ver caso</a>';
    contenedor.appendChild(article);
  }
}

function renderizarDetalleBlog() {
  var contenedor = document.getElementById("detalle-blog");
  if (!contenedor) {
    return;
  }
  var id = obtenerParametroUrl("id");
  var blogEncontrado = null;
  for (var i = 0; i < BLOGS.length; i++) {
    if (BLOGS[i].id === id) {
      blogEncontrado = BLOGS[i];
    }
  }

  if (!blogEncontrado) {
    contenedor.innerHTML = "<p>Artículo no encontrado.</p>";
    return;
  }

  document.title = blogEncontrado.titulo + " - HuertoHogar";
  contenedor.innerHTML =
    '<img src="' + blogEncontrado.imagen + '" alt="' + blogEncontrado.titulo + '" class="blog-detalle-imagen" />' +
    "<h2>" + blogEncontrado.titulo + "</h2>" +
    "<p>" + blogEncontrado.contenido + "</p>";
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarListadoBlogs();
  renderizarDetalleBlog();
});

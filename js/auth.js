var Auth = {
  CLAVE: "huertohogar_sesion",

  iniciarSesion: function (correo, password) {
    var usuario = UsuariosStorage.obtenerPorCorreo(correo);
    if (!usuario || usuario.password !== password) {
      return false;
    }
    var datosSesion = {
      correo: usuario.correo,
      nombre: usuario.nombre,
      tipo: usuario.tipo,
    };
    localStorage.setItem(this.CLAVE, JSON.stringify(datosSesion));
    return true;
  },

  cerrarSesion: function () {
    localStorage.removeItem(this.CLAVE);
  },

  sesionActual: function () {
    var datos = localStorage.getItem(this.CLAVE);
    if (!datos) {
      return null;
    }
    return JSON.parse(datos);
  },

  requerirRol: function (rolesPermitidos, paginaLogin) {
    var sesion = this.sesionActual();
    var tienePermiso = false;
    if (sesion) {
      for (var i = 0; i < rolesPermitidos.length; i++) {
        if (rolesPermitidos[i] === sesion.tipo) {
          tienePermiso = true;
        }
      }
    }
    if (!tienePermiso) {
      window.location.href = paginaLogin;
    }
    return sesion;
  },
};

function actualizarNavSesion() {
  var navSesion = document.getElementById("nav-sesion");
  if (!navSesion) {
    return;
  }
  var sesion = Auth.sesionActual();
  if (sesion) {
    navSesion.innerHTML = '<a href="#" id="link-cerrar-sesion">Cerrar sesión (' + sesion.nombre + ")</a>";
    document.getElementById("link-cerrar-sesion").addEventListener("click", function (evento) {
      evento.preventDefault();
      Auth.cerrarSesion();
      window.location.href = "index.html";
    });
  }
}

function conectarCerrarSesionAdmin() {
  var link = document.getElementById("link-cerrar-sesion-admin");
  if (!link) {
    return;
  }
  link.addEventListener("click", function (evento) {
    evento.preventDefault();
    Auth.cerrarSesion();
    window.location.href = "../index.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarNavSesion();
  conectarCerrarSesionAdmin();
});

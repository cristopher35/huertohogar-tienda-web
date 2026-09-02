function renderizarListadoUsuarios() {
  var cuerpo = document.getElementById("cuerpo-tabla-usuarios");
  if (!cuerpo) {
    return;
  }
  var usuarios = UsuariosStorage.obtenerTodos();

  cuerpo.innerHTML = "";
  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];
    var fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" + u.run + "</td>" +
      "<td>" + u.nombre + " " + u.apellidos + "</td>" +
      "<td>" + u.correo + "</td>" +
      "<td>" + u.tipo + "</td>" +
      '<td class="acciones-tabla">' +
      '<a href="usuario-mostrar.html?run=' + u.run + '" class="boton boton-secundario">Ver</a>' +
      '<a href="usuario-form.html?run=' + u.run + '" class="boton">Editar</a>' +
      "</td>";
    cuerpo.appendChild(fila);
  }
}

function cargarFormularioUsuario() {
  var titulo = document.getElementById("titulo-form-usuario");
  if (!titulo) {
    return;
  }

  cargarRegiones("region", "comuna");

  var run = obtenerParametroUrl("run");

  if (run) {
    var usuario = UsuariosStorage.obtenerPorRun(run);
    if (usuario) {
      titulo.textContent = "Editar usuario";
      document.getElementById("run").value = usuario.run;
      document.getElementById("run").disabled = true;
      document.getElementById("nombre").value = usuario.nombre;
      document.getElementById("apellidos").value = usuario.apellidos;
      document.getElementById("correo").value = usuario.correo;
      document.getElementById("fechaNacimiento").value = usuario.fechaNacimiento || "";
      document.getElementById("tipo").value = usuario.tipo;
      document.getElementById("direccion").value = usuario.direccion || "";
      if (usuario.region) {
        document.getElementById("region").value = usuario.region;
        var eventoCambio = new Event("change");
        document.getElementById("region").dispatchEvent(eventoCambio);
        setTimeout(function () {
          document.getElementById("comuna").value = usuario.comuna || "";
        }, 0);
      }
      document.getElementById("password").placeholder = "Dejar en blanco para no cambiarla";
      document.getElementById("password").required = false;
      document.getElementById("password2").required = false;
    }
  } else {
    titulo.textContent = "Nuevo usuario";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarListadoUsuarios();
  cargarFormularioUsuario();
  mostrarUsuario();

  var formUsuario = document.getElementById("form-usuario-admin");
  if (formUsuario) {
    formUsuario.addEventListener("submit", validarYGuardarUsuario);
  }
});

function validarYGuardarUsuario(evento) {
  evento.preventDefault();
  var esValido = true;

  var runExistente = obtenerParametroUrl("run");

  var run = document.getElementById("run").value.trim();
  var nombre = document.getElementById("nombre").value.trim();
  var apellidos = document.getElementById("apellidos").value.trim();
  var correo = document.getElementById("correo").value.trim();
  var fechaNacimiento = document.getElementById("fechaNacimiento").value;
  var tipo = document.getElementById("tipo").value;
  var region = document.getElementById("region").value;
  var comuna = document.getElementById("comuna").value;
  var direccion = document.getElementById("direccion").value.trim();
  var password = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;

  if (!validarRun(run)) {
    mostrarError("run", "RUN inválido. Ingresa sin puntos ni guion, ej: 190110222.");
    esValido = false;
  } else {
    limpiarError("run");
  }

  if (nombre === "" || nombre.length > 50) {
    mostrarError("nombre", "Nombre requerido (máximo 50 caracteres).");
    esValido = false;
  } else {
    limpiarError("nombre");
  }

  if (apellidos === "" || apellidos.length > 100) {
    mostrarError("apellidos", "Apellidos requeridos (máximo 100 caracteres).");
    esValido = false;
  } else {
    limpiarError("apellidos");
  }

  if (correo === "" || correo.length > 100 || !correoTieneFormatoBasico(correo) || !correoTerminaEnDominioValido(correo)) {
    mostrarError("correo", "Correo requerido, máximo 100 caracteres, solo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  } else {
    limpiarError("correo");
  }

  if (tipo === "") {
    mostrarError("tipo", "Selecciona un tipo de usuario.");
    esValido = false;
  } else {
    limpiarError("tipo");
  }

  if (direccion === "" || direccion.length > 300) {
    mostrarError("direccion", "Dirección requerida (máximo 300 caracteres).");
    esValido = false;
  } else {
    limpiarError("direccion");
  }

  var esNuevo = !runExistente;
  if (esNuevo || password !== "") {
    if (password.length < 4 || password.length > 10) {
      mostrarError("password", "La contraseña debe tener entre 4 y 10 caracteres.");
      esValido = false;
    } else {
      limpiarError("password");
    }
    if (password2 !== password) {
      mostrarError("password2", "Las contraseñas no coinciden.");
      esValido = false;
    } else {
      limpiarError("password2");
    }
  }

  var mensajeExito = document.getElementById("mensaje-exito-usuario");
  if (esValido) {
    var usuarioPrevio = null;
    if (runExistente) {
      usuarioPrevio = UsuariosStorage.obtenerPorRun(runExistente);
    }
    var passwordFinal = password;
    if (password === "" && usuarioPrevio) {
      passwordFinal = usuarioPrevio.password;
    }
    UsuariosStorage.guardar({
      run: run.toUpperCase(),
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      password: passwordFinal,
      fechaNacimiento: fechaNacimiento,
      tipo: tipo,
      region: region,
      comuna: comuna,
      direccion: direccion,
    });
    mensajeExito.hidden = false;
    setTimeout(function () {
      window.location.href = "usuarios.html";
    }, 800);
  } else {
    mensajeExito.hidden = true;
  }
}

function mostrarUsuario() {
  var contenedor = document.getElementById("detalle-usuario-admin");
  if (!contenedor) {
    return;
  }
  var run = obtenerParametroUrl("run");
  var usuario = UsuariosStorage.obtenerPorRun(run);
  if (!usuario) {
    contenedor.innerHTML = "<p>Usuario no encontrado.</p>";
    return;
  }
  contenedor.innerHTML =
    "<dl>" +
    "<dt>RUN</dt><dd>" + usuario.run + "</dd>" +
    "<dt>Nombre</dt><dd>" + usuario.nombre + " " + usuario.apellidos + "</dd>" +
    "<dt>Correo</dt><dd>" + usuario.correo + "</dd>" +
    "<dt>Tipo de usuario</dt><dd>" + usuario.tipo + "</dd>" +
    "<dt>Región</dt><dd>" + (usuario.region || "No especificada") + "</dd>" +
    "<dt>Comuna</dt><dd>" + (usuario.comuna || "No especificada") + "</dd>" +
    "<dt>Dirección</dt><dd>" + (usuario.direccion || "No especificada") + "</dd>" +
    "</dl>";

  var linkEditar = document.getElementById("link-editar-usuario");
  if (linkEditar) {
    linkEditar.href = "usuario-form.html?run=" + usuario.run;
  }
}

function correoTerminaEnDominioValido(correo) {
  var dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  var esValido = false;
  for (var i = 0; i < dominiosValidos.length; i++) {
    var dominio = dominiosValidos[i];
    var inicioDominio = correo.length - dominio.length;
    if (inicioDominio >= 0 && correo.substring(inicioDominio) === dominio) {
      esValido = true;
    }
  }
  return esValido;
}

function correoTieneFormatoBasico(correo) {
  var posicionArroba = correo.indexOf("@");
  if (posicionArroba <= 0) {
    return false;
  }
  var posicionPunto = correo.indexOf(".", posicionArroba);
  if (posicionPunto === -1) {
    return false;
  }
  return true;
}

function telefonoTieneFormatoValido(telefono) {
  var soloDigitos = "";
  for (var i = 0; i < telefono.length; i++) {
    var caracter = telefono.charAt(i);
    if (caracter !== " " && caracter !== "+") {
      soloDigitos += caracter;
    }
  }
  if (soloDigitos.length < 8 || soloDigitos.length > 15) {
    return false;
  }
  for (var j = 0; j < soloDigitos.length; j++) {
    if (soloDigitos.charAt(j) < "0" || soloDigitos.charAt(j) > "9") {
      return false;
    }
  }
  return true;
}

function validarRun(runCompleto) {
  var limpio = runCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  if (limpio.length < 7 || limpio.length > 9) {
    return false;
  }
  var cuerpo = limpio.substring(0, limpio.length - 1);
  var dv = limpio.substring(limpio.length - 1);

  for (var i = 0; i < cuerpo.length; i++) {
    if (cuerpo.charAt(i) < "0" || cuerpo.charAt(i) > "9") {
      return false;
    }
  }

  var suma = 0;
  var multiplo = 2;
  for (var j = cuerpo.length - 1; j >= 0; j--) {
    suma = suma + parseInt(cuerpo.charAt(j), 10) * multiplo;
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }
  var resto = 11 - (suma % 11);
  var dvEsperado;
  if (resto === 11) {
    dvEsperado = "0";
  } else if (resto === 10) {
    dvEsperado = "K";
  } else {
    dvEsperado = String(resto);
  }
  return dv === dvEsperado;
}

function mostrarError(idCampo, mensaje) {
  var span = document.getElementById("error-" + idCampo);
  if (span) {
    span.textContent = mensaje;
  }
}

function limpiarError(idCampo) {
  mostrarError(idCampo, "");
}

document.addEventListener("DOMContentLoaded", function () {
  var formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", validarRegistro);
  }

  var formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", validarContacto);
  }

  var formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", validarLogin);
  }
});

function validarRegistro(evento) {
  evento.preventDefault();
  var esValido = true;

  var run = document.getElementById("run").value.trim();
  var nombre = document.getElementById("nombre").value.trim();
  var apellidos = document.getElementById("apellidos").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;
  var telefono = document.getElementById("telefono").value.trim();
  var region = document.getElementById("region").value;
  var comuna = document.getElementById("comuna").value;
  var direccion = document.getElementById("direccion").value.trim();

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

  if (email === "" || email.length > 100 || !correoTieneFormatoBasico(email) || !correoTerminaEnDominioValido(email)) {
    mostrarError("email", "Correo requerido, máximo 100 caracteres, solo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  } else {
    limpiarError("email");
  }

  if (password.length < 4 || password.length > 10) {
    mostrarError("password", "La contraseña debe tener entre 4 y 10 caracteres.");
    esValido = false;
  } else {
    limpiarError("password");
  }

  if (password2 !== password || password2 === "") {
    mostrarError("password2", "Las contraseñas no coinciden.");
    esValido = false;
  } else {
    limpiarError("password2");
  }

  if (telefono !== "" && !telefonoTieneFormatoValido(telefono)) {
    mostrarError("telefono", "Ingresa un número de contacto válido (opcional).");
    esValido = false;
  } else {
    limpiarError("telefono");
  }

  if (region === "") {
    mostrarError("region", "Selecciona una región.");
    esValido = false;
  } else {
    limpiarError("region");
  }

  if (comuna === "") {
    mostrarError("comuna", "Selecciona una comuna.");
    esValido = false;
  } else {
    limpiarError("comuna");
  }

  if (direccion === "" || direccion.length > 300) {
    mostrarError("direccion", "Dirección requerida (máximo 300 caracteres).");
    esValido = false;
  } else {
    limpiarError("direccion");
  }

  var mensajeExito = document.getElementById("mensaje-exito");
  if (esValido) {
    var campoFecha = document.getElementById("fechaNacimiento");
    var fechaNacimiento = "";
    if (campoFecha) {
      fechaNacimiento = campoFecha.value;
    }
    UsuariosStorage.guardar({
      run: run.toUpperCase(),
      nombre: nombre,
      apellidos: apellidos,
      correo: email,
      password: password,
      fechaNacimiento: fechaNacimiento,
      tipo: "Cliente",
      region: region,
      comuna: comuna,
      direccion: direccion,
    });
    mensajeExito.hidden = false;
    evento.target.reset();
  } else {
    mensajeExito.hidden = true;
  }
}

function validarLogin(evento) {
  evento.preventDefault();
  var esValido = true;

  var email = document.getElementById("email-login").value.trim();
  var password = document.getElementById("password-login").value;

  if (email === "" || email.length > 100 || !correoTieneFormatoBasico(email) || !correoTerminaEnDominioValido(email)) {
    mostrarError("email-login", "Correo requerido, máximo 100 caracteres, solo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  } else {
    limpiarError("email-login");
  }

  if (password.length < 4 || password.length > 10) {
    mostrarError("password-login", "La contraseña debe tener entre 4 y 10 caracteres.");
    esValido = false;
  } else {
    limpiarError("password-login");
  }

  if (!esValido) {
    return;
  }

  var exito = Auth.iniciarSesion(email, password);
  if (!exito) {
    mostrarError("password-login", "Correo o contraseña incorrectos.");
    return;
  }

  var sesion = Auth.sesionActual();
  if (sesion.tipo === "Administrador" || sesion.tipo === "Vendedor") {
    window.location.href = "admin/index.html";
  } else {
    window.location.href = "index.html";
  }
}

function validarContacto(evento) {
  evento.preventDefault();
  var esValido = true;

  var nombre = document.getElementById("nombre-contacto").value.trim();
  var email = document.getElementById("email-contacto").value.trim();
  var comentario = document.getElementById("comentario-contacto").value.trim();

  if (nombre === "" || nombre.length > 100) {
    mostrarError("nombre-contacto", "Nombre requerido (máximo 100 caracteres).");
    esValido = false;
  } else {
    limpiarError("nombre-contacto");
  }

  if (email === "" || email.length > 100 || !correoTieneFormatoBasico(email) || !correoTerminaEnDominioValido(email)) {
    mostrarError("email-contacto", "Correo requerido, máximo 100 caracteres, solo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    esValido = false;
  } else {
    limpiarError("email-contacto");
  }

  if (comentario === "" || comentario.length > 500) {
    mostrarError("comentario-contacto", "Comentario requerido (máximo 500 caracteres).");
    esValido = false;
  } else {
    limpiarError("comentario-contacto");
  }

  var mensajeExito = document.getElementById("mensaje-exito-contacto");
  if (esValido) {
    mensajeExito.hidden = false;
    evento.target.reset();
  } else {
    mensajeExito.hidden = true;
  }
}

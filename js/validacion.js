const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^\+?\d{8,15}$/;

document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", validarRegistro);
  }

  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", validarContacto);
  }
});

function mostrarError(idCampo, mensaje) {
  const span = document.getElementById("error-" + idCampo);
  if (span) {
    span.textContent = mensaje;
  }
}

function limpiarError(idCampo) {
  mostrarError(idCampo, "");
}

function validarRegistro(evento) {
  evento.preventDefault();
  let esValido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (nombre === "") {
    mostrarError("nombre", "Ingresa tu nombre completo.");
    esValido = false;
  } else {
    limpiarError("nombre");
  }

  if (!REGEX_EMAIL.test(email)) {
    mostrarError("email", "Ingresa un correo válido, por ejemplo nombre@dominio.com.");
    esValido = false;
  } else {
    limpiarError("email");
  }

  if (password.length < 8) {
    mostrarError("password", "La contraseña debe tener al menos 8 caracteres.");
    esValido = false;
  } else {
    limpiarError("password");
  }

  if (password2 === "" || password2 !== password) {
    mostrarError("password2", "Las contraseñas no coinciden.");
    esValido = false;
  } else {
    limpiarError("password2");
  }

  if (direccion === "") {
    mostrarError("direccion", "Ingresa tu dirección de entrega.");
    esValido = false;
  } else {
    limpiarError("direccion");
  }

  if (!REGEX_TELEFONO.test(telefono.replace(/\s/g, ""))) {
    mostrarError("telefono", "Ingresa un número de contacto válido (solo dígitos, opcionalmente con +).");
    esValido = false;
  } else {
    limpiarError("telefono");
  }

  const mensajeExito = document.getElementById("mensaje-exito");
  if (esValido) {
    mensajeExito.hidden = false;
    evento.target.reset();
  } else {
    mensajeExito.hidden = true;
  }
}

function validarContacto(evento) {
  evento.preventDefault();
  let esValido = true;

  const nombre = document.getElementById("nombre-contacto").value.trim();
  const email = document.getElementById("email-contacto").value.trim();
  const mensaje = document.getElementById("mensaje-contacto").value.trim();

  if (nombre === "") {
    mostrarError("nombre-contacto", "Ingresa tu nombre.");
    esValido = false;
  } else {
    limpiarError("nombre-contacto");
  }

  if (!REGEX_EMAIL.test(email)) {
    mostrarError("email-contacto", "Ingresa un correo válido, por ejemplo nombre@dominio.com.");
    esValido = false;
  } else {
    limpiarError("email-contacto");
  }

  if (mensaje.length < 10) {
    mostrarError("mensaje-contacto", "Tu mensaje debe tener al menos 10 caracteres.");
    esValido = false;
  } else {
    limpiarError("mensaje-contacto");
  }

  const mensajeExito = document.getElementById("mensaje-exito-contacto");
  if (esValido) {
    mensajeExito.hidden = false;
    evento.target.reset();
  } else {
    mensajeExito.hidden = true;
  }
}

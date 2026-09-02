function obtenerParametroUrl(nombre) {
  var textoConsulta = window.location.search;
  if (textoConsulta.indexOf("?") === 0) {
    textoConsulta = textoConsulta.substring(1);
  }
  if (textoConsulta === "") {
    return null;
  }
  var pares = textoConsulta.split("&");
  for (var i = 0; i < pares.length; i++) {
    var partes = pares[i].split("=");
    if (partes[0] === nombre) {
      return decodeURIComponent(partes[1] || "");
    }
  }
  return null;
}

function formatearPrecio(numero) {
  var texto = String(Math.round(numero));
  var resultado = "";
  var contador = 0;
  for (var i = texto.length - 1; i >= 0; i--) {
    resultado = texto.charAt(i) + resultado;
    contador++;
    if (contador % 3 === 0 && i !== 0) {
      resultado = "." + resultado;
    }
  }
  return "$" + resultado;
}

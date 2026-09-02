var REGIONES = {
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
  "Región del Biobío": ["Concepción", "Nacimiento", "Los Ángeles"],
  "Región de La Araucanía": ["Temuco", "Villarica", "Pucón"],
  "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
};

function cargarRegiones(selectRegionId, selectComunaId) {
  var selectRegion = document.getElementById(selectRegionId);
  var selectComuna = document.getElementById(selectComunaId);
  if (!selectRegion || !selectComuna) {
    return;
  }

  selectRegion.innerHTML = "";
  var opcionVacia = document.createElement("option");
  opcionVacia.value = "";
  opcionVacia.textContent = "-- Seleccione la región --";
  selectRegion.appendChild(opcionVacia);

  for (var nombreRegion in REGIONES) {
    if (REGIONES.hasOwnProperty(nombreRegion)) {
      var opcion = document.createElement("option");
      opcion.value = nombreRegion;
      opcion.textContent = nombreRegion;
      selectRegion.appendChild(opcion);
    }
  }

  selectRegion.addEventListener("change", function () {
    var comunas = REGIONES[selectRegion.value];
    if (!comunas) {
      comunas = [];
    }
    selectComuna.innerHTML = "";
    var opcionVaciaComuna = document.createElement("option");
    opcionVaciaComuna.value = "";
    opcionVaciaComuna.textContent = "-- Seleccione la comuna --";
    selectComuna.appendChild(opcionVaciaComuna);

    for (var i = 0; i < comunas.length; i++) {
      var opcionComuna = document.createElement("option");
      opcionComuna.value = comunas[i];
      opcionComuna.textContent = comunas[i];
      selectComuna.appendChild(opcionComuna);
    }
  });
}

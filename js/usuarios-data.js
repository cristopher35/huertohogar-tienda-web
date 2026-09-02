var USUARIOS_SEED = [
  {
    run: "111111111",
    nombre: "Admin",
    apellidos: "HuertoHogar",
    correo: "admin@duoc.cl",
    password: "admin123",
    fechaNacimiento: "",
    tipo: "Administrador",
    region: "",
    comuna: "",
    direccion: "",
  },
  {
    run: "222222222",
    nombre: "Vendedor",
    apellidos: "Demo",
    correo: "vendedor@duoc.cl",
    password: "vend1234",
    fechaNacimiento: "",
    tipo: "Vendedor",
    region: "",
    comuna: "",
    direccion: "",
  },
  {
    run: "333333333",
    nombre: "Cliente",
    apellidos: "Demo",
    correo: "cliente@gmail.com",
    password: "cliente1",
    fechaNacimiento: "",
    tipo: "Cliente",
    region: "",
    comuna: "",
    direccion: "",
  },
];

var UsuariosStorage = {
  CLAVE: "huertohogar_usuarios",

  init: function () {
    if (!localStorage.getItem(this.CLAVE)) {
      localStorage.setItem(this.CLAVE, JSON.stringify(USUARIOS_SEED));
    }
  },

  obtenerTodos: function () {
    this.init();
    return JSON.parse(localStorage.getItem(this.CLAVE));
  },

  obtenerPorCorreo: function (correo) {
    var usuarios = this.obtenerTodos();
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo.toLowerCase() === correo.toLowerCase()) {
        return usuarios[i];
      }
    }
    return null;
  },

  obtenerPorRun: function (run) {
    var usuarios = this.obtenerTodos();
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].run === run) {
        return usuarios[i];
      }
    }
    return null;
  },

  guardar: function (usuario) {
    var usuarios = this.obtenerTodos();
    var indiceEncontrado = -1;
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].run === usuario.run) {
        indiceEncontrado = i;
      }
    }
    if (indiceEncontrado >= 0) {
      usuarios[indiceEncontrado] = usuario;
    } else {
      usuarios.push(usuario);
    }
    localStorage.setItem(this.CLAVE, JSON.stringify(usuarios));
  },

  eliminar: function (run) {
    var usuarios = this.obtenerTodos();
    var nuevaLista = [];
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].run !== run) {
        nuevaLista.push(usuarios[i]);
      }
    }
    localStorage.setItem(this.CLAVE, JSON.stringify(nuevaLista));
  },
};

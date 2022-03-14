/* News letter */
//defino una clase y un constructor
class Mensajes {
  constructor(nombre, email, telefono, mensaje) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.mensaje = mensaje;
  }
}

//creo un array vacio
let arrayMensajes = [];

//evaluo si el objeto ya esta en el storage, sino está, lo creo y lo empujo al array
if (localStorage.getItem("mensajes")) {
  arrayMensajes = JSON.parse(localStorage.getItem("mensajes"));
} else {
  localStorage.setItem("mensajes", JSON.stringify(arrayMensajes));
}

let formularioMensaje = document.getElementById("idForm");
let botonEnviar = document.getElementById("botonEnviar");
// let nombreUsuario = document.getElementById("idNombre");

formularioMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  //consulto solo el valor de estos imputs by iD
  let nombre = document.getElementById("idNombre").value;
  let email = document.getElementById("idEmail").value;
  let telefono = document.getElementById("idPhone").value;
  let mensaje = document.getElementById("idMensaje").value;

  if (!arrayMensajes.some((mensajeEnArray) => mensajeEnArray.email == email)) {
    const mensaje = new Mensajes(nombre, email, telefono, mensaje);
    arrayMensajes.push(mensaje);
    localStorage.setItem("mensajes", JSON.stringify(arrayMensajes));
    swal({
      title: "Gracias!",
      text: "Pronto te estaremos contactando",
      icon: "success",
    });
    // formulario.reset();
  } else {
    swal({
      title: "Atentición!",
      text: "Ya estabas en nuestra base de datos. Pronto recibiras nuestras novedades!",
      icon: "warning",
    });
  }
  formulario.reset();
});

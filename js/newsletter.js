/* News letter */
//defino una clase y un constructor
class UsuarioSuscrito {
  constructor(email) {
    this.email = email;
  }
}

//creo un array vacio
let arraySuscritos = [];

//evaluo si el objeto ya esta en el storage, sino está, lo creo y lo empujo al array
if (localStorage.getItem("suscritos")) {
  arraySuscritos = JSON.parse(localStorage.getItem("suscritos"));
} else {
  localStorage.setItem("suscritos", JSON.stringify(arraySuscritos));
}

let formulario = document.getElementById("idForm");
let botonSuscribirse = document.getElementById("botonSuscribirse");
let user = document.getElementById("idEmail");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  //consulto solo el valor de estos imputs by iD
  let email = document.getElementById("idEmail").value;

  if (
    !arraySuscritos.some((suscritoEnArray) => suscritoEnArray.email == email)
  ) {
    const usuario = new UsuarioSuscrito(email);
    arraySuscritos.push(usuario);
    localStorage.setItem("suscritos", JSON.stringify(arraySuscritos));
    swal({
      title: "Excelente!",
      text: "Te suscribiste exitosamente",
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

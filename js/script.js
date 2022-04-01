//constantes
const cart = document.querySelector("#cart");
const containercart = document.querySelector("#lista-cart tbody");
const vaciarcart = document.querySelector("#vaciar-cart");
const listaCajas = document.querySelector("#lista-Cajas");

let divProductos = document.getElementById("divProductos");

//Muestro los productos en el HTML desde el JSON
fetch("../json/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    productos.forEach((producto) => {
      divProductos.innerHTML += `
      <div class="col">
                <div class="text-center card h-100" id"producto${producto.id}">
                    <img src="../img/${producto.img}" class="card-img-top" alt="${producto.nombre}"
                        title="Box Cocktail">
                    <div class="card-body">
                        <h5 class="text-center card-title fs-2 fw-light text-uppercase">${producto.nombre}</h5>
                        <p class="text-center card-text fs-3 fw-light">$${producto.precio}</p>
                        <a href="#" class="btn text-light text-uppercase fs-3 fw-light hvr-grow agregar-cart"
                            data-id="${producto.id}">Agregar</a>
                    </div>
                </div>
            </div>
      `;
    });
  });

//array
let cajasencart = [];

metodosCaja();
function metodosCaja() {
  //agregamos cajas al cart
  listaCajas.addEventListener("click", agregarCaja);

  //elimina una caja seleccionada
  cart.addEventListener("click", borrarCaja);

  //muestra las box del localStorage
  document.addEventListener("DOMContenLoaded", () => {
    cajasencart = JSON.parse(localStorage.getItem("cart")) || [];
    cartHTML();
  });

  //vaciamos el array
  vaciarcart.addEventListener("click", () => {
    cajasencart = [];

    clearHTML();
    //limpiamos el HTML
  });
}

//FUNCIONES

//agregar cajas
function agregarCaja(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-cart")) {
    const cajaSeleccionada = e.target.parentElement.parentElement;
    verCajas(cajaSeleccionada);
  }

  Toastify({
    text: "Producto agregado",
    className: "info",
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #AA7680, #AA7680)",
    },
    offset: {
      x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 100, // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
  }).showToast();
}

//eliminar cajas
function borrarCaja(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("borrar-caja")) {
    console.log(e.target.getAttribute("data-id"));
    const cajaID = e.target.getAttribute("data-id");

    //elimina cajas del arreglos por el data-id
    cajasencart = cajasencart.filter((caja) => caja.id !== cajaID);
    console.log(cajasencart); //muestra el array actualizado
    console.log(cajaID);

    cartHTML();
  }
}

function verCajas(caja) {
  console.log(caja);

  const datosCaja = {
    imagen: caja.querySelector("img").src,
    nombre: caja.querySelector("h5").textContent,
    precio: caja.querySelector("p").textContent,
    id: caja.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = cajasencart.some((caja) => caja.id === datosCaja.id);
  if (existe) {
    const cajas = cajasencart.map((caja) => {
      if (caja.id === datosCaja.id) {
        caja.cantidad++;
        return caja;
      } else {
        return caja;
      }
    });
    cajasencart = [...cajas];
  } else {
    cajasencart = [...cajasencart, datosCaja];
  }

  console.log(cajasencart);

  cartHTML();
}

function cartHTML() {
  clearHTML();

  cajasencart.forEach((cajasencart) => {
    const { imagen, nombre, precio, id, cantidad } = cajasencart;

    const seSuponeQueEsUnaRow = document.createElement("tr");
    seSuponeQueEsUnaRow.innerHTML = `
    <th scope="row" class="border-0">
        <div class="p-2">
          <img src="${imagen}" alt="" width="70"
          class="rounded shadow-sm">
          <div class="ml-3 align-middle d-inline-block">
            <h5 class="mb-0 ms-3"> <a href="#"class="ms-3 align-middle text-dark d-inline-block">${nombre}</a></h5><span
            class="text-muted font-weight-normal font-italic d-block"></span>
          </div>
    </th>
      <td class="align-middle text-center border-0">
        <strong>${precio}</strong>
      </td>
      <td class="align-middle text-center border-0"><strong>${cantidad}</strong></td>
      <td class="align-middle text-center  border-0">
        <a href="#" class="text-white borrar-caja" data-id="${id}">

        <i class="fa fa-trash"></i></a>
      </td>
    `;

    containercart.appendChild(seSuponeQueEsUnaRow);
  });
  nuevoStorage();
}

function nuevoStorage() {
  localStorage.setItem("cart", JSON.stringify(cajasencart));
}

function clearHTML() {
  while (containercart.firstChild) {
    containercart.removeChild(containercart.firstChild);
  }
}

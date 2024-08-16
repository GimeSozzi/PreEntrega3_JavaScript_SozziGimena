// Clase Producto que representa un producto en el simulador
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre; // Nombre del producto
    this.precio = precio; // Precio del producto
  }
}

// Clase Carrito que maneja los productos agregados por el usuario
class Carrito {
  constructor() {
    // Cargar el carrito desde localStorage o inicializar vacío
    this.items = JSON.parse(localStorage.getItem("carrito")) || [];
    this.total = this.calcularTotal();
    this.descuento = 0;
  }

  // Calcula el total del carrito sumando los precios de todos los productos
  calcularTotal() {
    return this.items.reduce((total, item) => total + item.precioTotal, 0);
  }

  // Guarda el carrito en localStorage
  guardarEnStorage() {
    try {
      localStorage.setItem("carrito", JSON.stringify(this.items));
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        mostrarMensaje(
          "Error: El almacenamiento local está lleno. No se pueden guardar más productos."
        );
      } else {
        mostrarMensaje("Error: No se pudo guardar el carrito.");
      }
    }
  }

  // Agrega un producto al carrito
  agregarProducto(producto, cantidad) {
    const precioTotal = producto.precio * cantidad;
    const item = {
      producto: producto.nombre,
      cantidad: cantidad,
      precioTotal: precioTotal,
    };
    this.items.push(item);
    this.total += precioTotal;
    this.actualizarCarrito();
    this.guardarEnStorage();
  }

  // Elimina un producto del carrito por su índice
  eliminarProducto(indice) {
    const item = this.items[indice];
    this.total -= item.precioTotal;
    this.items.splice(indice, 1);
    this.actualizarCarrito();
    this.guardarEnStorage();
  }

  // Actualiza la vista del carrito en la interfaz de usuario
  actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";

    this.items.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerText = `${item.cantidad} x ${item.producto} - $${item.precioTotal}`;
      const botonEliminar = document.createElement("button");
      botonEliminar.innerText = "Eliminar";
      botonEliminar.className = "btn-eliminar";
      botonEliminar.onclick = () => this.eliminarProducto(index);
      li.appendChild(botonEliminar);
      listaCarrito.appendChild(li);

      setTimeout(() => {
        li.classList.add("show");
      }, 10); // Pequeño retraso para activar la transición
    });

    const totalConDescuento = this.total - this.descuento;
    document.getElementById("total").innerText =
      totalConDescuento >= 0 ? totalConDescuento.toFixed(2) : 0;
  }

  // Aplica un cupón de descuento
  aplicarCupon(codigoCupon) {
    if (codigoCupon.length === 6 && !isNaN(codigoCupon)) {
      const descuento = this.total * 0.05;
      this.descuento = descuento;
      mostrarMensaje(
        `Felicitaciones, obtuviste un descuento del 5%! Descuento aplicado: $${descuento.toFixed(
          2
        )}`
      );
    } else {
      mostrarMensaje("Cupón inválido. Debe ser un código de 6 números.");
    }
    this.actualizarCarrito();
  }

  // Simula la realización de un pedido y vacía el carrito
  realizarPedido() {
    if (this.items.length === 0) {
      mostrarMensaje("El carrito está vacío.");
    } else {
      const totalConDescuento = this.total - this.descuento;
      mostrarMensaje(
        "Pedido realizado con éxito! Total a pagar: $" +
          (totalConDescuento >= 0 ? totalConDescuento.toFixed(2) : 0)
      );
      this.items = [];
      this.total = 0;
      this.descuento = 0;
      this.actualizarCarrito();
      this.guardarEnStorage();
    }
  }
}

// Crear productos disponibles
const productos = [
  new Producto("Pizza", 7000),
  new Producto("Hamburguesa", 8000),
  new Producto("Lomo", 10000),
  new Producto("Gaseosa", 1500),
  new Producto("Agua", 1000),
  new Producto("Cerveza", 2000),
];

// Instancia del carrito
const carrito = new Carrito();

// Cargar productos en el menú desplegable
function cargarProductos() {
  const selectProducto = document.getElementById("producto");
  productos.forEach((producto) => {
    const option = document.createElement("option");
    option.value = producto.nombre;
    option.text = `${producto.nombre} - $${producto.precio}`;
    selectProducto.appendChild(option);
  });
  actualizarPrecioTotal(); // Actualizar el precio total inicial
  carrito.actualizarCarrito(); // Actualizar el carrito en la interfaz al cargar la página
}

// Agrega productos al carrito desde el formulario
function agregarAlCarrito() {
  const productoSeleccionado = document.getElementById("producto").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (cantidad <= 0 || isNaN(cantidad)) {
    mostrarMensaje("Por favor, ingrese una cantidad válida mayor a 0.");
    return;
  }

  const producto = productos.find((p) => p.nombre === productoSeleccionado);
  if (!producto) {
    mostrarMensaje("El producto seleccionado no está disponible.");
    return;
  }

  carrito.agregarProducto(producto, cantidad);
}

// Muestra mensajes en la interfaz
function mostrarMensaje(mensaje) {
  const mensajesDiv = document.getElementById("mensajes");
  mensajesDiv.textContent = mensaje;
  mensajesDiv.style.display = "block";
  mensajesDiv.classList.add("fadeIn");

  setTimeout(() => {
    mensajesDiv.classList.remove("fadeIn");
    mensajesDiv.classList.add("fadeOut");

    setTimeout(() => {
      mensajesDiv.textContent = "";
      mensajesDiv.style.display = "none";
      mensajesDiv.classList.remove("fadeOut");
    }, 1000);
  }, 3000);
}

// Muestra el formulario para ingresar el cupón
function aplicarCuponPrompt() {
  document.getElementById("cuponForm").style.display = "block";
}

// Aplica el cupón ingresado
function aplicarCupon() {
  const codigoCupon = document.getElementById("codigoCupon").value;
  carrito.aplicarCupon(codigoCupon);
  document.getElementById("cuponForm").style.display = "none";
  document.getElementById("codigoCupon").value = "";
}

// Simula la realización de un pedido
function realizarPedido() {
  carrito.realizarPedido();
}

// Actualiza el precio total en tiempo real
function actualizarPrecioTotal() {
  const productoSeleccionado = document.getElementById("producto").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const producto = productos.find((p) => p.nombre === productoSeleccionado);
  const precioTotal = producto.precio * cantidad;
  document.getElementById("precioTotal").textContent = precioTotal.toFixed(2);
}

// Event listeners para cargar productos y actualizar precios
window.onload = cargarProductos;
document
  .getElementById("producto")
  .addEventListener("change", actualizarPrecioTotal);
document
  .getElementById("cantidad")
  .addEventListener("input", actualizarPrecioTotal);

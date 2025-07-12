const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const listaCarrito = document.querySelector('.lista-carrito');
const totalCarrito = document.querySelector('.total-carrito span');

let carrito = [];

window.addEventListener('DOMContentLoaded', () => {
  const guardado = localStorage.getItem('carrito');
  if (guardado) {
    carrito = JSON.parse(guardado);
    actualizarCarrito();
  }
});

botonesAgregar.forEach((boton) => {
  boton.addEventListener('click', () => {
    const tarjeta = boton.closest('.producto-tarjeta');
    const nombre = tarjeta.querySelector('.titulo').textContent;
    const precioTexto = tarjeta.querySelector('.precio').textContent;
    const precio = parseFloat(precioTexto.replace('$', ''));

    const producto = { nombre, precio };
    carrito.push(producto);
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  listaCarrito.innerHTML = '';

  carrito.forEach((producto, index) => {
    const item = document.createElement('li');
    item.classList.add('item-carrito');
    item.innerHTML = `
      <span class="nombre-producto">${producto.nombre}</span>
      <span class="precio-producto">$${producto.precio}</span>
      <button class="eliminar-producto" data-index="${index}">Eliminar</button>
    `;
    listaCarrito.appendChild(item);
  });

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  totalCarrito.textContent = `$${total}`;
  localStorage.setItem('carrito', JSON.stringify(carrito));

  document.querySelectorAll('.eliminar-producto').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      carrito.splice(index, 1);
      actualizarCarrito();
    });
  });
}
let productos = [];

function Producto(nombre, modelo, precio, cantidad) {
  this.nombre = nombre;
  this.modelo = modelo;
  this.precio = parseFloat(precio);
  this.cantidad = parseInt(cantidad);
  this.total = function() {
    return this.precio * this.cantidad;
  };
}

function cargarProductos() {
  const totalProductos = parseInt(localStorage.getItem('totalProductos')) || 0;
  productos = [];
  for (let i = 0; i < totalProductos; i++) {
    const nombre = localStorage.getItem(`producto_${i}_nombre`);
    const modelo = localStorage.getItem(`producto_${i}_modelo`);
    const precio = localStorage.getItem(`producto_${i}_precio`);
    const cantidad = localStorage.getItem(`producto_${i}_cantidad`);
    if (nombre && modelo && precio && cantidad) {
      productos.push(new Producto(nombre, modelo, precio, cantidad));
    }
  }
}

function guardarProductos() {
  localStorage.setItem('totalProductos', productos.length);
  productos.forEach((producto, index) => {
    localStorage.setItem(`producto_${index}_nombre`, producto.nombre);
    localStorage.setItem(`producto_${index}_modelo`, producto.modelo);
    localStorage.setItem(`producto_${index}_precio`, producto.precio);
    localStorage.setItem(`producto_${index}_cantidad`, producto.cantidad);
  });
}

function capturarProducto() {
  let nombre = prompt("Ingrese el nombre de la marca del botin:");
  let modelo = prompt("Ingrese el nombre del modelo del botin:");
  let precio = prompt("Ingrese el precio del modelo:");
  let cantidad = prompt("Ingrese la cantidad de botines:");

  let producto = new Producto(nombre, modelo, precio, cantidad);
  productos.push(producto);

  guardarProductos();  
  alert("Botin agregado correctamente");
}

function mostrarProductos() {
  if (productos.length === 0) {
    console.log("No hay botines en el carrito.");
    return;
  }

  console.log("Botines en el carrito:");
  let totalCompra = 0;
  productos.forEach((producto, index) => {
    console.log(`${index + 1}. Botin: ${producto.nombre}, modelo: ${producto.modelo}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}, Total: ${producto.total()} USD`);
    totalCompra += producto.total();
  });
  console.log(`Total de la compra: ${totalCompra} USD`);
}

function filtrarPorNombre(nombre) {
  return productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function filtrarPormodelo(modelo) {
  return productos.filter(producto => producto.modelo.toLowerCase().includes(modelo.toLowerCase()));
}

function buscarProducto(nombre) {
  return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

function menu() {
  cargarProductos();  

  let opcion;
  do {
    opcion = prompt("Seleccione una opción:\n1. Agregar modelo de botin\n2. Ver modelos de botines\n3. Filtrar por nombre de marca\n4. Filtrar por nombre de modelo\n5. Buscar botin específico\n6. Mostrar datos almacenados\n7. Salir");
    switch (opcion) {
      case '1':
        capturarProducto();
        break;
      case '2':
        mostrarProductos();
        break;
      case '3':
        let nombreFiltro = prompt("Ingrese el nombre de la marca a filtrar:");
        let resultadosNombre = filtrarPorNombre(nombreFiltro);
        console.log("Resultados de la búsqueda por nombre de marca:");
        resultadosNombre.forEach(producto => console.log(`Marca: ${producto.nombre}, modelo: ${producto.modelo}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`));
        break;
      case '4':
        let modeloFiltro = prompt("Ingrese el nombre del modelo a filtrar:");
        let resultadosmodelo = filtrarPormodelo(modeloFiltro);
        console.log("Resultados de la búsqueda por nombre de modelo:");
        resultadosmodelo.forEach(producto => console.log(`Álbum: ${producto.nombre}, modelo: ${producto.modelo}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`));
        break;
      case '5':
        let nombreBusqueda = prompt("Ingrese el nombre del botin a buscar:");
        let productoEncontrado = buscarProducto(nombreBusqueda);
        if (productoEncontrado) {
          console.log(`Botin encontrado: Nombre: ${productoEncontrado.nombre}, modelo: ${productoEncontrado.modelo}, Precio: ${productoEncontrado.precio}, Cantidad: ${productoEncontrado.cantidad}`);
        } else {
          console.log("Botin no encontrado");
        }
        break;
      case '6':
        cargarProductos(); 
        mostrarProductos(); 
        break;
      case '7':
        alert("Gracias por visitar nuestra tienda de fútbol. ¡Hasta pronto!");
        break;
      default:
        alert("Opción no válida");
    }
  } while (opcion !== '7');
}

menu();
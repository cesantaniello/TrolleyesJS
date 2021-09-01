//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//Listeners
cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

//Funciones
//Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();
    //Delegation para agregar el curso al carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //Enviamos curso seleccionado para tomar datos
        leerDatosCurso(curso);
    }
};

//Lee el contenido del HTML
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    //Agregar al carrito
    insertarCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);

    carritoHTML();
}

//Imprime el carrito en el HTML
function carritoHTML(){

    //Limpiar el HTML
    vaciarCarrito();

    //Recorre el carrito
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio, id} = curso;
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //Agregar el HTML en el tbody
        contenedorCarrito.appendChild(row);
    });
    
}

//Elimina los cursos del tbody
function vaciarCarrito() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
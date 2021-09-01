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

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        let articulosCarrito = []; //Vacia el carrito
        carritoHTML(); //Limpia el HTML
    });
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

//Elimina el curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina el curso del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id != cursoId);

        carritoHTML(); //Iterar sobre el carrito
    }
}

//Lee el contenido del HTML
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    //Revisa si el curso ya está en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        //Aumenta la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            }else{
                return curso; //Retorna los objetos no duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agrega el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agregar al carrito

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
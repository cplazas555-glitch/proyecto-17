
// Seleccionamos los elementos del HTML
const formulario = document.getElementById("formulario-tarea");
const entradaTarea = document.getElementById("entrada-tarea");
const listaTareas = document.getElementById("lista-tareas");


// Escuchamos cuando se envía el formulario
formulario.addEventListener("submit", function(evento) {

    // Evitamos que la página se recargue
    evento.preventDefault();

    // Obtenemos el texto escrito
    const texto = entradaTarea.value.trim();

    // Comprobamos que no esté vacío
    if (texto === "") {
        alert("Escribe una tarea primero");
        return;
    }

    // Creamos una nueva fila
    const nuevaTarea = document.createElement("li");

    // Creamos la casilla de verificación
    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.className = "casilla";

    // Creamos el texto de la tarea
    const textoTarea = document.createElement("span");
    textoTarea.className = "texto-tarea";
    textoTarea.textContent = texto;

    // Creamos el botón para eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "eliminar";
    botonEliminar.type = "button";
    botonEliminar.textContent = "🗑️";

    // Agregamos los elementos a la fila
    nuevaTarea.appendChild(casilla);
    nuevaTarea.appendChild(textoTarea);
    nuevaTarea.appendChild(botonEliminar);

    // Agregamos la tarea a la lista
    listaTareas.appendChild(nuevaTarea);


    // Detectamos cuando se marca o desmarca la casilla
    casilla.addEventListener("change", function() {

        if (casilla.checked) {
            nuevaTarea.classList.add("completada");
        } else {
            nuevaTarea.classList.remove("completada");
        }

        // Organizamos las tareas
        ordenarTareas();
    });


    // Eliminamos la tarea cuando se presiona la papelera
    botonEliminar.addEventListener("click", function() {
        nuevaTarea.remove();
    });


    // Limpiamos el campo de escritura
    entradaTarea.value = "";

    // Dejamos el cursor listo para otra tarea
    entradaTarea.focus();

});


// Función para organizar las tareas
function ordenarTareas() {

    // Obtenemos todas las tareas de la lista
    const tareas = Array.from(listaTareas.children);

    // Organizamos primero las pendientes
    // y después las completadas
    tareas.sort(function(tareaA, tareaB) {

        const completadaA = tareaA.querySelector(".casilla").checked;
        const completadaB = tareaB.querySelector(".casilla").checked;

        if (completadaA === completadaB) {
            return 0;
        }

        if (completadaA) {
            return 1;
        }

        return -1;
    });

    // Volvemos a colocar las tareas en la lista
    tareas.forEach(function(tarea) {
        listaTareas.appendChild(tarea);
    });

}

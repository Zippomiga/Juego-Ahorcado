var palabraRandom = ["COMPUTADORA", "PROGRAMACION", "JUEGO", "TECNOLOGIA", "ROBOT", "PAGINA", "TECLADO", "CELULAR", "MONITOR", "MOUSE", "NOTEBOOK", "PARLANTE", "IMPRESORA", "LASER", "CODIGO", "DOMINIO", "VARIABLE", "FUNCION", "CONSTANTE", "CADENA", "OBJETO", "ELEMENTO", "CLASE", "LISTA", "ESTILO", "IDENTIFICADOR", "ETIQUETA", "VALOR", "ARREGLO", "PALABRA", "OPERACION", "CALCULADORA", "MATEMATICA", "ALGORITMO", "NUMERO", "CONSOLA", "CONDICION", "RESULTADO", "INTERNET", "JUGADOR", "ENTRADA", "SALIDA", "TRANSFERENCIA", "LOGICA", "BLOCKCHAIN", "CRIPTOMONEDA", "DESARROLLADOR", "JAVASCRIPT", "SINTAXIS", "SEMANTICA", "NAVEGADOR", "SOFTWARE", "HARDWARE", "MAQUINA", "ARITMETICA", "INTELIGENCIA", "ARTIFICIAL", "BUCLE", "ENTIDAD", "NUCLEO", "PROCESADOR", "NOMENCLATURA", "AXIOMA", "LENGUAJE", "MARCADO", "HIPERTEXTO", "ITERACION", "BOOLEANO"];

var palabraSecreta;
var letrasPalabraSecreta;
var intentos;
var intentosRestantes;
var intentosRestantesHTML = document.querySelector(".intentos-restantes");
var filtro;
var camposPalabra;
var campoLetra;


var botonNuevaPalabra = document.querySelector(".nueva-palabra");
botonNuevaPalabra.addEventListener('click', function() {

    palabraSecreta = palabraRandom[Math.floor(Math.random() * palabraRandom.length)];
    letrasPalabraSecreta = 0;
    intentos = 0;
    intentosRestantes = 8;
    intentosRestantesHTML.innerHTML = "Intentos restantes: " + intentosRestantes;
    filtro = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    camposPalabra = document.querySelector(".palabra");
    botonRendirse.classList.remove("botonOff");

    limpiarPantalla();
    dibujarBaseHorca();
    habilitarTeclado();

    while(camposPalabra.firstChild) {
        camposPalabra.removeChild(camposPalabra.lastChild);
    }    

    for(var i = 0; i < palabraSecreta.length; i++) {
        campoLetra = document.createElement("input");
        campoLetra.classList.add("campo-letras");
        camposPalabra.appendChild(campoLetra);
    }
});



function rendirseOff() {
    botonRendirse.classList.add("botonOff");
}

var botonRendirse = document.querySelector(".rendirse");
botonRendirse.addEventListener('click', function() {

    intentosRestantesHTML.innerHTML = "NOO mataste a Palito! <br> 😱😳"
    inhabilitarTeclado();
    mostrarPalabraSecreta();
    dibujarAhorcado();
    rendirseOff();
});



var keyLetra = document.querySelectorAll(".letra");
    keyLetra.forEach(letra => {
    letra.addEventListener('click', function(event) {

        var key = event.target.textContent;
        introducirLetras(key);
        filtro = filtro.replace(key, '');
    });
});



var teclaPresionada = document.querySelector("html");
teclaPresionada.addEventListener("keydown", function(event) {

    var key = event.key.toUpperCase();

    if(filtro.includes(key)) {
        introducirLetras(key);
        filtro = filtro.replace(key, '');
    }
});



function introducirLetras(key) {

    if(palabraSecreta.includes(key)) {

        var idLetraCorrecta = "#" + key;
        var keyLetra = document.querySelector(idLetraCorrecta);
    
        for(var i = 0; i < palabraSecreta.length; i++) {
            if(key == palabraSecreta[i]) {
                letrasPalabraSecreta++;
                camposPalabra.childNodes[i].value = palabraSecreta[i];
                keyLetra.classList.replace("letra", "letra-correcta");
            }
            
            if(letrasPalabraSecreta == palabraSecreta.length) {
                for(var i = 0; i < palabraSecreta.length; i++) {
                    camposPalabra.childNodes[i].value = palabraSecreta[i];
                    camposPalabra.childNodes[i].classList.replace("campo-letras", "palabra-ahorcado-bien");
                    filtro = "";
                    intentosRestantesHTML.innerHTML = "Salvaste a Palito. Muchas Gracias <br> 🤗🤗🤗";
                    inhabilitarTeclado();
                    rendirseOff();
                    limpiarPantalla();
                    dibujarSalvado();
                }                
            }
        }        
    
    } else {
        intentosRestantes--;
        intentosRestantesHTML.innerHTML = "Intentos restantes: " + intentosRestantes;

        intentos++;
        var idLetraIncorrecta = "#" + key;
        var keyword = document.querySelector(idLetraIncorrecta);
    
        for(var i = 0; i < palabraSecreta.length; i++) {
            if(key != palabraSecreta[i]) {
                keyword.classList.replace("letra", "letra-incorrecta");
                dibujarCanvas(intentos);
            } 
        }
    
        if(intentos == 8) {
            inhabilitarTeclado();
            mostrarPalabraSecreta();
            rendirseOff();
            filtro = "";
            intentosRestantesHTML.innerHTML = "Palito fue ahorcado <br> 😰🥺";
        }            
    }              
}



function mostrarPalabraSecreta() {
    for(var i = 0; i < palabraSecreta.length; i++) {
        camposPalabra.childNodes[i].value = palabraSecreta[i];
        camposPalabra.childNodes[i].classList.replace("campo-letras", "palabra-ahorcado-mal");
    }
}


var letrasTeclado = document.querySelector(".lista-letras").childNodes;

function habilitarTeclado() {
    letrasTeclado.forEach(element => {
        element.className = "letra";
    });
}

function inhabilitarTeclado() {
    letrasTeclado.forEach(element => {
        element.className = "letra-bloqueada";
    });
}
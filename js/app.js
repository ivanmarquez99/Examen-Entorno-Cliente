/**
 * Ejercicio 1. Crea una lista de elementos en HTML y usa jQuery para cambiar su estilo y recorrerlos. Al hacer clic en un elemento, se debe resaltar cambiando su color de fondo
 * a amarillo. Al hacer clic nuevamente en el mismo elemento, el color de fondo debe volver a su estado original. Además, cuando el cursor se mueve sobre un elemento, su color de
 * fuente debe cambiar a rojo (3 pts).
 */
$(document).ready(function () {
  $('.ejercicio1 li').click(function () {
    if ($(this).hasClass('resaltado')) {
      $(this).removeClass("resaltado");
    } else {
      $(this).addClass("resaltado");
    }
  });

  $('.ejercicio1 li').hover(function () {
    $(this).addClass("red");
    $(this).css('cursor', 'pointer');
  }, function () {
    $(this).removeClass("red");
  })
});

/**
 * Ejercicio 2. Desarrollar un sistema que permita seleccionar una categoría de productosdesde un menú desplegable y que muestre en otro menú desplegable los productos disponibles 
 * de esa categoría. Para ello, se utilizará unmenú desplegable para seleccionar la categoría y otro menú desplegable para mostrar los productos, además de un mensaje de "cargando"
 * con el gif que está en la carpeta css mientras se realiza la petición al servidor.
 * Los datos de las categorías y productos se obtendrán de un servidor PHP que devolverá un archivo XML con la información correspondiente. Se utilizará jQuery para realizar la 
 * petición AJAX al servidor y mostrar los datos en la página HTML (4 pts).
 */
$(function () {
  const categorias = $('.productos');
  const productos = $('.productos-disponibles');
  const cargando = $('#cargando');

  categorias.on('change', function () {
    const categoria = $(this).val();
    console.log(categoria);

    if (categoria !== '0') {
      cargando.html('Cargando...<img src="css/loading.gif">');

      $.ajax({
        type: 'GET',
        url: 'php/server.php',
        data: {
          cat: categoria
        },
        dataType: 'xml'
      })
        .done(function (xml) {
          productos.empty();

          $(xml).find('producto').each(function () {
            productos.append('<option>' + $(this).text() + '</option>');
          });

          cargando.html('');
        })
        .fail(function () {
          console.log('Error al cargar los productos');
        });
    } else {
      productos.empty();
    }
  });
});


/**
 * Ejercicio 3. Analizar el archivo xml “pelis.xml”a través de unapetición con el objeto XMLHttpRequest y devuelve la información en la web de la siguiente manera (3 pts):
 */

// Funcion para leer el archivo XML
function cargaDocXML(rutaxml) {
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  }
  else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET", rutaxml, false);
  xhttp.send();
  return xhttp.responseXML;
}

//Cargar el documento XML
xmlDoc = cargaDocXML("pelis.xml");
//Obtener array con todos los nodos secundarios:
nodos = xmlDoc.getElementsByTagName("Movie")
//Bucle para recorrer el array
for (i = 0; i < nodos.length; i++) {
  // Indicamos cual será el template a usar
  var template = document.querySelector('template').content;
  // Insertamos los datos en el template
  template.querySelector('.movie-title').innerHTML = nodos[i].querySelector("Title").innerHTML;
  template.querySelector('.year').innerHTML = "Año: " + nodos[i].querySelector("Year").innerHTML;
  template.querySelector('.director').innerHTML = "Director: " + nodos[i].querySelector("Director").innerHTML;
  template.querySelector('.productor').innerHTML = "Compañía de producción: " + nodos[i].querySelector("ProductionCompany").innerHTML;
  actores = nodos[i].querySelectorAll("Actor")
  for (j = 0; j < actores.length; j++) {
    template.querySelector('.actor' + [j]).innerHTML = actores[j].querySelector("Name").innerHTML + " como " + actores[j].querySelector("Role").innerHTML;
  }
  //Pegamos el template en el cuerpo del ejercicio 3
  var template = document.querySelector('template').content;
  var clone = template.cloneNode(true);
  document.querySelector('.ejercicio3').appendChild(clone);
}





let elem = document.querySelector('#resultado');
let configSEO = (function(el) {
  let instancia;

  // Crear propiedades y funciones privadas, estos tambien tendran acceso
  // a el objeto instance
  function privada() {
    return `Soy una funcion privada y tengo acceso a instancia gracias a closure. ${instancia.nombre}`;
  }
  // al final configSEO sera igual a esta funcion que regresamos
  return function() {
    // si instancia ya existe, solo regresamos su referencia y todo el codigo de mas abajo deja de ejecutarse
    if (typeof instancia === 'object') {
      return instancia;
    }
    
    // Estas lineas solo se ejecutan una vez cuando la instancia del singleton aun no es creada
    instancia = {
        nombre: 'Pensemosweb',
        seo: {
          descripcion: {
            limiteCaracteres: 155,
            limitePalabras: 23
          },
          titulo: {
            limiteCaracteres: 70,
            limitePalabras: 9
          }
        }
    };

    // Agregar propiedades y metodos publicos
    instancia.metodoPublico = function() {
      el.append('Soy un metodo publico, y tengo acceso a los elementos privados gracias a closure.');
      el.append(document.createElement('br'));
      el.append(privada());
    };

    return instancia;
  };
}(elem)) //invocacion inmediata y le pasamos un elemento del DOM donde imprimiremos los mensajes

let conf1 = configSEO();
let conf2 = configSEO();
conf1.metodoPublico();
elem.append(document.createElement('br'));
elem.append('conf1 y conf2 son el mismo objeto = ');
elem.append(conf1 === conf2);
elem.append(document.createElement('br'));
conf2.metodoPublico();
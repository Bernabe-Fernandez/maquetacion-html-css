/********* Menu *************/
((d) => {
  //Seleccionamos los elementos mediante el queryselector del DOM y el nombre de la clase de los elementos en HTML
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  //Programamos un evento que sera activado mediante click y hara ciertos cambien en nuestros elementos antes seleccionados
  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  //lo que hacemos aqui es que al hacer click en algun lugar del document html, en caso de que ese elemento no pertenezca el menu no se hara nada pero en caso contrario es decir que demos click a un enlace del menu de navegacion quitaremos las clases al primer elementos y se lo agregaremos al segundo y haremos invisible el menu
  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/******** ContactForm **********/
((d) => {
  /**Sleccionamos los elementos del DOM para hacer uso del envio del formulario */
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector("contact-form-response");

  /**agregamos  el elemnto submit al form*/
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/bernabefernandezg05@gmail.com", {
      /**Aqui declaramos el metodo de envio, y tambien el cuerpo del envio en el cual colocamos un formdata el cual uno de manera automatica el name del input con el valor que el usuario ingrese */
      method: "POST",
      body: new FormData(e.target),
    })
      /**THEN son las promesas del fecth */
      .then(
        //usaremos una if lineal para evaluar si la respuesta es correcta
        (res) =>
          res.ok
            ? //si es correcta y devuelve true convertimos la respuesta que devuelve el formsubmit a un json
              res.json()
            : //en caso contrario lo que hacemos es que la promesa sea rechazada para que asi el error sea enviado al metodo catch
              Promise.reject(res)
      )
      //si se devuelve correctamente el json creamos la siguiente promesa
      .then((json) => {
        console.log(json);
        //hacemos que aparezca la ventana modal
        location.hash = "#gracias";
        //limpiamos el formulario
        $form.reset();
      })
      /**El metodo catch nos ayuda a capturar el error */
      .catch((err) => {
        console.log(err);
        //creamos una variable en la cual si la API no nos devuelve un error agregaremos un mensaje por defecto de error
        let message =
          err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
        //una vez teniendo esto, agregaremos en un h3 dentro de response el error que nos envie la API o en si defecto el mensaje creado, esto se agregara como texto del H3
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        /*una vez que se haya hecho el envio y se obtenga la respuesta del formulario ocultamos el loader*/
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);

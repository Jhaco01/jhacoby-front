# BSALE JHACOBY FRONT END
La aplicación web está desarrollada para consumir API's de productos y emular la visualización de un e-commerce, ya que despliega los productos recibidos, junto con su nombre, precio y un descuento como propiedad opcional.

La organización está desarrollada a través de varios componentes que se inyectan al DOM de forma secuencial. A continuación se explica cada uno de ellos:

## Carpeta Animation
Se encarga de desarrollar una animación mientras finaliza la ejecución de las funciones asincronas. Esta animación consiste en la inyección de una imagen en el DOM, del logo de [bsale](https://bitzen.cl/49-large_default/modulo-integracion-bsale-prestashop.jpg).

## Carpeta de manejo de errores
Se encarga de manejar dos posibles errores en el funcionamiento de la app, el envío de errores por parte de la solicitud fetch a la API, o 
la ausencia de resultados en la busqueda realizada. 

<pre>
//Se reciben como argumentos el contenedor padre del componente que puede generar el error y el texto que debe imprimirse en pantalla.
export const errorHandler = (parent, text) => {
    
    //Se limpia el resultado anterior si existe en pantalla.
    parent.innerHTML = '';

        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-div');
        
            const errorTitle = document.createElement('h3');
            errorTitle.innerText = 'Ha ocurrido un error';

        errorDiv.appendChild(errorTitle);

            const errorInfo = document.createElement('p');
            errorInfo.innerText = `Por favor ${ text }`
        
        errorDiv.appendChild(errorInfo);

    parent.appendChild(errorDiv);
}
</pre>

## Carpeta de providers
Está compuesta por tres componentes, que se encargan de inyectar los datos obtenidos de la API utilizada en la app, de modo que está se arme de forma dinamica y sea codigo reutilizable con otras bases de datos. La [API](https://bsale-jhacoby-api.onrender.com) utilizada debe contener, al menos, un conjunto de items destinados a la venta y un conjunto de categorías a las que pertenecen dichos productos.

### categoriesProvider 
Este componente es el encargado de obtener la data que será inyectada en el navbar de la app, las categorías son tomadas de la bd y luego utilizadas para armar cada enlace de la navbar.

<pre>
export const categoriesProvider = async () => {

    try {
        
        const resp = await fetch('https://bsale-jhacoby-api.onrender.com/category');
    
        if (resp.ok) {
            
            const data = await resp.json();

            return data

        } else {
            
            throw await resp.json();

        }
    
      } catch (error) {
    
        //En caso de no obtener respuesta del servidor, se generará un boton unico sin id, de modo que sea 
        //posible el funcionamiento sin esta funcionalidad.

        return [{name: 'items', id: '' }];
    
    }

}
</pre>

### productsProvider

Este componente se encarga de obtener la data que luego será mapeada para armar con su información cada item disponible en la bd para su venta. Para tener una imagen general, se requiere que contenga, al menos una propiedad `name` y preferiblemente una propiedad `price`.

<pre>
export const productsProvider = async (n) => {

    try {
      
        //Este componente está estructurado para funcionar con llamados del searcher, llamados del navbar y llamados al iniciar la app,
        //por ello, solicita un numero de id de la categoría que debe solicitar al servidor, en caso de no obtener ningun id como argumento,
        //hace el llamado a todos los productos.

        const resp = n ? await fetch(`https://bsale-jhacoby-api.onrender.com/products/${n}`) : await fetch(`https://bsale-jhacoby-api.onrender.com/products`);
  
        if (resp.ok) {
            
            const data = await resp.json();

            return data;
        
        } else {
          
            throw await resp.json();
          
        }
    
    } catch (error) {
    
        throw error;
      
    }      
    
}
</pre>

### searchProvider
Este componente se encarga de hacer el llamado al buscador disponible en la [API](https://bsale-jhacoby-api.onrender.com), para con ello obtener todos los productos que contegan en su nombre, el string enviado en la solicitud fetch.

<pre>
export const searchProvider = async ( search ) => {
    
    try {
        
        //El argumento search debe ser un string, que será enviado a la API, para obtener todos los productos 
        //relacionados con la busqueda.
        const resp = await fetch(`https://bsale-jhacoby-api.onrender.com/products/product/${ search }`);

        if (resp.ok) {
            
            const data = await resp.json();

            return data
        
        } else {
          
            throw await resp.json();
          
        }

    } catch (error) {
        
        throw error;

    }

}
</pre>

## Carpeta Navbar
Contiene todos los elementos necesarios para la construccion del la navbar de la aplicación. 

### getCategoryList
Se encarga de generar todos los anchor tags `<a>` que permitiran funcionar la navbar, recibe como argumentos una `<ul>` ya existente y la informacion que contendrá el boton para su funcionamiento, la cuál obtiene a través de la anteriormente mencionada función `categoriesProvider`, luego cada boton es inyectado a la ul recibida. 

Se encarga también de agregar un eventListener en caso de click, que se encarga de ordenar los productos por categoria para ser mostrados al usuario, a través de un llamado a `getProducts` (será especificado más adelante).

<pre>
import { getProducts } from "../../Products/getProducts.js";

//Animación creada para la UX, de modo que el usuario sepa sobre qué boton 
//interactúa.
const illuminate = ( a ) => {
  
  a.classList.add('active');
  setTimeout(()=>{
    a.classList.remove('active');
  },300)

}

//Acá los parametros que indican los argumentos que deben ser recibidos al hacer el llamado a este componente.
export const getCategoryList = async ( ul, {id, name} ) => {

    const li = document.createElement('li');          
          
      const a = document.createElement('a');
      const aClasses =  ['nav-link','text-white'] ;
      a.classList.add(...aClasses);
      a.id = `${id}`;      
      const aText = name.toUpperCase();
      a.innerHTML = aText;
      

      //Aca se crea el eventListener para cada botton que , como se ve anteriormente, obtiene su id de los parametros de la función,
      //de esta manera es posible que, al hacer el llamado a la función getProducts, con el id como parametro, a través del click, se 
      //obtengan los productos, identificados con la categoria del boton unicamente.
      a.addEventListener('click', async() => {                        
          try{
            await getProducts(`${id}`);
          } catch (error) {
            //La clausula try catch permite que cada boton pueda gestionar un posible error con el handler explicado anteriormente.
            errorHandler('intente más tarde.')
          }
      });

      a.addEventListener('mouseover', () => illuminate( a ) )
   
    li.appendChild(a);


    //Cada li contiene la información recibida de la API y es inyectado en la ul recibida.    
    ul.appendChild(li);

}
</pre>

### getButtons 
Es el componente encargado de crear la unordered list `<ul>` que será pasada como argumento en la función `getCategoryList` y de hacer el llamado a esta función, pasandole también los argumentos obtenidos del llamado que debe realizar al provider `categoriesProvider`, por lo que se encarga de 
* Crear una `<ul>`.
* Llamar a `getCategoriesProvider` y obtener su data.
* Mapear los elementos de la data obtenidos a través del componente `getCategoryList`.

<pre>
import { categoriesProvider } from "../http-providers/categoriesProvider.js";
import { getCategoryList } from "./Categories/getCategoryList.js";

//Acá se crea la ul que será enviada como argumeno, y luego inyectada al DOM.
const getUl = () => {

    const ul = document.createElement('ul');
    const ulClasses = ['nav','nav-pills','flex-colum','mb-auto']  
    ul.classList.add(...ulClasses);
    ul.id = 'ul'
  
    return ul;
  
}

export const getButtons = async () => {

    //Acá se obtienen los datos desde la API, que para un correcto funcionamiento, deberan contener propiedades name y id.
    const data = await categoriesProvider();

    //Este elemento es creado mediante la función getNavbar que se explica a continuación.
    const divNav = document.querySelector('#divNav')

        const nav = document.createElement('nav');
          
          const ul = getUl();        
  
          //Acá se mapea cada elemento de la data para construir los li de la lista y ser inyectados a esta.  
          data.map( dat => getCategoryList(ul, dat) )
  
        //Se inyecta la ul al DOM.
        nav.appendChild(ul);
          
    divNav.appendChild(nav);
}
</pre>

### getNavbar
Su función es que la barra de navegación lateral sea visible desde que se inicia la app, dejando esta sección del codigo fuera de una función async.

<pre>
const getNav = () => {

  const divNav = document.createElement('div');   
  const divNavClasses = ['d-flex', 'flex-column', 'flex-shrink-0', 'p-3', 'text-white', 'bg-dark']
  divNav.classList.add(...divNavClasses);
  //Este id será utilizado para hacer el llamado a este elemento en otras funciones.
  divNav.id = 'divNav'

  return divNav;

}

export const getNavbar = async() => {     
  
    const root = document.querySelector('.root');
      //Acá se crea el elemento que luego será utilizado en otras funciones para hacer inyecciones en el DOM.
      const divNav = getNav();                
          
    root.appendChild(divNav);
          
}
</pre>

## Carpeta de productos

Contiene todos los componentes necesarios para reproducir los productos recibidos desde la API en la pantalla a modo de muestra de e-commerce.

### getItemCard
Se encarga de crear la carta de presentación de cada producto, a partir de las propiedades que recibe como parametros al ser llamado el componente. Llama dentro de sí dos funciones encargadas de inyectar el nombre y la imagen con el objetivo de no sobrecargar la función y tener un codigo más limpio. También se encarga de inyectar el precio del producto y, en caso de estar presente, el descuento también.
En caso de que la imagen del producto no esté disponible o no exista, se coloca una [imagen](https://bitzen.cl/49-large_default/modulo-integracion-bsale-prestashop.jpg) con el logo de bsale en su lugar.

<pre>
import { getItemCardName } from "./Card-Elements/01-getItemCardName.js";
import { getItemCardImage } from "./Card-Elements/02-getItemCardImage.js";

const createCard = () => {

    const card = document.createElement('div');
    const cardClasses = ["card", "h-100"];
    card.classList.add(...cardClasses);

    return card;

}

export const getItemCard = ( container, { name, url_image, price, discount } ) => {                          
    
    const cardDiv = document.createElement('div');
    const cardDivClasses = ['col','mb-5']
    cardDiv.classList.add(...cardDivClasses)
        
        const card = createCard();                    
            
            const imgContainer = getItemCardImage(url_image);
            card.appendChild(imgContainer);            
            
            const cardInfo = document.createElement('div');
            const cardInfoClasses = ['card-body', 'p-4'];    
            cardInfo.classList.add(cardInfoClasses);

                const centerTextDiv = document.createElement('div');
                const centerTextDivClasses = ['text-center'];
                centerTextDiv.classList.add(...centerTextDivClasses)

                    const itemName = getItemCardName(name);
                    card.appendChild(itemName);

                centerTextDiv.appendChild(itemName);                    

                    //Se verifica si tiene descuento en su información el producto.
                    const prices = discount ? `${price} CLP - ${discount}% off` : `${price} CLP`

                centerTextDiv.append(prices)
            
            cardInfo.appendChild(centerTextDiv);
    
        card.appendChild(cardInfo)                        
        
    cardDiv.appendChild(card)

    container.appendChild(cardDiv);              

}
</pre>

### getProducts
Se encarga de construir los elementos necesarios para reproducir todos los productos respondidos por la API, en el DOM y por tanto, mostrarlos en pantallas, haciendo una conexión entre los dos componentes explicados con anterioridad `productsProvider` y `getCardItem`,
para reproducirlos en el DOM.
En su primer llamado, el archivo principal de la app lo envuelve en un bloque try-catch; posteriormente cada boton con la capacidad de llamarlo tiene su propio manejo de errores. 

<pre>
import { productsProvider } from "../http-providers/productsProvider.js";
import { getItemCard } from "./Card/getItemCard.js";

export const getProducts = async(n) => {

  //Acá obtiene los datos de los productos solicitados a traves del provider.        
  const data = await productsProvider(n);  

  const columns = data.length < 3 ? '2' : '3'; 
          
  const root = document.querySelector('.root');
    
    const section = document.querySelector('section') ? document.querySelector('section') : document.createElement('section') ;    
  
      const sectionDiv = document.querySelector('.section-div');                              
      sectionDiv.innerHTML = '';    
                      
          const container = document.createElement('div');          
          const containerClasses = ['products-container','container','px-4','px-lg-5','mt-5'];
          container.classList.add(...containerClasses);

            const itemsDiv = document.createElement('div');
            itemsDiv.id = 'items-div';
            const itemsDivClasses = ['row', 'gx-4', `row-cols-md-${columns}`];
            itemsDiv.classList.add(...itemsDivClasses)

              //Luego los datos los mapea a traves del componente getItemCard para reproducir los productos en el DOM.
              data.map( dat => getItemCard(itemsDiv, dat) )

          container.appendChild(itemsDiv);
            
      sectionDiv.appendChild(container);       
        
    section.appendChild(sectionDiv);
          
  root.appendChild(section);
          
}
</pre>

## Carpeta Searcher
Contiene todos los elementos para la construcción de la barra de busquedas y la reproducción en pantalla de los elementos buscados.

### getSearcher
Inyecta en el DOM un input de texto con un icono de busqueda en su extremo izquierdo. Al utilizar el boton se dispara una función que varía según el valor de texto ingresado. En caso de estar vacío el input, se reproducen todos los productos; en caso contrario, se reproducen todos los productos que puedan relacionarse con el valor ingresado por el usuario.

<pre>
import { getProducts } from "../Products/getProducts.js";
import { searchProduct } from "./searchProduct.js";

const handleSubmit = ( e ) => {
          
     e.preventDefault();

     //El manejo del evento submit verifica si hay valor en el input.
     const value = document.querySelector('#form1').value;           

     //En caso de tener valor, busca los productos especificos. En caso contrario, reproduce todos los productos.
     value ? searchProduct(value) : getProducts();     

}

export const getSearcher = () => {
    
     const root = document.querySelector('.root');
          
          const header = document.createElement('header');
               
               const form =  document.createElement('form');                    

                    const divForm = document.createElement('div');
                    divForm.classList.add('input-group');

                         const divInput = document.createElement('div');
                         divInput.classList.add('form-outline');

                              const input = document.createElement('input');
                              input.type = 'text'; input.id = 'form1'; 
                              input.placeholder = 'Search';
                              input.classList.add('form-control');

                         divInput.appendChild(input);

                    divForm.appendChild(divInput);                    

                         const button = document.createElement('button');
                         button.type = 'submit'; 
                         const btnClasses = ['btn','btn-primary'];
                         button.classList.add(...btnClasses);

                              const i = document.createElement('i');
                              const iClasses = ['fas','fa-search'];
                              i.classList.add(...iClasses);

                         button.appendChild(i);

                    divForm.appendChild(button);

               form.appendChild(divForm);                    
               form.addEventListener('submit', handleSubmit)
                    
          header.appendChild(form);

     root.appendChild(header);       

}
</pre>

### searchProduct
Es el componente encargado de enviar la solicitud al servidor con la cadena string que será utilizada para obtener los productos relacionados. Es llamado cada vez que se hace submit en el boton del input explicado anteriormente.

<pre>
import { errorHandler } from "../error-handlers/errorHandler.js";
import { searchProvider } from "../http-providers/searchProvider.js";
import { getItemCard } from "../Products/Card/getItemCard.js";

export const searchProduct = async( search ) => {

  //Acá se realiza la solicitud de los productos relacionados al servidor.         
  const data = await searchProvider( search );    

    const columns = data.length < 3 ? '2' : '3';                          
    const itemsDiv = document.querySelector('#items-div');

    //Esta linea de codigo se debe a que en el armado inicial de la pagina, las columnas quedan fijadas en 3, lo que 
    //puede afectar la visualización de los productos que resulten de la busqueda.
    itemsDiv.classList.replace('row-cols-md-3', `row-cols-md-${columns}`);    
    itemsDiv.innerHTML = '';

        //Se verifica si existen productos relacionados a la busqueda, en caso contrario se muestra un error.
        if (data.length === 0 ) { errorHandler(itemsDiv,'intente con otra palabra.') }
          
        //Se inyectan en el DOM las representaciones visuales de los productos buscados.  
        data.map( dat => getItemCard(itemsDiv, dat) )                                
          
}
</pre>

## App.js
Es el archivo encargado de hacer el llamado a todas las funciones necesarias para el inicio del funcionamiento de la app.

<pre>
import { getNavbar } from "./assets/Navbar/getNavbar.js";
import { getSearcher } from "./assets/Searcher/getSearcher.js";
import { getProducts } from "./assets/Products/getProducts.js";
import { getButtons } from "./assets/Navbar/getButtons.js";
import { getAnimation } from "./assets/Animation/getAnimation.js";
import { errorHandler } from "./assets/error-handlers/errorHandler.js";

export const init = async () => {

  //Se muestra el buscador.  
  getSearcher();
  
  //Se muestra la barra de navegación lateral.
  getNavbar();

  //Se muestra la animación mientras se cargan los componentes.
  getAnimation();

  //Se solicitan las categorías para el armado de los botones en la pagina.
  await getButtons();
  
  //Se solicitan los productos a la API y se controla el error de ser necesario mostrando el mensaje al usuario.
  try{
    await getProducts();
  } catch (error) {
    const sectionDiv = document.querySelector('.section-div');
    errorHandler(sectionDiv,'intente más tarde.');
  }

}
</pre>

## index.js
Es el archivo encargado de llamar a la funcion `init` que da inicio al funcionamiento de los componentes de la app.

## index.html
Es el archivo en el que se inyectan todos los componentes, y donde se crean los componentes `.root` y `.section-div`, dentro de los cuales está contenida la app.

## index.css 
Agrega algunos estilos complementarios a los componentes de la app, estilizada principalmente mediante bootstrap.
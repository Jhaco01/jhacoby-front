import { errorHandler } from "../error-handlers/errorHandler.js";
import { searchProvider } from "../http-providers/searchProvider.js";
import { getItemCard } from "../Products/Card/getItemCard.js";

export const searchProduct = async( search ) => {
          
  const data = await searchProvider( search );    

    const columns = data.length < 3 ? '2' : '3';                          
    const itemsDiv = document.querySelector('#items-div');
    itemsDiv.classList.replace('row-cols-md-3', `row-cols-md-${columns}`);    
    itemsDiv.innerHTML = '';

        if (data.length === 0 ) { errorHandler(itemsDiv,'intente con otra palabra.') }
          
        data.map( dat => getItemCard(itemsDiv, dat) )                                
          
}
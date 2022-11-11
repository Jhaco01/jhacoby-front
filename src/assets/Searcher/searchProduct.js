import { searchProvider } from "../http-providers/searchProvider.js";
import { getItemCard } from "../Products/Card/getItemCard.js";

export const searchProduct = async( search ) => {
          
  const data = await searchProvider( search );                    
                      
    const itemsDiv = document.querySelector('#items-div');
    itemsDiv.innerHTML = '';

        data.map( dat => getItemCard(itemsDiv, dat) )                        
          
}
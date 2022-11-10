import { searchProvider } from "../http-providers/searchProvider.js";
import { getItemCard } from "../Products/Card/getItemCard.js";

export const searchProduct = async( search ) => {
          
  const data = await searchProvider( search );                    
                      
    const container = document.querySelector('.products-container');
    container.innerHTML = '';

        data.map( dat => getItemCard(container, dat) )                        
          
}
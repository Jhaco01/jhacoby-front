import { productsProvider } from "../http-providers/productsProvider.js";
import { getItemCard } from "./Card/getItemCard.js";



export const getProducts = async(n) => {
          
  const data = await productsProvider(n);
          
  const root = document.querySelector('.root');
    
    const section = document.createElement('section');
  
      const sectionDiv = document.querySelector('.section-div');
      sectionDiv.innerHTML = '';
                      
          const container = document.createElement('div');
          container.classList.add('products-container');

          data.map( dat => getItemCard(container, dat) )

      sectionDiv.appendChild(container);       
    
    section.appendChild(sectionDiv);
          
  root.appendChild(section);
          
}
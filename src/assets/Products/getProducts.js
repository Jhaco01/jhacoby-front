import { productsProvider } from "../http-providers/productsProvider.js";
import { getItemCard } from "./Card/getItemCard.js";



export const getProducts = async(n) => {
          
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

              data.map( dat => getItemCard(itemsDiv, dat) )

          container.appendChild(itemsDiv);

      sectionDiv.appendChild(container);       
    
    section.appendChild(sectionDiv);
          
  root.appendChild(section);
          
}
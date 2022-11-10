import { productsProvider } from "../http-providers/productsProvider.js";
import { getItemCard } from "./Card/getItemCard.js";



export const getProducts = async(n) => {
          
  const data = await productsProvider(n);
          
  const root = document.querySelector('.root');
    
    const section = document.createElement('section');
    section.classList.add('py-5')
  
      const sectionDiv = document.querySelector('.section-div');
      sectionDiv.innerHTML = '';
                      
          const container = document.createElement('div');
          const containerClasses = ['products-container','container','px-4','px-lg-5','mt-5']
          container.classList.add(...containerClasses);

          data.map( dat => getItemCard(container, dat) )

      sectionDiv.appendChild(container);       
    
    section.appendChild(sectionDiv);
          
  root.appendChild(section);
          
}
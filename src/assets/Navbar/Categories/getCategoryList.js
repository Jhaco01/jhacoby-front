import { errorHandler } from "../../error-handlers/errorHandler.js";
import { getProducts } from "../../Products/getProducts.js";

const illuminate = ( a ) => {
  
  a.classList.add('active');
  setTimeout(()=>{
    a.classList.remove('active');
  },300)

}

export const getCategoryList = async ( ul, {id, name} ) => {

    const li = document.createElement('li');          
          
      const a = document.createElement('a');
      const aClasses =  ['nav-link','text-white'] ;
      a.classList.add(...aClasses);
      a.id = `${id}`;      
      const aText = name.toUpperCase();
      a.innerHTML = aText;
      
      a.addEventListener('click', async() => {                        
          try{
            await getProducts(`${id}`);
          } catch (error) {
            errorHandler('intente más tarde.')
          }
      });    

      a.addEventListener('mouseover', () => illuminate( a ) )
   
    li.appendChild(a);
        
    ul.appendChild(li);

}
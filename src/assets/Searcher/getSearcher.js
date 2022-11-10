import { getProducts } from "../Products/getProducts.js";
import { searchProduct } from "./searchProduct.js";

const handleSubmit = ( e ) => {
     
     e.preventDefault();
     const value = document.querySelector('#form1').value;           
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
import { categoriesProvider } from "../http-providers/categoriesProvider.js";
import { getCategoryList } from "./Categories/getCategoryList.js";

const getUl = () => {

    const ul = document.createElement('ul');
    const ulClasses = ['nav','nav-pills','flex-colum','mb-auto']  
    ul.classList.add(...ulClasses);
  
    return ul;
  
}

export const getButtons = async () => {

    const data = await categoriesProvider();

    const divNav = document.querySelector('#divNav')

        const nav = document.createElement('nav');
          
          const ul = getUl();        
  
          data.map( dat => getCategoryList(ul, dat) )
  
        nav.appendChild(ul);
          
    divNav.appendChild(nav);
}
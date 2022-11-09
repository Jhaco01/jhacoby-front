import { categoriesProvider } from "../http-providers/categoriesProvider.js";
import { getCategoryList } from "./Categories/getCategoryList.js";

const getUl = () => {

  const ul = document.createElement('ul');
  const ulClasses = ['nav','nav-pills','flex-colum','mb-auto']  
  ul.classList.add(...ulClasses);

  return ul;

}

const getNav = () => {

  const divNav = document.createElement('div');   
  const divNavClasses = ['d-flex', 'flex-column', 'flex-shrink-0', 'p-3', 'text-white', 'bg-dark']
  divNav.classList.add(...divNavClasses);

  return divNav;

}

export const getNavbar = async() => {

    const data = await categoriesProvider(); 
  
    const root = document.querySelector('.root');
      
      const divNav = getNav();
          
        const nav = document.createElement('nav');
          
          const ul = getUl();        
  
          data.map( dat => getCategoryList(ul, dat) )
  
        nav.appendChild(ul);
          
      divNav.appendChild(nav);
          
    root.appendChild(divNav);
          
}
const getNav = () => {

  const divNav = document.createElement('div');   
  const divNavClasses = ['d-flex', 'flex-column', 'flex-shrink-0', 'p-3', 'text-white', 'bg-dark']
  divNav.classList.add(...divNavClasses);
  divNav.id = 'divNav'

  return divNav;

}

export const getNavbar = async() => {     
  
    const root = document.querySelector('.root');
      
      const divNav = getNav();                
          
    root.appendChild(divNav);
          
}
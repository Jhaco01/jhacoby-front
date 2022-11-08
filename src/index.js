import { getProducts } from "./assets/getProducts";


const getCategories = async() => {

  try {
    
    const resp = await fetch('http://localhost:3000/category');

    if (resp.ok) {
        const data = await resp.json();

        const root = document.querySelector('.root');
        const divNavClasses = ['d-flex', 'flex-column', 'flex-shrink-0', 'p-3', 'text-white', 'bg-dark']
        const divNav = document.createElement('div');   
        divNav.classList.add(...divNavClasses);     
        const nav = document.createElement('nav');
        const ulClasses = ['nav','nav-pills','flex-colum','mb-auto']
        const ul = document.createElement('ul');
        ul.classList.add(...ulClasses);

        for (let dat of data) {
          const li = document.createElement('li');          
          const aClasses =  ['nav-link','text-white'] ;
          const a = document.createElement('a');
          a.classList.add(...aClasses);
          a.id = `${dat.id}`;
          const aTxt = dat.name.toUpperCase();
          a.innerHTML = aTxt;
          a.addEventListener('click', () => {
              getProducts(`${dat.id}`)              
          });          
          a.addEventListener('mouseover', ()=>{
            a.classList.add('active');
            setTimeout(()=>{
            a.classList.remove('active');
            },300)
          })
          li.appendChild(a);
          ul.appendChild(li);
        }

        nav.appendChild(ul);
        divNav.appendChild(nav);
        root.appendChild(divNav);

      } else {
        throw await resp.json();
    }

  } catch (error) {

    throw error;

  }      

}

const getSearcher = () => {
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
  form.addEventListener('submit',()=>{
       getProducts();       
  })
  header.appendChild(form);
  root.appendChild(header);  
}



const init = async () => {
    
    getSearcher();
    getCategories();
   await getProducts();

}

init();

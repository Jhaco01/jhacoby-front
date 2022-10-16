const getProducts = async(n) => {

      try {
        
        const resp = await fetch(`http://localhost:3000/products/${n}`);

        if (resp.ok) {
            const data = await resp.json();
            
            const root = document.querySelector('.root');
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section-div');            
            const section = document.createElement('section');
            const container = document.createElement('div');
            container.classList.add('products-container');

            for (let dat of data) {                          
              const card = document.createElement('div');
              const cardClasses = ["card", "d-flex", "flex-column", "align-items-center"];
              card.classList.add(...cardClasses);
              const name = document.createElement('div');
              name.classList.add('product-name');
              name.innerHTML = `${dat.name}`;
              card.appendChild(name);
              const imgContainer = document.createElement('div');
              imgContainer.classList.add('card-img');
              const img = document.createElement('img');
              img.src = `${dat.url_image}`;
              imgContainer.appendChild(img);
              card.appendChild(imgContainer);
              const cardInfo = document.createElement('div');
              const cardInfoClasses = ['card-body', 'pt-5'];
              cardInfo.classList.add(cardInfoClasses);
              const cardPrices = document.createElement('div');
              const cardPricesClasses = ['d-flex', 'align-items-center', 'price'] 
              cardPrices.classList.add(...cardPricesClasses);
              const cardPrice = document.createElement('div');
              const cardPriceClasses = ['del', 'mr-2'];
              cardPrice.classList.add(...cardPriceClasses);
              const price = document.createElement('span');
              price.classList.add('text-dark');
              price.innerHTML = `${dat.price} CLP`;
              cardPrice.appendChild(price);
              cardPrices.appendChild(cardPrice);
              const discount = document.createElement('div');
              discount.classList.add('font-weight-bold');
              discount.innerHTML =  dat.discount ? `${dat.discount}% off` : '';
              cardPrices.appendChild(discount);
              cardInfo.appendChild(cardPrices);
              card.appendChild(cardInfo)
              const article = document.createElement('article');
              article.appendChild(card)
              container.appendChild(article);              
            }
            sectionDiv.appendChild(container);       
            section.appendChild(sectionDiv);
            root.appendChild(section);
        } else {
            throw await resp.json();
        }

      } catch (error) {

        throw error;
    
      }      

}

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
          const aClasses = dat === data[0] ? ['nav-link','active'] : ['nav-link','text-white'] ;
          const a = document.createElement('a');
          a.classList.add(...aClasses);
          a.id = `${dat.id}`;
          const aTxt = dat.name.toUpperCase();
          a.innerHTML = aTxt;
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
  header.appendChild(form);
  root.appendChild(header);  
}


const init = () => {
    
    getSearcher();
    getCategories();
    getProducts('2');

}

init();
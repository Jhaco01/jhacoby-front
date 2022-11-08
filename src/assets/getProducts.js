export const getProducts = async(n) => {

    try {
      
      const resp = n ? await fetch(`http://localhost:3000/products/${n}`) : await fetch(`http://localhost:3000/products`);

      if (resp.ok) {
          const data = await resp.json();
          
          const root = document.querySelector('.root');
          const sectionDiv = document.querySelector('.section-div');
          sectionDiv.innerHTML = '';
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

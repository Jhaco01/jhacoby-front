import { getItemCardName } from "./Card-Elements/01-getItemCardName.js";
import { getItemCardImage } from "./Card-Elements/02-getItemCardImage.js";
import { getItemCardPrices } from "./Card-Elements/03-getItemCartPrices.js";

const createCard = () => {

    const card = document.createElement('div');
    const cardClasses = ["card", "d-flex", "flex-column", "align-items-center"];
    card.classList.add(...cardClasses);

    return card;

}

export const getItemCard = ( container, { name, url_image, price, discount } ) => {                          
    
    const card = createCard();
    
        const itemName = getItemCardName(name);
        card.appendChild(itemName);
        
        const imgContainer = getItemCardImage(url_image);
        card.appendChild(imgContainer);
        
        const cardInfo = document.createElement('div');
        const cardInfoClasses = ['card-body', 'pt-5'];    
        cardInfo.classList.add(cardInfoClasses);

            const cardPrices = getItemCardPrices( price, discount );
        
        cardInfo.appendChild(cardPrices);
   
    card.appendChild(cardInfo)
    
    const article = document.createElement('article');
    article.appendChild(card)
    
    container.appendChild(article);              

  }
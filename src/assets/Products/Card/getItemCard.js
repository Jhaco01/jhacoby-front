import { getItemCardName } from "./Card-Elements/01-getItemCardName.js";
import { getItemCardImage } from "./Card-Elements/02-getItemCardImage.js";

const createCard = () => {

    const card = document.createElement('div');
    const cardClasses = ["card", "h-100"];
    card.classList.add(...cardClasses);

    return card;

}

export const getItemCard = ( container, { name, url_image, price, discount } ) => {                          
    
    const cardDiv = document.createElement('div');
    const cardDivClasses = ['col','mb-5']
    cardDiv.classList.add(...cardDivClasses)
        
        const card = createCard();                    
            
            const imgContainer = getItemCardImage(url_image);
            card.appendChild(imgContainer);            
            
            const cardInfo = document.createElement('div');
            const cardInfoClasses = ['card-body', 'p-4'];    
            cardInfo.classList.add(cardInfoClasses);

                const centerTextDiv = document.createElement('div');
                const centerTextDivClasses = ['text-center'];
                centerTextDiv.classList.add(...centerTextDivClasses)

                    const itemName = getItemCardName(name);
                    card.appendChild(itemName);

                centerTextDiv.appendChild(itemName);                    

                    const prices = discount ? `${price} CLP - ${discount}% off` : `${price} CLP`

                centerTextDiv.append(prices)
            
            cardInfo.appendChild(centerTextDiv);
    
        card.appendChild(cardInfo)                        
        
    cardDiv.appendChild(card)

    container.appendChild(cardDiv);              

}
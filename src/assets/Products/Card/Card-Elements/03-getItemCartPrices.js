export const getItemCardPrices = ( price, discount ) => {
        
        const cardPrices = document.createElement('div');
        const cardPricesClasses = ['d-flex', 'align-items-center', 'price'] 
        cardPrices.classList.add(...cardPricesClasses);
        
            const cardPrice = document.createElement('div');
            const cardPriceClasses = ['del', 'mr-2'];
            cardPrice.classList.add(...cardPriceClasses);
        
                const itemPrice = document.createElement('span');
                itemPrice.classList.add('text-dark');
                itemPrice.innerHTML = `${price} CLP`;
        
            cardPrice.appendChild(itemPrice);
        
        cardPrices.appendChild(cardPrice);
        
            const itemDiscount = document.createElement('div');
            itemDiscount.classList.add('font-weight-bold');
            itemDiscount.innerHTML =  discount ? `${discount}% off` : '';
        
        cardPrices.appendChild(itemDiscount);

        return cardPrices;
}
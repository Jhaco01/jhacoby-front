export const getItemCardName = ( name ) => {
    
    const itemName = document.createElement('div');
    itemName.classList.add('product-name');
    itemName.innerHTML = `${name}`;

    return itemName;
    
}
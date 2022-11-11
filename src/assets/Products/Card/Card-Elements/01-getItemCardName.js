export const getItemCardName = ( name ) => {
    
    const itemName = document.createElement('h5');
    itemName.classList.add('fw-bolder');
    itemName.innerHTML = `${name}`;

    return itemName;
    
}
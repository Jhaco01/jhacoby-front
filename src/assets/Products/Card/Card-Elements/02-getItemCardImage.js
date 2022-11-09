export const getItemCardImage = ( url_image ) => {
    
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('card-img');
        
        const img = document.createElement('img');
        img.src = `${url_image}`;
        
    imgContainer.appendChild(img);

    return imgContainer;
}
export const getItemCardImage = ( url_image ) => {
    
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('card-img-top');
        
        const img = document.createElement('img');
        img.src = url_image ? `${url_image}` : 'https://bitzen.cl/49-medium_default/modulo-integracion-bsale-prestashop.jpg';
        
    imgContainer.appendChild(img);

    return imgContainer;
}
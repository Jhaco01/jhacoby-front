export const getAnimation = () =>{
    
    const sectionDiv = document.querySelector('.section-div');

            const img = document.createElement('img');
            img.src = 'https://bitzen.cl/49-large_default/modulo-integracion-bsale-prestashop.jpg';
            img.classList.add('animation');

    sectionDiv.appendChild(img);
}
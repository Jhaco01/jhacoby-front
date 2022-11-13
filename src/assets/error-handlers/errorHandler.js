export const errorHandler = (parent, text) => {
    
    parent.innerHTML = '';

        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-div');
        
            const errorTitle = document.createElement('h3');
            errorTitle.innerText = 'Ha ocurrido un error';

        errorDiv.appendChild(errorTitle);

            const errorInfo = document.createElement('p');
            errorInfo.innerText = `Por favor ${ text }`
        
        errorDiv.appendChild(errorInfo);

    parent.appendChild(errorDiv);
}
const navBar = document.createElement('nav');

const uList = document.createElement('ul');

const getCategories = async() => {
    const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        redirect: 'follow'
      };

      try {
        
        const resp = await fetch('http://localhost:3000/category',requestOptions);

        if (resp.ok) {
            const data = await resp.json();
            return data;
        } else {
            throw await resp.json();
        }

      } catch (error) {

        throw error;
    
      }      

}

// const categories = getCategories();


document.querySelector('.root').appendChild(navBar)
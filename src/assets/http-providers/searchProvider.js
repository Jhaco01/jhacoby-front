export const searchProvider = async ( search ) => {
    
    try {
        
        const resp = await fetch(`https://bsale-jhacoby-api.onrender.com/products/product/${ search }`);

        if (resp.ok) {
            
            const data = await resp.json();

            return data
        
        } else {
          
            throw await resp.json();
          
        }

    } catch (error) {
        
        throw error;

    }

}
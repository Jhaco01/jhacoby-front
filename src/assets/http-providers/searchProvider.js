export const searchProvider = async ( search ) => {
    
    try {
        
        const resp = await fetch(`http://localhost:3000/products/product/${ search }`);

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
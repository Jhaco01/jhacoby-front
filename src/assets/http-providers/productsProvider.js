export const productsProvider = async (n) => {

    try {
      
        const resp = n ? await fetch(`http://localhost:3000/products/${n}`) : await fetch(`http://localhost:3000/products`);
  
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
export const productsProvider = async (n) => {

    try {
      
        const resp = n ? await fetch(`https://bsale-jhacoby-api.onrender.com/products/${n}`) : await fetch(`https://bsale-jhacoby-api.onrender.com/products`);
  
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
export const categoriesProvider = async () => {

    try {
      
        const resp = await fetch('http://localhost:3000/category');
    
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
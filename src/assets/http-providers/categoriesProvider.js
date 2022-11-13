export const categoriesProvider = async () => {

    try {
      
        const resp = await fetch('https://bsale-jhacoby-api.onrender.com/category');
    
        if (resp.ok) {
            
            const data = await resp.json();

            return data

        } else {
            
            throw await resp.json();

        }
    
      } catch (error) {
    
        return [{name: 'items', id: '' }];
    
    }

}
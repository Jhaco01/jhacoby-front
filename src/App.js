import { getNavbar } from "./assets/Navbar/getNavbar.js";
import { getSearcher } from "./assets/Searcher/getSearcher.js";
import { getProducts } from "./assets/Products/getProducts.js";

export const init = async () => {
    
  getSearcher();
  await getNavbar();
  await getProducts();

}
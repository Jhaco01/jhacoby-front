import { getNavbar } from "./assets/Navbar/getNavbar.js";
import { getSearcher } from "./assets/Searcher/getSearcher.js";
import { getProducts } from "./assets/Products/getProducts.js";
import { getButtons } from "./assets/Navbar/getButtons.js";

export const init = async () => {
    
  getSearcher();
  getNavbar();
  await getButtons();
  await getProducts();

}
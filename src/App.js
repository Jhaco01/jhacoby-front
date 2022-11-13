import { getNavbar } from "./assets/Navbar/getNavbar.js";
import { getSearcher } from "./assets/Searcher/getSearcher.js";
import { getProducts } from "./assets/Products/getProducts.js";
import { getButtons } from "./assets/Navbar/getButtons.js";
import { getAnimation } from "./assets/Animation/getAnimation.js";
import { errorHandler } from "./assets/error-handlers/errorHandler.js";

export const init = async () => {
    
  getSearcher();
  getNavbar();
  getAnimation();
  await getButtons();
  try{
    await getProducts();
  } catch (error) {
    const sectionDiv = document.querySelector('.section-div');
    errorHandler(sectionDiv,'intente más tarde.');
  }

}
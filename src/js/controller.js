import * as model from './model.js';
import ViewRecipe from './view/viewRecipe.js';
import viewRecipe from './view/viewRecipe.js';
import SearchView from './view/searchView.js';
import ViewResult from './view/resultView.js';
import PaginationView from './view/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    ViewRecipe.renderingSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe
    ViewRecipe.renderData(model.newState.recipeProp);
    controlServings();
  } catch (err) {
    viewRecipe.renderingError();
  }
};

const controllerSearchResult = async function () {
  try {
    //1) get search query
    const query = SearchView.getQuery();
    if (!query) return;

    ViewResult.renderingSpinner();
    console.log(ViewResult);

    // 2)load search result
    await model.searchRecipe(query);

    // 3)render results
    // ViewResult.render(model.newState.search.results);
    ViewResult.renderData(model.receipeIntoPage());

    //Render Initial Pagination button
    PaginationView.renderData(model.newState.search);
  } catch (err) {
    console.error(err);
  }
};
controllerSearchResult();

const controlPagination = function (goToPage) {
  // 1)render new results
  ViewResult.renderData(model.receipeIntoPage(goToPage));

  // 2)Render move next and prev Pagination button
  PaginationView.renderData(model.newState.search);
};

const controlServings = function () {
  //Update the servings in state
  model.updateServings(8);
  //render the recipe view
  ViewRecipe.renderData(model.newState.recipeProp);
};

const init = function () {
  viewRecipe.eventRecipeRender(showRecipe);
  SearchView.eventSearchHandler(controllerSearchResult);
  PaginationView.eventPaginationHandler(controlPagination);
};
init();

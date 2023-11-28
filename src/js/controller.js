import * as model from './model.js';
import ViewRecipe from './view/viewRecipe.js';
import viewRecipe from './view/viewRecipe.js';
import SearchView from './view/searchView.js';
import ViewResult from './view/resultView.js';
import PaginationView from './view/paginationView.js';
import ViewBookmark from './view/viewBookmark.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import viewBookmark from './view/viewBookmark.js';

// if (module.hot) {
//   module.hot.accept();
// }

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    ViewRecipe.renderingSpinner();

    //0) update results view to mark selected search result
    ViewResult.update(model.receipeIntoPage());
    //update bookmarks
    ViewBookmark.update(model.newState.bookmarks);

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe
    ViewRecipe.renderData(model.newState.recipeProp);
    // controlServings();
  } catch (err) {
    viewRecipe.renderingError();
  }
};

const controllerSearchResult = async function () {
  try {
    // 1) get search query
    const query = SearchView.getQuery();
    if (!query) return;

    ViewResult.renderingSpinner();
    // console.log(ViewResult);

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

const controlServings = function (newServing) {
  //Update the servings in state
  model.updateServings(newServing);
  //render the recipe view
  // ViewRecipe.renderData(model.newState.recipeProp);
  ViewRecipe.update(model.newState.recipeProp);
};

const controlBookmark = function () {
  //1) Add/remove bookmarks
  if (!model.newState.recipeProp.bookmarked)
    model.addBookMark(model.newState.recipeProp);
  else model.removeBookmark(model.newState.recipeProp.id);

  //2) update recipe
  viewRecipe.update(model.newState.recipeProp);

  //3) Render bookmark
  ViewBookmark.renderData(model.newState.bookmarks);
};

const bookmarkControl = function () {
  viewBookmark.renderData(model.newState.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //upload new Recipe data
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    console.error('💀', err);
    addRecipeView.renderingError(err.message);
  }
};

const init = function () {
  viewBookmark.addHandlerRender(bookmarkControl);
  viewRecipe.eventRecipeRender(showRecipe);
  viewRecipe.addHandlerUpdateServing(controlServings);
  viewRecipe.addHandlerBookmark(controlBookmark);
  SearchView.eventSearchHandler(controllerSearchResult);
  PaginationView.eventPaginationHandler(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';
import { search } from '../js/view/searchView.js';

export const newState = {
  recipeProp: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const recipes = data.data.recipe;
    newState.recipeProp = {
      id: recipes.id,
      title: recipes.title,
      publisher: recipes.publisher,
      sourceUrl: recipes.source_url,
      image: recipes.image_url,
      servings: recipes.servings,
      cookingTime: recipes.cooking_time,
      ingredients: recipes.ingredients,
    };

    if (newState.bookmarks.some(bookmark => bookmark.id === id))
      newState.recipeProp.bookmarked = true;
    else newState.recipeProp.bookmarked = false;

    // console.log(recipes);
  } catch (err) {
    console.error(`${err} 💀💥⛔⛔`);
    throw err;
  }
};

export const searchRecipe = async function (recipe) {
  try {
    newState.search.query = recipe;

    const data = await getJSON(`${API_URL}?search=${recipe}`);

    newState.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    newState.search.page = 1;
  } catch (err) {
    console.error(`${err} 💀💥⛔⛔`);
    throw err;
  }
};

export const receipeIntoPage = function (page = newState.search.page) {
  newState.search.page = page;

  const start = (page - 1) * newState.search.resultPerPage;
  const end = page * newState.search.resultPerPage;
  console.log(start, end);

  return newState.search.results.slice(start, end);
};

export const updateServings = function (newServing) {
  newState.recipeProp.ingredients.forEach(ing => {
    //formula (oldQuantity * newServings / oldServings)
    ing.quantity = (ing.quantity * newServing) / newState.recipeProp.servings;
  });

  newState.recipeProp.servings = newServing;
};

export const addBookMark = function (recipe) {
  //Adding Bookmark
  newState.bookmarks.push(recipe);

  //Mark current recipe as bookmark
  if (recipe.id === newState.recipeProp.id)
    newState.recipeProp.bookmarked = true;
};

export const removeBookmark = function (id) {
  const index = newState.bookmarks.findIndex(el => el.id === id);
  newState.bookmarks.slice(index, 1);

  if (id === newState.recipeProp.id) newState.recipeProp.bookmarked = false;
};

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
    console.log(recipes);
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

export const controlServings = function (newServing) {
  console.log(newState.recipeProp.ingredients);
  newState.recipeProp.ingredients.forEach(ing => {
    //formula (oldQuantity * newServings / oldServings)
    ing.quantity = (ing.quantity * newServing) / newState.recipeProp.servings;
    console.log(ing.quantity);
  });

  newState.recipeProp.servings = newServing;
};

controlServings();

import { RecipesType } from '../types';

const sortRecipes = (recipes: RecipesType): RecipesType =>
  recipes.sort((a, b) => a.name.localeCompare(b.name));

export default sortRecipes;

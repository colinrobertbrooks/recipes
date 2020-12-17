import { IRecipe } from '../types';

const sortRecipes = (recipes: IRecipe[]): IRecipe[] =>
  recipes.sort((a, b) => a.name.localeCompare(b.name));

export default sortRecipes;

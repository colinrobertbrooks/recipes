import { FiltersType, RecipesType } from '../types';

const filterRecipes = ({
  recipes,
  filters
}: {
  recipes: RecipesType;
  filters: FiltersType;
}): RecipesType => {
  const { recipeType } = filters;

  return recipes.filter(recipe => {
    const booleans = [];

    if (recipeType) {
      booleans.push(recipe.type === recipeType);
    }

    return booleans.every(Boolean);
  });
};

export default filterRecipes;

import { FiltersType, RecipesType } from '../types';

const filterRecipes = ({
  recipes,
  filters
}: {
  recipes: RecipesType;
  filters: FiltersType;
}): RecipesType => {
  const { recipeType, recipeNameSearch } = filters;

  return recipes.filter(recipe => {
    const booleans = [];

    if (recipeType) {
      booleans.push(recipe.type === recipeType);
    }

    if (recipeNameSearch) {
      booleans.push(
        recipe.name.toLowerCase().search(recipeNameSearch.toLowerCase()) !== -1
      );
    }

    return booleans.every(Boolean);
  });
};

export default filterRecipes;

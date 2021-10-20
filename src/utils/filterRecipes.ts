import { IRecipe, IFilters } from '../types';

const filterRecipes = ({
  recipes,
  filters,
}: {
  recipes: IRecipe[];
  filters: IFilters;
}): IRecipe[] => {
  const { recipeTypeQuery, recipeNameQuery } = filters;

  return recipes.filter((recipe) => {
    const booleans = [];

    if (recipeTypeQuery) {
      booleans.push(recipe.type === recipeTypeQuery);
    }

    if (recipeNameQuery) {
      booleans.push(
        recipe.name.toLowerCase().search(recipeNameQuery.toLowerCase()) !== -1
      );
    }

    return booleans.every(Boolean);
  });
};

export default filterRecipes;

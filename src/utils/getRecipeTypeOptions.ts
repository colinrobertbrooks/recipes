import { FiltersType, RecipesType, RecipeTypeOptionsType } from '../types';
import filterRecipes from './filterRecipes';

const getTypes = (recipes: RecipesType): string[] =>
  recipes
    .map(({ type }) => type)
    .reduce((options: string[], type) => {
      if (!options.includes(type)) {
        options.push(type);
      }
      return options;
    }, []);

const getRecipeTypeOptions = ({
  recipes,
  filters,
  currentValue
}: {
  recipes: RecipesType;
  filters: FiltersType;
  currentValue: string | null;
}): RecipeTypeOptionsType => {
  const typesInRecipes = getTypes(recipes);
  const enabledTypes = getTypes(
    filterRecipes({ recipes, filters: { ...filters, recipeType: null } })
  );

  return typesInRecipes
    .sort((a, b) => a.localeCompare(b))
    .map(value => ({
      value,
      active: value === currentValue,
      disabled: !enabledTypes.includes(value)
    }));
};

export default getRecipeTypeOptions;
